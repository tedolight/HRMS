import HeroSection from '@/components/home/HeroSection';
import QuickAccess from '@/components/home/QuickAccess';
import AboutCommitment from '@/components/home/AboutCommitment';
import DepartmentsPreview from '@/components/home/DepartmentsPreview';
import UpdatesPanels from '@/components/home/UpdatesPanels';
import DocumentsPreview from '@/components/home/DocumentsPreview';
import CTASection from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <QuickAccess />
      <AboutCommitment />
      <DepartmentsPreview />
      <UpdatesPanels />
      <DocumentsPreview />
      <CTASection />
    </div>
  );
}

