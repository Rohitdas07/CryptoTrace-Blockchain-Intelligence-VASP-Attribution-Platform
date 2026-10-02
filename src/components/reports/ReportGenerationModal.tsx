import React, { useState } from 'react';
import { FileText, X, RefreshCw } from 'lucide-react';
import { ReportConfig } from '../../types';

interface ReportGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (config: ReportConfig) => void;
  defaultCaseId?: string;
}

export const ReportGenerationModal: React.FC<ReportGenerationModalProps> = ({
  isOpen,
  onClose,
  onGenerate
}) => {
  const [reportType, setReportType] = useState<ReportConfig['reportType']>(
    'Complete Investigation Report'
  );
  const [includeGraph, setIncludeGraph] = useState(true);
  const [includeVasp, setIncludeVasp] = useState(true);
  const [includeRisk, setIncludeRisk] = useState(true);
  const [includeTxTable, setIncludeTxTable] = useState(true);
  const [includeTimeline, setIncludeTimeline] = useState(true);
  const [notes, setNotes] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCompiling(true);
    setTimeout(() => {
      setIsCompiling(false);
      onGenerate({
        reportType,
        includeGraph,
        includeVasp,
        includeRisk,
        includeTxTable,
        includeTimeline,
        customNotes: notes
      });
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-xs font-sans">
      <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg max-w-lg w-full p-5 shadow-xl space-y-4 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-[#303948]">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#2563EB] dark:text-[#4F8EF7]" />
            <h4 className="text-sm font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">
              Generate forensic intelligence report
            </h4>
          </div>
          <button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#172033] dark:hover:text-[#F1F5F9] p-1 rounded-md hover:bg-[#F1F5F9] dark:hover:bg-[#202734] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-sans">
          {/* Report Type Selector */}
          <div>
            <label className="block text-[#172033] dark:text-[#F1F5F9] font-medium mb-1">
              Select investigation report type
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as any)}
              className="w-full px-3 py-2 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md text-[#172033] dark:text-[#F1F5F9] font-sans text-xs focus:outline-hidden focus:border-[#2563EB] dark:focus:border-[#4F8EF7]"
            >
              <option value="Complete Investigation Report">Complete Investigation Dossier (All Modules)</option>
              <option value="Wallet Analysis Report">Wallet Forensic Telemetry Report</option>
              <option value="VASP Attribution Report">VASP Sweep & Attribution Report</option>
              <option value="Transaction Flow Report">Topological Flow & Intermediary Hop Report</option>
              <option value="Risk Intelligence Report">Risk Heuristic & Compliance Summary</option>
            </select>
          </div>

          {/* Module Inclusions Checkboxes */}
          <div>
            <label className="block text-[#172033] dark:text-[#F1F5F9] font-medium mb-2">
              Evidentiary sections to include
            </label>
            <div className="space-y-2 p-3 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md">
              <label className="flex items-center gap-2.5 text-[#334155] dark:text-[#A8B3C5] cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeGraph}
                  onChange={(e) => setIncludeGraph(e.target.checked)}
                  className="w-3.5 h-3.5 accent-[#2563EB] rounded"
                />
                <span>Include transaction topological graph & flow edges</span>
              </label>

              <label className="flex items-center gap-2.5 text-[#334155] dark:text-[#A8B3C5] cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeVasp}
                  onChange={(e) => setIncludeVasp(e.target.checked)}
                  className="w-3.5 h-3.5 accent-[#2563EB] rounded"
                />
                <span>Include suspected VASP attribution & sweep analytics</span>
              </label>

              <label className="flex items-center gap-2.5 text-[#334155] dark:text-[#A8B3C5] cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeRisk}
                  onChange={(e) => setIncludeRisk(e.target.checked)}
                  className="w-3.5 h-3.5 accent-[#2563EB] rounded"
                />
                <span>Include risk intelligence indicators & severity scoring</span>
              </label>

              <label className="flex items-center gap-2.5 text-[#334155] dark:text-[#A8B3C5] cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeTxTable}
                  onChange={(e) => setIncludeTxTable(e.target.checked)}
                  className="w-3.5 h-3.5 accent-[#2563EB] rounded"
                />
                <span>Include detailed transaction audit ledger</span>
              </label>

              <label className="flex items-center gap-2.5 text-[#334155] dark:text-[#A8B3C5] cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeTimeline}
                  onChange={(e) => setIncludeTimeline(e.target.checked)}
                  className="w-3.5 h-3.5 accent-[#2563EB] rounded"
                />
                <span>Include investigation timeline & forensic chronology</span>
              </label>
            </div>
          </div>

          {/* Investigator Notes */}
          <div>
            <label className="block text-[#172033] dark:text-[#F1F5F9] font-medium mb-1">
              Investigator remarks (optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add docket-specific judicial justifications, victim nexus details, or operational guidance..."
              className="w-full px-3 py-2 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md text-[#172033] dark:text-[#F1F5F9] placeholder:text-[#94A3B8] dark:placeholder:text-[#7F8DA3] focus:outline-hidden focus:border-[#2563EB] dark:focus:border-[#4F8EF7] font-sans"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#E2E8F0] dark:border-[#303948]">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 bg-[#F1F5F9] dark:bg-[#202734] hover:bg-slate-200 dark:hover:bg-[#252D3A] text-[#172033] dark:text-[#F1F5F9] rounded-md font-medium cursor-pointer transition-colors border border-[#E2E8F0] dark:border-[#303948]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCompiling}
              className="px-4 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-md font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              {isCompiling ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Compiling PDF...</span>
                </>
              ) : (
                <>
                  <FileText className="w-3.5 h-3.5" />
                  <span>Generate report</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
