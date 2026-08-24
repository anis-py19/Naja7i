import React, { useState, useMemo } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { 
  HiHome, 
  HiDownload, 
  HiExternalLink, 
  HiArrowsExpand, 
  HiChevronLeft, 
  HiRefresh,
  HiDocumentText,
  HiShare,
  HiCheck
} from 'react-icons/hi';
import { USER_STUDY_FILES } from '../data/userFilesData';

export default function PdfViewerPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const fileUrl = searchParams.get('url') || '';
  const fileTitle = searchParams.get('title') || 'معاينة المستند';
  const fileSubject = searchParams.get('subject') || '';
  const fileAuthor = searchParams.get('author') || '';
  const fileId = searchParams.get('id') || '';

  const [copied, setCopied] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Find file in catalog if available
  const matchedFile = useMemo(() => {
    if (fileId) return USER_STUDY_FILES.find(f => f.id === fileId);
    if (fileUrl) return USER_STUDY_FILES.find(f => f.fileUrl === fileUrl || f.rawPath === fileUrl);
    return null;
  }, [fileId, fileUrl]);

  const activeUrl = matchedFile?.fileUrl || fileUrl;
  const activeTitle = matchedFile?.title || fileTitle;
  const activeSubject = matchedFile?.subjectName || fileSubject;
  const activeAuthor = matchedFile?.author || fileAuthor;
  const activeSize = matchedFile?.size || '';

  // Related files from same subject
  const relatedFiles = useMemo(() => {
    if (!matchedFile) return USER_STUDY_FILES.slice(0, 4);
    return USER_STUDY_FILES
      .filter(f => f.subjectId === matchedFile.subjectId && f.id !== matchedFile.id)
      .slice(0, 4);
  }, [matchedFile]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = activeUrl;
    link.download = matchedFile?.rawFileName || `${activeTitle}.pdf`;
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

  if (!activeUrl) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center font-['Cairo']">
        <div className="text-5xl mb-3">📄</div>
        <h2 className="text-xl font-bold text-[#0F172A] mb-2">لم يتم تحديد مستند للمعاينة</h2>
        <p className="text-xs text-[#64748B] mb-6">يرجى اختيار ملف من مكتبة الملخصات أو الشعب الدراسية.</p>
        <Link
          to="/library"
          className="px-5 py-2.5 rounded-xl bg-[#E11D48] text-white text-xs font-bold shadow-xs hover:bg-[#be123c] transition-colors"
        >
          الذهاب إلى مكتبة الملخصات
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pb-20 font-['Cairo']">
      
      {/* Top Breadcrumb & Actions Bar */}
      <div className="bg-white border-b border-[#E2E8F0] py-4 sm:py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between gap-4 flex-wrap mb-3">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-[#64748B] flex-wrap">
              <Link to="/" className="hover:text-[#E11D48] flex items-center gap-1 transition-colors">
                <HiHome className="w-4 h-4" />
                <span>الرئيسية</span>
              </Link>
              <span>/</span>
              <Link to="/library" className="hover:text-[#E11D48] transition-colors">
                مكتبة الملخصات
              </Link>
              <span>/</span>
              {activeSubject && (
                <>
                  <span className="text-[#64748B]">{activeSubject}</span>
                  <span>/</span>
                </>
              )}
              <span className="text-[#0F172A] font-bold truncate max-w-xs">{activeTitle}</span>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0F172A] text-xs font-bold border border-[#CBD5E1] transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <span>رجوع</span>
              <HiChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Title & Document Meta */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                {activeSubject && (
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-[#E11D48] font-bold text-xs border border-rose-200">
                    {activeSubject}
                  </span>
                )}
                {activeAuthor && (
                  <span className="text-xs text-[#64748B] font-medium">
                    إعداد: <strong className="text-[#0F172A]">{activeAuthor}</strong>
                  </span>
                )}
                {activeSize && (
                  <span className="text-xs text-[#64748B] font-mono">
                    • {activeSize}
                  </span>
                )}
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-[#0F172A]">
                {activeTitle}
              </h1>
            </div>

            {/* Primary Action Buttons (Ency-Style) */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleDownload}
                className="px-5 py-2.5 rounded-xl bg-[#E11D48] hover:bg-[#be123c] text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer active:scale-95"
                title="تحميل مباشر إلى هاتفك أو حاسوبك"
              >
                <HiDownload className="w-4 h-4" />
                <span>تحميل الملف (PDF)</span>
              </button>

              <a
                href={activeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#CBD5E1] text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                title="فتح في لسان مستقل"
              >
                <HiExternalLink className="w-4 h-4 text-[#64748B]" />
                <span className="hidden sm:inline">نافذة مستقلة</span>
              </a>

              <button
                onClick={handleCopyLink}
                className="p-2.5 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] border border-[#CBD5E1] transition-colors cursor-pointer shadow-2xs"
                title="مشاركة رابط الملف"
              >
                {copied ? <HiCheck className="w-4 h-4 text-emerald-600" /> : <HiShare className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIframeKey(k => k + 1)}
                className="p-2.5 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] border border-[#CBD5E1] transition-colors cursor-pointer shadow-2xs"
                title="إعادة تحميل المستند"
              >
                <HiRefresh className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2.5 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] border border-[#CBD5E1] transition-colors cursor-pointer shadow-2xs"
                title={isFullscreen ? 'تصغير' : 'ملء الشاشة'}
              >
                <HiArrowsExpand className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Main PDF Embed Container (Ency Style Live Iframe) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        <div className={`bg-white border border-[#E2E8F0] rounded-2xl shadow-xs overflow-hidden flex flex-col transition-all ${
          isFullscreen 
            ? 'fixed inset-2 z-50 h-[calc(100vh-16px)]' 
            : 'h-[78vh] sm:h-[84vh]'
        }`}>
          
          <iframe
            key={iframeKey}
            src={`${activeUrl}#toolbar=1&navpanes=0&scrollbar=1`}
            title={activeTitle}
            className="w-full h-full border-0 bg-white flex-1"
            loading="lazy"
            allow="fullscreen"
          />

        </div>

        {/* Bottom Prominent Download Banner */}
        <div className="mt-4 p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-center sm:text-right">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#E11D48]">
              <HiDocumentText className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-xs sm:text-sm text-[#0F172A] block">{activeTitle}</strong>
              <span className="text-[11px] text-[#64748B]">الملف جاهز للطباعة المباشرة بصيغة PDF عالية الجودة</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <button
              onClick={handleDownload}
              className="px-5 py-2 rounded-xl bg-[#E11D48] hover:bg-[#be123c] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <HiDownload className="w-4 h-4" />
              <span>تحميل الملف الآن</span>
            </button>
          </div>
        </div>

        {/* Related Files Section (Ency-Style Recommendations) */}
        {relatedFiles.length > 0 && (
          <div className="mt-10 space-y-4">
            <div className="border-b border-[#E2E8F0] pb-3">
              <h3 className="text-base font-black text-[#0F172A]">
                ملخصات ومواضيع ذات صلة في مادة {activeSubject}:
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                تصفح مستندات أخرى لنفس المادة للتحضير الشامل للبكالوريا.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {relatedFiles.map((rf) => (
                <div
                  key={rf.id}
                  className="bg-white border border-[#E2E8F0] hover:border-[#E11D48] rounded-xl p-3.5 shadow-2xs transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0]">
                        {rf.category}
                      </span>
                      <span className="text-[10px] font-mono text-[#64748B]">{rf.size}</span>
                    </div>
                    <h4 className="text-xs font-bold text-[#0F172A] group-hover:text-[#E11D48] line-clamp-2 leading-relaxed transition-colors">
                      {rf.title}
                    </h4>
                  </div>

                  <div className="pt-3 mt-2 border-t border-[#F1F5F9] flex items-center justify-between">
                    <span className="text-[10px] text-[#64748B]">{rf.author}</span>
                    <Link
                      to={`/view-pdf?id=${rf.id}&url=${encodeURIComponent(rf.fileUrl)}&title=${encodeURIComponent(rf.title)}&subject=${encodeURIComponent(rf.subjectName)}&author=${encodeURIComponent(rf.author)}`}
                      className="text-xs font-bold text-[#E11D48] hover:underline flex items-center gap-1"
                    >
                      <span>معاينة</span>
                      <HiChevronLeft className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
