import React, { useState } from 'react';
import { 
  Share2, 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  X,
  Plus
} from 'lucide-react';
import { CaseItem, UserSession } from '../../types';
import { MOCK_SAHYOG_REQUESTS } from '../../data/vasps';

interface SahyogIntegrationViewProps {
  user: UserSession;
  activeCase?: CaseItem;
}

export const SahyogIntegrationView: React.FC<SahyogIntegrationViewProps> = ({
  user,
  activeCase
}) => {
  const [requests, setRequests] = useState(MOCK_SAHYOG_REQUESTS);
  const [prepareModalOpen, setPrepareModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<typeof MOCK_SAHYOG_REQUESTS[0] | null>(null);
  const [submitFeedback, setSubmitFeedback] = useState<string | null>(null);

  // Form State
  const [targetVasp, setTargetVasp] = useState('Example Exchange (Global)');
  const [targetWallet, setTargetWallet] = useState(activeCase?.primaryWallet || '0x7a3F82C9E4B188e0a300d68b6F3512a868a891F2');
  const [depositAddress, setDepositAddress] = useState('0x4d8a11F0c84B29E3060b94321A169FaE56A0d884');
  const [legalSection, setLegalSection] = useState('Section 91 CrPC / Intermediary Guidelines Rule 3');
  const [urgency, setUrgency] = useState<'Standard' | 'Urgent' | 'Emergency Preservation'>('Standard');
  const [evidenceNotes, setEvidenceNotes] = useState(
    'Deterministic clustering heuristics identify this deposit address as a verified sweeper account for the suspect funds associated with ongoing extortion inquiry.'
  );

  const workflowSteps = [
    { title: 'Forensic attribution', desc: 'Identify nearest VASP sweep cluster', completed: true },
    { title: 'Requisition draft', desc: 'Formulate statutory disclosure notice', completed: true },
    { title: 'Supervisor sign-off', desc: 'Seal evidence package with Officer ID', completed: true },
    { title: 'Secure transmittal', desc: 'mTLS handshake & API dispatch', active: true, demo: true },
    { title: 'VASP ingestion', desc: 'Compliance desk acknowledgment', active: false },
    { title: 'KYC & trace return', desc: 'Account identity received to custody', active: false }
  ];

  const handlePrepareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq = {
      requestId: `REQ-2026-0${requests.length + 1}`,
      caseId: activeCase?.caseId || 'CASE-2026-001',
      vaspName: targetVasp,
      targetWallet,
      depositAddress,
      legalProvision: legalSection,
      jurisdictionAuthority: user.agency,
      urgencyLevel: urgency,
      status: 'Submitted to SAHYOG (Demo)',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
      evidencePackageSummary: evidenceNotes
    };

    setRequests([newReq, ...requests]);
    setPrepareModalOpen(false);
    setSubmitFeedback(`Requisition ${newReq.requestId} packaged in prototype sandbox mode. No external legal transmittal was executed.`);
    setTimeout(() => setSubmitFeedback(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-[#E2E8F0] dark:border-[#303948] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-semibold text-[#2563EB] dark:text-[#4F8EF7] font-sans">
              Inter-Agency Lawful Requisition Bridge
            </span>
            <span className="text-slate-300 dark:text-[#303948]">·</span>
            <span className="text-[11px] text-amber-700 dark:text-amber-400 font-medium font-sans">
              Connection Status: Demo Sandbox / Safe Mode
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-[#F1F5F9] tracking-tight font-sans">
            SAHYOG Integration & Lawful Disclosure
          </h1>
          <p className="text-xs text-[#64748B] dark:text-[#A8B3C5] mt-0.5 max-w-2xl leading-relaxed font-sans">
            Standardized law enforcement interface for issuing formal information preservation orders and KYC/account disclosure notices to registered VASPs.
          </p>
        </div>

        <button
          onClick={() => setPrepareModalOpen(true)}
          className="py-1.5 px-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-md text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto font-sans"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Prepare Request</span>
        </button>
      </div>

      {submitFeedback && (
        <div className="p-3 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60 rounded-md flex items-center gap-2 text-xs text-blue-800 dark:text-blue-300 font-sans">
          <CheckCircle2 className="w-4 h-4 text-[#2563EB] dark:text-[#4F8EF7] shrink-0" />
          <span>{submitFeedback}</span>
        </div>
      )}

      {/* 5 Status Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-3.5 shadow-xs font-sans">
          <div className="text-[10px] uppercase font-semibold text-[#64748B] dark:text-[#A8B3C5] mb-1 font-sans">API Gateway</div>
          <div className="text-sm font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1.5 font-sans">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>Sandbox / Mock</span>
          </div>
          <div className="text-[10px] text-[#94A3B8] dark:text-[#7F8DA3] mt-1 font-sans">Ready for mTLS handshake</div>
        </div>

        <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-3.5 shadow-xs font-sans">
          <div className="text-[10px] uppercase font-semibold text-[#64748B] dark:text-[#A8B3C5] mb-1 font-sans">Auth Credentials</div>
          <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 font-sans">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>PKI Token Ready</span>
          </div>
          <div className="text-[10px] text-[#94A3B8] dark:text-[#7F8DA3] mt-1 font-sans">LEA Certificate valid</div>
        </div>

        <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-3.5 shadow-xs font-sans">
          <div className="text-[10px] uppercase font-semibold text-[#64748B] dark:text-[#A8B3C5] mb-1 font-sans">Last Synchronization</div>
          <div className="text-sm font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">
            4 min ago
          </div>
          <div className="text-[10px] text-[#94A3B8] dark:text-[#7F8DA3] mt-1 font-sans">Directory health check ok</div>
        </div>

        <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-3.5 shadow-xs font-sans">
          <div className="text-[10px] uppercase font-semibold text-[#64748B] dark:text-[#A8B3C5] mb-1 font-sans">Requests Sent</div>
          <div className="text-lg font-bold text-[#2563EB] dark:text-[#4F8EF7] font-sans tabular-nums">
            {requests.length} (Demo)
          </div>
          <div className="text-[10px] text-[#94A3B8] dark:text-[#7F8DA3] mt-1 font-sans">All cryptographically sealed</div>
        </div>

        <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-3.5 shadow-xs font-sans">
          <div className="text-[10px] uppercase font-semibold text-[#64748B] dark:text-[#A8B3C5] mb-1 font-sans">Pending Responses</div>
          <div className="text-lg font-bold text-amber-700 dark:text-amber-400 font-sans tabular-nums">
            1 Action
          </div>
          <div className="text-[10px] text-[#94A3B8] dark:text-[#7F8DA3] mt-1 font-sans">Awaiting compliance desk</div>
        </div>
      </div>

      {/* Lawful Disclosure Workflow Stepper */}
      <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-5 shadow-xs space-y-4 font-sans">
        <div>
          <h3 className="text-sm font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">
            Lawful requisition & asset freezing workflow (future architecture)
          </h3>
          <p className="text-[11px] text-[#64748B] dark:text-[#A8B3C5] mt-0.5 font-sans">
            Standard Operating Procedure (SOP) mapping from blockchain forensic trace to legal freeze and disclosure orders
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {workflowSteps.map((step, idx) => (
            <div
              key={step.title}
              className={`p-3 rounded-md border text-xs flex flex-col justify-between transition-colors font-sans ${
                step.completed 
                  ? 'bg-blue-50/50 border-blue-200 text-blue-800 dark:bg-blue-950/20 dark:border-blue-900/60 dark:text-[#6EA8FE]'
                  : step.active 
                  ? 'bg-white dark:bg-[#202734] border-[#2563EB] dark:border-[#4F8EF7] ring-1 ring-blue-500/20 text-[#172033] dark:text-[#F1F5F9]'
                  : 'bg-[#F8FAFC] dark:bg-[#202734]/50 border-[#E2E8F0] dark:border-[#303948] text-[#64748B] dark:text-[#7F8DA3]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1 text-[10px]">
                  <span className="font-medium text-[#64748B] dark:text-[#7F8DA3]">Step 0{idx + 1}</span>
                  {step.completed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                  {step.demo && <span className="text-[9px] px-1 bg-slate-200 dark:bg-[#1D2430] text-slate-600 dark:text-[#A8B3C5] rounded">Sandbox</span>}
                </div>
                <div className="font-semibold text-xs text-[#172033] dark:text-[#F1F5F9]">{step.title}</div>
                <div className="text-[10px] text-[#64748B] dark:text-[#A8B3C5] mt-1">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Prototype Safeguard Notice */}
        <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-md flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-200/90 font-sans">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <span className="leading-relaxed">
            <strong className="font-semibold text-amber-900 dark:text-amber-300">Safety Constraint:</strong> This prototype interface prepares and formats mock legal orders. It does not transmit enforceable warrants, asset freezes, or subpoena requests to live exchange infrastructure.
          </span>
        </div>
      </div>

      {/* Requests Ledger Table */}
      <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg overflow-hidden shadow-xs font-sans">
        <div className="p-4 border-b border-[#E2E8F0] dark:border-[#303948] bg-[#F8FAFC] dark:bg-[#1D2430] flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">
            Registered lawful requisitions & evidence packages
          </h3>
          <span className="text-xs text-[#64748B] dark:text-[#A8B3C5] font-sans">
            {requests.length} total dockets
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E2E8F0] dark:border-[#303948] bg-[#F8FAFC] dark:bg-[#1D2430] text-[#64748B] dark:text-[#A8B3C5] text-xs font-medium font-sans">
                <th className="py-2.5 px-4">Request ID</th>
                <th className="py-2.5 px-4">Target VASP</th>
                <th className="py-2.5 px-4">Case Docket</th>
                <th className="py-2.5 px-4">Target Deposit Address</th>
                <th className="py-2.5 px-4">Urgency</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4">Timestamp</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#303948] font-sans">
              {requests.map((req) => (
                <tr
                  key={req.requestId}
                  onClick={() => setSelectedRequest(req)}
                  className="hover:bg-[#F8FAFC] dark:hover:bg-[#252D3A] transition-colors cursor-pointer group bg-white dark:bg-[#1B212C]"
                >
                  <td className="py-3 px-4 font-sans font-medium text-[#2563EB] dark:text-[#4F8EF7] whitespace-nowrap">
                    {req.requestId}
                  </td>
                  <td className="py-3 px-4 font-medium text-[#172033] dark:text-[#F1F5F9] group-hover:text-[#2563EB] dark:group-hover:text-[#4F8EF7]">
                    {req.vaspName}
                  </td>
                  <td className="py-3 px-4 text-[#2563EB] dark:text-[#4F8EF7] font-medium">
                    {req.caseId}
                  </td>
                  <td className="py-3 px-4 text-[#475569] dark:text-[#A8B3C5] truncate max-w-[140px] font-mono text-[11px]">
                    {req.depositAddress || (req as any).walletAddress}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-amber-700 dark:text-amber-400 font-medium">{req.urgencyLevel}</span>
                  </td>
                  <td className="py-3 px-4 text-[#475569] dark:text-[#A8B3C5]">
                    {req.status}
                  </td>
                  <td className="py-3 px-4 text-[11px] text-[#64748B] dark:text-[#7F8DA3] whitespace-nowrap">
                    {req.timestamp}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRequest(req);
                      }}
                      className="px-2.5 py-1 bg-[#F1F5F9] dark:bg-[#202734] hover:bg-slate-200 dark:hover:bg-[#252D3A] text-[#172033] dark:text-[#F1F5F9] text-xs font-medium rounded transition-colors inline-flex items-center gap-1 cursor-pointer border border-[#E2E8F0] dark:border-[#303948]"
                    >
                      <Eye className="w-3 h-3 text-[#94A3B8] dark:text-[#7F8DA3]" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Prepare Request Modal */}
      {prepareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-xs font-sans">
          <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg max-w-lg w-full p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-[#303948]">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-[#2563EB] dark:text-[#4F8EF7]" />
                <h4 className="text-sm font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">Prepare Lawful Requisition</h4>
              </div>
              <button
                onClick={() => setPrepareModalOpen(false)}
                className="text-[#94A3B8] hover:text-[#172033] dark:hover:text-[#F1F5F9] p-1 rounded hover:bg-[#F1F5F9] dark:hover:bg-[#202734] transition-colors cursor-pointer"
                aria-label="Close request modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePrepareSubmit} className="space-y-3 text-xs font-sans">
              <div>
                <label className="block text-[#172033] dark:text-[#F1F5F9] font-medium mb-1">
                  Designated VASP Entity
                </label>
                <input
                  type="text"
                  value={targetVasp}
                  onChange={(e) => setTargetVasp(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] focus:border-[#2563EB] dark:focus:border-[#4F8EF7] rounded-md text-[#172033] dark:text-[#F1F5F9]"
                />
              </div>

              <div>
                <label className="block text-[#172033] dark:text-[#F1F5F9] font-medium mb-1">
                  Target Identified Deposit Address
                </label>
                <input
                  type="text"
                  value={depositAddress}
                  onChange={(e) => setDepositAddress(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] focus:border-[#2563EB] dark:focus:border-[#4F8EF7] rounded-md text-[#172033] dark:text-[#F1F5F9] font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#172033] dark:text-[#F1F5F9] font-medium mb-1">
                    Statutory Provision
                  </label>
                  <input
                    type="text"
                    value={legalSection}
                    onChange={(e) => setLegalSection(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] focus:border-[#2563EB] dark:focus:border-[#4F8EF7] rounded-md text-[#172033] dark:text-[#F1F5F9]"
                  />
                </div>

                <div>
                  <label className="block text-[#172033] dark:text-[#F1F5F9] font-medium mb-1">
                    Urgency Classification
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] focus:border-[#2563EB] dark:focus:border-[#4F8EF7] rounded-md text-[#172033] dark:text-[#F1F5F9] cursor-pointer"
                  >
                    <option value="Standard">Standard (72 Hours)</option>
                    <option value="Urgent">Urgent (24 Hours)</option>
                    <option value="Emergency Preservation">Emergency Freeze (Immediate)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#172033] dark:text-[#F1F5F9] font-medium mb-1">
                  Evidentiary Statement & Summary
                </label>
                <textarea
                  rows={3}
                  value={evidenceNotes}
                  onChange={(e) => setEvidenceNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] focus:border-[#2563EB] dark:focus:border-[#4F8EF7] rounded-md text-[#172033] dark:text-[#F1F5F9] leading-relaxed font-sans"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#E2E8F0] dark:border-[#303948]">
                <button
                  type="button"
                  onClick={() => setPrepareModalOpen(false)}
                  className="px-3.5 py-1.5 bg-[#F1F5F9] dark:bg-[#202734] hover:bg-slate-200 dark:hover:bg-[#252D3A] text-[#172033] dark:text-[#F1F5F9] rounded-md font-medium cursor-pointer transition-colors border border-[#E2E8F0] dark:border-[#303948]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-md font-semibold shadow-xs cursor-pointer transition-colors"
                >
                  Package & Issue (Demo)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Request Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-xs font-sans">
          <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg max-w-lg w-full p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-[#303948]">
              <div>
                <span className="text-[10px] text-[#2563EB] dark:text-[#4F8EF7] font-semibold font-sans">
                  {selectedRequest.requestId}
                </span>
                <h4 className="text-sm font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">Lawful Requisition Dossier</h4>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="text-[#94A3B8] hover:text-[#172033] dark:hover:text-[#F1F5F9] p-1 rounded hover:bg-[#F1F5F9] dark:hover:bg-[#202734] cursor-pointer transition-colors"
                aria-label="Close details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-sans">
              <div className="p-3 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded">
                <span className="text-[10px] uppercase font-semibold text-[#64748B] dark:text-[#A8B3C5] block mb-1">Target VASP Entity</span>
                <span className="font-semibold text-[#172033] dark:text-[#F1F5F9] text-sm">{selectedRequest.vaspName}</span>
              </div>

              <div className="p-3 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded">
                <span className="text-[10px] uppercase font-semibold text-[#64748B] dark:text-[#A8B3C5] block mb-1">Target Deposit Address</span>
                <span className="font-mono text-[#2563EB] dark:text-[#4F8EF7] text-xs break-all block">{selectedRequest.depositAddress || (selectedRequest as any).walletAddress}</span>
              </div>

              <div className="p-3 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded">
                <span className="text-[10px] uppercase font-semibold text-[#64748B] dark:text-[#A8B3C5] block mb-1">Evidentiary Summary</span>
                <p className="text-[#334155] dark:text-[#A8B3C5] leading-relaxed text-xs">{selectedRequest.evidencePackageSummary || 'Direct deposit sweep observed with high attribution confidence.'}</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-3.5 py-1.5 bg-[#F1F5F9] dark:bg-[#202734] hover:bg-slate-200 dark:hover:bg-[#252D3A] text-[#172033] dark:text-[#F1F5F9] rounded text-xs font-medium cursor-pointer transition-colors border border-[#E2E8F0] dark:border-[#303948]"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
