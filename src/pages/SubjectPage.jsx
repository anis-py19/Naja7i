import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  HiHome, 
  HiChevronLeft, 
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
  HiAcademicCap,
  HiLightBulb,
  HiSparkles,
  HiExclamationCircle
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

import { SUBJECT_RESOURCES, BAC_COEFFICIENTS } from '../data/bacData';
import { getFilesBySubject } from '../data/userFilesData';
import { BAC_FULL_ARCHIVE, BAC_DRIVE_ROOT, BAC_DRIVE_YEARS } from '../data/bacArchiveFullData';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { COMMON_BAC_TRAPS } from '../data/commonBacTrapsData';
import PdfReaderModal from '../components/PdfReaderModal';

const SUBJECT_SLUG_MAP = {
  'math': 'mathematics',
  'mathematics': 'mathematics',
  'physique': 'physics',
  'physics': 'physics',
  'sciences_nat': 'sciences',
  'sciences': 'sciences',
  'arabic': 'arabic',
  'hisgeo': 'history-geography',
  'history-geography': 'history-geography',
  'islamic': 'islamic',
  'philo': 'philosophy',
  'philosophy': 'philosophy',
  'french': 'french',
  'english': 'english',
  'tamazight': 'tamazight',
  'genie': 'mechanical-engineering',
  'civil_eng': 'civil-engineering',
  'mech_eng': 'mechanical-engineering',
  'elec_eng': 'electrical-engineering',
  'process_eng': 'process-engineering',
  'gestion_fin': 'accounting-management',
  'accounting': 'accounting-management',
  'droit': 'law',
  'law': 'law',
  'economy': 'economics-management',
  'economics': 'economics-management',
  'langue3': 'german',
  'german': 'german',
  'spanish': 'spanish',
  'italian': 'italian'
};

const SUBJECT_METADATA_FALLBACK = {
  'math': { title: 'الرياضيات', frenchTitle: 'Mathématiques', icon: '📐', desc: 'دراسة الدوال، المتتاليات، الحساب التكاملي، الاحتمالات، والهندسة الفضائية.' },
  'physique': { title: 'العلوم الفيزيائية', frenchTitle: 'Sciences Physiques', icon: '⚡', desc: 'المتابعة الزمنية، الميكانيك والنيوتن، الكهرباء RC و RL، الأحماض والأسس، والنووي.' },
  'sciences_nat': { title: 'علوم الطبيعة والحياة', frenchTitle: 'Sciences Naturelles', icon: '🧬', desc: 'تركيب البروتين، النشاط الإنزيمي، المناعة، الاتصال العصبي، والجيولوجيا.' },
  'arabic': { title: 'اللغة العربية وآدابها', frenchTitle: 'Langue Arabe', icon: '📖', desc: 'شعر المنفى والمهجر، القضية الفلسطينية والجزائرية، المقال العلمي والاجتماعي، والقواعد.' },
  'hisgeo': { title: 'التاريخ والجغرافيا', frenchTitle: 'Histoire & Géographie', icon: '🗺️', desc: 'الحرب الباردة، الثورة التحريرية، واقع الاقتصاد العالمي، والتكتلات الاقتصادية.' },
  'islamic': { title: 'العلوم الإسلامية', frenchTitle: 'Sciences Islamiques', icon: '🕌', desc: 'العقيدة وأثرها، وسائل القرآن في تثبيت العقيدة، مقاصد الشريعة، والميراث.' },
  'philo': { title: 'الفلسفة', frenchTitle: 'Philosophie', icon: '🤔', desc: 'المقالات الفلسفية، المقارنة، الجدل، الاستقصاء بالوضع، وتحليل النصوص.' },
  'french': { title: 'اللغة الفرنسية', frenchTitle: 'Français', icon: '🇫🇷', desc: 'Le texte d\'histoire, le texte argumentatif, et l\'appel avec le compte rendu objectif.' },
  'english': { title: 'اللغة الإنجليزية', frenchTitle: 'English', icon: '🇬🇧', desc: 'Ancient Civilizations, Ethics in Business, Education in the World, Safety First.' },
  'gestion_fin': { title: 'التسيير المحاسبي والمالي', frenchTitle: 'Gestion Financière', icon: '📊', desc: 'أعمال نهاية السنة، التسويات، التنازل عن التثبيتات، وتحليل الميزانية.' },
  'economy': { title: 'الاقتصاد والمناجمنت', frenchTitle: 'Économie & Management', icon: '📈', desc: 'النقود والكتلة النقدية، البنوك، التجارة الخارجية، والشركات.' },
  'droit': { title: 'القانون', frenchTitle: 'Droit', icon: '⚖️', desc: 'عقد العمل، علاقات العمل الفردية والجماعية، الشركة التجارية، والالتزامات.' }
};

