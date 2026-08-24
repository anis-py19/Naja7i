import React, { useState, useEffect } from 'react';
import { 
  HiX, 
  HiDownload, 
  HiExternalLink, 
  HiEye, 
  HiArrowsExpand,
  HiDocumentText,
  HiFolderDownload,
  HiRefresh
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

export default function PdfReaderModal({ file, isOpen, onClose }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      // Disable background scrolling while modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, file]);

  if (!isOpen || !file) return null;

  const pdfUrl = file.fileUrl || file.rawPath || file.url || '';
  const fileName = file.rawFileName || `${file.title || 'document'}.${file.extension || 'pdf'}`;
  const fileSize = file.sizeReadable || file.size || '';
  const fileExt = (file.extension || file.type || 'pdf').toLowerCase();
  const isPdf = fileExt === 'pdf';

  const handleDownload = (e) => {
    if (e) e.stopPropagation();
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs font-['Cairo']"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full bg-white border border-[#E2E8F0] rounded-2xl shadow-2xl flex flex-col transition-all overflow-hidden ${
            isFullscreen 
              ? 'fixed inset-2 z-50 h-[calc(100vh-16px)] max-w-none' 
              : 'max-w-5xl h-[90vh]'
          }`}
        >
          {/* Reader Header */}
          <div className="px-4 py-3 sm:px-6 sm:py-3.5 bg-[#0F172A] text-white border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-white p-0.5 text-[#E11D48] flex items-center justify-center text-lg shrink-0 shadow-xs border border-white/20">
                <HiDocumentText className="w-6 h-6 text-[#E11D48]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-rose-300 border border-slate-700">
                    {file.subjectName || 'ملخص دراسي'}
                  </span>
                  {fileSize && (
                    <span className="text-[11px] text-slate-400 font-mono">
                      {fileSize}
                    </span>
                  )}
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {fileExt}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-black text-white truncate mt-1">
                  {file.title}
                </h3>
              </div>
            </div>

            {/* Action Tools */}
            <div className="flex items-center gap-2">
              {/* Direct Download Button */}
              <button
                onClick={handleDownload}
                className="px-3.5 py-1.5 rounded-xl bg-[#E11D48] hover:bg-[#be123c] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer active:scale-95"
                title="تحميل مباشر إلى جهازك"
              >
                <HiDownload className="w-4 h-4" />
                <span className="hidden sm:inline">تحميل الملف</span>
                <span className="sm:hidden">تحميل</span>
              </button>

              {/* Open in new tab */}
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                title="فتح في لسان مستقل"
              >
                <HiExternalLink className="w-4 h-4 text-slate-400" />
                <span className="hidden md:inline">نافذة كاملة</span>
              </a>

              {/* Toggle Fullscreen (PDF only) */}
              {isPdf && (
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                  title={isFullscreen ? 'تصغير النافذة' : 'ملء الشاشة'}
                >
                  <HiArrowsExpand className="w-4 h-4" />
                </button>
              )}

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                title="إغلاق القارئ"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Reader Body / Iframe Viewer */}
          <div className="flex-1 bg-[#F1F5F9] relative overflow-hidden flex flex-col items-center justify-center">
            {isPdf ? (
              <>
                {/* Loading Indicator */}
                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 z-10 space-y-3">
                    <div className="w-8 h-8 border-3 border-[#E11D48] border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs font-bold text-[#0F172A]">جاري تحميل ومعاينة المستند...</span>
                  </div>
                )}

                {/* 🪟 High-Performance Fullscreen PDF Iframe */}
                <iframe
                  src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
                  className="w-full h-full border-0 bg-white"
                  title={file.title}
                  onLoad={() => setIsLoading(false)}
                />
              </>
            ) : (
              /* Non-PDF Download Card (for .rar / .doc / .zip) */
              <div className="p-8 text-center space-y-4 max-w-md bg-white rounded-2xl border border-[#E2E8F0] shadow-sm m-4">
                <div className="w-16 h-16 rounded-2xl bg-rose-50 text-[#E11D48] border border-rose-200 flex items-center justify-center text-3xl mx-auto shadow-2xs">
                  <HiFolderDownload className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-black text-[#0F172A]">
                    ملف بصيغة ({fileExt.toUpperCase()})
                  </h4>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    هذا الملف محفوظ بصيغة {fileExt.toUpperCase()}. يرجى تحميله مباشرة وفتحه باستخدام البرنامج المناسب (مثل WinRAR أو Microsoft Office).
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-center gap-3">
                  <button
                    onClick={handleDownload}
                    className="px-6 py-2.5 rounded-xl bg-[#E11D48] hover:bg-[#be123c] text-white text-xs font-bold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
                  >
                    <HiDownload className="w-4 h-4" />
                    <span>تحميل الملف الآن ({fileSize || 'مباشر'})</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Reader Footer Info Bar */}
          <div className="px-4 py-2.5 bg-white border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B] shrink-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span>إعداد: <strong className="text-[#0F172A]">{file.author || 'نخبة من أساتذة الجزائر'}</strong></span>
              <span>•</span>
              <span className="text-[#E11D48] font-bold">{file.category || 'ملخص دراسي'}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] hidden sm:inline">منصة نجاحي — فضاء المراجعة والتحضير للبكالوريا 🇩🇿</span>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
