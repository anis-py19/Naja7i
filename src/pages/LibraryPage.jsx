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
  HiHome,
  HiExternalLink
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

  const handleDirectDownload = (file, e) => {
    e.stopPropagation();
    const pdfUrl = file.fileUrl || file.url;
    const fileName = file.rawFileName || `${file.title}.pdf`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pagination calculation
  const totalPages = Math.ceil(filteredFiles.length / ITEMS_PER_PAGE) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const paginatedFiles = filteredFiles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pb-16 font-['Cairo']">
      
      {/* Top Breadcrumb & Page Banner */}
      <div className="bg-white border-b border-[#E2E8F0] py-5 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#64748B] mb-3">
            <Link to="/" className="hover:text-[#E11D48] flex items-center gap-1 transition-colors">
              <HiHome className="w-4 h-4" />
              <span>الرئيسية</span>
            </Link>
            <span>/</span>
            <span className="text-[#0F172A] font-bold">مكتبة الملخصات والمستندات</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#F1F5F9] text-[#E11D48] font-bold text-xs font-mono border border-[#E2E8F0]">
                  مكتبة شاملة
                </span>
                <span className="text-xs text-[#64748B]">تحميل مباشر وقراءة فورية داخل الموقع</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
                بنك الملخصات وسلاسل التمارين
              </h1>
              <p className="text-xs text-[#475569] mt-1 max-w-xl">
                مكتبة منظمة ومصنفة حسب الشعب والمواد لجميع ملفات البكالوريا وفق المنهاج الوزاري المعتمد.
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

      {/* Main Filter & Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Filter Control Box */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 mb-6 shadow-xs space-y-4">
          
          {/* 1. Stream Selector Bar */}
          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E11D48]"></span>
              <span>1. تصفية حسب الشعبة الدراسية:</span>
            </label>
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
              {STREAMS.map(s => {
                return (
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
                );
              })}
            </div>
          </div>

          {/* 2. Secondary Dropdowns & Search */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#E2E8F0]">
            
            {/* Search Input */}
            <div>
              <label className="block text-[11px] font-bold text-[#64748B] mb-1">
                بحث بالكلمة أو الأستاذ:
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث (مثال: متتاليات، نور الدين، سمراني...)"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg pl-3 pr-8 py-2 text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#E11D48]"
                />
                <HiSearch className="w-4 h-4 text-[#64748B] absolute right-2.5 top-2.5" />
                {searchQuery && (
                  <button
                    onClick={() => handleSearchChange('')}
                    className="absolute left-2.5 top-2.5 text-[#64748B] hover:text-[#0F172A]"
                  >
                    <HiX className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Subject Filter */}
            <div>
              <label className="block text-[11px] font-bold text-[#64748B] mb-1">
                المادة التعليمية:
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => handleSubjectChange(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#E11D48] cursor-pointer"
              >
                <option value="all">جميع المواد</option>
                {availableSubjects.map((sub, i) => (
                  <option key={i} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-[11px] font-bold text-[#64748B] mb-1">
                نوع الملف (ملخص / تمارين / بكالوريا):
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#E11D48] cursor-pointer"
              >
                <option value="all">جميع التصنيفات</option>
                {availableCategories.map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Active Filter Chips & Reset */}
          {(selectedStream !== 'all' || selectedSubject !== 'all' || selectedCategory !== 'all' || searchQuery) && (
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#E2E8F0] text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[#64748B] font-bold">الفلاتر المطبقة:</span>
                {selectedStream !== 'all' && (
                  <span className="px-2 py-0.5 rounded bg-[#F1F5F9] border border-[#E2E8F0] text-[#0F172A] flex items-center gap-1">
                    الشعبة: {STREAMS.find(s => s.id === selectedStream)?.name}
                    <button onClick={() => handleStreamChange('all')} className="hover:text-[#E11D48]"><HiX className="w-3 h-3" /></button>
                  </span>
                )}
                {selectedSubject !== 'all' && (
                  <span className="px-2 py-0.5 rounded bg-[#F1F5F9] border border-[#E2E8F0] text-[#0F172A] flex items-center gap-1">
                    المادة: {selectedSubject}
                    <button onClick={() => handleSubjectChange('all')} className="hover:text-[#E11D48]"><HiX className="w-3 h-3" /></button>
                  </span>
                )}
                {selectedCategory !== 'all' && (
                  <span className="px-2 py-0.5 rounded bg-[#F1F5F9] border border-[#E2E8F0] text-[#0F172A] flex items-center gap-1">
                    النوع: {selectedCategory}
                    <button onClick={() => handleCategoryChange('all')} className="hover:text-[#E11D48]"><HiX className="w-3 h-3" /></button>
                  </span>
                )}
              </div>

              <button
                onClick={handleResetFilters}
                className="text-[#E11D48] hover:underline font-bold text-xs cursor-pointer"
              >
                إلغاء جميع الفلاتر ↺
              </button>
            </div>
          )}

        </div>

        {/* Google Drive Integration Banner for English / Cloud-connected subjects */}
        {(selectedSubject === 'اللغة الإنجليزية' || filteredFiles.some(f => f.subjectId === 'english' && selectedSubject !== 'all')) && (
          <div className="mb-6 p-4.5 rounded-2xl bg-white border border-blue-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                📁
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold text-[10px] border border-blue-200">
                    Google Drive Cloud ☁️
                  </span>
                  <span className="text-[11px] text-[#64748B]">سحابة مادة اللغة الإنجليزية الرسمية</span>
                </div>
                <h4 className="text-xs sm:text-sm font-black text-[#0F172A]">
                  مجلد Google Drive الكامل لملخصات ومذكرات اللغة الإنجليزية
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => onOpenPdf({
                  title: 'مجلد ملفات اللغة الإنجليزية (Google Drive)',
                  driveUrl: 'https://drive.google.com/drive/folders/1t3HZtqpQA8F5qmI6nhoW35T5EN3h0SxR',
                  isFolder: true
                })}
                className="px-3.5 py-2 rounded-xl bg-[#0F172A] hover:bg-black text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
              >
                <HiEye className="w-4 h-4 text-rose-400" />
                <span>معاينة المجلد في الموقع</span>
              </button>
              <a
                href="https://drive.google.com/drive/folders/1t3HZtqpQA8F5qmI6nhoW35T5EN3h0SxR"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#CBD5E1] text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
              >
                <HiExternalLink className="w-4 h-4 text-blue-600" />
                <span>فتح على Google Drive ↗</span>
              </a>
            </div>
          </div>
        )}

        {/* Results Counter Header */}
        <div className="flex items-center justify-between text-xs text-[#64748B] mb-4 px-1">
          <div>
            عرض <strong className="text-[#0F172A]">{paginatedFiles.length}</strong> من إجمالي <strong className="text-[#E11D48] font-bold">{filteredFiles.length}</strong> ملف متاح
          </div>
          <div>
            صفحة <strong className="text-[#0F172A]">{safeCurrentPage}</strong> من <strong className="text-[#0F172A]">{totalPages}</strong>
          </div>
        </div>

        {/* File Cards Grid */}
        {paginatedFiles.length === 0 ? (
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-12 text-center space-y-3">
            <div className="text-4xl">🔍</div>
            <h3 className="text-base font-bold text-[#0F172A]">لم نتمكن من العثور على أي ملف يطابق بحثك</h3>
            <p className="text-xs text-[#64748B] max-w-sm mx-auto">
              جرب تغيير كلمات البحث أو اختيار شعبة أخرى أو إلغاء بعض الفلاتر.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-2 px-4 py-2 rounded-xl bg-[#E11D48] text-white font-bold text-xs cursor-pointer"
            >
              عرض جميع الملفات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginatedFiles.map((file) => (
              <div
                key={file.id}
                className="ency-card p-4 rounded-xl flex flex-col justify-between group shadow-2xs hover:shadow-xs"
              >
                <div>
                  
                  {/* File Meta Header */}
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#F1F5F9] text-[#0F172A] border border-[#E2E8F0] truncate">
                      {file.subjectName}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0] shrink-0">
                      {file.sizeReadable || file.size || ''}
                    </span>
                  </div>

                  {/* File Title */}
                  <h4 
                    onClick={() => onOpenPdf(file)}
                    className="text-xs font-bold text-[#0F172A] group-hover:text-[#E11D48] transition-colors line-clamp-2 leading-relaxed mb-2 cursor-pointer"
                  >
                    {file.title}
                  </h4>

                  {/* Author & Category Tags */}
                  <div className="flex items-center gap-1.5 flex-wrap text-[11px] text-[#64748B] mb-3">
                    <span className="truncate">إعداد: {file.author}</span>
                    <span>•</span>
                    <span className="text-[#E11D48] font-medium">{file.category}</span>
                  </div>

                </div>

                {/* Actions: View Online & Download Direct */}
                <div className="pt-3 border-t border-[#E2E8F0] flex items-center gap-2">
                  <button
                    onClick={() => onOpenPdf(file)}
                    className="flex-1 py-2 px-2 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F172A] text-xs font-bold border border-[#CBD5E1] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <HiEye className="w-3.5 h-3.5 text-[#E11D48]" />
                    <span>قراءة</span>
                  </button>

                  <button
                    onClick={(e) => handleDirectDownload(file, e)}
                    className="flex-1 py-2 px-2 rounded-lg bg-[#E11D48] hover:bg-[#be123c] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                  >
                    <HiDownload className="w-3.5 h-3.5" />
                    <span>تحميل</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={safeCurrentPage === 1}
              className="p-2 rounded-lg bg-white border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F1F5F9] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors shadow-2xs"
              title="الصفحة السابقة"
            >
              <HiChevronRight className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - safeCurrentPage) <= 2)
              .map((pageNum, idx, array) => {
                const isGap = idx > 0 && pageNum - array[idx - 1] > 1;
                return (
                  <React.Fragment key={pageNum}>
                    {isGap && <span className="px-1 text-xs text-[#64748B]">...</span>}
                    <button
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        safeCurrentPage === pageNum
                          ? 'bg-[#E11D48] text-white shadow-2xs'
                          : 'bg-white text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
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
              className="p-2 rounded-lg bg-white border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F1F5F9] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors shadow-2xs"
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
