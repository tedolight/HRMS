import { X, FileText, Download, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { downloadOfficialDocument } from '@/utils/helpers/downloadDocument';
import { useLanguage } from '@/context/app/LanguageContext';

export default function DocumentDownloadModal({ document, onClose }) {
  const { t } = useLanguage();
  if (!document) return null;

  const handleDownload = () => {
    downloadOfficialDocument(document);
    toast.success(`Downloaded: ${document.name}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#092f24]/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-[#dbebe3]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#7c988e] hover:text-[#0a4738] hover:bg-[#f4faf7] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-[#e6f7f1] text-[#0d6b52] flex items-center justify-center mb-5">
          <FileText className="w-7 h-7" />
        </div>

        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#f4faf7] text-[#0d6b52] border border-[#dbebe3] inline-block mb-2">
          {document.category}
        </span>

        <h3 className="text-lg font-bold text-[#0a4738] mb-2 leading-snug">
          {t(document.name)}
        </h3>

        <div className="p-4 rounded-xl bg-[#f4faf7] border border-[#dbebe3] my-4 text-xs text-[#516d63] space-y-1">
          <div>Publication Year: <strong>{document.year}</strong></div>
          <div>File Format: <strong>PDF Document</strong></div>
          <div>File Size: <strong>{document.size}</strong></div>
        </div>

        <p className="text-xs text-[#7c988e] mb-6">
          This document is an authenticated public instrument released by the Hadiya Zone Science and Technology Office.
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-[#dbebe3] text-xs font-semibold text-[#516d63] hover:bg-[#f4faf7]"
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0d6b52] text-white text-xs font-bold hover:bg-[#074533] shadow-md shadow-[#0d6b52]/15"
          >
            <Download className="w-4 h-4" />
            <span>Download Document</span>
          </button>
        </div>
      </div>
    </div>
  );
}

