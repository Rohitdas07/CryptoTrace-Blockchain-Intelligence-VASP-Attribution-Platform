import React, { useState } from 'react';
import { 
  Share2, 
  CheckCircle2, 
  X, 
  AlertTriangle 
} from 'lucide-react';
import { SahyogRequestRecord, UserSession } from '../../types';

interface SahyogLawfulRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultVasp?: string;
  defaultWallet?: string;
  defaultCaseId?: string;
  user: UserSession;
  onSubmit: (record: SahyogRequestRecord) => void;
}

export const SahyogLawfulRequestModal: React.FC<SahyogLawfulRequestModalProps> = ({
  isOpen,
  onClose,
  defaultVasp = 'Example Exchange',
  defaultWallet = '0x7a3F82C9E4B188e0a300d68b6F3512a868a891F2',
  defaultCaseId = 'CASE-2026-001',
  user,
  onSubmit
}) => {
  const [caseId, setCaseId] = useState(defaultCaseId);
  const [vaspName, setVaspName] = useState(defaultVasp);
  const [walletAddress, setWalletAddress] = useState(defaultWallet);
  const [txHash, setTxHash] = useState('0x8a92f041b80c102a941e0029b38192a01f92881a8110291f9e88a10029192003');
  const [requestType, setRequestType] = useState<SahyogRequestRecord['requestType']>('Account KYC Disclosure');
  const [investigationRef, setInvestigationRef] = useState('N4C/CYBER/2026/SEC91-EXT');
  const [officerDetails, setOfficerDetails] = useState(`${user.officerName} (${user.officerId}) · ${user.agency}`);
  const [step, setStep] = useState<'form' | 'review' | 'confirmed'>('form');

  if (!isOpen) return null;

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('review');
  };

  const handleFinalSubmit = () => {
    const record: SahyogRequestRecord = {
      requestId: `SAHYOG-REQ-2026-0${Math.floor(100 + Math.random() * 900)}`,
      caseId,
      vaspName,
      walletAddress,
      txHash,
      requestType,
      investigationReference: investigationRef,
      officerDetails,
      legalProvision: 'Section 91 CrPC / Section 69B IT Act / Statutory Cyber Order',
      jurisdictionAuthority: user.agency,
      urgencyLevel: 'Urgent',
      status: 'Submitted to SAHYOG (Demo)',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
      evidencePackageSummary: `Automated attribution trace to ${vaspName} with 92% confidence.`
    };
    onSubmit(record);
    setStep('confirmed');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-xs font-sans">
      <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg max-w-xl w-full p-5 shadow-xl space-y-4 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-[#303948]">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[#2563EB] dark:text-[#4F8EF7]" />
            <div>
              <h4 className="text-sm font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">
                SAHYOG Portal · Lawful Information Request
              </h4>
              <span className="text-[10px] text-[#64748B] dark:text-[#A8B3C5] font-sans">
                Statutory Inter-Agency Gateway (Simulation)
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#172033] dark:hover:text-[#F1F5F9] p-1 rounded hover:bg-[#F1F5F9] dark:hover:bg-[#202734] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step 1: Form View */}
        {step === 'form' && (
          <form onSubmit={handleReview} className="space-y-3 font-sans">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#172033] dark:text-[#F1F5F9] font-medium mb-1">Case ID</label>
                <input
                  type="text"
                  value={caseId}
                  onChange={(e) => setCaseId(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md text-[#172033] dark:text-[#F1F5F9] font-medium focus:outline-hidden focus:border-[#2563EB] dark:focus:border-[#4F8EF7]"
                />
              </div>

              <div>
                <label className="block text-[#172033] dark:text-[#F1F5F9] font-medium mb-1">Suspected VASP</label>
                <input
                  type="text"
                  value={vaspName}
                  onChange={(e) => setVaspName(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md text-[#172033] dark:text-[#F1F5F9] focus:outline-hidden focus:border-[#2563EB] dark:focus:border-[#4F8EF7]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#172033] dark:text-[#F1F5F9] font-medium mb-1">Target Wallet Address</label>
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                required
                className="w-full px-3 py-2 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md text-[#172033] dark:text-[#F1F5F9] font-mono text-[11px] focus:outline-hidden focus:border-[#2563EB] dark:focus:border-[#4F8EF7]"
              />
            </div>

            <div>
              <label className="block text-[#172033] dark:text-[#F1F5F9] font-medium mb-1">Transaction Hash Nexus</label>
              <input
                type="text"
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                required
                className="w-full px-3 py-2 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md text-[#172033] dark:text-[#F1F5F9] font-mono text-[11px] focus:outline-hidden focus:border-[#2563EB] dark:focus:border-[#4F8EF7]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#172033] dark:text-[#F1F5F9] font-medium mb-1">Request Type</label>
                <select
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md text-[#172033] dark:text-[#F1F5F9] cursor-pointer focus:outline-hidden focus:border-[#2563EB] dark:focus:border-[#4F8EF7]"
                >
                  <option value="Account KYC Disclosure">Account KYC & Identity Disclosure</option>
                  <option value="Asset Freeze Request">Emergency Asset Preservation / Freeze</option>
                  <option value="Transaction Lineage Subpoena">Transaction Lineage Subpoena</option>
                  <option value="Urgent Preservation Notice">Urgent Preservation Notice (48h)</option>
                </select>
              </div>

              <div>
                <label className="block text-[#172033] dark:text-[#F1F5F9] font-medium mb-1">Investigation Reference</label>
                <input
                  type="text"
                  value={investigationRef}
                  onChange={(e) => setInvestigationRef(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md text-[#172033] dark:text-[#F1F5F9] font-medium focus:outline-hidden focus:border-[#2563EB] dark:focus:border-[#4F8EF7]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#172033] dark:text-[#F1F5F9] font-medium mb-1">Authorized Officer Details</label>
              <input
                type="text"
                value={officerDetails}
                onChange={(e) => setOfficerDetails(e.target.value)}
                required
                className="w-full px-3 py-2 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md text-[#172033] dark:text-[#F1F5F9] focus:outline-hidden focus:border-[#2563EB] dark:focus:border-[#4F8EF7]"
              />
            </div>

            <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-md flex items-start gap-2 text-amber-800 dark:text-amber-200/90">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                <strong>Prototype Notice:</strong> Preparing request generates a compliant legal notice packet. Submitting will simulate the SAHYOG inter-agency handshake without contacting live exchange infrastructure.
              </span>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-[#E2E8F0] dark:border-[#303948]">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 bg-[#F1F5F9] dark:bg-[#202734] hover:bg-slate-200 dark:hover:bg-[#252D3A] text-[#172033] dark:text-[#F1F5F9] rounded-md font-medium cursor-pointer transition-colors border border-[#E2E8F0] dark:border-[#303948]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3.5 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-md font-semibold cursor-pointer shadow-xs transition-colors"
              >
                Review Request Packet
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Review View */}
        {step === 'review' && (
          <div className="space-y-4 font-sans">
            <div className="p-4 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0] dark:border-[#303948]">
                <span className="font-semibold text-[#172033] dark:text-[#F1F5F9]">Lawful Information Requisition Review</span>
                <span className="text-[#2563EB] dark:text-[#4F8EF7] font-semibold">{caseId}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-[#64748B] dark:text-[#A8B3C5] block">Target VASP:</span><strong>{vaspName}</strong></div>
                <div><span className="text-[#64748B] dark:text-[#A8B3C5] block">Request Type:</span><strong>{requestType}</strong></div>
                <div><span className="text-[#64748B] dark:text-[#A8B3C5] block">Official Docket:</span><span>{investigationRef}</span></div>
                <div><span className="text-[#64748B] dark:text-[#A8B3C5] block">Designated Officer:</span><span>{officerDetails}</span></div>
              </div>
              <div className="pt-2 border-t border-[#E2E8F0] dark:border-[#303948]">
                <span className="text-[#64748B] dark:text-[#A8B3C5] block text-[10px]">Subject Wallet Address:</span>
                <span className="font-mono text-[#2563EB] dark:text-[#4F8EF7] break-all">{walletAddress}</span>
              </div>
              <div>
                <span className="text-[#64748B] dark:text-[#A8B3C5] block text-[10px]">Transaction Hash Nexus:</span>
                <span className="font-mono text-[#334155] dark:text-[#A8B3C5] break-all">{txHash}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-[#E2E8F0] dark:border-[#303948]">
              <button
                type="button"
                onClick={() => setStep('form')}
                className="px-3.5 py-1.5 bg-[#F1F5F9] dark:bg-[#202734] hover:bg-slate-200 dark:hover:bg-[#252D3A] text-[#172033] dark:text-[#F1F5F9] rounded-md font-medium cursor-pointer transition-colors border border-[#E2E8F0] dark:border-[#303948]"
              >
                Edit Parameters
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="px-4 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-md font-semibold cursor-pointer shadow-xs transition-colors"
              >
                Submit Through SAHYOG
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmed View */}
        {step === 'confirmed' && (
          <div className="text-center py-6 space-y-3 font-sans">
            <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-[#172033] dark:text-[#F1F5F9]">
              Lawful Request Dispatched to SAHYOG Queue
            </h4>
            <p className="text-xs text-[#475569] dark:text-[#A8B3C5] max-w-md mx-auto leading-relaxed">
              Dossier reference <strong>{investigationRef}</strong> has been transmitted in simulation mode. Token seal applied.
            </p>
            <div className="pt-3">
              <button
                onClick={onClose}
                className="px-4 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-md font-semibold cursor-pointer transition-colors shadow-xs"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
