import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/app/LanguageContext';

export default function DepartmentCard({ department }) {
  const { t } = useLanguage();
  if (!department) return null;

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] hover:border-[#cbd5e1] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group cursor-pointer">
      <div>
        <div className="w-12 h-12 rounded-xl bg-[#f1f5f9] text-[#1e293b] font-bold text-lg flex items-center justify-center mb-4 group-hover:text-[#0d6b52] transition-colors">
          {department.name[0]}
        </div>

        <h3 className="text-base sm:text-lg font-bold text-[#0a4738] group-hover:text-[#0d6b52] transition-colors duration-150 mb-1.5 leading-snug">
          {t(department.name)}
        </h3>

        <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed line-clamp-3 mb-5">
          {t(department.description) || department.description}
        </p>

        {department.functions && (
          <div className="space-y-2 mb-5 pt-3 border-t border-[#f1f5f9]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b] block">
              {t('coreFunctions') || 'Core Functions'}
            </span>
            {department.functions.slice(0, 2).map((fn, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-[#64748b]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0d6b52] shrink-0 mt-0.5" />
                <span className="line-clamp-1">{t(fn) || fn}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <Link
        to="/contact"
        className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#f8fafc] group-hover:bg-[#f1f5f9] text-[#0a4738] group-hover:text-[#0d6b52] text-xs font-semibold border border-[#e2e8f0] group-hover:border-[#cbd5e1] transition-colors"
      >
        <span>{t('contactDirectorate') || 'Contact Directorate'}</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
