import { Building2, MapPin, Users, Sparkles, ShieldCheck, ExternalLink } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import DepartmentAccordion from '@/components/departments/DepartmentAccordion';
import { useAdminSync } from '@/hooks/useAdminSync';
import { useLanguage } from '@/context/app/LanguageContext';

export default function DepartmentsPage() {
  const { departments, adminUrl } = useAdminSync();
  const { t } = useLanguage();

  const headerStats = [
    { label: t('deptStatCore'), value: `${departments.length}`, subtext: t('deptStatActive'), icon: Building2 },
    { label: t('deptStatCoverage'), value: t('deptStatCoverageVal'), subtext: t('deptStatReach'), icon: MapPin },
    { label: t('deptStatDesks'), value: t('deptStatDesksVal'), subtext: t('deptStatHelp'), icon: Users },
    { label: t('deptStatCharters'), value: t('deptStatChartersVal'), subtext: t('deptStatStandards'), icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-[#f4faf7] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          icon={Building2}
          badge={t('deptBadge')}
          title={t('deptPageTitle')}
          description={t('deptPageDesc')}
          breadcrumbs={[
            { label: t('navHome'), href: '/' },
            { label: t('navDepartments'), href: '/departments' },
          ]}
          stats={headerStats}
        />

        <div className="space-y-5 mb-16">
          {departments.map((dept, index) => (
            <DepartmentAccordion
              key={dept.id}
              department={dept}
              isOpenDefault={index === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
