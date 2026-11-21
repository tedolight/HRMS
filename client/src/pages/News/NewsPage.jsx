import { useState, useMemo } from 'react';
import { Newspaper, Clock, ShieldCheck, Filter, Globe, ExternalLink } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import SearchBar from '@/components/common/SearchBar';
import Chip from '@/components/common/Chip';
import NewsItem from '@/components/news/NewsItem';
import NewsDetailsModal from '@/components/news/NewsDetailsModal';
import { useAdminSync } from '@/hooks/useAdminSync';
import { NEWS, NEWS_CATEGORIES } from '@/constants/data';
import { useLanguage } from '@/context/app/LanguageContext';

export default function NewsPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedNews, setSelectedNews] = useState(null);
  const { announcements, adminUrl } = useAdminSync();
  const { t } = useLanguage();

  // Combine Admin announcements with public department news
  const mergedNews = useMemo(() => {
    const adminFormatted = announcements.map((a) => ({
      id: a.id,
      title: a.title,
      category: a.category || 'Announcement',
      date: a.date,
      author: a.postedBy,
      excerpt: a.content,
      content: [a.content],
      readTime: a.readTime || '2 min read',
    }));

    // Put Admin announcements first, followed by portal news
    return [...adminFormatted, ...NEWS.filter((n) => !adminFormatted.some((a) => a.id === n.id))];
  }, [announcements]);

  const filteredNews = useMemo(() => {
    return mergedNews.filter((item) => {
      const matchCat = category === 'All' || item.category === category;
      const matchQuery =
        !query ||
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        (item.excerpt && item.excerpt.toLowerCase().includes(query.toLowerCase()));
      return matchCat && matchQuery;
    });
  }, [mergedNews, query, category]);

  const headerStats = [
    { label: t('newsStatNotices'), value: `${mergedNews.length}`, subtext: t('newsStatReleases'), icon: Newspaper },
    { label: t('newsStatCycle'), value: t('newsStatLive'), subtext: t('newsStatContinuous'), icon: Clock },
    { label: t('newsStatAuthenticity'), value: t('newsStatVerified'), subtext: t('newsStatZonalComm'), icon: ShieldCheck },
    { label: t('newsStatDist'), value: '24 Woredas', subtext: t('newsStatCoverage'), icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-[#f4faf7] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          icon={Newspaper}
          badge={t('newsBadge')}
          title={t('newsPageTitle')}
          description={t('newsPageDesc')}
          breadcrumbs={[
            { label: t('navHome'), href: '/' },
            { label: t('navNews'), href: '/news' },
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
                {NEWS_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? t('all') : (t(cat) || cat)}
                  </option>
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
              placeholder={t('newsSearchPlaceholder')}
              className="flex-1"
            />
          </div>
        </div>

        {/* List */}
        {filteredNews.length > 0 ? (
          <div className="space-y-4 mb-16">
            {filteredNews.map((item) => (
              <NewsItem
                key={item.id}
                news={item}
                onSelect={setSelectedNews}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#dbebe3] p-8 mb-16 shadow-sm">
            <p className="text-base font-bold text-[#092f24]">{t('newsNoFound')}</p>
            <p className="text-xs text-[#516d63] mt-1 max-w-sm mx-auto">
              {t('newsNoFoundHint')}
            </p>
          </div>
        )}
      </div>

      <NewsDetailsModal
        news={selectedNews}
        onClose={() => setSelectedNews(null)}
      />
    </div>
  );
}
