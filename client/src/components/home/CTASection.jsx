import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2, Users, Briefcase, GraduationCap, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/app/LanguageContext';

export default function CTASection() {
  const { t } = useLanguage();

  const highlights = [
    {
      icon: ShieldCheck,
      titleKey: 'ctaMeritTitle',
      descKey: 'ctaMeritDesc',
    },
    {
      icon: Users,
      titleKey: 'ctaBenefitsTitle',
      descKey: 'ctaBenefitsDesc',
    },
    {
      icon: GraduationCap,
      titleKey: 'ctaCapacityTitle',
      descKey: 'ctaCapacityDesc',
    },
  ];

  return (
    <section className="py-20 bg-[#f4faf7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Extraordinary Elevated White Enterprise Card (No solid dark green slab) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative rounded-3xl bg-white border border-[#dbebe3] p-8 sm:p-12 lg:p-14 shadow-[0_8px_32px_rgba(10,47,36,0.06)] overflow-hidden"
        >
          {/* Subtle ambient mint glow and micro-pattern */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_top_right,#e6f7f1_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#00b887]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            {/* Left 7 Columns: Pitch & Value Proposition */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e6f7f1] text-[#0d6b52] text-xs font-bold uppercase tracking-wider mb-4 border border-[#0d6b52]/15">
                <Sparkles className="w-3.5 h-3.5 text-[#00b887]" />
                {t('ctaBadge')}
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0a4738] tracking-tight leading-tight mb-4">
                {t('ctaTitle')}
              </h2>

              <p className="text-sm sm:text-base text-[#516d63] leading-relaxed mb-8 max-w-xl">
                {t('ctaDesc')}
              </p>

              {/* 3 Pillars Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
                {highlights.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#f9fcfa] border border-[#dbebe3] hover:bg-[#e6f7f1]/50 transition-colors flex flex-col"
                    >
                      <div className="w-8 h-8 rounded-xl bg-[#e6f7f1] text-[#0d6b52] flex items-center justify-center mb-2.5 mx-auto">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-bold text-[#092f24] mb-1 text-center">
                        {t(item.titleKey)}
                      </h4>
                      <p className="text-[11px] text-[#516d63] leading-relaxed text-center">
                        {t(item.descKey)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right 5 Columns: Action Box Card */}
            <div className="lg:col-span-5 self-end">
              <div className="rounded-3xl bg-[#f4faf7] p-7 sm:p-8 border border-[#d6e8df] shadow-xs relative">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-bold text-[#092f24] uppercase tracking-wider">
                    {t('ctaRecruitmentCycle')}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#d1fae5] text-[#065f46] text-[10px] font-extrabold uppercase">
                    4 {t('ctaOpenings')}
                  </span>
                </div>

                <h3 className="text-lg font-black text-[#0a4738] mb-2">
                  {t('ctaApplyTrack')}
                </h3>
                <p className="text-xs text-[#516d63] leading-relaxed mb-6">
                  {t('ctaApplyDesc')}
                </p>

                <div className="space-y-3">
                  <Link
                    to="/careers"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#0d6b52] to-[#074533] hover:from-[#0a5c46] hover:to-[#053225] text-white text-xs font-black shadow-md shadow-[#0d6b52]/20 hover:shadow-lg transition-all"
                  >
                    <Briefcase className="w-4 h-4 text-[#34d399]" />
                    <span>{t('ctaBrowseVacancies')}</span>
                    <ArrowRight className="w-4 h-4 text-[#34d399]" />
                  </Link>

                  <Link
                    to="/careers"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-white hover:bg-[#e6f7f1] text-[#092f24] hover:text-[#0d6b52] text-xs font-bold border border-[#dbebe3] transition-all"
                  >
                    <span>{t('ctaCheckStatus')}</span>
                  </Link>
                </div>

                <div className="mt-5 pt-4 border-t border-[#dbebe3] flex items-center justify-between text-[11px] text-[#7c988e]">
                  <span>{t('ctaHossana')}</span>
                  <span>{t('ctaCivilGrade')}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
