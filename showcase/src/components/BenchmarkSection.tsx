import React, { useState } from 'react';
import { Activity, Gauge, Check, Clock, TrendingUp, Cpu } from 'lucide-react';

export const BenchmarkSection: React.FC = () => {
  const [targetCount, setTargetCount] = useState<number>(100000);

  // 내부 데이터 전처리(템플릿 병합·개인화 데이터 주입) 파이프라인 실측치. 실제 최종 발송 속도가 아님.
  const tps = 2000;
  const legacyTps = 150;
  const elapsedSec = (targetCount / tps).toFixed(2);
  const legacyElapsedSec = (targetCount / legacyTps).toFixed(1);
  const speedupRatio = Math.round(tps / legacyTps);

  return (
    <section id="performance" className="py-20 md:py-28 bg-slate-50/80 border-t border-slate-200 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-pastel-blue-100/60 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pastel-blue-50 border border-pastel-blue-200 text-pastel-blue-700 text-xs font-bold shadow-sm">
            <Gauge className="w-3.5 h-3.5" />
            <span>실측 벤치마크 데이터</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            말로만 하는 대용량이 아닙니다.<br />
            10만 건 데이터를 <span className="text-pastel-blue-600">약 50초</span> 만에 전처리·파티셔닝합니다.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Netty 기반 리액티브 논블로킹 엔진과 물리 파티셔닝 스트리밍 기술로
            템플릿 병합·개인화 데이터 주입 등 발송 전(前) 내부 처리 단계에서 초당 약 2,000건을 처리합니다.
            (실제 최종 발송 속도는 카카오 알림톡·통신사 SMS 게이트웨이·이메일 릴레이 등 외부 채널 서버 상태에 따라 달라지는 별도 변수입니다.)
          </p>
        </div>

        {/* Benchmark Interactive Simulator Box */}
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-8 bg-white">
          
          {/* Target Count Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Activity className="w-4 h-4 text-pastel-blue-600" />
                발송 타깃 고객 수 시뮬레이션
              </span>
              <span className="text-2xl font-black text-pastel-blue-600 font-mono">
                {targetCount.toLocaleString()} <span className="text-sm text-slate-500 font-normal">건</span>
              </span>
            </div>

            <input
              type="range"
              min="10000"
              max="1000000"
              step="10000"
              value={targetCount}
              onChange={(e) => setTargetCount(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-pastel-blue-600"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>1만 건</span>
              <span>10만 건 (실측치)</span>
              <span>50만 건</span>
              <span>100만 건</span>
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            
            {/* OmniFlow (Our Engine) */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-pastel-blue-50/90 via-white to-sky-50/70 border-2 border-pastel-blue-400 relative space-y-4 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-pastel-blue-600 text-white flex items-center gap-1 shadow-xs">
                  <Cpu className="w-3 h-3" />
                  OmniFlow v1
                </span>
                <span className="text-xs text-pastel-blue-700 font-black">초당 약 2,000건 (내부 전처리)</span>
              </div>

              <div>
                <div className="text-xs text-slate-500">데이터 수집 및 파티셔닝 소요 시간</div>
                <div className="text-4xl sm:text-5xl font-black text-slate-900 font-mono mt-1 flex items-baseline gap-1.5">
                  {elapsedSec} <span className="text-base text-pastel-blue-600 font-bold">초</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pastel-blue-600" />
                  <span>물리 테이블 샤딩 적재 지연 제로</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pastel-blue-600" />
                  <span>Netty 논블로킹 I/O 리액티브 파이프라인</span>
                </div>
              </div>
            </div>

            {/* Legacy Typical Solution */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-200 text-slate-600">
                  시중 B2B 레거시 솔루션
                </span>
                <span className="text-xs text-slate-500">초당 약 150건</span>
              </div>

              <div>
                <div className="text-xs text-slate-500">예상 소요 시간</div>
                <div className="text-4xl sm:text-5xl font-black text-slate-400 font-mono mt-1 flex items-baseline gap-1.5">
                  {legacyElapsedSec} <span className="text-base text-slate-500 font-bold">초</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-500 pt-2 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>동기식 단일 테이블 Insert 병목</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>OmniFlow 대비 약 {speedupRatio}배 느림</span>
                </div>
              </div>
            </div>

          </div>

          {/* Benchmark Verification Footer */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              공식 10만 건 내부 전처리 벤치마크 테스트 완료 (2026-09-03 실측 로그 기록 기준)
            </span>
            <span className="font-mono text-slate-500 text-[11px]">
              Module: messaging-targeting + messaging-payloader
            </span>
          </div>
          <p className="text-[11px] text-slate-400 text-center px-2">
            ※ 위 수치는 발송 전(前) 템플릿 병합·개인화 데이터 주입·CSV 파티셔닝 등 내부 데이터 처리 단계의 실측치이며, 실제 최종 메시지 발송(디스패치) 속도가 아닙니다.
            발송 속도는 카카오 알림톡·통신사 SMS 게이트웨이·이메일 릴레이 등 당사가 통제할 수 없는 외부 채널 서버의 용량 및 상태에 따라 달라집니다.
          </p>

        </div>

      </div>
    </section>
  );
};

