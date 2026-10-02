import { 
  Blockchain, 
  WalletInvestigationResult, 
  CaseItem, 
  VaspDirectoryEntry, 
  SahyogRequestRecord, 
  NotificationItem, 
  BlockchainNetworkMetric,
  ApiEndpointItem
} from '../types';

export const INITIAL_SUMMARY_METRICS = {
  activeCases: 24,
  walletsAnalyzed: 1284,
  vaspConnectionsFound: 186,
  highRiskCases: 37,
};

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'VASP Match Identified',
    message: 'Deposit cluster matched with Example Exchange for address 0x7a3F...91F2 with 92% analytical confidence.',
    timestamp: '12 minutes ago',
    read: false,
    type: 'vasp',
    referenceId: 'CASE-2026-001'
  },
  {
    id: 'notif-2',
    title: 'High-Risk Rapid Velocity Alert',
    message: 'Wallet 0x91b2...44d1 executed 8 cross-hop dispersals within 4 minutes. Review required.',
    timestamp: '48 minutes ago',
    read: false,
    type: 'alert',
    referenceId: '0x91b2'
  },
  {
    id: 'notif-3',
    title: 'Investigation Report Generated',
    message: 'Formal preliminary forensic report compiled for Case CASE-2026-001 (Ransomware Funnel).',
    timestamp: '2 hours ago',
    read: true,
    type: 'report',
    referenceId: 'REP-2026-881'
  },
  {
    id: 'notif-4',
    title: 'Ledger API Sync Completed',
    message: 'Ethereum & BNB Chain node indexers synced with height #21049281. Zero latency anomalies.',
    timestamp: '3 hours ago',
    read: true,
    type: 'sync'
  },
  {
    id: 'notif-5',
    title: 'SAHYOG Notice Status Update',
    message: 'Notice #SAHYOG-REQ-2026-092 validated by internal compliance desk. Ready for judicial transmission.',
    timestamp: '5 hours ago',
    read: true,
    type: 'system',
    referenceId: 'SAHYOG-REQ-2026-092'
  }
];

