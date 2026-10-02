import { ReportConfig } from '../types';

export interface SavedReportItem {
  id: string;
  title: string;
  reportType: ReportConfig['reportType'];
  caseId: string;
  walletAddress: string;
  generatedAt: string;
  digest: string;
  investigator: string;
  sizeKb: number;
}

export const MOCK_SAVED_REPORTS: SavedReportItem[] = [
  {
    id: 'REP-2026-881',
    title: 'Complete Investigation Dossier – CipherHydra',
    reportType: 'Complete Investigation Report',
    caseId: 'CASE-2026-001',
    walletAddress: '0x7a3F82C9E4B188e0a300d68b6F3512a868a891F2',
    generatedAt: '2026-09-28 15:45:10 UTC',
    digest: '9e41b088f12a884391e0a918270192830018a10291f28019a18290382910fa76',
    investigator: 'Inspector R. Sharma (Badge #LE-4402)',
    sizeKb: 482
  },
  {
    id: 'REP-2026-720',
    title: 'VASP Attribution & Sweep Analysis – GoldenTriangle',
    reportType: 'VASP Attribution Report',
    caseId: 'CASE-2026-002',
    walletAddress: 'TYs5Fz39Q5k91nVaXb8kNmPxJ8m4VqW7aZ',
    generatedAt: '2026-09-27 19:30:00 UTC',
    digest: '2b910fa769e41b088f12a884391e0a918270192830018a10291f28019a182903',
    investigator: 'Deputy Director V. Menon (Badge #LE-3810)',
    sizeKb: 290
  },
  {
    id: 'REP-2026-614',
    title: 'Risk Intelligence & Mixer Hop Analysis – Darknet Peel',
    reportType: 'Risk Intelligence Report',
    caseId: 'CASE-2026-004',
    walletAddress: 'bc1q9x405g02w92lsl5q3d6s0k3a129f9e710291f2',
    generatedAt: '2026-09-26 14:15:22 UTC',
    digest: '88f12a884391e0a918270192830018a10291f28019a18290382910fa769e41b0',
    investigator: 'Inspector P. Roy (Badge #LE-4419)',
    sizeKb: 315
  }
];
