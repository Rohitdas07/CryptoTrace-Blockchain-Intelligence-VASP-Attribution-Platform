import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Info, 
  ArrowRight, 
  RefreshCw, 
  ChevronDown, 
  SlidersHorizontal 
} from 'lucide-react';
import { Blockchain, WalletInvestigationResult } from '../../types';
import { walletService } from '../../services/walletService';
import { PRIMARY_DEMO_WALLET, DEMO_PRESET_WALLETS } from '../../data/wallets';
import { WalletOverviewCard } from './WalletOverviewCard';
import { VaspAttributionCard } from './VaspAttributionCard';
import { AttributionChain } from './AttributionChain';
import { TransactionFlowGraph } from './TransactionFlowGraph';
import { TransactionTable } from './TransactionTable';
import { RiskAnalysisView } from './RiskAnalysisView';

interface WalletInvestigationProps {
  initialAddress?: string;
  onNavigateToSahyog?: (vaspName?: string, wallet?: string) => void;
  onNavigateToReport?: () => void;
}

export const WalletInvestigation: React.FC<WalletInvestigationProps> = ({
  initialAddress,
  onNavigateToSahyog,
  onNavigateToReport
}) => {
  const [addressInput, setAddressInput] = useState(initialAddress || PRIMARY_DEMO_WALLET.walletAddress);
  const [selectedBlockchain, setSelectedBlockchain] = useState<Blockchain>('Ethereum');
  const [caseIdInput, setCaseIdInput] = useState('CASE-2026-001');
  const [investigationId, setInvestigationId] = useState('INV-4402-99');
  const [analysisDepth, setAnalysisDepth] = useState('3');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState<string>('');
  const [resultData, setResultData] = useState<WalletInvestigationResult>(PRIMARY_DEMO_WALLET);
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'chain' | 'graph' | 'transactions' | 'risk'>('all');

  const blockchains: Blockchain[] = ['Ethereum', 'Bitcoin', 'Tron', 'BNB Chain', 'Solana', 'Polygon'];

  const handleAnalyze = async (addrToAnalyze = addressInput, chain = selectedBlockchain) => {
    if (!addrToAnalyze.trim()) return;

    setIsAnalyzing(true);
    setAnalysisStep('Querying public ledger telemetry...');

    setTimeout(() => {
      setAnalysisStep('Mapping topological intermediary hops...');
    }, 300);

    setTimeout(() => {
      setAnalysisStep('Correlating deterministic VASP deposit sweep clusters...');
    }, 600);

    setTimeout(async () => {
      const data = await walletService.analyzeWallet(addrToAnalyze, chain, caseIdInput, parseInt(analysisDepth, 10));
      setResultData(data);
      setIsAnalyzing(false);
      setAnalysisStep('');
    }, 900);
  };

  const handleSelectPreset = (preset: typeof DEMO_PRESET_WALLETS[0]) => {
    setAddressInput(preset.address);
    setSelectedBlockchain(preset.network);
    handleAnalyze(preset.address, preset.network);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="pb-2 border-b border-slate-200 dark:border-[#303948]">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-[#F1F5F9] tracking-tight font-sans">
          Wallet Intelligence Analysis
        </h1>
        <p className="text-xs text-slate-500 dark:text-[#A8B3C5] mt-0.5 max-w-3xl leading-relaxed font-sans">
          Input an unknown or suspicious cryptocurrency wallet address to extract transaction flows, identify the nearest suspected VASP, and calculate attribution confidence.
        </p>
      </div>

      {/* Main Analysis Form Card */}
      <div className="bg-white dark:bg-[#1B212C] border border-slate-200 dark:border-[#303948] rounded-lg p-4 sm:p-5 shadow-xs space-y-3 font-sans">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAnalyze();
          }}
          className="space-y-3.5"
        >
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5">
            {/* Wallet Address Input */}
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-slate-400 dark:text-[#7F8DA3] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                placeholder="Enter wallet address (e.g. 0x..., bc1..., TYs...)"
                required
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#202734] border border-slate-300 dark:border-[#303948] focus:border-blue-500 dark:focus:border-[#4F8EF7] focus:bg-white dark:focus:bg-[#202734] rounded-md text-xs text-slate-900 dark:text-[#F1F5F9] placeholder:text-slate-400 dark:placeholder:text-[#7F8DA3] font-mono focus:outline-hidden transition-colors"
              />
            </div>

            {/* Network Dropdown */}
            <div className="relative w-full md:w-44">
              <select
                value={selectedBlockchain}
                onChange={(e) => setSelectedBlockchain(e.target.value as Blockchain)}
                className="w-full appearance-none pl-3 pr-8 py-2 bg-slate-50 dark:bg-[#202734] border border-slate-300 dark:border-[#303948] focus:border-blue-500 dark:focus:border-[#4F8EF7] focus:bg-white dark:focus:bg-[#202734] rounded-md text-xs font-medium text-slate-800 dark:text-[#F1F5F9] focus:outline-hidden cursor-pointer"
              >
                {blockchains.map((chain) => (
                  <option key={chain} value={chain} className="bg-white dark:bg-[#1B212C] text-slate-900 dark:text-[#F1F5F9]">
                    {chain}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 dark:text-[#7F8DA3] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Analyze Button */}
            <button
              type="submit"
              disabled={isAnalyzing}
              className="py-2 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Analyze</span>
                </>
              )}
            </button>
          </div>

          {/* Advanced Controls Toggle */}
          <div className="flex items-center justify-between text-xs pt-0.5">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-slate-600 dark:text-[#A8B3C5] hover:text-slate-900 dark:hover:text-[#F1F5F9] flex items-center gap-1.5 cursor-pointer font-medium"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500 dark:text-[#7F8DA3]" />
              <span>{showAdvanced ? 'Hide Docket Options' : 'Case ID & Depth Settings'}</span>
            </button>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-[#7F8DA3] font-sans">
              <Info className="w-3.5 h-3.5 text-slate-400 dark:text-[#7F8DA3] shrink-0" />
              <span>Only public blockchain telemetry is analyzed</span>
            </div>
          </div>

          {/* Optional Investigation Metadata Fields */}
          {showAdvanced && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 dark:bg-[#1D2430] border border-slate-200 dark:border-[#303948] rounded text-xs animate-in fade-in duration-150">
              <div>
                <label className="block text-slate-600 dark:text-[#A8B3C5] text-[11px] mb-1 font-medium font-sans">Associate Case ID</label>
                <input
                  type="text"
                  value={caseIdInput}
                  onChange={(e) => setCaseIdInput(e.target.value)}
                  placeholder="e.g. CASE-2026-001"
                  className="w-full px-2.5 py-1.5 bg-white dark:bg-[#202734] border border-slate-200 dark:border-[#303948] rounded text-slate-900 dark:text-[#F1F5F9] font-mono text-xs focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-slate-600 dark:text-[#A8B3C5] text-[11px] mb-1 font-medium font-sans">Investigation Reference</label>
                <input
                  type="text"
                  value={investigationId}
                  onChange={(e) => setInvestigationId(e.target.value)}
                  placeholder="e.g. INV-4402-99"
                  className="w-full px-2.5 py-1.5 bg-white dark:bg-[#202734] border border-slate-200 dark:border-[#303948] rounded text-slate-900 dark:text-[#F1F5F9] font-mono text-xs focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-slate-600 dark:text-[#A8B3C5] text-[11px] mb-1 font-medium font-sans">Attribution Search Depth</label>
                <select
                  value={analysisDepth}
                  onChange={(e) => setAnalysisDepth(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white dark:bg-[#202734] border border-slate-200 dark:border-[#303948] rounded text-slate-900 dark:text-[#F1F5F9] cursor-pointer text-xs focus:outline-hidden"
                >
                  <option value="2" className="bg-white dark:bg-[#1B212C]">2 Hops (Direct Sweep)</option>
                  <option value="3" className="bg-white dark:bg-[#1B212C]">3 Hops (Standard Intermediary)</option>
                  <option value="5" className="bg-white dark:bg-[#1B212C]">5 Hops (Deep Consolidation)</option>
                </select>
              </div>
            </div>
          )}

          {/* Quick Demo Presets */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs border-t border-slate-100 dark:border-[#303948]">
            <span className="text-[11px] text-slate-500 dark:text-[#A8B3C5] font-medium">Quick Presets:</span>
            {DEMO_PRESET_WALLETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => handleSelectPreset(p)}
                className="text-[11px] px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-[#202734] dark:hover:bg-[#252D3A] border border-slate-200 dark:border-[#303948] text-slate-700 dark:text-[#A8B3C5] transition-colors font-sans cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>
        </form>

        {/* Loading Progress State */}
        {isAnalyzing && (
          <div className="p-3 bg-blue-50 dark:bg-[#202734] border border-blue-200 dark:border-[#303948] rounded flex items-center gap-3">
            <div className="w-3.5 h-3.5 border-2 border-blue-600 dark:border-[#4F8EF7] border-t-transparent rounded-full animate-spin shrink-0" />
            <div className="text-xs text-blue-800 dark:text-[#93C5FD] font-sans">
              {analysisStep}
            </div>
          </div>
        )}
      </div>

      {/* Investigation Results Presentation */}
      {!isAnalyzing && (
        <div className="space-y-5">
          {/* Sub-view Switcher Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-[#303948] gap-2">
            <div className="flex space-x-1 overflow-x-auto">
              {[
                { id: 'all', label: 'All Modules' },
                { id: 'chain', label: 'Attribution Chain' },
                { id: 'graph', label: 'Transaction Graph' },
                { id: 'transactions', label: `Ledger (${resultData.transactions.length})` },
                { id: 'risk', label: 'Risk Analysis' }
              ].map((tab) => {
                const isActive = activeSubTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSubTab(tab.id as any)}
                    className={`px-3 py-2 text-xs font-medium border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                      isActive
                        ? 'border-blue-600 text-blue-600 dark:text-[#4F8EF7] dark:border-[#4F8EF7] font-semibold'
                        : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-[#A8B3C5] dark:hover:text-[#F1F5F9]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {onNavigateToReport && (
              <button
                onClick={onNavigateToReport}
                className="text-xs text-slate-700 dark:text-[#E2E8F0] hover:text-slate-900 dark:hover:text-white px-2.5 py-1 mb-1 bg-white dark:bg-[#202734] hover:bg-slate-50 dark:hover:bg-[#252D3A] border border-slate-200 dark:border-[#303948] rounded transition-colors flex items-center gap-1.5 cursor-pointer font-medium self-start sm:self-auto font-sans"
              >
                <span>Export Dossier</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600 dark:text-[#4F8EF7]" />
              </button>
            )}
          </div>

          {/* Wallet Overview Card */}
          {(activeSubTab === 'all' || activeSubTab === 'transactions') && (
            <WalletOverviewCard data={resultData} />
          )}

          {/* Nearest Identified VASP Attribution */}
          {(activeSubTab === 'all' || activeSubTab === 'chain') && (
            <VaspAttributionCard 
              attribution={resultData.attribution}
              onPrepareLawfulRequest={() => onNavigateToSahyog && onNavigateToSahyog(resultData.attribution.entityName, resultData.walletAddress)}
            />
          )}

          {/* Attribution Chain */}
          {(activeSubTab === 'all' || activeSubTab === 'chain') && (
            <AttributionChain 
              nodes={resultData.flowNodes} 
              onSelectAddress={(addr) => {
                setAddressInput(addr);
                handleAnalyze(addr, selectedBlockchain);
              }}
            />
          )}

          {/* Interactive Transaction Flow Graph */}
          {(activeSubTab === 'all' || activeSubTab === 'graph') && (
            <TransactionFlowGraph
              nodes={resultData.flowNodes}
              edges={resultData.flowEdges}
              onSelectNodeAddress={(addr) => {
                setAddressInput(addr);
                handleAnalyze(addr, selectedBlockchain);
              }}
            />
          )}

          {/* Transaction Table */}
          {(activeSubTab === 'all' || activeSubTab === 'transactions') && (
            <TransactionTable
              transactions={resultData.transactions}
              onInvestigateAddress={(addr) => {
                setAddressInput(addr);
                handleAnalyze(addr, selectedBlockchain);
              }}
            />
          )}

          {/* Risk Intelligence Heuristics */}
          {(activeSubTab === 'all' || activeSubTab === 'risk') && (
            <RiskAnalysisView
              riskData={resultData.riskAnalysis}
              onSaveNotes={(notes) => {
                setResultData({
                  ...resultData,
                  riskAnalysis: {
                    ...resultData.riskAnalysis,
                    analystNotes: notes
                  }
                });
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};
