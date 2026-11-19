/**
 * Enterprise Messaging Platform — Official Zero-Dependency TypeScript B2B SDK
 *
 * Runtime: Node.js 18+ / Deno / Bun / Modern Browsers (Fetch API + Web Crypto API)
 * Backend Contract: messaging-backend REST API (v1.0.0)
 *
 * Supported capabilities:
 *  - Authentication (Bearer JWT, X-API-Key, Session Cookie login)
 *  - Simple 3-Click Single/Bulk Campaign Dispatch & Quota Lookup
 *  - B2B Encrypted Relay Batch Ingestion (Strict Plaintext Egress Guard)
 *  - Generative AI 5-Persona A/B Copywriting Variants
 *  - Telecom MNP Lookup & Bulk Number Cleansing
 *  - 080 ARS Opt-Out Registration, Verification & Bulk Synchronization
 *  - Webhook HMAC-SHA256 Signature Verification (Replay-Protected)
 *  - Automatic Exponential Backoff Retry on HTTP 429 & 5xx
 */

// ─────────────────────────── Core Types ───────────────────────────

export interface MessagingClientOptions {
  /** Base URL of messaging-backend (e.g., "https://api.messaging-portal.com") */
  baseUrl: string;
  /** Optional B2B API Key sent via X-API-Key header */
  apiKey?: string;
  /** Optional Bearer JWT token sent via Authorization header */
  bearerToken?: string;
  /** Multi-tenant identifier sent via X-Tenant-Id header */
  tenantId?: string;
  /** Request timeout in milliseconds (default: 10000) */
  timeoutMs?: number;
  /** Maximum retry attempts on 429 / 5xx / network errors (default: 3) */
  maxRetries?: number;
  /** Base backoff delay in milliseconds (default: 300) */
  retryBaseDelayMs?: number;
  /** Optional custom fetch implementation */
  fetchImpl?: typeof fetch;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AuthRequest {
  username: string;
  password: string;
}

export interface SimpleCampaignSendRequest {
  workspaceId?: string;
  storeName: string;
  subject?: string;
  content: string;
  channelType: "KAKAO" | "MS" | string;
  recipients: string[];
  failoverEnabled?: boolean;
  failoverContent?: string;
  optOutNumber?: string;
  /** ISO 3166-1 alpha-2 country code (default: "KR") */
  countryCode?: string;
  /** ISO-8601 UTC timestamp for scheduled dispatch */
  scheduledAt?: string;
  nightConsentObtained?: boolean;
}

export interface SimpleCampaignSendResponse {
  campaignId: string;
  totalRecipients: number;
  blockedRecipients: number;
  remainingQuotaToday: number;
  complianceScore: number;
  failoverEnabled: boolean;
  status: string;
  message: string;
  dispatchedAt: string;
}

export interface QuotaInfoDto {
  planName: string;
  dailyQuota: number;
  usedToday: number;
  remainingToday: number;
  usagePercent: number;
}

export interface EncryptedTargetItem {
  rawId: string;
  /** Must match "ENC_{tenantId}~..." format under Strict Plaintext Egress Guard */
  recipient: string;
  parameters?: Record<string, unknown>;
}

export interface RelayIngestRequest {
  tenantId: string;
  batchId?: string;
  items: EncryptedTargetItem[];
}

export interface RelayIngestResponse {
  tenantId: string;
  batchId: string;
  receivedCount: number;
  status: string;
  message: string;
  timestamp: number;
}

export interface AiAbCopyVariantsRequest {
  storeName: string;
  industry?: string;
  productName: string;
  coreBenefit: string;
  targetAudience?: string;
  objective?: "NEW_PRODUCT" | "SALE" | "REVISIT" | "EVENT" | string;
  preferredChannel?: "KAKAO_ALIMTALK" | "KAKAO_FRIEND" | "LMS" | "SMS" | "EMAIL" | string;
  unsubscribeNumber?: string;
}

export interface CopyVariantDto {
  variantId: string;
  personaCode: string;
  personaName: string;
  title: string;
  body: string;
  ctaButton: string;
  predictedCtr: number;
  unsubscribeRisk: string;
  recommendedChannel: string;
  recommendedWeight: number;
  tags: string[];
}

export interface AiAbCopyVariantsResponse {
  requestSummary: string;
  engineModel: string;
  timestamp: number;
  variants: CopyVariantDto[];
}

export interface MnpLookupRequest {
  phoneNumber: string;
  tenantId?: string;
  carrier?: "SKT" | "KT" | "LGU+" | string;
}

export interface MnpLookupResponse {
  originalNumber: string;
  cleansedNumber: string | null;
  unhyphenatedNumber: string | null;
  status: string;
  carrier: string | null;
  originalCarrier: string | null;
  ported: boolean;
  valid: boolean;
  remarks: string;
  lookupTimestamp: string;
}

export interface MnpCleanseRequest {
  phoneNumbers: string[];
  removeDuplicates?: boolean;
  costPerSms?: number;
  tenantId?: string;
}

export interface MnpCleanseResponse {
  totalCount: number;
  processedCount: number;
  validCount: number;
  invalidCount: number;
  duplicateCount: number;
  validNumbers: string[];
  excludedDetails: Array<Record<string, unknown>>;
  estimatedCostSavings: number;
  carrierDistribution: Record<string, number>;
  processedAt: string;
}

export interface ArsWebhookPayload {
  phoneNumber: string;
  rejectDateTime?: string;
  arsVendor?: string;
  webhookSecret?: string;
  reason?: string;
}

export interface OptOutRegisterRequest {
  receiverId: string;
  optOutNumber?: string;
  reason?: string;
}

export class MessagingApiError extends Error {
  readonly statusCode: number;
  readonly responseBody: unknown;

