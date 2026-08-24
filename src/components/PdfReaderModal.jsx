import React, { useState } from 'react';
import { 
  HiX, 
  HiDownload, 
  HiExternalLink, 
  HiArrowsExpand,
  HiDocumentText,
  HiEye,
  HiFolderDownload
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

export default function PdfReaderModal({ file, isOpen, onClose }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!isOpen || !file) return null;

  const rawUrl = file.fileUrl || file.rawPath || file.url || '';
  const fileName = file.rawFileName || `${file.title || 'document'}.${file.extension || 'pdf'}`;
  const fileSize = file.sizeReadable || file.size || '';
  const isPdf = !file.extension || file.extension.toLowerCase() === 'pdf' || rawUrl.toLowerCase().endsWith('.pdf');

  const handleDownload = (e) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = rawUrl;
    link.download = fileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-xs font-['Cairo']">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.15 }}
          className={`relative w-full bg-white border border-[#E2E8F0] rounded-2xl shadow-2xl flex flex-col transition-all overflow-hidden ${
            isFullscreen 
              ? 'fixed inset-2 z-50 h-[calc(100vh-16px)] max-w-none' 
              : 'max-w-6xl h-[92vh]'
          }`}
        >
          {/* Reader Top Header Bar */}
          <div className="px-4 py-3 sm:px-6 sm:py-3.5 bg-[#0F172A] text-white flex flex-wrap items-center justify-between gap-3 shrink-0">
            
            {/* File Info */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 text-[#E11D48] flex items-center justify-center text-lg shrink-0 shadow-2xs">
                <HiDocumentText className="w-5 h-5 text-rose-400" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-bold px-2 py-0.2 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    {file.subjectName || 'ملف دراسي'}
                  </span>
                  {fileSize && (
                    <span className="text-[11px] text-slate-400 font-mono">
                      {fileSize}
                    </span>
                  )}
                  {file.author && (
                    <span className="text-[11px] text-slate-300 hidden md:inline">
                      • {file.author}
                    </span>
                  )}
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-white truncate mt-0.5" title={file.title}>
                  {file.title}
                </h3>
              </div>
            </div>

            {/* Action Tools */}
            <div className="flex items-center gap-2 shrink-0">
              
              {/* Direct Download Button */}
              <button
                onClick={handleDownload}
                className="px-3.5 py-1.5 rounded-xl bg-[#E11D48] hover:bg-[#be123c] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                title="تحميل مباشر إلى جهازك"
              >
                <HiDownload className="w-4 h-4" />
                <span>تحميل الملف</span>
              </button>

              {/* Open in new tab */}
              <a
                href={rawUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                title="فتح في لسان مستقل"
              >
                <HiExternalLink className="w-4 h-4 text-slate-400" />
                <span className="hidden sm:inline">نافذة جديدة</span>
              </a>

              {/* Toggle Fullscreen */}
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer shadow-2xs"
                title={isFullscreen ? 'تصغير النافذة' : 'ملء الشاشة'}
              >
                <HiArrowsExpand className="w-4 h-4" />
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white border border-slate-700 hover:border-rose-600 transition-colors cursor-pointer shadow-2xs"
                title="إغلاق المستعرض"
              >
                <HiX className="w-4 h-4" />
              </button>

            </div>

          </div>

          {/* Embedded PDF / Document Body */}
          <div className="flex-1 bg-[#0F172A]/5 relative overflow-hidden flex flex-col items-center justify-center w-full h-full">
            {isPdf ? (
              <iframe
                src={`${rawUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                type="application/pdf"
                className="w-full h-full border-0 bg-white"
                title={file.title || 'مستعرض PDF'}
              />
            ) : (
              /* Non-PDF Card (e.g. DOC, DOCX, RAR) */
              <div className="p-8 text-center space-y-4 max-w-md bg-white rounded-2xl border border-[#E2E8F0] shadow-sm m-4">
                <div className="w-16 h-16 rounded-2xl bg-rose-50 text-[#E11D48] flex items-center justify-center text-3xl mx-auto shadow-2xs">
                  <HiFolderDownload />
                </div>
                <h4 className="text-base font-bold text-[#0F172A]">ملف مستند ({file.extension ? file.extension.toUpperCase() : 'DOC'})</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  هذا الملف بصيغة ({file.extension || 'Word'})، يمكنك تحميله مباشرة أو فتحه بواسطة تطبيق المستندات في جهازك.
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleDownload}
                    className="px-5 py-2.5 rounded-xl bg-[#E11D48] hover:bg-[#be123c] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <HiDownload className="w-4 h-4" />
                    <span>تحميل الملف الآن</span>
                  </button>
                  <a
                    href={rawUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#CBD5E1] text-xs font-bold flex items-center gap-1.5"
                  >
                    <HiExternalLink className="w-4 h-4" />
                    <span>فتح الرابط</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Reader Footer Bar */}
          <div className="px-4 py-2 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B] shrink-0">
            <div className="flex items-center gap-2 truncate">
              <span>إعداد: <strong className="text-[#0F172A]">{file.author || 'نخبة الأساتذة'}</strong></span>
              <span>•</span>
              <span className="text-[#E11D48] font-medium truncate">{file.category || 'ملخص دراسي'}</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] text-[#94A3B8]">منصة نجاحي — فضاء البكالوريا الجزائرية 🇩🇿</span>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
