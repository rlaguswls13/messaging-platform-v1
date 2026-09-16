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
    brandTagline: '연계기관 금융앱 연동 상생형 소상공인 안심 마케팅 포털',
    logoGradientClass: 'from-pastel-blue-600 via-sky-500 to-pastel-orange-500',
    applicationBadge: '중소벤처기업부 「모두의 창업 2기」 출품작 (연계기관 트랙)',
    sendModeLabel: '연계기관 금융앱 연동 발송',
    sendModeDescription: '1인 셀러부터 기업까지, 연계기관 금융앱 알림 체계와 연동하여 3-Click으로 즉시 발송합니다.',
    heroCtaPrimary: '이미지 1장으로 AI 템플릿 즉시 체험',
    heroCtaSecondary: '채널·인원별 요금표 확인하기',
    integrationHighlightTitle: '연계기관 금융앱 연동성',
    integrationHighlightDesc: '인앱(In-App) 위젯 연동 최적화로 연계기관 금융앱 안에서 바로 접근·발송 가능. 기존 도구의 외부 개별 사이트 한계를 극복했습니다.',
    freeTierBadge: '연계기관 금융앱 연동 고객',
    freeTierDescription: '월 기본료 0원, 연계기관 사업자 계좌 보유 고객 대상 SOHO 상생 플랜',
  },
};

export const DEFAULT_BANK_ID: BankId = 'default';

export function resolveBankId(): BankId {
  return DEFAULT_BANK_ID;
}
