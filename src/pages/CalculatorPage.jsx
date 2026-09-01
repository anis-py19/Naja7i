import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiHome, 
  HiChevronLeft, 
  HiRefresh, 
  HiAcademicCap,
  HiCheckCircle
} from 'react-icons/hi';
import { STREAMS } from '../data/streamsData';
import { BAC_COEFFICIENTS } from '../data/bacData';

export default function CalculatorPage() {
  const [currentStreamId, setCurrentStreamId] = useState('sciences');
  const [grades, setGrades] = useState({});

  const currentStream = BAC_COEFFICIENTS[currentStreamId] || BAC_COEFFICIENTS['sciences'];

  const handleGradeChange = (subjectId, val) => {
    const num = parseFloat(val);
    if (isNaN(num)) {
      const copy = { ...grades };
      delete copy[subjectId];
      setGrades(copy);
    } else {
      setGrades({ ...grades, [subjectId]: Math.min(20, Math.max(0, num)) });
    }
  };

  const handleReset = () => {
    setGrades({});
  };

  let totalPoints = 0;
  let totalCoefficients = 0;

  currentStream.subjects.forEach((sub) => {
    const grade = grades[sub.id] !== undefined ? grades[sub.id] : 10;
    totalPoints += grade * sub.coef;
    totalCoefficients += sub.coef;
  });

  const average = totalCoefficients > 0 ? (totalPoints / totalCoefficients) : 0;
  const formattedAverage = average.toFixed(2);

  let mention = '';
  let mentionBadge = '';
  let suggestions = [];

  if (average >= 18) {
    mention = 'ممتاز (Très Bien)';
    mentionBadge = 'bg-rose-50 text-rose-800 border border-rose-200/60';
    suggestions = ['الطب البشري (Médecine)', 'المدرسة العليا للذكاء الاصطناعي (ENSIA)', 'المدرسة الوطنية العليا للإعلام الآلي (ESI Alger)', 'الصيدلة وطب الأسنان', 'المدارس العليا للأساتذة (ENS)'];
  } else if (average >= 16) {
    mention = 'جيد جداً (Très Bien)';
    mentionBadge = 'bg-slate-100 text-slate-800 border border-slate-200/60';
    suggestions = ['الصيدلة وطب الأسنان', 'المدرسة الوطنية المتعددة التقنيات (ENP Polytech)', 'إعلام آلي ورياضيات', 'علوم المادة وهندسة معمارية'];
  } else if (average >= 14) {
    mention = 'جيد (Bien)';
    mentionBadge = 'bg-slate-100 text-slate-800 border border-slate-200/60';
    suggestions = ['علوم وتقنيات (ST)', 'علوم المادة (SM)', 'علوم الطبيعة والحياة (SNV)', 'شبه طبي (Paramédical)', 'حقوق وعلوم سياسية'];
  } else if (average >= 12) {
    mention = 'قريب من الجيد (Assez Bien)';
    mentionBadge = 'bg-slate-100 text-slate-700 border border-slate-200/60';
    suggestions = ['علوم اقتصادية وتسيير', 'لغات أجنبية وآداب', 'علوم إنسانية واجتماعية', 'علوم وتقنيات'];
  } else if (average >= 10) {
    mention = 'مقبول (Passable)';
    mentionBadge = 'bg-slate-100 text-slate-600 border border-slate-200/60';
    suggestions = ['تخصصات العلوم الإنسانية والاجتماعية', 'العلوم الاقتصادية والتجارية', 'الحقوق والعلوم القانونية'];
  } else {
    mention = 'أقل من المعدل';
    mentionBadge = 'bg-rose-50 text-rose-700 border border-rose-200/60';
    suggestions = ['ركز على رفع درجات المواد الأساسية والمواد ذات المعاملات المرتفعة لتحقيق النجاح.'];
  }

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
            <span className="text-[#0F172A] font-bold">حاسبة معدل البكالوريا</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 font-medium text-xs border border-rose-200/60">
                  المعاملات الرسمية 🇩🇿
                </span>
                <span className="text-xs text-[#64748B]">حساب فوري للمعدل والتقدير</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
                حاسبة معدل شهادة البكالوريا
              </h1>
              <p className="text-xs text-[#475569] mt-1 max-w-xl">
                أدخل درجاتك المتوقعة لمعرفة المعدل بالمعاملات المعتمدة من وزارة التربية الوطنية.
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Stream Selector Tabs */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 mb-6 shadow-xs">
          <span className="block text-xs font-bold text-[#0F172A] mb-2">
            اختر شعبتك:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {STREAMS.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setCurrentStreamId(s.id);
                  setGrades({});
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  currentStreamId === s.id
                    ? 'bg-[#E11D48] text-white shadow-2xs'
                    : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                }`}
              >
                <span>{s.icon}</span>
                <span>{s.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Inputs Box */}
          <div className="lg:col-span-2 bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
            
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div>
                <h3 className="text-sm font-bold text-[#0F172A]">
                  النقاط المتوقعة (من 0 إلى 20):
                </h3>
                <span className="text-[11px] text-[#64748B]">
                  مجموع معاملات شعبة {currentStream.name}: <strong className="font-mono text-[#E11D48]">{totalCoefficients}</strong>
                </span>
              </div>

              <button
                onClick={handleReset}
                className="px-2.5 py-1 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#475569] hover:text-[#0F172A] text-xs font-bold border border-[#E2E8F0] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <HiRefresh className="w-3.5 h-3.5" />
                <span>إعادة تعيين</span>
              </button>
            </div>

            {/* Subjects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentStream.subjects.map((sub) => {
                const currentVal = grades[sub.id] !== undefined ? grades[sub.id] : '';
                return (
                  <div 
                    key={sub.id}
                    className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-[#0F172A] block truncate">
                        {sub.name}
                      </span>
                      <span className="text-[11px] text-[#64748B]">
                        المعامل: <strong className="text-[#E11D48] font-mono">{sub.coef}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <input
                        type="number"
                        min="0"
                        max="20"
                        step="0.25"
                        placeholder="10"
                        value={currentVal}
                        onChange={(e) => handleGradeChange(sub.id, e.target.value)}
                        className="w-16 bg-white border border-[#CBD5E1] rounded-lg px-2 py-1 text-center text-sm font-bold font-mono text-[#0F172A] focus:outline-none focus:border-[#E11D48]"
                      />
                      <span className="text-xs text-[#64748B]">/20</span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Results Summary Sidebar */}
          <div className="space-y-4">
            
            {/* Average Card */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 text-center space-y-3 shadow-xs">
              <span className="text-xs font-bold text-[#64748B] block">
                المعدل العام التقديري
              </span>

              <div className="text-4xl sm:text-5xl font-black font-mono text-[#E11D48]">
                {formattedAverage}
                <span className="text-sm font-bold text-[#475569] mr-1">/ 20</span>
              </div>

              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${mentionBadge}`}>
                  {mention}
                </span>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                  <span className="text-[#64748B] block text-[11px]">مجموع النقاط</span>
                  <span className="font-mono font-bold text-[#0F172A]">{totalPoints.toFixed(2)}</span>
                </div>
                <div className="p-2 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                  <span className="text-[#64748B] block text-[11px]">مجموع المعاملات</span>
                  <span className="font-mono font-bold text-[#0F172A]">{totalCoefficients}</span>
                </div>
              </div>
            </div>

            {/* University Suggestions */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 space-y-2.5 shadow-xs">
              <h4 className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5 border-b border-[#E2E8F0] pb-2">
                <HiAcademicCap className="w-4 h-4 text-[#E11D48]" />
                <span>أبرز التخصصات المتاحة لهذا المعدل:</span>
              </h4>

              <ul className="space-y-1.5">
                {suggestions.map((sug, i) => (
                  <li key={i} className="text-xs text-[#475569] flex items-start gap-1.5 leading-relaxed">
                    <HiCheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{sug}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
