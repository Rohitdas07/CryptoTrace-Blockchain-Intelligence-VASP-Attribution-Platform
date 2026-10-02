import { VaspDirectoryRecord, CrossChainFlowRecord } from '../types';

export const MOCK_VASP_DIRECTORY: VaspDirectoryRecord[] = [
  {
    id: 'vasp-1',
    name: 'Example Exchange (Global)',
    type: 'Centralized Exchange',
    region: 'Seychelles / International Desk',
    supportedNetworks: ['Ethereum', 'Bitcoin', 'Tron', 'BNB Chain', 'Solana', 'Polygon'],
    entityStatus: 'Active',
    riskCategory: 'Low',
    lastUpdated: '2026-09-28',
    depositClusteringAccuracy: 94.2,
    complianceContact: 'compliance-lea@example-exchange-demo.int',
    knownDepositWalletsCount: 14209
  },
  {
    id: 'vasp-2',
    name: 'Example Custodial Wallet Service',
    type: 'Custodial Wallet',
    region: 'Singapore / MAS Compliant',
    supportedNetworks: ['Tron', 'Ethereum', 'Bitcoin'],
    entityStatus: 'Active',
    riskCategory: 'Low',
    lastUpdated: '2026-09-25',
    depositClusteringAccuracy: 91.8,
    complianceContact: 'legal-requests@custodial-wallet-demo.int',
    knownDepositWalletsCount: 8430
  },
  {
    id: 'vasp-3',
    name: 'Example APAC Digital Asset Broker',
    type: 'Broker',
    region: 'Hong Kong SAR',
    supportedNetworks: ['Ethereum', 'BNB Chain', 'Polygon'],
    entityStatus: 'Active',
    riskCategory: 'Medium',
    lastUpdated: '2026-09-20',
    depositClusteringAccuracy: 88.5,
    complianceContact: 'subpoena@apac-broker-demo.int',
    knownDepositWalletsCount: 3910
  },
  {
    id: 'vasp-4',
    name: 'Example PeerPay Gateway',
    type: 'Payment Provider',
    region: 'Cyprus / EU MiCA Licensed',
    supportedNetworks: ['Bitcoin', 'Ethereum', 'Polygon'],
    entityStatus: 'Active',
    riskCategory: 'Low',
    lastUpdated: '2026-09-15',
    depositClusteringAccuracy: 93.0,
    complianceContact: 'lea-inquiries@peerpay-demo.int',
    knownDepositWalletsCount: 5120
  },
  {
    id: 'vasp-5',
    name: 'Example Offshore OTC Liquidity Hub',
    type: 'Other VASP',
    region: 'Vanuatu / High-Risk Jurisdiction',
    supportedNetworks: ['Tron', 'Ethereum', 'Bitcoin'],
    entityStatus: 'Under Observation',
    riskCategory: 'High',
    lastUpdated: '2026-09-27',
    depositClusteringAccuracy: 76.4,
    complianceContact: 'unverified-desk@offshore-otc-demo.int',
    knownDepositWalletsCount: 1240
  },
  {
    id: 'vasp-6',
    name: 'Example High-Frequency Crypto Desk',
    type: 'Centralized Exchange',
    region: 'Dubai / VARA Regulated',
    supportedNetworks: ['Solana', 'Ethereum', 'Bitcoin', 'Polygon'],
    entityStatus: 'Active',
    riskCategory: 'Low',
    lastUpdated: '2026-09-28',
    depositClusteringAccuracy: 95.1,
    complianceContact: 'government-relations@hft-crypto-demo.int',
    knownDepositWalletsCount: 18920
  }
];

export const MOCK_CROSS_CHAIN_FLOWS: CrossChainFlowRecord[] = [
  {
    id: 'cc-1',
    sourceChain: 'Ethereum',
    targetChain: 'Polygon',
    bridgeName: 'Polygon PoS Bridge Router',
    depositAddress: '0x4d8a11F0c84B29E3060b94321A169FaE56A0d884',
    destinationVasp: 'Example Exchange (Polygon Hub)',
    amount: '28.00 ETH (~$95,200)',
    token: 'WETH',
    timestamp: '2026-09-28 14:52:10 UTC',
    txHash: '0xab41991c00291920039198127019283019283019283019283019283019283019',
    risk: 'High',
    status: 'Completed'
  },
  {
    id: 'cc-2',
    sourceChain: 'Tron',
    targetChain: 'BNB Chain',
    bridgeName: 'deBridge Cross-Chain Engine',
    depositAddress: '0x9920192830192830192830192830192830192830',
    destinationVasp: 'Example APAC Digital Asset Broker',
    amount: '350,000 USDT',
    token: 'USDT-BSC',
    timestamp: '2026-09-27 19:12:00 UTC',
    txHash: '0x9910029192830192830192830192830192830192830192830192830192830192',
    risk: 'High',
    status: 'Completed'
  },
  {
    id: 'cc-3',
    sourceChain: 'Bitcoin',
    targetChain: 'Ethereum',
    bridgeName: 'Threshold Network tBTC Mint',
    depositAddress: '0x1102919283019283019283019283019283019283',
    destinationVasp: 'Example Custodial Wallet Service',
    amount: '4.20 BTC (~$270,900)',
    token: 'tBTC',
    timestamp: '2026-09-26 12:44:19 UTC',
    txHash: '0x7720192830192830192830192830192830192830192830192830192830192830',
    risk: 'Medium',
    status: 'Completed'
  },
  {
    id: 'cc-4',
    sourceChain: 'Solana',
    targetChain: 'Ethereum',
    bridgeName: 'Wormhole Portal Bridge',
    depositAddress: '0x4490192830192830192830192830192830192830',
    destinationVasp: 'Example High-Frequency Crypto Desk',
    amount: '1,850 SOL (~$277,500)',
    token: 'whSOL',
    timestamp: '2026-09-25 08:15:33 UTC',
    txHash: '0x4420192830192830192830192830192830192830192830192830192830192830',
    risk: 'Medium',
    status: 'Completed'
  }
];

export { MOCK_SAHYOG_REQUESTS } from './mockData';
