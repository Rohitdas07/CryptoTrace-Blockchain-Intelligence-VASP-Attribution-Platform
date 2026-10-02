import React, { useState } from 'react';
import { 
  Cpu, 
  Send, 
  Copy, 
  Check, 
  Clock, 
  RefreshCw,
  Code2
} from 'lucide-react';
import { BLOCKCHAIN_APIS, MOCK_API_ENDPOINTS } from '../../data/mockData';
import { ApiEndpointItem } from '../../types';

export const ApiIntegrationsView: React.FC = () => {
  const [endpoints] = useState<ApiEndpointItem[]>(MOCK_API_ENDPOINTS);
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpointItem>(endpoints[0]);
  const [copied, setCopied] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);

  const getPath = (ep: ApiEndpointItem) => ep.endpoint || ep.path || '/api';

  const handleCopyEndpoint = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExecuteMockTest = () => {
    setIsTesting(true);
    setTestResult(null);
    setTimeout(() => {
      setIsTesting(false);
      setTestResult({
        httpStatus: 200,
        statusText: 'OK',
        executionTimeMs: selectedEndpoint.latencyMs,
        data: selectedEndpoint.sampleResponse
      });
    }, 400);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="pb-2 border-b border-[#E2E8F0] dark:border-[#303948]">
        <h1 className="text-xl sm:text-2xl font-bold text-[#172033] dark:text-[#F1F5F9] tracking-tight font-sans">
          Blockchain intelligence APIs & node endpoints
        </h1>
        <p className="text-xs text-[#64748B] dark:text-[#A8B3C5] mt-1 max-w-3xl leading-relaxed font-sans">
          Integrated multi-source public ledger APIs, clustering inference engines, and LEA node connectors for real-time attribution queries.
        </p>
      </div>

      {/* External Intelligence API Providers Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {BLOCKCHAIN_APIS.map((api) => (
          <div key={api.name} className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-4 shadow-xs space-y-3 font-sans">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-md bg-[#F1F5F9] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] flex items-center justify-center text-[#2563EB] dark:text-[#4F8EF7]">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-[#172033] dark:text-[#F1F5F9]">{api.name}</h3>
                  <span className="text-[11px] text-[#64748B] dark:text-[#A8B3C5]">{api.network}</span>
                </div>
              </div>

              <span className="flex items-center gap-1.5 text-[11px] font-sans text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{api.status}</span>
              </span>
            </div>

            <div className="text-xs text-[#64748B] dark:text-[#A8B3C5] flex items-center justify-between font-sans">
              <span>Height: <strong className="text-[#172033] dark:text-[#F1F5F9] font-mono">#{api.blockHeight}</strong></span>
              <span className="text-emerald-700 dark:text-emerald-400 font-medium">{api.healthScore}% SLA</span>
            </div>

            <div className="pt-2.5 border-t border-[#E2E8F0] dark:border-[#303948] flex items-center justify-between text-xs text-[#64748B] dark:text-[#A8B3C5] font-sans">
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#94A3B8] dark:text-[#7F8DA3]" />
                <span>{api.latency} latency</span>
              </div>
              <div className="text-[11px]">
                {api.lastSync}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive API Explorer & Sandbox */}
      <div className="bg-white dark:bg-[#1B212C] border border-[#E2E8F0] dark:border-[#303948] rounded-lg p-5 shadow-xs space-y-5 font-sans">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0] dark:border-[#303948]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Code2 className="w-4 h-4 text-[#2563EB] dark:text-[#4F8EF7]" />
              <span className="text-xs font-semibold text-[#2563EB] dark:text-[#4F8EF7] font-sans">
                LEA intelligence REST interface
              </span>
            </div>
            <h2 className="text-base font-bold text-[#172033] dark:text-[#F1F5F9] font-sans">
              Interactive endpoint sandbox
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#64748B] dark:text-[#A8B3C5] font-sans">Select endpoint:</span>
            <select
              value={getPath(selectedEndpoint)}
              onChange={(e) => {
                const ep = endpoints.find(x => getPath(x) === e.target.value);
                if (ep) {
                  setSelectedEndpoint(ep);
                  setTestResult(null);
                }
              }}
              className="px-3 py-1.5 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md text-xs font-mono text-[#172033] dark:text-[#F1F5F9] focus:outline-hidden cursor-pointer"
            >
              {endpoints.map(ep => (
                <option key={getPath(ep)} value={getPath(ep)}>
                  {ep.method} {getPath(ep)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Endpoint Details */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-[#F8FAFC] dark:bg-[#202734] border border-[#E2E8F0] dark:border-[#303948] rounded-md font-sans text-xs">
            <div className="flex items-center gap-2.5 truncate">
              <span className="px-2 py-0.5 rounded font-semibold text-xs bg-blue-50 border border-blue-200 text-blue-700 dark:bg-blue-950/60 dark:border-blue-900 dark:text-[#4F8EF7]">
                {selectedEndpoint.method}
              </span>
              <span className="text-[#172033] dark:text-[#F1F5F9] font-mono text-xs truncate">
                https://api.cryptotrace.lea.internal/v1{getPath(selectedEndpoint)}
              </span>
            </div>

            <button
              onClick={() => handleCopyEndpoint(`https://api.cryptotrace.lea.internal/v1${getPath(selectedEndpoint)}`)}
              className="p-1.5 text-slate-400 hover:text-[#2563EB] dark:hover:text-[#4F8EF7] transition-colors shrink-0 cursor-pointer rounded hover:bg-slate-200/50 dark:hover:bg-[#252D3A]"
              title="Copy endpoint URI"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <p className="text-xs text-[#475569] dark:text-[#A8B3C5] font-sans leading-relaxed">
            {selectedEndpoint.description}
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExecuteMockTest}
              disabled={isTesting}
              className="px-3.5 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-md text-xs font-semibold shadow-xs flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50 font-sans"
            >
              {isTesting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Executing query...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send test request</span>
                </>
              )}
            </button>
          </div>

          {/* Test Response Output Window */}
          {testResult && (
            <div className="space-y-2 text-xs font-sans">
              <div className="flex items-center justify-between text-[11px] text-[#64748B] dark:text-[#A8B3C5]">
                <span className="flex items-center gap-2">
                  <span>Status: <strong className="text-emerald-700 dark:text-emerald-400 font-semibold">{testResult.httpStatus} {testResult.statusText}</strong></span>
                  <span>·</span>
                  <span>Latency: <strong className="text-[#2563EB] dark:text-[#4F8EF7] font-semibold">{testResult.executionTimeMs}ms</strong></span>
                </span>
                <span>Content-Type: application/json</span>
              </div>

              <div className="p-3.5 bg-slate-900 dark:bg-[#10151F] border border-slate-800 dark:border-[#303948] rounded-md overflow-x-auto text-[11px] font-mono text-emerald-400 max-h-64 overflow-y-auto leading-relaxed">
                <pre>{JSON.stringify(testResult.data, null, 2)}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
