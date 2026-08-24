import React, { useState, useEffect, useRef } from 'react';
import { 
  HiX, 
  HiDownload, 
  HiExternalLink, 
  HiArrowsExpand,
  HiChevronRight,
  HiChevronLeft,
  HiPlus,
  HiMinus,
  HiDocumentText,
  HiRefresh
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

// Configure Mozilla PDF.js Worker for Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function PdfReaderModal({ file, isOpen, onClose }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.2);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  
  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null);

  const rawUrl = file?.fileUrl || file?.url || '';
  const safePdfUrl = rawUrl ? encodeURI(rawUrl) : '';
  const fileName = file?.rawFileName || `${file?.title || 'document'}.pdf`;
  const fileSize = file?.sizeReadable || file?.size || '';

  // Load PDF Document when file changes
  useEffect(() => {
    if (!isOpen || !rawUrl) {
      setPdfDoc(null);
      setPageNum(1);
      setNumPages(0);
      setIsLoading(true);
      setErrorMsg(null);
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    setErrorMsg(null);
    setPageNum(1);

    const loadDocument = async () => {
      try {
        // Fetch document as arrayBuffer for 100% bulletproof loading
        const response = await fetch(safePdfUrl);
        if (!response.ok) {
          throw new Error(`تعذر تحميل الملف (كود: ${response.status})`);
        }
        const arrayBuffer = await response.arrayBuffer();

        const loadingTask = pdfjsLib.getDocument({
          data: arrayBuffer,
          cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@5.0.0/cmaps/',
          cMapPacked: true,
        });

        const doc = await loadingTask.promise;
        if (isMounted) {
          setPdfDoc(doc);
          setNumPages(doc.numPages);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('PDF loading error:', err);
        if (isMounted) {
          setIsLoading(false);
          setErrorMsg('تعذر عرض المستند داخل القارئ، يمكنك تحميله مباشرة أو فتحه في نافذة جديدة.');
        }
      }
    };

    loadDocument();

    return () => {
      isMounted = false;
    };
  }, [isOpen, rawUrl, safePdfUrl]);

  // Render Page to Canvas
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    let isRenderCancelled = false;

    const renderPage = async () => {
      try {
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }

        const page = await pdfDoc.getPage(pageNum);
        if (isRenderCancelled) return;

        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;

        // Set dimensions for high-DPI crisp rendering
        canvas.width = Math.floor(viewport.width * dpr);
        canvas.height = Math.floor(viewport.height * dpr);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        context.setTransform(dpr, 0, 0, dpr, 0, 0);

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;
        await renderTask.promise;
      } catch (err) {
        if (err?.name !== 'RenderingCancelledException') {
          console.error('Error rendering page:', err);
        }
      }
    };

    renderPage();

    return () => {
      isRenderCancelled = true;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
    };
  }, [pdfDoc, pageNum, scale]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (pageNum < numPages) setPageNum((p) => p + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (pageNum > 1) setPageNum((p) => p - 1);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, pageNum, numPages, onClose]);

  if (!isOpen || !file) return null;

  const handleDownload = (e) => {
    e?.stopPropagation?.();
    const link = document.createElement('a');
    link.href = safePdfUrl;
    link.download = fileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleZoomIn = () => setScale((s) => Math.min(2.5, s + 0.2));
  const handleZoomOut = () => setScale((s) => Math.max(0.6, s - 0.2));
  const handleResetZoom = () => setScale(1.2);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs font-['Cairo']">
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
          
          {/* 1. Header Bar */}
          <div className="px-4 py-3 bg-[#0F172A] text-white flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-slate-800 text-[#E11D48] flex items-center justify-center text-lg shrink-0 border border-slate-700">
                <HiDocumentText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                    {file.subjectName || 'ملخص دراسي'}
                  </span>
                  {fileSize && (
                    <span className="text-[10px] text-slate-400 font-mono">
                      {fileSize}
                    </span>
                  )}
                </div>
                <h3 className="text-xs sm:text-sm font-black text-white truncate mt-0.5">
                  {file.title}
                </h3>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="px-3.5 py-1.5 rounded-lg bg-[#E11D48] hover:bg-[#be123c] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer active:scale-95"
                title="تحميل مباشر للملف على جهازك"
              >
                <HiDownload className="w-4 h-4" />
                <span>تحميل PDF</span>
              </button>

              <a
                href={safePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                title="فتح في لسان مستقل كامل"
              >
                <HiExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">نافذة مستقلة</span>
              </a>

              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                title={isFullscreen ? 'تصغير' : 'ملء الشاشة'}
              >
                <HiArrowsExpand className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-slate-800 hover:bg-rose-900 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                title="إغلاق القارئ (Esc)"
              >
                <HiX className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2. Reader Toolbar (Page Switcher & Zoom Controls) */}
          <div className="px-4 py-2 bg-[#F8FAFC] border-b border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3 text-xs text-[#0F172A] shrink-0">
            {/* Page Navigation */}
            <div className="flex items-center gap-2 font-bold">
              <button
                onClick={() => setPageNum((p) => Math.max(1, p - 1))}
                disabled={pageNum <= 1 || isLoading}
                className="px-2.5 py-1.5 rounded-lg bg-white border border-[#CBD5E1] hover:bg-[#F1F5F9] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1 shadow-2xs"
                title="الصفحة السابقة (سهم يسار)"
              >
                <HiChevronRight className="w-4 h-4" />
                <span className="hidden sm:inline">السابق</span>
              </button>

              <div className="flex items-center gap-1 px-3 py-1 bg-white border border-[#CBD5E1] rounded-lg shadow-2xs font-mono">
                <span>صفحة</span>
                <span className="font-black text-[#E11D48]">{pageNum}</span>
                <span>من</span>
                <span>{numPages || '...'}</span>
              </div>

              <button
                onClick={() => setPageNum((p) => Math.min(numPages, p + 1))}
                disabled={pageNum >= numPages || isLoading}
                className="px-2.5 py-1.5 rounded-lg bg-white border border-[#CBD5E1] hover:bg-[#F1F5F9] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1 shadow-2xs"
                title="الصفحة التالية (سهم يمين)"
              >
                <span className="hidden sm:inline">التالي</span>
                <HiChevronLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1.5 font-bold">
              <button
                onClick={handleZoomOut}
                disabled={isLoading || scale <= 0.6}
                className="p-1.5 rounded-lg bg-white border border-[#CBD5E1] hover:bg-[#F1F5F9] disabled:opacity-40 cursor-pointer shadow-2xs"
                title="تصغير (-)"
              >
                <HiMinus className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleResetZoom}
                className="px-2 py-1 rounded-lg bg-white border border-[#CBD5E1] hover:bg-[#F1F5F9] font-mono text-[11px] cursor-pointer shadow-2xs"
                title="إعادة التعيين إلى 100%"
              >
                {Math.round((scale / 1.2) * 100)}%
              </button>

              <button
                onClick={handleZoomIn}
                disabled={isLoading || scale >= 2.5}
                className="p-1.5 rounded-lg bg-white border border-[#CBD5E1] hover:bg-[#F1F5F9] disabled:opacity-40 cursor-pointer shadow-2xs"
                title="تكبير (+)"
              >
                <HiPlus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 3. Main Viewer Scroll Viewport */}
          <div className="flex-1 bg-[#475569]/10 relative overflow-auto p-3 sm:p-6 flex flex-col items-center justify-start min-h-[300px]">
            
            {/* Loading Spinner */}
            {isLoading && (
              <div className="my-auto flex flex-col items-center justify-center gap-3 p-8 bg-white/90 rounded-2xl border border-[#E2E8F0] shadow-md">
                <div className="w-10 h-10 border-3 border-[#CBD5E1] border-t-[#E11D48] rounded-full animate-spin" />
                <span className="text-xs font-bold text-[#0F172A]">جاري قراءة صفحات المستند وعرضها...</span>
                <span className="text-[11px] text-[#64748B]">يرجى الانتظار بضع لحظات</span>
              </div>
            )}

            {/* Error Fallback */}
            {!isLoading && errorMsg && (
              <div className="my-auto max-w-md p-6 bg-white rounded-2xl border border-[#E2E8F0] shadow-md text-center space-y-4">
                <div className="text-4xl">📄</div>
                <h4 className="text-sm font-bold text-[#0F172A]">تعذر العرض التلقائي داخل القارئ</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {errorMsg}
                </p>
                <div className="flex items-center justify-center gap-2 pt-2">
                  <a
                    href={safePdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <HiExternalLink className="w-4 h-4" />
                    <span>فتح في لسان جديد</span>
                  </a>
                  <button
                    onClick={handleDownload}
                    className="px-4 py-2 rounded-xl bg-[#E11D48] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <HiDownload className="w-4 h-4" />
                    <span>تحميل مباشر</span>
                  </button>
                </div>
              </div>
            )}

            {/* Canvas Page Element */}
            <div className={`transition-all duration-150 ${isLoading || errorMsg ? 'hidden' : 'block'}`}>
              <canvas
                ref={canvasRef}
                className="bg-white shadow-xl rounded-md border border-slate-300 max-w-full"
              />
            </div>

          </div>

          {/* 4. Footer Info Bar */}
          <div className="px-4 py-2 bg-white border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B] shrink-0">
            <div className="flex items-center gap-2">
              <span>إعداد: <strong className="text-[#0F172A]">{file.author || 'نخبة أساتذة الجزائر'}</strong></span>
              <span>•</span>
              <span className="text-[#E11D48] font-bold">{file.category || 'ملخص شامل'}</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-[11px] text-[#94A3B8]">
              <span>💡 يمكنك استخدام أزرار الأسهم ⬅️ ➡️ للتنقل بين الصفحات</span>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
