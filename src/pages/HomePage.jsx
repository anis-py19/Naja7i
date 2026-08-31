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
import VisualShowcaseCarousel from '../components/VisualShowcaseCarousel';

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
      desc: 'مواضيع وحلول شهادة البكالوريا الرسمية من 2008 إلى 2026 مع سلم التنقيط.',
      path: '/bac-archive',
      icon: '📄',
      badge: '2008 — 2026'
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
    },
    {
      title: 'مخطط وجداول المراجعة الأسبوعية',
      desc: 'جداول تفصيلية بالساعات للمتمدرسين والأحرار مع منهجية الحفظ والتركيز العميق.',
      path: '/study-planner',
      icon: '📅',
      badge: 'جداول جاهزة للطباعة'
    },
    {
      title: 'دليل المنهاج والبرنامج الوزاري',
      desc: 'فهرس الدروس والمحاور الرسمية المقررة وزارياً لجميع الشعب والمواد مع الكفاءات المستهدفة.',
      path: '/curriculum',
      icon: '📖',
      badge: 'المنهاج الرسمي 2026'
    },
    {
      title: 'بنك الأسئلة والاختبارات التفاعلية',
      desc: 'اختبارات سريعة وتحديات موقوتة QCM لجميع المواد وفق المنهاج الوزاري مع التصحيح الفوري.',
      path: '/quiz',
      icon: '⏱️',
      badge: 'تصحيح وشرح فوري'
    },
    {
      title: 'غرفة التركيز وبومودورو 🎧',
      desc: 'أجواء دراسة هادئة مع مؤقت بومودورو ذكي، أصوات طبيعية عازلة للضوضاء، ونصائح بكالوريا متجددة.',
      path: '/focus-room',
      icon: '🎧',
      badge: 'دراسة بدون تشتت'
    },
    {
      title: 'كراس الأخطاء والفخاخ الذكي 📓',
      desc: 'سجل كل فكرة تمرين أخطأت فيها مع كتابة القاعدة الذهبية، وراجع كراسك واطبعه ليلة البكالوريا.',
      path: '/mistakes-notebook',
      icon: '📓',
      badge: 'سر المتفوقين'
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
            مكتبة منظمة تجمع أفضل ملخصات وسلاسل أساتذة الجزائر، مواضيع وحلول البكالوريا الرسمية، وأدوات المراجعة بدون إعلانات أو روابط خارجية.
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
          </div>

        </div>
      </section>

      {/* 2. 3D Visual Showcase Carousel */}
      <VisualShowcaseCarousel />

      {/* 3. Quick Stream Selector Bar */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#E2E8F0]">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
              <span>🏛️ اختر شعبتك للوصول السريع:</span>
            </span>
            <Link to="/streams" className="text-xs text-[#E11D48] hover:underline font-bold flex items-center gap-1">
              <span>عرض برامج الشعب الست</span>
              <HiChevronLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {STREAMS.map((st) => (
              <button
                key={st.id}
                onClick={() => {
                  onSelectStream(st.id);
                  navigate('/library');
                }}
                className="p-3 rounded-xl bg-white border border-[#CBD5E1] hover:border-[#E11D48] transition-all text-center group cursor-pointer shadow-2xs hover:shadow-xs"
              >
                <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                  {st.icon}
                </div>
                <div className="text-xs font-bold text-[#0F172A] group-hover:text-[#E11D48] transition-colors leading-tight">
                  {st.name}
                </div>
                <div className="text-[10px] text-[#64748B] mt-0.5 font-sans truncate">
                  {st.frenchName}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Main Platform Portals Grid */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
            الأقسام والأدوات الرئيسية للمراجعة 🧭
          </h2>
          <p className="text-xs text-[#64748B] mt-1">
            كل ما تحتاجه في مكان واحد لتنظيم دراستك، التدرب على التمارين، وضبط المنهجية.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {portals.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="bg-white border border-[#E2E8F0] hover:border-[#E11D48] rounded-2xl p-5 sm:p-6 transition-all hover:shadow-xs group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-3xl p-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    {item.icon}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-[11px] border border-slate-200/60">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#E11D48] transition-colors mb-1.5">
                  {item.title}
                </h3>
                
                <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs font-bold text-[#E11D48]">
                <span>دخول الفضاء</span>
                <HiChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Contact & Founder Sections */}
      <ContactContributionSection onOpenContact={onOpenContact} />
      <FounderStorySection />

    </div>
  );
}
