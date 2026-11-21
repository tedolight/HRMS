import { useState, useMemo } from 'react';
import { Briefcase, Clock, ShieldCheck, Filter, Award, ExternalLink } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import SearchBar from '@/components/common/SearchBar';
import JobCard from '@/components/careers/JobCard';
import JobDetailsModal from '@/components/careers/JobDetailsModal';
import ApplicationModal from '@/components/careers/ApplicationModal';
import TrackApplication from '@/components/careers/TrackApplication';
import { useAdminSync } from '@/hooks/useAdminSync';
import { useLanguage } from '@/context/app/LanguageContext';

export default function CareersPage() {
  const [query, setQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyingJob, setApplyingJob] = useState(null);
  const { jobs, departments, adminUrl } = useAdminSync();
  const { t } = useLanguage();

  const deptNames = useMemo(() => {
    return ['All', ...departments.map((d) => d.name)];
  }, [departments]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchDept = deptFilter === 'All' || job.department === deptFilter;
      const matchQuery =
        !query ||
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.description.toLowerCase().includes(query.toLowerCase());
      return matchDept && matchQuery;
    });
  }, [jobs, query, deptFilter]);

  const headerStats = [
    { label: t('careersOpenVacancies'), value: `${jobs.filter((j) => j.status === 'OPEN').length}`, subtext: t('careersActivePositions'), icon: Briefcase },
    { label: t('careersEvalPeriod'), value: t('careersEvalPeriodVal'), subtext: t('careersCivilSLA'), icon: Clock },
    { label: t('careersMerit'), value: '100%', subtext: t('careersStdExam'), icon: ShieldCheck },
    { label: t('careersDigital'), value: t('careersDigitalVal'), subtext: t('careersPaperless'), icon: Award },
  ];

  return (
    <div className="min-h-screen bg-[#f4faf7] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          icon={Briefcase}
          badge={t('careersOfficialBadge')}
          title={t('careersTitle')}
          description={t('careersFullDesc')}
          breadcrumbs={[
            { label: t('home'), href: '/' },
            { label: t('navCareers'), href: '/careers' },
          ]}
          stats={headerStats}
        />

        {/* Live Application Tracking Widget */}
        <TrackApplication />

        {/* Vacancies Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold text-[#0d6b52] uppercase tracking-wider block mb-1">
              {t('careersCivilOpps')}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#0a4738] tracking-tight">
              {t('careersPublished')}
            </h2>
          </div>
          <span className="text-xs text-[#516d63] bg-white px-3.5 py-1.5 rounded-full border border-[#dbebe3] shadow-xs">
            {t('careersShowing')} <strong>{filteredJobs.length}</strong> {filteredJobs.length === 1 ? t('careersAvailable') : t('careersAvailablePlural')}
          </span>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-5 border border-[#dbebe3] shadow-sm mb-6">
          <div className="flex items-center gap-3">
            {/* Department Dropdown */}
            <div className="relative shrink-0">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#0d6b52] pointer-events-none" />
              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="h-10 pl-8 pr-8 text-xs font-bold text-[#0a4738] bg-white border border-[#dbebe3] rounded-lg appearance-none cursor-pointer hover:border-[#0d6b52]/40 focus:outline-none focus:ring-2 focus:ring-[#0d6b52]/20 focus:border-[#0d6b52] transition-colors"
              >
                {deptNames.map((name) => (
                  <option key={name} value={name}>{name === 'All' ? (t('all') || 'All') : (t(name) || name)}</option>
                ))}
              </select>
              <svg
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#7c988e] pointer-events-none"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Search Input */}
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder={t('searchJobs')}
              className="flex-1"
            />
          </div>
        </div>

        {/* Job Listings Grid */}
        {filteredJobs.length > 0 ? (
          <div className="space-y-4 mb-16">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onDetails={setSelectedJob}
                onApply={setApplyingJob}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#dbebe3] p-8 mb-16 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-[#e6f7f1] text-[#0d6b52] flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-7 h-7" />
            </div>
            <p className="text-base font-bold text-[#092f24]">{t('noJobsFound')}</p>
            <p className="text-xs text-[#516d63] mt-1 max-w-sm mx-auto">
              {t('noJobsHint')}
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      <JobDetailsModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onApply={(job) => setApplyingJob(job)}
      />

      <ApplicationModal
        job={applyingJob}
        onClose={() => setApplyingJob(null)}
      />
    </div>
  );
}
