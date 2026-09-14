import React, { useState, useEffect } from 'react';
import { Shield, Zap, Sparkles, Menu, X, ArrowRight, Server } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pastel-blue-600 via-sky-500 to-pastel-orange-500 p-0.5 shadow-md shadow-pastel-blue-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-pastel-blue-600 group-hover:text-pastel-orange-500 transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-1.5">
                OmniFlow
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-pastel-blue-100 text-pastel-blue-700 border border-pastel-blue-200">
                  v1.0
                </span>
              </span>
              <span className="text-[10px] text-slate-500 tracking-wider">차세대 옴니채널 메시징 SaaS</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <a href="#ai-demo" className="hover:text-pastel-blue-600 transition-colors flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-pastel-orange-500" />
              AI 템플릿 체험
            </a>
            <a href="#dual-ux" className="hover:text-pastel-blue-600 transition-colors">
              Dual-UX
            </a>
            <a href="#security" className="hover:text-pastel-blue-600 transition-colors flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-600" />
              엔터프라이즈 보안
            </a>
            <a href="#performance" className="hover:text-pastel-blue-600 transition-colors flex items-center gap-1.5">
              <Server className="w-4 h-4 text-pastel-blue-600" />
              5.4만 TPS 성능
            </a>
            <a href="#roadmap" className="hover:text-pastel-blue-600 transition-colors">
              채널 로드맵
            </a>
            <a href="#pricing" className="hover:text-pastel-orange-600 transition-colors font-bold text-pastel-orange-600">
              요금제 & 인원수
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#ai-demo"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-pastel-blue-600 via-sky-600 to-pastel-orange-500 hover:from-pastel-blue-700 hover:to-pastel-orange-600 transition-all duration-300 shadow-md shadow-pastel-blue-500/20 hover:shadow-lg hover:shadow-pastel-orange-500/25 hover:-translate-y-0.5"
            >
              <span>3초 무료 체험</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-5 pt-3 pb-6 space-y-3 mt-2 shadow-xl">
          <a
            href="#ai-demo"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-700 font-semibold hover:text-pastel-blue-600"
          >
            ⚡ AI 템플릿 실시간 체험
          </a>
          <a
            href="#dual-ux"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-700 font-semibold hover:text-pastel-blue-600"
          >
            👥 Dual-UX (소상공인 vs 엔터프라이즈)
          </a>
          <a
            href="#security"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-700 font-semibold hover:text-pastel-blue-600"
          >
            🛡️ 가상 인프라 격리 보안
          </a>
          <a
            href="#performance"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-700 font-semibold hover:text-pastel-blue-600"
          >
            🚀 초당 5.4만 건 실측 성능
          </a>
          <a
            href="#roadmap"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-700 font-semibold hover:text-pastel-blue-600"
          >
            🔌 3단계 순차 채널 로드맵
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-pastel-orange-600 font-bold hover:text-pastel-orange-700"
          >
            💳 요금제 및 인원수 견적
          </a>
          <div className="pt-2">
            <a
              href="#ai-demo"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-pastel-blue-600 to-pastel-orange-500 shadow-md"
            >
              지금 템플릿 무료 생성
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

