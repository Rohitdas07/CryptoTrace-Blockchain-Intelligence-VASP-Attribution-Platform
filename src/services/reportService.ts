import { ReportConfig } from '../types';
import { MOCK_SAVED_REPORTS, SavedReportItem } from '../data/reports';

export const reportService = {
  async getSavedReports(): Promise<SavedReportItem[]> {
    await new Promise((r) => setTimeout(r, 100));
    return MOCK_SAVED_REPORTS;
  },

  async generateReport(config: ReportConfig, caseId: string, walletAddress: string): Promise<SavedReportItem> {
    await new Promise((r) => setTimeout(r, 700));

    const newReport: SavedReportItem = {
      id: `REP-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: `${config.reportType} – Generated Dossier`,
      reportType: config.reportType,
      caseId,
      walletAddress,
      generatedAt: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
      digest: '7a190fa769e41b088f12a884391e0a918270192830018a10291f28019a182903',
      investigator: 'Inspector R. Sharma (Badge #LE-4402)',
      sizeKb: 360
    };

    return newReport;
  }
};
