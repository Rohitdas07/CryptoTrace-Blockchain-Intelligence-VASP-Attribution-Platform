import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldAlert, 
  FileText, 
  Clock, 
  FolderLock, 
  CheckCircle2, 
  Plus, 
  Download 
} from 'lucide-react';
import { CaseItem, WalletInvestigationResult, UserSession } from '../../types';
import { MOCK_TIMELINE_EVENTS } from '../../data/investigations';
import { RiskBadge } from '../common/RiskBadge';
import { NetworkBadge } from '../common/NetworkBadge';
import { WalletAddress } from '../common/WalletAddress';
import { ConfidenceMeter } from '../common/ConfidenceMeter';

interface CaseDetailWorkspaceProps {
  activeCase: CaseItem;
  investigation: WalletInvestigationResult;
  user: UserSession;
  onBack: () => void;
  onInvestigateWallet: (addr: string) => void;
  onOpenReport: () => void;
}

export const CaseDetailWorkspace: React.FC<CaseDetailWorkspaceProps> = ({
  activeCase,
  investigation,
  user,
  onBack,
  onInvestigateWallet,
  onOpenReport
}) => {
  const [activeTab, setActiveTab] = useState<
    'summary' | 'wallets' | 'activity' | 'attribution' | 'risk' | 'evidence' | 'timeline' | 'reports'
  >('summary');

  const [evidenceList, setEvidenceList] = useState([
    {
      id: 'EVD-01',
      title: 'Initial Ransom Note & Victim Payment Receipt',
      fileType: 'PDF Document',
      date: '2026-09-28 14:12 UTC',
      hash: '9a88f12a...0018a1',
      verified: true
    },
    {
      id: 'EVD-02',
      title: 'Deterministic Sweep Cluster Heuristic Log',
      fileType: 'JSON Forensic Dump',
      date: '2026-09-28 15:15 UTC',
      hash: '3f09ce99...11f0c8',
      verified: true
    },
    {
      id: 'EVD-03',
      title: 'Example Exchange Deposit Address Association Memo',
      fileType: 'Court Evidentiary PDF',
      date: '2026-09-28 15:30 UTC',
      hash: 'e0a91827...8019a1',
      verified: true
    }
  ]);

  return (
    <div className="space-y-6 font-sans">
      {/* Workspace Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-[#303948] gap-4">
        <div>
          <button
            onClick={onBack}
            className="text-xs text-blue-600 dark:text-[#4F8EF7] hover:underline flex items-center gap-1.5 mb-1 cursor-pointer transition-colors font-medium font-sans"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Investigations</span>
          </button>
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono font-medium text-blue-700 bg-blue-50 border border-blue-200 dark:text-[#4F8EF7] dark:bg-blue-950/60 dark:border-blue-800/40 px-2 py-0.5 rounded">
              {activeCase.caseId}
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-[#F1F5F9] tracking-tight font-sans">
              {activeCase.caseName}
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#64748B] dark:text-[#A8B3C5] mt-1 font-sans">
            <span>Agency: <strong className="text-slate-800 dark:text-[#F1F5F9]">{activeCase.agency}</strong></span>
            <span>·</span>
            <span>Lead: <strong className="text-slate-800 dark:text-[#F1F5F9]">{activeCase.leadInvestigator}</strong></span>
            <span>·</span>
            <RiskBadge level={activeCase.risk} size="sm" />
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 font-sans">
          <button
            onClick={onOpenReport}
            className="px-3.5 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Generate Case Dossier</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs (8 Sections) */}
      <div className="border-b border-[#E2E8F0] dark:border-[#303948] overflow-x-auto">
        <nav className="flex space-x-1 min-w-max">
          {[
            { id: 'summary', label: 'Case Summary' },
            { id: 'wallets', label: `Suspect Wallets (${activeCase.walletsCount})` },
            { id: 'activity', label: 'Transaction Activity' },
            { id: 'attribution', label: 'VASP Attribution' },
            { id: 'risk', label: 'Risk Intelligence' },
            { id: 'evidence', label: `Evidence (${evidenceList.length})` },
            { id: 'timeline', label: 'Investigation Timeline' },
            { id: 'reports', label: 'Reports' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-2 text-xs font-medium border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'border-blue-600 text-blue-600 dark:text-[#4F8EF7] dark:border-[#4F8EF7] font-semibold'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-[#A8B3C5] dark:hover:text-[#F1F5F9]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab 1: Case Summary */}
      {activeTab === 'summary' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-3.5 shadow-xs">
              <span className="text-[10px] uppercase font-semibold text-[#64748B] dark:text-[#7F8DA3] block mb-1 font-sans">Status</span>
              <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 font-sans">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{activeCase.status}</span>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-3.5 shadow-xs">
              <span className="text-[10px] uppercase font-semibold text-[#64748B] dark:text-[#7F8DA3] block mb-1 font-sans">Incident Type</span>
              <div className="text-sm font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">{activeCase.incidentType}</div>
            </div>
            <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-3.5 shadow-xs">
              <span className="text-[10px] uppercase font-semibold text-[#64748B] dark:text-[#7F8DA3] block mb-1 font-sans">Blockchain Network</span>
              <div className="mt-1"><NetworkBadge network={activeCase.blockchain} size="md" /></div>
            </div>
            <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-3.5 shadow-xs">
              <span className="text-[10px] uppercase font-semibold text-[#64748B] dark:text-[#7F8DA3] block mb-1 font-sans">Last Audit Event</span>
              <div className="text-xs text-slate-700 dark:text-[#A8B3C5] mt-1 font-sans">{activeCase.lastUpdated}</div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-semibold text-[#172033] dark:text-[#F1F5F9] pb-2 border-b border-[#E2E8F0] dark:border-[#303948] font-sans">
              Executive Incident Brief & Investigation Theory
            </h3>
            <p className="text-xs text-slate-600 dark:text-[#A8B3C5] leading-relaxed font-sans">
              {activeCase.summary}
            </p>
            <div className="p-3 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded text-xs space-y-1">
              <div className="text-[#64748B] dark:text-[#7F8DA3] font-medium text-[11px] font-sans">Primary Evidentiary Nexus:</div>
              <div className="font-mono text-blue-600 dark:text-[#4F8EF7] break-all">{activeCase.primaryWallet}</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Suspect Wallets */}
      {activeTab === 'wallets' && (
        <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-[#303948]">
            <h3 className="text-sm font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">
              Identified Suspect & Intermediary Wallets
            </h3>
            <span className="text-xs text-[#64748B] dark:text-[#A8B3C5] font-sans">
              {activeCase.walletsCount} addresses bound to docket
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              {
                role: 'Primary Ransomware Ingestion Wallet',
                address: activeCase.primaryWallet,
                chain: activeCase.blockchain,
                risk: 'Critical',
                balance: '2.35 ETH',
                txs: 142
              },
              {
                role: 'Intermediary Layering Wallet Alpha',
                address: '0x9B113F09C88a100249cE9923812a01f92881A811',
                chain: activeCase.blockchain,
                risk: 'High',
                balance: '0.12 ETH',
                txs: 14
              },
              {
                role: 'Privacy Mixer Relay Router',
                address: '0xd90e6420547cd011082191ca9012a912891f21c1',
                chain: activeCase.blockchain,
                risk: 'Critical',
                balance: '48.90 ETH',
                txs: 310
              },
              {
                role: 'Attributed VASP Deposit Wallet',
                address: '0x4d8a11F0c84B29E3060b94321A169FaE56A0d884',
                chain: activeCase.blockchain,
                risk: 'Medium',
                balance: '0.00 ETH (Swept)',
                txs: 28
              }
            ].map((w) => (
              <div
                key={w.address}
                className="p-3 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">{w.role}</span>
                    <RiskBadge level={w.risk} size="sm" />
                  </div>
                  <WalletAddress address={w.address} onExplore={onInvestigateWallet} />
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right text-xs">
                    <div className="text-[#172033] dark:text-[#F1F5F9] font-semibold font-sans">{w.balance}</div>
                    <div className="text-[#64748B] dark:text-[#7F8DA3] text-[10px] font-sans">{w.txs} transactions</div>
                  </div>
                  <button
                    onClick={() => onInvestigateWallet(w.address)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-[#1B212C] dark:hover:bg-[#252D3A] dark:text-[#E2E8F0] border border-[#E2E8F0] dark:border-[#303948] rounded text-xs font-medium cursor-pointer font-sans"
                  >
                    Analyze
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Transaction Activity */}
      {activeTab === 'activity' && (
        <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-[#303948]">
            <h3 className="text-sm font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">
              Docket Transaction Ledger
            </h3>
            <span className="text-xs text-[#64748B] dark:text-[#A8B3C5] font-sans">
              Displaying confirmed evidentiary events
            </span>
          </div>

          <div className="space-y-2">
            {investigation.transactions.slice(0, 5).map((tx) => (
              <div key={tx.id} className="p-3 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded flex items-center justify-between text-xs">
                <div>
                  <div className="font-mono text-blue-600 dark:text-[#4F8EF7] font-medium">{tx.txHash.slice(0, 14)}...{tx.txHash.slice(-8)}</div>
                  <div className="text-[10px] text-[#64748B] dark:text-[#7F8DA3] mt-0.5 font-sans">{tx.timestamp} · {tx.direction}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">{tx.amount} {tx.asset}</div>
                  <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium font-sans">{tx.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: VASP Attribution */}
      {activeTab === 'attribution' && (
        <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-[#303948] gap-4">
            <div>
              <span className="text-[10px] text-blue-600 dark:text-[#4F8EF7] uppercase font-semibold font-sans">
                Attributed Virtual Asset Service Provider
              </span>
              <h3 className="text-xl font-bold text-[#172033] dark:text-[#F1F5F9] tracking-tight mt-0.5 font-sans">
                {investigation.attribution.entityName}
              </h3>
              <p className="text-xs text-[#64748B] dark:text-[#A8B3C5] mt-0.5 font-sans">
                {investigation.attribution.entityType} · {investigation.attribution.jurisdictionEstimate}
              </p>
            </div>
            <ConfidenceMeter score={investigation.attribution.confidenceScore} size="lg" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded">
              <span className="text-[10px] text-[#64748B] dark:text-[#7F8DA3] block mb-0.5 font-sans">Attributed Deposit Address</span>
              <div className="font-mono text-[11px] text-blue-600 dark:text-[#4F8EF7] break-all font-medium">
                {investigation.attribution.depositAddress}
              </div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded">
              <span className="text-[10px] text-[#64748B] dark:text-[#7F8DA3] block mb-0.5 font-sans">Observed Inflow to VASP</span>
              <div className="font-semibold text-[#172033] dark:text-[#F1F5F9] text-sm mt-0.5 font-sans">
                {investigation.attribution.totalTransferredToVasp}
              </div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded">
              <span className="text-[10px] text-[#64748B] dark:text-[#7F8DA3] block mb-0.5 font-sans">Detection Methodology</span>
              <div className="text-xs font-medium text-slate-800 dark:text-[#F1F5F9] mt-0.5 font-sans">
                {investigation.attribution.detectionMethod}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Risk Intelligence */}
      {activeTab === 'risk' && (
        <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-[#303948]">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <h3 className="text-sm font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">
                Case Risk Heuristic Matrix
              </h3>
            </div>
            <span className="text-xs font-bold text-rose-700 dark:text-rose-400 font-sans">
              Heuristic Score: {investigation.riskAnalysis.riskScore}/100
            </span>
          </div>

          <div className="space-y-2.5">
            {investigation.riskAnalysis.indicators.map((ind) => (
              <div key={ind.id} className="p-3 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-lg flex items-start justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">{ind.name}</span>
                    <span className="text-[10px] text-[#64748B] dark:text-[#7F8DA3] font-sans">· {ind.ruleCategory}</span>
                  </div>
                  <p className="text-[#475569] dark:text-[#A8B3C5] leading-relaxed font-sans">{ind.description}</p>
                  <div className="mt-1.5 text-[10px] font-mono text-blue-700 dark:text-[#6EA8FE] bg-blue-50 dark:bg-[#1B212C] px-2 py-0.5 rounded border border-blue-200 dark:border-[#303948] inline-block font-medium">
                    {ind.detectedDetail}
                  </div>
                </div>
                <RiskBadge level={ind.severity} size="sm" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Evidence */}
      {activeTab === 'evidence' && (
        <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-[#303948]">
            <div className="flex items-center gap-2">
              <FolderLock className="w-4 h-4 text-blue-600 dark:text-[#4F8EF7]" />
              <h3 className="text-sm font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">
                Tamper-Evident Chain-of-Custody Repository
              </h3>
            </div>
            <button
              onClick={() => {
                const newEv = {
                  id: `EVD-0${evidenceList.length + 1}`,
                  title: 'New Forensic Graph Artifact',
                  fileType: 'Cryptographic Snapshot',
                  date: 'Just now',
                  hash: 'f92881a8...10291f',
                  verified: true
                };
                setEvidenceList([newEv, ...evidenceList]);
              }}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-[#202734] dark:hover:bg-[#252D3A] text-slate-700 dark:text-[#E2E8F0] rounded text-xs font-medium flex items-center gap-1 cursor-pointer border border-[#E2E8F0] dark:border-[#303948] font-sans"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Attach Evidence Item</span>
            </button>
          </div>

          <div className="space-y-2">
            {evidenceList.map((item) => (
              <div key={item.id} className="p-3 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-lg flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-blue-600 dark:text-[#4F8EF7] font-semibold">{item.id}</span>
                    <span className="font-medium text-[#172033] dark:text-[#F1F5F9] font-sans">{item.title}</span>
                  </div>
                  <div className="text-[10px] text-[#64748B] dark:text-[#7F8DA3] font-sans">
                    Type: {item.fileType} · Uploaded: {item.date} · SHA-256: <span className="font-mono">{item.hash}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/40 px-2 py-0.5 rounded font-medium font-sans">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                  <button className="p-1.5 text-slate-400 hover:text-slate-700 dark:text-[#7F8DA3] dark:hover:text-white rounded hover:bg-slate-200 dark:hover:bg-[#252D3A] cursor-pointer" title="Download">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 7: Investigation Timeline */}
      {activeTab === 'timeline' && (
        <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-[#303948]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600 dark:text-[#4F8EF7]" />
              <h3 className="text-sm font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">
                Forensic Investigation Timeline
              </h3>
            </div>
            <span className="text-xs text-[#64748B] dark:text-[#7F8DA3] font-sans">UTC Timestamped Audit</span>
          </div>

          <div className="space-y-4 relative pl-4 border-l-2 border-[#E2E8F0] dark:border-[#303948] my-2">
            {MOCK_TIMELINE_EVENTS.map((ev, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-[#4F8EF7] border-2 border-white dark:border-[#1B212C]" />
                <div className="text-[11px] text-[#64748B] dark:text-[#7F8DA3] font-sans">{ev.time}</div>
                <div className="text-xs font-semibold text-[#172033] dark:text-[#F1F5F9] mt-0.5 font-sans">{ev.title}</div>
                <p className="text-xs text-[#475569] dark:text-[#A8B3C5] mt-1 leading-relaxed font-sans">{ev.description}</p>
                <span className="mt-1.5 inline-block text-[10px] bg-slate-100 text-slate-700 border border-[#E2E8F0] dark:bg-[#202734] dark:text-[#A8B3C5] dark:border-[#303948] px-2 py-0.5 rounded font-medium font-sans">
                  {ev.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 8: Reports */}
      {activeTab === 'reports' && (
        <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-[#303948]">
            <h3 className="text-sm font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">
              Generated Reports for {activeCase.caseId}
            </h3>
            <button
              onClick={onOpenReport}
              className="px-3 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-md text-xs font-semibold cursor-pointer shadow-xs font-sans"
            >
              Generate New Report
            </button>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-lg flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">Complete Investigation Dossier REP-2026-881</div>
              <div className="text-[11px] text-[#64748B] dark:text-[#7F8DA3] mt-0.5 font-sans">Generated: 2026-09-28 15:45 UTC · Size: 482 KB</div>
            </div>
            <button
              onClick={onOpenReport}
              className="px-2.5 py-1 bg-white hover:bg-slate-50 dark:bg-[#1B212C] dark:hover:bg-[#252D3A] text-slate-700 dark:text-[#E2E8F0] border border-[#E2E8F0] dark:border-[#303948] rounded text-xs font-medium cursor-pointer font-sans"
            >
              Open Report Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
