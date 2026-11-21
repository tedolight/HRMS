import ServiceCard from './ServiceCard';
import { Compass } from 'lucide-react';

export default function ServiceList({ services = [], onSelect }) {
  if (services.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-[#dbebe3] p-8 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-[#e6f7f1] text-[#0d6b52] flex items-center justify-center mx-auto mb-4">
          <Compass className="w-7 h-7" />
        </div>
        <p className="text-base font-bold text-[#092f24]">No services found</p>
        <p className="text-xs text-[#516d63] mt-1 max-w-sm mx-auto">
          Try adjusting your search query or reset the category filter to view all available services.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          service={service}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

