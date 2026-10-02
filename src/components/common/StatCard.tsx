import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon: LucideIcon;
  badgeText?: string;
  badgeType?: 'danger' | 'warning' | 'info' | 'success';
  onClick?: () => void;
  highlight?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtext,
  icon: Icon,
  badgeText,
  badgeType = 'info',
  onClick,
  highlight = false
}) => {
  const badgeStyles = {
    danger: 'bg-[#FEF2F2] dark:bg-[#7F1D1D]/25 text-[#DC2626] dark:text-[#FCA5A5] border-[#FECACA] dark:border-[#991B1B]/40',
    warning: 'bg-[#FFFBEB] dark:bg-[#78350F]/25 text-[#D97706] dark:text-[#FCD34D] border-[#FDE68A] dark:border-[#B45309]/40',
    info: 'bg-[#EFF6FF] dark:bg-[#1E3A8A]/25 text-[#2563EB] dark:text-[#93C5FD] border-[#BFDBFE] dark:border-[#1D4ED8]/40',
    success: 'bg-[#F0FDF4] dark:bg-[#14532D]/25 text-[#16A34A] dark:text-[#86EFAC] border-[#BBF7D0] dark:border-[#15803D]/40'
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-[#1B212C] border rounded-lg p-3.5 sm:p-4 transition-colors flex flex-col justify-between ${
        highlight
          ? 'border-blue-200 dark:border-blue-900/60 bg-blue-50/20 dark:bg-blue-950/20'
          : 'border-[#E2E8F0] dark:border-[#303948] hover:border-slate-300 dark:hover:border-[#475569]'
      } ${onClick ? 'cursor-pointer group' : ''}`}
    >
      <div>
        <div className="flex items-center justify-between gap-1.5 mb-2">
          <span className="text-xs font-medium text-[#64748B] dark:text-[#A8B3C5] truncate">
            {title}
          </span>
          <Icon className="w-4 h-4 text-[#94A3B8] dark:text-[#7F8DA3] shrink-0 group-hover:text-[#2563EB] dark:group-hover:text-[#4F8EF7] transition-colors" />
        </div>

        <div className="text-2xl font-bold tracking-tight text-[#172033] dark:text-[#F1F5F9] font-sans">
          {value}
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-[#F1F5F9] dark:border-[#303948] flex items-center justify-between gap-2 text-xs">
        {subtext && (
          <span className="text-[11px] text-[#94A3B8] dark:text-[#7F8DA3] truncate">
            {subtext}
          </span>
        )}
        {badgeText && (
          <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium border shrink-0 ${badgeStyles[badgeType]}`}>
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
};
