import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiHome, 
  HiChevronLeft, 
  HiSparkles, 
  HiDocumentText, 
  HiPhotograph, 
  HiClipboardCopy, 
  HiPrinter, 
  HiDownload, 
  HiRefresh, 
  HiCheckCircle, 
  HiKey, 
  HiInformationCircle, 
  HiBookOpen,
  HiLightningBolt,
  HiLightBulb,
  HiTrash,
  HiExternalLink
} from 'react-icons/hi';
import { 
  extractTextFromPdf, 
  fileToBase64, 
  generateAiSummary, 
  generateLocalHeuristicSummary 
} from '../services/aiSummarizerService';

export default function AiSummarizerPage() {
  const [inputTab, setInputTab] = useState('file'); // 'file' | 'text'
  const [selectedFile, setSelectedFile] = useState(null);
  const [rawText, setRawText] = useState('');
  const [summaryMode, setSummaryMode] = useState('comprehensive'); // 'comprehensive' | 'high_yield' | 'questions' | 'mindmap'
  
  // API Key State (Default to secure environment key if provided by platform)
  const [apiKey, setApiKey] = useState(() => {
    try {
      return localStorage.getItem('naja7i_gemini_api_key') || import.meta.env.VITE_GEMINI_API_KEY || '';
    } catch {
      return import.meta.env.VITE_GEMINI_API_KEY || '';
    }
  });
  const [showKeySettings, setShowKeySettings] = useState(false);
  const [tempKey, setTempKey] = useState('');

  // Generation & Status
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [summaryResult, setSummaryResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [copiedToast, setCopiedToast] = useState(false);

  // History State
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('naja7i_ai_summaries_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleSaveApiKey = () => {
    const trimmed = tempKey.trim();
    setApiKey(trimmed);
    try {
      localStorage.setItem('naja7i_gemini_api_key', trimmed);
    } catch (e) {
      console.error(e);
    }
    setShowKeySettings(false);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelected = (file) => {
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'text/plain'];
    if (!validTypes.some(t => file.type.includes(t) || file.name.endsWith('.pdf') || file.name.endsWith('.txt'))) {
      setErrorMessage('يرجى اختيار ملف PDF أو صورة درس (JPG, PNG) أو ملف نصي.');
      return;
    }
    setSelectedFile(file);
    setErrorMessage(null);
  };

  const handleStartSummarize = async () => {
    if (inputTab === 'file' && !selectedFile) {
      setErrorMessage('يرجى اختيار أو سحب ملف للتلخيص أولاً.');
      return;
    }
    if (inputTab === 'text' && !rawText.trim()) {
      setErrorMessage('يرجى كتابة أو لصق نص الدرس أولاً.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setSummaryResult(null);

    try {
      let extractedContentText = '';
      let inlineFile = null;

      if (inputTab === 'file' && selectedFile) {
        const isPdf = selectedFile.type === 'application/pdf' || selectedFile.name.endsWith('.pdf');
        const isImage = selectedFile.type.startsWith('image/');

        if (isPdf) {
          setStatusMessage('1/3: جاري قراءة ملف الـ PDF واستخراج النصوص...');
          const extracted = await extractTextFromPdf(selectedFile);
          extractedContentText = extracted.text;
          
          // If text extraction was sparse (e.g. scanned image PDF), send as inline file
          if (!extractedContentText || extractedContentText.length < 50) {
            setStatusMessage('1/3: تحويل المستند المصور للمعالجة البصرية...');
            inlineFile = await fileToBase64(selectedFile);
          }
        } else if (isImage) {
          setStatusMessage('1/3: تجهيز صورة الدرس للتحليل البصري...');
          inlineFile = await fileToBase64(selectedFile);
        } else {
          extractedContentText = await selectedFile.text();
        }
      } else {
        extractedContentText = rawText.trim();
      }

      setStatusMessage('2/3: جاري صياغة الملخص الأكاديمي بواسطة الذكاء الاصطناعي...');

      let finalSummary = '';

      if (apiKey && apiKey.trim()) {
        finalSummary = await generateAiSummary({
          apiKey,
          mode: summaryMode,
          rawText: extractedContentText,
          inlineFile
        });
      } else {
        // Fallback: If no API Key, use local heuristic summarizer
        if (extractedContentText) {
          finalSummary = generateLocalHeuristicSummary({
            text: extractedContentText
          });
        } else {
          throw new Error('يرجى إدخال مفتاح Google Gemini المجاني لمعالجة الملفات المصورة عبر الذكاء الاصطناعي.');
        }
      }

      setStatusMessage('3/3: اكتمل التلخيص بنجاح!');

      if (finalSummary.includes('[NOT_BAC_CURRICULUM]')) {
        throw new Error('⛔ عذراً، لا يمكن تلخيص هذا المحتوى! محرك الذكاء الاصطناعي مخصص حصرياً لدروس ومقررات شهادة البكالوريا الجزائرية (3AS). يرجى رفع ملف أو كتابة نص متعلق بإحدى مواد البكالوريا.');
      }

      setSummaryResult(finalSummary);

      // Save to history
      const newEntry = {
        id: 'sum_' + Date.now(),
        date: new Date().toLocaleDateString('ar-DZ', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        title: selectedFile ? selectedFile.name : 'نص دراسي ملخص',
        mode: summaryMode,
        content: finalSummary
      };
      const updatedHistory = [newEntry, ...history.slice(0, 9)];
      setHistory(updatedHistory);
      try {
        localStorage.setItem('naja7i_ai_summaries_history', JSON.stringify(updatedHistory));
      } catch (e) {
        console.error(e);
      }

    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'حدث خطأ أثناء معالجة وتلخيص الملف. يرجى المحاولة مجدداً.');
    } finally {
      setIsLoading(false);
      setStatusMessage('');
    }
  };

  const handleCopy = () => {
    if (!summaryResult) return;
    navigator.clipboard.writeText(summaryResult);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTxt = () => {
    if (!summaryResult) return;
    const blob = new Blob([summaryResult], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ملخص_الدرس_نجاحي_AI.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteHistoryItem = (id, e) => {
    e.stopPropagation();
    const filtered = history.filter(h => h.id !== id);
    setHistory(filtered);
    try {
      localStorage.setItem('naja7i_ai_summaries_history', JSON.stringify(filtered));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pb-20 font-['Cairo']">
      
      {/* Top Banner */}
      <div className="bg-white border-b border-[#E2E8F0] py-6 sm:py-8 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#64748B] mb-3">
            <Link to="/" className="hover:text-[#E11D48] flex items-center gap-1 transition-colors">
              <HiHome className="w-4 h-4" />
              <span>الرئيسية</span>
            </Link>
            <span>/</span>
            <span className="text-[#0F172A] font-bold">الملخص الذكي بالذكاء الاصطناعي (AI)</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-[#E11D48] font-bold text-xs border border-rose-200 flex items-center gap-1">
                  <HiSparkles className="w-3.5 h-3.5" />
                  <span>محرك البكالوريا الذكي 🤖</span>
                </span>
                <span className="text-xs text-[#64748B]">تلخيص ملفات PDF، صور الكراريس، وتوليد أسئلة ونقاط حفظ فورية</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
                ملخص نجاحي الذكي بالذكاء الاصطناعي
              </h1>
              <p className="text-xs sm:text-sm text-[#475569] mt-1 max-w-2xl leading-relaxed">
                ارفع أي ملف درس أو كراس أو الصق النص، وسيقوم الذكاء الاصطناعي بصياغة ملخص أكاديمي منهجي يبرز القوانين، التعاريف، والأسئلة الوزارية المتوقعة.
              </p>
            </div>

            {/* API Key Status / Toggle Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setTempKey(apiKey);
                  setShowKeySettings(!showKeySettings);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer shadow-2xs ${
                  apiKey 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100' 
                    : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                }`}
              >
                <HiKey className="w-4 h-4" />
                <span>{apiKey ? '🟢 مفتاح Gemini الذكي مفعل' : '⚙️ ضبط مفتاح الذكاء الاصطناعي'}</span>
              </button>
            </div>
          </div>

          {/* Expandable API Key Settings Bar */}
          {showKeySettings && (
            <div className="mt-5 p-4 rounded-2xl bg-[#F8FAFC] border border-[#CBD5E1] space-y-3 animate-fadeIn">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
                    <span>إعدادات مفتاح Google Gemini API المجاني:</span>
                  </h4>
                  <p className="text-[11px] text-[#64748B]">
                    احصل على مفتاح مجاني 100% وبدون بطاقة بنكية من موقع Google AI Studio للاستفادة من أقصى دقة وسرعة في التلخيص باللغة العربية.
                  </p>
                </div>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[#E11D48] font-bold hover:underline flex items-center gap-1 shrink-0"
                >
                  <span>الحصول على مفتاح مجاني</span>
                  <HiExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2">
                <input
                  type="password"
                  placeholder="الصق مفتاحك هنا (مثال: AIzaSy...)"
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                  className="w-full sm:flex-1 bg-white border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs font-mono text-[#0F172A] focus:outline-none focus:border-[#E11D48]"
                />
                <button
                  onClick={handleSaveApiKey}
                  className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  حفظ وتفعيل
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left / Top Controls & Upload Box (5 cols) */}
        <div className="lg:col-span-5 space-y-5 print:hidden">
          
          {/* Input Options Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-4">
            
            {/* Input Mode Selector (File vs Text) */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#F1F5F9] rounded-xl">
              <button
                onClick={() => setInputTab('file')}
                className={`py-2 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                  inputTab === 'file' 
                    ? 'bg-white text-[#0F172A] shadow-xs' 
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <HiDocumentText className="w-4 h-4 text-[#E11D48]" />
                <span>رفع ملف PDF / صورة</span>
              </button>

              <button
                onClick={() => setInputTab('text')}
                className={`py-2 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                  inputTab === 'text' 
                    ? 'bg-white text-[#0F172A] shadow-xs' 
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <HiPhotograph className="w-4 h-4 text-[#E11D48]" />
                <span>لصق نص الدرس</span>
              </button>
            </div>

            {/* Tab 1: File Dropzone */}
            {inputTab === 'file' && (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
                className="border-2 border-dashed border-[#CBD5E1] hover:border-[#E11D48] rounded-2xl p-6 text-center transition-all bg-[#F8FAFC] space-y-3 cursor-pointer group"
                onClick={() => document.getElementById('file-upload-input').click()}
              >
                <input
                  id="file-upload-input"
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg,.webp,.txt"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileSelected(e.target.files[0])}
                />

                <div className="w-12 h-12 rounded-2xl bg-white border border-[#E2E8F0] text-[#E11D48] flex items-center justify-center text-2xl mx-auto shadow-2xs group-hover:scale-105 transition-transform">
                  📄
                </div>

                {selectedFile ? (
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-emerald-700 block truncate max-w-xs mx-auto">
                      ✓ {selectedFile.name}
                    </span>
                    <span className="text-[11px] text-[#64748B] block font-mono">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                      }}
                      className="text-[11px] text-rose-600 font-bold hover:underline cursor-pointer pt-1"
                    >
                      تغيير الملف ↺
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-[#0F172A]">
                      اضغط لاختيار ملف أو اسحبه إلى هنا
                    </p>
                    <p className="text-[11px] text-[#64748B]">
                      يدعم ملفات PDF، صور الكراريس والمذكرات (JPG, PNG) حتى 30 صفحة
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Raw Text Input */}
            {inputTab === 'text' && (
              <div>
                <textarea
                  rows={6}
                  placeholder="الصق نص الدرس أو المذكرة أو العناصر التي تريد تلخيصها هنا..."
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl p-3 text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#E11D48] leading-relaxed"
                />
              </div>
            )}

            {/* Summary Mode Selector */}
            <div className="space-y-1.5 pt-2 border-t border-[#E2E8F0]">
              <label className="block text-[11px] font-bold text-[#64748B]">
                اختر نمط التلخيص المطلوب:
              </label>

              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setSummaryMode('comprehensive')}
                  className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                    summaryMode === 'comprehensive'
                      ? 'bg-rose-50 border-[#E11D48] text-[#E11D48]'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569]'
                  }`}
                >
                  <span className="text-xs font-bold block">📑 ملخص شامل ومفصل</span>
                  <span className="text-[10px] text-[#64748B]">مفاهيم، قوانين، وبطاقات حفظ</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSummaryMode('high_yield')}
                  className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                    summaryMode === 'high_yield'
                      ? 'bg-rose-50 border-[#E11D48] text-[#E11D48]'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569]'
                  }`}
                >
                  <span className="text-xs font-bold block">⚡ مركز ليلة الامتحان</span>
                  <span className="text-[10px] text-[#64748B]">قوانين وفخاخ البكالوريا</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSummaryMode('questions')}
                  className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                    summaryMode === 'questions'
                      ? 'bg-rose-50 border-[#E11D48] text-[#E11D48]'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569]'
                  }`}
                >
                  <span className="text-xs font-bold block">🧠 توليد أسئلة وتطبيقات</span>
                  <span className="text-[10px] text-[#64748B]">QCM ومسائل مع الحل</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSummaryMode('mindmap')}
                  className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                    summaryMode === 'mindmap'
                      ? 'bg-rose-50 border-[#E11D48] text-[#E11D48]'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569]'
                  }`}
                >
                  <span className="text-xs font-bold block">🗺️ مخطط ذهني نصي</span>
                  <span className="text-[10px] text-[#64748B]">هيكلة وتسلسل مفاهيمي</span>
                </button>
              </div>
            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
                <span className="shrink-0 mt-0.5">⚠️</span>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Main Action Button */}
            <button
              onClick={handleStartSummarize}
              disabled={isLoading}
              className={`w-full py-3.5 rounded-xl text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer ${
                isLoading 
                  ? 'bg-slate-400 cursor-not-allowed' 
                  : 'bg-[#E11D48] hover:bg-[#be123c] active:scale-98'
              }`}
            >
              <HiSparkles className="w-4 h-4" />
              <span>{isLoading ? (statusMessage || 'جاري التلخيص بالذكاء الاصطناعي...') : 'تلخيص الدرس الآن ✨'}</span>
            </button>

          </div>

          {/* Recent History Card */}
          {history.length > 0 && (
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
                <span className="text-xs font-bold text-[#0F172A]">ملخصاتك السابقة:</span>
                <span className="text-[10px] text-[#64748B] font-mono">{history.length} ملخص</span>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {history.map((h) => (
                  <div
                    key={h.id}
                    onClick={() => {
                      setSummaryResult(h.content);
                      setSubjectName(h.subjectName);
                    }}
                    className="p-2.5 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-between gap-2 cursor-pointer transition-colors group"
                  >
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-[#0F172A] group-hover:text-[#E11D48] block truncate">
                        {h.title}
                      </span>
                      <span className="text-[10px] text-[#64748B]">
                        {h.subjectName} • {h.date}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleDeleteHistoryItem(h.id, e)}
                      title="حذف من السجل"
                      className="text-[#94A3B8] hover:text-rose-600 p-1 cursor-pointer"
                    >
                      <HiTrash className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right / Bottom Output View (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Summary Display Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs min-h-[500px] flex flex-col justify-between">
            
            {/* Header & Quick Action Buttons */}
            <div>
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4 mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#E11D48] border border-rose-200 flex items-center justify-center text-sm font-bold shadow-2xs">
                    📝
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0F172A]">
                      الملخص المنهجي المنظم
                    </h3>
                    <span className="text-[11px] text-[#64748B]">
                      تم التوليد والتعرف التلقائي على المادة والشعبة بواسطة الذكاء الاصطناعي 🤖
                    </span>
                  </div>
                </div>

                {summaryResult && (
                  <div className="flex items-center gap-1.5 print:hidden">
                    <button
                      onClick={handleCopy}
                      className="px-2.5 py-1.5 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F172A] text-xs font-bold border border-[#CBD5E1] flex items-center gap-1 transition-colors cursor-pointer"
                      title="نسخ النص"
                    >
                      <HiClipboardCopy className="w-3.5 h-3.5 text-[#E11D48]" />
                      <span>{copiedToast ? 'تم النسخ ✓' : 'نسخ'}</span>
                    </button>

                    <button
                      onClick={handlePrint}
                      className="px-2.5 py-1.5 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F172A] text-xs font-bold border border-[#CBD5E1] flex items-center gap-1 transition-colors cursor-pointer"
                      title="طباعة"
                    >
                      <HiPrinter className="w-3.5 h-3.5" />
                      <span>طباعة</span>
                    </button>

                    <button
                      onClick={handleDownloadTxt}
                      className="px-2.5 py-1.5 rounded-lg bg-[#E11D48] hover:bg-[#be123c] text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                      title="تحميل كملف Markdown"
                    >
                      <HiDownload className="w-3.5 h-3.5" />
                      <span>تحميل</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Main Content Render */}
              {isLoading ? (
                <div className="py-20 text-center space-y-4">
                  <div className="inline-block p-4 rounded-2xl bg-rose-50 border border-rose-200 animate-pulse">
                    <HiSparkles className="w-10 h-10 text-[#E11D48]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-[#0F172A]">
                      {statusMessage || 'الذكاء الاصطناعي يحلل الدرس الآن...'}
                    </h4>
                    <p className="text-xs text-[#64748B] max-w-sm mx-auto">
                      يتم استخراج القوانين والمفاهيم والأسئلة وفق المعايير الرسمية لوزارة التربية الوطنية.
                    </p>
                  </div>
                </div>
              ) : summaryResult ? (
                <div className="prose prose-sm max-w-none text-[#0F172A] leading-relaxed space-y-3 font-['Cairo']">
                  {summaryResult.split('\n').map((paragraph, idx) => {
                    const trimmed = paragraph.trim();
                    if (!trimmed) return null;

                    // Header 1 (# Title)
                    if (trimmed.startsWith('# ')) {
                      return (
                        <h1 key={idx} className="text-lg sm:text-xl font-black text-[#0F172A] border-b border-[#E2E8F0] pb-2.5 mt-5 text-[#E11D48] flex items-center gap-2">
                          <span>{trimmed.replace('# ', '')}</span>
                        </h1>
                      );
                    }

                    // Header 2 (## Section)
                    if (trimmed.startsWith('## ')) {
                      return (
                        <h2 key={idx} className="text-sm sm:text-base font-black text-[#0F172A] mt-5 mb-2 pb-1 border-b border-slate-100 flex items-center gap-2">
                          <span className="w-2 h-4 bg-[#E11D48] rounded-xs"></span>
                          <span>{trimmed.replace('## ', '')}</span>
                        </h2>
                      );
                    }

                    // Header 3 (### Sub-section)
                    if (trimmed.startsWith('### ')) {
                      return (
                        <h3 key={idx} className="text-xs sm:text-sm font-bold text-[#0F172A] mt-3 mb-1 text-slate-800">
                          {trimmed.replace('### ', '')}
                        </h3>
                      );
                    }

                    // Tree Mindmap Line (├── └──)
                    if (trimmed.includes('├──') || trimmed.includes('└──') || trimmed.includes('│')) {
                      return (
                        <div key={idx} className="p-1.5 px-3 rounded-lg bg-[#0F172A] text-emerald-300 font-mono text-xs my-1 font-bold overflow-x-auto whitespace-pre">
                          {trimmed}
                        </div>
                      );
                    }

                    // Table Row
                    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
                      if (trimmed.includes('---')) return null; // Separator row
                      const cells = trimmed.split('|').map(c => c.trim()).filter(Boolean);
                      return (
                        <div key={idx} className="grid grid-flow-col auto-cols-fr gap-2 p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-medium my-1">
                          {cells.map((c, cIdx) => (
                            <span key={cIdx} className="truncate">{c}</span>
                          ))}
                        </div>
                      );
                    }

                    // Bullet points (- or • or *)
                    if (trimmed.startsWith('- ') || trimmed.startsWith('• ') || trimmed.startsWith('* ')) {
                      const cleanText = trimmed.replace(/^[-•*]\s*/, '');
                      return (
                        <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#334155] my-1 pr-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] mt-2 shrink-0"></span>
                          <span className="leading-relaxed">
                            {cleanText.split(/(\*\*.*?\*\*)/).map((chunk, cIdx) => {
                              if (chunk.startsWith('**') && chunk.endsWith('**')) {
                                return <strong key={cIdx} className="font-bold text-[#0F172A]">{chunk.slice(2, -2)}</strong>;
                              }
                              return chunk;
                            })}
                          </span>
                        </div>
                      );
                    }

                    // Numbered List (1. 2. 3.)
                    if (trimmed.match(/^\d+[\.\-\)]/)) {
                      return (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#334155] my-1.5 pr-1">
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 text-[#0F172A] font-mono font-bold text-[11px] shrink-0 border border-slate-200">
                            {trimmed.match(/^\d+/)?.[0]}
                          </span>
                          <span className="leading-relaxed">
                            {trimmed.replace(/^\d+[\.\-\)]\s*/, '').split(/(\*\*.*?\*\*)/).map((chunk, cIdx) => {
                              if (chunk.startsWith('**') && chunk.endsWith('**')) {
                                return <strong key={cIdx} className="font-bold text-[#0F172A]">{chunk.slice(2, -2)}</strong>;
                              }
                              return chunk;
                            })}
                          </span>
                        </div>
                      );
                    }

                    // Callout (> Note)
                    if (trimmed.startsWith('> ')) {
                      return (
                        <div key={idx} className="p-3 rounded-xl bg-rose-50/80 border-r-4 border-r-[#E11D48] border border-rose-200 text-rose-950 text-xs leading-relaxed my-2.5 font-medium shadow-2xs">
                          {trimmed.replace('> ', '').split(/(\*\*.*?\*\*)/).map((chunk, cIdx) => {
                            if (chunk.startsWith('**') && chunk.endsWith('**')) {
                              return <strong key={cIdx} className="font-bold text-rose-950">{chunk.slice(2, -2)}</strong>;
                            }
                            return chunk;
                          })}
                        </div>
                      );
                    }

                    // Standard Paragraph
                    return (
                      <p key={idx} className="text-xs sm:text-sm text-[#475569] leading-relaxed my-1">
                        {trimmed.split(/(\*\*.*?\*\*)/).map((chunk, cIdx) => {
                          if (chunk.startsWith('**') && chunk.endsWith('**')) {
                            return <strong key={cIdx} className="font-bold text-[#0F172A]">{chunk.slice(2, -2)}</strong>;
                          }
                          return chunk;
                        })}
                      </p>
                    );
                  })}
                </div>
              ) : errorMessage ? (
                <div className="py-16 text-center space-y-4 max-w-md mx-auto">
                  <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 text-3xl flex items-center justify-center mx-auto shadow-2xs">
                    ⛔
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm sm:text-base font-black text-[#0F172A]">
                      تنبيه التحقق من المنهاج الوزاري 🇩🇿
                    </h4>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      {errorMessage}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setErrorMessage(null);
                      setSelectedFile(null);
                      setRawText('');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    اختيار ملف درس بكالوريا آخر ↺
                  </button>
                </div>
              ) : (
                <div className="py-24 text-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-3xl flex items-center justify-center mx-auto shadow-2xs">
                    💡
                  </div>
                  <h4 className="text-sm font-bold text-[#0F172A]">
                    في انتظار رفع الملف أو كتابة نص الدرس
                  </h4>
                  <p className="text-xs text-[#64748B] max-w-sm mx-auto leading-relaxed">
                    اختر ملفك من الجهة اليمنى وحدد نمط التلخيص الذي يناسبك لتحصل على ملخص أكاديمي جاهز ومعد للمراجعة.
                  </p>
                </div>
              )}
            </div>

            {/* Footer Notice */}
            {summaryResult && (
              <div className="pt-6 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-[#64748B] flex-wrap gap-2 print:hidden">
                <span>تم التوليد وفق المنهاج الوزاري المعتمد • منصة نجاحي 🇩🇿</span>
                <span className="font-mono text-emerald-700 font-bold">جاهز للمراجعة ✓</span>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
