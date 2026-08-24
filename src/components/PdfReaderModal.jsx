import React, { useState } from 'react';
import { 
  HiX, 
  HiDownload, 
  HiExternalLink, 
  HiEye, 
  HiArrowsExpand,
  HiDocumentText
} from 'react-icons/hi';
import { motion } from 'framer-motion';

export default function PdfReaderModal({ file, isOpen, onClose }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!isOpen || !file) return null;

  const pdfUrl = file.fileUrl || file.url || '';
  const fileName = file.rawFileName || `${file.title || 'document'}.pdf`;
  const fileSize = file.sizeReadable || file.size || '';

  const handleDownload = (e) => {
    e.stopPropagation();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs font-['Cairo']">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className={`relative w-full bg-white border border-[#E2E8F0] rounded-2xl shadow-2xl flex flex-col transition-all overflow-hidden ${
          isFullscreen 
            ? 'fixed inset-2 z-50 h-[calc(100vh-16px)] max-w-none' 
            : 'max-w-5xl h-[92vh]'
        }`}
      >
        {/* Reader Top Action Bar */}
        <div className="px-4 py-2.5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white text-[#E11D48] border border-[#E2E8F0]">
              {file.subjectName || 'ملخص دراسي'}
            </span>
            {fileSize && (
              <span className="text-xs text-[#64748B] font-mono">
                {fileSize}
              </span>
            )}
            {file.author && (
              <span className="text-xs text-[#475569] hidden sm:inline">
                • {file.author}
              </span>
            )}
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2">
            {/* Direct Download Button */}
            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 rounded-xl bg-[#E11D48] hover:bg-[#be123c] text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
              title="تحميل مباشر إلى هاتفك أو حاسوبك"
            >
              <HiDownload className="w-4 h-4" />
              <span>تحميل PDF</span>
            </button>

            {/* Open in new tab */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#F1F5F9] text-[#0F172A] border border-[#CBD5E1] text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
              title="فتح في نافذة مستقلة"
            >
              <HiExternalLink className="w-4 h-4 text-[#64748B]" />
              <span className="hidden sm:inline">نافذة مستقلة</span>
            </a>

            {/* Toggle Fullscreen */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl bg-white hover:bg-[#F1F5F9] text-[#475569] hover:text-[#0F172A] border border-[#CBD5E1] transition-colors cursor-pointer shadow-2xs"
              title={isFullscreen ? 'تصغير النافذة' : 'ملء الشاشة'}
            >
              <HiArrowsExpand className="w-4 h-4" />
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white hover:bg-[#F1F5F9] text-[#475569] hover:text-[#0F172A] border border-[#CBD5E1] transition-colors cursor-pointer shadow-2xs"
              title="إغلاق القارئ"
            >
              <HiX className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Highlighted Document Title Box (Exact match with user requested design) */}
        <div className="px-4 py-2 bg-white border-b border-[#E2E8F0]">
          <div className="rounded-xl border border-sky-200 bg-sky-50 text-[#E11D48] text-center font-black py-2 px-3 text-xs sm:text-sm md:text-base shadow-2xs">
            {file.title}
          </div>
        </div>

        {/* Reader Frame Body */}
        <div className="flex-1 bg-[#F1F5F9] relative overflow-hidden flex flex-col items-center justify-center">
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
            type="application/pdf"
            className="w-full h-full border-0 bg-white"
            title={file.title}
          />
        </div>

      </motion.div>
    </div>
  );
}
