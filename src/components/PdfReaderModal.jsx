import React, { useState } from 'react';
import { 
  HiX, 
  HiDownload, 
  HiExternalLink, 
  HiEye, 
  HiArrowsExpand,
  HiDocumentText,
  HiSparkles
} from 'react-icons/hi';
import { motion } from 'framer-motion';

export default function PdfReaderModal({ file, isOpen, onClose }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!isOpen || !file) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className={`relative w-full bg-white border border-[#FFE5BF] rounded-2xl shadow-2xl flex flex-col transition-all overflow-hidden ${
          isFullscreen 
            ? 'fixed inset-2 z-50 h-[calc(100vh-16px)] max-w-none' 
            : 'max-w-5xl h-[88vh]'
        }`}
      >
        {/* Reader Header */}
        <div className="px-4 py-3 sm:px-6 sm:py-3.5 bg-[#FFFAF3] border-b border-[#FFE5BF] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#FFF2DB] border border-[#FFE5BF] text-[#F62440] flex items-center justify-center text-lg shrink-0">
              <HiDocumentText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-2 py-0.2 rounded bg-[#FFF2DB] text-[#F62440] border border-[#FFE5BF]">
                  {file.subjectName || 'ملخص دراسي'}
                </span>
                <span className="text-[11px] text-[#78716c] font-mono">
                  {file.sizeReadable}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#1c1917] truncate font-['Cairo']">
                {file.title}
              </h3>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2">
            {/* Direct Download */}
            <a
              href={file.fileUrl}
              download={file.rawFileName || file.title}
              className="px-3 py-1.5 rounded-lg bg-[#F62440] hover:bg-[#d81b34] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              title="تحميل مباشر إلى هاتفك أو حاسوبك"
            >
              <HiDownload className="w-4 h-4" />
              <span className="hidden sm:inline">تحميل مباشر PDF</span>
              <span className="sm:hidden">تحميل</span>
            </a>

            {/* Open in new tab */}
            <a
              href={file.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-white hover:bg-[#FFF2DB] text-[#57534e] hover:text-[#1c1917] border border-[#FFE5BF] transition-colors cursor-pointer"
              title="فتح في تبويب مستقل"
            >
              <HiExternalLink className="w-4 h-4" />
            </a>

            {/* Toggle Fullscreen */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-lg bg-white hover:bg-[#FFF2DB] text-[#57534e] hover:text-[#1c1917] border border-[#FFE5BF] transition-colors cursor-pointer hidden md:block"
              title={isFullscreen ? 'تصغير النافذة' : 'تكبير ملء الشاشة'}
            >
              <HiArrowsExpand className="w-4 h-4" />
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white hover:bg-[#FFF2DB] text-[#78716c] hover:text-[#1c1917] border border-[#FFE5BF] transition-colors cursor-pointer"
              title="إغلاق القارئ"
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded PDF Viewer Frame */}
        <div className="flex-1 w-full h-full bg-[#f8fafc] relative">
          <iframe
            src={`${file.fileUrl}#toolbar=1&navpanes=0&scrollbar=1`}
            className="w-full h-full border-none"
            title={file.title}
          />
        </div>

        {/* Reader Footer Info */}
        <div className="px-4 py-2 bg-[#FFFAF3] border-t border-[#FFE5BF] flex items-center justify-between text-[11px] text-[#78716c]">
          <span>المؤلف / المصدر: <strong className="text-[#1c1917]">{file.author || 'نخبة الأساتذة والمفتشين'}</strong></span>
          <span className="hidden sm:inline">نصيحة: يمكنك استخدام خيارات القارئ لتكبير وتدوير الصفحات أو البحث في النص.</span>
        </div>
      </motion.div>
    </div>
  );
}
