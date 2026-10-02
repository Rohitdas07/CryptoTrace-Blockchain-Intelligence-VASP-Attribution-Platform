import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Info, 
  FileEdit, 
  Save, 
  Layers, 
  Zap, 
  UserX, 
  ArrowLeftRight, 
  GitPullRequest, 
  Coins 
} from 'lucide-react';
import { RiskAnalysisData, RiskLevel, RiskIndicator } from '../../types';

interface RiskAnalysisViewProps {
  riskData: RiskAnalysisData;
  onSaveNotes?: (notes: string) => void;
}

export const RiskAnalysisView: React.FC<RiskAnalysisViewProps> = ({
  riskData,
  onSaveNotes
}) => {
  const [investigatorNotes, setInvestigatorNotes] = useState(riskData.analystNotes);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveNotes = () => {
    if (onSaveNotes) {
      onSaveNotes(investigatorNotes);
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const getSeverityStyle = (severity: RiskLevel) => {
    switch (severity) {
      case 'Critical':
      case 'High':
        return 'text-rose-700 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-950/40 dark:border-rose-900/60 font-sans font-semibold';
      case 'Review Required':
      case 'Medium':
        return 'text-amber-800 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/40 dark:border-amber-900/60 font-sans font-semibold';
      case 'Low':
      default:
        return 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/40 dark:border-emerald-900/60 font-sans font-medium';
    }
  };

  const getIndicatorIcon = (category: RiskIndicator['ruleCategory'] | string) => {
    switch (category) {
      case 'Layering':
      case 'Rapid Movement':
        return <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'Velocity':
        return <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'Sanction/HighRisk':
      case 'Darknet':
      case 'Fraud':
      case 'Ransomware':
        return <UserX className="w-4 h-4 text-rose-600 dark:text-rose-400" />;
      case 'Cross-Chain':
        return <ArrowLeftRight className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case 'Mixer':
      case 'Obfuscation':
        return <GitPullRequest className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      default:
        return <Coins className="w-4 h-4 text-slate-500 dark:text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner: Overall Risk */}
      <div className="bg-amber-50/60 border border-amber-200 dark:bg-[#1B212C] dark:border-[#303948] rounded-lg p-5 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-[#FCD34D] flex items-center gap-1.5 font-sans">
              <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-[#FCD34D]" />
              <span>Forensic Risk Assessment</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-[#F1F5F9] tracking-tight flex items-center gap-3 font-sans">
              <span>Overall Risk: <span className="text-amber-700 dark:text-[#FCD34D]">{riskData.overallRisk.toUpperCase()}</span></span>
            </div>
            <p className="text-xs text-slate-700 dark:text-[#A8B3C5] max-w-2xl leading-relaxed font-sans">
              Algorithmic behavioral heuristics detected compounding high-risk signals including rapid automated fund dissipation and interaction with flagged upstream clusters.
            </p>
          </div>

          {/* Forensic Risk Gauge */}
          <div className="bg-white dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] px-4 py-3 rounded-lg flex items-center gap-4 shrink-0 shadow-xs">
            <div className="text-center font-sans">
              <div className="text-2xl font-bold text-amber-700 dark:text-[#FCD34D] font-sans">
                {riskData.riskScore}<span className="text-xs text-slate-400 dark:text-[#7F8DA3]">/100</span>
              </div>
              <div className="text-[10px] uppercase font-medium text-[#64748B] dark:text-[#7F8DA3] font-sans">
                Heuristic Index
              </div>
            </div>

            <div className="w-px h-9 bg-slate-200 dark:bg-[#303948]" />
            <div className="text-xs text-left font-sans">
              <div className="font-semibold text-[#172033] dark:text-[#F1F5F9]">
                {riskData.indicators.length} Active Triggers
              </div>
              <div className="text-[11px] text-amber-700 dark:text-[#FCD34D] font-medium font-sans">
                Mandatory Officer Review
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Notice */}
        <div className="mt-5 pt-4 border-t border-amber-200/80 dark:border-[#303948] flex items-start gap-2.5 text-xs text-amber-900 dark:text-[#FCD34D] bg-amber-100/60 dark:bg-[#202734] p-3 rounded-lg border border-amber-300 dark:border-[#303948]">
          <Info className="w-4 h-4 text-amber-700 dark:text-[#FCD34D] shrink-0 mt-0.5" />
          <span className="leading-relaxed font-sans">
            <strong className="font-semibold text-amber-950 dark:text-[#FCD34D]">Disclaimer:</strong> {riskData.disclaimer}
          </span>
        </div>
      </div>

      {/* Detected Risk Indicators Matrix */}
      <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-5 shadow-xs font-sans">
        <div className="pb-4 border-b border-[#E2E8F0] dark:border-[#303948] flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-[#172033] dark:text-[#F1F5F9] tracking-tight font-sans">
              Observed Forensic Risk Indicators
            </h3>
            <p className="text-[11px] text-[#64748B] dark:text-[#A8B3C5] mt-0.5 font-sans">
              Breakdown of individual heuristic flags triggered during ledger traversal
            </p>
          </div>
          <span className="text-[11px] text-[#64748B] dark:text-[#7F8DA3] font-sans">
            {riskData.indicators.length} rules matched
          </span>
        </div>

        <div className="divide-y divide-[#E2E8F0] dark:divide-[#303948] font-sans">
          {riskData.indicators.map((indicator) => (
            <div key={indicator.id} className="py-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3 hover:bg-slate-50 dark:hover:bg-[#252D3A] px-2 rounded-lg transition-colors">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-slate-100 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] shrink-0 mt-0.5">
                  {getIndicatorIcon(indicator.ruleCategory)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">
                      {indicator.name}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${getSeverityStyle(indicator.severity)}`}>
                      {indicator.severity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-[#A8B3C5] mt-1 leading-relaxed font-sans">
                    {indicator.description}
                  </p>
                  <div className="text-[11px] text-blue-600 dark:text-[#4F8EF7] font-sans mt-1">
                    Telemetry: <span className="font-mono">{indicator.detectedDetail}</span>
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 dark:text-[#7F8DA3] font-mono shrink-0">
                Rule ID: {indicator.id}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Investigator Notes & Case Hypothesis */}
      <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-5 shadow-xs font-sans">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FileEdit className="w-4 h-4 text-blue-600 dark:text-[#4F8EF7]" />
            <h3 className="text-sm font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">
              Investigator Analytical Notes & Case Hypothesis
            </h3>
          </div>
          {isSaved && (
            <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium font-sans">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Notes Recorded to Chain Audit</span>
            </div>
          )}
        </div>

        <p className="text-xs text-[#64748B] dark:text-[#A8B3C5] mb-3 leading-relaxed font-sans">
          Record observations regarding modus operandi, victim nexus, and preliminary VASP subpoena justifications for case supervisor review.
        </p>

        <textarea
          rows={4}
          value={investigatorNotes}
          onChange={(e) => setInvestigatorNotes(e.target.value)}
          placeholder="Enter investigator observations, counter-party context, and evidentiary nexus..."
          className="w-full p-3 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] focus:border-blue-500 dark:focus:border-[#4F8EF7] rounded-md text-xs text-[#172033] dark:text-[#F1F5F9] placeholder:text-slate-400 dark:placeholder:text-[#7F8DA3] font-sans focus:outline-hidden leading-relaxed"
        />

        <div className="mt-3 flex justify-end">
          <button
            onClick={handleSaveNotes}
            className="px-3.5 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs font-sans"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Update Investigation Log</span>
          </button>
        </div>
      </div>
    </div>
  );
};
