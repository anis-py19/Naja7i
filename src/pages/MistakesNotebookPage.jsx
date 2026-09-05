import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiHome, 
  HiPlus, 
  HiSearch, 
  HiTrash, 
  HiCheck, 
  HiPrinter, 
  HiDownload, 
  HiUpload, 
  HiLightBulb,
  HiPhotograph,
  HiX
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { COMMON_BAC_TRAPS } from '../data/commonBacTrapsData';

const SUBJECT_OPTIONS = [
  { id: 'math', name: 'الرياضيات', icon: '📐', color: 'text-blue-600 bg-blue-50 border-blue-200' },
  { id: 'physique', name: 'العلوم الفيزيائية', icon: '⚡', color: 'text-amber-600 bg-amber-50 border-amber-200' },
  { id: 'sciences_nat', name: 'علوم الطبيعة والحياة', icon: '🧬', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  { id: 'gestion_fin', name: 'التسيير المحاسبي والمالي', icon: '📊', color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
  { id: 'economy', name: 'الاقتصاد والمناجمنت', icon: '📈', color: 'text-teal-600 bg-teal-50 border-teal-200' },
  { id: 'genie', name: 'الهندسة والتكنولوجيا', icon: '⚙️', color: 'text-orange-600 bg-orange-50 border-orange-200' },
  { id: 'islamic', name: 'العلوم الإسلامية', icon: '🕌', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  { id: 'philo', name: 'الفلسفة', icon: '🤔', color: 'text-purple-600 bg-purple-50 border-purple-200' },
  { id: 'hisgeo', name: 'التاريخ والجغرافيا', icon: '🗺️', color: 'text-yellow-700 bg-yellow-50 border-yellow-200' },
  { id: 'arabic', name: 'اللغة العربية وآدابها', icon: '📖', color: 'text-rose-600 bg-rose-50 border-rose-200' },
  { id: 'french', name: 'اللغة الفرنسية', icon: '🇫🇷', color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
  { id: 'english', name: 'اللغة الإنجليزية', icon: '🇬🇧', color: 'text-sky-600 bg-sky-50 border-sky-200' }
];

const SEVERITY_LEVELS = [
  { id: 'critical', label: '🔥 فخ خطير في البكالوريا', desc: 'فخ منهجي متكرر يضيع علامات كبرى' },
  { id: 'calc', label: '⚠️ خطأ حساب / إشارات / وحدات', desc: 'خطأ في التعويض أو التحويل' },
  { id: 'method', label: '✍️ خطأ منهجي في الإجابة', desc: 'صياغة غير دقيقة وفق معايير التصحيح' },
  { id: 'trick', label: '💡 فكرة مميزة جديدة', desc: 'طريقة ذكية لاختصار الوقت والحل' }
];

export default function MistakesNotebookPage() {
  // Personal Mistakes stored in localStorage
  const [mistakes, setMistakes] = useState(() => {
    try {
      const saved = localStorage.getItem('naja7i_mistakes_book');
      if (saved) {
        return JSON.parse(saved);
      }
      return COMMON_BAC_TRAPS.map((t) => ({ ...t, isMastered: false, createdAt: 'دورة 2026' }));
    } catch {
      return COMMON_BAC_TRAPS.map((t) => ({ ...t, isMastered: false, createdAt: 'دورة 2026' }));
    }
  });

  // Filters & Search
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'pending' | 'mastered'
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTrapsLibraryModal, setShowTrapsLibraryModal] = useState(false);

  // Form State for Adding New Mistake
  const [formData, setFormData] = useState({
    subjectId: 'math',
    unit: '',
    level: 'critical',
    title: '',
    mistake: '',
    rule: '',
    image: ''
  });

  // UI Toast Message State
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (text, isError = false) => {
    setToastMessage({ text, isError });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Save to localStorage
  const saveMistakesToStorage = (updated) => {
    setMistakes(updated);
    try {
      localStorage.setItem('naja7i_mistakes_book', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Add new custom mistake
  const handleAddMistake = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.rule.trim()) {
      showToast('يرجى كتابة عنوان السؤال والقاعدة الذهبية على الأقل!', true);
      return;
    }

    const subObj = SUBJECT_OPTIONS.find((s) => s.id === formData.subjectId) || SUBJECT_OPTIONS[0];
    const levObj = SEVERITY_LEVELS.find((l) => l.id === formData.level) || SEVERITY_LEVELS[0];

    const newEntry = {
      id: `mistake-${mistakes.length + 1}-${formData.subjectId}`,
      subjectId: formData.subjectId,
      subjectName: subObj.name,
      unit: formData.unit.trim() || 'عام / غير محدد',
      level: formData.level,
      levelLabel: levObj.label,
      title: formData.title.trim(),
      mistake: formData.mistake.trim(),
      rule: formData.rule.trim(),
      image: formData.image || '',
      isMastered: false,
      isPreloaded: false,
      createdAt: 'دورة 2026'
    };

    const updated = [newEntry, ...mistakes];
    saveMistakesToStorage(updated);

    // Reset Form
    setFormData({
      subjectId: 'math',
      unit: '',
      level: 'critical',
      title: '',
      mistake: '',
      rule: '',
      image: ''
    });
    setShowAddModal(false);
  };

  // Add a curated trap from library
  const handleAddCuratedTrap = (trap) => {
    if (mistakes.some((m) => m.id === trap.id || m.title === trap.title)) {
      showToast('هذا الفخ موجود بالفعل في كراسك!', true);
      return;
    }
    const newEntry = {
      ...trap,
      id: `trap-curated-${mistakes.length + 1}-${trap.id}`,
      isMastered: false,
      createdAt: 'دورة 2026'
    };
    saveMistakesToStorage([newEntry, ...mistakes]);
    showToast('تمت إضافة الفخ إلى كراسك بنجاح ✓');
  };

  // Toggle Mastered status
  const handleToggleMastered = (id) => {
    const updated = mistakes.map((m) => {
      if (m.id === id) {
        return { ...m, isMastered: !m.isMastered };
      }
      return m;
    });
    saveMistakesToStorage(updated);
  };

  // Delete mistake
  const handleDeleteMistake = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الخطأ من كراسك؟')) {
      const updated = mistakes.filter((m) => m.id !== id);
      saveMistakesToStorage(updated);
      showToast('تم حذف الخطأ من الكراس');
    }
  };

  // Handle Image Upload (Base64 for local persistence)
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('حجم الصورة كبير جداً، يرجى اختيار صورة أقل من 2 ميغابايت.', true);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Export JSON backup
  const handleExportBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(mistakes, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `naja7i_carnet_erreurs_bac_${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchor.click();
  };

  // Import JSON backup
  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result);
          if (Array.isArray(parsed)) {
            saveMistakesToStorage(parsed);
            alert(`تم استيراد ${parsed.length} خطأ وملاحظة بنجاح!`);
          } else {
            alert('الملف غير صالح أو غير متوافق.');
          }
        } catch {
          alert('حدث خطأ أثناء قراءة ملف النسخة الاحتياطية.');
        }
      };
      reader.readAsText(file);
    }
  };

  // Print Action
  const handlePrint = () => {
    window.print();
  };

  // Filtered List
  const filteredMistakes = useMemo(() => {
    return mistakes.filter((m) => {
      // Subject filter
      if (selectedSubject !== 'all' && m.subjectId !== selectedSubject) {
        return false;
      }
      // Status filter
      if (statusFilter === 'mastered' && !m.isMastered) return false;
      if (statusFilter === 'pending' && m.isMastered) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = m.title?.toLowerCase().includes(q);
        const inMistake = m.mistake?.toLowerCase().includes(q);
        const inRule = m.rule?.toLowerCase().includes(q);
        const inUnit = m.unit?.toLowerCase().includes(q);
        const inSubject = m.subjectName?.toLowerCase().includes(q);
        return inTitle || inMistake || inRule || inUnit || inSubject;
      }
      return true;
    });
  }, [mistakes, selectedSubject, statusFilter, searchQuery]);

  // Statistics Calculation
  const totalCount = mistakes.length;
  const masteredCount = mistakes.filter((m) => m.isMastered).length;
  const pendingCount = totalCount - masteredCount;
  const masteryPercentage = totalCount > 0 ? Math.round((masteredCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pb-16 font-['Cairo']">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl shadow-lg border text-xs font-bold flex items-center gap-2 animate-fadeIn transition-all ${
          toastMessage.isError
            ? 'bg-rose-600 text-white border-rose-700'
            : 'bg-emerald-600 text-white border-emerald-700'
        }`}>
          <span>{toastMessage.isError ? '⚠️' : '✓'}</span>
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🖨️ A4 PRINT-ONLY LAYOUT (ملخص كراس الأخطاء ليلة البكالوريا) */}
      {/* ========================================================================= */}
      <div className="hidden print:block font-['Cairo'] text-black p-4 w-full">
        <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-4">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Logo" className="w-9 h-9 object-contain border border-black rounded-sm" />
            <div>
              <h1 className="text-base font-black text-black">
                منصة نجاحي — كراس الأخطاء والفخاخ المنهجية للبكالوريا (Carnet d'Erreurs 🇩🇿)
              </h1>
              <p className="text-xs text-gray-800 font-bold">
                نسخة المراجعة النهائية ليلة الامتحان • إجمالي الفخاخ المسجلة: {totalCount}
              </p>
            </div>
          </div>
          <div className="text-xs font-black border-2 border-black px-2 py-1 bg-gray-100">
            دورة البكالوريا الرسمية
          </div>
        </div>

        <div className="space-y-3">
          {filteredMistakes.map((m, idx) => (
            <div key={idx} className="border-2 border-black p-3 rounded-md break-inside-avoid">
              <div className="flex items-center justify-between border-b border-black pb-1 mb-1.5 text-xs">
                <span className="font-black text-black">
                  #{idx + 1} | {m.subjectName} ({m.unit})
                </span>
                <span className="font-bold">{m.levelLabel}</span>
              </div>
              
              <h3 className="font-black text-xs text-black mb-1">
                📌 المسألة / الفخ: {m.title}
              </h3>
              
              {m.mistake && (
                <p className="text-[11px] text-gray-900 mb-1 leading-snug">
                  <strong>❌ الخطأ الذي يجب تفاديه:</strong> {m.mistake}
                </p>
              )}

              <p className="text-[11px] text-black font-bold leading-snug bg-gray-100 p-1.5 border border-black rounded-xs">
                <strong>✅ القاعدة الذهبية والتصحيح:</strong> {m.rule}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 📱 SCREEN INTERACTIVE VIEW */}
      {/* ========================================================================= */}
      <div className="print:hidden">
        
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
              <span className="text-[#0F172A] font-bold">كراس الأخطاء الذكي (Carnet d'Erreurs)</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200/60">
                    سر المتفوقين بمعدلات 18 و 19 📓
                  </span>
                  <span className="text-xs text-[#64748B]">تدوين الفخاخ والملاحظات المنهجية</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
                  كراس الأخطاء والفخاخ الذكي (Carnet d'Erreurs)
                </h1>
                <p className="text-xs sm:text-sm text-[#475569] mt-1 max-w-2xl leading-relaxed">
                  سجل كل خطأ تقع فيه أثناء حل التمارين واكتب "القاعدة الذهبية" لتفاديه. راجع أخطاءك واطبعها ليلة الامتحان حتى لا تكرر نفس الفخ!
                </p>
              </div>

              {/* Action Buttons Top */}
              <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-[#E11D48] hover:bg-[#be123c] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer active:scale-95"
                >
                  <HiPlus className="w-4 h-4" />
                  <span>تدوين خطأ جديد</span>
                </button>

                <button
                  onClick={() => setShowTrapsLibraryModal(true)}
                  className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0F172A] text-xs font-bold border border-[#CBD5E1] transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  title="استعراض أشهر فخاخ البكالوريا الجاهزة"
                >
                  <HiLightBulb className="w-4 h-4 text-amber-500" />
                  <span className="hidden sm:inline">بنك الفخاخ الشائعة</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="p-2.5 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] border border-[#CBD5E1] transition-colors cursor-pointer"
                  title="طباعة كراس الأخطاء (A4)"
                >
                  <HiPrinter className="w-4 h-4" />
                </button>

                <button
                  onClick={handleExportBackup}
                  className="p-2.5 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] border border-[#CBD5E1] transition-colors cursor-pointer"
                  title="تصدير نسخة احتياطية من كراسك"
                >
                  <HiDownload className="w-4 h-4" />
                </button>

                <label 
                  className="p-2.5 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] border border-[#CBD5E1] transition-colors cursor-pointer flex items-center justify-center"
                  title="استيراد كراس أخطاء سابق"
                >
                  <HiUpload className="w-4 h-4" />
                  <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
                </label>
              </div>

            </div>

          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
          
          {/* 1. Stats Counter Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-xl font-bold">
                📓
              </div>
              <div>
                <span className="text-xl font-black text-[#0F172A] block">{totalCount}</span>
                <span className="text-[11px] text-[#64748B] font-medium">إجمالي الملاحظات</span>
              </div>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center text-xl font-bold">
                ⏳
              </div>
              <div>
                <span className="text-xl font-black text-[#0F172A] block">{pendingCount}</span>
                <span className="text-[11px] text-[#64748B] font-medium">بحاجة لمراجعة</span>
              </div>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center text-xl font-bold">
                ✓
              </div>
              <div>
                <span className="text-xl font-black text-[#0F172A] block">{masteredCount}</span>
                <span className="text-[11px] text-[#64748B] font-medium">تم الاستيعاب</span>
              </div>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 text-[#E11D48] flex items-center justify-center text-xl font-bold">
                🎯
              </div>
              <div>
                <span className="text-xl font-black text-[#0F172A] block">{masteryPercentage}%</span>
                <span className="text-[11px] text-[#64748B] font-medium">نسبة الإتقان والتثبيت</span>
              </div>
            </div>

          </div>

          {/* 2. Filter & Search Toolbar */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
            
            {/* Search Input + Status Filter */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <HiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="ابحث في فخاخك، القوانين، أو الكلمات المفتاحية..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-3 pr-9 py-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#E11D48]"
                />
              </div>

              {/* Status Segmented Buttons */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#F1F5F9] text-xs font-bold self-stretch sm:self-auto">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    statusFilter === 'all' ? 'bg-white text-[#0F172A] shadow-xs' : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  الكل ({totalCount})
                </button>
                <button
                  onClick={() => setStatusFilter('pending')}
                  className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    statusFilter === 'pending' ? 'bg-white text-amber-600 shadow-xs' : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  قيد المراجعة ({pendingCount})
                </button>
                <button
                  onClick={() => setStatusFilter('mastered')}
                  className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    statusFilter === 'mastered' ? 'bg-white text-emerald-600 shadow-xs' : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  تم الاستيعاب ({masteredCount})
                </button>
              </div>
            </div>

            {/* Subject Selector Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              <button
                onClick={() => setSelectedSubject('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  selectedSubject === 'all'
                    ? 'bg-[#0F172A] text-white shadow-2xs'
                    : 'bg-[#F8FAFC] text-[#475569] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                }`}
              >
                جميع المواد
              </button>

              {SUBJECT_OPTIONS.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubject(sub.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    selectedSubject === sub.id
                      ? 'bg-[#E11D48] text-white shadow-2xs'
                      : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                  }`}
                >
                  <span>{sub.icon}</span>
                  <span>{sub.name}</span>
                </button>
              ))}
            </div>

          </div>

          {/* 3. Mistakes Cards List */}
          {filteredMistakes.length === 0 ? (
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-12 text-center space-y-3 shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-500 mx-auto flex items-center justify-center text-3xl">
                📝
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">لا توجد فخاخ أو أخطاء مسجلة تطابق بحثك</h3>
              <p className="text-xs text-[#64748B] max-w-md mx-auto">
                ابدأ بتدوين أول خطأ واجهته في التمارين أو اضغط على "بنك الفخاخ الشائعة" لإضافة فخاخ جاهزة.
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E11D48] hover:bg-[#be123c] text-white text-xs font-bold transition-colors cursor-pointer mt-2"
              >
                <HiPlus className="w-4 h-4" />
                <span>تدوين خطأ الآن</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence>
                {filteredMistakes.map((item) => {
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className={`bg-white border rounded-2xl p-5 shadow-xs transition-all flex flex-col justify-between relative overflow-hidden ${
                        item.isMastered 
                          ? 'border-emerald-200 bg-emerald-50/10' 
                          : 'border-[#E2E8F0] hover:border-slate-300'
                      }`}
                    >
                      {/* Top Badges */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold border border-slate-200/60 flex items-center gap-1">
                              <span>{item.subjectName}</span>
                            </span>

                            <span className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 text-[10px] font-medium border border-slate-200/40">
                              {item.unit}
                            </span>

                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                              {item.levelLabel || '⚠️ فخ بكالوريا'}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleToggleMastered(item.id)}
                              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                item.isMastered
                                  ? 'bg-emerald-500 text-white border-emerald-400'
                                  : 'bg-slate-50 text-slate-400 hover:text-emerald-600 border-slate-200'
                              }`}
                              title={item.isMastered ? 'تم الاستيعاب والإتقان ✓ (اضغط للإلغاء)' : 'تأشير: تم الاستيعاب'}
                            >
                              <HiCheck className="w-4 h-4 font-bold" />
                            </button>

                            <button
                              onClick={() => handleDeleteMistake(item.id)}
                              className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:text-rose-600 border border-slate-200 transition-colors cursor-pointer"
                              title="حذف من الكراس"
                            >
                              <HiTrash className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Title & Context */}
                        <h3 className="text-sm font-black text-[#0F172A] mb-2.5 leading-snug">
                          {item.title}
                        </h3>

                        {/* The Mistake (Red/Amber Box) */}
                        {item.mistake && (
                          <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-100 text-xs text-rose-900 mb-2.5 leading-relaxed">
                            <strong className="block text-rose-800 font-bold mb-0.5 flex items-center gap-1">
                              <span>❌ الخطأ الذي وقعت فيه:</span>
                            </strong>
                            <p className="text-[11px] text-rose-950 font-medium">
                              {item.mistake}
                            </p>
                          </div>
                        )}

                        {/* Golden Rule / Correction (Emerald Box) */}
                        <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-950 leading-relaxed">
                          <strong className="block text-emerald-800 font-bold mb-0.5 flex items-center gap-1">
                            <span>✅ القاعدة الذهبية لتفادي الفخ:</span>
                          </strong>
                          <p className="text-[11px] text-emerald-950 font-semibold">
                            {item.rule}
                          </p>
                        </div>

                        {/* Optional Attached Image Preview */}
                        {item.image && (
                          <div className="mt-3 rounded-xl overflow-hidden border border-[#E2E8F0] max-h-48 bg-slate-100">
                            <img src={item.image} alt="توضيح الخطأ" className="w-full h-full object-contain" />
                          </div>
                        )}
                      </div>

                      {/* Footer Info */}
                      <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-[11px] text-[#94A3B8]">
                        <span>تاريخ التدوين: {item.createdAt || 'دورة 2026'}</span>
                        {item.isMastered && (
                          <span className="text-emerald-600 font-bold flex items-center gap-1">
                            <span>متقن ومحفوظ</span>
                            <span>✓</span>
                          </span>
                        )}
                      </div>

                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}

        </div>

      </div>

      {/* ========================================================================= */}
      {/* ➕ MODAL: ADD NEW MISTAKE ENTRY */}
      {/* ========================================================================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl bg-white border border-[#E2E8F0] rounded-2xl shadow-2xl overflow-hidden my-6"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#E11D48] text-white flex items-center justify-center font-bold">
                  ✍️
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">
                    تدوين فخ أو خطأ جديد في كراسك
                  </h3>
                  <span className="text-[11px] text-[#64748B]">سجل الخطأ والقاعدة الذهبية لترسيخها</span>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-[#0F172A] cursor-pointer"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleAddMistake} className="p-4 sm:p-6 space-y-4 text-xs">
              
              {/* Subject & Unit Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">
                    المادة الدراسية:
                  </label>
                  <select
                    value={formData.subjectId}
                    onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3 py-2 text-[#0F172A] font-bold focus:outline-none focus:border-[#E11D48] cursor-pointer"
                  >
                    {SUBJECT_OPTIONS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.icon} {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">
                    الوحدة أو المحور:
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: الدوال الأسية / المتابعة الزمنية"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3 py-2 text-[#0F172A] font-medium focus:outline-none focus:border-[#E11D48]"
                  />
                </div>
              </div>

              {/* Severity Level */}
              <div>
                <label className="block font-bold text-[#0F172A] mb-1">
                  تصنيف الفخ / نوع الخطأ:
                </label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3 py-2 text-[#0F172A] font-bold focus:outline-none focus:border-[#E11D48] cursor-pointer"
                >
                  {SEVERITY_LEVELS.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.label} ({l.desc})
                    </option>
                  ))}
                </select>
              </div>

              {/* Mistake Title Context */}
              <div>
                <label className="block font-bold text-[#0F172A] mb-1">
                  عنوان المسألة / سياق السؤال: <span className="text-[#E11D48]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: حساب نهاية دالة مركبة عند اللانهاية وإزالة حالة عدم التعيين"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3 py-2 text-[#0F172A] font-bold focus:outline-none focus:border-[#E11D48]"
                />
              </div>

              {/* What went wrong */}
              <div>
                <label className="block font-bold text-[#0F172A] mb-1">
                  ❌ الخطأ الذي وقعت فيه (أو التفكير الخاطئ):
                </label>
                <textarea
                  rows="2"
                  placeholder="مثال: نسيت وضع القيمة المطلقة عند إخراج x من تحت الجذر مما أدى لخطأ في الإشارة عند ناقص لانهاية..."
                  value={formData.mistake}
                  onChange={(e) => setFormData({ ...formData, mistake: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3 py-2 text-[#0F172A] font-medium focus:outline-none focus:border-[#E11D48] leading-relaxed"
                />
              </div>

              {/* Golden Rule / Correction */}
              <div>
                <label className="block font-bold text-[#0F172A] mb-1">
                  ✅ القاعدة الذهبية لتفادي هذا الفخ مستقبلاً: <span className="text-[#E11D48]">*</span>
                </label>
                <textarea
                  rows="3"
                  required
                  placeholder="مثال: عند x يؤول إلى -inf فإن sqrt(x^2) = -x؛ انتبه دائماً لإشارة x قبل إخراجه عاملاً مشتركاً!"
                  value={formData.rule}
                  onChange={(e) => setFormData({ ...formData, rule: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3 py-2 text-[#0F172A] font-bold focus:outline-none focus:border-emerald-500 leading-relaxed"
                />
              </div>

              {/* Optional Photo Attachment */}
              <div>
                <label className="block font-bold text-[#0F172A] mb-1 flex items-center gap-1">
                  <HiPhotograph className="w-4 h-4 text-slate-500" />
                  <span>إرفاق صورة للمسألة أو القانون (اختياري):</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-xs text-slate-500 file:mr-0 file:ml-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#475569] font-bold transition-colors cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#E11D48] hover:bg-[#be123c] text-white font-bold transition-all shadow-xs cursor-pointer"
                >
                  حفظ في كراسي 📓
                </button>
              </div>

            </form>
          </motion.div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 💡 MODAL: COMMON BAC TRAPS LIBRARY */}
      {/* ========================================================================= */}
      {showTrapsLibraryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl bg-white border border-[#E2E8F0] rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[85vh] flex flex-col"
          >
            <div className="p-4 sm:p-5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold">
                  💡
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">
                    بنك فخاخ البكالوريا الشائعة (Starter Traps Bank)
                  </h3>
                  <span className="text-[11px] text-[#64748B]">فخاخ نموذجية مختارة من تصحيحات البكالوريات السابقة</span>
                </div>
              </div>
              <button
                onClick={() => setShowTrapsLibraryModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-[#0F172A] cursor-pointer"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-3 flex-1 text-xs">
              {COMMON_BAC_TRAPS.map((trap, idx) => {
                const isAlreadyAdded = mistakes.some((m) => m.id === trap.id || m.title === trap.title);
                return (
                  <div key={idx} className="p-4 rounded-xl border border-[#E2E8F0] bg-white hover:border-slate-300 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                          {trap.subjectName}
                        </span>
                        <span className="text-[10px] text-[#64748B]">({trap.unit})</span>
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-md">
                          {trap.levelLabel}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAddCuratedTrap(trap)}
                        disabled={isAlreadyAdded}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer ${
                          isAlreadyAdded
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : 'bg-[#E11D48] hover:bg-[#be123c] text-white shadow-2xs'
                        }`}
                      >
                        {isAlreadyAdded ? (
                          <>
                            <HiCheck className="w-3.5 h-3.5" />
                            <span>مضاف</span>
                          </>
                        ) : (
                          <>
                            <HiPlus className="w-3.5 h-3.5" />
                            <span>أضف لكراسي</span>
                          </>
                        )}
                      </button>
                    </div>

                    <h4 className="font-black text-xs text-[#0F172A]">{trap.title}</h4>
                    <p className="text-[11px] text-rose-900 bg-rose-50/70 p-2 rounded-lg border border-rose-100">
                      <strong>❌ الفخ:</strong> {trap.mistake}
                    </p>
                    <p className="text-[11px] text-emerald-950 bg-emerald-50/70 p-2 rounded-lg border border-emerald-100 font-semibold">
                      <strong>✅ الحل والقاعدة:</strong> {trap.rule}
                    </p>
                  </div>
                );
              })}
            </div>

          </motion.div>
        </div>
      )}

    </div>
  );
}
