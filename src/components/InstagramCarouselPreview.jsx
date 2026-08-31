import React, { useState } from 'react';
import { 
  HiChevronRight, 
  HiChevronLeft, 
  HiDownload, 
  HiSparkles, 
  HiCheckCircle, 
  HiEye, 
  HiOutlineBookOpen,
  HiVolumeUp,
  HiOutlineLightningBolt,
  HiDeviceMobile,
  HiFire,
  HiX
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

export const CAROUSEL_SLIDES = [
  {
    id: 1,
    tag: "إطلاق رسمي 🚀",
    title: "منصة نجاحي راهي متاحة رسمياً لجميع طلاب البكالوريا! 🇩🇿",
    subtitle: "أقوى وأشمل منصة تعليمية ذكية ومجانية 100% مخصصة للشعب الست بدون أي إعلانات مزعجة.",
    gradient: "from-slate-900 via-rose-950 to-slate-900",
    accentColor: "#E11D48",
    icon: "🎓",
    badgeText: "مجاناً 100% • بدون اشتراك",
    highlights: [
      "مكتبة ذكية تجمع أكثر من 2,500 ملف رسمي",
      "أدوات وتطبيقات حصرية لا تجدها في أي موقع آخر",
      "تصميم عصري سريع يركز على الإنتاجية والتميز"
    ],
    footerText: "مرر لليسار لاكتشاف الميزات الحصرية 👈"
  },
  {
    id: 2,
    tag: "ميزة حصرية #1 📓",
    title: "كراس الأخطاء الذكي وفخاخ المنهجية (Carnet d'Erreurs)",
    subtitle: "تطبيقك الشخصي لتسجيل الفخاخ التي تقع فيها أثناء حل التمارين وتجنب تكرارها يوم الامتحان.",
    gradient: "from-slate-900 via-slate-850 to-rose-950",
    accentColor: "#F43F5E",
    icon: "📓",
    badgeText: "وداعاً لتكرار نفس الأخطاء",
    highlights: [
      "قاعدة بيانات لفخاخ البكالوريا المنهجية الشائعة لجميع المواد",
      "تصنيف دقيق للأخطاء (منهجية، حسابية، عدم تركيز، نقص حفظ)",
      "توليد ورقة مراجعة A4 شخصية قابلة للطباعة ليلة الامتحان"
    ],
    footerText: "الميزة التي تصنع الفارق بين معدل 12 ومعدل 17 💡"
  },
  {
    id: 3,
    tag: "ميزة حصرية #2 🎧",
    title: "غرفة التركيز وبومودورو مع محرك أصوات ألفا المحيطية",
    subtitle: "غرفة دراسة مينيمالية مع مؤقت بومودورو ذكي ومحرك صوتي تركيبي بدون إنترنت لتحفيز الدماغ.",
    gradient: "from-slate-950 via-teal-950 to-slate-900",
    accentColor: "#14B8A6",
    icon: "🎧",
    badgeText: "تركيز عميق 100% (Zero Distraction)",
    highlights: [
      "أمواج ألفا ثنائية النبض (10 Hz Alpha Beats) لزيادة الاستيعاب",
      "أصوات بيئية مهدئة (صوت المطر الغزير، مقهى هادئ، مدفأة شتوية)",
      "نظام نصائح وتوجيهات منهجية وتحفيزية يتجدد كل 20 ثانية"
    ],
    footerText: "ادرس بذكاء وبدون إرهاق ذهني 🧠"
  },
  {
    id: 4,
    tag: "ميزة حصرية #3 ⏱️",
    title: "بنك الأسئلة والاختبارات التفاعلية السريعة (Quiz Bank)",
    subtitle: "تحدّ نفسك يومياً باختبارات موقوتة وسريعة لاختبار استحضار المعلومات والمفاهيم الأساسية.",
    gradient: "from-slate-900 via-indigo-950 to-slate-900",
    accentColor: "#6366F1",
    icon: "⏱️",
    badgeText: "تثبيت فوري للمعلومات",
    highlights: [
      "أسئلة QCM دقيقة في الفلسفة، الشريعة، التاريخ والجغرافيا واللغات",
      "تعليلات منهجية فورية لكل إجابة لفهم سبب الخطأ فوراً",
      "تتبع نقاطك والـ Streaks اليومي لتشجيع الاستمرارية"
    ],
    footerText: "10 دقائق يومياً تكفي لتثبيت الحفظ طوال العام 🎯"
  },
  {
    id: 5,
    tag: "ميزة حصرية #4 📱",
    title: "تطبيق ويب يعمل بدون إنترنت (PWA & Offline First)",
    subtitle: "ثبّت منصة نجاحي كتطبيق أصلي على هاتفك أو حاسوبك واستمتع بالمطالعة حتى بدون شبكة.",
    gradient: "from-slate-900 via-amber-950 to-slate-900",
    accentColor: "#F59E0B",
    icon: "📱",
    badgeText: "تطبيقك الدائم في كل مكان",
    highlights: [
      "تثبيت فوري بنقرة واحدة على Android، iOS، والحواسيب",
      "كاش ذكي يتيح تصفح الملفات والملاحظات بدون الحاجة للاتصال",
      "تجربة خفيفة وسريعة جداً بدون استهلاك لباقة الإنترنت"
    ],
    footerText: "مكتبتك ورفيق دراستك أينما كنت 🚀"
  },
  {
    id: 6,
    tag: "انطلق الآن 🏆",
    title: "كل ما تحتاجه للتفوق في البكالوريا بين يديك، مجاناً 100%!",
    subtitle: "انضم إلى آلاف الطلاب الجزائريين الذين يحضرون لشهادة البكالوريا بذكاء ومنهجية واحترافية.",
    gradient: "from-rose-950 via-slate-900 to-rose-950",
    accentColor: "#E11D48",
    icon: "🌟",
    badgeText: "الرابط متوفر في البايو 🔗",
    highlights: [
      "منصة جزائرية 100% صُممت خصيصاً للتلميذ الجزائري",
      "خالية من أي إعلانات مزعجة أو روابط ربحية مغلقة",
      "تحديثات يومية مستمرة لمرافقتكم حتى يوم الامتحان"
    ],
    footerText: "أرسل المنشور لصديقك في البكالوريا لتعم الفائدة 👥❤️"
  }
];

export default function InstagramCarouselPreview({ isOpen, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen) return null;

  const slide = CAROUSEL_SLIDES[currentSlide];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md font-['Cairo']" dir="rtl">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">📸</span>
            <div>
              <h2 className="text-sm font-bold text-white">معاين وتصاميم منشور إنستغرام (Instagram Carousel)</h2>
              <p className="text-[11px] text-slate-400">سلسلة شرائح جاهزة للنشر للترويج لأهم وأقوى ميزات منصة نجاحي</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <HiX className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel Slide Visual Area */}
        <div className="flex-1 p-4 sm:p-8 overflow-y-auto flex flex-col items-center justify-center">
          
          {/* Slide 1:1 Aspect Ratio Canvas Card */}
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className={`w-full max-w-[460px] aspect-square rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br ${slide.gradient} select-none`}
            style={{
              boxShadow: `0 20px 50px -10px ${slide.accentColor}25`
            }}
          >
            {/* Background 3D Ambient Glowing Circles */}
            <div 
              className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl opacity-30 pointer-events-none"
              style={{ backgroundColor: slide.accentColor }}
            />
            <div 
              className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: slide.accentColor }}
            />

            {/* Top Brand Bar */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold text-white bg-white/15 backdrop-blur-md border border-white/20">
                  {slide.tag}
                </span>
                <span className="text-[11px] font-bold text-slate-300 font-mono">
                  {currentSlide + 1} / {CAROUSEL_SLIDES.length}
                </span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/10">
                <span className="text-sm">🇩🇿</span>
                <span className="text-xs font-black text-white tracking-wider">NAJA7I</span>
              </div>
            </div>

            {/* Middle Content */}
            <div className="relative z-10 space-y-4 my-auto">
              
              <div className="flex items-center gap-3">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg border border-white/20 shrink-0"
                  style={{ backgroundColor: `${slide.accentColor}30` }}
                >
                  {slide.icon}
                </div>
                <div>
                  <span 
                    className="text-[11px] font-extrabold uppercase tracking-wider block"
                    style={{ color: slide.accentColor }}
                  >
                    {slide.badgeText}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
                    {slide.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {slide.subtitle}
              </p>

              {/* Bullet Highlights */}
              <div className="space-y-2 pt-1">
                {slide.highlights.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-white/95 font-medium bg-black/25 backdrop-blur-xs p-2.5 rounded-xl border border-white/10">
                    <HiCheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Bottom Footer Callout */}
            <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
              <span className="text-slate-300 font-bold">
                {slide.footerText}
              </span>
              <span className="text-white/60 font-mono text-[10px]">
                Naja7i.dz
              </span>
            </div>

          </motion.div>

        </div>

        {/* Carousel Navigation Controller & Indicators */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-4">
          
          <button
            onClick={prevSlide}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <HiChevronRight className="w-4 h-4" />
            <span>الشريحة السابقة</span>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {CAROUSEL_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx ? 'w-6 bg-rose-500' : 'w-2 bg-slate-700 hover:bg-slate-600'
                }`}
                aria-label={`انتقال للشريحة ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>الشريحة التالية</span>
            <HiChevronLeft className="w-4 h-4" />
          </button>

        </div>

      </div>
    </div>
  );
}
