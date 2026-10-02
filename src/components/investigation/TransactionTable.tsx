import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check, 
  Download,
  X
} from 'lucide-react';
import { TransactionRecord, RiskLevel } from '../../types';

interface TransactionTableProps {
  transactions: TransactionRecord[];
  onInvestigateAddress?: (address: string) => void;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  onInvestigateAddress
}) => {
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sortField, setSortField] = useState<'dateTime' | 'amount'>('dateTime');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTx, setSelectedTx] = useState<any | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const pageSize = 5;

  const handleCopy = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const getRiskBadge = (risk: RiskLevel | string) => {
    switch (risk) {
      case 'Critical':
      case 'High':
        return 'text-rose-700 bg-rose-50 border border-rose-200 dark:text-rose-400 dark:bg-rose-950/60 dark:border-rose-800/60 px-2 py-0.5 rounded text-[10px] font-semibold';
      case 'Medium':
      case 'Review Required':
        return 'text-amber-800 bg-amber-50 border border-amber-200 dark:text-amber-400 dark:bg-amber-950/60 dark:border-amber-800/60 px-2 py-0.5 rounded text-[10px] font-semibold';
      case 'Low':
      default:
        return 'text-emerald-700 bg-emerald-50 border border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/60 dark:border-emerald-800/60 px-2 py-0.5 rounded text-[10px] font-semibold';
    }
  };

  const filtered = useMemo(() => {
    return transactions.filter(tx => {
      const entityStr = (tx as any).entity || tx.entityType || '';
      const matchSearch = !search.trim() || 
        tx.txHash.toLowerCase().includes(search.toLowerCase()) ||
        tx.from.toLowerCase().includes(search.toLowerCase()) ||
        tx.to.toLowerCase().includes(search.toLowerCase()) ||
        entityStr.toLowerCase().includes(search.toLowerCase());

      const matchRisk = riskFilter === 'All' || tx.risk === riskFilter;
      const matchStatus = statusFilter === 'All' || tx.status === statusFilter;

      return matchSearch && matchRisk && matchStatus;
    }).sort((a, b) => {
      const timeStrA = (a as any).dateTime || a.timestamp;
      const timeStrB = (b as any).dateTime || b.timestamp;
      if (sortField === 'dateTime') {
        const timeA = new Date(timeStrA).getTime();
        const timeB = new Date(timeStrB).getTime();
        return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
      } else {
        const valA = parseFloat(a.amount);
        const valB = parseFloat(b.amount);
        return sortOrder === 'desc' ? valB - valA : valA - valB;
      }
    });
  }, [transactions, search, riskFilter, statusFilter, sortField, sortOrder]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginatedData = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const toggleSort = (field: 'dateTime' | 'amount') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const exportCSV = () => {
    const headers = ['TxHash', 'From', 'To', 'Amount', 'Token', 'DateTime', 'Status', 'Entity', 'Risk'];
    const rows = filtered.map(t => [
      t.txHash,
      t.from,
      t.to,
      t.amount,
      (t as any).token || t.asset || 'CRYPTO',
      (t as any).dateTime || t.timestamp,
      t.status,
      `"${(t as any).entity || t.entityType || ''}"`,
      t.risk
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `cryptotrace_transactions_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg overflow-hidden shadow-xs font-sans">
      {/* Header & Controls */}
      <div className="p-4 border-b border-[#E2E8F0] dark:border-[#303948] bg-slate-50/75 dark:bg-[#1D2430] flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-[#172033] dark:text-[#F1F5F9] tracking-tight font-sans">
            Transaction Ledger & Lineage Trace
          </h3>
          <p className="text-[11px] text-[#64748B] dark:text-[#A8B3C5] mt-0.5 font-sans">
            Showing {filtered.length} public transactions related to target cluster
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 dark:text-[#7F8DA3] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search hash or address..."
              className="pl-8 pr-3 py-1.5 bg-white dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] focus:border-blue-500 dark:focus:border-[#4F8EF7] rounded-md text-xs text-[#172033] dark:text-[#F1F5F9] placeholder:text-slate-400 dark:placeholder:text-[#7F8DA3] focus:outline-hidden w-44 sm:w-56 font-mono"
            />
          </div>

          {/* Risk Filter */}
          <select
            value={riskFilter}
            onChange={(e) => {
              setRiskFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-2.5 py-1.5 bg-white dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md text-xs text-slate-700 dark:text-[#A8B3C5] focus:outline-hidden cursor-pointer"
          >
            <option value="All" className="bg-white dark:bg-[#1B212C] text-[#172033] dark:text-[#F1F5F9]">All Risks</option>
            <option value="Critical" className="bg-white dark:bg-[#1B212C] text-[#172033] dark:text-[#F1F5F9]">Critical</option>
            <option value="High" className="bg-white dark:bg-[#1B212C] text-[#172033] dark:text-[#F1F5F9]">High</option>
            <option value="Medium" className="bg-white dark:bg-[#1B212C] text-[#172033] dark:text-[#F1F5F9]">Medium</option>
            <option value="Low" className="bg-white dark:bg-[#1B212C] text-[#172033] dark:text-[#F1F5F9]">Low</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-2.5 py-1.5 bg-white dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md text-xs text-slate-700 dark:text-[#A8B3C5] focus:outline-hidden cursor-pointer"
          >
            <option value="All" className="bg-white dark:bg-[#1B212C] text-[#172033] dark:text-[#F1F5F9]">All Statuses</option>
            <option value="Confirmed" className="bg-white dark:bg-[#1B212C] text-[#172033] dark:text-[#F1F5F9]">Confirmed</option>
            <option value="Flagged" className="bg-white dark:bg-[#1B212C] text-[#172033] dark:text-[#F1F5F9]">Flagged</option>
          </select>

          {/* CSV Export */}
          <button
            onClick={exportCSV}
            className="px-2.5 py-1.5 bg-white hover:bg-slate-50 dark:bg-[#202734] dark:hover:bg-[#252D3A] border border-[#E2E8F0] dark:border-[#303948] text-slate-700 dark:text-[#E2E8F0] rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Export CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Table container with horizontal scrolling */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#E2E8F0] dark:border-[#303948] bg-slate-50/70 dark:bg-[#1D2430] text-[#64748B] dark:text-[#A8B3C5] uppercase tracking-wider text-[10px] font-medium font-sans">
              <th className="py-2.5 px-4">Transaction Hash</th>
              <th className="py-2.5 px-4">From</th>
              <th className="py-2.5 px-4">To</th>
              <th 
                onClick={() => toggleSort('amount')}
                className="py-2.5 px-4 cursor-pointer hover:text-slate-800 dark:hover:text-[#F1F5F9] transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Amount</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th 
                onClick={() => toggleSort('dateTime')}
                className="py-2.5 px-4 cursor-pointer hover:text-slate-800 dark:hover:text-[#F1F5F9] transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Timestamp</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-2.5 px-4">Entity</th>
              <th className="py-2.5 px-4">Status</th>
              <th className="py-2.5 px-4">Risk Evaluation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-[#303948] font-sans">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-[#64748B] dark:text-[#7F8DA3] text-xs">
                  No transactions match the specified filter criteria.
                </td>
              </tr>
            ) : (
              paginatedData.map((tx) => {
                const entityName = (tx as any).entity || tx.entityType || 'Unidentified Wallet';
                const timeValue = (tx as any).dateTime || tx.timestamp;

                return (
                  <tr
                    key={tx.id}
                    onClick={() => setSelectedTx(tx)}
                    className="bg-white dark:bg-[#1B212C] hover:bg-slate-50 dark:hover:bg-[#252D3A] transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-4 text-blue-600 dark:text-[#4F8EF7] truncate max-w-[130px] font-mono font-medium">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate">{tx.txHash.slice(0, 10)}...</span>
                        <button
                          onClick={(e) => handleCopy(tx.txHash, e)}
                          className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-400 hover:text-slate-700 dark:text-[#7F8DA3] dark:hover:text-white transition-opacity cursor-pointer"
                          title="Copy TxHash"
                          aria-label="Copy TxHash"
                        >
                          {copiedText === tx.txHash ? <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-slate-700 dark:text-[#A8B3C5] font-mono truncate max-w-[120px]">
                      <div className="flex items-center gap-1">
                        <span>{tx.from.slice(0, 6)}...{tx.from.slice(-4)}</span>
                        <button
                          onClick={(e) => handleCopy(tx.from, e)}
                          className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-400 hover:text-slate-700 dark:text-[#7F8DA3] dark:hover:text-white transition-opacity cursor-pointer"
                          title="Copy From Address"
                          aria-label="Copy From Address"
                        >
                          {copiedText === tx.from ? <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-slate-700 dark:text-[#A8B3C5] font-mono truncate max-w-[120px]">
                      <div className="flex items-center gap-1">
                        <span>{tx.to.slice(0, 6)}...{tx.to.slice(-4)}</span>
                        <button
                          onClick={(e) => handleCopy(tx.to, e)}
                          className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-400 hover:text-slate-700 dark:text-[#7F8DA3] dark:hover:text-white transition-opacity cursor-pointer"
                          title="Copy To Address"
                          aria-label="Copy To Address"
                        >
                          {copiedText === tx.to ? <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </td>

                    <td className="py-2.5 px-4 font-semibold text-[#172033] dark:text-[#F1F5F9] tabular-nums whitespace-nowrap font-sans">
                      {tx.amount}
                    </td>

                    <td className="py-2.5 px-4 text-[#64748B] dark:text-[#7F8DA3] text-xs whitespace-nowrap font-sans">
                      {timeValue}
                    </td>

                    <td className="py-2.5 px-4 text-slate-700 dark:text-[#A8B3C5] text-xs truncate max-w-[140px] font-sans">
                      {entityName}
                    </td>

                    <td className="py-2.5 px-4">
                      <span className={`text-xs font-medium font-sans ${
                        tx.status === 'Confirmed' ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'
                      }`}>
                        {tx.status}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className={getRiskBadge(tx.risk)}>
                        {tx.risk}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-3 border-t border-[#E2E8F0] dark:border-[#303948] bg-slate-50 dark:bg-[#1D2430] flex items-center justify-between text-xs text-[#64748B] dark:text-[#A8B3C5] font-sans">
        <div>
          Showing page <span className="font-semibold text-slate-800 dark:text-[#F1F5F9]">{currentPage}</span> of{' '}
          <span className="font-semibold text-slate-800 dark:text-[#F1F5F9]">{totalPages}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-md border border-[#E2E8F0] dark:border-[#303948] bg-white dark:bg-[#202734] text-slate-700 dark:text-[#E2E8F0] hover:bg-slate-100 dark:hover:bg-[#252D3A] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-md border border-[#E2E8F0] dark:border-[#303948] bg-white dark:bg-[#202734] text-slate-700 dark:text-[#E2E8F0] hover:bg-slate-100 dark:hover:bg-[#252D3A] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Transaction Inspection Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-xs font-sans">
          <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg max-w-lg w-full p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-[#303948]">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">Transaction Forensic Dossier</h4>
              </div>
              <button
                onClick={() => setSelectedTx(null)}
                className="text-slate-400 hover:text-slate-700 dark:text-[#7F8DA3] dark:hover:text-[#F1F5F9] p-1 rounded hover:bg-slate-100 dark:hover:bg-[#202734] cursor-pointer"
                aria-label="Close transaction details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-sans">
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#64748B] dark:text-[#A8B3C5] block mb-1">
                  Transaction Hash
                </span>
                <div className="p-2.5 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded text-[11px] font-mono text-blue-600 dark:text-[#4F8EF7] break-all select-all">
                  {selectedTx.txHash}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded">
                  <span className="text-[10px] text-[#64748B] dark:text-[#7F8DA3] block">From Address</span>
                  <span className="text-[#172033] dark:text-[#F1F5F9] font-mono text-[11px] break-all block mt-1">
                    {selectedTx.from}
                  </span>
                  {onInvestigateAddress && (
                    <button
                      onClick={() => {
                        onInvestigateAddress(selectedTx.from);
                        setSelectedTx(null);
                      }}
                      className="text-[10px] text-blue-600 dark:text-[#4F8EF7] hover:underline mt-1.5 block cursor-pointer font-medium"
                    >
                      Investigate Origin →
                    </button>
                  )}
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded">
                  <span className="text-[10px] text-[#64748B] dark:text-[#7F8DA3] block">To Address</span>
                  <span className="text-[#172033] dark:text-[#F1F5F9] font-mono text-[11px] break-all block mt-1">
                    {selectedTx.to}
                  </span>
                  {onInvestigateAddress && (
                    <button
                      onClick={() => {
                        onInvestigateAddress(selectedTx.to);
                        setSelectedTx(null);
                      }}
                      className="text-[10px] text-blue-600 dark:text-[#4F8EF7] hover:underline mt-1.5 block cursor-pointer font-medium"
                    >
                      Investigate Destination →
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded">
                  <span className="text-[10px] text-[#64748B] dark:text-[#7F8DA3]">Transferred</span>
                  <div className="font-semibold text-[#172033] dark:text-[#F1F5F9] text-xs mt-0.5">{selectedTx.amount}</div>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded">
                  <span className="text-[10px] text-[#64748B] dark:text-[#7F8DA3]">Gas Fee</span>
                  <div className="text-slate-700 dark:text-[#A8B3C5] text-xs mt-0.5">{selectedTx.fee || '0.0021 ETH'}</div>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded">
                  <span className="text-[10px] text-[#64748B] dark:text-[#7F8DA3]">Block Height</span>
                  <div className="font-mono text-slate-700 dark:text-[#A8B3C5] text-xs mt-0.5">#{selectedTx.blockNumber || 1928374}</div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B] dark:text-[#7F8DA3]">Attributed Entity:</span>
                  <span className="font-semibold text-[#172033] dark:text-[#F1F5F9]">{(selectedTx as any).entity || selectedTx.entityType || 'Unidentified'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B] dark:text-[#7F8DA3]">Risk Assessment:</span>
                  <span className={getRiskBadge(selectedTx.risk)}>{selectedTx.risk}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B] dark:text-[#7F8DA3]">Timestamp:</span>
                  <span className="text-slate-700 dark:text-[#A8B3C5]">{(selectedTx as any).dateTime || selectedTx.timestamp}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedTx(null)}
                className="px-3.5 py-1.5 bg-[#202734] text-[#E2E8F0] hover:bg-[#252D3A] border border-[#303948] rounded text-xs font-medium cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
