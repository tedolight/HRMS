import { FileText, Download } from 'lucide-react';

export default function DocumentTable({ documents, onDownload }) {
  return (
    <div className="bg-white rounded-2xl border border-[#dbebe3] shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f4faf7] border-b border-[#dbebe3] text-[10px] font-bold text-[#0d6b52] uppercase tracking-wider">
              <th className="py-4 px-6">Document Title</th>
              <th className="py-4 px-6">Category</th>
              <th className="py-4 px-6">Year</th>
              <th className="py-4 px-6">File Size</th>
              <th className="py-4 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#edf5f1] text-xs">
            {documents.map((doc, idx) => (
              <tr key={idx} className="hover:bg-[#f9fcfa] transition-colors">
                <td className="py-4 px-6 font-bold text-[#0a4738]">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-[#0d6b52] shrink-0" />
                    <span>{doc.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#e6f7f1] text-[#0d6b52]">
                    {doc.category}
                  </span>
                </td>
                <td className="py-4 px-6 text-[#516d63] font-medium">{doc.year}</td>
                <td className="py-4 px-6 text-[#7c988e]">{doc.size}</td>
                <td className="py-4 px-6 text-right">
                  <button
                    onClick={() => onDownload(doc)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#dbebe3] text-xs font-bold text-[#0d6b52] hover:bg-[#e6f7f1] hover:border-[#0d6b52]/30 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

