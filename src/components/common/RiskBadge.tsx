import React from 'react';
import { RiskLevel } from '../../types';

interface RiskBadgeProps {
  level: RiskLevel | string;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, size = 'sm', showDot = true }) => {
  let style = 'bg-[#F0FDF4] dark:bg-[#14532D]/25 text-[#16A34A] dark:text-[#86EFAC] border-[#BBF7D0] dark:border-[#15803D]/40';
  let dotColor = 'bg-[#16A34A] dark:bg-[#4ADE80]';

  if (level === 'Critical' || level === 'High') {
    style = 'bg-[#FEF2F2] dark:bg-[#7F1D1D]/25 text-[#DC2626] dark:text-[#FCA5A5] border-[#FECACA] dark:border-[#991B1B]/40';
    dotColor = 'bg-[#DC2626] dark:bg-[#F87171]';
  } else if (level === 'Review Required') {
    style = 'bg-[#FFF7ED] dark:bg-[#7C2D12]/25 text-[#EA580C] dark:text-[#FDBA74] border-[#FED7AA] dark:border-[#9A3412]/40';
    dotColor = 'bg-[#EA580C] dark:bg-[#FB923C]';
  } else if (level === 'Medium' || level === 'Under Review') {
    style = 'bg-[#FFFBEB] dark:bg-[#78350F]/25 text-[#D97706] dark:text-[#FCD34D] border-[#FDE68A] dark:border-[#B45309]/40';
    dotColor = 'bg-[#D97706] dark:bg-[#FBBF24]';
  } else if (level === 'Low') {
    style = 'bg-[#F0FDF4] dark:bg-[#14532D]/25 text-[#16A34A] dark:text-[#86EFAC] border-[#BBF7D0] dark:border-[#15803D]/40';
    dotColor = 'bg-[#16A34A] dark:bg-[#4ADE80]';
  }

  const sizeClasses = 
    size === 'lg' ? 'px-3 py-1 text-xs' :
    size === 'md' ? 'px-2.5 py-0.5 text-xs' : 
    'px-2 py-0.5 text-[11px]';

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium border rounded font-sans ${style} ${sizeClasses}`}>
      {showDot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />}
      <span className="whitespace-nowrap">{level}</span>
    </span>
  );
};
