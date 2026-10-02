import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  CheckCircle2, 
  Save,
  Sun,
  Moon,
  Laptop
} from 'lucide-react';
import { UserSession } from '../../types';
import { useTheme, ThemeMode } from '../../context/ThemeContext';

interface SettingsViewProps {
  user: UserSession;
  onUpdateUser: (updated: UserSession) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ user, onUpdateUser }) => {
  const [officerName, setOfficerName] = useState(user.officerName);
  const [agency, setAgency] = useState(user.agency);
  const [badgeNumber, setBadgeNumber] = useState(user.badgeNumber);
  const [autoPurgeDays, setAutoPurgeDays] = useState('90');
  const [mfaEnforced, setMfaEnforced] = useState(true);
  const [nodeFailover, setNodeFailover] = useState(true);
  const [saved, setSaved] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      officerName,
      agency,
      badgeNumber
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="pb-2 border-b border-[#E2E8F0] dark:border-[#303948]">
        <h1 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-[#F1F5F9] tracking-tight font-sans">
          LEA operational settings
        </h1>
        <p className="text-xs text-[#64748B] dark:text-[#A8B3C5] mt-1 max-w-3xl leading-relaxed font-sans">
          Configure security clearances, digital chain-of-custody policies, and agency cryptographic identity headers.
        </p>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-md flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300 font-sans">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Profile and forensic environment configurations updated. Audit entry signed.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 font-sans">
        {/* Left Column: Officer Profile Settings */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#E2E8F0] dark:border-[#303948]">
              <User className="w-4 h-4 text-[#2563EB] dark:text-[#4F8EF7]" />
              <div>
                <h2 className="text-sm font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">
                  Authorized investigator credentials
                </h2>
                <p className="text-[11px] text-[#64748B] dark:text-[#A8B3C5] font-sans">
                  Official agency identity stamped on generated subpoenas and PDF forensic dossiers
                </p>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-[#172033] dark:text-[#F1F5F9] font-medium mb-1">
                  Investigator full name & rank
                </label>
                <input
                  type="text"
                  value={officerName}
                  onChange={(e) => setOfficerName(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] focus:border-[#2563EB] dark:focus:border-[#4F8EF7] rounded-md text-[#172033] dark:text-[#F1F5F9] focus:outline-hidden transition-colors font-sans"
                />
              </div>

              <div>
                <label className="block text-[#172033] dark:text-[#F1F5F9] font-medium mb-1">
                  Designated law enforcement agency
                </label>
                <input
                  type="text"
                  value={agency}
                  onChange={(e) => setAgency(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] focus:border-[#2563EB] dark:focus:border-[#4F8EF7] rounded-md text-[#172033] dark:text-[#F1F5F9] focus:outline-hidden transition-colors font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#172033] dark:text-[#F1F5F9] font-medium mb-1">
                    Official badge / warrant number
                  </label>
                  <input
                    type="text"
                    value={badgeNumber}
                    onChange={(e) => setBadgeNumber(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] focus:border-[#2563EB] dark:focus:border-[#4F8EF7] rounded-md text-[#172033] dark:text-[#F1F5F9] font-mono text-xs focus:outline-hidden transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[#172033] dark:text-[#F1F5F9] font-medium mb-1">
                    Clearance level (immutable)
                  </label>
                  <input
                    type="text"
                    value={user.clearanceLevel}
                    disabled
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-[#202734]/60 border border-[#E2E8F0] dark:border-[#303948] rounded-md text-[#64748B] dark:text-[#7F8DA3] font-sans text-xs cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] dark:border-[#303948] flex justify-end">
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-md text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer font-sans"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save investigator details</span>
                </button>
              </div>
            </form>
          </div>

          {/* Theme & Appearance Configuration */}
          <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#E2E8F0] dark:border-[#303948]">
              <Sun className="w-4 h-4 text-[#2563EB] dark:text-[#4F8EF7]" />
              <div>
                <h3 className="text-sm font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">
                  Interface appearance & theme
                </h3>
                <p className="text-[11px] text-[#64748B] dark:text-[#A8B3C5] font-sans">
                  Switch between Light, Dark, or System Default modes. Preference is stored securely.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans">
              {[
                { id: 'light' as ThemeMode, label: 'Light Mode', icon: Sun, desc: 'Clean white / off-white workspace' },
                { id: 'dark' as ThemeMode, label: 'Dark Mode', icon: Moon, desc: 'Soft dark charcoal/slate canvas' },
                { id: 'system' as ThemeMode, label: 'System Default', icon: Laptop, desc: 'Sync with operating system' }
              ].map(opt => {
                const isSelected = theme === opt.id;
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTheme(opt.id)}
                    className={`p-3 rounded-md border text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-[#2563EB] dark:border-[#4F8EF7] bg-blue-50/50 dark:bg-[#202734] text-blue-900 dark:text-[#F1F5F9] ring-1 ring-blue-500/20'
                        : 'border-[#E2E8F0] dark:border-[#303948] bg-[#F8FAFC] dark:bg-[#1B212C] hover:border-slate-300 dark:hover:border-[#475569] text-[#172033] dark:text-[#A8B3C5]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#2563EB] dark:text-[#4F8EF7]' : 'text-[#64748B] dark:text-[#7F8DA3]'}`} />
                      <span className="text-xs font-semibold">{opt.label}</span>
                      {isSelected && (
                        <span className="ml-auto text-[10px] font-sans font-semibold text-[#2563EB] dark:text-[#4F8EF7]">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#64748B] dark:text-[#7F8DA3] leading-tight">
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Security & System Policies */}
        <div className="space-y-5 font-sans">
          <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E2E8F0] dark:border-[#303948]">
              <Lock className="w-4 h-4 text-[#2563EB] dark:text-[#4F8EF7]" />
              <h3 className="text-xs font-semibold text-[#172033] dark:text-[#F1F5F9] font-sans">
                Forensic security policies
              </h3>
            </div>

            <div className="space-y-3 text-xs font-sans">
              <div className="flex items-center justify-between p-2.5 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md">
                <div>
                  <div className="font-semibold text-[#172033] dark:text-[#F1F5F9]">Enforce hardware 2FA / CAC</div>
                  <div className="text-[10px] text-[#64748B] dark:text-[#A8B3C5]">Required for lawful requisition issuance</div>
                </div>
                <input
                  type="checkbox"
                  checked={mfaEnforced}
                  onChange={(e) => setMfaEnforced(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-blue-600 focus:ring-0 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-2.5 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md">
                <div>
                  <div className="font-semibold text-[#172033] dark:text-[#F1F5F9]">Automated RPC failover</div>
                  <div className="text-[10px] text-[#64748B] dark:text-[#A8B3C5]">Redundant fallback on timeout</div>
                </div>
                <input
                  type="checkbox"
                  checked={nodeFailover}
                  onChange={(e) => setNodeFailover(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-blue-600 focus:ring-0 cursor-pointer"
                />
              </div>

              <div className="p-2.5 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md">
                <div className="font-semibold text-[#172033] dark:text-[#F1F5F9] mb-1">Local ledger cache TTL</div>
                <select
                  value={autoPurgeDays}
                  onChange={(e) => setAutoPurgeDays(e.target.value)}
                  className="w-full px-2 py-1.5 bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded text-xs text-[#172033] dark:text-[#F1F5F9] focus:outline-hidden cursor-pointer"
                >
                  <option value="30">30 Days (Statutory Minimum)</option>
                  <option value="90">90 Days (LEA Recommendation)</option>
                  <option value="180">180 Days (Extended Dossier)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#F8FAFC] dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg space-y-2 text-xs font-sans">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-semibold text-[11px] font-sans">
              <ShieldCheck className="w-4 h-4" />
              <span>Immutable chain of custody</span>
            </div>
            <p className="text-[#475569] dark:text-[#A8B3C5] text-[11px] leading-relaxed font-sans">
              All queries executed in this portal are cryptographically logged with Officer ID <strong className="text-[#172033] dark:text-[#F1F5F9] font-mono">{user.officerId}</strong> for compliance auditing under evidentiary standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
