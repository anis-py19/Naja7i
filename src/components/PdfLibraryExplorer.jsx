import React, { useState } from 'react';
import { 
  HiDownload, 
  HiEye, 
  HiSearch, 
  HiBookOpen
} from 'react-icons/hi';
import { USER_STUDY_FILES } from '../data/userFilesData';
import { STREAMS } from '../data/streamsData';

export default function PdfLibraryExplorer({ onOpenPdf }) {
  const [selectedStream, setSelectedStream] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique subjects and categories
  const allSubjects = Array.from(new Set(USER_STUDY_FILES.map(f => f.subjectName)));
  const allCategories = Array.from(new Set(USER_STUDY_FILES.map(f => f.category)));

  // Filter files
  const filteredFiles = USER_STUDY_FILES.filter(file => {
    // Stream filter
    if (selectedStream !== 'all' && !file.streams.includes(selectedStream)) {
      return false;
    }
    // Subject filter
    if (selectedSubject !== 'all' && file.subjectName !== selectedSubject) {
      return false;
    }
    // Category filter
    if (selectedCategory !== 'all' && file.category !== selectedCategory) {
      return false;
    }
    // Search query
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

  return (
    <section id="pdf-library" className="py-14 bg-[#F8FAFC] border-b border-[#E2E8F0] font-['Cairo']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-[#E2E8F0] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#F1F5F9] text-[#E11D48] font-bold text-xs font-mono border border-[#E2E8F0]">
                {USER_STUDY_FILES.length} ملف PDF جاهز
              </span>
              <span className="text-xs text-[#64748B]">تحميل مباشر وقراءة داخل الموقع</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] flex items-center gap-2">
              <HiBookOpen className="w-6 h-6 text-[#E11D48]" />
              <span>مكتبة الملخصات وسلاسل التمارين الشاملة 🇩🇿</span>
            </h2>
            <p className="text-xs text-[#475569] mt-1">
              تصفح وحمل جميع ملخصات المواد، سلاسل التمارين بالحل، ومقالات الفلسفة ومصطلحات التاريخ لجميع الشعب.
            </p>
          </div>
        </div>

        {/* Filter Controls Box */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 mb-8 space-y-4 shadow-xs">
          
          {/* Stream Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedStream('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                selectedStream === 'all'
                  ? 'bg-[#E11D48] text-white shadow-2xs'
                  : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
              }`}
            >
              جميع الشعب ({USER_STUDY_FILES.length})
            </button>
            {STREAMS.map(s => {
              const count = USER_STUDY_FILES.filter(f => f.streams.includes(s.id)).length;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedStream(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    selectedStream === s.id
                      ? 'bg-[#E11D48] text-white shadow-2xs'
                      : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                  }`}
                >
                  <span>{s.icon}</span>
                  <span>{s.name} ({count})</span>
                </button>
              );
            })}
          </div>

          {/* Search and Secondary Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[#E2E8F0]">
            
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث بالاسم، الأستاذ، أو الموضوع..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl pl-3 pr-8 py-2 text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#E11D48]"
              />
              <HiSearch className="w-4 h-4 text-[#64748B] absolute right-2.5 top-2.5" />
            </div>

            {/* Subject Filter Dropdown */}
            <div>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#E11D48] cursor-pointer"
              >
                <option value="all">جميع المواد الدراسية</option>
                {allSubjects.map((sub, i) => (
                  <option key={i} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            {/* Category Filter Dropdown */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#E11D48] cursor-pointer"
              >
                <option value="all">جميع التصنيفات</option>
                {allCategories.map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#64748B] mb-4 px-1">
          <span>يتم عرض <strong>{filteredFiles.length}</strong> مستند مطابق</span>
          {(selectedStream !== 'all' || selectedSubject !== 'all' || selectedCategory !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedStream('all');
                setSelectedSubject('all');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-[#E11D48] hover:underline font-bold cursor-pointer"
            >
              إلغاء الفلاتر
            </button>
          )}
        </div>

        {/* Files Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              className="ency-card p-4 rounded-xl flex flex-col justify-between group transition-all"
            >
              <div>
                {/* Badges */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#F1F5F9] text-[#0F172A] border border-[#E2E8F0]">
                    {file.subjectName}
                  </span>
                  <span className="text-[10px] text-[#64748B] font-mono">
                    {file.sizeReadable}
                  </span>
                </div>

                {/* Title */}
                <h3 
                  onClick={() => onOpenPdf && onOpenPdf(file)}
                  className="text-sm font-bold text-[#0F172A] group-hover:text-[#E11D48] transition-colors line-clamp-2 cursor-pointer mb-1.5"
                >
                  {file.title}
                </h3>

                {/* Author / Category */}
                <div className="text-[11px] text-[#64748B] flex items-center justify-between mb-4">
                  <span className="truncate">✍️ {file.author}</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#F8FAFC] text-[10px] text-[#475569] border border-[#E2E8F0] shrink-0 font-medium">
                    {file.category}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Read inside site + Direct Download */}
              <div className="pt-3 border-t border-[#E2E8F0] grid grid-cols-2 gap-2">
                <button
                  onClick={() => onOpenPdf && onOpenPdf(file)}
                  className="py-1.5 px-2 rounded-lg bg-white hover:bg-[#F1F5F9] text-[#0F172A] text-xs font-bold flex items-center justify-center gap-1 border border-[#CBD5E1] transition-colors cursor-pointer"
                >
                  <HiEye className="w-3.5 h-3.5 text-[#E11D48]" />
                  <span>قراءة الملف</span>
                </button>

                <a
                  href={file.fileUrl}
                  download={file.rawFileName || file.title}
                  className="py-1.5 px-2 rounded-lg bg-[#E11D48] hover:bg-[#be123c] text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors shadow-2xs"
                >
                  <HiDownload className="w-3.5 h-3.5" />
                  <span>تحميل PDF</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
