# Enterprise Messaging Platform — B2B Customer SDKs

엔터프라이즈 메시징 플랫폼(`messaging-backend` REST API v1.0.0)과 즉시 연동할 수 있는 **Zero-Dependency 공식 경량 B2B SDK 3종(TypeScript, Python, Java 21)** 입니다.

| 언어 | 파일 경로 | 런타임 요구사항 | 외부 의존성 |
| :--- | :--- | :--- | :--- |
| **TypeScript** | `sdk/typescript/messaging-client.ts` | Node.js 18+ / Deno / Bun | 없음 (`fetch`, Web Crypto) |
| **Python** | `sdk/python/messaging_client.py` | Python 3.9+ | 없음 (`urllib.request`, `requests` 선택 지원) |
| **Java** | `sdk/java/MessagingPlatformClient.java` | Java 21+ | 없음 (`java.net.http.HttpClient`) |

---

## 1. 인증 헤더 & 멀티테넌트 규격

모든 SDK는 OpenAPI 3.0 명세(`OpenApiConfig`)에 정의된 3대 인증 방식과 멀티테넌트 격리 헤더를 동일하게 지원합니다.

| 헤더 / 쿠키 | 용도 | 예시 |
| :--- | :--- | :--- |
| `Authorization` | OAuth2 / JWT Bearer 토큰 인증 | `Bearer eyJhbGciOi...` |
| `X-API-Key` | B2B 서버 간(S2S) 연동 전용 API Key | `mp_live_9f8a7b6c...` |
| `Cookie` | 포털 세션 로그인 (`POST /auth/login`) | `JSESSIONID=...` |
| `X-Tenant-Id` | 멀티테넌트 격리 식별자 (기본값 `default`) | `tenant-001` |

---

## 2. 빠른 시작 (Quick Start)

### TypeScript (Node.js 18+)

```ts
import { MessagingPlatformClient } from "./typescript/messaging-client";

const client = new MessagingPlatformClient({
  baseUrl: "https://api.messaging-portal.com",
  apiKey: process.env.MESSAGING_API_KEY,
  tenantId: "tenant-001",
});

// 1) 3-Click 단건/대량 발송
const dispatch = await client.sendSimpleCampaign({
  storeName: "카페 드 플로르",
  content: "(광고) [카페 드 플로르] 신메뉴 20% 할인! 무료수신거부 080-880-9999",
  channelType: "KAKAO",
  recipients: ["010-1234-5678", "010-9876-5432"],
  optOutNumber: "080-880-9999",
  failoverEnabled: true,
});

// 2) AI 5대 페르소나 A/B 카피 생성
const variants = await client.generateAbCopyVariants({
  storeName: "카페 드 플로르",
  industry: "CAFE",
  productName: "제주 감귤 크림 라떼",
  coreBenefit: "출시 기념 20% 할인",
});

// 3) 통신 3사 MNP 대량 번호 클렌징
const cleansed = await client.cleanseMnp({
  phoneNumbers: ["010-1234-5678", "010-0000-0000", "010-1234-5678"],
});

// 4) 080 수신거부 일괄 동기화
await client.syncBulkOptOut(["010-5555-6666", "010-7777-8888"]);
```

### Python 3.9+

```python
from python.messaging_client import MessagingPlatformClient

client = MessagingPlatformClient(
    base_url="https://api.messaging-portal.com",
    api_key="mp_live_...",
    tenant_id="tenant-001",
)

# 1) MNP 클렌징
cleanse_res = client.cleanse_mnp(["010-1234-5678", "010-9999-8888"])

# 2) 3-Click 캠페인 발송
send_res = client.send_simple_campaign(
    store_name="카페 드 플로르",
    content="(광고) [카페 드 플로르] 주말 특가! 무료수신거부 080-880-9999",
    recipients=cleanse_res["data"]["validNumbers"],
    channel_type="KAKAO",
    opt_out_number="080-880-9999",
)

# 3) 080 수신거부 여부 확인
check_res = client.check_ars_opt_out("010-1234-5678")
```

### Java 21

```java
import com.messaging.sdk.MessagingPlatformClient;
import java.util.List;

var client = MessagingPlatformClient.builder()
        .baseUrl("https://api.messaging-portal.com")
        .apiKey(System.getenv("MESSAGING_API_KEY"))
        .tenantId("tenant-001")
        .build();

var quota = client.getQuota("tenant-001");
var result = client.sendSimpleCampaign(
        "카페 드 플로르",
        "(광고) [카페 드 플로르] 신메뉴 할인! 무료수신거부 080-880-9999",
        "KAKAO",
        List.of("010-1234-5678"),
        "080-880-9999",
        true
);
```

---

## 3. Rate Limit (HTTP 429) 및 일시적 장애 대응

플랫폼은 테넌트 등급별(SOHO 50 TPS, GROWTH 500 TPS, ENTERPRISE 2,000 TPS) 토큰 버킷 Rate Limit을 적용합니다.
3종 SDK 모두 아래 정책을 기본 내장합니다.

1. **자동 재시도 대상**: HTTP `429 Too Many Requests`, `5xx Server Error`, 네트워크 타임아웃
2. **Retry-After 우선 준수**: 서버가 `Retry-After` 헤더(초)를 반환하면 해당 대기 시간을 우선 적용합니다.
3. **지수 백오프(Exponential Backoff)**: 기본 `300ms -> 600ms -> 1200ms` (최대 `maxRetries=3`, 생성자/빌더에서 조정 가능).
4. **4xx 클라이언트 오류 비재시도**: `400 Bad Request`(규제 위반, 평문 누출 차단 등), `401`, `403`은 즉시 예외를 발생시킵니다.

---

## 4. DLR 웹훅 HMAC-SHA256 서명 검증

`TenantWebhookService`가 고객사 엔드포인트로 역발행하는 모든 DLR 웹훅 요청에는 다음 보안 헤더가 포함됩니다.

- `X-Webhook-Signature`: `sha256=<hex(HMAC-SHA256(secretKey, "${timestamp}.${rawPayload}"))>`
- `X-Webhook-Timestamp`: 요청 생성 Epoch Milliseconds (리플레이 공격 방어용, 기본 허용 오차 ±5분)
- `X-Tenant-Id`: 대상 테넌트 ID
- `X-Trace-Id` / `traceparent`: W3C 분산 추적 컨텍스트

> **주의**: 서명 검증 시 반드시 JSON 파싱 전의 **원본 Raw Request Body 문자열**을 그대로 전달해야 합니다.

### TypeScript (Express / Fastify)

```ts
const isValid = await MessagingPlatformClient.verifyWebhookSignature(
  process.env.WEBHOOK_SECRET!,
  req.rawBody,                          // Raw JSON string
  req.headers["x-webhook-timestamp"]!,  // Epoch ms
  req.headers["x-webhook-signature"]!   // "sha256=..."
);
if (!isValid) return res.status(401).send("Invalid webhook signature");
```

### Python (FastAPI / Flask)

```python
is_valid = MessagingPlatformClient.verify_webhook_signature(
    secret_key=os.environ["WEBHOOK_SECRET"],
    raw_payload=raw_body_text,
    timestamp_ms=request.headers["X-Webhook-Timestamp"],
    signature=request.headers["X-Webhook-Signature"],
)
```

### Java 21 (Spring Boot Webhook Receiver)

```java
boolean valid = MessagingPlatformClient.verifyWebhookSignature(
        webhookSecret,
        rawRequestBody,
        Long.parseLong(timestampHeader),
        signatureHeader,
        300_000L // 5-minute replay tolerance
);
```
