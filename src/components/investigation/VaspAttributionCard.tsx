import React, { useState } from 'react';
import { Building2, AlertTriangle, ArrowRight, Check, Copy, Network } from 'lucide-react';
import { NearestVaspAttribution } from '../../types';

interface VaspAttributionCardProps {
  attribution: NearestVaspAttribution;
  onPrepareLawfulRequest?: () => void;
}

export const VaspAttributionCard: React.FC<VaspAttributionCardProps> = ({
  attribution,
  onPrepareLawfulRequest
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(attribution.depositAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (attribution.confidenceScore / 100) * circumference;

  return (
    <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-4 sm:p-5 shadow-xs font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-[#E2E8F0] dark:border-[#303948]">
        <div>
          <div className="text-xs font-semibold text-blue-600 dark:text-[#4F8EF7] mb-1 flex items-center gap-1.5 font-sans">
            <Building2 className="w-3.5 h-3.5" />
            <span>Nearest Identified VASP</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[#172033] dark:text-[#F1F5F9] tracking-tight font-sans">
            {attribution.entityName}
          </h2>
          <div className="text-xs text-[#64748B] dark:text-[#A8B3C5] mt-0.5 flex flex-wrap items-center gap-2 font-sans">
            <span>{attribution.entityType}</span>
            <span className="text-slate-300 dark:text-[#303948]">·</span>
            <span>{attribution.addressType}</span>
            <span className="text-slate-300 dark:text-[#303948]">·</span>
            <span>{attribution.jurisdictionEstimate || attribution.countryRegion}</span>
          </div>
        </div>

        {/* Circular Confidence Indicator */}
        <div className="flex items-center gap-3 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] px-3.5 py-2 rounded-lg shrink-0">
          <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
            <svg className="w-12 h-12 transform -rotate-90">
              <circle
                cx="24"
                cy="24"
                r={radius}
                stroke="currentColor"
                strokeWidth="3.5"
                fill="transparent"
                className="text-slate-200 dark:text-[#303948]"
              />
              <circle
                cx="24"
                cy="24"
                r={radius}
                stroke="#2563eb"
                strokeWidth="3.5"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-[#172033] dark:text-[#F1F5F9] leading-none font-sans">
                {attribution.confidenceScore}%
              </span>
            </div>
          </div>

          <div className="text-left font-sans">
            <div className="text-xs font-semibold text-[#172033] dark:text-[#F1F5F9]">
              Attribution Match
            </div>
            <div className="text-[11px] text-[#64748B] dark:text-[#A8B3C5]">
              Method: {attribution.detectionMethod || 'Sweep Clustering'}
            </div>
            <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">
              High Probabilistic Confidence
            </div>
          </div>
        </div>
      </div>

      {/* Attribution Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-3 font-sans">
        <div className="p-3 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded">
          <div className="text-xs text-[#64748B] dark:text-[#A8B3C5] mb-1">Connection Type</div>
          <div className="text-xs font-semibold text-slate-800 dark:text-[#F1F5F9] flex items-center gap-1.5 font-sans">
            <Network className="w-3.5 h-3.5 text-blue-600 dark:text-[#4F8EF7]" />
            <span>{attribution.connectionType}</span>
          </div>
          <div className="text-[11px] text-[#64748B] dark:text-[#7F8DA3] mt-1 font-sans">
            Topological Distance: <strong className="text-slate-800 dark:text-[#F1F5F9]">{attribution.hopsCount} hops</strong> from source
          </div>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded">
          <div className="text-xs text-[#64748B] dark:text-[#A8B3C5] mb-1">Identified Deposit Address</div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono font-medium text-slate-800 dark:text-[#F1F5F9] truncate">
              {attribution.depositAddress}
            </span>
            <button
              onClick={handleCopy}
              className="p-1 text-slate-400 hover:text-blue-600 dark:text-[#7F8DA3] dark:hover:text-[#4F8EF7] transition-colors shrink-0 cursor-pointer"
              title="Copy deposit address"
              aria-label="Copy deposit address"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <div className="text-[11px] text-[#64748B] dark:text-[#7F8DA3] mt-1 font-sans">
            Volume swept to VASP: <strong className="text-blue-600 dark:text-[#4F8EF7]">{attribution.totalTransferredToVasp}</strong>
          </div>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded">
          <div className="text-xs text-[#64748B] dark:text-[#A8B3C5] mb-1">Observation Window</div>
          <div className="text-xs text-slate-800 dark:text-[#F1F5F9] truncate font-sans font-medium">
            {attribution.firstObservedDeposit || 'First: 2026-02-14'}
          </div>
          <div className="text-[11px] text-[#64748B] dark:text-[#7F8DA3] mt-1 font-sans">
            Network: <strong className="text-slate-800 dark:text-[#F1F5F9]">{attribution.blockchain} Mainnet</strong>
          </div>
        </div>
      </div>

      {/* Mandatory Statutory Attribution Notice */}
      <div className="p-3 bg-amber-50 text-amber-900 border border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/40 dark:text-amber-200/90 rounded flex items-start gap-2.5 mb-3 font-sans">
        <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed font-sans">
          <strong className="font-semibold block mb-0.5 text-amber-950 dark:text-amber-300">
            Analytical attribution — investigator verification required
          </strong>
          {attribution.attributionDisclaimer}
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-[#E2E8F0] dark:border-[#303948] font-sans">
        <div className="text-[11px] text-[#64748B] dark:text-[#7F8DA3] font-sans">
          Entity profile indexed in LEA VASP database. Compliance requisition ready for dispatch.
        </div>
        {onPrepareLawfulRequest && (
          <button
            onClick={onPrepareLawfulRequest}
            className="px-3.5 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0 font-sans"
          >
            <span>Prepare SAHYOG Request</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
