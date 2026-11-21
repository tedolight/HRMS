import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import { useLanguage } from '@/context/app/LanguageContext';

export default function ContactInfo() {
  const { t } = useLanguage();

  const details = [
    {
      icon: MapPin,
      title: t('physicalAddress'),
      content: 'Hossana, Hadiya Zone, Central Ethiopia Regional State',
    },
    {
      icon: Mail,
      title: t('emailInquiries'),
      content: 'info@hadiyast.gov.et / contact@hadiyast.gov.et',
    },
    {
      icon: Phone,
      title: t('phoneHelpline'),
      content: '+251 46 555 1234 / +251 46 555 5678',
    },
    {
      icon: Clock,
      title: t('workingHours'),
      content: 'Monday – Friday: 8:30 AM – 5:30 PM (Lunch: 12:30 PM – 1:30 PM)',
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-8 border border-[#dbebe3] shadow-sm mb-8">
      <h3 className="text-xl font-bold text-[#0a4738] mb-6">{t('contactLocationTitle')}</h3>
      <div className="space-y-5">
        {details.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#e6f7f1] text-[#0d6b52] flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0a4738] mb-0.5">{item.title}</h4>
                <p className="text-xs text-[#516d63] leading-relaxed">{item.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

