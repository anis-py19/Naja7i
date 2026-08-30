import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiHome, 
  HiChevronLeft, 
  HiDownload, 
  HiEye, 
  HiSearch, 
  HiFilter, 
  HiDocumentText, 
  HiCheckCircle, 
  HiSparkles,
  HiExternalLink,
  HiOutlineDocumentDownload,
  HiOutlineBookOpen,
  HiCloudDownload,
  HiFolder
} from 'react-icons/hi';
import { BAC_FULL_ARCHIVE, BAC_DRIVE_ROOT, BAC_DRIVE_YEARS } from '../data/bacArchiveFullData';
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

  // Statistics counters
  const totalSubjectsCount = BAC_FULL_ARCHIVE.length;
  const totalPdfsAvailable = useMemo(() => {
    return BAC_FULL_ARCHIVE.reduce((acc, item) => {
      let count = 0;
      if (item.sujetUrl) count++;
      if (item.corrigeUrl) count++;
      return acc + count;
    }, 0);
  }, []);

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

  const currentYearDriveFolder = useMemo(() => {
    if (selectedYear !== 'all' && BAC_DRIVE_YEARS[selectedYear]) {
      return `https://drive.google.com/drive/folders/${BAC_DRIVE_YEARS[selectedYear]}`;
    }
    return BAC_DRIVE_ROOT;
  }, [selectedYear]);

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
                  2008 — 2026
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
                بنك شامل ومنظم لمواضيع البكالوريا الرسمية والتصحيحات النموذجية وسلالم التنقيط الوزارية المعتمدة مع التحميل المباشر، المعاينة الفورية، والمزامنة السحابية عبر Google Drive.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={BAC_DRIVE_ROOT}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F172A] text-xs font-bold border border-[#CBD5E1] transition-colors flex items-center gap-1.5 shadow-2xs"
                title="فتح المجلد السحابي الكامل للأرشيف على Google Drive"
              >
                <HiFolder className="w-4 h-4 text-[#E11D48]" />
                <span>مجلد Google Drive</span>
                <HiExternalLink className="w-3.5 h-3.5 text-[#64748B]" />
              </a>

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
              <div className="flex items-center gap-3">
                {selectedYear !== 'all' && (
                  <a
                    href={currentYearDriveFolder}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-bold text-[#0284C7] hover:underline flex items-center gap-1"
                  >
                    <span>فتح مجلد {selectedYear} على Drive</span>
                    <HiExternalLink className="w-3 h-3" />
                  </a>
                )}
                <span className="text-[11px] text-[#64748B]">
                  {selectedYear === 'all' ? 'جميع الدورات' : `دورة جوان ${selectedYear}`}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              {ALL_YEARS.map((year) => (
                <button
                  key={year}
                  onClick={() => handleYearChange(year.toString())}
                  className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition-all whitespace-nowrap cursor-pointer ${
                    selectedYear.toString() === year.toString()
                      ? 'bg-[#0F172A] text-white shadow-2xs'
                      : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                  }`}
                >
                  {year === 'all' ? 'جميع السنوات' : year}
                </button>
              ))}
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
                placeholder="ابحث عن مادة، سنة، أو شعبة معينة (مثال: رياضيات 2024، فيزياء علوم تجريبية...)"
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl pr-9 pl-3 py-2 text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#E11D48] transition-colors"
              />
            </div>

            {/* Toggle Main Subjects Only */}
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-[#0F172A] bg-[#F8FAFC] border border-[#CBD5E1] px-3 py-2 rounded-xl hover:bg-[#F1F5F9] transition-colors">
              <input
                type="checkbox"
                checked={onlyMainSubjects}
                onChange={(e) => {
                  setOnlyMainSubjects(e.target.checked);
                  setCurrentPage(1);
                }}
                className="rounded text-[#E11D48] focus:ring-[#E11D48] w-4 h-4 cursor-pointer"
              />
              <span>المواد الأساسية فقط (معامل 5 فما فوق)</span>
            </label>

          </div>

        </div>

        {/* Results Header & Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1 text-xs text-[#64748B]">
          <div className="flex items-center gap-2">
            <span>النتائج المعروضة:</span>
            <strong className="text-[#0F172A] font-bold">{filteredItems.length}</strong>
            <span>مادة</span>
            <span className="text-[#CBD5E1]">|</span>
            <span>من إجمالي</span>
            <strong className="text-[#0F172A] font-bold">{totalSubjectsCount}</strong>
            <span>مادة في الأرشيف (2,511+ ملف PDF)</span>
          </div>

          <div className="flex items-center gap-2">
            <span>الصفحة {currentPage} من {totalPages || 1}</span>
          </div>
        </div>

        {/* Subjects Grid */}
        {paginatedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-2xl p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group"
              >
                
                {/* Card Top Details */}
                <div className="space-y-2.5">
                  
                  {/* Tags */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-[11px] border border-slate-200/60 font-mono">
                        {item.year}
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

                  {/* Drive Folder Link Footer in Card */}
                  {item.driveFolderUrl && (
                    <div className="pt-2 border-t border-[#F8FAFC] flex items-center justify-end">
                      <a
                        href={item.driveFolderUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-[#64748B] hover:text-[#0284C7] transition-colors flex items-center gap-1"
                        title="فتح مجلد هذه السنة على Google Drive"
                      >
                        <HiFolder className="w-3 h-3 text-[#94A3B8]" />
                        <span>فتح مجلد {item.year} على Drive</span>
                        <HiExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
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
              إعادة ضبط جميع الفلاتر
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="px-3 py-1.5 rounded-lg bg-white border border-[#CBD5E1] text-xs font-bold text-[#0F172A] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F8FAFC] transition-colors cursor-pointer"
            >
              السابق
            </button>
            
            <div className="flex items-center gap-1 font-mono text-xs font-bold">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                .map((pageNum, idx, arr) => {
                  const prev = arr[idx - 1];
                  return (
                    <React.Fragment key={pageNum}>
                      {prev && pageNum - prev > 1 && (
                        <span className="px-1 text-[#94A3B8]">...</span>
                      )}
                      <button
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          currentPage === pageNum
                            ? 'bg-[#E11D48] text-white shadow-2xs'
                            : 'bg-white text-[#0F172A] hover:bg-[#F1F5F9] border border-[#CBD5E1]'
                        }`}
                      >
                        {pageNum}
                      </button>
                    </React.Fragment>
                  );
                })}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className="px-3 py-1.5 rounded-lg bg-white border border-[#CBD5E1] text-xs font-bold text-[#0F172A] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F8FAFC] transition-colors cursor-pointer"
            >
              التالي
            </button>
          </div>
        )}

      </div>

      {/* In-App PDF Reader Modal */}
      <PdfReaderModal
        isOpen={pdfModalOpen}
        onClose={() => setPdfModalOpen(false)}
        file={selectedPdf}
      />

    </div>
  );
}
