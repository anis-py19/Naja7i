import React, { useState } from 'react';
import { 
  HiX, 
  HiCalculator, 
  HiAcademicCap, 
  HiRefresh
} from 'react-icons/hi';
import { motion } from 'framer-motion';
import { STREAMS } from '../data/streamsData';
import { BAC_COEFFICIENTS } from '../data/bacData';

export default function BacCalculatorModal({ isOpen, onClose }) {
  const [currentStreamId, setCurrentStreamId] = useState('sciences');
  const [grades, setGrades] = useState({});

  if (!isOpen) return null;

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
  let mentionColor = '';
  let suggestions = [];

  if (average >= 18) {
    mention = 'ممتاز (Très Bien)';
    mentionColor = 'text-rose-800 bg-rose-50 border border-rose-200/60';
    suggestions = ['الطب البشري (Médecine)', 'المدرسة العليا للذكاء الاصطناعي (ENSIA)', 'المدرسة الوطنية العليا للإعلام الآلي (ESI Alger)', 'الصيدلة وطب الأسنان', 'المدارس العليا للأساتذة (ENS)'];
  } else if (average >= 16) {
    mention = 'جيد جداً (Très Bien)';
    mentionColor = 'text-slate-800 bg-slate-100 border border-slate-200/60';
    suggestions = ['الصيدلة وطب الأسنان', 'المدرسة الوطنية المتعددة التقنيات (ENP Polytech)', 'إعلام آلي ورياضيات', 'علوم المادة وهندسة'];
  } else if (average >= 14) {
    mention = 'جيد (Bien)';
    mentionColor = 'text-slate-800 bg-slate-100 border border-slate-200/60';
    suggestions = ['علوم وتقنيات (ST)', 'علوم الطبيعة والحياة (SNV)', 'رياضيات وإعلام آلي (MI)', 'تسيير واقتصاد ومالية'];
  } else if (average >= 12) {
    mention = 'قريب من الجيد (Assez Bien)';
    mentionColor = 'text-slate-700 bg-slate-100 border border-slate-200/60';
    suggestions = ['علوم المادة (SM)', 'حقوق وعلوم سياسية', 'لغات أجنبية وآداب', 'علوم تجارية وتسيير'];
  } else if (average >= 10) {
    mention = 'مقبول (Passable)';
    mentionColor = 'text-slate-600 bg-slate-100 border border-slate-200/60';
    suggestions = ['مختلف التخصصات الجامعية الوطنية في نظام LMD'];
  } else {
    mention = 'تحت المعدل — واصل المراجعة وستصل لمبتغاك!';
    mentionColor = 'text-rose-700 bg-rose-50 border border-rose-200/60';
    suggestions = ['كثف حل البكالوريات السابقة في المواد ذات المعاملات الكبرى'];
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/50 backdrop-blur-xs overflow-y-auto font-['Cairo']">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="relative w-full max-w-3xl bg-white border border-[#E2E8F0] rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#E11D48] text-white flex items-center justify-center text-xl shadow-2xs">
              <HiCalculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0F172A]">
                حاسبة معدل البكالوريا بالمعاملات الرسمية 🇩🇿
              </h3>
              <p className="text-xs text-[#64748B]">
                حساب فوري للمعدل التقريبي وفق معاملات وزارة التربية الوطنية.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white border border-[#CBD5E1] text-[#64748B] hover:text-[#0F172A] cursor-pointer shadow-2xs"
          >
            <HiX className="w-5 h-5" />
          </button>
        </div>

        {/* Stream Selector */}
        <div className="px-5 py-3 bg-white border-b border-[#E2E8F0] flex items-center gap-1.5 overflow-x-auto">
          {STREAMS.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setCurrentStreamId(s.id);
                setGrades({});
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
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

        {/* Form Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 bg-[#F8FAFC]">
          
          {/* Result Card */}
          <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="text-center sm:text-right">
              <div className="text-xs font-bold text-[#64748B] mb-1">المعدل العام المحسوب:</div>
              <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                <span className="text-3xl sm:text-4xl font-black text-[#E11D48] font-mono">
                  {formattedAverage}
                </span>
                <span className="text-lg text-[#64748B] font-bold">/ 20</span>
              </div>
              <div className={`mt-2 inline-block px-3 py-0.5 rounded-full text-xs font-bold ${mentionColor}`}>
                {mention}
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-3.5 py-1.5 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F172A] text-xs font-bold flex items-center gap-1.5 border border-[#CBD5E1] cursor-pointer shadow-2xs"
            >
              <HiRefresh className="w-3.5 h-3.5 text-[#E11D48]" />
              <span>إعادة تعيين</span>
            </button>
          </div>

          {/* Grades Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {currentStream.subjects.map((sub) => {
              const currentVal = grades[sub.id] !== undefined ? grades[sub.id] : '';
              return (
                <div
                  key={sub.id}
                  className="p-3.5 bg-white rounded-xl border border-[#E2E8F0] shadow-2xs"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#0F172A] truncate">
                      {sub.name}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.2 rounded-full bg-[#F1F5F9] text-[#E11D48] border border-[#E2E8F0]">
                      معامل {sub.coef}
                    </span>
                  </div>

                  <input
                    type="number"
                    step="0.25"
                    min="0"
                    max="20"
                    placeholder="العلامة من 20"
                    value={currentVal}
                    onChange={(e) => handleGradeChange(sub.id, e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-2.5 py-1.5 text-xs font-mono text-[#0F172A] text-center focus:outline-none focus:border-[#E11D48]"
                  />
                </div>
              );
            })}
          </div>

          {/* Suggested branches */}
          {suggestions.length > 0 && (
            <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] text-xs shadow-2xs">
              <div className="font-bold text-[#0F172A] mb-2 flex items-center gap-1.5">
                <HiAcademicCap className="w-4 h-4 text-[#E11D48]" />
                <span>أبرز التخصصات المتاحة لهذا المعدل:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {suggestions.map((sug, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[#0F172A] border border-[#E2E8F0]"
                  >
                    • {sug}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
