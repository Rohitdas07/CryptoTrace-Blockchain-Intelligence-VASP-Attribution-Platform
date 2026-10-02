import { VaspDirectoryRecord, CrossChainFlowRecord, NearestVaspAttribution } from '../types';
import { MOCK_VASP_DIRECTORY, MOCK_CROSS_CHAIN_FLOWS } from '../data/vasps';
import { PRIMARY_DEMO_WALLET } from '../data/wallets';

export const vaspService = {
  async getDirectory(params?: {
    search?: string;
    network?: string;
    type?: string;
    risk?: string;
  }): Promise<VaspDirectoryRecord[]> {
    await new Promise((r) => setTimeout(r, 120));

    let data = [...MOCK_VASP_DIRECTORY];

    if (params?.search?.trim()) {
      const q = params.search.toLowerCase();
      data = data.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.region.toLowerCase().includes(q) ||
          v.complianceContact.toLowerCase().includes(q)
      );
    }

    if (params?.type && params.type !== 'All') {
      data = data.filter((v) => v.type === params.type);
    }

    if (params?.risk && params.risk !== 'All') {
      data = data.filter((v) => v.riskCategory === params.risk);
    }

    return data;
  },

  async getVaspById(id: string): Promise<VaspDirectoryRecord | undefined> {
    await new Promise((r) => setTimeout(r, 80));
    return MOCK_VASP_DIRECTORY.find((v) => v.id === id);
  },

  async getNearestAttribution(walletAddress: string): Promise<NearestVaspAttribution> {
    await new Promise((r) => setTimeout(r, 200));
    return PRIMARY_DEMO_WALLET.attribution;
  },

  async getCrossChainFlows(): Promise<CrossChainFlowRecord[]> {
    await new Promise((r) => setTimeout(r, 100));
    return MOCK_CROSS_CHAIN_FLOWS;
  }
};
