import { CaseItem } from '../types';
import { MOCK_CASES, MOCK_TIMELINE_EVENTS } from '../data/investigations';

export const investigationService = {
  async getCases(params?: { search?: string; status?: string }): Promise<CaseItem[]> {
    await new Promise((r) => setTimeout(r, 100));

    let list = [...MOCK_CASES];

    if (params?.search?.trim()) {
      const q = params.search.toLowerCase();
      list = list.filter(
        (c) =>
          c.caseId.toLowerCase().includes(q) ||
          c.caseName.toLowerCase().includes(q) ||
          c.primaryWallet.toLowerCase().includes(q) ||
          c.agency.toLowerCase().includes(q) ||
          c.leadInvestigator.toLowerCase().includes(q)
      );
    }

    if (params?.status && params.status !== 'All') {
      list = list.filter((c) => c.status === params.status);
    }

    return list;
  },

  async getCaseById(caseId: string): Promise<CaseItem | undefined> {
    await new Promise((r) => setTimeout(r, 80));
    return MOCK_CASES.find((c) => c.caseId.toLowerCase() === caseId.toLowerCase());
  },

  async getTimeline(caseId: string) {
    await new Promise((r) => setTimeout(r, 80));
    return MOCK_TIMELINE_EVENTS;
  },

  async createCase(data: Partial<CaseItem>): Promise<CaseItem> {
    await new Promise((r) => setTimeout(r, 300));
    const newCase: CaseItem = {
      caseId: `CASE-2026-00${MOCK_CASES.length + 1}`,
      caseName: data.caseName || 'Untitled Investigation',
      leadInvestigator: data.leadInvestigator || 'Inspector R. Sharma (Badge #LE-4402)',
      agency: data.agency || 'National Cyber Crime Coordination Centre (N4C)',
      priority: data.priority || 'Medium',
      walletsCount: 1,
      primaryWallet: data.primaryWallet || '',
      blockchain: data.blockchain || 'Ethereum',
      vaspMatches: 1,
      risk: data.risk || 'High',
      lastUpdated: 'Just now',
      status: 'Active',
      incidentType: data.incidentType || 'General Fraud',
      summary: data.summary || 'Initial cyber investigation docket initialized.',
      evidenceItemsCount: 1
    };
    return newCase;
  }
};
