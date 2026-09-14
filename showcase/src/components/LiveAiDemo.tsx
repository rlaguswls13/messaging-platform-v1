import React, { useState } from 'react';
import { DEMO_PRESETS, PresetSample } from '../data/demoPresets';
import { Sparkles, CheckCircle2, AlertTriangle, Smartphone, Mail, MessageSquare, Flame, Cpu, RefreshCw } from 'lucide-react';

type ChannelTab = 'kakaoAlimtalk' | 'kakaoFriendtalk' | 'email' | 'lms';

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
    <section id="ai-demo" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>실시간 인터랙티브 킬러 기능 체험</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            이미지 1장 + 키워드로 <span className="gradient-text">3초 만에 완성</span>되는<br />
            규정 준수 완제 템플릿 빌더
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            직접 아래 샘플 배너를 클릭해보세요. 2nd Brain AI가 법령 위반(과태료 3천만 원) 위험을 사전에 100% 차단하고,
            건당 1원 미만의 극가성비로 템플릿을 자동 조립합니다.
          </p>
        </div>

        {/* Demo Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Input & Control Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Step 1: Preset Select */}
            <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[11px] text-indigo-300">1</span>
                  샘플 배너 선택 (원클릭)
                </span>
                <span className="text-[11px] text-slate-400">드래그앤드롭 업로드 시뮬레이션</span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {DEMO_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetChange(preset.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                      selectedPresetId === preset.id
                        ? 'bg-indigo-600/15 border-indigo-500/80 shadow-lg shadow-indigo-500/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                    }`}
                  >
                    <img
                      src={preset.imageUrl}
                      alt={preset.imageAlt}
                      className="w-14 h-14 rounded-lg object-cover border border-slate-700 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                          {preset.badge}
                        </span>
                        <span className="text-[10px] text-slate-400">{preset.aspectRatio}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-white truncate mt-1">{preset.title}</h4>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5">
                        OCR: {preset.ocrExtracted.join(' · ')}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Channel Tabs */}
            <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center text-[11px] text-purple-300">2</span>
                  발송 채널 선택
                </span>
                <span className="text-[11px] text-slate-400">채널별 규격 즉시 자동 전환</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { setChannelTab('kakaoFriendtalk'); triggerGenerationAnimation(); }}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                    channelTab === 'kakaoFriendtalk'
                      ? 'bg-yellow-400 text-slate-950 shadow-md shadow-yellow-500/20'
                      : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  카카오 친구톡 (광고)
                </button>

                <button
                  onClick={() => { setChannelTab('kakaoAlimtalk'); triggerGenerationAnimation(); }}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                    channelTab === 'kakaoAlimtalk'
                      ? 'bg-yellow-500/30 text-yellow-300 border border-yellow-500/50'
                      : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  카카오 알림톡 (정보)
                </button>

                <button
                  onClick={() => { setChannelTab('email'); triggerGenerationAnimation(); }}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                    channelTab === 'email'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  반응형 이메일 (MIME)
                </button>

                <button
                  onClick={() => { setChannelTab('lms'); triggerGenerationAnimation(); }}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                    channelTab === 'lms'
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                      : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  통신사 LMS 문자
                </button>
              </div>

              {/* Keywords Preview */}
              <div className="pt-2 border-t border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-2">자동 감지된 핵심 키워드:</span>
                <div className="flex flex-wrap gap-1.5">
                  {currentPreset.keywords.map((kw, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-indigo-300 font-medium border border-slate-700/60">
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 2nd Brain Efficiency Gauge Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-slate-900/50 border border-indigo-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-indigo-400" />
                  2nd Brain Context Slicing 리포트
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  비용 92% 절감
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400">LLM 주입 토큰</div>
                  <div className="text-lg font-extrabold text-white flex items-baseline gap-1 mt-0.5">
                    {channelData.tokens} <span className="text-xs font-normal text-slate-400">t</span>
                    <span className="text-[10px] line-through text-slate-500 font-normal">4,200t</span>
                  </div>
                </div>

                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400">건당 AI 생성 원가</div>
                  <div className="text-lg font-extrabold text-emerald-400 flex items-baseline gap-1 mt-0.5">
                    {channelData.costWon} <span className="text-xs font-normal text-emerald-500">원</span>
                    <span className="text-[10px] line-through text-slate-500 font-normal">45원</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                {channelData.complianceChecked.map((chk, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{chk}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Mockup Smartphone & Email View (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            
            {/* Generating Overlay State */}
            {isGenerating && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0B0F19]/80 backdrop-blur-sm rounded-3xl animate-fadeIn">
                <RefreshCw className="w-10 h-10 text-indigo-400 animate-spin mb-3" />
                <p className="text-sm font-semibold text-indigo-300">{generationStep}</p>
                <span className="text-xs text-slate-400 mt-1">2nd Brain RAG 법령 린터 가동 중</span>
              </div>
            )}

            {/* Smartphone / Email Frame Container */}
            <div className="w-full max-w-md bg-[#181E2A] rounded-[38px] p-3.5 shadow-2xl border-4 border-slate-800 shadow-indigo-500/10">
              
              {/* Speaker & Sensor Notch */}
              <div className="w-36 h-4 bg-slate-900 mx-auto rounded-full mb-3 flex items-center justify-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
                <div className="w-10 h-1 rounded-full bg-slate-800"></div>
              </div>

              {/* Screen Inner */}
              <div className="bg-[#10141D] rounded-[28px] overflow-hidden border border-slate-800/80 min-h-[540px] flex flex-col">
                
                {/* Chat Header */}
                <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-slate-950 font-black text-xs">
                      {channelTab === 'email' ? '✉️' : '톡'}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        {channelTab === 'email' ? 'OmniFlow Mailer' : '공식 비즈니스 채널'}
                        <CheckCircle2 className="w-3 h-3 text-yellow-400" />
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {channelTab === 'kakaoAlimtalk' ? '알림톡 인증 기관' : '인증된 발신 프로필'}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    검수 승인 100%
                  </span>
                </div>

                {/* Message Canvas Area */}
                <div className="p-4 flex-1 space-y-3 overflow-y-auto">
                  
                  {/* Channel Tag Badge */}
                  <div className="flex items-center justify-center">
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-800/80 text-slate-400 border border-slate-700/50">
                      2026년 9월 14일 오후 2:30 발송 예정
                    </span>
                  </div>

                  {/* Render Message Body according to Tab */}
                  <div className="bg-[#1C2433] rounded-2xl p-4 border border-slate-700/70 shadow-lg space-y-3">
                    
                    {/* Header: Legal (광고) Tag Highlight */}
                    {'title' in channelData && (
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-black px-1.5 py-0.5 rounded bg-yellow-400/20 text-yellow-300 border border-yellow-400/40">
                            법적 표기 준수
                          </span>
                          <span className="text-xs font-bold text-white tracking-tight">
                            {channelData.title}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Email Subject View if Email */}
                    {channelTab === 'email' && 'subject' in channelData && (
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                        <div className="text-slate-400 text-[10px] mb-0.5">제목:</div>
                        <div className="text-white font-medium">{channelData.subject}</div>
                      </div>
                    )}

                    {/* Image Attachment inside Message */}
                    <div className="relative rounded-xl overflow-hidden border border-slate-700/60">
                      <img
                        src={currentPreset.imageUrl}
                        alt={currentPreset.imageAlt}
                        className="w-full h-36 object-cover"
                      />
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-md text-[10px] text-white">
                        AI 멀티모달 최적화
                      </div>
                    </div>

                    {/* Body Text */}
                    <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-line font-normal">
                      {'body' in channelData && channelData.body}
                      {channelTab === 'email' && 'bodyHtml' in channelData && (
                        <div
                          className="text-xs text-slate-200"
                          dangerouslySetInnerHTML={{ __html: channelData.bodyHtml }}
                        />
                      )}
                    </div>

                    {/* Button Link */}
                    {'buttonText' in channelData && (
                      <div className="pt-2">
                        <button className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-100 text-xs font-semibold border border-slate-600 flex items-center justify-center gap-1.5 shadow-sm">
                          <span>{channelData.buttonText}</span>
                          <span className="text-slate-400">›</span>
                        </button>
                      </div>
                    )}

                    {/* Legal Footer Info */}
                    <div className="pt-2 border-t border-slate-700/50 flex items-center justify-between text-[10px] text-slate-400">
                      <span>080-880-1234 무료수신거부</span>
                      <span className="text-emerald-400 font-medium">과태료 위험 0%</span>
                    </div>

                  </div>

                </div>

                {/* Simulated Input bar */}
                <div className="bg-slate-900/90 px-3 py-2 border-t border-slate-800 flex items-center gap-2">
                  <div className="flex-1 bg-slate-800/80 rounded-full px-3 py-1.5 text-[11px] text-slate-500">
                    전송 대기 큐 적재 완료 (54,347 TPS)
                  </div>
                  <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs">
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
