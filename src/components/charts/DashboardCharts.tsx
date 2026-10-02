import React, { useState } from 'react';
import { Activity, ShieldAlert, Building2, PieChart } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const DashboardCharts: React.FC = () => {
  const [activeActivityPoint, setActiveActivityPoint] = useState<number | null>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // 14-day transaction ingestion velocity
  const activityData = [
    { day: 'Sep 15', count: 48, volume: '112.4 ETH' },
    { day: 'Sep 16', count: 62, volume: '148.0 ETH' },
    { day: 'Sep 17', count: 55, volume: '130.5 ETH' },
    { day: 'Sep 18', count: 89, volume: '240.2 ETH' },
    { day: 'Sep 19', count: 74, volume: '185.7 ETH' },
    { day: 'Sep 20', count: 110, volume: '310.1 ETH' },
    { day: 'Sep 21', count: 95, volume: '228.4 ETH' },
    { day: 'Sep 22', count: 130, volume: '394.0 ETH' },
    { day: 'Sep 23', count: 118, volume: '298.5 ETH' },
    { day: 'Sep 24', count: 145, volume: '412.8 ETH' },
    { day: 'Sep 25', count: 160, volume: '480.2 ETH' },
    { day: 'Sep 26', count: 140, volume: '390.6 ETH' },
    { day: 'Sep 27', count: 175, volume: '520.4 ETH' },
    { day: 'Sep 28', count: 192, volume: '584.0 ETH' }
  ];

  // Blockchain distribution
  const networkData = [
    { name: 'Ethereum', count: 512, percentage: 40, color: '#2563EB' },
    { name: 'Bitcoin', count: 340, percentage: 26, color: '#D97706' },
    { name: 'BNB Chain', count: 184, percentage: 14, color: '#CA8A04' },
    { name: 'Tron', count: 132, percentage: 10, color: '#DC2626' },
    { name: 'Solana', count: 68, percentage: 6, color: '#059669' },
    { name: 'Polygon', count: 48, percentage: 4, color: '#7C3AED' }
  ];

  // Risk categorization data
  const riskData = [
    { label: 'Review Required', count: 37, percentage: 43, color: '#EA580C', desc: 'Mixer nexus / multi-hop sweep' },
    { label: 'High Severity', count: 24, percentage: 28, color: '#DC2626', desc: 'Rapid velocity peeling chains' },
    { label: 'Medium Severity', count: 18, percentage: 21, color: '#D97706', desc: 'Cross-chain bridge egress' },
    { label: 'Low Severity', count: 7, percentage: 8, color: '#16A34A', desc: 'Standard unflagged activity' }
  ];

  // VASP Entity Attribution Types
  const vaspTypes = [
    { type: 'Centralized Exchange', matches: 412, percentage: 56, color: '#2563EB' },
    { type: 'Custodial Wallet Service', matches: 164, percentage: 22, color: '#0284C7' },
    { type: 'P2P Platform', matches: 82, percentage: 11, color: '#7C3AED' },
    { type: 'OTC Broker Desk', matches: 58, percentage: 8, color: '#D97706' },
    { type: 'Payment Provider', matches: 26, percentage: 4, color: '#059669' }
  ];

  // SVG Line Chart coordinates calculation
  const maxVal = Math.max(...activityData.map((d) => d.count));
  const svgWidth = 600;
  const svgHeight = 170;
  const paddingX = 25;
  const paddingY = 20;
  const usableWidth = svgWidth - paddingX * 2;
  const usableHeight = svgHeight - paddingY * 2;

  const points = activityData.map((d, index) => {
    const x = paddingX + (index / (activityData.length - 1)) * usableWidth;
    const y = svgHeight - paddingY - (d.count / maxVal) * usableHeight;
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, curr, idx) => {
    if (idx === 0) return `M ${curr.x} ${curr.y}`;
    return `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* 1. Transaction Activity Line Chart */}
      <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-4 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between pb-2.5 border-b border-[#E2E8F0] dark:border-[#303948]">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#2563EB] dark:text-[#4F8EF7]" />
            <h3 className="text-xs font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">
              Transaction activity & velocity
            </h3>
          </div>
          <span className="text-[11px] text-[#64748B] dark:text-[#7F8DA3] font-sans">
            Last 14 days · Daily volume
          </span>
        </div>

        <div className="relative pt-3">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-40 overflow-visible select-none"
          >
            {/* Minimal Grid lines */}
            {[0.25, 0.5, 0.75, 1].map((ratio) => {
              const y = svgHeight - paddingY - ratio * usableHeight;
              return (
                <line
                  key={ratio}
                  x1={paddingX}
                  y1={y}
                  x2={svgWidth - paddingX}
                  y2={y}
                  stroke={isDark ? '#303948' : '#E2E8F0'}
                  strokeWidth="1"
                />
              );
            })}

            {/* Base axis line */}
            <line
              x1={paddingX}
              y1={svgHeight - paddingY}
              x2={svgWidth - paddingX}
              y2={svgHeight - paddingY}
              stroke={isDark ? '#303948' : '#CBD5E1'}
              strokeWidth="1"
            />

            {/* Main Clean Solid Line (no glow, no gradients) */}
            <path
              d={pathD}
              fill="none"
              stroke={isDark ? '#4F8EF7' : '#2563EB'}
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Interactive Points */}
            {points.map((pt, idx) => (
              <g
                key={idx}
                onMouseEnter={() => setActiveActivityPoint(idx)}
                onMouseLeave={() => setActiveActivityPoint(null)}
                className="cursor-pointer"
              >
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={activeActivityPoint === idx ? 4.5 : 2.5}
                  fill={activeActivityPoint === idx ? (isDark ? '#4F8EF7' : '#2563EB') : (isDark ? '#1B212C' : '#FFFFFF')}
                  stroke={isDark ? '#4F8EF7' : '#2563EB'}
                  strokeWidth="2"
                />
              </g>
            ))}
          </svg>

          {/* Hover Tooltip Overlay */}
          {activeActivityPoint !== null && (
            <div
              className="absolute pointer-events-none bg-white dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] px-2.5 py-1.5 rounded shadow-md text-xs z-20"
              style={{
                left: `${(activeActivityPoint / (activityData.length - 1)) * 80 + 5}%`,
                top: '15px'
              }}
            >
              <div className="font-semibold text-[#172033] dark:text-[#F1F5F9] text-[11px] font-sans">
                {activityData[activeActivityPoint].day}
              </div>
              <div className="text-[#2563EB] dark:text-[#4F8EF7] text-xs font-semibold font-sans">
                {activityData[activeActivityPoint].count} Traces
              </div>
              <div className="text-[#64748B] dark:text-[#A8B3C5] text-[10px] font-sans">
                Vol: {activityData[activeActivityPoint].volume}
              </div>
            </div>
          )}

          <div className="flex justify-between text-[11px] text-[#64748B] dark:text-[#7F8DA3] px-1 mt-1 font-sans">
            <span>Sep 15</span>
            <span>Sep 21</span>
            <span>Sep 28</span>
          </div>
        </div>
      </div>

      {/* 2. Network Distribution Bar & Share */}
      <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-4 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between pb-2.5 border-b border-[#E2E8F0] dark:border-[#303948]">
          <div className="flex items-center gap-2">
            <PieChart className="w-4 h-4 text-[#2563EB] dark:text-[#4F8EF7]" />
            <h3 className="text-xs font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">
              Multi-blockchain activity share
            </h3>
          </div>
          <span className="text-[11px] text-[#64748B] dark:text-[#7F8DA3] font-sans">
            1,284 indexed wallets
          </span>
        </div>

        {/* Stacked Percentage Bar */}
        <div className="my-3">
          <div className="w-full h-2 bg-[#F1F5F9] dark:bg-[#202734] rounded overflow-hidden flex border border-[#E2E8F0] dark:border-[#303948]">
            {networkData.map((item) => (
              <div
                key={item.name}
                style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                className="h-full"
                title={`${item.name}: ${item.percentage}%`}
              />
            ))}
          </div>
        </div>

        {/* Detailed Network Breakdown Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
          {networkData.map((item) => (
            <div
              key={item.name}
              className="p-2 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-xs"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-medium text-[#172033] dark:text-[#F1F5F9] text-xs">
                    {item.name}
                  </span>
                </div>
                <div className="text-[11px] text-[#64748B] dark:text-[#A8B3C5] mt-0.5 font-sans">
                  {item.count} wallets
                </div>
              </div>
              <span className="font-semibold text-[#172033] dark:text-[#F1F5F9] text-xs font-sans">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Risk Distribution Breakdown */}
      <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-4 shadow-xs">
        <div className="flex items-center justify-between pb-2.5 border-b border-[#E2E8F0] dark:border-[#303948] mb-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#DC2626]" />
            <h3 className="text-xs font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">
              Risk severity distribution
            </h3>
          </div>
          <span className="text-[11px] text-[#64748B] dark:text-[#7F8DA3] font-sans">
            Heuristic severity tiers
          </span>
        </div>

        <div className="space-y-2.5">
          {riskData.map((r) => (
            <div key={r.label} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-xs"
                    style={{ backgroundColor: r.color }}
                  />
                  <span className="font-medium text-[#172033] dark:text-[#F1F5F9] font-sans">{r.label}</span>
                  <span className="text-[11px] text-[#64748B] dark:text-[#A8B3C5] hidden sm:inline font-sans">
                    · {r.desc}
                  </span>
                </div>
                <div className="text-xs text-[#172033] dark:text-[#F1F5F9] font-sans">
                  <span className="font-semibold">{r.count}</span>
                  <span className="text-[#64748B] dark:text-[#A8B3C5] ml-1">({r.percentage}%)</span>
                </div>
              </div>
              <div className="w-full bg-[#F1F5F9] dark:bg-[#202734] h-1.5 rounded overflow-hidden border border-[#E2E8F0] dark:border-[#303948]">
                <div
                  className="h-full rounded"
                  style={{ width: `${r.percentage}%`, backgroundColor: r.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. VASP Attribution Matches by Entity Type */}
      <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-4 shadow-xs">
        <div className="flex items-center justify-between pb-2.5 border-b border-[#E2E8F0] dark:border-[#303948] mb-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#2563EB] dark:text-[#4F8EF7]" />
            <h3 className="text-xs font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">
              VASP attributions by entity type
            </h3>
          </div>
          <span className="text-[11px] text-[#64748B] dark:text-[#7F8DA3] font-sans">
            742 suspected matches
          </span>
        </div>

        <div className="space-y-2.5">
          {vaspTypes.map((v) => (
            <div key={v.type} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-xs"
                    style={{ backgroundColor: v.color }}
                  />
                  <span className="font-medium text-[#172033] dark:text-[#F1F5F9] font-sans">{v.type}</span>
                </div>
                <div className="text-xs text-[#172033] dark:text-[#F1F5F9] font-sans">
                  <span className="font-semibold text-[#2563EB] dark:text-[#4F8EF7]">{v.matches}</span>
                  <span className="text-[#64748B] dark:text-[#A8B3C5] ml-1">({v.percentage}%)</span>
                </div>
              </div>
              <div className="w-full bg-[#F1F5F9] dark:bg-[#202734] h-1.5 rounded overflow-hidden border border-[#E2E8F0] dark:border-[#303948]">
                <div
                  className="h-full rounded"
                  style={{ width: `${v.percentage}%`, backgroundColor: v.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
