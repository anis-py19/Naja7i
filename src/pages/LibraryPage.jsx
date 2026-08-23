import React, { useState, useMemo } from 'react';
import { 
  HiBookOpen, 
  HiSearch, 
  HiFilter, 
  HiDownload, 
  HiEye, 
  HiChevronLeft, 
  HiChevronRight,
  HiX,
  HiCollection,
  HiHome
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { USER_STUDY_FILES } from '../data/userFilesData';
import { STREAMS } from '../data/streamsData';

const ITEMS_PER_PAGE = 12;

export default function LibraryPage({ onOpenPdf }) {
  const [selectedStream, setSelectedStream] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Available subjects based on selected stream
  const availableSubjects = useMemo(() => {
    const files = selectedStream === 'all' 
      ? USER_STUDY_FILES 
      : USER_STUDY_FILES.filter(f => f.streams.includes(selectedStream));
    return Array.from(new Set(files.map(f => f.subjectName)));
  }, [selectedStream]);

  // Available categories based on filtered files
  const availableCategories = useMemo(() => {
    return Array.from(new Set(USER_STUDY_FILES.map(f => f.category)));
  }, []);

  // Filtered files list
  const filteredFiles = useMemo(() => {
    return USER_STUDY_FILES.filter(file => {
      // 1. Stream filter
      if (selectedStream !== 'all' && !file.streams.includes(selectedStream)) {
        return false;
      }
      // 2. Subject filter
      if (selectedSubject !== 'all' && file.subjectName !== selectedSubject) {
        return false;
      }
      // 3. Category filter
      if (selectedCategory !== 'all' && file.category !== selectedCategory) {
        return false;
      }
      // 4. Search query
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.trim().toLowerCase();
        const match = 
          file.title.toLowerCase().includes(q) ||
          file.subjectName.toLowerCase().includes(q) ||
          file.author.toLowerCase().includes(q) ||
          file.category.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [selectedStream, selectedSubject, selectedCategory, searchQuery]);

  // Reset to page 1 whenever filters change
  const handleStreamChange = (streamId) => {
    setSelectedStream(streamId);
    setSelectedSubject('all');
    setCurrentPage(1);
  };

  const handleSubjectChange = (subj) => {
    setSelectedSubject(subj);
    setCurrentPage(1);
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedStream('all');
    setSelectedSubject('all');
    setSelectedCategory('all');
    setSearchQuery('');
    setCurrentPage(1);
  };

  // Pagination calculation
  const totalPages = Math.ceil(filteredFiles.length / ITEMS_PER_PAGE) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const paginatedFiles = filteredFiles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[#FFFAF3] text-[#1c1917] pb-16 font-['Cairo']">
      
      {/* Top Breadcrumb & Page Banner */}
      <div className="bg-[#FFF2DB] border-b border-[#FFE5BF] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#78716c] mb-3">
            <Link to="/" className="hover:text-[#F62440] flex items-center gap-1 transition-colors">
              <HiHome className="w-4 h-4" />
              <span>الرئيسية</span>
            </Link>
            <span>/</span>
            <span className="text-[#1c1917] font-bold">مكتبة الملخصات والمستندات</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-md bg-[#F62440] text-white font-bold text-xs font-mono shadow-2xs">
                  مكتبة شاملة
                </span>
                <span className="text-xs text-[#78716c]">تحميل مباشر + قراءة فورية داخل الموقع</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#1c1917]">
                بنك الملخصات وسلاسل التمارين 📚
              </h1>
              <p className="text-xs text-[#57534e] mt-1 max-w-xl">
                مكتبة منظمة ومصنفة حسب الشعب والمواد لجميع ملفات البكالوريا وفق المنهاج الوزاري المعتمد.
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

      {/* Main Filter & Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Filter Control Box */}
        <div className="bg-white border border-[#FFE5BF] rounded-2xl p-5 mb-6 shadow-xs space-y-4">
          
          {/* 1. Stream Selector Bar */}
          <div>
            <label className="block text-xs font-bold text-[#1c1917] mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F62440]"></span>
              <span>1. تصفية حسب الشعبة الدراسية:</span>
            </label>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <button
                onClick={() => handleStreamChange('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  selectedStream === 'all'
                    ? 'bg-[#F62440] text-white shadow-xs'
                    : 'bg-[#FFFAF3] text-[#1c1917] hover:bg-[#FFF2DB] border border-[#FFE5BF]'
                }`}
              >
                جميع الشعب
              </button>
              {STREAMS.map(s => {
                return (
                  <button
                    key={s.id}
                    onClick={() => handleStreamChange(s.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                      selectedStream === s.id
                        ? 'bg-[#F62440] text-white shadow-xs'
                        : 'bg-[#FFFAF3] text-[#1c1917] hover:bg-[#FFF2DB] border border-[#FFE5BF]'
                    }`}
                  >
                    <span>{s.icon} {s.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Secondary Dropdowns & Search */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#FFE5BF]">
            
            {/* Search Input */}
            <div>
              <label className="block text-[11px] font-bold text-[#78716c] mb-1">
                بحث بالكلمة أو الأستاذ:
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث (مثال: متتاليات، نور الدين، سمراني...)"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full bg-[#FFFAF3] border border-[#FFE5BF] rounded-lg pl-3 pr-8 py-2 text-xs text-[#1c1917] placeholder-[#78716c] focus:outline-none focus:border-[#F62440]"
                />
                <HiSearch className="w-4 h-4 text-[#78716c] absolute right-2.5 top-2.5" />
                {searchQuery && (
                  <button
                    onClick={() => handleSearchChange('')}
                    className="absolute left-2.5 top-2.5 text-[#78716c] hover:text-[#1c1917]"
                  >
                    <HiX className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Subject Filter */}
            <div>
              <label className="block text-[11px] font-bold text-[#78716c] mb-1">
                المادة الدراسية:
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => handleSubjectChange(e.target.value)}
                className="w-full bg-[#FFFAF3] border border-[#FFE5BF] rounded-lg px-3 py-2 text-xs text-[#1c1917] focus:outline-none focus:border-[#F62440] cursor-pointer"
              >
                <option value="all">جميع المواد الدراسية</option>
                {availableSubjects.map((sub, i) => (
                  <option key={i} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-[11px] font-bold text-[#78716c] mb-1">
                نوع المحتوى:
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full bg-[#FFFAF3] border border-[#FFE5BF] rounded-lg px-3 py-2 text-xs text-[#1c1917] focus:outline-none focus:border-[#F62440] cursor-pointer"
              >
                <option value="all">جميع الأنواع</option>
                {availableCategories.map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

          </div>

        </div>

        {/* Results Header & Active Filters Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 text-xs">
          <div className="text-[#57534e]">
            عرض <strong className="text-[#1c1917]">{startIndex + 1} - {Math.min(startIndex + ITEMS_PER_PAGE, filteredFiles.length)}</strong> من أصل <strong className="text-[#F62440] font-mono">{filteredFiles.length}</strong> ملف مطابق
          </div>

          {(selectedStream !== 'all' || selectedSubject !== 'all' || selectedCategory !== 'all' || searchQuery) && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[#78716c]">الفلاتر النشطة:</span>
              {selectedStream !== 'all' && (
                <span className="px-2 py-0.5 rounded bg-[#FFF2DB] border border-[#FFE5BF] text-[#1c1917] font-bold">
                  {STREAMS.find(s => s.id === selectedStream)?.name}
                </span>
              )}
              {selectedSubject !== 'all' && (
                <span className="px-2 py-0.5 rounded bg-[#FFF2DB] border border-[#FFE5BF] text-[#1c1917] font-bold">
                  {selectedSubject}
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="px-2 py-0.5 rounded bg-[#FFF2DB] border border-[#FFE5BF] text-[#1c1917] font-bold">
                  {selectedCategory}
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="text-[#F62440] hover:underline font-bold cursor-pointer"
              >
                إلغاء جميع الفلاتر ✕
              </button>
            </div>
          )}
        </div>

        {/* Files Grid (Controlled 12 items per page) */}
        {paginatedFiles.length === 0 ? (
          <div className="bg-white border border-[#FFE5BF] rounded-2xl p-12 text-center text-[#78716c] space-y-3">
            <div className="text-3xl">🔍</div>
            <h3 className="text-base font-bold text-[#1c1917]">لم يتم العثور على ملفات مطابقة للبحث</h3>
            <p className="text-xs max-w-md mx-auto">
              جرب تغيير كلمات البحث أو اختيار مادة أخرى، أو اضغط على إلغاء الفلاتر لعرض جميع المستندات.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-1.5 rounded-lg bg-[#F62440] text-white text-xs font-bold hover:bg-[#d81b34] transition-colors"
            >
              إلغاء الفلاتر
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedFiles.map((file) => (
              <div
                key={file.id}
                className="ency-card p-4 rounded-xl flex flex-col justify-between group transition-all"
              >
                <div>
                  {/* Badges */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#FFF2DB] text-[#F62440] border border-[#FFE5BF]">
                      {file.subjectName}
                    </span>
                    <span className="text-[10px] text-[#78716c] font-mono">
                      {file.sizeReadable}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 
                    onClick={() => onOpenPdf && onOpenPdf(file)}
                    className="text-sm font-bold text-[#1c1917] group-hover:text-[#F62440] transition-colors line-clamp-2 cursor-pointer mb-1.5 leading-snug"
                    title={file.title}
                  >
                    {file.title}
                  </h3>

                  {/* Author / Category */}
                  <div className="text-[11px] text-[#78716c] flex items-center justify-between mb-4">
                    <span className="truncate">👤 {file.author}</span>
                    <span className="px-1.5 py-0.2 rounded bg-[#FFFAF3] text-[10px] border border-[#FFE5BF] shrink-0 font-medium">
                      {file.category}
                    </span>
                  </div>
                </div>

                {/* Action Buttons: Read inside site + Direct Download */}
                <div className="pt-3 border-t border-[#FFE5BF] grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onOpenPdf && onOpenPdf(file)}
                    className="py-1.5 px-2 rounded-lg bg-[#FFF2DB] hover:bg-[#FFE5BF] text-[#1c1917] text-xs font-bold flex items-center justify-center gap-1 border border-[#FFE5BF] transition-colors cursor-pointer"
                  >
                    <HiEye className="w-3.5 h-3.5 text-[#F62440]" />
                    <span>قراءة الملف</span>
                  </button>

                  <a
                    href={file.fileUrl}
                    download={file.rawFileName || file.title}
                    className="py-1.5 px-2 rounded-lg bg-[#F62440] hover:bg-[#d81b34] text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors shadow-2xs"
                  >
                    <HiDownload className="w-3.5 h-3.5" />
                    <span>تحميل PDF</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Clean Pagination Bar (1, 2, 3...) */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={safeCurrentPage === 1}
              className="p-2 rounded-lg bg-white border border-[#FFE5BF] text-xs font-bold text-[#1c1917] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FFF2DB] transition-colors"
              title="الصفحة السابقة"
            >
              <HiChevronRight className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(pageNum => {
                // Show first, last, and pages around current page
                return (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  Math.abs(pageNum - safeCurrentPage) <= 1
                );
              })
              .map((pageNum, idx, arr) => {
                const prevNum = arr[idx - 1];
                const showEllipsis = prevNum && pageNum - prevNum > 1;

                return (
                  <React.Fragment key={pageNum}>
                    {showEllipsis && (
                      <span className="px-1 text-xs text-[#78716c]">...</span>
                    )}
                    <button
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        safeCurrentPage === pageNum
                          ? 'bg-[#F62440] text-white shadow-xs'
                          : 'bg-white text-[#1c1917] hover:bg-[#FFF2DB] border border-[#FFE5BF]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  </React.Fragment>
                );
              })}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={safeCurrentPage === totalPages}
              className="p-2 rounded-lg bg-white border border-[#FFE5BF] text-xs font-bold text-[#1c1917] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FFF2DB] transition-colors"
              title="الصفحة التالية"
            >
              <HiChevronLeft className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
