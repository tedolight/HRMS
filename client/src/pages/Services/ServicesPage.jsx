import { useState, useMemo } from 'react';
import { Compass, Clock, CheckCircle2, ShieldCheck, Filter, Users, ExternalLink } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import SearchBar from '@/components/common/SearchBar';
import ServiceCard from '@/components/services/ServiceCard';
import ServiceModal from '@/components/services/ServiceModal';
import { useAdminSync } from '@/hooks/useAdminSync';
import { SERVICES, SERVICE_CATEGORIES } from '@/constants/data';
import { useLanguage } from '@/context/app/LanguageContext';

export default function ServicesPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedService, setSelectedService] = useState(null);
  const { services: adminServices, adminUrl } = useAdminSync();
  const { t } = useLanguage();

  const mergedServices = useMemo(() => {
    const formattedAdmin = adminServices.map((s) => ({
      name: s.title,
      category: s.type === 'TRAINING' ? 'Training' : 'Public Service',
      timeframe: '3-5 working days',
      description: s.description || 'Government public service offering managed by Hadiya Zone Department.',
      requirements: s.requirements ? s.requirements.split('\n') : ['Standard citizen identification / Fayda ID'],
      steps: s.howToAccess ? s.howToAccess.split('\n') : ['Visit the zonal service desk or apply online'],
    }));
    return [...formattedAdmin, ...SERVICES.filter((s) => !formattedAdmin.some((a) => a.name === s.name))];
  }, [adminServices]);

  const filteredServices = useMemo(() => {
    return mergedServices.filter((item) => {
      const matchCat = category === 'All' || item.category === category;
      const matchQuery =
        !query ||
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [mergedServices, query, category]);

  const headerStats = [
    { label: t('servicesStatStandard'), value: `${mergedServices.length}`, subtext: t('servicesStatCharters'), icon: Compass },
    { label: t('servicesStatWindow'), value: t('servicesStatWindowVal'), subtext: t('servicesStatSLA'), icon: Clock },
    { label: t('servicesStatAccess'), value: t('servicesStatFree'), subtext: t('servicesStatMandate'), icon: ShieldCheck },
    { label: t('servicesStatReach'), value: t('servicesStatReachVal'), subtext: t('servicesStatCoverage'), icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#f4faf7] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          icon={Compass}
          badge={t('servicesBadge')}
          title={t('servicesTitle')}
          description={t('servicesDesc')}
          breadcrumbs={[
            { label: t('navHome'), href: '/' },
            { label: t('navServices'), href: '/services' },
          ]}
          stats={headerStats}
        />

        {/* Filter & Search Bar — single row */}
        <div className="bg-white rounded-2xl p-5 border border-[#dbebe3] shadow-sm mb-8">
          <div className="flex items-center gap-3">
            {/* Category Dropdown */}
            <div className="relative shrink-0">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#0d6b52] pointer-events-none" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-10 pl-8 pr-8 text-xs font-bold text-[#0a4738] bg-white border border-[#dbebe3] rounded-lg appearance-none cursor-pointer hover:border-[#0d6b52]/40 focus:outline-none focus:ring-2 focus:ring-[#0d6b52]/20 focus:border-[#0d6b52] transition-colors"
              >
                {SERVICE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat === 'All' ? t('all') : (t(cat) || cat)}</option>
                ))}
              </select>
              <svg
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#7c988e] pointer-events-none"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Search Bar */}
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder={t('searchServices')}
              className="flex-1"
            />
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredServices.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                onSelect={setSelectedService}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#dbebe3] p-8 mb-16 shadow-sm">
            <p className="text-base font-bold text-[#092f24]">{t('noServicesFound')}</p>
            <p className="text-xs text-[#516d63] mt-1 max-w-sm mx-auto">
              {t('servicesFilterHint')}
            </p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  );
}
