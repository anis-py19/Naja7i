import React, { useState, useEffect } from 'react';
import { 
  HiX, 
  HiDownload, 
  HiExternalLink, 
  HiEye, 
  HiArrowsExpand,
  HiDocumentText,
  HiSparkles,
  HiRefresh,
  HiInformationCircle,
  HiCheckCircle
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { downloadPdfFile } from '../utils/downloadHelper';

export default function PdfReaderModal({ file, isOpen, onClose }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [viewerKey, setViewerKey] = useState(Date.now());
  const [viewerMode, setViewerMode] = useState('native'); // 'native' | 'google'

  useEffect(() => {
    if (file) {
      setViewerKey(Date.now());
      setDownloadSuccess(false);
      setIsDownloading(false);
    }
  }, [file]);

  if (!isOpen || !file) return null;

  const handleDownload = async (e) => {
    if (e) e.preventDefault();
    setIsDownloading(true);
    const fileName = file.rawFileName || `${file.title}.pdf`;
    
    await downloadPdfFile(file.fileUrl, fileName);
    
    setIsDownloading(false);
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 3000);
  };

  // Resolve absolute or relative URL
  const resolvedPdfUrl = file.fileUrl.startsWith('http') 
    ? file.fileUrl 
    : window.location.origin + file.fileUrl;

  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(resolvedPdfUrl)}&embedded=true`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs font-['Cairo']">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        className={`relative w-full bg-white border border-[#FFE5BF] rounded-3xl shadow-2xl flex flex-col transition-all overflow-hidden text-right ${
          isFullscreen 
            ? 'fixed inset-2 z-50 h-[calc(100vh-16px)] max-w-none rounded-2xl' 
            : 'max-w-5xl h-[90vh]'
        }`}
      >
        {/* Reader Top Bar */}
        <div className="px-4 py-3 sm:px-6 sm:py-3.5 bg-[#FFFAF3] border-b border-[#FFE5BF] flex flex-wrap items-center justify-between gap-3 shrink-0">
          
          {/* File Metadata Info */}
          <div className="flex items-center gap-3 min-w-0 max-w-[60%] sm:max-w-[70%]">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF2DB] border border-[#FFE5BF] text-[#F62440] flex items-center justify-center text-xl shrink-0 shadow-2xs">
              <HiDocumentText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FFF2DB] text-[#F62440] border border-[#FFE5BF]">
                  {file.subjectName || 'ملخص دراسي'}
                </span>
                {file.sizeReadable && (
                  <span className="text-[11px] text-[#78716c] font-mono">
                    {file.sizeReadable}
                  </span>
                )}
                {file.category && (
                  <span className="hidden md:inline-block text-[10px] text-[#57534e] px-2 py-0.5 rounded bg-white border border-[#FFE5BF]">
                    {file.category}
                  </span>
                )}
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#1c1917] truncate" title={file.title}>
                {file.title}
              </h3>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Direct Download Button */}
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer disabled:opacity-50 ${
                downloadSuccess 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-[#F62440] hover:bg-[#d81b34] text-white'
              }`}
              title="تحميل الملف مباشرة بصيغة PDF"
            >
              {downloadSuccess ? (
                <>
                  <HiCheckCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">تم التحميل!</span>
                </>
              ) : (
                <>
                  <HiDownload className="w-4 h-4" />
                  <span>{isDownloading ? 'جاري التحميل...' : 'تحميل PDF'}</span>
                </>
              )}
            </button>

            {/* Open in Separate Tab */}
            <a
              href={file.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-white hover:bg-[#FFF2DB] text-[#57534e] hover:text-[#1c1917] border border-[#FFE5BF] transition-colors cursor-pointer shadow-2xs"
              title="فتح في تبويب مستقل"
            >
              <HiExternalLink className="w-4 h-4" />
            </a>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl bg-white hover:bg-[#FFF2DB] text-[#57534e] hover:text-[#1c1917] border border-[#FFE5BF] transition-colors cursor-pointer hidden sm:block shadow-2xs"
              title={isFullscreen ? 'تصغير النافذة' : 'ملء الشاشة'}
            >
              <HiArrowsExpand className="w-4 h-4" />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white hover:bg-[#FFF2DB] text-[#78716c] hover:text-[#1c1917] border border-[#FFE5BF] transition-colors cursor-pointer shadow-2xs"
              title="إغلاق القارئ"
            >
              <HiX className="w-5 h-5" />
            </button>

          </div>

        </div>

        {/* Embedded PDF Viewer Container */}
        <div className="flex-1 w-full h-full bg-[#334155] relative flex flex-col">
          
          <iframe
            key={viewerKey}
            src={viewerMode === 'native' 
              ? `${file.fileUrl}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`
              : googleViewerUrl
            }
            className="w-full h-full border-none flex-1"
            title={file.title}
          />

          {/* Mobile Direct Download Fallback Reminder */}
          <div className="sm:hidden bg-[#FFFAF3] border-t border-[#FFE5BF] px-3 py-2 flex items-center justify-between text-xs">
            <span className="text-[11px] text-[#78716c] truncate">
              لا يظهر الملف على هاتفك؟
            </span>
            <div className="flex items-center gap-2">
              <a
                href={file.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="px-2 py-1 rounded bg-white text-[#1c1917] border border-[#FFE5BF] font-bold text-[10px]"
              >
                فتح بملء الشاشة
              </a>
              <button
                onClick={handleDownload}
                className="px-2 py-1 rounded bg-[#F62440] text-white font-bold text-[10px]"
              >
                تحميل
              </button>
            </div>
          </div>

        </div>

        {/* Reader Bottom Bar */}
        <div className="px-4 py-2 bg-[#FFFAF3] border-t border-[#FFE5BF] flex items-center justify-between text-xs text-[#78716c] shrink-0">
          <div className="flex items-center gap-2">
            <span>المؤلف / المصدر:</span>
            <strong className="text-[#1c1917]">{file.author || 'نخبة أساتذة الجزائر'}</strong>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewerMode(viewerMode === 'native' ? 'google' : 'native')}
              className="text-[11px] text-[#F62440] hover:underline cursor-pointer font-bold"
            >
              {viewerMode === 'native' ? '🔄 التبديل إلى عارض السحابة' : '🔄 التبديل إلى القارئ المباشر'}
            </button>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline text-[11px]">
              استخدم أزرار القارئ المدمجة للتدوير، التكبير، والبحث في الصفحات
            </span>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
