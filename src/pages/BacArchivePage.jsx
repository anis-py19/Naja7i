import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiHome, 
  HiChevronLeft, 
  HiBookOpen, 
  HiDownload
} from 'react-icons/hi';
import { STREAMS } from '../data/streamsData';
import { BAC_YEARS } from '../data/bacData';

export default function BacArchivePage() {
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedStream, setSelectedStream] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredYears = useMemo(() => {
    return selectedYear === 'all' 
      ? BAC_YEARS 
      : BAC_YEARS.filter(y => y.toString() === selectedYear);
  }, [selectedYear]);

  const streamsToShow = useMemo(() => {
    return selectedStream === 'all'
      ? STREAMS
      : STREAMS.filter(s => s.id === selectedStream);
  }, [selectedStream]);

  const totalPages = Math.ceil(filteredYears.length / itemsPerPage);
  const displayedYears = filteredYears.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleStreamChange = (strId) => {
    setSelectedStream(strId);
    setCurrentPage(1);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setCurrentPage(1);
  };

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
            <span className="text-[#1c1917] font-bold">أرشيف مواضيع البكالوريا الرسمية</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded bg-[#F62440] text-white font-bold text-xs">
                  دليل البكالوريا (2008 — 2025)
                </span>
                <span className="text-xs text-[#78716c]">مواضيع رسمية وحلول وزارية نموذجية</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#1c1917]">
                مواضيع وحلول شهادة البكالوريا
              </h1>
              <p className="text-xs text-[#57534e] mt-1 max-w-xl">
                أرشيف منظم لجميع دورات البكالوريا السابقة مع سلم التنقيط المعتمد لجميع الشعب.
              </p>
            </div>

            <Link
              to="/"
              className="self-start md:self-auto px-4 py-2 rounded-xl bg-white hover:bg-[#FFE5BF] text-[#1c1917] text-xs font-bold border border-[#FFE5BF] transition-colors flex items-center gap-1.5"
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
        <div className="bg-white border border-[#FFE5BF] rounded-2xl p-4 mb-6 space-y-3">
          
          {/* Stream Selector Bar */}
          <div>
            <span className="block text-xs font-bold text-[#1c1917] mb-2">
              تصفية حسب الشعبة:
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <button
                onClick={() => handleStreamChange('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  selectedStream === 'all'
                    ? 'bg-[#F62440] text-white'
                    : 'bg-[#FFFAF3] text-[#1c1917] hover:bg-[#FFF2DB] border border-[#FFE5BF]'
                }`}
              >
                جميع الشعب
              </button>
              {STREAMS.map(s => (
                <button
                  key={s.id}
                  onClick={() => handleStreamChange(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                    selectedStream === s.id
                      ? 'bg-[#F62440] text-white'
                      : 'bg-[#FFFAF3] text-[#1c1917] hover:bg-[#FFF2DB] border border-[#FFE5BF]'
                  }`}
                >
                  <span>{s.icon} {s.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Year Selector */}
          <div className="pt-2 border-t border-[#FFE5BF] grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#1c1917] mb-1">
                تصفية حسب السنة:
              </label>
              <select
                value={selectedYear}
                onChange={(e) => handleYearChange(e.target.value)}
                className="w-full bg-[#FFFAF3] border border-[#FFE5BF] rounded-lg px-3 py-2 text-xs text-[#1c1917] focus:outline-none focus:border-[#F62440] cursor-pointer"
              >
                <option value="all">جميع دورات البكالوريا (2008 — 2025)</option>
                {BAC_YEARS.map(year => (
                  <option key={year} value={year}>بكالوريا دورة {year}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <span className="text-xs text-[#78716c]">
                ملاحظة: ننصح بالبدء بحل دورات السنوات الأخيرة لمواكبة المنهجيات المحدثة.
              </span>
            </div>
          </div>

        </div>

        {/* Years & Streams Archive List */}
        <div className="space-y-5">
          {displayedYears.map(year => (
            <div
              key={year}
              className="bg-white border border-[#FFE5BF] rounded-2xl p-5"
            >
              {/* Year Header */}
              <div className="flex items-center justify-between border-b border-[#FFE5BF] pb-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#FFF2DB] border border-[#FFE5BF] text-[#F62440] flex items-center justify-center font-bold text-sm font-mono">
                    {year}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#1c1917]">
                      مواضيع وحلول بكالوريا دورة جوان {year}
                    </h3>
                    <span className="text-[11px] text-[#78716c]">
                      كافة المواد والشعب المقررة
                    </span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded bg-[#FFFAF3] text-[#F62440] text-[11px] font-bold border border-[#FFE5BF]">
                  دورة جوان
                </span>
              </div>

              {/* Streams Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {streamsToShow.map(s => (
                  <div
                    key={s.id}
                    className="p-3 rounded-xl bg-[#FFFAF3] border border-[#FFE5BF] flex flex-col justify-between"
                  >
                    <div className="mb-2.5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#1c1917]">
                          {s.icon} {s.name}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white text-[#78716c] border border-[#FFE5BF]">
                          {s.subjectsCount} مواد
                        </span>
                      </div>
                      <p className="text-[11px] text-[#78716c]">
                        المواضيع مع الحل النموذجي الوزاري.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#FFE5BF]">
                      <a
                        href={`https://www.ency-education.net/bac${year}.html`}
                        target="_blank"
                        rel="noreferrer"
                        className="py-1.5 rounded-lg bg-white hover:bg-[#FFF2DB] text-[#1c1917] text-xs font-bold border border-[#FFE5BF] flex items-center justify-center gap-1 transition-colors"
                      >
                        <HiBookOpen className="w-3.5 h-3.5 text-[#F62440]" />
                        <span>الموضوع</span>
                      </a>
                      <a
                        href={`https://www.ency-education.net/bac${year}.html`}
                        target="_blank"
                        rel="noreferrer"
                        className="py-1.5 rounded-lg bg-[#F62440] hover:bg-[#d81b34] text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                      >
                        <HiDownload className="w-3.5 h-3.5" />
                        <span>التصحيح</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3.5 py-1.5 rounded-lg bg-white border border-[#FFE5BF] text-xs font-bold text-[#1c1917] hover:bg-[#FFF2DB] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              السابق
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  currentPage === page
                    ? 'bg-[#F62440] text-white'
                    : 'bg-white border border-[#FFE5BF] text-[#1c1917] hover:bg-[#FFF2DB]'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3.5 py-1.5 rounded-lg bg-white border border-[#FFE5BF] text-xs font-bold text-[#1c1917] hover:bg-[#FFF2DB] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              التالي
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
