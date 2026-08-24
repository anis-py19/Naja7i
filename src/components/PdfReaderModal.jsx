import React, { useState } from 'react';
import { 
  HiX, 
  HiDownload, 
  HiExternalLink, 
  HiArrowsExpand,
  HiDocumentText,
  HiFolderDownload
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

export default function PdfReaderModal({ file, isOpen, onClose }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!isOpen || !file) return null;

  const rawUrl = file.fileUrl || file.rawPath || file.url || '';
  const safeEncodedUrl = rawUrl.startsWith('http') || rawUrl.startsWith('/')
    ? encodeURI(decodeURI(rawUrl))
    : rawUrl;

  const fileName = file.rawFileName || `${file.title || 'document'}.${file.extension || 'pdf'}`;
  const fileSize = file.sizeReadable || file.size || '';
  const isPdf = !file.extension || file.extension.toLowerCase() === 'pdf' || rawUrl.toLowerCase().endsWith('.pdf');

  const handleDownload = (e) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = safeEncodedUrl;
    link.download = fileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-4 bg-slate-950/80 backdrop-blur-xs font-['Cairo']">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.15 }}
          className={`relative w-full bg-white border border-[#E2E8F0] rounded-2xl shadow-2xl flex flex-col transition-all overflow-hidden ${
            isFullscreen 
              ? 'fixed inset-1 sm:inset-2 z-50 h-[calc(100vh-8px)] sm:h-[calc(100vh-16px)] max-w-none' 
              : 'max-w-6xl h-[92vh]'
          }`}
        >
          
          {/* Header Toolbar */}
          <div className="px-3 py-2.5 sm:px-6 sm:py-3 bg-[#0F172A] text-white flex flex-wrap items-center justify-between gap-2 shrink-0 border-b border-slate-800">
            
            {/* File Info */}
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/30 text-rose-400 flex items-center justify-center text-base shrink-0">
                <HiDocumentText className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-white truncate" title={file.title}>
                  {file.title}
                </h3>
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <span className="text-rose-300 font-bold">{file.subjectName || 'ملف دراسي'}</span>
                  {fileSize && <span>• {fileSize}</span>}
                  {file.author && <span className="hidden sm:inline">• {file.author}</span>}
                </div>
              </div>
            </div>

            {/* Action Tools */}
            <div className="flex items-center gap-1.5 shrink-0">
              
              {/* Direct Download Button */}
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 rounded-xl bg-[#E11D48] hover:bg-[#be123c] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                title="تحميل مباشر إلى جهازك"
              >
                <HiDownload className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">تحميل PDF</span>
              </button>

              {/* Open in new tab (مثل Ency-Education تماماً) */}
              <a
                href={safeEncodedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                title="فتح في لسان مستقل كامل"
              >
                <HiExternalLink className="w-4 h-4 text-slate-400" />
                <span className="hidden md:inline">نافذة جديدة</span>
              </a>

              {/* Fullscreen Toggle */}
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

          {/* Reader Body Area */}
          <div className="flex-1 bg-white relative overflow-hidden flex flex-col items-center justify-center w-full h-full">
            {isPdf ? (
              <iframe
                src={`${safeEncodedUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                className="w-full h-full border-0 bg-white"
                title={file.title || 'PDF Document'}
              />
            ) : (
              /* Non-PDF Files (e.g. DOCX / RAR) */
              <div className="p-8 text-center space-y-4 max-w-md bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] shadow-sm m-4">
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
                    href={safeEncodedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#CBD5E1] text-xs font-bold flex items-center gap-1.5"
                  >
                    <HiExternalLink className="w-4 h-4" />
                    <span>فتح في لسان جديد</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-4 py-2 bg-[#0F172A] border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
            <div className="flex items-center gap-2 truncate">
              <span>إعداد: <strong className="text-slate-200">{file.author || 'نخبة الأساتذة'}</strong></span>
              <span>•</span>
              <span className="text-rose-400 font-medium truncate">{file.category || 'ملخص دراسي'}</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] text-slate-500">منصة نجاحي — مستعرض الملفات المحلي 🇩🇿</span>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
