import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface WalletAddressProps {
  address: string;
  truncate?: boolean;
  prefixLength?: number;
  suffixLength?: number;
  onExplore?: (addr: string) => void;
  className?: string;
}

export const WalletAddress: React.FC<WalletAddressProps> = ({
  address,
  truncate = true,
  prefixLength = 6,
  suffixLength = 4,
  onExplore,
  className = ''
}) => {
  const [copied, setCopied] = useState(false);

  const displayAddress = truncate && address.length > prefixLength + suffixLength
    ? `${address.slice(0, prefixLength)}...${address.slice(-suffixLength)}`
    : address;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`inline-flex items-center gap-1.5 font-mono text-xs ${className}`}>
      {onExplore ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onExplore(address);
          }}
          className="text-blue-600 dark:text-[#4F8EF7] hover:text-blue-700 dark:hover:text-[#6EA8FE] hover:underline transition-colors text-left font-medium cursor-pointer"
          title={`Click to analyze ${address}`}
        >
          {displayAddress}
        </button>
      ) : (
        <span className="text-slate-700 dark:text-[#A8B3C5] font-medium" title={address}>
          {displayAddress}
        </span>
      )}

      <button
        onClick={handleCopy}
        className="p-1 text-slate-400 hover:text-slate-700 dark:text-[#7F8DA3] dark:hover:text-[#F1F5F9] hover:bg-slate-100 dark:hover:bg-[#252D3A] rounded transition-colors cursor-pointer"
        title="Copy public address"
        aria-label="Copy public address"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </button>
    </div>
  );
};
