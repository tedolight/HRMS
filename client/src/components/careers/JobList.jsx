import JobCard from './JobCard';
import { Briefcase } from 'lucide-react';

export default function JobList({ jobs = [], onDetails, onApply }) {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-[#dbebe3] p-8 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-[#e6f7f1] text-[#0d6b52] flex items-center justify-center mx-auto mb-4">
          <Briefcase className="w-7 h-7" />
        </div>
        <p className="text-base font-bold text-[#092f24]">No positions match your criteria</p>
        <p className="text-xs text-[#516d63] mt-1 max-w-sm mx-auto">
          Try adjusting your search terms or selecting 'All' departments to browse open recruitments.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onDetails={onDetails}
          onApply={onApply}
        />
      ))}
    </div>
  );
}

