import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiHome, 
  HiChevronLeft, 
  HiSearch, 
  HiBookOpen, 
  HiLightBulb, 
  HiCheckCircle, 
  HiDocumentText, 
  HiSparkles,
  HiArrowRight,
  HiViewGrid,
  HiAcademicCap,
  HiOutlineCube
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { OFFICIAL_CURRICULUM } from '../data/curriculumData';
import { STREAMS } from '../data/streamsData';

export default function CurriculumPage() {
  const [selectedStreamId, setSelectedStreamId] = useState('sciences');
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [activeUnitIndex, setActiveUnitIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('roadmap'); // 'roadmap' | 'grid'

  const currentStreamData = OFFICIAL_CURRICULUM[selectedStreamId] || OFFICIAL_CURRICULUM.sciences;
  const subjectsList = currentStreamData.subjects || [];

  // Active subject (default to first subject if not set)
  const activeSubject = useMemo(() => {
    if (!selectedSubjectId) return subjectsList[0] || null;
    return subjectsList.find(s => s.id === selectedSubjectId) || subjectsList[0] || null;
  }, [selectedSubjectId, subjectsList]);

  // Flatten all units for active subject to navigate in roadmap
  const allUnitsOfSubject = useMemo(() => {
    if (!activeSubject || !activeSubject.domains) return [];
    const list = [];
    activeSubject.domains.forEach((dom) => {
      dom.units.forEach((unit) => {
        list.push({
          ...unit,
          domainTitle: dom.title,
          trimester: dom.trimester
        });
      });
    });
    return list;
  }, [activeSubject]);

  const activeUnit = allUnitsOfSubject[activeUnitIndex] || allUnitsOfSubject[0] || null;

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
      
      {/* 1. Header Banner */}
      <div className="bg-white border-b border-[#E2E8F0] py-6 sm:py-7">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#64748B] mb-3">
            <Link to="/" className="hover:text-[#E11D48] flex items-center gap-1 transition-colors">
              <HiHome className="w-4 h-4" />
              <span>الرئيسية</span>
            </Link>
            <span>/</span>
            <span className="text-[#0F172A] font-bold">المنهاج والبرنامج الوزاري الرسمي</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-[#E11D48] font-bold text-xs border border-rose-200">
                  خريطة المنهاج الوزاري التفاعلية 2026 🇩🇿
                </span>
                <span className="text-xs text-[#64748B]">مخطط انسيابي لجميع الوحدات والدروس المقررة</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
                برنامج ومنهاج دروس البكالوريا (Roadmap & Program) 🗺️
              </h1>
              <p className="text-xs sm:text-sm text-[#475569] mt-1 max-w-2xl leading-relaxed">
                تتبع مسار دروسك خطوة بخطوة من المحور إلى الوحدة وعناصر الدرس ونقاط التركيز في امتحان البكالوريا.
              </p>
            </div>

            {/* View Mode Switcher & Search */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              
              {/* Toggle Roadmap vs Grid */}
              <div className="flex items-center bg-[#F1F5F9] p-1 rounded-xl border border-[#E2E8F0] self-start sm:self-auto">
                <button
                  onClick={() => setViewMode('roadmap')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    viewMode === 'roadmap'
                      ? 'bg-white text-[#E11D48] shadow-2xs'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  <HiOutlineCube className="w-4 h-4" />
                  <span>المخطط الانسيابي</span>
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-white text-[#E11D48] shadow-2xs'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  <HiViewGrid className="w-4 h-4" />
                  <span>عرض الفهرس الكامل</span>
                </button>
              </div>

              {/* Search */}
              <div className="w-full sm:w-64">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="ابحث في المنهاج..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl pl-3 pr-8 py-2 text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#E11D48]"
                  />
                  <HiSearch className="w-3.5 h-3.5 text-[#64748B] absolute right-2.5 top-2.5" />
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
      </div>

      {/* 2. Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">

        {/* Global Search Results View */}
        {searchQuery.trim() ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-[#0F172A]">
                نتائج البحث في المنهاج عن "{searchQuery}" ({searchResults.length} وحدة متطابقة):
              </h3>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#E11D48] font-bold hover:underline cursor-pointer"
              >
                إلغاء البحث والعودة للمخطط ↺
              </button>
            </div>

            {searchResults.length === 0 ? (
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-12 text-center space-y-3">
                <div className="text-4xl">🔍</div>
                <h4 className="text-sm font-bold text-[#0F172A]">لم نجد أي درس يطابق كلمة البحث</h4>
                <p className="text-xs text-[#64748B]">جرب كتابة مصطلح آخر مثل (دوال، مناعة، متتاليات، أسترة...).</p>
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
          <div className="space-y-6">

            {/* 1. Stream Selector Tabs */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-3 sm:p-4 shadow-2xs">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {STREAMS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedStreamId(s.id);
                      setSelectedSubjectId(null);
                      setActiveUnitIndex(0);
                    }}
                    className={`p-3 rounded-xl text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                      selectedStreamId === s.id
                        ? 'bg-[#E11D48] text-white shadow-xs scale-[1.02]'
                        : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                    }`}
                  >
                    <span className="text-xl">{s.icon}</span>
                    <span className="truncate w-full">{s.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Subjects Bar of Active Stream */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#0F172A] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#E11D48]" />
                  <span>مواد {currentStreamData.name} ({subjectsList.length} مواد كاملة):</span>
                </span>
                <span className="text-xs text-[#64748B]">
                  حدد المادة لعرض مخططها
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {subjectsList.map((sub) => {
                  const isSelected = activeSubject && activeSubject.id === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => {
                        setSelectedSubjectId(sub.id);
                        setActiveUnitIndex(0);
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-[#0F172A] text-white shadow-xs'
                          : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                      }`}
                    >
                      <span className="text-base">{sub.icon}</span>
                      <span>{sub.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-[#E2E8F0] text-[#475569]'
                      }`}>
                        معامل {sub.coef}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. VISUAL FLOWCHART / ROADMAP VIEW (مثل مخطط الصورة) */}
            {viewMode === 'roadmap' && activeSubject && (
              <div className="space-y-6">

                {/* Subject Banner Summary */}
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#E11D48] border border-rose-100 flex items-center justify-center text-2xl shadow-2xs shrink-0">
                      {activeSubject.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#E11D48] bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                          {currentStreamData.name}
                        </span>
                        <span className="text-xs text-[#64748B] font-medium">
                          الحجم الساعي: {activeSubject.hours}
                        </span>
                      </div>
                      <h2 className="text-base sm:text-lg font-black text-[#0F172A] mt-1">
                        خريطة منهاج {activeSubject.name} ({allUnitsOfSubject.length} وحدات مقررة)
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
                    {activeSubject.id === 'english' && (
                      <a
                        href="https://drive.google.com/drive/folders/1t3HZtqpQA8F5qmI6nhoW35T5EN3h0SxR"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-xl bg-[#0F172A] hover:bg-black text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs"
                      >
                        <HiExternalLink className="w-4 h-4 text-rose-400" />
                        <span>Google Drive 🚀</span>
                      </a>
                    )}
                    <Link
                      to="/library"
                      className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#CBD5E1] text-xs font-bold flex items-center gap-1.5 shadow-2xs"
                    >
                      <HiDocumentText className="w-4 h-4 text-[#E11D48]" />
                      <span>ملخصات المادة</span>
                    </Link>
                    <Link
                      to="/quiz"
                      className="px-3.5 py-2 rounded-xl bg-[#E11D48] hover:bg-[#be123c] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs"
                    >
                      <HiSparkles className="w-4 h-4" />
                      <span>اختبار سريع QCM</span>
                    </Link>
                  </div>
                </div>

                {/* THE 3-NODE CONNECTED ROADMAP PIPELINE (Box 1 -> Box 2 -> Curved Arrow -> Box 3) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* BOX 1: المحطة 1 — قائمة الوحدات المقررة (Units Pipeline Selector) */}
                  <div className="lg:col-span-5 bg-white border border-[#E2E8F0] rounded-3xl p-5 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-xl bg-rose-50 text-[#E11D48] border border-rose-200 flex items-center justify-center text-xs font-black">
                          1
                        </span>
                        <div>
                          <h3 className="text-xs sm:text-sm font-black text-[#0F172A]">
                            المحطة 1: وحدات المنهاج المقررة
                          </h3>
                          <span className="text-[11px] text-[#64748B]">اختر الوحدة لمشاهدة تفاصيلها</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#E11D48] bg-rose-50 px-2 py-0.5 rounded-md">
                        {activeUnitIndex + 1} / {allUnitsOfSubject.length}
                      </span>
                    </div>

                    {/* Interactive Unit Nodes List with Flow Connector */}
                    <div className="space-y-2.5 relative">
                      {allUnitsOfSubject.map((unit, uIdx) => {
                        const isCurrent = activeUnitIndex === uIdx;
                        return (
                          <div
                            key={uIdx}
                            onClick={() => setActiveUnitIndex(uIdx)}
                            className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 relative ${
                              isCurrent
                                ? 'bg-rose-50/70 border-[#E11D48] text-[#0F172A] shadow-xs scale-[1.01]'
                                : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#CBD5E1] text-[#475569]'
                            }`}
                          >
                            <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 mt-0.5 font-mono ${
                              isCurrent ? 'bg-[#E11D48] text-white' : 'bg-white border border-[#CBD5E1] text-[#64748B]'
                            }`}>
                              {uIdx + 1}
                            </span>
                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] text-[#64748B] block truncate">{unit.domainTitle}</span>
                              <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] leading-snug mt-0.5">
                                {unit.title}
                              </h4>
                            </div>

                            {isCurrent && (
                              <HiArrowRight className="w-4 h-4 text-[#E11D48] shrink-0 mt-1" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* BOX 2 & BOX 3: تفاصيل الوحدة + نقاط التركيز + التقييم (Connected Detail Nodes) */}
                  <div className="lg:col-span-7 space-y-6">

                    {/* BOX 2: المحطة 2 — تفاصيل ومحاور الدرس (Active Unit Content Card) */}
                    {activeUnit && (
                      <div className="bg-white border-2 border-slate-300/80 rounded-3xl p-6 shadow-xs space-y-5 relative overflow-hidden">
                        
                        {/* Connecting Line Badge */}
                        <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
                          <div className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xs font-black">
                              2
                            </span>
                            <div>
                              <span className="text-[11px] text-[#64748B] block">{activeUnit.trimester} • {activeUnit.domainTitle}</span>
                              <h3 className="text-sm sm:text-base font-black text-[#0F172A]">
                                المحطة 2: {activeUnit.title}
                              </h3>
                            </div>
                          </div>
                        </div>

                        {/* List of Official Lesson Points */}
                        <div className="space-y-3 pt-1">
                          <span className="text-xs font-bold text-[#0F172A] block">
                            المفاهيم والعناصر المقررة وزارياً في هذه الوحدة:
                          </span>

                          <div className="space-y-2">
                            {activeUnit.lessons.map((les, lIdx) => (
                              <div key={lIdx} className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-2.5 text-xs text-[#1E293B] leading-relaxed">
                                <HiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{les}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Curved Flow Indicator to Box 3 */}
                        <div className="flex items-center justify-center gap-2 py-1 text-xs text-[#64748B] font-bold">
                          <span>▼ معايير ونقاط التركيز في امتحان البكالوريا ▼</span>
                        </div>

                        {/* BOX 3: المحطة 3 — نقاط التركيز والتحضير للبكالوريا (Curved Connection Node) */}
                        {activeUnit.focus && (
                          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border-2 border-amber-300 text-amber-950 space-y-2 shadow-2xs">
                            <div className="flex items-center gap-2 text-xs font-black text-amber-900">
                              <HiLightBulb className="w-5 h-5 text-amber-600 shrink-0" />
                              <span>المحطة 3: منهجية الإجابة ونقاط التركيز في البكالوريا:</span>
                            </div>
                            <p className="text-xs leading-relaxed text-amber-900/90 font-medium">
                              {activeUnit.focus}
                            </p>
                          </div>
                        )}

                        {/* Direct Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                          <Link
                            to="/library"
                            className="w-full sm:w-auto flex-1 py-3 rounded-xl bg-[#0F172A] hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-2xs"
                          >
                            <HiDocumentText className="w-4 h-4 text-rose-400" />
                            <span>تصفح مذكرات وسلاسل هذه الوحدة</span>
                          </Link>

                          <Link
                            to="/quiz"
                            className="w-full sm:w-auto flex-1 py-3 rounded-xl bg-[#E11D48] hover:bg-[#be123c] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-2xs"
                          >
                            <HiSparkles className="w-4 h-4" />
                            <span>اختبر فهمك في هذه الوحدة (QCM)</span>
                          </Link>
                        </div>

                      </div>
                    )}

                  </div>

                </div>

              </div>
            )}

            {/* 4. GRID / FULL CATALOG VIEW */}
            {viewMode === 'grid' && activeSubject && (
              <div className="space-y-6">
                
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-2xs">
                  <h2 className="text-base sm:text-lg font-black text-[#0F172A]">
                    الفهرس الكامل لمنهاج {activeSubject.name} — {currentStreamData.name}
                  </h2>
                </div>

                <div className="space-y-6">
                  {activeSubject.domains.map((dom, domIdx) => (
                    <div key={domIdx} className="space-y-4">
                      
                      <div className="flex items-center justify-between gap-3 border-r-4 border-[#E11D48] pr-3 py-0.5">
                        <div>
                          <h3 className="text-base font-black text-[#0F172A]">
                            {dom.title}
                          </h3>
                          <span className="text-xs text-[#64748B]">الموسم الدراسي: {dom.trimester}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {dom.units.map((unit, unitIdx) => (
                          <div
                            key={unitIdx}
                            className="bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-2xl p-5 shadow-2xs space-y-3"
                          >
                            <div className="flex items-start gap-2.5">
                              <span className="w-6 h-6 rounded-lg bg-rose-50 text-[#E11D48] font-bold text-xs flex items-center justify-center shrink-0 border border-rose-200 mt-0.5 font-mono">
                                {unitIdx + 1}
                              </span>
                              <h4 className="text-sm font-black text-[#0F172A] leading-relaxed">
                                {unit.title}
                              </h4>
                            </div>

                            <div className="space-y-2 pt-1 pr-2">
                              {unit.lessons.map((les, lIdx) => (
                                <div key={lIdx} className="flex items-start gap-2 text-xs text-[#334155] leading-relaxed">
                                  <HiCheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                  <span>{les}</span>
                                </div>
                              ))}
                            </div>

                            {unit.focus && (
                              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950 text-xs space-y-1 mt-2">
                                <div className="flex items-center gap-1.5 font-bold text-amber-900">
                                  <HiLightBulb className="w-4 h-4 text-amber-600 shrink-0" />
                                  <span>نقطة التركيز في البكالوريا:</span>
                                </div>
                                <p className="text-[11px] text-amber-900/90 leading-relaxed font-medium">
                                  {unit.focus}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
