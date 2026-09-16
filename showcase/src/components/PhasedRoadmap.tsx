import React from 'react';
import { Route, Mail, Bell, MessageSquare, ShieldCheck, Zap, ArrowRight, Layers, CheckCircle2 } from 'lucide-react';

export const PhasedRoadmap: React.FC = () => {
  return (
    <section id="channels" className="py-20 md:py-28 bg-white border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl lg:max-w-4xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pastel-blue-50 border border-pastel-blue-200 text-pastel-blue-700 text-xs font-bold shadow-sm">
            <Route className="w-3.5 h-3.5 text-pastel-orange-500" />
            <span>2) 다양한 채널 : 이메일 / 푸시 / LINE + 문자·메시지 확장 관리</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            사업 확장에 따른 유연한 채널 도입<br />
            <span className="gradient-text font-black">딜러사 API ➔ 중계 Agent ➔ 자체 Netty Agent</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            이메일, 푸시, LINE 등 진입장벽 Zero 오픈 채널로 Day 1 즉시 가동하고, 사업 성장에 따라 딜러사 API 연동 ➔ 딜러사 중계 Agent 활용 ➔ 자체 Netty 소켓 Agent 개발로 전환하는 모듈식 하네스 로드맵을 제공합니다.
          </p>
        </div>

        {/* 3 Step Phased Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 relative">
          
          {/* Phase 1 */}
          <div className="glass-card rounded-3xl p-7 sm:p-8 border border-pastel-blue-200 space-y-6 relative group hover:border-pastel-blue-400 transition-all bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black px-3 py-1 rounded-full bg-pastel-blue-100 text-pastel-blue-800 border border-pastel-blue-200">
                Phase 1 : Day 1 즉시 가동
              </span>
              <span className="text-[11px] font-bold text-emerald-700">마진율 100% (원가 0원)</span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">진입장벽 Zero 오픈형 채널</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                복잡한 통신사 심사 없이 즉시 가동되는 채널들로 초기 소상공인과 앱 개발 스타트업을 신속 락인합니다.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-pastel-blue-50/60 border border-pastel-blue-200/80 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-pastel-blue-600" />
                  자체 이메일 (Netty TCP Port 25)
                </div>
                <div className="text-[11px] text-slate-600">자체 SMTP 엔진 + SPF/DKIM 서명 완성 (외부 종속성 0원)</div>
              </div>

              <div className="p-3.5 rounded-xl bg-pastel-blue-50/60 border border-pastel-blue-200/80 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-purple-600" />
                  앱 푸시 Custom Object API
                </div>
                <div className="text-[11px] text-slate-600">스타트업을 위한 화면 라우팅(딥링크) 정형화 모델 기본 제공</div>
              </div>

              <div className="p-3.5 rounded-xl bg-pastel-blue-50/60 border border-pastel-blue-200/80 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  LINE Developers 오픈 API
                </div>
                <div className="text-[11px] text-slate-600">심사 없이 개발자 채널 개설 즉시 글로벌/국내 메시징 연동</div>
              </div>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="glass-card rounded-3xl p-7 sm:p-8 border border-pastel-orange-200 space-y-6 relative group hover:border-pastel-orange-400 transition-all bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black px-3 py-1 rounded-full bg-pastel-orange-100 text-pastel-orange-800 border border-pastel-orange-200">
                Phase 2 : 1~2개월 차
              </span>
              <span className="text-[11px] font-bold text-pastel-orange-700">마진율 20~30%</span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">서드파티 딜러사 파트너 연동</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                채널톡·아임웹의 검증된 방식을 채택하여 공식 딜러사 API(Sub-Account 도매 계약)로 자본 리스크 없이 런칭합니다.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-pastel-orange-50/60 border border-pastel-orange-200/80 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pastel-orange-600" />
                  카카오 알림톡/친구톡, SMS/LMS
                </div>
                <div className="text-[11px] text-slate-600">비즈뿌리오, 솔라피 등 검증된 딜러사 파트너 API 가벼운 연동</div>
              </div>

              <div className="p-3.5 rounded-xl bg-pastel-orange-50/60 border border-pastel-orange-200/80 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-pastel-blue-600" />
                  법적 컴플라이언스 안전망
                </div>
                <div className="text-[11px] text-slate-600">일반 부가통신사업 신고(무자본금) & 솔루션 부가기능 모델로 안전 운영</div>
              </div>

              <div className="p-3.5 rounded-xl bg-pastel-orange-50/60 border border-pastel-orange-200/80 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  BYOK (Bring Your Own Key) 지원
                </div>
                <div className="text-[11px] text-slate-600">기존 딜러사 계정이 있는 기업은 연동 키만 넣어 즉시 사용</div>
              </div>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="glass-card rounded-3xl p-7 sm:p-8 border-2 border-emerald-300 space-y-6 relative group hover:border-emerald-500 transition-all shadow-md bg-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                Phase 3 : 5~6개월 차+
              </span>
              <span className="text-[11px] font-bold text-emerald-700">영업이익률 60% 이상 극대화</span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">공식 딜러사 & 자체 에이전트 전환</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                월 발송량 100만 건 달성 시 통신 3사 및 카카오 공식 딜러사로 직등록하여 중간 수수료를 100% 회수합니다.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  특수 부가통신사업자(문자재판매) 등록
                </div>
                <div className="text-[11px] text-slate-600">지원금/투자로 자본금 5천만 원 요건 충족 및 정식 라이선스 취득</div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-600" />
                  자체 Netty 통신망 소켓 Agent 직결
                </div>
                <div className="text-[11px] text-slate-600">중계 API 수수료(건당 30~40%)를 전액 제거하고 마진 독점</div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-pastel-blue-600" />
                  무중단 하네스 핫스왑(Hot-Swap)
                </div>
                <div className="text-[11px] text-slate-600">설정 플래그 하나로 고객사 코드 수정 없이 즉각 자체 통신망 교체</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

