import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  HiBookOpen, 
  HiCalculator, 
  HiVideoCamera, 
  HiClock, 
  HiSparkles, 
  HiAcademicCap, 
  HiArrowRight, 
  HiChevronLeft, 
  HiSearch, 
  HiHeart, 
  HiCheckCircle 
} from 'react-icons/hi';
import { motion } from 'framer-motion';
import { STREAMS } from '../data/streamsData';
import FounderStorySection from '../components/FounderStorySection';
import ContactContributionSection from '../components/ContactContributionSection';

export default function HomePage({ onOpenCalculator, onOpenSearch, onOpenContact, onSelectStream }) {
  const navigate = useNavigate();

  const portals = [
    {
      title: 'الشعب والمواد الدراسية',
      desc: 'تصفح مقررات وبرامج شعبتك بالتفصيل وتابع تقدمك في إنجاز الوحدات.',
      path: '/streams',
      icon: '🏛️',
      tag: 'المنهاج الرسمي',
      color: 'from-amber-50 to-orange-50'
    },
    {
      title: 'مكتبة الملخصات والسلاسل',
      desc: 'مكتبة شاملة لأفضل ملخصات وسلاسل تمارين كبار الأساتذة مع قارئ PDF مدمج.',
      path: '/library',
      icon: '📚',
      tag: 'ملخصات وسلاسل',
      color: 'from-rose-50 to-red-50'
    },
    {
      title: 'أرشيف مواضيع البكالوريا',
      desc: 'مواضيع وحلول شهادات البكالوريا الرسمية (2008 — 2025) مع سلم التنقيط الوزاري.',
      path: '/bac-archive',
      icon: '📄',
      tag: 'دورة 2008 — 2025',
      color: 'from-amber-50 to-yellow-50'
    },
    {
      title: 'دليل أساتذة اليوتيوب',
      desc: 'قائمة مرتبة لأفضل قنوات وأساتذة البكالوريا في الجزائر مصنفة حسب المادة.',
      path: '/youtube-teachers',
      icon: '🎥',
      tag: 'قنوات موثوقة',
      color: 'from-red-50 to-rose-50'
    },
    {
      title: 'العداد التنازلي والمخطط',
      desc: 'تابع الأيام والساعات المتبقية حتى امتحان البكالوريا ورزنامة المحطات الرسمية.',
      path: '/countdown',
      icon: '⏳',
      tag: 'الموعد: 07 جوان',
      color: 'from-orange-50 to-amber-50'
    },
    {
      title: 'حاسبة معدل البكالوريا',
      desc: 'احسب معدلك التقديري بالمعاملات الرسمية واكتشف التخصصات الجامعية المتاحة.',
      path: '/calculator',
      icon: '🧮',
      tag: 'حساب فوري دقيق',
      color: 'from-rose-50 to-orange-50'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFAF3] text-[#1c1917] font-['Cairo']">
      
      {/* 1. Hero Section: Clean, Welcoming & Modern */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#FFE5BF] bg-gradient-to-b from-[#FFF2DB]/70 via-[#FFFAF3] to-[#FFFAF3]">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#FFE5BF] text-xs font-bold shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F62440] animate-pulse"></span>
            <span className="text-[#1c1917]">منصة جزائرية تعليمية مجانية 100% لطلبة البكالوريا 🇩🇿</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1c1917] tracking-tight leading-tight">
            رفيقك الشامل نحو امتياز <br />
            <span className="text-[#F62440] underline decoration-[#FFE5BF] decoration-wavy">شهادة البكالوريا 3AS</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#57534e] max-w-2xl mx-auto leading-relaxed">
            بنك شامل لملخصات وسلاسل تمارين خيرة أساتذة الجزائر، مواضيع البكالوريا الرسمية وحلولها النموذجية، وحاسبة المعدل في منصة واحدة نظيفة وبدون إعلانات.
          </p>

          {/* Quick Search & Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <button
              onClick={onOpenSearch}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white hover:bg-[#FFF2DB] text-[#1c1917] font-bold text-xs border border-[#FFE5BF] flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <HiSearch className="w-4 h-4 text-[#F62440]" />
              <span>بحث سريع في الدروس والملخصات</span>
              <kbd className="px-1.5 py-0.5 rounded bg-[#FFFAF3] text-[10px] text-[#78716c] font-mono border border-[#FFE5BF]">
                Ctrl K
              </kbd>
            </button>

            <Link
              to="/library"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#F62440] hover:bg-[#d81b34] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <HiBookOpen className="w-4 h-4" />
              <span>تصفح مكتبة الملخصات</span>
            </Link>
          </div>

        </div>
      </section>

      {/* 2. Quick Stream Selector Strip */}
      <section className="py-6 bg-white border-b border-[#FFE5BF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F62440]"></span>
              <span className="text-xs font-bold text-[#1c1917]">اختر شعبتك للدخول المباشر:</span>
            </div>
            <Link to="/streams" className="text-xs text-[#F62440] hover:underline font-bold flex items-center gap-1">
              <span>عرض جميع مقررات الشعب</span>
              <HiChevronLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {STREAMS.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  if (onSelectStream) onSelectStream(s.id);
                  navigate('/streams');
                }}
                className="p-3 rounded-xl bg-[#FFFAF3] hover:bg-[#FFF2DB] border border-[#FFE5BF] hover:border-[#F62440] transition-colors text-right flex items-center gap-2.5 group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-[#FFE5BF] flex items-center justify-center text-lg shrink-0 group-hover:scale-105 transition-transform">
                  {s.icon}
                </div>
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

      {/* 3. Core Hubs / Portals Grid (6 High-Impact Cards) */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-2 mb-10">
          <span className="px-3 py-1 rounded-full bg-[#FFF2DB] text-[#F62440] text-xs font-bold border border-[#FFE5BF]">
            فضاءات ومنصات نجاحي الرئيسية 🎓
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1c1917]">
            كل ما تحتاجه للتحضير للبكالوريا في مكان واحد
          </h2>
          <p className="text-xs sm:text-sm text-[#78716c] max-w-xl mx-auto">
            صفحات منظمة ومصنفة لتصل إلى ما تبحث عنه في ثوانٍ معدودة بدون تشتيت.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portals.map((portal, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white border border-[#FFE5BF] hover:border-[#F62440] rounded-3xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#FFF2DB] border border-[#FFE5BF] flex items-center justify-center text-3xl shadow-2xs group-hover:scale-105 transition-transform">
                    {portal.icon}
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-[#FFFAF3] text-[#F62440] text-[11px] font-bold border border-[#FFE5BF]">
                    {portal.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#1c1917] mb-2 group-hover:text-[#F62440] transition-colors">
                  {portal.title}
                </h3>

                <p className="text-xs text-[#57534e] leading-relaxed mb-6">
                  {portal.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#FFE5BF]">
                <Link
                  to={portal.path}
                  className="w-full py-2.5 rounded-xl bg-[#FFFAF3] group-hover:bg-[#F62440] text-[#1c1917] group-hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-[#FFE5BF] group-hover:border-[#F62440] transition-colors shadow-2xs"
                >
                  <span>دخول الفضاء</span>
                  <HiChevronLeft className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </section>

      {/* 4. Founder Story Teaser Card */}
      <FounderStorySection />

      {/* 5. Contact & Contribution Banner */}
      <ContactContributionSection onOpenContact={onOpenContact} />

    </div>
  );
}
