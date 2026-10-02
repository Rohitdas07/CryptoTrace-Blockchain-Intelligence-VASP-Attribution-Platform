import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Search, 
  ChevronRight,
  X
} from 'lucide-react';
import { MOCK_VASP_DIRECTORY } from '../../data/mockData';

interface VaspIntelligenceProps {
  onInvestigateAddress?: (address: string) => void;
  onPrepareSahyogForVasp?: (vaspName: string, depositAddress: string) => void;
}

export const VaspIntelligence: React.FC<VaspIntelligenceProps> = ({
  onInvestigateAddress,
  onPrepareSahyogForVasp
}) => {
  const [search, setSearch] = useState('');
  const [chainFilter, setChainFilter] = useState<string>('All');
  const [selectedVasp, setSelectedVasp] = useState<any | null>(null);

  const filteredEntries = useMemo(() => {
    return MOCK_VASP_DIRECTORY.filter(entry => {
      const entityStr = (entry as any).entity || (entry as any).name || '';
      const addrStr = (entry as any).address || (entry as any).complianceContact || '';
      const jurisStr = (entry as any).jurisdiction || (entry as any).region || '';

      const matchSearch = !search.trim() ||
        entityStr.toLowerCase().includes(search.toLowerCase()) ||
        addrStr.toLowerCase().includes(search.toLowerCase()) ||
        jurisStr.toLowerCase().includes(search.toLowerCase());

      const matchChain = chainFilter === 'All' || 
        (entry as any).blockchain === chainFilter ||
        ((entry as any).supportedNetworks && (entry as any).supportedNetworks.includes(chainFilter));

      return matchSearch && matchChain;
    });
  }, [search, chainFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-[#E2E8F0] dark:border-[#303948]">
        <h1 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-[#F1F5F9] tracking-tight font-sans">
          VASP Attribution & Sweep Clustering
        </h1>
        <p className="text-xs text-[#64748B] dark:text-[#A8B3C5] mt-1 max-w-3xl leading-relaxed font-sans">
          Forensic directory and attribution knowledgebase of recognized Virtual Asset Service Providers (VASPs), deterministic deposit sweep clusters, and compliance contact endpoints.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#94A3B8] dark:text-[#7F8DA3] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search VASP name, known sweep address, jurisdiction, or entity..."
            className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] focus:border-[#2563EB] dark:focus:border-[#4F8EF7] focus:bg-white dark:focus:bg-[#202734] rounded-md text-xs text-[#172033] dark:text-[#F1F5F9] placeholder:text-[#94A3B8] dark:placeholder:text-[#7F8DA3] font-sans focus:outline-hidden transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={chainFilter}
            onChange={(e) => setChainFilter(e.target.value)}
            className="px-3 py-2 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md text-xs font-medium text-[#172033] dark:text-[#F1F5F9] focus:outline-hidden cursor-pointer"
          >
            <option value="All">All Supported Blockchains</option>
            <option value="Ethereum">Ethereum</option>
            <option value="Bitcoin">Bitcoin</option>
            <option value="Tron">Tron</option>
            <option value="BNB Chain">BNB Chain</option>
            <option value="Solana">Solana</option>
            <option value="Polygon">Polygon</option>
          </select>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredEntries.map((vasp) => {
          const entityName = (vasp as any).entity || (vasp as any).name || 'VASP Entity';
          const entityType = (vasp as any).type || 'Centralized Exchange';
          const address = (vasp as any).address || ((vasp as any).depositClusteringAccuracy ? `Sweep accuracy: ${(vasp as any).depositClusteringAccuracy}%` : '0x712a...98a1');
          const jurisdiction = (vasp as any).jurisdiction || (vasp as any).region || 'International';
          const confidence = (vasp as any).confidenceScore || (vasp as any).depositClusteringAccuracy || 92;

          return (
            <div
              key={vasp.id}
              onClick={() => setSelectedVasp(vasp)}
              className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] hover:border-slate-300 dark:hover:border-[#475569] rounded-lg p-4 shadow-xs transition-colors cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded bg-[#F1F5F9] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] flex items-center justify-center text-[#2563EB] dark:text-[#4F8EF7] shrink-0">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-[#172033] dark:text-[#F1F5F9] group-hover:text-[#2563EB] dark:group-hover:text-[#4F8EF7] transition-colors font-sans">
                        {entityName}
                      </h3>
                      <div className="text-[10px] text-[#64748B] dark:text-[#A8B3C5] font-sans">
                        {entityType}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded font-sans font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:border-emerald-800/40 dark:text-emerald-400">
                    {confidence}% Match
                  </span>
                </div>

                <div className="space-y-1.5 text-xs py-2 border-t border-b border-[#E2E8F0] dark:border-[#303948] my-2 font-sans">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#64748B] dark:text-[#A8B3C5]">Jurisdiction:</span>
                    <span className="text-[#172033] dark:text-[#F1F5F9] font-medium">{jurisdiction}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#64748B] dark:text-[#A8B3C5]">Sweep Cluster:</span>
                    <span className="text-[#2563EB] dark:text-[#4F8EF7] truncate max-w-[170px] font-mono text-[11px]">{address}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] text-[#94A3B8] dark:text-[#7F8DA3] font-sans">
                  Indexed in LEA Database
                </span>
                <span className="text-xs text-[#2563EB] dark:text-[#4F8EF7] group-hover:underline flex items-center gap-1 font-medium font-sans">
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected VASP Modal Details */}
      {selectedVasp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-xs font-sans">
          <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg max-w-lg w-full p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-[#303948]">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-[#2563EB] dark:text-[#4F8EF7]" />
                <h4 className="text-sm font-bold text-[#172033] dark:text-[#F1F5F9] font-sans">
                  {(selectedVasp as any).entity || (selectedVasp as any).name}
                </h4>
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
                <span className="text-[10px] uppercase text-[#64748B] dark:text-[#A8B3C5] block mb-1 font-semibold">Compliance Requisition Channel</span>
                <span className="text-[#172033] dark:text-[#F1F5F9] text-xs font-medium">{(selectedVasp as any).complianceContact || 'compliance-desk@exchange-portal.int'}</span>
              </div>

              <div className="p-3 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded">
                <span className="text-[10px] uppercase text-[#64748B] dark:text-[#A8B3C5] block mb-1 font-semibold">Clustered Sweeper Addresses</span>
                <span className="font-mono text-[#2563EB] dark:text-[#4F8EF7] text-xs break-all block">{(selectedVasp as any).address || '0x712a884b29e3060b94321a169fae56a0d8841920'}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E2E8F0] dark:border-[#303948] flex justify-end gap-2 font-sans">
              <button
                onClick={() => setSelectedVasp(null)}
                className="px-3.5 py-1.5 bg-[#F1F5F9] hover:bg-slate-200 text-[#172033] dark:bg-[#202734] dark:hover:bg-[#252D3A] dark:text-[#F1F5F9] rounded text-xs font-medium cursor-pointer border border-[#E2E8F0] dark:border-[#303948]"
              >
                Close
              </button>
              {onPrepareSahyogForVasp && (
                <button
                  onClick={() => {
                    onPrepareSahyogForVasp(
                      (selectedVasp as any).entity || (selectedVasp as any).name,
                      (selectedVasp as any).address || '0x4d8a11F0c84B29E3060b94321A169FaE56A0d884'
                    );
                    setSelectedVasp(null);
                  }}
                  className="px-3.5 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded text-xs font-semibold shadow-xs cursor-pointer"
                >
                  Prepare SAHYOG Request
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