  constructor(message: string, statusCode: number, responseBody?: unknown) {
    super(message);
    this.name = "MessagingApiError";
    this.statusCode = statusCode;
    this.responseBody = responseBody;
  }
}

// ─────────────────────────── SDK Client ───────────────────────────

export class MessagingPlatformClient {
  private readonly baseUrl: string;
  private apiKey?: string;
  private bearerToken?: string;
  private sessionCookie?: string;
  private tenantId: string;
  private readonly timeoutMs: number;
  private readonly maxRetries: number;
  private readonly retryBaseDelayMs: number;
  private readonly fetchFn: typeof fetch;

  constructor(options: MessagingClientOptions) {
    if (!options.baseUrl) {
      throw new Error("baseUrl is required");
    }
    this.baseUrl = options.baseUrl.replace(/\/+$/, "");
    this.apiKey = options.apiKey;
    this.bearerToken = options.bearerToken;
    this.tenantId = options.tenantId ?? "default";
    this.timeoutMs = options.timeoutMs ?? 10_000;
    this.maxRetries = options.maxRetries ?? 3;
    this.retryBaseDelayMs = options.retryBaseDelayMs ?? 300;
    this.fetchFn = options.fetchImpl ?? globalThis.fetch.bind(globalThis);
  }

  setTenantId(tenantId: string): void {
    this.tenantId = tenantId;
  }

  setBearerToken(token: string): void {
    this.bearerToken = token;
  }

  setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  // ── 1. Authentication ──────────────────────────────────────────

  /**
   * Portal session login (`POST /auth/login`). Captures JSESSIONID cookie automatically.
   */
  async login(credentials: AuthRequest): Promise<ApiResponse<Record<string, unknown>>> {
    const url = `${this.baseUrl}/auth/login`;
    const response = await this.fetchWithTimeout(url, {
      method: "POST",
      headers: this.buildHeaders(),
      body: JSON.stringify(credentials),
    });

    const setCookie = response.headers.get("set-cookie");
    if (setCookie) {
      const match = setCookie.match(/JSESSIONID=[^;]+/);
      if (match) {
        this.sessionCookie = match[0];
      }
    }

    const body = (await this.safeJson(response)) as ApiResponse<Record<string, unknown>>;
    if (!response.ok) {
      throw new MessagingApiError(body?.message ?? `Login failed (HTTP ${response.status})`, response.status, body);
    }
    return body;
  }

  /** Current authenticated user profile (`GET /auth/me`). */
  async getCurrentUser(): Promise<ApiResponse<Record<string, unknown>>> {
    return this.request<ApiResponse<Record<string, unknown>>>("GET", "/auth/me");
  }

  /** Invalidate current session (`POST /auth/logout`). */
  async logout(): Promise<ApiResponse<null>> {
    const res = await this.request<ApiResponse<null>>("POST", "/auth/logout");
    this.sessionCookie = undefined;
    return res;
  }

  // ── 2. Single / Bulk Dispatch ──────────────────────────────────

