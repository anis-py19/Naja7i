import React, { useState, useEffect, useRef } from 'react';
import { 
  HiX, 
  HiDownload, 
  HiExternalLink, 
  HiArrowsExpand,
  HiDocumentText,
  HiChevronRight,
  HiChevronLeft,
  HiPlus,
  HiMinus,
  HiRefresh,
  HiFolderDownload,
  HiEye,
  HiSparkles
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Configure local worker bundled by Vite for optional Canvas engine
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

/**
 * 🔄 Helper to transform Google Drive URLs to embeddable preview URLs
 */
export function getDrivePreviewUrl(url) {
  if (!url) return null;
  
  // 1. Match file/d/FILE_ID
  const fileMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch && fileMatch[1]) {
    return `https://drive.google.com/file/d/${fileMatch[1]}/preview`;
  }

  // 2. Match open?id=FILE_ID or uc?id=FILE_ID
  const idMatch = url.match(/drive\.google\.com\/(?:open|uc)\?(?:.*&)?id=([a-zA-Z0-9_-]+)/);
  if (idMatch && idMatch[1]) {
    return `https://drive.google.com/file/d/${idMatch[1]}/preview`;
  }

  // 3. Match folder URLs: drive.google.com/drive/folders/FOLDER_ID
  const folderMatch = url.match(/drive\.google\.com\/drive\/(?:u\/\d+\/)?folders\/([a-zA-Z0-9_-]+)/);
  if (folderMatch && folderMatch[1]) {
    return `https://drive.google.com/embeddedfolderview?id=${folderMatch[1]}#grid`;
  }

  return null;
}

/**
 * 🛠️ Resolve safe and properly encoded URL for local or remote files
 */
