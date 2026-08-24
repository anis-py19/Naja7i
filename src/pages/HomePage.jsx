import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  HiBookOpen, 
  HiChevronLeft, 
  HiSearch
} from 'react-icons/hi';
import { STREAMS } from '../data/streamsData';
import FounderStorySection from '../components/FounderStorySection';
import ContactContributionSection from '../components/ContactContributionSection';

export default function HomePage({ onOpenSearch, onOpenContact, onSelectStream }) {
  const navigate = useNavigate();

  const portals = [
    {
      title: 'الشعب والمواد الدراسية',
      desc: 'مقررات وبرامج البكالوريا الرسمية لجميع الشعب مع الوحدات والمعاملات.',
      path: '/streams',
      icon: '🏛️',
      badge: 'المنهاج الوزاري'
    },
    {
      title: 'مكتبة الملخصات والسلاسل',
      desc: 'ملخصات شاملة وسلاسل تمارين محلولة لأفضل أساتذة الجزائر مع عارض PDF مباشر.',
      path: '/library',
      icon: '📚',
      badge: 'ملخصات وتمارين'
    },
    {
      title: 'أرشيف مواضيع البكالوريا',
      desc: 'مواضيع وحلول شهادة البكالوريا الرسمية من 2008 إلى 2025 مع سلم التنقيط.',
      path: '/bac-archive',
      icon: '📄',
      badge: '2008 — 2025'
    },
    {
      title: 'دليل قنوات وأساتذة اليوتيوب',
      desc: 'قائمة مرتبة لأفضل قنوات البكالوريا التعليمية في الجزائر مصنفة حسب كل مادة.',
      path: '/youtube-teachers',
      icon: '🎥',
      badge: 'شروحات بالفيديو'
    },
    {
      title: 'العداد التنازلي والمواعيد',
      desc: 'متابعة الأيام المتبقية حتى انطلاق امتحان البكالوريا ورزنامة المحطات الرسمية.',
      path: '/countdown',
      icon: '⏳',
      badge: '07 جوان'
    },
    {
      title: 'حاسبة معدل البكالوريا',
      desc: 'حساب المعدل الفوري بالمعاملات الرسمية لجميع الشعب ومعرفة التخصصات المتاحة.',
      path: '/calculator',
      icon: '🧮',
      badge: 'المعاملات الرسمية'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFAF3] text-[#1c1917] font-['Cairo']">
      
      {/* 1. Hero Section: Clean, Academic & Focused */}
      <section className="pt-10 pb-12 px-4 sm:px-6 lg:px-8 border-b border-[#FFE5BF] bg-[#FFF2DB]/50">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          
          <div className="inline-block px-3 py-1 rounded-md bg-white border border-[#FFE5BF] text-xs font-bold text-[#1c1917]">
            الموقع التعليمي الشامل لبكالوريا الجزائر 🇩🇿
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1c1917] tracking-tight">
            منصة نجاحي لتحضير شهادة البكالوريا
          </h1>

          <p className="text-xs sm:text-sm text-[#57534e] max-w-2xl mx-auto leading-relaxed">
            مكتبة منظمة تجمع أفضل ملخصات وسلاسل أساتذة الجزائر، مواضيع وحلول البكالوريا الرسمية، وأدوات المراجعة بدون إعلانات أو روابط خارجية.
          </p>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <button
              onClick={onOpenSearch}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-[#FFF2DB] text-[#1c1917] font-bold text-xs border border-[#FFE5BF] flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <HiSearch className="w-4 h-4 text-[#F62440]" />
              <span>بحث سريع في الدروس والملخصات</span>
              <kbd className="px-1.5 py-0.5 rounded bg-[#FFFAF3] text-[10px] text-[#78716c] font-mono border border-[#FFE5BF]">
                Ctrl K
              </kbd>
            </button>

            <Link
              to="/library"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#F62440] hover:bg-[#d81b34] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <HiBookOpen className="w-4 h-4" />
              <span>تصفح مكتبة الملخصات</span>
            </Link>
          </div>

        </div>
      </section>

      {/* 2. Quick Stream Selector Strip */}
      <section className="py-5 bg-white border-b border-[#FFE5BF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="text-xs font-bold text-[#1c1917]">اختر الشعبة:</span>
            <Link to="/streams" className="text-xs text-[#F62440] hover:underline font-bold flex items-center gap-1">
              <span>جميع الشعب</span>
              <HiChevronLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {STREAMS.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  if (onSelectStream) onSelectStream(s.id);
                  navigate('/streams');
                }}
                className="p-2.5 rounded-xl bg-[#FFFAF3] hover:bg-[#FFF2DB] border border-[#FFE5BF] hover:border-[#F62440] transition-colors text-right flex items-center gap-2 cursor-pointer"
              >
                <span className="text-base">{s.icon}</span>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-[#1c1917] block truncate">
                    {s.name}
                  </span>
                  <span className="text-[10px] text-[#78716c]">
                    {s.subjectsCount} مواد
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Core Portals Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 border-b border-[#FFE5BF] pb-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#1c1917]">
            أقسام المنصة الرئيسية
          </h2>
          <p className="text-xs text-[#78716c] mt-0.5">
            اختر القسم الذي ترغب في مراجعته للوصول المباشر إلى الملفات والأدوات
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {portals.map((portal, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#FFE5BF] hover:border-[#F62440] rounded-2xl p-5 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF2DB] border border-[#FFE5BF] flex items-center justify-center text-xl">
                    {portal.icon}
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#FFFAF3] text-[#F62440] text-[11px] font-bold border border-[#FFE5BF]">
                    {portal.badge}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-[#1c1917] mb-1.5">
                  {portal.title}
                </h3>

                <p className="text-xs text-[#57534e] leading-relaxed mb-4">
                  {portal.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#FFE5BF]">
                <Link
                  to={portal.path}
                  className="w-full py-2 rounded-lg bg-[#FFFAF3] hover:bg-[#FFF2DB] text-[#1c1917] hover:text-[#F62440] font-bold text-xs flex items-center justify-center gap-1 border border-[#FFE5BF] transition-colors"
                >
                  <span>دخول القسم</span>
                  <HiChevronLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 4. Founder Story Section */}
      <FounderStorySection />

      {/* 5. Contact & Contribution Banner */}
      <ContactContributionSection onOpenContact={onOpenContact} />

    </div>
  );
}
