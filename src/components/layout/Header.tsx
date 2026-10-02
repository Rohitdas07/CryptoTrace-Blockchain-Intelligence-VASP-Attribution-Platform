import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Menu, 
  Briefcase, 
  ArrowRight, 
  Shield 
} from 'lucide-react';
import { UserSession, NotificationItem, CaseItem, NavTab } from '../../types';
import { NotificationPanel } from './NotificationPanel';
import { ThemeToggle } from '../common/ThemeToggle';

interface HeaderProps {
  currentTab: NavTab;
  onNavigate: (tab: NavTab) => void;
  user: UserSession;
  notifications: NotificationItem[];
  onMarkAllNotificationsRead: () => void;
  onToggleMobileMenu: () => void;
  onQuickSearchAddress: (address: string) => void;
  activeCases: CaseItem[];
  selectedCaseId: string;
  onSelectCase: (caseId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  user,
  notifications,
  onMarkAllNotificationsRead,
  onToggleMobileMenu,
  onQuickSearchAddress,
  activeCases,
  selectedCaseId,
  onSelectCase
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getTabTitle = (tab: NavTab) => {
    switch (tab) {
      case 'dashboard': return 'Dashboard';
      case 'investigations': return 'Case Management';
      case 'wallet-analysis': return 'Wallet Intelligence';
      case 'explorer': return 'Transaction Explorer';
      case 'vasp-attribution': return 'VASP Attribution';
      case 'risk-intelligence': return 'Risk Scoring';
      case 'cross-chain': return 'Cross-Chain Flows';
      case 'reports': return 'Investigation Dossiers';
      case 'alerts': return 'Security Alerts';
      case 'vasp-directory': return 'VASP Directory';
      case 'settings': return 'System Settings';
    }
  };

  // Categorized global search
  const searchResults = [
    {
      category: 'Cases',
      items: [
        { label: 'CASE-2026-001', meta: 'Operation CipherHydra – Health Ransomware', type: 'case', caseId: 'CASE-2026-001' },
        { label: 'CASE-2026-002', meta: 'GoldenTriangle Pig-Butchering Fraud', type: 'case', caseId: 'CASE-2026-002' },
        { label: 'CASE-2026-003', meta: 'Fintech API Treasury Drain', type: 'case', caseId: 'CASE-2026-003' }
      ]
    },
    {
      category: 'Wallets',
      items: [
        { label: '0x7a3F82C9E4B188e0a300d68b6F3512a868a891F2', meta: 'Ethereum · Suspected Layering Source', type: 'wallet', address: '0x7a3F82C9E4B188e0a300d68b6F3512a868a891F2' },
        { label: 'TYs5Fz39Q5k91nVaXb8kNmPxJ8m4VqW7aZ', meta: 'Tron · USDT Fraud Syndicate', type: 'wallet', address: 'TYs5Fz39Q5k91nVaXb8kNmPxJ8m4VqW7aZ' },
        { label: 'bc1q9x405g02w92lsl5q3d6s0k3a129f9e710291f2', meta: 'Bitcoin · Darknet Peel Chain', type: 'wallet', address: 'bc1q9x405g02w92lsl5q3d6s0k3a129f9e710291f2' }
      ]
    },
    {
      category: 'Transactions',
      items: [
        { label: '0x8a92f041b80c102a941e0029b38192a01f92881a8110291f9e88a10029192003', meta: '142.8 ETH -> Example Exchange Deposit', type: 'tx' },
        { label: '0xab41991c00291920039198127019283019283019283019283019283019283019', meta: '28.00 ETH -> Cross-Chain Polygon Bridge', type: 'tx' }
      ]
    },
    {
      category: 'VASP Entities',
      items: [
        { label: 'Example Exchange (Global)', meta: 'Centralized Exchange · 92% Attribution Confidence', type: 'vasp' },
        { label: 'Example Custodial Wallet Service', meta: 'Custodial Wallet · Singapore / MAS Desk', type: 'vasp' },
        { label: 'Example APAC Digital Asset Broker', meta: 'Broker Desk · Hong Kong SAR', type: 'vasp' }
      ]
    },
    {
      category: 'Reports',
      items: [
        { label: 'REP-2026-881', meta: 'Complete Investigation Dossier – CipherHydra', type: 'report' },
        { label: 'REP-2026-720', meta: 'VASP Attribution & Sweep Analysis', type: 'report' }
      ]
    }
  ];

  const filteredResults = searchResults.map(grp => ({
    ...grp,
    items: grp.items.filter(item => 
      !searchQuery.trim() || 
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meta.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(grp => grp.items.length > 0);

  const handleSelectResult = (item: any) => {
    setSearchOpen(false);
    setSearchQuery('');
    if (item.type === 'wallet') {
      onQuickSearchAddress(item.address);
      onNavigate('wallet-analysis');
    } else if (item.type === 'case') {
      onSelectCase(item.caseId);
      onNavigate('investigations');
    } else if (item.type === 'vasp') {
      onNavigate('vasp-attribution');
    } else if (item.type === 'tx') {
      onNavigate('explorer');
    } else if (item.type === 'report') {
      onNavigate('reports');
    }
  };

  return (
    <header className="sticky top-0 z-30 h-14 bg-white dark:bg-[#171C26] border-b border-[#E2E8F0] dark:border-[#303948] px-4 lg:px-6 flex items-center justify-between gap-3 transition-colors">
      {/* Left: Mobile Toggle + Clean Contextual Breadcrumb */}
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-1.5 text-slate-500 hover:text-slate-900 dark:text-[#A8B3C5] dark:hover:text-[#F1F5F9] rounded-md hover:bg-slate-100 dark:hover:bg-[#252D3A] transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5 text-xs truncate">
          <span className="text-[#94A3B8] dark:text-[#7F8DA3] hidden sm:inline font-medium">CryptoTrace</span>
          <span className="text-slate-300 dark:text-[#303948] hidden sm:inline">/</span>
          <h1 className="text-xs sm:text-sm font-semibold text-[#172033] dark:text-[#F1F5F9] truncate">
            {getTabTitle(currentTab)}
          </h1>
        </div>
      </div>

      {/* Middle: Global Search */}
      <div className="flex-1 max-w-sm relative" ref={searchRef}>
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#94A3B8] dark:text-[#7F8DA3] absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSearchOpen(true);
            }}
            onFocus={() => setSearchOpen(true)}
            placeholder="Search address, tx, case, VASP..."
            className="w-full pl-8 pr-10 py-1.5 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] focus:border-[#2563EB] dark:focus:border-[#4F8EF7] focus:bg-white dark:focus:bg-[#202734] rounded-md text-xs text-[#172033] dark:text-[#F1F5F9] placeholder:text-[#94A3B8] dark:placeholder:text-[#7F8DA3] focus:outline-hidden transition-colors"
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 dark:text-[#7F8DA3] font-mono">
            ⌘K
          </span>
        </div>

        {/* Global Search Results Dropdown */}
        {searchOpen && (
          <div className="absolute left-0 right-0 top-10 bg-white dark:bg-[#1B212C] border border-slate-200 dark:border-[#303948] rounded-lg shadow-xl overflow-hidden z-50 max-h-96 overflow-y-auto">
            <div className="px-3 py-1.5 border-b border-slate-100 dark:border-[#303948] flex items-center justify-between text-[11px] text-slate-500 dark:text-[#A8B3C5] bg-slate-50 dark:bg-[#1D2430]">
              <span className="font-medium">Records</span>
              <span className="font-mono text-[10px]">{filteredResults.reduce((acc, g) => acc + g.items.length, 0)} results</span>
            </div>

            {filteredResults.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-500 dark:text-[#A8B3C5]">
                No matching records found.
              </div>
            ) : (
              <div className="py-1 divide-y divide-slate-100 dark:divide-[#303948]">
                {filteredResults.map((grp) => (
                  <div key={grp.category} className="py-1">
                    <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 dark:text-[#7F8DA3] uppercase tracking-wider">
                      {grp.category}
                    </div>
                    {grp.items.map((item: any, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectResult(item)}
                        className="w-full px-3 py-1.5 text-left hover:bg-slate-50 dark:hover:bg-[#252D3A] transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="text-xs text-slate-800 dark:text-[#F1F5F9] truncate group-hover:text-blue-600 dark:group-hover:text-[#4F8EF7] font-medium">
                            {item.label}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-[#A8B3C5] truncate">
                            {item.meta}
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-[#4F8EF7] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {/* Active Case Selector */}
        <div className="hidden xl:flex items-center gap-1.5 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md px-2.5 py-1">
          <Briefcase className="w-3.5 h-3.5 text-[#94A3B8] dark:text-[#7F8DA3] shrink-0" />
          <span className="text-[11px] text-[#64748B] dark:text-[#A8B3C5]">Case:</span>
          <select
            value={selectedCaseId}
            onChange={(e) => onSelectCase(e.target.value)}
            className="bg-transparent text-xs font-medium text-[#172033] dark:text-[#F1F5F9] focus:outline-hidden cursor-pointer max-w-[150px] truncate"
          >
            {activeCases.map((c) => (
              <option key={c.caseId} value={c.caseId} className="bg-white dark:bg-[#1B212C] text-[#172033] dark:text-[#F1F5F9]">
                {c.caseId} – {c.caseName}
              </option>
            ))}
          </select>
        </div>

        {/* Security Clearance Badge: Professional, quiet, genuine enterprise security marking */}
        <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded border border-[#E2E8F0] dark:border-[#303948] bg-[#F1F5F9] dark:bg-[#202734] text-[#475569] dark:text-[#A8B3C5] text-[10px] font-medium tracking-wide">
          <Shield className="w-3 h-3 text-[#64748B] dark:text-[#7F8DA3]" />
          <span>AUTHORIZED LEA ACCESS ONLY</span>
        </div>

        {/* Theme Selector (Light / Dark / System) */}
        <ThemeToggle variant="compact" />

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-[#A8B3C5] dark:hover:text-[#F1F5F9] rounded-md hover:bg-[#F1F5F9] dark:hover:bg-[#252D3A] relative transition-colors cursor-pointer"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#2563EB] dark:bg-[#4F8EF7]" />
            )}
          </button>

          <NotificationPanel
            notifications={notifications}
            isOpen={notifOpen}
            onClose={() => setNotifOpen(false)}
            onMarkAllAsRead={onMarkAllNotificationsRead}
            onSelectNotification={(item) => {
              setNotifOpen(false);
              if (item.type === 'vasp') onNavigate('vasp-attribution');
              if (item.type === 'report') onNavigate('reports');
              if (item.type === 'alert') onNavigate('alerts');
            }}
          />
        </div>

        {/* Agency Clearance Profile */}
        <div className="hidden md:flex items-center gap-2 pl-2 border-l border-[#E2E8F0] dark:border-[#303948] text-xs">
          <div className="text-right">
            <div className="font-medium text-[#172033] dark:text-[#F1F5F9] leading-none">{user.officerName}</div>
            <div className="text-[10px] text-[#64748B] dark:text-[#A8B3C5] mt-0.5">{user.clearanceLevel}</div>
          </div>
          <div className="w-7 h-7 rounded bg-[#F1F5F9] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] text-[#172033] dark:text-[#F1F5F9] flex items-center justify-center text-xs font-semibold">
            {user.officerName.slice(0, 2).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
};
