import React, { useState } from 'react';
import { Copy, Check, Layers, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { WalletInvestigationResult } from '../../types';

interface WalletOverviewCardProps {
  data: WalletInvestigationResult;
  onAddToCase?: () => void;
}

export const WalletOverviewCard: React.FC<WalletOverviewCardProps> = ({ data, onAddToCase }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statusDisplay = data.investigationStatus || (data as any).status || 'Active';

  return (
    <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-4 sm:p-5 shadow-xs font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0] dark:border-[#303948]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-[#64748B] dark:text-[#A8B3C5] font-sans">
              Target Wallet Overview
            </span>
            <span className="text-slate-300 dark:text-[#303948]">·</span>
            <span className="text-xs text-amber-700 dark:text-[#FCD34D] font-medium font-sans">
              Status: {statusDisplay}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <h2 className="text-xs sm:text-sm md:text-base font-mono font-medium text-[#172033] dark:text-[#F1F5F9] break-all select-all">
              {data.walletAddress}
            </h2>
            <button
              onClick={handleCopy}
              className="p-1 text-slate-400 hover:text-blue-600 dark:text-[#7F8DA3] dark:hover:text-[#4F8EF7] rounded hover:bg-slate-100 dark:hover:bg-[#202734] transition-colors shrink-0 cursor-pointer"
              title="Copy public address"
              aria-label="Copy public address"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="px-2.5 py-1 bg-slate-100 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded text-xs font-medium text-slate-700 dark:text-[#A8B3C5] font-sans">
            {data.blockchain} Network
          </div>
          {onAddToCase && (
            <button
              onClick={onAddToCase}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-[#202734] dark:hover:bg-[#252D3A] dark:text-[#E2E8F0] border border-[#E2E8F0] dark:border-[#303948] rounded text-xs font-medium transition-colors cursor-pointer font-sans"
            >
              Link to Case
            </button>
          )}
        </div>
      </div>

      {/* Grid of Key Forensic Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3">
        <div className="p-3 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded">
          <div className="flex items-center gap-1.5 text-xs text-[#64748B] dark:text-[#A8B3C5] mb-1 font-sans">
            <Layers className="w-3.5 h-3.5 text-slate-400 dark:text-[#7F8DA3]" />
            <span>Total Transactions</span>
          </div>
          <div className="text-xl font-bold text-[#172033] dark:text-[#F1F5F9] font-sans">
            {data.totalTransactions}
          </div>
          <div className="text-[11px] text-[#64748B] dark:text-[#7F8DA3] mt-0.5 font-sans">
            Public ledger confirmed
          </div>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded">
          <div className="flex items-center gap-1.5 text-xs text-[#64748B] dark:text-[#A8B3C5] mb-1 font-sans">
            <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Total Incoming</span>
          </div>
          <div className="text-xl font-bold text-emerald-700 dark:text-emerald-400 font-sans truncate">
            {data.totalIncoming}
          </div>
          <div className="text-[11px] text-[#64748B] dark:text-[#7F8DA3] mt-0.5 font-sans">
            {data.incomingTransactions || 18} inbound transfers
          </div>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded">
          <div className="flex items-center gap-1.5 text-xs text-[#64748B] dark:text-[#A8B3C5] mb-1 font-sans">
            <ArrowUpRight className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            <span>Total Outgoing</span>
          </div>
          <div className="text-xl font-bold text-rose-700 dark:text-rose-400 font-sans truncate">
            {data.totalOutgoing}
          </div>
          <div className="text-[11px] text-[#64748B] dark:text-[#7F8DA3] mt-0.5 font-sans">
            {data.outgoingTransactions || 24} outbound transfers
          </div>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded">
          <div className="flex items-center gap-1.5 text-xs text-[#64748B] dark:text-[#A8B3C5] mb-1 font-sans">
            <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-[#4F8EF7]" />
            <span>Attributed VASP Entity</span>
          </div>
          <div className="text-base font-bold text-[#172033] dark:text-[#F1F5F9] truncate font-sans">
            {data.attribution?.entityName || 'Example Exchange'}
          </div>
          <div className="text-[11px] text-blue-600 dark:text-[#4F8EF7] font-sans mt-0.5">
            {data.attribution?.confidenceScore || 92}% confidence match
          </div>
        </div>
      </div>
    </div>
  );
};
