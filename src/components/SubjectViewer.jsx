import React, { useState } from 'react';
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
  HiEye,
  HiFolder
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { SUBJECT_RESOURCES } from '../data/bacData';
import { getFilesBySubject } from '../data/userFilesData';
import { downloadPdfFile } from '../utils/downloadHelper';

export default function SubjectViewer({ subjectId, streamName, onClose, onOpenPdf }) {
  const [activeTab, setActiveTab] = useState('files'); // 'files', 'units', 'videos', 'bacs'
  const [unitSearch, setUnitSearch] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

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

  const completedCountInSubject = subjectData.units.filter(u => completedItems[u.id]).length;

  const filteredUnits = subjectData.units.filter(u =>
    u.title.toLowerCase().includes(unitSearch.trim().toLowerCase()) ||
    u.summary.toLowerCase().includes(unitSearch.trim().toLowerCase())
  );

  const filteredFiles = userSubjectFiles.filter(f =>
    f.title.toLowerCase().includes(unitSearch.trim().toLowerCase()) ||
    f.author.toLowerCase().includes(unitSearch.trim().toLowerCase()) ||
    f.category.toLowerCase().includes(unitSearch.trim().toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/50 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="relative w-full max-w-4xl bg-white border border-[#FFE5BF] rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Toast Alert */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-[#1c1917] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg border border-[#FFE5BF] flex items-center gap-2"
            >
              <HiCheckCircle className="w-4 h-4 text-emerald-400" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="p-6 bg-[#FFFAF3] border-b border-[#FFE5BF]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-[#FFF2DB] text-[#F62440] border border-[#FFE5BF]">
                  {streamName || 'جميع الشعب'}
                </span>
                <span className="text-xs text-[#78716c] font-sans">
                  {subjectData.frenchTitle}
                </span>
                {userSubjectFiles.length > 0 && (
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-[#FFF2DB] text-[#1c1917] border border-[#FFE5BF]">
                    📂 {userSubjectFiles.length} ملف PDF متاح
                  </span>
                )}
                {subjectData.units.length > 0 && (
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-white text-[#1c1917] border border-[#FFE5BF]">
                    المكتمل: {completedCountInSubject} / {subjectData.units.length}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-black text-[#1c1917] font-['Cairo']">
                {subjectData.title}
              </h2>
              <p className="text-xs text-[#57534e] mt-1 max-w-2xl">
                {subjectData.description}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white hover:bg-[#FFF2DB] text-[#78716c] hover:text-[#1c1917] transition-colors border border-[#FFE5BF] cursor-pointer"
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center justify-between gap-2 mt-5 border-t border-[#FFE5BF] pt-4 flex-wrap">
            <div className="flex items-center gap-2 overflow-x-auto">
              {userSubjectFiles.length > 0 && (
                <button
                  onClick={() => setActiveTab('files')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === 'files'
                      ? 'bg-[#F62440] text-white shadow-xs'
                      : 'bg-white text-[#1c1917] hover:bg-[#FFF2DB] border border-[#FFE5BF]'
                  }`}
                >
                  <HiFolder className="w-4 h-4" />
                  <span>ملخصات وملفات PDF ({userSubjectFiles.length})</span>
                </button>
              )}

              <button
                onClick={() => setActiveTab('units')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'units'
                    ? 'bg-[#F62440] text-white shadow-xs'
                    : 'bg-white text-[#1c1917] hover:bg-[#FFF2DB] border border-[#FFE5BF]'
                }`}
              >
                <HiCollection className="w-4 h-4" />
                <span>محاور المنهاج الوزاري ({subjectData.units.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('videos')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'videos'
                    ? 'bg-[#F62440] text-white shadow-xs'
                    : 'bg-white text-[#1c1917] hover:bg-[#FFF2DB] border border-[#FFE5BF]'
                }`}
              >
                <HiVideoCamera className="w-4 h-4" />
                <span>فيديوهات اليوتيوب</span>
              </button>

              <button
                onClick={() => setActiveTab('bacs')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'bacs'
                    ? 'bg-[#F62440] text-white shadow-xs'
                    : 'bg-white text-[#1c1917] hover:bg-[#FFF2DB] border border-[#FFE5BF]'
                }`}
              >
                <HiBookOpen className="w-4 h-4" />
                <span>بكالوريات سابقة للمادة</span>
              </button>
            </div>

            {/* In-modal filter */}
            <div className="relative w-full sm:w-48 mt-2 sm:mt-0">
              <input
                type="text"
                placeholder="ابحث داخل المادة..."
                value={unitSearch}
                onChange={(e) => setUnitSearch(e.target.value)}
                className="w-full bg-white border border-[#FFE5BF] rounded-lg pl-2 pr-7 py-1 text-xs text-[#1c1917] placeholder-[#78716c] focus:outline-none focus:border-[#F62440]"
              />
              <HiSearch className="w-3.5 h-3.5 text-[#78716c] absolute right-2.5 top-2" />
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-white">
          
          {/* TAB 0: Direct User Files */}
          {activeTab === 'files' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredFiles.length === 0 ? (
                <div className="col-span-full p-8 text-center text-[#78716c] text-sm">
                  لا توجد ملفات مطابقة لكلمة البحث.
                </div>
              ) : (
                filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    className="bg-[#FFFAF3] border border-[#FFE5BF] hover:border-[#F62440] rounded-xl p-4 flex flex-col justify-between shadow-2xs transition-all group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#FFF2DB] text-[#F62440] border border-[#FFE5BF]">
                          {file.category}
                        </span>
                        <span className="text-[11px] text-[#78716c] font-mono">
                          {file.sizeReadable}
                        </span>
                      </div>

                      <h4 
                        onClick={() => onOpenPdf && onOpenPdf(file)}
                        className="text-xs sm:text-sm font-bold text-[#1c1917] group-hover:text-[#F62440] transition-colors mb-1 cursor-pointer leading-snug"
                      >
                        {file.title}
                      </h4>

                      <p className="text-[11px] text-[#78716c] mb-3">
                        👤 {file.author}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#FFE5BF] grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onOpenPdf && onOpenPdf(file)}
                        className="py-1.5 rounded-lg bg-[#FFF2DB] hover:bg-[#FFE5BF] text-[#1c1917] font-bold text-xs flex items-center justify-center gap-1 border border-[#FFE5BF] transition-colors cursor-pointer"
                      >
                        <HiEye className="w-3.5 h-3.5 text-[#F62440]" />
                        <span>قراءة</span>
                      </button>

                      <button
                        onClick={() => downloadPdfFile(file.fileUrl, file.rawFileName || file.title)}
                        className="py-1.5 rounded-lg bg-[#F62440] hover:bg-[#d81b34] text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors shadow-2xs cursor-pointer"
                      >
                        <HiDownload className="w-3.5 h-3.5" />
                        <span>تحميل PDF</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 1: Units */}
          {activeTab === 'units' && (
            <div className="space-y-4">
              {filteredUnits.length === 0 ? (
                <div className="p-8 text-center text-[#78716c] text-sm">
                  {unitSearch ? 'لم يتم العثور على وحدات مطابقة للبحث.' : 'جاري تحديث وحدات هذه المادة وفق المنهاج الرسمي الجديد.'}
                </div>
              ) : (
                filteredUnits.map((unit, idx) => (
                  <div
                    key={unit.id || idx}
                    className="border border-[#FFE5BF] rounded-xl p-4 sm:p-5 bg-[#FFFAF3] space-y-4"
                  >
                    {/* Unit Header */}
                    <div className="flex items-start justify-between gap-3 border-b border-[#FFE5BF] pb-3">
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-[#1c1917] flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#F62440]"></span>
                          <span>{unit.title}</span>
                        </h4>
                        <p className="text-xs text-[#57534e] mt-0.5">
                          {unit.summary}
                        </p>
                      </div>

                      <button
                        onClick={() => toggleComplete(unit.id, unit.title)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                          completedItems[unit.id]
                            ? 'bg-[#FFF2DB] text-[#F62440] border border-[#F62440]'
                            : 'bg-white text-[#57534e] hover:bg-[#FFF2DB] border border-[#FFE5BF]'
                        }`}
                      >
                        {completedItems[unit.id] ? (
                          <>
                            <HiCheckCircle className="w-3.5 h-3.5 text-[#F62440]" />
                            <span>تمت المراجعة ✓</span>
                          </>
                        ) : (
                          <>
                            <HiOutlineCheckCircle className="w-3.5 h-3.5 text-[#78716c]" />
                            <span>تعليم كمقروء</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Resources: Summaries & Exercises */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Summaries */}
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-[#1c1917] flex items-center gap-1.5">
                          <HiDocumentText className="w-4 h-4 text-[#F62440]" />
                          <span>الملخصات والدروس PDF:</span>
                        </div>
                        {unit.summaries?.map((sum, sIdx) => (
                          <div
                            key={sIdx}
                            className="bg-white border border-[#FFE5BF] rounded-lg p-3 flex items-center justify-between gap-2 shadow-2xs hover:border-[#F62440] transition-colors"
                          >
                            <div>
                              <div className="text-xs font-bold text-[#1c1917]">
                                {sum.name}
                              </div>
                              <div className="text-[11px] text-[#78716c]">
                                {sum.author} {sum.pages && `• ${sum.pages}`}
                              </div>
                            </div>
                            <a
                              href={sum.link}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-1 rounded bg-[#FFF2DB] hover:bg-[#F62440] text-[#F62440] hover:text-white font-bold text-xs flex items-center gap-1 transition-colors border border-[#FFE5BF] hover:border-[#F62440] shrink-0"
                            >
                              <HiDownload className="w-3.5 h-3.5" />
                              <span>تحميل</span>
                            </a>
                          </div>
                        ))}
                      </div>

                      {/* Exercises */}
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-[#1c1917] flex items-center gap-1.5">
                          <HiBookOpen className="w-4 h-4 text-[#F62440]" />
                          <span>سلاسل التمارين بالحل:</span>
                        </div>
                        {unit.exercises?.map((ex, eIdx) => (
                          <div
                            key={eIdx}
                            className="bg-white border border-[#FFE5BF] rounded-lg p-3 flex items-center justify-between gap-2 shadow-2xs hover:border-[#F62440] transition-colors"
                          >
                            <div>
                              <div className="text-xs font-bold text-[#1c1917]">
                                {ex.name}
                              </div>
                              <div className="text-[11px] text-[#78716c]">
                                {ex.author} • {ex.type}
                              </div>
                            </div>
                            <a
                              href={ex.link}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-1 rounded bg-[#FFF2DB] hover:bg-[#F62440] text-[#1c1917] hover:text-white font-bold text-xs flex items-center gap-1 transition-colors border border-[#FFE5BF] hover:border-[#F62440] shrink-0"
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

          {/* TAB 2: Videos */}
          {activeTab === 'videos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {subjectData.units.flatMap(u => u.videos || []).map((vid, vIdx) => (
                <div
                  key={vIdx}
                  className="bg-[#FFFAF3] border border-[#FFE5BF] rounded-xl p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-[#F62440] bg-[#FFF2DB] px-2 py-0.5 rounded border border-[#FFE5BF]">
                        {vid.teacher}
                      </span>
                      <span className="text-[11px] text-[#78716c] font-mono">
                        ⏱️ {vid.duration}
                      </span>
                    </div>
                    <h5 className="text-xs sm:text-sm font-bold text-[#1c1917] leading-snug">
                      {vid.title}
                    </h5>
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#FFE5BF] flex items-center justify-between">
                    <span className="text-[11px] text-[#78716c]">
                      👁️ {vid.views} مشاهدة
                    </span>
                    <a
                      href={vid.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-[#F62440] hover:bg-[#d81b34] text-white font-bold text-xs flex items-center gap-1 transition-colors"
                    >
                      <HiExternalLink className="w-3.5 h-3.5" />
                      <span>مشاهدة</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: BAC Archive */}
          {activeTab === 'bacs' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015].map((year) => (
                <div
                  key={year}
                  className="bg-[#FFFAF3] border border-[#FFE5BF] rounded-xl p-3 text-center shadow-2xs hover:border-[#F62440] transition-colors"
                >
                  <div className="text-xs font-bold text-[#1c1917] mb-0.5">
                    بكالوريا {year}
                  </div>
                  <div className="text-[10px] text-[#78716c] mb-2">
                    الموضوع 1 + 2 والحل
                  </div>
                  <a
                    href={`https://www.ency-education.com/bac${year}.html`}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full py-1 rounded bg-[#FFF2DB] hover:bg-[#F62440] hover:text-white text-[#1c1917] text-xs font-bold border border-[#FFE5BF] transition-colors"
                  >
                    تحميل PDF
                  </a>
                </div>
              ))}
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
