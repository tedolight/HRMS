import { Link } from 'react-router-dom';
import { ShieldCheck, Database, Building2, Wifi, Code2, ArrowRight } from 'lucide-react';
import { useAdminSync } from '@/hooks/useAdminSync';
import { useLanguage } from '@/context/app/LanguageContext';

const iconMap = {
  'Cybersecurity & Quality Assurance': ShieldCheck,
  'Database & Cloud Administration': Database,
  'Hadiya Science Information Technology': Building2,
  'Network & Infrastructure': Wifi,
  'Software Engineering': Code2,
};

export default function DepartmentsPreview() {
  const { departments } = useAdminSync();
  const { t } = useLanguage();

  const displayDepartments = departments
    .filter((d) => d.name !== 'Software Engineering')
    .slice(0, 4);

  return (
    <section className="py-20 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-[#0d6b52] uppercase tracking-wider block mb-1.5">
              {t('deptOrgStructure')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0a4738] tracking-tight">
              {t('deptExplore')}
            </h2>
            <p className="text-sm text-[#64748b] mt-1.5 max-w-xl">
              {t('deptSubtitle')}
            </p>
          </div>
          <Link
            to="/departments"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0d6b52] hover:text-[#074533] transition-colors"
          >
            <span>{t('deptViewAll')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayDepartments.map((d, i) => {
            const Icon = iconMap[d.name] || Building2;
            return (
              <Link
                key={d.id || i}
                to="/departments"
                className="bg-white rounded-2xl p-6 border border-[#e2e8f0] hover:border-[#cbd5e1] shadow-xs hover:shadow-md transition-all duration-200 group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#e6f7f1] text-[#0d6b52] flex items-center justify-center mb-4 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#0a4738] group-hover:text-[#0d6b52] transition-colors mb-2 leading-snug">
                    {t(d.name)}
                  </h3>
                  <p className="text-xs text-[#64748b] line-clamp-3 leading-relaxed mb-5">
                    {d.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#f1f5f9] flex items-center justify-between text-xs font-semibold text-[#0d6b52]">
                  <span>{t('deptExploreSingle')}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
