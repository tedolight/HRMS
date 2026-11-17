import { UserCheck } from 'lucide-react';
import { useLanguage } from '@/context/app/LanguageContext';

const leaders = [
  { role: 'Head of Department', name: 'Ato Besufekad Ermias', dept: 'Executive Direction & Zonal Governance' },
  { role: 'Director, Software Engineering', name: 'Ato Dawit Mengistu', dept: 'Software & Digital Systems Directorate' },
  { role: 'Director, Network & Infrastructure', name: 'Ato Yohannes Petros', dept: 'Broadband & Telecommunications Directorate' },
  { role: 'Director, Cybersecurity & QA', name: 'W/ro Bethlehem Abebe', dept: 'Information Security & Compliance Directorate' },
  { role: 'Director, Database & Cloud Administration', name: 'Ato Solomon Kebede', dept: 'Enterprise Data Centers & Cloud Systems' },
];

export default function Leadership() {
  const { t } = useLanguage();
  return (
    <div className="bg-white rounded-2xl p-8 border border-[#dbebe3] shadow-sm">
      <h3 className="text-xl font-bold text-[#0a4738] mb-6 flex items-center gap-2">
        <UserCheck className="w-5 h-5 text-[#0d6b52]" />
        {t('zonalLeadership')}
      </h3>
      <div className="space-y-4">
        {leaders.map((leader, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 rounded-xl bg-[#f4faf7] border border-[#dbebe3]"
          >
            <div className="w-12 h-12 rounded-xl bg-[#0d6b52] text-white font-bold flex items-center justify-center shrink-0">
              {leader.name[0]}
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0a4738]">{t(leader.name)}</h4>
              <p className="text-xs text-[#0d6b52] font-semibold">{leader.role}</p>
              <p className="text-[11px] text-[#7c988e]">{leader.dept}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

