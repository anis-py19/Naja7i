import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiHome, 
  HiChevronLeft, 
  HiDownload, 
  HiSearch, 
  HiBookOpen,
  HiExternalLink,
  HiCheckCircle,
  HiDocumentText,
  HiFilter
} from 'react-icons/hi';
import { STREAMS } from '../data/streamsData';
import { BAC_YEARS, BAC_COEFFICIENTS } from '../data/bacData';

// Subject Ency-Education & Official Archive URL mapping helper
const SUBJECT_ARCHIVE_MAP = {
  sciences_nat: { name: 'علوم الطبيعة والحياة', icon: '🧬', code: 'snv', link: 'https://3as.ency-education.com/snv-bac.html' },
  physique: { name: 'العلوم الفيزيائية', icon: '⚡', code: 'phy', link: 'https://3as.ency-education.com/phy-bac.html' },
  math: { name: 'الرياضيات', icon: '📐', code: 'math', link: 'https://3as.ency-education.com/math-bac.html' },
  arabic: { name: 'اللغة العربية وآدابها', icon: '📖', code: 'ar', link: 'https://3as.ency-education.com/ar-bac.html' },
  philo: { name: 'الفلسفة', icon: '🤔', code: 'philo', link: 'https://3as.ency-education.com/philo-bac.html' },
  hisgeo: { name: 'التاريخ والجغرافيا', icon: '🗺️', code: 'hg', link: 'https://3as.ency-education.com/hg-bac.html' },
  islamic: { name: 'العلوم الإسلامية', icon: '🕌', code: 'isl', link: 'https://3as.ency-education.com/isl-bac.html' },
  french: { name: 'اللغة الفرنسية', icon: '🇫🇷', code: 'fr', link: 'https://3as.ency-education.com/fr-bac.html' },
  english: { name: 'اللغة الإنجليزية', icon: '🇬🇧', code: 'en', link: 'https://3as.ency-education.com/en-bac.html' },
  gestion_fin: { name: 'التسيير المحاسبي والمالي', icon: '📊', code: 'ge', link: 'https://3as.ency-education.com/ge-bac.html' },
  economy: { name: 'الاقتصاد والمناجمنت', icon: '📈', code: 'ge', link: 'https://3as.ency-education.com/ge-bac.html' },
  droit: { name: 'القانون', icon: '⚖️', code: 'ge', link: 'https://3as.ency-education.com/ge-bac.html' },
  genie: { name: 'التكنولوجيا والهندسة', icon: '⚙️', code: 'tm', link: 'https://3as.ency-education.com/tm-bac.html' },
  espagnol: { name: 'اللغة الإسبانية', icon: '🇪🇸', code: 'es', link: 'https://3as.ency-education.com/es-bac.html' },
  allemand: { name: 'اللغة الألمانية', icon: '🇩🇪', code: 'de', link: 'https://3as.ency-education.com/de-bac.html' },
  italien: { name: 'اللغة الإيطالية', icon: '🇮🇹', code: 'it', link: 'https://3as.ency-education.com/it-bac.html' }
};

// Stream streamId mapper to BAC_COEFFICIENTS key
const STREAM_KEY_MAP = {
  sciences: 'sciences',
  math: 'math',
  technique: 'technique_math',
  gestion: 'gestion',
  philo: 'lettres_philo',
  langues: 'langues'
};

