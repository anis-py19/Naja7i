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
  HiAcademicCap
} from 'react-icons/hi';
import { OFFICIAL_CURRICULUM } from '../data/curriculumData';
import { STREAMS } from '../data/streamsData';

export default function CurriculumPage() {
  const [selectedStreamId, setSelectedStreamId] = useState('sciences');
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const currentStreamData = OFFICIAL_CURRICULUM[selectedStreamId] || OFFICIAL_CURRICULUM.sciences;
  const subjectsList = currentStreamData.subjects || [];

  // Active subject (default to first subject if not set)
  const activeSubject = useMemo(() => {
    if (!selectedSubjectId) return subjectsList[0] || null;
    return subjectsList.find(s => s.id === selectedSubjectId) || subjectsList[0] || null;
  }, [selectedSubjectId, subjectsList]);

  // Global Search filter across all units and lessons
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
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
                دليل المنهاج والبرنامج الوزاري لبكالوريا 3AS 📚
              </h1>
              <p className="text-xs sm:text-sm text-[#475569] mt-1 max-w-2xl leading-relaxed">
                تصفح فهرس الدروس والمحاور الرسمية المقررة في امتحان شهادة البكالوريا لكل شعبة ومادة مع الكفاءات المستهدفة وروابط المراجعة المباشرة.
              </p>
            </div>

            {/* Quick Search in Curriculum */}
            <div className="w-full md:w-80">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث في المنهاج (مثال: استنساخ، موافقات، اهتلاكات...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl pl-3 pr-9 py-2.5 text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#E11D48] shadow-2xs transition-all"
                />
                <HiSearch className="w-4 h-4 text-[#64748B] absolute right-3 top-3" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute left-3 top-2.5 text-xs text-[#64748B] hover:text-[#0F172A]"
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
                إلغاء البحث والعودة للفهرس ↺
              </button>
            </div>

            {searchResults.length === 0 ? (
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-12 text-center space-y-3">
                <div className="text-4xl">🔍</div>
                <h4 className="text-sm font-bold text-[#0F172A]">لم نجد أي درس يطابق كلمة البحث</h4>
                <p className="text-xs text-[#64748B]">جرب كتابة مصطلح آخر مثل (دوال، مناعة، متتاليات، أسترة...).</p>
              </div>
            ) : (
              <div className="space-y-3">
                {searchResults.map((res, i) => (
                  <div key={i} className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between gap-2 border-b border-[#F1F5F9] pb-2.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F172A]">
                        <span>{res.streamIcon}</span>
                        <span>{res.streamName}</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-lg bg-rose-50 text-[#E11D48] font-bold text-[11px] border border-rose-100">
                        {res.subjectName}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-[#64748B] block">{res.domainTitle}</span>
                      <h4 className="text-sm font-black text-[#0F172A] mt-0.5">{res.unitTitle}</h4>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-bold text-[#475569] block">عناصر الدرس المقررة:</span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {res.lessons.map((les, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-[#334155]">
                            <HiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{les}</span>
                          </div>
                        ))}
                      </div>
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
          /* Normal Stream & Subject Directory View */
          <div className="space-y-6">

            {/* 1. Stream Selector Row */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-2.5 sm:p-3 shadow-2xs">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
                {STREAMS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedStreamId(s.id);
                      setSelectedSubjectId(null);
                    }}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 shrink-0 cursor-pointer ${
                      selectedStreamId === s.id
                        ? 'bg-[#E11D48] text-white shadow-xs'
                        : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                    }`}
                  >
                    <span className="text-base">{s.icon}</span>
                    <span>{s.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Subjects Horizontal Row Bar */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#0F172A] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#E11D48]" />
                  <span>جميع مواد {currentStreamData.name} ({subjectsList.length} مواد):</span>
                </span>
                <span className="text-[11px] text-[#64748B]">
                  مرر أفقياً واختر المادة
                </span>
              </div>

              {/* Horizontal Scrollable Row of Subjects */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {subjectsList.map((sub) => {
                  const isSelected = activeSubject && activeSubject.id === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubjectId(sub.id)}
                      className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
                        isSelected
                          ? 'bg-[#0F172A] text-white shadow-xs scale-[1.02]'
                          : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                      }`}
                    >
                      <span className="text-base">{sub.icon}</span>
                      <span>{sub.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-[#E2E8F0] text-[#475569]'
                      }`}>
                        معامل {sub.coef}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Detailed Curriculum for Active Subject (ROW STYLE CARDS) */}
            {activeSubject && (
              <div className="space-y-6">
                
                {/* Subject Header Row Banner */}
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#E11D48] border border-rose-100 flex items-center justify-center text-2xl shadow-2xs shrink-0">
                      {activeSubject.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#E11D48] bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                          {currentStreamData.name}
                        </span>
                        <span className="text-xs text-[#64748B] font-mono">
                          الحجم الساعي: {activeSubject.hours}
                        </span>
                        <span className="text-xs font-bold text-[#0F172A] font-mono">
                          • المعامل الرسمي: {activeSubject.coef}
                        </span>
                      </div>
                      <h2 className="text-lg sm:text-xl font-black text-[#0F172A] mt-1">
                        منهاج مادة {activeSubject.name} — بكالوريا الجزائر
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                    <Link
                      to="/library"
                      className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#CBD5E1] text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
                    >
                      <HiDocumentText className="w-4 h-4 text-[#E11D48]" />
                      <span>مكتبة الملخصات</span>
                    </Link>
                    <Link
                      to="/quiz"
                      className="px-3.5 py-2 rounded-xl bg-[#E11D48] hover:bg-[#be123c] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
                    >
                      <HiSparkles className="w-4 h-4" />
                      <span>اختبار سريع QCM</span>
                    </Link>
                  </div>
                </div>

                {/* Domains and Units List (WIDE ROW LAYOUT) */}
                <div className="space-y-6">
                  {activeSubject.domains.map((dom, domIdx) => (
                    <div key={domIdx} className="space-y-3">
                      
                      {/* Domain Header Badge */}
                      <div className="flex items-center justify-between gap-3 border-r-4 border-[#E11D48] pr-3 py-0.5">
                        <div>
                          <h3 className="text-sm sm:text-base font-black text-[#0F172A]">
                            {dom.title}
                          </h3>
                          <span className="text-xs text-[#64748B]">الموسم الدراسي: {dom.trimester}</span>
                        </div>
                      </div>

                      {/* Units Row Cards */}
                      <div className="space-y-3">
                        {dom.units.map((unit, unitIdx) => (
                          <div
                            key={unitIdx}
                            className="bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-all space-y-4"
                          >
                            {/* Row Top: Title and Badges */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F1F5F9] pb-3">
                              <div className="flex items-center gap-2.5">
                                <span className="w-7 h-7 rounded-xl bg-rose-50 text-[#E11D48] font-black text-xs flex items-center justify-center shrink-0 border border-rose-200 font-mono">
                                  {unitIdx + 1}
                                </span>
                                <h4 className="text-sm sm:text-base font-black text-[#0F172A]">
                                  {unit.title}
                                </h4>
                              </div>
                              <span className="text-[11px] text-[#64748B] font-semibold bg-[#F8FAFC] px-2.5 py-1 rounded-lg border border-[#E2E8F0] self-start sm:self-auto">
                                مقرر رسمي في امتحان البكالوريا
                              </span>
                            </div>

                            {/* Row Middle: Lessons Grid in Row */}
                            <div className="space-y-2">
                              <span className="text-xs font-bold text-[#475569] block">
                                العناصر والمفاهيم المقررة وزارياً:
                              </span>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                                {unit.lessons.map((les, lIdx) => (
                                  <div 
                                    key={lIdx} 
                                    className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-2 text-xs text-[#334155] leading-relaxed"
                                  >
                                    <HiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                    <span className="font-medium">{les}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Row Bottom: Focus Tip */}
                            {unit.focus && (
                              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950 text-xs flex items-start gap-2.5">
                                <HiLightBulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                <div>
                                  <strong className="text-amber-900 font-black">نقطة التركيز ومعايير التصحيح في البكالوريا: </strong>
                                  <span className="text-amber-900/90 font-medium">{unit.focus}</span>
                                </div>
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
