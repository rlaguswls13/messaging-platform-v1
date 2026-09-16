export interface PresetSample {
  id: string;
  title: string;
  badge: string;
  keywords: string[];
  imageUrl: string;
  imageAlt: string;
  aspectRatio: string;
  ocrExtracted: string[];
  channels: {
    kakaoAlimtalk: {
      templateName: string;
      title: string;
      body: string;
      buttonText: string;
      complianceChecked: string[];
      tokens: number;
      costWon: number;
    };
    kakaoFriendtalk: {
      title: string;
      body: string;
      buttonText: string;
      complianceChecked: string[];
      tokens: number;
      costWon: number;
    };
    email: {
      subject: string;
      previewText: string;
      bodyHtml: string;
      complianceChecked: string[];
      tokens: number;
      costWon: number;
    };
    rcs: {
      title: string;
      cards: { title: string; body: string; buttonText: string }[];
      complianceChecked: string[];
      tokens: number;
      costWon: number;
    };
  };
}

export const DEMO_PRESETS: PresetSample[] = [
  {
    id: 'chuseok',
    title: '추석 한우·과일 선물세트 30% 얼리버드',
    badge: '이커머스 / 명절 특가',
    keywords: ['추석 선물세트', '최대 30% 할인', '사전예약 9월 25일까지', '무료 배송'],
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    imageAlt: '추석 명절 선물세트 배너',
    aspectRatio: '1:1 정방형',
    ocrExtracted: ['2026 한가위 프리미엄', '사전예약 30% OFF', '농가직송 1++ 한우세트'],
    channels: {
      kakaoAlimtalk: {
        templateName: '주문/예약 안내형 (승인코드: KAKAO-CHUS-01)',
        title: '[사전예약 안내] #{고객명}님, 추석 선물세트 얼리버드 혜택',
        body: `안녕하세요 #{고객명}님, 풍성한 한가위를 맞아 신청하신 얼리버드 특가 예약이 오픈되었습니다.\n\n▶ 예약 혜택: 전 품목 최대 30% 즉시 할인\n▶ 예약 마감: 9월 25일(금) 18:00까지\n▶ 배송 일정: 희망 수령일 지정 배송 (무료배송)`,
        buttonText: '예약 내역 확인하기',
        complianceChecked: ['정보통신망법 수신동의 확인', '카카오 공식 템플릿 코드 매핑', '개인화 변수 #{고객명} 정상 바인딩'],
        tokens: 310,
        costWon: 0.9,
      },
      kakaoFriendtalk: {
        title: '(광고) [모두의마켓] #{고객명}님만의 한가위 30% 비밀쿠폰 도착',
        body: `올 추석, 가장 소중한 분께 감사의 마음을 전하세요!\n\n엄선된 1++ 한우와 명품 청과 세트를 사전예약 한정 30% 특가로 준비했습니다.\n\n• 기간: ~9/25(금)까지 한정 수량\n• 혜택: 30% 할인 + 보냉백 무료 증정\n\n무료수신거부: 홈 > 채널차단`,
        buttonText: '30% 특가 선물세트 보러가기',
        complianceChecked: ['(광고) 두문 표기 100% 준수', '080 및 채널 차단 링크 자동 주입', '이미지 와이드 배너 규격 검증'],
        tokens: 345,
        costWon: 1.1,
      },
      email: {
        subject: '(광고) [모두의마켓] #{고객명}님, 사전예약 30% 혜택으로 맞이하는 한가위 선물전',
        previewText: '최대 30% 즉시 할인과 지정일 안심 무료 배송 혜택을 지금 확인해보세요.',
        bodyHtml: `<h3>풍요로운 한가위, #{고객명}님을 위한 특별한 제안</h3><p>사전예약 기간 동안만 제공되는 30% 할인과 프리미엄 보냉 포장 혜택을 놓치지 마세요.</p>`,
        complianceChecked: ['제목 (광고) 표기 의무화', '하단 전송자 정보/연락처 인젝션', '원클릭 수신거부 링크 바인딩'],
        tokens: 380,
        costWon: 1.2,
      },
      rcs: {
        title: '추석 얼리버드 선물세트 캐러셀',
        cards: [
          { title: '1++ 한우 선물세트 30%', body: '프리미엄 한우 세트 사전예약 즉시 할인', buttonText: '한우세트 보기' },
          { title: '명품 청과 선물세트', body: '엄선된 과일 세트 + 보냉백 무료 증정', buttonText: '청과세트 보기' },
          { title: '무료배송 마감 D-3', body: '9/25(금) 18:00까지 예약 시 전 상품 무료배송', buttonText: '전체 상품 보기' },
        ],
        complianceChecked: ['RCS Biz 캐러셀 카드 규격(1:1) 검증', '통신 3사 RCS 게이트웨이 연동', '카드별 CTA 버튼 자동 배치'],
        tokens: 460,
        costWon: 1.6,
      }
    }
  },
  {
    id: 'store_open',
    title: '성수 플래그십 오픈 기념 아메리카노 100원',
    badge: '오프라인 매장 / 로컬 F&B',
    keywords: ['성수동 플래그십 오픈', '아메리카노 100원', '선착순 300명', '인증샷 이벤트'],
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
    imageAlt: '카페 플래그십 스토어 배너',
    aspectRatio: '2:1 가로형',
    ocrExtracted: ['FLAGSHIP STORE GRAND OPEN', 'SPECIAL 100 WON COUPON', 'SEONGSU-DONG'],
    channels: {
      kakaoAlimtalk: {
        templateName: '쿠폰 발급 완료형 (승인코드: KAKAO-COUP-09)',
        title: '[쿠폰 발급] #{고객명}님, 성수점 오픈 기념 쿠폰 안내',
        body: `안녕하세요 #{고객명}님, 성수 플래그십 오픈 기념 [아메리카노 100원] 웰컴 쿠폰이 멤버십 계정으로 정상 발급되었습니다.\n\n▶ 쿠폰명: 성수 오픈 웰컴 100원권\n▶ 유효기간: 발급일로부터 14일간\n▶ 사용처: 성수 플래그십 스토어 매장 카운터`,
        buttonText: '내 쿠폰함에서 바코드 열기',
        complianceChecked: ['승인 템플릿 코드 매칭 완료', '광고성 문구 차단 필터 통과', '멤버십 발급 규격 인증'],
        tokens: 295,
        costWon: 0.8,
      },
      kakaoFriendtalk: {
        title: '(광고) [블루빈커피] 성수동 플래그십 오픈! 아메리카노가 100원☕',
        body: `#{고객명}님, 성수동에 블루빈의 첫 플래그십 스토어가 문을 열었습니다!\n\n방문만 하셔도 최고급 스페셜티 아메리카노를 단 100원에 드립니다.\n\n• 선착순 300명 한정\n• 오픈 기념 스페셜 굿즈 증정\n\n무료수신거부: 홈 > 채널차단`,
        buttonText: '100원 쿠폰 다운받기',
        complianceChecked: ['(광고) 표기 준수', '080 채널 차단 링크 바인딩', '이미지 비율 적합성 검증'],
        tokens: 330,
        costWon: 1.0,
      },
      email: {
        subject: '(광고) [블루빈커피] #{고객명}님을 성수 플래그십 오픈 파티에 초대합니다',
        previewText: '오직 고객님만을 위한 100원 스페셜티 쿠폰과 오프닝 굿즈를 확인하세요.',
        bodyHtml: `<h3>성수동의 새로운 랜드마크, 블루빈 플래그십 오픈</h3><p>#{고객명}님, 감각적인 공간과 엄선된 원두를 100원에 경험해보세요.</p>`,
        complianceChecked: ['제목 (광고) 및 발신자 명시', '푸터 법적 080 수신거부', 'HTML 반응형 이메일 규격'],
        tokens: 360,
        costWon: 1.1,
      },
      rcs: {
        title: '성수 플래그십 오픈 이벤트 캐러셀',
        cards: [
          { title: '아메리카노 100원', body: '오픈 기념 선착순 300명 한정 100원 쿠폰', buttonText: '쿠폰 받기' },
          { title: '시그니처 라떼 20% 할인', body: '신메뉴 시그니처 라떼 오픈 기념 할인가', buttonText: '메뉴 보기' },
          { title: '성수 플래그십 찾아오는 길', body: '성수동 매장 위치 및 영업시간 안내', buttonText: '지도로 보기' },
        ],
        complianceChecked: ['RCS Biz 캐러셀 카드 규격(1:1) 검증', '통신 3사 RCS 게이트웨이 연동', '카드별 CTA 버튼 자동 배치'],
        tokens: 440,
        costWon: 1.5,
      }
    }
  },
  {
    id: 'seminar',
    title: '2026 AI SaaS 서밋 & VIP 네트워킹 초대',
    badge: 'B2B 엔터프라이즈 / 웨비나',
    keywords: ['AI SaaS 서밋', '온프레미스 보안 세션', '사전등록 무료', 'VIP 네트워킹'],
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
    imageAlt: '테크 컨퍼런스 세미나 배너',
    aspectRatio: '16:9 와이드형',
    ocrExtracted: ['2026 AI TECH SUMMIT', 'ENTERPRISE SECURITY', 'FREE REGISTRATION'],
    channels: {
      kakaoAlimtalk: {
        templateName: '행사 등록 확인형 (승인코드: KAKAO-CONF-77)',
        title: '[등록 완료] #{고객명}님, 2026 AI SaaS 서밋 신청 안내',
        body: `안녕하세요 #{고객명}님, 2026 AI SaaS 서밋 VIP 참가 신청이 정상 접수되었습니다.\n\n▶ 일시: 10월 15일(목) 14:00 ~ 18:00\n▶ 장소: 코엑스 그랜드볼룸 & 온라인 라이브\n▶ 입장 안내: 현장 등록데스크에서 QR 코드를 제시해주세요.`,
        buttonText: 'VIP 모바일 입장권 확인',
        complianceChecked: ['정보성 알림톡 요건 100% 충족', '광고 요소 없음 검증', '행사 안내 표준 포맷'],
        tokens: 300,
        costWon: 0.9,
      },
      kakaoFriendtalk: {
        title: '(광고) [OmniFlow] 2026 차세대 엔터프라이즈 SaaS 서밋 무료 초대권',
        body: `#{고객명}님, 금융·헬스케어 엔터프라이즈를 위한 가상 인프라 격리와 2nd Brain AI 최신 기술을 공유합니다.\n\n• 선착순 50명 VIP 세션 초대\n• 세션: 온프레미스급 SaaS 보안 실전\n\n무료수신거부: 홈 > 채널차단`,
        buttonText: 'VIP 무료 초대장 등록하기',
        complianceChecked: ['(광고) 명시 준수', '080 채널 차단 링크 포함', '모바일 최적화 레이아웃'],
        tokens: 340,
        costWon: 1.0,
      },
      email: {
        subject: '(광고) [초대장] 2026 AI SaaS 서밋: 온프레미스급 가상 격리 보안과 토큰 최적화',
        previewText: '국내 최고 엔지니어들이 공개하는 2,000 TPS 내부 전처리 메시징 아키텍처 세미나에 초대합니다.',
        bodyHtml: `<h3>2026 AI SaaS Summit VIP Invitation</h3><p>#{고객명}님, 실측 2,000 TPS 내부 전처리 파이프라인 구축 노하우를 직접 확인하세요.</p>`,
        complianceChecked: ['DKIM/SPF 정합성 통과 규격', '전송자 정보 필수 기재', '옵트아웃(수신거부) 링크 완비'],
        tokens: 390,
        costWon: 1.2,
      },
      rcs: {
        title: '2026 AI SaaS 서밋 초대 캐러셀',
        cards: [
          { title: 'VIP 세션 초대', body: '온프레미스급 보안 아키텍처 실전 세션', buttonText: '세션 신청' },
          { title: '네트워킹 라운지', body: '업계 리더와의 1:1 네트워킹 기회', buttonText: '참가 신청' },
          { title: '얼리버드 사전등록 혜택', body: '지금 등록 시 한정 굿즈 증정', buttonText: '사전등록' },
        ],
        complianceChecked: ['RCS Biz 캐러셀 카드 규격(1:1) 검증', '통신 3사 RCS 게이트웨이 연동', '카드별 CTA 버튼 자동 배치'],
        tokens: 470,
        costWon: 1.7,
      }
    }
  }
];
