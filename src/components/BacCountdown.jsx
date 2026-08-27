import React, { useState, useEffect } from 'react';
import { 
  HiClock, 
  HiFlag
} from 'react-icons/hi';

export default function BacCountdown() {
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
    {
      id: 1,
      title: 'الفصل الأول وبداية الدروس',
      date: 'سبتمبر — نوفمبر',
      desc: 'بناء الأساس في المواد الأساسية (الدوال، تركيب البروتين، المتابعة الزمنية).'
    },
    {
      id: 2,
      title: 'العطلة الشتوية والاستدراك',
      date: 'ديسمبر',
      desc: 'حل تمارين المتتاليات والنووي والمناعة وتدارك النقائص.'
    },
    {
      id: 3,
      title: 'الفصل الثاني والتحضير المكثف',
      date: 'جانفي — مارس',
      desc: 'دراسة الميكانيك، الأحماض والأسس، والاحتمالات ومقالات الفلسفة.'
    },
    {
      id: 4,
      title: 'البكالوريا التجريبية (Bac Blanc)',
      date: 'ماي',
      desc: 'امتحان تجريبي شامل لمحاكاة أجواء البكالوريا وضبط توقيت الإجابة.'
    },
    {
      id: 5,
      title: 'امتحان شهادة البكالوريا الرسمي',
      date: `جوان ${targetYear}`,
      desc: 'أيام الامتحان الرسمي ونيل شهادة البكالوريا بتفوق بإذن الله.'
    }
  ];

  return (
    <section id="bac-countdown" className="py-14 bg-white border-b border-[#E2E8F0] font-['Cairo']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-[#E2E8F0] pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] flex items-center gap-2">
              <HiClock className="w-6 h-6 text-[#E11D48]" />
              <span>العداد التنازلي لبكالوريا {targetYear} ⏳</span>
            </h2>
            <p className="text-xs text-[#64748B] mt-1">
              حساب دقيق للوقت المتبقي حتى موعد انطلاق امتحان شهادة البكالوريا (دورة جوان {targetYear}).
            </p>
          </div>
        </div>

        {/* Countdown Box */}
        <div className="max-w-3xl mx-auto bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 mb-8 shadow-xs">
          
          <div className="grid grid-cols-4 gap-3 sm:gap-4 text-center mb-6">
            
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 sm:p-5 shadow-2xs">
              <div className="text-2xl sm:text-4xl font-black text-[#0F172A] font-mono">
                {timeLeft.days}
              </div>
              <div className="text-xs font-bold text-[#475569] mt-1">يـــوم</div>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 sm:p-5 shadow-2xs">
              <div className="text-2xl sm:text-4xl font-black text-[#0F172A] font-mono">
                {timeLeft.hours}
              </div>
              <div className="text-xs font-bold text-[#475569] mt-1">ســاعة</div>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 sm:p-5 shadow-2xs">
              <div className="text-2xl sm:text-4xl font-black text-[#0F172A] font-mono">
                {timeLeft.minutes}
              </div>
              <div className="text-xs font-bold text-[#475569] mt-1">دقيقـة</div>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 sm:p-5 shadow-2xs">
              <div className="text-2xl sm:text-4xl font-black text-[#E11D48] font-mono">
                {timeLeft.seconds}
              </div>
              <div className="text-xs font-bold text-[#475569] mt-1">ثانيـة</div>
            </div>

          </div>

          {/* Year Progress */}
          <div className="bg-white p-3.5 rounded-xl border border-[#E2E8F0] shadow-2xs">
            <div className="flex items-center justify-between text-xs font-bold text-[#0F172A] mb-1.5">
              <span>نسبة التقدم في الموسم الدراسي:</span>
              <span className="font-mono text-[#E11D48] font-bold">{timeLeft.percentage}%</span>
            </div>
            <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden border border-[#E2E8F0]">
              <div 
                className="h-full bg-[#E11D48] rounded-full transition-all duration-300"
                style={{ width: `${timeLeft.percentage}%` }}
              />
            </div>
          </div>

        </div>

        {/* Milestones list */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-sm font-bold text-[#0F172A] mb-3 flex items-center gap-1.5">
            <HiFlag className="w-4 h-4 text-[#E11D48]" />
            <span>محطات السنة الدراسية:</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {milestones.map((item) => (
              <div
                key={item.id}
                className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5 text-xs shadow-2xs"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[#0F172A]">{item.title}</span>
                  <span className="text-[#64748B] font-mono text-[11px]">{item.date}</span>
                </div>
                <p className="text-[#475569] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
