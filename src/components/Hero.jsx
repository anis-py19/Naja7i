import React, { useState, useEffect } from 'react';
import { 
  HiClock, 
  HiDownload, 
  HiCalculator, 
  HiArrowRight,
  HiFire,
  HiBookOpen,
  HiFolder
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { STREAMS } from '../data/streamsData';
import { USER_STUDY_FILES } from '../data/userFilesData';

export default function Hero({ onSelectStream, onOpenCalculator }) {
  const getNextBacDate = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    let target = new Date(`${currentYear}-06-07T08:00:00`);
    if (now > target) {
      target = new Date(`${currentYear + 1}-06-06T08:00:00`);
    }
    return target;
  };

  const [targetDate] = useState(getNextBacDate());
  const targetYear = targetDate.getFullYear();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="bg-[#F8FAFC] border-b border-[#E2E8F0] pt-8 pb-12 font-['Cairo']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Academic Countdown Notice Bar */}
        <div className="mb-8 p-3.5 sm:p-4 rounded-2xl bg-white border border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm shadow-xs">
          <div className="flex items-center gap-2 text-[#0F172A] font-bold flex-wrap justify-center sm:justify-start text-center sm:text-right">
            <HiClock className="w-5 h-5 text-[#E11D48] shrink-0" />
            <span>العد التنازلي لبكالوريا {targetYear}:</span>
            <span className="font-mono bg-[#F8FAFC] px-2.5 py-0.5 rounded-md border border-[#E2E8F0] text-[#E11D48] font-black text-xs sm:text-sm">
              بقي {timeLeft.days} يوم و {timeLeft.hours} س و {timeLeft.minutes} د
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            <Link
              to="/library"
              className="px-3 py-1.5 bg-[#E11D48] text-white rounded-lg text-xs font-bold hover:bg-[#be123c] transition-colors flex items-center gap-1 shadow-2xs"
            >
              <HiBookOpen className="w-4 h-4" />
              <span>مكتبة الملخصات والسلاسل</span>
            </Link>
            <button
              onClick={onOpenCalculator}
              className="px-3 py-1.5 bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#CBD5E1] rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-2xs"
            >
              حاسبة المعدل
            </button>
          </div>
        </div>

        {/* Hero Headline & Purpose */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight mb-3">
            السنة الثالثة ثانوي — فضاء البكالوريا الجزائرية 🇩🇿
          </h1>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-2xl mx-auto">
            دروس وملخصات شاملة، سلاسل تمارين محلولة بالخطوات، مواضيع البكالوريا الرسمية من 2008 إلى 2025 مع التصحيح الوزاري، وشروحات نخبة الأساتذة مرتبة لجميع الشعب.
          </p>
        </div>

        {/* Branch Selector Grid */}
        <div id="streams" className="mt-6">
          <div className="flex items-center justify-between mb-4 border-b border-[#E2E8F0] pb-2">
            <h2 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-2 h-4 bg-[#E11D48] rounded-xs"></span>
              <span>اختر شعبتك لتصفح المواد والمستندات:</span>
            </h2>
            <span className="text-xs text-[#64748B]">6 شعب رسمية</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {STREAMS.map((stream) => (
              <div
                key={stream.id}
                onClick={() => onSelectStream && onSelectStream(stream.id)}
                className="ency-card p-5 rounded-2xl cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-2xl group-hover:border-[#E11D48] transition-colors shadow-2xs">
                      {stream.icon}
                    </div>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0] font-mono">
                      {stream.subjectsCount} مواد
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#E11D48] transition-colors mb-0.5">
                    {stream.name}
                  </h3>
                  <div className="text-xs text-[#64748B] font-sans mb-2 font-medium">
                    {stream.frenchName}
                  </div>

                  <p className="text-xs text-[#475569] leading-relaxed mb-4 line-clamp-2">
                    {stream.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {stream.mainSubjects.map((sub, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0]">
                        {sub}
                      </span>
                    ))}
                  </div>

                  <div className="w-full py-2 rounded-xl bg-[#F8FAFC] group-hover:bg-[#E11D48] group-hover:text-white text-[#0F172A] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-[#CBD5E1] group-hover:border-[#E11D48]">
                    <span>فتح محتوى الشعبة</span>
                    <HiArrowRight className="w-3.5 h-3.5 rotate-180" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="mt-8 pt-6 border-t border-[#E2E8F0] grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs text-[#475569]">
          <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] shadow-2xs">
            <span className="font-bold text-[#0F172A] block text-sm">مواضيع رسمية</span>
            <span className="text-[#64748B]">2008 — 2025 مع الحلول</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] shadow-2xs">
            <span className="font-bold text-[#0F172A] block text-sm">ملخصات وتمارين</span>
            <span className="text-[#64748B]">شاملة لجميع المواد والشعب</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] shadow-2xs">
            <span className="font-bold text-[#0F172A] block text-sm">شروحات فيديو</span>
            <span className="text-[#64748B]">قنوات يوتيوب مرتبة</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] shadow-2xs">
            <span className="font-bold text-[#0F172A] block text-sm">قراءة وتحميل</span>
            <span className="text-[#64748B]">مباشر داخل الموقع</span>
          </div>
        </div>

      </div>
    </section>
  );
}
