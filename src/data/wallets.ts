import { WalletInvestigationResult } from '../types';

export const PRIMARY_DEMO_WALLET: WalletInvestigationResult = {
  walletAddress: '0x7a3F82C9E4B188e0a300d68b6F3512a868a891F2',
  blockchain: 'Ethereum',
  firstSeen: '2025-11-14 04:12:08 UTC',
  lastActivity: '2026-09-28 19:42:15 UTC',
  totalTransactions: 142,
  incomingTransactions: 98,
  outgoingTransactions: 44,
  totalIncoming: '184.50 ETH (~$627,300)',
  totalOutgoing: '182.15 ETH (~$619,310)',
  estimatedBalance: '2.35 ETH (~$7,990)',
  riskLevel: 'High',
  investigationStatus: 'Active',
  attribution: {
    entityName: 'Example Exchange (Centralized VASP)',
    entityType: 'Centralized Exchange',
    addressType: 'Deposit Address',
    blockchain: 'Ethereum',
    confidenceScore: 92,
    detectionMethod: 'Deterministic Deposit Sweep Clustering & Heuristic Consolidation',
    connectionType: 'Direct Deposit Path',
    hopsCount: 2,
    totalTransferredToVasp: '142.80 ETH (~$485,520)',
    attributionDisclaimer: 'Simulated Intelligence Result — Analytical attribution based on deterministic sweep patterns. Investigator verification required.',
    depositAddress: '0x4d8a11F0c84B29E3060b94321A169FaE56A0d884',
    firstObservedDeposit: '2026-01-10 11:24:00 UTC',
    lastObservedDeposit: '2026-09-28 19:42:15 UTC',
    relatedTransactionsCount: 28,
    jurisdictionEstimate: 'Seychelles / Global Compliance Desk',
    countryRegion: 'Seychelles (Registered Operations)'
  },
  riskAnalysis: {
    overallRisk: 'High',
    riskScore: 87,
    reviewRequired: true,
    indicators: [
      {
        id: 'IND-01',
        name: 'Rapid Multi-Hop Fund Velocity',
        severity: 'Critical',
        description: 'Funds disbursed across 3 serial intermediary addresses within 14 minutes of incoming extortion transfer.',
        detectedDetail: 'Delta T: 840s across 3 addresses',
        ruleCategory: 'Rapid Movement'
      },
      {
        id: 'IND-02',
        name: 'Privacy Mixer Interaction',
        severity: 'High',
        description: '32.5 ETH received directly from a known unhosted smart contract mixer prior to layering.',
        detectedDetail: 'Direct inflow from 0xd90...21c1 (Known Mixer Protocol)',
        ruleCategory: 'Mixer'
      },
      {
        id: 'IND-03',
        name: 'Suspected Ransomware Extraction Nexus',
        severity: 'High',
        description: 'Upstream cluster flagged in Operation CipherHydra health infrastructure attack dossier.',
        detectedDetail: 'Threat Actor Tag: #APT-Hydra-2026',
        ruleCategory: 'Ransomware'
      },
      {
        id: 'IND-04',
        name: 'Structured Exchange Deposit Sweeps',
        severity: 'Medium',
        description: 'Repeated deposits routed to identical VASP deposit contracts, immediately swept to cold storage cluster.',
        detectedDetail: 'VASP Sweep Hash: 0x9a882...10a9',
        ruleCategory: 'High-Risk VASP'
      },
      {
        id: 'IND-05',
        name: 'Cross-Chain Bridge Peeling',
        severity: 'High',
        description: 'Funds bridged via cross-chain lock contract to Polygon network to obscure provenance.',
        detectedDetail: 'Bridge Contract: 0xa0c...881f (Polygon PoS Bridge)',
        ruleCategory: 'Cross-Chain'
      }
    ],
    analystNotes: 'Target wallet demonstrates textbook layering behavior: illicit proceeds received from mixer, fragmented across intermediate wallets, bridged cross-chain, and deposited into Example Exchange deposit address 0x4d8...d884. Immediate lawful preservation requisition recommended.',
    disclaimer: 'Simulated intelligence data generated for prototype demonstration. All indicators, heuristic scores, and attribution parameters are modeled for LEA investigative training and workflow evaluation.'
  },
  flowNodes: [
    {
      id: 'node-suspect',
      label: 'Suspect Wallet (Source)',
      address: '0x7a3F82C9E4B188e0a300d68b6F3512a868a891F2',
      entityType: 'Suspect Controlled Non-Custodial',
      type: 'suspicious',
      amount: '184.50 ETH',
      timestamp: '2026-09-28 14:10:00 UTC',
      riskStatus: 'Critical',
      txCount: 42,
      hopLevel: 0,
      notes: 'Initial extortion payment recipient wallet',
      x: 60,
      y: 160
    },
    {
      id: 'node-mixer',
      label: 'Privacy Mixer Relay',
      address: '0xd90e6420547cd011082191ca9012a912891f21c1',
      entityType: 'Privacy Mixer Smart Contract',
      type: 'mixer',
      amount: '32.50 ETH',
      timestamp: '2026-09-28 14:25:12 UTC',
      riskStatus: 'Critical',
      txCount: 310,
      hopLevel: 1,
      notes: 'Obfuscation pool interaction',
      x: 310,
      y: 60
    },
    {
      id: 'node-inter-a',
      label: 'Intermediary Wallet Alpha',
      address: '0x9B113F09C88a100249cE9923812a01f92881A811',
      entityType: 'Intermediary Layering Wallet',
      type: 'normal',
      amount: '85.20 ETH',
      timestamp: '2026-09-28 14:38:00 UTC',
      riskStatus: 'High',
      txCount: 14,
      hopLevel: 1,
      notes: 'Peeling chain hop 1',
      x: 310,
      y: 260
    },
    {
      id: 'node-bridge',
      label: 'Cross-Chain Bridge Gateway',
      address: '0xA0c68C638235ee3E6772ee9ab2b8b9812A7C881F',
      entityType: 'Polygon PoS Bridge Router',
      type: 'bridge',
      amount: '28.00 ETH',
      timestamp: '2026-09-28 14:52:10 UTC',
      riskStatus: 'High',
      txCount: 1209,
      hopLevel: 2,
      notes: 'Cross-chain egress node',
      x: 580,
      y: 60
    },
    {
      id: 'node-deposit',
      label: 'VASP Deposit Wallet',
      address: '0x4d8a11F0c84B29E3060b94321A169FaE56A0d884',
      entityType: 'Exchange Deposit Address',
      type: 'deposit',
      amount: '142.80 ETH',
      timestamp: '2026-09-28 15:10:00 UTC',
      riskStatus: 'Medium',
      txCount: 28,
      hopLevel: 2,
      notes: 'Deterministic sweep deposit address assigned to suspected account',
      x: 580,
      y: 260
    },
    {
      id: 'node-exchange',
      label: 'Example Exchange (VASP Hot Wallet)',
      address: '0x28C6c06298d514Db089934071355E5743bf21d60',
      entityType: 'Centralized Exchange (VASP)',
      type: 'exchange',
      amount: '142.80 ETH',
      timestamp: '2026-09-28 15:22:30 UTC',
      riskStatus: 'Low',
      txCount: 94820,
      hopLevel: 3,
      notes: 'Internal exchange omnibus hot wallet consolidation',
      x: 850,
      y: 160
    }
  ],
  flowEdges: [
    {
      id: 'edge-1',
      source: 'node-suspect',
      target: 'node-mixer',
      amount: '32.50 ETH',
      txHash: '0x8a92...110a',
      timestamp: '2026-09-28 14:25:12 UTC',
      direction: 'outbound'
    },
    {
      id: 'edge-2',
      source: 'node-suspect',
      target: 'node-inter-a',
      amount: '152.00 ETH',
      txHash: '0x9c01...228f',
      timestamp: '2026-09-28 14:38:00 UTC',
      direction: 'outbound'
    },
    {
      id: 'edge-3',
      source: 'node-mixer',
      target: 'node-bridge',
      amount: '28.00 ETH',
      txHash: '0xab41...991c',
      timestamp: '2026-09-28 14:52:10 UTC',
      direction: 'outbound'
    },
    {
      id: 'edge-4',
      source: 'node-inter-a',
      target: 'node-deposit',
      amount: '142.80 ETH',
      txHash: '0xde88...441e',
      timestamp: '2026-09-28 15:10:00 UTC',
      direction: 'outbound'
    },
    {
      id: 'edge-5',
      source: 'node-deposit',
      target: 'node-exchange',
      amount: '142.80 ETH',
      txHash: '0xff10...002a',
      timestamp: '2026-09-28 15:22:30 UTC',
      direction: 'outbound'
    }
  ],
  transactions: [],
  tags: ['High-Velocity', 'Mixer-Funded', 'Cross-Chain', 'VASP-Deposit-Targeted']
};

