import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HiAcademicCap, 
  HiBookOpen, 
  HiCalculator, 
  HiSearch, 
  HiMenu, 
  HiX,
  HiChevronDown,
  HiVideoCamera,
  HiClock,
  HiHome,
  HiSparkles,
  HiMail
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { STREAMS } from '../data/streamsData';

export default function Navbar({ onSelectStream, onOpenCalculator, onOpenSearch, onOpenContact }) {
  const [isOpen, setIsOpen] = useState(false);
  const [streamDropdown, setStreamDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleStreamClick = (streamId) => {
    if (onSelectStream) onSelectStream(streamId);
    navigate('/streams');
    setStreamDropdown(false);
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#FFFAF3]/95 backdrop-blur-md border-b border-[#FFE5BF] shadow-2xs font-['Cairo']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-[#F62440] flex items-center justify-center text-white text-xl font-bold shadow-xs group-hover:scale-105 transition-transform">
                🎓
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg text-[#1c1917] tracking-tight group-hover:text-[#F62440] transition-colors leading-none">
                  نجاحي <span className="text-[#F62440] text-sm font-bold font-sans">Naja7i</span>
                </span>
                <span className="text-[10px] text-[#78716c] font-medium leading-tight mt-0.5">
                  منصة بكالوريا الجزائر 🇩🇿
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            
            <Link 
              to="/" 
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                isActive('/') 
                  ? 'text-[#F62440] bg-[#FFF2DB]' 
                  : 'text-[#1c1917] hover:text-[#F62440] hover:bg-[#FFF2DB]'
              }`}
            >
              <HiHome className="w-4 h-4 text-[#F62440]" />
              <span>الرئيسية</span>
            </Link>

            {/* Streams Dropdown */}
            <div className="relative">
              <button
                onClick={() => setStreamDropdown(!streamDropdown)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  isActive('/streams')
                    ? 'text-[#F62440] bg-[#FFF2DB]'
                    : 'text-[#1c1917] hover:text-[#F62440] hover:bg-[#FFF2DB]'
                }`}
              >
                <span>الشعب والمواد</span>
                <HiChevronDown className={`w-3.5 h-3.5 transition-transform ${streamDropdown ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {streamDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-1 w-64 p-2 bg-[#FFFAF3] rounded-2xl border border-[#FFE5BF] shadow-lg z-50"
                  >
                    <div className="text-[11px] font-bold text-[#78716c] px-3 py-1.5 border-b border-[#FFE5BF] mb-1 flex items-center justify-between">
                      <span>اختر شعبة البكالوريا</span>
                      <Link to="/streams" onClick={() => setStreamDropdown(false)} className="text-[#F62440] text-[10px] hover:underline">
                        عرض الكل
                      </Link>
                    </div>
                    <div className="space-y-0.5">
                      {STREAMS.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => handleStreamClick(s.id)}
                          className="w-full text-right flex items-center justify-between p-2 rounded-xl hover:bg-[#FFF2DB] transition-colors group cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base">{s.icon}</span>
                            <div className="text-xs font-bold text-[#1c1917] group-hover:text-[#F62440]">
                              {s.name}
                            </div>
                          </div>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FFF2DB] text-[#57534e] border border-[#FFE5BF] font-mono">
                            {s.subjectsCount} مواد
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              to="/library" 
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                isActive('/library')
                  ? 'text-[#F62440] bg-[#FFF2DB]'
                  : 'text-[#1c1917] hover:text-[#F62440] hover:bg-[#FFF2DB]'
              }`}
            >
              <HiBookOpen className="w-4 h-4 text-[#F62440]" />
              <span>مكتبة الملخصات</span>
            </Link>

            <Link 
              to="/bac-archive" 
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                isActive('/bac-archive')
                  ? 'text-[#F62440] bg-[#FFF2DB]'
                  : 'text-[#1c1917] hover:text-[#F62440] hover:bg-[#FFF2DB]'
              }`}
            >
              <span>أرشيف البكالوريا</span>
            </Link>

            <Link 
              to="/youtube-teachers" 
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                isActive('/youtube-teachers')
                  ? 'text-[#F62440] bg-[#FFF2DB]'
                  : 'text-[#1c1917] hover:text-[#F62440] hover:bg-[#FFF2DB]'
              }`}
            >
              <HiVideoCamera className="w-4 h-4 text-[#F62440]" />
              <span>أساتذة اليوتيوب</span>
            </Link>

            <Link 
              to="/countdown" 
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                isActive('/countdown')
                  ? 'text-[#F62440] bg-[#FFF2DB]'
                  : 'text-[#1c1917] hover:text-[#F62440] hover:bg-[#FFF2DB]'
              }`}
            >
              <HiClock className="w-4 h-4 text-[#F62440]" />
              <span>العداد</span>
            </Link>

            <Link 
              to="/about" 
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                isActive('/about')
                  ? 'text-[#F62440] bg-[#FFF2DB]'
                  : 'text-[#1c1917] hover:text-[#F62440] hover:bg-[#FFF2DB]'
              }`}
            >
              <span>قصة المنصة 🇩🇿</span>
            </Link>

            <Link 
              to="/contact" 
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                isActive('/contact')
                  ? 'text-[#F62440] bg-[#FFF2DB]'
                  : 'text-[#1c1917] hover:text-[#F62440] hover:bg-[#FFF2DB]'
              }`}
            >
              <span>تواصل ومساهمة 🤝</span>
            </Link>

          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FFF2DB] hover:bg-[#FFE5BF] text-[#57534e] hover:text-[#1c1917] border border-[#FFE5BF] text-xs font-semibold cursor-pointer transition-colors"
            >
              <HiSearch className="w-4 h-4 text-[#78716c]" />
              <span className="hidden sm:inline">بحث...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white text-[10px] text-[#57534e] font-mono border border-[#FFE5BF]">
                Ctrl K
              </kbd>
            </button>

            {/* Calculator Link */}
            <Link
              to="/calculator"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#F62440] hover:bg-[#d81b34] text-white font-bold text-xs shadow-xs transition-colors"
            >
              <HiCalculator className="w-4 h-4" />
              <span>حاسبة المعدل</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#FFF2DB] border border-[#FFE5BF] text-[#1c1917] hover:bg-[#FFE5BF] cursor-pointer"
            >
              {isOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#FFFAF3] border-b border-[#FFE5BF] px-4 pt-2 pb-6 space-y-3"
          >
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#FFE5BF]">
              {STREAMS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleStreamClick(s.id)}
                  className="flex items-center gap-2 p-2 rounded-xl bg-[#FFF2DB] border border-[#FFE5BF] text-right text-xs font-bold text-[#1c1917]"
                >
                  <span>{s.icon}</span>
                  <span className="truncate">{s.name}</span>
                </button>
              ))}
            </div>

            <div className="flex flex-col space-y-1">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-[#1c1917] hover:bg-[#FFF2DB]"
              >
                <HiHome className="w-4 h-4 text-[#F62440]" />
                <span>الرئيسية</span>
              </Link>
              <Link
                to="/streams"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-[#1c1917] hover:bg-[#FFF2DB]"
              >
                <HiAcademicCap className="w-4 h-4 text-[#F62440]" />
                <span>الشعب والمواد</span>
              </Link>
              <Link
                to="/library"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-[#1c1917] hover:bg-[#FFF2DB]"
              >
                <HiBookOpen className="w-4 h-4 text-[#F62440]" />
                <span>مكتبة الملخصات</span>
              </Link>
              <Link
                to="/bac-archive"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-[#1c1917] hover:bg-[#FFF2DB]"
              >
                <HiSparkles className="w-4 h-4 text-[#F62440]" />
                <span>أرشيف البكالوريا (2008—2025)</span>
              </Link>
              <Link
                to="/youtube-teachers"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-[#1c1917] hover:bg-[#FFF2DB]"
              >
                <HiVideoCamera className="w-4 h-4 text-[#F62440]" />
                <span>أساتذة وقنوات اليوتيوب</span>
              </Link>
              <Link
                to="/countdown"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-[#1c1917] hover:bg-[#FFF2DB]"
              >
                <HiClock className="w-4 h-4 text-[#F62440]" />
                <span>العداد التنازلي</span>
              </Link>
              <Link
                to="/calculator"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-[#1c1917] hover:bg-[#FFF2DB]"
              >
                <HiCalculator className="w-4 h-4 text-[#F62440]" />
                <span>حاسبة معدل البكالوريا</span>
              </Link>
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-[#1c1917] hover:bg-[#FFF2DB]"
              >
                <span>قصة المنصة ومؤسسها 🇩🇿</span>
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-[#F62440] bg-[#FFF2DB]"
              >
                <HiMail className="w-4 h-4" />
                <span>تواصل معنا واقترح محتوى 📥</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
