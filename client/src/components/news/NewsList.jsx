import NewsItem from './NewsItem';
import { Newspaper } from 'lucide-react';

export default function NewsList({ news = [], onSelect }) {
  if (news.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-[#dbebe3] p-8 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-[#e6f7f1] text-[#0d6b52] flex items-center justify-center mx-auto mb-4">
          <Newspaper className="w-7 h-7" />
        </div>
        <p className="text-base font-bold text-[#092f24]">No news or announcements found</p>
        <p className="text-xs text-[#516d63] mt-1 max-w-sm mx-auto">
          Try a different keyword or reset your category filter to see all official communications.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {news.map((item) => (
        <NewsItem
          key={item.id}
          news={item}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

