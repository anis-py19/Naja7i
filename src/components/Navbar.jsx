import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HiSearch, 
  HiMenu, 
  HiX,
  HiChevronDown,
  HiCalculator,
  HiCalendar,
  HiClock,
  HiUpload,
  HiAdjustments
} from 'react-icons/hi';
import { STREAMS } from '../data/streamsData';
import { getActiveFeaturesConfig } from '../config/siteConfig';

export default function Navbar({ onSelectStream, onOpenSearch, onOpenContact, onOpenAdmin, isAdmin }) {
  const [isOpen, setIsOpen] = useState(false);
  const [streamDropdown, setStreamDropdown] = useState(false);
  const [toolsDropdown, setToolsDropdown] = useState(false);
  const [featuresConfig, setFeaturesConfig] = useState(getActiveFeaturesConfig());
  
  const streamDropdownRef = useRef(null);
  const toolsDropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Listen to live feature config changes
  useEffect(() => {
    const handleConfigChange = () => {
      setFeaturesConfig(getActiveFeaturesConfig());
    };
    window.addEventListener('naja7i_features_config_changed', handleConfigChange);
    return () => window.removeEventListener('naja7i_features_config_changed', handleConfigChange);
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (streamDropdownRef.current && !streamDropdownRef.current.contains(event.target)) {
        setStreamDropdown(false);
      }
      if (toolsDropdownRef.current && !toolsDropdownRef.current.contains(event.target)) {
        setToolsDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleStreamClick = (streamId) => {
    if (onSelectStream) {
      onSelectStream(streamId);
    }
    navigate('/streams');
    setStreamDropdown(false);
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;
  const isToolsActive = ['/calculator', '/study-planner', '/countdown', '/focus-room', '/focus', '/mistakes-notebook', '/carnet-erreurs'].includes(location.pathname);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#0F172A] border-b border-slate-800 text-white font-['Cairo'] transition-all shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15">
          
          {/* Logo & Platform Name with High Contrast Standout Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-white p-0.5 shadow-md flex items-center justify-center transition-transform group-hover:scale-105 border border-white/20 shrink-0">
                <img 
                  src="/logo.jpg" 
                  alt="نجاحي Naja7i Logo" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-black text-base text-white tracking-tight">
                    نجاحي
                  </span>
                  <span className="text-[#E11D48] text-xs font-bold font-mono">
                    Naja7i
                  </span>
                </div>
                <span className="text-[11px] text-slate-300 leading-tight mt-0.5 font-medium">
                  فضاء البكالوريا الجزائرية
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Compact Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-bold">
            
            {/* 1. الرئيسية */}
            <Link 
              to="/" 
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                isActive('/') 
                  ? 'text-white bg-[#E11D48] shadow-xs' 
                  : 'text-slate-200 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              الرئيسية
            </Link>

            {/* 2. الشعب والمواد (Dropdown) */}
            <div className="relative" ref={streamDropdownRef}>
              <button
                type="button"
                onClick={() => {
                  setStreamDropdown(!streamDropdown);
                  setToolsDropdown(false);
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  isActive('/streams') || streamDropdown
                    ? 'text-white bg-[#E11D48] shadow-xs'
                    : 'text-slate-200 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <span>الشعب والمواد</span>
                {featuresConfig.streams?.isMaintenance && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                )}
                <HiChevronDown className={`w-3.5 h-3.5 transition-transform ${streamDropdown ? 'rotate-180' : ''}`} />
              </button>

              {streamDropdown && (
                <div className="absolute top-full right-0 mt-1.5 w-64 p-2 bg-white text-[#0F172A] rounded-xl border border-[#E2E8F0] shadow-2xl z-50 text-right">
                  <div className="text-[11px] font-bold text-[#64748B] px-2 py-1 border-b border-[#E2E8F0] mb-1 flex items-center justify-between">
                    <span>اختر الشعبة الدراسية:</span>
                    <button 
                      onClick={() => {
                        navigate('/streams');
                        setStreamDropdown(false);
                      }}
                      className="text-[#E11D48] text-[10px] hover:underline font-bold cursor-pointer"
                    >
                      عرض الكل
                    </button>
                  </div>
                  <div className="space-y-1">
                    {STREAMS.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => handleStreamClick(s.id)}
                        className="w-full text-right flex items-center justify-between p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{s.icon}</span>
                          <span className="text-xs font-bold text-[#0F172A] group-hover:text-[#E11D48]">
                            {s.name}
                          </span>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                          {s.subjectsCount} مواد
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. مكتبة الملخصات */}
            <Link 
              to="/library" 
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                isActive('/library')
                  ? 'text-white bg-[#E11D48] shadow-xs'
                  : 'text-slate-200 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <span>مكتبة الملخصات</span>
              {featuresConfig.library?.isMaintenance && (
                <span className="text-[9px] px-1 rounded bg-amber-500/30 text-amber-300">صيانة</span>
              )}
            </Link>

            {/* 4. أرشيف البكالوريا */}
            <Link 
              to="/bac-archive" 
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                isActive('/bac-archive')
                  ? 'text-white bg-[#E11D48] shadow-xs'
                  : 'text-slate-200 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <span>أرشيف البكالوريا</span>
              {featuresConfig.bac_archive?.isMaintenance && (
                <span className="text-[9px] px-1 rounded bg-amber-500/30 text-amber-300">صيانة</span>
              )}
            </Link>

            {/* 5. قنوات وأساتذة اليوتيوب */}
            <Link 
              to="/youtube-teachers" 
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                isActive('/youtube-teachers')
                  ? 'text-white bg-[#E11D48] shadow-xs'
                  : 'text-slate-200 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              أساتذة اليوتيوب
            </Link>

            {/* 5.5 غرفة التركيز وبومودورو */}
            <Link 
              to="/focus-room" 
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                isActive('/focus-room') || isActive('/focus')
                  ? 'text-white bg-indigo-600 shadow-xs'
                  : 'text-indigo-200 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>غرفة التركيز 🎧</span>
              {featuresConfig.focus_room?.isMaintenance && (
                <span className="text-[9px] px-1 rounded bg-amber-500/30 text-amber-300">صيانة</span>
              )}
            </Link>

            {/* 6. أدوات ومخطط المراجعة (Dropdown) */}
            <div className="relative" ref={toolsDropdownRef}>
              <button
                type="button"
                onClick={() => {
                  setToolsDropdown(!toolsDropdown);
                  setStreamDropdown(false);
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  isToolsActive || toolsDropdown
                    ? 'text-white bg-[#E11D48] shadow-xs'
                    : 'text-slate-200 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <span>أدوات ومخطط المراجعة</span>
                <HiChevronDown className={`w-3.5 h-3.5 transition-transform ${toolsDropdown ? 'rotate-180' : ''}`} />
              </button>

              {toolsDropdown && (
                <div className="absolute top-full right-0 mt-1.5 w-60 p-2 bg-white text-[#0F172A] rounded-xl border border-[#E2E8F0] shadow-2xl z-50 text-right space-y-1">
                  
                  <Link
                    to="/focus-room"
                    onClick={() => setToolsDropdown(false)}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                        🎧
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#0F172A] group-hover:text-[#E11D48] block">
                          غرفة التركيز (بومودورو)
                        </span>
                        <span className="text-[10px] text-[#64748B]">
                          أجواء دراسة هادئة
                        </span>
                      </div>
                    </div>
                    {featuresConfig.focus_room?.isMaintenance && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-bold">صيانة</span>
                    )}
                  </Link>

                  <Link
                    to="/mistakes-notebook"
                    onClick={() => setToolsDropdown(false)}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 font-bold">
                        📓
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#0F172A] group-hover:text-[#E11D48] block">
                          كراس الأخطاء والفخاخ الذكي
                        </span>
                        <span className="text-[10px] text-[#64748B]">
                          تدوين الفخاخ والقواعد
                        </span>
                      </div>
                    </div>
                    {featuresConfig.mistakes_notebook?.isMaintenance && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-bold">صيانة</span>
                    )}
                  </Link>

                  <Link
                    to="/ai-summarizer"
                    onClick={() => setToolsDropdown(false)}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-[#E11D48] font-bold">
                        🤖
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#0F172A] group-hover:text-[#E11D48] block">
                          الملخص الذكي (AI)
                        </span>
                        <span className="text-[10px] text-[#64748B]">
                          تلخيص PDF وصور الدروس
                        </span>
                      </div>
                    </div>
                    {featuresConfig.ai_summarizer?.isMaintenance && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-bold">صيانة</span>
                    )}
                  </Link>

                  <Link
                    to="/curriculum"
                    onClick={() => setToolsDropdown(false)}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-[#E11D48] font-bold">
                        📚
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#0F172A] group-hover:text-[#E11D48] block">
                          المنهاج والبرنامج الوزاري
                        </span>
                        <span className="text-[10px] text-[#64748B]">
                          فهرس دروس جميع الشعب
                        </span>
                      </div>
                    </div>
                    {featuresConfig.curriculum?.isMaintenance && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-bold">صيانة</span>
                    )}
                  </Link>

                  <Link
                    to="/study-planner"
                    onClick={() => setToolsDropdown(false)}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-[#E11D48]">
                        <HiCalendar className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#0F172A] group-hover:text-[#E11D48] block">
                          مخطط وجداول المراجعة
                        </span>
                        <span className="text-[10px] text-[#64748B]">
                          أهداف أسبوعية وطباعة A4
                        </span>
                      </div>
                    </div>
                    {featuresConfig.study_planner?.isMaintenance && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-bold">صيانة</span>
                    )}
                  </Link>

                  <Link
                    to="/quiz"
                    onClick={() => setToolsDropdown(false)}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-[#E11D48] font-bold">
                        ⏱️
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#0F172A] group-hover:text-[#E11D48] block">
                          بنك الأسئلة والاختبارات
                        </span>
                        <span className="text-[10px] text-[#64748B]">
                          اختبارات QCM سريعة
                        </span>
                      </div>
                    </div>
                    {featuresConfig.quiz?.isMaintenance && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-bold">صيانة</span>
                    )}
                  </Link>

                  <Link
                    to="/calculator"
                    onClick={() => setToolsDropdown(false)}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-[#E11D48]">
                        <HiCalculator className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#0F172A] group-hover:text-[#E11D48] block">
                          حاسبة معدل البكالوريا
                        </span>
                        <span className="text-[10px] text-[#64748B]">
                          المعاملات والتخصصات
                        </span>
                      </div>
                    </div>
                    {featuresConfig.calculator?.isMaintenance && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-bold">صيانة</span>
                    )}
                  </Link>

                  <Link
                    to="/countdown"
                    onClick={() => setToolsDropdown(false)}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-[#E11D48]">
                        <HiClock className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#0F172A] group-hover:text-[#E11D48] block">
                          العداد التنازلي للبكالوريا
                        </span>
                        <span className="text-[10px] text-[#64748B]">
                          متابعة الأيام ورزنامة المحطات
                        </span>
                      </div>
                    </div>
                    {featuresConfig.countdown?.isMaintenance && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-bold">صيانة</span>
                    )}
                  </Link>
                </div>
              )}
            </div>

            {/* 7. عن المنصة */}
            <Link 
              to="/about" 
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                isActive('/about')
                  ? 'text-white bg-[#E11D48] shadow-xs'
                  : 'text-slate-200 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              عن المنصة
            </Link>

          </nav>

          {/* Left Actions: Admin + Search + Contact Modal Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Admin Control Center Trigger */}
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-400 border border-rose-500/30 text-xs font-bold cursor-pointer transition-colors"
                title="إدارة أوضاع الصيانة للميزات"
              >
                <HiAdjustments className="w-3.5 h-3.5 text-[#E11D48]" />
                <span className="hidden sm:inline">أوضاع الصيانة</span>
              </button>
            )}

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold cursor-pointer transition-colors"
              title="بحث سريع (Ctrl + K)"
            >
              <HiSearch className="w-3.5 h-3.5 text-[#E11D48]" />
              <span className="hidden sm:inline">بحث</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.2 rounded bg-slate-900 text-[9px] text-slate-400 font-mono border border-slate-700">
                Ctrl K
              </kbd>
            </button>

            {/* Contact / Contribution Button */}
            <button
              onClick={onOpenContact}
              className="px-3.5 py-1.5 rounded-lg bg-[#E11D48] hover:bg-[#be123c] text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <HiUpload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">مساهمة وملفات</span>
              <span className="sm:hidden">مساهمة</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-1.5 rounded-lg text-white hover:bg-slate-800 border border-slate-700 cursor-pointer"
              aria-label="القائمة"
            >
              {isOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#0F172A] border-b border-slate-800 px-4 pt-3 pb-5 space-y-3 shadow-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-slate-300">الشعب الدراسية:</span>
            <Link
              to="/streams"
              onClick={() => setIsOpen(false)}
              className="text-[#E11D48] text-xs font-bold hover:underline"
            >
              عرض الكل
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {STREAMS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => handleStreamClick(s.id)}
                className="text-right p-2 rounded-lg bg-slate-800/90 border border-slate-700 flex items-center gap-2 cursor-pointer hover:bg-slate-700"
              >
                <span>{s.icon}</span>
                <span className="text-[11px] font-bold text-white truncate">
                  {s.name}
                </span>
              </button>
            ))}
          </div>

          <div className="flex flex-col space-y-1 text-xs font-bold pt-2 border-t border-slate-800">
            {onOpenAdmin && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenAdmin();
                }}
                className="px-3 py-2 rounded-lg bg-slate-800 text-rose-400 border border-rose-500/30 flex items-center justify-between text-right cursor-pointer"
              >
                <span>لوحة التحكم في أوضاع الصيانة ⚙️</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 font-mono">Admin</span>
              </button>
            )}

            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`px-3 py-2 rounded-lg transition-colors ${isActive('/') ? 'text-white bg-[#E11D48]' : 'text-slate-200 hover:text-white hover:bg-slate-800'}`}
            >
              الرئيسية
            </Link>
            <Link
              to="/library"
              onClick={() => setIsOpen(false)}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${isActive('/library') ? 'text-white bg-[#E11D48]' : 'text-slate-200 hover:text-white hover:bg-slate-800'}`}
            >
              <span>مكتبة الملخصات والسلاسل</span>
              {featuresConfig.library?.isMaintenance && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-300">صيانة</span>
              )}
            </Link>
            <Link
              to="/bac-archive"
              onClick={() => setIsOpen(false)}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${isActive('/bac-archive') ? 'text-white bg-[#E11D48]' : 'text-slate-200 hover:text-white hover:bg-slate-800'}`}
            >
              <span>أرشيف البكالوريا (2008—2026)</span>
              {featuresConfig.bac_archive?.isMaintenance && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-300">صيانة</span>
              )}
            </Link>
            <Link
              to="/youtube-teachers"
              onClick={() => setIsOpen(false)}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${isActive('/youtube-teachers') ? 'text-white bg-[#E11D48]' : 'text-slate-200 hover:text-white hover:bg-slate-800'}`}
            >
              <span>قنوات وأساتذة اليوتيوب</span>
              {featuresConfig.youtube_teachers?.isMaintenance && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-300">صيانة</span>
              )}
            </Link>
            <Link
              to="/focus-room"
              onClick={() => setIsOpen(false)}
              className={`px-3 py-2 rounded-lg transition-colors font-bold flex items-center justify-between ${isActive('/focus-room') ? 'text-white bg-indigo-600' : 'text-indigo-300 hover:text-white hover:bg-slate-800'}`}
            >
              <span>غرفة التركيز (بومودورو) 🎧</span>
              {featuresConfig.focus_room?.isMaintenance ? (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-300">صيانة</span>
              ) : (
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-900 text-indigo-200 font-medium">جديد</span>
              )}
            </Link>
            <Link
              to="/mistakes-notebook"
              onClick={() => setIsOpen(false)}
              className={`px-3 py-2 rounded-lg transition-colors font-bold flex items-center justify-between ${isActive('/mistakes-notebook') ? 'text-white bg-amber-600' : 'text-amber-300 hover:text-white hover:bg-slate-800'}`}
            >
              <span>كراس الأخطاء والفخاخ الذكي 📓</span>
              {featuresConfig.mistakes_notebook?.isMaintenance ? (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-300">صيانة</span>
              ) : (
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-900 text-amber-200 font-medium">جديد</span>
              )}
            </Link>
            <Link
              to="/curriculum"
              onClick={() => setIsOpen(false)}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${isActive('/curriculum') ? 'text-white bg-[#E11D48]' : 'text-slate-200 hover:text-white hover:bg-slate-800'}`}
            >
              <span>دليل المنهاج والبرنامج الوزاري 📚</span>
              {featuresConfig.curriculum?.isMaintenance && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-300">صيانة</span>
              )}
            </Link>
            <Link
              to="/ai-summarizer"
              onClick={() => setIsOpen(false)}
              className={`px-3 py-2 rounded-lg transition-colors font-bold flex items-center justify-between ${isActive('/ai-summarizer') ? 'text-white bg-[#E11D48]' : 'text-rose-300 hover:text-white hover:bg-slate-800'}`}
            >
              <span>الملخص الذكي (AI) 🤖</span>
              {featuresConfig.ai_summarizer?.isMaintenance ? (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-300">صيانة</span>
              ) : (
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-100 text-rose-700 font-medium">جديد</span>
              )}
            </Link>
            <Link
              to="/quiz"
              onClick={() => setIsOpen(false)}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${isActive('/quiz') ? 'text-white bg-[#E11D48]' : 'text-slate-200 hover:text-white hover:bg-slate-800'}`}
            >
              <span>بنك الأسئلة والاختبارات (Quiz & QCM) ⏱️</span>
              {featuresConfig.quiz?.isMaintenance && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-300">صيانة</span>
              )}
            </Link>
            <Link
              to="/study-planner"
              onClick={() => setIsOpen(false)}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${isActive('/study-planner') ? 'text-white bg-[#E11D48]' : 'text-slate-200 hover:text-white hover:bg-slate-800'}`}
            >
              <span>مخطط وجداول المراجعة الأسبوعية</span>
              {featuresConfig.study_planner?.isMaintenance && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-300">صيانة</span>
              )}
            </Link>
            <Link
              to="/calculator"
              onClick={() => setIsOpen(false)}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${isActive('/calculator') ? 'text-white bg-[#E11D48]' : 'text-slate-200 hover:text-white hover:bg-slate-800'}`}
            >
              <span>حاسبة معدل البكالوريا</span>
              {featuresConfig.calculator?.isMaintenance && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-300">صيانة</span>
              )}
            </Link>
            <Link
              to="/countdown"
              onClick={() => setIsOpen(false)}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${isActive('/countdown') ? 'text-white bg-[#E11D48]' : 'text-slate-200 hover:text-white hover:bg-slate-800'}`}
            >
              <span>العداد التنازلي للبكالوريا</span>
              {featuresConfig.countdown?.isMaintenance && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-300">صيانة</span>
              )}
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className={`px-3 py-2 rounded-lg transition-colors ${isActive('/about') ? 'text-white bg-[#E11D48]' : 'text-slate-200 hover:text-white hover:bg-slate-800'}`}
            >
              عن المنصة ومؤسسها
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
