import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Activity, CheckCircle2, Zap } from 'lucide-react';
import { useWhitelabel } from '../context/WhitelabelContext';

export const HeroSection: React.FC = () => {
  const whitelabel = useWhitelabel();
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Soft Pastel Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-pastel-blue-200/50 via-sky-100/40 to-pastel-orange-200/40 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl lg:max-w-5xl mx-auto space-y-6">

          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-pastel-blue-200 shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pastel-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pastel-orange-500"></span>
            </span>
            <span className="text-xs font-bold text-slate-700">
              {whitelabel.applicationBadge}
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs text-pastel-blue-700 font-bold">초가성비 옴니채널 메시징 SaaS</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.18]">
            보안은 <span className="text-pastel-blue-600 font-black">온프레미스급</span>, 전처리는 <span className="text-pastel-orange-500 font-black">초당 2,000건</span>,<br />
            템플릿은 <span className="gradient-text font-black">AI 2nd Brain</span>으로 3초 만에.
          </h1>

          {/* Sub Headline */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
            1인 셀러의 <strong className="text-slate-900 font-bold">마케팅 성과 분석 부재</strong>와 <strong className="text-slate-900 font-bold">법령 규제 불안</strong>은 구글 서치콘솔형 대시보드와 2nd Brain AI로 해결하고,
            기업의 <strong className="text-slate-900 font-bold">온프레미스 고착화</strong>는 테넌트 KMS 가상 인프라 격리 클라우드 구독제로 완벽히 대체합니다.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="#templates"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-pastel-blue-600 via-sky-600 to-pastel-orange-500 hover:from-pastel-blue-700 hover:to-pastel-orange-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-xl shadow-pastel-blue-500/20 group"
            >
              <Sparkles className="w-5 h-5 text-pastel-orange-200 group-hover:rotate-12 transition-transform" />
              <span>{whitelabel.heroCtaPrimary}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-bold text-slate-700 bg-white hover:bg-pastel-blue-50/60 border border-slate-200 hover:border-pastel-blue-300 transition-all shadow-sm hover:shadow"
            >
              <ShieldCheck className="w-5 h-5 text-pastel-orange-500" />
              <span>{whitelabel.heroCtaSecondary}</span>
            </a>
          </div>

          {/* 3 Core Quantitative Badges */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="glass-card rounded-2xl p-4 flex items-center gap-3.5 text-left border border-pastel-blue-100 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-pastel-blue-100 text-pastel-blue-700 flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-black text-slate-900 tracking-tight flex items-baseline gap-1">
                  2,000 <span className="text-xs text-pastel-blue-600 font-bold">TPS (내부 전처리)</span>
                </div>
                <div className="text-xs text-slate-500 font-medium">10만 건 약 50초 파티셔닝 실측 · 발송 속도는 별도</div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-4 flex items-center gap-3.5 text-left border border-pastel-orange-100 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-pastel-orange-100 text-pastel-orange-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-black text-slate-900 tracking-tight flex items-baseline gap-1">
                  0 <span className="text-xs text-pastel-orange-600 font-bold">과태료 위험</span>
                </div>
                <div className="text-xs text-slate-500 font-medium">정보통신망법·080 표기 100% 준수</div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-4 flex items-center gap-3.5 text-left border border-slate-200 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-black text-slate-900 tracking-tight flex items-baseline gap-1">
                  90%+ <span className="text-xs text-sky-600 font-bold">토큰 절감</span>
                </div>
                <div className="text-xs text-slate-500 font-medium">건당 약 1원 초가성비 AI 제안</div>
              </div>
            </div>
          </div>

          {/* Hero Dashboard Preview Image Card */}
          <div className="pt-10 max-w-5xl mx-auto">
            <div className="relative rounded-3xl p-2 bg-gradient-to-b from-white/90 via-white/70 to-pastel-blue-100/60 border border-slate-200 shadow-2xl shadow-pastel-blue-600/10">
              <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
                <img
                  src="./images/hero-preview.jpg"
                  alt="OmniFlow 옴니채널 통합 대시보드 실시간 프리뷰"
                  className="w-full h-auto object-cover transform hover:scale-[1.01] transition-transform duration-500"
                  loading="eager"
                />
              </div>

              {/* Floating Stat Badge */}
              <div className="absolute -bottom-4 right-6 hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-pastel-orange-200 shadow-lg text-slate-800 text-xs font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-pastel-orange-500 animate-ping"></span>
                <span>내부 데이터 전처리 엔진 가동 중: <strong className="text-pastel-blue-600 font-black">2,000 TPS</strong></span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
