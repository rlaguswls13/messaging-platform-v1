# 📊 OmniFlow 메시징 플랫폼 통합 모니터링 & 옵저버빌리티 가이드

본 디렉터리는 OmniFlow 메시징 플랫폼의 분산 마이크로서비스(`dispatcher`, `backend`, `failover`, `payloader`) 실시간 발송 지표와 인프라 리소스를 통합 관제하기 위한 **Prometheus 스크랩 설정** 및 **Grafana 올인원 대시보드 프로비저닝 스택**을 포함합니다.

---

## 📁 1. 디렉터리 구성

```
monitoring/
├── docker-compose.yml                                # Podman / Docker 실행 명세
├── generate_dashboard.py                            # 대시보드 JSON 생성 스크립트
├── validate_monitoring.py                           # YAML / JSON 문법 및 필드 자동 검증기
├── prometheus/
│   └── prometheus.yml                               # 5초 주기 스크랩 및 서비스 타겟 설정
└── grafana/
    ├── dashboards/
    │   └── messaging-platform-overview.json         # 올인원 통합 관제 대시보드 JSON
    └── provisioning/
        ├── datasources/
        │   └── datasource.yml                       # Prometheus 기본 데이터소스 프로비저닝
        └── dashboards/
            └── dashboard-provider.yml               # JSON 대시보드 자동 로드 프로바이더
```

---

## ⚙️ 2. Prometheus 스크랩 설정 (`prometheus.yml`)

- **스크랩 주기 (`scrape_interval`)**: 5s (실시간 발송 모니터링)
- **평가 주기 (`evaluation_interval`)**: 5s
- **수집 대상 마이크로서비스**:
  1. `messaging-dispatcher` (포트 `8081`): Netty TCP & 6대 채널 발송 엔진, `/actuator/prometheus`
  2. `messaging-backend` (포트 `8083`): 포털 REST API & 3-Click 엔진 (Context: `/api`), `/api/actuator/prometheus`
  3. `messaging-failover` (포트 `8085`): 알림톡 실패 ➔ SMS/LMS 전환 엔진, `/actuator/prometheus`
  4. `messaging-payloader` (포트 `8084`): 샤딩 파티션 토큰 치환 & 컴플라이언스 엔진, `/actuator/prometheus`
  5. `prometheus` (포트 `9090`): 프로메테우스 자체 헬스 지표

---

## 📈 3. Grafana 올인원 관제 대시보드 (`messaging-platform-overview.json`)

대시보드 제목: **"메시징 플랫폼 실시간 발송 및 인프라 통합 관제"** (`uid: messaging-platform-overview`)

| 패널 번호 | 패널 명칭 | 차트 유형 | 핵심 PromQL 쿼리 | 주요 설정 및 임계치 |
|:---|:---|:---:|:---|:---|
| **상단 KPI 1** | 실시간 총 발송량 (Total TPS) | Stat | `sum(rate(messaging_dispatch_total[1m]))` | reqps 단위 |
| **상단 KPI 2** | 최근 1시간 발송 성공수 | Stat | `sum(increase(messaging_dispatch_total{status="SUCCESS"}[1h]))` | 단일 건수 |
| **상단 KPI 3** | 발송 성공률 (%) | Stat | `(sum(increase(status="SUCCESS")) / sum(increase(total))) * 100` | 98% 이상 녹색, 90% 미만 적색 |
| **상단 KPI 4** | 야간 보류 큐 대기 현황 | Stat | `sum(messaging_night_held_current)` | 단일 건수 |
| **상단 KPI 5** | DLQ 격리 메시지 건수 (요약) | Stat | `sum(messaging_dlq_current)` | 100건 주황, 500건 적색 |
| **패널 7** | **SMTP Port 25 활성 소켓 연결 수** | Stat | `messaging_smtp_connections_active` | 실시간 활성 TCP 소켓 세션 수 |
| **패널 1** | **실시간 초당 발송량 (TPS)** | Timeseries | `sum(rate(messaging_dispatch_total[1m])) by (channel)` | 채널별 누적 영역 스택 그래프 |
| **패널 2** | **발송 성공 vs 실패 vs 규제거절 현황** | Piechart (Donut) | `sum(increase(messaging_dispatch_total[5m])) by (status)` | SUCCESS(녹색), FAILED(적색), REGULATION_REJECTED(주황) |
| **패널 3** | **채널별 발송 분포 (카카오/SMS/LMS/RCS/Email/Push)** | Barchart | `sum(increase(messaging_dispatch_total[1h])) by (channel)` | 6대 채널별 막대 볼륨 분포 |
| **패널 4** | **발송 처리 지연시간 (Latency ms)** | Timeseries | `histogram_quantile(0.95, sum(rate(..._bucket[1m])) by (le, channel)) * 1000` | P95 백분위 및 평균(ms) 시계열 |
| **패널 5** | **야간 보류 큐 적재량** | Gauge | `messaging_night_held_current` | 정보통신망법 제50조 제3항 야간 대기건 |
| **패널 6** | **DLQ 격리 메시지 건수** | Gauge | `messaging_dlq_current` | **임계치 100건 이상 주황 (#FF9830), 500건 이상 빨강 (#F2495C)** |
| **하단 201** | SMTP 활성 소켓 연결 추이 | Timeseries | `messaging_smtp_connections_active` | Netty Port 25 연결량 시계열 |
| **하단 202** | 서브모듈 서비스 가동 상태 | Stat | `up{job=~"messaging-.*"}` | 4대 서브모듈 UP/DOWN 상태 매핑 |
| **하단 203** | 서브모듈 JVM Heap 메모리 | Timeseries | `sum(jvm_memory_used_bytes{area="heap"}) by (job) / 1024 / 1024` | MB 단위 힙 메모리 추이 |

---

## 🚀 4. 실행 및 검증 방법

### 1) 설정 파일 문법 및 사양 검증
```powershell
python validate_monitoring.py
```
모든 YAML 문법, Prometheus 스크랩 타겟, 포트 번호, 메트릭스 패스, Grafana 패널 7종 및 임계치가 100% 자동 검증됩니다.

### 2) Podman으로 관제 스택 실행
```powershell
powershell ..\podman-compose.ps1 -f docker-compose.yml up -d
```
또는 Docker 환경:
```powershell
docker compose up -d
```

### 3) 접속 URL
- **Grafana 관제 대시보드**: [http://localhost:3000](http://localhost:3000) (Admin 계정: `admin` / `admin`, 익명 조회 허용)
- **Prometheus 콘솔 & 타겟 헬스**: [http://localhost:9090](http://localhost:9090)
