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
    { title: 'انطلاق الموسم الدراسي', date: 'سبتمبر', passed: true },
    { title: 'امتحانات الفصل الأول', date: 'ديسمبر', passed: true },
    { title: 'امتحانات الفصل الثاني', date: 'مارس', passed: true },
    { title: 'امتحانات البكالوريا التجريبية', date: 'ماي', passed: false },
    { title: 'امتحان شهادة البكالوريا الرسمي', date: `07 جوان ${targetYear}`, current: true },
    { title: 'إعلان النتائج الرسمية', date: 'جويلية', passed: false }
  ];

  return (
    <div className="min-h-screen bg-[#FFFAF3] text-[#1c1917] pb-16 font-['Cairo']">
      
      {/* Top Banner & Breadcrumb */}
      <div className="bg-[#FFF2DB] border-b border-[#FFE5BF] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#78716c] mb-3">
            <Link to="/" className="hover:text-[#F62440] flex items-center gap-1 transition-colors">
              <HiHome className="w-4 h-4" />
              <span>الرئيسية</span>
            </Link>
            <span>/</span>
            <span className="text-[#1c1917] font-bold">العداد التنازلي للبكالوريا</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded bg-[#F62440] text-white font-bold text-xs font-mono">
                  BAC {targetYear}
                </span>
                <span className="text-xs text-[#78716c]">الموعد الرسمي: 07 جوان {targetYear}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#1c1917]">
                العداد التنازلي لشهادة البكالوريا
              </h1>
              <p className="text-xs text-[#57534e] mt-1 max-w-xl">
                متابعة دقيقة للأيام والساعات المتبقية لمساعدتك على تنظيم برنامج المراجعة.
              </p>
            </div>

            <Link
              to="/"
              className="self-start md:self-auto px-4 py-2 rounded-xl bg-white hover:bg-[#FFE5BF] text-[#1c1917] text-xs font-bold border border-[#FFE5BF] transition-colors flex items-center gap-1.5"
            >
              <span>العودة للرئيسية</span>
              <HiChevronLeft className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        
        {/* Main Countdown Box */}
        <div className="bg-white border border-[#FFE5BF] rounded-2xl p-6 sm:p-8 text-center space-y-6">
          
          <div className="text-xs font-bold text-[#78716c]">
            الوقت المتبقي حتى انطلاق امتحان شهادة البكالوريا
          </div>

          {/* Digits Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            
            <div className="bg-[#FFFAF3] border border-[#FFE5BF] rounded-xl p-4">
              <span className="text-3xl sm:text-5xl font-black text-[#F62440] font-mono block">
                {timeLeft.days}
              </span>
              <span className="text-xs font-bold text-[#57534e]">
                يوم
              </span>
            </div>

            <div className="bg-[#FFFAF3] border border-[#FFE5BF] rounded-xl p-4">
              <span className="text-3xl sm:text-5xl font-black text-[#1c1917] font-mono block">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-xs font-bold text-[#57534e]">
                ساعة
              </span>
            </div>

            <div className="bg-[#FFFAF3] border border-[#FFE5BF] rounded-xl p-4">
              <span className="text-3xl sm:text-5xl font-black text-[#1c1917] font-mono block">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-xs font-bold text-[#57534e]">
                دقيقة
              </span>
            </div>

            <div className="bg-[#FFFAF3] border border-[#FFE5BF] rounded-xl p-4">
              <span className="text-3xl sm:text-5xl font-black text-[#F62440] font-mono block">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-xs font-bold text-[#57534e]">
                ثانية
              </span>
            </div>

          </div>

          {/* School Year Progress Bar */}
          <div className="max-w-xl mx-auto space-y-1.5 pt-2">
            <div className="flex justify-between items-center text-xs font-bold text-[#57534e]">
              <span>نسبة تقدم الموسم الدراسي:</span>
              <span className="font-mono text-[#F62440]">{timeLeft.percentage}%</span>
            </div>
            <div className="w-full bg-[#FFF2DB] h-2.5 rounded-full overflow-hidden border border-[#FFE5BF]">
              <div
                className="h-full bg-[#F62440] rounded-full transition-all duration-300"
                style={{ width: `${timeLeft.percentage}%` }}
              ></div>
            </div>
          </div>

        </div>

        {/* Academic Milestones Table */}
        <div className="bg-white border border-[#FFE5BF] rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-[#FFE5BF] pb-3">
            <HiCalendar className="w-4 h-4 text-[#F62440]" />
            <h3 className="text-sm sm:text-base font-bold text-[#1c1917]">
              المحطات الأساسية لرزنامة الموسم الدراسي
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {milestones.map((m, i) => (
              <div
                key={i}
                className={`p-3.5 rounded-xl border flex items-center justify-between ${
                  m.current
                    ? 'bg-[#FFF2DB] border-[#F62440]'
                    : 'bg-[#FFFAF3] border-[#FFE5BF]'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold text-[#1c1917]">
                    {m.title}
                  </h4>
                  <span className="text-[11px] text-[#78716c]">
                    {m.date}
                  </span>
                </div>
                {m.current && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#F62440] text-white font-bold">
                    الامتحان القادم
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
