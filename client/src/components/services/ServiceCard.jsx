import { Clock, ArrowRight, CheckCircle2, ListOrdered } from 'lucide-react';
import { useLanguage } from '@/context/app/LanguageContext';

export default function ServiceCard({ service, onSelect }) {
  const { t } = useLanguage();
  return (
    <div
      onClick={() => onSelect(service)}
      className="bg-white rounded-2xl p-6 border border-[#e2e8f0] hover:border-[#cbd5e1] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group cursor-pointer"
    >
      <div>
        {/* Category & Timeframe Tag */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#f1f5f9] text-[#334155] border border-[#e2e8f0]">
            {t(service.category) || service.category}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#f8fafc] text-[11px] font-medium text-[#64748b] border border-[#e2e8f0]">
            <Clock className="w-3 h-3 text-[#64748b]" />
            {t(service.timeframe) || service.timeframe}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-[#0a4738] group-hover:text-[#0d6b52] transition-colors duration-150 mb-2 leading-snug">
          {t(service.name)}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed line-clamp-3 mb-5">
          {t(service.description) || service.description}
        </p>

        {/* Key Indicators */}
        <div className="grid grid-cols-2 gap-2 mb-5 pt-3 border-t border-[#f1f5f9] text-xs text-[#64748b]">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0d6b52]" />
            <span>{service.requirements.length} {t('requirements') || 'Requirements'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ListOrdered className="w-3.5 h-3.5 text-[#64748b]" />
            <span>{service.steps.length} {t('simpleSteps') || 'Simple Steps'}</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelect(service);
        }}
        className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#f8fafc] group-hover:bg-[#f1f5f9] text-[#0a4738] group-hover:text-[#0d6b52] text-xs font-semibold border border-[#e2e8f0] group-hover:border-[#cbd5e1] transition-colors"
      >
        <span>{t('viewReqProcess') || 'View Requirements & Process'}</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}
