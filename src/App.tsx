/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserSession, CaseItem, NotificationItem, Blockchain, NavTab } from './types';
import { 
  PRIMARY_DEMO_INVESTIGATION, 
  MOCK_CASES, 
  MOCK_NOTIFICATIONS 
} from './data/mockData';
import { LoginPage } from './components/auth/LoginPage';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MainDashboard } from './components/dashboard/MainDashboard';
import { WalletInvestigation } from './components/investigation/WalletInvestigation';
import { TransactionFlowGraph } from './components/investigation/TransactionFlowGraph';
import { TransactionTable } from './components/investigation/TransactionTable';
import { AttributionChain } from './components/investigation/AttributionChain';
import { RiskAnalysisView } from './components/investigation/RiskAnalysisView';
import { CrossChainAnalysisView } from './components/investigation/CrossChainAnalysisView';
import { VaspIntelligence } from './components/vasp/VaspIntelligence';
import { VaspDirectoryView } from './components/vasp/VaspDirectoryView';
import { MultiBlockchainView } from './components/blockchain/MultiBlockchainView';
import { CaseManagement } from './components/cases/CaseManagement';
import { InvestigationReportView } from './components/reports/InvestigationReportView';
import { SahyogIntegrationView } from './components/sahyog/SahyogIntegrationView';
import { AlertsView } from './components/alerts/AlertsView';
import { ApiIntegrationsView } from './components/api/ApiIntegrationsView';
import { SettingsView } from './components/settings/SettingsView';

