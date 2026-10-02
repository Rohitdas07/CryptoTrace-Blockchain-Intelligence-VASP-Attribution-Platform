import { AlertItem } from '../types';
import { MOCK_ALERTS } from '../data/alerts';

export const alertService = {
  async getAlerts(params?: { severity?: string; status?: string; search?: string }): Promise<AlertItem[]> {
    await new Promise((r) => setTimeout(r, 100));

    let data = [...MOCK_ALERTS];

    if (params?.search?.trim()) {
      const q = params.search.toLowerCase();
      data = data.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.wallet.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.caseId.toLowerCase().includes(q)
      );
    }

    if (params?.severity && params.severity !== 'All') {
      data = data.filter((a) => a.severity === params.severity);
    }

    if (params?.status && params.status !== 'All') {
      data = data.filter((a) => a.status === params.status);
    }

    return data;
  }
};
