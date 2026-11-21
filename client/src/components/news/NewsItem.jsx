import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/app/LanguageContext';

export default function NewsItem({ news, onSelect }) {
  const { t } = useLanguage();
  const d = new Date(news.date);
  const day = d.getDate();
  const month = d.toLocaleString('en', { month: 'short' }).toUpperCase();

  return (
    <article
      onClick={() => onSelect(news)}
      className="bg-white rounded-2xl p-5 sm:p-6 border border-[#e2e8f0] hover:border-[#cbd5e1] shadow-xs hover:shadow-md transition-all duration-200 flex gap-5 items-start group cursor-pointer"
    >
      {/* Date badge: clean, calm, stable */}
      <div className="w-13 h-14 rounded-xl bg-[#f1f5f9] text-[#1e293b] flex flex-col items-center justify-center shrink-0 border border-[#e2e8f0]">
        <span className="text-lg font-bold leading-none">{day}</span>
        <span className="text-[10px] font-semibold text-[#64748b] tracking-wider mt-1">{month}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0] inline-block mb-2">
          {news.category}
        </span>
        <h3 className="text-base font-bold text-[#0a4738] group-hover:text-[#0d6b52] transition-colors duration-150 mb-1.5 leading-snug">
          {t(news.title)}
        </h3>
        <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed line-clamp-2 mb-3">
          {news.excerpt}
        </p>

        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0d6b52] hover:text-[#074533] transition-colors">
          <span>Read official statement</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