export const PRIMARY_DEMO_INVESTIGATION: WalletInvestigationResult = {
  walletAddress: '0x7a3F82C9E4B188e0a300d68b6F3512a868a891F2',
  blockchain: 'Ethereum',
  firstSeen: '2026-08-14 04:12:09 UTC',
  lastActivity: '2026-09-30 21:44:31 UTC',
  totalTransactions: 128,
  totalIncoming: '142.850 ETH (~$385,695)',
  totalOutgoing: '139.120 ETH (~$375,624)',
  currentBalance: '3.730 ETH (~$10,071)',
  status: 'Under Investigation',
  tags: ['Suspected Ransomware Layering', 'Multi-Hop Egress', 'VASP Candidate'],
  attribution: {
    entityName: 'Example Exchange',
    entityType: 'Centralized Exchange',
    addressType: 'Deposit Address',
    blockchain: 'Ethereum',
    confidenceScore: 92,
    connectionType: 'Direct Deposit Path',
    hopsCount: 3,
    totalTransferredToVasp: '42.85 ETH',
    depositAddress: '0x4d8a11F0c84B29E3060b94321A169FaE56A0d884',
    lastIdentifiedTx: '0xTXN82A1f9042b781bc09a3c11e2f893110de82a1',
    jurisdictionEstimate: 'Registered VASP / FATF Compliant Entity (Demo)',
    attributionDisclaimer: 'Analytical attribution — investigator verification required. Attribution represents high-confidence algorithmic clustering based on public blockchain topology and deposit sweep mechanics. Do not present attribution as legal proof of account ownership.',
  },
  riskAnalysis: {
    overallRisk: 'Review Required',
    riskScore: 84,
    reviewRequired: true,
    disclaimer: 'Risk indicators are analytical signals and require investigator verification prior to formal statutory notices or judicial freezing orders.',
    analystNotes: 'Target address received initial ransom funding via multi-signature sweep. Split into 3 intermediate consolidation nodes, then funneled via an obfuscated deposit contract into an Example Exchange sweeping cluster.',
    indicators: [
      {
        id: 'ri-1',
        name: 'Multiple Intermediary Wallets',
        severity: 'High',
        description: 'Layering pattern observed utilizing 4 serial non-custodial intermediate hops to dilute transactional lineage.',
        detectedDetail: 'Hops: Primary -> Intermediary A -> Intermediary B -> Sweep Collector',
        ruleCategory: 'Layering',
      },
      {
        id: 'ri-2',
        name: 'Rapid Fund Movement (Velocity)',
        severity: 'High',
        description: 'Inbound funds disbursed within 180 seconds of confirmation across multiple concurrent child branches.',
        detectedDetail: 'Median dwell time: 2.4 minutes across 12 consecutive transactions',
        ruleCategory: 'Velocity',
      },
      {
        id: 'ri-3',
        name: 'Interaction with Known High-Risk Address',
        severity: 'Review Required',
        description: 'Direct upstream counterparty 0x31b...c91 was flagged in Interpol Cyber Notice 2026/08.',
        detectedDetail: 'Direct receipt of 28.5 ETH on 2026-09-12',
        ruleCategory: 'Sanction/HighRisk',
      },
      {
        id: 'ri-4',
        name: 'Cross-Chain Movement Signal',
        severity: 'Medium',
        description: 'Counterparty wallet communicated with a synthetic cross-chain bridge contract before final routing.',
        detectedDetail: 'Intermediary Hop B emitted lock event on Synapse Router',
        ruleCategory: 'Cross-Chain',
      },
      {
        id: 'ri-5',
        name: 'Interaction with Bridge / Routing Router',
        severity: 'Medium',
        description: 'Fund lineage includes interaction with bridge liquidity contracts (0xBridgeRouter).',
        detectedDetail: '14.2 ETH bridged to Polygon child wallet',
        ruleCategory: 'Obfuscation',
      },
      {
        id: 'ri-6',
        name: 'Large-Value Structured Transfer',
        severity: 'High',
        description: 'Structured outbound transfers deliberately kept below 10 ETH thresholds within tight intervals.',
        detectedDetail: '8 consecutive transfers of exactly 9.85 ETH each',
        ruleCategory: 'Layering',
      }
    ]
  },
  flowNodes: [
    {
      id: 'node-suspicious',
      label: 'Suspicious Wallet',
      address: '0x7a3F82C9E4B188e0a300d68b6F3512a868a891F2',
      entityType: 'Subject of Investigation',
      type: 'suspicious',
      amount: '142.85 ETH',
      timestamp: '2026-09-28 14:10 UTC',
      riskStatus: 'Review Required',
      txCount: 128,
      hopLevel: 0,
      notes: 'Initial consolidation address from victim payment gateway.',
      x: 60,
      y: 180
    },
    {
      id: 'node-inter-a',
      label: 'Intermediate Wallet A',
      address: '0x228dA93C98145aB32014bdfB02919F0429a1b12A',
      entityType: 'Unidentified Layering Hop',
      type: 'normal',
      amount: '68.50 ETH',
      timestamp: '2026-09-28 14:18 UTC',
      riskStatus: 'High',
      txCount: 42,
      hopLevel: 1,
      notes: 'Dispersal wallet created 1 hour prior to transaction flow.',
      x: 280,
      y: 80
    },
    {
      id: 'node-inter-b',
      label: 'Intermediate Wallet B',
      address: '0x991E24d081f9b1772cA0839818bcfE124110029b',
      entityType: 'Pass-through Address',
      type: 'normal',
      amount: '54.20 ETH',
      timestamp: '2026-09-28 14:26 UTC',
      riskStatus: 'Medium',
      txCount: 19,
      hopLevel: 2,
      notes: 'Rapid pass-through with no remaining balance.',
      x: 500,
      y: 80
    },
    {
      id: 'node-mixer',
      label: 'Privacy Mixer Hop',
      address: '0xMixerPool4812a819bFa391209bca3981b2110c41',
      entityType: 'Privacy Protocol / Mixer',
      type: 'mixer',
      amount: '20.15 ETH',
      timestamp: '2026-09-28 14:35 UTC',
      riskStatus: 'High',
      txCount: 3820,
      hopLevel: 1,
      notes: 'Diverted partial proceeds into privacy pool for obfuscation.',
      x: 280,
      y: 300
    },
    {
      id: 'node-bridge',
      label: 'Cross-Chain Bridge',
      address: '0xBridgeGatewayRouter88192A019b8821901a182b81',
      entityType: 'Cross-Chain Bridge',
      type: 'bridge',
      amount: '14.20 ETH',
      timestamp: '2026-09-28 15:02 UTC',
      riskStatus: 'Medium',
      txCount: 14209,
      hopLevel: 2,
      notes: 'Bridged asset lock; synthetic counterpart minted on Polygon.',
      x: 500,
      y: 300
    },
    {
      id: 'node-deposit',
      label: 'Deposit Address',
      address: '0x4d8a11F0c84B29E3060b94321A169FaE56A0d884',
      entityType: 'Attributed VASP Deposit',
      type: 'deposit',
      amount: '42.85 ETH',
      timestamp: '2026-09-28 15:40 UTC',
      riskStatus: 'Review Required',
      txCount: 8,
      hopLevel: 3,
      notes: 'Dedicated user deposit address sweeps directly into Known VASP Hot Wallet.',
      x: 740,
      y: 80
    },
    {
      id: 'node-vasp',
      label: 'Known VASP (Example Exchange)',
      address: '0xExampleExchangeHotWallet0001889a710129bcfa',
      entityType: 'Centralized Exchange (VASP)',
      type: 'exchange',
      amount: '42.85 ETH Swept',
      timestamp: '2026-09-28 16:15 UTC',
      riskStatus: 'Low',
      txCount: 89410,
      hopLevel: 4,
      notes: 'Identified consolidation cluster of Example Exchange. Target for SAHYOG Lawful Notice.',
      x: 980,
      y: 180
    }
  ],
  flowEdges: [
    {
      id: 'edge-1',
      source: 'node-suspicious',
      target: 'node-inter-a',
      amount: '68.50 ETH',
      txHash: '0xTXN10A1f884210982710bb92a18820019280a911',
      timestamp: '2026-09-28 14:18 UTC'
    },
    {
      id: 'edge-2',
      source: 'node-suspicious',
      target: 'node-mixer',
      amount: '20.15 ETH',
      txHash: '0xTXN10B2b1928371900192ba871290bb002919c02',
      timestamp: '2026-09-28 14:35 UTC'
    },
    {
      id: 'edge-3',
      source: 'node-inter-a',
      target: 'node-inter-b',
      amount: '54.20 ETH',
      txHash: '0xTXN10C3c881290382910fa761928300182811d03',
      timestamp: '2026-09-28 14:26 UTC'
    },
    {
      id: 'edge-4',
      source: 'node-inter-a',
      target: 'node-bridge',
      amount: '14.20 ETH',
      txHash: '0xTXN10D4d990182910283ea651829038291011e04',
      timestamp: '2026-09-28 15:02 UTC'
    },
    {
      id: 'edge-5',
      source: 'node-inter-b',
      target: 'node-deposit',
      amount: '42.85 ETH',
      txHash: '0xTXN82A1f9042b781bc09a3c11e2f893110de82a1',
      timestamp: '2026-09-28 15:40 UTC'
    },
    {
      id: 'edge-6',
      source: 'node-deposit',
      target: 'node-vasp',
      amount: '42.85 ETH',
      txHash: '0xSWEEP99A10029192003919812701928301928301',
      timestamp: '2026-09-28 16:15 UTC'
    }
  ],
  transactions: [
    {
      id: 'tx-1',
      txHash: '0xTXN82A1f9042b781bc09a3c11e2f893110de82a1',
      from: '0x991E24d081f9b1772cA0839818bcfE124110029b',
      to: '0x4d8a11F0c84B29E3060b94321A169FaE56A0d884',
      amount: '42.8500 ETH',
      token: 'ETH',
      dateTime: '2026-09-28 15:40:12 UTC',
      status: 'Confirmed',
      entity: 'Example Exchange (Deposit)',
      risk: 'Review Required',
      fee: '0.0034 ETH',
      blockNumber: 21048192
    },
    {
      id: 'tx-2',
      txHash: '0xTXN10D4d990182910283ea651829038291011e04',
      from: '0x228dA93C98145aB32014bdfB02919F0429a1b12A',
      to: '0xBridgeGatewayRouter88192A019b8821901a182b81',
      amount: '14.2000 ETH',
      token: 'ETH',
      dateTime: '2026-09-28 15:02:44 UTC',
      status: 'Confirmed',
      entity: 'Cross-Chain Bridge Gateway',
      risk: 'Medium',
      fee: '0.0048 ETH',
      blockNumber: 21048090
    },
    {
      id: 'tx-3',
      txHash: '0xTXN10B2b1928371900192ba871290bb002919c02',
      from: '0x7a3F82C9E4B188e0a300d68b6F3512a868a891F2',
      to: '0xMixerPool4812a819bFa391209bca3981b2110c41',
      amount: '20.1500 ETH',
      token: 'ETH',
      dateTime: '2026-09-28 14:35:10 UTC',
      status: 'Flagged',
      entity: 'Privacy Pool Contract',
      risk: 'High',
      fee: '0.0082 ETH',
      blockNumber: 21047980
    },
    {
      id: 'tx-4',
      txHash: '0xTXN10C3c881290382910fa761928300182811d03',
      from: '0x228dA93C98145aB32014bdfB02919F0429a1b12A',
      to: '0x991E24d081f9b1772cA0839818bcfE124110029b',
      amount: '54.2000 ETH',
      token: 'ETH',
      dateTime: '2026-09-28 14:26:19 UTC',
      status: 'Confirmed',
      entity: 'Pass-through Address',
      risk: 'High',
      fee: '0.0021 ETH',
      blockNumber: 21047910
    },
    {
      id: 'tx-5',
      txHash: '0xTXN10A1f884210982710bb92a18820019280a911',
      from: '0x7a3F82C9E4B188e0a300d68b6F3512a868a891F2',
      to: '0x228dA93C98145aB32014bdfB02919F0429a1b12A',
      amount: '68.5000 ETH',
      token: 'ETH',
      dateTime: '2026-09-28 14:18:05 UTC',
      status: 'Confirmed',
      entity: 'Intermediate Layering Hop',
      risk: 'High',
      fee: '0.0022 ETH',
      blockNumber: 21047870
    },
    {
      id: 'tx-6',
      txHash: '0xTXN01FEED910283019280a18270192001928019a00',
      from: '0x31bc910291029301928019a001928019200192aa',
      to: '0x7a3F82C9E4B188e0a300d68b6F3512a868a891F2',
      amount: '142.8500 ETH',
      token: 'ETH',
      dateTime: '2026-09-28 14:10:00 UTC',
      status: 'Flagged',
      entity: 'Suspected Cyber Extortion Source',
      risk: 'Review Required',
      fee: '0.0019 ETH',
      blockNumber: 21047820
    }
  ]
};

