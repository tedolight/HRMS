import { Award, Lightbulb, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/app/LanguageContext';

export default function CoreValues() {
  const { t } = useLanguage();

  const values = [
    {
      icon: Award,
      titleKey: 'value1Title',
      descKey: 'value1Desc',
    },
    {
      icon: Lightbulb,
      titleKey: 'value2Title',
      descKey: 'value2Desc',
    },
    {
      icon: ShieldCheck,
      titleKey: 'value3Title',
      descKey: 'value3Desc',
    },
  ];

  return (
    <div className="mb-14">
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-xs font-bold text-[#0d6b52] uppercase tracking-wider block mb-1.5">
          {t('guidingPrinciples')}
        </span>
        <h2 className="text-2xl font-bold text-[#0a4738]">{t('ourCoreValues')}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {values.map((v, i) => {
          const Icon = v.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e2e8f0] hover:border-[#cbd5e1] shadow-xs hover:shadow-md text-center flex flex-col items-center transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#f1f5f9] text-[#1e293b] flex items-center justify-center mb-4 group-hover:text-[#0d6b52] transition-colors">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#0a4738] group-hover:text-[#0d6b52] transition-colors duration-150 mb-2">
                {t(v.titleKey)}
              </h3>
              <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed">
                {t(v.descKey)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