export default function App() {
  // Session State (default logged in with demo LEA credentials so user gets instant access, but can log out to test login screen!)
  const [userSession, setUserSession] = useState<UserSession | null>({
    officerId: 'LE-4402',
    officerName: 'Inspector R. Sharma',
    agency: 'Central Cyber Crime Division',
    badgeNumber: 'LEA-CC-8821',
    clearanceLevel: 'LEVEL IV FORENSIC',
    authenticatedAt: new Date().toISOString()
  });

  const [currentTab, setCurrentTab] = useState<NavTab | string>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cases, setCases] = useState<CaseItem[]>(MOCK_CASES);
  const [selectedCaseId, setSelectedCaseId] = useState<string>('CASE-2026-001');
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [investigationAddress, setInvestigationAddress] = useState<string>(
    PRIMARY_DEMO_INVESTIGATION.walletAddress
  );

  const activeCase = cases.find(c => c.caseId === selectedCaseId) || cases[0];

  const handleLogin = (session: UserSession) => {
    setUserSession(session);
    setCurrentTab('dashboard');
  };

  const handleLogout = () => {
    setUserSession(null);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleCreateCase = (newCase: CaseItem) => {
    setCases(prev => [newCase, ...prev]);
    setSelectedCaseId(newCase.caseId);
  };

  const handleQuickInvestigate = (address: string) => {
    setInvestigationAddress(address);
    setCurrentTab('wallet-analysis');
  };

  if (!userSession) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-[#151922] text-[#172033] dark:text-[#F1F5F9] flex flex-col antialiased selection:bg-blue-600/20 selection:text-blue-900 font-sans transition-colors duration-200">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab as NavTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        user={userSession}
        onLogout={handleLogout}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Workspace Frame */}
      <div className="lg:pl-64 flex-1 flex flex-col min-w-0 bg-[#F5F7FA] dark:bg-[#151922]">
        {/* Top Header */}
        <Header
          currentTab={currentTab as NavTab}
          onNavigate={(tab) => setCurrentTab(tab)}
          user={userSession}
          notifications={notifications}
          onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
          onToggleMobileMenu={() => setMobileMenuOpen(prev => !prev)}
          onQuickSearchAddress={handleQuickInvestigate}
          activeCases={cases}
          selectedCaseId={selectedCaseId}
          onSelectCase={(id) => setSelectedCaseId(id)}
        />

        {/* Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto bg-[#F5F7FA] dark:bg-[#151922]">
          {currentTab === 'dashboard' && (
            <MainDashboard
              cases={cases}
              onNavigate={(tab) => setCurrentTab(tab)}
              onQuickInvestigate={handleQuickInvestigate}
              onSelectCase={(id) => {
                setSelectedCaseId(id);
                setCurrentTab('investigations');
              }}
            />
          )}

          {(currentTab === 'wallet-analysis' || currentTab === 'investigation') && (
            <WalletInvestigation
              initialAddress={investigationAddress}
              onNavigateToSahyog={() => setCurrentTab('sahyog')}
              onNavigateToReport={() => setCurrentTab('reports')}
            />
          )}

          {(currentTab === 'explorer' || currentTab === 'tracing') && (
            <div className="space-y-6">
              <div className="pb-2 border-b border-[#E2E8F0] dark:border-[#303948]">
                <h1 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-[#F1F5F9] tracking-tight font-sans">
                  Transaction Explorer & Topological Graph
                </h1>
                <p className="text-xs text-[#64748B] dark:text-[#A8B3C5] mt-0.5 max-w-3xl leading-relaxed font-sans">
                  Interactive multi-hop topological graph mapping the dissipation of funds from suspicious sources into intermediary mixers, bridges, and VASP deposit clusters.
                </p>
              </div>

              <AttributionChain
                nodes={PRIMARY_DEMO_INVESTIGATION.flowNodes}
                onSelectAddress={handleQuickInvestigate}
              />

              <TransactionFlowGraph
                nodes={PRIMARY_DEMO_INVESTIGATION.flowNodes}
                edges={PRIMARY_DEMO_INVESTIGATION.flowEdges}
                onSelectNodeAddress={handleQuickInvestigate}
              />

              <TransactionTable
                transactions={PRIMARY_DEMO_INVESTIGATION.transactions}
                onInvestigateAddress={handleQuickInvestigate}
              />
            </div>
          )}

          {(currentTab === 'vasp-attribution' || currentTab === 'vasp') && (
            <VaspIntelligence
              onInvestigateAddress={handleQuickInvestigate}
              onPrepareSahyogForVasp={() => setCurrentTab('sahyog')}
            />
          )}

          {(currentTab === 'vasp-directory') && (
            <VaspDirectoryView
              onPrepareLawfulRequisition={() => setCurrentTab('sahyog')}
            />
          )}

          {(currentTab === 'risk-intelligence' || currentTab === 'risk') && (
            <div className="space-y-6">
              <div className="pb-2 border-b border-[#E2E8F0] dark:border-[#303948]">
                <h1 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-[#F1F5F9] tracking-tight font-sans">
                  Forensic Risk & Heuristic Scoring
                </h1>
                <p className="text-xs text-[#64748B] dark:text-[#A8B3C5] mt-0.5 max-w-3xl leading-relaxed font-sans">
                  Algorithmic behavioral indicators evaluating rapid fund velocity, peeling chains, mixer hops, and high-risk counterparty interactions.
                </p>
              </div>

              <RiskAnalysisView
                riskData={PRIMARY_DEMO_INVESTIGATION.riskAnalysis}
              />
            </div>
          )}

          {(currentTab === 'cross-chain') && (
            <div className="space-y-8">
              <CrossChainAnalysisView
                onInvestigateAddress={handleQuickInvestigate}
              />
              <MultiBlockchainView
                onSelectChainForInvestigation={() => setCurrentTab('wallet-analysis')}
              />
            </div>
          )}

          {(currentTab === 'investigations' || currentTab === 'cases') && (
            <CaseManagement
              cases={cases}
              onCreateCase={handleCreateCase}
              onSelectCase={(id) => setSelectedCaseId(id)}
              onOpenInvestigation={(addr) => {
                handleQuickInvestigate(addr);
              }}
              user={userSession}
              onOpenReport={() => setCurrentTab('reports')}
            />
          )}

          {currentTab === 'alerts' && (
            <AlertsView
              onInvestigateAddress={handleQuickInvestigate}
              onOpenCase={() => setCurrentTab('investigations')}
            />
          )}

          {currentTab === 'reports' && (
            <InvestigationReportView
              investigation={PRIMARY_DEMO_INVESTIGATION}
              activeCase={activeCase}
              user={userSession}
            />
          )}

          {currentTab === 'sahyog' && (
            <SahyogIntegrationView
              user={userSession}
              activeCase={activeCase}
            />
          )}

          {currentTab === 'api' && (
            <div className="space-y-8">
              <MultiBlockchainView
                onSelectChainForInvestigation={() => setCurrentTab('wallet-analysis')}
              />
              <ApiIntegrationsView />
            </div>
          )}

          {currentTab === 'settings' && (
            <SettingsView
              user={userSession}
              onUpdateUser={(updated) => setUserSession(updated)}
            />
          )}
        </main>

        {/* Global Statutory Disclaimer Footer */}
        <footer className="border-t border-[#E2E8F0] dark:border-[#303948] bg-white dark:bg-[#171C26] py-3.5 px-6 text-center text-xs text-[#64748B] dark:text-[#A8B3C5] font-sans transition-colors">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <span className="font-medium text-[#172033] dark:text-[#F1F5F9]">
              CryptoTrace — Blockchain Intelligence & VASP Attribution Platform
            </span>
            <span className="text-[#94A3B8] dark:text-[#7F8DA3] text-[11px]">
              Public Ledger Analytics Only · Strict Chain-of-Custody & Investigator Verification Required
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
