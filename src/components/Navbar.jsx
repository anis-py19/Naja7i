import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HiSearch, 
  HiMenu, 
  HiX,
  HiChevronDown
} from 'react-icons/hi';
import { STREAMS } from '../data/streamsData';

export default function Navbar({ onSelectStream, onOpenCalculator, onOpenSearch, onOpenContact }) {
  const [isOpen, setIsOpen] = useState(false);
  const [streamDropdown, setStreamDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setStreamDropdown(false);
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

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#FFFAF3] border-b border-[#FFE5BF] font-['Cairo']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#F62440] flex items-center justify-center text-white text-lg font-bold">
                🎓
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base text-[#1c1917] leading-none">
                  نجاحي <span className="text-[#F62440] text-xs font-semibold">Naja7i</span>
                </span>
                <span className="text-[11px] text-[#78716c] leading-tight mt-0.5">
                  فضاء مراجعة البكالوريا
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            
            <Link 
              to="/" 
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                isActive('/') 
                  ? 'text-[#F62440] bg-[#FFF2DB]' 
                  : 'text-[#1c1917] hover:text-[#F62440] hover:bg-[#FFF2DB]'
              }`}
            >
              الرئيسية
            </Link>

            {/* Streams Dropdown Selector */}
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setStreamDropdown(!streamDropdown)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    isActive('/streams') || streamDropdown
                      ? 'text-[#F62440] bg-[#FFF2DB]'
                      : 'text-[#1c1917] hover:text-[#F62440] hover:bg-[#FFF2DB]'
                  }`}
                >
                  <span>الشعب والمواد</span>
                  <HiChevronDown className={`w-3.5 h-3.5 transition-transform ${streamDropdown ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {streamDropdown && (
                <div className="absolute top-full right-0 mt-1.5 w-64 p-2 bg-[#FFFAF3] rounded-xl border border-[#FFE5BF] shadow-lg z-50 text-right">
                  <div className="text-[11px] font-bold text-[#78716c] px-2.5 py-1.5 border-b border-[#FFE5BF] mb-1 flex items-center justify-between">
                    <span>اختر الشعبة الدراسية:</span>
                    <button 
                      onClick={() => {
                        navigate('/streams');
                        setStreamDropdown(false);
                      }}
                      className="text-[#F62440] text-[10px] hover:underline font-bold cursor-pointer"
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
                        className="w-full text-right flex items-center justify-between p-2 rounded-lg hover:bg-[#FFF2DB] transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{s.icon}</span>
                          <span className="text-xs font-bold text-[#1c1917] group-hover:text-[#F62440]">
                            {s.name}
                          </span>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white text-[#57534e] border border-[#FFE5BF]">
                          {s.subjectsCount} مواد
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link 
              to="/library" 
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                isActive('/library')
                  ? 'text-[#F62440] bg-[#FFF2DB]'
                  : 'text-[#1c1917] hover:text-[#F62440] hover:bg-[#FFF2DB]'
              }`}
            >
              مكتبة الملخصات
            </Link>

            <Link 
              to="/bac-archive" 
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                isActive('/bac-archive')
                  ? 'text-[#F62440] bg-[#FFF2DB]'
                  : 'text-[#1c1917] hover:text-[#F62440] hover:bg-[#FFF2DB]'
              }`}
            >
              أرشيف البكالوريا (2008—2025)
            </Link>

            <Link 
              to="/youtube-teachers" 
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                isActive('/youtube-teachers')
                  ? 'text-[#F62440] bg-[#FFF2DB]'
                  : 'text-[#1c1917] hover:text-[#F62440] hover:bg-[#FFF2DB]'
              }`}
            >
              قنوات وأساتذة اليوتيوب
            </Link>

            <Link 
              to="/countdown" 
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                isActive('/countdown')
                  ? 'text-[#F62440] bg-[#FFF2DB]'
                  : 'text-[#1c1917] hover:text-[#F62440] hover:bg-[#FFF2DB]'
              }`}
            >
              العداد
            </Link>

            <Link 
              to="/calculator" 
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                isActive('/calculator')
                  ? 'text-[#F62440] bg-[#FFF2DB]'
                  : 'text-[#1c1917] hover:text-[#F62440] hover:bg-[#FFF2DB]'
              }`}
            >
              حاسبة المعدل
            </Link>

            <Link 
              to="/about" 
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                isActive('/about')
                  ? 'text-[#F62440] bg-[#FFF2DB]'
                  : 'text-[#1c1917] hover:text-[#F62440] hover:bg-[#FFF2DB]'
              }`}
            >
              عن المنصة
            </Link>

            <Link 
              to="/contact" 
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                isActive('/contact')
                  ? 'text-[#F62440] bg-[#FFF2DB]'
                  : 'text-[#1c1917] hover:text-[#F62440] hover:bg-[#FFF2DB]'
              }`}
            >
              تواصل ومساهمة
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
      {isOpen && (
        <div className="lg:hidden bg-[#FFFAF3] border-b border-[#FFE5BF] px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#FFE5BF]">
            {STREAMS.map((s) => (
              <button
                key={s.id}
                onClick={() => handleStreamClick(s.id)}
                className="flex items-center gap-2 p-2 rounded-lg bg-[#FFF2DB] border border-[#FFE5BF] text-right text-xs font-bold text-[#1c1917]"
              >
                <span>{s.icon}</span>
                <span className="truncate">{s.name}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col space-y-1 text-xs font-bold">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-lg text-[#1c1917] hover:bg-[#FFF2DB]"
            >
              الرئيسية
            </Link>
            <Link
              to="/streams"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-lg text-[#1c1917] hover:bg-[#FFF2DB]"
            >
              الشعب والمواد
            </Link>
            <Link
              to="/library"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-lg text-[#1c1917] hover:bg-[#FFF2DB]"
            >
              مكتبة الملخصات
            </Link>
            <Link
              to="/bac-archive"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-lg text-[#1c1917] hover:bg-[#FFF2DB]"
            >
              أرشيف البكالوريا (2008—2025)
            </Link>
            <Link
              to="/youtube-teachers"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-lg text-[#1c1917] hover:bg-[#FFF2DB]"
            >
              قنوات وأساتذة اليوتيوب
            </Link>
            <Link
              to="/countdown"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-lg text-[#1c1917] hover:bg-[#FFF2DB]"
            >
              العداد التنازلي
            </Link>
            <Link
              to="/calculator"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-lg text-[#1c1917] hover:bg-[#FFF2DB]"
            >
              حاسبة معدل البكالوريا
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-lg text-[#1c1917] hover:bg-[#FFF2DB]"
            >
              عن المنصة ومؤسسها
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-lg text-[#F62440] bg-[#FFF2DB]"
            >
              تواصل معنا ومشاركة الملفات
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
