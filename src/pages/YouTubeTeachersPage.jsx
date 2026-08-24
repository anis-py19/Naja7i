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
  HiSparkles,
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
        <span className="px-2 py-0.5 rounded bg-amber-500 text-white text-[11px] font-bold flex items-center gap-1 shadow-2xs">
          <span>🥇</span>
          <span>المركز الأول</span>
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="px-2 py-0.5 rounded bg-slate-400 text-white text-[11px] font-bold flex items-center gap-1 shadow-2xs">
          <span>🥈</span>
          <span>المركز الثاني</span>
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="px-2 py-0.5 rounded bg-amber-700 text-white text-[11px] font-bold flex items-center gap-1 shadow-2xs">
          <span>🥉</span>
          <span>المركز الثالث</span>
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded bg-[#FFF2DB] text-[#57534e] text-[11px] font-bold border border-[#FFE5BF]">
        ⭐ موصى به
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#FFFAF3] text-[#1c1917] pb-20 font-['Cairo']">
      
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
            <span className="text-[#1c1917] font-bold">دليل أساتذة وقنوات اليوتيوب</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded bg-[#F62440] text-white font-bold text-xs font-mono">
                  BAC 2026 / 2027 — الدليل الكامل 🇩🇿
                </span>
                <span className="text-xs text-[#78716c]">إحصائيات DzExams وترتيب أفضل كفاءات التدريس في الجزائر</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#1c1917]">
                دليل أفضل قنوات وأساتذة البكالوريا على اليوتيوب 🎥
              </h1>
              <p className="text-xs text-[#57534e] mt-1 max-w-2xl leading-relaxed">
                قائمة مفصلة ومصنفة (🥇 الأول 🥈 الثاني 🥉 الثالث) لجميع الشعب لمساعدتك على اختيار المصادر الثابتة لرحلة تفوقك.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                onClick={() => setShowSummaryTable(!showSummaryTable)}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#FFE5BF] text-[#1c1917] text-xs font-bold border border-[#FFE5BF] transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <HiTable className="w-4 h-4 text-[#F62440]" />
                <span>{showSummaryTable ? 'إخفاء جدول الخلاصة' : 'عرض جدول الخلاصة السريعة'}</span>
              </button>

              <Link
                to="/"
                className="px-4 py-2 rounded-xl bg-white hover:bg-[#FFE5BF] text-[#1c1917] text-xs font-bold border border-[#FFE5BF] transition-colors flex items-center gap-1.5 shadow-2xs"
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
          <div className="bg-white border-2 border-[#FFE5BF] rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#FFE5BF] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">🏆</span>
                <h3 className="text-sm sm:text-base font-bold text-[#1c1917]">
                  الخلاصة السريعة — أفضل 3 أساتذة في كل مادة لـ BAC 2026/2027
                </h3>
              </div>
              <span className="text-[11px] text-[#78716c]">إحصائيات موثقة</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-[#FFF2DB] text-[#1c1917] font-bold border-b border-[#FFE5BF]">
                    <th className="p-2.5 rounded-r-lg">المادة</th>
                    <th className="p-2.5">🥇 المركز الأول</th>
                    <th className="p-2.5">🥈 المركز الثاني</th>
                    <th className="p-2.5 rounded-l-lg">🥉 المركز الثالث</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#FFE5BF]/60">
                  {CORE_SUMMARY_TABLE.map((row, i) => (
                    <tr key={i} className="hover:bg-[#FFFAF3] transition-colors">
                      <td className="p-2.5 font-bold text-[#1c1917]">{row.subject}</td>
                      <td className="p-2.5 text-[#1c1917] font-semibold flex items-center gap-1">
                        <span className="text-amber-500 font-bold">🥇</span>
                        <span>{row.gold}</span>
                      </td>
                      <td className="p-2.5 text-[#57534e]">
                        <span className="text-slate-400 font-bold ml-1">🥈</span>
                        <span>{row.silver}</span>
                      </td>
                      <td className="p-2.5 text-[#78716c]">
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
        <div className="bg-white border border-[#FFE5BF] rounded-2xl p-5 shadow-xs space-y-4">
          
          {/* 1. Stream Selector Pills */}
          <div>
            <span className="block text-xs font-bold text-[#1c1917] mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F62440]"></span>
              <span>1. اختر الشعبة الدراسية:</span>
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {YOUTUBE_STREAMS.map(s => (
                <button
                  key={s.id}
                  onClick={() => handleStreamChange(s.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    selectedStream === s.id
                      ? 'bg-[#F62440] text-white shadow-2xs'
                      : 'bg-[#FFFAF3] text-[#1c1917] hover:bg-[#FFF2DB] border border-[#FFE5BF]'
                  }`}
                >
                  <span>{s.icon}</span>
                  <span>{s.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Subject Selector Pills (Filtered strictly to the selected stream) */}
          <div className="pt-2 border-t border-[#FFE5BF]">
            <span className="block text-xs font-bold text-[#1c1917] mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#57534e]"></span>
              <span>2. مواد شعبة {YOUTUBE_STREAMS.find(s => s.id === selectedStream)?.name || 'البكالوريا'}:</span>
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {availableSubjects.map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubject(sub.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                    selectedSubject === sub.id
                      ? 'bg-[#1c1917] text-white'
                      : 'bg-[#FFFAF3] text-[#57534e] hover:bg-[#FFF2DB] border border-[#FFE5BF]'
                  }`}
                >
                  <span>{sub.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Search Box */}
          <div className="pt-2 border-t border-[#FFE5BF]">
            <div className="relative">
              <HiSearch className="w-4 h-4 text-[#78716c] absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ابحث باسم الأستاذ، المادة، أو الوحدة (مثال: نور الدين، زدون، قزيحي، عباشي، خليفي، حيقون، Sally...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FFFAF3] border border-[#FFE5BF] rounded-xl pr-9 pl-4 py-2.5 text-xs text-[#1c1917] focus:outline-none focus:border-[#F62440] placeholder-[#a8a29e]"
              />
            </div>
          </div>

        </div>

        {/* Results Metrics Header */}
        <div className="flex items-center justify-between text-xs text-[#57534e] px-1">
          <span>
            تم العثور على <strong className="text-[#F62440] font-bold">{filteredTeachers.length}</strong> أستاذ معتمد ومصنف
          </span>
          <span className="text-[#78716c]">
            💡 جميع الروابط تنقلك مباشرة إلى قوائم التشغيل الرسمية على يوتيوب
          </span>
        </div>

        {/* Teachers Detailed Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white border-2 border-[#FFE5BF] hover:border-[#F62440] rounded-2xl p-6 transition-all flex flex-col justify-between shadow-xs space-y-5"
            >
              <div>
                
                {/* Header: Avatar, Name, Subject, Stats */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#FFE5BF]">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-[#FFF2DB] border border-[#FFE5BF] text-[#F62440] flex items-center justify-center text-2xl shrink-0">
                      {teacher.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-[#1c1917]">
                          {teacher.name}
                        </h3>
                        {getRankBadge(teacher.rank)}
                      </div>
                      <span className="text-xs font-bold text-[#F62440] block mt-0.5">
                        مادة {teacher.subject}
                      </span>
                    </div>
                  </div>

                  <div className="text-left shrink-0 space-y-1">
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500 justify-end">
                      <HiStar className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span>{teacher.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#FFF2DB] text-[#1c1917] border border-[#FFE5BF] block">
                      {teacher.subscribers}
                    </span>
                  </div>
                </div>

                {/* DzExams Metric Tag */}
                {teacher.statsDz && (
                  <div className="mt-3 px-3 py-1.5 rounded-lg bg-[#FFFAF3] border border-[#FFE5BF] text-[11px] text-[#57534e] flex items-center gap-1.5 font-medium">
                    <span className="text-[#F62440] font-bold">📊 قاعدة DzExams:</span>
                    <span>{teacher.statsDz}</span>
                  </div>
                )}

                {/* Pedagogy Analysis (أسلوب الشرح وطريقة التدريس) */}
                <div className="pt-3 space-y-3 text-xs">
                  <div>
                    <span className="font-bold text-[#1c1917] block mb-1 text-[11px]">
                      🔍 أسلوب الشرح والمنهجية:
                    </span>
                    <p className="text-[#57534e] leading-relaxed bg-[#FFFAF3] p-3 rounded-xl border border-[#FFE5BF]">
                      {teacher.pedagogy}
                    </p>
                  </div>

                  {/* Best For */}
                  <div>
                    <span className="font-bold text-[#1c1917] block mb-1 text-[11px]">
                      🎯 الأفضل لمراجعة:
                    </span>
                    <p className="text-[#1c1917] font-semibold text-[11px] bg-[#FFF2DB]/60 px-3 py-1.5 rounded-lg border border-[#FFE5BF]">
                      {teacher.bestFor}
                    </p>
                  </div>

                  {/* Top Playlists */}
                  {teacher.topPlaylists && (
                    <div>
                      <span className="font-bold text-[#1c1917] block mb-1.5 text-[11px]">
                        📚 أبرز السلاسل والقوائم الموصى بها:
                      </span>
                      <ul className="space-y-1">
                        {teacher.topPlaylists.map((pl, i) => (
                          <li key={i} className="text-[11px] text-[#57534e] flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F62440] shrink-0"></span>
                            <span className="truncate">{pl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>

              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#FFE5BF] flex items-center justify-between">
                <span className="text-[11px] text-[#78716c]">
                  شروحات رسمية ومجانية 100%
                </span>

                <a
                  href={teacher.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#F62440] hover:bg-[#d81b34] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
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
        <div className="mt-12 bg-[#FFF2DB] border border-[#FFE5BF] rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white border border-[#FFE5BF] text-[#F62440] flex items-center justify-center text-2xl shrink-0">
              💡
            </div>
            <div className="space-y-1.5 text-center sm:text-right">
              <h4 className="text-sm sm:text-base font-bold text-[#1c1917]">
                نصيحة ذهبية لـ BAC 2026/2027:
              </h4>
              <p className="text-xs text-[#57534e] leading-relaxed">
                لا تشتت نفسك بين عشرات القنوات في نفس المادة! اختر أستاذاً واحداً تثق في أسلوبه (مثل الأستاذ نور الدين في الرياضيات، وزدون في الفيزياء، وقزيحي في العلوم، وعباشي في التسيير، وخليفي في التاريخ)، وتابع معه البرنامج من أول درس حتى المراجعة النهائية مع حل سلاسل التمارين بالورقة والقلم.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
