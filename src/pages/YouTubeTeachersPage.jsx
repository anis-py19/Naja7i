import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiHome, 
  HiChevronLeft, 
  HiVideoCamera, 
  HiExternalLink, 
  HiPlay,
  HiCheckCircle,
  HiSearch
} from 'react-icons/hi';
import { TOP_CHANNELS } from '../data/bacData';
import { motion } from 'framer-motion';

export default function YouTubeTeachersPage() {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique subjects
  const availableSubjects = useMemo(() => {
    return Array.from(new Set(TOP_CHANNELS.map(c => c.subject)));
  }, []);

  const filteredChannels = useMemo(() => {
    return TOP_CHANNELS.filter(c => {
      if (selectedSubject !== 'all' && c.subject !== selectedSubject) {
        return false;
      }
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.trim().toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.subject.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedSubject, searchQuery]);

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
            <span className="text-[#1c1917] font-bold">دليل أساتذة وقنوات اليوتيوب</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-md bg-[#F62440] text-white font-bold text-xs shadow-2xs">
                  دليل النخبة 🇩🇿
                </span>
                <span className="text-xs text-[#78716c]">أفضل الشروحات وسلاسل المراجعة الموثوقة</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#1c1917]">
                دليل أساتذة وقنوات اليوتيوب التعليمية 🎥
              </h1>
              <p className="text-xs text-[#57534e] mt-1 max-w-xl">
                قائمة مختارة بعناية لأفضل الأساتذة الموثوقين في الجزائر لمتابعة الدروس وحل المسائل خطوة بخطوة.
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
        
        {/* Filter Box */}
        <div className="bg-white border border-[#FFE5BF] rounded-2xl p-5 mb-8 shadow-xs space-y-4">
          
          {/* Subject Pills */}
          <div>
            <label className="block text-xs font-bold text-[#1c1917] mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F62440]"></span>
              <span>1. تصفية حسب المادة التعليمية:</span>
            </label>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <button
                onClick={() => setSelectedSubject('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  selectedSubject === 'all'
                    ? 'bg-[#F62440] text-white shadow-xs'
                    : 'bg-[#FFFAF3] text-[#1c1917] hover:bg-[#FFF2DB] border border-[#FFE5BF]'
                }`}
              >
                جميع المواد
              </button>
              {availableSubjects.map(sub => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                    selectedSubject === sub
                      ? 'bg-[#F62440] text-white shadow-xs'
                      : 'bg-[#FFFAF3] text-[#1c1917] hover:bg-[#FFF2DB] border border-[#FFE5BF]'
                  }`}
                >
                  <span>{sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search Box */}
          <div className="pt-2 border-t border-[#FFE5BF]">
            <div className="relative">
              <HiSearch className="w-4 h-4 text-[#78716c] absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ابحث باسم الأستاذ، القناة، أو المادة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FFFAF3] border border-[#FFE5BF] rounded-xl pr-9 pl-4 py-2 text-xs text-[#1c1917] focus:outline-none focus:border-[#F62440] placeholder-[#a8a29e]"
              />
            </div>
          </div>

        </div>

        {/* Teachers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredChannels.map((channel, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white border border-[#FFE5BF] hover:border-[#F62440] rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFF2DB] border border-[#FFE5BF] text-[#F62440] flex items-center justify-center text-2xl shadow-2xs">
                      {channel.icon}
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-[#1c1917] flex items-center gap-1">
                        <span>{channel.name}</span>
                      </h3>
                      <span className="text-xs text-[#F62440] font-semibold block">
                        مادة {channel.subject}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#FFF2DB] text-[#57534e] border border-[#FFE5BF]">
                    {channel.subscribers}
                  </span>
                </div>

                <p className="text-xs text-[#57534e] leading-relaxed mb-5 bg-[#FFFAF3] p-3 rounded-xl border border-[#FFE5BF]/60">
                  {channel.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#FFE5BF] flex items-center justify-between">
                <span className="text-[11px] text-[#78716c]">
                  شروحات رسمية مجانية
                </span>

                <a
                  href={channel.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-[#F62440] hover:bg-[#d81b34] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
                >
                  <HiPlay className="w-3.5 h-3.5" />
                  <span>زيارة القناة</span>
                  <HiExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Study Advice Box */}
        <div className="mt-12 bg-[#FFF2DB] border border-[#FFE5BF] rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#FFE5BF] text-[#F62440] flex items-center justify-center text-2xl shrink-0 shadow-2xs">
              💡
            </div>
            <div className="space-y-1 text-center sm:text-right">
              <h4 className="text-sm sm:text-base font-bold text-[#1c1917]">
                نصيحة ذهبية لمتابعة شروحات اليوتيوب بفاعلية:
              </h4>
              <p className="text-xs text-[#57534e] leading-relaxed">
                لا تكتفِ بالمشاهدة السلبية للفيديو؛ أحضر كراسك وقلمك وحاول حل التمرين بنفسك قبل أن يكشف الأستاذ عن الحل في الفيديو، فهذه هي الطريقة الوحيدة لتثبيت الأفكار الرياضية والفيزيائية.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
