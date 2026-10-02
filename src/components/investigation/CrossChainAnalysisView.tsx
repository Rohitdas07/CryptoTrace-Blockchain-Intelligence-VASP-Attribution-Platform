import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeftRight, 
  ExternalLink 
} from 'lucide-react';
import { CrossChainFlowRecord, Blockchain } from '../../types';
import { MOCK_CROSS_CHAIN_FLOWS } from '../../data/vasps';
import { NetworkBadge } from '../common/NetworkBadge';
import { RiskBadge } from '../common/RiskBadge';

interface CrossChainAnalysisViewProps {
  onInvestigateAddress?: (addr: string) => void;
}

export const CrossChainAnalysisView: React.FC<CrossChainAnalysisViewProps> = ({
  onInvestigateAddress
}) => {
  const [flows] = useState<CrossChainFlowRecord[]>(MOCK_CROSS_CHAIN_FLOWS);
  const [selectedChain, setSelectedChain] = useState<string>('All');

  const networks: Array<{ name: Blockchain; symbol: string; activeEvents: number; volume: string }> = [
    { name: 'Ethereum', symbol: 'ETH', activeEvents: 42, volume: '184.5 ETH' },
    { name: 'Bitcoin', symbol: 'BTC', activeEvents: 18, volume: '14.28 BTC' },
    { name: 'Tron', symbol: 'TRX', activeEvents: 68, volume: '1.45M USDT' },
    { name: 'BNB Chain', symbol: 'BNB', activeEvents: 25, volume: '580 BNB' },
    { name: 'Solana', symbol: 'SOL', activeEvents: 31, volume: '1,850 SOL' },
    { name: 'Polygon', symbol: 'POL', activeEvents: 54, volume: '95,200 WETH' }
  ];

  const filteredFlows = selectedChain === 'All'
    ? flows
    : flows.filter(f => f.sourceChain === selectedChain || f.targetChain === selectedChain);

  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-[#E2E8F0] dark:border-[#303948]">
        <h1 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-[#F1F5F9] tracking-tight font-sans">
          Cross-Chain Flow Analysis
        </h1>
        <p className="text-xs text-[#64748B] dark:text-[#A8B3C5] mt-1 max-w-3xl leading-relaxed font-sans">
          Monitor synthetic bridging events, interoperability router locks, and fund migrations across 6 major layer-1 and layer-2 networks.
        </p>
      </div>

      {/* Supported Networks Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {networks.map((net) => {
          const isSelected = selectedChain === net.name;
          return (
            <button
              key={net.name}
              onClick={() => setSelectedChain(isSelected ? 'All' : net.name)}
              className={`p-3.5 rounded-lg border text-left transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-blue-50/70 border-blue-300 dark:bg-blue-950/40 dark:border-[#4F8EF7]'
                  : 'bg-white dark:bg-[#1B212C] border-[#E2E8F0] dark:border-[#303948] hover:border-slate-300 dark:hover:border-[#475569]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <NetworkBadge network={net.name} size="sm" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              <div className="text-sm font-bold text-[#172033] dark:text-[#F1F5F9] font-sans mt-2">
                {net.volume}
              </div>
              <div className="text-[10px] text-[#64748B] dark:text-[#7F8DA3] mt-0.5 font-sans">
                {net.activeEvents} bridge events
              </div>
            </button>
          );
        })}
      </div>

      {/* Visual Cross-Chain Hop Architecture Card */}
      <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-[#303948]">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="w-4 h-4 text-blue-600 dark:text-[#4F8EF7]" />
            <h3 className="text-sm font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">
              Cross-Chain Fund Dissipation Modus Operandi
            </h3>
          </div>
          <span className="text-[10px] text-blue-700 bg-blue-50 border border-blue-200 dark:bg-blue-950/60 dark:border-blue-800/40 dark:text-blue-300 px-2 py-0.5 rounded font-medium font-sans">
            Multi-Network Bridging
          </span>
        </div>

        {/* 4-Step Cross-Chain Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-1">
          {/* Step 1: Origin */}
          <div className="p-3.5 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-lg relative">
            <span className="text-[10px] font-semibold text-blue-600 dark:text-[#4F8EF7] uppercase tracking-wider block mb-1 font-sans">
              1. Source Chain
            </span>
            <div className="text-sm font-bold text-[#172033] dark:text-[#F1F5F9] mb-1 font-sans">
              Ethereum Mainnet
            </div>
            <div className="text-[11px] text-[#64748B] dark:text-[#A8B3C5] font-sans leading-relaxed">
              Extortion proceeds deposited to suspect wallet address.
            </div>
            <div className="mt-3 text-[11px] text-slate-800 dark:text-[#F1F5F9] font-semibold font-sans">
              Volume: 184.5 ETH
            </div>
            <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-400 dark:text-[#7F8DA3] bg-white dark:bg-[#1B212C] rounded-full p-0.5 border border-[#E2E8F0] dark:border-[#303948]">
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-[#7F8DA3]" />
            </div>
          </div>

          {/* Step 2: Bridge */}
          <div className="p-3.5 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-lg relative">
            <span className="text-[10px] font-semibold text-[#64748B] dark:text-[#A8B3C5] uppercase tracking-wider block mb-1 font-sans">
              2. Liquidity Bridge
            </span>
            <div className="text-sm font-bold text-[#172033] dark:text-[#F1F5F9] mb-1 font-sans">
              Polygon PoS Router
            </div>
            <div className="text-[11px] text-[#64748B] dark:text-[#A8B3C5] font-sans leading-relaxed">
              Locked into contract <span className="font-mono">0xA0c6...881F</span> to mint wrapped asset.
            </div>
            <div className="mt-3 text-[11px] text-slate-800 dark:text-[#F1F5F9] font-semibold font-sans">
              Relayer: Confirmed
            </div>
            <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-400 dark:text-[#7F8DA3] bg-white dark:bg-[#1B212C] rounded-full p-0.5 border border-[#E2E8F0] dark:border-[#303948]">
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-[#7F8DA3]" />
            </div>
          </div>

          {/* Step 3: Target Chain */}
          <div className="p-3.5 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-lg relative">
            <span className="text-[10px] font-semibold text-[#64748B] dark:text-[#A8B3C5] uppercase tracking-wider block mb-1 font-sans">
              3. Target Network
            </span>
            <div className="text-sm font-bold text-[#172033] dark:text-[#F1F5F9] mb-1 font-sans">
              Polygon PoS Network
            </div>
            <div className="text-[11px] text-[#64748B] dark:text-[#A8B3C5] font-sans leading-relaxed">
              Wrapped ETH (WETH) received and fragmented into structured sub-transfers.
            </div>
            <div className="mt-3 text-[11px] text-slate-800 dark:text-[#F1F5F9] font-semibold font-sans">
              Gas Fee: 0.002 POL
            </div>
            <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-400 dark:text-[#7F8DA3] bg-white dark:bg-[#1B212C] rounded-full p-0.5 border border-[#E2E8F0] dark:border-[#303948]">
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-[#7F8DA3]" />
            </div>
          </div>

          {/* Step 4: VASP Endpoint */}
          <div className="p-3.5 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-lg">
            <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-1 font-sans">
              4. Exchange Deposit
            </span>
            <div className="text-sm font-bold text-[#172033] dark:text-[#F1F5F9] mb-1 font-sans">
              Example Exchange VASP
            </div>
            <div className="text-[11px] text-[#64748B] dark:text-[#A8B3C5] font-sans leading-relaxed">
              Final consolidation sweep into exchange deposit account <span className="font-mono">0x4d8a...d884</span>.
            </div>
            <div className="mt-3 text-[11px] text-emerald-700 dark:text-emerald-400 font-bold font-sans">
              Confidence: 92%
            </div>
          </div>
        </div>
      </div>

      {/* Cross-Chain Transactions Ledger */}
      <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg overflow-hidden shadow-xs">
        <div className="p-4 border-b border-[#E2E8F0] dark:border-[#303948] bg-slate-50/75 dark:bg-[#1D2430] flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">
            Recorded Cross-Chain Transfer Events
          </h3>
          <span className="text-xs text-[#64748B] dark:text-[#A8B3C5] font-sans">
            {filteredFlows.length} events logged
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E2E8F0] dark:border-[#303948] bg-slate-50/50 dark:bg-[#1D2430] text-[#64748B] dark:text-[#A8B3C5] uppercase tracking-wider text-[10px] font-sans font-medium">
                <th className="py-2.5 px-4">Transaction / Time</th>
                <th className="py-2.5 px-4">Source Network</th>
                <th className="py-2.5 px-4">Bridge Router</th>
                <th className="py-2.5 px-4">Target Network</th>
                <th className="py-2.5 px-4">Destination VASP</th>
                <th className="py-2.5 px-4">Volume</th>
                <th className="py-2.5 px-4">Risk Rating</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#303948] font-sans">
              {filteredFlows.map((flow) => (
                <tr key={flow.id} className="hover:bg-slate-50 dark:hover:bg-[#252D3A] transition-colors">
                  <td className="py-3 px-4 text-[#172033] dark:text-[#F1F5F9] max-w-[170px] truncate">
                    <div className="text-blue-600 dark:text-[#4F8EF7] font-mono font-medium">{flow.txHash.slice(0, 10)}...{flow.txHash.slice(-6)}</div>
                    <div className="text-[10px] text-[#64748B] dark:text-[#7F8DA3] mt-0.5 font-sans">{flow.timestamp}</div>
                  </td>

                  <td className="py-3 px-4">
                    <NetworkBadge network={flow.sourceChain} size="sm" />
                  </td>

                  <td className="py-3 px-4 text-slate-800 dark:text-[#F1F5F9]">
                    {flow.bridgeName}
                  </td>

                  <td className="py-3 px-4">
                    <NetworkBadge network={flow.targetChain} size="sm" />
                  </td>

                  <td className="py-3 px-4 text-slate-900 dark:text-[#F1F5F9] font-medium">
                    {flow.destinationVasp}
                  </td>

                  <td className="py-3 px-4 font-semibold text-[#172033] dark:text-[#F1F5F9] tabular-nums">
                    {flow.amount}
                  </td>

                  <td className="py-3 px-4">
                    <RiskBadge level={flow.risk} size="sm" />
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onInvestigateAddress && onInvestigateAddress(flow.depositAddress)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-[#202734] dark:hover:bg-[#252D3A] dark:text-[#E2E8F0] text-xs rounded transition-colors inline-flex items-center gap-1 cursor-pointer font-medium border border-[#E2E8F0] dark:border-[#303948]"
                    >
                      <span>Trace</span>
                      <ExternalLink className="w-3 h-3 text-slate-400 dark:text-[#7F8DA3]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
