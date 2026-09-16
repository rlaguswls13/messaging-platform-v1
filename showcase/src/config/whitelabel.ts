export type BankId = 'default' | 'hana';

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
}

export const WHITELABEL_CONFIGS: Record<BankId, WhitelabelConfig> = {
  default: {
    id: 'default',
    brandName: 'OmniFlow',
    brandTagline: '차세대 옴니채널 메시징 SaaS',
    logoGradientClass: 'from-pastel-blue-600 via-sky-500 to-pastel-orange-500',
    applicationBadge: '중소벤처기업부 「모두의 창업 2기」 출품작',
    sendModeLabel: '일반 발송',
    sendModeDescription: '1인 셀러부터 기업까지, 노코드 3-Click으로 즉시 대량 발송합니다.',
    heroCtaPrimary: '이미지 1장으로 AI 템플릿 즉시 체험',
    heroCtaSecondary: '채널·인원별 요금표 확인하기',
  },
  hana: {
    id: 'hana',
    brandName: 'OmniFlow for 제휴기관',
    brandTagline: '제휴기관 전용 화이트라벨 메시징 솔루션',
    logoGradientClass: 'from-emerald-600 via-teal-500 to-emerald-400',
    applicationBadge: '모두의 창업 2기 도전신청서(제휴기관)',
    sendModeLabel: '기관 연계형 발송',
    sendModeDescription: '제휴기관의 자체 앱 알림 체계와 연계하여 고객 접점에 맞춰 발송합니다.',
    heroCtaPrimary: '제휴기관 연계 템플릿 즉시 체험',
    heroCtaSecondary: '제휴기관 전용 요금 안내 확인하기',
  },
};

export const DEFAULT_BANK_ID: BankId = 'default';

// 쿼리스트링 키 별칭: ?bank=hana, ?type=hana 둘 다 허용
const BANK_QUERY_KEYS = ['bank', 'type'];

export function resolveBankId(): BankId {
  if (typeof window === 'undefined') return DEFAULT_BANK_ID;

  // GitHub Pages 프로젝트 서브경로(/messaging-platform-v1/hana)에서도 동작하도록
  // pathname을 세그먼트 단위로 비교한다.
  const segments = window.location.pathname.toLowerCase().split('/').filter(Boolean);
  if (segments.includes('hana')) {
    return 'hana';
  }

  const params = new URLSearchParams(window.location.search);
  for (const key of BANK_QUERY_KEYS) {
    if (params.get(key)?.toLowerCase() === 'hana') {
      return 'hana';
    }
  }

  return DEFAULT_BANK_ID;
}