export default function SubjectPage({ onOpenPdf }) {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('files'); // 'files', 'bacs', 'units', 'videos', 'quiz', 'traps'
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedYearFilter, setSelectedYearFilter] = useState('all');

  // Modal PDF state if not passed from parent
  const [localPdfModal, setLocalPdfModal] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);

  // Quiz state
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState({});

  // Checklist completion
  const [completedItems, setCompletedItems] = useState(() => {
    try {
      const saved = localStorage.getItem('naja7i_completed_units');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const subjectData = SUBJECT_RESOURCES[subjectId] || SUBJECT_METADATA_FALLBACK[subjectId] || {
    title: 'المادة الدراسية',
    frenchTitle: 'Matière',
    description: 'دروس وملخصات وتمارين البكالوريا وفق المنهاج الوزاري المعتمد.',
    units: []
  };

  const userSubjectFiles = useMemo(() => {
    return getFilesBySubject(subjectId);
  }, [subjectId]);

  const archiveSubjectSlug = SUBJECT_SLUG_MAP[subjectId] || subjectId;
  const bacArchiveItems = useMemo(() => {
    return BAC_FULL_ARCHIVE.filter(item => item.subjectId === archiveSubjectSlug);
  }, [archiveSubjectSlug]);

  const subjectQuizzes = useMemo(() => {
    return QUIZ_QUESTIONS.filter(q => q.subjectId === subjectId || q.subjectId === archiveSubjectSlug);
  }, [subjectId, archiveSubjectSlug]);

  const subjectTraps = useMemo(() => {
    return COMMON_BAC_TRAPS.filter(t => t.subjectId === subjectId || t.subjectId === archiveSubjectSlug);
  }, [subjectId, archiveSubjectSlug]);

  const handlePdfView = (file) => {
    if (onOpenPdf) {
      onOpenPdf(file);
    } else {
      setSelectedPdf(file);
      setLocalPdfModal(true);
    }
  };

  const toggleComplete = (itemId) => {
    const isNowDone = !completedItems[itemId];
    const updated = { ...completedItems, [itemId]: isNowDone };
    setCompletedItems(updated);
    try {
      localStorage.setItem('naja7i_completed_units', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Filtered files
  const filteredFiles = useMemo(() => {
    return userSubjectFiles.filter(f =>
      f.title.toLowerCase().includes(searchFilter.trim().toLowerCase()) ||
      f.author.toLowerCase().includes(searchFilter.trim().toLowerCase()) ||
      f.category.toLowerCase().includes(searchFilter.trim().toLowerCase())
    );
  }, [userSubjectFiles, searchFilter]);

  // Filtered BACs
  const filteredBacs = useMemo(() => {
    return bacArchiveItems.filter(b => {
      if (selectedYearFilter !== 'all' && b.year.toString() !== selectedYearFilter.toString()) return false;
      if (searchFilter.trim()) {
        const q = searchFilter.trim().toLowerCase();
        return (
          b.year.toString().includes(q) ||
          b.streamName.toLowerCase().includes(q) ||
          b.sujetTitle.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [bacArchiveItems, selectedYearFilter, searchFilter]);

  // Units
  const unitsList = subjectData.units || [];
  const completedCount = unitsList.filter(u => completedItems[u.id]).length;
  const progressPercent = unitsList.length > 0 ? Math.round((completedCount / unitsList.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pb-20 font-['Cairo']" dir="rtl">
      
      {/* Top Banner & Header */}
      <div className="bg-white border-b border-[#E2E8F0] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#64748B] mb-4">
            <Link to="/" className="hover:text-[#E11D48] flex items-center gap-1 transition-colors">
              <HiHome className="w-4 h-4" />
              <span>الرئيسية</span>
            </Link>
            <span>/</span>
            <Link to="/streams" className="hover:text-[#E11D48] transition-colors">
              <span>الشعب والمواد</span>
            </Link>
            <span>/</span>
            <span className="text-[#0F172A] font-bold">مادة {subjectData.title}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-700 font-medium text-xs border border-rose-200/60 font-mono">
                  {subjectData.frenchTitle || 'Matière'}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-xs border border-slate-200/60 font-mono">
                  {bacArchiveItems.length} دورة بكالوريا
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-xs border border-slate-200/60">
                  {userSubjectFiles.length} ملف ومذكرة
                </span>
                {unitsList.length > 0 && (
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-medium text-xs border border-emerald-200/60">
                    مكتمل: {completedCount}/{unitsList.length} ({progressPercent}%)
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-[#0F172A] flex items-center gap-3">
                <span>{subjectData.icon || '📚'}</span>
                <span>مادة {subjectData.title}</span>
              </h1>
              
              <p className="text-xs sm:text-sm text-[#475569] mt-1.5 max-w-2xl leading-relaxed">
                {subjectData.description || 'المركز الشامل لدروس، ملخصات، مذكرات، وأرشيف بكالوريا المادة مع التصحيحات النموذجية وبنك الأسئلة.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={BAC_DRIVE_ROOT}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F172A] text-xs font-bold border border-[#CBD5E1] transition-colors flex items-center gap-1.5 shadow-2xs"
                title="فتح المجلد السحابي الكامل للأرشيف على Google Drive"
              >
                <HiFolder className="w-4 h-4 text-[#E11D48]" />
                <span>مجلد Google Drive</span>
                <HiExternalLink className="w-3.5 h-3.5 text-[#64748B]" />
              </a>

              <Link
                to="/streams"
                className="px-4 py-2 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0F172A] text-xs font-bold border border-[#CBD5E1] transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <span>جميع المواد</span>
                <HiChevronLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Progress Bar if Units Exist */}
          {unitsList.length > 0 && (
            <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center gap-3">
              <div className="flex-1 bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#E11D48] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <span className="text-xs font-mono font-bold text-[#64748B]">
                {progressPercent}% من محاور المنهاج
              </span>
            </div>
          )}

        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="bg-white border-b border-[#E2E8F0] sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 overflow-x-auto py-2.5 scrollbar-thin">
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('files')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'files'
                    ? 'bg-[#E11D48] text-white shadow-2xs'
                    : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                }`}
              >
                <HiDocumentText className="w-4 h-4" />
                <span>الملخصات والمذكرات ({userSubjectFiles.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('bacs')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'bacs'
                    ? 'bg-[#E11D48] text-white shadow-2xs'
                    : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                }`}
              >
                <HiBookOpen className="w-4 h-4" />
                <span>أرشيف البكالوريا (2008—2026) ({bacArchiveItems.length})</span>
              </button>

              {unitsList.length > 0 && (
                <button
                  onClick={() => setActiveTab('units')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'units'
                      ? 'bg-[#E11D48] text-white shadow-2xs'
                      : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                  }`}
                >
                  <HiCollection className="w-4 h-4" />
                  <span>محاور المنهاج الوزاري ({unitsList.length})</span>
                </button>
              )}

              {subjectData.units?.some(u => u.videos?.length > 0) && (
                <button
                  onClick={() => setActiveTab('videos')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'videos'
                      ? 'bg-[#E11D48] text-white shadow-2xs'
                      : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                  }`}
                >
                  <HiVideoCamera className="w-4 h-4" />
                  <span>فيديوهات اليوتيوب</span>
                </button>
              )}

              {subjectQuizzes.length > 0 && (
                <button
                  onClick={() => setActiveTab('quiz')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'quiz'
                      ? 'bg-[#E11D48] text-white shadow-2xs'
                      : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                  }`}
                >
                  <HiSparkles className="w-4 h-4" />
                  <span>كويز واختبار سريع ({subjectQuizzes.length})</span>
                </button>
              )}

              {subjectTraps.length > 0 && (
                <button
                  onClick={() => setActiveTab('traps')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'traps'
                      ? 'bg-[#E11D48] text-white shadow-2xs'
                      : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                  }`}
                >
                  <HiLightBulb className="w-4 h-4" />
                  <span>فخاخ البكالوريا ({subjectTraps.length})</span>
                </button>
              )}
            </div>

            {/* Quick Search */}
            <div className="relative w-48 sm:w-64">
              <HiSearch className="w-3.5 h-3.5 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="بحث سريع داخل المادة..."
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg pr-8 pl-2 py-1 text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#E11D48]"
              />
            </div>

          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* TAB 1: User Files & Summaries */}
        {activeTab === 'files' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-[#64748B] px-1">
              <span>عرض <strong className="text-[#0F172A]">{filteredFiles.length}</strong> ملف متاح لمادة {subjectData.title}</span>
              <a
                href={BAC_DRIVE_ROOT}
                target="_blank"
                rel="noreferrer"
                className="text-[#0284C7] hover:underline font-bold flex items-center gap-1"
              >
                <HiFolder className="w-3.5 h-3.5" />
                <span>مجلد Google Drive</span>
              </a>
            </div>

            {filteredFiles.length === 0 ? (
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-12 text-center shadow-xs">
                <HiOutlineBookOpen className="w-12 h-12 text-[#94A3B8] mx-auto mb-3" />
                <h3 className="text-base font-bold text-[#0F172A]">لا توجد ملفات مطابقة للبحث</h3>
                <p className="text-xs text-[#64748B] mt-1">جرب تغيير كلمة البحث أو تصفيرها.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    className="bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-2xl p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/60">
                          {file.category}
                        </span>
                        <span className="text-[11px] text-[#64748B] font-mono">
                          {file.sizeReadable}
                        </span>
                      </div>

                      <h3 
                        onClick={() => handlePdfView(file)}
                        className="text-sm font-bold text-[#0F172A] group-hover:text-[#E11D48] transition-colors mb-1 cursor-pointer leading-snug"
                      >
                        {file.title}
                      </h3>

                      <p className="text-xs text-[#64748B] mb-3">
                        ✍️ {file.author}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#F1F5F9] flex items-center gap-2">
                      <button
                        onClick={() => handlePdfView(file)}
                        className="flex-1 py-1.5 px-3 rounded-xl bg-[#E11D48] hover:bg-[#be123c] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                      >
                        <HiEye className="w-4 h-4" />
                        <span>معاينة PDF</span>
                      </button>

                      {file.fileUrl && !file.fileUrl.startsWith('http') && (
                        <a
                          href={file.fileUrl}
                          download
                          className="p-2 rounded-xl bg-[#F8FAFC] hover:bg-[#0F172A] text-[#0F172A] hover:text-white border border-[#E2E8F0] transition-colors"
                          title="تحميل الملف محلياً"
                        >
                          <HiDownload className="w-4 h-4" />
                        </a>
                      )}

                      {file.driveFolderUrl && (
                        <a
                          href={file.driveFolderUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0284C7] border border-[#E2E8F0] transition-colors"
                          title="فتح في Google Drive"
                        >
                          <HiFolder className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: BAC Archive */}
        {activeTab === 'bacs' && (
          <div className="space-y-4">
            
            {/* Year Selector for Subject */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#0F172A]">اختر السنة:</span>
                <span className="text-[11px] text-[#64748B] font-mono">
                  {selectedYearFilter === 'all' ? 'جميع السنوات (2008-2026)' : `دورة ${selectedYearFilter}`}
                </span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                {['all', 2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008].map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSelectedYearFilter(yr.toString())}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all whitespace-nowrap cursor-pointer ${
                      selectedYearFilter.toString() === yr.toString()
                        ? 'bg-[#0F172A] text-white shadow-2xs'
                        : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                    }`}
                  >
                    {yr === 'all' ? 'الكل' : yr}
                  </button>
                ))}
              </div>
            </div>

            {/* BAC Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBacs.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-2xl p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-[11px] border border-slate-200/60 font-mono">
                        بكالوريا {item.year}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-[11px] border border-slate-200/60 flex items-center gap-1">
                        <span>{item.streamIcon}</span>
                        <span>{item.streamName}</span>
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-[#0F172A] mb-2 leading-snug">
                      {item.sujetTitle}
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-[#F1F5F9] space-y-2">
                    
                    {/* Topic */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#0F172A] font-bold flex items-center gap-1">
                        <HiDocumentText className="w-3.5 h-3.5 text-[#0284C7]" />
                        <span>الموضوع:</span>
                      </span>
                      {item.sujetUrl ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handlePdfView({
                              title: item.sujetTitle,
                              url: item.sujetUrl,
                              rawFileName: `موضوع_${item.subjectName}_${item.year}.pdf`,
                              sizeReadable: ''
                            })}
                            className="px-2 py-0.5 rounded-lg bg-[#F8FAFC] hover:bg-[#0284C7] hover:text-white text-[#0F172A] text-[11px] font-bold border border-[#E2E8F0] transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <HiEye className="w-3 h-3" />
                            <span>معاينة</span>
                          </button>
                          <a
                            href={item.sujetUrl}
                            download
                            className="p-1 rounded-lg bg-[#F8FAFC] hover:bg-[#0F172A] hover:text-white text-[#0F172A] border border-[#E2E8F0] transition-colors"
                            title="تحميل"
                          >
                            <HiDownload className="w-3 h-3" />
                          </a>
                        </div>
                      ) : (
                        <span className="text-[10px] text-[#94A3B8]">قريباً</span>
                      )}
                    </div>

                    {/* Solution */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#0F172A] font-bold flex items-center gap-1">
                        <HiCheckCircle className="w-3.5 h-3.5 text-[#16A34A]" />
                        <span>التصحيح:</span>
                      </span>
                      {item.corrigeUrl ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handlePdfView({
                              title: item.corrigeTitle,
                              url: item.corrigeUrl,
                              rawFileName: `تصحيح_${item.subjectName}_${item.year}.pdf`,
                              sizeReadable: ''
                            })}
                            className="px-2 py-0.5 rounded-lg bg-[#F8FAFC] hover:bg-[#16A34A] hover:text-white text-[#0F172A] text-[11px] font-bold border border-[#E2E8F0] transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <HiEye className="w-3 h-3" />
                            <span>معاينة</span>
                          </button>
                          <a
                            href={item.corrigeUrl}
                            download
                            className="p-1 rounded-lg bg-[#F8FAFC] hover:bg-[#0F172A] hover:text-white text-[#0F172A] border border-[#E2E8F0] transition-colors"
                            title="تحميل"
                          >
                            <HiDownload className="w-3 h-3" />
                          </a>
                        </div>
                      ) : (
                        <span className="text-[10px] text-[#94A3B8]">قريباً</span>
                      )}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Curriculum Units */}
        {activeTab === 'units' && (
          <div className="space-y-4">
            {unitsList.map((unit, idx) => (
              <div
                key={unit.id}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-rose-50 text-[#E11D48] border border-rose-200/60 font-mono">
                        المحور {idx + 1}
                      </span>
                      <span className="text-xs text-[#64748B] font-mono">
                        ⏱️ {unit.estimatedHours}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#0F172A]">
                      {unit.title}
                    </h3>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      {unit.summary}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleComplete(unit.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                      completedItems[unit.id]
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#F1F5F9] border border-[#CBD5E1]'
                    }`}
                  >
                    {completedItems[unit.id] ? (
                      <>
                        <HiCheckCircle className="w-4 h-4 text-[#10B981]" />
                        <span>تمت المراجعة ✓</span>
                      </>
                    ) : (
                      <>
                        <HiOutlineCheckCircle className="w-4 h-4 text-[#64748B]" />
                        <span>تعليم كمقروء</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Summaries & Exercises */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Summaries */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
                      <HiDocumentText className="w-4 h-4 text-[#E11D48]" />
                      <span>الملخصات والمذكرات:</span>
                    </div>
                    {unit.summaries?.map((sum, sIdx) => (
                      <div
                        key={sIdx}
                        className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 flex items-center justify-between gap-2 shadow-2xs hover:border-[#E11D48] transition-colors"
                      >
                        <div>
                          <div className="text-xs font-bold text-[#0F172A]">{sum.name}</div>
                          <div className="text-[11px] text-[#64748B]">{sum.author} {sum.pages && `• ${sum.pages}`}</div>
                        </div>
                        <a
                          href={sum.link}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#E11D48] text-[#E11D48] hover:text-white font-bold text-xs flex items-center gap-1 transition-colors border border-[#CBD5E1]"
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
                        className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 flex items-center justify-between gap-2 shadow-2xs hover:border-[#E11D48] transition-colors"
                      >
                        <div>
                          <div className="text-xs font-bold text-[#0F172A]">{ex.name}</div>
                          <div className="text-[11px] text-[#64748B]">{ex.author} • {ex.type}</div>
                        </div>
                        <a
                          href={ex.link}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#E11D48] text-[#0F172A] hover:text-white font-bold text-xs flex items-center gap-1 transition-colors border border-[#CBD5E1]"
                        >
                          <HiDownload className="w-3.5 h-3.5" />
                          <span>تحميل</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: Videos */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unitsList.flatMap(u => u.videos || []).map((vid, vIdx) => (
              <div
                key={vIdx}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#E11D48] bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60">
                      {vid.teacher}
                    </span>
                    <span className="text-[11px] text-[#64748B] font-mono">
                      ⏱️ {vid.duration}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#0F172A] leading-snug">
                    {vid.title}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
                  <span className="text-[11px] text-[#64748B]">
                    👁️ {vid.views} مشاهدة
                  </span>
                  <a
                    href={vid.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-[#E11D48] hover:bg-[#be123c] text-white font-bold text-xs flex items-center gap-1 transition-colors shadow-2xs"
                  >
                    <HiExternalLink className="w-3.5 h-3.5" />
                    <span>مشاهدة</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: Quiz Bank */}
        {activeTab === 'quiz' && (
          <div className="max-w-3xl mx-auto space-y-6">
            {subjectQuizzes.length === 0 ? (
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-12 text-center shadow-xs">
                <HiSparkles className="w-12 h-12 text-[#94A3B8] mx-auto mb-3" />
                <h3 className="text-base font-bold text-[#0F172A]">جاري إعداد بنك أسئلة لهذه المادة</h3>
                <p className="text-xs text-[#64748B] mt-1">تصفح قسم بنك الأسئلة الرئيسي للمزيد من التحديات.</p>
              </div>
            ) : (
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                  <span className="text-xs font-bold text-[#E11D48] bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200/60 font-mono">
                    السؤال {currentQuizIndex + 1} من {subjectQuizzes.length}
                  </span>
                  <span className="text-xs text-[#64748B] font-mono">
                    النقاط: {quizScore} / {subjectQuizzes.length}
                  </span>
                </div>

                <div className="text-sm sm:text-base font-bold text-[#0F172A] leading-relaxed">
                  {subjectQuizzes[currentQuizIndex]?.question}
                </div>

                <div className="space-y-2">
                  {subjectQuizzes[currentQuizIndex]?.options.map((opt, optIdx) => {
                    const isAnswered = quizAnswered[currentQuizIndex] !== undefined;
                    const isSelected = selectedAnswer === optIdx;
                    const isCorrect = optIdx === subjectQuizzes[currentQuizIndex]?.correctIndex;

                    let btnStyle = "bg-[#F8FAFC] border-[#CBD5E1] text-[#0F172A] hover:bg-[#F1F5F9]";
                    if (isAnswered) {
                      if (isCorrect) btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold";
                      else if (isSelected) btnStyle = "bg-rose-50 border-rose-500 text-rose-900";
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isAnswered}
                        onClick={() => {
                          setSelectedAnswer(optIdx);
                          const correct = optIdx === subjectQuizzes[currentQuizIndex].correctIndex;
                          setQuizAnswered(prev => ({ ...prev, [currentQuizIndex]: optIdx }));
                          if (correct) setQuizScore(prev => prev + 1);
                        }}
                        className={`w-full text-right p-3.5 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {isAnswered && isCorrect && <HiCheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {quizAnswered[currentQuizIndex] !== undefined && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs leading-relaxed space-y-1">
                    <strong className="text-[#0F172A] block font-bold">💡 التعليل والمنهجية:</strong>
                    <p className="text-[#475569]">{subjectQuizzes[currentQuizIndex]?.explanation}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0]">
                  <button
                    disabled={currentQuizIndex === 0}
                    onClick={() => {
                      setCurrentQuizIndex(prev => prev - 1);
                      setSelectedAnswer(quizAnswered[currentQuizIndex - 1] ?? null);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white border border-[#CBD5E1] text-xs font-bold disabled:opacity-40"
                  >
                    السابق
                  </button>

                  <button
                    disabled={currentQuizIndex === subjectQuizzes.length - 1}
                    onClick={() => {
                      setCurrentQuizIndex(prev => prev + 1);
                      setSelectedAnswer(quizAnswered[currentQuizIndex + 1] ?? null);
                    }}
                    className="px-4 py-1.5 rounded-lg bg-[#0F172A] text-white text-xs font-bold hover:bg-black transition-colors"
                  >
                    السؤال التالي
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: Common Traps */}
        {activeTab === 'traps' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjectTraps.map((trap) => (
              <div
                key={trap.id}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-700 font-medium text-xs border border-rose-200/60">
                    {trap.levelLabel}
                  </span>
                  <span className="text-[11px] text-[#64748B]">
                    {trap.unit}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#0F172A]">
                  ⚠️ {trap.title}
                </h3>

                <div className="bg-rose-50/60 border border-rose-200/50 rounded-xl p-3 text-xs text-rose-900 space-y-1">
                  <strong>❌ الخطأ الشائع:</strong>
                  <p>{trap.mistake}</p>
                </div>

                <div className="bg-emerald-50/60 border border-emerald-200/50 rounded-xl p-3 text-xs text-emerald-900 space-y-1">
                  <strong>✅ القاعدة المنهجية الصحيحة:</strong>
                  <p>{trap.rule}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* PDF Modal Viewer Fallback */}
      <PdfReaderModal
        isOpen={localPdfModal}
        onClose={() => setLocalPdfModal(false)}
        file={selectedPdf}
      />

    </div>
  );
}
