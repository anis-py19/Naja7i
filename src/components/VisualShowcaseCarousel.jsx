import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiChevronRight, 
  HiChevronLeft, 
  HiSparkles, 
  HiArrowNarrowLeft,
  HiAcademicCap,
  HiOutlineDocumentText,
  HiOutlineClock
} from 'react-icons/hi';

import heroLogoImg from '../assets/hero_3d_logo.jpg';
import heroArchiveImg from '../assets/hero_3d_archive.jpg';
import heroFocusImg from '../assets/hero_3d_focus.jpg';

const SLIDES = [
  {
    id: 'logo-brand',
    title: 'نجاحي (Naja7i) — منصتك الشاملة نحو الامتياز في البكالوريا 🇩🇿',
    subtitle: 'هوية بصرية أكاديمية عصرية تجمع بين رمزية كتاب المعرفة المفتوح وقبعة التخرج نحو تحقيق طموحك الجامعي.',
    badge: 'الهوية الأكاديمية الرسمية',
    badgeIcon: <HiAcademicCap className="w-3.5 h-3.5 text-[#E11D48]" />,
    image: heroLogoImg,
    primaryBtn: { text: 'استكشف الشعب والمنهاج', link: '/streams' },
    secondaryBtn: { text: 'عن المنصة ورؤيتها', link: '/about' },
    stats: [
      { label: 'الشعب الرسمية', val: '6 شعب' },
      { label: 'السنوات المغطاة', val: '2008 — 2026' },
      { label: 'الوصول والمطالعة', val: 'مجاني 100%' }
    ]
  },
  {
    id: 'bac-archive',
    title: 'أضخم أرشيف رقمي للبكالوريا (2008 — 2026) مع المعاينة والتحميل',
    subtitle: 'أكثر من 2,500 ملف PDF للمواضيع الرسمية والتصحيحات وسلالم التنقيط الوزارية المعتمدة لجميع المواد والشعب بدون إعلانات.',
    badge: 'بنك المواضيع والحلول الرسمية',
    badgeIcon: <HiOutlineDocumentText className="w-3.5 h-3.5 text-[#0284C7]" />,
    image: heroArchiveImg,
    primaryBtn: { text: 'تصفح أرشيف البكالوريا', link: '/bac-archive' },
    secondaryBtn: { text: 'مكتبة الملخصات والسلاسل', link: '/library' },
    stats: [
      { label: 'ملف PDF متاح', val: '+2,500 ملف' },
      { label: 'مادة ودورة مفهرسة', val: '1,190 مادة' },
      { label: 'طريقة المطالعة', val: 'معاينة فورية' }
    ]
  },
  {
    id: 'focus-ecosystem',
    title: 'بيئة المذاكرة الذكية: غرفة التركيز، بومودورو، وكراس الأخطاء 🎧📓',
    subtitle: 'منظومة إنتاجية متطورة تضم مؤقت بومودورو، محرك أصوات محيطية عازل للضوضاء (Web Audio API)، وكراس تدوين الفخاخ المنهجية.',
    badge: 'بيئة المذاكرة والإنتاجية',
    badgeIcon: <HiOutlineClock className="w-3.5 h-3.5 text-[#16A34A]" />,
    image: heroFocusImg,
    primaryBtn: { text: 'دخول غرفة التركيز 🎧', link: '/focus-room' },
    secondaryBtn: { text: 'كراس الأخطاء والفخاخ 📓', link: '/mistakes-notebook' },
    stats: [
      { label: 'أصوات التركيز', val: 'خالصة 100%' },
      { label: 'نصائح بومودورو', val: '+1,000 نصيحة' },
      { label: 'طباعة كراس الأخطاء', val: 'ورقة A4 جاهزة' }
    ]
  }
];

export default function VisualShowcaseCarousel() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const nextSlide = () => setCurrentIdx((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentIdx((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  const slide = SLIDES[currentIdx];

  return (
    <section 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-['Cairo']"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden bg-white border border-[#E2E8F0] rounded-3xl shadow-xs">
        
        {/* Main Slide Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px] lg:min-h-[440px]">
          
          {/* Left Column: Text & Content (RTL) */}
          <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between z-10">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-4"
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 border border-slate-200/80 text-slate-800 text-xs font-medium">
                  {slide.badgeIcon}
                  <span>{slide.badge}</span>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0F172A] leading-tight sm:leading-snug">
                  {slide.title}
                </h2>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  {slide.subtitle}
                </p>

                {/* CTA Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 pt-2">
                  <Link
                    to={slide.primaryBtn.link}
                    className="px-5 py-2.5 rounded-xl bg-[#E11D48] hover:bg-[#be123c] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>{slide.primaryBtn.text}</span>
                    <HiArrowNarrowLeft className="w-4 h-4" />
                  </Link>

                  <Link
                    to={slide.secondaryBtn.link}
                    className="px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold border border-slate-200 transition-colors"
                  >
                    <span>{slide.secondaryBtn.text}</span>
                  </Link>
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Bottom Highlights & Mini Stats */}
            <div className="pt-6 mt-6 border-t border-slate-100 grid grid-cols-3 gap-3">
              {slide.stats.map((st, i) => (
                <div key={i} className="text-right">
                  <div className="text-[11px] text-[#64748B]">{st.label}</div>
                  <div className="text-xs sm:text-sm font-black text-[#0F172A] font-mono mt-0.5">{st.val}</div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: 3D Visual Rendering */}
          <div className="lg:col-span-6 relative bg-slate-950 flex items-center justify-center overflow-hidden min-h-[260px] sm:min-h-[320px] lg:min-h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-white via-transparent to-transparent opacity-90 lg:opacity-25" />
              </motion.div>
            </AnimatePresence>

            {/* Carousel Arrow Controls */}
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-xs p-1 rounded-xl border border-slate-800">
              <button
                onClick={prevSlide}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="الشريحة السابقة"
                aria-label="الشريحة السابقة"
              >
                <HiChevronRight className="w-5 h-5" />
              </button>

              <button
                onClick={nextSlide}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="الشريحة التالية"
                aria-label="الشريحة التالية"
              >
                <HiChevronLeft className="w-5 h-5" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-xs px-2.5 py-1.5 rounded-full border border-slate-800">
              {SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIdx === idx ? 'w-6 bg-[#E11D48]' : 'w-2 bg-slate-600 hover:bg-slate-400'
                  }`}
                  aria-label={`انتقل إلى الشريحة ${idx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