export const ALTERNATE_PRESETS: Record<string, { label: string; address: string; blockchain: Blockchain; description: string }> = {
  preset1: {
    label: 'Primary Sample: Ransomware Extraction -> VASP',
    address: '0x7a3F82C9E4B188e0a300d68b6F3512a868a891F2',
    blockchain: 'Ethereum',
    description: '3-hop multi-branch funnel into Example Exchange deposit address.'
  },
  preset2: {
    label: 'Preset 2: Cross-chain Bridge Hop & OTC Desk',
    address: 'TYs5Fz39Q5k91nVaXb8kNmPxJ8m4VqW7aZ',
    blockchain: 'Tron',
    description: 'TRC-20 USDT rapid layering directed to Example Custodial Service.'
  },
  preset3: {
    label: 'Preset 3: Darknet Market Consolidation (Bitcoin)',
    address: 'bc1q9x405g02w92lsl5q3d6s0k3a129f9e710291f2',
    blockchain: 'Bitcoin',
    description: 'Peeling chain transaction path culminating in Example VASP deposit cluster.'
  },
  preset4: {
    label: 'Preset 4: BSC Token Drainer Hop (BNB Chain)',
    address: '0x55d398326f99059fF775485246999027B3197955',
    blockchain: 'BNB Chain',
    description: 'High-frequency flash loan interaction routing through liquidity pools.'
  }
};

