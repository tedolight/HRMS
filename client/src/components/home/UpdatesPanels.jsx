import { Link } from 'react-router-dom';
import { Calendar, Briefcase, ArrowRight, Clock, ExternalLink } from 'lucide-react';
import { formatDateShort } from '@/utils/formatters/formatDate';
import { motion } from 'framer-motion';
import { useAdminSync } from '@/hooks/useAdminSync';
import { NEWS } from '@/constants/data';
import { useLanguage } from '@/context/app/LanguageContext';

export default function UpdatesPanels() {
  const { announcements, jobs, adminUrl } = useAdminSync();
  const { t } = useLanguage();

  const formattedAnnouncements = announcements.map((a) => ({
    id: a.id,
    title: a.title,
    category: a.category || 'Announcement',
    date: a.date,
    excerpt: a.content,
  }));

  const latestNews = [...formattedAnnouncements, ...NEWS].slice(0, 3);
  const activeJobs = jobs.filter((j) => j.status === 'OPEN').slice(0, 3);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-xs font-bold text-[#0d6b52] uppercase tracking-wider block mb-2">
            {t('updatesStayInformed')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a4738] tracking-tight">
            {t('updatesTitle')}
          </h2>
          <p className="text-sm text-[#516d63] mt-2">
            {t('updatesDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* News & Announcements Panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45 }}
            className="bg-white rounded-3xl border border-[#dbebe3] shadow-[0_4px_24px_rgba(10,47,36,0.04)] overflow-hidden flex flex-col justify-between"
          >
            <div className="px-6 py-5 bg-[#f4faf7] border-b border-[#dbebe3] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#e6f7f1] text-[#0d6b52] flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-[#0a4738] text-base">{t('updatesNewsTitle')}</h3>
              </div>
              <Link
                to="/news"
                className="text-xs font-bold text-[#0d6b52] hover:text-[#00b887] transition-colors"
              >
                {t('viewAllArrow')}
              </Link>
            </div>

            <div className="divide-y divide-[#edf5f1] p-6 space-y-4">
              {latestNews.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#e6f7f1] text-[#0d6b52] uppercase">
                      {item.category}
                    </span>
                    <span className="text-xs text-[#7c988e] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#0d6b52]" />
                      {formatDateShort(item.date)}
                    </span>
                  </div>
                  <Link
                    to="/news"
                    className="font-bold text-sm text-[#092f24] hover:text-[#0d6b52] transition-colors cursor-pointer mb-1 line-clamp-1 block"
                  >
                    {item.title}
                  </Link>
                  <p className="text-xs text-[#516d63] line-clamp-2 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#f8fafb] border-t border-[#edf5f1] text-center">
              <Link
                to="/news"
                className="text-xs font-bold text-[#0d6b52] hover:underline"
              >
                {t('updatesReadMore')}
              </Link>
            </div>
          </motion.div>

          {/* Current Vacancies Panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.15, duration: 0.45 }}
            className="bg-white rounded-3xl border border-[#dbebe3] shadow-[0_4px_24px_rgba(10,47,36,0.04)] overflow-hidden flex flex-col justify-between"
          >
            <div className="px-6 py-5 bg-[#f4faf7] border-b border-[#dbebe3] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#e6f7f1] text-[#0d6b52] flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-[#0a4738] text-base">{t('updatesVacanciesTitle')}</h3>
              </div>
              <Link
                to="/careers"
                className="text-xs font-bold text-[#0d6b52] hover:text-[#00b887] transition-colors"
              >
                {t('viewAllArrow')}
              </Link>
            </div>

            <div className="divide-y divide-[#edf5f1] p-6 space-y-4">
              {activeJobs.map((job) => (
                <div key={job.id} className="pt-4 first:pt-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-[#092f24] mb-1">{t(job.title)}</h4>
                      <p className="text-xs text-[#516d63]">{job.department}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#fef3c7] text-[#92400e] shrink-0">
                      {t('deadline')}: {formatDateShort(job.deadline)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-[11px] text-[#7c988e]">
                    <span>{job.type}</span>
                    <span>•</span>
                    <span>{job.positions} {job.positions > 1 ? t('positionsPlural') : t('positions')}</span>
                    <span>•</span>
                    <Link
                      to="/careers"
                      className="text-[#0d6b52] font-bold hover:underline ml-auto"
                    >
                      {t('applyNowArrow')}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#f8fafb] border-t border-[#edf5f1] text-center">
              <Link
                to="/careers"
                className="text-xs font-bold text-[#0d6b52] hover:underline"
              >
                {t('updatesExploreAll')}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
