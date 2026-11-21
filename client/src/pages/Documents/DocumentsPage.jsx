import { useState, useMemo } from 'react';
import { FileText, ShieldCheck, Globe, Filter, Download, ExternalLink } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import SearchBar from '@/components/common/SearchBar';
import Chip from '@/components/common/Chip';
import DocumentTable from '@/components/documents/DocumentTable';
import DocumentDownloadModal from '@/components/documents/DocumentDownloadModal';
import { useAdminSync } from '@/hooks/useAdminSync';
import { DOCUMENTS, DOCUMENT_CATEGORIES } from '@/constants/data';
import { useLanguage } from '@/context/app/LanguageContext';

export default function DocumentsPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedDoc, setSelectedDoc] = useState(null);
  const { documents: adminDocs, adminUrl } = useAdminSync();
  const { t } = useLanguage();

  const mergedDocs = useMemo(() => {
    const formattedAdmin = adminDocs.map((d) => ({
      id: `admin-doc-${d.id}`,
      name: d.title,
      category: 'Guidelines',
      type: 'PDF',
      size: '1.8 MB',
      date: d.date,
      downloads: 42,
    }));
    return [...formattedAdmin, ...DOCUMENTS.filter((d) => !formattedAdmin.some((a) => a.name === d.name))];
  }, [adminDocs]);

  const filteredDocs = useMemo(() => {
    return mergedDocs.filter((doc) => {
      const matchCat = category === 'All' || doc.category === category;
      const matchQuery =
        !query ||
        doc.name.toLowerCase().includes(query.toLowerCase()) ||
        doc.category.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [mergedDocs, query, category]);

  const headerStats = [
    { label: t('docsStatRecords'), value: `${mergedDocs.length}`, subtext: t('docsStatInstruments'), icon: FileText },
    { label: t('docsStatStatus'), value: t('docsStatCertified'), subtext: t('docsStatLegal'), icon: ShieldCheck },
    { label: t('docsStatAccess'), value: t('servicesStatFree'), subtext: t('docsStatArchive'), icon: Globe },
    { label: t('docsStatFormat'), value: 'PDF / E-Form', subtext: t('docsStatDigitalCopy'), icon: Download },
  ];

  return (
    <div className="min-h-screen bg-[#f4faf7] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          icon={FileText}
          badge={t('docsBadge')}
          title={t('docsPageTitle')}
          description={t('docsPageDesc')}
          breadcrumbs={[
            { label: t('navHome'), href: '/' },
            { label: t('navDocuments'), href: '/documents' },
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
                {DOCUMENT_CATEGORIES.map((cat) => (
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
              placeholder={t('docsSearchPlaceholder')}
              className="flex-1"
            />
          </div>
        </div>

        {/* Table */}
        <div className="mb-16">
          {filteredDocs.length > 0 ? (
            <DocumentTable
              documents={filteredDocs}
              onDownload={setSelectedDoc}
            />
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#dbebe3] p-8 shadow-sm">
              <p className="text-base font-bold text-[#092f24]">{t('docsNoMatch')}</p>
              <p className="text-xs text-[#516d63] mt-1 max-w-sm mx-auto">
                {t('docsNoMatchHint')}
              </p>
            </div>
          )}
        </div>
      </div>

      <DocumentDownloadModal
        document={selectedDoc}
        onClose={() => setSelectedDoc(null)}
      />
    </div>
  );
}