export const MOCK_CASES: CaseItem[] = [
  {
    caseId: 'CASE-2026-001',
    caseName: 'Operation CipherHydra – Health Network Ransomware',
    agency: 'Central Cyber Crime Division',
    walletsCount: 6,
    primaryWallet: '0x7a3F82C9E4B188e0a300d68b6F3512a868a891F2',
    blockchain: 'Ethereum',
    risk: 'Review Required',
    vaspStatus: 'Identified',
    nearestVaspName: 'Example Exchange',
    lastUpdated: '2026-10-01 07:15 UTC',
    status: 'VASP Identified',
    leadInvestigator: 'Inspector R. Sharma (Badge #LE-4402)',
    incidentType: 'Ransomware Extortion',
    summary: 'Ransom proceeds split through intermediate nodes; attribution confirmed to Example Exchange deposit address 0x4d8a...d884.'
  },
  {
    caseId: 'CASE-2026-002',
    caseName: 'Fintech API Key Exfiltration & Drain',
    agency: 'National Cyber Forensic Unit',
    walletsCount: 14,
    primaryWallet: 'TYs5Fz39Q5k91nVaXb8kNmPxJ8m4VqW7aZ',
    blockchain: 'Tron',
    risk: 'High',
    vaspStatus: 'Identified',
    nearestVaspName: 'Example Custodial Service',
    lastUpdated: '2026-09-30 19:40 UTC',
    status: 'Under Investigation',
    leadInvestigator: 'Officer K. Vance (Badge #NC-819)',
    incidentType: 'Corporate Account Takeover',
    summary: 'Unauthorized USDT transfer across multi-sig contract; flow actively monitored towards designated deposit pool.'
  },
  {
    caseId: 'CASE-2026-003',
    caseName: 'Investment Impersonation Syndicate Flow',
    agency: 'Economic Offences Wing',
    walletsCount: 22,
    primaryWallet: 'bc1q9x405g02w92lsl5q3d6s0k3a129f9e710291f2',
    blockchain: 'Bitcoin',
    risk: 'High',
    vaspStatus: 'Pending Analysis',
    nearestVaspName: 'Example VASP',
    lastUpdated: '2026-09-29 11:12 UTC',
    status: 'Open',
    leadInvestigator: 'Sr. Investigator M. Thorne (Badge #EO-1109)',
    incidentType: 'Pig Butchering / Investment Fraud',
    summary: 'Victim funds funneled into high-velocity peeling chains across unhosted Bitcoin addresses.'
  },
  {
    caseId: 'CASE-2026-004',
    caseName: 'State Infrastructure Distributed Denial Extortion',
    agency: 'Cyber Defense Directorate',
    walletsCount: 4,
    primaryWallet: '0x889a1029192001928a0192801928019280192801',
    blockchain: 'BNB Chain',
    risk: 'Medium',
    vaspStatus: 'Identified',
    nearestVaspName: 'Example Exchange',
    lastUpdated: '2026-09-27 16:50 UTC',
    status: 'Report Generated',
    leadInvestigator: 'Officer D. Chen (Badge #CD-332)',
    incidentType: 'Critical Infrastructure Extortion',
    summary: 'Formal preliminary forensic report compiled and digitally countersigned for judicial requisition.'
  },
  {
    caseId: 'CASE-2026-005',
    caseName: 'DeFi Flash Arbitrage Siphon Investigation',
    agency: 'Financial Crimes Enforcement Cell',
    walletsCount: 9,
    primaryWallet: '0x442b019280192801928019280192801928019280',
    blockchain: 'Polygon',
    risk: 'Low',
    vaspStatus: 'Identified',
    nearestVaspName: 'Meridian Vaults Ltd (Demo)',
    lastUpdated: '2026-09-20 09:25 UTC',
    status: 'Closed',
    leadInvestigator: 'Capt. A. Nair (Badge #FC-901)',
    incidentType: 'Smart Contract Exploit',
    summary: 'Restitution finalized via coordinated compliance desk hold. File closed.'
  }
];

