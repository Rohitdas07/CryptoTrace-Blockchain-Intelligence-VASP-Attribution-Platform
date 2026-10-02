import React from 'react';

interface ConfidenceMeterProps {
  score: number; // 0 - 100
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({
  score,
  size = 'md',
  showLabel = true
}) => {
  const radius = size === 'lg' ? 36 : size === 'md' ? 28 : 20;
  const strokeWidth = size === 'lg' ? 6 : size === 'md' ? 5 : 4;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const dimension = (radius + strokeWidth) * 2;

  let colorClass = 'text-blue-600 dark:text-blue-400';
  if (score >= 90) colorClass = 'text-emerald-600 dark:text-emerald-400';
  else if (score >= 75) colorClass = 'text-blue-600 dark:text-blue-400';
  else if (score >= 50) colorClass = 'text-amber-600 dark:text-amber-400';
  else colorClass = 'text-rose-600 dark:text-rose-400';

  return (
    <div className="inline-flex items-center gap-3">
      <div className="relative flex items-center justify-center shrink-0" style={{ width: dimension, height: dimension }}>
        <svg className="transform -rotate-90" width={dimension} height={dimension}>
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-slate-200 dark:text-[#303948]"
          />
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${colorClass} transition-all duration-700 ease-out`}
          />
        </svg>
        <span className="absolute font-sans font-bold text-slate-900 dark:text-[#F1F5F9] text-xs sm:text-sm">
          {score}%
        </span>
      </div>

      {showLabel && (
        <div className="text-left">
          <div className="text-xs font-semibold text-slate-800 dark:text-[#F1F5F9]">
            {score >= 90 ? 'High Confidence Match' : score >= 75 ? 'Probable Attribution' : 'Moderate Heuristic'}
          </div>
          <div className="text-[10px] text-slate-500 dark:text-[#A8B3C5] font-sans">
            Deterministic Cluster
          </div>
        </div>
      )}
    </div>
  );
};
