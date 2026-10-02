import React, { useState } from 'react';
import { 
  ArrowRight, 
  Layers, 
  Wallet, 
  Check, 
  Copy, 
  ExternalLink 
} from 'lucide-react';
import { FlowNode } from '../../types';

interface AttributionChainProps {
  nodes: FlowNode[];
  onSelectAddress?: (addr: string) => void;
}

export const AttributionChain: React.FC<AttributionChainProps> = ({
  nodes,
  onSelectAddress
}) => {
  const [selectedChainNode, setSelectedChainNode] = useState<FlowNode | null>(nodes[0] || null);
  const [copied, setCopied] = useState(false);

  const chainSequence = [
    {
      role: 'Suspect Wallet',
      node: nodes.find(n => n.type === 'suspicious') || nodes[0],
      border: 'border-rose-300 dark:border-rose-900/60',
      bg: 'bg-rose-50/60 dark:bg-rose-950/20',
      textColor: 'text-rose-700 dark:text-rose-400'
    },
    {
      role: 'Intermediary Wallet',
      node: nodes.find(n => n.type === 'normal') || nodes[2],
      border: 'border-amber-300 dark:border-amber-900/60',
      bg: 'bg-amber-50/60 dark:bg-amber-950/20',
      textColor: 'text-amber-800 dark:text-amber-400'
    },
    {
      role: 'Deposit Contract',
      node: nodes.find(n => n.type === 'deposit') || nodes[4],
      border: 'border-blue-300 dark:border-blue-900/60',
      bg: 'bg-blue-50/60 dark:bg-blue-950/20',
      textColor: 'text-blue-800 dark:text-blue-400'
    },
    {
      role: 'Exchange / VASP',
      node: nodes.find(n => n.type === 'exchange') || nodes[5],
      border: 'border-slate-300 dark:border-[#303948]',
      bg: 'bg-slate-100 dark:bg-[#202734]',
      textColor: 'text-slate-800 dark:text-[#A8B3C5]'
    }
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-4 shadow-xs space-y-3 font-sans">
      <div className="flex items-center justify-between pb-2.5 border-b border-[#E2E8F0] dark:border-[#303948]">
        <div>
          <h3 className="text-xs font-semibold text-[#172033] dark:text-[#F1F5F9] flex items-center gap-1.5 font-sans">
            <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-[#4F8EF7]" />
            <span>Topological attribution chain</span>
          </h3>
          <p className="text-[11px] text-[#64748B] dark:text-[#A8B3C5] mt-0.5 font-sans">
            Sequential fund dissipation flow from suspected source to identified VASP endpoint · Select a node to inspect
          </p>
        </div>
        <span className="text-[10px] text-[#64748B] dark:text-[#7F8DA3] font-medium font-sans">
          Linear sequence
        </span>
      </div>

      {/* Visual Sequence Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 relative">
        {chainSequence.map((step, idx) => {
          const n = step.node;
          if (!n) return null;
          const isSelected = selectedChainNode?.id === n.id;

          return (
            <div key={step.role} className="flex flex-col relative font-sans">
              <div
                onClick={() => setSelectedChainNode(n)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors flex flex-col justify-between ${
                  isSelected
                    ? `${step.bg} border-blue-500 dark:border-[#4F8EF7]`
                    : 'bg-slate-50 dark:bg-[#202734] border-[#E2E8F0] dark:border-[#303948] hover:border-slate-300 dark:hover:border-[#475569]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-semibold font-sans ${step.textColor}`}>
                      {step.role}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-[#7F8DA3] font-sans">
                      Hop {idx}
                    </span>
                  </div>

                  <div className="font-medium text-[#172033] dark:text-[#F1F5F9] text-xs truncate mb-0.5 font-sans">
                    {n.label}
                  </div>

                  <div className="font-mono text-[11px] text-[#64748B] dark:text-[#A8B3C5] truncate mb-2">
                    {n.address.slice(0, 8)}...{n.address.slice(-6)}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E2E8F0] dark:border-[#303948] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#64748B] dark:text-[#7F8DA3]">Flow:</span>
                  <span className="font-semibold text-slate-800 dark:text-[#F1F5F9] font-sans">{n.amount}</span>
                </div>
              </div>

              {/* Arrow Connector for Desktop */}
              {idx < chainSequence.length - 1 && (
                <div className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-400 dark:text-[#7F8DA3] bg-white dark:bg-[#1B212C] rounded-full p-0.5 border border-[#E2E8F0] dark:border-[#303948]">
                  <ArrowRight className="w-3 h-3 text-slate-400 dark:text-[#7F8DA3]" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Node Detail Drawer/Panel */}
      {selectedChainNode && (
        <div className="p-3.5 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-lg space-y-2.5 mt-2 font-sans">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0] dark:border-[#303948]">
            <div className="flex items-center gap-2">
              <Wallet className="w-3.5 h-3.5 text-blue-600 dark:text-[#4F8EF7]" />
              <div>
                <h4 className="text-xs font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">
                  {selectedChainNode.label}
                </h4>
                <div className="text-[10px] text-[#64748B] dark:text-[#A8B3C5] font-sans">
                  {selectedChainNode.entityType}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {onSelectAddress && (
                <button
                  onClick={() => onSelectAddress(selectedChainNode.address)}
                  className="px-2.5 py-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer font-sans"
                >
                  <span>Analyze in Explorer</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-sans">
            <div className="p-2.5 bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded">
              <span className="text-[10px] text-[#64748B] dark:text-[#7F8DA3] block mb-0.5">Public Address</span>
              <div className="flex items-center justify-between font-mono text-[11px] text-blue-700 dark:text-[#6EA8FE] break-all select-all">
                <span>{selectedChainNode.address}</span>
                <button
                  onClick={() => handleCopy(selectedChainNode.address)}
                  className="p-1 text-slate-400 hover:text-slate-700 dark:text-[#7F8DA3] dark:hover:text-white"
                  title="Copy address"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>

            <div className="p-2.5 bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded">
              <span className="text-[10px] text-[#64748B] dark:text-[#7F8DA3] block mb-0.5">Estimated Inflow</span>
              <div className="font-bold text-[#172033] dark:text-[#F1F5F9] text-sm mt-0.5 font-sans">
                {selectedChainNode.amount}
              </div>
            </div>

            <div className="p-2.5 bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded">
              <span className="text-[10px] text-[#64748B] dark:text-[#7F8DA3] block mb-0.5">Node Classification</span>
              <div className="text-xs font-medium text-slate-800 dark:text-[#F1F5F9] mt-0.5 capitalize font-sans">
                {selectedChainNode.type} Entity
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