export const MOCK_VASP_DIRECTORY: VaspDirectoryEntry[] = [
  {
    id: 'vasp-1',
    address: '0x4d8a11F0c84B29E3060b94321A169FaE56A0d884',
    blockchain: 'Ethereum',
    entity: 'Example Exchange',
    addressType: 'Deposit Address',
    confidence: 92,
    jurisdiction: 'EU / Registered VASP',
    complianceContact: 'compliance-lea@example-exchange-demo.internal',
    status: 'Verified'
  },
  {
    id: 'vasp-2',
    address: '0xExampleExchangeHotWallet0001889a710129bcfa',
    blockchain: 'Ethereum',
    entity: 'Example Exchange',
    addressType: 'Hot Wallet',
    confidence: 99,
    jurisdiction: 'EU / Registered VASP',
    complianceContact: 'compliance-lea@example-exchange-demo.internal',
    status: 'Verified'
  },
  {
    id: 'vasp-3',
    address: 'TYs5Fz39Q5k91nVaXb8kNmPxJ8m4VqW7aZ',
    blockchain: 'Tron',
    entity: 'Example Custodial Service',
    addressType: 'Deposit Address',
    confidence: 88,
    jurisdiction: 'Singapore / MAS Compliant (Demo)',
    complianceContact: 'lea-inquiries@custodial-demo.internal',
    status: 'Verified'
  },
  {
    id: 'vasp-4',
    address: 'bc1q9x405g02w92lsl5q3d6s0k3a129f9e710291f2',
    blockchain: 'Bitcoin',
    entity: 'Example VASP',
    addressType: 'Consolidation Wallet',
    confidence: 94,
    jurisdiction: 'United States / FinCEN MSB (Demo)',
    complianceContact: 'law-enforcement@example-vasp-demo.internal',
    status: 'Verified'
  },
  {
    id: 'vasp-5',
    address: '0xNovaDexLiquidityPool0019280192801928019280',
    blockchain: 'BNB Chain',
    entity: 'NovaDex Liquidity Protocol (Demo)',
    addressType: 'Smart Contract',
    confidence: 85,
    jurisdiction: 'Decentralized / Non-Custodial',
    complianceContact: 'security@novadex-demo.internal',
    status: 'Under Review'
  },
  {
    id: 'vasp-6',
    address: '0xZenithCapitalVaults99102910291029102910291',
    blockchain: 'Polygon',
    entity: 'Zenith Capital Custody (Demo)',
    addressType: 'Cold Storage',
    confidence: 96,
    jurisdiction: 'United Kingdom / FCA Reg (Demo)',
    complianceContact: 'lea-desk@zenith-demo.internal',
    status: 'Verified'
  },
  {
    id: 'vasp-7',
    address: 'SolVaspClusterDepositAddress9910291029102910',
    blockchain: 'Solana',
    entity: 'Pacific Digital Assets (Demo VASP)',
    addressType: 'Deposit Address',
    confidence: 90,
    jurisdiction: 'Australia / AUSTRAC Reg (Demo)',
    complianceContact: 'lawenforcement@pacific-crypto-demo.internal',
    status: 'Verified'
  }
];

