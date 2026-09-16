import React from 'react';
import { Layers, Download, CheckCircle2, ShieldCheck, Sparkles, Cpu, ExternalLink } from 'lucide-react';

export const ComparisonTableSection: React.FC = () => {
  return (
    <section id="comparison" className="py-20 md:py-28 bg-white border-b border-slate-200 relative overflow-hidden">
      {/* Soft Background Ambient */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-pastel-blue-100/50 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pastel-blue-50 border border-pastel-blue-200 text-pastel-blue-700 text-xs font-bold shadow-sm">
            <Layers className="w-3.5 h-3.5 text-pastel-blue-600" />
            <span>기술 혁신성 및 차별화 비교</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            기존 B2C 툴과 B2B 솔루션의 한계를<br />
            <span className="gradient-text font-black">엔지니어링으로 혁신</span>했습니다
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            단순 발송 웹 폼에 머무르는 B2C 도구의 분석력 부재와 수억 원대 온프레미스 레거시의 기술 고착화를 극복하고,
            1인 창업가부터 대기업까지 아우르는 4대 핵심 기술 차별성을 확립했습니다.
          </p>
        </div>

        {/* Comparison Graphic Card */}
        <div className="max-w-5xl mx-auto bg-slate-50/80 rounded-3xl border border-slate-200 p-4 sm:p-7 shadow-xl space-y-6">
          
          {/* Top Bar with Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-pastel-blue-100 text-pastel-blue-800 border border-pastel-blue-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-pastel-blue-600" />
                모두의 창업 2기 공식 제출 양식 기준
              </span>
              <span className="hidden sm:inline-block text-xs text-slate-500 font-medium">
                초고해상도 Retina 2x 실측 인포그래픽
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="./omniflow_comparison_table.png"
                download="OmniFlow_핵심기술_비교표.png"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-xs hover:shadow transition-all"
              >
                <Download className="w-3.5 h-3.5 text-pastel-blue-600" />
                <span>비교표 이미지 다운로드 (PNG)</span>
              </a>
            </div>
          </div>

          {/* High-Resolution Rendered Table Image Display */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm group">
            <img
              src="./omniflow_comparison_table.png"
              alt="OmniFlow vs 기존 메시징 솔루션 핵심 기술 비교표"
              className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.005]"
              loading="lazy"
            />
          </div>

          {/* 3 Value Summaries Under Table */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <Sparkles className="w-4 h-4 text-pastel-orange-500" />
                <span>AI 토큰 비용 92% 절감</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                법령 전문 주입 대신 2nd Brain Context Slicing 기법을 적용하여 건당 1원 미만의 극가성비로 완제 조립.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>온프레미스 고착화 해소</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                테넌트 전용 KMS 암호키 격리와 사내망 암복호화 파이프라인으로 수억 원대 SI 구축을 클라우드 구독형으로 전환.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <Cpu className="w-4 h-4 text-pastel-blue-600" />
                <span>실측 2,000 TPS 내부 전처리 파이프라인</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                10만 건 CSV 물리 파티셔닝 약 50초 실측 기록(발송 전 내부 처리) 및 자체 Netty 리액티브 SMTP 소켓 엔진 풀스택 구축 완료. 실제 발송 속도는 외부 채널 서버 상태에 따라 별도.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
