import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiHome, 
  HiChevronLeft, 
  HiExternalLink, 
  HiPlay,
  HiSearch,
  HiStar,
  HiCheckCircle,
  HiTable
} from 'react-icons/hi';
import { 
  YOUTUBE_TEACHERS, 
  YOUTUBE_STREAMS, 
  YOUTUBE_SUBJECTS,
  CORE_SUMMARY_TABLE
} from '../data/youtubeData';

export default function YouTubeTeachersPage() {
  const [selectedStream, setSelectedStream] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSummaryTable, setShowSummaryTable] = useState(false);

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
          teacher.tag.toLowerCase().includes(q) ||
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

  const getRankBadge = (rank) => {
    if (rank === 1) {
      return (
        <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 text-[11px] font-medium border border-amber-200/60 flex items-center gap-1">
          <span>🥇</span>
          <span>المركز الأول</span>
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200/60 flex items-center gap-1">
          <span>🥈</span>
          <span>المركز الثاني</span>
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 text-[11px] font-medium border border-amber-200/60 flex items-center gap-1">
          <span>🥉</span>
          <span>المركز الثالث</span>
        </span>
      );
    }
    if (rank === 4) {
      return (
        <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 text-[11px] font-medium border border-sky-200/60 flex items-center gap-1">
          <span>4️⃣</span>
          <span>المركز الرابع</span>
        </span>
      );
    }
    if (rank === 5) {
      return (
        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-medium border border-emerald-200/60 flex items-center gap-1">
          <span>5️⃣</span>
          <span>المركز الخامس</span>
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 text-[11px] font-medium border border-slate-200/50">
        موصى به
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pb-20 font-['Cairo']">
      
      {/* Top Banner & Breadcrumb */}
      <div className="bg-white border-b border-[#E2E8F0] py-5 sm:py-6">
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
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
                دليل أفضل قنوات وأساتذة البكالوريا على اليوتيوب 🎥
              </h1>
              <p className="text-xs text-[#475569] mt-1 max-w-2xl leading-relaxed">
                قائمة مفصلة ومصنفة (🥇 الأول 🥈 الثاني 🥉 الثالث) لجميع الشعب لمساعدتك على اختيار المصادر الثابتة لرحلة تفوقك.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                onClick={() => setShowSummaryTable(!showSummaryTable)}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0F172A] text-xs font-bold border border-[#CBD5E1] transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <HiTable className="w-4 h-4 text-[#E11D48]" />
                <span>{showSummaryTable ? 'إخفاء جدول الخلاصة' : 'عرض جدول الخلاصة السريعة'}</span>
              </button>

              <Link
                to="/"
                className="px-4 py-2 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0F172A] text-xs font-bold border border-[#CBD5E1] transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <span>الرئيسية</span>
                <HiChevronLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        
        {/* Core Summary Quick Comparison Table (Collapsible) */}
        {showSummaryTable && (
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">🏆</span>
                <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">
                  الخلاصة السريعة — أفضل 3 أساتذة في كل مادة لـ BAC 2026/2027
                </h3>
              </div>
              <span className="text-[11px] text-[#64748B]">إحصائيات موثقة</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-[#F8FAFC] text-[#0F172A] font-bold border-b border-[#E2E8F0]">
                    <th className="p-2.5 rounded-r-lg">المادة</th>
                    <th className="p-2.5">🥇 المركز الأول</th>
                    <th className="p-2.5">🥈 المركز الثاني</th>
                    <th className="p-2.5 rounded-l-lg">🥉 المركز الثالث</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {CORE_SUMMARY_TABLE.map((row, i) => (
                    <tr key={i} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="p-2.5 font-bold text-[#0F172A]">{row.subject}</td>
                      <td className="p-2.5 text-[#0F172A] font-semibold flex items-center gap-1">
                        <span className="text-amber-500 font-bold">🥇</span>
                        <span>{row.gold}</span>
                      </td>
                      <td className="p-2.5 text-[#475569]">
                        <span className="text-slate-400 font-bold ml-1">🥈</span>
                        <span>{row.silver}</span>
                      </td>
                      <td className="p-2.5 text-[#64748B]">
                        <span className="text-amber-700 font-bold ml-1">🥉</span>
                        <span>{row.bronze}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

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

          {/* 2. Subject Selector Pills (Filtered strictly to the selected stream) */}
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
                placeholder="ابحث باسم الأستاذ، المادة، أو الوحدة (مثال: نور الدين، زدون، قزيحي، عباشي، خليفي، حيقون، Sally...)"
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
            تم العثور على <strong className="text-[#E11D48] font-bold">{filteredTeachers.length}</strong> أستاذ معتمد ومصنف
          </span>
          <span className="text-[#64748B]">
            💡 جميع الروابط تنقلك مباشرة إلى قوائم التشغيل الرسمية على يوتيوب
          </span>
        </div>

        {/* Teachers Detailed Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white border border-[#E2E8F0] hover:border-[#E11D48] rounded-2xl p-6 transition-all flex flex-col justify-between shadow-xs space-y-5"
            >
              <div>
                
                {/* Header: Avatar, Name, Subject, Stats */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#E11D48] flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                      {teacher.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-[#0F172A]">
                          {teacher.name}
                        </h3>
                        {getRankBadge(teacher.rank)}
                      </div>
                      <span className="text-xs font-bold text-[#E11D48] block mt-0.5">
                        مادة {teacher.subject}
                      </span>
                    </div>
                  </div>

                  <div className="text-left shrink-0 space-y-1">
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500 justify-end">
                      <HiStar className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span>{teacher.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#0F172A] border border-[#E2E8F0] block">
                      {teacher.subscribers}
                    </span>
                  </div>
                </div>

                {/* DzExams Metric Tag */}
                {teacher.statsDz && (
                  <div className="mt-3 px-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[11px] text-[#475569] flex items-center gap-1.5 font-medium">
                    <span className="text-[#E11D48] font-bold">📊 قاعدة DzExams:</span>
                    <span>{teacher.statsDz}</span>
                  </div>
                )}

                {/* Pedagogy Analysis (أسلوب الشرح وطريقة التدريس) */}
                <div className="pt-3 space-y-3 text-xs">
                  <div>
                    <span className="font-bold text-[#0F172A] block mb-1 text-[11px]">
                      🔍 أسلوب الشرح والمنهجية:
                    </span>
                    <p className="text-[#475569] leading-relaxed bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
                      {teacher.pedagogy}
                    </p>
                  </div>

                  {/* Best For */}
                  <div>
                    <span className="font-bold text-[#0F172A] block mb-1 text-[11px]">
                      🎯 الأفضل لمراجعة:
                    </span>
                    <p className="text-[#0F172A] font-semibold text-[11px] bg-[#F1F5F9] px-3 py-1.5 rounded-lg border border-[#E2E8F0]">
                      {teacher.bestFor}
                    </p>
                  </div>

                  {/* Top Playlists */}
                  {teacher.topPlaylists && (
                    <div>
                      <span className="font-bold text-[#0F172A] block mb-1.5 text-[11px]">
                        📚 أبرز السلاسل والقوائم الموصى بها:
                      </span>
                      <ul className="space-y-1">
                        {teacher.topPlaylists.map((pl, i) => (
                          <li key={i} className="text-[11px] text-[#475569] flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] shrink-0"></span>
                            <span className="truncate">{pl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>

              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                <span className="text-[11px] text-[#64748B]">
                  شروحات رسمية ومجانية 100%
                </span>

                <a
                  href={teacher.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#E11D48] hover:bg-[#be123c] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <HiPlay className="w-4 h-4" />
                  <span>فتح القناة على YouTube</span>
                  <HiExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Study Methodology Advice Box */}
        <div className="mt-12 bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#E11D48] flex items-center justify-center text-2xl shrink-0">
              💡
            </div>
            <div className="space-y-1.5 text-center sm:text-right">
              <h4 className="text-sm sm:text-base font-bold text-[#0F172A]">
                نصيحة ذهبية لـ BAC 2026/2027:
              </h4>
              <p className="text-xs text-[#475569] leading-relaxed">
                لا تشتت نفسك بين عشرات القنوات في نفس المادة! اختر أستاذاً واحداً تثق في أسلوبه (مثل الأستاذ نور الدين في الرياضيات، وزدون في الفيزياء، وقزيحي في العلوم، وعباشي في التسيير، وخليفي في التاريخ)، وتابع معه البرنامج من أول درس حتى المراجعة النهائية مع حل سلاسل التمارين بالورقة والقلم.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
