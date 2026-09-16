import React from 'react';
import { Zap, ShieldCheck, ExternalLink, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-14 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-pastel-blue-600 to-pastel-orange-500 flex items-center justify-center text-white shadow-sm">
                <Zap className="w-4 h-4" />
              </div>
              <span className="text-lg font-black text-white tracking-tight">OmniFlow v1.0</span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed">
              온프레미스급 가상 인프라 격리 보안 및 법령 2nd Brain RAG 연계 초가성비 AI 템플릿 빌더를 내장한 차세대 옴니채널 메시징 SaaS.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>정보통신망법 제50조 및 개인정보보호법(PII) 컴플라이언스 100% 준수</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">주요 기능</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#ai-demo" className="hover:text-pastel-blue-400 transition-colors">AI 템플릿 실시간 체험</a></li>
              <li><a href="#dual-ux" className="hover:text-pastel-blue-400 transition-colors">Dual-UX (Lite vs Pro)</a></li>
              <li><a href="#security" className="hover:text-pastel-blue-400 transition-colors">가상 인프라 격리 보안</a></li>
              <li><a href="#performance" className="hover:text-pastel-blue-400 transition-colors">내부 전처리 2,000 TPS 실측 벤치마크</a></li>
              <li><a href="#roadmap" className="hover:text-pastel-blue-400 transition-colors">3단계 순차 채널 로드맵</a></li>
              <li><a href="#pricing" className="hover:text-pastel-orange-400 transition-colors">채널·인원별 요금표</a></li>
            </ul>
          </div>

          {/* Col 3: Legal & Standards */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">프로젝트 & 규정</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-1">
                <span>중기부 「모두의 창업 2기」</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-pastel-blue-500/20 text-pastel-blue-300 font-mono">2026</span>
              </li>
              <li><span>2nd Brain 실시간 법령 위키 연계</span></li>
              <li><span>통신 3사 및 카카오 공식 딜러사 파이프라인</span></li>
              <li><span>Netty TCP Port 25 SMTP 자체 인프라</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © 2026 OmniFlow Messaging Platform. Built for Modoo Startup Project. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/rlaguswls13/messaging-platform-v1"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-pastel-blue-400 transition-colors"
            >
              <span>GitHub Repository</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
