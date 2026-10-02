import { AlertItem } from '../types';

export const MOCK_ALERTS: AlertItem[] = [
  {
    id: 'ALT-2026-901',
    title: 'High-Risk Wallet Active on Ethereum',
    severity: 'Critical',
    time: '8 mins ago',
    wallet: '0x7a3F82C9E4B188e0a300d68b6F3512a868a891F2',
    network: 'Ethereum',
    caseId: 'CASE-2026-001',
    description: 'Suspicious sudden consolidation of 142.8 ETH towards known centralized VASP deposit endpoint.',
    status: 'New',
    type: 'high_risk_wallet'
  },
  {
    id: 'ALT-2026-902',
    title: 'Nearest VASP Match Identified (92% Confidence)',
    severity: 'High',
    time: '14 mins ago',
    wallet: '0x4d8a11F0c84B29E3060b94321A169FaE56A0d884',
    network: 'Ethereum',
    caseId: 'CASE-2026-001',
    description: 'Algorithmic sweep pattern matches Example Exchange deposit cluster with 92% statistical confidence.',
    status: 'Investigating',
    type: 'vasp_match'
  },
  {
    id: 'ALT-2026-903',
    title: 'Privacy Mixer Interaction Detected',
    severity: 'Critical',
    time: '35 mins ago',
    wallet: '0x7a3F82C9E4B188e0a300d68b6F3512a868a891F2',
    network: 'Ethereum',
    caseId: 'CASE-2026-001',
    description: '32.50 ETH routed into unhosted privacy protocol to obscure downstream transactional provenance.',
    status: 'Reviewed',
    type: 'mixer_interaction'
  },
  {
    id: 'ALT-2026-904',
    title: 'Cross-Chain Transfer Bridge Lock Detected',
    severity: 'High',
    time: '1 hour ago',
    wallet: '0xA0c68C638235ee3E6772ee9ab2b8b9812A7C881F',
    network: 'Polygon',
    caseId: 'CASE-2026-001',
    description: '28.00 ETH locked in Polygon Bridge router for cross-network conversion.',
    status: 'New',
    type: 'cross_chain'
  },
  {
    id: 'ALT-2026-905',
    title: 'High-Value USDT Layering Movement',
    severity: 'High',
    time: '2 hours ago',
    wallet: 'TYs5Fz39Q5k91nVaXb8kNmPxJ8m4VqW7aZ',
    network: 'Tron',
    caseId: 'CASE-2026-002',
    description: '450,000 USDT moved across two newly generated intermediary addresses in 120 seconds.',
    status: 'Investigating',
    type: 'high_value'
  },
  {
    id: 'ALT-2026-906',
    title: 'Rapid Peeling Chain Hop Flagged',
    severity: 'Medium',
    time: '5 hours ago',
    wallet: 'bc1q9x405g02w92lsl5q3d6s0k3a129f9e710291f2',
    network: 'Bitcoin',
    caseId: 'CASE-2026-004',
    description: 'Incremental UTXO change outputs swept through four consecutive wallets.',
    status: 'Reviewed',
    type: 'suspicious_movement'
  }
];