  /** Query remaining daily quota (`GET /campaign/simple/quota`). */
  async getQuota(workspaceId?: string): Promise<ApiResponse<QuotaInfoDto>> {
    const ws = encodeURIComponent(workspaceId ?? this.tenantId);
    return this.request<ApiResponse<QuotaInfoDto>>("GET", `/campaign/simple/quota?workspaceId=${ws}`);
  }

  /**
   * Send single or bulk 3-Click campaign (`POST /campaign/simple/send`).
   * Automatically enforces 080 opt-out filtering, Article 50 compliance linting, and quota checks.
   */
  async sendSimpleCampaign(req: SimpleCampaignSendRequest): Promise<ApiResponse<SimpleCampaignSendResponse>> {
    const payload: SimpleCampaignSendRequest = {
      workspaceId: this.tenantId,
      ...req,
    };
    return this.request<ApiResponse<SimpleCampaignSendResponse>>("POST", "/campaign/simple/send", payload);
  }

  /**
   * Ingest on-premise KMS-encrypted recipient batch (`POST /api/v1/relay/ingest-target`).
   * Rejects any plaintext email/phone or cross-tenant prefix with HTTP 400.
   */
  async ingestEncryptedBatch(req: RelayIngestRequest): Promise<ApiResponse<RelayIngestResponse>> {
    return this.request<ApiResponse<RelayIngestResponse>>("POST", "/api/v1/relay/ingest-target", req);
  }

  // ── 3. AI A/B Copywriting ──────────────────────────────────────

  /** Generate 5-persona marketing A/B copy variants (`POST /api/v1/ai/copywriting/ab-variants`). */
  async generateAbCopyVariants(req: AiAbCopyVariantsRequest): Promise<ApiResponse<AiAbCopyVariantsResponse>> {
    return this.request<ApiResponse<AiAbCopyVariantsResponse>>("POST", "/api/v1/ai/copywriting/ab-variants", req);
  }

  // ── 4. Telecom MNP Lookup & Cleansing ──────────────────────────

  /** Real-time single phone MNP & subscriber lookup (`POST /api/v1/compliance/mnp/lookup`). */
  async lookupMnp(req: MnpLookupRequest): Promise<ApiResponse<MnpLookupResponse>> {
    return this.request<ApiResponse<MnpLookupResponse>>("POST", "/api/v1/compliance/mnp/lookup", {
      tenantId: this.tenantId,
      ...req,
    });
  }

  /** Bulk phone list cleansing & cost-savings estimation (`POST /api/v1/compliance/mnp/cleanse`). */
  async cleanseMnp(req: MnpCleanseRequest): Promise<ApiResponse<MnpCleanseResponse>> {
    return this.request<ApiResponse<MnpCleanseResponse>>("POST", "/api/v1/compliance/mnp/cleanse", {
      tenantId: this.tenantId,
      removeDuplicates: true,
      ...req,
    });
  }

  // ── 5. 080 Opt-Out Synchronization ─────────────────────────────

  /** Register a single 080 opt-out number (`POST /compliance/opt-out`). */
  async registerOptOut(req: OptOutRegisterRequest): Promise<ApiResponse<string>> {
    return this.request<ApiResponse<string>>("POST", "/compliance/opt-out", req);
  }

  /** Submit 080 ARS carrier rejection webhook (`POST /api/v1/webhooks/080-ars/reject`). */
  async submitArsRejection(payload: ArsWebhookPayload): Promise<ApiResponse<Record<string, unknown>>> {
    return this.request<ApiResponse<Record<string, unknown>>>("POST", "/api/v1/webhooks/080-ars/reject", payload);
  }

  /** Check whether a phone number is registered on 080 opt-out (`POST /api/v1/compliance/ars-sync/check`). */
  async checkArsOptOut(phoneNumber: string): Promise<ApiResponse<Record<string, unknown>>> {
    const q = encodeURIComponent(phoneNumber);
    return this.request<ApiResponse<Record<string, unknown>>>("POST", `/api/v1/compliance/ars-sync/check?phoneNumber=${q}`);
  }

  /** Bulk synchronize 080 ARS opt-out phone numbers (`POST /api/v1/compliance/ars-sync/sync-bulk`). */
  async syncBulkOptOut(phoneNumbers: string[]): Promise<ApiResponse<Record<string, unknown>>> {
    return this.request<ApiResponse<Record<string, unknown>>>("POST", "/api/v1/compliance/ars-sync/sync-bulk", phoneNumbers);
  }

