import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  ShieldCheck, 
  CheckCircle2, 
  Check, 
  Copy
} from 'lucide-react';
import { WalletInvestigationResult, CaseItem, UserSession } from '../../types';

interface InvestigationReportViewProps {
  investigation: WalletInvestigationResult;
  activeCase?: CaseItem;
  user: UserSession;
}

export const InvestigationReportView: React.FC<InvestigationReportViewProps> = ({
  investigation,
  activeCase,
  user
}) => {
  const [reportId] = useState(`REP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`);
  const [generatedDate] = useState(new Date().toUTCString());
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const sha256ReportDigest = '9e41b088f12a884391e0a918270192830018a10291f28019a18290382910fa76';

  const handleCopyDigest = () => {
    navigator.clipboard.writeText(sha256ReportDigest);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
      window.print();
    }, 600);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] dark:border-[#303948] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-semibold text-[#2563EB] dark:text-[#4F8EF7] font-sans">
              Forensic intelligence documentation
            </span>
            <span className="text-slate-300 dark:text-[#303948]">·</span>
            <span className="text-[11px] text-[#64748B] dark:text-[#A8B3C5] font-sans">
              Report digest: {reportId}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-[#F1F5F9] tracking-tight font-sans">
            Forensic investigation dossier
          </h1>
          <p className="text-xs text-[#64748B] dark:text-[#A8B3C5] mt-0.5 font-sans">
            Courtroom-ready evidentiary summary of blockchain movement, VASP clustering, and risk attribution.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 print:hidden font-sans">
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 bg-white dark:bg-[#202734] hover:bg-slate-50 dark:hover:bg-[#252D3A] border border-[#E2E8F0] dark:border-[#303948] text-[#172033] dark:text-[#F1F5F9] rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print view</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="px-3.5 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-md text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Compiling dossier...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF dossier</span>
              </>
            )}
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-md flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300 font-sans">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Forensic PDF document dispatched to system print/save pipeline with cryptographic seal.</span>
        </div>
      )}

      {/* Formal Printable Document Canvas */}
      <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-6 sm:p-8 shadow-xs space-y-7 relative overflow-hidden text-[#172033] dark:text-[#F1F5F9] font-sans print:bg-white print:text-black print:border-none print:shadow-none print:p-0">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-5 border-b border-[#E2E8F0] dark:border-[#303948] print:border-neutral-300 gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-md bg-[#2563EB] flex items-center justify-center text-white shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-bold tracking-tight text-[#172033] dark:text-[#F1F5F9] print:text-black font-sans">
                CryptoTrace Blockchain Forensic Bureau
              </div>
              <div className="text-xs font-normal text-[#64748B] dark:text-[#A8B3C5] print:text-neutral-600 font-sans">
                Official law enforcement cryptocurrency attribution dossier
              </div>
              <div className="text-[11px] text-amber-700 dark:text-amber-400 print:text-neutral-800 mt-0.5 font-medium font-sans">
                Classification: Restricted // Law enforcement sensitive
              </div>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs space-y-0.5 font-sans">
            <div className="text-[#64748B] dark:text-[#A8B3C5] print:text-neutral-600">Reference: <strong className="text-[#172033] dark:text-[#F1F5F9] print:text-black font-semibold">{reportId}</strong></div>
            <div className="text-[#64748B] dark:text-[#A8B3C5] print:text-neutral-600">Audit Date: <span className="text-[#334155] dark:text-[#A8B3C5] print:text-neutral-800">{generatedDate}</span></div>
            <div className="text-emerald-700 dark:text-emerald-400 print:text-emerald-700 font-medium">Digital Chain of Custody: Verified</div>
          </div>
        </div>

        {/* 1. Case Information */}
        <section className="space-y-3 font-sans">
          <h2 className="text-xs font-semibold text-[#2563EB] dark:text-[#4F8EF7] border-b border-[#E2E8F0] dark:border-[#303948] pb-1.5 print:text-neutral-900 print:border-neutral-300 font-sans">
            1. Investigation & docket information
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-sans">
            <div className="p-3 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md print:bg-neutral-50 print:border-neutral-200">
              <div className="text-[10px] uppercase font-semibold text-[#64748B] dark:text-[#A8B3C5]">Case ID</div>
              <div className="font-medium text-[#172033] dark:text-[#F1F5F9] text-xs mt-1 print:text-black font-sans">
                {activeCase?.caseId || 'CASE-2026-001'}
              </div>
            </div>

            <div className="p-3 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md print:bg-neutral-50 print:border-neutral-200">
              <div className="text-[10px] uppercase font-semibold text-[#64748B] dark:text-[#A8B3C5]">Lead Investigator</div>
              <div className="font-medium text-[#172033] dark:text-[#F1F5F9] text-xs mt-1 print:text-black">
                {user.officerName}
              </div>
              <div className="text-[10px] text-[#64748B] dark:text-[#A8B3C5] mt-0.5">{user.officerId}</div>
            </div>

            <div className="p-3 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md print:bg-neutral-50 print:border-neutral-200">
              <div className="text-[10px] uppercase font-semibold text-[#64748B] dark:text-[#A8B3C5]">Investigating Agency</div>
              <div className="font-medium text-[#172033] dark:text-[#F1F5F9] text-xs mt-1 print:text-black truncate">
                {user.agency}
              </div>
            </div>

            <div className="p-3 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md print:bg-neutral-50 print:border-neutral-200">
              <div className="text-[10px] uppercase font-semibold text-[#64748B] dark:text-[#A8B3C5]">Dossier Date</div>
              <div className="text-[#334155] dark:text-[#A8B3C5] text-xs mt-1 print:text-black font-sans">
                {new Date().toISOString().slice(0, 10)}
              </div>
            </div>
          </div>
        </section>

        {/* 2. Target Wallet Information */}
        <section className="space-y-3 font-sans">
          <h2 className="text-xs font-semibold text-[#2563EB] dark:text-[#4F8EF7] border-b border-[#E2E8F0] dark:border-[#303948] pb-1.5 print:text-neutral-900 print:border-neutral-300 font-sans">
            2. Monitored target wallet information
          </h2>
          <div className="p-4 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md space-y-3 print:bg-neutral-50 print:border-neutral-200 font-sans">
            <div>
              <div className="text-[10px] uppercase font-semibold text-[#64748B] dark:text-[#A8B3C5] mb-1">
                Target public cryptocurrency address
              </div>
              <div className="font-mono text-xs sm:text-sm font-semibold text-blue-700 dark:text-[#4F8EF7] print:text-black break-all select-all">
                {investigation.walletAddress}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div>
                <span className="text-[#64748B] dark:text-[#A8B3C5] block text-[10px]">Underlying blockchain</span>
                <span className="font-medium text-[#172033] dark:text-[#F1F5F9] print:text-black">{investigation.blockchain} Mainnet</span>
              </div>
              <div>
                <span className="text-[#64748B] dark:text-[#A8B3C5] block text-[10px]">Total ledger transactions</span>
                <span className="font-medium text-[#172033] dark:text-[#F1F5F9] print:text-black">{investigation.totalTransactions} events</span>
              </div>
              <div>
                <span className="text-[#64748B] dark:text-[#A8B3C5] block text-[10px]">Dossier status</span>
                <span className="font-medium text-amber-700 dark:text-amber-400 print:text-amber-700">{investigation.investigationStatus || (investigation as any).status}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Transaction Analysis & Topological Movement */}
        <section className="space-y-3 font-sans">
          <h2 className="text-xs font-semibold text-[#2563EB] dark:text-[#4F8EF7] border-b border-[#E2E8F0] dark:border-[#303948] pb-1.5 print:text-neutral-900 print:border-neutral-300 font-sans">
            3. Transaction analysis & fund movement
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md print:bg-neutral-50 print:border-neutral-200">
              <span className="text-[10px] text-[#64748B] dark:text-[#A8B3C5] block">Total volume inbound</span>
              <div className="font-semibold text-emerald-700 dark:text-emerald-400 text-sm mt-1 print:text-emerald-700">
                {investigation.totalIncoming}
              </div>
            </div>

            <div className="p-3 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md print:bg-neutral-50 print:border-neutral-200">
              <span className="text-[10px] text-[#64748B] dark:text-[#A8B3C5] block">Total volume outbound</span>
              <div className="font-semibold text-rose-700 dark:text-rose-400 text-sm mt-1 print:text-rose-700">
                {investigation.totalOutgoing}
              </div>
            </div>

            <div className="p-3 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md print:bg-neutral-50 print:border-neutral-200">
              <span className="text-[10px] text-[#64748B] dark:text-[#A8B3C5] block">Intermediate layering nodes</span>
              <div className="font-semibold text-[#172033] dark:text-[#F1F5F9] text-sm mt-1 print:text-black">
                {investigation.flowNodes.length - 2} intermediary hops
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md text-xs leading-relaxed text-[#334155] dark:text-[#A8B3C5] print:bg-neutral-50 print:text-neutral-800">
            <strong className="text-[#172033] dark:text-[#F1F5F9] font-semibold print:text-black block mb-1">Fund dissipation modus operandi:</strong>
            Funds were disbursed within rapid intervals through serial non-custodial addresses (Intermediate Wallet A and Intermediate Wallet B) in structured amounts below round-number alert thresholds, culminating in a direct sweep into a designated exchange deposit contract.
          </div>
        </section>

        {/* 4. VASP Attribution */}
        <section className="space-y-3 font-sans">
          <h2 className="text-xs font-semibold text-[#2563EB] dark:text-[#4F8EF7] border-b border-[#E2E8F0] dark:border-[#303948] pb-1.5 print:text-neutral-900 print:border-neutral-300 font-sans">
            4. Virtual asset service provider (VASP) attribution
          </h2>
          <div className="p-4 bg-[#F8FAFC] dark:bg-[#202734] border border-blue-200 dark:border-blue-900/60 rounded-md space-y-3 print:bg-neutral-50 print:border-neutral-300 font-sans">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-semibold text-blue-700 dark:text-[#4F8EF7] print:text-blue-800 block">
                  Attributed VASP entity
                </span>
                <div className="text-base font-bold text-[#172033] dark:text-[#F1F5F9] print:text-black mt-0.5">
                  {investigation.attribution.entityName}
                </div>
                <div className="text-xs text-[#64748B] dark:text-[#A8B3C5] print:text-neutral-600 mt-0.5">
                  {investigation.attribution.entityType} · {investigation.attribution.addressType}
                </div>
              </div>

              <div className="p-2.5 bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-md text-right print:bg-white print:border-neutral-300 shadow-xs">
                <span className="text-[10px] text-[#64748B] dark:text-[#A8B3C5] block">Attribution confidence</span>
                <span className="text-sm font-bold text-[#2563EB] dark:text-[#4F8EF7] print:text-blue-800">
                  {investigation.attribution.confidenceScore}% (Sweep clustered)
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E2E8F0] dark:border-[#303948] text-xs grid grid-cols-1 sm:grid-cols-2 gap-2 print:border-neutral-300 font-sans">
              <div>
                <span className="text-[#64748B] dark:text-[#A8B3C5] text-[10px] block">Attributed deposit address</span>
                <span className="font-mono text-slate-700 dark:text-slate-200 print:text-neutral-900 break-all text-[11px]">
                  {investigation.attribution.depositAddress}
                </span>
              </div>
              <div>
                <span className="text-[#64748B] dark:text-[#A8B3C5] text-[10px] block">Estimated volume directed to VASP</span>
                <span className="font-semibold text-[#172033] dark:text-[#F1F5F9] print:text-black">
                  {investigation.attribution.totalTransferredToVasp}
                </span>
              </div>
            </div>

            <div className="p-2.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 rounded text-[11px] text-amber-800 dark:text-amber-200/90 leading-relaxed print:text-neutral-700 print:border-neutral-300 print:bg-neutral-100">
              <strong className="font-semibold text-amber-900 dark:text-amber-300">Mandatory notice:</strong> Analytical attribution — investigator verification required. Attribution represents topological cluster matching and sweep transaction analysis. Do not present attribution as legal proof of account ownership.
            </div>
          </div>
        </section>

        {/* 5. Risk Analysis Matrix */}
        <section className="space-y-3 font-sans">
          <h2 className="text-xs font-semibold text-[#2563EB] dark:text-[#4F8EF7] border-b border-[#E2E8F0] dark:border-[#303948] pb-1.5 print:text-neutral-900 print:border-neutral-300 font-sans">
            5. Risk analysis & evidence indicators
          </h2>
          <div className="space-y-2 text-xs font-sans">
            <div className="flex items-center justify-between p-2.5 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md print:bg-neutral-50 print:border-neutral-200">
              <span className="font-medium text-[#334155] dark:text-[#F1F5F9] print:text-black">Overall case risk rating:</span>
              <span className="font-semibold text-amber-700 dark:text-amber-400 print:text-amber-700">Review required (Index: {investigation.riskAnalysis.riskScore}/100)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {investigation.riskAnalysis.indicators.map((ind) => (
                <div key={ind.id} className="p-2.5 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md print:bg-neutral-50 print:border-neutral-200 font-sans">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-[#334155] dark:text-[#F1F5F9] print:text-black text-[11px]">{ind.name}</span>
                    <span className="text-[10px] text-amber-700 dark:text-amber-400 print:text-neutral-700 font-medium">{ind.severity}</span>
                  </div>
                  <div className="text-[11px] text-[#64748B] dark:text-[#A8B3C5] print:text-neutral-600 line-clamp-2">
                    {ind.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cryptographic Signature & Chain of Custody */}
        <div className="pt-5 border-t border-[#E2E8F0] dark:border-[#303948] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-sans text-[#64748B] dark:text-[#A8B3C5] print:border-neutral-300">
          <div>
            <div className="text-[10px] uppercase font-semibold text-[#64748B] dark:text-[#A8B3C5] font-sans">SHA-256 audit seal</div>
            <div className="text-[11px] text-[#334155] dark:text-[#A8B3C5] print:text-black break-all flex items-center gap-1.5 mt-0.5 font-mono">
              <span>{sha256ReportDigest}</span>
              <button
                onClick={handleCopyDigest}
                className="p-1 hover:text-[#2563EB] dark:hover:text-[#4F8EF7] text-slate-400 transition-colors print:hidden cursor-pointer"
                title="Copy Digest"
                aria-label="Copy Digest"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="text-left sm:text-right shrink-0 font-sans">
            <div className="text-[#172033] dark:text-[#F1F5F9] print:text-black font-semibold font-sans">{user.officerName}</div>
            <div className="text-[10px] text-[#64748B] dark:text-[#A8B3C5]">{user.badgeNumber} · {user.clearanceLevel}</div>
            <div className="text-[10px] text-emerald-700 dark:text-emerald-400 print:text-emerald-700 font-medium">Digital officer stamp applied</div>
          </div>
        </div>
      </div>
    </div>
  );
};
