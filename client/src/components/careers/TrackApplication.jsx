import { useState } from 'react';
import {
  Search,
  CheckCircle2,
  AlertCircle,
  FileSearch,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { formatDateShort } from '@/utils/formatters/formatDate';
import { adminSync, ADMIN_URL } from '@/services/adminSync';
import { useLanguage } from '@/context/app/LanguageContext';

export default function TrackApplication() {
  const { t } = useLanguage();
  const [refInput, setRefInput] = useState('');
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  const performSearch = (query) => {
    if (!query || !query.trim()) return;
    const tracked = adminSync.trackApplication(query);
    setResult(tracked);
    setSearched(true);
  };

  const handleCheck = (e) => {
    e.preventDefault();
    performSearch(refInput);
  };

  const stages = [
    { title: 'Application Logged', desc: 'Registry stamp' },
    { title: 'Document Verification', desc: 'Civil service criteria' },
    { title: 'Competency Exam', desc: 'Written assessment' },
    { title: 'Department Interview', desc: 'Panel evaluation' },
    { title: 'Final Placement', desc: 'Offer & onboarding' },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#dbebe3] shadow-[0_4px_24px_rgba(10,47,36,0.04)] mb-10 overflow-hidden relative">
      {/* Background soft ambient badge */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_top_right,#e6f7f1_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#edf5f1]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e6f7f1] text-[#0d6b52] text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00b887]" />
              <span>Real-Time Recruitment Registry</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#0a4738] tracking-tight">
              {t('trackAppStatus')}
            </h3>
            <p className="text-xs text-[#516d63] mt-1 max-w-xl">
              Enter your application reference code or National ID number to check document screening, exam scheduling, and selection status.
            </p>
          </div>

          {/* Quick Demo Reference Numbers */}
          <div className="text-left md:text-right shrink-0">
            <span className="text-[11px] text-[#7c988e] block mb-1">
              Sample reference IDs:
            </span>
            <div className="flex items-center gap-2">
              {['HZ-1042', 'HZ-2891'].map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => {
                    setRefInput(code);
                    performSearch(code);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#f4faf7] hover:bg-[#e6f7f1] border border-[#dbebe3] text-[11px] font-mono font-bold text-[#0d6b52] transition-colors"
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-3 max-w-2xl mb-4">
          <div className="relative flex-1">
            <FileSearch className="w-4 h-4 text-[#7c988e] absolute left-4 top-3.5 pointer-events-none" />
            <input
              type="text"
              value={refInput}
              onChange={(e) => setRefInput(e.target.value)}
              placeholder="Enter reference code (e.g. HZ-1042) or National ID…"
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-[#dbebe3] text-xs font-mono font-bold text-[#092f24] uppercase placeholder:font-sans placeholder:normal-case placeholder:font-normal focus:outline-none focus:border-[#0d6b52] focus:ring-2 focus:ring-[#0d6b52]/10 bg-[#f9fcfa]"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#0d6b52] to-[#074533] text-white text-xs font-extrabold hover:from-[#0a5c46] hover:to-[#053225] transition-all shadow-md shadow-[#0d6b52]/20 flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4 text-[#34d399]" />
            <span>Verify Status</span>
          </button>
        </form>

        {/* Search Results Display */}
        {searched && (
          <div className="mt-6 pt-6 border-t border-[#edf5f1]">
            {result ? (
              <div className="bg-[#f4faf7] rounded-2xl p-6 border border-[#d6e8df]">
                {/* Result Summary Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-[#dbebe3]">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#d1fae5] text-[#065f46]">
                      {result.department}
                    </span>
                    <h4 className="text-lg font-black text-[#092f24] mt-1.5">
                      {t(result.jobTitle)}
                    </h4>
                    <p className="text-xs text-[#516d63] mt-0.5">
                      Applicant: <strong>{result.fullName}</strong> • Submitted on{' '}
                      {formatDateShort(result.appliedAt)}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <span className="text-[10px] text-[#7c988e] block uppercase font-bold tracking-wider">
                      Current Milestone
                    </span>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#a7f3d0] shadow-xs text-xs font-extrabold text-[#065f46] mt-1">
                      <span className="w-2 h-2 rounded-full bg-[#00b887] animate-pulse" />
                      {result.status}
                    </div>
                  </div>
                </div>

                {/* Milestone Stepper */}
                <div className="mb-4">
                  <h5 className="text-xs font-bold text-[#092f24] uppercase tracking-wider mb-4">
                    {t('recruitmentPipeline')}
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                    {stages.map((stg, idx) => {
                      const isComplete = idx <= result.stage;
                      const isCurrent = idx === result.stage;
                      return (
                        <div
                          key={idx}
                          className={`p-3.5 rounded-xl border transition-all ${isCurrent
                              ? 'bg-white border-[#00b887] shadow-sm ring-2 ring-[#00b887]/20'
                              : isComplete
                                ? 'bg-[#e6f7f1] border-[#a7f3d0]'
                                : 'bg-white/60 border-[#e1eee8] opacity-60'
                            }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span
                              className={`w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center ${isComplete
                                  ? 'bg-[#0d6b52] text-white'
                                  : 'bg-[#dbebe3] text-[#7c988e]'
                                }`}
                            >
                              {isComplete ? '✓' : idx + 1}
                            </span>
                            {isCurrent && (
                              <span className="text-[9px] font-bold uppercase text-[#0d6b52] bg-[#d1fae5] px-1.5 py-0.5 rounded">
                                Active
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-bold text-[#092f24] leading-tight">
                            {stg.title}
                          </p>
                          <p className="text-[10px] text-[#7c988e] mt-1">
                            {stg.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Notice note */}
                <div className="mt-4 p-3 rounded-xl bg-white border border-[#dbebe3] text-xs text-[#516d63] flex items-center justify-between">
                  <span>
                    <strong>Next Step Details:</strong> {result.scheduledDate}
                  </span>
                  <span className="text-[11px] text-[#0d6b52] font-semibold">
                    Questions? Visit Zonal HR Desk
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-[#fef2f2] border border-[#fecaca] flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-[#dc2626] shrink-0" />
                <p className="text-xs text-[#991b1b] leading-relaxed">
                  No matching record was found for reference number <strong>{refInput}</strong>.
                  Please verify your code format (e.g. <code>HZ-1042</code>) or submit a new application.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