export const DEMO_PRESET_WALLETS = [
  {
    label: 'Ethereum Ransomware Extraction',
    address: '0x7a3F82C9E4B188e0a300d68b6F3512a868a891F2',
    network: 'Ethereum' as const,
    risk: 'High' as const,
    suspectedVasp: 'Example Exchange',
    confidence: 92
  },
  {
    label: 'Tron USDT Pig-Butchering Syndicate',
    address: 'TYs5Fz39Q5k91nVaXb8kNmPxJ8m4VqW7aZ',
    network: 'Tron' as const,
    risk: 'Critical' as const,
    suspectedVasp: 'Example Custodial Service',
    confidence: 88
  },
  {
    label: 'Bitcoin Darknet Marketplace Peel',
    address: 'bc1q9x405g02w92lsl5q3d6s0k3a129f9e710291f2',
    network: 'Bitcoin' as const,
    risk: 'High' as const,
    suspectedVasp: 'Example Global VASP',
    confidence: 94
  },
  {
    label: 'Solana Meme-Coin Rug Pull Exfiltration',
    address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    network: 'Solana' as const,
    risk: 'High' as const,
    suspectedVasp: 'Example Solana Brokerage',
    confidence: 85
  },
  {
    label: 'BNB Chain Flash Loan Arbitrage Drain',
    address: '0x8894e01928301928301928301928301928301928',
    network: 'BNB Chain' as const,
    risk: 'Medium' as const,
    suspectedVasp: 'Example APAC Exchange',
    confidence: 79
  }
];
