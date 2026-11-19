package com.messaging.sdk;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Duration;
import java.util.Collection;
import java.util.HexFormat;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Enterprise Messaging Platform — Official Zero-Dependency Java 21 B2B SDK.
 *
 * Uses JDK 21 {@link java.net.http.HttpClient} with automatic exponential backoff
 * retry on HTTP 429 / 5xx and constant-time HMAC-SHA256 webhook verification.
 * Endpoints and JSON contracts match {@code messaging-backend} REST API v1.0.0.
 */
public class MessagingPlatformClient {

    private final String baseUrl;
    private final HttpClient httpClient;
    private final Duration requestTimeout;
    private final int maxRetries;
    private final long retryBaseDelayMs;

    private volatile String apiKey;
    private volatile String bearerToken;
    private volatile String tenantId;
    private volatile String sessionCookie;

    private MessagingPlatformClient(Builder builder) {
        if (builder.baseUrl == null || builder.baseUrl.isBlank()) {
            throw new IllegalArgumentException("baseUrl is required");
        }
        this.baseUrl = builder.baseUrl.replaceAll("/+$", "");
        this.apiKey = builder.apiKey;
        this.bearerToken = builder.bearerToken;
        this.tenantId = (builder.tenantId == null || builder.tenantId.isBlank()) ? "default" : builder.tenantId;
        this.requestTimeout = builder.requestTimeout != null ? builder.requestTimeout : Duration.ofSeconds(10);
        this.maxRetries = Math.max(0, builder.maxRetries);
        this.retryBaseDelayMs = Math.max(50L, builder.retryBaseDelayMs);
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(5))
                .build();
    }

    public static Builder builder() {
        return new Builder();
    }

    // ─────────────────────── 1. Authentication ───────────────────────

    /** Portal session login ({@code POST /auth/login}) and JSESSIONID capture. */
    public ApiResult login(String username, String password) throws IOException, InterruptedException {
        String body = "{\"username\":" + jsonString(username) + ",\"password\":" + jsonString(password) + "}";
        HttpRequest request = newRequestBuilder("/auth/login")
                .POST(HttpRequest.BodyPublishers.ofString(body, StandardCharsets.UTF_8))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
        response.headers().allValues("set-cookie").stream()
                .filter(c -> c.contains("JSESSIONID="))
                .findFirst()
                .ifPresent(cookieHeader -> {
                    for (String part : cookieHeader.split(";")) {
                        String trimmed = part.trim();
                        if (trimmed.startsWith("JSESSIONID=")) {
                            this.sessionCookie = trimmed;
                            break;
                        }
                    }
                });

        if (response.statusCode() < 200 || response.statusCode() >= 300) {
            throw new MessagingApiException("Login failed (HTTP " + response.statusCode() + ")", response.statusCode(), response.body());
        }
        return new ApiResult(response.statusCode(), response.body());
    }

    /** Current authenticated user profile ({@code GET /auth/me}). */
    public ApiResult getCurrentUser() throws IOException, InterruptedException {
        return executeWithRetry("GET", "/auth/me", null);
    }

    /** Invalidate portal session ({@code POST /auth/logout}). */
    public ApiResult logout() throws IOException, InterruptedException {
        ApiResult res = executeWithRetry("POST", "/auth/logout", "{}");
        this.sessionCookie = null;
        return res;
    }

    // ─────────────────── 2. Single / Bulk Dispatch ───────────────────

    /** Remaining daily quota ({@code GET /campaign/simple/quota}). */
    public ApiResult getQuota(String workspaceId) throws IOException, InterruptedException {
        String ws = URLEncoder.encode(workspaceId != null ? workspaceId : this.tenantId, StandardCharsets.UTF_8);
        return executeWithRetry("GET", "/campaign/simple/quota?workspaceId=" + ws, null);
    }

    /** 3-Click single or bulk campaign dispatch ({@code POST /campaign/simple/send}). */
    public ApiResult sendSimpleCampaign(
            String storeName,
            String content,
            String channelType,
            List<String> recipients,
            String optOutNumber,
            boolean failoverEnabled
    ) throws IOException, InterruptedException {
        String json = "{"
                + "\"workspaceId\":" + jsonString(this.tenantId) + ","
                + "\"storeName\":" + jsonString(storeName) + ","
                + "\"content\":" + jsonString(content) + ","
                + "\"channelType\":" + jsonString(channelType) + ","
                + "\"recipients\":" + jsonStringArray(recipients) + ","
                + "\"optOutNumber\":" + jsonString(optOutNumber) + ","
                + "\"failoverEnabled\":" + failoverEnabled
                + "}";
        return executeWithRetry("POST", "/campaign/simple/send", json);
    }

    /**
     * Ingest on-premise KMS-encrypted target batch ({@code POST /api/v1/relay/ingest-target}).
     * Every recipient must start with {@code ENC_{tenantId}~}.
     */
    public ApiResult ingestEncryptedBatch(String batchId, List<EncryptedItem> items) throws IOException, InterruptedException {
        String itemsJson = items.stream()
                .map(i -> "{\"rawId\":" + jsonString(i.rawId())
                        + ",\"recipient\":" + jsonString(i.recipient())
                        + ",\"parameters\":" + jsonFlatMap(i.parameters()) + "}")
                .collect(Collectors.joining(",", "[", "]"));

        String payload = "{"
                + "\"tenantId\":" + jsonString(this.tenantId) + ","
                + "\"batchId\":" + jsonString(batchId) + ","
                + "\"items\":" + itemsJson
                + "}";
        return executeWithRetry("POST", "/api/v1/relay/ingest-target", payload);
    }

    // ─────────────────── 3. AI A/B Copywriting ───────────────────────

    /** Generate 5-persona marketing A/B copy variants ({@code POST /api/v1/ai/copywriting/ab-variants}). */
    public ApiResult generateAbCopyVariants(
            String storeName,
            String industry,
            String productName,
            String coreBenefit,
            String preferredChannel
    ) throws IOException, InterruptedException {
        String json = "{"
                + "\"storeName\":" + jsonString(storeName) + ","
                + "\"industry\":" + jsonString(industry) + ","
                + "\"productName\":" + jsonString(productName) + ","
                + "\"coreBenefit\":" + jsonString(coreBenefit) + ","
                + "\"preferredChannel\":" + jsonString(preferredChannel)
                + "}";
        return executeWithRetry("POST", "/api/v1/ai/copywriting/ab-variants", json);
    }

    // ─────────────── 4. Telecom MNP Lookup & Cleansing ───────────────

    /** Real-time single phone MNP lookup ({@code POST /api/v1/compliance/mnp/lookup}). */
    public ApiResult lookupMnp(String phoneNumber, String carrierHint) throws IOException, InterruptedException {
        String json = "{"
                + "\"phoneNumber\":" + jsonString(phoneNumber) + ","
                + "\"tenantId\":" + jsonString(this.tenantId) + ","
                + "\"carrier\":" + jsonString(carrierHint)
                + "}";
        return executeWithRetry("POST", "/api/v1/compliance/mnp/lookup", json);
    }

    /** Bulk phone cleansing & cost savings estimation ({@code POST /api/v1/compliance/mnp/cleanse}). */
    public ApiResult cleanseMnp(List<String> phoneNumbers, boolean removeDuplicates, double costPerSms)
            throws IOException, InterruptedException {
        String json = "{"
                + "\"phoneNumbers\":" + jsonStringArray(phoneNumbers) + ","
                + "\"removeDuplicates\":" + removeDuplicates + ","
                + "\"costPerSms\":" + costPerSms + ","
                + "\"tenantId\":" + jsonString(this.tenantId)
                + "}";
        return executeWithRetry("POST", "/api/v1/compliance/mnp/cleanse", json);
    }

    // ─────────────── 5. 080 Opt-Out Synchronization ──────────────────

    /** Check whether a phone number is registered on 080 opt-out ({@code POST /api/v1/compliance/ars-sync/check}). */
    public ApiResult checkArsOptOut(String phoneNumber) throws IOException, InterruptedException {
        String q = URLEncoder.encode(phoneNumber, StandardCharsets.UTF_8);
        return executeWithRetry("POST", "/api/v1/compliance/ars-sync/check?phoneNumber=" + q, "");
    }

    /** Bulk synchronize 080 ARS opt-out phone numbers ({@code POST /api/v1/compliance/ars-sync/sync-bulk}). */
    public ApiResult syncBulkOptOut(List<String> phoneNumbers) throws IOException, InterruptedException {
        return executeWithRetry("POST", "/api/v1/compliance/ars-sync/sync-bulk", jsonStringArray(phoneNumbers));
    }

    // ─────────── 6. Webhook HMAC-SHA256 Signature Verification ───────

    /**
     * Compute HMAC-SHA256 signature matching {@code TenantWebhookService.calculateSignature}:
     * {@code sha256=<hex(HMAC-SHA256(secretKey, timestamp + "." + rawPayload))>}.
     */
    public static String computeWebhookSignature(String secretKey, long timestampMs, String rawPayload) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
            String dataToSign = timestampMs + "." + rawPayload;
            byte[] digest = mac.doFinal(dataToSign.getBytes(StandardCharsets.UTF_8));
            return "sha256=" + HexFormat.of().formatHex(digest);
        } catch (Exception e) {
            throw new IllegalStateException("Failed to compute HMAC-SHA256 signature", e);
        }
    }

    /**
     * Constant-time verification of {@code X-Webhook-Signature} with replay-attack tolerance window.
     *
     * @param toleranceMs Allowed clock drift in ms (default 300_000 = 5 minutes; &lt;= 0 disables check)
     */
    public static boolean verifyWebhookSignature(
            String secretKey,
            String rawPayload,
            long timestampMs,
            String signature,
            long toleranceMs
    ) {
        if (secretKey == null || secretKey.isBlank() || signature == null || !signature.startsWith("sha256=")) {
            return false;
        }
        if (toleranceMs > 0 && Math.abs(System.currentTimeMillis() - timestampMs) > toleranceMs) {
            return false;
        }
        String expected = computeWebhookSignature(secretKey, timestampMs, rawPayload);
        return MessageDigest.isEqual(
                expected.getBytes(StandardCharsets.UTF_8),
                signature.getBytes(StandardCharsets.UTF_8)
        );
    }

    // ─────────────── Internal HTTP & Backoff Pipeline ────────────────

    private ApiResult executeWithRetry(String method, String path, String jsonBody)
            throws IOException, InterruptedException {
        Exception lastException = null;

        for (int attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                HttpRequest.Builder reqBuilder = newRequestBuilder(path);
                if ("GET".equalsIgnoreCase(method)) {
                    reqBuilder.GET();
                } else {
                    reqBuilder.method(method, HttpRequest.BodyPublishers.ofString(
                            jsonBody != null ? jsonBody : "", StandardCharsets.UTF_8));
                }

                HttpResponse<String> response = httpClient.send(
                        reqBuilder.build(), HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
                int status = response.statusCode();

                if (status >= 200 && status < 300) {
                    return new ApiResult(status, response.body());
                }

                boolean retryable = status == 429 || status >= 500;
                if (retryable && attempt < maxRetries) {
                    long delayMs = resolveRetryDelayMs(response.headers().firstValue("retry-after"), attempt);
                    Thread.sleep(delayMs);
                    continue;
                }

                throw new MessagingApiException("API request failed (HTTP " + status + ")", status, response.body());
            } catch (MessagingApiException ex) {
                if (ex.getStatusCode() < 500 && ex.getStatusCode() != 429) {
                    throw ex;
                }
                lastException = ex;
                if (attempt < maxRetries) {
                    Thread.sleep(retryBaseDelayMs * (1L << attempt));
                }
            } catch (IOException ex) {
                lastException = ex;
                if (attempt < maxRetries) {
                    Thread.sleep(retryBaseDelayMs * (1L << attempt));
                }
            }
        }

        if (lastException instanceof IOException io) {
            throw io;
        }
        if (lastException instanceof MessagingApiException apiEx) {
            throw apiEx;
        }
        throw new IOException("Request failed after " + maxRetries + " retries", lastException);
    }

    private long resolveRetryDelayMs(Optional<String> retryAfterHeader, int attempt) {
        if (retryAfterHeader.isPresent()) {
            try {
                long seconds = Long.parseLong(retryAfterHeader.get().trim());
                return Math.max(seconds * 1000L, retryBaseDelayMs);
            } catch (NumberFormatException ignored) {
                // fallback to exponential backoff
            }
        }
        return retryBaseDelayMs * (1L << attempt);
    }

    private HttpRequest.Builder newRequestBuilder(String path) {
        HttpRequest.Builder builder = HttpRequest.newBuilder()
                .uri(URI.create(baseUrl + path))
                .timeout(requestTimeout)
                .header("Content-Type", "application/json")
                .header("Accept", "application/json")
                .header("X-Tenant-Id", tenantId);

        if (bearerToken != null && !bearerToken.isBlank()) {
            builder.header("Authorization", "Bearer " + bearerToken);
        }
        if (apiKey != null && !apiKey.isBlank()) {
            builder.header("X-API-Key", apiKey);
        }
        if (sessionCookie != null && !sessionCookie.isBlank()) {
            builder.header("Cookie", sessionCookie);
        }
        return builder;
    }

    // ─────────────────── Minimal JSON Serialization ──────────────────

    private static String jsonString(String value) {
        if (value == null) return "null";
        StringBuilder sb = new StringBuilder("\"");
        for (int i = 0; i < value.length(); i++) {
            char c = value.charAt(i);
            switch (c) {
                case '"' -> sb.append("\\\"");
                case '\\' -> sb.append("\\\\");
                case '\n' -> sb.append("\\n");
                case '\r' -> sb.append("\\r");
                case '\t' -> sb.append("\\t");
                default -> sb.append(c);
            }
        }
        return sb.append('"').toString();
    }

    private static String jsonStringArray(Collection<String> values) {
        if (values == null) return "[]";
        return values.stream().map(MessagingPlatformClient::jsonString).collect(Collectors.joining(",", "[", "]"));
    }

    private static String jsonFlatMap(Map<String, String> map) {
        if (map == null || map.isEmpty()) return "{}";
        return map.entrySet().stream()
                .map(e -> jsonString(e.getKey()) + ":" + jsonString(e.getValue()))
                .collect(Collectors.joining(",", "{", "}"));
    }

    // ─────────────────── Value Types & Builder ───────────────────────

    public record ApiResult(int statusCode, String rawJsonBody) {}

    public record EncryptedItem(String rawId, String recipient, Map<String, String> parameters) {}

    public static class MessagingApiException extends RuntimeException {
        private final int statusCode;
        private final String responseBody;

        public MessagingApiException(String message, int statusCode, String responseBody) {
            super(message);
            this.statusCode = statusCode;
            this.responseBody = responseBody;
        }

        public int getStatusCode() {
            return statusCode;
        }

        public String getResponseBody() {
            return responseBody;
        }
    }

    public static class Builder {
        private String baseUrl;
        private String apiKey;
        private String bearerToken;
        private String tenantId = "default";
        private Duration requestTimeout = Duration.ofSeconds(10);
        private int maxRetries = 3;
        private long retryBaseDelayMs = 300L;

        public Builder baseUrl(String baseUrl) { this.baseUrl = baseUrl; return this; }
        public Builder apiKey(String apiKey) { this.apiKey = apiKey; return this; }
        public Builder bearerToken(String bearerToken) { this.bearerToken = bearerToken; return this; }
        public Builder tenantId(String tenantId) { this.tenantId = tenantId; return this; }
        public Builder requestTimeout(Duration timeout) { this.requestTimeout = timeout; return this; }
        public Builder maxRetries(int maxRetries) { this.maxRetries = maxRetries; return this; }
        public Builder retryBaseDelayMs(long delayMs) { this.retryBaseDelayMs = delayMs; return this; }

        public MessagingPlatformClient build() {
            return new MessagingPlatformClient(this);
        }
    }
}