export const BLOCKCHAIN_METRICS: BlockchainNetworkMetric[] = [
  {
    blockchain: 'Ethereum',
    analyzedWallets: 512,
    transactionsLogged: 42109,
    identifiedVaspClusters: 74,
    avgConfidence: 91,
    activeNodesTracked: 18,
    status: 'Active'
  },
  {
    blockchain: 'Bitcoin',
    analyzedWallets: 340,
    transactionsLogged: 31802,
    identifiedVaspClusters: 48,
    avgConfidence: 89,
    activeNodesTracked: 14,
    status: 'Active'
  },
  {
    blockchain: 'BNB Chain',
    analyzedWallets: 184,
    transactionsLogged: 19480,
    identifiedVaspClusters: 29,
    avgConfidence: 87,
    activeNodesTracked: 11,
    status: 'Active'
  },
  {
    blockchain: 'Tron',
    analyzedWallets: 132,
    transactionsLogged: 16900,
    identifiedVaspClusters: 22,
    avgConfidence: 93,
    activeNodesTracked: 9,
    status: 'Active'
  },
  {
    blockchain: 'Solana',
    analyzedWallets: 68,
    transactionsLogged: 8450,
    identifiedVaspClusters: 8,
    avgConfidence: 84,
    activeNodesTracked: 7,
    status: 'Active'
  },
  {
    blockchain: 'Polygon',
    analyzedWallets: 48,
    transactionsLogged: 5210,
    identifiedVaspClusters: 5,
    avgConfidence: 86,
    activeNodesTracked: 6,
    status: 'Active'
  }
];

