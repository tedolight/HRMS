import { Mail, Clock, MapPin, Calendar, ShieldCheck } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import FAQAccordion from '@/components/contact/FAQAccordion';
import { useLanguage } from '@/context/app/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();

  const headerStats = [
    { label: t('contactStatSLA'), value: '< 24 Hrs', subtext: t('contactStatCommitment'), icon: Clock },
    { label: t('contactStatOffice'), value: 'Hossana', subtext: t('contactStatRegion'), icon: MapPin },
    { label: t('contactStatDesk'), value: '8:30 - 17:30', subtext: 'Mon - Fri', icon: Calendar },
    { label: t('contactStatSupport'), value: t('servicesStatFree'), subtext: t('contactStatAssistance'), icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-[#f4faf7] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          icon={Mail}
          badge={t('contactBadge')}
          title={t('contactPageTitle')}
          description={t('contactPageDesc')}
          breadcrumbs={[
            { label: t('navHome'), href: '/' },
            { label: t('navContact'), href: '/contact' },
          ]}
          stats={headerStats}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-16">
          <ContactForm />
          <div className="space-y-8">
            <ContactInfo />
            <FAQAccordion />
          </div>
        </div>
      </div>
    </div>
  );
}
