# 📨 Messaging Platform v1 Production Helm Chart

엔터프라이즈 멀티채널 메시징 플랫폼 v1 쿠버네티스(Kubernetes) 프로덕션 배포용 Helm 차트입니다.

---

## 🏛️ 아키텍처 개요

본 차트는 다음 7대 핵심 서비스 및 인프라 연동 컴포넌트를 원클릭으로 오케스트레이션합니다:

1. **messaging-backend** (`Deployment`, `Service`, `HPA`): REST 포털 API (HTTP 8083, context-path `/api`)
2. **messaging-targeting** (`Deployment`, `Service`): 타겟 수집 및 샤딩 (HTTP 8080)
3. **messaging-payloader** (`Deployment`, `Service`, `HPA`): 메시지 치환 및 Netty TCP 스트리밍 (HTTP 8084)
4. **messaging-dispatcher** (`Deployment`, `Service`, `HPA`): Netty 비동기 발송 엔진 (HTTP 8081, TCP 8999)
5. **messaging-failover** (`Deployment`, `Service`): 알림톡 실패 시 SMS/LMS 페일오버 (HTTP 8085)
6. **messaging-logger** (`Deployment`, `Service`): H2/시계열 분산 로깅 데몬 (TCP 9876)
7. **messaging-frontend** (`Deployment`, `Service`): Next.js 16 웹 포털 (HTTP 3000)
8. **Ingress** (`Ingress`): NGINX Ingress 컨트롤러 연동 (도메인: `messaging.enterprise.internal`)
9. **ConfigMap & Secret** (`ConfigMap`, `Secret`): 공통 환경변수 및 AES-256 / JWT 키 관리

---

## 🚀 빠른 시작 (Quick Start)

### 1. 템플릿 렌더링 사전 테스트 (Dry-run)
```bash
helm template messaging-platform ./deploy/helm/messaging-platform -f ./deploy/helm/messaging-platform/values.yaml
```

### 2. 차트 린트 (Lint)
```bash
helm lint ./deploy/helm/messaging-platform
```

### 3. 클러스터 설치 (Install)
```bash
kubectl create namespace messaging-prod
helm install messaging-platform ./deploy/helm/messaging-platform \
  --namespace messaging-prod \
  -f ./deploy/helm/messaging-platform/values.yaml
```

### 4. 롤아웃 상태 및 HPA 확인
```bash
kubectl get pods,svc,hpa,ingress -n messaging-prod
```

---

## 📊 HPA (Horizontal Pod Autoscaling) 임계값

| 서비스 | 최소 Pod | 최대 Pod | CPU 임계치 (%) |
|---|---|---|---|
| **messaging-dispatcher** | 2 | 10 | 70% |
| **messaging-payloader** | 2 | 8 | 75% |
| **messaging-backend** | 2 | 6 | 80% |

---

## 🔍 무결성 검증 스크립트 실행
```powershell
& "D:\dev-tool\python\python.exe" "scripts\verify_helm_chart.py"
```
모든 매니페스트 및 YAML 문법 무결성 100% 검증 완료.
