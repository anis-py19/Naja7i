import React, { useState, useMemo } from 'react';
import { 
  HiX, 
  HiDocumentText, 
  HiDownload, 
  HiVideoCamera, 
  HiCheckCircle, 
  HiOutlineCheckCircle, 
  HiExternalLink, 
  HiBookOpen,
  HiCollection,
  HiSearch,
  HiFolder,
  HiEye,
  HiViewGrid
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { SUBJECT_RESOURCES } from '../data/bacData';
import { getFilesBySubject } from '../data/userFilesData';
import { BAC_FULL_ARCHIVE, BAC_DRIVE_ROOT } from '../data/bacArchiveFullData';
import BacDualViewerModal from './BacDualViewerModal';

const SUBJECT_SLUG_MAP = {
  'math': 'mathematics',
  'mathematics': 'mathematics',
  'physics': 'physics',
  'science': 'sciences',
  'sciences': 'sciences',
  'arabic': 'arabic',
  'history_geo': 'history-geography',
  'history-geography': 'history-geography',
  'islamic': 'islamic',
  'philosophy': 'philosophy',
  'french': 'french',
  'english': 'english',
  'tamazight': 'tamazight',
  'civil_eng': 'civil-engineering',
  'mech_eng': 'mechanical-engineering',
  'elec_eng': 'electrical-engineering',
  'process_eng': 'process-engineering',
  'accounting': 'accounting-management',
  'law': 'law',
  'economics': 'economics-management',
  'german': 'german',
  'spanish': 'spanish',
  'italian': 'italian'
};

export default function SubjectViewer({ subjectId, streamName, onClose, onOpenPdf }) {
  const [activeTab, setActiveTab] = useState('files'); // 'files', 'units', 'videos', 'bacs'
  const [unitSearch, setUnitSearch] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Dual Viewer State
  const [dualModalOpen, setDualModalOpen] = useState(false);
  const [selectedDualItem, setSelectedDualItem] = useState(null);
  const [dualMode, setDualMode] = useState('dual');

  const [completedItems, setCompletedItems] = useState(() => {
    try {
      const saved = localStorage.getItem('naja7i_completed_units');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const subjectData = SUBJECT_RESOURCES[subjectId] || {
    title: 'المادة الدراسية',
    frenchTitle: 'Matière',
    description: 'دروس وملخصات وتمارين البكالوريا وفق المنهاج الوزاري المعتمد.',
    units: []
  };

  const userSubjectFiles = getFilesBySubject(subjectId);

  const bacArchiveItems = useMemo(() => {
    const targetSubjectSlug = SUBJECT_SLUG_MAP[subjectId] || subjectId;
    return BAC_FULL_ARCHIVE.filter(item => item.subjectId === targetSubjectSlug);
  }, [subjectId]);

  const toggleComplete = (itemId, unitTitle) => {
    const isNowDone = !completedItems[itemId];
    const updated = { ...completedItems, [itemId]: isNowDone };
    setCompletedItems(updated);
    try {
      localStorage.setItem('naja7i_completed_units', JSON.stringify(updated));
      setToastMessage(isNowDone ? `تم تعليم "${unitTitle}" كمراجعة بنجاح ✓` : `تم إلغاء التعليم`);
      setTimeout(() => setToastMessage(null), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenDual = (item, mode = 'dual') => {
    setSelectedDualItem(item);
    setDualMode(mode);
    setDualModalOpen(true);
  };

  const filteredUnits = subjectData.units.filter(u =>
    u.title.toLowerCase().includes(unitSearch.trim().toLowerCase()) ||
    u.summary.toLowerCase().includes(unitSearch.trim().toLowerCase())
  );

  const filteredFiles = userSubjectFiles.filter(f =>
    f.title.toLowerCase().includes(unitSearch.trim().toLowerCase()) ||
    f.author.toLowerCase().includes(unitSearch.trim().toLowerCase()) ||
    f.category.toLowerCase().includes(unitSearch.trim().toLowerCase())
  );

  const filteredBacs = bacArchiveItems.filter(b => 
    b.year.toString().includes(unitSearch.trim()) ||
    b.streamName.toLowerCase().includes(unitSearch.trim().toLowerCase())
  );

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/40 backdrop-blur-xs font-['Cairo']">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          className="relative w-full max-w-4xl bg-white border border-[#E2E8F0] rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Toast Alert */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="absolute top-4 right-4 z-50 bg-[#0F172A] text-white text-xs font-bold px-4 py-2 rounded-lg shadow-lg border border-[#334155] flex items-center gap-2"
              >
                <HiCheckCircle className="w-4 h-4 text-[#10B981]" />
                <span>{toastMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modal Header */}
          <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] p-5 sm:p-6 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-rose-50 text-[#E11D48] border border-rose-200/60 font-mono">
                  {streamName || 'جميع الشعب'}
                </span>
                <span className="text-xs text-[#64748B] font-medium font-mono">
                  {subjectData.frenchTitle}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0F172A]">
                {subjectData.title}
              </h3>
              <p className="text-xs text-[#64748B] mt-1 max-w-xl">
                {subjectData.description}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-[#E2E8F0] transition-colors cursor-pointer"
              aria-label="إغلاق النافذة"
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs Bar & In-Modal Search */}
          <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-5 py-2.5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-thin">
                {userSubjectFiles.length > 0 && (
                  <button
                    onClick={() => setActiveTab('files')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                      activeTab === 'files'
                        ? 'bg-[#E11D48] text-white shadow-2xs'
                        : 'bg-white text-[#0F172A] hover:bg-[#F1F5F9] border border-[#CBD5E1]'
                    }`}
                  >
                    <HiFolder className="w-4 h-4" />
                    <span>الملخصات والمذكرات ({userSubjectFiles.length})</span>
                  </button>
                )}

                <button
                  onClick={() => setActiveTab('bacs')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === 'bacs'
                      ? 'bg-[#E11D48] text-white shadow-2xs'
                      : 'bg-white text-[#0F172A] hover:bg-[#F1F5F9] border border-[#CBD5E1]'
                  }`}
                >
                  <HiBookOpen className="w-4 h-4" />
                  <span>أرشيف البكالوريا الرسمية ({bacArchiveItems.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('units')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === 'units'
                      ? 'bg-[#E11D48] text-white shadow-2xs'
                      : 'bg-white text-[#0F172A] hover:bg-[#F1F5F9] border border-[#CBD5E1]'
                  }`}
                >
                  <HiCollection className="w-4 h-4" />
                  <span>محاور المنهاج الوزاري ({subjectData.units.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('videos')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === 'videos'
                      ? 'bg-[#E11D48] text-white shadow-2xs'
                      : 'bg-white text-[#0F172A] hover:bg-[#F1F5F9] border border-[#CBD5E1]'
                  }`}
                >
                  <HiVideoCamera className="w-4 h-4" />
                  <span>فيديوهات اليوتيوب</span>
                </button>
              </div>

              {/* In-modal filter */}
              <div className="relative w-full sm:w-48 mt-2 sm:mt-0">
                <input
                  type="text"
                  placeholder="ابحث داخل المادة..."
                  value={unitSearch}
                  onChange={(e) => setUnitSearch(e.target.value)}
                  className="w-full bg-white border border-[#CBD5E1] rounded-lg pl-2 pr-7 py-1 text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#E11D48]"
                />
                <HiSearch className="w-3.5 h-3.5 text-[#64748B] absolute right-2.5 top-2" />
              </div>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-white">
            
            {/* TAB 0: Direct User Files */}
            {activeTab === 'files' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredFiles.length === 0 ? (
                  <div className="col-span-full p-8 text-center text-[#64748B] text-sm">
                    لا توجد ملفات مطابقة لكلمة البحث.
                  </div>
                ) : (
                  filteredFiles.map((file) => (
                    <div
                      key={file.id}
                      className="bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#E11D48] rounded-xl p-4 flex flex-col justify-between shadow-2xs transition-all group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/60">
                            {file.category}
                          </span>
                          <span className="text-[11px] text-[#64748B] font-mono">
                            {file.sizeReadable}
                          </span>
                        </div>

                        <h4 
                          onClick={() => onOpenPdf && onOpenPdf(file)}
                          className="text-xs sm:text-sm font-bold text-[#0F172A] group-hover:text-[#E11D48] transition-colors mb-1 cursor-pointer leading-snug"
                        >
                          {file.title}
                        </h4>

                        <p className="text-[11px] text-[#64748B] mb-3">
                          ✍️ {file.author}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#E2E8F0] flex items-center gap-2">
                        <button
                          onClick={() => onOpenPdf && onOpenPdf(file)}
                          className="flex-1 py-1.5 px-3 rounded-lg bg-[#E11D48] hover:bg-[#be123c] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                        >
                          <HiBookOpen className="w-3.5 h-3.5" />
                          <span>معاينة PDF</span>
                        </button>
                        
                        {file.driveFolderUrl && (
                          <a
                            href={file.driveFolderUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-white hover:bg-[#F1F5F9] text-[#0F172A] border border-[#CBD5E1] transition-colors"
                            title="فتح في Google Drive"
                          >
                            <HiFolder className="w-4 h-4 text-[#0284C7]" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB 1: BAC Archive Live Feed */}
            {activeTab === 'bacs' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#64748B] px-1 pb-1 border-b border-[#E2E8F0]">
                  <span>مواضيع وحلول البكالوريا الرسمية لمادة {subjectData.title} (2008 — 2026):</span>
                  <a
                    href={BAC_DRIVE_ROOT}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#0284C7] hover:underline font-bold flex items-center gap-1"
                  >
                    <HiFolder className="w-3.5 h-3.5" />
                    <span>المجلد السحابي الكامل</span>
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredBacs.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-xl p-4 flex flex-col justify-between shadow-2xs transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-[11px] border border-slate-200/60 font-mono">
                            بكالوريا {item.year}
                          </span>
                          <span className="text-[11px] text-[#64748B]">
                            {item.streamName}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-[#0F172A] mb-3 leading-snug">
                          {item.sujetTitle}
                        </h4>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-[#E2E8F0]">
                        {/* Dual View Button */}
                        <button
                          onClick={() => handleOpenDual(item, 'dual')}
                          className="w-full py-1.5 px-2.5 rounded-lg bg-slate-900 hover:bg-[#E11D48] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                        >
                          <HiViewGrid className="w-3.5 h-3.5 text-rose-400" />
                          <span>عرض الموضوع + الحل معاً (Dual Screen)</span>
                        </button>

                        <div className="flex items-center justify-between gap-1 text-[11px]">
                          <div className="flex items-center gap-1">
                            {item.sujetUrl && (
                              <button
                                onClick={() => handleOpenDual(item, 'sujet')}
                                className="px-2 py-1 rounded bg-white hover:bg-[#0284C7] hover:text-white text-[#0F172A] font-bold border border-[#CBD5E1] transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                <HiEye className="w-3 h-3" />
                                <span>الموضوع</span>
                              </button>
                            )}
                            {item.corrigeUrl && (
                              <button
                                onClick={() => handleOpenDual(item, 'corrige')}
                                className="px-2 py-1 rounded bg-white hover:bg-[#16A34A] hover:text-white text-[#0F172A] font-bold border border-[#CBD5E1] transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                <HiCheckCircle className="w-3 h-3" />
                                <span>التصحيح</span>
                              </button>
                            )}
                          </div>

                          {item.driveFolderUrl && (
                            <a
                              href={item.driveFolderUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[10px] text-[#64748B] hover:text-[#0284C7] flex items-center gap-1 font-mono"
                              title="فتح مجلد السنة على Drive"
                            >
                              <span>Drive</span>
                              <HiExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: Units */}
            {activeTab === 'units' && (
              <div className="space-y-4">
                {filteredUnits.length === 0 ? (
                  <div className="p-8 text-center text-[#64748B] text-sm">
                    لا توجد محاور مطابقة لكلمة البحث.
                  </div>
                ) : (
                  filteredUnits.map((unit, idx) => (
                    <div
                      key={unit.id}
                      className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 sm:p-5 space-y-4 shadow-2xs"
                    >
                      {/* Unit Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E2E8F0]">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-white text-[#E11D48] border border-[#E2E8F0] font-mono">
                              المحور {idx + 1}
                            </span>
                            <span className="text-[11px] text-[#64748B] font-mono">
                              ⏱️ {unit.estimatedHours}
                            </span>
                          </div>
                          <h4 className="text-sm sm:text-base font-bold text-[#0F172A]">
                            {unit.title}
                          </h4>
                          <p className="text-xs text-[#64748B] mt-0.5">
                            {unit.summary}
                          </p>
                        </div>

                        <button
                          onClick={() => toggleComplete(unit.id, unit.title)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-center shrink-0 ${
                            completedItems[unit.id]
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-white text-[#475569] hover:bg-[#F1F5F9] border border-[#CBD5E1]'
                          }`}
                        >
                          {completedItems[unit.id] ? (
                            <>
                              <HiCheckCircle className="w-3.5 h-3.5 text-[#10B981]" />
                              <span>تمت المراجعة ✓</span>
                            </>
                          ) : (
                            <>
                              <HiOutlineCheckCircle className="w-3.5 h-3.5 text-[#64748B]" />
                              <span>تعليم كمقروء</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Resources: Summaries & Exercises */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Summaries */}
                        <div className="space-y-2">
                          <div className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
                            <HiDocumentText className="w-4 h-4 text-[#E11D48]" />
                            <span>الملخصات والدروس PDF:</span>
                          </div>
                          {unit.summaries?.map((sum, sIdx) => (
                            <div
                              key={sIdx}
                              className="bg-white border border-[#E2E8F0] rounded-lg p-3 flex items-center justify-between gap-2 shadow-2xs hover:border-[#E11D48] transition-colors"
                            >
                              <div>
                                <div className="text-xs font-bold text-[#0F172A]">
                                  {sum.name}
                                </div>
                                <div className="text-[11px] text-[#64748B]">
                                  {sum.author} {sum.pages && `• ${sum.pages}`}
                                </div>
                              </div>
                              <a
                                href={sum.link}
                                target="_blank"
                                rel="noreferrer"
                                className="px-2.5 py-1 rounded bg-[#F8FAFC] hover:bg-[#E11D48] text-[#E11D48] hover:text-white font-bold text-xs flex items-center gap-1 transition-colors border border-[#CBD5E1] hover:border-[#E11D48] shrink-0"
                              >
                                <HiDownload className="w-3.5 h-3.5" />
                                <span>تحميل</span>
                              </a>
                            </div>
                          ))}
                        </div>

                        {/* Exercises */}
                        <div className="space-y-2">
                          <div className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
                            <HiBookOpen className="w-4 h-4 text-[#E11D48]" />
                            <span>سلاسل التمارين بالحل:</span>
                          </div>
                          {unit.exercises?.map((ex, eIdx) => (
                            <div
                              key={eIdx}
                              className="bg-white border border-[#E2E8F0] rounded-lg p-3 flex items-center justify-between gap-2 shadow-2xs hover:border-[#E11D48] transition-colors"
                            >
                              <div>
                                <div className="text-xs font-bold text-[#0F172A]">
                                  {ex.name}
                                </div>
                                <div className="text-[11px] text-[#64748B]">
                                  {ex.author} • {ex.type}
                                </div>
                              </div>
                              <a
                                href={ex.link}
                                target="_blank"
                                rel="noreferrer"
                                className="px-2.5 py-1 rounded bg-[#F8FAFC] hover:bg-[#E11D48] text-[#0F172A] hover:text-white font-bold text-xs flex items-center gap-1 transition-colors border border-[#CBD5E1] hover:border-[#E11D48] shrink-0"
                              >
                                <HiDownload className="w-3.5 h-3.5" />
                                <span>تحميل</span>
                              </a>
                            </div>
                          ))}
                        </div>

                      </div>

                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB 3: Videos */}
            {activeTab === 'videos' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {subjectData.units.flatMap(u => u.videos || []).map((vid, vIdx) => (
                  <div
                    key={vIdx}
                    className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 flex flex-col justify-between shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-bold text-[#E11D48] bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
                          {vid.teacher}
                        </span>
                        <span className="text-[11px] text-[#64748B] font-mono">
                          ⏱️ {vid.duration}
                        </span>
                      </div>
                      <h5 className="text-xs sm:text-sm font-bold text-[#0F172A] leading-snug">
                        {vid.title}
                      </h5>
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                      <span className="text-[11px] text-[#64748B]">
                        👁️ {vid.views} مشاهدة
                      </span>
                      <a
                        href={vid.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-[#E11D48] hover:bg-[#be123c] text-white font-bold text-xs flex items-center gap-1 transition-colors shadow-2xs"
                      >
                        <HiExternalLink className="w-3.5 h-3.5" />
                        <span>مشاهدة</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </motion.div>
      </div>

      {/* Dual BAC Split-Screen Viewer Modal inside SubjectViewer */}
      <BacDualViewerModal
        isOpen={dualModalOpen}
        onClose={() => setDualModalOpen(false)}
        initialItem={selectedDualItem}
        initialMode={dualMode}
      />
    </>
  );
}
