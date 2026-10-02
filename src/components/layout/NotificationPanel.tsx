import React from 'react';
import { Bell, CheckCheck, ShieldAlert, Building2, FileText, Cpu, X } from 'lucide-react';
import { NotificationItem } from '../../types';

interface NotificationPanelProps {
  notifications: NotificationItem[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAllAsRead: () => void;
  onSelectNotification?: (item: NotificationItem) => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  notifications,
  isOpen,
  onClose,
  onMarkAllAsRead,
  onSelectNotification
}) => {
  if (!isOpen) return null;

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'alert':
        return <ShieldAlert className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />;
      case 'vasp':
        return <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />;
      case 'report':
        return <FileText className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
      case 'sync':
      case 'system':
      default:
        return <Cpu className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />;
    }
  };

  return (
    <div className="absolute right-0 top-11 w-80 sm:w-96 bg-white dark:bg-[#1B212C] border border-slate-200 dark:border-[#303948] rounded-lg shadow-xl z-50 overflow-hidden text-xs animate-in fade-in duration-100 font-sans">
      <div className="p-3 border-b border-slate-200 dark:border-[#303948] flex items-center justify-between bg-slate-50/75 dark:bg-[#171C26]">
        <div className="flex items-center gap-2">
          <Bell className="w-3.5 h-3.5 text-blue-600 dark:text-[#4F8EF7]" />
          <span className="text-xs font-semibold text-slate-900 dark:text-[#F1F5F9]">Forensic Alerts & Notices</span>
          <span className="text-[11px] text-slate-500 dark:text-[#A8B3C5] font-sans">
            ({notifications.filter(n => !n.read).length} new)
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onMarkAllAsRead}
            className="text-[11px] text-slate-500 hover:text-blue-600 dark:text-[#A8B3C5] dark:hover:text-[#4F8EF7] flex items-center gap-1 px-2 py-0.5 rounded hover:bg-slate-100 dark:hover:bg-[#252D3A] transition-colors cursor-pointer"
          >
            <CheckCheck className="w-3 h-3" />
            <span>Mark read</span>
          </button>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:text-[#A8B3C5] dark:hover:text-[#F1F5F9] p-0.5 rounded hover:bg-slate-100 dark:hover:bg-[#252D3A] cursor-pointer"
            aria-label="Close notification panel"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-[#303948]">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-500 dark:text-[#A8B3C5] font-sans">
            No active alerts recorded.
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectNotification && onSelectNotification(item)}
              className={`p-3 hover:bg-slate-50 dark:hover:bg-[#252D3A] transition-colors cursor-pointer ${
                !item.read ? 'bg-blue-50/30 dark:bg-[#202734]' : ''
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 shrink-0 p-1 rounded bg-slate-100 dark:bg-[#202734] border border-slate-200 dark:border-[#303948]">
                  {getIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-semibold text-slate-900 dark:text-[#F1F5F9] truncate font-sans">
                      {item.title}
                    </span>
                    {!item.read && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-[#4F8EF7] shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-[#A8B3C5] line-clamp-2 leading-relaxed font-sans">
                    {item.message}
                  </p>
                  <div className="mt-1 text-[10px] text-slate-400 dark:text-[#7F8DA3] font-sans">
                    {item.timestamp}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-2 bg-slate-50/75 dark:bg-[#171C26] border-t border-slate-200 dark:border-[#303948] text-center font-sans">
        <span className="text-[10px] text-slate-500 dark:text-[#7F8DA3]">
          Forensic alert stream active · LEA Automated Attributions
        </span>
      </div>
    </div>
  );
};
