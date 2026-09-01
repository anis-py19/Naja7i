import React, { useState, useEffect, useMemo } from 'react';
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
  HiX,
  HiCheckCircle,
  HiLightningBolt,
  HiClock,
  HiViewList,
  HiChevronDown,
  HiChevronUp,
  HiBookOpen,
  HiRefresh
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  extractTextFromPdf, 
  fileToBase64, 
  generateAiSummary, 
  generateLocalHeuristicSummary,
  parseMindmapTextToJson,
  extractFlashcardsFromText,
  getPlatformDefaultApiKey,
  saveUserApiKey
} from '../services/aiSummarizerService';
import VisualMindmapViewer from '../components/VisualMindmapViewer';
import MarkdownContentRenderer from '../components/MarkdownContentRenderer';
import InteractiveFlashcardsViewer from '../components/InteractiveFlashcardsViewer';

const STREAMS_LIST = [
  { id: 'sciences', name: 'علوم تجريبية', icon: '🧬' },
  { id: 'math', name: 'رياضيات', icon: '📐' },
  { id: 'technique_math', name: 'تقني رياضي', icon: '⚙️' },
  { id: 'gestion', name: 'تسيير واقتصاد', icon: '📊' },
  { id: 'lettres_philo', name: 'آداب وفلسفة', icon: '📖' },
  { id: 'langues', name: 'لغات أجنبية', icon: '🌍' }
];

const SUMMARY_MODES = [
  {
    id: 'mindmap',
    name: 'مخطط ذهني بصري',
    icon: '🗺️',
    badge: 'مفاهيم هرمية ملونة',
    desc: 'عقد مركزة ومختصرة لترسيخ الأفكار ليلة الامتحان'
  },
  {
    id: 'comprehensive',
    name: 'ملخص أكاديمي شامل',
    icon: '📑',
    badge: 'جداول وقوانين وبطاقات',
    desc: 'هيكل متكامل يجمع التعريفات، القوانين، وفخاخ البكالوريا'
  },
  {
    id: 'high_yield',
    name: 'مكثف ليلة الامتحان',
    icon: '⚡',
    badge: 'مراجعة سريعة (5 دقائق)',
    desc: 'القوانين الأساسية، أهم 5 تعاريف، وأخطر 5 فخاخ منهجية'
  },
  {
    id: 'questions',
    name: 'بنك أسئلة وتطبيقات',
    icon: '❓',
    badge: 'QCM وتطبيقات وزارية',
    desc: '5 أسئلة اختيار من متعدد ومسألة مع سلم التنقيط النموذجي'
  },
  {
    id: 'methodology',
    name: 'تفكيك منهجية الإجابة',
    icon: '🔬',
    badge: 'أفعال الأداء و Mots-clés',
    desc: 'كيف تجيب على أفعال (حلل، فسر، استنتج، بين) لنيل العلامة الكاملة'
  }
];

