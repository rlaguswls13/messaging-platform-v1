# 🔑 DKIM 키 교체 및 비밀 관리 가이드 (MSG-002)

본 문서는 `amailtest.shop` 도메인의 DKIM 키페어 교체 절차, DNS TXT 레코드 설정값 및 운영 환경(Docker / Kubernetes / Vault) 시크릿 주입 가이드를 정의합니다.

---

## 1. 개요 및 변경 배경

기존 `messaging-payloader/src/main/resources/dkim_private.pem`에 커밋되어 노출되었던 기존 테스트용 개인키를 저장소에서 완전히 삭제(`git rm`)하고, 소스코드 및 형상관리 도구에 비밀 키 파일이 포함되지 않도록 `.gitignore` 설정을 적용하였습니다.

또한, Spring Boot 설정 및 환경변수(`DKIM_PRIVATE_KEY_CONTENT` / `DKIM_PRIVATE_KEY_PATH`)를 통해 외부에서 동적으로 개인키를 주입받아 메모리 상에서 직접 파싱할 수 있도록 개선되었습니다.

---

## 2. 신규 생성된 DKIM 키페어 명세

- **도메인**: `amailtest.shop`
- **선택자 (Selector)**: `default`
- **알고리즘**: RSA-SHA256 (2048-bit)
- **키 용도**: 발송 이메일 DKIM 전자서명 (`DKIM-Signature`)

### 📋 DNS TXT 레코드 설정값

DNS 제공업체(AWS Route53, Cloudflare 등)의 네임서버 설정에 아래의 TXT 레코드를 등록합니다:

| 필드 | 값 |
|---|---|
| **호스트 / 레코드 이름** | `default._domainkey.amailtest.shop` |
| **레코드 타입** | `TXT` |
| **TTL** | `300` (또는 `Auto`) |
| **레코드 값 (Value)** | `v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA22pNO388fAEgFNM5vohfVzVL3wTLnPq2Z/i5erOJfMxUsiSpRLGY+Vi60swCNDvQeEwkpiWZhsVMv/y81if35yc96oozafMkr/QRt1Vl9q8MTHLmh8ICxITfIe/tUU4NyRmw8G9eenqZvsoAAxh9ZlhUN0xVxR37I38u0Nd+blPV7HJrkS3SeT9bhZvML6M/lg1HBovOtBA/j+I7ictT0w+y8ajXfUfbgl2Yr7VJEafTtImA4y47PdkQ/TK5RrjbTxkJw/tzCibV/FZ+BMsFnVoIb0yxORK1o3nFWzcEcQKPwW8Xf1bJOpuympx+VULl2yqV37cronD5IREd6oBheQIDAQAB` |

---

## 3. 운영 환경별 개인키 주입 방법

### 1) 환경 변수 직접 주입 (Docker / .env)
```bash
# .env 파일 또는 Docker compose
DKIM_PRIVATE_KEY_CONTENT="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDbak07fzx8ASAU...\n-----END PRIVATE KEY-----"
```

### 2) Kubernetes Secret 주입
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: messaging-dkim-secret
  namespace: production
