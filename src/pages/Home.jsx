import React from 'react';
import Hero from '../components/Hero';
import BacCountdown from '../components/BacCountdown';
import { FAMOUS_TEACHERS, STREAMS } from '../data/streamsData';
import { Link } from 'react-router-dom';
import { 
  HiAcademicCap, 
  HiLightningBolt, 
  HiSparkles, 
  HiBookOpen, 
  HiCalculator, 
  HiVideoCamera, 
  HiDocumentText, 
  HiArrowRight,
  HiCheck
} from 'react-icons/hi';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Dedicated Live Countdown & Roadmap Milestones */}
      <BacCountdown />

      {/* Why Naja7i Section */}
      <section className="py-20 bg-slate-950 relative border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-400 text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 inline-block">
              لماذا منصة نجاحي؟
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              كل الأدوات والمصادر لضمان التفوق في البكالوريا
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              صممنا المنصة لتوفير بيئة تعليمية متكاملة وسلسة بدون إعلانات مزعجة أو روابط اختصار.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="glass-panel p-8 rounded-3xl border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                📑
              </div>
              <h3 className="text-xl font-bold text-white mb-2">دروس وملخصات PDF جاهزة</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                ملخصات مركزة وقوانين مستخلصة بدقة من كبار أساتذة الجزائر ومفتشي المواد للتحميل الفوري.
              </p>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                تحميل مباشر 100%
              </span>
            </div>

            {/* Feature 2 */}
            <div className="glass-panel p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                🎯
              </div>
              <h3 className="text-xl font-bold text-white mb-2">سلاسل تمارين بالحل النموذجي</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                تدرج في الصعوبة من التمارين المباشرة إلى المسائل المركبة والبكالوريات التجريبية لأفضل الثانويات.
              </p>
              <span className="text-xs font-bold text-cyan-400 flex items-center gap-1">
                حلول خطوة بخطوة
              </span>
            </div>

            {/* Feature 3 */}
            <div className="glass-panel p-8 rounded-3xl border border-slate-800 hover:border-amber-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                🎥
              </div>
              <h3 className="text-xl font-bold text-white mb-2">فيديوهات اليوتيوب المصنفة</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                وفرنا عليك عناء البحث ورتبنا شروحات نخبة الأساتذة الجزائريين حسب الوحدات والمحاور.
              </p>
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                مراجعة مركزة ومرتبة
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* Famous Teachers Section */}
      <section className="py-16 bg-slate-900/40 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
            <div>
              <span className="text-amber-400 text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-2 inline-block">
                نخبة أساتذة الجزائر
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                أبرز قنوات يوتيوب التعليمية للبكالوريا
              </h2>
            </div>
            <Link 
              to="/tools" 
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5"
            >
              <span>تصفح كل القنوات والمصادر</span>
              <HiArrowRight className="w-4 h-4 rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FAMOUS_TEACHERS.map((teacher, idx) => (
              <div 
                key={idx}
                className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center font-bold text-lg">
                    ▶
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{teacher.name}</h4>
                    <span className="text-xs text-slate-400">{teacher.subject}</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                  {teacher.channel}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-r from-emerald-600/30 via-teal-600/20 to-blue-600/30 border border-emerald-500/30 rounded-3xl p-8 sm:p-12 text-center overflow-hidden backdrop-blur-xl">
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-3xl mb-4 inline-block">🚀</span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mb-4">
                جاهز لبدء رحلة التميز نحو البكالوريا؟
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mb-8">
                اختر شعبتك الآن وتصفح مئات الملخصات وسلاسل التمارين بالحلول النموذجية.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/calculator"
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700 flex items-center gap-2"
                >
                  <HiCalculator className="w-5 h-5 text-cyan-400" />
                  <span>حاسبة المعدل الرسمي</span>
                </Link>
                <Link
                  to="/flashcards"
                  className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <HiSparkles className="w-5 h-5" />
                  <span>بطاقات الحفظ الذكية (Flashcards)</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
