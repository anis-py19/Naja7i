import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiHome, 
  HiChevronLeft, 
  HiDownload, 
  HiEye, 
  HiSearch, 
  HiDocumentText, 
  HiCheckCircle, 
  HiSparkles,
  HiExternalLink,
  HiOutlineBookOpen,
  HiClock,
  HiAcademicCap
} from 'react-icons/hi';
import { BAC_FULL_ARCHIVE } from '../data/bacArchiveFullData';
import PdfReaderModal from '../components/PdfReaderModal';

const STREAMS_LIST = [
  { id: 'all', name: 'جميع الشعب', icon: '🎓' },
  { id: 'sciences', name: 'علوم تجريبية', icon: '🧬' },
  { id: 'mathematics', name: 'رياضيات', icon: '📐' },
  { id: 'technical-mathematics', name: 'تقني رياضي', icon: '⚙️' },
  { id: 'management-economics', name: 'تسيير واقتصاد', icon: '📊' },
  { id: 'literature-philosophy', name: 'آداب وفلسفة', icon: '📖' },
  { id: 'foreign-languages', name: 'لغات أجنبية', icon: '🌍' }
];

const ALL_YEARS = [
  'all',
  2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 
  2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008
];

export default function BacArchivePage() {
  const [selectedStream, setSelectedStream] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyMainSubjects, setOnlyMainSubjects] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // PDF Preview State
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);

  // Filtered Archive Data
  const filteredItems = useMemo(() => {
    return BAC_FULL_ARCHIVE.filter(item => {
      // Stream filter
      if (selectedStream !== 'all' && item.streamId !== selectedStream) return false;
      
      // Year filter
      if (selectedYear !== 'all' && item.year.toString() !== selectedYear.toString()) return false;

      // Main subjects filter
      if (onlyMainSubjects && !item.isMain) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchTitle = item.sujetTitle?.toLowerCase().includes(q) || false;
        const matchSubject = item.subjectName?.toLowerCase().includes(q) || false;
        const matchStream = item.streamName?.toLowerCase().includes(q) || false;
        const matchYear = item.year?.toString().includes(q) || false;
        if (!matchTitle && !matchSubject && !matchStream && !matchYear) return false;
      }

      return true;
    });
  }, [selectedStream, selectedYear, searchQuery, onlyMainSubjects]);

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage]);

  const handleOpenPdf = (title, url, size) => {
    if (!url) return;
    setSelectedPdf({
      title,
      url,
      rawFileName: title.replace(/[\s—()]+/g, '_') + '.pdf',
      sizeReadable: size ? `${(size / (1024 * 1024)).toFixed(2)} MB` : ''
    });
    setPdfModalOpen(true);
  };

  const handleStreamChange = (strId) => {
    setSelectedStream(strId);
    setCurrentPage(1);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setCurrentPage(1);
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    if (bytes < 1024 * 1024) {
      return `${Math.round(bytes / 1024)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const is2026Selected = selectedYear.toString() === '2026';

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pb-16 font-['Cairo']" dir="rtl">
      
      {/* Top Banner & Header */}
      <div className="bg-white border-b border-[#E2E8F0] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#64748B] mb-3">
            <Link to="/" className="hover:text-[#E11D48] flex items-center gap-1 transition-colors">
              <HiHome className="w-4 h-4" />
              <span>الرئيسية</span>
            </Link>
            <span>/</span>
            <span className="text-[#0F172A] font-bold">أرشيف مواضيع وحلول البكالوريا الرسمية</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-xs font-mono border border-slate-200/60">
                  2008 — 2025 (منجز) + 2026 (قادم ⏳)
                </span>
                <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 font-medium text-xs border border-rose-200/60">
                  تغطية شاملة للشعب الست 🇩🇿
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-medium text-xs border border-emerald-200/60">
                  معاينة مباشرة + تحميل أوفلاين
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
                أرشيف مواضيع وحلول شهادة البكالوريا 📄
              </h1>
              <p className="text-xs sm:text-sm text-[#475569] mt-1 max-w-2xl leading-relaxed">
                بنك شامل ومنظم لمواضيع البكالوريا الرسمية والتصحيحات النموذجية وسلالم التنقيط الوزارية المعتمدة من وزارة التربية الوطنية مع التحميل المباشر والمعاينة الفورية.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="px-4 py-2 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0F172A] text-xs font-bold border border-[#CBD5E1] transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <span>العودة للرئيسية</span>
                <HiChevronLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
        
        {/* Upcoming 2026 Informational Banner (when 2026 selected) */}
        {is2026Selected && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center text-xl shrink-0">
                ⏳
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-amber-900 font-mono">
                    دورة جوان 2026 (الدورة القادمة)
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-medium border border-amber-300/50">
                    ما زالت قادمة
                  </span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed max-w-2xl">
                  امتحانات بكالوريا 2026 ما زالت لم تُجرَ بعد. تم إدراج وتجهيز كامل هيكلة المواد والشعب، وستُضاف المواضيع الرسمية والتصحيحات النموذجية فور اجتياز الدورة إن شاء الله! يمكنك الآن التدرب والتحضير عبر مواضيع السنوات السابقة (2008—2025).
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                to="/library"
                className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors shadow-2xs flex items-center gap-1.5"
              >
                <HiAcademicCap className="w-4 h-4" />
                <span>ملخصات وتمارين التحضير</span>
              </Link>
            </div>
          </div>
        )}

        {/* Filters Panel */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-4">
          
          {/* Stream Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#E11D48]"></span>
                <span>1. اختر الشعبة:</span>
              </span>
              <span className="text-[11px] text-[#64748B]">
                {selectedStream === 'all' ? 'عرض جميع الشعب الست' : STREAMS_LIST.find(s => s.id === selectedStream)?.name}
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              {STREAMS_LIST.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleStreamChange(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
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
          <div className="pt-3 border-t border-[#E2E8F0]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#475569]"></span>
                <span>2. اختر السنة (دورة الامتحان):</span>
              </span>
              <span className="text-[11px] text-[#64748B]">
                {selectedYear === 'all' ? 'جميع الدورات' : (selectedYear.toString() === '2026' ? 'دورة 2026 (القادمة ⏳)' : `دورة جوان ${selectedYear}`)}
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              {ALL_YEARS.map((year) => {
                const is2026 = year === 2026;
                const isSelected = selectedYear.toString() === year.toString();
                return (
                  <button
                    key={year}
                    onClick={() => handleYearChange(year.toString())}
                    className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                      isSelected
                        ? (is2026 ? 'bg-amber-600 text-white shadow-2xs' : 'bg-[#0F172A] text-white shadow-2xs')
                        : (is2026 ? 'bg-amber-50 text-amber-800 border border-amber-200/80 hover:bg-amber-100' : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#F1F5F9] border border-[#E2E8F0]')
                    }`}
                  >
                    <span>{year === 'all' ? 'جميع السنوات' : year}</span>
                    {is2026 && <span className="text-[10px]">⏳</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Bar & Options */}
          <div className="pt-3 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <HiSearch className="w-4 h-4 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="ابحث عن مادة (رياضيات، فيزياء، فلسفة...) أو موضوع..."
                className="w-full pl-3 pr-9 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#E11D48] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-[#64748B] hover:text-[#0F172A]"
                >
                  مسح
                </button>
              )}
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-xs font-medium text-[#475569] cursor-pointer select-none bg-[#F8FAFC] px-3 py-2 rounded-xl border border-[#E2E8F0] hover:bg-[#F1F5F9]">
                <input
                  type="checkbox"
                  checked={onlyMainSubjects}
                  onChange={(e) => {
                    setOnlyMainSubjects(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="w-3.5 h-3.5 accent-[#E11D48] rounded cursor-pointer"
                />
                <span>المواد الأساسية فقط (المعامل ≥ 5)</span>
              </label>

              <span className="text-xs text-[#64748B] font-mono px-2">
                النتائج: <strong className="text-[#0F172A]">{filteredItems.length}</strong> موضوع
              </span>
            </div>

          </div>

        </div>

        {/* Results Grid */}
        {paginatedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedItems.map((item) => (
              <div 
                key={item.id}
                className="bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-2xl p-5 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between group"
              >
                {/* Card Top */}
                <div className="space-y-3">
                  
                  {/* Badges Bar */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <span className={`px-2 py-0.5 rounded-md font-medium text-[11px] border font-mono ${
                        item.isUpcoming
                          ? 'bg-amber-50 text-amber-800 border-amber-200/80'
                          : 'bg-slate-100 text-slate-700 border-slate-200/60'
                      }`}>
                        {item.year} {item.isUpcoming && '⏳'}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-[11px] border border-slate-200/60 flex items-center gap-1">
                        <span>{item.streamIcon}</span>
                        <span>{item.streamName}</span>
                      </span>
                    </div>

                    <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 font-medium text-[11px] border border-rose-200/60 font-mono">
                      معامل {item.coef}
                    </span>
                  </div>

                  {/* Title & Subject */}
                  <div>
                    <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#E11D48] transition-colors leading-snug">
                      مادة {item.subjectName}
                    </h3>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      {item.session} — {item.streamFrench || item.streamName}
                    </p>
                  </div>

                </div>

                {/* Card Actions */}
                <div className="mt-4 pt-3 border-t border-[#F1F5F9] space-y-2">
                  
                  {item.isUpcoming ? (
                    <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/50 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-xs text-amber-800 font-medium">
                        <HiClock className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>ستُنشر فور إجراء الدورة إن شاء الله</span>
                      </div>
                      <Link
                        to="/library"
                        className="px-2.5 py-1 rounded-lg bg-white text-amber-900 hover:bg-amber-600 hover:text-white text-[11px] font-bold border border-amber-200 transition-colors shrink-0"
                      >
                        التحضير الآن
                      </Link>
                    </div>
                  ) : (
                    <>
                      {/* Topic Row */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F172A]">
                          <HiDocumentText className="w-4 h-4 text-[#0284C7]" />
                          <span>الموضوع الرسمي:</span>
                          {item.sujetSize && (
                            <span className="text-[10px] text-[#64748B] font-mono font-normal">
                              ({formatFileSize(item.sujetSize)})
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5">
                          {item.sujetUrl ? (
                            <>
                              <button
                                onClick={() => handleOpenPdf(item.sujetTitle, item.sujetUrl, item.sujetSize)}
                                className="px-2.5 py-1 rounded-lg bg-[#F8FAFC] hover:bg-[#0284C7] text-[#0F172A] hover:text-white text-[11px] font-bold border border-[#E2E8F0] transition-colors flex items-center gap-1 cursor-pointer"
                                title="معاينة الموضوع داخل التطبيق"
                              >
                                <HiEye className="w-3.5 h-3.5" />
                                <span>معاينة</span>
                              </button>
                              <a
                                href={item.sujetUrl}
                                download
                                className="px-2.5 py-1 rounded-lg bg-[#F8FAFC] hover:bg-[#0F172A] text-[#0F172A] hover:text-white text-[11px] font-bold border border-[#E2E8F0] transition-colors flex items-center gap-1"
                                title="تحميل الموضوع بصيغة PDF"
                              >
                                <HiDownload className="w-3.5 h-3.5" />
                                <span>تحميل</span>
                              </a>
                            </>
                          ) : item.eddirasaUrl ? (
                            <a
                              href={item.eddirasaUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-1 rounded-lg bg-[#F8FAFC] hover:bg-[#0F172A] text-[#475569] hover:text-white text-[11px] font-medium border border-[#E2E8F0] transition-colors flex items-center gap-1"
                            >
                              <HiExternalLink className="w-3.5 h-3.5" />
                              <span>المصدر</span>
                            </a>
                          ) : (
                            <span className="text-[10px] text-[#94A3B8]">قريباً</span>
                          )}
                        </div>
                      </div>

                      {/* Correction Row */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F172A]">
                          <HiCheckCircle className="w-4 h-4 text-[#16A34A]" />
                          <span>التصحيح النموذجي:</span>
                          {item.corrigeSize && (
                            <span className="text-[10px] text-[#64748B] font-mono font-normal">
                              ({formatFileSize(item.corrigeSize)})
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5">
                          {item.corrigeUrl ? (
                            <>
                              <button
                                onClick={() => handleOpenPdf(item.corrigeTitle, item.corrigeUrl, item.corrigeSize)}
                                className="px-2.5 py-1 rounded-lg bg-[#F8FAFC] hover:bg-[#16A34A] text-[#0F172A] hover:text-white text-[11px] font-bold border border-[#E2E8F0] transition-colors flex items-center gap-1 cursor-pointer"
                                title="معاينة التصحيح النموذجي داخل التطبيق"
                              >
                                <HiEye className="w-3.5 h-3.5" />
                                <span>معاينة</span>
                              </button>
                              <a
                                href={item.corrigeUrl}
                                download
                                className="px-2.5 py-1 rounded-lg bg-[#F8FAFC] hover:bg-[#0F172A] text-[#0F172A] hover:text-white text-[11px] font-bold border border-[#E2E8F0] transition-colors flex items-center gap-1"
                                title="تحميل التصحيح النموذجي بصيغة PDF"
                              >
                                <HiDownload className="w-3.5 h-3.5" />
                                <span>تحميل</span>
                              </a>
                            </>
                          ) : item.eddirasaUrl ? (
                            <a
                              href={item.eddirasaUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-1 rounded-lg bg-[#F8FAFC] hover:bg-[#0F172A] text-[#475569] hover:text-white text-[11px] font-medium border border-[#E2E8F0] transition-colors flex items-center gap-1"
                            >
                              <HiExternalLink className="w-3.5 h-3.5" />
                              <span>المصدر</span>
                            </a>
                          ) : (
                            <span className="text-[10px] text-[#94A3B8]">قريباً</span>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-12 text-center shadow-xs">
            <HiOutlineBookOpen className="w-12 h-12 text-[#94A3B8] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#0F172A]">لا توجد مواضيع مطابقة لبحثك</h3>
            <p className="text-xs text-[#64748B] mt-1">
              جرب تغيير الشعبة، السنة، أو تصفير كلمة البحث للعثور على النتائج المطلوبة.
            </p>
            <button
              onClick={() => {
                setSelectedStream('all');
                setSelectedYear('all');
                setSearchQuery('');
                setOnlyMainSubjects(false);
                setCurrentPage(1);
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#E11D48] text-white text-xs font-bold cursor-pointer hover:bg-[#BE123C] transition-colors"
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 pt-4">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F1F5F9] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              السابق
            </button>

            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              let pg;
              if (totalPages <= 7) {
                pg = i + 1;
              } else if (currentPage <= 4) {
                pg = i + 1;
              } else if (currentPage >= totalPages - 3) {
                pg = totalPages - 6 + i;
              } else {
                pg = currentPage - 3 + i;
              }

              return (
                <button
                  key={pg}
                  onClick={() => setCurrentPage(pg)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold font-mono transition-colors cursor-pointer ${
                    currentPage === pg
                      ? 'bg-[#E11D48] text-white shadow-2xs'
                      : 'bg-white text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                  }`}
                >
                  {pg}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F1F5F9] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              التالي
            </button>
          </div>
        )}

      </div>

      {/* PDF Reader In-App Modal */}
      {pdfModalOpen && (
        <PdfReaderModal
          file={selectedPdf}
          isOpen={pdfModalOpen}
          onClose={() => {
            setPdfModalOpen(false);
            setSelectedPdf(null);
          }}
        />
      )}

    </div>
  );
}
