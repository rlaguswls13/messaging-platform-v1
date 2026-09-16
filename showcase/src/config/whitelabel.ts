export type BankId = 'default';

export interface WhitelabelConfig {
  id: BankId;
  brandName: string;
  brandTagline: string;
  logoGradientClass: string;
  applicationBadge: string;
  sendModeLabel: string;
  sendModeDescription: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  /** 비교표 하단 "가치 요약" 카드 4번째 항목 */
  integrationHighlightTitle: string;
  integrationHighlightDesc: string;
  /** 무료 플랜 카드 배지/설명 문구 */
  freeTierBadge: string;
  freeTierDescription: string;
}

export const WHITELABEL_CONFIGS: Record<BankId, WhitelabelConfig> = {
  default: {
    id: 'default',
    brandName: 'OmniFlow',
    brandTagline: '차세대 옴니채널 메시징 SaaS',
    logoGradientClass: 'from-pastel-blue-600 via-sky-500 to-pastel-orange-500',
    applicationBadge: '중소벤처기업부 「모두의 창업 2기」 출품작 (연계기관 트랙)',
    sendModeLabel: '일반 발송',
    sendModeDescription: '1인 셀러부터 기업까지, 노코드 3-Step으로 즉시 대량 발송합니다. 제휴사(연계기관) 앱 유치 시 인앱 연동 발송도 추가로 지원 가능합니다.',
    heroCtaPrimary: '이미지 1장으로 AI 템플릿 즉시 체험',
    heroCtaSecondary: '채널·인원별 요금표 확인하기',
    integrationHighlightTitle: '제휴사 앱 연동 확장성',
    integrationHighlightDesc: '인앱(In-App) 위젯 연동 구조를 설계하여, 제휴사(연계기관) 앱 유치 시 그 안에서 바로 접근·발송할 수 있도록 확장 가능합니다. 향후 연계기관 확보 시에는 연계기관의 기업 고객풀을 소상공인에게 연결하고, 연계기관 서비스를 이용하는 개인사업자 고객을 신규 고객층으로 확보하는 상생 구조로도 확장할 수 있는 가능성이 있습니다.',
    freeTierBadge: '1인 셀러 / 소상공인',
    freeTierDescription: '월 기본료 0원, 1인 셀러 체험 & 린터 영구 무료',
  },
};

export const DEFAULT_BANK_ID: BankId = 'default';

export function resolveBankId(): BankId {
  return DEFAULT_BANK_ID;
}
