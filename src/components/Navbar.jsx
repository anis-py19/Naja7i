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
  HiBookOpen,
  HiAcademicCap,
  HiUpload
} from 'react-icons/hi';
import { STREAMS } from '../data/streamsData';

export default function Navbar({ onSelectStream, onOpenCalculator, onOpenSearch, onOpenContact }) {
  const [isOpen, setIsOpen] = useState(false);
  const [streamDropdown, setStreamDropdown] = useState(false);
  const [toolsDropdown, setToolsDropdown] = useState(false);
  
  const streamDropdownRef = useRef(null);
  const toolsDropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

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
  const isToolsActive = ['/calculator', '/study-planner', '/countdown'].includes(location.pathname);

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
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]">
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
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                isActive('/library')
                  ? 'text-white bg-[#E11D48] shadow-xs'
                  : 'text-slate-200 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              مكتبة الملخصات
            </Link>

            {/* 4. أرشيف البكالوريا */}
            <Link 
              to="/bac-archive" 
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                isActive('/bac-archive')
                  ? 'text-white bg-[#E11D48] shadow-xs'
                  : 'text-slate-200 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              أرشيف البكالوريا
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

            {/* 6. الملخص الذكي بالذكاء الاصطناعي (Direct Link with Badge) */}
            <Link 
              to="/ai-summarizer" 
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 font-bold ${
                isActive('/ai-summarizer')
                  ? 'text-white bg-[#E11D48] shadow-sm'
                  : 'text-rose-300 bg-rose-950/40 border border-rose-500/30 hover:bg-[#E11D48] hover:text-white'
              }`}
            >
              <span>الملخص الذكي</span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
            </Link>

            {/* 7. أدوات ومخطط المراجعة (Dropdown) */}
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
                    to="/ai-summarizer"
                    onClick={() => setToolsDropdown(false)}
                    className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-[#E11D48] font-bold">
                      🤖
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#0F172A] group-hover:text-[#E11D48] block">
                        الملخص الذكي (AI)
                      </span>
                      <span className="text-[10px] text-[#64748B]">
                        تلخيص PDF وصور الدروس بالذكاء
                      </span>
                    </div>
                  </Link>

                  <Link
                    to="/curriculum"
                    onClick={() => setToolsDropdown(false)}
                    className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-[#E11D48] font-bold">
                      📚
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#0F172A] group-hover:text-[#E11D48] block">
                        المنهاج والبرنامج الوزاري
                      </span>
                      <span className="text-[10px] text-[#64748B]">
                        فهرس دروس ووحدات جميع الشعب
                      </span>
                    </div>
                  </Link>

                  <Link
                    to="/study-planner"
                    onClick={() => setToolsDropdown(false)}
                    className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors group"
                  >
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
                  </Link>

                  <Link
                    to="/quiz"
                    onClick={() => setToolsDropdown(false)}
                    className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-[#E11D48] font-bold">
                      ⏱️
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#0F172A] group-hover:text-[#E11D48] block">
                        بنك الأسئلة والاختبارات
                      </span>
                      <span className="text-[10px] text-[#64748B]">
                        اختبارات سريعة QCM وتصحيح فوري
                      </span>
                    </div>
                  </Link>

                  <Link
                    to="/calculator"
                    onClick={() => setToolsDropdown(false)}
                    className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-[#E11D48]">
                      <HiCalculator className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#0F172A] group-hover:text-[#E11D48] block">
                        حاسبة معدل البكالوريا
                      </span>
                      <span className="text-[10px] text-[#64748B]">
                        المعاملات والتخصصات الرسمية
                      </span>
                    </div>
                  </Link>

                  <Link
                    to="/countdown"
                    onClick={() => setToolsDropdown(false)}
                    className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors group"
                  >
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

          {/* Left Actions: Search + Contact Modal Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            
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
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-slate-800"
            >
              الرئيسية
            </Link>
            <Link
              to="/library"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-slate-800"
            >
              مكتبة الملخصات والسلاسل
            </Link>
            <Link
              to="/bac-archive"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-slate-800"
            >
              أرشيف البكالوريا (2008—2025)
            </Link>
            <Link
              to="/youtube-teachers"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-slate-800"
            >
              قنوات وأساتذة اليوتيوب
            </Link>
            <Link
              to="/curriculum"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-slate-800"
            >
              دليل المنهاج والبرنامج الوزاري 📚
            </Link>
            <Link
              to="/ai-summarizer"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-lg text-rose-300 hover:text-white hover:bg-slate-800 font-bold flex items-center justify-between"
            >
              <span>الملخص الذكي (AI) 🤖</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E11D48] text-white">جديد</span>
            </Link>
            <Link
              to="/quiz"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-slate-800"
            >
              بنك الأسئلة والاختبارات (Quiz & QCM) ⏱️
            </Link>
            <Link
              to="/study-planner"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-lg text-white bg-[#E11D48]"
            >
              مخطط وجداول المراجعة الأسبوعية
            </Link>
            <Link
              to="/calculator"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-slate-800"
            >
              حاسبة معدل البكالوريا
            </Link>
            <Link
              to="/countdown"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-slate-800"
            >
              العداد التنازلي للبكالوريا
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-slate-800"
            >
              عن المنصة ومؤسسها
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