export const MOCK_SAHYOG_REQUESTS: SahyogRequestRecord[] = [
  {
    requestId: 'SAHYOG-REQ-2026-001',
    caseId: 'CASE-2026-001',
    vaspName: 'Example Exchange',
    targetWallet: '0x7a3F82C9E4B188e0a300d68b6F3512a868a891F2',
    depositAddress: '0x4d8a11F0c84B29E3060b94321A169FaE56A0d884',
    legalProvision: 'Section 91 CrPC / Section 69B IT Act / Cyber Requisition Order',
    jurisdictionAuthority: 'Cyber Crime Police Station, Central District',
    urgencyLevel: 'Urgent',
    status: 'Submitted to SAHYOG (Demo)',
    timestamp: '2026-10-01 06:30 UTC',
    evidencePackageSummary: 'Hash list, transaction graph topology, analytical attribution report, deposit sweep proof (42.85 ETH).'
  },
  {
    requestId: 'SAHYOG-REQ-2026-002',
    caseId: 'CASE-2026-002',
    vaspName: 'Example Custodial Service',
    targetWallet: 'TYs5Fz39Q5k91nVaXb8kNmPxJ8m4VqW7aZ',
    depositAddress: 'TYs5Fz39Q5k91nVaXb8kNmPxJ8m4VqW7aZ',
    legalProvision: 'Statutory Information Request / Section 102 Cyber Injunction',
    jurisdictionAuthority: 'State Cyber Cell Unit 4',
    urgencyLevel: 'Emergency Preservation',
    status: 'Acknowledged',
    timestamp: '2026-09-30 18:15 UTC',
    evidencePackageSummary: 'USDT TRC-20 tracking trace, intermediate contract hops, destination account preservation request.'
  }
];

