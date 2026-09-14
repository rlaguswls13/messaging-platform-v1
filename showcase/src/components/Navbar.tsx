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
          ? 'bg-[#0B0F19]/85 backdrop-blur-md border-b border-slate-800/80 shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                OmniFlow
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  v1.0
                </span>
              </span>
              <span className="text-[10px] text-slate-400 tracking-wider">차세대 옴니채널 메시징 SaaS</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#ai-demo" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-400" />
              AI 템플릿 체험
            </a>
            <a href="#dual-ux" className="hover:text-indigo-400 transition-colors">
              Dual-UX
            </a>
            <a href="#security" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400" />
              엔터프라이즈 보안
            </a>
            <a href="#performance" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
              <Server className="w-4 h-4 text-blue-400" />
              5.4만 TPS 성능
            </a>
            <a href="#roadmap" className="hover:text-indigo-400 transition-colors">
              채널 로드맵
            </a>
            <a href="#pricing" className="hover:text-indigo-400 transition-colors">
              요금제
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#ai-demo"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-size-200 hover:bg-right transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
            >
              <span>3초 무료 체험</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F172A]/95 backdrop-blur-xl border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 mt-3">
          <a
            href="#ai-demo"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 font-medium hover:text-indigo-400"
          >
            ⚡ AI 템플릿 실시간 체험
          </a>
          <a
            href="#dual-ux"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 font-medium hover:text-indigo-400"
          >
            👥 Dual-UX (소상공인 vs 엔터프라이즈)
          </a>
          <a
            href="#security"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 font-medium hover:text-indigo-400"
          >
            🛡️ 가상 인프라 격리 보안
          </a>
          <a
            href="#performance"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 font-medium hover:text-indigo-400"
          >
            🚀 초당 5.4만 건 실측 성능
          </a>
          <a
            href="#roadmap"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 font-medium hover:text-indigo-400"
          >
            🔌 3단계 순차 채널 로드맵
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 font-medium hover:text-indigo-400"
          >
            💳 요금제 및 견적
          </a>
          <div className="pt-2">
            <a
              href="#ai-demo"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white bg-indigo-600"
            >
              지금 템플릿 무료 생성
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
