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
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pb-16 font-['Cairo']">
      
      {/* Top Banner & Breadcrumb */}
      <div className="bg-white border-b border-[#E2E8F0] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#64748B] mb-3">
            <Link to="/" className="hover:text-[#E11D48] flex items-center gap-1 transition-colors">
              <HiHome className="w-4 h-4" />
              <span>الرئيسية</span>
            </Link>
            <span>/</span>
            <span className="text-[#0F172A] font-bold">أرشيف مواضيع البكالوريا الرسمية</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-[#F1F5F9] text-[#E11D48] font-bold text-xs font-mono border border-[#E2E8F0]">
                  2008 — 2025
                </span>
                <span className="text-xs text-[#64748B]">مواضيع وحلول نموذجية معتمدة من وزارة التربية الوطنية</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
                أرشيف شهادة البكالوريا الجزائرية 📄
              </h1>
              <p className="text-xs text-[#475569] mt-1 max-w-xl">
                تصفح وحمل جميع مواضيع وحلول البكالوريا الرسمية لجميع الشعب مع سلم التنقيط الوزاري المفصل.
              </p>
            </div>

            <Link
              to="/"
              className="self-start md:self-auto px-4 py-2 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0F172A] text-xs font-bold border border-[#CBD5E1] transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <span>العودة للرئيسية</span>
              <HiChevronLeft className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        
        {/* Filters */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-4">
          
          {/* Stream Selector */}
          <div>
            <span className="block text-xs font-bold text-[#0F172A] mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E11D48]"></span>
              <span>1. اختر الشعبة:</span>
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <button
                onClick={() => handleStreamChange('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  selectedStream === 'all'
                    ? 'bg-[#E11D48] text-white shadow-2xs'
                    : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                }`}
              >
                جميع الشعب
              </button>
              {STREAMS.map(s => (
                <button
                  key={s.id}
                  onClick={() => handleStreamChange(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
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

          {/* Year Selector */}
          <div className="pt-2 border-t border-[#E2E8F0]">
            <span className="block text-xs font-bold text-[#0F172A] mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#475569]"></span>
              <span>2. اختر السنة (دورة الامتحان):</span>
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <button
                onClick={() => handleYearChange('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  selectedYear === 'all'
                    ? 'bg-[#0F172A] text-white'
                    : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                }`}
              >
                جميع الدورات (2008—2025)
              </button>
              {BAC_YEARS.map(y => (
                <button
                  key={y}
                  onClick={() => handleYearChange(y.toString())}
                  className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition-colors whitespace-nowrap cursor-pointer ${
                    selectedYear === y.toString()
                      ? 'bg-[#0F172A] text-white'
                      : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Years Grid */}
        <div className="space-y-6">
          {displayedYears.map((year) => (
            <div key={year} className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-4">
              
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-base">📅</span>
                  <h3 className="text-base font-bold text-[#0F172A] font-mono">
                    بكالوريا دورة جوان {year}
                  </h3>
                </div>
                <span className="text-xs text-[#64748B] font-mono">
                  {streamsToShow.length} شعب معتمدة
                </span>
              </div>

              {/* Streams Box for this year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {streamsToShow.map((stream) => (
                  <div 
                    key={stream.id}
                    className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#E11D48] transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{stream.icon}</span>
                      <div>
                        <span className="text-xs font-bold text-[#0F172A] group-hover:text-[#E11D48] transition-colors block">
                          {stream.name}
                        </span>
                        <span className="text-[10px] text-[#64748B]">
                          مواضيع + حلول نموذجية
                        </span>
                      </div>
                    </div>

                    <a
                      href={`https://www.ency-education.net/bac-${stream.id}.html`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-white group-hover:bg-[#E11D48] group-hover:text-white text-[#0F172A] text-[11px] font-bold border border-[#E2E8F0] flex items-center gap-1 transition-colors"
                    >
                      <HiDownload className="w-3 h-3" />
                      <span>تحميل</span>
                    </a>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 pt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                onClick={() => setCurrentPage(pg)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  currentPage === pg
                    ? 'bg-[#E11D48] text-white shadow-2xs'
                    : 'bg-white text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                }`}
              >
                {pg}
              </button>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
