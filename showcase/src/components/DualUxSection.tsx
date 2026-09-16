import React, { useState } from 'react';
import { UserCheck, Terminal, UploadCloud, Sparkles, Send, Database, ShieldAlert, Cpu, Layers } from 'lucide-react';
import { useWhitelabel } from '../context/WhitelabelContext';

export const DualUxSection: React.FC = () => {
  const whitelabel = useWhitelabel();
  const [activeTab, setActiveTab] = useState<'lite' | 'pro'>('lite');

  return (
    <section id="accessibility" className="py-20 md:py-28 bg-white border-y border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pastel-blue-50 border border-pastel-blue-200 text-pastel-blue-700 text-xs font-bold shadow-sm">
            <Layers className="w-3.5 h-3.5" />
            <span>4) 고객 접근성 : 1인 셀러 노코드 ➔ 기업/개발자 Pro Mode</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            누구나 쉬운 노코드 워크플로우부터<br />
            <span className="text-pastel-blue-600">사내 DB 직접 쿼리</span>와 <span className="text-pastel-orange-500">테넌트 암호화 Pro Mode</span>까지
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            1인 셀러·소상공인은 복잡한 개발 없이 노코드 3-Click으로 1분 만에 대량 발송하고, 기업 및 전문 엔지니어는 사내망 DB 직접 쿼리와 PBKDF2/AES-256 테넌트 전용 암호화 체계로 대량 데이터를 내부적으로 안전하게 전처리·제어합니다.
          </p>

          {/* Toggle Switch */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200 shadow-sm">
              <button
                onClick={() => setActiveTab('lite')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'lite'
                    ? 'bg-pastel-blue-600 text-white shadow-md shadow-pastel-blue-500/20'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>1인 셀러 / 소상공인 (Lite Mode)</span>
              </button>

              <button
                onClick={() => setActiveTab('pro')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'pro'
                    ? 'bg-pastel-orange-500 text-white shadow-md shadow-pastel-orange-500/20'
                    : 'text-slate-600 hover:text-slate-900'
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
            <div className="glass-card rounded-3xl p-8 sm:p-10 border border-pastel-blue-200 shadow-xl relative overflow-hidden space-y-8 animate-fadeIn bg-white">
              <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-pastel-blue-100 text-pastel-blue-700 flex items-center justify-center text-sm font-black">
                      3-Click
                    </span>
                    초간편 원스톱 발송 파이프라인
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">엑셀 복사-붙여넣기부터 발송까지 소요 시간 단 1분 미만</p>
                </div>
                <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-pastel-blue-50 text-pastel-blue-700 text-xs font-bold border border-pastel-blue-200">
                  {whitelabel.sendModeLabel}
                </span>
              </div>
              <p className="text-xs text-slate-500">{whitelabel.sendModeDescription}</p>

              {/* 3 Step Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Step 1 */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 relative group hover:border-pastel-blue-400 hover:bg-white transition-all shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-pastel-blue-100 text-pastel-blue-700 flex items-center justify-center font-bold">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Step 1. 고객 목록 업로드</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    엑셀이나 CSV 파일을 끌어다 놓으면 번호 정규화와 중복 제거가 0.1초 만에 자동 완료됩니다.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 relative group hover:border-pastel-orange-400 hover:bg-white transition-all shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-pastel-orange-100 text-pastel-orange-700 flex items-center justify-center font-bold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Step 2. AI 완제 템플릿 선택</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    이미지와 키워드만 넣으면 과태료 걱정 없는 법령 100% 준수 카피와 버튼이 3초 만에 생성됩니다.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 relative group hover:border-emerald-400 hover:bg-white transition-all shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <Send className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Step 3. 즉시 발송 클릭</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    1만 원 소액 충전으로 시작하여 클릭 한 번으로 수만 건의 메시지가 고객 스마트폰으로 도달합니다.
                  </p>
                </div>

              </div>

              {/* Bottom Proof Quote */}
              <div className="p-4 rounded-xl bg-pastel-blue-50/70 border border-pastel-blue-200 flex items-center gap-3 text-xs text-slate-700">
                <span className="text-pastel-blue-700 font-bold text-sm">💡 실사용 피드백:</span>
                "마케터가 없는 1인 쇼핑몰인데, 알림톡 검수 반려나 과태료 걱정 없이 3번 클릭으로 바로 쏠 수 있어서 시간이 반나절 절약됐습니다."
              </div>
            </div>
          ) : (
            /* Pro Mode Content */
            <div className="glass-card rounded-3xl p-8 sm:p-10 border border-pastel-orange-300 shadow-xl relative overflow-hidden space-y-8 animate-fadeIn bg-white">
              <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-pastel-orange-100 text-pastel-orange-700 flex items-center justify-center text-sm font-black">
                      CLI / API
                    </span>
                    엔터프라이즈 배치 & DB 쿼리 파이프라인
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">외부 사내망 폐쇄망 DB 직접 쿼리 및 대규모 물리 파티셔닝 스트리밍</p>
                </div>
                <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-pastel-orange-50 text-pastel-orange-700 text-xs font-bold border border-pastel-orange-200">
                  엔터프라이즈 아키텍처
                </span>
              </div>

              {/* Code Snippet Mockup */}
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 font-mono text-xs space-y-2 text-slate-300 overflow-x-auto shadow-inner">
                <div className="flex items-center gap-2 text-slate-400 pb-2 border-b border-slate-800 text-[11px]">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                  <span className="ml-2">application-enterprise-stream.yml</span>
                </div>
                <p><span className="text-pastel-orange-400">datasource:</span></p>
                <p>&nbsp;&nbsp;<span className="text-sky-300">url:</span> <span className="text-emerald-400">jdbc:oracle:thin:@corp-db.internal:1521/ORCL</span></p>
                <p>&nbsp;&nbsp;<span className="text-sky-300">fetch-size:</span> <span className="text-amber-300">10000</span> <span className="text-slate-500"># 10만 건 스트리밍 페치</span></p>
                <p><span className="text-pastel-orange-400">partitioning:</span></p>
                <p>&nbsp;&nbsp;<span className="text-sky-300">strategy:</span> <span className="text-emerald-400">PHYSICAL_TABLE_SHARDING</span></p>
                <p>&nbsp;&nbsp;<span className="text-sky-300">target-table:</span> <span className="text-amber-300">tb_target_partition_tenant01_2026</span></p>
                <p><span className="text-pastel-orange-400">security:</span></p>
                <p>&nbsp;&nbsp;<span className="text-sky-300">kms-isolated:</span> <span className="text-emerald-400">true</span> <span className="text-slate-500"># 테넌트 전용 KMS 대칭키 암호화</span></p>
                <p>&nbsp;&nbsp;<span className="text-sky-300">egress-ip:</span> <span className="text-amber-300">"192.0.2.100"</span> <span className="text-slate-500"># Dedicated IP 전용 발송</span></p>
              </div>

              {/* 3 Enterprise Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-1">
                    <Database className="w-4 h-4 text-pastel-orange-600" />
                    사내망 DB 직접 쿼리
                  </div>
                  <p className="text-xs text-slate-600">Oracle, MySQL, PostgreSQL, SFTP 연동으로 번거로운 엑셀 다운로드 불필요</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-1">
                    <Cpu className="w-4 h-4 text-pastel-blue-600" />
                    Netty 논블로킹 엔진
                  </div>
                  <p className="text-xs text-slate-600">Netty TCP 소켓 기반으로 초당 약 2,000건의 내부 데이터 전처리를 지연 없이 소화 (최종 발송 속도는 외부 채널 서버 상태에 따라 별도)</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-1">
                    <ShieldAlert className="w-4 h-4 text-emerald-600" />
                    자동 Failover 폴백
                  </div>
                  <p className="text-xs text-slate-600">알림톡 미수신 시 LMS 문자로 1초 만에 자동 대체 발송하여 99.9% 도달 보장</p>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </section>
  );
};
