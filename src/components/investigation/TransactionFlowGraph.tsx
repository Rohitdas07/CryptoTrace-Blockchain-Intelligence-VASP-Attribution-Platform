import React, { useState, useRef } from 'react';
import { 
  GitFork, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Layers, 
  AlertCircle, 
  Building2, 
  Shuffle, 
  Copy, 
  Check, 
  X,
  ChevronRight
} from 'lucide-react';
import { FlowNode, FlowEdge } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface TransactionFlowGraphProps {
  nodes: FlowNode[];
  edges: FlowEdge[];
  onSelectNodeAddress?: (address: string) => void;
}

export const TransactionFlowGraph: React.FC<TransactionFlowGraphProps> = ({
  nodes,
  edges,
  onSelectNodeAddress
}) => {
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(nodes[0] || null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [filterType, setFilterType] = useState<string>('all');
  const [copied, setCopied] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const containerRef = useRef<HTMLDivElement>(null);

  const getNodeColor = (type: FlowNode['type'], isSelected: boolean) => {
    switch (type) {
      case 'suspicious':
        return {
          bg: 'bg-rose-50 dark:bg-rose-950/60',
          border: isSelected 
            ? 'border-rose-500 ring-1 ring-rose-500/40' 
            : 'border-rose-200 dark:border-rose-800/60',
          text: 'text-rose-900 dark:text-rose-200',
          badge: 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/60 dark:text-rose-300 dark:border-rose-700/60'
        };
      case 'exchange':
        return {
          bg: 'bg-blue-50 dark:bg-blue-950/60',
          border: isSelected 
            ? 'border-blue-500 ring-1 ring-blue-500/40' 
            : 'border-blue-200 dark:border-blue-800/60',
          text: 'text-blue-900 dark:text-blue-200',
          badge: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/60 dark:text-blue-300 dark:border-blue-700/60'
        };
      case 'mixer':
        return {
          bg: 'bg-amber-50 dark:bg-amber-950/60',
          border: isSelected 
            ? 'border-amber-500 ring-1 ring-amber-500/40' 
            : 'border-amber-200 dark:border-amber-800/60',
          text: 'text-amber-900 dark:text-amber-200',
          badge: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/60 dark:text-amber-300 dark:border-amber-700/60'
        };
      case 'bridge':
        return {
          bg: 'bg-purple-50 dark:bg-purple-950/60',
          border: isSelected 
            ? 'border-purple-500 ring-1 ring-purple-500/40' 
            : 'border-purple-200 dark:border-purple-800/60',
          text: 'text-purple-900 dark:text-purple-200',
          badge: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/60 dark:text-purple-300 dark:border-purple-700/60'
        };
      case 'deposit':
        return {
          bg: 'bg-teal-50 dark:bg-teal-950/60',
          border: isSelected 
            ? 'border-teal-500 ring-1 ring-teal-500/40' 
            : 'border-teal-200 dark:border-teal-800/60',
          text: 'text-teal-900 dark:text-teal-200',
          badge: 'bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900/60 dark:text-teal-300 dark:border-teal-700/60'
        };
      case 'normal':
      default:
        return {
          bg: 'bg-white dark:bg-[#202734]',
          border: isSelected 
            ? 'border-blue-500 ring-1 ring-blue-500/40' 
            : 'border-slate-300 dark:border-[#303948]',
          text: 'text-slate-800 dark:text-[#F1F5F9]',
          badge: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-[#1B212C] dark:text-[#A8B3C5] dark:border-[#303948]'
        };
    }
  };

  const getNodeIcon = (type: FlowNode['type']) => {
    switch (type) {
      case 'suspicious': return <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />;
      case 'exchange': return <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'mixer': return <Shuffle className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'bridge': return <GitFork className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case 'deposit': return <Layers className="w-4 h-4 text-teal-600 dark:text-teal-400" />;
      default: return <GitFork className="w-4 h-4 text-slate-500 dark:text-slate-400" />;
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredNodes = nodes.filter(n => filterType === 'all' || n.type === filterType);

  return (
    <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg overflow-hidden shadow-xs flex flex-col font-sans">
      {/* Title & Control Bar */}
      <div className="p-3.5 border-b border-[#E2E8F0] dark:border-[#303948] bg-slate-50/75 dark:bg-[#1D2430] flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <GitFork className="w-4 h-4 text-blue-600 dark:text-[#4F8EF7]" />
            <h3 className="text-xs font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">
              Transaction flow graph
            </h3>
          </div>
          <p className="text-[11px] text-[#64748B] dark:text-[#A8B3C5] mt-0.5 font-sans">
            Multi-hop ledger graph · Click any node to inspect address telemetry
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 font-sans">
          {/* Node Filter */}
          <div className="hidden sm:flex items-center gap-1 bg-white dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] p-0.5 rounded-md text-xs">
            {['all', 'suspicious', 'deposit', 'exchange', 'mixer', 'bridge'].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium capitalize transition-colors cursor-pointer ${
                  filterType === t 
                    ? 'bg-[#2563EB] text-white font-semibold' 
                    : 'text-[#64748B] dark:text-[#A8B3C5] hover:text-[#172033] dark:hover:text-[#F1F5F9]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-0.5 bg-white dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] p-0.5 rounded-md text-xs">
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.6))}
              className="p-1 text-[#64748B] dark:text-[#A8B3C5] hover:text-[#172033] dark:hover:text-[#F1F5F9] rounded hover:bg-slate-100 dark:hover:bg-[#252D3A] cursor-pointer"
              title="Zoom In"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.65))}
              className="p-1 text-[#64748B] dark:text-[#A8B3C5] hover:text-[#172033] dark:hover:text-[#F1F5F9] rounded hover:bg-slate-100 dark:hover:bg-[#252D3A] cursor-pointer"
              title="Zoom Out"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1 text-[#64748B] dark:text-[#A8B3C5] hover:text-[#172033] dark:hover:text-[#F1F5F9] rounded hover:bg-slate-100 dark:hover:bg-[#252D3A] cursor-pointer"
              title="Reset View"
              aria-label="Reset zoom"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas Area + Side Panel */}
      <div className="relative min-h-[440px] flex-1 flex flex-col lg:flex-row overflow-hidden network-canvas-grid bg-slate-50 dark:bg-[#151922]">
        {/* SVG Flow Canvas */}
        <div 
          ref={containerRef}
          className="flex-1 overflow-x-auto overflow-y-auto p-6 min-h-[380px] flex items-center justify-center relative select-none"
        >
          <div 
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
            className="transition-transform duration-150 ease-out relative w-[1080px] h-[400px]"
          >
            {/* SVG Connecting Curves & Direction Arrows */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <defs>
                <marker
                  id="arrow-blue"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 8 5 L 0 9 z" fill={isDark ? '#3b82f6' : '#2563eb'} />
                </marker>
              </defs>

              {/* Edge lines */}
              {edges.map((edge) => {
                const sourceNode = nodes.find(n => n.id === edge.source);
                const targetNode = nodes.find(n => n.id === edge.target);
                if (!sourceNode || !targetNode) return null;

                const sx = (sourceNode.x ?? 100) + 100;
                const sy = (sourceNode.y ?? 100) + 40;
                const tx = (targetNode.x ?? 300);
                const ty = (targetNode.y ?? 100) + 40;

                const midX = (sx + tx) / 2;
                const isSelected = selectedNode?.id === edge.source || selectedNode?.id === edge.target;

                return (
                  <g key={edge.id} className="transition-all">
                    {/* Path */}
                    <path
                      d={`M ${sx} ${sy} C ${midX} ${sy}, ${midX} ${ty}, ${tx} ${ty}`}
                      fill="none"
                      stroke={isSelected ? (isDark ? '#3b82f6' : '#2563eb') : (isDark ? '#37455c' : '#cbd5e1')}
                      strokeWidth={isSelected ? '2.5' : '1.5'}
                      strokeDasharray={isSelected ? 'none' : '4 4'}
                      markerEnd="url(#arrow-blue)"
                      className="transition-colors duration-200"
                    />

                    {/* Edge Flow Label Pill */}
                    <g transform={`translate(${midX - 35}, ${(sy + ty) / 2 - 12})`}>
                      <rect
                        width="70"
                        height="20"
                        rx="4"
                        fill={isDark ? '#202734' : '#ffffff'}
                        stroke={isDark ? '#303948' : '#cbd5e1'}
                        strokeWidth="1"
                      />
                      <text
                        x="35"
                        y="13"
                        textAnchor="middle"
                        fill={isDark ? '#A8B3C5' : '#475569'}
                        fontSize="9"
                        fontWeight="600"
                        fontFamily="monospace"
                      >
                        {edge.amount}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>

            {/* Interactive Nodes */}
            {filteredNodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              const styling = getNodeColor(node.type, isSelected);
              const x = node.x ?? 100;
              const y = node.y ?? 100;

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  style={{ left: `${x}px`, top: `${y}px` }}
                  className={`
                    absolute w-[185px] p-3 rounded-lg border cursor-pointer select-none transition-all duration-200 z-10 shadow-xs
                    ${styling.bg} ${styling.border}
                    hover:scale-102 hover:shadow-md
                  `}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      {getNodeIcon(node.type)}
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#64748B] dark:text-[#7F8DA3]">
                        Hop #{node.hopLevel}
                      </span>
                    </div>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono border ${styling.badge}`}>
                      {node.riskStatus}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-[#172033] dark:text-[#F1F5F9] truncate mb-0.5">
                    {node.label}
                  </div>

                  <div className="text-[11px] font-mono text-[#64748B] dark:text-[#A8B3C5] truncate mb-2">
                    {node.address.slice(0, 6)}...{node.address.slice(-4)}
                  </div>

                  <div className="pt-2 border-t border-[#E2E8F0] dark:border-[#303948] flex items-center justify-between text-[10px]">
                    <span className="text-[#64748B] dark:text-[#7F8DA3]">Flow:</span>
                    <span className="font-mono font-semibold text-blue-600 dark:text-[#4F8EF7]">{node.amount}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Node Inspector Panel */}
        {selectedNode && (
          <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-[#E2E8F0] dark:border-[#303948] bg-white dark:bg-[#1B212C] p-5 flex flex-col justify-between shrink-0 font-sans">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-[#303948]">
                <div className="flex items-center gap-2">
                  {getNodeIcon(selectedNode.type)}
                  <div>
                    <div className="text-xs font-semibold text-[#172033] dark:text-[#F1F5F9] truncate max-w-[170px]">
                      {selectedNode.label}
                    </div>
                    <div className="text-[10px] text-blue-600 dark:text-[#4F8EF7] uppercase tracking-wider font-mono font-medium">
                      {selectedNode.entityType}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-slate-400 hover:text-slate-700 dark:text-[#7F8DA3] dark:hover:text-[#F1F5F9] p-1 rounded hover:bg-slate-100 dark:hover:bg-[#202734] lg:hidden cursor-pointer"
                  aria-label="Close inspector"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Inspector Attributes */}
              <div className="py-4 space-y-3 text-xs">
                <div>
                  <div className="text-[10px] font-mono font-medium text-[#64748B] dark:text-[#7F8DA3] uppercase tracking-wider mb-1">
                    Public Address
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md flex items-center justify-between gap-2">
                    <span className="text-[#172033] dark:text-[#F1F5F9] text-[11px] font-mono break-all">
                      {selectedNode.address}
                    </span>
                    <button
                      onClick={() => handleCopy(selectedNode.address)}
                      className="p-1 text-slate-400 hover:text-blue-600 dark:text-[#7F8DA3] dark:hover:text-[#4F8EF7] transition-colors shrink-0 cursor-pointer"
                      title="Copy address"
                      aria-label="Copy address"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md">
                    <div className="text-[10px] text-[#64748B] dark:text-[#7F8DA3]">Total Transferred</div>
                    <div className="font-mono font-semibold text-[#172033] dark:text-[#F1F5F9] text-xs mt-0.5">
                      {selectedNode.amount}
                    </div>
                  </div>

                  <div className="p-2 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md">
                    <div className="text-[10px] text-[#64748B] dark:text-[#7F8DA3]">Tx Activity</div>
                    <div className="font-mono font-semibold text-[#172033] dark:text-[#F1F5F9] text-xs mt-0.5">
                      {selectedNode.txCount} txs
                    </div>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-[#64748B] dark:text-[#7F8DA3]">Risk Assessment</span>
                    <span className="text-[10px] font-mono font-semibold text-amber-700 dark:text-[#FCD34D]">
                      {selectedNode.riskStatus}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#475569] dark:text-[#A8B3C5] leading-relaxed">
                    {selectedNode.notes || 'Identified intermediate transit hub in monitored forensic trace.'}
                  </div>
                </div>

                <div className="text-[10px] text-[#64748B] dark:text-[#7F8DA3] font-mono">
                  Timestamp: {selectedNode.timestamp}
                </div>
              </div>
            </div>

            {/* Inspector Footer CTA */}
            <div className="pt-3 border-t border-[#E2E8F0] dark:border-[#303948] space-y-2">
              <button
                onClick={() => onSelectNodeAddress && onSelectNodeAddress(selectedNode.address)}
                className="w-full py-2 px-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-md text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Launch Full Investigation</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Legend Footer */}
      <div className="p-3 border-t border-[#E2E8F0] dark:border-[#303948] bg-slate-50 dark:bg-[#1D2430] flex flex-wrap items-center justify-between gap-3 text-xs text-[#64748B] dark:text-[#A8B3C5] font-sans">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-semibold text-[#172033] dark:text-[#F1F5F9]">Legend:</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>Suspicious Wallet</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400 dark:bg-slate-500" />
            <span>Normal Intermediate</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
            <span>Deposit Address</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span>Exchange / VASP</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Mixer Hop</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <span>Bridge Gateway</span>
          </span>
        </div>
        <div className="text-[11px] text-[#64748B] dark:text-[#7F8DA3] font-sans">
          Arrows indicate direction of fund dissipation
        </div>
      </div>
    </div>
  );
};
