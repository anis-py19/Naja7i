import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiHome, 
  HiChevronLeft, 
  HiClock, 
  HiCalendar, 
  HiSparkles,
  HiFlag,
  HiCheckCircle,
  HiAcademicCap
} from 'react-icons/hi';
import { motion } from 'framer-motion';

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
    { title: 'انطلاق السنة الدراسية', date: 'سبتمبر', passed: true, icon: '🎒' },
    { title: 'امتحانات الفصل الأول', date: 'ديسمبر', passed: true, icon: '📝' },
    { title: 'امتحانات الفصل الثاني', date: 'مارس', passed: true, icon: '📊' },
    { title: 'البكالوريا التجريبية (الامتحان الأبيض)', date: 'ماي', passed: false, icon: '🎯' },
    { title: 'شهادة البكالوريا الرسمية (دورة جوان)', date: `07 جوان ${targetYear}`, passed: false, icon: '🏆', current: true },
    { title: 'إعلان النتائج الرسمية وفرحة النجاح', date: 'جويلية', passed: false, icon: '🎉' }
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
            <span className="text-[#1c1917] font-bold">العداد التنازلي ومخطط البكالوريا</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-md bg-[#F62440] text-white font-bold text-xs shadow-2xs font-mono">
                  BAC {targetYear} 🇩🇿
                </span>
                <span className="text-xs text-[#78716c]">الموعد الرسمي: 07 جوان {targetYear}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#1c1917]">
                العداد التنازلي لشهادة البكالوريا ⏳
              </h1>
              <p className="text-xs text-[#57534e] mt-1 max-w-xl">
                كل ثانية تمر تقربك من حلمك. نظم وقتك، واجعل كل ساعة مراجعة خطوة ثابتة نحو معدل الامتياز.
              </p>
            </div>

            <Link
              to="/"
              className="self-start md:self-auto px-4 py-2 rounded-xl bg-white hover:bg-[#FFE5BF] text-[#1c1917] text-xs font-bold border border-[#FFE5BF] transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <span>العودة للرئيسية</span>
              <HiChevronLeft className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* Main Countdown Big Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-2 border-[#FFE5BF] rounded-3xl p-6 sm:p-10 shadow-xs text-center space-y-8"
        >
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF2DB] border border-[#FFE5BF] text-xs font-bold text-[#F62440]">
            <HiClock className="w-4 h-4" />
            <span>الوقت المتبقي حتى انطلاق امتحان البكالوريا رسميًا</span>
          </div>

          {/* Big Number Digits Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            
            {/* Days */}
            <div className="bg-[#FFFAF3] border border-[#FFE5BF] rounded-2xl p-5 sm:p-6 shadow-2xs">
              <span className="text-4xl sm:text-6xl font-black text-[#F62440] font-mono block mb-1">
                {timeLeft.days}
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#57534e]">
                يـــوم (Jour)
              </span>
            </div>

            {/* Hours */}
            <div className="bg-[#FFFAF3] border border-[#FFE5BF] rounded-2xl p-5 sm:p-6 shadow-2xs">
              <span className="text-4xl sm:text-6xl font-black text-[#1c1917] font-mono block mb-1">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#57534e]">
                ساعة (Heure)
              </span>
            </div>

            {/* Minutes */}
            <div className="bg-[#FFFAF3] border border-[#FFE5BF] rounded-2xl p-5 sm:p-6 shadow-2xs">
              <span className="text-4xl sm:text-6xl font-black text-[#1c1917] font-mono block mb-1">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#57534e]">
                دقيقة (Minute)
              </span>
            </div>

            {/* Seconds */}
            <div className="bg-[#FFFAF3] border border-[#FFE5BF] rounded-2xl p-5 sm:p-6 shadow-2xs">
              <span className="text-4xl sm:text-6xl font-black text-[#F62440] font-mono block mb-1 animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#57534e]">
                ثانية (Seconde)
              </span>
            </div>

          </div>

          {/* Progress Bar for the School Year */}
          <div className="max-w-2xl mx-auto space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-[#57534e]">
              <span>تقدم السنة الدراسية حتى البكالوريا</span>
              <span className="font-mono text-[#F62440]">{timeLeft.percentage}%</span>
            </div>
            <div className="w-full bg-[#FFF2DB] h-3.5 rounded-full overflow-hidden border border-[#FFE5BF] p-0.5">
              <div
                className="h-full bg-[#F62440] rounded-full transition-all duration-500 shadow-2xs"
                style={{ width: `${timeLeft.percentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[11px] text-[#78716c]">
              <span>بداية الموسم (سبتمبر)</span>
              <span>امتحان البكالوريا (جوان {targetYear})</span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl mx-auto pt-4 border-t border-[#FFE5BF]">
            <div className="p-3 bg-[#FFF2DB]/60 rounded-xl border border-[#FFE5BF]">
              <span className="text-xs text-[#78716c] block">إجمالي الساعات</span>
              <span className="text-base font-black text-[#1c1917] font-mono">{timeLeft.totalHours} ساعة</span>
            </div>
            <div className="p-3 bg-[#FFF2DB]/60 rounded-xl border border-[#FFE5BF]">
              <span className="text-xs text-[#78716c] block">إجمالي الأسابيع</span>
              <span className="text-base font-black text-[#1c1917] font-mono">{timeLeft.weeks} أسبوعاً</span>
            </div>
            <div className="p-3 bg-[#FFF2DB]/60 rounded-xl border border-[#FFE5BF] col-span-2 sm:col-span-1">
              <span className="text-xs text-[#78716c] block">الهدف المنشود</span>
              <span className="text-base font-black text-[#F62440]">+16 معدل الامتياز</span>
            </div>
          </div>

        </motion.div>

        {/* Academic Milestones Timeline */}
        <div className="bg-white border border-[#FFE5BF] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-[#FFE5BF] pb-4">
            <HiCalendar className="w-5 h-5 text-[#F62440]" />
            <h3 className="text-base sm:text-lg font-black text-[#1c1917]">
              المحطات الأساسية للموسم الدراسي (الرزنامة المعتمدة)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {milestones.map((m, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl border transition-colors flex items-center gap-3 ${
                  m.current
                    ? 'bg-[#FFF2DB] border-[#F62440] shadow-xs'
                    : 'bg-[#FFFAF3] border-[#FFE5BF]'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-[#FFE5BF] flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                  {m.icon}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#1c1917]">
                    {m.title}
                  </h4>
                  <span className="text-xs text-[#78716c] block mt-0.5 font-medium">
                    {m.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Golden Revision Advice Box */}
        <div className="bg-[#FFF2DB] border border-[#FFE5BF] rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white border border-[#FFE5BF] text-[#F62440] flex items-center justify-center text-3xl shrink-0 shadow-2xs">
              🧠
            </div>
            <div className="space-y-1.5 text-center sm:text-right">
              <h4 className="text-base font-black text-[#1c1917]">
                كيف تستغل الوقت المتبقي لتحقيق أعلى النتائج؟
              </h4>
              <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed">
                قسّم وقتك اليومي إلى فترات مركزة (تقنية Pomodoro 25 دقيقة تركيز + 5 دقائق راحة)، ولا تؤجل مراجعة المواد الثانوية (الشريعة، التاريخ والجغرافيا، واللغات) لأنها ترفع المعدل العام بأكثر من نقطتين كاملتين!
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
