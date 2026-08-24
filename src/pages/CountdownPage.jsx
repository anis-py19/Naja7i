import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiHome, 
  HiChevronLeft, 
  HiClock, 
  HiCalendar
} from 'react-icons/hi';

export default function CountdownPage() {
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
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalHours: 0,
    weeks: 0,
    percentage: 0
  });

  const targetYear = targetDate.getFullYear();

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const difference = targetDate - now;

      const schoolYearStart = new Date(`${targetYear - 1}-09-01T08:00:00`);
      const totalYearSpan = targetDate - schoolYearStart;
      const elapsed = now - schoolYearStart;
      const progressPercent = Math.min(100, Math.max(0, Math.floor((elapsed / totalYearSpan) * 100)));

      if (difference > 0) {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const m = Math.floor((difference / 1000 / 60) % 60);
        const s = Math.floor((difference / 1000) % 60);
        const totalH = Math.floor(difference / (1000 * 60 * 60));
        const w = Math.floor(d / 7);

        setTimeLeft({
          days: d,
          hours: h,
          minutes: m,
          seconds: s,
          totalHours: totalH,
          weeks: w,
          percentage: progressPercent
        });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate, targetYear]);

  const milestones = [
    { title: 'امتحانات الفصل الأول', date: 'ديسمبر', icon: '📝', desc: 'تقييم مكتسبات الثلث الأول والوحدات التأسيسية.' },
    { title: 'امتحانات الفصل الثاني', date: 'مارس', icon: '⚡', desc: 'ضبط النقائص والتركيز على المواد الأساسية.' },
    { title: 'امتحان البكالوريا التجريبية (الباك بلان)', date: 'ماي', icon: '🎯', desc: 'محاكاة حقيقية لظروف وضغط البكالوريا.' },
    { title: 'شهادة البكالوريا الرسمية (BAC)', date: `جوان ${targetYear}`, icon: '🎓', desc: 'الموعد الحاسم نحو نيل شهادة البكالوريا والجامعة.' }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pb-16 font-['Cairo']">
      
      {/* Top Banner & Breadcrumb */}
      <div className="bg-white border-b border-[#E2E8F0] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#64748B] mb-3">
            <Link to="/" className="hover:text-[#E11D48] flex items-center gap-1 transition-colors">
              <HiHome className="w-4 h-4" />
              <span>الرئيسية</span>
            </Link>
            <span>/</span>
            <span className="text-[#0F172A] font-bold">العداد التنازلي للبكالوريا</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-[#F1F5F9] text-[#E11D48] font-bold text-xs font-mono border border-[#E2E8F0]">
                  BAC {targetYear} 🇩🇿
                </span>
                <span className="text-xs text-[#64748B]">07 جوان {targetYear} • الساعة 08:00 صباحاً</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
                العداد التنازلي لامتحان البكالوريا ⏱️
              </h1>
              <p className="text-xs text-[#475569] mt-1 max-w-xl">
                تابع الوقت المتبقي بالأيام والساعات والدقائق، وخطط لمراجعتك اليومية بدقة.
              </p>
            </div>

            <Link
              to="/"
              className="self-start md:self-auto px-4 py-2 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0F172A] text-xs font-bold border border-[#CBD5E1] transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <span>العودة للرئيسية</span>
              <HiChevronLeft className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* Main Countdown Digits Display */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-10 shadow-xs text-center space-y-6">
          
          <span className="text-xs font-bold text-[#64748B] block">
            الوقت المتبقي حتى موعد الامتحان:
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            
            {/* Days */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 sm:p-5">
              <span className="text-3xl sm:text-5xl font-black font-mono text-[#E11D48] block">
                {timeLeft.days}
              </span>
              <span className="text-xs font-bold text-[#475569] mt-1 block">يوم</span>
            </div>

            {/* Hours */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 sm:p-5">
              <span className="text-3xl sm:text-5xl font-black font-mono text-[#0F172A] block">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-xs font-bold text-[#475569] mt-1 block">ساعة</span>
            </div>

            {/* Minutes */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 sm:p-5">
              <span className="text-3xl sm:text-5xl font-black font-mono text-[#0F172A] block">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-xs font-bold text-[#475569] mt-1 block">دقيقة</span>
            </div>

            {/* Seconds */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 sm:p-5">
              <span className="text-3xl sm:text-5xl font-black font-mono text-[#E11D48] block">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-xs font-bold text-[#475569] mt-1 block">ثانية</span>
            </div>

          </div>

          {/* Quick stats row */}
          <div className="flex items-center justify-center gap-4 text-xs text-[#64748B] pt-2 font-mono">
            <span>ما يعادل قرابة: <strong className="text-[#0F172A]">{timeLeft.weeks} أسبوعاً</strong></span>
            <span>•</span>
            <span>أو حوالي: <strong className="text-[#0F172A]">{timeLeft.totalHours} ساعة</strong></span>
          </div>

          {/* School Year Progress Bar */}
          <div className="max-w-md mx-auto pt-4 border-t border-[#E2E8F0] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#64748B]">انقضاء الموسم الدراسي:</span>
              <span className="font-mono font-bold text-[#E11D48]">{timeLeft.percentage}%</span>
            </div>
            <div className="w-full h-2.5 bg-[#F1F5F9] rounded-full overflow-hidden border border-[#E2E8F0]">
              <div 
                className="h-full bg-[#E11D48] rounded-full transition-all duration-300"
                style={{ width: `${timeLeft.percentage}%` }}
              />
            </div>
          </div>

        </div>

        {/* Official Milestones Timeline */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <h3 className="text-sm sm:text-base font-bold text-[#0F172A] flex items-center gap-2">
              <HiCalendar className="w-4 h-4 text-[#E11D48]" />
              <span>رزنامة المحطات والامتحانات الرسمية:</span>
            </h3>
            <span className="text-xs text-[#64748B]">الموسم الدراسي {targetYear}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {milestones.map((m, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
                    <span>{m.icon}</span>
                    <span>{m.title}</span>
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-white text-[#E11D48] border border-[#E2E8F0]">
                    {m.date}
                  </span>
                </div>
                <p className="text-xs text-[#475569] leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
