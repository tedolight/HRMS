import { X, Calendar, Briefcase, GraduationCap, Users } from 'lucide-react';
import { formatDateShort } from '@/utils/formatters/formatDate';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/app/LanguageContext';

export default function JobDetailsModal({ job, onClose, onApply }) {
  const { t } = useLanguage();
  if (!job) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#092f24]/60 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative border border-[#dbebe3] z-10"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-[#7c988e] hover:text-[#092f24] hover:bg-[#f4faf7] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#e6f7f1] text-[#0d6b52] inline-block">
              {job.department}
            </span>
            <span className="text-[10px] font-semibold text-[#0d6b52] bg-[#f4faf7] px-2.5 py-1 rounded-full border border-[#dbebe3] inline-flex items-center gap-1">
              Public Vacancy • No Login Required
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-[#0a4738] mb-2">
            {t(job.title)}
          </h3>

          <div className="flex flex-wrap items-center gap-3 text-xs text-[#516d63] mb-6">
            <span className="flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-[#0d6b52]" />
              {job.type}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-[#0d6b52]" />
              {job.level}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#0d6b52]" />
              {job.positions} Open Position{job.positions > 1 ? 's' : ''}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#92400e] font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              Deadline: {formatDateShort(job.deadline)}
            </span>
          </div>

          <div className="mb-6">
            <h4 className="text-xs font-bold text-[#0d6b52] uppercase tracking-wider mb-2">
              {t('roleDescription')}
            </h4>
            <p className="text-sm text-[#516d63] leading-relaxed">
              {job.description}
            </p>
          </div>

          <div className="mb-8 p-5 rounded-2xl bg-[#f4faf7] border border-[#dbebe3]">
            <h4 className="text-xs font-bold text-[#0d6b52] uppercase tracking-wider mb-3">
              {t('qualificationsTitle')}
            </h4>
            <ul className="space-y-2">
              {job.requirements.map((req, idx) => (
                <li key={idx} className="text-xs text-[#092f24] flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0d6b52] shrink-0 mt-1.5" />
                  <span className="leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#edf5f1]">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-[#dbebe3] text-xs font-semibold text-[#516d63] hover:bg-[#f4faf7]"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onApply(job);
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0d6b52] to-[#074533] text-white text-xs font-bold hover:from-[#0a5c46] hover:to-[#053225] shadow-md shadow-[#0d6b52]/15 transition-all"
            >
              Apply for this Position
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
