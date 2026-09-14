import React, { useState } from 'react';
import { Check, Sparkles, Shield, Zap, ArrowRight, Users, Calculator, MessageSquare, Mail, Bell, Smartphone, HelpCircle, Layers } from 'lucide-react';

export const PricingSection: React.FC = () => {
  const [isYearly, setIsYearly] = useState<boolean>(false);

  // Calculator states
  const [teamSeats, setTeamSeats] = useState<number>(5);
  const [alimtalkCount, setAlimtalkCount] = useState<number>(5000);
  const [emailCount, setEmailCount] = useState<number>(20000);
  const [smsCount, setSmsCount] = useState<number>(1000);
  const [pushCount, setPushCount] = useState<number>(30000);

  // Rate constants
  const EMAIL_RATE = 1.5;
  const PUSH_RATE = 0.2;
  const ALIMTALK_RATE = 8.5;
  const SMS_RATE = 9.8;

  // Plan recommendation logic
  const getRecommendedPlan = () => {
    if (teamSeats >= 25 || alimtalkCount > 30000 || emailCount > 200000) {
      return {
        name: 'Enterprise Isolated',
        basePrice: 990000,
        freeEmails: 300000,
        freePush: 1000000,
        freeAlimtalk: 30000,
        seatsIncluded: '전사 무제한',
      };
    } else if (teamSeats > 5 || alimtalkCount > 10000 || emailCount > 50000) {
      return {
        name: 'Business Scale',
        basePrice: isYearly ? 159000 : 199000,
        freeEmails: 100000,
        freePush: 200000,
        freeAlimtalk: 10000,
        seatsIncluded: '20인 기본 포함',
      };
    } else if (teamSeats > 1 || alimtalkCount > 0 || emailCount > 0) {
      return {
        name: 'Team Growth',
        basePrice: isYearly ? 39000 : 49000,
        freeEmails: 20000,
        freePush: 50000,
        freeAlimtalk: 0,
        seatsIncluded: '5인 기본 포함',
      };
    } else {
      return {
        name: 'Lite 마이크로 종량제',
        basePrice: 0,
        freeEmails: 0,
        freePush: 0,
        freeAlimtalk: 0,
        seatsIncluded: '1인 단독',
      };
    }
  };

  const recPlan = getRecommendedPlan();

  // Calculate extra usage cost
  const billableEmail = Math.max(0, emailCount - recPlan.freeEmails);
  const billablePush = Math.max(0, pushCount - recPlan.freePush);
  const billableAlimtalk = Math.max(0, alimtalkCount - recPlan.freeAlimtalk);

  const emailCost = billableEmail * EMAIL_RATE;
  const pushCost = billablePush * PUSH_RATE;
  const alimtalkCost = billableAlimtalk * ALIMTALK_RATE;
  const smsCost = smsCount * SMS_RATE;

  const totalSendingCost = Math.round(emailCost + pushCost + alimtalkCost + smsCost);
  const totalMonthlyCost = recPlan.basePrice + totalSendingCost;

  return (
    <section id="pricing" className="py-20 md:py-28 relative bg-gradient-to-b from-[#F8FAFC] via-[#F1F7FE] to-[#F8FAFC] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pastel-orange-50 border border-pastel-orange-200 text-pastel-orange-700 text-xs font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>지원 채널 & 워크스페이스 인원수 맞춤 설계</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            1인 셀러의 <span className="text-pastel-blue-600">0원 충전제</span>부터,<br />
            팀 협업 및 <span className="gradient-text">전사 무제한 엔터프라이즈</span>까지
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            발송 채널(이메일·푸시·LINE·알림톡·SMS)과 사용 인원수에 따라 가장 경제적인 플랜을 선택하세요.
          </p>

          {/* Monthly / Yearly Toggle */}
          <div className="pt-6 flex items-center justify-center gap-3 text-sm">
            <span className={`font-semibold ${!isYearly ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>월간 결제</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="w-12 h-6 rounded-full bg-pastel-blue-600 p-0.5 flex items-center transition-all cursor-pointer shadow-inner"
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`font-semibold flex items-center gap-1.5 ${isYearly ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
              <span>연간 결제</span>
              <span className="px-2 py-0.5 rounded-full bg-pastel-orange-100 text-pastel-orange-700 text-xs font-black">
                20% 할인
              </span>
            </span>
          </div>
        </div>

        {/* 4 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch max-w-7xl mx-auto mb-20">
          
          {/* Plan 1: Solo Lite (1인 셀러) */}
          <div className="glass-card rounded-3xl p-6 border border-slate-200 flex flex-col justify-between space-y-6 hover:border-pastel-blue-300 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                  1인 셀러 / 소상공인
                </span>
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> 1인 전용
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">Lite 마이크로 종량제</h3>
                <p className="text-xs text-slate-500 mt-1">월 기본료 0원, 1만 원 단위 충전으로 즉시 발송</p>
              </div>

              <div className="flex items-baseline gap-1 text-slate-900">
                <span className="text-4xl font-black">0</span>
                <span className="text-xs font-semibold text-slate-500">원 / 월 기본료</span>
              </div>

              {/* Channel Rates */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                <div className="font-bold text-slate-700 border-b border-slate-200 pb-1 flex justify-between">
                  <span>지원 채널 단가</span>
                  <span className="text-[10px] text-pastel-blue-600 font-bold">건당 종량제</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">자체 이메일</span>
                  <span className="text-slate-900 font-bold">1.5원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">앱 푸시 (Object)</span>
                  <span className="text-slate-900 font-bold">0.2원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">LINE 메시지</span>
                  <span className="text-pastel-blue-600 font-bold">무료 연동</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">카카오 알림톡</span>
                  <span className="text-slate-900 font-bold">8.5원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">SMS 단문</span>
                  <span className="text-slate-900 font-bold">9.8원</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 pt-1">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pastel-blue-600 shrink-0" />
                  <span>2nd Brain AI 규제 린터 기본 무료</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pastel-blue-600 shrink-0" />
                  <span>1만 원 단위 충전 (유효기간 무제한)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pastel-blue-600 shrink-0" />
                  <span>3-Click 엑셀 업로드 웹 포털</span>
                </div>
              </div>
            </div>

            <a
              href="#ai-demo"
              className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm text-center transition-all border border-slate-300"
            >
              1만 원 충전으로 시작
            </a>
          </div>

          {/* Plan 2: Team Growth (3~5인 팀) */}
          <div className="glass-card rounded-3xl p-6 border border-pastel-blue-300 flex flex-col justify-between space-y-6 hover:border-pastel-blue-500 transition-all shadow-sm hover:shadow-md">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-pastel-blue-50 text-pastel-blue-700 border border-pastel-blue-200">
                  스타트업 / 마케팅팀
                </span>
                <span className="text-xs text-pastel-blue-700 font-bold flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> 5인 포함
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">Team Growth</h3>
                <p className="text-xs text-slate-500 mt-1">팀 협업 워크스페이스 & 발송 승인 결재</p>
              </div>

              <div className="flex items-baseline gap-1 text-slate-900">
                <span className="text-4xl font-black">
                  {isYearly ? '39,000' : '49,000'}
                </span>
                <span className="text-xs font-semibold text-slate-500">원 / 월</span>
              </div>

              {/* Free Monthly Allowances */}
              <div className="p-3.5 rounded-2xl bg-pastel-blue-50/70 border border-pastel-blue-200/80 space-y-2 text-xs">
                <div className="font-bold text-pastel-blue-900 border-b border-pastel-blue-200 pb-1 flex justify-between">
                  <span>월 기본 포함량 (무료)</span>
                  <span className="text-[10px] text-pastel-orange-600 font-bold">월 4.5만원 상당</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">자체 이메일</span>
                  <span className="text-pastel-blue-700 font-bold">20,000건 무료</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">앱 푸시 Object</span>
                  <span className="text-pastel-blue-700 font-bold">50,000건 무료</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">알림톡 ➔ 문자</span>
                  <span className="text-pastel-orange-600 font-bold">Failover 무료</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">초과 알림톡/SMS</span>
                  <span className="text-slate-800 font-bold">8.5원 / 9.8원</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 pt-1">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pastel-blue-600 shrink-0" />
                  <span>5인 협업 권한 (작성자 / 발송승인자)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pastel-blue-600 shrink-0" />
                  <span>오발송 방지 템플릿 결재 워크플로우</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pastel-blue-600 shrink-0" />
                  <span>캠페인 예약 & 크로스채널 성과 분석</span>
                </div>
              </div>
            </div>

            <a
              href="#ai-demo"
              className="w-full py-3 rounded-xl bg-pastel-blue-600 hover:bg-pastel-blue-700 text-white font-bold text-sm text-center transition-all shadow-md shadow-pastel-blue-500/20"
            >
              14일 무료 체험 시작
            </a>
          </div>

          {/* Plan 3: Business Scale (10~30인 기업) - POPULAR */}
          <div className="glass-card rounded-3xl p-6 border-2 border-pastel-orange-400 flex flex-col justify-between space-y-6 relative shadow-xl shadow-pastel-orange-500/10">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-pastel-orange-500 to-pastel-orange-600 text-white text-[11px] font-black uppercase tracking-wider shadow-md">
              Most Popular
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-pastel-orange-50 text-pastel-orange-700 border border-pastel-orange-200">
                  중견 / 성장 이커머스
                </span>
                <span className="text-xs text-pastel-orange-700 font-bold flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> 20인 포함
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">Business Scale</h3>
                <p className="text-xs text-slate-500 mt-1">부서별 서브 테넌트 & LMS/친구톡 풀지원</p>
              </div>

              <div className="flex items-baseline gap-1 text-slate-900">
                <span className="text-4xl font-black">
                  {isYearly ? '159,000' : '199,000'}
                </span>
                <span className="text-xs font-semibold text-slate-500">원 / 월</span>
              </div>

              {/* Free Monthly Allowances */}
              <div className="p-3.5 rounded-2xl bg-pastel-orange-50/70 border border-pastel-orange-200/80 space-y-2 text-xs">
                <div className="font-bold text-pastel-orange-900 border-b border-pastel-orange-200 pb-1 flex justify-between">
                  <span>월 기본 포함량 (무료)</span>
                  <span className="text-[10px] text-pastel-blue-700 font-bold">월 27만원 상당</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">자체 이메일</span>
                  <span className="text-slate-900 font-bold">100,000건 무료</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">앱 푸시 Object</span>
                  <span className="text-slate-900 font-bold">200,000건 무료</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">카카오 알림톡</span>
                  <span className="text-pastel-orange-600 font-bold">10,000건 무료</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">친구톡 / LMS / MMS</span>
                  <span className="text-slate-900 font-bold">전 채널 연동</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 pt-1">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pastel-orange-600 shrink-0" />
                  <span>20인 워크스페이스 & 부서별 3개 서브 테넌트</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pastel-orange-600 shrink-0" />
                  <span>부서별 발송 예산 한도 할당 및 잠금</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pastel-orange-600 shrink-0" />
                  <span>초당 1만 건 발송 큐 우선권 & REST API</span>
                </div>
              </div>
            </div>

            <a
              href="#ai-demo"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pastel-orange-500 to-pastel-orange-600 hover:from-pastel-orange-600 hover:to-pastel-orange-700 text-white font-bold text-sm text-center transition-all shadow-md shadow-pastel-orange-500/25 hover:scale-[1.02]"
            >
              비즈니스 시작하기
            </a>
          </div>

          {/* Plan 4: Enterprise Isolated (무제한 인원 / 대기업) */}
          <div className="glass-card rounded-3xl p-6 border border-slate-200 flex flex-col justify-between space-y-6 hover:border-emerald-400 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                  금융 / 헬스케어 / 대기업
                </span>
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> 전사 무제한
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">Enterprise Isolated</h3>
                <p className="text-xs text-slate-500 mt-1">온프레미스급 가상 격리 & 전용선 연동</p>
              </div>

              <div className="flex items-baseline gap-1 text-slate-900">
                <span className="text-3xl font-black">맞춤 견적</span>
                <span className="text-xs font-semibold text-slate-500">(월 99만~)</span>
              </div>

              {/* Enterprise Security Features */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2 text-xs">
                <div className="font-bold text-emerald-900 border-b border-emerald-200 pb-1 flex justify-between">
                  <span>온프레미스 보안 규격</span>
                  <span className="text-[10px] text-emerald-700 font-bold">100% 독립</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">테넌트 전용 KMS</span>
                  <span className="text-emerald-700 font-bold">독립 키스토어</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">물리 파티션 DB</span>
                  <span className="text-emerald-700 font-bold">테이블 완전 분리</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">사내망 릴레이 Agent</span>
                  <span className="text-emerald-700 font-bold">평문 반출 0%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">전용 고정 IP</span>
                  <span className="text-emerald-700 font-bold">Dedicated IP 배정</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 pt-1">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>전사 인원수(Seat) 무제한 추가</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>초당 5.4만 건 전용 큐 할당 & SLA 99.9%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>사내 Oracle/MySQL 직접 연동 지원</span>
                </div>
              </div>
            </div>

            <a
              href="#security"
              className="w-full py-3 rounded-xl bg-white hover:bg-emerald-50 text-emerald-700 font-bold text-sm text-center transition-all border border-emerald-300 hover:border-emerald-500 shadow-sm"
            >
              보안 백서 다운로드 & 상담
            </a>
          </div>

        </div>

        {/* Team Collaboration & Multi-Channel Visual Showcase */}
        <div className="max-w-5xl mx-auto mb-20 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-blue-100 text-pastel-blue-800 text-xs font-bold">
                <Users className="w-3.5 h-3.5" />
                <span>팀 협업 & 옴니채널 통합 허브</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 leading-snug">
                인원수가 늘어나도,<br />
                <span className="text-pastel-blue-600">권한 분리</span>와 <span className="text-pastel-orange-500">채널 동기화</span>로 안전하게
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                마케터가 템플릿을 작성하고, 팀장이 발송을 최종 승인(Approval Workflow)하여 휴먼 에러를 100% 방지합니다.
                카카오톡, 문자, 이메일, 푸시 알림 채널이 하나의 허브에서 실시간 안전하게 동기화됩니다.
              </p>
              <div className="pt-2 grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Admin / Editor / Viewer</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-pastel-blue-500"></span>
                  <span>부서별 예산 한도 관리</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-pastel-orange-500"></span>
                  <span>실시간 발송 감사 로그</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  <span>다중 채널 자동 Failover</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                <img
                  src="./images/team-collaboration.jpg"
                  alt="팀 협업 워크스페이스 및 멀티채널 발송 아키텍처"
                  className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Pricing Calculator */}
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 sm:p-10 border border-pastel-blue-200 shadow-2xl space-y-8 mb-20 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pastel-blue-50 text-pastel-blue-700 text-xs font-bold border border-pastel-blue-200 mb-2">
                <Calculator className="w-3.5 h-3.5" />
                <span>실시간 맞춤 견적 계산기</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                인원수와 발송량을 입력하면 <span className="text-pastel-blue-600">최적 플랜</span>을 찾아드립니다
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500">추천 플랜</span>
              <div className="text-lg font-black text-pastel-orange-600">{recPlan.name}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left: Input Sliders */}
            <div className="space-y-5">
              
              {/* Slider 1: Team Seats */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-pastel-blue-600" />
                    팀 협업 인원수 (Seats)
                  </span>
                  <span className="text-pastel-blue-600 font-mono text-sm">{teamSeats}명</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="40"
                  value={teamSeats}
                  onChange={(e) => setTeamSeats(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-pastel-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>1인 (단독)</span>
                  <span>5인 (팀)</span>
                  <span>20인 (성장기업)</span>
                  <span>40인+</span>
                </div>
              </div>

              {/* Slider 2: Alimtalk */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-amber-600" />
                    월 카카오 알림톡 건수
                  </span>
                  <span className="text-slate-900 font-mono text-sm">{alimtalkCount.toLocaleString()}건</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="1000"
                  value={alimtalkCount}
                  onChange={(e) => setAlimtalkCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Slider 3: Email */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-pastel-blue-600" />
                    월 이메일 발송 건수
                  </span>
                  <span className="text-slate-900 font-mono text-sm">{emailCount.toLocaleString()}건</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200000"
                  step="5000"
                  value={emailCount}
                  onChange={(e) => setEmailCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-pastel-blue-600"
                />
              </div>

              {/* Slider 4: SMS */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-pastel-orange-600" />
                    월 문자(SMS/LMS) 발송 건수
                  </span>
                  <span className="text-slate-900 font-mono text-sm">{smsCount.toLocaleString()}건</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20000"
                  step="500"
                  value={smsCount}
                  onChange={(e) => setSmsCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-pastel-orange-500"
                />
              </div>

            </div>

            {/* Right: Realtime Cost Breakdown Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-pastel-blue-50/70 to-pastel-orange-50/50 border border-slate-200 flex flex-col justify-between space-y-4">
              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>추천 기본 요금제 ({recPlan.seatsIncluded})</span>
                  <span className="font-bold text-slate-900">{recPlan.basePrice.toLocaleString()}원</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>이메일 발송료 ({recPlan.freeEmails.toLocaleString()}건 무료 공제)</span>
                  <span className="font-bold text-slate-900">{Math.round(emailCost).toLocaleString()}원</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>앱 푸시 발송료 ({recPlan.freePush.toLocaleString()}건 무료 공제)</span>
                  <span className="font-bold text-slate-900">{Math.round(pushCost).toLocaleString()}원</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>카카오 알림톡 ({recPlan.freeAlimtalk.toLocaleString()}건 무료 공제)</span>
                  <span className="font-bold text-slate-900">{Math.round(alimtalkCost).toLocaleString()}원</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>문자(SMS) 발송료</span>
                  <span className="font-bold text-slate-900">{Math.round(smsCost).toLocaleString()}원</span>
                </div>

                <div className="flex justify-between text-emerald-700 font-semibold border-t border-slate-200/80 pt-2">
                  <span>2nd Brain AI 규제 린터 & 템플릿</span>
                  <span>기본 100% 무료</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <span className="text-xs text-slate-500 block">월 예상 총비용 (VAT 별도)</span>
                <div className="text-3xl font-black text-slate-900 mt-1 flex items-baseline gap-1">
                  <span>{totalMonthlyCost.toLocaleString()}</span>
                  <span className="text-base font-bold text-slate-500">원 / 월</span>
                </div>
                <div className="text-[11px] text-pastel-orange-600 font-semibold mt-1">
                  * 타사 레거시 솔루션 대비 약 42%~65% 비용 절감 효과 실현
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Channel Rate Matrix Table */}
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-slate-900">전 채널 건당 단가 및 발송 사양 투명 공개</h3>
            <p className="text-xs text-slate-500">숨겨진 수수료나 복잡한 초기 연동비 없이 100% 투명하게 정산됩니다.</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">발송 채널</th>
                  <th className="py-3.5 px-4">건당 단가</th>
                  <th className="py-3.5 px-4">발송 엔진 & 기술 규격</th>
                  <th className="py-3.5 px-4">2nd Brain 규제 검증</th>
                  <th className="py-3.5 px-4">자동 Failover</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-pastel-blue-50/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-pastel-blue-600" />
                    자체 이메일 (SMTP)
                  </td>
                  <td className="py-3 px-4 text-pastel-blue-700 font-black">1.5원</td>
                  <td className="py-3 px-4 text-slate-600">Netty TCP Port 25 리액티브 엔진 (초당 5.4만 건)</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">080 무료수신거부 자동 인젝션</td>
                  <td className="py-3 px-4 text-slate-400">-</td>
                </tr>

                <tr className="hover:bg-pastel-blue-50/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <Bell className="w-4 h-4 text-purple-600" />
                    앱 푸시 Custom Object
                  </td>
                  <td className="py-3 px-4 text-pastel-blue-700 font-black">0.2원</td>
                  <td className="py-3 px-4 text-slate-600">FCM v1 / APNs HTTP/2 비동기 멀티플렉싱</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">야간 발송(21시~08시) 자동 차단</td>
                  <td className="py-3 px-4 text-slate-600">미수신 시 알림톡 전환</td>
                </tr>

                <tr className="hover:bg-pastel-blue-50/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-emerald-500" />
                    LINE 메시징
                  </td>
                  <td className="py-3 px-4 text-emerald-600 font-black">무료 (0원)</td>
                  <td className="py-3 px-4 text-slate-600">LINE Developers 공식 채널 오픈 API 직연동</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">플랫폼 규정 자동 정합</td>
                  <td className="py-3 px-4 text-slate-400">-</td>
                </tr>

                <tr className="hover:bg-pastel-blue-50/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-amber-500" />
                    카카오 알림톡
                  </td>
                  <td className="py-3 px-4 text-slate-900 font-black">8.5원</td>
                  <td className="py-3 px-4 text-slate-600">공식 서드파티 B2B 파트너 API ➔ 자체 Agent 직연동</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">카카오 검수 반려율 0% (사전 린터)</td>
                  <td className="py-3 px-4 text-pastel-orange-600 font-bold">문자(SMS) 자동 폴백</td>
                </tr>

                <tr className="hover:bg-pastel-blue-50/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-amber-600" />
                    카카오 친구톡
                  </td>
                  <td className="py-3 px-4 text-slate-900 font-black">14.5원</td>
                  <td className="py-3 px-4 text-slate-600">와이드 이미지 및 다중 인터랙티브 버튼 지원</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">(광고) 표기 및 수신거부 슬롯 강제</td>
                  <td className="py-3 px-4 text-pastel-orange-600 font-bold">LMS 장문 자동 폴백</td>
                </tr>

                <tr className="hover:bg-pastel-blue-50/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-pastel-orange-600" />
                    통신사 SMS (단문)
                  </td>
                  <td className="py-3 px-4 text-slate-900 font-black">9.8원</td>
                  <td className="py-3 px-4 text-slate-600">90바이트 이하 즉시 전송, 이동통신 3사 망 연결</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">정보통신망법 50조 자동 규제</td>
                  <td className="py-3 px-4 text-slate-400">-</td>
                </tr>

                <tr className="hover:bg-pastel-blue-50/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-pastel-orange-700" />
                    통신사 LMS (장문)
                  </td>
                  <td className="py-3 px-4 text-slate-900 font-black">29.0원</td>
                  <td className="py-3 px-4 text-slate-600">최대 2,000바이트 장문 안내 및 상세 이벤트 공지</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">080 무료수신거부 필수 삽입</td>
                  <td className="py-3 px-4 text-slate-400">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};

