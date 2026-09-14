import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Activity, CheckCircle2, Zap } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-pink-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-blue-600/15 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 shadow-inner">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-slate-300">
              중소벤처기업부 「모두의 창업 2기」 출품작
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-xs text-indigo-400 font-medium">초가성비 옴니채널 메시징 SaaS</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.18]">
            보안은 <span className="gradient-text-emerald">온프레미스급</span>, 속도는 <span className="text-blue-400">초당 5만 건</span>,<br />
            템플릿은 <span className="gradient-text">AI 2nd Brain</span>으로 3초 만에.
          </h1>

          {/* Sub Headline */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            시시각각 바뀌는 법령 규제(과태료 3,000만 원)의 공포는 <strong className="text-white font-semibold">2nd Brain 규제 린터</strong>로 원천 차단하고,
            금융권 수준의 <strong className="text-white font-semibold">테넌트 KMS 가상 인프라 격리</strong>로 엔터프라이즈의 보안 불신을 완벽히 해결했습니다.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#ai-demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-xl shadow-indigo-600/30 group"
            >
              <Sparkles className="w-5 h-5 text-indigo-200 group-hover:rotate-12 transition-transform" />
              <span>이미지 1장으로 AI 템플릿 즉시 체험</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#security"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold text-slate-300 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-slate-600 transition-all hover:text-white"
            >
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>온프레미스급 가상 격리 보안 사양</span>
            </a>
          </div>

          {/* 3 Core Quantitative Badges */}
          <div className="pt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="glass-card rounded-2xl p-4 flex items-center gap-3.5 text-left border border-slate-800">
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-xl font-bold text-white tracking-tight flex items-baseline gap-1">
                  54,347 <span className="text-xs text-blue-400 font-semibold">TPS</span>
                </div>
                <div className="text-xs text-slate-400">10만 건 1.84초 파티셔닝 실측</div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-4 flex items-center gap-3.5 text-left border border-slate-800">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-xl font-bold text-white tracking-tight flex items-baseline gap-1">
                  0 <span className="text-xs text-emerald-400 font-semibold">과태료 위험</span>
                </div>
                <div className="text-xs text-slate-400">정보통신망법·080 표기 100% 준수</div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-4 flex items-center gap-3.5 text-left border border-slate-800">
              <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-xl font-bold text-white tracking-tight flex items-baseline gap-1">
                  90% <span className="text-xs text-purple-400 font-semibold">토큰 절감</span>
                </div>
                <div className="text-xs text-slate-400">건당 1원 미만 초가성비 AI 제안</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
