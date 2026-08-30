import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  HiX, 
  HiDownload, 
  HiExternalLink, 
  HiArrowsExpand,
  HiDocumentText,
  HiCheckCircle,
  HiViewGrid,
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiFolder,
  HiChevronRight,
  HiChevronLeft,
  HiFilter,
  HiRefresh
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { BAC_FULL_ARCHIVE, BAC_DRIVE_ROOT, BAC_DRIVE_YEARS } from '../data/bacArchiveFullData';
import { STREAMS } from '../data/streamsData';
import { getDrivePreviewUrl } from '../utils/driveUtils';

export default function BacDualViewerModal({ 
  isOpen, 
  onClose, 
  initialItem = null,
  initialMode = 'dual' // 'dual', 'sujet', 'corrige'
}) {
  const [selectedItemId, setSelectedItemId] = useState(initialItem?.id || null);
  const [viewMode, setViewMode] = useState(initialMode); // 'dual', 'sujet', 'corrige'
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Sync initial item when opened
  useEffect(() => {
    if (initialItem) {
      setSelectedItemId(initialItem.id);
    }
  }, [initialItem]);

  // Current Active BAC Item from Archive
  const currentItem = useMemo(() => {
    if (!selectedItemId) return initialItem || BAC_FULL_ARCHIVE[0];
    return BAC_FULL_ARCHIVE.find(i => i.id === selectedItemId) || initialItem || BAC_FULL_ARCHIVE[0];
  }, [selectedItemId, initialItem]);

  // Available subjects for the same stream & year
  const relatedItems = useMemo(() => {
    if (!currentItem) return [];
    return BAC_FULL_ARCHIVE.filter(i => 
      i.year === currentItem.year && i.streamId === currentItem.streamId
    );
  }, [currentItem]);

  // Available years
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(BAC_FULL_ARCHIVE.map(i => i.year)));
    return years.sort((a, b) => b - a);
  }, []);

  // Quick navigation handlers
  const handleYearChange = (newYear) => {
    const match = BAC_FULL_ARCHIVE.find(i => 
      i.year === parseInt(newYear) && 
      i.streamId === currentItem.streamId && 
      i.subjectId === currentItem.subjectId
    ) || BAC_FULL_ARCHIVE.find(i => i.year === parseInt(newYear) && i.streamId === currentItem.streamId)
      || BAC_FULL_ARCHIVE.find(i => i.year === parseInt(newYear));

    if (match) {
      setSelectedItemId(match.id);
    }
  };

  const handleSubjectChange = (newSubjId) => {
    const match = BAC_FULL_ARCHIVE.find(i => 
      i.year === currentItem.year && 
      i.streamId === currentItem.streamId && 
      i.subjectId === newSubjId
    );
    if (match) {
      setSelectedItemId(match.id);
    }
  };

  const handleStreamChange = (newStreamId) => {
    const match = BAC_FULL_ARCHIVE.find(i => 
      i.year === currentItem.year && 
      i.streamId === newStreamId && 
      i.subjectId === currentItem.subjectId
    ) || BAC_FULL_ARCHIVE.find(i => i.year === currentItem.year && i.streamId === newStreamId);

    if (match) {
      setSelectedItemId(match.id);
    }
  };

  if (!isOpen || !currentItem) return null;

  const sujetUrl = currentItem.sujetUrl || currentItem.sujetOnlineUrl || '';
  const corrigeUrl = currentItem.corrigeUrl || currentItem.corrigeOnlineUrl || '';

  // Get Google Drive preview URL or direct file iframe URL
  const getFrameSrc = (url) => {
    if (!url) return '';
    if (url.includes('drive.google.com')) {
      return getDrivePreviewUrl(url);
    }
    // Direct local or online PDF
    return url;
  };

  const sujetFrameSrc = getFrameSrc(sujetUrl);
  const corrigeFrameSrc = getFrameSrc(corrigeUrl);

  const driveYearUrl = currentItem.driveFolderUrl || (
    BAC_DRIVE_YEARS[currentItem.year] 
      ? `https://drive.google.com/drive/folders/${BAC_DRIVE_YEARS[currentItem.year]}` 
      : BAC_DRIVE_ROOT
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs font-['Cairo']" dir="rtl">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          className={`relative w-full bg-[#0F172A] border border-[#334155] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white transition-all ${
            isFullscreen 
              ? 'fixed inset-0 rounded-none z-50 h-screen max-h-screen' 
              : 'max-w-7xl h-[92vh] max-h-[92vh]'
          }`}
        >
          {/* Header Bar */}
          <div className="bg-[#1E293B] border-b border-[#334155] px-4 py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
            
            {/* Title & Selectors */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48] animate-pulse"></span>
                <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                  <span>عارض البكالوريا المزدوج 📄</span>
                </h2>
              </div>

              {/* Stream Selector */}
              <select
                value={currentItem.streamId}
                onChange={(e) => handleStreamChange(e.target.value)}
                className="bg-[#0F172A] border border-[#475569] text-white text-xs rounded-lg px-2.5 py-1 font-medium focus:outline-none focus:border-[#E11D48] cursor-pointer"
              >
                {STREAMS.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>

              {/* Year Selector */}
              <select
                value={currentItem.year}
                onChange={(e) => handleYearChange(e.target.value)}
                className="bg-[#0F172A] border border-[#475569] text-white text-xs font-mono rounded-lg px-2 py-1 font-bold focus:outline-none focus:border-[#E11D48] cursor-pointer"
              >
                {availableYears.map(yr => (
                  <option key={yr} value={yr}>دورة {yr}</option>
                ))}
              </select>

              {/* Subject Selector */}
              <select
                value={currentItem.subjectId}
                onChange={(e) => handleSubjectChange(e.target.value)}
                className="bg-[#0F172A] border border-[#475569] text-white text-xs rounded-lg px-2.5 py-1 font-medium focus:outline-none focus:border-[#E11D48] cursor-pointer max-w-[140px] truncate"
              >
                {relatedItems.map(item => (
                  <option key={item.id} value={item.subjectId}>{item.subjectName}</option>
                ))}
              </select>
            </div>

            {/* View Mode Switcher & Top Actions */}
            <div className="flex items-center justify-between sm:justify-end gap-2">
              
              {/* Dual / Single Mode Pills */}
              <div className="bg-[#0F172A] p-1 rounded-xl border border-[#334155] flex items-center gap-1">
                <button
                  onClick={() => setViewMode('dual')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer ${
                    viewMode === 'dual'
                      ? 'bg-[#E11D48] text-white shadow-2xs'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                  title="عرض الموضوع والتصحيح معاً جنباً إلى جنب"
                >
                  <HiViewGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">الموضوع + التصحيح</span>
                  <span className="sm:hidden">مزدوج</span>
                </button>

                <button
                  onClick={() => setViewMode('sujet')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer ${
                    viewMode === 'sujet'
                      ? 'bg-[#0284C7] text-white shadow-2xs'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                  title="عرض موضوع الامتحان فقط"
                >
                  <HiOutlineDocumentText className="w-3.5 h-3.5" />
                  <span>الموضوع</span>
                </button>

                <button
                  onClick={() => setViewMode('corrige')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer ${
                    viewMode === 'corrige'
                      ? 'bg-[#16A34A] text-white shadow-2xs'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                  title="عرض التصحيح النموذجي فقط"
                >
                  <HiOutlineCheckCircle className="w-3.5 h-3.5" />
                  <span>التصحيح</span>
                </button>
              </div>

              {/* Open in Google Drive Folder */}
              <a
                href={driveYearUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg bg-[#0F172A] hover:bg-[#334155] text-[#94A3B8] hover:text-white border border-[#334155] transition-colors"
                title="فتح مجلد هذه السنة على Google Drive"
              >
                <HiFolder className="w-4 h-4 text-[#0284C7]" />
              </a>

              {/* Fullscreen Toggle */}
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 rounded-lg bg-[#0F172A] hover:bg-[#334155] text-[#94A3B8] hover:text-white border border-[#334155] transition-colors cursor-pointer"
                title={isFullscreen ? "تصغير النافذة" : "ملء الشاشة"}
              >
                <HiArrowsExpand className="w-4 h-4" />
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-[#0F172A] hover:bg-[#E11D48] text-[#94A3B8] hover:text-white border border-[#334155] hover:border-[#E11D48] transition-colors cursor-pointer"
                aria-label="إغلاق"
              >
                <HiX className="w-4 h-4" />
              </button>

            </div>

          </div>

          {/* Main Dual-View Body */}
          <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-[#334155] overflow-hidden bg-[#0B1120]">
            
            {/* RIGHT PANE: Exam Topic (الموضوع) */}
            {(viewMode === 'dual' || viewMode === 'sujet') && (
              <div className={`flex flex-col h-full overflow-hidden ${viewMode === 'dual' ? 'w-full md:w-1/2' : 'w-full'}`}>
                
                {/* Pane Header */}
                <div className="bg-[#1E293B]/80 px-4 py-2 border-b border-[#334155] flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0284C7]"></span>
                    <span className="font-bold text-white">موضوع الامتحان الرسمي (Sujet)</span>
                    <span className="px-2 py-0.5 rounded bg-[#0F172A] text-slate-300 font-mono text-[11px] border border-[#334155]">
                      {currentItem.subjectName} — {currentItem.year}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {currentItem.sujetUrl && (
                      <a
                        href={currentItem.sujetUrl}
                        download
                        className="px-2 py-1 rounded bg-[#0F172A] hover:bg-[#0284C7] text-slate-300 hover:text-white font-bold text-[11px] border border-[#334155] transition-colors flex items-center gap-1"
                        title="تحميل الموضوع بصيغة PDF"
                      >
                        <HiDownload className="w-3 h-3" />
                        <span>تحميل</span>
                      </a>
                    )}
                    <a
                      href={driveYearUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 rounded bg-[#0F172A] hover:bg-[#334155] text-slate-300 hover:text-white border border-[#334155] transition-colors"
                      title="فتح على Google Drive"
                    >
                      <HiExternalLink className="w-3 h-3 text-[#0284C7]" />
                    </a>
                  </div>
                </div>

                {/* PDF Viewer Container */}
                <div className="flex-1 w-full h-full bg-[#1E293B] relative">
                  {sujetFrameSrc ? (
                    <iframe
                      src={sujetFrameSrc}
                      title={currentItem.sujetTitle}
                      className="w-full h-full border-0"
                      allow="autoplay"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 p-6 text-center">
                      <HiDocumentText className="w-12 h-12 text-slate-500 mb-2" />
                      <p className="text-sm font-bold text-white">موضوع الامتحان غير متوفر محلياً لهذه الدورة</p>
                      <p className="text-xs text-slate-400 mt-1">يمكنك فتح مجلد الدورة السحابي على Google Drive للاطلاع عليه.</p>
                      <a
                        href={driveYearUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 px-3 py-1.5 rounded-lg bg-[#0284C7] text-white text-xs font-bold flex items-center gap-1.5"
                      >
                        <HiFolder className="w-4 h-4" />
                        <span>فتح في Google Drive</span>
                      </a>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* LEFT PANE: Model Solution (التصحيح وسلالم التنقيط) */}
            {(viewMode === 'dual' || viewMode === 'corrige') && (
              <div className={`flex flex-col h-full overflow-hidden ${viewMode === 'dual' ? 'w-full md:w-1/2' : 'w-full'}`}>
                
                {/* Pane Header */}
                <div className="bg-[#1E293B]/80 px-4 py-2 border-b border-[#334155] flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
                    <span className="font-bold text-white">التصحيح النموذجي وسلم التنقيط (Corrigé & Barème)</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {currentItem.corrigeUrl && (
                      <a
                        href={currentItem.corrigeUrl}
                        download
                        className="px-2 py-1 rounded bg-[#0F172A] hover:bg-[#16A34A] text-slate-300 hover:text-white font-bold text-[11px] border border-[#334155] transition-colors flex items-center gap-1"
                        title="تحميل التصحيح بصيغة PDF"
                      >
                        <HiDownload className="w-3 h-3" />
                        <span>تحميل</span>
                      </a>
                    )}
                    <a
                      href={driveYearUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 rounded bg-[#0F172A] hover:bg-[#334155] text-slate-300 hover:text-white border border-[#334155] transition-colors"
                      title="فتح على Google Drive"
                    >
                      <HiExternalLink className="w-3 h-3 text-[#16A34A]" />
                    </a>
                  </div>
                </div>

                {/* PDF Viewer Container */}
                <div className="flex-1 w-full h-full bg-[#1E293B] relative">
                  {corrigeFrameSrc ? (
                    <iframe
                      src={corrigeFrameSrc}
                      title={currentItem.corrigeTitle}
                      className="w-full h-full border-0"
                      allow="autoplay"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 p-6 text-center">
                      <HiCheckCircle className="w-12 h-12 text-slate-500 mb-2" />
                      <p className="text-sm font-bold text-white">التصحيح النموذجي غير متوفر محلياً لهذه الدورة</p>
                      <p className="text-xs text-slate-400 mt-1">يمكنك فتح مجلد الدورة السحابي على Google Drive للاطلاع عليه.</p>
                      <a
                        href={driveYearUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 px-3 py-1.5 rounded-lg bg-[#16A34A] text-white text-xs font-bold flex items-center gap-1.5"
                      >
                        <HiFolder className="w-4 h-4" />
                        <span>فتح في Google Drive</span>
                      </a>
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>

          {/* Bottom Bar Info */}
          <div className="bg-[#1E293B] border-t border-[#334155] px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-medium text-white">{currentItem.sujetTitle}</span>
              <span className="text-[#64748B]">•</span>
              <span className="font-mono text-emerald-400">معامل {currentItem.coef}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] text-slate-400">
                💡 نصيحة: يمكنك التبديل بين الشاشة المزدوجة والشاشة الواحدة من الأزرار العلوية.
              </span>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
