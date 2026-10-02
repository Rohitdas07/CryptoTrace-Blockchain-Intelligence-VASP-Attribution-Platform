import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Building2, 
  User, 
  KeyRound, 
  AlertTriangle, 
  ArrowRight
} from 'lucide-react';
import { UserSession } from '../../types';
import { ThemeToggle } from '../common/ThemeToggle';

interface LoginPageProps {
  onLogin: (session: UserSession) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [officerId, setOfficerId] = useState('LE-4402');
  const [password, setPassword] = useState('••••••••••••');
  const [agency, setAgency] = useState('National Cyber Crime Coordination Centre (N4C)');
  const [rememberDevice, setRememberDevice] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!officerId.trim()) {
      setError('Official ID or verified email is required for access.');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Simulate authentication verification
    setTimeout(() => {
      setIsLoading(false);
      onLogin({
        officerId: officerId.trim(),
        officerName: 'Inspector R. Sharma',
        agency: agency.trim() || 'Central Cyber Crime Command',
        badgeNumber: 'LEA-CC-8821',
        clearanceLevel: 'LEVEL IV FORENSIC',
        authenticatedAt: new Date().toISOString()
      });
    }, 400);
  };

  const handleQuickDemoFill = () => {
    setOfficerId('investigator@n4c.gov.in');
    setPassword('CyberForensic2026!');
    setAgency('National Cyber Crime Coordination Centre (N4C)');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#151922] text-[#172033] dark:text-[#F1F5F9] flex flex-col justify-between font-sans transition-colors duration-200">
      {/* Top Bar */}
      <header className="px-6 py-3.5 border-b border-[#E2E8F0] dark:border-[#303948] bg-white/95 dark:bg-[#171C26] backdrop-blur-xs flex items-center justify-between">
        <div className="flex flex-col justify-center">
          <div className="text-sm font-semibold tracking-tight text-[#172033] dark:text-[#F1F5F9] font-sans leading-tight">
            CryptoTrace
          </div>
          <div className="text-[11px] text-[#64748B] dark:text-[#A8B3C5] font-sans">
            Blockchain Intelligence
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-sans">
          <div className="hidden sm:flex items-center gap-2 text-[#64748B] dark:text-[#A8B3C5] text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>LEA gateway active</span>
            <span className="text-slate-300 dark:text-[#303948]">|</span>
            <span className="font-mono">v4.2.0-SECURE</span>
          </div>
          <ThemeToggle variant="compact" />
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-10 font-sans">
        <div className="w-full max-w-md bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg shadow-xs overflow-hidden p-6 sm:p-7 space-y-5">
          {/* Card Header */}
          <div className="text-center font-sans">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-[#F1F5F9] dark:bg-[#202734] text-[#2563EB] dark:text-[#4F8EF7] mb-3 border border-[#E2E8F0] dark:border-[#303948]">
              <Lock className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="inline-block px-2.5 py-0.5 mb-2 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 text-[11px] font-medium font-sans">
                Authorized law enforcement access only
              </span>
            </div>
            <h1 className="text-lg font-bold text-[#172033] dark:text-[#F1F5F9] tracking-tight font-sans">
              Investigator sign in
            </h1>
            <p className="text-xs text-[#64748B] dark:text-[#A8B3C5] mt-1 max-w-xs mx-auto font-sans leading-relaxed">
              Access the authorized forensic attribution repository and real-time ledger intelligence.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 rounded-md flex items-center gap-2.5 text-xs text-rose-700 dark:text-rose-300 font-sans">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-3.5 font-sans">
            <div>
              <label className="block text-xs font-medium text-[#172033] dark:text-[#F1F5F9] mb-1 font-sans">
                Official ID / department email
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#94A3B8] dark:text-[#7F8DA3] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={officerId}
                  onChange={(e) => setOfficerId(e.target.value)}
                  placeholder="e.g. investigator@n4c.gov.in or LE-4402"
                  required
                  className="w-full pl-9 pr-3 py-2 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] focus:border-[#2563EB] dark:focus:border-[#4F8EF7] focus:bg-white dark:focus:bg-[#202734] rounded-md text-xs text-[#172033] dark:text-[#F1F5F9] placeholder:text-[#94A3B8] dark:placeholder:text-[#7F8DA3] focus:outline-hidden transition-colors font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#172033] dark:text-[#F1F5F9] mb-1 font-sans">
                Credential token / password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-[#94A3B8] dark:text-[#7F8DA3] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter credential token"
                  required
                  className="w-full pl-9 pr-3 py-2 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] focus:border-[#2563EB] dark:focus:border-[#4F8EF7] focus:bg-white dark:focus:bg-[#202734] rounded-md text-xs text-[#172033] dark:text-[#F1F5F9] placeholder:text-[#94A3B8] dark:placeholder:text-[#7F8DA3] focus:outline-hidden transition-colors font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#172033] dark:text-[#F1F5F9] mb-1 font-sans">
                Designated law enforcement agency
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-[#94A3B8] dark:text-[#7F8DA3] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={agency}
                  onChange={(e) => setAgency(e.target.value)}
                  placeholder="e.g. National Cyber Crime Coordination Centre"
                  required
                  className="w-full pl-9 pr-3 py-2 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] focus:border-[#2563EB] dark:focus:border-[#4F8EF7] focus:bg-white dark:focus:bg-[#202734] rounded-md text-xs text-[#172033] dark:text-[#F1F5F9] placeholder:text-[#94A3B8] dark:placeholder:text-[#7F8DA3] focus:outline-hidden transition-colors font-sans"
                />
              </div>
            </div>

            {/* Remember Device & Demo Fill */}
            <div className="flex items-center justify-between text-xs pt-0.5 font-sans">
              <label className="flex items-center gap-2 text-[#475569] dark:text-[#A8B3C5] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="w-3.5 h-3.5 accent-[#2563EB] rounded border-slate-300 dark:border-[#303948] cursor-pointer"
                />
                <span className="text-[11px]">Remember terminal</span>
              </label>
              <button
                type="button"
                onClick={handleQuickDemoFill}
                className="text-[11px] text-[#2563EB] dark:text-[#4F8EF7] hover:underline cursor-pointer font-medium font-sans"
              >
                Use demo credentials
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-md text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 font-sans"
            >
              {isLoading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying authorization...</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Sign in</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                </>
              )}
            </button>
          </form>

          {/* Compliance Safeguard Notice */}
          <div className="pt-3 border-t border-[#E2E8F0] dark:border-[#303948] text-[10px] text-[#64748B] dark:text-[#A8B3C5] text-center leading-relaxed font-sans">
            By signing in, you confirm that all actions are conducted strictly in accordance with authorized legal investigative warrants and evidentiary procedures.
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-3 border-t border-[#E2E8F0] dark:border-[#303948] bg-white/70 dark:bg-[#171C26] text-xs text-[#64748B] dark:text-[#A8B3C5] flex flex-col sm:flex-row items-center justify-between gap-2 font-sans">
        <div className="flex items-center gap-2 text-[11px] font-sans">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>System status: Online · Blockchain node quorum operational</span>
        </div>
        <div className="text-[11px] font-sans">
          CryptoTrace – Blockchain Intelligence & VASP Attribution
        </div>
      </footer>
    </div>
  );
};
