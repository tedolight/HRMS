import { Target, Compass } from 'lucide-react';
import { useLanguage } from '@/context/app/LanguageContext';

export default function MissionVision() {
  const { t } = useLanguage();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      <div className="bg-white rounded-2xl p-8 border border-[#dbebe3] shadow-sm flex flex-col justify-between">
        <div>
          <div className="w-12 h-12 rounded-xl bg-[#e6f7f1] text-[#0d6b52] flex items-center justify-center mb-5">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#0a4738] mb-3">{t('ourMission')}</h3>
          <p className="text-sm text-[#516d63] leading-relaxed">
            {t('missionDesc')}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-[#dbebe3] shadow-sm flex flex-col justify-between">
        <div>
          <div className="w-12 h-12 rounded-xl bg-[#e6f7f1] text-[#0d6b52] flex items-center justify-center mb-5">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#0a4738] mb-3">{t('ourVision')}</h3>
          <p className="text-sm text-[#516d63] leading-relaxed">
            {t('visionDesc')}
          </p>
        </div>
      </div>
    </div>
  );
}

