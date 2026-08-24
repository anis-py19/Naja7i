import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiHome, 
  HiChevronLeft, 
  HiPrinter, 
  HiRefresh
} from 'react-icons/hi';
import { STREAM_STUDY_PLANS, PLANNING_PRINCIPLES } from '../data/plannerData';

export default function StudyPlannerPage() {
  const [selectedStreamId, setSelectedStreamId] = useState('sciences'); // 'sciences' | 'math' | 'technique_math' | 'gestion' | 'lettres_philo' | 'langues'
  const [studentMode, setStudentMode] = useState('school'); // 'school' | 'free'
  const [completedGoals, setCompletedGoals] = useState(() => {
    try {
      const saved = localStorage.getItem('naja7i_completed_goals');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const streamPlan = STREAM_STUDY_PLANS[selectedStreamId] || STREAM_STUDY_PLANS.sciences;
  const currentModePlan = studentMode === 'school' ? streamPlan.school : streamPlan.free;

  const toggleGoal = (goalKey) => {
    const next = { ...completedGoals, [goalKey]: !completedGoals[goalKey] };
    setCompletedGoals(next);
    try {
      localStorage.setItem('naja7i_completed_goals', JSON.stringify(next));
    } catch (e) {
      console.error(e);
    }
  };

  const resetProgress = () => {
    if (window.confirm('هل تريد إعادة تعيين متابعة أهداف هذا الأسبوع؟')) {
      setCompletedGoals({});
      try {
        localStorage.removeItem('naja7i_completed_goals');
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Calculate completed goals count
  const allDays = currentModePlan.days;
  let totalGoalsCount = 0;
  let completedGoalsCount = 0;

  allDays.forEach((dayItem) => {
    const k1 = `${selectedStreamId}_${studentMode}_${dayItem.day}_1`;
    const k2 = `${selectedStreamId}_${studentMode}_${dayItem.day}_2`;
    totalGoalsCount += 2;
    if (completedGoals[k1]) completedGoalsCount++;
    if (completedGoals[k2]) completedGoalsCount++;

    if (studentMode === 'free' && dayItem.subject3) {
      const k3 = `${selectedStreamId}_${studentMode}_${dayItem.day}_3`;
      totalGoalsCount += 1;
      if (completedGoals[k3]) completedGoalsCount++;
    }
  });

  const progressPercent = Math.round((completedGoalsCount / (totalGoalsCount || 1)) * 100);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pb-20 font-['Cairo']">
      
      {/* ========================================================================= */}
      {/* 🖨️ FULL-PAGE BALANCED SINGLE A4 PRINT LAYOUT (يملأ الورقة بالكامل بدون فراغات) */}
      {/* ========================================================================= */}
      <div className="hidden print:flex print-page-single font-['Cairo'] text-black p-0 m-0 w-full h-[98vh] flex-col justify-between">
        
        {/* 1. Header (Balanced ~40mm) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between pb-2 border-b-2 border-black">
            <div className="flex items-center gap-3">
              <img src="/logo.jpg" alt="Logo" className="w-8 h-8 object-contain border border-black rounded-sm" />
              <div>
                <h1 className="text-lg font-black text-black leading-tight">
                  منصة نجاحي (Naja7i.com) — مخطط الأهداف الأسبوعية لشهادة البكالوريا 🇩🇿
                </h1>
                <p className="text-xs text-gray-800 font-bold mt-0.5">
                  {streamPlan.streamName} • {studentMode === 'school' ? 'نظام المتمدرسين (هدفان يومياً • سقف 3.5 ساعات)' : 'نظام الأحرار والمتفرغين (3 أهداف يومياً)'}
                </p>
              </div>
            </div>

            <div className="text-left text-xs font-black text-black border-2 border-black px-3 py-1.5 rounded-md bg-gray-100">
              دورة 2026 / 2027
            </div>
          </div>

          {/* Student Info Strip */}
          <div className="py-2 px-3 border-2 border-black rounded-lg bg-gray-50 flex items-center justify-between text-xs text-black font-semibold">
            <div><strong>اسم ولقب التلميذ:</strong> ................................................................</div>
            <div><strong>الأسبوع رقم:</strong> ....................</div>
            <div><strong>المعدل المستهدف:</strong> .......... / 20</div>
          </div>
        </div>

        {/* 2. 7-Day Checklist Table (Spacious & Fills Page ~225mm) */}
        <div className="my-2 flex-1 flex flex-col justify-center">
          <table className="w-full h-full border-collapse border-2 border-black text-xs">
            <thead>
              <tr className="bg-gray-200 text-black border-b-2 border-black">
                <th className="border-2 border-black p-2 text-center w-[12%] font-black text-xs">اليوم</th>
                <th className="border-2 border-black p-2 text-right w-[38%] font-black text-xs">الهدف 1 (مادة أساسية)</th>
                <th className="border-2 border-black p-2 text-right w-[38%] font-black text-xs">
                  {studentMode === 'school' ? 'الهدف 2 (مادة ثانوية / حفظ / لغة)' : 'الهدف 2 (مادة أساسية ثانية)'}
                </th>
                {studentMode === 'free' && (
                  <th className="border-2 border-black p-2 text-right w-[25%] font-black text-xs">الهدف 3 (حفظ / لغات)</th>
                )}
                <th className="border-2 border-black p-2 text-center w-[12%] font-black text-xs">ملاحظات</th>
              </tr>
            </thead>
            <tbody>
              {currentModePlan.days.map((dayItem, idx) => {
                return (
                  <tr key={idx} className="border-b-2 border-black">
                    {/* Day Column */}
                    <td className="border-2 border-black p-2 text-center font-black text-xs bg-gray-50 align-middle">
                      {dayItem.day}
                    </td>

                    {/* Subject 1 Column */}
                    <td className="border-2 border-black p-2 align-middle">
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 border-2 border-black rounded-sm shrink-0 mt-0.5 flex items-center justify-center font-bold text-xs bg-white">
                        </div>
                        <div className="min-w-0">
                          <strong className="block text-black text-xs font-black leading-tight">
                            {dayItem.subject1.name}
                          </strong>
                          <span className="text-[11px] text-gray-800 leading-snug block font-medium mt-0.5">
                            {dayItem.subject1.goal}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Subject 2 Column */}
                    <td className="border-2 border-black p-2 align-middle">
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 border-2 border-black rounded-sm shrink-0 mt-0.5 flex items-center justify-center font-bold text-xs bg-white">
                        </div>
                        <div className="min-w-0">
                          <strong className="block text-black text-xs font-black leading-tight">
                            {dayItem.subject2.name}
                          </strong>
                          <span className="text-[11px] text-gray-800 leading-snug block font-medium mt-0.5">
                            {dayItem.subject2.goal}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Subject 3 Column (Only for Free) */}
                    {studentMode === 'free' && (
                      <td className="border-2 border-black p-2 align-middle">
                        {dayItem.subject3 ? (
                          <div className="flex items-start gap-2.5">
                            <div className="w-5 h-5 border-2 border-black rounded-sm shrink-0 mt-0.5 flex items-center justify-center font-bold text-xs bg-white">
                            </div>
                            <div className="min-w-0">
                              <strong className="block text-black text-xs font-black leading-tight">
                                {dayItem.subject3.name}
                              </strong>
                              <span className="text-[11px] text-gray-800 leading-snug block font-medium mt-0.5">
                                {dayItem.subject3.goal}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-500 text-[11px] font-bold text-center block">-</span>
                        )}
                      </td>
                    )}

                    {/* Notes Column */}
                    <td className="border-2 border-black p-2 text-center align-middle font-mono text-[10px] text-gray-600">
                      ........................
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 3. Footer (~20mm) */}
        <div className="pt-2 border-t-2 border-black flex items-center justify-between text-xs text-black font-semibold">
          <div>
            <strong>توجيه:</strong> أشر بعلامة (✓) داخل المربع بالقلم فور إتمامك لكل هدف يومي.
          </div>
          <div className="font-black text-xs">
            «وما نيل المطالب بالتمني ولكن تؤخذ الدنيا غلاباً 🇩🇿» — منصة نجاحي Naja7i.com
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 📱 SCREEN-ONLY INTERACTIVE PLATFORM VIEW */}
      {/* ========================================================================= */}
      <div className="print:hidden">
        
        {/* Top Header Banner */}
        <div className="bg-white border-b border-[#E2E8F0] py-5 sm:py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-[#64748B] mb-3">
              <Link to="/" className="hover:text-[#E11D48] flex items-center gap-1 transition-colors">
                <HiHome className="w-4 h-4" />
                <span>الرئيسية</span>
              </Link>
              <span>/</span>
              <span className="text-[#0F172A] font-bold">مخطط الأهداف وجداول الطباعة</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
                  مخطط وجداول مراجعة البكالوريا (2026/2027)
                </h1>
                <p className="text-xs sm:text-sm text-[#475569] mt-1 max-w-2xl leading-relaxed">
                  حدد أهدافك اليومية بدقة (مادتان للمتمدرس / 3 مواد للحر)، أشر على المهام المنجزة، أو اطبع الجدول في صفحة A4 واحدة لتعليقه في غرفتك.
                </p>
              </div>

              <div className="flex items-center gap-2.5 self-start md:self-auto">
                <button
                  onClick={handlePrint}
                  className="px-5 py-3 rounded-xl bg-[#E11D48] hover:bg-[#be123c] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer active:scale-95"
                  title="طباعة جدول المهام في صفحة A4 واحدة لتعليقه على مكتبك"
                >
                  <HiPrinter className="w-4 h-4" />
                  <span>طباعة في صفحة واحدة (A4)</span>
                </button>

                <Link
                  to="/"
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0F172A] text-xs font-bold border border-[#CBD5E1] transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <span>الرئيسية</span>
                  <HiChevronLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Main Interactive Controls & Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
          
          {/* 1. Stream Selector Bar (اختيار الشعبة) */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-3">
            <label className="block text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E11D48]"></span>
              <span>1. اختر شعبتك لعرض وطباعة برنامجها المخصص:</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {Object.values(STREAM_STUDY_PLANS).map((st) => (
                <button
                  key={st.streamId}
                  onClick={() => setSelectedStreamId(st.streamId)}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all text-right flex items-center gap-2 cursor-pointer shadow-2xs ${
                    selectedStreamId === st.streamId
                      ? 'bg-[#E11D48] text-white'
                      : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                  }`}
                >
                  <span className="text-lg shrink-0">{st.icon}</span>
                  <span className="truncate">{st.streamName.replace('شعبة ', '')}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Mode Selector (متمدرس vs حر) */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0F172A] block">2. وضعية الدراسة:</span>
              <span className="text-[11px] text-[#64748B]">
                {studentMode === 'school' 
                  ? 'طالب متمدرس: مادتان في اليوم (مادة أساسية + مادة ثانوية)' 
                  : 'مترشح حر / متفرغ: 3 مواد في اليوم (مادتان أساسيتان + مادة ثانوية)'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
              <button
                onClick={() => setStudentMode('school')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  studentMode === 'school'
                    ? 'bg-[#0F172A] text-white shadow-2xs'
                    : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                }`}
              >
                <span>🏫 متمدرس (مادتان/يوم)</span>
              </button>

              <button
                onClick={() => setStudentMode('free')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  studentMode === 'free'
                    ? 'bg-[#0F172A] text-white shadow-2xs'
                    : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                }`}
              >
                <span>🏡 حر / متفرغ (3 مواد/يوم)</span>
              </button>
            </div>
          </div>

          {/* 3. Stream Info & Weekly Progress Header */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-2xl">{streamPlan.icon}</span>
                <h2 className="text-xl sm:text-2xl font-black text-[#0F172A]">
                  {streamPlan.streamName} — {studentMode === 'school' ? 'برنامج المتمدرسين' : 'برنامج المترشحين الأحرار'}
                </h2>
              </div>

              <div className="flex flex-wrap gap-2 text-xs pt-1">
                <span className="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-[#E11D48] font-bold">
                  ⏱️ الحد الأقصى المقترح: {currentModePlan.maxDailyHours}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569]">
                  🎯 {currentModePlan.dailyGoalDesc}
                </span>
              </div>
            </div>

            {/* Weekly Progress Tracker */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 sm:p-5 text-center lg:text-right min-w-[260px] space-y-2.5 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-bold text-[#0F172A]">
                <span>متابعة إنجاز الأهداف:</span>
                <span className="text-[#E11D48] font-mono">{completedGoalsCount} / {totalGoalsCount} هدف</span>
              </div>

              <div className="w-full h-2.5 bg-white rounded-full overflow-hidden border border-[#E2E8F0]">
                <div 
                  className="h-full bg-[#E11D48] rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                <span>نسبة الالتزام الأسبوعي: <strong className="text-[#0F172A] font-mono">{progressPercent}%</strong></span>
                {completedGoalsCount > 0 && (
                  <button
                    onClick={resetProgress}
                    className="text-rose-600 hover:underline flex items-center gap-1 cursor-pointer font-bold"
                  >
                    <HiRefresh className="w-3 h-3" />
                    <span>تصفير الأسبوع</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 4. Weekly Goal Checklist (الجدول الأسبوعي للأهداف مع مربعات التأشير) */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
                  جدول الأهداف وخانات التأشير (السبت — الجمعة)
                </h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  اضغط على المادة في الموقع أو أشر بالقلم بعد الطباعة عند الانتهاء من كل هدف ✓
                </p>
              </div>
              <span className="text-xs font-bold text-[#E11D48] bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                {studentMode === 'school' ? 'هدفان يومياً' : '3 أهداف يومياً'}
              </span>
            </div>

            <div className="space-y-3.5">
              {currentModePlan.days.map((dayItem, idx) => {
                const k1 = `${selectedStreamId}_${studentMode}_${dayItem.day}_1`;
                const k2 = `${selectedStreamId}_${studentMode}_${dayItem.day}_2`;
                const k3 = `${selectedStreamId}_${studentMode}_${dayItem.day}_3`;

                const is1Done = !!completedGoals[k1];
                const is2Done = !!completedGoals[k2];
                const is3Done = studentMode === 'free' && dayItem.subject3 ? !!completedGoals[k3] : true;
                const isDayComplete = is1Done && is2Done && is3Done;

                return (
                  <div
                    key={idx}
                    className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                      isDayComplete 
                        ? 'bg-emerald-50/40 border-emerald-300' 
                        : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1]'
                    }`}
                  >
                    {/* Day Header */}
                    <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-[#E2E8F0]">
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${isDayComplete ? 'bg-emerald-500' : 'bg-[#CBD5E1]'}`} />
                        <h4 className={`text-xs sm:text-sm font-black ${isDayComplete ? 'text-emerald-900' : 'text-[#0F172A]'}`}>
                          يوم {dayItem.day}
                        </h4>
                      </div>

                      <div className="text-[11px] text-[#64748B] font-semibold">
                        {isDayComplete ? (
                          <span className="text-emerald-700">✓ مكتمل</span>
                        ) : (
                          <span>{studentMode === 'school' ? 'هدفان مطلوبان' : '3 أهداف مطلوبة'}</span>
                        )}
                      </div>
                    </div>

                    {/* Goal Cards Grid with Physical Checkbox Squares */}
                    <div className={`grid grid-cols-1 ${studentMode === 'free' ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-2.5 text-xs`}>
                      
                      {/* Subject 1 */}
                      <div
                        onClick={() => toggleGoal(k1)}
                        className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-2.5 ${
                          is1Done 
                            ? 'bg-emerald-100/60 border-emerald-300 text-emerald-950' 
                            : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#CBD5E1]'
                        }`}
                      >
                        <div 
                          className={`w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center mt-0.5 transition-colors ${
                            is1Done 
                              ? 'bg-emerald-600 border-emerald-600 text-white' 
                              : 'border-[#64748B] bg-white'
                          }`}
                        >
                          {is1Done ? '✓' : ''}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className={`font-bold text-xs truncate ${is1Done ? 'text-emerald-900 line-through' : 'text-[#E11D48]'}`}>
                              1. {dayItem.subject1.name}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-white text-[#475569] border border-[#E2E8F0] shrink-0">
                              {dayItem.subject1.tag}
                            </span>
                          </div>
                          <p className={`text-[11px] sm:text-xs leading-relaxed ${is1Done ? 'line-through text-emerald-900/80' : 'text-[#0F172A] font-medium'}`}>
                            {dayItem.subject1.goal}
                          </p>
                        </div>
                      </div>

                      {/* Subject 2 */}
                      <div
                        onClick={() => toggleGoal(k2)}
                        className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-2.5 ${
                          is2Done 
                            ? 'bg-emerald-100/60 border-emerald-300 text-emerald-950' 
                            : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#CBD5E1]'
                        }`}
                      >
                        <div 
                          className={`w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center mt-0.5 transition-colors ${
                            is2Done 
                              ? 'bg-emerald-600 border-emerald-600 text-white' 
                              : 'border-[#64748B] bg-white'
                          }`}
                        >
                          {is2Done ? '✓' : ''}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className={`font-bold text-xs truncate ${is2Done ? 'text-emerald-900 line-through' : 'text-[#0F172A]'}`}>
                              2. {dayItem.subject2.name}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-white text-[#475569] border border-[#E2E8F0] shrink-0">
                              {dayItem.subject2.tag}
                            </span>
                          </div>
                          <p className={`text-[11px] sm:text-xs leading-relaxed ${is2Done ? 'line-through text-emerald-900/80' : 'text-[#0F172A] font-medium'}`}>
                            {dayItem.subject2.goal}
                          </p>
                        </div>
                      </div>

                      {/* Subject 3 (Only for Free Mode) */}
                      {studentMode === 'free' && dayItem.subject3 && (
                        <div
                          onClick={() => toggleGoal(k3)}
                          className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-2.5 ${
                            is3Done 
                              ? 'bg-emerald-100/60 border-emerald-300 text-emerald-950' 
                              : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#CBD5E1]'
                          }`}
                        >
                          <div 
                            className={`w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center mt-0.5 transition-colors ${
                              is3Done 
                                ? 'bg-emerald-600 border-emerald-600 text-white' 
                                : 'border-[#64748B] bg-white'
                            }`}
                          >
                            {is3Done ? '✓' : ''}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className={`font-bold text-xs truncate ${is3Done ? 'text-emerald-900 line-through' : 'text-[#0F172A]'}`}>
                                3. {dayItem.subject3.name}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-white text-[#475569] border border-[#E2E8F0] shrink-0">
                                {dayItem.subject3.tag}
                              </span>
                            </div>
                            <p className={`text-[11px] sm:text-xs leading-relaxed ${is3Done ? 'line-through text-emerald-900/80' : 'text-[#0F172A] font-medium'}`}>
                              {dayItem.subject3.goal}
                            </p>
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Day Notes */}
                    {dayItem.notes && (
                      <div className="mt-2 text-[10px] sm:text-[11px] text-[#64748B] flex items-center gap-1">
                        <span>💡</span>
                        <span>{dayItem.notes}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. Planning Principles & Psychological Freedom (قواعد عدم التقييد بالوقت والراحة) */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-[#E2E8F0] pb-3">
              <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
                قواعد ذهبية لإدارة اليوم بنظام الأهداف
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                كيف تحرر نفسك من الضغط النفسي وتضمن الاستمرارية طوال أشهر البكالوريا.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PLANNING_PRINCIPLES.map((rule, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{rule.icon}</span>
                    <h4 className="text-xs sm:text-sm font-bold text-[#0F172A]">
                      {rule.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#475569] leading-relaxed">
                    {rule.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
