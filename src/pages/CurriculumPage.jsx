import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiHome, 
  HiSearch, 
  HiBookOpen, 
  HiLightBulb, 
  HiCheckCircle, 
  HiDocumentText, 
  HiSparkles,
  HiChevronLeft,
  HiChevronRight,
  HiAcademicCap
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { OFFICIAL_CURRICULUM } from '../data/curriculumData';
import { STREAMS } from '../data/streamsData';

export default function CurriculumPage() {
  const [selectedStreamId, setSelectedStreamId] = useState('sciences');
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [selectedUnitIndex, setSelectedUnitIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const currentStreamData = OFFICIAL_CURRICULUM[selectedStreamId] || OFFICIAL_CURRICULUM.sciences;
  const subjectsList = currentStreamData.subjects || [];

  // Active subject (default to first subject if not set)
  const activeSubject = useMemo(() => {
    if (!selectedSubjectId) return subjectsList[0] || null;
    return subjectsList.find(s => s.id === selectedSubjectId) || subjectsList[0] || null;
  }, [selectedSubjectId, subjectsList]);

  // Flattened all units of active subject for the clean ribbon stepper (1 -- 2 -- 3...)
  const allUnitsOfSubject = useMemo(() => {
    if (!activeSubject) return [];
    const units = [];
    activeSubject.domains.forEach(dom => {
      dom.units.forEach(u => {
        units.push({
          ...u,
          domainTitle: dom.title,
          trimester: dom.trimester
        });
      });
    });
    return units;
  }, [activeSubject]);

  // Safe active unit
  const activeUnit = allUnitsOfSubject[selectedUnitIndex] || allUnitsOfSubject[0] || null;

  // Global Search filter
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase().trim();
    const results = [];

    Object.entries(OFFICIAL_CURRICULUM).forEach(([strId, strObj]) => {
      const streamMeta = STREAMS.find(s => s.id === strId) || { name: strObj.name, icon: strObj.icon };
      
      strObj.subjects.forEach(sub => {
        sub.domains.forEach(dom => {
          dom.units.forEach(unit => {
            const matchesUnit = unit.title.toLowerCase().includes(q) || (unit.focus && unit.focus.toLowerCase().includes(q));
            const matchingLessons = unit.lessons.filter(l => l.toLowerCase().includes(q));

            if (matchesUnit || matchingLessons.length > 0) {
              results.push({
                streamId: strId,
                streamName: streamMeta.name,
                streamIcon: streamMeta.icon,
                subjectName: sub.name,
                domainTitle: dom.title,
                unitTitle: unit.title,
                lessons: matchingLessons.length > 0 ? matchingLessons : unit.lessons,
                focus: unit.focus
              });
            }
          });
        });
      });
    });

    return results;
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pb-24 font-['Cairo']">
      
      {/* 1. Top Header Banner */}
      <div className="bg-white border-b border-[#E2E8F0] py-5 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#64748B] mb-2.5">
            <Link to="/" className="hover:text-[#E11D48] flex items-center gap-1 transition-colors">
              <HiHome className="w-4 h-4" />
              <span>الرئيسية</span>
            </Link>
            <span>/</span>
            <span className="text-[#0F172A] font-bold">دليل المنهاج والبرنامج الوزاري</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-[#0F172A]">
                فهرس دروس ومنهاج البكالوريا الوزاري 📚
              </h1>
              <p className="text-xs text-[#64748B] mt-0.5 max-w-2xl leading-relaxed">
                تصفح منظم ومتسلسل لجميع مواد ووحدات الشعب الست وفق التدرجات الرسمية لوزارة التربية الوطنية.
              </p>
            </div>

            {/* Quick Search in Curriculum */}
            <div className="w-full md:w-72">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث عن درس (استنساخ، موافقات...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl pl-3 pr-8 py-2 text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#E11D48] shadow-2xs transition-all"
                />
                <HiSearch className="w-4 h-4 text-[#64748B] absolute right-2.5 top-2.5" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute left-2.5 top-2 text-xs text-[#64748B] hover:text-[#0F172A]"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5 space-y-5">

        {/* Global Search Results */}
        {searchQuery.trim() ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-[#0F172A]">
                نتائج البحث عن "{searchQuery}" ({searchResults.length} وحدة متطابقة):
              </h3>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#E11D48] font-bold hover:underline cursor-pointer"
              >
                إلغاء البحث والعودة للشريط ↺
              </button>
            </div>

            {searchResults.length === 0 ? (
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-12 text-center space-y-3">
                <div className="text-4xl">🔍</div>
                <h4 className="text-sm font-bold text-[#0F172A]">لم نجد أي درس يطابق كلمة البحث</h4>
                <p className="text-xs text-[#64748B]">جرب كتابة مصطلح آخر مثل (دوال، مناعة، متتاليات...).</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.map((res, i) => (
                  <div key={i} className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between gap-2 border-b border-[#F1F5F9] pb-2.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F172A]">
                        <span>{res.streamIcon}</span>
                        <span>{res.streamName}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-lg bg-rose-50 text-[#E11D48] font-bold text-[11px] border border-rose-100">
                        {res.subjectName}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-[#64748B] block">{res.domainTitle}</span>
                      <h4 className="text-sm font-black text-[#0F172A] mt-0.5">{res.unitTitle}</h4>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-bold text-[#475569] block">عناصر الدرس المقررة:</span>
                      {res.lessons.map((les, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#334155]">
                          <HiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{les}</span>
                        </div>
                      ))}
                    </div>

                    {res.focus && (
                      <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950 text-xs flex items-start gap-2">
                        <HiLightBulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>نقطة تركيز البكالوريا:</strong> {res.focus}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Sleek Ribbon & Stepper Navigation */
          <div className="space-y-4">

            {/* 1. شريط الشعب المتسلسل (Stream Ribbon 1 -- 2 -- 3 -- 4 -- 5 -- 6) */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-2.5 sm:p-3 shadow-2xs">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {STREAMS.map((s, idx) => {
                  const isSelected = selectedStreamId === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => {
                        setSelectedStreamId(s.id);
                        setSelectedSubjectId(null);
                        setSelectedUnitIndex(0);
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-[#E11D48] text-white shadow-xs'
                          : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-black font-mono shrink-0 ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-[#E2E8F0] text-[#0F172A]'
                      }`}>
                        {idx + 1}
                      </span>
                      <span>{s.icon}</span>
                      <span className="whitespace-nowrap">{s.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. شريط المواد المتسلسل (Subjects Ribbon 1 -- 2 -- 3...) */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-2.5 sm:p-3 shadow-2xs">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {subjectsList.map((sub, idx) => {
                  const isSelected = activeSubject && activeSubject.id === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => {
                        setSelectedSubjectId(sub.id);
                        setSelectedUnitIndex(0);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-[#0F172A] text-white shadow-xs'
                          : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                      }`}
                    >
                      <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-black font-mono shrink-0 ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-[#CBD5E1] text-[#0F172A]'
                      }`}>
                        {idx + 1}
                      </span>
                      <span>{sub.icon}</span>
                      <span className="whitespace-nowrap">{sub.name}</span>
                      <span className={`text-[10px] px-1 py-0.2 rounded font-mono font-bold ${
                        isSelected ? 'bg-rose-500/30 text-rose-300' : 'bg-[#E2E8F0] text-[#64748B]'
                      }`}>
                        م{sub.coef}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. شريط تسلسل الوحدات (Units Stepper 1 ──► 2 ──► 3) */}
            {activeSubject && allUnitsOfSubject.length > 0 && (
              <div className="space-y-4">
                
                {/* Stepper Ribbon Header */}
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-3 sm:p-4 shadow-2xs">
                  <div className="flex items-center justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-[#0F172A]">
                        {activeSubject.icon} منهاج {activeSubject.name} ({allUnitsOfSubject.length} وحدات):
                      </span>
                      <span className="text-[11px] text-[#64748B] font-mono hidden sm:inline">
                        • {activeSubject.hours}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to="/library"
                        className="px-2.5 py-1 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#CBD5E1] text-xs font-bold text-[#0F172A] flex items-center gap-1 transition-colors"
                      >
                        <HiDocumentText className="w-3.5 h-3.5 text-[#E11D48]" />
                        <span>الملخصات</span>
                      </Link>
                      <Link
                        to="/quiz"
                        className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-xs font-bold text-[#E11D48] flex items-center gap-1 transition-colors"
                      >
                        <HiSparkles className="w-3.5 h-3.5" />
                        <span>اختبار QCM</span>
                      </Link>
                    </div>
                  </div>

                  {/* Horizontal Units Ribbon (1 -- 2 -- 3 -- 4...) */}
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                    {allUnitsOfSubject.map((u, uIdx) => {
                      const isCurrent = selectedUnitIndex === uIdx;
                      return (
                        <button
                          key={uIdx}
                          onClick={() => setSelectedUnitIndex(uIdx)}
                          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer border ${
                            isCurrent
                              ? 'bg-rose-50 border-[#E11D48] text-[#E11D48] shadow-xs scale-[1.02]'
                              : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
                          }`}
                        >
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-black font-mono shrink-0 ${
                            isCurrent ? 'bg-[#E11D48] text-white' : 'bg-[#CBD5E1] text-[#0F172A]'
                          }`}>
                            {uIdx + 1}
                          </span>
                          <span className="whitespace-nowrap max-w-[180px] truncate">{u.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Active Selected Unit Viewer (بطاقة الوحدة المختارة المفصلة) */}
                {activeUnit && (
                  <motion.div
                    key={`${activeSubject.id}-${selectedUnitIndex}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-7 shadow-xs space-y-5"
                  >
                    {/* Unit Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F1F5F9] pb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-[#E11D48] font-black text-sm flex items-center justify-center font-mono shrink-0 shadow-2xs">
                          {selectedUnitIndex + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-xs text-[#64748B]">
                            <span>{activeUnit.domainTitle}</span>
                            <span>•</span>
                            <span className="text-[#E11D48] font-bold">{activeUnit.trimester}</span>
                          </div>
                          <h2 className="text-base sm:text-lg font-black text-[#0F172A] mt-0.5">
                            {activeUnit.title}
                          </h2>
                        </div>
                      </div>

                      {/* Navigation between Units (السابق / التالي) */}
                      <div className="flex items-center gap-1.5 self-end sm:self-auto">
                        <button
                          onClick={() => setSelectedUnitIndex(prev => Math.max(prev - 1, 0))}
                          disabled={selectedUnitIndex <= 0}
                          className="px-3 py-1.5 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F172A] disabled:opacity-30 border border-[#E2E8F0] text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <HiChevronRight className="w-4 h-4" />
                          <span>الوحدة السابقة</span>
                        </button>

                        <button
                          onClick={() => setSelectedUnitIndex(prev => Math.min(prev + 1, allUnitsOfSubject.length - 1))}
                          disabled={selectedUnitIndex >= allUnitsOfSubject.length - 1}
                          className="px-3 py-1.5 rounded-xl bg-[#0F172A] hover:bg-black text-white disabled:opacity-30 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                        >
                          <span>الوحدة التالية</span>
                          <HiChevronLeft className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Lessons Checklist */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-black text-[#64748B]">
                        المحاور والمفاهيم المقررة في هذه الوحدة:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {activeUnit.lessons.map((les, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#334155] flex items-start gap-2.5"
                          >
                            <HiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{les}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pedagogical Focus Tip */}
                    {activeUnit.focus && (
                      <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs space-y-1.5">
                        <div className="flex items-center gap-1.5 font-bold text-amber-900">
                          <HiLightBulb className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>نقطة التركيز المنهجي في البكالوريا:</span>
                        </div>
                        <p className="text-xs text-amber-900/90 leading-relaxed font-medium pr-5">
                          {activeUnit.focus}
                        </p>
                      </div>
                    )}

                  </motion.div>
                )}

              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
