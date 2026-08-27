import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiHome, 
  HiChevronLeft, 
  HiExternalLink, 
  HiPlay, 
  HiSearch,
  HiLightBulb,
  HiAcademicCap
} from 'react-icons/hi';
import { 
  YOUTUBE_TEACHERS, 
  YOUTUBE_STREAMS, 
  YOUTUBE_SUBJECTS 
} from '../data/youtubeData';

export default function YouTubeTeachersPage() {
  const [selectedStream, setSelectedStream] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamically compute subjects that actually belong to the selected stream
  const availableSubjects = useMemo(() => {
    if (selectedStream === 'all') {
      return YOUTUBE_SUBJECTS;
    }
    const teachersForStream = YOUTUBE_TEACHERS.filter(t => t.streams.includes(selectedStream));
    const validSubjectIds = new Set(teachersForStream.map(t => t.subjectId));

    return YOUTUBE_SUBJECTS.filter(s => s.id === 'all' || validSubjectIds.has(s.id));
  }, [selectedStream]);

  // Filtered teachers list based on stream, subject, and search query
  const filteredTeachers = useMemo(() => {
    return YOUTUBE_TEACHERS.filter(teacher => {
      // 1. Stream filter
      if (selectedStream !== 'all' && !teacher.streams.includes(selectedStream)) {
        return false;
      }
      // 2. Subject filter
      if (selectedSubject !== 'all' && teacher.subjectId !== selectedSubject) {
        return false;
      }
      // 3. Search query
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.trim().toLowerCase();
        const match = 
          teacher.name.toLowerCase().includes(q) ||
          teacher.subject.toLowerCase().includes(q) ||
          (teacher.styleBadge && teacher.styleBadge.toLowerCase().includes(q)) ||
          teacher.pedagogy.toLowerCase().includes(q) ||
          teacher.bestFor.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [selectedStream, selectedSubject, searchQuery]);

  const handleStreamChange = (streamId) => {
    setSelectedStream(streamId);
    setSelectedSubject('all');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pb-20 font-['Cairo']" dir="rtl">
      
      {/* Top Banner & Header */}
      <div className="bg-white border-b border-[#E2E8F0] py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#64748B] mb-3">
            <Link to="/" className="hover:text-[#E11D48] flex items-center gap-1 transition-colors">
              <HiHome className="w-4 h-4" />
              <span>الرئيسية</span>
            </Link>
            <span>/</span>
            <span className="text-[#0F172A] font-bold">دليل أساتذة وقنوات اليوتيوب</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-50 text-[#E11D48] border border-rose-100 text-xs font-semibold mb-2">
                <HiAcademicCap className="w-4 h-4" />
                <span>دليل تعليمي محايد وشامل للبكالوريا الجزائرية</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
                دليل أساتذة وقنوات اليوتيوب 🎥
              </h1>
              <p className="text-xs sm:text-sm text-[#475569] mt-1.5 max-w-3xl leading-relaxed">
                تحليل منهجي محايد لأساليب وطرق شرح كل أستاذ في المنهاج، لمساعدتك على اختيار الشرح الأنسب لنمط استيعابك بدون تشتت أو مقارنات غير مجدية.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
              <Link
                to="/"
                className="px-4 py-2 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0F172A] text-xs font-bold border border-[#CBD5E1] transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <span>العودة للرئيسية</span>
                <HiChevronLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        
        {/* Filter Box: Streams + Subjects + Search */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-4">
          
          {/* 1. Stream Selector Pills */}
          <div>
            <span className="block text-xs font-bold text-[#0F172A] mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E11D48]"></span>
              <span>1. اختر الشعبة الدراسية:</span>
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {YOUTUBE_STREAMS.map(s => (
                <button
                  key={s.id}
                  onClick={() => handleStreamChange(s.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    selectedStream === s.id
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

          {/* 2. Subject Selector Pills */}
          <div className="pt-2 border-t border-[#E2E8F0]">
            <span className="block text-xs font-bold text-[#0F172A] mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#475569]"></span>
              <span>2. مواد شعبة {YOUTUBE_STREAMS.find(s => s.id === selectedStream)?.name || 'البكالوريا'}:</span>
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {availableSubjects.map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubject(sub.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                    selectedSubject === sub.id
                      ? 'bg-[#0F172A] text-white'
                      : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                  }`}
                >
                  <span>{sub.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Search Box */}
          <div className="pt-2 border-t border-[#E2E8F0]">
            <div className="relative">
              <HiSearch className="w-4 h-4 text-[#64748B] absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ابحث باسم الأستاذ، المادة، أو طريقة الشرح (مثال: نورالدين، كنان، كتفي، زدون، بورنان، سالي، ناصري، عادل مقرود...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl pr-9 pl-4 py-2.5 text-xs text-[#0F172A] focus:outline-none focus:border-[#E11D48] placeholder-[#94A3B8]"
              />
            </div>
          </div>

        </div>

        {/* Results Metrics Header */}
        <div className="flex items-center justify-between text-xs text-[#475569] px-1">
          <span>
            عرض <strong className="text-[#0F172A] font-bold">{filteredTeachers.length}</strong> أستاذ وقناة تعليمية موثقة
          </span>
          <span className="text-[#64748B] hidden sm:inline">
            💡 الروابط تنقلك مباشرة إلى قنوات وقوائم التشغيل الرسمية على يوتيوب
          </span>
        </div>

        {/* Teachers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white border border-[#E2E8F0] hover:border-slate-300 rounded-2xl p-5 sm:p-6 transition-all flex flex-col justify-between shadow-xs space-y-4"
            >
              <div className="space-y-4">
                
                {/* Header: Icon, Name, Subject, and Style Badge */}
                <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200/70 text-slate-700 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                      {teacher.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#0F172A]">
                        {teacher.name}
                      </h3>
                      <span className="text-xs font-semibold text-[#E11D48] block mt-0.5">
                        مادة {teacher.subject}
                      </span>
                    </div>
                  </div>

                  {/* Clean Minimalist Style Badge */}
                  {teacher.styleBadge && (
                    <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200/60 max-w-[200px] text-center leading-snug">
                      {teacher.styleBadge}
                    </span>
                  )}
                </div>

                {/* Pedagogy Analysis (أسلوب الشرح وطريقة التدريس) */}
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-bold text-[#0F172A] block mb-1 text-[11px] flex items-center gap-1">
                      <span>🔍 أسلوب الشرح والمنهجية:</span>
                    </span>
                    <p className="text-[#475569] leading-relaxed bg-[#F8FAFC] p-3 rounded-xl border border-slate-200/60">
                      {teacher.pedagogy}
                    </p>
                  </div>

                  {/* Best For (الأفضل لـ) */}
                  {teacher.bestFor && (
                    <div>
                      <span className="font-bold text-[#0F172A] block mb-1 text-[11px]">
                        🎯 يبرع خصيصاً في:
                      </span>
                      <p className="text-[#0F172A] font-medium text-[11px] bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/60">
                        {teacher.bestFor}
                      </p>
                    </div>
                  )}

                  {/* Top Playlists (أبرز السلاسل) */}
                  {teacher.topPlaylists && teacher.topPlaylists.length > 0 && (
                    <div>
                      <span className="font-bold text-[#0F172A] block mb-1.5 text-[11px]">
                        📚 أبرز السلاسل والقوائم الموصى بها:
                      </span>
                      <ul className="space-y-1">
                        {teacher.topPlaylists.map((pl, i) => (
                          <li key={i} className="text-[11px] text-[#475569] flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></span>
                            <span className="truncate">{pl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>

              </div>

              {/* Action Link to Official YouTube */}
              <div className="pt-3.5 border-t border-[#E2E8F0] flex items-center justify-between">
                <span className="text-[11px] text-[#64748B]">
                  محتوى تعليمي مجاني ومتاح
                </span>

                <a
                  href={teacher.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <HiPlay className="w-4 h-4 text-rose-400" />
                  <span>فتح القناة على YouTube</span>
                  <HiExternalLink className="w-3.5 h-3.5 text-slate-300" />
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Study Methodology Advice Box */}
        <div className="mt-12 bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 text-[#E11D48] flex items-center justify-center text-2xl shrink-0">
              <HiLightBulb className="w-6 h-6" />
            </div>
            <div className="space-y-1.5 text-center sm:text-right">
              <h4 className="text-sm sm:text-base font-bold text-[#0F172A]">
                نصيحة ذهبية لمنهجية المتابعة على اليوتيوب:
              </h4>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                كل أستاذ له طريقته وأسلوبه الخاص الذي يناسب فئة من الطلاب؛ اختر أستاذاً واحداً ترتاح لطريقة شرحه في كل مادة والتزم معه في دروس المنهاج وسلاسل التمارين حتى تحافظ على تركيزك وتتجنب التشتت بين الطرق المتعددة.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
