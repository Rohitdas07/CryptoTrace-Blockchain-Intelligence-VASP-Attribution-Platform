export type Blockchain = 
  | 'Ethereum' 
  | 'Bitcoin' 
  | 'BNB Chain' 
  | 'Tron' 
  | 'Solana' 
  | 'Polygon';

export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical' | 'Review Required';

export type CaseStatus = 
  | 'Active'
  | 'Under Review'
  | 'Awaiting Information'
  | 'Closed'
  | 'Open'
  | 'Under Investigation'
  | 'VASP Identified'
  | 'Report Generated';

export type CasePriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export type EntityType = 
  | 'Centralized Exchange' 
  | 'Custodial Wallet' 
  | 'P2P Platform' 
  | 'OTC Desk' 
  | 'DeFi Protocol' 
  | 'Cross-Chain Bridge' 
  | 'Privacy Mixer' 
  | 'Broker'
  | 'Payment Provider'
  | 'Unidentified Wallet';

export type AddressType = 
  | 'Deposit Address' 
  | 'Hot Wallet' 
  | 'Consolidation Wallet' 
  | 'Cold Storage' 
  | 'Smart Contract' 
  | 'Intermediary Hop';

export interface UserSession {
  officerId: string;
  officerName: string;
  agency: string;
  badgeNumber: string;
  clearanceLevel: string;
  authenticatedAt: string;
}

export interface NearestVaspAttribution {
  entityName: string;
  entityType: EntityType;
  addressType: AddressType;
  blockchain: Blockchain;
  confidenceScore: number; // 0 - 100
  detectionMethod?: string; // e.g. "Sweep Clustering & Heuristic Consolidation"
  connectionType: 'Direct Deposit Path' | 'Multi-Hop Cluster' | 'Consolidation Tree' | 'Bridge Exit Hop' | string;
  hopsCount: number;
  totalTransferredToVasp: string;
  attributionDisclaimer: string;
  depositAddress: string;
  firstObservedDeposit?: string;
  lastObservedDeposit?: string;
  lastIdentifiedTx?: string;
  relatedTransactionsCount?: number;
  jurisdictionEstimate?: string;
  countryRegion?: string;
}

export interface RiskIndicator {
  id: string;
  name: string;
  severity: RiskLevel;
  description: string;
  detectedDetail: string;
  ruleCategory: 
    | 'Fraud' 
    | 'Ransomware' 
    | 'Darknet' 
    | 'Mixer' 
    | 'High-Risk VASP' 
    | 'Cross-Chain' 
    | 'Rapid Movement' 
    | 'Suspicious Pattern'
    | 'Layering'
    | 'Velocity'
    | 'Sanction/HighRisk'
    | 'Obfuscation';
}

export interface RiskAnalysisData {
  overallRisk: RiskLevel;
  riskScore: number; // 0 - 100
  reviewRequired: boolean;
  indicators: RiskIndicator[];
  analystNotes: string;
  disclaimer: string;
}

export interface FlowNode {
  id: string;
  label: string;
  address: string;
  entityType: string;
  type: 'suspicious' | 'normal' | 'exchange' | 'bridge' | 'mixer' | 'deposit';
  amount: string;
  timestamp: string;
  riskStatus: RiskLevel;
  txCount: number;
  hopLevel: number;
  notes?: string;
  x?: number;
  y?: number;
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  amount: string;
  txHash: string;
  timestamp: string;
  direction?: 'inbound' | 'outbound';
}

export interface TransactionRecord {
  id: string;
  txHash: string;
  timestamp?: string;
  from: string;
  to: string;
  network?: Blockchain;
  amount: string;
  asset?: string;
  token?: string;
  direction?: 'Inbound' | 'Outbound' | 'Internal';
  entityType?: EntityType;
  entity?: string;
  risk: RiskLevel;
  status: 'Confirmed' | 'Pending' | 'Flagged' | string;
  fee?: string;
  blockNumber?: number;
  dateTime?: string;
}

export interface WalletInvestigationResult {
  walletAddress: string;
  blockchain: Blockchain;
  firstSeen: string;
  lastActivity: string;
  totalTransactions: number;
  incomingTransactions?: number;
  outgoingTransactions?: number;
  totalIncoming: string;
  totalOutgoing: string;
  estimatedBalance?: string;
  currentBalance?: string;
  riskLevel?: RiskLevel;
  investigationStatus?: 'Active' | 'Under Review' | 'Awaiting Information' | 'Closed' | string;
  status?: string;
  attribution: NearestVaspAttribution;
  riskAnalysis: RiskAnalysisData;
  flowNodes: FlowNode[];
  flowEdges: FlowEdge[];
  transactions: TransactionRecord[];
  tags: string[];
}

