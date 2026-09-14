# 📨 Master AI Agent Guidelines (`AGENTS.md`) — messaging-platform-v1

본 문서는 `messaging-platform-v1` 및 전체 메시징 플랫폼 생태계에서 작업하는 모든 AI 코딩 에이전트(Antigravity, Claude Code, Cursor, Codex 등)가 최우선으로 준수해야 하는 시스템 지침서입니다.

---

## 🏛️ 1. 정본 지식 베이스 참조 경로 (SSOT Knowledge Source)

이 프로젝트의 모든 도메인 설계, 아키텍처, DB 스키마, API 계약 및 세션 기록은 **중앙 RAG 지식 볼트(`D:\obsidian-storage\project-rag\messaging-platform\`)**에서 정본으로 관리됩니다.

```
RAGWIKI = D:\obsidian-storage\project-rag\messaging-platform\
```

### 🪜 계단형 지식 탐색 링크
- **[Level 0] 마스터 인덱스 허브**: [index.md](file:///D:/obsidian-storage/project-rag/messaging-platform/index.md)
- **[Level 0] 볼트 가이드**: [README.md](file:///D:/obsidian-storage/project-rag/messaging-platform/README.md)
- **[Level 1] 통합 플랫폼 아키텍처**:
  - [E2E 파이프라인 (Option C)](file:///D:/obsidian-storage/project-rag/messaging-platform/00-integrated-platform/architecture-overview.md)
  - [대칭형 보안 암호화 규격](file:///D:/obsidian-storage/project-rag/messaging-platform/00-integrated-platform/security-crypto-spec.md)
  - [통합 Dev/시뮬레이션 모드](file:///D:/obsidian-storage/project-rag/messaging-platform/00-integrated-platform/dev-simulation-mode.md)
- **[Level 2] 7대 독립 서브모듈 명세**:
  - [01-messaging-backend (포털 REST API)](file:///D:/obsidian-storage/project-rag/messaging-platform/01-modules/01-messaging-backend/index.md)
  - [02-messaging-targeting (타겟 수집 & 샤딩)](file:///D:/obsidian-storage/project-rag/messaging-platform/01-modules/02-messaging-targeting/index.md)
  - [03-messaging-payloader (치환 & 스트리밍)](file:///D:/obsidian-storage/project-rag/messaging-platform/01-modules/03-messaging-payloader/index.md)
  - [04-messaging-dispatcher (Netty TCP 발송)](file:///D:/obsidian-storage/project-rag/messaging-platform/01-modules/04-messaging-dispatcher/index.md)
  - [05-messaging-logger (분산 로깅)](file:///D:/obsidian-storage/project-rag/messaging-platform/01-modules/05-messaging-logger/index.md)
  - [06-messaging-frontend (Next.js 16 웹 포털)](file:///D:/obsidian-storage/project-rag/messaging-platform/01-modules/06-messaging-frontend/index.md)
  - [07-messaging-common (공통 Envelope & Crypto)](file:///D:/obsidian-storage/project-rag/messaging-platform/01-modules/07-messaging-common/index.md)
- **[Level 3] 심층 기술 스펙 & 벤치마크**:
  - [규정 준수 2nd Brain(RAG) 연계 및 토큰 최적화 사양](file:///D:/obsidian-storage/project-rag/messaging-platform/02-architecture-and-specs/compliance-2nd-brain-ai-architecture.md)
  - [이미지·키워드 기반 멀티모달 템플릿 추천 사양](file:///D:/obsidian-storage/project-rag/messaging-platform/02-architecture-and-specs/ai-multimodal-template-selection-spec.md)
  - [B2B 가상 인프라 격리 및 온프레미스급 보안 사양](file:///D:/obsidian-storage/project-rag/messaging-platform/02-architecture-and-specs/virtual-infrastructure-isolation-spec.md)
  - [순차적 채널 온보딩 파이프라인 및 모듈식 하네스(Harness) 사양](file:///D:/obsidian-storage/project-rag/messaging-platform/02-architecture-and-specs/phased-channel-pipeline-and-harness-spec.md)
  - [Ready-to-Send 페이로드 규격](file:///D:/obsidian-storage/project-rag/messaging-platform/02-architecture-and-specs/ready-to-send-payload-spec.md)
  - [10만 건 벤치마크 실측 보고서](file:///D:/obsidian-storage/project-rag/messaging-platform/02-architecture-and-specs/100k-benchmark-report.md)
- **[Level 4] 통합 세션 아카이브**:
  - [세션 인덱스](file:///D:/obsidian-storage/project-rag/messaging-platform/03-sessions-and-history/Session_Index.md)

---

## ⚙️ 2. AI 에이전트 핵심 작업 규칙

1. **지식 우선 탐색**: 코드 수정 전 반드시 위 링크의 정본 문서를 확인하여 기존 스키마, DTO 필드, 포트 번호, 암호화 규칙과 일치하도록 코딩합니다.
2. **Zero Outbound Leakage**: 개발 및 테스트 실행 시 `app.dev-mode: true`를 유지하여 실제 외부 포트 25 SMTP 전송 및 FCM/APNs 푸시 통신이 외부망으로 나가지 않도록 합니다.
3. **2-Level 패키징 준수**: 모든 공통 라이브러리 및 서비스는 `com.ma.{module-name}` 그룹과 아티팩트명을 유지합니다.
4. **전체 모듈 빌드 검증**: 변경사항이 발생하면 `powershell .\publish-all.ps1`을 실행하여 모든 모듈이 성공적으로 컴파일 및 배포되는지 검증합니다.
