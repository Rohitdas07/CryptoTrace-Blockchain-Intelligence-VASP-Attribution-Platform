import { CaseItem } from '../types';

export const MOCK_CASES: CaseItem[] = [
  {
    caseId: 'CASE-2026-001',
    caseName: 'Operation CipherHydra – Hospital Ransomware Extortion',
    leadInvestigator: 'Inspector R. Sharma (Badge #LE-4402)',
    agency: 'National Cyber Crime Coordination Centre (N4C)',
    priority: 'Urgent',
    walletsCount: 4,
    primaryWallet: '0x7a3F82C9E4B188e0a300d68b6F3512a868a891F2',
    blockchain: 'Ethereum',
    vaspMatches: 1,
    risk: 'Critical',
    lastUpdated: '12 mins ago',
    status: 'Active',
    incidentType: 'Ransomware Extortion',
    summary: 'Healthcare IT network encrypted by BlackCat/ALPHV affiliate; 184.5 ETH extortion payment transferred. Funds identified passing through intermediary hops into Example Exchange deposit address.',
    evidenceItemsCount: 8
  },
  {
    caseId: 'CASE-2026-002',
    caseName: 'GoldenTriangle Pig-Butchering Investment Fraud Ring',
    leadInvestigator: 'Deputy Director V. Menon (Badge #LE-3810)',
    agency: 'Special Operations Cyber Taskforce (SOCT)',
    priority: 'High',
    walletsCount: 9,
    primaryWallet: 'TYs5Fz39Q5k91nVaXb8kNmPxJ8m4VqW7aZ',
    blockchain: 'Tron',
    vaspMatches: 2,
    risk: 'High',
    lastUpdated: '1 hour ago',
    status: 'Active',
    incidentType: 'Pig Butchering / Investment Fraud',
    summary: 'Organized syndicate defrauding retail investors through fraudulent algorithmic trading application. Layered USDT sweeps attributed to offshore VASP deposit clusters in Southeast Asia.',
    evidenceItemsCount: 14
  },
  {
    caseId: 'CASE-2026-003',
    caseName: 'Fintech API Treasury Drain & Smart Contract Exploit',
    leadInvestigator: 'Sr. Forensic Analyst K. Rao (Badge #LE-5519)',
    agency: 'Financial Intelligence Unit - Special Division',
    priority: 'Medium',
    walletsCount: 3,
    primaryWallet: '0x8894e01928301928301928301928301928301928',
    blockchain: 'BNB Chain',
    vaspMatches: 1,
    risk: 'High',
    lastUpdated: '3 hours ago',
    status: 'Under Review',
    incidentType: 'Smart Contract Exploit',
    summary: 'Compromised admin keys utilized to execute unauthorized treasury drain. Funds swapped via decentralised liquidity pools and routed toward centralized OTC desks.',
    evidenceItemsCount: 6
  },
  {
    caseId: 'CASE-2026-004',
    caseName: 'Darknet Vendor HydraViper Bitcoin Peeling Chain',
    leadInvestigator: 'Inspector P. Roy (Badge #LE-4419)',
    agency: 'Narcotics Control & Cyber Forensic Wing',
    priority: 'Medium',
    walletsCount: 6,
    primaryWallet: 'bc1q9x405g02w92lsl5q3d6s0k3a129f9e710291f2',
    blockchain: 'Bitcoin',
    vaspMatches: 1,
    risk: 'High',
    lastUpdated: '1 day ago',
    status: 'Awaiting Information',
    incidentType: 'Illicit Darknet Flow',
    summary: 'Peeling chain containing 8.4 BTC from darknet marketplace illicit substance sales traced to a known FinCEN-registered exchange deposit hub.',
    evidenceItemsCount: 11
  },
  {
    caseId: 'CASE-2026-005',
    caseName: 'Cross-Chain Bridge Drainer & SIM Swap Extortion',
    leadInvestigator: 'Inspector A. Verma (Badge #LE-4890)',
    agency: 'State Cyber Crime Investigation Cell',
    priority: 'Low',
    walletsCount: 2,
    primaryWallet: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    blockchain: 'Solana',
    vaspMatches: 1,
    risk: 'Medium',
    lastUpdated: '2 days ago',
    status: 'Closed',
    incidentType: 'Corporate Account Takeover',
    summary: 'SIM-swap attack on high-net-worth individual. Stolen assets bridged across Wormhole and frozen through cooperative VASP emergency request.',
    evidenceItemsCount: 5
  }
];

export const MOCK_TIMELINE_EVENTS = [
  {
    time: '2026-09-28 14:10 UTC',
    title: 'Extortion Payment Confirmed on Public Ledger',
    description: '184.50 ETH transferred from Victim Organization Treasury to Suspect Wallet 0x7a3F...91F2.',
    badge: 'Inflow Detected',
    iconType: 'alert'
  },
  {
    time: '2026-09-28 14:25 UTC',
    title: 'Obfuscation via Mixer Detected',
    description: '32.50 ETH split and routed through unhosted privacy smart contract protocol.',
    badge: 'Mixer Interaction',
    iconType: 'mixer'
  },
  {
    time: '2026-09-28 14:38 UTC',
    title: 'Layering Hop 1 Identified',
    description: '152.00 ETH shifted to Intermediary Wallet Alpha (0x9B11...A811).',
    badge: 'Layering Hop',
    iconType: 'hop'
  },
  {
    time: '2026-09-28 14:52 UTC',
    title: 'Cross-Chain Bridge Lock Event',
    description: '28.00 ETH deposited to Polygon PoS Bridge contract 0xA0c...881F.',
    badge: 'Cross-Chain',
    iconType: 'bridge'
  },
  {
    time: '2026-09-28 15:10 UTC',
    title: 'VASP Deposit Address Sweep Matched',
    description: '142.80 ETH swept into deposit address 0x4d8...d884, attributed to Example Exchange with 92% confidence.',
    badge: 'VASP Attributed',
    iconType: 'vasp'
  },
  {
    time: '2026-09-28 15:35 UTC',
    title: 'Investigator Review Initiated',
    description: 'Lead Investigator Inspector R. Sharma opened forensic docket CASE-2026-001.',
    badge: 'Investigator Action',
    iconType: 'review'
  }
];
