import React from 'react';
import { Blockchain } from '../../types';

interface NetworkBadgeProps {
  network: Blockchain | string;
  size?: 'sm' | 'md';
}

export const NetworkBadge: React.FC<NetworkBadgeProps> = ({ network, size = 'sm' }) => {
  let badgeStyle = 'bg-[#F1F5F9] dark:bg-[#202734] text-[#475569] dark:text-[#A8B3C5] border-[#E2E8F0] dark:border-[#303948]';

  switch (network) {
    case 'Ethereum':
      badgeStyle = 'bg-[#EFF6FF] dark:bg-[#1E3A8A]/25 text-[#2563EB] dark:text-[#93C5FD] border-[#BFDBFE] dark:border-[#1D4ED8]/40';
      break;
    case 'Bitcoin':
      badgeStyle = 'bg-[#FFFBEB] dark:bg-[#78350F]/25 text-[#B45309] dark:text-[#FCD34D] border-[#FDE68A] dark:border-[#B45309]/40';
      break;
    case 'Tron':
      badgeStyle = 'bg-[#FEF2F2] dark:bg-[#7F1D1D]/25 text-[#B91C1C] dark:text-[#FCA5A5] border-[#FECACA] dark:border-[#991B1B]/40';
      break;
    case 'BNB Chain':
      badgeStyle = 'bg-[#FEF9C3] dark:bg-[#713F12]/25 text-[#A16207] dark:text-[#FDE047] border-[#FEF08A] dark:border-[#A16207]/40';
      break;
    case 'Solana':
      badgeStyle = 'bg-[#ECFDF5] dark:bg-[#14532D]/25 text-[#047857] dark:text-[#86EFAC] border-[#A7F3D0] dark:border-[#15803D]/40';
      break;
    case 'Polygon':
      badgeStyle = 'bg-[#FAF5FF] dark:bg-[#581C87]/25 text-[#6D28D9] dark:text-[#D8B4FE] border-[#E9D5FF] dark:border-[#7E22CE]/40';
      break;
  }

  const padding = size === 'md' ? 'px-2.5 py-1 text-xs' : 'px-2 py-0.5 text-[10px]';

  return (
    <span className={`inline-flex items-center gap-1.5 font-sans font-medium rounded border ${badgeStyle} ${padding}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 shrink-0" />
      <span className="whitespace-nowrap">{network}</span>
    </span>
  );
};
