#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
==============================================================================
 🧪 엔터프라이즈 멀티채널 메시징 플랫폼 — 실배포 라이브 E2E 테스트 스위트
 Live End-to-End Functional & Integration Verification Suite
==============================================================================
"""

import sys
import json
import time
import urllib.request
import urllib.error

# 콘솔 UTF-8 출력 강제
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

BASE_URL = "http://localhost:8000"

def http_get(path, headers=None):
    url = f"{BASE_URL}{path}"
    h = {"User-Agent": "E2E-Live-Tester"}
    if headers:
        h.update(headers)
    req = urllib.request.Request(url, headers=h, method="GET")
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = resp.read().decode('utf-8', errors='replace')
            try:
                return resp.status, json.loads(data)
            except Exception:
                return resp.status, data
    except urllib.error.HTTPError as e:
        data = e.read().decode('utf-8', errors='replace')
        try:
            return e.code, json.loads(data)
        except Exception:
            return e.code, data
    except Exception as e:
        return 0, str(e)

def http_post(path, body_dict, headers=None):
    url = f"{BASE_URL}{path}"
    payload = json.dumps(body_dict).encode('utf-8')
    h = {
        "User-Agent": "E2E-Live-Tester",
        "Content-Type": "application/json"
    }
    if headers:
        h.update(headers)
    req = urllib.request.Request(url, data=payload, headers=h, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = resp.read().decode('utf-8', errors='replace')
            try:
                return resp.status, json.loads(data)
            except Exception:
                return resp.status, data
    except urllib.error.HTTPError as e:
        data = e.read().decode('utf-8', errors='replace')
        try:
            return e.code, json.loads(data)
        except Exception:
            return e.code, data
    except Exception as e:
        return 0, str(e)

def test_section(title):
    print("\n" + "=" * 76)
    print(f" 🔍 {title}")
    print("=" * 76)

def assert_pass(condition, message):
    if condition:
        print(f"  ✅ [PASS] {message}")
        return True
    else:
        print(f"  ❌ [FAIL] {message}")
        return False

def main():
    print("=" * 76)
    print(" 🚀 Enterprise Messaging Platform — Live Production E2E Verification")
    print(f"    Gateway Target: {BASE_URL}")
    print(f"    Timestamp:      {time.strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 76)

    total_tests = 0
    passed_tests = 0

    # ──────────────────────────────────────────────────────────────────────────
    # [Test Suite 1] 인프라 분산 라우팅 및 헬스체크
    # ──────────────────────────────────────────────────────────────────────────
    test_section("Suite 1: Ingress Gateway & 5-VM Infrastructure Routing")

    total_tests += 1
    st, res = http_get("/health")
    if assert_pass(st == 200 and "OK" in str(res), f"Ingress Gateway Health (/health) -> HTTP {st} (OK)"):
        passed_tests += 1

    total_tests += 1
    st, res = http_get("/api/actuator/health")
    backend_up = st == 200 and isinstance(res, dict) and res.get("status") == "UP"
    if assert_pass(backend_up, f"VM-4 Backend Core Engine (/api/actuator/health) -> HTTP {st} (status: UP)"):
        passed_tests += 1

    total_tests += 1
    st, res = http_get("/")
    frontend_ok = st == 200 and len(str(res)) > 1000
    if assert_pass(frontend_ok, f"VM-4 Frontend Portal UI (/) -> HTTP {st} (HTML size: {len(str(res))} bytes)"):
        passed_tests += 1

    total_tests += 1
    st, res = http_get("/simple")
    if assert_pass(st == 200, f"VM-4 Frontend 3-Click Simple Page (/simple) -> HTTP {st} OK"):
        passed_tests += 1

    total_tests += 1
    st, res = http_get("/admin/rbac")
    if assert_pass(st == 200, f"VM-4 Frontend RBAC Management Page (/admin/rbac) -> HTTP {st} OK"):
        passed_tests += 1

    # ──────────────────────────────────────────────────────────────────────────
    # [Test Suite 2] RBAC 권한 및 계정 거버넌스 API
    # ──────────────────────────────────────────────────────────────────────────
    test_section("Suite 2: Multi-tenant RBAC Governance & Permission Hierarchy")

    total_tests += 1
    st, res = http_get("/api/v1/rbac/permissions")
    perms = res.get("data", []) if isinstance(res, dict) else []
    perm_count = len(perms)
    if assert_pass(st == 200 and perm_count >= 5, f"RBAC Detail Function Permissions -> HTTP {st} ({perm_count} registered permissions)"):
        passed_tests += 1
        sample_codes = [p.get("permissionCode") for p in perms[:4]]
        print(f"       Sample Permissions: {sample_codes}")

    total_tests += 1
    st, res = http_get("/api/v1/rbac/bundles")
    bundles = res.get("data", []) if isinstance(res, dict) else []
    if assert_pass(st == 200 and len(bundles) >= 1, f"RBAC Permission Bundles -> HTTP {st} ({len(bundles)} bundles available)"):
        passed_tests += 1
        for b in bundles[:3]:
            print(f"       - Bundle: {b.get('bundleName')} (Type: {b.get('bundleType')}, Items: {len(b.get('permissions', []))})")

    total_tests += 1
    st, res = http_get("/api/v1/rbac/groups")
    groups = res.get("data", []) if isinstance(res, dict) else []
    if assert_pass(st == 200 and len(groups) >= 1, f"RBAC Tenant Groups & Quotas -> HTTP {st} ({len(groups)} groups configured)"):
        passed_tests += 1
        for g in groups[:2]:
            print(f"       - Group '{g.get('groupName')}': Daily Quota={g.get('dailyQuota')}, Monthly Quota={g.get('monthlyQuota')}")

    # ──────────────────────────────────────────────────────────────────────────
    # [Test Suite 3] AI 규정 준수 린터 (제50조 사전 검증 & Auto-Fix)
    # ──────────────────────────────────────────────────────────────────────────
    test_section("Suite 3: AI Compliance Linter & 1-Click Auto-Fix Engine")

    # 1) 위반 광고 문구 검사 (광고 표기 및 080 번호 누락)
    violation_payload = {
        "content": "신메뉴 출시! 지금 주문하시면 30% 할인 혜택을 드립니다. https://store.com/deal",
        "storeName": "맛있는피자",
        "optOutNumber": "080-888-9999",
        "channelType": "SMS",
        "countryCode": "KR"
    }
    total_tests += 1
    st, res = http_post("/api/compliance/check", violation_payload)
    comp_data = res.get("data", {}) if isinstance(res, dict) else {}
    is_invalid = comp_data.get("valid") is False
    violations = comp_data.get("violations", [])
    if assert_pass(st == 200 and is_invalid, f"AI Compliance Violation Detection -> Score: {comp_data.get('score')}, Detected {len(violations)} issues"):
        passed_tests += 1
        for v in violations:
            print(f"       ⚠️ Rule Violation: {v.get('ruleId')} - {v.get('message')}")

    # 2) 1-Click Auto-Fix 교정
    total_tests += 1
    st, res = http_post("/api/compliance/auto-fix", violation_payload)
    fix_data = res.get("data", {}) if isinstance(res, dict) else {}
    fixed_content = fix_data.get("fixedContent", "")
    has_ad_tag = "(광고)" in fixed_content
    has_optout = "080-888-9999" in fixed_content
    if assert_pass(st == 200 and has_ad_tag and has_optout, "1-Click Auto-Fix Execution -> (광고) and 무료수신거부 appended successfully"):
        passed_tests += 1
        print(f"       Original: {violation_payload['content']}")
        print(f"       Fixed:    {fixed_content}")

    # ──────────────────────────────────────────────────────────────────────────
    # [Test Suite 4] 3-Click 간편 발송 및 쿼터 차감 파이프라인
    # ──────────────────────────────────────────────────────────────────────────
    test_section("Suite 4: 3-Click One-Stop Campaign & Quota Lifecycle")

    total_tests += 1
    st, res = http_get("/api/campaign/simple/quota")
    quota_data = res.get("data", {}) if isinstance(res, dict) else {}
    initial_remaining = quota_data.get("remainingToday", 0)
    if assert_pass(st == 200 and initial_remaining >= 0, f"SOHO Quota Status -> Daily Remaining: {initial_remaining}/{quota_data.get('dailyLimit')}"):
        passed_tests += 1

    # 3-Click 규정 통과 안심 발송 요청
    send_payload = {
        "workspaceId": "DEFAULT",
        "content": "(광고) [맛있는피자] 봄맞이 전메뉴 20% 할인 쿠폰 발급! 무료수신거부: 080-888-9999",
        "storeName": "맛있는피자",
        "optOutNumber": "080-888-9999",
        "channelType": "SMS",
        "recipients": ["010-1234-5678", "010-9876-5432"],
        "failoverEnabled": True,
        "nightConsentObtained": False
    }
    total_tests += 1
    st, res = http_post("/api/campaign/simple/send", send_payload)
    send_data = res.get("data", {}) if isinstance(res, dict) else {}
    campaign_id = send_data.get("campaignId")
    dispatch_ok = st == 200 and send_data.get("status") == "COMPLETED" and campaign_id is not None
    if assert_pass(dispatch_ok, f"3-Click Campaign Dispatched -> Campaign ID: {campaign_id}, Dispatched: {send_data.get('totalRecipients')} msgs"):
        passed_tests += 1
        print(f"       Pipeline Message: {send_data.get('message')}")
        print(f"       Compliance Score: {send_data.get('complianceScore')}, Failover Active: {send_data.get('failoverEnabled')}")

    # ──────────────────────────────────────────────────────────────────────────
    # [Test Suite 5] 마케팅 단축 URL 및 실시간 CTR 클릭 트래킹
    # ──────────────────────────────────────────────────────────────────────────
    test_section("Suite 5: Short URL Generator, 302 Redirection & Real-time CTR Tracking")

    short_req = {
        "originalUrl": "https://company.com/events/spring-sale-2026?utm_source=sms",
        "tenantId": "TENANT_E2E",
        "campaignId": campaign_id or "CAMP-TEST-001",
        "customAlias": f"spring-{int(time.time()) % 10000}"
    }
    total_tests += 1
    st, res = http_post("/api/v1/short-url/create", short_req)
    short_data = res.get("data", {}) if isinstance(res, dict) else {}
    short_code = short_data.get("shortCode")
    if assert_pass(st == 200 and short_code is not None, f"Short URL Creation -> Code: {short_code}, ShortUrl: {short_data.get('shortUrl')}"):
        passed_tests += 1

    # 302 리다이렉트 클릭 시뮬레이션
    total_tests += 1
    redirect_url = f"{BASE_URL}/api/s/{short_code}?uid=01012345678"
    req = urllib.request.Request(redirect_url, headers={"User-Agent": "Mozilla/5.0 (iPhone; Mobile)"})
    # redirect 방지 핸들러
    class NoRedirect(urllib.request.HTTPRedirectHandler):
        def redirect_request(self, req, fp, code, msg, headers, newurl):
            return None

    opener = urllib.request.build_opener(NoRedirect)
    try:
        resp = opener.open(req)
        redir_code = resp.status
        loc = resp.headers.get("Location")
    except urllib.error.HTTPError as e:
        redir_code = e.code
        loc = e.headers.get("Location")
    except Exception as e:
        redir_code = 0
        loc = str(e)

    if assert_pass(redir_code in (301, 302, 307) and "spring-sale-2026" in str(loc), f"302 Click Tracking Redirection -> Code: {redir_code}, Target Location: {loc}"):
        passed_tests += 1

    # 실시간 CTR 통계 조회
    total_tests += 1
    st, res = http_get(f"/api/v1/short-url/stats/{campaign_id or 'CAMP-TEST-001'}?totalSent=100")
    ctr_data = res.get("data", {}) if isinstance(res, dict) else {}
    clicks = ctr_data.get("totalClicks", 0)
    if assert_pass(st == 200 and clicks >= 1, f"Real-time CTR Analytics -> Total Clicks: {clicks}, CTR Rate: {ctr_data.get('ctr')}%"):
        passed_tests += 1

    # ──────────────────────────────────────────────────────────────────────────
    # [Test Suite 6] 실시간 트래픽 관제 콘솔 & 모니터링 API
    # ──────────────────────────────────────────────────────────────────────────
    test_section("Suite 6: Live Traffic Monitoring & Throttling Backpressure Control")

    total_tests += 1
    st, res = http_get("/api/v1/throttling/status")
    th_data = res.get("data", {}) if isinstance(res, dict) else {}
    if assert_pass(st == 200 and "throttleRate" in th_data, f"Throttling Status -> Rate: {th_data.get('throttleRate')}%, Paused: {th_data.get('isPaused')}"):
        passed_tests += 1

    total_tests += 1
    st, res = http_get("/api/v1/monitoring/snapshot")
    mon_data = res.get("data", {}) if isinstance(res, dict) else {}
    if assert_pass(st == 200 and "totalTps" in mon_data, f"Live Traffic Snapshot -> TPS: {mon_data.get('totalTps')}, Success Rate: {mon_data.get('successRate')}%, Active Campaigns: {mon_data.get('activeBulkCampaignCount')}"):
        passed_tests += 1

    # ──────────────────────────────────────────────────────────────────────────
    # [Test Summary] 종합 결과 평가
    # ──────────────────────────────────────────────────────────────────────────
    print("\n" + "=" * 76)
    print(f" 📊 Live E2E Verification Complete: {passed_tests}/{total_tests} Tests Passed ({(passed_tests/total_tests)*100:.1f}%)")
    print("=" * 76)

    if passed_tests == total_tests:
        print(" 🎉 ALL E2E LIVE PIPELINES ARE 100% OPERATIONAL & VERIFIED!")
        return 0
    else:
        print(f" ⚠️ {total_tests - passed_tests} test(s) encountered issues.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
