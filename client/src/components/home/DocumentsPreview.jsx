import { Link } from 'react-router-dom';
import { FileText, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/app/LanguageContext';

export default function DocumentsPreview() {
  const { t } = useLanguage();

  const docCards = [
    {
      icon: FileText,
      titleKey: 'docFormsTitle',
      descKey: 'docFormsDesc',
      link: '/documents',
    },
    {
      icon: ShieldCheck,
      titleKey: 'docPoliciesTitle',
      descKey: 'docPoliciesDesc',
      link: '/documents',
    },
    {
      icon: HelpCircle,
      titleKey: 'docReqsTitle',
      descKey: 'docReqsDesc',
      link: '/services',
    },
  ];

  return (
    <section className="py-20 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-xs font-bold text-[#0d6b52] uppercase tracking-wider block mb-1.5">
            {t('docsTransp')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0a4738] tracking-tight">
            {t('docsTitle')}
          </h2>
          <p className="text-sm text-[#64748b] mt-1.5">
            {t('docsSub')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {docCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <Link
                key={i}
                to={card.link}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e2e8f0] hover:border-[#cbd5e1] shadow-xs hover:shadow-md transition-all duration-200 group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#f1f5f9] text-[#1e293b] flex items-center justify-center mb-5 group-hover:text-[#0d6b52] transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0a4738] group-hover:text-[#0d6b52] transition-colors duration-150 mb-2">
                    {t(card.titleKey)}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed mb-6">
                    {t(card.descKey)}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0d6b52] group-hover:text-[#074533] transition-colors mt-auto pt-3 border-t border-[#f1f5f9]">
                  <span>{t('docsBrowse')}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