const QUICK_TEST_TEMPLATES = [
  {
    title: 'تسيير: الموارد البشرية في المنظمة',
    streamId: 'gestion',
    mode: 'comprehensive',
    text: `درس: إدارة وتسيير الموارد البشرية في المؤسسة الاقتصادية
مقدمة: تحتاج أي منظمة لضمان استمراريتها إلى موارد مادية، مالية، معلوماتية، وبشرية. إلا أن الاهتمام بالموارد البشرية هو الأكثر تعقيداً لأن الإنسان هو المحرك الأساسي لكافة الموارد الأخرى.
أهداف إدارة الموارد البشرية:
1. استقطاب وتوظيف الكفاءات العالية.
2. تحفيز العاملين ورفع الرضا والولاء التنظيمي.
3. تدريب وتأهيل الموظفين لمواكبة التغيرات التكنولوجية.
وظائف إدارة الموارد البشرية:
- التخطيط الكمي والنوعي للوظائف.
- التوظيف والاختيار والتعيين.
- تقييم الأداء والمكافآت والأجور.
- إدارة المسار المهني والترقيات.`
  },
  {
    title: 'علوم: الانقسام الخيطي والترجمة',
    streamId: 'sciences',
    mode: 'mindmap',
    text: `درس: التعبير المورثي والترجمة عند حقيقيات النواة
تتم عملية الترجمة على مستوى الهيولى بواسطة الريبوزومات حيث يتم تحويل الرسالة النووية المشفرة في ARNm إلى متتالية من الأحماض الأمينية المشكلة للبروتين.
المراحل الأساسية للترجمة:
1. مرحلة الانطلاق (Début): يتثبت الـ ARNm على تحت الوحدة الصغرى للريبوزوم، ويتوضع ARNt الحامل للحمض الأميني الميثيونين (AUG) في الموقع P.
2. مرحلة الاستطالة (Élongation): يتوضع ARNt الثاني حاملاً حمضه الأميني في الموقع A، وتتشكل الرابطة البيبتيدية بين الحمضين بفضل إنزيم بيبتيديل ترانسفيراز.
3. مرحلة النهاية (Terminaison): يصل الريبوزوم إلى إحدى رامزات التوقف الثلاث (UAA, UAG, UGA)، فينفصل الببتيد المتشكل وتنفصل تحت وحدتي الريبوزوم.
شروط الترجمة الأساسية: ARNm، ريبوزومات وظيفية، أحماض أمينية منشطة، طاقة بصيغة ATP، وعوامل الإطلاق والإنزيمات النوعية.`
  },
  {
    title: 'رياضيات: الأعداد المركبة والتحويلات',
    streamId: 'math',
    mode: 'high_yield',
    text: `الوحدة: الأعداد المركبة والتحويلات النقطية في المستوي المركب
1. الشكل الجبري: z = x + iy حيث x الجزء الحقيقي و y الجزء التخيلي، مع i² = -1.
2. الطويلة والعمدة: |z| = √(x² + y²)، و arg(z) = θ حيث cos(θ) = x/|z| و sin(θ) = y/|z|.
3. الشكل المثلثي والآسي: z = |z|(cos θ + i sin θ) = |z| e^(iθ).
4. دستور موافر (Moivre): (cos θ + i sin θ)^n = cos(nθ) + i sin(nθ).
5. التحويلات النقطية في المستوي:
- الانسحاب ذو الشعاع u(b): z' = z + b.
- التحاكي ذو المركز Ω(ω) والنسبة k: z' - ω = k(z - ω).
- الدوران ذو المركز Ω(ω) والزاوية θ: z' - ω = e^(iθ)(z - ω).
- التشابه المباشر ذو النسبة k والزاوية θ: z' - ω = k e^(iθ)(z - ω).`
  },
  {
    title: 'فيزياء: المتابعة الزمنية لتحول كيميائي',
    streamId: 'sciences',
    mode: 'methodology',
    text: `الوحدة 1: المتابعة الزمنية لتحول كيميائي في وسط مائي
- تصنيف التحولات الكيميائية حسب المدة المستغرقة:
  1. تحولات سريعة (لحظية).
  2. تحولات بطيئة (تستغرق ثوانٍ إلى دقائق).
  3. تحولات بطيئة جداً (تستغرق أياماً أو أشهراً).
- طرق المتابعة الزمنية المعتمدة:
  1. قياس الناقلية (Conductimétrie) في وجود شوارد.
  2. قياس ضغط أو حجم غاز منطلق.
  3. المعايرة اللونية (Dosage colorimétrique).
  4. قياس الـ pH في حالة وجود شوارد الهيدرونيوم H3O+.
- العوامل الحركية المؤثرة في سرعة التفاعل:
  1. درجة الحرارة (كلما زادت زادت التصادمات الفعالة).
  2. التراكيز الابتدائية للمتفاعلات.
  3. الوساطة ومساحة سطح التلامس.
- زمن نصف التفاعل (t1/2): هو المدة الزمنية اللازمة لبلوغ تقدم التفاعل نصف تقدمه النهائي x(t1/2) = x_final / 2.`
  }
];