export const MOCK_API_ENDPOINTS: ApiEndpointItem[] = [
  {
    id: 'api-investigate',
    name: 'Wallet Investigation Service',
    endpoint: '/api/investigate',
    method: 'POST',
    status: 'Operational',
    latencyMs: 142,
    lastSync: '10 seconds ago',
    description: 'Accepts wallet address and target blockchain, queries indexed node clusters, and returns topological summary.',
    sampleRequest: {
      address: '0x7a3F82C9E4B188e0a300d68b6F3512a868a891F2',
      blockchain: 'Ethereum',
      depth: 4,
      includeTokens: true
    },
    sampleResponse: {
      success: true,
      address: '0x7a3F82C9E4B188e0a300d68b6F3512a868a891F2',
      blockchain: 'Ethereum',
      totalTransactions: 128,
      status: 'Under Investigation',
      firstSeen: '2026-08-14T04:12:09Z',
      lastActivity: '2026-09-30T21:44:31Z'
    }
  },
  {
    id: 'api-transactions',
    name: 'Transaction Ledger Query',
    endpoint: '/api/transactions',
    method: 'GET',
    status: 'Operational',
    latencyMs: 118,
    lastSync: '25 seconds ago',
    description: 'Retrieves chronological transaction logs with entity tagging and heuristic risk annotations.',
    sampleRequest: {
      address: '0x7a3F82C9E4B188e0a300d68b6F3512a868a891F2',
      page: 1,
      limit: 20
    },
    sampleResponse: {
      recordsFound: 128,
      data: [
        {
          txHash: '0xTXN82A1f9042b781bc09a3c11e2f893110de82a1',
          amount: '42.8500 ETH',
          risk: 'Review Required'
        }
      ]
    }
  },
  {
    id: 'api-vasp-attribution',
    name: 'VASP Nearest Attribution Engine',
    endpoint: '/api/vasp-attribution',
    method: 'POST',
    status: 'Operational',
    latencyMs: 210,
    lastSync: '1 minute ago',
    description: 'Executes clustering algorithms against known exchange hot/deposit wallet databases to find closest VASP touchpoint.',
    sampleRequest: {
      sourceAddress: '0x7a3F82C9E4B188e0a300d68b6F3512a868a891F2',
      maxHops: 5,
      clusteringAlgorithm: 'sweep-deposit-match'
    },
    sampleResponse: {
      identifiedVasp: 'Example Exchange',
      addressType: 'Deposit Address',
      confidenceScore: 92,
      hopsCount: 3,
      transferredAmount: '42.85 ETH',
      disclaimer: 'Analytical attribution — investigator verification required'
    }
  },
  {
    id: 'api-risk-analysis',
    name: 'Risk & Heuristic Scoring Engine',
    endpoint: '/api/risk-analysis',
    method: 'POST',
    status: 'Operational',
    latencyMs: 165,
    lastSync: '40 seconds ago',
    description: 'Evaluates rapid fund dispersion, peeling chains, mixer interaction, and darknet linkages.',
    sampleRequest: {
      address: '0x7a3F82C9E4B188e0a300d68b6F3512a868a891F2',
      heuristics: ['layering', 'velocity', 'mixer', 'bridge']
    },
    sampleResponse: {
      overallRisk: 'Review Required',
      riskScore: 84,
      detectedIndicators: 6
    }
  },
  {
    id: 'api-reports',
    name: 'Forensic PDF & JSON Exporter',
    endpoint: '/api/reports',
    method: 'POST',
    status: 'Operational',
    latencyMs: 310,
    lastSync: '3 minutes ago',
    description: 'Generates courtroom-ready cryptographic chain-of-custody report documentation.',
    sampleRequest: {
      caseId: 'CASE-2026-001',
      format: 'pdf',
      includeSignatures: true
    },
    sampleResponse: {
      reportId: 'REP-2026-881',
      generatedAt: '2026-10-01T08:30:00Z',
      sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    }
  }
];

export const BLOCKCHAIN_APIS = [
  {
    name: 'Ethereum Data API',
    network: 'Ethereum Mainnet',
    status: 'Operational',
    latency: '82 ms',
    lastSync: '10 sec ago',
    blockHeight: '21,048,290',
    healthScore: 99.8
  },
  {
    name: 'Bitcoin Data API',
    network: 'Bitcoin Core v26',
    status: 'Operational',
    latency: '114 ms',
    lastSync: '42 sec ago',
    blockHeight: '891,440',
    healthScore: 99.4
  },
  {
    name: 'BNB Chain API',
    network: 'BNB Smart Chain',
    status: 'Operational',
    latency: '76 ms',
    lastSync: '8 sec ago',
    blockHeight: '43,109,218',
    healthScore: 99.9
  },
  {
    name: 'Tron API',
    network: 'Tron Grid Fullnode',
    status: 'Operational',
    latency: '94 ms',
    lastSync: '15 sec ago',
    blockHeight: '65,920,119',
    healthScore: 99.1
  },
  {
    name: 'Solana API',
    network: 'Solana RPC Cluster',
    status: 'Operational',
    latency: '135 ms',
    lastSync: '12 sec ago',
    blockHeight: '298,120,490',
    healthScore: 98.7
  },
  {
    name: 'Polygon API',
    network: 'Polygon PoS Bor',
    status: 'Operational',
    latency: '68 ms',
    lastSync: '5 sec ago',
    blockHeight: '62,810,940',
    healthScore: 99.9
  }
];
