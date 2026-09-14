import React from 'react';
import { Check, Sparkles, Shield, Zap, ArrowRight } from 'lucide-react';

export const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>투명하고 합리적인 요금 체계</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            1만 원 소액 충전부터,<br />
            <span className="gradient-text">전용 VPC 보안 격리 플랜</span>까지
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            소상공인에게는 약정 없는 종량제로 부담을 없애고, 엔터프라이즈에게는 최고의 보안 규격을 제공합니다.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Plan 1: Starter / Micro (소호 셀러) */}
          <div className="glass-card rounded-3xl p-8 border border-slate-800 flex flex-col justify-between space-y-6 hover:border-slate-700 transition-all">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-800 text-slate-300">
                  1인 셀러 / 스타트업
                </span>
                <h3 className="text-2xl font-bold text-white mt-2">Lite 마이크로 종량제</h3>
                <p className="text-xs text-slate-400 mt-1">월 기본료 0원, 필요한 만큼 충전해서 즉시 발송</p>
              </div>

              <div className="flex items-baseline gap-1 text-white">
                <span className="text-4xl font-extrabold">0</span>
                <span className="text-sm font-semibold text-slate-400">원 / 월 기본료</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">자체 이메일</span>
                  <span className="text-white font-bold">건당 1.5원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">앱 푸시 (Object)</span>
                  <span className="text-white font-bold">건당 0.2원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">카카오 알림톡</span>
                  <span className="text-white font-bold">건당 8.5원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">SMS 단문</span>
                  <span className="text-white font-bold">건당 9.8원</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300 pt-2">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>2nd Brain AI 규제 린터 기본 무료</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>1만 원 단위 자유 충전 (유효기간 무제한)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>웹 브라우저 3-Click 초간편 발송 UI</span>
                </div>
              </div>
            </div>

            <a
              href="#ai-demo"
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm text-center transition-all border border-slate-700"
            >
              1만 원 충전으로 시작하기
            </a>
          </div>

          {/* Plan 2: Pro Growth (Popular) */}
          <div className="glass-card rounded-3xl p-8 border-2 border-indigo-500/80 flex flex-col justify-between space-y-6 relative shadow-2xl shadow-indigo-500/10">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[11px] font-black uppercase tracking-wider shadow-md">
              Most Popular
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  이커머스 / 테크 스타트업
                </span>
                <h3 className="text-2xl font-bold text-white mt-2">Standard Growth</h3>
                <p className="text-xs text-slate-400 mt-1">앱 푸시 무제한 & LINE 및 크로스채널 자동화</p>
              </div>

              <div className="flex items-baseline gap-1 text-white">
                <span className="text-4xl font-extrabold">49,000</span>
                <span className="text-sm font-semibold text-slate-400">원 / 월</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-indigo-200">앱 푸시 Object API</span>
                  <span className="text-emerald-400 font-bold">무제한 무료</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-indigo-200">LINE 메시징 API</span>
                  <span className="text-emerald-400 font-bold">연동 무제한</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-indigo-200">알림톡 ➔ 문자</span>
                  <span className="text-white font-bold">자동 Failover 무료</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300 pt-2">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Lite 플랜의 모든 혜택 포함</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>크로스채널 캠페인 예약 & 분석 리포트</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>REST API 키 발급 및 Webhook 연동</span>
                </div>
              </div>
            </div>

            <a
              href="#ai-demo"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-bold text-sm text-center transition-all shadow-lg shadow-indigo-600/30 hover:scale-[1.02]"
            >
              14일 무료 체험 시작
            </a>
          </div>

          {/* Plan 3: Enterprise VPC (금융/대기업) */}
          <div className="glass-card rounded-3xl p-8 border border-slate-800 flex flex-col justify-between space-y-6 hover:border-emerald-500/40 transition-all">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  금융 / 헬스케어 / 중견·대기업
                </span>
                <h3 className="text-2xl font-bold text-white mt-2">Enterprise Isolated</h3>
                <p className="text-xs text-slate-400 mt-1">온프레미스급 가상 격리 & 전용선 맞춤 솔루션</p>
              </div>

              <div className="flex items-baseline gap-1 text-white">
                <span className="text-3xl font-extrabold">맞춤 견적</span>
                <span className="text-xs font-semibold text-slate-400">(월 99만 원~)</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">테넌트 전용 KMS</span>
                  <span className="text-emerald-400 font-bold">독립 키스토어</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">물리 파티션 샤딩</span>
                  <span className="text-emerald-400 font-bold">테이블 완전 분리</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">사내망 릴레이 Agent</span>
                  <span className="text-emerald-400 font-bold">무상 기술 지원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">전용 고정 IP</span>
                  <span className="text-emerald-400 font-bold">Dedicated IP 배정</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300 pt-2">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>초당 5.4만 건 전용 발송 큐 할당</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>SLA 99.9% 가용성 및 전담 엔지니어 배정</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>사내망 Oracle / MySQL 직접 연동 지원</span>
                </div>
              </div>
            </div>

            <a
              href="#security"
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 font-bold text-sm text-center transition-all border border-emerald-500/40 hover:border-emerald-500"
            >
              보안 백서 다운로드 & 상담
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
