import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiHome, 
  HiSparkles, 
  HiPaperClip, 
  HiPhotograph, 
  HiClipboardCopy, 
  HiPrinter, 
  HiDownload, 
  HiTrash,
  HiKey,
  HiX,
  HiCheckCircle,
  HiLightningBolt,
  HiVolumeUp,
  HiStop,
  HiClock,
  HiPlus,
  HiMenuAlt2,
  HiChevronDown,
  HiArrowRight,
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

const MODES_LIST = [
  { id: 'mindmap', name: 'مخطط ذهني', icon: '🗺️', desc: 'شجرة مفاهيم مركزة' },
  { id: 'comprehensive', name: 'ملخص شامل', icon: '📑', desc: 'مفاهيم وقوانين وجداول' },
  { id: 'high_yield', name: 'مكثف ليلة الامتحان', icon: '⚡', desc: 'أهم القوانين و5 فخاخ' },
  { id: 'questions', name: 'أسئلة وتطبيقات', icon: '❓', desc: 'QCM وتمارين وزارية' },
  { id: 'methodology', name: 'منهجية الإجابة', icon: '🔬', desc: 'تفكيك أفعال الأداء' }
];

const PROMPT_SUGGESTIONS = [
  {
    title: 'علوم: الانقسام الخيطي والترجمة',
    streamId: 'sciences',
    mode: 'mindmap',
    icon: '🧬',
    desc: 'مخطط هرمي لمراحل الترجمة والشروط الأساسية',
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
    icon: '📐',
    desc: 'القوانين والدوران والتحاكي ليلة الامتحان',
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
    mode: 'comprehensive',
    icon: '⚡',
    desc: 'سرعة التفاعل، زمن نصف التفاعل والمعايرة',
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
  },
  {
    title: 'فلسفة: السؤال العلمي والسؤال الفلسفي',
    streamId: 'lettres_philo',
    mode: 'methodology',
    icon: '📖',
    desc: 'منهجية المقارنة والكلمات المفتاحية في المقال',
    text: `المقالة والمحور الأول: السؤال العلمي والسؤال الفلسفي (مقارنة)
- طبيعة السؤال العلمي: مجاله عالم الظواهر الفيزيائية المحسوسة والطبيعية، يعتمد على الملاحظة والفرضية والتجربة المخبرية الاستقرائية (المنهج التجريبي)، هدفه الوصول إلى قوانين دقيقة وكمية رياضية تصاغ في لغة دقيقة.
- طبيعة السؤال الفلسفي: مجاله عالم الماورائيات (الميتافيزيقا) والقيم والمفاهيم المجردة (الحرية، الوجود، الأخلاق، المعرفة)، يعتمد على المنهج العقلي التأملي والاستدلال النقدي والشك المنهجي، ونتائجه إشكاليات مفتوحة وتعدد في المذاهب.
- أوجه الاختلاف: في الموضوع، المنهج، والنتائج المستهدفة.
- أوجه التداخل والتكامل: العلم يغذي الفلسفة بالمكتشفات الواقعية، والفلسفة تقوم وتوجه العلم نقدياً وإبستيمولوجياً (فلسفة العلوم).`
  }
];

