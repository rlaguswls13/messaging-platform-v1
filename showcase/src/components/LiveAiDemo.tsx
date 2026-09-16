import React, { useState } from 'react';
import { DEMO_PRESETS, PresetSample } from '../data/demoPresets';
import { Sparkles, CheckCircle2, AlertTriangle, Mail, MessageSquare, Flame, Cpu, RefreshCw, GalleryHorizontal } from 'lucide-react';

type ChannelTab = 'kakaoAlimtalk' | 'kakaoFriendtalk' | 'email' | 'rcs';

export const LiveAiDemo: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('chuseok');
  const [channelTab, setChannelTab] = useState<ChannelTab>('kakaoFriendtalk');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<string>('완료');

  const currentPreset: PresetSample = DEMO_PRESETS.find((p) => p.id === selectedPresetId) || DEMO_PRESETS[0];

  const handlePresetChange = (presetId: string) => {
    setSelectedPresetId(presetId);
    triggerGenerationAnimation();
  };

  const triggerGenerationAnimation = () => {
    setIsGenerating(true);
    setGenerationStep('2nd Brain 규제 위키 슬라이싱...');
    setTimeout(() => {
      setGenerationStep('OCR 키워드 & #{변수} 슬롯 필링...');
    }, 400);
    setTimeout(() => {
      setGenerationStep('법적 (광고)·080 표기 완제 조립 완료!');
      setIsGenerating(false);
    }, 900);
  };

  const channelData = currentPreset.channels[channelTab];

  return (
    <section id="templates" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl lg:max-w-4xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pastel-blue-50 border border-pastel-blue-200 text-pastel-blue-700 text-xs font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-pastel-orange-500" />
            <span>3) 템플릿 생성 : AI 기반 채널별 배너 & 정보통신망법 준수</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            AI 기반 채널별 샘플 배너 자동 생성<br />
            <span className="gradient-text font-black">2nd Brain Context 정제</span> & 광고/정보성 법령 구분
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            이미지 1장과 키워드로 채널별 최적 규격 배너를 3초 만에 생성합니다. 국내 정보통신망법 제50조(광고/정보성 구분, 080 수신거부)를 완전 자동 검증합니다.
          </p>
        </div>

        {/* Demo Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Input & Control Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Step 1: Preset Select */}
            <div className="glass-card rounded-2xl p-5 border border-slate-200 space-y-4 shadow-sm bg-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-pastel-blue-700 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-pastel-blue-100 flex items-center justify-center text-[11px] text-pastel-blue-800">1</span>
                  샘플 배너 선택 (원클릭)
                </span>
                <span className="text-[11px] text-slate-500">드래그앤드롭 업로드 시뮬레이션</span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {DEMO_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetChange(preset.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                      selectedPresetId === preset.id
                        ? 'bg-pastel-blue-50/80 border-pastel-blue-500 shadow-sm shadow-pastel-blue-500/10'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <img
                      src={preset.imageUrl}
                      alt={preset.imageAlt}
                      className="w-14 h-14 rounded-lg object-cover border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold border border-slate-200">
                          {preset.badge}
                        </span>
                        <span className="text-[10px] text-slate-400">{preset.aspectRatio}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 truncate mt-1">{preset.title}</h4>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5">
                        OCR: {preset.ocrExtracted.join(' · ')}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Channel Tabs */}
            <div className="glass-card rounded-2xl p-5 border border-slate-200 space-y-4 shadow-sm bg-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-pastel-orange-700 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-pastel-orange-100 flex items-center justify-center text-[11px] text-pastel-orange-800">2</span>
                  발송 채널 선택
                </span>
                <span className="text-[11px] text-slate-500">채널별 규격 즉시 자동 전환</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { setChannelTab('kakaoFriendtalk'); triggerGenerationAnimation(); }}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                    channelTab === 'kakaoFriendtalk'
                      ? 'bg-amber-400 text-slate-950 shadow-sm border border-amber-500'
                      : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  카카오 친구톡 (광고)
                </button>

                <button
                  onClick={() => { setChannelTab('kakaoAlimtalk'); triggerGenerationAnimation(); }}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                    channelTab === 'kakaoAlimtalk'
                      ? 'bg-amber-200/80 text-amber-900 border border-amber-400 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  카카오 알림톡 (정보)
                </button>

                <button
                  onClick={() => { setChannelTab('email'); triggerGenerationAnimation(); }}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                    channelTab === 'email'
                      ? 'bg-pastel-blue-600 text-white shadow-sm shadow-pastel-blue-500/20'
                      : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  반응형 이메일 (MIME)
                </button>

                <button
                  onClick={() => { setChannelTab('rcs'); triggerGenerationAnimation(); }}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                    channelTab === 'rcs'
                      ? 'bg-pastel-orange-500 text-white shadow-sm shadow-pastel-orange-500/20'
                      : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <GalleryHorizontal className="w-3.5 h-3.5" />
                  통신사 RCS (캐러셀)
                </button>
              </div>

              {/* Keywords Preview */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] text-slate-500 block mb-2">자동 감지된 핵심 키워드:</span>
                <div className="flex flex-wrap gap-1.5">
                  {currentPreset.keywords.map((kw, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-pastel-blue-50 text-pastel-blue-700 font-bold border border-pastel-blue-200">
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 2nd Brain Efficiency Gauge Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-pastel-blue-50/80 via-white to-pastel-orange-50/80 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-pastel-blue-600" />
                  2nd Brain Context Slicing 리포트
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  비용 90%+ 절감
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                  <div className="text-[10px] text-slate-500">LLM 주입 토큰</div>
                  <div className="text-lg font-black text-slate-900 flex items-baseline gap-1 mt-0.5">
                    {channelData.tokens} <span className="text-xs font-normal text-slate-500">t</span>
                    <span className="text-[10px] line-through text-slate-400 font-normal">4,200t</span>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                  <div className="text-[10px] text-slate-500">건당 AI 생성 원가</div>
                  <div className="text-lg font-black text-pastel-orange-600 flex items-baseline gap-1 mt-0.5">
                    {channelData.costWon} <span className="text-xs font-bold text-pastel-orange-600">원</span>
                    <span className="text-[10px] line-through text-slate-400 font-normal">45원</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                {channelData.complianceChecked.map((chk, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{chk}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Mockup Smartphone & Email View (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
            
            {/* Generating Overlay State */}
            {isGenerating && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/85 backdrop-blur-sm rounded-3xl animate-fadeIn">
                <RefreshCw className="w-10 h-10 text-pastel-blue-600 animate-spin mb-3" />
                <p className="text-sm font-bold text-pastel-blue-800">{generationStep}</p>
                <span className="text-xs text-slate-500 mt-1">2nd Brain RAG 법령 린터 가동 중</span>
              </div>
            )}

            {/* Smartphone / Email Frame Container */}
            <div className="w-full max-w-md bg-slate-900 rounded-[42px] p-3.5 shadow-2xl border-4 border-slate-800">
              
              {/* Speaker & Sensor Notch */}
              <div className="w-36 h-4 bg-slate-800 mx-auto rounded-full mb-3 flex items-center justify-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                <div className="w-10 h-1 rounded-full bg-slate-700"></div>
              </div>

              {/* Screen Inner */}
              <div className="bg-[#F6F7F9] rounded-[30px] overflow-hidden border border-slate-200 min-h-[540px] flex flex-col">
                
                {/* Chat Header */}
                <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-slate-900 font-black text-xs shadow-xs">
                      {channelTab === 'email' ? '✉️' : channelTab === 'rcs' ? 'RCS' : '톡'}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        {channelTab === 'email'
                          ? 'OmniFlow Mailer'
                          : channelTab === 'rcs'
                          ? '1588-0000 (RCS Biz 발신번호)'
                          : '공식 비즈니스 채널'}
                        <CheckCircle2 className="w-3 h-3 text-amber-500" />
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {channelTab === 'kakaoAlimtalk'
                          ? '알림톡 인증 기관 · 정보성'
                          : channelTab === 'kakaoFriendtalk'
                          ? '인증된 발신 프로필 · 광고성'
                          : channelTab === 'rcs'
                          ? '통신 3사 RCS Biz 채널 인증'
                          : '발신 도메인 인증 완료'}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    검수 승인 100%
                  </span>
                </div>

                {/* Message Canvas Area */}
                <div className="p-4 flex-1 space-y-3 overflow-y-auto">

                  {/* Channel Tag Badge */}
                  <div className="flex items-center justify-center">
                    <span className="text-[10px] px-3 py-0.5 rounded-full bg-white text-slate-500 border border-slate-200 shadow-xs">
                      2026년 9월 14일 오후 2:30 발송 예정
                    </span>
                  </div>

                  {/* 카카오 알림톡: 정보성 템플릿 — 이미지 없는 흰색 카드 + 승인코드 + 아웃라인 버튼 */}
                  {channelTab === 'kakaoAlimtalk' && 'templateName' in channelData && (
                    <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-md space-y-3">
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">알림톡 템플릿</span>
                        <span className="font-mono text-slate-400">{channelData.templateName}</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 tracking-tight leading-relaxed">
                        {channelData.title}
                      </div>
                      <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line font-normal">
                        {channelData.body}
                      </div>
                      <div className="pt-1">
                        <button className="w-full py-2.5 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5">
                          <span>{channelData.buttonText}</span>
                        </button>
                      </div>
                      <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                        정보성 메시지 (광고 아님) · 수신동의 예외 대상
                      </div>
                    </div>
                  )}

                  {/* 카카오 친구톡: 광고 말풍선 — 와이드 이미지 + 굵은 CTA */}
                  {channelTab === 'kakaoFriendtalk' && (() => {
                    const friendtalkData = currentPreset.channels.kakaoFriendtalk;
                    return (
                      <div className="bg-[#FFF7DB] rounded-2xl p-4 border border-amber-200 shadow-md space-y-3">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-black px-1.5 py-0.5 rounded bg-amber-400 text-slate-900">(광고)</span>
                          <span className="text-xs font-bold text-slate-900 tracking-tight">
                            {friendtalkData.title.replace(/^\(광고\)\s*/, '')}
                          </span>
                        </div>
                        <div className="relative rounded-xl overflow-hidden border border-amber-200/70">
                          <img
                            src={currentPreset.imageUrl}
                            alt={currentPreset.imageAlt}
                            className="w-full h-36 object-cover"
                          />
                          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-md text-[10px] text-white font-medium">
                            AI 멀티모달 최적화
                          </div>
                        </div>
                        <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line font-normal">
                          {friendtalkData.body}
                        </div>
                        <div className="pt-1">
                          <button className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm">
                            <span>{friendtalkData.buttonText}</span>
                            <span className="text-slate-400">›</span>
                          </button>
                        </div>
                        <div className="pt-2 border-t border-amber-200/70 flex items-center justify-between text-[10px] text-slate-500">
                          <span>080-880-1234 무료수신거부</span>
                          <span className="text-emerald-700 font-bold">과태료 위험 0%</span>
                        </div>
                      </div>
                    );
                  })()}

                  {/* 반응형 이메일: 발신자/제목/미리보기 헤더가 있는 메일함 뷰 */}
                  {channelTab === 'email' && 'subject' in channelData && (
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
                      <div className="px-4 py-3 border-b border-slate-100 space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span>보낸사람: OmniFlow Mailer &lt;no-reply@omniflow.io&gt;</span>
                          <span>방금 전</span>
                        </div>
                        <div className="text-xs font-bold text-slate-900 leading-snug">{channelData.subject}</div>
                        <div className="text-[11px] text-slate-500 truncate">{channelData.previewText}</div>
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="relative rounded-xl overflow-hidden border border-slate-200">
                          <img
                            src={currentPreset.imageUrl}
                            alt={currentPreset.imageAlt}
                            className="w-full h-36 object-cover"
                          />
                          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-md text-[10px] text-white font-medium">
                            AI 멀티모달 최적화
                          </div>
                        </div>
                        <div
                          className="text-xs text-slate-700 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: channelData.bodyHtml }}
                        />
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                          <span>수신거부 · 발신자 정보 보기</span>
                          <span className="text-emerald-700 font-bold">SPF·DKIM 인증됨</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 통신사 RCS: 가로 스와이프 캐러셀 카드형 — 카카오/문자와 구분되는 리치 UX */}
                  {channelTab === 'rcs' && 'cards' in channelData && (
                    <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-md space-y-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 font-black">
                          RCS 캐러셀
                        </span>
                        <span className="text-xs font-bold text-slate-900 tracking-tight">
                          {channelData.title}
                        </span>
                      </div>

                      <div className="flex gap-2.5 overflow-x-auto pb-1 -mx-1 px-1 snap-x snap-mandatory">
                        {channelData.cards.map((card, idx) => (
                          <div
                            key={idx}
                            className="snap-start shrink-0 w-36 rounded-xl border border-slate-200 overflow-hidden bg-slate-50 shadow-xs"
                          >
                            <div className="relative">
                              <img
                                src={currentPreset.imageUrl}
                                alt={currentPreset.imageAlt}
                                className="w-full h-24 object-cover"
                              />
                              <span className="absolute top-1.5 left-1.5 text-[9px] px-1.5 py-0.5 rounded-full bg-white/90 text-slate-700 font-bold">
                                {idx + 1}/{channelData.cards.length}
                              </span>
                            </div>
                            <div className="p-2.5 space-y-1">
                              <div className="text-[11px] font-bold text-slate-900 leading-snug">{card.title}</div>
                              <div className="text-[10px] text-slate-500 leading-snug line-clamp-2">{card.body}</div>
                              <button className="w-full mt-1 py-1.5 rounded-lg bg-slate-900 text-white text-[10px] font-bold">
                                {card.buttonText}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                        <span>← 좌우로 스와이프하여 카드 확인 →</span>
                        <span className="text-emerald-700 font-bold">통신 3사 RCS 인증</span>
                      </div>
                    </div>
                  )}

                </div>

                {/* Simulated Input bar */}
                <div className="bg-white px-3 py-2 border-t border-slate-200 flex items-center gap-2">
                  <div className="flex-1 bg-slate-100 rounded-full px-3 py-1.5 text-[11px] text-slate-500">
                    전송 대기 큐 적재 완료 (내부 전처리 2,000 TPS)
                  </div>
                  <div className="w-7 h-7 rounded-full bg-pastel-blue-600 flex items-center justify-center text-white text-xs shadow-xs">
                    ⚡
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

