import { useLanguage } from '@/context/app/LanguageContext';

export default function Milestones() {
  const { t } = useLanguage();

  const milestones = [
    {
      year: '2021',
      title: t('ms1Title'),
      desc: t('ms1Desc'),
    },
    {
      year: '2023',
      title: t('ms2Title'),
      desc: t('ms2Desc'),
    },
    {
      year: '2025',
      title: t('ms3Title'),
      desc: t('ms3Desc'),
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-8 border border-[#dbebe3] shadow-sm">
      <h3 className="text-xl font-bold text-[#0a4738] mb-6">{t('strategicMilestones')}</h3>
      <div className="relative border-l-2 border-[#dbebe3] ml-3 pl-6 space-y-8">
        {milestones.map((m, idx) => (
          <div key={idx} className="relative">
            <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#0d6b52] ring-4 ring-[#e6f7f1]" />
            <span className="text-xs font-extrabold text-[#0d6b52] uppercase tracking-wider block mb-1">
              {m.year}
            </span>
            <h4 className="text-sm font-bold text-[#0a4738]">{m.title}</h4>
            <p className="text-xs text-[#516d63] mt-1 leading-relaxed">{m.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

