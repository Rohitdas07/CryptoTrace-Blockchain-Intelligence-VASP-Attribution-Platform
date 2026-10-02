import { Blockchain, WalletInvestigationResult } from '../types';
import { PRIMARY_DEMO_WALLET, DEMO_PRESET_WALLETS } from '../data/wallets';
import { MOCK_TRANSACTIONS } from '../data/transactions';

export const walletService = {
  async analyzeWallet(
    address: string,
    network: Blockchain = 'Ethereum',
    caseId?: string,
    depth: number = 3
  ): Promise<WalletInvestigationResult> {
    // Simulate network delay for realistic LEA intelligence query
    await new Promise((resolve) => setTimeout(resolve, 800));

    const cleanAddress = address.trim();

    // Specific network adaptations for simulated realism
    if (network === 'Tron' || cleanAddress.startsWith('T')) {
      return {
        ...PRIMARY_DEMO_WALLET,
        walletAddress: cleanAddress,
        blockchain: 'Tron',
        totalTransactions: 86,
        incomingTransactions: 60,
        outgoingTransactions: 26,
        totalIncoming: '1,450,000 USDT',
        totalOutgoing: '1,420,000 USDT',
        estimatedBalance: '30,000 USDT',
        riskLevel: 'Critical',
        attribution: {
          ...PRIMARY_DEMO_WALLET.attribution,
          entityName: 'Example Custodial Wallet Service',
          entityType: 'Custodial Wallet',
          blockchain: 'Tron',
          depositAddress: cleanAddress,
          confidenceScore: 88,
          totalTransferredToVasp: '850,000 USDT',
          jurisdictionEstimate: 'Singapore / MAS Regulated (Demo)'
        },
        transactions: MOCK_TRANSACTIONS.filter(t => t.network === 'Tron' || t.asset === 'USDT')
      };
    }

    if (network === 'Bitcoin' || cleanAddress.startsWith('bc1') || cleanAddress.startsWith('1')) {
      return {
        ...PRIMARY_DEMO_WALLET,
        walletAddress: cleanAddress,
        blockchain: 'Bitcoin',
        totalTransactions: 34,
        incomingTransactions: 22,
        outgoingTransactions: 12,
        totalIncoming: '14.28 BTC (~$920,000)',
        totalOutgoing: '14.10 BTC (~$908,000)',
        estimatedBalance: '0.18 BTC (~$11,600)',
        riskLevel: 'High',
        attribution: {
          ...PRIMARY_DEMO_WALLET.attribution,
          entityName: 'Example Global VASP',
          entityType: 'Centralized Exchange',
          blockchain: 'Bitcoin',
          depositAddress: 'bc1q9x405g02w92lsl5q3d6s0k3a129f9e710291f2',
          confidenceScore: 94,
          totalTransferredToVasp: '8.45 BTC',
          jurisdictionEstimate: 'United States / FinCEN Regulated (Demo)'
        },
        transactions: MOCK_TRANSACTIONS.filter(t => t.network === 'Bitcoin')
      };
    }

    // Default Ethereum analysis
    return {
      ...PRIMARY_DEMO_WALLET,
      walletAddress: cleanAddress || PRIMARY_DEMO_WALLET.walletAddress,
      blockchain: network,
      transactions: MOCK_TRANSACTIONS
    };
  },

  getPresets() {
    return DEMO_PRESET_WALLETS;
  }
};
