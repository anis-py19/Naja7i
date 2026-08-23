import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiHome, 
  HiChevronLeft, 
  HiCalculator, 
  HiRefresh, 
  HiAcademicCap,
  HiCheckCircle,
  HiSparkles
} from 'react-icons/hi';
import { STREAMS } from '../data/streamsData';
import { BAC_COEFFICIENTS } from '../data/bacData';
import { motion } from 'framer-motion';

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
    mention = 'ممتاز (Très Bien Avec Félicitations)';
    mentionBadge = 'bg-[#F62440] text-white';
    suggestions = ['الطب البشري (Médecine)', 'المدرسة العليا للذكاء الاصطناعي (ENSIA)', 'المدرسة الوطنية العليا للإعلام الآلي (ESI Alger)', 'الصيدلة وطب الأسنان', 'المدارس العليا للأساتذة (ENS)'];
  } else if (average >= 16) {
    mention = 'جيد جداً (Très Bien)';
    mentionBadge = 'bg-[#1c1917] text-white';
    suggestions = ['الصيدلة وطب الأسنان', 'المدرسة الوطنية المتعددة التقنيات (ENP Polytech)', 'إعلام آلي ورياضيات', 'علوم المادة وهندسة معمارية'];
  } else if (average >= 14) {
    mention = 'جيد (Bien)';
    mentionBadge = 'bg-[#FFF2DB] text-[#1c1917] border border-[#FFE5BF]';
    suggestions = ['علوم وتقنيات (ST)', 'علوم المادة (SM)', 'علوم الطبيعة والحياة (SNV)', 'شبه طبي (Paramédical)', 'حقوق وعلوم سياسية'];
  } else if (average >= 12) {
    mention = 'قريب من الجيد (Assez Bien)';
    mentionBadge = 'bg-[#FFF2DB] text-[#1c1917] border border-[#FFE5BF]';
    suggestions = ['علوم اقتصادية وتسيير', 'لغات أجنبية وآداب', 'علوم إنسانية واجتماعية', 'علوم وتقنيات'];
  } else if (average >= 10) {
    mention = 'مقبول (Passable)';
    mentionBadge = 'bg-[#FFF2DB] text-[#57534e] border border-[#FFE5BF]';
    suggestions = ['تخصصات العلوم الإنسانية والاجتماعية', 'العلوم الاقتصادية والتجارية', 'الحقوق والعلوم القانونية'];
  } else {
    mention = 'راسب (أقل من المعدل)';
    mentionBadge = 'bg-red-100 text-red-700 border border-red-200';
    suggestions = ['ركز على رفع درجات المواد الأساسية والمواد ذات المعاملات المرتفعة لتحقيق النجاح.'];
  }

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
            <span className="text-[#1c1917] font-bold">حاسبة معدل البكالوريا بالمعاملات</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-md bg-[#F62440] text-white font-bold text-xs shadow-2xs">
                  المعاملات الرسمية لوزارة التربية 🇩🇿
                </span>
                <span className="text-xs text-[#78716c]">حساب فوري للمعدل والتقدير والتخصصات</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#1c1917]">
                حاسبة معدل شهادة البكالوريا 🧮
              </h1>
              <p className="text-xs text-[#57534e] mt-1 max-w-xl">
                احسب معدلك بدقة متناهية حسب معاملات شعبتك الرسمية واكتشف التخصصات الجامعية المتاحة لمعدلك المتوقع.
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Stream Selector Tabs */}
        <div className="bg-white border border-[#FFE5BF] rounded-2xl p-4 mb-8 shadow-xs">
          <label className="block text-xs font-bold text-[#1c1917] mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#F62440]"></span>
            <span>اختر شعبتك لحساب المعدل بالمعاملات المعتمدة:</span>
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {STREAMS.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setCurrentStreamId(s.id);
                  setGrades({});
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  currentStreamId === s.id
                    ? 'bg-[#F62440] text-white shadow-xs'
                    : 'bg-[#FFFAF3] text-[#1c1917] hover:bg-[#FFF2DB] border border-[#FFE5BF]'
                }`}
              >
                <span>{s.icon}</span>
                <span>{s.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Calculator Grid: Left Inputs, Right Results */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Inputs Form (2 Cols) */}
          <div className="lg:col-span-2 bg-white border border-[#FFE5BF] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            
            <div className="flex items-center justify-between border-b border-[#FFE5BF] pb-4">
              <div>
                <h3 className="text-base font-black text-[#1c1917]">
                  أدخل النقاط المتوقعة (من 0 إلى 20):
                </h3>
                <span className="text-xs text-[#78716c]">
                  مجموع المعاملات لشعبة {currentStream.name}: <strong className="font-mono text-[#F62440]">{totalCoefficients}</strong>
                </span>
              </div>

              <button
                onClick={handleReset}
                className="px-3 py-1.5 rounded-lg bg-[#FFF2DB] hover:bg-[#FFE5BF] text-[#57534e] hover:text-[#1c1917] text-xs font-bold border border-[#FFE5BF] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <HiRefresh className="w-4 h-4" />
                <span>إعادة تعيين</span>
              </button>
            </div>

            {/* Subjects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentStream.subjects.map((sub) => {
                const currentVal = grades[sub.id] !== undefined ? grades[sub.id] : '';
                return (
                  <div 
                    key={sub.id}
                    className="p-3.5 rounded-2xl bg-[#FFFAF3] border border-[#FFE5BF] flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-[#1c1917] block truncate">
                        {sub.name}
                      </span>
                      <span className="text-[11px] font-mono text-[#78716c]">
                        المعامل: <strong className="text-[#F62440]">{sub.coef}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <input
                        type="number"
                        min="0"
                        max="20"
                        step="0.25"
                        placeholder="10"
                        value={currentVal}
                        onChange={(e) => handleGradeChange(sub.id, e.target.value)}
                        className="w-18 bg-white border border-[#FFE5BF] rounded-xl px-2 py-1.5 text-center text-sm font-black font-mono text-[#1c1917] focus:outline-none focus:border-[#F62440] shadow-2xs"
                      />
                      <span className="text-xs font-bold text-[#a8a29e]">/ 20</span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Results Summary Sidebar (1 Col) */}
          <div className="space-y-6">
            
            {/* Average Result Card */}
            <motion.div
              key={formattedAverage}
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="bg-[#FFF2DB] border-2 border-[#FFE5BF] rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-xs"
            >
              <span className="text-xs font-bold text-[#78716c] block">
                المعدل العام التقديري للبكالوريا
              </span>

              <div className="text-5xl sm:text-6xl font-black font-mono text-[#F62440]">
                {formattedAverage}
                <span className="text-lg font-bold text-[#57534e] mr-1">/ 20</span>
              </div>

              <div className="pt-2">
                <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-black shadow-2xs ${mentionBadge}`}>
                  {mention}
                </span>
              </div>

              <div className="pt-4 border-t border-[#FFE5BF] grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-white rounded-xl border border-[#FFE5BF]">
                  <span className="text-[#78716c] block text-[11px]">مجموع النقاط</span>
                  <span className="font-mono font-bold text-[#1c1917]">{totalPoints.toFixed(2)}</span>
                </div>
                <div className="p-2 bg-white rounded-xl border border-[#FFE5BF]">
                  <span className="text-[#78716c] block text-[11px]">مجموع المعاملات</span>
                  <span className="font-mono font-bold text-[#1c1917]">{totalCoefficients}</span>
                </div>
              </div>
            </motion.div>

            {/* University Orientations Suggestions */}
            <div className="bg-white border border-[#FFE5BF] rounded-3xl p-6 shadow-xs space-y-3">
              <h4 className="text-xs font-bold text-[#1c1917] flex items-center gap-1.5 border-b border-[#FFE5BF] pb-2">
                <HiAcademicCap className="w-4 h-4 text-[#F62440]" />
                <span>أبرز التخصصات المتاحة لهذا المعدل:</span>
              </h4>

              <ul className="space-y-2">
                {suggestions.map((sug, i) => (
                  <li key={i} className="text-xs text-[#57534e] flex items-start gap-2 leading-relaxed">
                    <HiCheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
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
