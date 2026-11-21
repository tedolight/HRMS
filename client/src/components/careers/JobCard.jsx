import {
  Calendar,
  Briefcase,
  GraduationCap,
  Users,
  ArrowRight,
  Clock,
  MapPin,
  FileCheck,
} from 'lucide-react';
import { formatDateShort } from '@/utils/formatters/formatDate';
import { useLanguage } from '@/context/app/LanguageContext';

export default function JobCard({ job, onDetails, onApply }) {
  const { t } = useLanguage();
  const now = new Date();
  const deadlineDate = new Date(job.deadline);
  const diffTime = deadlineDate - now;
  const daysLeft = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] hover:border-[#cbd5e1] shadow-xs hover:shadow-md transition-all duration-200 group">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Information Block */}
        <div className="flex-1 min-w-0">
          {/* Header Tag Strip */}
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#f1f5f9] text-[#334155] border border-[#e2e8f0]">
              {job.department}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#f8fafc] text-[#64748b] border border-[#e2e8f0]">
              {job.type}
            </span>
            <span className="text-[10px] font-semibold text-[#0d6b52] flex items-center gap-1 ml-auto sm:ml-0">
              Civil Service Scale
            </span>
          </div>

          {/* Job Title & Summary */}
          <h3 className="text-lg font-bold text-[#0a4738] group-hover:text-[#0d6b52] transition-colors duration-150 mb-1.5 leading-snug">
            {t(job.title)}
          </h3>
          <p className="text-xs sm:text-sm text-[#64748b] line-clamp-2 leading-relaxed mb-4">
            {job.description}
          </p>

          {/* Job Metadata Chips */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#64748b] pt-3 border-t border-[#f1f5f9]">
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#64748b]" />
              <span>{job.level}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#64748b]" />
              <span>
                {job.positions} Position{job.positions > 1 ? 's' : ''}
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#64748b]" />
              <span>Hossana HQ</span>
            </span>
            <span className="flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-[#0d6b52]" />
              <span>Full Benefits</span>
            </span>
          </div>
        </div>

        {/* Right Action Block with Deadline Widget */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#f1f5f9]">
          {/* Deadline Countdown Pill */}
          <div className="text-left lg:text-right">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#fffbeb] border border-[#fef3c7] text-xs font-semibold text-[#92400e]">
              <Clock className="w-3 h-3 text-[#b45309]" />
              <span>{daysLeft} days left</span>
            </div>
            <span className="block text-[11px] text-[#94a3b8] mt-1">
              Closing: {formatDateShort(job.deadline)}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => onDetails(job)}
              className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl border border-[#cbd5e1] hover:border-[#94a3b8] text-xs font-semibold text-[#334155] hover:bg-[#f8fafc] transition-colors"
            >
              Requirements
            </button>
            <button
              onClick={() => onApply(job)}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#0d6b52] hover:bg-[#074533] text-white text-xs font-bold transition-colors inline-flex items-center justify-center gap-1.5 group/btn"
            >
              <span>Apply Online</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
