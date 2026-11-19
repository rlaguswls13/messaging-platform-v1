# 📊 Messaging Platform v1 — Prometheus & Grafana 관제 패키징 가이드

본 디렉터리(`deploy/monitoring/`)는 Messaging Platform v1의 프로덕션 관제를 위한 **Prometheus 알람 룰**과 **Grafana 통합 대시보드** 패키지를 제공합니다.

---

## 📁 디렉터리 구조

```text
deploy/monitoring/
├── prometheus/
│   └── alert-rules.yml                               # 9종 프로덕션 알람 룰 (TPS/CB/DLQ/Quota/JVM/5xx/DB)
├── grafana/
│   └── dashboards/
│       └── messaging-platform-overview.json          # 즉시 Import 가능한 Grafana 통합 대시보드
└── README.md                                         # 로컬 Compose & Kubernetes 적용 가이드
```

---

## 🚨 1. 포함된 Prometheus 알람 룰 (`prometheus/alert-rules.yml`)

| 알람 명칭 | 심각도 | 조건 | 지속 시간 |
|:---|:---:|:---|:---:|
| `DispatcherTpsSuddenDrop` | `critical` | 1분 TPS가 15분 기준선 대비 60% 이상 급락 (기준 > 10 TPS) | `2m` |
| `RelayCircuitBreakerOpen` | `critical` | `resilience4j_circuitbreaker_state{state="open"} == 1` | `30s` |
| `ActiveMqDlqBacklogWarning` | `warning` | ActiveMQ DLQ 적체 > 100건 | `1m` |
| `ActiveMqDlqBacklogCritical` | `critical` | ActiveMQ DLQ 적체 > 500건 | `2m` |
| `TenantQuotaWarning80` | `warning` | 테넌트 쿼터 소진율 ≥ 80% (100% 미만) | `2m` |
| `TenantQuotaExhausted100` | `critical` | 테넌트 쿼터 소진율 ≥ 100% | `1m` |
| `Http5xxErrorRateSpike` | `critical` | 서비스별 HTTP 5xx 에러율 > 5% (5분 기준) | `2m` |
| `JvmHeapMemoryHigh` | `warning` | JVM 힙 메모리 사용률 > 85% | `3m` |
| `DbConnectionPoolExhaustion` | `warning` | HikariCP 활성 커넥션 > 85% | `2m` |

---

## 📈 2. Grafana 대시보드 패널 구성 (`grafana/dashboards/messaging-platform-overview.json`)

- **상단 KPI**: 전체 실시간 발송 TPS, 전체 발송 성공률(%), ActiveMQ DLQ 적체 건수(Gauge), OPEN 서킷 브레이커 수
- **발송/채널**: 채널별 실시간 TPS(스택 시계열), 채널별 발송 성공률(Kakao/SMS/LMS/RCS/Email/Push)
- **장애/큐**: 중계사 서킷 브레이커 상태, ActiveMQ 큐 깊이 & 야간 보류 큐
- **인프라/테넌트**: 서브모듈 JVM 힙 메모리 사용률(%), HikariCP DB 커넥션 풀(Active/Idle/Max), 테넌트 쿼터 소진율(%), HTTP 5xx 에러율 & P95 발송 지연시간

---

## 🐳 3. 로컬 Docker / Podman Compose 적용 방법

### 1) Prometheus 알람 룰 마운트
루트 `docker-compose.yml` 또는 `monitoring/docker-compose.yml`의 `prometheus` 서비스에 볼륨을 추가하고 `prometheus.yml`에 `rule_files`를 등록합니다:

```yaml
# docker-compose.yml (prometheus service)
volumes:
  - ./deploy/monitoring/prometheus/alert-rules.yml:/etc/prometheus/alert-rules.yml:ro
```

```yaml
# prometheus.yml
rule_files:
  - "/etc/prometheus/alert-rules.yml"
```

### 2) Grafana 대시보드 Import
- **UI 수동 Import**: Grafana (`http://localhost:3001`) → `Dashboards` → `New` → `Import` → `deploy/monitoring/grafana/dashboards/messaging-platform-overview.json` 업로드 후 Prometheus 데이터소스 선택.
- **자동 프로비저닝**: `grafana` 컨테이너의 `/var/lib/grafana/dashboards/` 경로에 JSON 파일을 마운트합니다.

---

## ☸️ 4. Kubernetes (`kube-prometheus-stack`) 적용 방법

### 1) Helm Chart로 `ServiceMonitor` 활성화
`deploy/helm/messaging-platform/values.yaml`에서 `serviceMonitor.enabled: true` 및 `serviceMonitor.releaseLabel`을 클러스터의 `kube-prometheus-stack` 릴리즈 이름에 맞춰 배포합니다:

```bash
helm upgrade --install messaging-platform deploy/helm/messaging-platform \
  --namespace messaging-prod --create-namespace \
  --set serviceMonitor.enabled=true \
  --set serviceMonitor.releaseLabel=kube-prometheus-stack
```

### 2) PrometheusRule CRD 적용 (`alert-rules.yml`)
`alert-rules.yml` 내용을 `PrometheusRule` 리소스의 `spec:` 하위로 래핑하여 적용합니다:

```bash
kubectl create configmap messaging-platform-alert-rules \
  --from-file=alert-rules.yml=deploy/monitoring/prometheus/alert-rules.yml \
  -n monitoring --dry-run=client -o yaml | kubectl apply -f -
```

또는 `monitoring.coreos.com/v1` `PrometheusRule` 매니페스트(`release: kube-prometheus-stack` 라벨 포함)로 배포합니다.

### 3) Grafana 대시보드 Sidecar 자동 로드
`kube-prometheus-stack`의 Grafana 사이드카가 자동 감지할 수 있도록 `grafana_dashboard: "1"` 라벨을 부여하여 ConfigMap을 생성합니다:

```bash
kubectl create configmap messaging-platform-grafana-dashboard \
  --from-file=messaging-platform-overview.json=deploy/monitoring/grafana/dashboards/messaging-platform-overview.json \
  -n monitoring --dry-run=client -o yaml \
  | kubectl label --local -f - grafana_dashboard=1 -o yaml \
  | kubectl apply -f -
```
