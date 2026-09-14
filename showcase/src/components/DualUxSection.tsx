import React, { useState } from 'react';
import { UserCheck, Terminal, UploadCloud, Sparkles, Send, Database, ShieldAlert, Cpu, Layers } from 'lucide-react';

export const DualUxSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lite' | 'pro'>('lite');

  return (
    <section id="dual-ux" className="py-20 md:py-28 bg-[#0F1422] border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>하이브리드 접근성 혁신</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            어려운 기술은 뒤로 숨겼습니다.<br />
            <span className="text-blue-400">3번의 클릭</span>이거나, <span className="gradient-text">무한한 확장성</span>이거나.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            1인 창업가는 복잡한 개발 지식 없이 1분 만에 발송하고, 대기업 엔지니어는 사내망 DB 쿼리와 복합 스케줄러로 초당 수만 건을 제어합니다.
          </p>

          {/* Toggle Switch */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-xl">
              <button
                onClick={() => setActiveTab('lite')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'lite'
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>1인 셀러 / 소상공인 (Lite Mode)</span>
              </button>

              <button
                onClick={() => setActiveTab('pro')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'pro'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Terminal className="w-4 h-4" />
                <span>기업 / 개발자 (Pro Mode)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'lite' ? (
            /* Lite Mode Content */
            <div className="glass-card rounded-3xl p-8 sm:p-10 border border-indigo-500/30 shadow-2xl relative overflow-hidden space-y-8 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-800 pb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-black">
                      3-Click
                    </span>
                    초간편 원스톱 발송 파이프라인
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">엑셀 복사-붙여넣기부터 발송까지 소요 시간 단 1분 미만</p>
                </div>
                <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold border border-indigo-500/20">
                  개발자 연동 불필요
                </span>
              </div>

              {/* 3 Step Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Step 1 */}
                <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 space-y-3 relative group hover:border-indigo-500/50 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white">Step 1. 고객 목록 업로드</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    엑셀이나 CSV 파일을 끌어다 놓으면 번호 정규화와 중복 제거가 0.1초 만에 자동 완료됩니다.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 space-y-3 relative group hover:border-purple-500/50 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white">Step 2. AI 완제 템플릿 선택</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    이미지와 키워드만 넣으면 과태료 걱정 없는 법령 100% 준수 카피와 버튼이 3초 만에 생성됩니다.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 space-y-3 relative group hover:border-emerald-500/50 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                    <Send className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white">Step 3. 즉시 발송 클릭</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    1만 원 소액 충전으로 시작하여 클릭 한 번으로 수만 건의 메시지가 고객 스마트폰으로 도달합니다.
                  </p>
                </div>

              </div>

              {/* Bottom Proof Quote */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3 text-xs text-slate-300">
                <span className="text-indigo-400 font-bold text-sm">💡 실사용 피드백:</span>
                "마케터가 없는 1인 쇼핑몰인데, 알림톡 검수 반려나 과태료 걱정 없이 3번 클릭으로 바로 쏠 수 있어서 시간이 반나절 절약됐습니다."
              </div>
            </div>
          ) : (
            /* Pro Mode Content */
            <div className="glass-card rounded-3xl p-8 sm:p-10 border border-purple-500/30 shadow-2xl relative overflow-hidden space-y-8 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-800 pb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm font-black">
                      CLI / API
                    </span>
                    엔터프라이즈 배치 & DB 쿼리 파이프라인
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">외부 사내망 폐쇄망 DB 직접 쿼리 및 대규모 물리 파티셔닝 스트리밍</p>
                </div>
                <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-semibold border border-purple-500/20">
                  엔터프라이즈 아키텍처
                </span>
              </div>

              {/* Code Snippet Mockup */}
              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-5 font-mono text-xs space-y-2 text-slate-300 overflow-x-auto shadow-inner">
                <div className="flex items-center gap-2 text-slate-500 pb-2 border-b border-slate-800 text-[11px]">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                  <span className="ml-2">application-enterprise-stream.yml</span>
                </div>
                <p><span className="text-purple-400">datasource:</span></p>
                <p>&nbsp;&nbsp;<span className="text-indigo-300">url:</span> <span className="text-emerald-400">jdbc:oracle:thin:@corp-db.internal:1521/ORCL</span></p>
                <p>&nbsp;&nbsp;<span className="text-indigo-300">fetch-size:</span> <span className="text-yellow-400">10000</span> <span className="text-slate-500"># 10만 건 스트리밍 페치</span></p>
                <p><span className="text-purple-400">partitioning:</span></p>
                <p>&nbsp;&nbsp;<span className="text-indigo-300">strategy:</span> <span className="text-emerald-400">PHYSICAL_TABLE_SHARDING</span></p>
                <p>&nbsp;&nbsp;<span className="text-indigo-300">target-table:</span> <span className="text-yellow-400">tb_target_partition_tenant01_2026</span></p>
                <p><span className="text-purple-400">security:</span></p>
                <p>&nbsp;&nbsp;<span className="text-indigo-300">kms-isolated:</span> <span className="text-emerald-400">true</span> <span className="text-slate-500"># 테넌트 전용 KMS 대칭키 암호화</span></p>
                <p>&nbsp;&nbsp;<span className="text-indigo-300">egress-ip:</span> <span className="text-yellow-400">"192.0.2.100"</span> <span className="text-slate-500"># Dedicated IP 전용 발송</span></p>
              </div>

              {/* 3 Enterprise Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-sm font-bold text-white mb-1">
                    <Database className="w-4 h-4 text-purple-400" />
                    사내망 DB 직접 쿼리
                  </div>
                  <p className="text-xs text-slate-400">Oracle, MySQL, PostgreSQL, SFTP 연동으로 번거로운 엑셀 다운로드 불필요</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-sm font-bold text-white mb-1">
                    <Cpu className="w-4 h-4 text-blue-400" />
                    Netty 논블로킹 엔진
                  </div>
                  <p className="text-xs text-slate-400">Netty TCP 소켓 기반으로 초당 5.4만 건의 대량 트래픽을 지연 없이 소화</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-sm font-bold text-white mb-1">
                    <ShieldAlert className="w-4 h-4 text-emerald-400" />
                    자동 Failover 폴백
                  </div>
                  <p className="text-xs text-slate-400">알림톡 미수신 시 LMS 문자로 1초 만에 자동 대체 발송하여 99.9% 도달 보장</p>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </section>
  );
};
