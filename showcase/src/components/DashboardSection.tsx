import React, { useState } from 'react';
import { 
  BarChart3, 
  Send, 
  MailOpen, 
  MousePointerClick, 
  Users, 
  TrendingUp, 
  Calendar, 
  Filter, 
  CheckCircle2, 
  ShieldCheck
} from 'lucide-react';

interface MetricCard {
  id: 'sent' | 'open' | 'click' | 'reach';
  title: string;
  value: string;
  subValue: string;
  diff: string;
  isPositive: boolean;
  color: string;
  activeBorder: string;
  badgeBg: string;
  chartColor: string;
}

interface DailyDataPoint {
  date: string;
  sent: number;
  open: number;
  click: number;
  reach: number;
}

const METRICS: MetricCard[] = [
  {
    id: 'sent',
    title: '총 발송수 (Total Sent)',
    value: '1,428,500',
    subValue: '건 (실시간 누적)',
    diff: '+18.4%',
    isPositive: true,
    color: 'text-pastel-blue-600',
    activeBorder: 'border-pastel-blue-500 ring-2 ring-pastel-blue-100',
    badgeBg: 'bg-pastel-blue-50 text-pastel-blue-700 border-pastel-blue-200',
    chartColor: '#2563eb'
  },
  {
    id: 'open',
    title: '오픈율 (Open Rate)',
    value: '28.4%',
    subValue: '405,694건 오픈',
    diff: '+3.2%p',
    isPositive: true,
    color: 'text-emerald-600',
    activeBorder: 'border-emerald-500 ring-2 ring-emerald-100',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    chartColor: '#059669'
  },
  {
    id: 'click',
    title: '클릭률 (CTR)',
    value: '8.7%',
    subValue: '124,280건 클릭',
    diff: '+1.5%p',
    isPositive: true,
    color: 'text-pastel-orange-600',
    activeBorder: 'border-pastel-orange-500 ring-2 ring-pastel-orange-100',
    badgeBg: 'bg-pastel-orange-50 text-pastel-orange-700 border-pastel-orange-200',
    chartColor: '#ea580c'
  },
  {
    id: 'reach',
    title: '도달 고객수 (Unique Reach)',
    value: '384,200',
    subValue: '명 (중복 제거)',
    diff: '+12,400명',
    isPositive: true,
    color: 'text-indigo-600',
    activeBorder: 'border-indigo-500 ring-2 ring-indigo-100',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    chartColor: '#6366f1'
  }
];

const TIME_SERIES_DATA: DailyDataPoint[] = [
  { date: '09/09 (월)', sent: 160000, open: 42000, click: 12500, reach: 45000 },
  { date: '09/10 (화)', sent: 210000, open: 61000, click: 19800, reach: 58000 },
  { date: '09/11 (수)', sent: 195000, open: 54000, click: 16200, reach: 52000 },
  { date: '09/12 (목)', sent: 245000, open: 71000, click: 22400, reach: 67000 },
  { date: '09/13 (금)', sent: 280000, open: 82000, click: 26500, reach: 74000 },
  { date: '09/14 (토)', sent: 155000, open: 39000, click: 11200, reach: 41000 },
  { date: '09/15 (오늘)', sent: 183500, open: 56694, click: 15680, reach: 47200 },
];

const CHANNEL_PERFORMANCE = [
  {
    channel: '카카오 알림톡/친구톡',
    type: '알림·마케팅',
    sent: '654,200건',
    openRate: '68.5%',
    clickRate: '14.2%',
    reach: '210,500명',
    successRate: '99.98%',
    compliance: '정보통신망법 완제 (080 무료수신거부 자동연동)',
  },
  {
    channel: '앱 푸시 (FCM / APNs)',
    type: '실시간 푸시',
    sent: '420,000건',
    openRate: '21.4%',
    clickRate: '9.8%',
    reach: '124,000명',
    successRate: '99.92%',
    compliance: '야간 발송(20:00~08:00) 사전 동의 필터 가동',
  },
  {
    channel: '자체 이메일 (Netty SMTP)',
    type: '대량 레터/트랜잭션',
    sent: '235,100건',
    openRate: '18.2%',
    clickRate: '4.6%',
    reach: '89,500명',
    successRate: '99.85%',
    compliance: 'SPF / DKIM / DMARC 100% 통과, 080 수신거부 하단 포함',
  },
  {
    channel: 'LINE Developers',
    type: '글로벌·국내 메시지',
    sent: '85,400건',
    openRate: '42.1%',
    clickRate: '11.5%',
    reach: '31,200명',
    successRate: '99.95%',
    compliance: 'LINE 공식 채널 정책 및 광고 가이드라인 준수',
  },
  {
    channel: 'SMS / LMS (비즈뿌리오 연동)',
    type: '긴급 공지·백업',
    sent: '33,800건',
    openRate: '78.2%',
    clickRate: '6.4%',
    reach: '29,000명',
    successRate: '99.90%',
    compliance: '(광고) 표기 및 080 번호 표준 규격 자동 필터링',
  },
];

