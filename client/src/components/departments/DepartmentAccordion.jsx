import { useState } from 'react';
import { ChevronDown, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/app/LanguageContext';

export default function DepartmentAccordion({ department, isOpenDefault = false }) {
  const [isOpen, setIsOpen] = useState(isOpenDefault);
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-3xl border border-[#dbebe3] shadow-[0_4px_20px_rgba(10,47,36,0.04)] overflow-hidden mb-5 transition-shadow hover:shadow-[0_8px_30px_rgba(10,47,36,0.06)]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#f4faf7] transition-colors focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#e6f7f1] text-[#0d6b52] font-black text-lg flex items-center justify-center shrink-0 border border-[#0d6b52]/15">
            {department.name[0]}
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-[#0a4738]">
              {t(department.name)}
            </h3>
            <p className="text-xs text-[#516d63] line-clamp-1 mt-0.5">
              {t(department.description) || department.description}
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className={`p-2 rounded-xl text-[#0d6b52] transition-colors ${
            isOpen ? 'bg-[#e6f7f1]' : 'hover:bg-[#f4faf7]'
          }`}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 border-t border-[#edf5f1] space-y-6">
              <p className="text-sm text-[#516d63] leading-relaxed">
                {t(department.description) || department.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-[#f9fcfa] border border-[#dbebe3]">
                  <h4 className="text-xs font-bold text-[#0d6b52] uppercase tracking-wider mb-3">
                    {t('deptKeyFunctions')}
                  </h4>
                  <ul className="space-y-2">
                    {department.functions.map((fn, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#092f24]">
                        <CheckCircle className="w-4 h-4 text-[#00b887] shrink-0 mt-0.5" />
                        <span>{t(fn) || fn}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-[#f9fcfa] border border-[#dbebe3]">
                  <h4 className="text-xs font-bold text-[#0d6b52] uppercase tracking-wider mb-3">
                    {t('deptActivePrograms')}
                  </h4>
                  <ul className="space-y-2">
                    {department.programmes.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#092f24]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0d6b52] shrink-0 mt-1.5" />
                        <span>{t(p) || p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#edf5f1] flex items-center justify-between">
                <span className="text-xs text-[#7c988e]">
                  {t('deptNeedAssistance')}
                </span>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0d6b52] hover:text-[#00b887]"
                >
                  <span>{t('deptContactBtn')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
