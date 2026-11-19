"""
Enterprise Messaging Platform — Official Python B2B SDK

Zero-dependency standard library implementation (`urllib.request`), with optional
`requests.Session` transport support when `requests` is installed.
Matches `messaging-backend` REST API v1.0.0 DTO contracts 100%.
"""

from __future__ import annotations

import hashlib
import hmac
import json
import time
import urllib.error
import urllib.parse
import urllib.request
from typing import Any, Dict, List, Optional, Sequence

try:
    import requests as _requests_lib  # type: ignore
except ImportError:  # pragma: no cover
    _requests_lib = None


class MessagingApiError(Exception):
    """Raised when the Messaging Platform API returns a non-2xx response."""

    def __init__(self, message: str, status_code: int, response_body: Any = None) -> None:
        super().__init__(message)
        self.status_code = status_code
        self.response_body = response_body


class MessagingPlatformClient:
    """B2B client for Enterprise Messaging Platform REST API."""

    def __init__(
        self,
        base_url: str,
        *,
        api_key: Optional[str] = None,
        bearer_token: Optional[str] = None,
        tenant_id: str = "default",
        timeout_seconds: float = 10.0,
        max_retries: int = 3,
        retry_base_delay: float = 0.3,
        use_requests_if_available: bool = True,
    ) -> None:
        if not base_url:
            raise ValueError("base_url is required")
        self.base_url = base_url.rstrip("/")
        self.api_key = api_key
        self.bearer_token = bearer_token
        self.tenant_id = tenant_id
        self.timeout_seconds = timeout_seconds
        self.max_retries = max_retries
        self.retry_base_delay = retry_base_delay
        self._session_cookie: Optional[str] = None
        self._requests_session = (
            _requests_lib.Session() if (use_requests_if_available and _requests_lib is not None) else None
        )

    # ── 1. Authentication ──────────────────────────────────────────

    def login(self, username: str, password: str) -> Dict[str, Any]:
        """Authenticate via portal session (`POST /auth/login`) and store JSESSIONID cookie."""
        status, headers, body = self._raw_request("POST", "/auth/login", {"username": username, "password": password})
        set_cookie = headers.get("set-cookie", "")
        if "JSESSIONID=" in set_cookie:
            for part in set_cookie.split(";"):
                part = part.strip()
                if part.startswith("JSESSIONID="):
                    self._session_cookie = part
                    break
        if status < 200 or status >= 300:
            msg = body.get("message") if isinstance(body, dict) else f"Login failed (HTTP {status})"
            raise MessagingApiError(str(msg), status, body)
        return body

    def get_current_user(self) -> Dict[str, Any]:
        """Return currently authenticated user info (`GET /auth/me`)."""
        return self._request("GET", "/auth/me")

    def logout(self) -> Dict[str, Any]:
        """Invalidate current session (`POST /auth/logout`)."""
        result = self._request("POST", "/auth/logout")
        self._session_cookie = None
        return result

    # ── 2. Single / Bulk Dispatch ──────────────────────────────────

    def get_quota(self, workspace_id: Optional[str] = None) -> Dict[str, Any]:
        """Query remaining daily quota (`GET /campaign/simple/quota`)."""
        ws = urllib.parse.quote(workspace_id or self.tenant_id)
        return self._request("GET", f"/campaign/simple/quota?workspaceId={ws}")

    def send_simple_campaign(
        self,
        *,
        store_name: str,
        content: str,
        recipients: Sequence[str],
        channel_type: str = "KAKAO",
        subject: Optional[str] = None,
        workspace_id: Optional[str] = None,
        failover_enabled: bool = True,
        failover_content: Optional[str] = None,
        opt_out_number: Optional[str] = None,
        country_code: str = "KR",
        scheduled_at: Optional[str] = None,
        night_consent_obtained: bool = False,
    ) -> Dict[str, Any]:
        """Dispatch single or bulk 3-Click campaign (`POST /campaign/simple/send`)."""
        payload: Dict[str, Any] = {
            "workspaceId": workspace_id or self.tenant_id,
            "storeName": store_name,
            "subject": subject,
            "content": content,
            "channelType": channel_type,
            "recipients": list(recipients),
            "failoverEnabled": failover_enabled,
            "failoverContent": failover_content,
            "optOutNumber": opt_out_number,
            "countryCode": country_code,
            "scheduledAt": scheduled_at,
            "nightConsentObtained": night_consent_obtained,
        }
        return self._request("POST", "/campaign/simple/send", payload)

    def ingest_encrypted_batch(
        self,
        *,
        items: Sequence[Dict[str, Any]],
        tenant_id: Optional[str] = None,
        batch_id: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Ingest on-premise KMS-encrypted recipient batch (`POST /api/v1/relay/ingest-target`)."""
        payload: Dict[str, Any] = {
            "tenantId": tenant_id or self.tenant_id,
            "batchId": batch_id,
            "items": list(items),
        }
        return self._request("POST", "/api/v1/relay/ingest-target", payload)

    # ── 3. AI A/B Copywriting ──────────────────────────────────────

    def generate_ab_copy_variants(
        self,
        *,
        store_name: str,
        product_name: str,
        core_benefit: str,
        industry: str = "RETAIL",
        target_audience: Optional[str] = None,
        objective: str = "SALE",
        preferred_channel: str = "KAKAO_FRIEND",
        unsubscribe_number: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Generate 5-persona marketing A/B copy variants (`POST /api/v1/ai/copywriting/ab-variants`)."""
        payload: Dict[str, Any] = {
            "storeName": store_name,
            "industry": industry,
            "productName": product_name,
            "coreBenefit": core_benefit,
            "targetAudience": target_audience,
            "objective": objective,
            "preferredChannel": preferred_channel,
            "unsubscribeNumber": unsubscribe_number,
        }
        return self._request("POST", "/api/v1/ai/copywriting/ab-variants", payload)

    # ── 4. Telecom MNP Lookup & Cleansing ──────────────────────────

    def lookup_mnp(
        self,
        phone_number: str,
        *,
        carrier: Optional[str] = None,
        tenant_id: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Single phone MNP & subscriber validity lookup (`POST /api/v1/compliance/mnp/lookup`)."""
        payload: Dict[str, Any] = {
            "phoneNumber": phone_number,
            "tenantId": tenant_id or self.tenant_id,
            "carrier": carrier,
        }
        return self._request("POST", "/api/v1/compliance/mnp/lookup", payload)

    def cleanse_mnp(
        self,
        phone_numbers: Sequence[str],
        *,
        remove_duplicates: bool = True,
        cost_per_sms: float = 20.0,
        tenant_id: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Bulk phone number cleansing & cost-savings estimation (`POST /api/v1/compliance/mnp/cleanse`)."""
        payload: Dict[str, Any] = {
            "phoneNumbers": list(phone_numbers),
            "removeDuplicates": remove_duplicates,
            "costPerSms": cost_per_sms,
            "tenantId": tenant_id or self.tenant_id,
        }
        return self._request("POST", "/api/v1/compliance/mnp/cleanse", payload)

    # ── 5. 080 Opt-Out Synchronization ─────────────────────────────

    def register_opt_out(
        self,
        receiver_id: str,
        *,
        opt_out_number: str = "080-880-9999",
        reason: str = "080 ARS 수신거부 등록",
    ) -> Dict[str, Any]:
        """Register single 080 opt-out number (`POST /compliance/opt-out`)."""
        return self._request(
            "POST",
            "/compliance/opt-out",
            {"receiverId": receiver_id, "optOutNumber": opt_out_number, "reason": reason},
        )

    def submit_ars_rejection(
        self,
        phone_number: str,
        *,
        ars_vendor: str = "SEJONG_080",
        webhook_secret: Optional[str] = None,
        reason: str = "USER_VOICE_CALL_REJECT",
        reject_date_time: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Forward 080 ARS carrier rejection event (`POST /api/v1/webhooks/080-ars/reject`)."""
        payload = {
            "phoneNumber": phone_number,
            "arsVendor": ars_vendor,
            "webhookSecret": webhook_secret,
            "reason": reason,
            "rejectDateTime": reject_date_time,
        }
        return self._request("POST", "/api/v1/webhooks/080-ars/reject", payload)

    def check_ars_opt_out(self, phone_number: str) -> Dict[str, Any]:
        """Check whether phone number is blacklisted (`POST /api/v1/compliance/ars-sync/check`)."""
        q = urllib.parse.quote(phone_number)
        return self._request("POST", f"/api/v1/compliance/ars-sync/check?phoneNumber={q}")

    def sync_bulk_opt_out(self, phone_numbers: Sequence[str]) -> Dict[str, Any]:
        """Bulk sync 080 opt-out numbers (`POST /api/v1/compliance/ars-sync/sync-bulk`)."""
        return self._request("POST", "/api/v1/compliance/ars-sync/sync-bulk", list(phone_numbers))

    # ── 6. Webhook HMAC-SHA256 Signature Verification ──────────────

    @staticmethod
    def compute_webhook_signature(secret_key: str, timestamp_ms: int, raw_payload: str) -> str:
        """Compute `sha256=<hex>` matching `TenantWebhookService.calculateSignature`."""
        data_to_sign = f"{timestamp_ms}.{raw_payload}".encode("utf-8")
        digest = hmac.new(secret_key.encode("utf-8"), data_to_sign, hashlib.sha256).hexdigest()
        return f"sha256={digest}"

    @staticmethod
    def verify_webhook_signature(
        secret_key: str,
        raw_payload: str,
        timestamp_ms: int | str,
        signature: str,
        tolerance_ms: int = 300_000,
    ) -> bool:
        """Verify incoming `X-Webhook-Signature` with constant-time compare & replay window check."""
        if not secret_key or not signature or not signature.startswith("sha256="):
            return False
        try:
            ts_int = int(timestamp_ms)
        except (TypeError, ValueError):
            return False
        if tolerance_ms > 0 and abs(int(time.time() * 1000) - ts_int) > tolerance_ms:
            return False
        expected = MessagingPlatformClient.compute_webhook_signature(secret_key, ts_int, raw_payload)
        return hmac.compare_digest(expected, signature)

    # ── Internal HTTP & Exponential Backoff Retry ──────────────────

    def _build_headers(self) -> Dict[str, str]:
        headers: Dict[str, str] = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Tenant-Id": self.tenant_id,
        }
        if self.bearer_token:
            headers["Authorization"] = f"Bearer {self.bearer_token}"
        if self.api_key:
            headers["X-API-Key"] = self.api_key
        if self._session_cookie:
            headers["Cookie"] = self._session_cookie
        return headers

    def _request(self, method: str, path: str, body: Any = None) -> Dict[str, Any]:
        last_exc: Optional[Exception] = None
        for attempt in range(self.max_retries + 1):
            try:
                status, headers, parsed = self._raw_request(method, path, body)
                if 200 <= status < 300:
                    return parsed if isinstance(parsed, dict) else {"success": True, "data": parsed}

                retryable = status == 429 or status >= 500
                if retryable and attempt < self.max_retries:
                    retry_after = headers.get("retry-after")
                    delay = (
                        max(float(retry_after), self.retry_base_delay)
                        if retry_after and retry_after.replace(".", "", 1).isdigit()
                        else self.retry_base_delay * (2**attempt)
                    )
                    time.sleep(delay)
                    continue

                msg = parsed.get("message") if isinstance(parsed, dict) else f"HTTP {status}"
                raise MessagingApiError(str(msg), status, parsed)
            except MessagingApiError as err:
                if err.status_code < 500 and err.status_code != 429:
                    raise
                last_exc = err
                if attempt < self.max_retries:
                    time.sleep(self.retry_base_delay * (2**attempt))
            except Exception as err:
                last_exc = err
                if attempt < self.max_retries:
                    time.sleep(self.retry_base_delay * (2**attempt))

        assert last_exc is not None
        raise last_exc

    def _raw_request(self, method: str, path: str, body: Any = None) -> tuple[int, Dict[str, str], Any]:
        url = f"{self.base_url}{path}"
        headers = self._build_headers()
        data_bytes = json.dumps(body).encode("utf-8") if body is not None else None

        if self._requests_session is not None:
            resp = self._requests_session.request(
                method=method,
                url=url,
                headers=headers,
                data=data_bytes,
                timeout=self.timeout_seconds,
            )
            resp_headers = {k.lower(): v for k, v in resp.headers.items()}
            return resp.status_code, resp_headers, self._safe_json(resp.text)

        req = urllib.request.Request(url=url, data=data_bytes, headers=headers, method=method)
        try:
            with urllib.request.urlopen(req, timeout=self.timeout_seconds) as resp:
                resp_headers = {k.lower(): v for k, v in resp.headers.items()}
                raw = resp.read().decode("utf-8")
                return resp.status, resp_headers, self._safe_json(raw)
        except urllib.error.HTTPError as http_err:
            resp_headers = {k.lower(): v for k, v in http_err.headers.items()} if http_err.headers else {}
            raw = http_err.read().decode("utf-8", errors="replace")
            return http_err.code, resp_headers, self._safe_json(raw)

    @staticmethod
    def _safe_json(raw: str) -> Any:
        if not raw:
            return None
        try:
            return json.loads(raw)
        except json.JSONDecodeError:
            return raw


if __name__ == "__main__":
    # Quick local usage example (requires messaging-backend running on localhost:8080)
    client = MessagingPlatformClient(
        base_url="http://localhost:8080",
        api_key="demo-b2b-api-key",
        tenant_id="tenant-001",
    )

    # 1. Verify an incoming DLR webhook signature locally (no network call)
    sample_secret = "sec_wh_demo_secret"
    sample_ts = int(time.time() * 1000)
    sample_payload = '{"event":"DELIVERED","messageId":"MSG-001"}'
    sig = MessagingPlatformClient.compute_webhook_signature(sample_secret, sample_ts, sample_payload)
    valid = MessagingPlatformClient.verify_webhook_signature(sample_secret, sample_payload, sample_ts, sig)
    print(f"Webhook signature valid: {valid} ({sig[:24]}...)")
