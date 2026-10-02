import { TransactionRecord } from '../types';
import { MOCK_TRANSACTIONS } from '../data/transactions';

export interface TransactionFilterParams {
  search?: string;
  network?: string;
  risk?: string;
  status?: string;
  direction?: string;
  page?: number;
  pageSize?: number;
  sortField?: keyof TransactionRecord;
  sortOrder?: 'asc' | 'desc';
}

export const transactionService = {
  async getTransactions(params: TransactionFilterParams = {}): Promise<{
    data: TransactionRecord[];
    total: number;
    page: number;
    pageSize: number;
  }> {
    await new Promise((r) => setTimeout(r, 150));

    let results = [...MOCK_TRANSACTIONS];

    if (params.search?.trim()) {
      const q = params.search.toLowerCase();
      results = results.filter(
        (t) =>
          t.txHash.toLowerCase().includes(q) ||
          t.from.toLowerCase().includes(q) ||
          t.to.toLowerCase().includes(q) ||
          (t.asset || t.token || '').toLowerCase().includes(q)
      );
    }

    if (params.network && params.network !== 'All') {
      results = results.filter((t) => t.network === params.network);
    }

    if (params.risk && params.risk !== 'All') {
      results = results.filter((t) => t.risk === params.risk);
    }

    if (params.status && params.status !== 'All') {
      results = results.filter((t) => t.status === params.status);
    }

    if (params.direction && params.direction !== 'All') {
      results = results.filter((t) => t.direction === params.direction);
    }

    // Sort
    const sortField = params.sortField || 'timestamp';
    const sortOrder = params.sortOrder || 'desc';
    results.sort((a, b) => {
      const valA = (a as any)[sortField];
      const valB = (b as any)[sortField];
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    const page = params.page || 1;
    const pageSize = params.pageSize || 10;
    const startIndex = (page - 1) * pageSize;
    const paginated = results.slice(startIndex, startIndex + pageSize);

    return {
      data: paginated,
      total: results.length,
      page,
      pageSize
    };
  },

  async getTransactionByHash(hash: string): Promise<TransactionRecord | undefined> {
    await new Promise((r) => setTimeout(r, 100));
    return MOCK_TRANSACTIONS.find((t) => t.txHash.toLowerCase() === hash.toLowerCase());
  }
};
