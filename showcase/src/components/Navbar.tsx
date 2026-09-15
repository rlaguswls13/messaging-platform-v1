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

          {/* Desktop Nav Links (What to do 4대 축) */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <a href="#dashboard" className="hover:text-pastel-blue-600 transition-colors flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-pastel-blue-500"></span>
              대시보드
            </a>
            <a href="#channels" className="hover:text-pastel-blue-600 transition-colors flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
              다양한 채널
            </a>
            <a href="#templates" className="hover:text-pastel-blue-600 transition-colors flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-pastel-orange-500" />
              템플릿 생성
            </a>
            <a href="#accessibility" className="hover:text-pastel-blue-600 transition-colors flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              고객 접근성
            </a>
            <a href="#pricing" className="hover:text-pastel-orange-600 transition-colors font-bold text-pastel-orange-600">
              요금제
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-pastel-blue-600 via-sky-600 to-pastel-orange-500 hover:from-pastel-blue-700 hover:to-pastel-orange-600 transition-all duration-300 shadow-md shadow-pastel-blue-500/20 hover:shadow-lg hover:shadow-pastel-orange-500/25 hover:-translate-y-0.5"
            >
              <span>실시간 분석 보기</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
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
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-5 pt-3 pb-6 space-y-3 mt-2 shadow-xl">
          <a
            href="#dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-800 font-bold hover:text-pastel-blue-600"
          >
            📊 1) 대시보드 : 발송·클릭·오픈·고객수
          </a>
          <a
            href="#channels"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-800 font-bold hover:text-pastel-blue-600"
          >
            🔌 2) 다양한 채널 : 이메일/푸시/LINE + 문자
          </a>
          <a
            href="#templates"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-800 font-bold hover:text-pastel-blue-600"
          >
            ✨ 3) 템플릿 생성 : AI 멀티채널 배너 & 법령준수
          </a>
          <a
            href="#accessibility"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-800 font-bold hover:text-pastel-blue-600"
          >
            👥 4) 고객 접근성 : 노코드 ➔ Pro Mode (DB쿼리/암호화)
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-pastel-orange-600 font-extrabold hover:text-pastel-orange-700"
          >
            💳 요금제 및 인원수 정책
          </a>
          <div className="pt-2">
            <a
              href="#templates"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-pastel-blue-600 to-pastel-orange-500 shadow-md"
            >
              AI 템플릿 즉시 체험
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

