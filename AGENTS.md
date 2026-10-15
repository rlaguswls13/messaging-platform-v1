# 📨 Master AI Agent Guidelines (`AGENTS.md`) — messaging-platform-v1

본 문서는 `messaging-platform-v1` 및 전체 메시징 플랫폼 생태계에서 작업하는 모든 AI 코딩 에이전트(Antigravity, Claude Code, Cursor, Codex 등)가 **최우선으로** 준수해야 하는 단일 진실 공급원(SSOT) 시스템 지침서입니다. 중앙 RAG 볼트 및 글로벌 위키 거버넌스(`ai-agent-wiki`)와 연계되어 운영됩니다.

---

## 🏛️ 1. 정본 지식 베이스 참조 경로 (SSOT Knowledge Sources)

### A. Central RAG Vault — 범용 룰 & 스킬 (Cross-Project, 읽기 전용 참조)

- **중앙 볼트 루트**: `$AI_AGENT_WIKI_ROOT` (`D:\obsidian-storage\ai-agent-wiki`, 진입점 `AGENTS.md`)
- **범용 규칙/스킬은 별도 중앙 볼트가 관리하며, 이 프로젝트는 읽기 전용으로 링크하여 참조**합니다 (임의 생성·수정 금지).
  - `$AI_AGENT_WIKI_ROOT\01-global-rules\` — 범용 코딩/보안/DB 하드 제약, 위키 거버넌스 규정([wiki-governance-rule.md](file:///D:/obsidian-storage/ai-agent-wiki/01-global-rules/wiki-governance-rule.md)), 온톨로지 규칙([wiki-ontology-rule.md](file:///D:/obsidian-storage/ai-agent-wiki/01-global-rules/wiki-ontology-rule.md)) (AI: Read-Only)
  - `$AI_AGENT_WIKI_ROOT\02-global-skills\` — 재사용 실행 파이프라인 SOP 및 온톨로지 채택/갱신 절차([wiki-ontology-adoption.md](file:///D:/obsidian-storage/ai-agent-wiki/02-global-skills/wiki-ontology-adoption.md)) (AI: Executer)
  - `$AI_AGENT_WIKI_ROOT\00-global-maps\` — 중앙 자산만 색인하는 맵
- **적용성 원칙**: 각 전역 자산은 `applies_when` 조건이 이 프로젝트의 확인된 사실과 `match`일 때만 채택하며, `unknown`이면 자동 채택하지 않고 차단(`blocked`) 상태로 유지합니다.

### B. Project RAG Vault — 프로젝트 고유 정본 (Project-Local SSOT)

이 프로젝트의 모든 도메인 설계, 아키텍처, DB 스키마, API 계약 및 세션 기록은 **중앙 RAG 지식 볼트의 `messaging-platform/` 폴더**에서 정본으로 관리됩니다.

```
RAGWIKI = $PROJECT_RAG_PATH\messaging-platform\
         (기본 경로: D:\obsidian-storage\project-rag\messaging-platform\)
