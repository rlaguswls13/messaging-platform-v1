# 📋 OmniFlow 사업계획서 기반 구현 작업 체크리스트 (task.md)

## Phase 1: 공통 및 코어 엔진 계층
- [x] **1. `messaging-common` 공통 규격 확장** (완료)
  - [x] `ComplianceLawType` enum 신설 (정보통신망법 제50조, 야간 발송 제한)
  - [x] `MessageQueueData`에 Failover 및 컴플라이언스 검증 메타데이터 필드 확장
  - [x] Maven Local에 `com.ma:messaging-common` 배포 완료

- [x] **2. `messaging-payloader` 규제 검증 및 Failover 엔벨로프 보강** (완료)
  - [x] `KakaoPayloadValidator` 및 `MsPayloadValidator`에 광고 표기·080 수신거부 검증 추가
  - [x] Failover 엔벨로프 데이터 조립 로직 보강
  - [x] Maven Local에 `com.ma:messaging-payloader` 배포 완료

- [x] **3. `messaging-dispatcher` 카카오 알림톡 및 Failover MQ 발행 구축 (MSA)** (완료)
  - [x] `KakaoDispatchService` (알림톡 전송 및 dev 시뮬레이션)
  - [x] `SmsDispatchService` (SMS/LMS 순수 발송 및 dev 시뮬레이션)
  - [x] `FailoverRequestPublisher` (알림톡 실패 시 직접 전환하지 않고 MQ로 전환 요청 발행)
  - [x] Maven Local에 `com.ma:messaging-dispatcher` 배포 완료

- [x] **4. [신규 MSA 서비스] `messaging-failover` 구축 (전환 발송 작업 및 데이터 처리)** (완료)
  - [x] 프로젝트 스캐폴딩 (`D:\coding-project\2026-project\messaging-failover`)
  - [x] `FailoverConsumer` (MQ `FAILOVER_REQUEST_QUEUE` 리스너)
  - [x] `FailoverProcessorService` (카카오 ➔ LMS/SMS 본문 치환, 규제 표기 검증, 바이트 계산)
  - [x] `FailoverDispatchPublisher` (최종 문자 발송 큐로 MQ 발행)
  - [x] Maven Local 배포 및 Gradle 설정 완료

## Phase 2: 백엔드 API 및 AI 컴플라이언스 계층
- [x] **5. `messaging-backend` 대시보드·AI 린터·3-Click API 구현** (완료)
  - [x] `DashboardController` & `DashboardMetricService` (발송·도달·오픈·클릭 4대 지표 실시간 집계 & 시계열)
  - [x] `AiComplianceController` & `AiComplianceService` (정보통신망법 제50조 3단계 자동 검증 & Auto-fix)
  - [x] `AiTemplateController` & `AiTemplateService` (업종별 배너·문구 자동 생성)
  - [x] `SimpleCampaignController` (사장님 3-Click 원스톱 간편 발송 API)
  - [x] `QuotaService` (SOHO 무료 플랜 일 300건 캡 등 요금제별 쿼터 통제)
  - [x] Maven Local에 `com.ma:messaging-backend` 배포 완료

## Phase 3: 프론트엔드 Dual-UX 및 대시보드 계층
- [x] **6. `messaging-frontend` 사장님 3-Click 모드 및 서치콘솔 대시보드 구현** (완료)
  - [x] `/simple` 사장님 3-Click 안심 간편 발송 페이지 신설 (연락처 업로드 ➔ AI 문구 ➔ 발송)
  - [x] 메인 대시보드 (`page.tsx`) 구글 서치콘솔 / Ads 스타일 실시간 성과 대시보드 전면 개편
  - [x] `Header.tsx`에 [3-Click 간편 모드 ↔ Pro 모드] 토글 스위치 및 인앱 WebView 모드 연동
  - [x] `Sidebar.tsx` 모드별 동적 메뉴 네비게이션 적용
  - [x] Next.js 16.3.4 (Turbopack) 18개 전체 라우트 빌드 통과

## Phase 4: 통합 검증 및 문서화
- [x] **7. 전체 모듈 통합 빌드 검증 (`publish-all.ps1` 업데이트 및 실행)** (완료)
  - [x] 7개 전 모듈(`common`, `targeting`, `payloader`, `dispatcher`, `failover`, `logger`, `backend`) 100% SUCCESS
- [x] **8. `walkthrough.md` 작성 및 최종 완료 보고** (완료)