export function resolveSafeFileUrl(rawUrl) {
  if (!rawUrl) return '';

  let cleaned = rawUrl.trim();

  // If starts with FileFromMe without leading slash
  if (cleaned.startsWith('FileFromMe/')) {
    cleaned = '/' + cleaned;
  } else if (cleaned.startsWith('public/FileFromMe/')) {
    cleaned = '/' + cleaned.replace(/^public\//, '');
  }

  // Encode spaces and Arabic URI components safely
  if (cleaned.startsWith('http://') || cleaned.startsWith('https://')) {
    try {
      return encodeURI(decodeURI(cleaned));
    } catch {
      return cleaned;
    }
  }

  if (cleaned.startsWith('/')) {
    try {
      return encodeURI(decodeURI(cleaned));
    } catch {
      return cleaned;
    }
  }

  return cleaned;
}

export default function PdfReaderModal({ file, isOpen, onClose }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Viewer Engine Mode: 'iframe' (Default & Recommended) | 'google_docs' | 'canvas'
  const [engineMode, setEngineMode] = useState('iframe');
  const [iframeKey, setIframeKey] = useState(0);

  // PDF.js Canvas State (for canvas fallback mode)
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.2);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null);

  if (!isOpen || !file) return null;

  const rawUrl = file.driveUrl || file.fileUrl || file.rawPath || file.url || '';
  const drivePreviewUrl = getDrivePreviewUrl(rawUrl);
  const isGoogleDrive = Boolean(drivePreviewUrl);

  const safeFileUrl = resolveSafeFileUrl(rawUrl);

  // Construct iframe source URL based on file type and engine
  const effectiveIframeSrc = isGoogleDrive
    ? drivePreviewUrl
    : engineMode === 'google_docs' && safeFileUrl.startsWith('http')
      ? `https://docs.google.com/viewer?url=${encodeURIComponent(safeFileUrl)}&embedded=true`
      : `${safeFileUrl}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`;

  const fileName = file.rawFileName || `${file.title || 'document'}.${file.extension || 'pdf'}`;
  const fileSize = file.sizeReadable || file.size || '';
  const isPdf = isGoogleDrive || !file.extension || file.extension.toLowerCase() === 'pdf' || rawUrl.toLowerCase().endsWith('.pdf');

  // Keyboard shortcut (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Load PDF.js only if user explicitly switches to 'canvas' engine
  useEffect(() => {
    if (!isOpen || !file || isGoogleDrive || engineMode !== 'canvas' || !isPdf) return;

    let isMounted = true;

    async function loadCanvasDocument() {
      setLoading(true);
      setError(null);
      setPageNum(1);

      try {
        const response = await fetch(safeFileUrl);
        if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
        const arrayBuffer = await response.arrayBuffer();

        const loadingTask = pdfjsLib.getDocument({
          data: arrayBuffer,
          cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@legacy/cmaps/',
          cMapPacked: true,
          standardFontDataUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@legacy/standard_fonts/'
        });

        const loadedPdf = await loadingTask.promise;

        if (isMounted) {
          setPdfDoc(loadedPdf);
          setNumPages(loadedPdf.numPages);
          setLoading(false);
        }
      } catch (err) {
        console.warn('Canvas PDF load error, reverting to iFrame:', err);
        if (isMounted) {
          setError('تعذر عرض الملف في وضع Canvas، تم التحويل تلقائياً لمستعرض iFrame المباشر.');
          setLoading(false);
          setEngineMode('iframe');
        }
      }
    }

    loadCanvasDocument();

    return () => {
      isMounted = false;
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {}
      }
    };
  }, [file, isOpen, safeFileUrl, engineMode, isPdf, isGoogleDrive]);

  // Render Page on Canvas when in Canvas mode
  useEffect(() => {
    if (engineMode !== 'canvas' || !pdfDoc || !canvasRef.current || loading || error) return;

    let isCancelled = false;

    async function renderPage() {
      try {
        if (renderTaskRef.current) {
          try {
            renderTaskRef.current.cancel();
          } catch {}
        }

        const page = await pdfDoc.getPage(pageNum);
        if (isCancelled) return;

        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };

        renderTaskRef.current = page.render(renderContext);
        await renderTaskRef.current.promise;
      } catch (err) {
        if (err?.name !== 'RenderingCancelledException') {
          console.error('Page render error:', err);
        }
      }
    }

    renderPage();

    return () => {
      isCancelled = true;
    };
  }, [pdfDoc, pageNum, scale, loading, error, engineMode]);

  const handleDownload = (e) => {
    e.stopPropagation();
    const targetUrl = isGoogleDrive ? rawUrl : safeFileUrl;
    const link = document.createElement('a');
    link.href = targetUrl;
    link.download = fileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReloadIframe = () => {
    setIframeKey(prev => prev + 1);
  };

  const changePage = (offset) => {
    setPageNum(prev => Math.min(Math.max(prev + offset, 1), numPages));
  };

  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 2.5));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.6));

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-4 bg-slate-950/85 backdrop-blur-xs font-['Cairo']"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.15 }}
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full bg-white border border-[#E2E8F0] rounded-2xl shadow-2xl flex flex-col transition-all overflow-hidden ${
            isFullscreen 
              ? 'fixed inset-1 sm:inset-2 z-50 h-[calc(100vh-8px)] sm:h-[calc(100vh-16px)] max-w-none' 
              : 'max-w-6xl h-[94vh]'
          }`}
        >
          
          {/* 1. Header Toolbar */}
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
                  <span className="text-rose-300 font-bold">{file.subjectName}</span>
                  {isGoogleDrive ? (
                    <span className="text-blue-400 font-bold">• Google Drive Embed</span>
                  ) : (
                    <span className="text-emerald-400 font-bold">• مستعرض iFrame التفاعلي</span>
                  )}
                  {fileSize && <span>• {fileSize}</span>}
                  {file.author && <span className="hidden sm:inline">• {file.author}</span>}
                </div>
              </div>
            </div>

            {/* Viewer Navigation & Zoom (Canvas mode only) */}
            {engineMode === 'canvas' && !isGoogleDrive && isPdf && !loading && numPages > 0 && (
              <div className="flex items-center gap-1 bg-slate-800/90 border border-slate-700 rounded-xl px-2 py-1">
                <button
                  onClick={() => changePage(-1)}
                  disabled={pageNum <= 1}
                  className="p-1 rounded-lg hover:bg-slate-700 text-slate-200 disabled:opacity-40 cursor-pointer"
                  title="الصفحة السابقة"
                >
                  <HiChevronRight className="w-4 h-4" />
                </button>

                <div className="text-xs font-bold px-1.5 text-white flex items-center gap-1">
                  <span>{pageNum}</span>
                  <span className="text-slate-400">/</span>
                  <span className="text-slate-400">{numPages}</span>
                </div>

                <button
                  onClick={() => changePage(1)}
                  disabled={pageNum >= numPages}
                  className="p-1 rounded-lg hover:bg-slate-700 text-slate-200 disabled:opacity-40 cursor-pointer"
                  title="الصفحة التالية"
                >
                  <HiChevronLeft className="w-4 h-4" />
                </button>

                <div className="w-px h-4 bg-slate-700 mx-1" />

                <button
                  onClick={zoomOut}
                  className="p-1 rounded-lg hover:bg-slate-700 text-slate-200 cursor-pointer"
                  title="تصغير"
                >
                  <HiMinus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={zoomIn}
                  className="p-1 rounded-lg hover:bg-slate-700 text-slate-200 cursor-pointer"
                  title="تكبير"
                >
                  <HiPlus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Action Tools & Engine Switcher */}
            <div className="flex items-center gap-1.5 shrink-0">
              
              {/* Reload iFrame Button */}
              {engineMode === 'iframe' && (
                <button
                  onClick={handleReloadIframe}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                  title="إعادة تحميل المستند"
                >
                  <HiRefresh className="w-4 h-4" />
                </button>
              )}

              {/* Direct Download Button */}
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 rounded-xl bg-[#E11D48] hover:bg-[#be123c] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                title="تحميل الملف أو فتحه في Drive"
              >
                <HiDownload className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isGoogleDrive ? 'فتح في Drive' : 'تحميل الملف'}</span>
              </button>

              {/* Open in new tab */}
              <a
                href={isGoogleDrive ? rawUrl : safeFileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                title="فتح الملف في نافذة مستقلة"
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
                title="إغلاق المستعرض (Esc)"
              >
                <HiX className="w-4 h-4" />
              </button>

            </div>

          </div>

          {/* 2. Reader Body Area */}
          <div className="flex-1 bg-[#1E293B] relative overflow-hidden flex flex-col items-center justify-start p-0 select-none">
            
            {/* Direct High-Performance iFrame Reader (DEFAULT & RECOMMENDED) */}
            {engineMode === 'iframe' && (
              <div className="w-full h-full bg-white relative">
                <iframe
                  key={iframeKey}
                  src={effectiveIframeSrc}
                  className="w-full h-full border-0 bg-white block"
                  allow="autoplay; fullscreen"
                  title={file.title || 'Naja7i Document Reader'}
                />
              </div>
            )}

            {/* Non-PDF Files Card */}
            {!isPdf && engineMode !== 'iframe' && (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl border border-slate-700 m-4 max-w-md space-y-4">
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
                </div>
              </div>
            )}

            {/* Canvas Mode (Optional fallback) */}
            {engineMode === 'canvas' && (
              <div className="w-full h-full overflow-auto flex flex-col items-center justify-start p-4">
                {loading && (
                  <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-white space-y-3">
                    <div className="w-10 h-10 border-3 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <h4 className="text-sm font-bold">جاري تجهيز صفحات المستند...</h4>
                  </div>
                )}

                {error && (
                  <div className="p-6 bg-white rounded-2xl border border-slate-700 text-center space-y-3 m-4 max-w-md">
                    <div className="text-3xl">⚠️</div>
                    <p className="text-xs text-[#64748B]">{error}</p>
                    <button
                      onClick={() => setEngineMode('iframe')}
                      className="px-4 py-2 rounded-xl bg-[#E11D48] text-white text-xs font-bold"
                    >
                      العودة للمستعرض المباشر
                    </button>
                  </div>
                )}

                {!loading && !error && (
                  <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-slate-700 max-w-full">
                    <canvas ref={canvasRef} className="max-w-full h-auto block" />
                  </div>
                )}
              </div>
            )}

          </div>

          {/* 3. Footer Bar */}
          <div className="px-4 py-2 bg-[#0F172A] border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
            <div className="flex items-center gap-2 truncate">
              <span>إعداد: <strong className="text-slate-200">{file.author || 'نخبة الأساتذة'}</strong></span>
              <span>•</span>
              <span className="text-rose-400 font-medium truncate">{file.category || 'ملخص دراسي'}</span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {/* Quick Engine Switcher Link */}
              <button
                onClick={() => setEngineMode(engineMode === 'iframe' ? 'canvas' : 'iframe')}
                className="text-[10px] text-slate-400 hover:text-rose-300 underline cursor-pointer"
              >
                {engineMode === 'iframe' ? 'تبديل لوضع Canvas' : 'تبديل لمستعرض iFrame المباشر'}
              </button>
              <span className="text-[10px] text-slate-500 hidden sm:inline">منصة نجاحي — قراءة وتصفح فوري 🇩🇿</span>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
