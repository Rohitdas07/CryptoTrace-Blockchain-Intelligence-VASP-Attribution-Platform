import React, { useState } from 'react';
import { 
  Briefcase, 
  Layers, 
  Building2, 
  ShieldAlert, 
  Search, 
  ChevronRight, 
  FileText, 
  Bell, 
  ArrowRight
} from 'lucide-react';
import { CaseItem, NavTab } from '../../types';
import { StatCard } from '../common/StatCard';
import { DashboardCharts } from '../charts/DashboardCharts';
import { RiskBadge } from '../common/RiskBadge';
import { NetworkBadge } from '../common/NetworkBadge';
import { WalletAddress } from '../common/WalletAddress';

interface MainDashboardProps {
  cases: CaseItem[];
  onNavigate: (tab: NavTab) => void;
  onQuickInvestigate: (address: string) => void;
  onSelectCase: (caseId: string) => void;
}

export const MainDashboard: React.FC<MainDashboardProps> = ({
  cases,
  onNavigate,
  onQuickInvestigate,
  onSelectCase
}) => {
  const [quickAddress, setQuickAddress] = useState('');

  const samplePresets = [
    { label: '0x7a3F...1F2 (ETH)', address: '0x7a3F82C9E4B188e0a300d68b6F3512a868a891F2' },
    { label: 'TYs5Fz...7aZ (TRX)', address: 'TYs5Fz39Q5k91nVaXb8kNmPxJ8m4VqW7aZ' },
    { label: 'bc1q9x...1f2 (BTC)', address: 'bc1q9x405g02w92lsl5q3d6s0k3a129f9e710291f2' }
  ];

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickAddress.trim()) return;
    onQuickInvestigate(quickAddress.trim());
    onNavigate('wallet-analysis');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E2E8F0] dark:border-[#303948]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-[#F1F5F9] tracking-tight font-sans">
            Blockchain Investigation Dashboard
          </h1>
          <p className="text-xs text-[#64748B] dark:text-[#A8B3C5] mt-0.5 max-w-2xl leading-relaxed font-sans">
            Automated attribution of unknown cryptocurrency wallets to nearest Virtual Asset Service Providers (VASPs) through public ledger intelligence.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('wallet-analysis')}
            className="px-3.5 py-1.5 bg-[#2563EB] hover:bg-blue-700 text-white rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Analyze Wallet</span>
          </button>
        </div>
      </div>

      {/* Prominent Wallet Investigation Search Area */}
      <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-4 sm:p-5 shadow-xs space-y-3">
        <div>
          <label htmlFor="wallet-search-input" className="block text-xs font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">
            Enter a suspicious wallet address to investigate
          </label>
          <p className="text-[11px] text-[#64748B] dark:text-[#A8B3C5] mt-0.5 font-sans">
            Query public ledger history, detect intermediary hops, and identify destination VASP deposit clusters.
          </p>
        </div>

        <form onSubmit={handleQuickSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#94A3B8] dark:text-[#7F8DA3] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="wallet-search-input"
              type="text"
              value={quickAddress}
              onChange={(e) => setQuickAddress(e.target.value)}
              placeholder="e.g. 0x7a3F82C9E4B188e0a300d68b6F3512a868a891F2, TYs5Fz..., bc1q9..."
              className="w-full pl-9 pr-3 py-2 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] focus:border-[#2563EB] dark:focus:border-[#4F8EF7] focus:bg-white dark:focus:bg-[#202734] rounded-md text-xs text-[#172033] dark:text-[#F1F5F9] placeholder:text-[#94A3B8] dark:placeholder:text-[#7F8DA3] font-mono focus:outline-hidden transition-colors"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <span>Investigate</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-[#64748B] dark:text-[#A8B3C5] font-sans">
          <span>Quick Samples:</span>
          {samplePresets.map((preset) => (
            <button
              key={preset.address}
              type="button"
              onClick={() => {
                setQuickAddress(preset.address);
                onQuickInvestigate(preset.address);
                onNavigate('wallet-analysis');
              }}
              className="px-2 py-0.5 rounded bg-[#F1F5F9] dark:bg-[#202734] hover:bg-[#E2E8F0] dark:hover:bg-[#252D3A] text-[#475569] dark:text-[#A8B3C5] font-mono text-[10px] transition-colors cursor-pointer border border-[#E2E8F0] dark:border-[#303948]"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Structured Analytics Metric Cards (6 cards with hierarchy) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard
          title="Active Cases"
          value={24}
          subtext="Under active inquiry"
          icon={Briefcase}
          badgeText="+3 today"
          badgeType="info"
          highlight
          onClick={() => onNavigate('investigations')}
        />

        <StatCard
          title="Wallets Analyzed"
          value="1,284"
          subtext="Indexed across 6 chains"
          icon={Layers}
          badgeText="Active"
          badgeType="success"
          onClick={() => onNavigate('wallet-analysis')}
        />

        <StatCard
          title="High-Risk Wallets"
          value={86}
          subtext="Mixer / Layering nexus"
          icon={ShieldAlert}
          badgeText="Flagged"
          badgeType="danger"
          highlight
          onClick={() => onNavigate('risk-intelligence')}
        />

        <StatCard
          title="VASP Attributions"
          value={742}
          subtext="Sweep clustered"
          icon={Building2}
          badgeText="92% avg"
          badgeType="info"
          onClick={() => onNavigate('vasp-attribution')}
        />

        <StatCard
          title="Pending Reports"
          value={18}
          subtext="Awaiting officer sign-off"
          icon={FileText}
          badgeText="Review"
          badgeType="warning"
          onClick={() => onNavigate('reports')}
        />

        <StatCard
          title="Security Alerts"
          value={6}
          subtext="Unresolved triggers"
          icon={Bell}
          badgeText="Action"
          badgeType="danger"
          onClick={() => onNavigate('alerts')}
        />
      </div>

      {/* Data Visualization Charts Grid */}
      <DashboardCharts />

      {/* Active Investigations Recent Dockets */}
      <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg overflow-hidden shadow-xs">
        <div className="px-4 py-3 border-b border-[#E2E8F0] dark:border-[#303948] bg-[#F8FAFC] dark:bg-[#1D2430] flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">
              Active investigation dockets
            </h3>
            <p className="text-[11px] text-[#64748B] dark:text-[#A8B3C5] mt-0.5 font-sans">
              High-priority active cybercrime cases requiring VASP attribution confirmation
            </p>
          </div>
          <button
            onClick={() => onNavigate('investigations')}
            className="text-xs text-[#2563EB] dark:text-[#4F8EF7] hover:text-blue-700 dark:hover:text-[#6EA8FE] hover:underline flex items-center gap-1 font-medium cursor-pointer transition-colors"
          >
            <span>View all cases</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E2E8F0] dark:border-[#303948] bg-[#F8FAFC] dark:bg-[#1D2430] text-[#64748B] dark:text-[#A8B3C5] text-xs font-medium font-sans">
                <th className="py-2.5 px-4 font-medium">Case ID</th>
                <th className="py-2.5 px-4 font-medium">Case Name</th>
                <th className="py-2.5 px-4 font-medium">Primary Wallet</th>
                <th className="py-2.5 px-4 font-medium">Network</th>
                <th className="py-2.5 px-4 font-medium">Risk Severity</th>
                <th className="py-2.5 px-4 font-medium">Status</th>
                <th className="py-2.5 px-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#303948] font-sans">
              {cases.slice(0, 4).map((c) => (
                <tr
                  key={c.caseId}
                  onClick={() => onSelectCase(c.caseId)}
                  className="bg-white dark:bg-[#1B212C] hover:bg-[#F1F5F9] dark:hover:bg-[#252D3A] transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-4 font-sans font-medium text-[#2563EB] dark:text-[#4F8EF7] whitespace-nowrap">
                    {c.caseId}
                  </td>
                  <td className="py-3 px-4 font-medium text-[#172033] dark:text-[#F1F5F9] group-hover:text-[#2563EB] dark:group-hover:text-[#4F8EF7] max-w-[220px] truncate transition-colors">
                    {c.caseName}
                  </td>
                  <td className="py-3 px-4">
                    <WalletAddress address={c.primaryWallet} className="text-[#64748B] dark:text-[#A8B3C5]" />
                  </td>
                  <td className="py-3 px-4">
                    <NetworkBadge network={c.blockchain} size="sm" />
                  </td>
                  <td className="py-3 px-4">
                    <RiskBadge level={c.risk} size="sm" />
                  </td>
                  <td className="py-3 px-4 text-[#64748B] dark:text-[#A8B3C5]">
                    {c.status}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCase(c.caseId);
                      }}
                      className="px-2.5 py-1 bg-white hover:bg-[#F1F5F9] dark:bg-[#202734] dark:hover:bg-[#252D3A] text-[#1E293B] dark:text-[#E2E8F0] text-xs rounded transition-colors cursor-pointer border border-[#CBD5E1] dark:border-[#303948] font-medium"
                    >
                      Open Case
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
