import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Copy, 
  Check, 
  X 
} from 'lucide-react';
import { VaspDirectoryRecord } from '../../types';
import { MOCK_VASP_DIRECTORY } from '../../data/vasps';
import { NetworkBadge } from '../common/NetworkBadge';
import { RiskBadge } from '../common/RiskBadge';

interface VaspDirectoryViewProps {
  onPrepareLawfulRequisition?: (vaspName: string) => void;
}

export const VaspDirectoryView: React.FC<VaspDirectoryViewProps> = ({
  onPrepareLawfulRequisition
}) => {
  const [directory] = useState<VaspDirectoryRecord[]>(MOCK_VASP_DIRECTORY);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedVasp, setSelectedVasp] = useState<VaspDirectoryRecord | null>(null);
  const [copied, setCopied] = useState(false);

  const filtered = directory.filter((v) => {
    const matchSearch = !search.trim() ||
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.region.toLowerCase().includes(search.toLowerCase()) ||
      v.complianceContact.toLowerCase().includes(search.toLowerCase());

    const matchType = typeFilter === 'All' || v.type === typeFilter;
    return matchSearch && matchType;
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-[#E2E8F0] dark:border-[#303948] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-[#F1F5F9] tracking-tight font-sans">
            VASP Intelligence Directory
          </h1>
          <p className="text-xs text-[#64748B] dark:text-[#A8B3C5] mt-1 max-w-3xl leading-relaxed font-sans">
            Registered Virtual Asset Service Providers (VASPs), custodial platforms, and deterministic sweep cluster endpoints recognized by LEA analytics.
          </p>
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
            placeholder="Search VASP name, jurisdiction, or compliance contact..."
            className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] focus:border-[#2563EB] dark:focus:border-[#4F8EF7] focus:bg-white dark:focus:bg-[#202734] rounded-md text-xs text-[#172033] dark:text-[#F1F5F9] placeholder:text-[#94A3B8] dark:placeholder:text-[#7F8DA3] font-sans focus:outline-hidden transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md text-xs font-medium text-[#172033] dark:text-[#F1F5F9] focus:outline-hidden cursor-pointer"
          >
            <option value="All">All VASP Types</option>
            <option value="Centralized Exchange">Centralized Exchange</option>
            <option value="Custodial Wallet">Custodial Wallet</option>
            <option value="Broker">Broker</option>
            <option value="Payment Provider">Payment Provider</option>
            <option value="Other VASP">Other VASP</option>
          </select>
        </div>
      </div>

      {/* VASP Table */}
      <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E2E8F0] dark:border-[#303948] bg-[#F8FAFC] dark:bg-[#1D2430] text-[#64748B] dark:text-[#A8B3C5] uppercase tracking-wider text-[10px] font-sans font-medium">
                <th className="py-2.5 px-4">VASP Entity Name</th>
                <th className="py-2.5 px-4">Entity Type</th>
                <th className="py-2.5 px-4">Region / Jurisdiction</th>
                <th className="py-2.5 px-4">Supported Networks</th>
                <th className="py-2.5 px-4">Clustering Accuracy</th>
                <th className="py-2.5 px-4">Risk Category</th>
                <th className="py-2.5 px-4">Last Updated</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#303948] font-sans">
              {filtered.map((v) => (
                <tr
                  key={v.id}
                  onClick={() => setSelectedVasp(v)}
                  className="hover:bg-[#F8FAFC] dark:hover:bg-[#252D3A] transition-colors cursor-pointer group bg-white dark:bg-[#1B212C]"
                >
                  <td className="py-3 px-4 font-semibold text-[#172033] dark:text-[#F1F5F9] group-hover:text-[#2563EB] dark:group-hover:text-[#4F8EF7]">
                    {v.name}
                  </td>

                  <td className="py-3 px-4 text-[#334155] dark:text-[#A8B3C5]">
                    {v.type}
                  </td>

                  <td className="py-3 px-4 text-[#334155] dark:text-[#A8B3C5]">
                    {v.region}
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {v.supportedNetworks.slice(0, 3).map((net) => (
                        <NetworkBadge key={net} network={net} size="sm" />
                      ))}
                      {v.supportedNetworks.length > 3 && (
                        <span className="text-[10px] text-[#64748B] dark:text-[#7F8DA3] self-center">
                          +{v.supportedNetworks.length - 3}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-3 px-4 font-semibold text-emerald-700 dark:text-emerald-400">
                    {v.depositClusteringAccuracy}%
                  </td>

                  <td className="py-3 px-4">
                    <RiskBadge level={v.riskCategory} size="sm" />
                  </td>

                  <td className="py-3 px-4 text-[#64748B] dark:text-[#7F8DA3]">
                    {v.lastUpdated}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVasp(v);
                      }}
                      className="px-2.5 py-1 bg-[#F1F5F9] hover:bg-slate-200 text-[#172033] dark:bg-[#202734] dark:hover:bg-[#252D3A] dark:text-[#F1F5F9] text-xs rounded transition-colors font-medium border border-[#E2E8F0] dark:border-[#303948] cursor-pointer"
                    >
                      Dossier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected VASP Detailed Drawer/Modal */}
      {selectedVasp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-xs font-sans">
          <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg max-w-lg w-full p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-[#303948]">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-[#2563EB] dark:text-[#4F8EF7]" />
                <div>
                  <h4 className="text-sm font-bold text-[#172033] dark:text-[#F1F5F9] font-sans">
                    {selectedVasp.name}
                  </h4>
                  <div className="text-[10px] text-[#64748B] dark:text-[#A8B3C5] font-sans">
                    {selectedVasp.type} · {selectedVasp.region}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedVasp(null)}
                className="text-[#94A3B8] hover:text-[#172033] dark:text-[#A8B3C5] dark:hover:text-[#F1F5F9] p-1 rounded hover:bg-[#F1F5F9] dark:hover:bg-[#252D3A] cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-sans">
              <div className="p-3 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded">
                <span className="text-[10px] uppercase text-[#64748B] dark:text-[#A8B3C5] block mb-1 font-semibold">Statutory Compliance Contact Point</span>
                <span className="text-[#172033] dark:text-[#F1F5F9] text-xs font-medium">{selectedVasp.complianceContact}</span>
              </div>

              <div className="p-3 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] uppercase text-[#64748B] dark:text-[#A8B3C5] font-semibold">Indexed Deposit Cluster ({selectedVasp.knownDepositWalletsCount.toLocaleString()} Wallets)</span>
                  <button
                    onClick={() => handleCopy((selectedVasp as any).knownHotWalletCluster || '0x712a884b29e3060b94321a169fae56a0d8841920')}
                    className="text-[10px] text-[#2563EB] dark:text-[#4F8EF7] hover:underline flex items-center gap-1 cursor-pointer font-sans"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <span className="font-mono text-[#2563EB] dark:text-[#4F8EF7] text-xs break-all block">
                  {(selectedVasp as any).knownHotWalletCluster || '0x712a884b29e3060b94321a169fae56a0d8841920'}
                </span>
              </div>

              <div className="p-3 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#64748B] dark:text-[#A8B3C5] block font-semibold">Clustering Sweep Accuracy</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold text-sm font-sans">{selectedVasp.depositClusteringAccuracy}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] dark:text-[#A8B3C5] block font-semibold">AML Risk Category</span>
                  <RiskBadge level={selectedVasp.riskCategory} size="sm" />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E2E8F0] dark:border-[#303948] flex justify-end gap-2 font-sans">
              <button
                onClick={() => setSelectedVasp(null)}
                className="px-3.5 py-1.5 bg-[#F1F5F9] hover:bg-slate-200 text-[#172033] dark:bg-[#202734] dark:hover:bg-[#252D3A] dark:text-[#F1F5F9] rounded text-xs font-medium cursor-pointer border border-[#E2E8F0] dark:border-[#303948]"
              >
                Close
              </button>
              {onPrepareLawfulRequisition && (
                <button
                  onClick={() => {
                    onPrepareLawfulRequisition(selectedVasp.name);
                    setSelectedVasp(null);
                  }}
                  className="px-3.5 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded text-xs font-semibold shadow-xs cursor-pointer"
                >
                  Prepare Lawful Requisition
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
