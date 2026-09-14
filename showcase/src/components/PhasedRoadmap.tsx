import React from 'react';
import { Route, Mail, Bell, MessageSquare, ShieldCheck, Zap, ArrowRight, Layers, CheckCircle2 } from 'lucide-react';

export const PhasedRoadmap: React.FC = () => {
  return (
    <section id="roadmap" className="py-20 md:py-28 bg-[#0F1422] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
            <Route className="w-3.5 h-3.5" />
            <span>순차적 채널 온보딩 & 하네스(Harness) 전략</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            진입장벽을 단계적으로 허무는<br />
            <span className="gradient-text">3단계 성장 공식</span>과 모듈식 하네스
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            채널톡·아임웹이 검증한 유니콘의 전략 그대로, 무리한 초기 투자 없이
            오픈형 채널에서 출발하여 공식 통신사 딜러사로 도약하는 현실적인 고수익 로드맵입니다.
          </p>
        </div>

        {/* 3 Step Phased Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 relative">
          
          {/* Phase 1 */}
          <div className="glass-card rounded-3xl p-7 sm:p-8 border border-slate-800 space-y-6 relative group hover:border-indigo-500/50 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Phase 1 : Day 1 즉시 가동
              </span>
              <span className="text-[11px] font-bold text-emerald-400">마진율 100% (원가 0원)</span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">진입장벽 Zero 오픈형 채널</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                복잡한 통신사 심사 없이 즉시 가동되는 채널들로 초기 소상공인과 앱 개발 스타트업을 신속 락인합니다.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="font-bold text-white flex items-center gap-2">
                  <Mail className="w-4 h-4 text-indigo-400" />
                  자체 이메일 (Netty TCP Port 25)
                </div>
                <div className="text-[11px] text-slate-400">자체 SMTP 엔진 + SPF/DKIM 서명 완성 (외부 종속성 0원)</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="font-bold text-white flex items-center gap-2">
                  <Bell className="w-4 h-4 text-purple-400" />
                  앱 푸시 Custom Object API
                </div>
                <div className="text-[11px] text-slate-400">스타트업을 위한 화면 라우팅(딥링크) 정형화 모델 기본 제공</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  LINE Developers 오픈 API
                </div>
                <div className="text-[11px] text-slate-400">심사 없이 개발자 채널 개설 즉시 글로벌/국내 메시징 연동</div>
              </div>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="glass-card rounded-3xl p-7 sm:p-8 border border-slate-800 space-y-6 relative group hover:border-purple-500/50 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Phase 2 : 1~2개월 차
              </span>
              <span className="text-[11px] font-bold text-purple-400">마진율 20~30%</span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">서드파티 딜러사 파트너 연동</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                채널톡·아임웹의 검증된 방식을 채택하여 공식 딜러사 API(Sub-Account 도매 계약)로 자본 리스크 없이 런칭합니다.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" />
                  카카오 알림톡/친구톡, SMS/LMS
                </div>
                <div className="text-[11px] text-slate-400">비즈뿌리오, 솔라피 등 검증된 딜러사 파트너 API 가벼운 연동</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  법적 컴플라이언스 안전망
                </div>
                <div className="text-[11px] text-slate-400">일반 부가통신사업 신고(무자본금) & 솔루션 부가기능 모델로 안전 운영</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  BYOK (Bring Your Own Key) 지원
                </div>
                <div className="text-[11px] text-slate-400">기존 딜러사 계정이 있는 기업은 연동 키만 넣어 즉시 사용</div>
              </div>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="glass-card rounded-3xl p-7 sm:p-8 border-2 border-emerald-500/50 space-y-6 relative group hover:border-emerald-400 transition-all shadow-xl shadow-emerald-500/5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Phase 3 : 5~6개월 차+
              </span>
              <span className="text-[11px] font-bold text-emerald-400">영업이익률 60% 이상 극대화</span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">공식 딜러사 & 자체 에이전트 전환</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                월 발송량 100만 건 달성 시 통신 3사 및 카카오 공식 딜러사로 직등록하여 중간 수수료를 100% 회수합니다.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  특수 부가통신사업자(문자재판매) 등록
                </div>
                <div className="text-[11px] text-slate-400">지원금/투자로 자본금 5천만 원 요건 충족 및 정식 라이선스 취득</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  자체 Netty 통신망 소켓 Agent 직결
                </div>
                <div className="text-[11px] text-slate-400">중계 API 수수료(건당 30~40%)를 전액 제거하고 마진 독점</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  무중단 하네스 핫스왑(Hot-Swap)
                </div>
                <div className="text-[11px] text-slate-400">설정 플래그 하나로 고객사 코드 수정 없이 즉각 자체 통신망 교체</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