## Phase 5: 사업자 규모별 3-Tier 시계열 스토리지(MySQL·OpenSearch·ClickHouse) 동적 라우팅 구축
- [x] **9. `messaging-common` 공통 규격 확장** (완료)
  - [x] `StorageType` (`MYSQL`, `OPENSEARCH`, `CLICKHOUSE`) enum 신설
  - [x] `TimeSeriesMetricStore` 공통 인터페이스 및 `MetricQuery`, `TimeSeriesSummaryDto`, `TimeSeriesDailyMetricDto` 정의
  - [x] `MessageLogEvent`에 `tenantId`, `eventType` 필드 확장
  - [x] Maven Local `com.ma:messaging-common` 배포 완료
- [x] **10. `messaging-backend` 3-Tier 스토리지 어댑터 및 동적 라우터 구현** (완료)
  - [x] `application-storage-routing.yml` 설정 파일 신설
  - [x] `TenantStorageConfigService` (테넌트 티어/스토리지 매핑 레지스트리)
  - [x] `MySqlTimeSeriesStoreAdapter` (SOHO 티어 공유 RDB)
  - [x] `OpenSearchTimeSeriesStoreAdapter` (Growth/Pro 티어 NoSQL 검색/시계열)
  - [x] `ClickHouseTimeSeriesStoreAdapter` (Enterprise 티어 대용량 OLAP 초고속 연산)
  - [x] `RoutingTimeSeriesStore` (동적 런타임 위임 라우터)
  - [x] `DashboardMetricService`에 `RoutingTimeSeriesStore` 연동
  - [x] `RoutingTimeSeriesStoreTest` 단위 테스트 통과 및 Maven Local 배포 완료
- [x] **11. `messaging-logger` 테넌트별 분기 영속화 훅 연계** (완료)
  - [x] `message_log_history`에 `tenant_id`, `event_type` 컬럼 및 배치 적재 반영
  - [x] Maven Local 배포 완료
- [x] **12. 전체 단위 테스트 및 7개 모듈 일괄 빌드/배포 검증 (`publish-all.ps1`)** (완료)
  - [x] 7개 전 모듈(`common`, `targeting`, `payloader`, `dispatcher`, `failover`, `logger`, `backend`) 100% SUCCESS
  - [x] `messaging-frontend` (Next.js 16.3.4 Turbopack) 18개 라우트 빌드 통과

## Phase 6: 운영 결함 해결 및 신뢰성·컴플라이언스 고도화 (MSG-001 ~ MSG-013 전건 완료)
- [x] **MSG-001**: 최신 세션·모듈 현황 및 다음 목표 체계화 (완료)
- [x] **MSG-002**: DKIM 개인키 저장소 제거 및 메모리/환경변수 외부 주입 체계 구축, 키 로테이션 가이드 작성 (완료)
- [x] **MSG-003**: `messaging-payloader` 기동 결함 수정(@Autowired 명시, 키 자동생성 방지 가드) (완료)
- [x] **MSG-004**: `messaging-dispatcher` 결과 로그 비동기화 및 3초 타임아웃/아웃박스 즉시 폴백 (완료)
- [x] **MSG-005**: 카카오 트리거 메타데이터(`templateCode`, `senderKey`) 및 MS 미디어(`mediaUrls`) 조립 지원 (완료)
- [x] **MSG-006**: Flyway 마이그레이션 버전 중복(V10) 해소 및 V1~V12 순차 검증(`FlywayMigrationIntegrationTest`) (완료)
- [x] **MSG-007**: 야간 보류 큐 24시간 만료 DLQ 격리, 08:00 스로틀링(`HeldRateLimiter`), 관측성 API 구축 (완료)
- [x] **MSG-008**: 카카오 알림톡 광고성 등록 403 Forbidden Deny Rule 차단, BULK 도메인 야간 보류 일치화 (완료)
- [x] **MSG-009**: Spring @Scheduled 60초 스케줄 자동 실행기 및 WEBHOOK 즉시 거부/야간 예약 사전 차단 가드 (완료)
- [x] **MSG-010**: 테넌트 티어 연동 다중 쿼터(SOHO 300, GROWTH 10,000, ENTERPRISE 100,000), 맞춤 오버라이드 및 스토리지 장애 자동 폴백 (완료)
- [x] **MSG-011**: 통합 빌드 스크립트(`publish-all.ps1`) 7모듈 자동 인식 파이프라인으로 최신화 (완료)
- [x] **MSG-012**: 정보통신망법 제50조 제3항 및 시행령 제62조의2 전자우편 야간 예외 법령 근거 대조 확인 (완료)
- [x] **MSG-013**: 페이로더 공통 봉투 컴플라이언스·대체발송 필드 누락 방지 보존 (완료)

