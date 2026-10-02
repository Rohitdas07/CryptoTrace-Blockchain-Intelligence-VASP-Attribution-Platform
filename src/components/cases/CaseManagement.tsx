import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  Plus, 
  Search, 
  Building2, 
  X
} from 'lucide-react';
import { CaseItem, CaseStatus, Blockchain, UserSession } from '../../types';
import { PRIMARY_DEMO_WALLET } from '../../data/wallets';
import { CaseDetailWorkspace } from './CaseDetailWorkspace';

interface CaseManagementProps {
  cases: CaseItem[];
  onCreateCase: (newCase: CaseItem) => void;
  onSelectCase: (caseId: string) => void;
  onOpenInvestigation: (address: string) => void;
  user?: UserSession;
  onOpenReport?: () => void;
}

export const CaseManagement: React.FC<CaseManagementProps> = ({
  cases,
  onCreateCase,
  onSelectCase,
  onOpenInvestigation,
  user,
  onOpenReport
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [activeWorkspaceCase, setActiveWorkspaceCase] = useState<CaseItem | null>(null);

  // New Case Form state
  const [formCaseName, setFormCaseName] = useState('');
  const [formAgency, setFormAgency] = useState('Central Cyber Crime Command');
  const [formWallet, setFormWallet] = useState('');
  const [formChain, setFormChain] = useState<Blockchain>('Ethereum');
  const [formIncidentType, setFormIncidentType] = useState('Ransomware Extortion');
  const [formSummary, setFormSummary] = useState('');

  const statusOptions: string[] = [
    'Active',
    'Under Review',
    'Awaiting Information',
    'Closed'
  ];

  const filteredCases = useMemo(() => {
    return cases.filter(c => {
      const matchSearch = !search.trim() ||
        c.caseId.toLowerCase().includes(search.toLowerCase()) ||
        c.caseName.toLowerCase().includes(search.toLowerCase()) ||
        c.primaryWallet.toLowerCase().includes(search.toLowerCase()) ||
        c.agency.toLowerCase().includes(search.toLowerCase());

      const matchStatus = statusFilter === 'All' || c.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [cases, search, statusFilter]);

  const handleCreateCaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCaseName.trim() || !formWallet.trim()) return;

    const newCaseId = `CASE-2026-0${cases.length + 1}`;
    const newCase: CaseItem = {
      caseId: newCaseId,
      caseName: formCaseName.trim(),
      agency: formAgency.trim(),
      walletsCount: 1,
      primaryWallet: formWallet.trim(),
      blockchain: formChain,
      risk: 'Review Required',
      vaspMatches: 1,
      lastUpdated: 'Just now',
      status: 'Active',
      priority: 'High',
      leadInvestigator: user ? `${user.officerName} (${user.badgeNumber})` : 'Inspector R. Sharma (Badge #LEA-CC-8821)',
      incidentType: formIncidentType,
      summary: formSummary.trim() || 'Preliminary cybercrime case file initialized.'
    };

    onCreateCase(newCase);
    setModalOpen(false);
    // Reset form
    setFormCaseName('');
    setFormWallet('');
    setFormSummary('');
  };

  const getStatusBadge = (status: CaseStatus) => {
    switch (status) {
      case 'Active':
        return 'text-blue-700 bg-blue-50 border border-blue-200 dark:text-blue-400 dark:bg-blue-950/60 dark:border-blue-800/40 px-2 py-0.5 rounded font-sans text-[10px] font-medium';
      case 'Under Review':
        return 'text-amber-800 bg-amber-50 border border-amber-200 dark:text-amber-400 dark:bg-amber-950/60 dark:border-amber-800/40 px-2 py-0.5 rounded font-sans text-[10px] font-medium';
      case 'Awaiting Information':
        return 'text-purple-700 bg-purple-50 border border-purple-200 dark:text-purple-400 dark:bg-purple-950/60 dark:border-purple-800/40 px-2 py-0.5 rounded font-sans text-[10px] font-medium';
      case 'Closed':
      default:
        return 'text-slate-600 bg-slate-100 border border-slate-200 dark:text-slate-400 dark:bg-slate-900 dark:border-slate-800 px-2 py-0.5 rounded font-sans text-[10px] font-medium';
    }
  };

  const defaultUserSession: UserSession = user || {
    officerId: 'LE-4402',
    officerName: 'Inspector R. Sharma',
    agency: 'Central Cyber Crime Division',
    badgeNumber: 'LEA-CC-8821',
    clearanceLevel: 'LEVEL IV FORENSIC',
    authenticatedAt: new Date().toISOString()
  };

  // If a case is open in full workspace mode, render CaseDetailWorkspace
  if (activeWorkspaceCase) {
    return (
      <CaseDetailWorkspace
        activeCase={activeWorkspaceCase}
        investigation={PRIMARY_DEMO_WALLET}
        user={defaultUserSession}
        onBack={() => setActiveWorkspaceCase(null)}
        onInvestigateWallet={(addr) => {
          onOpenInvestigation(addr);
        }}
        onOpenReport={() => {
          if (onOpenReport) onOpenReport();
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-[#E2E8F0] dark:border-[#303948] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-[#F1F5F9] tracking-tight font-sans">
            Case Management & Dossiers
          </h1>
          <p className="text-xs text-[#64748B] dark:text-[#A8B3C5] mt-0.5 max-w-2xl leading-relaxed font-sans">
            Law enforcement case files containing monitored cryptocurrency wallets, transaction lineage, and VASP subpoena records.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="py-1.5 px-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-md text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto font-sans"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create New Case</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 dark:text-[#7F8DA3] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Case ID, Case Name, Wallet address, or Agency..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-[#202734] border border-slate-300 dark:border-[#303948] focus:border-blue-500 dark:focus:border-[#4F8EF7] focus:bg-white dark:focus:bg-[#202734] rounded-md text-xs text-[#172033] dark:text-[#F1F5F9] placeholder:text-slate-400 dark:placeholder:text-[#7F8DA3] font-sans focus:outline-hidden transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-[#202734] border border-slate-300 dark:border-[#303948] rounded-md text-xs font-medium text-slate-700 dark:text-[#F1F5F9] focus:outline-hidden cursor-pointer"
          >
            <option value="All" className="bg-white dark:bg-[#1B212C]">All Statuses</option>
            {statusOptions.map((st) => (
              <option key={st} value={st} className="bg-white dark:bg-[#1B212C]">{st}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Cases Table */}
      <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E2E8F0] dark:border-[#303948] bg-slate-50/50 dark:bg-[#1D2430] text-[#64748B] dark:text-[#A8B3C5] uppercase tracking-wider text-[10px] font-sans font-medium">
                <th className="py-2.5 px-4">Case ID</th>
                <th className="py-2.5 px-4">Case Name</th>
                <th className="py-2.5 px-4">Investigating Agency</th>
                <th className="py-2.5 px-4">Wallets</th>
                <th className="py-2.5 px-4">Blockchain</th>
                <th className="py-2.5 px-4">Risk Evaluation</th>
                <th className="py-2.5 px-4">VASP Matches</th>
                <th className="py-2.5 px-4">Last Updated</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#303948] font-sans">
              {filteredCases.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-[#64748B] dark:text-[#7F8DA3] text-xs">
                    No investigation cases matching filter criteria.
                  </td>
                </tr>
              ) : (
                filteredCases.map((c) => (
                  <tr
                    key={c.caseId}
                    onClick={() => setActiveWorkspaceCase(c)}
                    className="hover:bg-slate-50 dark:hover:bg-[#252D3A] transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-4 font-mono font-medium text-blue-600 dark:text-[#4F8EF7] whitespace-nowrap">
                      {c.caseId}
                    </td>

                    <td className="py-3 px-4 font-medium text-[#172033] dark:text-[#F1F5F9] group-hover:text-blue-600 dark:group-hover:text-[#4F8EF7] max-w-[200px] truncate">
                      {c.caseName}
                    </td>

                    <td className="py-3 px-4 text-[#64748B] dark:text-[#A8B3C5] max-w-[150px] truncate text-[11px]">
                      {c.agency}
                    </td>

                    <td className="py-3 px-4 tabular-nums text-slate-700 dark:text-[#F1F5F9]">
                      {c.walletsCount}
                    </td>

                    <td className="py-3 px-4 text-slate-700 dark:text-[#A8B3C5]">
                      {c.blockchain}
                    </td>

                    <td className="py-3 px-4">
                      <span className={`text-xs ${
                        c.risk === 'Critical' || c.risk === 'High' 
                          ? 'text-rose-700 dark:text-rose-400 font-semibold' 
                          : c.risk === 'Review Required' || c.risk === 'Medium'
                          ? 'text-amber-700 dark:text-[#FCD34D] font-semibold'
                          : 'text-emerald-700 dark:text-emerald-400'
                      }`}>
                        {c.risk}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-700 dark:text-[#A8B3C5] text-xs truncate max-w-[140px]">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-[#4F8EF7] shrink-0" />
                        <span>{c.vaspMatches ?? 1} connected</span>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-[11px] text-[#64748B] dark:text-[#7F8DA3] whitespace-nowrap">
                      {c.lastUpdated}
                    </td>

                    <td className="py-3 px-4">
                      <span className={getStatusBadge(c.status)}>
                        {c.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenInvestigation(c.primaryWallet);
                        }}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-[#202734] dark:hover:bg-[#252D3A] dark:text-[#E2E8F0] text-xs font-medium rounded transition-colors cursor-pointer border border-[#E2E8F0] dark:border-[#303948]"
                      >
                        Investigate
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-3 border-t border-[#E2E8F0] dark:border-[#303948] bg-slate-50/75 dark:bg-[#1D2430] flex items-center justify-between text-xs text-[#64748B] dark:text-[#A8B3C5] font-sans">
          <span>Official Law Enforcement Investigation Registry</span>
          <span>{filteredCases.length} active docket records</span>
        </div>
      </div>

      {/* Modal: Create New Case */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-xs font-sans">
          <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg max-w-lg w-full p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-[#303948]">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600 dark:text-[#4F8EF7]" />
                <h4 className="text-sm font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">Create New Investigation Case</h4>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 dark:text-[#7F8DA3] dark:hover:text-[#F1F5F9] p-1 rounded hover:bg-slate-100 dark:hover:bg-[#202734] cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCaseSubmit} className="space-y-3 text-xs font-sans">
              <div>
                <label className="block text-slate-700 dark:text-[#A8B3C5] font-medium mb-1">
                  Case Name / Operation Codename
                </label>
                <input
                  type="text"
                  value={formCaseName}
                  onChange={(e) => setFormCaseName(e.target.value)}
                  placeholder="e.g. Operation CrypticSentinel – Hospital Extortion"
                  required
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#202734] border border-slate-300 dark:border-[#303948] focus:border-blue-500 dark:focus:border-[#4F8EF7] rounded-md text-[#172033] dark:text-[#F1F5F9] placeholder:text-slate-400 dark:placeholder:text-[#7F8DA3] focus:outline-hidden transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-[#A8B3C5] font-medium mb-1">
                  Investigating Agency
                </label>
                <input
                  type="text"
                  value={formAgency}
                  onChange={(e) => setFormAgency(e.target.value)}
                  placeholder="e.g. Central Cyber Crime Command"
                  required
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#202734] border border-slate-300 dark:border-[#303948] focus:border-blue-500 dark:focus:border-[#4F8EF7] rounded-md text-[#172033] dark:text-[#F1F5F9] placeholder:text-slate-400 dark:placeholder:text-[#7F8DA3] focus:outline-hidden transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-[#A8B3C5] font-medium mb-1">
                    Blockchain Network
                  </label>
                  <select
                    value={formChain}
                    onChange={(e) => setFormChain(e.target.value as Blockchain)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#202734] border border-slate-300 dark:border-[#303948] focus:border-blue-500 dark:focus:border-[#4F8EF7] rounded-md text-slate-800 dark:text-[#F1F5F9] focus:outline-hidden cursor-pointer"
                  >
                    <option value="Ethereum" className="bg-white dark:bg-[#1B212C]">Ethereum</option>
                    <option value="Bitcoin" className="bg-white dark:bg-[#1B212C]">Bitcoin</option>
                    <option value="Tron" className="bg-white dark:bg-[#1B212C]">Tron</option>
                    <option value="BNB Chain" className="bg-white dark:bg-[#1B212C]">BNB Chain</option>
                    <option value="Solana" className="bg-white dark:bg-[#1B212C]">Solana</option>
                    <option value="Polygon" className="bg-white dark:bg-[#1B212C]">Polygon</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-[#A8B3C5] font-medium mb-1">
                    Incident Type
                  </label>
                  <select
                    value={formIncidentType}
                    onChange={(e) => setFormIncidentType(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#202734] border border-slate-300 dark:border-[#303948] focus:border-blue-500 dark:focus:border-[#4F8EF7] rounded-md text-slate-800 dark:text-[#F1F5F9] focus:outline-hidden cursor-pointer"
                  >
                    <option value="Ransomware Extortion" className="bg-white dark:bg-[#1B212C]">Ransomware Extortion</option>
                    <option value="Corporate Account Takeover" className="bg-white dark:bg-[#1B212C]">Corporate Account Takeover</option>
                    <option value="Pig Butchering / Investment Fraud" className="bg-white dark:bg-[#1B212C]">Investment Fraud</option>
                    <option value="Smart Contract Exploit" className="bg-white dark:bg-[#1B212C]">Smart Contract Exploit</option>
                    <option value="Illicit Darknet Flow" className="bg-white dark:bg-[#1B212C]">Illicit Darknet Flow</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-[#A8B3C5] font-medium mb-1">
                  Primary Subject Wallet Address
                </label>
                <input
                  type="text"
                  value={formWallet}
                  onChange={(e) => setFormWallet(e.target.value)}
                  placeholder="e.g. 0x..."
                  required
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#202734] border border-slate-300 dark:border-[#303948] focus:border-blue-500 dark:focus:border-[#4F8EF7] rounded-md text-[#172033] dark:text-[#F1F5F9] placeholder:text-slate-400 dark:placeholder:text-[#7F8DA3] font-mono focus:outline-hidden transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-[#A8B3C5] font-medium mb-1">
                  Preliminary Incident Brief
                </label>
                <textarea
                  rows={3}
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  placeholder="Enter initial complainant notes, transaction timestamp, and suspected nexus..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#202734] border border-slate-300 dark:border-[#303948] focus:border-blue-500 dark:focus:border-[#4F8EF7] rounded-md text-[#172033] dark:text-[#F1F5F9] placeholder:text-slate-400 dark:placeholder:text-[#7F8DA3] focus:outline-hidden transition-colors"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#E2E8F0] dark:border-[#303948]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-[#202734] dark:hover:bg-[#252D3A] dark:text-[#E2E8F0] rounded-md font-medium cursor-pointer transition-colors border border-[#E2E8F0] dark:border-[#303948]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-md font-semibold cursor-pointer shadow-xs transition-colors"
                >
                  Initialize Case File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
