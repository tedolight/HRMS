import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ } from '@/constants/data';
import { useLanguage } from '@/context/app/LanguageContext';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-3xl p-8 border border-[#dbebe3] shadow-sm">
      <h3 className="text-xl font-bold text-[#0a4738] mb-6 flex items-center gap-2">
        <HelpCircle className="w-5 h-5 text-[#0d6b52]" />
        {t('faqTitle')}
      </h3>

      <div className="space-y-3">
        {FAQ.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-[#dbebe3] overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#f4faf7] transition-colors"
              >
                <span className="text-xs font-bold text-[#0a4738] pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#0d6b52] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-[#516d63] leading-relaxed border-t border-[#edf5f1] bg-[#f9fcfa]">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

