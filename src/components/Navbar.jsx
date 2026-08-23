import React, { useState } from 'react';
import { 
  HiMenu, 
  HiX, 
  HiSearch, 
  HiCalculator, 
  HiBookOpen, 
  HiVideoCamera, 
  HiChevronDown,
  HiClock
} from 'react-icons/hi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { STREAMS } from '../data/streamsData';

export default function Navbar({ onSelectStream, onOpenCalculator, onOpenSearch, onOpenContact }) {
  const [isOpen, setIsOpen] = useState(false);
  const [streamDropdown, setStreamDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleStreamClick = (streamId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        if (onSelectStream) onSelectStream(streamId);
      }, 100);
    } else {
      if (onSelectStream) onSelectStream(streamId);
    }
    setStreamDropdown(false);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#FFFAF3]/95 backdrop-blur-md border-b border-[#FFE5BF] shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-[#F62440] flex items-center justify-center text-white text-xl font-bold shadow-xs">
                🎓
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-tight text-[#1c1917] font-['Cairo']">
                    نجاحي
                  </span>
                  <span className="text-[11px] font-bold px-1.5 py-0.2 rounded bg-[#FFF2DB] text-[#F62440] border border-[#FFE5BF]">
                    BAC 3AS
                  </span>
                </div>
                <span className="text-[11px] text-[#57534e] font-medium -mt-0.5">
                  بنك الدروس والبكالوريات الجزائرية
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            
            <Link 
              to="/" 
              className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-colors ${
                location.pathname === '/'
                  ? 'text-[#F62440] bg-[#FFF2DB]'
                  : 'text-[#1c1917] hover:text-[#F62440] hover:bg-[#FFF2DB]'
              }`}
            >
              الرئيسية
            </Link>

            {/* Dedicated Library Page Link */}
            <Link 
              to="/library" 
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-bold transition-colors ${
                location.pathname === '/library'
                  ? 'text-[#F62440] bg-[#FFF2DB]'
                  : 'text-[#1c1917] hover:text-[#F62440] hover:bg-[#FFF2DB]'
              }`}
            >
              <HiBookOpen className="w-4 h-4 text-[#F62440]" />
              <span>مكتبة الملخصات</span>
            </Link>

            {/* Streams Dropdown */}
            <div className="relative" onMouseLeave={() => setStreamDropdown(false)}>
              <button 
                onClick={() => setStreamDropdown(!streamDropdown)}
                onMouseEnter={() => setStreamDropdown(true)}
                className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-bold text-[#1c1917] hover:text-[#F62440] hover:bg-[#FFF2DB] transition-colors cursor-pointer"
              >
                <span>الشعب والمواد</span>
                <HiChevronDown className={`w-4 h-4 text-[#78716c] transition-transform ${streamDropdown ? 'rotate-180 text-[#F62440]' : ''}`} />
              </button>

              <AnimatePresence>
                {streamDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-1 w-64 p-2 bg-[#FFFAF3] rounded-xl border border-[#FFE5BF] shadow-lg z-50"
                  >
                    <div className="text-[11px] font-bold text-[#78716c] px-3 py-1.5 border-b border-[#FFE5BF] mb-1">
                      اختر شعبة البكالوريا
                    </div>
                    <div className="space-y-0.5">
                      {STREAMS.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => handleStreamClick(s.id)}
                          className="w-full text-right flex items-center justify-between p-2 rounded-lg hover:bg-[#FFF2DB] transition-colors group cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base">{s.icon}</span>
                            <div>
                              <div className="text-xs font-bold text-[#1c1917] group-hover:text-[#F62440]">
                                {s.name}
                              </div>
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

            <a 
              href="/#bac-archive" 
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-bold text-[#1c1917] hover:text-[#F62440] hover:bg-[#FFF2DB] transition-colors"
            >
              <span>مواضيع البكالوريا (2008-2025)</span>
            </a>

            <a 
              href="/#youtube-roadmaps" 
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-bold text-[#1c1917] hover:text-[#F62440] hover:bg-[#FFF2DB] transition-colors"
            >
              <HiVideoCamera className="w-4 h-4 text-[#F62440]" />
              <span>أساتذة اليوتيوب</span>
            </a>

            <Link 
              to="/about" 
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-bold transition-colors ${
                location.pathname === '/about'
                  ? 'text-[#F62440] bg-[#FFF2DB]'
                  : 'text-[#1c1917] hover:text-[#F62440] hover:bg-[#FFF2DB]'
              }`}
            >
              <span>قصة المنصة 🇩🇿</span>
            </Link>

            <button
              onClick={onOpenContact}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-bold text-[#1c1917] hover:text-[#F62440] hover:bg-[#FFF2DB] transition-colors cursor-pointer"
            >
              <span>تواصل ومساهمة 🤝</span>
            </button>

            <a 
              href="/#bac-countdown" 
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-bold text-[#1c1917] hover:text-[#F62440] hover:bg-[#FFF2DB] transition-colors"
            >
              <HiClock className="w-4 h-4 text-[#F62440]" />
              <span>العداد</span>
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FFF2DB] hover:bg-[#FFE5BF] text-[#57534e] hover:text-[#1c1917] border border-[#FFE5BF] text-xs font-semibold cursor-pointer transition-colors"
            >
              <HiSearch className="w-4 h-4 text-[#78716c]" />
              <span className="hidden sm:inline">بحث في الدروس والملخصات...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white text-[10px] text-[#57534e] font-mono border border-[#FFE5BF]">
                Ctrl K
              </kbd>
            </button>

            {/* Calculator CTA */}
            <button
              onClick={onOpenCalculator}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#F62440] hover:bg-[#d81b34] text-white font-bold text-xs shadow-xs cursor-pointer transition-colors"
            >
              <HiCalculator className="w-4 h-4" />
              <span>حاسبة المعدل</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#FFF2DB] border border-[#FFE5BF] text-[#1c1917] hover:bg-[#FFE5BF]"
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
            className="lg:hidden border-t border-[#FFE5BF] bg-[#FFFAF3] px-4 py-4 space-y-3"
          >
            <div className="grid grid-cols-2 gap-2">
              {STREAMS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    handleStreamClick(s.id);
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 p-2 rounded-lg bg-[#FFF2DB] border border-[#FFE5BF] text-right text-xs font-bold text-[#1c1917] hover:border-[#F62440]"
                >
                  <span>{s.icon}</span>
                  <span>{s.name}</span>
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-[#FFE5BF] space-y-1">
              <Link
                to="/library"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-[#1c1917] hover:bg-[#FFF2DB]"
              >
                <HiBookOpen className="w-4 h-4 text-[#F62440]" />
                <span>مكتبة الملخصات</span>
              </Link>
              <a
                href="/#bac-archive"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-[#1c1917] hover:bg-[#FFF2DB]"
              >
                <HiBookOpen className="w-4 h-4 text-[#F62440]" />
                <span>مواضيع البكالوريا (2008-2025)</span>
              </a>
              <a
                href="/#youtube-roadmaps"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-[#1c1917] hover:bg-[#FFF2DB]"
              >
                <HiVideoCamera className="w-4 h-4 text-[#F62440]" />
                <span>أساتذة اليوتيوب</span>
              </a>
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-[#1c1917] hover:bg-[#FFF2DB]"
              >
                <span>قصة المنصة ومؤسسها 🇩🇿</span>
              </Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (onOpenContact) onOpenContact();
                }}
                className="w-full text-right flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-[#F62440] bg-[#FFF2DB] cursor-pointer"
              >
                <span>تواصل معنا واقترح محتوى 📥</span>
              </button>
              <a
                href="/#bac-countdown"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-[#1c1917] hover:bg-[#FFF2DB]"
              >
                <HiClock className="w-4 h-4 text-[#F62440]" />
                <span>العداد التنازلي للبكالوريا</span>
              </a>
              <button
                onClick={() => {
                  if (onOpenCalculator) onOpenCalculator();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-[#1c1917] hover:bg-[#FFF2DB] text-right"
              >
                <HiCalculator className="w-4 h-4 text-[#F62440]" />
                <span>حاسبة معدل البكالوريا</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