export default function BacArchivePage({ onOpenPdf }) {
  const [selectedStream, setSelectedStream] = useState('all');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Available subjects for the active stream or all streams
  const availableSubjects = useMemo(() => {
    if (selectedStream === 'all') {
      return Object.entries(SUBJECT_ARCHIVE_MAP).map(([id, info]) => ({
        id,
        name: info.name,
        icon: info.icon
      }));
    }
    const key = STREAM_KEY_MAP[selectedStream] || 'sciences';
    const streamConfig = BAC_COEFFICIENTS[key];
    if (!streamConfig) return [];
    return streamConfig.subjects
      .filter((s) => s.id !== 'sport')
      .map((s) => ({
        id: s.id,
        name: s.name,
        icon: s.icon || '📚',
        coef: s.coef
      }));
  }, [selectedStream]);

  // Generate complete list of Subjects + Sujets + Corrigés
  const archiveEntries = useMemo(() => {
    const entries = [];
    const targetYears = selectedYear === 'all' ? BAC_YEARS : [parseInt(selectedYear, 10)];
    const targetStreams = selectedStream === 'all' ? STREAMS : STREAMS.filter((s) => s.id === selectedStream);

    targetYears.forEach((year) => {
      targetStreams.forEach((stream) => {
        const streamKey = STREAM_KEY_MAP[stream.id] || 'sciences';
        const streamConfig = BAC_COEFFICIENTS[streamKey];
        if (!streamConfig) return;

        streamConfig.subjects
          .filter((sub) => sub.id !== 'sport')
          .forEach((sub) => {
            if (selectedSubject !== 'all' && sub.id !== selectedSubject) {
              return;
            }

            const subInfo = SUBJECT_ARCHIVE_MAP[sub.id] || { code: 'bac', link: 'https://www.ency-education.net/' };

            // Sujet & Corrigé titles & URLs
            const sujetTitle = `موضوع بكالوريا ${year} — ${sub.name} (${stream.name})`;
            const corrigeTitle = `التصحيح النموذجي وسلم التنقيط بكالوريا ${year} — ${sub.name} (${stream.name})`;

            // Official Ency-Education & CDN endpoints
            const officialArchiveUrl = subInfo.link;
            const sujetPdfUrl = `https://3as.ency-education.com/uploads/3/0/9/3/309326/bac${year}-${subInfo.code}-${stream.id}.pdf`;
            const corrigePdfUrl = `https://3as.ency-education.com/uploads/3/0/9/3/309326/bac${year}-${subInfo.code}-${stream.id}-cor.pdf`;

            entries.push({
              id: `bac-${year}-${stream.id}-${sub.id}`,
              year,
              streamId: stream.id,
              streamName: stream.name,
              streamIcon: stream.icon,
              subjectId: sub.id,
              subjectName: sub.name,
              subjectIcon: sub.icon || '📚',
              coef: sub.coef,
              isMain: sub.isMain,
              sujetTitle,
              corrigeTitle,
              sujetUrl: sujetPdfUrl,
              corrigeUrl: corrigePdfUrl,
              officialArchiveUrl
            });
          });
      });
    });

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return entries.filter((e) => 
        e.subjectName.toLowerCase().includes(q) ||
        e.streamName.toLowerCase().includes(q) ||
        e.year.toString().includes(q) ||
        e.sujetTitle.toLowerCase().includes(q)
      );
    }

    return entries;
  }, [selectedYear, selectedStream, selectedSubject, searchQuery]);

  // Open In-App PDF Reader
  const handleOpenPdfReader = (title, url) => {
    if (onOpenPdf) {
      onOpenPdf({
        title,
        url,
        size: '1.8 MB',
        date: 'وزارة التربية الوطنية 🇩🇿'
      });
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pb-16 font-['Cairo']">
      
      {/* Top Banner & Breadcrumb */}
      <div className="bg-white border-b border-[#E2E8F0] py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#64748B] mb-3">
            <Link to="/" className="hover:text-[#E11D48] flex items-center gap-1 transition-colors">
              <HiHome className="w-4 h-4" />
              <span>الرئيسية</span>
            </Link>
            <span>/</span>
            <span className="text-[#0F172A] font-bold">أرشيف مواضيع وحلول البكالوريا الرسمية</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold text-xs font-mono border border-slate-200/60">
                  2008 — 2025
                </span>
                <span className="text-xs text-[#64748B]">المواضيع الرسمية + التصحيحات النموذجية وسلالم التنقيط</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
                أرشيف شهادة البكالوريا الجزائرية (Sujets & Corrigés) 📄
              </h1>
              <p className="text-xs sm:text-sm text-[#475569] mt-1 max-w-2xl leading-relaxed">
                تصفح وحمل جميع مواضيع البكالوريا الرسمية (الموضوع 1 و 2) مع الحلول النموذجية وسلم التنقيط المعتمد من وزارة التربية الوطنية لجميع الشعب والمواد.
              </p>
            </div>

            <Link
              to="/"
              className="self-start md:self-auto px-4 py-2 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0F172A] text-xs font-bold border border-[#CBD5E1] transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <span>العودة للرئيسية</span>
              <HiChevronLeft className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
        
        {/* ========================================================================= */}
        {/* 🎛️ FILTERS TOOLBAR */}
        {/* ========================================================================= */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
          
          {/* 1. Stream Selector */}
          <div>
            <span className="block text-xs font-bold text-[#0F172A] mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E11D48]" />
              <span>1. اختر الشعبة الدراسية:</span>
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              <button
                onClick={() => setSelectedStream('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  selectedStream === 'all'
                    ? 'bg-[#E11D48] text-white shadow-2xs'
                    : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                }`}
              >
                جميع الشعب الست
              </button>
              {STREAMS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedStream(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    selectedStream === s.id
                      ? 'bg-[#E11D48] text-white shadow-2xs'
                      : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                  }`}
                >
                  <span>{s.icon}</span>
                  <span>{s.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Year Selector */}
          <div className="pt-3 border-t border-[#E2E8F0]">
            <span className="block text-xs font-bold text-[#0F172A] mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0F172A]" />
              <span>2. اختر سنة الدورة (2008 — 2025):</span>
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              <button
                onClick={() => setSelectedYear('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  selectedYear === 'all'
                    ? 'bg-[#0F172A] text-white shadow-2xs'
                    : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                }`}
              >
                جميع السنوات (2008-2025)
              </button>
              {BAC_YEARS.map((y) => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y.toString())}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-colors whitespace-nowrap cursor-pointer ${
                    selectedYear === y.toString()
                      ? 'bg-[#0F172A] text-white shadow-2xs'
                      : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Subject Quick Filter & Search Bar */}
          <div className="pt-3 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* Subject Selector Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 w-full sm:w-auto max-w-full">
              <span className="text-xs font-bold text-[#64748B] ml-1 shrink-0 flex items-center gap-1">
                <HiFilter className="w-3.5 h-3.5" />
                <span>المادة:</span>
              </span>

              <button
                onClick={() => setSelectedSubject('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  selectedSubject === 'all'
                    ? 'bg-slate-800 text-white'
                    : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                }`}
              >
                جميع المواد
              </button>

              {availableSubjects.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubject(sub.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                    selectedSubject === sub.id
                      ? 'bg-slate-800 text-white'
                      : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                  }`}
                >
                  <span>{sub.icon}</span>
                  <span>{sub.name}</span>
                </button>
              ))}
            </div>

            {/* Keyword Search */}
            <div className="relative w-full sm:w-64 shrink-0">
              <HiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="ابحث عن مادة أو دورة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3 pr-9 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#E11D48]"
              />
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 📚 RESULTS HEADER INFO */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-between text-xs text-[#64748B] px-1">
          <span className="font-bold">
            تم العثور على <strong className="text-[#0F172A] font-mono">{archiveEntries.length}</strong> مادة بامتحاناتها الرسمية وحلولها النموذجية
          </span>
          <span className="hidden sm:inline">
            كل مادة تحتوي على: الموضوع (Sujet 1 & 2) + التصحيح وسلم التنقيط الوزاري
          </span>
        </div>

        {/* ========================================================================= */}
        {/* 📑 SUBJECT CARDS GRID (WITH SUJET & CORRIGE BUTTONS) */}
        {/* ========================================================================= */}
        {archiveEntries.length === 0 ? (
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-12 text-center space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 mx-auto flex items-center justify-center text-2xl">
              🔍
            </div>
            <h3 className="text-sm font-bold text-[#0F172A]">لم يتم العثور على مواضيع تطابق خيارات البحث</h3>
            <p className="text-xs text-[#64748B]">جرب اختيار شعبة أو سنة أخرى من القوائم أعلاه.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {archiveEntries.map((item) => (
              <div 
                key={item.id}
                className="bg-white border border-[#E2E8F0] hover:border-slate-300 rounded-2xl p-5 shadow-xs transition-all flex flex-col justify-between"
              >
                {/* Header of the Subject Card */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200/60 flex items-center justify-center text-xl shrink-0">
                        {item.subjectIcon}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-[#0F172A]">
                          {item.subjectName}
                        </h3>
                        <span className="text-[11px] text-[#64748B]">
                          {item.streamName} • المعامل: {item.coef}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-bold font-mono border border-slate-200/60">
                        دورة {item.year}
                      </span>
                      {item.isMain && (
                        <span className="px-2 py-0.5 rounded-md bg-rose-50 text-[#E11D48] text-[10px] font-bold border border-rose-100">
                          مادة أساسية
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Dual Action Box: Sujet (Right) & Corrigé (Left) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-3">
                    
                    {/* 1. SUJET (الموضوع) */}
                    <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F172A] mb-1">
                          <HiDocumentText className="w-4 h-4 text-blue-600" />
                          <span>الموضوع (Sujet)</span>
                        </div>
                        <p className="text-[11px] text-[#64748B] leading-tight">
                          الموضوع الأول + الموضوع الثاني كاملاً
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 pt-1">
                        <button
                          onClick={() => handleOpenPdfReader(item.sujetTitle, item.sujetUrl)}
                          className="flex-1 px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
                          title="قراءة الموضوع داخل المنصة"
                        >
                          <HiBookOpen className="w-3.5 h-3.5" />
                          <span>قراءة الموضوع</span>
                        </button>

                        <a
                          href={item.sujetUrl}
                          target="_blank"
                          rel="noreferrer"
                          download
                          className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-[#CBD5E1] transition-colors"
                          title="تحميل الموضوع مباشرة"
                        >
                          <HiDownload className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* 2. CORRIGE (الحل النموذجي وسلم التنقيط) */}
                    <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-2 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 mb-1">
                          <HiCheckCircle className="w-4 h-4 text-emerald-600" />
                          <span>التصحيح وسلم التنقيط</span>
                        </div>
                        <p className="text-[11px] text-emerald-800 leading-tight">
                          الإجابة النموذجية المعتمدة مع التنقيط
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 pt-1">
                        <button
                          onClick={() => handleOpenPdfReader(item.corrigeTitle, item.corrigeUrl)}
                          className="flex-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
                          title="قراءة التصحيح النموذجي داخل المنصة"
                        >
                          <HiBookOpen className="w-3.5 h-3.5" />
                          <span>قراءة الحل</span>
                        </button>

                        <a
                          href={item.corrigeUrl}
                          target="_blank"
                          rel="noreferrer"
                          download
                          className="p-1.5 rounded-lg bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 transition-colors"
                          title="تحميل التصحيح وسلم التنقيط"
                        >
                          <HiDownload className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Footer Link to Official Subject Archive Page */}
                <div className="pt-2.5 border-t border-[#F1F5F9] flex items-center justify-between text-[11px] text-[#64748B]">
                  <span>المصدر: وزارة التربية والديوان الوطني للامتحانات (ONEC)</span>
                  <a
                    href={item.officialArchiveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#E11D48] hover:underline font-bold flex items-center gap-1"
                  >
                    <span>أرشيف المادة</span>
                    <HiExternalLink className="w-3 h-3" />
                  </a>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
