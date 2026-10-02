import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Blockchain } from '../../types';
import { BLOCKCHAIN_METRICS } from '../../data/mockData';

interface MultiBlockchainViewProps {
  onSelectChainForInvestigation: (chain: Blockchain) => void;
}

export const MultiBlockchainView: React.FC<MultiBlockchainViewProps> = ({
  onSelectChainForInvestigation
}) => {
  const [selectedChain, setSelectedChain] = useState<Blockchain>('Ethereum');

  const activeMetric = BLOCKCHAIN_METRICS.find(m => m.blockchain === selectedChain) || BLOCKCHAIN_METRICS[0];

  const totalWallets = BLOCKCHAIN_METRICS.reduce((sum, m) => sum + m.analyzedWallets, 0);
  const totalTx = BLOCKCHAIN_METRICS.reduce((sum, m) => sum + m.transactionsLogged, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-[#E2E8F0] dark:border-[#303948]">
        <h1 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-[#F1F5F9] tracking-tight font-sans">
          Multi-Blockchain Intelligence Coverage
        </h1>
        <p className="text-xs text-[#64748B] dark:text-[#A8B3C5] mt-0.5 max-w-3xl leading-relaxed font-sans">
          Operational ledger telemetry across 6 primary layer-1 and layer-2 distributed networks monitored by LEA forensic nodes.
        </p>
      </div>

      {/* Aggregate Network Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-4 shadow-xs">
          <div className="text-[11px] text-[#64748B] dark:text-[#A8B3C5] uppercase tracking-wider mb-1 font-sans font-semibold">
            Total Monitored Wallets
          </div>
          <div className="text-2xl font-bold font-sans text-[#172033] dark:text-[#F1F5F9] tabular-nums">
            {totalWallets.toLocaleString()}
          </div>
          <div className="text-[11px] text-[#64748B] dark:text-[#7F8DA3] mt-1 font-sans">Aggregated across all registered dockets</div>
        </div>

        <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-4 shadow-xs">
          <div className="text-[11px] text-[#64748B] dark:text-[#A8B3C5] uppercase tracking-wider mb-1 font-sans font-semibold">
            Indexed Transactions
          </div>
          <div className="text-2xl font-bold font-sans text-blue-600 dark:text-[#4F8EF7] tabular-nums">
            {totalTx.toLocaleString()}
          </div>
          <div className="text-[11px] text-[#64748B] dark:text-[#7F8DA3] mt-1 font-sans">Real-time ledger indexing active</div>
        </div>

        <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-4 shadow-xs">
          <div className="text-[11px] text-[#64748B] dark:text-[#A8B3C5] uppercase tracking-wider mb-1 font-sans font-semibold">
            Connected VASP Nodes
          </div>
          <div className="text-2xl font-bold font-sans text-emerald-700 dark:text-emerald-400 tabular-nums">
            186 Endpoints
          </div>
          <div className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1 font-sans font-medium">Clustering models online (99.8% SLA)</div>
        </div>
      </div>

      {/* Network Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {BLOCKCHAIN_METRICS.map((metric) => {
          const isSelected = selectedChain === metric.blockchain;
          return (
            <button
              key={metric.blockchain}
              onClick={() => setSelectedChain(metric.blockchain)}
              className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-blue-50/70 border-blue-300 dark:bg-blue-950/40 dark:border-[#4F8EF7]'
                  : 'bg-white dark:bg-[#1B212C] border-[#E2E8F0] dark:border-[#303948] hover:border-slate-300 dark:hover:border-[#475569]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-xs font-semibold ${isSelected ? 'text-blue-700 dark:text-[#4F8EF7]' : 'text-slate-800 dark:text-[#F1F5F9]'} font-sans`}>
                  {metric.blockchain}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              <div className="text-[11px] text-[#64748B] dark:text-[#A8B3C5] font-sans">
                {metric.analyzedWallets} wallets
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Network Detailed Metric Card */}
      <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-5 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#E2E8F0] dark:border-[#303948]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-[#4F8EF7] font-sans">
                Network Intelligence Telemetry
              </span>
              <span className="text-slate-300 dark:text-[#303948]">·</span>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-1 font-medium font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {activeMetric.nodeStatus}
              </span>
            </div>
            <h2 className="text-lg font-bold text-[#172033] dark:text-[#F1F5F9] tracking-tight mt-0.5 font-sans">
              {activeMetric.blockchain} Network Architecture
            </h2>
          </div>

          <button
            onClick={() => onSelectChainForInvestigation(activeMetric.blockchain)}
            className="px-3.5 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-md text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto font-sans"
          >
            <span>Investigate {activeMetric.blockchain} Address</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded">
            <span className="text-[#64748B] dark:text-[#A8B3C5] block text-[11px] font-sans">Monitored Wallets</span>
            <div className="text-lg font-bold text-[#172033] dark:text-[#F1F5F9] mt-1 font-sans">
              {activeMetric.analyzedWallets.toLocaleString()}
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded">
            <span className="text-[#64748B] dark:text-[#A8B3C5] block text-[11px] font-sans">Transactions Logged</span>
            <div className="text-lg font-bold text-blue-600 dark:text-[#4F8EF7] mt-1 font-sans">
              {activeMetric.transactionsLogged.toLocaleString()}
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded">
            <span className="text-[#64748B] dark:text-[#A8B3C5] block text-[11px] font-sans">Indexed VASP Sweep Clusters</span>
            <div className="text-lg font-bold text-emerald-700 dark:text-emerald-400 mt-1 font-sans">
              {activeMetric.vaspAttributionsCount} entities
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded">
            <span className="text-[#64748B] dark:text-[#A8B3C5] block text-[11px] font-sans">Flagged Suspicious Activity</span>
            <div className="text-lg font-bold text-rose-700 dark:text-rose-400 mt-1 font-sans">
              {activeMetric.highRiskCount} targets
            </div>
          </div>
        </div>

        <div className="p-3.5 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded text-xs leading-relaxed text-[#475569] dark:text-[#A8B3C5] font-sans">
          <strong className="text-[#172033] dark:text-[#F1F5F9] font-semibold block mb-0.5">Architecture & Surveillance Summary:</strong>
          {activeMetric.description}
        </div>
      </div>
    </div>
  );
};