```

#### 🪜 계단형 지식 탐색 링크
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
  - [09-messaging-failover (알림톡 실패 ➔ SMS/LMS 대체 발송)](file:///D:/obsidian-storage/project-rag/messaging-platform/01-modules/09-messaging-failover/index.md)
- **[Level 3] 심층 기술 스펙 & 벤치마크**:
  - [규정 준수 2nd Brain(RAG) 연계 및 토큰 최적화 사양](file:///D:/obsidian-storage/project-rag/messaging-platform/02-architecture-and-specs/compliance-2nd-brain-ai-architecture.md)
  - [이미지·키워드 기반 멀티모달 템플릿 추천 사양](file:///D:/obsidian-storage/project-rag/messaging-platform/02-architecture-and-specs/ai-multimodal-template-selection-spec.md)
  - [B2B 가상 인프라 격리 및 온프레미스급 보안 사양](file:///D:/obsidian-storage/project-rag/messaging-platform/02-architecture-and-specs/virtual-infrastructure-isolation-spec.md)
  - [순차적 채널 온보딩 파이프라인 및 모듈식 하네스(Harness) 사양](file:///D:/obsidian-storage/project-rag/messaging-platform/02-architecture-and-specs/phased-channel-pipeline-and-harness-spec.md)
  - [Ready-to-Send 페이로드 규격](file:///D:/obsidian-storage/project-rag/messaging-platform/02-architecture-and-specs/ready-to-send-payload-spec.md)
  - [10만 건 벤치마크 실측 보고서](file:///D:/obsidian-storage/project-rag/messaging-platform/02-architecture-and-specs/100k-benchmark-report.md)
  - [3-Tier 시계열 스토리지 동적 라우팅 사양](file:///D:/obsidian-storage/project-rag/messaging-platform/02-architecture-and-specs/tiered-timeseries-storage-routing-spec.md)
  - [Dual-UX · AI 컴플라이언스 린터 · 쿼터 사양](file:///D:/obsidian-storage/project-rag/messaging-platform/02-architecture-and-specs/dual-ux-3click-and-ai-compliance-spec.md)
- **[Level 4] 통합 세션 아카이브**:
  - [세션 인덱스](file:///D:/obsidian-storage/project-rag/messaging-platform/03-sessions-and-history/Session_Index.md)

### C. 온톨로지·역할별 컨텍스트 선택 (Ontology Role Context CLI)

중앙 온톨로지 규칙(`wiki-ontology-rule.md`) 및 역할 분담 계약에 따라, 에이전트의 역할(Planner, Coder, Guardian)에 적합한 컨텍스트 슬라이스를 도구를 통해 조회합니다.

- **CLI 호출 기본 양식**:
  ```bash
  python -B tools/wiki_context.py --global-root D:/obsidian-storage/ai-agent-wiki --project-root D:/obsidian-storage/project-rag --project messaging-platform --mode <MODE> --detail summary
  ```

- **역할별 세부 가이드**:
  1. **Planner (기획/설계 에이전트)**:
     ```bash
     python -B tools/wiki_context.py --global-root D:/obsidian-storage/ai-agent-wiki --project-root D:/obsidian-storage/project-rag --project messaging-platform --mode plan --detail summary
     ```
     - 범위: 로컬 planning(`intent`, `requirement`) 및 approved engineering 목표 설계 요약.
  2. **Coder (구현 에이전트)**:
     ```bash
     python -B tools/wiki_context.py --global-root D:/obsidian-storage/ai-agent-wiki --project-root D:/obsidian-storage/project-rag --project messaging-platform --mode implement --detail summary
     ```
     - 범위: 승인된 스펙(`spec`, `decision`) 및 구현 대상 엔티티 요약 (미검증 대상 포함).
  3. **Guardian (품질/검증/관측 에이전트)**:
     ```bash
     python -B tools/wiki_context.py --global-root D:/obsidian-storage/ai-agent-wiki --project-root D:/obsidian-storage/project-rag --project messaging-platform --mode observe --detail summary
     ```
     - 범위: 승인(`approved`)되고 독립 증거로 검증(`verified`)된 현재 실제 엔지니어링 팩트만 엄격 포함.

---

## ⚙️ 2. AI 에이전트 핵심 행동 수칙 및 거버넌스 (Operating Directives)

1. **지식 우선 탐색 및 결합 (Combine)**:
   - 코드 작성이나 설계 변경 전, 반드시 위 정본 문서(`RAGWIKI`) 및 온톨로지 컨텍스트 CLI를 조회하여 기존 DB 스키마, API DTO 필드, 포트 번호, 암호화 규칙과 100% 일치하도록 코딩합니다.
   - 스키마에 정의되지 않은 필드나 매직 넘버를 임의로 상상하여 작성하는 행위(환각)를 엄격히 금지합니다.

2. **Zero Outbound Leakage 원칙 (엄격 격리)**:
   - 개발, 로컬 실행 및 단위/통합 테스트 시 `app.dev-mode: true` 설정을 반드시 유지합니다.
   - 실제 외부 SMTP 포트 25 전송 및 FCM/APNs 푸시 통신이 외부 공용망으로 유출되지 않도록 모의(Mock) 채널 및 시뮬레이션 모드를 강제합니다.

3. **2-Level 패키징 및 아키텍처 규칙 준수**:
   - 모든 공통 라이브러리 및 마이크로서비스는 `com.ma.{module-name}` 그룹과 아티팩트명을 유지합니다.
   - 서브모듈 간 의존성 순환을 금지하며, 계층화된 엔벨로프 규격(`messaging-common`)을 공통 분모로 사용합니다.

4. **위키 온톨로지 갱신 절차(SOP) 준수**:
   - **매니페스트 동기화**: 신규 스펙 문서나 아티팩트가 추가/수정된 경우 `wiki-manifest.json`에 정규 행으로 등록하고 `source_sha256` 해시 핀을 맞춥니다.
   - **기계적 재고정**: 문서 수정 후 해시 드리프트가 발생하면 `tools/wiki_ontology_refresh.py`를 실행하여 `mechanical-repin` 및 뷰 재생성을 동기화합니다.
     ```bash
     python -B tools/wiki_ontology_refresh.py --global-root D:/obsidian-storage/ai-agent-wiki --project-root D:/obsidian-storage/project-rag --project messaging-platform
     ```
   - **핵심 감사 8체크 검증 의무**: 작업 완료 전 `wiki_audit.py`를 통해 8대 검증 항목(`manifest`, `links`, `isolation`, `pointers`, `applicability`, `evidence-ledger`, `ontology`, `ontology-views`)을 필수 검증하여 exit code `0` 통과를 확인합니다.
     ```bash
     python -B tools/wiki_audit.py --global-root D:/obsidian-storage/ai-agent-wiki --project-root D:/obsidian-storage/project-rag --project messaging-platform --check manifest,links,isolation,pointers,applicability,evidence-ledger,ontology,ontology-views
     ```
   - **승인 게이트 준수**: 사람 소유자의 명시적 승인 인용문 없이 엔티티 lifecycle을 `approved`로 임의 변경할 수 없으며, 승인 시에는 `governance/ontology-acceptance-record.json` 규격을 엄격히 따릅니다.

5. **전체 모듈 빌드 검증 (Build & Integration)**:
   - 변경사항이 발생하면 프로젝트 루트에서 반드시 다음 명령을 실행하여 모든 서브모듈이 정상 컴파일 및 패키징되는지 검증합니다:
     ```powershell
     powershell .\publish-all.ps1
     ```

---

## 📁 3. 버전 관리 및 무결성 관리

- **프로젝트 코드 저장소**: `D:\coding-project\2026-project\messaging-platform-v1`에서 Git 형상 관리를 수행합니다.
- **프로젝트 RAG 볼트**: `D:\obsidian-storage\project-rag` 루트의 독립적인 Git 이력으로 문서가 관리됩니다.
- **시크릿/자격증명 보호**: API 키, DB 비밀번호, KMS 마스터 키 등의 비밀 정보는 Git 및 RAG 문서에 평문으로 커밋하지 않으며, 환경 변수 및 대칭키 암호화 규격을 철저히 준수합니다.
