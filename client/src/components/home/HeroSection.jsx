import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Search,
  Sparkles,
  ShieldCheck,
  Briefcase,
  Layers,
  TrendingUp,
} from 'lucide-react';
import { motion } from 'framer-motion';
import heroOfficeImg from '@/assets/hero-office.jpg';
import { useAdminSync } from '@/hooks/useAdminSync';
import { useLanguage } from '@/context/app/LanguageContext';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { jobs, departments, announcements, adminUrl } = useAdminSync();
  const { t } = useLanguage();

  const openJobsCount = jobs.filter((j) => j.status === 'OPEN').length;
  const latestAnnouncement = announcements[0] || {
    title: 'Recruitment & Institutional Services active.',
  };

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/services?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <section className="relative overflow-hidden py-16 lg:py-24 border-b border-[#e1eee8] min-h-[580px] flex items-center">
      {/* Background Office Image with balanced cinematic overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroOfficeImg}
          alt="Science and Technology Operations Center"
          className="w-full h-full object-cover object-center scale-100"
        />
        {/* Light emerald tint */}
        <div className="absolute inset-0 bg-[#0c5944]/10" />
        {/* Lighter directional gradient making the image clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/65 via-white/45 to-white/20 sm:to-white/10" />
        {/* Bottom blend into the page body */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f4faf7]/70 via-transparent to-transparent" />
      </div>

      {/* Decorative ambient radial glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#00b887]/15 rounded-full blur-3xl pointer-events-none z-1" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#0d6b52]/15 rounded-full blur-3xl pointer-events-none z-1" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Core Message & Actions */}
          <div className="lg:col-span-7">
            {/* Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e6f7f1] border border-[#0d6b52]/20 text-[#0d6b52] text-xs font-bold uppercase tracking-wider mb-6 shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#00b887] animate-pulse" />
              <span>{t('heroBadge')}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.12] text-[#0a4738] mb-6"
            >
              {t('heroTitle')}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-[#1e483b] font-medium leading-relaxed mb-8 max-w-xl"
            >
              {t('heroSubtitle')}
            </motion.p>

            {/* Integrated Fast Search Bar */}
            <motion.form
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              onSubmit={handleHeroSearch}
              className="max-w-xl bg-white/95 backdrop-blur-md p-2 rounded-2xl border border-[#d6e8df] shadow-[0_6px_24px_rgba(10,47,36,0.08)] flex items-center gap-2 mb-8 focus-within:ring-2 focus-within:ring-[#00b887]/30 transition-all"
            >
              <div className="pl-3 text-[#7c988e]">
                <Search className="w-4 h-4 text-[#0d6b52]" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('heroSearchPlaceholder')}
                className="w-full text-xs sm:text-sm text-[#092f24] placeholder:text-[#7c988e] bg-transparent focus:outline-none py-2"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0d6b52] to-[#074533] text-white text-xs font-bold shrink-0 hover:from-[#0a5c46] hover:to-[#053225] transition-all shadow-sm"
              >
                {t('heroSearchBtn')}
              </button>
            </motion.form>

            {/* Action Buttons & Trust Strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-8"
            >
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#0d6b52] text-white font-black text-xs hover:bg-[#074533] transition-colors shadow-sm shadow-[#0d6b52]/20"
              >
                <span>{t('heroExploreServices')}</span>
                <ArrowRight className="w-4 h-4 text-[#34d399]" />
              </Link>
              <Link
                to="/careers"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-[#e6f7f1] text-[#092f24] hover:text-[#0d6b52] border border-[#dbebe3] font-bold text-xs transition-colors shadow-xs"
              >
                <span>{t('heroViewVacancies')}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#0d6b52]" />
              </Link>
            </motion.div>

            {/* Trust Points Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6 pt-6 border-t border-[#0d6b52]/15 text-xs text-[#1e483b] font-semibold"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00b887]" />
                <span>{t('heroCitizenFocused')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00b887]" />
                <span>{t('heroTransparent')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00b887]" />
                <span>{t('heroDigital')}</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Executive Dashboard Preview Card (Inspired by the Reference Image) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-[#dbebe3] shadow-[0_16px_40px_rgba(10,47,36,0.10)] relative overflow-hidden">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-5 border-b border-[#edf5f1] mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#e6f7f1] text-[#0d6b52] flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5 text-[#00b887]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#0a4738]">{t('zonalRegistry')}</h3>
                    <p className="text-[11px] text-[#7c988e]">{t('operationalSummary')}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e6f7f1] text-[#065f46] text-[10px] font-extrabold uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00b887] animate-pulse" />
                  {t('livePortal')}
                </span>
              </div>

              {/* Stat Widgets 2x2 Grid */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <Link to="/careers" className="p-3.5 rounded-2xl bg-[#f4faf7] hover:bg-[#e6f7f1] border border-[#dbebe3] transition-colors group block">
                  <span className="text-[11px] text-[#516d63] font-medium block">{t('heroActiveVacancies')}</span>
                  <div className="text-xl font-black text-[#0a4738] mt-0.5 group-hover:text-[#0d6b52] transition-colors">
                    {openJobsCount} {t('heroRoles')}
                  </div>
                  <span className="text-[10px] text-[#00b887] font-semibold block mt-0.5">
                    {t('heroCivilServiceScale')}
                  </span>
                </Link>
                <Link to="/departments" className="p-3.5 rounded-2xl bg-[#f4faf7] hover:bg-[#e6f7f1] border border-[#dbebe3] transition-colors group block">
                  <span className="text-[11px] text-[#516d63] font-medium block">{t('heroDirectorates')}</span>
                  <div className="text-xl font-black text-[#0a4738] mt-0.5 group-hover:text-[#0d6b52] transition-colors">
                    {departments.length} {t('heroDivisions')}
                  </div>
                  <span className="text-[10px] text-[#00b887] font-semibold block mt-0.5">
                    {t('heroExecutiveStructure')}
                  </span>
                </Link>
                <div className="p-3.5 rounded-2xl bg-[#f4faf7] border border-[#dbebe3]">
                  <span className="text-[11px] text-[#516d63] font-medium block">{t('heroCoverageArea')}</span>
                  <div className="text-xl font-black text-[#0a4738] mt-0.5">24 Woredas</div>
                  <span className="text-[10px] text-[#00b887] font-semibold block mt-0.5">
                    Hadiya Zone
                  </span>
                </div>
                <Link to="/documents" className="p-3.5 rounded-2xl bg-[#f4faf7] hover:bg-[#e6f7f1] border border-[#dbebe3] transition-colors group block">
                  <span className="text-[11px] text-[#516d63] font-medium block">{t('heroPublicRecords')}</span>
                  <div className="text-xl font-black text-[#0a4738] mt-0.5 group-hover:text-[#0d6b52] transition-colors">
                    6 {t('heroCertifiedForms')}
                  </div>
                  <span className="text-[10px] text-[#00b887] font-semibold block mt-0.5">
                    {t('heroAuthenticated')}
                  </span>
                </Link>
              </div>

              {/* Recent Activity Highlight */}
              <div className="p-4 rounded-2xl bg-[#f9fcfa] border border-[#edf5f1] mb-5">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-[#092f24]">{t('heroRecentUpdate')}</span>
                  <span className="text-[10px] text-[#7c988e]">{t('heroLiveFeed')}</span>
                </div>
                <p className="text-xs text-[#516d63] line-clamp-1">
                  {latestAnnouncement.title}
                </p>
              </div>

              {/* Quick Jump Action */}
              <Link
                to="/careers"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#e6f7f1] hover:bg-[#d1fae5] text-[#0d6b52] text-xs font-black transition-colors"
              >
                <span>{t('heroAccessPortal')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