export interface CaseItem {
  caseId: string;
  caseName: string;
  leadInvestigator: string;
  agency: string;
  priority?: CasePriority;
  walletsCount: number;
  primaryWallet: string;
  blockchain: Blockchain;
  vaspMatches?: number;
  vaspStatus?: string;
  nearestVaspName?: string;
  risk: RiskLevel;
  lastUpdated: string;
  status: CaseStatus;
  incidentType: string;
  summary: string;
  evidenceItemsCount?: number;
}

export interface AlertItem {
  id: string;
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  time: string;
  wallet: string;
  network: Blockchain;
  caseId: string;
  description: string;
  status: 'New' | 'Investigating' | 'Reviewed' | 'Dismissed';
  type: 
    | 'high_risk_wallet' 
    | 'vasp_match' 
    | 'suspicious_movement' 
    | 'cross_chain' 
    | 'mixer_interaction' 
    | 'high_value' 
    | 'new_activity';
}

export interface VaspDirectoryRecord {
  id: string;
  name: string;
  type: 'Centralized Exchange' | 'Custodial Wallet' | 'Broker' | 'Payment Provider' | 'Other VASP' | string;
  region: string;
  supportedNetworks: Blockchain[];
  entityStatus: 'Active' | 'Under Observation' | 'Sanctioned / High Risk' | string;
  riskCategory: 'Low' | 'Medium' | 'High' | string;
  lastUpdated: string;
  depositClusteringAccuracy: number;
  complianceContact: string;
  knownDepositWalletsCount: number;
}

export interface VaspDirectoryEntry {
  id: string;
  entity: string;
  name?: string;
  type?: string;
  blockchain: Blockchain;
  jurisdiction: string;
  address: string;
  addressType?: string;
  confidenceScore?: number;
  confidence?: number;
  status: string;
  lastAudit?: string;
  complianceEmail?: string;
  complianceContact?: string;
}

export interface BlockchainNetworkMetric {
  blockchain: Blockchain;
  analyzedWallets: number;
  transactionsLogged: number;
  identifiedVaspClusters?: number;
  vaspAttributionsCount?: number;
  avgConfidence?: number;
  activeNodesTracked?: number;
  highRiskCount?: number;
  nodeStatus?: string;
  status?: string;
  description?: string;
}

export interface ApiEndpointItem {
  id?: string;
  name?: string;
  method: string;
  path?: string;
  endpoint?: string;
  description: string;
  latencyMs: number;
  sampleResponse: any;
  sampleRequest?: any;
  status?: string;
  lastSync?: string;
}

export interface CrossChainFlowRecord {
  id: string;
  sourceChain: Blockchain;
  targetChain: Blockchain;
  bridgeName: string;
  depositAddress: string;
  destinationVasp: string;
  amount: string;
  token: string;
  timestamp: string;
  txHash: string;
  risk: RiskLevel;
  status: 'Completed' | 'Pending Relayer' | 'Flagged';
}

export interface SahyogRequestRecord {
  requestId: string;
  caseId: string;
  vaspName: string;
  walletAddress?: string;
  targetWallet?: string;
  depositAddress?: string;
  txHash?: string;
  requestType?: 'Account KYC Disclosure' | 'Asset Freeze Request' | 'Transaction Lineage Subpoena' | 'Urgent Preservation Notice' | string;
  investigationReference?: string;
  officerDetails?: string;
  legalProvision: string;
  jurisdictionAuthority: string;
  urgencyLevel: 'Standard' | 'Urgent' | 'Emergency Preservation' | string;
  status: 'Draft' | 'Submitted to SAHYOG (Demo)' | 'Acknowledged' | 'Pending VASP Response' | string;
  timestamp: string;
  evidencePackageSummary: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'alert' | 'vasp' | 'report' | 'system' | 'sync';
  referenceId?: string;
}

export interface ReportConfig {
  reportType: 
    | 'Wallet Analysis Report' 
    | 'VASP Attribution Report' 
    | 'Transaction Flow Report' 
    | 'Risk Intelligence Report' 
    | 'Complete Investigation Report';
  includeGraph: boolean;
  includeVasp: boolean;
  includeRisk: boolean;
  includeTxTable: boolean;
  includeTimeline: boolean;
  customNotes?: string;
}

export type NavTab = 
  | 'dashboard'
  | 'investigations'
  | 'wallet-analysis'
  | 'explorer'
  | 'vasp-attribution'
  | 'risk-intelligence'
  | 'cross-chain'
  | 'reports'
  | 'alerts'
  | 'vasp-directory'
  | 'settings';
