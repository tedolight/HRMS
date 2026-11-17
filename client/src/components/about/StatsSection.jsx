export default function StatsSection() {
  const stats = [
    { value: '5', label: 'Directorates & Departments', sub: 'Specialized divisions' },
    { value: '6', label: 'Public Services Available', sub: 'Citizen charters' },
    { value: '5', label: 'Active Recruitment Openings', sub: 'Civil service merit' },
    { value: '6', label: 'Public Governance Documents', sub: 'Certified PDF records' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
      {stats.map((s, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl p-5 sm:p-6 border border-[#e2e8f0] hover:border-[#cbd5e1] shadow-xs hover:shadow-md text-center transition-all duration-200"
        >
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0a4738] mb-1">
            {s.value}
          </div>
          <div className="text-xs sm:text-sm font-semibold text-[#334155]">{s.label}</div>
          <div className="text-[10px] text-[#94a3b8] mt-0.5">{s.sub}</div>
        </div>
      ))}
    </div>
  );
}