type: Opaque
stringData:
  DKIM_PRIVATE_KEY: |
    -----BEGIN PRIVATE KEY-----
    MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDbak07fzx8ASAU
    0zm+iF9XNUvfBMuc+rZn+Ll6s4l8zFSyJKlEsZj5WLrSzAI0O9B4TCSmJZmGxUy/
    /LzWJ/fnJz3qijNp8ySv9BG3VWX2rwxMcuaHwgLEhN8h7+1RTg3JGbDwb156epm+
    ygADGH1mWFQ3TFXFHfsjfy7Q135uU9XscmuRLdJ5P1uFm8wvoz+WDUcGi860ED+P
    4juJy1PTD7LxqNd9R9uCXZivtUkRp9O0iYDjLjs92RD9MrlGuNtPGQnD+3MKJtX8
    Vn4EywWdWghvTLE5ErWjecVbNwRxAo/Bbxd/Vsk6m7KanH5VQuXbKpXftyuicPkh
    ER3qgGF5AgMBAAECggEAbRCXiGIULi2fBUsDko6WGbLP3nEzRvomrmLny7Kvvl2R
    IiXwD8nZ2OP+paar18v9sbZjp0TcXi33mx0lvqwKYZfTgqCkst8eFupS3hcwgmD7
    04pvxf6twoKrqWJqTDZoytQe7DznsSj9AGXHgMJtHvD8F6q1nbBr8/aVzlC3s13E
    QqPIXYZJ4UqyDBXv0gfNwnah4ygHF81QLwTIBaFFh47N356ywdtwwEbTA2JEL13k
    UsgwW0SruL0qUChHuhHLNoi7kyok9YOpwfswN0C/ciVNOsaGh3xyMweu1rwIcm7E
    j49euUpeb+iqsrB8ZHqqReABDfhaE8I6xUlqDk6OOwKBgQDue18DUkjhig13oq7y
    SlwehfWjlHSO/aCQLcrRtZxkG7MVsX71mXa3zB4be3xM0yHRkcGTtCZYRGM3YgmU
    5fqHhrdjXLyAiC/0xXK32ZwFt9RbajLn6ertT3tutD0evsyly+iGga0mbEzqrL7c
    +UhEQ5zNwQgnPHGOFacweXdeLwKBgQDriGIxGsibvJH//2uDlTYX/v5Fy2cJlcwK
    ld/0xz386nNhctiQeedJoYtdI9Xo4UldBml1kyumgCqb7z/CcoflySjsUQxMfEMa
    tZ57Gv/b+P1OPygiKhFYY5HgpZgV/4suinmL8cqwzbGno9iFjXKGdeHaCYqSx8sd
    vLjTzDo41wKBgQC9QFpeIGaF1TBqyEddL3V7I4OTlLQK5WsN/8j8MssxBmpPxNOj
    w21a3jjmRlCWBtbHoIul00i6s0qpILvJ1dfCxT2zNFzDA1BLRoWLML2ILCHxiY1s
    TU2JlZG2gIIga/mreO3GEBKAc2F2ui+c3JZk1eMRxSXbPTRANR7AcSQxMQKBgAgL
    Cj9fCMa4s8uoL0W5DLXZEVnUzln3cZZS8+jp/OXsI7CKOXcFkq5jA91UYfOn7ddt
    ZqCLPAxdiBb3HphHTPi929XmFqNuAuSgmx7dFyut3wiTA43XHeyEyfB/9yeZKGmY
    dPogcamD/LMa10QIRobs8598f+zvQbJsRWuGJ97VAoGAYcBonJtWP5JECRs8hsNg
    dpWiUNfTeDh+fAEJMJEZiwXoCtO+vE3+5NTujMZPZn9p/90+THfTqAPlN/WjjLcP
    9Arv00laaPv9FPIzoUwVppFQDdpLxjvQR7c7df3bMYdurLOHiQeQa+pKubjYRNmm
    bnCVGyyMUBaVSMV8Q9Fwcl8=
    -----END PRIVATE KEY-----
---
# Pod 매니페스트 주입 예시:
apiVersion: apps/v1
kind: Deployment
metadata:
  name: messaging-payloader
spec:
  template:
    spec:
      containers:
        - name: messaging-payloader
          env:
            - name: DKIM_PRIVATE_KEY_CONTENT
              valueFrom:
                secretKeyRef:
                  name: messaging-dkim-secret
                  key: DKIM_PRIVATE_KEY
```

### 3) 볼륨 마운트 파일 경로 주입
Kubernetes 시크릿 또는 HashiCorp Vault Agent를 통해 `/etc/secrets/dkim/private.pem`으로 마운트된 경우:
```yaml
dkim:
  private-key-path: /etc/secrets/dkim/private.pem
```

---

## 4. 검증 및 테스트 완료 내역

1. `DkimKeyRotationGeneratorTest`: 신규 RSA 2048 키페어 생성, PKCS#8 / X.509 PEM 인코딩 및 SHA256withRSA 자체 서명/검증 통과.
2. `DkimExternalInjectionTest`: `dkim.private-key-content`를 통한 메모리 내 문자열 주입 및 실제 DKIM 서명 헤더(`v=1; a=rsa-sha256; ...`) 생성 검증 통과.
3. `PayloaderApplicationStartupTest`: 저장소 내 기본 파일이 없어도 애플리케이션 컨텍스트가 안전하게 기동되고, 임의의 키가 자동 생성되지 않음을 보장(`auto-generate-check.enabled=false`).
