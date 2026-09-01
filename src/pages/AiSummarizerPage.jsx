import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiHome, 
  HiSparkles, 
  HiDocumentText, 
  HiPhotograph, 
  HiClipboardCopy, 
  HiPrinter, 
  HiDownload, 
  HiTrash,
  HiKey,
  HiExternalLink,
  HiX,
  HiCheckCircle,
  HiInformationCircle
} from 'react-icons/hi';
import { 
  extractTextFromPdf, 
  fileToBase64, 
  generateAiSummary, 
  generateLocalHeuristicSummary,
  parseMindmapTextToJson,
  getPlatformDefaultApiKey,
  saveUserApiKey
} from '../services/aiSummarizerService';
import VisualMindmapViewer from '../components/VisualMindmapViewer';
import MarkdownContentRenderer from '../components/MarkdownContentRenderer';

export default function AiSummarizerPage() {
  const [inputTab, setInputTab] = useState('file'); // 'file' | 'text'
  const [selectedFile, setSelectedFile] = useState(null);
  const [rawText, setRawText] = useState('');
  const [summaryMode, setSummaryMode] = useState('mindmap'); // 'comprehensive' | 'high_yield' | 'questions' | 'mindmap'
  const [activeViewTab, setActiveViewTab] = useState('mindmap'); // 'mindmap' | 'text'
  
  // Custom API Key Management
  const [apiKey, setApiKey] = useState(getPlatformDefaultApiKey());
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [inputKeyTemp, setInputKeyTemp] = useState('');

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

  useEffect(() => {
    setApiKey(getPlatformDefaultApiKey());
  }, []);

  const handleSaveApiKey = () => {
    saveUserApiKey(inputKeyTemp);
    setApiKey(inputKeyTemp.trim());
    setIsKeyModalOpen(false);
    setErrorMessage(null);
  };

  const handleClearApiKey = () => {
    saveUserApiKey('');
    setApiKey('');
    setInputKeyTemp('');
    setIsKeyModalOpen(false);
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

  const handleStartSummarize = async (forceLocal = false) => {
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

      setStatusMessage('2/3: جاري صياغة الملخص الأكاديمي...');

      let finalSummary = '';

      if (!forceLocal && apiKey && apiKey.trim()) {
        try {
          finalSummary = await generateAiSummary({
            apiKey,
            mode: summaryMode,
            rawText: extractedContentText,
            inlineFile
          });
        } catch (aiErr) {
          // If AI fails, offer clear error and fallback
          if (extractedContentText) {
            console.warn('AI failed, fallback to local summarizer:', aiErr);
            setErrorMessage(`${aiErr.message} (يمكنك التلخيص بالوضع المحلي أدناه أو تحديث مفتاح API).`);
            finalSummary = generateLocalHeuristicSummary({
              text: extractedContentText,
              subjectName: selectedFile ? selectedFile.name.replace(/\.[^/.]+$/, '') : 'الدرس'
            });
          } else {
            throw aiErr;
          }
        }
      } else {
        // Fallback: Use local heuristic summarizer
        if (extractedContentText) {
          finalSummary = generateLocalHeuristicSummary({
            text: extractedContentText,
            subjectName: selectedFile ? selectedFile.name.replace(/\.[^/.]+$/, '') : 'الدرس'
          });
        } else {
          throw new Error('يرجى إدخال مفتاح Google Gemini API المجاني الخاص بك لمعالجة الصور والمستندات عبر الذكاء الاصطناعي.');
        }
      }

      setStatusMessage('3/3: اكتمل التلخيص بنجاح!');

      setSummaryResult(finalSummary);
      if (summaryMode === 'mindmap') {
        setActiveViewTab('mindmap');
      } else {
        setActiveViewTab('text');
      }

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
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pb-20 font-['Cairo']" dir="rtl">
      
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
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-xs border border-slate-200/60 flex items-center gap-1">
                  <span>محرك البكالوريا الذكي 🤖</span>
                </span>
                <span className="text-xs text-[#64748B]">تلخيص فوري للدروس، توليد أسئلة، ومخططات شجرية</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
                ملخص نجاحي الذكي بالذكاء الاصطناعي
              </h1>
              <p className="text-xs sm:text-sm text-[#475569] mt-1 max-w-2xl leading-relaxed">
                ارفع أي ملف درس أو كراس أو الصق النص، وسيقوم الذكاء الاصطناعي بصياغة ملخص أكاديمي منهجي يبرز القوانين، التعاريف، والأسئلة الوزارية المتوقعة.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setInputKeyTemp(apiKey);
                  setIsKeyModalOpen(true);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer ${
                  apiKey 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
                title="إعداد مفتاح Gemini API"
              >
                <HiKey className={`w-4 h-4 ${apiKey ? 'text-emerald-600' : 'text-slate-500'}`} />
                <span>{apiKey ? 'مفتاح Gemini API متصل ✓' : 'إدخال مفتاح Gemini API'}</span>
              </button>
            </div>
          </div>

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
                  onClick={() => setSummaryMode('mindmap')}
                  className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                    summaryMode === 'mindmap'
                      ? 'bg-rose-50 border-[#E11D48] text-[#E11D48] shadow-2xs font-bold'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:bg-[#F1F5F9]'
                  }`}
                >
                  <div className="text-xs font-bold flex items-center gap-1">
                    <span>🗺️</span>
                    <span>مخطط ذهني بصري</span>
                  </div>
                  <div className="text-[10px] text-[#64748B] mt-0.5">
                    شجرة مفاهيم تفاعلية ملونة
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSummaryMode('comprehensive')}
                  className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                    summaryMode === 'comprehensive'
                      ? 'bg-rose-50 border-[#E11D48] text-[#E11D48] shadow-2xs font-bold'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:bg-[#F1F5F9]'
                  }`}
                >
                  <div className="text-xs font-bold flex items-center gap-1">
                    <span>📑</span>
                    <span>ملخص أكاديمي شامل</span>
                  </div>
                  <div className="text-[10px] text-[#64748B] mt-0.5">
                    مفاهيم، قوانين وبطاقات مراجعة
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSummaryMode('high_yield')}
                  className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                    summaryMode === 'high_yield'
                      ? 'bg-rose-50 border-[#E11D48] text-[#E11D48] shadow-2xs font-bold'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:bg-[#F1F5F9]'
                  }`}
                >
                  <div className="text-xs font-bold flex items-center gap-1">
                    <span>⚡</span>
                    <span>مكثف ليلة الامتحان</span>
                  </div>
                  <div className="text-[10px] text-[#64748B] mt-0.5">
                    أهم القوانين و5 فخاخ منهجية
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSummaryMode('questions')}
                  className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                    summaryMode === 'questions'
                      ? 'bg-rose-50 border-[#E11D48] text-[#E11D48] shadow-2xs font-bold'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:bg-[#F1F5F9]'
                  }`}
                >
                  <div className="text-xs font-bold flex items-center gap-1">
                    <span>❓</span>
                    <span>بنك أسئلة وتطبيقات</span>
                  </div>
                  <div className="text-[10px] text-[#64748B] mt-0.5">
                    أسئلة QCM ومسائل وزارية
                  </div>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs space-y-2">
                <div className="flex items-start gap-1.5">
                  <span className="shrink-0 text-sm">⚠️</span>
                  <span>{errorMessage}</span>
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-rose-200/60">
                  <button
                    onClick={() => handleStartSummarize(true)}
                    className="px-2.5 py-1 bg-white hover:bg-rose-100 text-rose-900 font-bold rounded-lg border border-rose-300 transition-colors text-[11px] cursor-pointer"
                  >
                    ⚡ تجربة التلخيص بالوضع المحلي
                  </button>
                  <button
                    onClick={() => {
                      setInputKeyTemp(apiKey);
                      setIsKeyModalOpen(true);
                    }}
                    className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg transition-colors text-[11px] cursor-pointer"
                  >
                    🔑 إدخال مفتاح API جديد
                  </button>
                </div>
              </div>
            )}

            {/* Action Button */}
            <button
              onClick={() => handleStartSummarize(false)}
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>{statusMessage || 'جاري التلخيص بواسطة الذكاء الاصطناعي...'}</span>
                </>
              ) : (
                <>
                  <HiSparkles className="w-4 h-4" />
                  <span>توليد الملخص والمخطط الآن ✨</span>
                </>
              )}
            </button>

          </div>

          {/* History Panel */}
          {history.length > 0 && (
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0F172A] flex items-center gap-1">
                  <span>🕒 سجل الملخصات السابقة</span>
                  <span className="text-[10px] text-[#64748B]">({history.length})</span>
                </span>
                <button
                  onClick={() => {
                    setHistory([]);
                    localStorage.removeItem('naja7i_ai_summaries_history');
                  }}
                  className="text-[10px] text-rose-600 hover:underline cursor-pointer"
                >
                  مسح السجل
                </button>
              </div>

              <div className="space-y-1.5 max-h-48 overflow-y-auto scrollbar-thin">
                {history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSummaryResult(item.content);
                      setSummaryMode(item.mode || 'mindmap');
                    }}
                    className="p-2 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-xs cursor-pointer flex items-center justify-between gap-2 group transition-colors"
                  >
                    <div className="truncate min-w-0">
                      <p className="font-bold text-[#0F172A] truncate group-hover:text-[#E11D48]">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-[#64748B]">
                        {item.date}
                      </p>
                    </div>
                    <button
                      onClick={(e) => handleDeleteHistoryItem(item.id, e)}
                      className="text-slate-400 hover:text-rose-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <HiTrash className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right / Result Area (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {summaryResult ? (
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
              
              {/* Header & Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#E2E8F0] print:hidden">
                
                {/* View Tabs */}
                <div className="flex items-center gap-1.5 p-1 bg-[#F1F5F9] rounded-xl text-xs font-bold">
                  <button
                    onClick={() => setActiveViewTab('mindmap')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                      activeViewTab === 'mindmap'
                        ? 'bg-white text-[#0F172A] shadow-xs'
                        : 'text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    <span>🗺️</span>
                    <span>المخطط البصري</span>
                  </button>

                  <button
                    onClick={() => setActiveViewTab('text')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                      activeViewTab === 'text'
                        ? 'bg-white text-[#0F172A] shadow-xs'
                        : 'text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    <span>📑</span>
                    <span>النص الكامل والبطاقات</span>
                  </button>
                </div>

                {/* Actions Toolbar */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleCopy}
                    className="p-2 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#CBD5E1] text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    title="نسخ النص"
                  >
                    <HiClipboardCopy className="w-4 h-4 text-slate-500" />
                    <span>{copiedToast ? 'تم النسخ ✓' : 'نسخ'}</span>
                  </button>

                  <button
                    onClick={handleDownloadTxt}
                    className="p-2 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#CBD5E1] text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    title="تحميل كملف Markdown"
                  >
                    <HiDownload className="w-4 h-4 text-slate-500" />
                    <span>تنزيل</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="p-2 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                    title="طباعة الملخص"
                  >
                    <HiPrinter className="w-4 h-4" />
                    <span>طباعة A4</span>
                  </button>
                </div>

              </div>

              {/* View 1: Mindmap */}
              {activeViewTab === 'mindmap' && (
                <div>
                  <VisualMindmapViewer mindmapData={parseMindmapTextToJson(summaryResult)} />
                </div>
              )}

              {/* View 2: Full Markdown Text */}
              {activeViewTab === 'text' && (
                <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed font-['Cairo']">
                  <MarkdownContentRenderer content={summaryResult} />
                </div>
              )}

            </div>
          ) : (
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-10 text-center shadow-xs space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-rose-50 text-[#E11D48] flex items-center justify-center text-3xl mx-auto shadow-2xs">
                ✨
              </div>
              <div className="max-w-md mx-auto space-y-1.5">
                <h3 className="text-base font-bold text-[#0F172A]">
                  المستشار الأكاديمي الذكي جاهز لتلخيص دروسك
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  اختر ملف PDF أو صورة درس أو الصق نصاً، ثم اضغط على «توليد الملخص والمخطط الآن» ليقوم الذكاء الاصطناعي بتحليله فورياً وصياغة مخطط تفاعلي وأسئلة وزارية.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* API Key Modal */}
      {isKeyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 text-right">
            
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">
                  <HiKey className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A]">مفتاح Google Gemini API</h3>
                  <p className="text-[10px] text-[#64748B]">لتلخيص الدروس والصور عبر نماذج الذكاء الاصطناعي</p>
                </div>
              </div>

              <button
                onClick={() => setIsKeyModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#0F172A]">
                الصق مفتاح API الخاص بك (Gemini API Key):
              </label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={inputKeyTemp}
                onChange={(e) => setInputKeyTemp(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl p-2.5 text-xs text-[#0F172A] font-mono focus:outline-none focus:border-[#E11D48]"
              />
              <p className="text-[11px] text-[#64748B] leading-relaxed">
                يتم حفظ المفتاح محلياً في متصفحك فقط ولا يتم مشاركته مع أي طرف خارجي.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#475569] space-y-1.5">
              <div className="font-bold flex items-center gap-1 text-[#0F172A]">
                <HiInformationCircle className="w-4 h-4 text-[#0284C7]" />
                <span>كيفية الحصول على مفتاح مجاني في 10 ثوانٍ:</span>
              </div>
              <p className="text-[11px]">
                1. ادخل إلى موقع <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-[#0284C7] font-bold underline inline-flex items-center gap-0.5">Google AI Studio <HiExternalLink className="w-3 h-3" /></a>
              </p>
              <p className="text-[11px]">
                2. اضغط على <strong>"Create API key"</strong> وانسخ المفتاح.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E2E8F0]">
              {apiKey && (
                <button
                  type="button"
                  onClick={handleClearApiKey}
                  className="px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                >
                  حذف المفتاح
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsKeyModalOpen(false)}
                className="px-3 py-1.5 text-xs font-bold text-[#64748B] hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={handleSaveApiKey}
                className="px-4 py-2 text-xs font-bold bg-[#E11D48] hover:bg-[#BE123C] text-white rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                حفظ المفتاح ✓
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
