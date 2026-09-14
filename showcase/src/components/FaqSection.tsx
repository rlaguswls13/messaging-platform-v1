import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck, Zap } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FaqItem[] = [
  {
    category: '컴플라이언스 / 과태료',
    question: '정보통신망법 위반 시 최대 3,000만 원 과태료가 나오는데, 2nd Brain AI가 어떻게 100% 차단하나요?',
    answer: '시중의 일반 ChatGPT는 최신 한국 법령을 알지 못해 불법 문구를 제안하지만, OmniFlow는 중앙 마크다운 규제 위키(2nd Brain)에 정보통신망법 제50조, KISA 스팸 가이드라인, 카카오 알림톡 최신 검수 기준을 실시간 동기화하고 있습니다. 메시지 생성 전/후로 (광고) 표기 의무, 080 무료수신거부 번호, 야간 발송(21시~08시) 제한을 자동 검증하고 필수 규제 슬롯을 강제 인젝션하므로 과태료 위험이 0%입니다.'
  },
  {
    category: '엔터프라이즈 보안',
    question: '다른 회사와 같은 클라우드를 쓰면 고객 개인정보가 섞이거나 유출되지 않나요?',
    answer: '절대 섞이지 않습니다. OmniFlow는 단일 테이블 공유 방식을 거부하고, 고객사 ID별로 물리 DB 테이블을 분할 생성하는 [물리 파티션 샤딩]과 고객사별 독립 암호키를 사용하는 [테넌트 전용 KMS]를 적용합니다. 또한 망분리 사내망을 보유한 금융/공공 기관을 위해 사내망 폐쇄망 서버에서 1차 암호화 후 스트리밍하는 [온프레미스 릴레이 에이전트]를 제공하여 클라우드로 평문이 1바이트도 반출되지 않습니다.'
  },
  {
    category: '비즈니스 & 아키텍처',
    question: '카카오 알림톡/문자는 왜 딜러사 API로 시작하며, 나중에 바뀔 때 시스템을 재개발해야 하나요?',
    answer: '채널톡, 아임웹, 테이블링 등 국내 대표 SaaS들이 모두 동일하게 검증한 방식으로, 초기에는 공식 딜러사 API(Sub-Account 도매 계약)로 자본 리스크 없이 빠르게 시장을 검증합니다. 이후 월 100만 건 달성 시 통신 3사 및 카카오 공식 딜러사로 전환합니다. 이때 OmniFlow의 [모듈식 하네스(Harness)] 아키텍처 덕분에 고객사 코드 수정 없이 설정 플래그 하나로 자체 Netty 소켓 통신망으로 1초 만에 무중단 교체(Hot-Swap)됩니다.'
  },
  {
    category: '사용 편의성',
    question: '개발자가 없는 1인 셀러나 소상공인도 바로 사용할 수 있나요?',
    answer: '네, 가능합니다. 복잡한 API 연동이 필요 없는 [Lite 모드]를 지원합니다. 엑셀 파일을 마우스로 끌어다 놓고, AI가 추천해 주는 템플릿 중 마음에 드는 것을 선택한 뒤 [발송] 버튼만 누르면 1분 만에 수만 명의 고객에게 메시지가 발송됩니다. 1만 원 단위의 소액 충전제로 운영되므로 기본료 부담도 전혀 없습니다.'
  },
  {
    category: 'AI 가성비',
    question: 'AI 템플릿 생성 비용이 왜 건당 1원 미만으로 이렇게 저렴한가요?',
    answer: '기존 서비스들은 매 프롬프트마다 수만 자에 달하는 규정 전문을 통째로 LLM에 보내 수십~수백 원의 토큰 비용이 발생했습니다. OmniFlow는 [Context Slicing] 기술을 통해 2nd Brain 위키에서 해당 채널(알림톡/이메일/SMS)에 꼭 필요한 핵심 룰셋(약 300 토큰)만 정밀 발췌하여 경량 AI에 주입합니다. 따라서 토큰 비용을 92% 이상 절감하여 건당 0.8~1.1원이라는 압도적 가성비를 달성했습니다.'
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-28 bg-[#0F1422] border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
            <span>자주 묻는 질문 (FAQ)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            궁금한 점을 모두 답해드립니다
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            법적 컴플라이언스부터 기술 아키텍처 및 도입 절차까지 투명하게 공개합니다.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="glass-card rounded-2xl border border-slate-800 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block">
                      {faq.category}
                    </span>
                    <h3 className="text-base font-bold text-white leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 text-slate-400">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-indigo-400" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/40 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
