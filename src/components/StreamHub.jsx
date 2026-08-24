import React, { useState, useEffect } from 'react';
import { 
  HiBookOpen, 
  HiArrowRight, 
  HiDownload,
  HiCheckCircle,
  HiSearch,
  HiTrendingUp
} from 'react-icons/hi';
import { STREAMS } from '../data/streamsData';
import { BAC_COEFFICIENTS, SUBJECT_RESOURCES } from '../data/bacData';

export default function StreamHub({ selectedStreamId, onSelectStream, onOpenSubject }) {
  const [activeStreamId, setActiveStreamId] = useState(selectedStreamId || 'sciences');
  const [filterQuery, setFilterQuery] = useState('');
  const [completedCount, setCompletedCount] = useState(0);
  const [totalUnitsCount, setTotalUnitsCount] = useState(0);

  // Sync with prop when parent updates selectedStreamId
  useEffect(() => {
    if (selectedStreamId && selectedStreamId !== activeStreamId) {
      setActiveStreamId(selectedStreamId);
    }
  }, [selectedStreamId]);

  const streamInfo = STREAMS.find(s => s.id === activeStreamId) || STREAMS[0];
  const streamData = BAC_COEFFICIENTS[activeStreamId] || BAC_COEFFICIENTS['sciences'];

  // Calculate user progress in this stream
  useEffect(() => {
    try {
      const saved = localStorage.getItem('naja7i_completed_units');
      const completed = saved ? JSON.parse(saved) : {};
      
      let total = 0;
      let done = 0;
      streamData.subjects.forEach(sub => {
        const subData = SUBJECT_RESOURCES[sub.id];
        if (subData && subData.units) {
          total += subData.units.length;
          subData.units.forEach(u => {
            if (completed[u.id]) done++;
          });
        }
      });

      setCompletedCount(done);
      setTotalUnitsCount(total || 1);
    } catch {
      setCompletedCount(0);
    }
  }, [activeStreamId, streamData]);

  const progressPercentage = Math.round((completedCount / (totalUnitsCount || 1)) * 100);

  const filteredSubjects = streamData.subjects.filter(s => 
    s.name.toLowerCase().includes(filterQuery.trim().toLowerCase())
  );

  const mainSubjects = filteredSubjects.filter(s => s.isMain);
  const secondarySubjects = filteredSubjects.filter(s => !s.isMain);

  return (
    <section id="stream-hub" className="py-12 bg-[#FFFAF3] border-b border-[#FFE5BF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Stream Selector Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#1c1917] font-['Cairo'] flex items-center gap-2">
              <span>فضاء المواد والدروس:</span>
              <span className="text-[#F62440] underline decoration-[#F62440]/40 decoration-2">{streamInfo.name}</span>
            </h2>
            <p className="text-xs text-[#78716c] mt-1">
              اختر المادة لتصفح ملخصات الدروس، سلاسل التمارين بالحل، وبكالوريات المادة السابقة.
            </p>
          </div>

          {/* Quick Stream Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {STREAMS.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveStreamId(s.id);
                  if (onSelectStream) onSelectStream(s.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  activeStreamId === s.id
                    ? 'bg-[#F62440] text-white shadow-xs'
                    : 'bg-white text-[#1c1917] hover:bg-[#FFF2DB] border border-[#FFE5BF]'
                }`}
              >
                <span>{s.icon} {s.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Stream Summary Box + Live Revision Progress */}
        <div className="bg-[#FFF2DB] rounded-xl border border-[#FFE5BF] p-5 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-white border border-[#FFE5BF] text-2xl flex items-center justify-center">
              {streamInfo.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#1c1917]">{streamInfo.name}</h3>
                <span className="text-xs text-[#78716c] font-sans">({streamInfo.frenchName})</span>
              </div>
              <p className="text-xs text-[#57534e] mt-0.5 max-w-xl">
                {streamInfo.description}
              </p>
            </div>
          </div>

          {/* Live Stream Revision Progress */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 border-t sm:border-t-0 sm:border-r border-[#FFE5BF] pt-3 sm:pt-0 sm:pr-6">
            <div className="text-center sm:text-right">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1c1917] mb-1">
                <HiTrendingUp className="w-4 h-4 text-[#F62440]" />
                <span>تقدم مراجعتك للشعبة:</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-28 sm:w-36 h-2 bg-white rounded-full overflow-hidden border border-[#FFE5BF]">
                  <div 
                    className="h-full bg-[#F62440] rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <span className="text-xs font-mono font-bold text-[#F62440]">{progressPercentage}%</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="bg-white border border-[#FFE5BF] px-2.5 py-1 rounded-lg text-[#1c1917] font-bold">
                {streamData.subjects.length} مواد
              </span>
              <span className="bg-white border border-[#FFE5BF] px-2.5 py-1 rounded-lg text-[#1c1917] font-bold font-mono">
                المعاملات: {streamData.subjects.reduce((sum, item) => sum + item.coef, 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Filter input */}
        <div className="mb-6 max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="تصفية المواد داخل هذه الشعبة..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full bg-white border border-[#FFE5BF] rounded-lg pl-3 pr-9 py-2 text-xs text-[#1c1917] placeholder-[#78716c] focus:outline-none focus:border-[#F62440]"
            />
            <HiSearch className="w-4 h-4 text-[#78716c] absolute right-3 top-2.5" />
          </div>
        </div>

        {/* 1. Main Subjects */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4 border-b border-[#FFE5BF] pb-2">
            <h3 className="text-sm font-bold text-[#1c1917] flex items-center gap-2">
              <span className="w-2 h-3.5 bg-[#F62440] rounded-xs"></span>
              <span>المواد الأساسية (المعاملات الكبرى):</span>
            </h3>
            <span className="text-xs text-[#78716c]">التركيز الأساسي لرفع المعدل</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mainSubjects.map((sub) => (
              <div
                key={sub.id}
                onClick={() => onOpenSubject(sub.id, streamInfo.name)}
                className="ency-card p-5 rounded-xl cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FFF2DB] border border-[#FFE5BF] text-xl flex items-center justify-center">
                      {sub.icon}
                    </div>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-[#FFF2DB] text-[#F62440] border border-[#FFE5BF] font-mono">
                      معامل {sub.coef}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-[#1c1917] group-hover:text-[#F62440] transition-colors mb-1">
                    {sub.name}
                  </h4>
                  <p className="text-xs text-[#57534e] mb-4 leading-relaxed line-clamp-2">
                    ملخصات الدروس، سلاسل التمارين بالحلول، مواضيع البكالوريا وشروحات اليوتيوب.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#FFE5BF] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#F62440] group-hover:underline">
                    فتح محتوى المادة
                  </span>
                  <div className="w-6 h-6 rounded-md bg-[#FFF2DB] group-hover:bg-[#F62440] group-hover:text-white text-[#57534e] flex items-center justify-center transition-colors">
                    <HiArrowRight className="w-3.5 h-3.5 rotate-180" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Secondary & Language Subjects */}
        <div>
          <div className="flex items-center justify-between mb-4 border-b border-[#FFE5BF] pb-2">
            <h3 className="text-sm font-bold text-[#1c1917] flex items-center gap-2">
              <span className="w-2 h-3.5 bg-[#78716c] rounded-xs"></span>
              <span>المواد الثانوية واللغات ومواد الحفظ:</span>
            </h3>
            <span className="text-xs text-[#78716c]">نقاط سهلة ومهمة لرفع المعدل العام</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {secondarySubjects.map((sub) => (
              <div
                key={sub.id}
                onClick={() => onOpenSubject(sub.id, streamInfo.name)}
                className="bg-white border border-[#FFE5BF] hover:border-[#F62440] rounded-xl p-3.5 transition-all cursor-pointer flex items-center justify-between shadow-2xs hover:shadow-xs group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{sub.icon}</span>
                  <div>
                    <h5 className="text-xs font-bold text-[#1c1917] group-hover:text-[#F62440] transition-colors">
                      {sub.name}
                    </h5>
                    <span className="text-[11px] text-[#78716c] font-mono">
                      معامل {sub.coef}
                    </span>
                  </div>
                </div>

                <div className="w-6 h-6 rounded bg-[#FFF2DB] group-hover:bg-[#F62440] group-hover:text-white text-[#57534e] flex items-center justify-center transition-colors">
                  <HiArrowRight className="w-3 h-3 rotate-180" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
