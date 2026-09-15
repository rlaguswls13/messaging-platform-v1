import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DashboardSection } from './components/DashboardSection';
import { PhasedRoadmap } from './components/PhasedRoadmap';
import { LiveAiDemo } from './components/LiveAiDemo';
import { DualUxSection } from './components/DualUxSection';
import { SecuritySection } from './components/SecuritySection';
import { BenchmarkSection } from './components/BenchmarkSection';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col selection:bg-blue-500 selection:text-white relative overflow-x-hidden">
      {/* Background Soft Pastel Ambient Lights */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[500px] bg-pastel-blue-100/60 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="fixed top-1/3 right-10 w-[500px] h-[500px] bg-pastel-orange-100/50 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-10 left-1/3 w-[700px] h-[400px] bg-pastel-blue-50/70 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* Top Fixed Header */}
      <Navbar />

      {/* Main Sections (What to do 4대 핵심 축) */}
      <main className="flex-grow">
        <HeroSection />
        <DashboardSection />
        <PhasedRoadmap />
        <LiveAiDemo />
        <DualUxSection />
        <SecuritySection />
        <BenchmarkSection />
        <PricingSection />
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
