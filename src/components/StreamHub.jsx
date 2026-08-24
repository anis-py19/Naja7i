import React, { useState, useEffect } from 'react';
import { 
  HiBookOpen, 
  HiChevronLeft, 
  HiArrowRight, 
  HiSearch, 
  HiCheckCircle, 
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
    <section id="stream-hub" className="py-12 bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Stream Selector Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] font-['Cairo'] flex items-center gap-2">
              <span>فضاء المواد والدروس:</span>
              <span className="text-[#E11D48] underline decoration-[#E11D48]/30 decoration-2">{streamInfo.name}</span>
            </h2>
            <p className="text-xs text-[#64748B] mt-1">
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
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeStreamId === s.id
                    ? 'bg-[#E11D48] text-white shadow-2xs'
                    : 'bg-white text-[#0F172A] hover:bg-[#F1F5F9] border border-[#CBD5E1]'
                }`}
              >
                <span>{s.icon}</span>
                <span>{s.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Stream Summary Box + Live Revision Progress */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-3xl flex items-center justify-center shadow-2xs">
              {streamInfo.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#0F172A]">{streamInfo.name}</h3>
                <span className="text-xs text-[#64748B] font-sans">({streamInfo.frenchName})</span>
              </div>
              <p className="text-xs text-[#475569] mt-0.5 max-w-xl leading-relaxed">
                {streamInfo.description}
              </p>
            </div>
          </div>

          {/* Live Stream Revision Progress */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 border-t sm:border-t-0 sm:border-r border-[#E2E8F0] pt-4 sm:pt-0 sm:pr-6">
            <div className="text-center sm:text-right">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F172A] mb-1">
                <HiTrendingUp className="w-4 h-4 text-[#E11D48]" />
                <span>تقدم مراجعتك للشعبة:</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-28 sm:w-36 h-2 bg-[#F1F5F9] rounded-full overflow-hidden border border-[#E2E8F0]">
                  <div 
                    className="h-full bg-[#E11D48] rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <span className="text-xs font-mono font-bold text-[#E11D48]">{progressPercentage}%</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-1 rounded-lg text-[#0F172A] font-bold">
                {streamData.subjects.length} مواد
              </span>
              <span className="bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-1 rounded-lg text-[#0F172A] font-bold font-mono">
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
              className="w-full bg-white border border-[#CBD5E1] rounded-xl pl-3 pr-9 py-2.5 text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#E11D48]"
            />
            <HiSearch className="w-4 h-4 text-[#64748B] absolute right-3 top-3" />
          </div>
        </div>

        {/* 1. Main Subjects */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4 border-b border-[#E2E8F0] pb-2">
            <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-2 h-3.5 bg-[#E11D48] rounded-xs"></span>
              <span>المواد الأساسية (المعاملات الكبرى):</span>
            </h3>
            <span className="text-xs text-[#64748B]">التركيز الأساسي لرفع المعدل</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mainSubjects.map((sub) => (
              <div
                key={sub.id}
                onClick={() => onOpenSubject(sub.id, streamInfo.name)}
                className="ency-card p-5 rounded-2xl cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-11 h-11 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xl flex items-center justify-center">
                      {sub.icon}
                    </div>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#F1F5F9] text-[#E11D48] border border-[#E2E8F0] font-mono">
                      معامل {sub.coef}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-[#0F172A] group-hover:text-[#E11D48] transition-colors mb-1">
                    {sub.name}
                  </h4>
                  <p className="text-xs text-[#475569] mb-4 leading-relaxed line-clamp-2">
                    ملخصات الدروس، سلاسل التمارين بالحلول، مواضيع البكالوريا وشروحات اليوتيوب.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#E11D48] group-hover:underline">
                    فتح محتوى المادة
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-[#F8FAFC] group-hover:bg-[#E11D48] group-hover:text-white text-[#64748B] flex items-center justify-center transition-colors">
                    <HiArrowRight className="w-3.5 h-3.5 rotate-180" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Secondary & Language Subjects */}
        <div>
          <div className="flex items-center justify-between mb-4 border-b border-[#E2E8F0] pb-2">
            <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
              <span className="w-2 h-3.5 bg-[#64748B] rounded-xs"></span>
              <span>المواد الثانوية واللغات ومواد الحفظ:</span>
            </h3>
            <span className="text-xs text-[#64748B]">نقاط سهلة ومهمة لرفع المعدل العام</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {secondarySubjects.map((sub) => (
              <div
                key={sub.id}
                onClick={() => onOpenSubject(sub.id, streamInfo.name)}
                className="bg-white border border-[#E2E8F0] hover:border-[#E11D48] rounded-xl p-3.5 transition-all cursor-pointer flex items-center justify-between shadow-2xs hover:shadow-xs group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{sub.icon}</span>
                  <div>
                    <h5 className="text-xs font-bold text-[#0F172A] group-hover:text-[#E11D48] transition-colors">
                      {sub.name}
                    </h5>
                    <span className="text-[11px] text-[#64748B] font-mono">
                      معامل {sub.coef}
                    </span>
                  </div>
                </div>

                <div className="w-6 h-6 rounded bg-[#F8FAFC] group-hover:bg-[#E11D48] group-hover:text-white text-[#64748B] flex items-center justify-center transition-colors">
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
