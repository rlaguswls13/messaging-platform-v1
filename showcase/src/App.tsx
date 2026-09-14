import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LiveAiDemo } from './components/LiveAiDemo';
import { DualUxSection } from './components/DualUxSection';
import { SecuritySection } from './components/SecuritySection';
import { BenchmarkSection } from './components/BenchmarkSection';
import { PhasedRoadmap } from './components/PhasedRoadmap';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Fixed Header */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-grow">
        <HeroSection />
        <LiveAiDemo />
        <DualUxSection />
        <SecuritySection />
        <BenchmarkSection />
        <PhasedRoadmap />
        <PricingSection />
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
