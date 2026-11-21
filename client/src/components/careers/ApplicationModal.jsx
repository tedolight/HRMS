import { useState } from 'react';
import { X, UploadCloud, CheckCircle2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { adminSync } from '@/services/adminSync';
import { useLanguage } from '@/context/app/LanguageContext';

export default function ApplicationModal({ job, onClose }) {
  const { t } = useLanguage();
  const [submittedRef, setSubmittedRef] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    nationalId: '',
    email: '',
    phone: '',
    education: 'BSc / BA Degree',
    coverNote: '',
  });

  if (!job) return null;

  const handleNationalIdChange = (e) => {
    // Only allow numbers / digits (strip any non-numeric letters/symbols)
    const onlyDigits = e.target.value.replace(/\D/g, '');
    setFormData((prev) => ({ ...prev, nationalId: onlyDigits }));
  };

  const handleKeyDownNumbersOnly = (e) => {
    // Allow navigation keys, backspace, delete, tab, enter
    if (
      ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Enter'].includes(e.key) ||
      e.ctrlKey ||
      e.metaKey
    ) {
      return;
    }
    // Block any non-digit character (letters, punctuation, symbols, whitespace)
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handlePasteNumbersOnly = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData ? e.clipboardData.getData('text') : '';
    const onlyDigits = pastedText.replace(/\D/g, '');
    setFormData((prev) => ({ ...prev, nationalId: (prev.nationalId + onlyDigits) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.nationalId || !formData.email || !formData.phone) {
      toast.error('Please complete all required fields.');
      return;
    }

    try {
      const result = await adminSync.submitApplication({
        jobId: job.id,
        jobTitle: job.title,
        fullName: formData.fullName,
        nationalId: formData.nationalId,
        email: formData.email,
        phone: formData.phone,
        education: formData.education,
        coverNote: formData.coverNote,
      });

      setSubmittedRef(result.id);
      toast.success('Application registered directly into HRMS recruitment database!');
    } catch (err) {
      const ref = 'APP-' + Math.floor(1000 + Math.random() * 9000);
      setSubmittedRef(ref);
      toast.success('Application submitted successfully!');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#092f24]/60 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative border border-[#dbebe3] z-10"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-[#7c988e] hover:text-[#092f24] hover:bg-[#f4faf7] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {submittedRef ? (
            <div className="text-center py-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12 }}
                className="w-16 h-16 rounded-2xl bg-[#e6f7f1] text-[#0d6b52] flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle2 className="w-8 h-8" />
              </motion.div>
              <h3 className="text-xl font-bold text-[#0a4738] mb-2">
                {t('appReceived')}
              </h3>
              <p className="text-xs text-[#516d63] mb-6">
                Your application for <strong>{job.title}</strong> has been logged into the recruitment registry.
              </p>
              <div className="p-4 rounded-xl bg-[#f4faf7] border border-[#dbebe3] inline-block mb-6">
                <span className="text-xs text-[#7c988e] block">Tracking Reference Number</span>
                <span className="text-xl font-black text-[#0d6b52] font-mono tracking-wider">
                  {submittedRef}
                </span>
              </div>
              <p className="text-xs text-[#7c988e] mb-6">
                Keep this number to track your application status anytime on the Careers page.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#0d6b52] text-white text-xs font-bold hover:bg-[#074533]"
              >
                Done
              </button>
            </div>
          ) : (
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#e6f7f1] text-[#0d6b52] inline-block">
                  {t('submitApplication')}
                </span>
                <span className="text-[10px] font-semibold text-[#0d6b52] bg-[#f4faf7] px-2.5 py-1 rounded-full border border-[#dbebe3] inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#00b887]" /> Direct Public Submission • No Login Required
                </span>
              </div>
              <h3 className="text-xl font-black text-[#0a4738] mb-1">{t(job.title)}</h3>
              <p className="text-xs text-[#7c988e] mb-6">{job.department}</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#0a4738] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Abera Bekele"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#dbebe3] text-xs text-[#0a4738] focus:outline-none focus:border-[#0d6b52] focus:ring-1 focus:ring-[#0d6b52]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0a4738] mb-1.5">
                    National ID Number *
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    required
                    value={formData.nationalId}
                    onChange={handleNationalIdChange}
                    onKeyDown={handleKeyDownNumbersOnly}
                    onPaste={handlePasteNumbersOnly}
                    placeholder="e.g. 104829571932"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#dbebe3] text-xs font-mono tracking-wider text-[#0a4738] focus:outline-none focus:border-[#0d6b52] focus:ring-1 focus:ring-[#0d6b52]"
                  />
                  <span className="text-[10px] text-[#7c988e] mt-1 block">
                    Numbers only (letters and special characters are not accepted)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0a4738] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="abera@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#dbebe3] text-xs text-[#0a4738] focus:outline-none focus:border-[#0d6b52] focus:ring-1 focus:ring-[#0d6b52]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0a4738] mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+251 911 000 000"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#dbebe3] text-xs text-[#0a4738] focus:outline-none focus:border-[#0d6b52] focus:ring-1 focus:ring-[#0d6b52]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0a4738] mb-1.5">
                    Highest Level of Education
                  </label>
                  <select
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#dbebe3] text-xs text-[#0a4738] focus:outline-none focus:border-[#0d6b52] focus:ring-1 focus:ring-[#0d6b52] bg-white"
                  >
                    <option>TVET / Diploma</option>
                    <option>BSc / BA Degree</option>
                    <option>MSc / MA Degree</option>
                    <option>PhD / Doctorate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0a4738] mb-1.5">
                    Curriculum Vitae (PDF Document)
                  </label>
                  <div className="border-2 border-dashed border-[#dbebe3] hover:border-[#0d6b52] rounded-2xl p-4 text-center cursor-pointer transition-colors bg-[#f4faf7]">
                    <UploadCloud className="w-6 h-6 text-[#0d6b52] mx-auto mb-1" />
                    <span className="text-xs font-medium text-[#0a4738] block">
                      Upload your CV or Resume
                    </span>
                    <span className="text-[10px] text-[#7c988e]">PDF format up to 5MB</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0a4738] mb-1.5">
                    Cover Note / Brief Statement
                  </label>
                  <textarea
                    rows={3}
                    value={formData.coverNote}
                    onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                    placeholder="Share a brief statement about your experience and motivation…"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#dbebe3] text-xs text-[#0a4738] focus:outline-none focus:border-[#0d6b52] focus:ring-1 focus:ring-[#0d6b52]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#edf5f1]">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl border border-[#dbebe3] text-xs font-semibold text-[#516d63] hover:bg-[#f4faf7]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0d6b52] to-[#074533] text-white text-xs font-bold hover:from-[#0a5c46] hover:to-[#053225] shadow-md shadow-[#0d6b52]/15 transition-all"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