export default function AiSummarizerPage() {
  const [selectedStreamId, setSelectedStreamId] = useState('sciences');
  const [inputTab, setInputTab] = useState('file'); // 'file' | 'text' | 'templates'
  const [selectedFile, setSelectedFile] = useState(null);
  const [rawText, setRawText] = useState('');
  const [summaryMode, setSummaryMode] = useState('mindmap'); // 'mindmap' | 'comprehensive' | 'high_yield' | 'questions' | 'methodology'
  const [activeViewTab, setActiveViewTab] = useState('mindmap'); // 'mindmap' | 'text' | 'flashcards'
  
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
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // History State
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('naja7i_ai_summaries_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const selectedStream = STREAMS_LIST.find(s => s.id === selectedStreamId) || STREAMS_LIST[0];
  const currentModeObj = SUMMARY_MODES.find(m => m.id === summaryMode) || SUMMARY_MODES[0];

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

  const handleLoadTemplate = (template) => {
    setInputTab('text');
    setSelectedFile(null);
    setRawText(template.text);
    setSelectedStreamId(template.streamId);
    setSummaryMode(template.mode);
    setErrorMessage(null);
  };

  const handleStartSummarize = async (forceLocal = false) => {
    if (inputTab === 'file' && !selectedFile) {
      setErrorMessage('يرجى اختيار أو سحب ملف للتلخيص أولاً.');
      return;
    }
    if ((inputTab === 'text' || inputTab === 'templates') && !rawText.trim()) {
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
          
          if (!extractedContentText || extractedContentText.length < 50) {
            setStatusMessage('1/3: تجهيز المستند المصور للتحليل البصري...');
            inlineFile = await fileToBase64(selectedFile);
          }
        } else if (isImage) {
          setStatusMessage('1/3: ضغط صورة الدرس وتجهيزها للتحليل البصري...');
          inlineFile = await fileToBase64(selectedFile);
        } else {
          extractedContentText = await selectedFile.text();
        }
      } else {
        extractedContentText = rawText.trim();
      }

      setStatusMessage(`2/3: صياغة ملخص ذكي لشعبة ${selectedStream.name}...`);

      let finalSummary = '';

      if (!forceLocal) {
        try {
          finalSummary = await generateAiSummary({
            apiKey,
            streamName: selectedStream.name,
            mode: summaryMode,
            rawText: extractedContentText,
            inlineFile
          });
        } catch (aiErr) {
          if (extractedContentText) {
            console.warn('AI cloud attempt failed, using local summarizer:', aiErr);
            setErrorMessage(`${aiErr.message} (تم التبديل للوضع المحلي التلقائي).`);
            finalSummary = generateLocalHeuristicSummary({
              text: extractedContentText,
              subjectName: selectedFile ? selectedFile.name.replace(/\.[^/.]+$/, '') : 'الدرس',
              streamName: selectedStream.name
            });
          } else {
            throw aiErr;
          }
        }
      } else {
        if (extractedContentText) {
          finalSummary = generateLocalHeuristicSummary({
            text: extractedContentText,
            subjectName: selectedFile ? selectedFile.name.replace(/\.[^/.]+$/, '') : 'الدرس',
            streamName: selectedStream.name
          });
        } else {
          throw new Error('يرجى إدخال نص أو صورة واضحة للمتابعة.');
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
        title: selectedFile ? selectedFile.name : (rawText.slice(0, 35) + '...'),
        streamName: selectedStream.name,
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
    a.download = `ملخص_${selectedStream.name}_نجاحي_AI.md`;
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

  const parsedMindmap = summaryResult ? parseMindmapTextToJson(summaryResult) : null;
  const extractedFlashcards = summaryResult ? extractFlashcardsFromText(summaryResult) : [];

  // Reading time & word count metrics
  const wordCount = useMemo(() => {
    if (!summaryResult) return 0;
    return summaryResult.trim().split(/\s+/).filter(Boolean).length;
  }, [summaryResult]);

  const readingTimeMin = Math.max(1, Math.ceil(wordCount / 180));

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pb-20 font-['Cairo']" dir="rtl">
      
      {/* Top Banner */}
      <div className="bg-white border-b border-[#E2E8F0] py-5 sm:py-6 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#64748B] mb-2.5">
            <Link to="/" className="hover:text-[#E11D48] flex items-center gap-1 transition-colors">
              <HiHome className="w-4 h-4" />
              <span>الرئيسية</span>
            </Link>
            <span>/</span>
            <span className="text-[#0F172A] font-bold">الملخص الذكي بالذكاء الاصطناعي (AI Studio)</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 font-medium text-xs border border-rose-200/60 flex items-center gap-1">
                  <span>محرك البكالوريا الذكي 🤖</span>
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-xs border border-slate-200/60 font-mono">
                  NVIDIA NIM AI ⚡ نشط
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-[#0F172A]">
                الملخص الأكاديمي والمخطط الذكي ✨
              </h1>
              <p className="text-xs text-[#475569] mt-0.5 max-w-2xl leading-relaxed">
                ارفع أي كراس أو ملف PDF أو الصق نص الدرس، وسيقوم الذكاء الاصطناعي باستخلاص القوانين، الكلمات المفتاحية الوزارية، ورسم مخطط مفاهيمي ملون.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setInputKeyTemp(apiKey);
                  setIsKeyModalOpen(true);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer ${
                  apiKey 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
                title="إعدادات الذكاء الاصطناعي والمفاتيح"
              >
                <HiKey className={`w-3.5 h-3.5 ${apiKey ? 'text-emerald-600' : 'text-slate-500'}`} />
                <span>{apiKey ? 'مفتاح مخصص ✓' : 'المحرك نشط ⚡'}</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Controls Studio (5 cols) */}
        <div className="lg:col-span-5 space-y-4 print:hidden">
          
          {/* STEP 1: مصدر الدرس (Content Input) */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-black text-[#0F172A] flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-rose-50 text-[#E11D48] flex items-center justify-center text-xs font-bold border border-rose-200">1</span>
                <span>مصدر الدرس أو الوثيقة</span>
              </span>

              {/* Input Mode Selector */}
              <div className="flex items-center bg-[#F1F5F9] p-0.5 rounded-lg text-[11px] font-bold">
                <button
                  onClick={() => setInputTab('file')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                    inputTab === 'file' ? 'bg-white text-[#E11D48] shadow-2xs' : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  <HiDocumentText className="w-3.5 h-3.5" />
                  <span>ملف / صورة</span>
                </button>
                <button
                  onClick={() => setInputTab('text')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                    inputTab === 'text' ? 'bg-white text-[#E11D48] shadow-2xs' : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  <HiPhotograph className="w-3.5 h-3.5" />
                  <span>نص</span>
                </button>
                <button
                  onClick={() => setInputTab('templates')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                    inputTab === 'templates' ? 'bg-white text-[#E11D48] shadow-2xs' : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  <span>⚡ أمثلة</span>
                </button>
              </div>
            </div>

            {/* TAB: File Upload */}
            {inputTab === 'file' && (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
                className="border-2 border-dashed border-[#CBD5E1] hover:border-[#E11D48] rounded-xl p-5 text-center transition-all bg-[#F8FAFC] space-y-2 cursor-pointer group"
                onClick={() => document.getElementById('file-upload-input').click()}
              >
                <input
                  id="file-upload-input"
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg,.webp,.txt"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileSelected(e.target.files[0])}
                />

                <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] text-[#E11D48] flex items-center justify-center text-xl mx-auto shadow-2xs group-hover:scale-105 transition-transform">
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
                      className="text-[11px] text-rose-600 font-bold hover:underline cursor-pointer"
                    >
                      تغيير الملف ↺
                    </button>
                  </div>
                ) : (
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-[#0F172A]">
                      اضغط لاختيار ملف أو اسحبه إلى هنا
                    </p>
                    <p className="text-[10px] text-[#64748B]">
                      PDF، صور الكراريس والمذكرات (JPG, PNG) حتى 30 صفحة
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB: Text Paste */}
            {inputTab === 'text' && (
              <div className="space-y-1.5">
                <textarea
                  rows={5}
                  placeholder="الصق نص الدرس أو المذكرة أو العناصر التي تريد تلخيصها هنا..."
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl p-3 text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#E11D48] leading-relaxed"
                />
                {rawText && (
                  <div className="flex justify-between items-center text-[10px] text-slate-500">
                    <span>{rawText.length} حرف</span>
                    <button onClick={() => setRawText('')} className="text-rose-600 hover:underline">مسح النص</button>
                  </div>
                )}
              </div>
            )}

            {/* TAB: Quick Templates */}
            {inputTab === 'templates' && (
              <div className="grid grid-cols-1 gap-1.5">
                {QUICK_TEST_TEMPLATES.map((tmpl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleLoadTemplate(tmpl)}
                    className="p-2.5 text-right rounded-xl bg-[#F8FAFC] hover:bg-rose-50 text-xs font-bold text-slate-700 hover:text-[#E11D48] border border-slate-200 hover:border-rose-200 transition-colors flex items-center justify-between cursor-pointer group"
                  >
                    <span className="truncate">✦ {tmpl.title}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 group-hover:bg-rose-100 group-hover:text-rose-700 shrink-0 font-medium">
                      تجربة
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* STEP 2: إعدادات الشعبة والنمط (Settings & Mode) */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
            
            {/* 1. Stream Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black text-[#0F172A] flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-rose-50 text-[#E11D48] flex items-center justify-center text-xs font-bold border border-rose-200">2</span>
                <span>الشعبة الدراسية:</span>
                <span className="text-[#E11D48] text-xs font-bold font-mono mr-auto">({selectedStream.name})</span>
              </label>

              <div className="grid grid-cols-3 gap-1.5">
                {STREAMS_LIST.map((str) => (
                  <button
                    key={str.id}
                    type="button"
                    onClick={() => setSelectedStreamId(str.id)}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer text-xs font-bold flex items-center justify-center gap-1 ${
                      selectedStreamId === str.id
                        ? 'bg-[#E11D48] text-white border-[#E11D48] shadow-2xs'
                        : 'bg-[#F8FAFC] text-slate-700 border-[#E2E8F0] hover:bg-[#F1F5F9]'
                    }`}
                  >
                    <span>{str.icon}</span>
                    <span className="truncate">{str.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Summary Mode Selector (Segmented List) */}
            <div className="space-y-1.5 pt-3 border-t border-slate-100">
              <label className="block text-xs font-black text-[#0F172A] flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-md bg-rose-50 text-[#E11D48] flex items-center justify-center text-xs font-bold border border-rose-200">3</span>
                <span>نمط المخرجات المطلوب:</span>
              </label>

              <div className="space-y-1.5">
                {SUMMARY_MODES.map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setSummaryMode(mode.id)}
                    className={`w-full p-2.5 rounded-xl border text-right transition-all cursor-pointer flex items-center justify-between gap-2 group ${
                      summaryMode === mode.id
                        ? 'bg-rose-50/80 border-[#E11D48] text-[#0F172A] shadow-2xs'
                        : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:bg-[#F1F5F9]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-base shrink-0">{mode.icon}</span>
                      <div className="truncate">
                        <span className={`block text-xs font-bold ${summaryMode === mode.id ? 'text-[#E11D48]' : 'text-[#0F172A]'}`}>
                          {mode.name}
                        </span>
                        <span className="text-[10px] text-[#64748B] block truncate">
                          {mode.desc}
                        </span>
                      </div>
                    </div>

                    <span className={`text-[10px] px-2 py-0.5 rounded-md shrink-0 font-medium ${
                      summaryMode === mode.id
                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {mode.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Error Message Bar */}
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
                    ⚡ تجربة الوضع المحلي
                  </button>
                  <button
                    onClick={() => {
                      setInputKeyTemp(apiKey);
                      setIsKeyModalOpen(true);
                    }}
                    className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg transition-colors text-[11px] cursor-pointer"
                  >
                    🔑 إدخال مفتاح Gemini
                  </button>
                </div>
              </div>
            )}

            {/* Action Trigger Button */}
            <button
              onClick={() => handleStartSummarize(false)}
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>{statusMessage || 'جاري التلخيص بالذكاء الاصطناعي...'}</span>
                </>
              ) : (
                <>
                  <HiSparkles className="w-4 h-4" />
                  <span>توليد الملخص والمخطط الآن ✨</span>
                </>
              )}
            </button>

          </div>

          {/* History Collapsible Drawer */}
          {history.length > 0 && (
            <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-xs">
              <button
                onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                className="w-full p-3.5 flex items-center justify-between text-xs font-bold text-[#0F172A] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <HiClock className="w-4 h-4 text-[#E11D48]" />
                  <span>سجل الملخصات السابقة</span>
                  <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 text-[10px] font-mono">
                    {history.length}
                  </span>
                </div>
                {isHistoryOpen ? <HiChevronUp className="w-4 h-4 text-slate-500" /> : <HiChevronDown className="w-4 h-4 text-slate-500" />}
              </button>

              {isHistoryOpen && (
                <div className="p-3 pt-0 border-t border-[#E2E8F0] space-y-1.5 max-h-48 overflow-y-auto scrollbar-thin mt-2">
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
                          {item.date} • {item.streamName || 'بكالوريا'}
                        </p>
                      </div>
                      <button
                        onClick={(e) => handleDeleteHistoryItem(item.id, e)}
                        className="text-slate-400 hover:text-rose-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="حذف"
                      >
                        <HiTrash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  
                  <div className="pt-2 text-center">
                    <button
                      onClick={() => {
                        setHistory([]);
                        localStorage.removeItem('naja7i_ai_summaries_history');
                      }}
                      className="text-[11px] text-rose-600 hover:underline font-bold"
                    >
                      مسح كامل السجل
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Right Output Canvas Studio (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {summaryResult ? (
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
              
              {/* Output Stats Bar & Navigation */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E2E8F0] print:hidden">
                
                {/* Switcher Tabs */}
                <div className="flex items-center gap-1 bg-[#F1F5F9] p-1 rounded-xl text-xs font-bold flex-wrap">
                  <button
                    onClick={() => setActiveViewTab('mindmap')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                      activeViewTab === 'mindmap'
                        ? 'bg-white text-[#E11D48] shadow-2xs'
                        : 'text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    <span>🗺️</span>
                    <span>المخطط البصري</span>
                  </button>

                  <button
                    onClick={() => setActiveViewTab('text')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                      activeViewTab === 'text'
                        ? 'bg-white text-[#E11D48] shadow-2xs'
                        : 'text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    <span>📑</span>
                    <span>الملخص الكامل</span>
                  </button>

                  <button
                    onClick={() => setActiveViewTab('flashcards')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                      activeViewTab === 'flashcards'
                        ? 'bg-white text-[#E11D48] shadow-2xs'
                        : 'text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    <span>🎴</span>
                    <span>بطاقات المراجعة ({extractedFlashcards.length})</span>
                  </button>
                </div>

                {/* Metrics Badge & Actions */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] text-slate-500 font-mono hidden sm:inline px-2 py-1 rounded-md bg-slate-50 border border-slate-200">
                    ⏱️ ~{readingTimeMin} دقيقة قراءة ({wordCount} كلمة)
                  </span>

                  <button
                    onClick={handleCopy}
                    className="p-1.5 px-2.5 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#CBD5E1] text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    title="نسخ النص"
                  >
                    <HiClipboardCopy className="w-3.5 h-3.5 text-slate-500" />
                    <span>{copiedToast ? 'تم النسخ ✓' : 'نسخ'}</span>
                  </button>

                  <button
                    onClick={handleDownloadTxt}
                    className="p-1.5 px-2.5 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#CBD5E1] text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    title="تحميل Markdown"
                  >
                    <HiDownload className="w-3.5 h-3.5 text-slate-500" />
                    <span>تنزيل</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="p-1.5 px-2.5 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1 cursor-pointer shadow-2xs"
                    title="طباعة A4"
                  >
                    <HiPrinter className="w-3.5 h-3.5" />
                    <span>طباعة A4</span>
                  </button>
                </div>

              </div>

              {/* VIEW 1: Mindmap */}
              {activeViewTab === 'mindmap' && (
                <div>
                  <VisualMindmapViewer mindmapData={parsedMindmap} />
                </div>
              )}

              {/* VIEW 2: Markdown Text */}
              {activeViewTab === 'text' && (
                <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed font-['Cairo']">
                  <MarkdownContentRenderer content={summaryResult} />
                </div>
              )}

              {/* VIEW 3: Interactive Flashcards */}
              {activeViewTab === 'flashcards' && (
                <div>
                  <InteractiveFlashcardsViewer flashcards={extractedFlashcards} />
                </div>
              )}

            </div>
          ) : (
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 sm:p-12 text-center shadow-xs space-y-6">
              
              <div className="w-16 h-16 rounded-2xl bg-rose-50 text-[#E11D48] flex items-center justify-center text-3xl mx-auto shadow-2xs border border-rose-100">
                ✨
              </div>

              <div className="max-w-md mx-auto space-y-2">
                <h3 className="text-base sm:text-lg font-black text-[#0F172A]">
                  المستشار الأكاديمي والتربوي الذكي في انتظارك
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  اختر ملف PDF، صورة كراس أو الصق نص الدرس، وسيقوم المحرك بصياغة ملخص متوافق 100% مع شبكة التقويم الوزارية للبكالوريا الجزائرية 🇩🇿.
                </p>
              </div>

              {/* Quick Feature Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-right">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                  <span className="text-base">🗺️</span>
                  <h4 className="text-xs font-bold text-[#0F172A]">مخطط ذهني بصري</h4>
                  <p className="text-[10px] text-[#64748B]">تدرج هرمي ملون يرسخ المفاهيم بسرعة</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                  <span className="text-base">📝</span>
                  <h4 className="text-xs font-bold text-[#0F172A]">قوانين ومصطلحات</h4>
                  <p className="text-[10px] text-[#64748B]">جداول مقارنة دقيقة بالوحدات الدولية (SI)</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                  <span className="text-base">🎴</span>
                  <h4 className="text-xs font-bold text-[#0F172A]">بطاقات Flashcards</h4>
                  <p className="text-[10px] text-[#64748B]">تكرار متباعد واختبار نشط للمعلومات</p>
                </div>
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
                  <h3 className="text-sm font-bold text-[#0F172A]">إعدادات محرك الذكاء الاصطناعي</h3>
                  <p className="text-[10px] text-[#64748B]">NVIDIA NIM الافتراضي + Google Gemini الاختياري</p>
                </div>
              </div>

              <button
                onClick={() => setIsKeyModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <div className="font-bold flex items-center gap-1 text-emerald-900">
                <HiLightningBolt className="w-4 h-4 text-amber-500" />
                <span>المحرك السحابي: NVIDIA NIM (نشط ومجاني)</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                المنصة تعمل تلقائياً بأحدث نماذج الذكاء الاصطناعي (Kimi K3 و Llama 3.2 Vision) مجاناً بدون الحاجة لأي إعداد.
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#0F172A]">
                اختياري: إدخال مفتاح Google Gemini API الخاص بك:
              </label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={inputKeyTemp}
                onChange={(e) => setInputKeyTemp(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl p-2.5 text-xs text-[#0F172A] font-mono focus:outline-none focus:border-[#E11D48]"
              />
              <p className="text-[11px] text-[#64748B] leading-relaxed">
                يتم حفظ المفتاح محلياً في متصفحك فقط إذا أردت استخدام نماذج Gemini الشخصية.
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
                حفظ الإعدادات ✓
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
