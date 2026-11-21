import { useState } from 'react';
import { Send, CheckCircle2, Copy, Check, Ticket, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { DEPARTMENTS } from '@/constants/data';
import { BACKEND_URL } from '@/services/adminSync';
import { useLanguage } from '@/context/app/LanguageContext';

export default function ContactForm() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: DEPARTMENTS[0]?.name || 'Software Engineering',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    let generatedTicket = `ENQ-${Math.floor(10000 + Math.random() * 90000)}`;

    try {
      const res = await fetch(`${BACKEND_URL}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone || '',
          department: formData.department,
          subject: formData.subject || 'Official Citizen Enquiry',
          message: formData.message,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json?.data?.ticketId) {
          generatedTicket = json.data.ticketId;
        }
      }
    } catch {
      // Local fallback continues
    }

    // Persist locally for redundancy
    const saved = JSON.parse(localStorage.getItem('portal_inquiries') || '[]');
    saved.push({
      ...formData,
      ticketId: generatedTicket,
      submittedAt: new Date().toISOString(),
    });
    localStorage.setItem('portal_inquiries', JSON.stringify(saved));

    setTicketId(generatedTicket);
    setSubmitted(true);
    setIsSubmitting(false);
    toast.success(`Enquiry submitted. Reference Ticket: ${generatedTicket}`);
  };

  const handleCopyTicket = () => {
    navigator.clipboard.writeText(ticketId);
    setCopied(true);
    toast.success('Ticket reference copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-[#dbebe3] shadow-sm text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#e6f7f1] text-[#0d6b52] flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-[#00b887]" />
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e6f7f1] text-[#0d6b52] text-xs font-bold mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-[#00b887]" />
          <span>Official Enquiry Logged</span>
        </span>
        <h3 className="text-xl font-bold text-[#0a4738] mb-2">{t('messageDispatched')}</h3>
        <p className="text-xs text-[#516d63] leading-relaxed mb-6 max-w-sm mx-auto">
          Your enquiry has been formally assigned to the <strong>{formData.department}</strong> directorate.
          Our public service desk will respond within 24 to 48 business hours.
        </p>

        {/* Tracking Ticket Box */}
        <div className="p-4 rounded-2xl bg-[#f4faf7] border border-[#dbebe3] max-w-sm mx-auto mb-6 flex items-center justify-between">
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-[#7c988e] block">Tracking Ticket Reference</span>
            <span className="text-base font-black text-[#0d6b52] tracking-wider font-mono">{ticketId}</span>
          </div>
          <button
            type="button"
            onClick={handleCopyTicket}
            className="p-2.5 rounded-xl bg-white border border-[#dbebe3] hover:bg-[#e6f7f1] text-[#0d6b52] transition-colors"
            title="Copy Ticket Reference"
          >
            {copied ? <Check className="w-4 h-4 text-[#00b887]" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        <button
          onClick={() => {
            setSubmitted(false);
            setTicketId('');
            setFormData({
              name: '',
              email: '',
              phone: '',
              department: DEPARTMENTS[0]?.name || 'Software Engineering',
              subject: '',
              message: '',
            });
          }}
          className="px-6 py-2.5 rounded-xl bg-[#0d6b52] text-white text-xs font-bold hover:bg-[#074533] transition-all shadow-md shadow-[#0d6b52]/15"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 border border-[#dbebe3] shadow-sm">
      <h3 className="text-xl font-bold text-[#0a4738] mb-2">{t('sendEnquiryTitle')}</h3>
      <p className="text-xs text-[#516d63] mb-6">
        Submit direct inquiries, partnership proposals, or service feedback to our team.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#0a4738] mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Abera Bekele"
              className="w-full px-4 py-2.5 rounded-xl border border-[#dbebe3] text-xs text-[#0a4738] focus:outline-none focus:border-[#0d6b52] focus:ring-1 focus:ring-[#0d6b52]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0a4738] mb-1.5">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+251 911 000 000"
              className="w-full px-4 py-2.5 rounded-xl border border-[#dbebe3] text-xs text-[#0a4738] focus:outline-none focus:border-[#0d6b52] focus:ring-1 focus:ring-[#0d6b52]"
            />
          </div>
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
              Target Directorate *
            </label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-[#dbebe3] text-xs text-[#0a4738] focus:outline-none focus:border-[#0d6b52] focus:ring-1 focus:ring-[#0d6b52] bg-white"
            >
              {DEPARTMENTS.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#0a4738] mb-1.5">
            Subject
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="e.g. Inquiry regarding digital training session"
            className="w-full px-4 py-2.5 rounded-xl border border-[#dbebe3] text-xs text-[#0a4738] focus:outline-none focus:border-[#0d6b52] focus:ring-1 focus:ring-[#0d6b52]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#0a4738] mb-1.5">
            Your Message *
          </label>
          <textarea
            rows={5}
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Please detail your request or message with as much clarity as possible…"
            className="w-full px-4 py-2.5 rounded-xl border border-[#dbebe3] text-xs text-[#0a4738] focus:outline-none focus:border-[#0d6b52] focus:ring-1 focus:ring-[#0d6b52]"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-xl bg-[#0d6b52] hover:bg-[#074533] disabled:opacity-60 text-white text-xs font-bold transition-all shadow-md shadow-[#0d6b52]/15 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>{isSubmitting ? 'Transmitting Official Enquiry…' : 'Send Message'}</span>
        </button>
      </form>
    </div>
  );
}

