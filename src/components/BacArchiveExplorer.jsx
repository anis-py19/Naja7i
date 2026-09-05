import React, { useState, useMemo } from 'react';
import { 
  HiBookOpen, 
  HiDownload
} from 'react-icons/hi';
import { STREAMS } from '../data/streamsData';
import { BAC_YEARS } from '../data/bacData';

export default function BacArchiveExplorer() {
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedStream, setSelectedStream] = useState('all');

  const filteredYears = useMemo(() => {
    return selectedYear === 'all' 
      ? BAC_YEARS 
      : BAC_YEARS.filter(y => y.toString() === selectedYear);
  }, [selectedYear]);

  return (
    <section id="bac-archive" className="py-14 bg-white border-b border-[#E2E8F0] font-['Cairo']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-[#E2E8F0] pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] flex items-center gap-2">
              <HiBookOpen className="w-6 h-6 text-[#E11D48]" />
              <span>مواضيع وحلول شهادات البكالوريا السابقة (2008 — 2026)</span>
            </h2>
            <p className="text-xs text-[#64748B] mt-1">
              مواضيع وحلول شهادة البكالوريا الرسمية لجميع الشعب مع سلم التنقيط المعتمد من وزارة التربية الوطنية.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 mb-8 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
            
            {/* Filter by Year */}
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                تصفية حسب السنة:
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#E11D48] cursor-pointer"
              >
                <option value="all">جميع السنوات (2008 — 2026)</option>
                {BAC_YEARS.map(year => (
                  <option key={year} value={year}>بكالوريا دورة {year}</option>
                ))}
              </select>
            </div>

            {/* Filter by Stream */}
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                تصفية حسب الشعبة:
              </label>
              <select
                value={selectedStream}
                onChange={(e) => setSelectedStream(e.target.value)}
                className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#E11D48] cursor-pointer"
              >
                <option value="all">جميع الشعب</option>
                {STREAMS.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* BAC Exams Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredYears.map((year) => (
            <div
              key={year}
              className="bg-white border border-[#E2E8F0] hover:border-[#E11D48] rounded-2xl p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#F1F5F9] text-[#E11D48] border border-[#E2E8F0] font-bold text-xs font-mono">
                      BAC {year}
                    </span>
                    <h3 className="text-sm font-bold text-[#0F172A]">
                      مواضيع وحلول بكالوريا {year}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-[#475569] mb-4 leading-relaxed">
                  الموضوع الأول والموضوع الثاني لجميع المواد مع التصحيح النموذجي وسلم التنقيط.
                </p>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] flex items-center gap-2">
                <a
                  href={`https://www.ency-education.com/bac${year}.html`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 rounded-xl bg-[#F8FAFC] hover:bg-[#E11D48] text-[#0F172A] hover:text-white font-bold text-xs text-center border border-[#CBD5E1] hover:border-[#E11D48] transition-colors flex items-center justify-center gap-1.5"
                >
                  <HiDownload className="w-3.5 h-3.5" />
                  <span>تصفح وتحميل مواضيع {year}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
