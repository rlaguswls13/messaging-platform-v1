import React, { useState } from 'react';
import { ShieldCheck, Key, Database, Network, Globe, Lock, Unlock } from 'lucide-react';

export const SecuritySection: React.FC = () => {
  const [isEncrypted, setIsEncrypted] = useState<boolean>(true);

  return (
    <section id="security" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>온프레미스급 가상 인프라 격리</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            공유 클라우드의 불안함,<br />
            <span className="gradient-text-emerald">완벽한 가상 인프라 격리</span>로 원천 차단했습니다.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            금융, 헬스케어, 대기업이 요구하는 엄격한 개인정보보호 규정(PII)을 충족하기 위해
            테넌트별 암호키와 물리 DB 테이블을 완벽히 분리 격리하여 구축했습니다.
          </p>
        </div>

        {/* 4 Enterprise Security Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Card 1: Tenant KMS Key Isolation (Interactive Encrypt Toggle) */}
          <div className="glass-card rounded-3xl p-7 sm:p-8 border border-slate-800 space-y-5 hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Key className="w-6 h-6" />
              </div>
              <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 font-bold border border-emerald-500/20">
                PBKDF2 / AES-256-GCM
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">1. 테넌트 전용 KMS 암호화 키스토어</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                모든 고객사는 독립된 고유 마스터 키와 Salt/Round를 부여받습니다. 플랫폼 운영자나 타 테넌트가 시스템에 침입하더라도 물리적으로 데이터를 열람할 수 없습니다.
              </p>
            </div>

            {/* Interactive Simulation Widget */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                  {isEncrypted ? <Lock className="w-3.5 h-3.5 text-emerald-400" /> : <Unlock className="w-3.5 h-3.5 text-amber-400" />}
                  데이터 적재 상태 시뮬레이션
                </span>
                <button
                  onClick={() => setIsEncrypted(!isEncrypted)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 text-[11px] font-bold border border-slate-700"
                >
                  {isEncrypted ? '평문 보기 (인증 필요)' : '즉시 암호화 (기본값)'}
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300 break-all">
                {isEncrypted ? (
                  <span className="text-emerald-400">
                    ENC(PBKDF2~7a89f92b...e4f201d898a3c9b74401a)
                  </span>
                ) : (
                  <span className="text-amber-300">
                    홍길동 | 010-9876-5432 | hong@enterprise.co.kr
                  </span>
                )}
              </div>
              <span className="text-[10px] text-slate-500 block text-right">
                * DB 저장 및 네트워크 전송 전 구간 무조건 대칭 암호화 적용
              </span>
            </div>
          </div>

          {/* Card 2: Physical Partition Sharding */}
          <div className="glass-card rounded-3xl p-7 sm:p-8 border border-slate-800 space-y-5 hover:border-blue-500/40 transition-all">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Database className="w-6 h-6" />
              </div>
              <span className="text-xs px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-300 font-bold border border-blue-500/20">
                Zero Data Mixing
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">2. 물리 파티션 테이블 샤딩</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                단일 공유 테이블에 여러 회사의 데이터를 섞어 넣지 않습니다. 고객사 ID와 캠페인 ID 단위로 물리 DB 테이블을 분할 생성하여 정보 혼입을 원천 차단합니다.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 font-mono text-xs">
              <div className="text-slate-400 text-[11px] font-bold">동적 물리 테이블 네이밍 스키마:</div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-blue-300">
                CREATE TABLE <span className="text-yellow-400">tb_target_partition_t09_meta104</span> (...)
              </div>
              <p className="text-[11px] text-slate-400">
                ➔ 타 테넌트와의 조인 불가, 캠페인 완료 후 해당 파티션 테이블만 즉각 물리적 영구 파기(Drop) 지원.
              </p>
            </div>
          </div>

          {/* Card 3: On-Premise Relay Agent */}
          <div className="glass-card rounded-3xl p-7 sm:p-8 border border-slate-800 space-y-5 hover:border-purple-500/40 transition-all">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Network className="w-6 h-6" />
              </div>
              <span className="text-xs px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-300 font-bold border border-purple-500/20">
                망분리 사내망 지원
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">3. 폐쇄망 온프레미스 릴레이 에이전트</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                금융기관이나 의료기관 등 인터넷망과 차단된 내부 DB를 보유한 고객사를 위해, 사내망 서버에서 1차 암호화 후 외부로 스트리밍하는 초경량 에이전트를 제공합니다.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-purple-300 font-bold">
                <span>사내 폐쇄망 DB</span> ➔ <span>릴레이 Agent (사내망 암호화)</span> ➔ <span>OmniFlow 엔진</span>
              </div>
              <p className="text-[11px] text-slate-400">
                외부 클라우드로 고객 개인정보 평문이 1바이트도 반출되지 않는 진정한 온프레미스급 보안 아키텍처.
              </p>
            </div>
          </div>

          {/* Card 4: Dedicated Egress IP */}
          <div className="glass-card rounded-3xl p-7 sm:p-8 border border-slate-800 space-y-5 hover:border-indigo-500/40 transition-all">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Globe className="w-6 h-6" />
              </div>
              <span className="text-xs px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 font-bold border border-indigo-500/20">
                도달률 99.9% 보증
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">4. 스팸 오염 방지용 테넌트 전용 송출 IP</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                공유 IP 환경에서 타사가 스팸을 발송하여 IP가 블랙리스트에 오르면 자사 메일/메시지까지 차단됩니다. OmniFlow는 기업별 Dedicated IP를 배정하여 도메인 신뢰도를 독점 보호합니다.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">전용 고정 IP:</span>
                <span className="text-indigo-400 font-mono font-bold">198.51.100.24 (독점 할당)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">스팸 블랙리스트 이력:</span>
                <span className="text-emerald-400 font-bold">0건 (Clean Reputation)</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
