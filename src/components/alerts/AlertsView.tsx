import React, { useState } from 'react';
import { 
  Bell, 
  ShieldAlert, 
  Search, 
  ExternalLink 
} from 'lucide-react';
import { AlertItem } from '../../types';
import { MOCK_ALERTS } from '../../data/alerts';
import { RiskBadge } from '../common/RiskBadge';
import { NetworkBadge } from '../common/NetworkBadge';
import { WalletAddress } from '../common/WalletAddress';

interface AlertsViewProps {
  onInvestigateAddress?: (addr: string) => void;
  onOpenCase?: (caseId: string) => void;
}

export const AlertsView: React.FC<AlertsViewProps> = ({
  onInvestigateAddress,
  onOpenCase
}) => {
  const [alerts, setAlerts] = useState<AlertItem[]>(MOCK_ALERTS);
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredAlerts = alerts.filter((a) => {
    const matchSearch = !search.trim() ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.wallet.toLowerCase().includes(search.toLowerCase()) ||
      a.caseId.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase());

    const matchSev = severityFilter === 'All' || a.severity === severityFilter;
    const matchStatus = statusFilter === 'All' || a.status === statusFilter;

    return matchSearch && matchSev && matchStatus;
  });

  const handleUpdateStatus = (id: string, newStatus: AlertItem['status']) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  const unhandledCount = alerts.filter(a => a.status === 'New').length;

  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-[#E2E8F0] dark:border-[#303948] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-[#F1F5F9] tracking-tight font-sans">
            Security & Forensic Alerts
          </h1>
          <p className="text-xs text-[#64748B] dark:text-[#A8B3C5] mt-0.5 max-w-2xl leading-relaxed font-sans">
            Real-time heuristic trigger feed monitoring high-risk wallet activations, mixer hops, and nearest VASP clustering anomalies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-sans text-[#172033] dark:text-[#F1F5F9] bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] px-3 py-1.5 rounded-md shadow-xs">
            <span className="font-semibold text-[#2563EB] dark:text-[#4F8EF7]">{unhandledCount}</span> unhandled alerts
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#94A3B8] dark:text-[#7F8DA3] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search alerts by title, wallet, case ID, or description..."
            className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] focus:border-[#2563EB] dark:focus:border-[#4F8EF7] focus:bg-white dark:focus:bg-[#202734] rounded-md text-xs text-[#172033] dark:text-[#F1F5F9] placeholder:text-[#94A3B8] dark:placeholder:text-[#7F8DA3] font-sans focus:outline-hidden transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 font-sans">
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-3 py-2 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md text-xs font-medium text-[#172033] dark:text-[#F1F5F9] focus:outline-hidden cursor-pointer"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md text-xs font-medium text-[#172033] dark:text-[#F1F5F9] focus:outline-hidden cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Investigating">Investigating</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Dismissed">Dismissed</option>
          </select>
        </div>
      </div>

      {/* Alerts Stream List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg text-xs text-[#64748B] dark:text-[#A8B3C5] shadow-xs font-sans">
            No security alerts matching the current filter parameters.
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border transition-colors shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                alert.status === 'New'
                  ? 'border-blue-300 bg-blue-50/30 dark:border-blue-700/50 dark:bg-[#1B212C] ring-1 ring-blue-500/20'
                  : 'bg-white dark:bg-[#1B212C] border-[#E2E8F0] dark:border-[#303948] hover:border-slate-300 dark:hover:border-[#475569]'
              }`}
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 font-sans">
                  <RiskBadge level={alert.severity} size="sm" />
                  <NetworkBadge network={alert.network} size="sm" />
                  <span className="text-[11px] text-[#64748B] dark:text-[#A8B3C5]">
                    {alert.time}
                  </span>
                  <span className="text-slate-300 dark:text-[#303948]">·</span>
                  <button
                    onClick={() => onOpenCase && onOpenCase(alert.caseId)}
                    className="text-[11px] font-medium text-[#2563EB] dark:text-[#4F8EF7] hover:underline cursor-pointer"
                  >
                    {alert.caseId}
                  </button>
                </div>

                <h3 className="text-sm font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">
                  {alert.title}
                </h3>

                <p className="text-xs text-[#475569] dark:text-[#A8B3C5] leading-relaxed font-sans">
                  {alert.description}
                </p>

                <div className="pt-1 flex items-center gap-2 text-xs font-sans">
                  <span className="text-[11px] text-[#64748B] dark:text-[#A8B3C5]">Target Address:</span>
                  <WalletAddress address={alert.wallet} onExplore={onInvestigateAddress} />
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center font-sans">
                <select
                  value={alert.status}
                  onChange={(e) => handleUpdateStatus(alert.id, e.target.value as any)}
                  className="px-2.5 py-1.5 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] text-xs font-medium text-[#172033] dark:text-[#F1F5F9] rounded-md cursor-pointer focus:outline-hidden"
                >
                  <option value="New">Status: New</option>
                  <option value="Investigating">Status: Investigating</option>
                  <option value="Reviewed">Status: Reviewed</option>
                  <option value="Dismissed">Status: Dismissed</option>
                </select>

                {onInvestigateAddress && (
                  <button
                    onClick={() => onInvestigateAddress(alert.wallet)}
                    className="p-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-md text-xs transition-colors cursor-pointer"
                    title="Analyze wallet"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
