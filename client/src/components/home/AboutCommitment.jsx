import { Link } from 'react-router-dom';
import { Check, ArrowRight, ShieldCheck, Award, Building, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/app/LanguageContext';

export default function AboutCommitment() {
  const { t } = useLanguage();

  const points = [
    t('aboutPoint1'),
    t('aboutPoint2'),
    t('aboutPoint3'),
  ];

  const metrics = [
    { labelKey: 'aboutZonalWoredas', value: '24', subKey: 'aboutActiveCoverage' },
    { labelKey: 'aboutDirectorates', value: '4', subKey: 'aboutSpecializedTeams' },
    { labelKey: 'aboutSLA', value: '98%', subKey: 'aboutCitizenCharter' },
    { labelKey: 'aboutDigitalRegistry', value: '100%', subKey: 'aboutPaperless' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Extraordinary Elevated White Showcase Card (Replaced solid dark green card) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-5 bg-[#f4faf7] rounded-3xl p-8 border border-[#d6e8df] shadow-[0_8px_30px_rgba(10,47,36,0.05)] relative overflow-hidden flex flex-col justify-between min-h-[440px]"
          >
            {/* Ambient pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_top_right,#e6f7f1_0%,transparent_70%)] pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00b887] to-[#0d6b52] flex items-center justify-center text-white font-black text-xl shadow-md shadow-[#00b887]/20">
                  H
                </div>
                <span className="px-3 py-1 rounded-full bg-white text-[#0d6b52] border border-[#dbebe3] text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00b887]" />
                  {t('aboutVerified')}
                </span>
              </div>

              <span className="text-[11px] font-bold text-[#0d6b52] uppercase tracking-wider block mb-1">
                {t('aboutMandate')}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0a4738] leading-snug mb-3">
                {t('aboutCardTitle')}
              </h3>
              <p className="text-xs text-[#516d63] leading-relaxed">
                {t('aboutCardDesc')}
              </p>
            </div>

            {/* Structured Metric Grid */}
            <div className="relative z-10 pt-6 mt-6 border-t border-[#dbebe3] grid grid-cols-2 gap-3">
              {metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white border border-[#dbebe3] shadow-xs"
                >
                  <span className="text-xl font-black text-[#092f24] block">
                    {m.value}
                  </span>
                  <span className="text-xs font-bold text-[#0d6b52] block mt-0.5">
                    {t(m.labelKey)}
                  </span>
                  <span className="text-[10px] text-[#7c988e] block">
                    {t(m.subKey)}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Text & Strategic Priorities */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0d6b52] uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-[#00b887]" />
              {t('aboutWelcome')}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a4738] tracking-tight leading-tight mb-5">
              {t('aboutTitle')}
            </h2>
            <p className="text-sm sm:text-base text-[#516d63] leading-relaxed mb-6">
              {t('aboutDesc')}
            </p>

            <ul className="space-y-4 mb-8">
              {points.map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#f9fcfa] border border-[#edf5f1]"
                >
                  <div className="w-6 h-6 rounded-xl bg-[#e6f7f1] text-[#0d6b52] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-[#00b887]" />
                  </div>
                  <span className="text-xs sm:text-sm text-[#092f24] font-medium leading-relaxed">
                    {point}
                  </span>
                </motion.li>
              ))}
            </ul>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#0d6b52] to-[#074533] text-white font-black text-xs hover:from-[#0a5c46] hover:to-[#053225] transition-colors shadow-sm shadow-[#0d6b52]/20"
            >
              <span>{t('aboutLearnMore')}</span>
              <ArrowRight className="w-4 h-4 text-[#34d399]" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
