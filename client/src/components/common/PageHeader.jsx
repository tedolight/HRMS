import { ChevronRight, Home, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/helpers/helpers';

const PALETTES = [
  {
    iconBg: 'bg-emerald-50 border-emerald-100/80 text-[#0d6b52]',
    strokeColor: '#34d399',
    trendColor: 'text-[#0d6b52] bg-emerald-50/80 border-emerald-100/60',
  },
  {
    iconBg: 'bg-blue-50 border-blue-100/80 text-blue-600',
    strokeColor: '#60a5fa',
    trendColor: 'text-blue-700 bg-blue-50/80 border-blue-100/60',
  },
  {
    iconBg: 'bg-purple-50 border-purple-100/80 text-purple-600',
    strokeColor: '#c084fc',
    trendColor: 'text-purple-700 bg-purple-50/80 border-purple-100/60',
  },
  {
    iconBg: 'bg-amber-50 border-amber-100/80 text-amber-600',
    strokeColor: '#fbbf24',
    trendColor: 'text-amber-700 bg-amber-50/80 border-amber-100/60',
  },
];

export default function PageHeader({
  title,
  description,
  breadcrumbs = [],
  badge,
  icon: Icon,
  stats = [],
  actions,
  className,
}) {
  return (
    <div className={cn('relative w-full mb-8 space-y-5', className)}>
      {/* 1. Executive Top Header Card */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 sm:p-7 shadow-xs">
        {/* Breadcrumb Navigation */}
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-1.5 text-xs">
              <li>
                <Link
                  to="/"
                  className="text-[#94a3b8] hover:text-[#0a4738] transition-colors flex items-center gap-1"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span className="sr-only">Home</span>
                </Link>
              </li>
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <li key={crumb.label} className="flex items-center gap-1.5">
                    <ChevronRight className="w-3 h-3 text-[#cbd5e1]" />
                    {isLast || !crumb.href ? (
                      <span className="text-[#0a4738] font-semibold">
                        {crumb.label}
                      </span>
                    ) : (
                      <Link
                        to={crumb.href}
                        className="text-[#94a3b8] hover:text-[#0a4738] transition-colors"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left Column: Icon + Title & Description */}
          <div className="flex items-start gap-4 max-w-3xl">
            {Icon && (
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0d6b52] border border-emerald-100 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                <Icon className="w-6 h-6" />
              </div>
            )}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a4738] tracking-tight">
                  {title}
                </h1>
                {badge && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-[11px] font-semibold text-[#0d6b52]">
                    <Sparkles className="w-3 h-3 text-[#00b887]" />
                    <span>{badge}</span>
                  </span>
                )}
              </div>

              {description && (
                <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Actions (Optional) */}
          {actions && <div className="shrink-0 flex items-center gap-3">{actions}</div>}
        </div>
      </div>

      {/* 2. HRMS-Inspired Metric KPI Cards Row */}
      {stats && stats.length > 0 && (
        <div
          className={cn(
            'grid gap-4',
            stats.length === 1 && 'grid-cols-1',
            stats.length === 2 && 'grid-cols-1 sm:grid-cols-2',
            stats.length === 3 && 'grid-cols-1 sm:grid-cols-3',
            stats.length >= 4 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
          )}
        >
          {stats.map((stat, idx) => {
            const StatIcon = stat.icon;
            const theme = PALETTES[idx % PALETTES.length];

            return (
              <div
                key={idx}
                className="relative bg-white rounded-2xl p-5 border border-[#e2e8f0] hover:border-[#cbd5e1] shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between"
              >
                {/* Subtle Decorative Sparkline Wave in the Background */}
                <svg
                  className="absolute bottom-0 right-0 w-32 h-16 pointer-events-none opacity-20"
                  viewBox="0 0 120 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 40 Q 30 10, 60 30 T 120 15"
                    stroke={theme.strokeColor}
                    strokeWidth="3"
                    fill="none"
                  />
                  <path
                    d="M0 40 Q 30 10, 60 30 T 120 15 L 120 50 L 0 50 Z"
                    fill={theme.strokeColor}
                    opacity="0.2"
                  />
                </svg>

                {/* Top Row: Icon badge + Label */}
                <div className="flex items-center gap-3 mb-3 relative z-10">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 shadow-xs',
                      theme.iconBg
                    )}
                  >
                    {StatIcon ? (
                      <StatIcon className="w-5 h-5" />
                    ) : (
                      <TrendingUp className="w-5 h-5" />
                    )}
                  </div>
                  <span className="text-xs font-semibold text-[#64748b]">
                    {stat.label}
                  </span>
                </div>

                {/* Bottom Row: Big Value + Subtext / Trend Pill */}
                <div className="relative z-10">
                  <div className="text-2xl sm:text-[26px] font-black text-[#0a4738] tracking-tight leading-none">
                    {stat.value}
                  </div>
                  {stat.subtext && (
                    <div className="mt-2.5 flex items-center gap-1.5">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold border',
                          theme.trendColor
                        )}
                      >
                        <TrendingUp className="w-3 h-3" />
                        <span>{stat.subtext}</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