export const DashboardSection: React.FC = () => {
  const [activeMetrics, setActiveMetrics] = useState<Record<string, boolean>>({
    sent: true,
    open: true,
    click: true,
    reach: true
  });

  const [dateRange, setDateRange] = useState<'7d' | '28d' | '3m' | 'realtime'>('7d');
  const [activeTab, setActiveTab] = useState<'channels' | 'compliance'>('channels');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const toggleMetric = (id: string) => {
    setActiveMetrics(prev => {
      const next = { ...prev, [id]: !prev[id] };
      const hasActive = Object.values(next).some(v => v);
      return hasActive ? next : prev;
    });
  };

  const chartWidth = 900;
  const chartHeight = 240;
  const paddingX = 40;
  const paddingY = 30;

  const maxSent = 300000;
  const maxOpen = 100000;
  const maxClick = 35000;
  const maxReach = 90000;

  const getCoordinates = (val: number, max: number, idx: number) => {
    const x = paddingX + (idx / (TIME_SERIES_DATA.length - 1)) * (chartWidth - paddingX * 2);
    const y = chartHeight - paddingY - (val / max) * (chartHeight - paddingY * 2);
    return { x, y };
  };

  const generatePath = (key: 'sent' | 'open' | 'click' | 'reach', max: number) => {
    return TIME_SERIES_DATA.map((d, i) => {
      const { x, y } = getCoordinates(d[key], max, i);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  return (
    <section id="dashboard" className="py-20 md:py-28 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pastel-blue-50 border border-pastel-blue-200 text-pastel-blue-700 text-xs font-bold shadow-sm">
            <BarChart3 className="w-3.5 h-3.5 text-pastel-blue-600" />
            <span>1) 대시보드 : 발송, 클릭, 오픈, 고객 수 실시간 분석</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            구글 서치콘솔 & Ads와 똑같은<br />
            <span className="gradient-text font-black">통합 마케팅 성과 대시보드</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            발송 건수, 오픈율, 클릭률(CTR), 도달 고객 수를 한눈에 비교 분석하세요.
            상단 카드를 클릭하여 지표를 토글하고, 채널별 마케팅 ROI와 법령 수신동의 현황을 실시간으로 추적합니다.
          </p>
        </div>

        {/* Console Container */}
        <div className="bg-slate-50/80 rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-lg space-y-6">

          {/* Top Bar: Search Console Style Filters & Status */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-xs">
                <Calendar className="w-3.5 h-3.5 text-pastel-blue-600" />
                <span>기간:</span>
                <div className="flex gap-1 ml-1">
                  {(['7d', '28d', '3m', 'realtime'] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setDateRange(r)}
                      className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-colors ${
                        dateRange === r
                          ? 'bg-pastel-blue-600 text-white'
                          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {r === '7d' ? '최근 7일' : r === '28d' ? '최근 28일' : r === '3m' ? '3개월' : '실시간 (Live)'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-600 shadow-xs">
                <Filter className="w-3.5 h-3.5 text-pastel-orange-500" />
                <span>필터: 전 채널 통합 (카카오, 이메일, 푸시, LINE, SMS)</span>
              </div>
            </div>

            {/* Live Netty Status Badge */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Netty 엔진 정상 가동 중 (큐 지연 0.0ms)</span>
              </div>
            </div>
          </div>

          {/* 4 Main Scorecards (Search Console Toggle Style) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {METRICS.map((metric) => {
              const isActive = activeMetrics[metric.id];
              return (
                <div
                  key={metric.id}
                  onClick={() => toggleMetric(metric.id)}
                  className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer select-none shadow-xs hover:shadow-md ${
                    isActive ? metric.activeBorder : 'border-slate-200 opacity-50 hover:opacity-80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: metric.chartColor }}
                      />
                      {metric.title}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${metric.badgeBg}`}>
                      {metric.diff}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1.5">
                    <span className={`text-2xl sm:text-3xl font-black tracking-tight ${metric.color}`}>
                      {metric.value}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-500 mt-1 font-medium flex items-center justify-between">
                    <span>{metric.subValue}</span>
                    <span className="text-[10px] text-slate-400 font-semibold">
                      {isActive ? '클릭 시 차트 숨김' : '클릭 시 차트 표시'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive SVG Chart Area */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
              <span className="font-bold text-slate-700 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-pastel-blue-600" />
                일별 발송·반응 시계열 인터랙티브 차트 (Google Search Console 그래프 뷰)
              </span>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slate-400">포인트에 마우스를 올리면 당일 상세 수치를 확인할 수 있습니다</span>
              </div>
            </div>

            {/* SVG Visual */}
            <div className="relative w-full overflow-x-auto">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full h-56 min-w-[650px] overflow-visible"
              >
                {/* Horizontal Grid lines */}
                {[0, 1, 2, 3, 4].map((step) => {
                  const y = paddingY + (step / 4) * (chartHeight - paddingY * 2);
                  return (
                    <line
                      key={step}
                      x1={paddingX}
                      y1={y}
                      x2={chartWidth - paddingX}
                      y2={y}
                      stroke="#f1f5f9"
                      strokeWidth="1.5"
                    />
                  );
                })}

                {/* Vertical Guides for Days */}
                {TIME_SERIES_DATA.map((d, i) => {
                  const { x } = getCoordinates(0, 1, i);
                  return (
                    <g key={i}>
                      <line
                        x1={x}
                        y1={paddingY}
                        x2={x}
                        y2={chartHeight - paddingY}
                        stroke={hoveredIndex === i ? '#cbd5e1' : '#f8fafc'}
                        strokeWidth={hoveredIndex === i ? '2' : '1'}
                        strokeDasharray={hoveredIndex === i ? '4 4' : 'none'}
                      />
                      <text
                        x={x}
                        y={chartHeight - 8}
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="600"
                        fill={hoveredIndex === i ? '#1e293b' : '#94a3b8'}
                      >
                        {d.date}
                      </text>
                    </g>
                  );
                })}

                {/* Path 1: Sent (Blue) */}
                {activeMetrics.sent && (
                  <path
                    d={generatePath('sent', maxSent)}
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Path 2: Open (Green) */}
                {activeMetrics.open && (
                  <path
                    d={generatePath('open', maxOpen)}
                    fill="none"
                    stroke="#059669"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Path 3: Click (Orange) */}
                {activeMetrics.click && (
                  <path
                    d={generatePath('click', maxClick)}
                    fill="none"
                    stroke="#ea580c"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Path 4: Reach (Indigo) */}
                {activeMetrics.reach && (
                  <path
                    d={generatePath('reach', maxReach)}
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="6 3"
                  />
                )}

                {/* Data Points Interactive Circles */}
                {TIME_SERIES_DATA.map((d, i) => {
                  const sentCoord = getCoordinates(d.sent, maxSent, i);
                  const openCoord = getCoordinates(d.open, maxOpen, i);
                  const clickCoord = getCoordinates(d.click, maxClick, i);
                  const reachCoord = getCoordinates(d.reach, maxReach, i);

                  return (
                    <g
                      key={i}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {/* Transparent Hover Hitbox */}
                      <rect
                        x={sentCoord.x - 25}
                        y={0}
                        width={50}
                        height={chartHeight}
                        fill="transparent"
                      />

                      {activeMetrics.sent && (
                        <circle
                          cx={sentCoord.x}
                          cy={sentCoord.y}
                          r={hoveredIndex === i ? 6 : 4}
                          fill="#ffffff"
                          stroke="#2563eb"
                          strokeWidth="2.5"
                        />
                      )}

                      {activeMetrics.open && (
                        <circle
                          cx={openCoord.x}
                          cy={openCoord.y}
                          r={hoveredIndex === i ? 6 : 4}
                          fill="#ffffff"
                          stroke="#059669"
                          strokeWidth="2.5"
                        />
                      )}

                      {activeMetrics.click && (
                        <circle
                          cx={clickCoord.x}
                          cy={clickCoord.y}
                          r={hoveredIndex === i ? 6 : 4}
                          fill="#ffffff"
                          stroke="#ea580c"
                          strokeWidth="2.5"
                        />
                      )}

                      {activeMetrics.reach && (
                        <circle
                          cx={reachCoord.x}
                          cy={reachCoord.y}
                          r={hoveredIndex === i ? 6 : 4}
                          fill="#ffffff"
                          stroke="#6366f1"
                          strokeWidth="2.5"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Hover Tooltip Details */}
            {hoveredIndex !== null && (
              <div className="p-3.5 rounded-xl bg-slate-900 text-white text-xs flex flex-wrap items-center justify-between gap-4 animate-fadeIn">
                <span className="font-bold text-sky-400">
                  {TIME_SERIES_DATA[hoveredIndex].date} 일별 집계 상세:
                </span>
                <div className="flex flex-wrap items-center gap-5 font-semibold">
                  {activeMetrics.sent && (
                    <span className="text-blue-300">
                      총 발송: {TIME_SERIES_DATA[hoveredIndex].sent.toLocaleString()}건
                    </span>
                  )}
                  {activeMetrics.open && (
                    <span className="text-emerald-300">
                      오픈: {TIME_SERIES_DATA[hoveredIndex].open.toLocaleString()}건 (
                      {((TIME_SERIES_DATA[hoveredIndex].open / TIME_SERIES_DATA[hoveredIndex].sent) * 100).toFixed(1)}%)
                    </span>
                  )}
                  {activeMetrics.click && (
                    <span className="text-orange-300">
                      클릭: {TIME_SERIES_DATA[hoveredIndex].click.toLocaleString()}건 (
                      {((TIME_SERIES_DATA[hoveredIndex].click / TIME_SERIES_DATA[hoveredIndex].sent) * 100).toFixed(1)}%)
                    </span>
                  )}
                  {activeMetrics.reach && (
                    <span className="text-indigo-300">
                      순 도달 고객: {TIME_SERIES_DATA[hoveredIndex].reach.toLocaleString()}명
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Table: Search Console / Google Ads Performance Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            {/* Table Navigation Header */}
            <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('channels')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'channels'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  채널별 성과 분석
                </button>
                <button
                  onClick={() => setActiveTab('compliance')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'compliance'
                      ? 'bg-pastel-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  정보통신망법 & 080 거부 관리
                </button>
              </div>

              <div className="text-xs text-slate-500 font-medium">
                총 5개 활성 채널 실시간 모니터링
              </div>
            </div>

            {/* Table Body */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100/75 text-slate-600 uppercase font-bold text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">채널명 / 유형</th>
                    <th className="py-3 px-4 text-right">발송 건수</th>
                    <th className="py-3 px-4 text-right">오픈율</th>
                    <th className="py-3 px-4 text-right">클릭률(CTR)</th>
                    <th className="py-3 px-4 text-right">도달 고객수</th>
                    <th className="py-3 px-4 text-right">발송 성공률</th>
                    <th className="py-3 px-4">법적 컴플라이언스 상태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {CHANNEL_PERFORMANCE.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{row.channel}</div>
                        <div className="text-[11px] text-slate-500">{row.type}</div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-semibold text-slate-900">{row.sent}</td>
                      <td className="py-3.5 px-4 text-right font-bold text-emerald-600">{row.openRate}</td>
                      <td className="py-3.5 px-4 text-right font-bold text-pastel-orange-600">{row.clickRate}</td>
                      <td className="py-3.5 px-4 text-right text-slate-700">{row.reach}</td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          {row.successRate}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] bg-slate-100 text-slate-700 border border-slate-200">
                          {row.compliance}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
