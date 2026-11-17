import { Award, Calendar, Sparkles, ShieldCheck } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import StatsSection from '@/components/about/StatsSection';
import MissionVision from '@/components/about/MissionVision';
import CoreValues from '@/components/about/CoreValues';
import Leadership from '@/components/about/Leadership';
import Milestones from '@/components/about/Milestones';
import { useLanguage } from '@/context/app/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  const headerStats = [
    { label: t('aboutStat1Label'), value: '2021', subtext: t('aboutStat1Sub'), icon: Calendar },
    { label: t('aboutStat2Label'), value: t('aboutStat2Val'), subtext: t('aboutStat2Sub'), icon: Sparkles },
    { label: t('aboutStat3Label'), value: t('aboutStat3Val'), subtext: t('aboutStat3Sub'), icon: Award },
    { label: t('aboutStat4Label'), value: '100%', subtext: t('aboutStat4Sub'), icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-[#f4faf7] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          icon={Award}
          badge={t('aboutBadge')}
          title={t('aboutPageTitle')}
          description={t('aboutPageDesc')}
          breadcrumbs={[
            { label: t('navHome'), href: '/' },
            { label: t('navAbout'), href: '/about' },
          ]}
          stats={headerStats}
        />

        <MissionVision />
        <CoreValues />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Leadership />
          <Milestones />
        </div>
      </div>
    </div>
  );
}
