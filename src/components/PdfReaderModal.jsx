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
            : 'max-w-5xl h-[90vh]'
        }`}
      >
        {/* Reader Header */}
        <div className="px-4 py-3 sm:px-6 sm:py-3.5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] text-[#E11D48] flex items-center justify-center text-lg shrink-0 shadow-2xs">
              <HiDocumentText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white text-[#E11D48] border border-[#E2E8F0]">
                  {file.subjectName || 'ملخص دراسي'}
                </span>
                {fileSize && (
                  <span className="text-[11px] text-[#64748B] font-mono">
                    {fileSize}
                  </span>
                )}
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A] truncate mt-0.5">
                {file.title}
              </h3>
            </div>
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
              title="فتح في لسان جديد"
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

        {/* Reader Frame Body */}
        <div className="flex-1 bg-[#F1F5F9] relative overflow-hidden flex flex-col items-center justify-center">
          <object
            data={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
            type="application/pdf"
            className="w-full h-full border-0 bg-white"
          >
            {/* Fallback for browsers that don't support embedded PDF */}
            <div className="p-8 text-center space-y-4 max-w-md bg-white rounded-2xl border border-[#E2E8F0] shadow-sm m-4">
              <div className="text-4xl">📄</div>
              <h4 className="text-base font-bold text-[#0F172A]">معاينة المستند</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                متصفحك لا يدعم عرض ملفات PDF مباشرة داخل النافذة. يمكنك فتح المستند في نافذة جديدة أو تحميله مباشرة.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <HiExternalLink className="w-4 h-4" />
                  <span>فتح في علامة تبويب جديدة</span>
                </a>
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 rounded-xl bg-[#E11D48] text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <HiDownload className="w-4 h-4" />
                  <span>تحميل مباشر</span>
                </button>
              </div>
            </div>
          </object>
        </div>

        {/* Reader Footer Info */}
        <div className="px-4 py-2.5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
          <div className="flex items-center gap-2">
            <span>إعداد: <strong className="text-[#0F172A]">{file.author || 'نخبة الأساتذة'}</strong></span>
            <span>•</span>
            <span className="text-[#E11D48] font-medium">{file.category || 'ملخص دراسي'}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px]">منصة نجاحي — فضاء البكالوريا الجزائرية 🇩🇿</span>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
