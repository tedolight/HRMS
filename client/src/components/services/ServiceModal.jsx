import { X, Clock, CheckCircle2, ListOrdered, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/app/LanguageContext';

export default function ServiceModal({ service, onClose }) {
  const { t } = useLanguage();
  if (!service) return null;

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

        {/* Modal Dialog Card */}
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

          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#e6f7f1] text-[#0d6b52]">
              {t(service.category) || service.category}
            </span>
            <span className="text-xs text-[#516d63] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#0d6b52]" />
              {t('estTime') || 'Est. Time'}: {t(service.timeframe) || service.timeframe}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-[#0a4738] mb-3">
            {t(service.name)}
          </h3>
          <p className="text-sm text-[#516d63] leading-relaxed mb-6">
            {t(service.description) || service.description}
          </p>

          {/* Requirements */}
          <div className="mb-6 p-5 rounded-2xl bg-[#f4faf7] border border-[#dbebe3]">
            <h4 className="text-xs font-bold text-[#0d6b52] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#00b887]" />
              {t('serviceReqDocs')}
            </h4>
            <ul className="space-y-2">
              {service.requirements.map((req, idx) => (
                <li key={idx} className="text-xs text-[#092f24] flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0d6b52] shrink-0 mt-1.5" />
                  <span>{t(req) || req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div className="mb-8">
            <h4 className="text-xs font-bold text-[#0d6b52] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <ListOrdered className="w-4 h-4 text-[#0d6b52]" />
              {t('serviceStepsTitle')}
            </h4>
            <ol className="space-y-2.5">
              {service.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs text-[#516d63]">
                  <span className="w-5 h-5 rounded-full bg-[#0d6b52] text-white flex items-center justify-center shrink-0 font-bold text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed mt-0.5">{t(step) || step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#edf5f1]">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-[#dbebe3] text-xs font-semibold text-[#516d63] hover:bg-[#f4faf7]"
            >
              Close
            </button>
            <Link
              to="/contact"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0d6b52] to-[#074533] text-white text-xs font-bold shadow-md shadow-[#0d6b52]/15 hover:shadow-lg transition-all"
            >
              <span>Proceed / Enquire</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#34d399]" />
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