export default function AiSummarizerPage() {
  const [selectedStreamId, setSelectedStreamId] = useState('sciences');
  const [summaryMode, setSummaryMode] = useState('mindmap');
  const [promptInput, setPromptInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Active View Mode for the Current AI Message: 'mindmap' | 'text' | 'flashcards'
  const [activeTabByMsgId, setActiveTabByMsgId] = useState({});

  // Custom API Key Management
  const [apiKey, setApiKey] = useState(getPlatformDefaultApiKey());
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [inputKeyTemp, setInputKeyTemp] = useState('');

  // Audio Speech State
  const [playingMsgId, setPlayingMsgId] = useState(null);

  // Chat Messages State: Array of { id, role: 'user' | 'assistant', content, mode, streamName, timestamp, fileMeta, parsedMindmap, flashcards }
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  // History of conversations stored in localStorage
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('naja7i_ai_chat_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);
  const selectedStreamName = STREAMS_LIST.find(s => s.id === selectedStreamId)?.name || 'علوم تجريبية';

  useEffect(() => {
    setApiKey(getPlatformDefaultApiKey());
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Auto-scroll on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Adjust textarea height dynamically
  const handleTextareaChange = (e) => {
    setPromptInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + 'px';
    }
  };

  const toggleSpeech = (msgId, text) => {
    if (!('speechSynthesis' in window)) {
      alert('ميزة القراءة الصوتية غير مدعومة في متصفحك.');
      return;
    }

    if (playingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setPlayingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanSpeechText = text
      .replace(/```json[\s\S]*?```/g, '')
      .replace(/[*#>`|]/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanSpeechText.slice(0, 1500));
    utterance.lang = 'ar-SA';
    utterance.rate = 0.95;

    utterance.onend = () => setPlayingMsgId(null);
    utterance.onerror = () => setPlayingMsgId(null);

    window.speechSynthesis.speak(utterance);
    setPlayingMsgId(msgId);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'text/plain'];
    if (!validTypes.some(t => file.type.includes(t) || file.name.endsWith('.pdf') || file.name.endsWith('.txt'))) {
      alert('يرجى اختيار ملف PDF أو صورة درس (JPG, PNG) أو ملف نصي.');
      return;
    }
    setSelectedFile(file);
  };

  const handleStartNewChat = () => {
    setMessages([]);
    setSelectedFile(null);
    setPromptInput('');
    setIsSidebarOpen(false);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setPlayingMsgId(null);
    }
  };

  const handleSendMessage = async (customPrompt = null, customMode = null, customStreamId = null) => {
    const promptToSend = (customPrompt !== null ? customPrompt : promptInput).trim();
    const fileToSend = selectedFile;
    const modeToSend = customMode || summaryMode;
    const streamIdToSend = customStreamId || selectedStreamId;
    const streamName = STREAMS_LIST.find(s => s.id === streamIdToSend)?.name || 'علوم تجريبية';

    if (!promptToSend && !fileToSend) return;

    // Reset input states
    setPromptInput('');
    setSelectedFile(null);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    const userMsgId = 'msg_user_' + Date.now();
    const userMessage = {
      id: userMsgId,
      role: 'user',
      content: promptToSend || `طلب تلخيص ملف: ${fileToSend?.name}`,
      mode: modeToSend,
      streamName,
      fileMeta: fileToSend ? { name: fileToSend.name, size: fileToSend.size, type: fileToSend.type } : null,
      timestamp: new Date().toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setStatusMessage('1/3: جاري قراءة وتحليل المستند بالذكاء الاصطناعي...');

    try {
      let extractedContentText = promptToSend;
      let inlineFile = null;

      if (fileToSend) {
        const isPdf = fileToSend.type === 'application/pdf' || fileToSend.name.endsWith('.pdf');
        const isImage = fileToSend.type.startsWith('image/');

        if (isPdf) {
          setStatusMessage('1/3: استخراج وتطهير النصوص العربية من الـ PDF...');
          const extracted = await extractTextFromPdf(fileToSend);
          extractedContentText = extracted.text + (promptToSend ? `\n\nتوجيه إضافي من التلميذ: ${promptToSend}` : '');
          
          if (!extracted.text || extracted.text.length < 50) {
            setStatusMessage('1/3: تحويل المستند للرؤية البصرية (Vision OCR)...');
            inlineFile = await fileToBase64(fileToSend);
          }
        } else if (isImage) {
          setStatusMessage('1/3: ضغط صورة الدرس والتحليل البصري...');
          inlineFile = await fileToBase64(fileToSend);
        } else {
          extractedContentText = await fileToSend.text();
        }
      }

      setStatusMessage(`2/3: صياغة المخرجات الأكاديمية لشعبة ${streamName}...`);

      let finalSummary = '';
      try {
        finalSummary = await generateAiSummary({
          apiKey,
          streamName,
          mode: modeToSend,
          rawText: extractedContentText,
          inlineFile
        });
      } catch (aiErr) {
        console.warn('AI primary attempt failed, fallback to local...', aiErr);
        if (extractedContentText) {
          finalSummary = generateLocalHeuristicSummary({
            text: extractedContentText,
            subjectName: fileToSend ? fileToSend.name.replace(/\.[^/.]+$/, '') : 'الدرس',
            streamName
          });
        } else {
          throw aiErr;
        }
      }

      setStatusMessage('3/3: اكتملت الصياغة بنجاح!');

      const aiMsgId = 'msg_ai_' + Date.now();
      const parsedMindmap = parseMindmapTextToJson(finalSummary);
      const flashcards = extractFlashcardsFromText(finalSummary);

      const aiMessage = {
        id: aiMsgId,
        role: 'assistant',
        content: finalSummary,
        mode: modeToSend,
        streamName,
        parsedMindmap,
        flashcards,
        timestamp: new Date().toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMessage]);
      setActiveTabByMsgId(prev => ({
        ...prev,
        [aiMsgId]: modeToSend === 'mindmap' ? 'mindmap' : 'text'
      }));

      // Save to Chat History
      const historyEntry = {
        id: 'chat_' + Date.now(),
        date: new Date().toLocaleDateString('ar-DZ', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        title: promptToSend ? promptToSend.slice(0, 40) + '...' : (fileToSend ? fileToSend.name : 'محادثة تلخيص'),
        streamName,
        mode: modeToSend,
        lastAiContent: finalSummary
      };
      const updatedHistory = [historyEntry, ...history.slice(0, 14)];
      setHistory(updatedHistory);
      try {
        localStorage.setItem('naja7i_ai_chat_history', JSON.stringify(updatedHistory));
      } catch (e) {
        console.error(e);
      }

    } catch (error) {
      console.error(error);
      const errorMsgId = 'msg_err_' + Date.now();
      setMessages(prev => [
        ...prev,
        {
          id: errorMsgId,
          role: 'assistant',
          isError: true,
          content: `⚠️ ${error.message || 'حدث خطأ أثناء معالجة الطلب. يرجى المحاولة مجدداً.'}`,
          timestamp: new Date().toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
      setStatusMessage('');
    }
  };

  const handleCopyText = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex h-[calc(100vh-60px)] bg-[#F8FAFC] text-[#0F172A] font-['Cairo'] overflow-hidden" dir="rtl">
      
      {/* 1. GEMINI-STYLE SIDEBAR / DRAWER */}
      <aside
        className={`fixed inset-y-0 right-0 z-40 w-72 bg-white border-l border-[#E2E8F0] shadow-xl lg:shadow-none transition-transform duration-300 lg:static lg:translate-x-0 flex flex-col justify-between ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 space-y-4 flex-1 overflow-y-auto">
          
          {/* Header & New Chat Button */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleStartNewChat}
              className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <HiPlus className="w-4 h-4" />
              <span>محادثة جديدة</span>
            </button>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 mr-2 cursor-pointer"
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>

          {/* Stream Quick Switcher */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 block">شعبتك المفضلة:</span>
            <div className="grid grid-cols-2 gap-1">
              {STREAMS_LIST.map((str) => (
                <button
                  key={str.id}
                  onClick={() => setSelectedStreamId(str.id)}
                  className={`p-1.5 rounded-lg text-right text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer truncate ${
                    selectedStreamId === str.id
                      ? 'bg-rose-50 text-[#E11D48] border border-rose-200'
                      : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <span className="shrink-0">{str.icon}</span>
                  <span className="truncate">{str.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Chat History List */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold px-1">
              <span>سجل المحادثات والملخصات</span>
              {history.length > 0 && (
                <button
                  onClick={() => {
                    setHistory([]);
                    localStorage.removeItem('naja7i_ai_chat_history');
                  }}
                  className="text-rose-600 hover:underline cursor-pointer"
                >
                  مسح
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <p className="text-[11px] text-slate-400 text-center py-6">
                لا توجد محادثات سابقة حتى الآن
              </p>
            ) : (
              <div className="space-y-1 max-h-[380px] overflow-y-auto scrollbar-thin">
                {history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      const aiMsgId = 'hist_ai_' + item.id;
                      setMessages([
                        {
                          id: 'hist_user_' + item.id,
                          role: 'user',
                          content: item.title,
                          streamName: item.streamName,
                          timestamp: item.date
                        },
                        {
                          id: aiMsgId,
                          role: 'assistant',
                          content: item.lastAiContent,
                          mode: item.mode || 'mindmap',
                          streamName: item.streamName,
                          parsedMindmap: parseMindmapTextToJson(item.lastAiContent),
                          flashcards: extractFlashcardsFromText(item.lastAiContent),
                          timestamp: item.date
                        }
                      ]);
                      setActiveTabByMsgId({ [aiMsgId]: item.mode === 'mindmap' ? 'mindmap' : 'text' });
                      setIsSidebarOpen(false);
                    }}
                    className="p-2 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 text-xs cursor-pointer flex items-center justify-between gap-1.5 group transition-all"
                  >
                    <div className="truncate min-w-0">
                      <span className="block font-bold text-slate-800 truncate group-hover:text-[#E11D48]">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {item.date} • {item.streamName}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Sidebar Footer Settings */}
        <div className="p-3 border-t border-slate-200/80 bg-slate-50/70">
          <button
            onClick={() => {
              setInputKeyTemp(apiKey);
              setIsKeyModalOpen(true);
            }}
            className="w-full p-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-between transition-colors cursor-pointer shadow-2xs"
          >
            <div className="flex items-center gap-1.5">
              <HiKey className={`w-4 h-4 ${apiKey ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>إعدادات الذكاء والمفاتيح</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
              {apiKey ? 'Gemini ✓' : 'NVIDIA ⚡'}
            </span>
          </button>
        </div>
      </aside>

      {/* Backdrop for Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/40 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* 2. MAIN GEMINI CHAT WORKSPACE (CENTER & INPUT BAR) */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Top Minimal Navigation Bar */}
        <header className="h-14 px-4 sm:px-6 bg-white border-b border-[#E2E8F0] flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-700 cursor-pointer"
              title="فتح القائمة الجانبية"
            >
              <HiMenuAlt2 className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-base">
                ✨
              </div>
              <div>
                <h2 className="text-xs sm:text-sm font-black text-[#0F172A] flex items-center gap-1.5 leading-none">
                  <span>مستشار البكالوريا الذكي</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-rose-50 text-rose-700 font-medium border border-rose-200/60">
                    Gemini AI Style
                  </span>
                </h2>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  شعبة: {selectedStreamName} • المنهاج الجزائري 🇩🇿
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1"
            >
              <HiHome className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">الرئيسية</span>
            </Link>
          </div>
        </header>

        {/* Chat Scrollable Message Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin">
          
          {/* EMPTY HERO STATE (GEMINI STYLE GREETING & SUGGESTION PILLS) */}
          {messages.length === 0 && (
            <div className="max-w-3xl mx-auto py-8 sm:py-14 text-center space-y-8 animate-fadeIn">
              
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-xs font-bold text-[#E11D48] shadow-2xs">
                  <HiSparkles className="w-4 h-4 text-[#E11D48]" />
                  <span>محرك الذكاء الاصطناعي الأكاديمي لشهادة البكالوريا 🇩🇿</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
                  مرحباً بك.. كيف يمكنني مساعدتك اليوم؟ ✨
                </h1>

                <p className="text-xs sm:text-sm text-[#64748B] max-w-xl mx-auto leading-relaxed">
                  ارفع أي ملف درس أو كراس أو اختر أحد النماذج المقترحة أدناه لتوليد مخطط ذهني بصري، ملخص أكاديمي مكثف، أو بطاقات مراجعة تفاعلية.
                </p>
              </div>

              {/* Quick Suggestion Prompt Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-right max-w-2xl mx-auto">
                {PROMPT_SUGGESTIONS.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(item.text, item.mode, item.streamId)}
                    className="p-4 rounded-2xl bg-white hover:bg-rose-50/40 border border-[#E2E8F0] hover:border-[#E11D48] shadow-xs hover:shadow-sm transition-all text-right cursor-pointer group space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium group-hover:bg-rose-100 group-hover:text-rose-800">
                        {MODES_LIST.find(m => m.id === item.mode)?.name}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-[#0F172A] group-hover:text-[#E11D48] transition-colors">
                      {item.title}
                    </h4>

                    <p className="text-[11px] text-slate-500 leading-snug">
                      {item.desc}
                    </p>
                  </button>
                ))}
              </div>

            </div>
          )}

          {/* ACTIVE CHAT MESSAGES */}
          {messages.map((msg) => {
            const isUser = msg.role === 'user';

            if (isUser) {
              return (
                <div key={msg.id} className="flex justify-start max-w-3xl mx-auto">
                  <div className="bg-[#0F172A] text-white rounded-2xl rounded-tr-xs px-5 py-3.5 max-w-[85%] sm:max-w-[75%] shadow-sm space-y-2">
                    {msg.fileMeta && (
                      <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-rose-300">
                        <HiPaperClip className="w-4 h-4 shrink-0" />
                        <span className="font-bold truncate">{msg.fileMeta.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          ({(msg.fileMeta.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                    )}
                    <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-medium">
                      {msg.content}
                    </p>
                    <div className="text-[10px] text-slate-400 text-left font-mono">
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            }

            // AI ASSISTANT RESPONSE
            const activeTab = activeTabByMsgId[msg.id] || (msg.mode === 'mindmap' ? 'mindmap' : 'text');
            const isPlaying = playingMsgId === msg.id;

            return (
              <div key={msg.id} className="max-w-4xl mx-auto space-y-3">
                
                {/* AI Header with Avatar & Tabs */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#E11D48] to-rose-400 text-white flex items-center justify-center text-sm shadow-xs font-bold">
                      ✨
                    </div>
                    <span className="text-xs font-black text-slate-900">
                      مستشار نجاحي الذكي
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                      {msg.streamName}
                    </span>
                  </div>

                  {/* Multi-Tab Output Switcher (Inside Response) */}
                  {!msg.isError && (
                    <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-bold">
                      <button
                        onClick={() => setActiveTabByMsgId(prev => ({ ...prev, [msg.id]: 'mindmap' }))}
                        className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                          activeTab === 'mindmap'
                            ? 'bg-white text-[#E11D48] shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <span>🗺️</span>
                        <span>المخطط الذهني</span>
                      </button>

                      <button
                        onClick={() => setActiveTabByMsgId(prev => ({ ...prev, [msg.id]: 'text' }))}
                        className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                          activeTab === 'text'
                            ? 'bg-white text-[#E11D48] shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <span>📑</span>
                        <span>الملخص الكامل</span>
                      </button>

                      {msg.flashcards && msg.flashcards.length > 0 && (
                        <button
                          onClick={() => setActiveTabByMsgId(prev => ({ ...prev, [msg.id]: 'flashcards' }))}
                          className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                            activeTab === 'flashcards'
                              ? 'bg-white text-[#E11D48] shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <span>🎴</span>
                          <span>البطاقات ({msg.flashcards.length})</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* AI Body Content */}
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-7 shadow-xs">
                  {msg.isError ? (
                    <div className="text-rose-700 text-xs font-bold">
                      {msg.content}
                    </div>
                  ) : (
                    <>
                      {/* View 1: Mindmap */}
                      {activeTab === 'mindmap' && (
                        <VisualMindmapViewer mindmapData={msg.parsedMindmap} />
                      )}

                      {/* View 2: Markdown Text */}
                      {activeTab === 'text' && (
                        <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed">
                          <MarkdownContentRenderer content={msg.content} />
                        </div>
                      )}

                      {/* View 3: Flashcards */}
                      {activeTab === 'flashcards' && (
                        <InteractiveFlashcardsViewer flashcards={msg.flashcards} />
                      )}
                    </>
                  )}
                </div>

                {/* AI Footer Toolbar */}
                {!msg.isError && (
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1 px-1 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleSpeech(msg.id, msg.content)}
                        className={`p-1.5 px-2.5 rounded-lg border text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                          isPlaying 
                            ? 'bg-rose-600 text-white border-rose-600 animate-pulse' 
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                        title="الاستماع للملخص بالصوت"
                      >
                        {isPlaying ? <HiStop className="w-3.5 h-3.5" /> : <HiVolumeUp className="w-3.5 h-3.5 text-[#E11D48]" />}
                        <span>{isPlaying ? 'إيقاف الصوت' : 'استماع 🔊'}</span>
                      </button>

                      <button
                        onClick={() => handleCopyText(msg.id, msg.content)}
                        className="p-1.5 px-2.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                        title="نسخ الملخص"
                      >
                        <HiClipboardCopy className="w-3.5 h-3.5 text-slate-400" />
                        <span>{copiedId === msg.id ? 'تم النسخ ✓' : 'نسخ'}</span>
                      </button>

                      <button
                        onClick={() => window.print()}
                        className="p-1.5 px-2.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                        title="طباعة A4"
                      >
                        <HiPrinter className="w-3.5 h-3.5 text-slate-400" />
                        <span>طباعة A4</span>
                      </button>
                    </div>

                    <span className="text-[10px] text-slate-400 font-mono">
                      {msg.timestamp}
                    </span>
                  </div>
                )}

              </div>
            );
          })}

          {/* THINKING & GENERATING LOADER (GEMINI STYLE SPARKLE ANIMATION) */}
          {isLoading && (
            <div className="max-w-4xl mx-auto flex items-start gap-3 p-4 bg-white border border-rose-200/80 rounded-2xl shadow-xs animate-pulse">
              <div className="w-8 h-8 rounded-xl bg-[#E11D48] text-white flex items-center justify-center text-base shrink-0 animate-spin">
                ✨
              </div>
              <div className="space-y-1.5 flex-1">
                <span className="text-xs font-black text-slate-900 block">
                  جاري معالجة وتلخيص الدرس بالذكاء الاصطناعي...
                </span>
                <p className="text-[11px] text-slate-500 font-mono">
                  {statusMessage || 'تحليل المصطلحات وصياغة المخطط الهرمي...'}
                </p>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* 3. GEMINI FLOATING BOTTOM PROMPT INPUT BAR */}
        <div className="p-3 sm:p-5 bg-gradient-to-t from-slate-100 via-[#F8FAFC] to-transparent shrink-0">
          <div className="max-w-4xl mx-auto bg-white border-2 border-slate-200/80 hover:border-[#E11D48] focus-within:border-[#E11D48] focus-within:ring-4 focus-within:ring-rose-500/10 rounded-2xl sm:rounded-3xl shadow-lg transition-all p-2.5 sm:p-3 space-y-2">
            
            {/* File Attachment Pill Preview (if selected) */}
            {selectedFile && (
              <div className="flex items-center justify-between p-2 rounded-xl bg-rose-50 border border-rose-200 text-xs">
                <div className="flex items-center gap-2 truncate">
                  <span className="text-base">📄</span>
                  <span className="font-bold text-rose-900 truncate max-w-xs">{selectedFile.name}</span>
                  <span className="text-[10px] text-rose-600 font-mono">
                    ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-rose-600 hover:text-rose-800 p-1 cursor-pointer"
                >
                  <HiX className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Input Textarea Area */}
            <div className="flex items-center gap-2">
              
              {/* File Attachment Button */}
              <button
                type="button"
                onClick={() => document.getElementById('chat-file-input').click()}
                className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-[#E11D48] transition-colors cursor-pointer shrink-0"
                title="إرفاق ملف PDF أو صورة درس"
              >
                <HiPaperClip className="w-5 h-5" />
              </button>
              <input
                id="chat-file-input"
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.webp,.txt"
                className="hidden"
                onChange={handleFileSelect}
              />

              {/* Main Input Textarea */}
              <textarea
                ref={textareaRef}
                rows={1}
                placeholder="اسأل، الصق نص الدرس، أو أرفق ملف PDF لتلخيصه بالذكاء الاصطناعي..."
                value={promptInput}
                onChange={handleTextareaChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="flex-1 bg-transparent border-none text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none resize-none max-h-40 leading-relaxed font-medium"
              />

              {/* Send Button */}
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={isLoading || (!promptInput.trim() && !selectedFile)}
                className="p-2.5 px-4 rounded-xl sm:rounded-2xl bg-[#E11D48] hover:bg-[#BE123C] text-white font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center shrink-0"
                title="إرسال الطلب"
              >
                <HiSparkles className="w-4 h-4" />
              </button>

            </div>

            {/* Bottom Quick Controls (Stream + Mode Pickers) */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs flex-wrap gap-2">
              
              <div className="flex items-center gap-2 flex-wrap">
                
                {/* Stream Pill */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                  <span className="text-[10px] text-slate-500 font-bold pr-1">الشعبة:</span>
                  <select
                    value={selectedStreamId}
                    onChange={(e) => setSelectedStreamId(e.target.value)}
                    className="bg-transparent border-none text-[11px] font-bold text-slate-800 focus:outline-none cursor-pointer"
                  >
                    {STREAMS_LIST.map(s => (
                      <option key={s.id} value={s.id}>{s.icon} {s.name}</option>
                    ))}
                  </select>
                </div>

                {/* Mode Pill */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                  <span className="text-[10px] text-slate-500 font-bold pr-1">النمط:</span>
                  <select
                    value={summaryMode}
                    onChange={(e) => setSummaryMode(e.target.value)}
                    className="bg-transparent border-none text-[11px] font-bold text-slate-800 focus:outline-none cursor-pointer"
                  >
                    {MODES_LIST.map(m => (
                      <option key={m.id} value={m.id}>{m.icon} {m.name}</option>
                    ))}
                  </select>
                </div>

              </div>

              <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                اضغط <kbd className="px-1 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono">Enter ↵</kbd> للإرسال
              </span>

            </div>

          </div>
        </div>

      </main>

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
                <span>المحرك السحابي الافتراضي: NVIDIA NIM (نشط ومجاني)</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                المنصة تعمل تلقائياً بأحدث نماذج الذكاء الاصطناعي (OpenAI GPT-OSS و Kimi K3 و Llama 3.2 Vision) مجاناً بدون الحاجة لأي إعداد.
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
