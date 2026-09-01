import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  HiBookOpen, 
  HiChevronLeft, 
  HiSearch,
  HiSparkles
} from 'react-icons/hi';
import { STREAMS } from '../data/streamsData';
import FounderStorySection from '../components/FounderStorySection';
import ContactContributionSection from '../components/ContactContributionSection';

export default function HomePage({ onOpenSearch, onOpenContact, onSelectStream }) {
  const navigate = useNavigate();

  const portals = [
    {
      title: 'الشعب والمواد الدراسية',
      desc: 'مقررات وبرامج البكالوريا الرسمية لجميع الشعب الست مع تفصيل الوحدات والمعاملات.',
      path: '/streams',
      icon: '🏛️',
      badge: 'المنهاج الوزاري'
    },
    {
      title: 'مكتبة الملخصات والسلاسل',
      desc: 'ملخصات شاملة وسلاسل تمارين محلولة لأفضل أساتذة الجزائر مع عارض PDF فوري.',
      path: '/library',
      icon: '📚',
      badge: 'ملخصات وتمارين'
    },
    {
      title: 'أرشيف مواضيع البكالوريا',
      desc: 'مواضيع وحلول شهادة البكالوريا الرسمية من 2008 إلى 2026 مع سلالم التنقيط الوزارية.',
      path: '/bac-archive',
      icon: '📄',
      badge: '2008 — 2026'
    },
    {
      title: 'الملخص الذكي بالذكاء الاصطناعي ✨',
      desc: 'تلخيص فوري لملفات PDF وصور الكراريس، رسم خرائط ذهنية تفاعلية وتوليد أسئلة وزارية.',
      path: '/ai-summarizer',
      icon: '🤖',
      badge: 'مدعوم بـ AI & Vision'
    },
    {
      title: 'غرفة التركيز وبومودورو 🎧',
      desc: 'أجواء دراسة هادئة مع مؤقت بومودورو ذكي، أصوات محيطية عازلة للضوضاء، ونصائح متجددة.',
      path: '/focus-room',
      icon: '🎧',
      badge: 'دراسة بدون تشتت'
    },
    {
      title: 'كراس الأخطاء والفخاخ الذكي 📓',
      desc: 'سجل أخطاء التمارين مع القواعد الذهبية، وتوليد ورقة A4 ملخصة لمراجعتها ليلة الامتحان.',
      path: '/mistakes-notebook',
      icon: '📓',
      badge: 'سر المتفوقين'
    },
    {
      title: 'بنك الأسئلة والاختبارات التفاعلية',
      desc: 'اختبارات سريعة وتحديات موقوتة QCM لجميع المواد وفق المنهاج الوزاري مع التصحيح الفوري.',
      path: '/quiz',
      icon: '⏱️',
      badge: 'تصحيح وشرح فوري'
    },
    {
      title: 'حاسبة معدل البكالوريا',
      desc: 'حساب المعدل الفوري بالمعاملات الرسمية لجميع الشعب مع معرفة التخصصات الجامعية المتاحة.',
      path: '/calculator',
      icon: '🧮',
      badge: 'المعاملات الرسمية'
    },
    {
      title: 'مخطط وجداول المراجعة الأسبوعية',
      desc: 'جداول تفصيلية بالساعات للمتمدرسين والأحرار قابلة للطباعة A4 مع منهجية الحفظ الفعال.',
      path: '/study-planner',
      icon: '📅',
      badge: 'جداول جاهزة للطباعة'
    },
    {
      title: 'دليل قنوات وأساتذة اليوتيوب',
      desc: 'قائمة مرتبة لأفضل قنوات البكالوريا التعليمية في الجزائر مصنفة حسب كل مادة وشعبة.',
      path: '/youtube-teachers',
      icon: '🎥',
      badge: 'شروحات بالفيديو'
    },
    {
      title: 'دليل المنهاج والبرنامج الوزاري',
      desc: 'فهرس الدروس والمحاور الرسمية المقررة وزارياً لجميع الشعب والمواد مع الكفاءات المستهدفة.',
      path: '/curriculum',
      icon: '📖',
      badge: 'المنهاج الرسمي'
    },
    {
      title: 'العداد التنازلي والمواعيد الرسمية',
      desc: 'متابعة الأيام المتبقية حتى انطلاق امتحان البكالوريا ورزنامة المحطات الامتحانية الرسمية.',
      path: '/countdown',
      icon: '⏳',
      badge: 'مواعيد البكالوريا'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-['Cairo']">
      
      {/* 1. Hero Section: Clean, Academic & Focused */}
      <section className="pt-8 pb-9 px-4 sm:px-6 lg:px-8 border-b border-[#E2E8F0] bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          
          <div className="inline-block px-3 py-1 rounded-md bg-slate-100 border border-slate-200/60 text-xs font-medium text-slate-700">
            فضاء تحضير شهادة البكالوريا 🇩🇿
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight">
            منصة نجاحي لتحضير شهادة البكالوريا
          </h1>

          <p className="text-xs sm:text-sm text-[#475569] max-w-2xl mx-auto leading-relaxed">
            مكتبة رقمية شاملة تجمع أفضل ملخصات وسلاسل أساتذة الجزائر، أرشيف البكالوريا الرسمي (2008—2026)، وأدوات المراجعة الذكية بدون إعلانات أو تشتيت.
          </p>

          {/* Actions */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenSearch}
              className="px-5 py-2.5 rounded-xl bg-[#E11D48] hover:bg-[#be123c] text-white font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <HiSearch className="w-4 h-4" />
              <span>ابحث في المنصة</span>
            </button>
            <Link
              to="/library"
              className="px-5 py-2.5 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2"
            >
              <HiBookOpen className="w-4 h-4" />
              <span>تصفح بنك الملخصات</span>
            </Link>
            <Link
              to="/ai-summarizer"
              className="px-5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-[#E11D48] border border-rose-200 font-bold text-xs sm:text-sm transition-all shadow-2xs flex items-center gap-2"
            >
              <HiSparkles className="w-4 h-4" />
              <span>الملخص الذكي AI</span>
            </Link>
          </div>

        </div>
      </section>

      {/* 2. Quick Stream Selector Bar */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#E2E8F0]">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
              <span>🏛️ اختر شعبتك للوصول السريع:</span>
            </span>
            <Link to="/streams" className="text-xs font-bold text-[#E11D48] hover:underline flex items-center gap-1">
              <span>عرض كل الشعب</span>
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
                className="p-3 rounded-xl bg-white hover:bg-[#F1F5F9] border border-[#E2E8F0] hover:border-[#CBD5E1] transition-colors text-right flex items-center gap-2.5 cursor-pointer shadow-2xs group"
              >
                <span className="text-xl shrink-0">{s.icon}</span>
                <div className="min-w-0">
                  <span className="block text-xs font-bold text-[#0F172A] group-hover:text-[#E11D48] truncate">
                    {s.name}
                  </span>
                  <span className="text-[10px] text-[#64748B] block">
                    {s.subjectsCount} مواد
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Main Portal Hub Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-black text-[#0F172A]">
            أقسام وأدوات المنصة التعليمية
          </h2>
          <p className="text-xs text-[#64748B] mt-1">
            كل ما يحتاجه طالب البكالوريا مقسم في مساحات ذكية، سريعة وخالية من الإعلانات
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {portals.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className="bg-white border border-[#E2E8F0] hover:border-[#E11D48] rounded-2xl p-6 transition-all hover:shadow-sm flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-2xl group-hover:bg-[#F1F5F9] transition-colors">
                    {item.icon}
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium border border-slate-200/60">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#E11D48] transition-colors mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-[#475569] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-[#F1F5F9] flex items-center justify-between text-xs font-bold text-[#E11D48]">
                <span>دخول الفضاء</span>
                <HiChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Founder Story Section */}
      <FounderStorySection />

      {/* 5. Contact & Contribution Section */}
      <ContactContributionSection onOpenContact={onOpenContact} />

    </div>
  );
}
