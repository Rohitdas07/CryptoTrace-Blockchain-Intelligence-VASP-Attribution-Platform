import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Laptop, Check } from 'lucide-react';
import { useTheme, ThemeMode } from '../../context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'compact' | 'expanded';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = 'compact', className = '' }) => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options: Array<{ id: ThemeMode; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'system', label: 'System', icon: Laptop }
  ];

  if (variant === 'expanded') {
    return (
      <div className={`flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#1B212C] rounded-lg border border-slate-200 dark:border-[#303948] ${className}`}>
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = theme === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setTheme(opt.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-white dark:bg-[#202734] text-slate-900 dark:text-[#F1F5F9] shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-[#A8B3C5] hover:text-slate-900 dark:hover:text-[#F1F5F9]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  const CurrentIcon = resolvedTheme === 'dark' ? Moon : Sun;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-500 hover:text-slate-900 dark:text-[#A8B3C5] dark:hover:text-[#F1F5F9] rounded-lg hover:bg-slate-100 dark:hover:bg-[#252D3A] transition-colors cursor-pointer flex items-center justify-center"
        aria-label="Toggle theme"
        title={`Current theme: ${theme} (${resolvedTheme})`}
      >
        <CurrentIcon className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-11 w-36 bg-white dark:bg-[#1B212C] border border-slate-200 dark:border-[#303948] rounded-lg shadow-lg py-1 z-50 animate-in fade-in duration-100">
          <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 dark:text-[#7F8DA3] uppercase tracking-wider font-sans">
            Theme
          </div>
          {options.map((opt) => {
            const Icon = opt.icon;
            const isSelected = theme === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => {
                  setTheme(opt.id);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? 'text-blue-600 dark:text-[#4F8EF7] bg-blue-50/60 dark:bg-[#202734] font-semibold'
                    : 'text-slate-700 dark:text-[#A8B3C5] hover:bg-slate-100 dark:hover:bg-[#252D3A] dark:hover:text-[#F1F5F9]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{opt.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-[#4F8EF7]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
