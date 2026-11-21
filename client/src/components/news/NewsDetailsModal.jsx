import { X, Calendar, Clock, Tag } from 'lucide-react';
import { formatDate } from '@/utils/formatters/formatDate';
import { useLanguage } from '@/context/app/LanguageContext';

export default function NewsDetailsModal({ news, onClose }) {
  const { t } = useLanguage();
  if (!news) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#092f24]/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative border border-[#dbebe3]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#7c988e] hover:text-[#0a4738] hover:bg-[#f4faf7] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-wrap items-center gap-3 mb-4 pb-3 border-b border-[#edf5f1] text-xs text-[#7c988e]">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#e6f7f1] text-[#0d6b52] flex items-center gap-1">
            <Tag className="w-3 h-3" />
            {news.category}
          </span>
          <span className="flex items-center gap-1 text-[#516d63] font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#0d6b52]" />
            {formatDate(news.date)}
          </span>
          {news.author && (
            <span className="text-[#0d6b52] font-semibold">
              By {news.author}
            </span>
          )}
          {news.readTime && (
            <span className="flex items-center gap-1 text-[#7c988e]">
              <Clock className="w-3 h-3" />
              {news.readTime}
            </span>
          )}
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold text-[#0a4738] mb-4 leading-snug">
          {t(news.title)}
        </h3>

        <div className="prose prose-sm text-[#516d63] leading-relaxed space-y-4 mb-8">
          {Array.isArray(news.content) && news.content.length > 0 ? (
            news.content.map((paragraph, idx) => (
              <p key={idx} className="text-xs sm:text-sm text-[#2d473e] leading-relaxed">
                {paragraph}
              </p>
            ))
          ) : (
            <p className="text-xs sm:text-sm text-[#2d473e] leading-relaxed">{news.excerpt}</p>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t border-[#edf5f1]">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#0d6b52] text-white text-xs font-bold hover:bg-[#074533]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

