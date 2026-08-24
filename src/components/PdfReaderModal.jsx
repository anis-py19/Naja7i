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
  HiFolderDownload
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import * as pdfjsLib from 'pdfjs-dist';

// Set worker source
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '3.11.174'}/pdf.worker.min.js`;
}

export default function PdfReaderModal({ file, isOpen, onClose }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewerMode, setViewerMode] = useState('canvas'); // 'canvas' | 'native'

  // PDF.js State
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.2);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Blob URL for native mode
  const [blobUrl, setBlobUrl] = useState(null);

  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null);

  if (!isOpen || !file) return null;

  const rawUrl = file.fileUrl || file.rawPath || file.url || '';
  const fileName = file.rawFileName || `${file.title || 'document'}.${file.extension || 'pdf'}`;
  const fileSize = file.sizeReadable || file.size || '';
  const isPdf = !file.extension || file.extension.toLowerCase() === 'pdf' || rawUrl.toLowerCase().endsWith('.pdf');

  // Load PDF with PDF.js and Fetch Blob
  useEffect(() => {
    if (!isOpen || !file || !isPdf) return;

    let isMounted = true;
    let createdBlobUrl = null;

    async function loadDocument() {
      setLoading(true);
      setError(null);
      setPageNum(1);

      try {
        // 1. Fetch file as arrayBuffer / Blob to prevent IDM interception
        const response = await fetch(rawUrl);
        if (!response.ok) throw new Error('فشل جلب ملف الـ PDF من الخادم');
        const arrayBuffer = await response.arrayBuffer();
        
        // Create Blob for native viewer mode
        const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
        createdBlobUrl = URL.createObjectURL(blob);
        if (isMounted) {
          setBlobUrl(createdBlobUrl);
        }

        // 2. Load into PDF.js
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const loadedPdf = await loadingTask.promise;

        if (isMounted) {
          setPdfDoc(loadedPdf);
          setNumPages(loadedPdf.numPages);
          setLoading(false);
        }
      } catch (err) {
        console.error('PDF load error:', err);
        if (isMounted) {
          setError('تعذر تحميل وتصيير ملف الـ PDF داخل المستعرض.');
          setLoading(false);
        }
      }
    }

    loadDocument();

    return () => {
      isMounted = false;
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {}
      }
      if (createdBlobUrl) {
        URL.revokeObjectURL(createdBlobUrl);
      }
    };
  }, [file, isOpen, rawUrl, isPdf]);

  // Render Current Page on Canvas
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current || loading || error || viewerMode !== 'canvas') return;

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
  }, [pdfDoc, pageNum, scale, loading, error, viewerMode]);

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

  const changePage = (offset) => {
    setPageNum(prev => Math.min(Math.max(prev + offset, 1), numPages));
  };

  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 2.5));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.6));

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
                  {fileSize && <span>• {fileSize}</span>}
                  {file.author && <span className="hidden sm:inline">• {file.author}</span>}
                </div>
              </div>
            </div>

            {/* Viewer Navigation & Zoom Controls (Only for Canvas mode) */}
            {isPdf && !loading && !error && viewerMode === 'canvas' && numPages > 0 && (
              <div className="flex items-center gap-1 bg-slate-800/90 border border-slate-700 rounded-xl px-2 py-1">
                {/* Previous Page */}
                <button
                  onClick={() => changePage(-1)}
                  disabled={pageNum <= 1}
                  className="p-1 rounded-lg hover:bg-slate-700 text-slate-200 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer transition-colors"
                  title="الصفحة السابقة"
                >
                  <HiChevronRight className="w-4 h-4" />
                </button>

                {/* Page Counter */}
                <div className="text-xs font-mono font-bold px-1.5 text-white flex items-center gap-1">
                  <span>{pageNum}</span>
                  <span className="text-slate-400">/</span>
                  <span className="text-slate-400">{numPages}</span>
                </div>

                {/* Next Page */}
                <button
                  onClick={() => changePage(1)}
                  disabled={pageNum >= numPages}
                  className="p-1 rounded-lg hover:bg-slate-700 text-slate-200 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer transition-colors"
                  title="الصفحة التالية"
                >
                  <HiChevronLeft className="w-4 h-4" />
                </button>

                <div className="w-px h-4 bg-slate-700 mx-1" />

                {/* Zoom Out */}
                <button
                  onClick={zoomOut}
                  className="p-1 rounded-lg hover:bg-slate-700 text-slate-200 cursor-pointer transition-colors"
                  title="تصغير"
                >
                  <HiMinus className="w-3.5 h-3.5" />
                </button>

                {/* Zoom Level */}
                <span className="text-[11px] font-mono font-bold px-1 text-slate-300">
                  {Math.round(scale * 100)}%
                </span>

                {/* Zoom In */}
                <button
                  onClick={zoomIn}
                  className="p-1 rounded-lg hover:bg-slate-700 text-slate-200 cursor-pointer transition-colors"
                  title="تكبير"
                >
                  <HiPlus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

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

              {/* Open in new tab (using Blob to prevent IDM) */}
              <a
                href={blobUrl || rawUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                title="فتح في لسان مستقل"
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

          {/* 2. Reader Body Area */}
          <div className="flex-1 bg-[#1E293B] relative overflow-auto flex flex-col items-center justify-start p-2 sm:p-4 select-none">
            
            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-white space-y-3">
                <div className="w-10 h-10 border-3 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <h4 className="text-sm font-bold">جاري فتح وتجهيز المستعرض...</h4>
                <p className="text-xs text-slate-400 max-w-xs">
                  يتم تحميل وقراءة صفحات الـ PDF مباشرة داخل المتصفح بدون برامج خارجية.
                </p>
              </div>
            )}

            {error && (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl border border-slate-700 m-4 max-w-md space-y-3">
                <div className="text-3xl">⚠️</div>
                <h4 className="text-sm font-bold text-[#0F172A]">{error}</h4>
                <p className="text-xs text-[#64748B]">
                  يمكنك تحميل الملف مباشرة أو فتحه في علامة تبويب جديدة.
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={handleDownload}
                    className="px-4 py-2 rounded-xl bg-[#E11D48] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <HiDownload className="w-4 h-4" />
                    <span>تحميل الملف الآن</span>
                  </button>
                  <a
                    href={blobUrl || rawUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-slate-100 text-[#0F172A] text-xs font-bold flex items-center gap-1.5"
                  >
                    <HiExternalLink className="w-4 h-4" />
                    <span>فتح الرابط</span>
                  </a>
                </div>
              </div>
            )}

            {/* Non-PDF Files (e.g. DOCX / RAR) */}
            {!isPdf && !loading && (
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

            {/* Pure In-App Canvas PDF Renderer (100% IDM immune) */}
            {isPdf && !loading && !error && (
              <div className="flex flex-col items-center justify-center max-w-full">
                <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-slate-700 max-w-full">
                  <canvas 
                    ref={canvasRef} 
                    className="max-w-full h-auto block"
                  />
                </div>
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

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] text-slate-500">منصة نجاحي — مستعرض مدمج 🇩🇿</span>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
