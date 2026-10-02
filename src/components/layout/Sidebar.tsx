import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Search, 
  GitFork, 
  Building2, 
  ShieldAlert, 
  Briefcase, 
  FileText, 
  Settings, 
  LogOut, 
  X, 
  Bell, 
  ArrowLeftRight, 
  HelpCircle, 
  BookOpen
} from 'lucide-react';
import { UserSession, NavTab } from '../../types';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  user: UserSession;
  onLogout: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  unreadAlertsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  user,
  onLogout,
  mobileOpen,
  onCloseMobile,
  unreadAlertsCount = 2
}) => {
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  const navItems: Array<{ 
    id: NavTab; 
    label: string; 
    icon: React.ComponentType<{ className?: string }>;
    badge?: number | string;
  }> = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'investigations', label: 'Investigations', icon: Briefcase },
    { id: 'wallet-analysis', label: 'Wallet Analysis', icon: Search },
    { id: 'explorer', label: 'Transaction Explorer', icon: GitFork },
    { id: 'vasp-attribution', label: 'VASP Attribution', icon: Building2 },
    { id: 'risk-intelligence', label: 'Risk Intelligence', icon: ShieldAlert },
    { id: 'cross-chain', label: 'Cross-Chain Analysis', icon: ArrowLeftRight },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: unreadAlertsCount },
    { id: 'vasp-directory', label: 'VASP Directory', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/50 dark:bg-black/70 backdrop-blur-xs z-40 lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-white dark:bg-[#10151F] border-r border-slate-200 dark:border-[#303948] flex flex-col justify-between
        transition-all duration-200 ease-out font-sans
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand Lockup - Cleanly aligned typography, icon removed per instruction */}
        <div>
          <div className="h-14 px-5 border-b border-slate-200 dark:border-[#303948] flex items-center justify-between">
            <div className="flex flex-col justify-center">
              <div className="text-sm font-semibold tracking-tight text-slate-900 dark:text-[#F1F5F9] leading-tight">
                CryptoTrace
              </div>
              <div className="text-[11px] text-slate-500 dark:text-[#A8B3C5] font-normal">
                Blockchain Intelligence
              </div>
            </div>
            <button 
              onClick={onCloseMobile}
              className="lg:hidden p-1 text-slate-400 hover:text-slate-900 dark:text-[#A8B3C5] dark:hover:text-[#F1F5F9] rounded hover:bg-slate-100 dark:hover:bg-[#252D3A]"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-3 px-2 overflow-y-auto space-y-0.5">
          <div className="px-2.5 pb-1.5 text-[10px] font-semibold text-slate-400 dark:text-[#7F8DA3] uppercase tracking-wider">
            Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                className={`
                  w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors text-left cursor-pointer
                  ${isActive 
                    ? 'bg-slate-100 text-slate-900 dark:bg-[#1B212C] dark:text-[#F1F5F9] font-semibold border-l-2 border-blue-600 dark:border-[#4F8EF7]' 
                    : 'text-slate-600 dark:text-[#A8B3C5] hover:bg-slate-50 dark:hover:bg-[#252D3A] hover:text-slate-900 dark:hover:text-[#F1F5F9]'
                  }
                `}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-600 dark:text-[#4F8EF7]' : 'text-slate-400 dark:text-[#7F8DA3]'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-medium bg-slate-200 text-slate-700 dark:bg-[#202734] dark:text-[#A8B3C5]">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Section: Investigator Profile */}
        <div className="p-3 border-t border-slate-200 dark:border-[#303948] bg-slate-50/70 dark:bg-[#10151F]">
          <div className="flex items-center justify-between text-[11px] mb-2 px-0.5">
            <span className="text-slate-500 dark:text-[#A8B3C5] font-medium">Node Status</span>
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-[#F1F5F9] text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Online</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1B212C] border border-slate-200 dark:border-[#303948] rounded p-2 text-xs flex items-center justify-between gap-2">
            <div className="truncate">
              <div className="font-medium text-slate-900 dark:text-[#F1F5F9] truncate">
                {user.officerName}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-[#A8B3C5] truncate">
                {user.officerId} · {user.agency}
              </div>
            </div>
            <div className="flex items-center shrink-0">
              <button
                onClick={() => setHelpModalOpen(true)}
                title="Protocol Documentation"
                className="p-1 text-slate-400 hover:text-slate-700 dark:text-[#A8B3C5] dark:hover:text-[#F1F5F9] rounded cursor-pointer"
                aria-label="Help"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onLogout}
                title="Sign Out"
                className="p-1 text-slate-400 hover:text-rose-600 dark:text-[#A8B3C5] dark:hover:text-rose-400 rounded cursor-pointer"
                aria-label="Log out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Help Modal */}
      {helpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 dark:bg-black/75 backdrop-blur-xs font-sans">
          <div className="bg-white dark:bg-[#1B212C] border border-slate-200 dark:border-[#303948] rounded-lg max-w-md w-full p-5 shadow-xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#303948]">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-[#F1F5F9]">
                Standard Operating Procedures
              </h4>
              <button
                onClick={() => setHelpModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 dark:text-[#A8B3C5] dark:hover:text-[#F1F5F9] p-1 rounded cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-slate-600 dark:text-[#A8B3C5] leading-relaxed font-sans">
              <p>
                <strong className="text-slate-900 dark:text-[#F1F5F9]">Attribution Evidence:</strong> Cluster analysis identifies deterministic sweep patterns. All attributions require manual verification against subpoena records prior to legal filings.
              </p>
              <p>
                <strong className="text-slate-900 dark:text-[#F1F5F9]">Audit Compliance:</strong> Every query, export, and dossier generation is stamped with Officer ID {user.officerId}.
              </p>
              <div className="p-2.5 bg-slate-50 dark:bg-[#202734] border border-slate-200 dark:border-[#303948] rounded text-[11px] text-slate-500 dark:text-[#A8B3C5]">
                Compliance Standard: Digital Evidentiary Custody
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setHelpModalOpen(false)}
                className="px-3.5 py-1.5 bg-slate-900 text-white dark:bg-[#202734] dark:border dark:border-[#303948] dark:text-[#F1F5F9] rounded text-xs font-medium hover:bg-slate-800 dark:hover:bg-[#252D3A] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