  // ── 6. Webhook HMAC-SHA256 Signature Verification ──────────────

  /**
   * Verify incoming DLR webhook signature generated by `TenantWebhookService.calculateSignature`.
   *
   * Header contract:
   *  - `X-Webhook-Signature`: `sha256=<hex(HMAC-SHA256(secretKey, "${timestamp}.${rawPayload}"))>`
   *  - `X-Webhook-Timestamp`: epoch milliseconds
   *
   * @param secretKey   Tenant webhook secret key (e.g., `sec_wh_...`)
   * @param rawPayload  Exact raw JSON request body string
   * @param timestamp   Value of `X-Webhook-Timestamp` header (ms)
   * @param signature   Value of `X-Webhook-Signature` header
   * @param toleranceMs Replay-attack window in ms (default: 5 minutes = 300,000 ms; <= 0 disables check)
   */
  static async verifyWebhookSignature(
    secretKey: string,
    rawPayload: string,
    timestamp: string | number,
    signature: string,
    toleranceMs = 300_000
  ): Promise<boolean> {
    if (!secretKey || !signature || !signature.startsWith("sha256=")) {
      return false;
    }
    const tsNum = typeof timestamp === "string" ? Number(timestamp) : timestamp;
    if (!Number.isFinite(tsNum)) {
      return false;
    }
    if (toleranceMs > 0 && Math.abs(Date.now() - tsNum) > toleranceMs) {
      return false;
    }

    const expected = await MessagingPlatformClient.computeWebhookSignature(secretKey, tsNum, rawPayload);
    return constantTimeEqual(expected, signature);
  }

  /** Compute HMAC-SHA256 webhook signature (`sha256=<hex>`). */
  static async computeWebhookSignature(secretKey: string, timestamp: number, rawPayload: string): Promise<string> {
    const dataToSign = `${timestamp}.${rawPayload}`;
    const enc = new TextEncoder();
    const key = await globalThis.crypto.subtle.importKey(
      "raw",
      enc.encode(secretKey),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const sigBuffer = await globalThis.crypto.subtle.sign("HMAC", key, enc.encode(dataToSign));
    const hex = Array.from(new Uint8Array(sigBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return `sha256=${hex}`;
  }

  // ── Internal HTTP & Retry Pipeline ─────────────────────────────

  private buildHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Tenant-Id": this.tenantId,
    };
    if (this.bearerToken) {
      headers["Authorization"] = `Bearer ${this.bearerToken}`;
    }
    if (this.apiKey) {
      headers["X-API-Key"] = this.apiKey;
    }
    if (this.sessionCookie) {
      headers["Cookie"] = this.sessionCookie;
    }
    return headers;
  }

  private async request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    let lastError: unknown;

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        const response = await this.fetchWithTimeout(url, {
          method,
          headers: this.buildHeaders(),
          body: body !== undefined ? JSON.stringify(body) : undefined,
        });

        const parsed = await this.safeJson(response);

        if (response.ok) {
          return parsed as T;
        }

        const retryable = response.status === 429 || response.status >= 500;
        if (retryable && attempt < this.maxRetries) {
          const retryAfter = response.headers.get("retry-after");
          const delayMs = retryAfter
            ? Math.max(Number(retryAfter) * 1000, this.retryBaseDelayMs)
            : this.retryBaseDelayMs * Math.pow(2, attempt);
          await sleep(delayMs);
          continue;
        }

        const errMsg =
          typeof parsed === "object" && parsed !== null && "message" in parsed
            ? String((parsed as { message: unknown }).message)
            : `HTTP ${response.status} ${response.statusText}`;
        throw new MessagingApiError(errMsg, response.status, parsed);
      } catch (err) {
        lastError = err;
        if (err instanceof MessagingApiError && err.statusCode < 500 && err.statusCode !== 429) {
          throw err;
        }
        if (attempt < this.maxRetries) {
          await sleep(this.retryBaseDelayMs * Math.pow(2, attempt));
          continue;
        }
      }
    }

    throw lastError instanceof Error ? lastError : new Error(String(lastError));
  }

  private async fetchWithTimeout(url: string, init: RequestInit): Promise<Response> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);
    try {
      return await this.fetchFn(url, { ...init, signal: controller.signal });
    } finally {
      clearTimeout(timer);
    }
  }

  private async safeJson(response: Response): Promise<unknown> {
    const text = await response.text();
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}
