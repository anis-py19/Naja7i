import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { 
  HiHome, 
  HiChevronLeft, 
  HiDownload, 
  HiExternalLink, 
  HiArrowsExpand,
  HiShare,
  HiDocumentText,
  HiArrowRight,
  HiCheck
} from 'react-icons/hi';
import { USER_STUDY_FILES } from '../data/userFilesData';

export default function PdfViewerPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const fileId = searchParams.get('id');
  const fileUrlParam = searchParams.get('url');
  const fileTitleParam = searchParams.get('title');

  // Find file from database or fallback to params
  const file = USER_STUDY_FILES.find(f => f.id === fileId || f.rawFileName === fileId || f.fileUrl === fileUrlParam) || {
    id: fileId || 'doc',
    title: fileTitleParam || 'ملف دراسي لشهادة البكالوريا',
    fileUrl: fileUrlParam || (fileId ? `/FileFromMe/${fileId}` : ''),
    subjectName: 'ملخصات البكالوريا',
    author: 'أساتذة متميزون',
    size: ''
  };

  const pdfUrl = file.fileUrl;
  const fileName = file.rawFileName || `${file.title || 'document'}.pdf`;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col justify-between font-['Cairo'] antialiased ${isFullscreen ? 'p-0' : 'pb-12'}`}>
      
      {/* 1. Top Navigation & Document Header (يظهر في الوضع العادي) */}
      {!isFullscreen && (
        <div className="bg-white border-b border-[#E2E8F0] py-3.5 shadow-2xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Breadcrumb */}
            <div className="flex items-center justify-between gap-2 text-xs text-[#64748B] mb-2">
              <div className="flex items-center gap-1.5">
                <Link to="/" className="hover:text-[#E11D48] flex items-center gap-1 transition-colors">
                  <HiHome className="w-3.5 h-3.5" />
                  <span>الرئيسية</span>
                </Link>
                <span>/</span>
                <Link to="/library" className="hover:text-[#E11D48] transition-colors">
                  <span>مكتبة الملخصات</span>
                </Link>
                <span>/</span>
                <span className="text-[#0F172A] font-bold truncate max-w-xs sm:max-w-md">
                  {file.title}
                </span>
              </div>

              <button
                onClick={() => navigate(-1)}
                className="px-3 py-1 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F172A] border border-[#CBD5E1] text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <HiArrowRight className="w-3.5 h-3.5" />
                <span>رجوع</span>
              </button>
            </div>

            {/* Document Title Banner Box (Ency-Education Style Matching User Screenshot) */}
            <div className="rounded-xl border border-sky-200 bg-sky-50/70 text-[#E11D48] text-center font-black py-2.5 px-4 text-sm sm:text-base md:text-lg shadow-2xs my-1.5 transition-all">
              {file.title}
            </div>

            {/* Quick Action Tools Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs font-bold">
              <div className="flex items-center gap-2 text-[#64748B]">
                <span className="px-2.5 py-0.5 rounded-md bg-[#F1F5F9] text-[#0F172A] border border-[#E2E8F0]">
                  {file.subjectName || 'مادة دراسية'}
                </span>
                {file.author && (
                  <span className="text-[#475569]">
                    إعداد: <strong>{file.author}</strong>
                  </span>
                )}
                {file.size && (
                  <span className="font-mono text-[#64748B]">
                    ({file.size})
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Download Button */}
                <button
                  onClick={handleDownload}
                  className="px-3.5 py-1.5 rounded-lg bg-[#E11D48] hover:bg-[#be123c] text-white flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                >
                  <HiDownload className="w-4 h-4" />
                  <span>تحميل الملف (PDF)</span>
                </button>

                {/* Open in new tab */}
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#CBD5E1] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                  title="فتح في لسان جديد"
                >
                  <HiExternalLink className="w-4 h-4 text-[#64748B]" />
                  <span className="hidden sm:inline">نافذة جديدة</span>
                </a>

                {/* Share Link */}
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#CBD5E1] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                  title="نسخ رابط هذا الملف"
                >
                  {copied ? <HiCheck className="w-4 h-4 text-emerald-600" /> : <HiShare className="w-4 h-4 text-[#64748B]" />}
                  <span className="hidden sm:inline">{copied ? 'تم النسخ!' : 'مشاركة'}</span>
                </button>

                {/* Fullscreen Toggle */}
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-1.5 rounded-lg bg-white hover:bg-[#F8FAFC] text-[#475569] border border-[#CBD5E1] transition-colors cursor-pointer shadow-2xs"
                  title="ملء الشاشة"
                >
                  <HiArrowsExpand className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 2. Fullscreen Minimal Action Bar */}
      {isFullscreen && (
        <div className="bg-[#0F172A] text-white px-4 py-2 flex items-center justify-between z-50 text-xs font-bold shadow-md">
          <span className="truncate max-w-md">{file.title}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3 py-1 rounded bg-[#E11D48] text-white flex items-center gap-1 cursor-pointer"
            >
              <HiDownload className="w-3.5 h-3.5" />
              <span>تحميل</span>
            </button>
            <button
              onClick={() => setIsFullscreen(false)}
              className="px-3 py-1 rounded bg-slate-800 text-slate-200 hover:text-white border border-slate-700 cursor-pointer"
            >
              الخروج من ملء الشاشة
            </button>
          </div>
        </div>
      )}

      {/* 3. Main Embedded PDF View Frame (مستعرض الـ PDF المدمج بالكامل) */}
      <main className={`flex-1 w-full flex flex-col items-center justify-center ${isFullscreen ? 'p-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4'}`}>
        <div className={`w-full bg-white rounded-2xl border-2 border-[#CBD5E1] shadow-md overflow-hidden flex flex-col ${
          isFullscreen ? 'h-[calc(100vh-40px)] rounded-none border-0' : 'h-[80vh] sm:h-[84vh]'
        }`}>
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
            type="application/pdf"
            className="w-full h-full border-0 bg-white"
            title={file.title}
          />
        </div>
      </main>

    </div>
  );
}
