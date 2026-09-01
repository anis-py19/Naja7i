import React, { useState, useEffect, useRef } from 'react';
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
  HiVolumeUp,
  HiStop,
  HiClock,
  HiPaperClip,
  HiArrowUp,
  HiRefresh,
  HiChatAlt2,
  HiMenuAlt3,
  HiChevronDown
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
  { id: 'mindmap', label: '🗺️ مخطط ذهني', desc: 'عقد مركزة ومختصرة' },
  { id: 'comprehensive', label: '📑 ملخص شامل', desc: 'شرح، جداول وبطاقات' },
  { id: 'high_yield', label: '⚡ مكثف ليلة الامتحان', desc: 'قوانين و5 فخاخ' },
  { id: 'questions', label: '❓ بنك أسئلة QCM', desc: 'أسئلة مع سلم التنقيط' },
  { id: 'methodology', label: '🔬 تفكيك المنهجية', desc: 'أفعال الأداء والكلمات المفتاحية' }
];

const QUICK_STARTER_PROMPTS = [
  {
    title: '🗺️ مخطط ذهني: الانقسام والترجمة',
    streamId: 'sciences',
    mode: 'mindmap',
    prompt: `لخص لي مراحل التعبير المورثي والترجمة (الانطلاق، الاستطالة، النهاية) مع شروط الترجمة في شكل مخطط ذهني فائق الاختصار والتركيز.`
  },
  {
    title: '⚡ مكثف ليلة الامتحان: الأعداد المركبة',
    streamId: 'math',
    mode: 'high_yield',
    prompt: `قدم لي مكثف ليلة الامتحان في الأعداد المركبة والتحويلات النقطية (الشكل الجبري والمثلثي والآسي، دساتير موافر، الانسحاب، الدوران، التشابه المباشر) وأخطر 5 فخاخ في البكالوريا.`
  },
  {
    title: '📑 ملخص شامل: المتابعة الزمنية',
    streamId: 'sciences',
    mode: 'comprehensive',
    prompt: `قم بإعداد ملخص أكاديمي شامل للوحدة 1 في الفيزياء (المتابعة الزمنية لتحول كيميائي): طرق المتابعة، العوامل الحركية، زمن نصف التفاعل t1/2 مع بطاقات مراجعة وجداول القوانين.`
  },
  {
    title: '🔬 تفكيك منهجية: السؤال الفلسفي',
    streamId: 'lettres_philo',
    mode: 'methodology',
    prompt: `اشرح لي منهجية المقارنة بين السؤال العلمي والسؤال الفلسفي: أوجه الاختلاف والتشابه والتداخل، والكلمات المفتاحية المطلوبة في البكالوريا لنيل العلامة الكاملة.`
  }
];

export default function AiSummarizerPage() {
  const [selectedStreamId, setSelectedStreamId] = useState('sciences');
  const [summaryMode, setSummaryMode] = useState('mindmap');
  const [inputText, setInputText] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const [isUploadingFile, setIsUploadingFile] = useState(false);

  // Chat conversation state
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('naja7i_chat_active_messages');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // History & Drawer
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historySessions, setHistorySessions] = useState(() => {
    try {
      const saved = localStorage.getItem('naja7i_chat_sessions_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Status & Audio
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [playingMessageId, setPlayingMessageId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // API Key Modal
  const [apiKey, setApiKey] = useState(getPlatformDefaultApiKey());
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [inputKeyTemp, setInputKeyTemp] = useState('');

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const selectedStream = STREAMS_LIST.find(s => s.id === selectedStreamId) || STREAMS_LIST[0];

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    try {
      localStorage.setItem('naja7i_chat_active_messages', JSON.stringify(messages));
    } catch (e) {
      console.error(e);
    }
  }, [messages, isLoading]);

  useEffect(() => {
    setApiKey(getPlatformDefaultApiKey());
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Textarea auto-resize
  const handleTextareaChange = (e) => {
    setInputText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  };

  // Text-To-Speech Toggle
  const toggleSpeech = (messageId, text) => {
    if (!('speechSynthesis' in window)) {
      alert('ميزة القراءة الصوتية غير مدعومة في متصفحك.');
      return;
    }

    if (playingMessageId === messageId) {
      window.speechSynthesis.cancel();
      setPlayingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanSpeechText = text
      .replace(/```json[\s\S]*?```/g, '')
      .replace(/[*#>`|]/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanSpeechText.slice(0, 1800));
    utterance.lang = 'ar-SA';
    utterance.rate = 0.95;

    utterance.onend = () => setPlayingMessageId(null);
    utterance.onerror = () => setPlayingMessageId(null);

    window.speechSynthesis.speak(utterance);
    setPlayingMessageId(messageId);
  };

  const handleCopyMessage = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadMessage = (text, streamName) => {
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ملخص_${streamName}_نجاحي_AI.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  // File Upload Handlers
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'text/plain'];
    if (!validTypes.some(t => file.type.includes(t) || file.name.endsWith('.pdf') || file.name.endsWith('.txt'))) {
      setErrorMessage('يرجى اختيار ملف PDF أو صورة درس (JPG, PNG) أو ملف نصي.');
      return;
    }

    setAttachedFile(file);
    setErrorMessage(null);
  };

  const handleRemoveAttachedFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Start New Chat Session
  const handleNewChat = () => {
    if (messages.length > 0) {
      const sessionTitle = messages[0]?.text?.slice(0, 30) || 'محادثة سابقة';
      const newSession = {
        id: 'session_' + Date.now(),
        title: sessionTitle,
        date: new Date().toLocaleDateString('ar-DZ', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        streamName: selectedStream.name,
        messages: messages
      };
      const updated = [newSession, ...historySessions.slice(0, 14)];
      setHistorySessions(updated);
      try {
        localStorage.setItem('naja7i_chat_sessions_history', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    }

    setMessages([]);
    setInputText('');
    setAttachedFile(null);
    setErrorMessage(null);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setPlayingMessageId(null);
  };

  const handleRestoreSession = (session) => {
    setMessages(session.messages || []);
    setIsHistoryOpen(false);
    setErrorMessage(null);
  };

  const handleDeleteSession = (id, e) => {
    e.stopPropagation();
    const updated = historySessions.filter(s => s.id !== id);
    setHistorySessions(updated);
    try {
      localStorage.setItem('naja7i_chat_sessions_history', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Submit User Message
  const handleSendMessage = async (customPrompt = null, forceLocal = false) => {
    const textToSend = customPrompt || inputText.trim();
    if (!textToSend && !attachedFile) return;

    const userMessageId = 'msg_user_' + Date.now();
    const fileSnapshot = attachedFile ? { name: attachedFile.name, size: attachedFile.size, type: attachedFile.type } : null;

    const userMessage = {
      id: userMessageId,
      sender: 'user',
      text: textToSend,
      file: fileSnapshot,
      streamName: selectedStream.name,
      mode: summaryMode,
      timestamp: new Date().toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    const currentFile = attachedFile;
    setAttachedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    setIsLoading(true);
    setErrorMessage(null);
    setStatusMessage('جاري تحليل المحتوى وتجهيز الملخص...');

    try {
      let extractedContentText = '';
      let inlineFile = null;

      if (currentFile) {
        const isPdf = currentFile.type === 'application/pdf' || currentFile.name.endsWith('.pdf');
        const isImage = currentFile.type.startsWith('image/');

        if (isPdf) {
          setStatusMessage('1/3: جاري قراءة ملف الـ PDF وتطهير النصوص العربية...');
          const extracted = await extractTextFromPdf(currentFile);
          extractedContentText = extracted.text;
          
          if (!extractedContentText || extractedContentText.length < 50) {
            setStatusMessage('1/3: تحويل المستند المصور للمعالجة البصرية...');
            inlineFile = await fileToBase64(currentFile);
          }
        } else if (isImage) {
          setStatusMessage('1/3: ضغط صورة الدرس وتجهيزها للتحليل البصري...');
          inlineFile = await fileToBase64(currentFile);
        } else {
          extractedContentText = await currentFile.text();
        }
      }

      const combinedText = [textToSend, extractedContentText].filter(Boolean).join('\n\n');

      setStatusMessage(`2/3: صياغة ملخص ذكي لشعبة ${selectedStream.name}...`);

      let aiResponseText = '';

      if (!forceLocal) {
        try {
          aiResponseText = await generateAiSummary({
            apiKey,
            streamName: selectedStream.name,
            mode: summaryMode,
            rawText: combinedText,
            inlineFile
          });
        } catch (aiErr) {
          if (combinedText) {
            console.warn('AI remote failed, falling back to local heuristic:', aiErr);
            setErrorMessage(`${aiErr.message} (تم التلخيص بالوضع المحلي).`);
            aiResponseText = generateLocalHeuristicSummary({
              text: combinedText,
              subjectName: currentFile ? currentFile.name.replace(/\.[^/.]+$/, '') : 'الدرس',
              streamName: selectedStream.name
            });
          } else {
            throw aiErr;
          }
        }
      } else {
        if (combinedText) {
          aiResponseText = generateLocalHeuristicSummary({
            text: combinedText,
            subjectName: currentFile ? currentFile.name.replace(/\.[^/.]+$/, '') : 'الدرس',
            streamName: selectedStream.name
          });
        } else {
          throw new Error('يرجى كتابة نص أو إرفاق ملف للتلخيص.');
        }
      }

      const assistantMessage = {
        id: 'msg_ai_' + Date.now(),
        sender: 'assistant',
        text: aiResponseText,
        streamName: selectedStream.name,
        mode: summaryMode,
        timestamp: new Date().toLocaleTimeString('ar-DZ', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'حدث خطأ أثناء معالجة الطلب. يرجى المحاولة مجدداً.');
    } finally {
      setIsLoading(false);
      setStatusMessage('');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.75rem)] bg-[#F8FAFC] text-[#0F172A] font-['Cairo'] overflow-hidden" dir="rtl">
      
      {/* 1. Sleek Top Studio Bar */}
      <header className="bg-white border-b border-[#E2E8F0] px-4 py-2.5 flex items-center justify-between shrink-0 z-20 shadow-2xs print:hidden">
        
        {/* Left / Info */}
        <div className="flex items-center gap-3">
          <Link 
            to="/" 
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-[#0F172A] transition-colors"
            title="العودة للرئيسية"
          >
            <HiHome className="w-5 h-5" />
          </Link>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-[#E11D48] text-white flex items-center justify-center text-lg shadow-sm">
              🤖
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm text-[#0F172A]">
                  مستشار نجاحي الذكي
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-mono text-emerald-700 font-bold hidden sm:inline">AI Studio</span>
              </div>
              <p className="text-[10px] text-[#64748B]">
                شعبة {selectedStream.name} • NVIDIA NIM & Vision 🇩🇿
              </p>
            </div>
          </div>
        </div>

        {/* Right / Quick Controls */}
        <div className="flex items-center gap-2">
          
          {/* Stream Selector Dropdown Pill */}
          <div className="relative">
            <select
              value={selectedStreamId}
              onChange={(e) => setSelectedStreamId(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#CBD5E1] text-xs font-bold text-[#0F172A] cursor-pointer focus:outline-none focus:border-[#E11D48] appearance-none pr-7"
            >
              {STREAMS_LIST.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.icon} {s.name}
                </option>
              ))}
            </select>
            <HiChevronDown className="w-3.5 h-3.5 text-[#64748B] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* New Chat Button */}
          <button
            onClick={handleNewChat}
            className="px-3 py-1.5 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#CBD5E1] text-xs font-bold text-[#0F172A] transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title="بدء محادثة وتلخيص جديد"
          >
            <HiRefresh className="w-3.5 h-3.5 text-[#E11D48]" />
            <span className="hidden sm:inline">محادثة جديدة</span>
          </button>

          {/* History Toggle */}
          <button
            onClick={() => setIsHistoryOpen(!isHistoryOpen)}
            className="p-1.5 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#CBD5E1] text-slate-700 transition-colors cursor-pointer relative"
            title="سجل المحادثات"
          >
            <HiChatAlt2 className="w-5 h-5" />
            {historySessions.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#E11D48] absolute top-1 right-1" />
            )}
          </button>

          {/* API Key Modal Button */}
          <button
            onClick={() => {
              setInputKeyTemp(apiKey);
              setIsKeyModalOpen(true);
            }}
            className="p-1.5 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#CBD5E1] text-slate-700 transition-colors cursor-pointer"
            title="إعدادات المفاتيح والذكاء"
          >
            <HiKey className={`w-5 h-5 ${apiKey ? 'text-emerald-600' : 'text-slate-500'}`} />
          </button>

        </div>

      </header>

      {/* 2. Chat Stream & Workspace Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 scrollbar-thin">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* Empty State / Welcome Screen */}
          {messages.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-8 text-center space-y-6"
            >
              
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-rose-500 to-[#E11D48] text-white flex items-center justify-center text-3xl mx-auto shadow-lg ring-8 ring-rose-50">
                ✨
              </div>

              <div className="space-y-1.5 max-w-lg mx-auto">
                <h2 className="text-xl sm:text-2xl font-black text-[#0F172A]">
                  كيف يمكنني مساعدتك في تحضير البكالوريا اليوم؟ 🇩🇿
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  ارفع ملف PDF أو صورة درس، أو اختر نمط التلخيص واكتب موضوعك، وسيقوم المساعد الذكي بتوليد مخطط مفاهيمي، تلخيص شامل، أو بطاقات مراجعة فورية.
                </p>
              </div>

              {/* Quick Starter Prompt Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-right">
                {QUICK_STARTER_PROMPTS.map((starter, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedStreamId(starter.streamId);
                      setSummaryMode(starter.mode);
                      handleSendMessage(starter.prompt);
                    }}
                    className="p-4 rounded-2xl bg-white hover:bg-rose-50/40 border border-[#E2E8F0] hover:border-rose-300 text-right transition-all shadow-2xs hover:shadow-xs group cursor-pointer"
                  >
                    <span className="block text-xs font-bold text-[#0F172A] group-hover:text-[#E11D48] transition-colors mb-1">
                      {starter.title}
                    </span>
                    <p className="text-[11px] text-[#64748B] line-clamp-2 leading-relaxed">
                      {starter.prompt}
                    </p>
                  </button>
                ))}
              </div>

            </motion.div>
          )}

          {/* Messages Stream */}
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            const parsedMindmap = !isUser && msg.mode === 'mindmap' ? parseMindmapTextToJson(msg.text) : null;
            const extractedFlashcards = !isUser ? extractFlashcardsFromText(msg.text) : [];

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                
                {/* Assistant Avatar */}
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-[#0F172A] text-white flex items-center justify-center text-sm shrink-0 shadow-2xs mt-1">
                    🤖
                  </div>
                )}

                {/* Message Bubble Card */}
                <div
                  className={`max-w-3xl w-full rounded-2xl p-4 sm:p-5 transition-all space-y-3 ${
                    isUser
                      ? 'bg-rose-50/70 border border-rose-200/80 text-[#0F172A] max-w-xl'
                      : 'bg-white border border-[#E2E8F0] text-[#0F172A] shadow-xs'
                  }`}
                >
                  {/* Top Bubble Meta */}
                  <div className="flex items-center justify-between text-[11px] text-[#64748B] border-b border-black/5 pb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-[#0F172A]">
                        {isUser ? 'أنت' : 'مستشار نجاحي الذكي'}
                      </span>
                      {msg.streamName && (
                        <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-medium">
                          {msg.streamName}
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-[10px]">{msg.timestamp}</span>
                  </div>

                  {/* Attached File Badge if user uploaded file */}
                  {isUser && msg.file && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-rose-200 text-xs font-bold text-slate-800 shadow-2xs">
                      <HiDocumentText className="w-4 h-4 text-[#E11D48]" />
                      <span className="truncate max-w-[200px]">{msg.file.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        ({(msg.file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                  )}

                  {/* Message Content */}
                  {isUser ? (
                    <p className="text-xs sm:text-sm text-[#0F172A] leading-relaxed whitespace-pre-wrap">
                      {msg.text}
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {/* Mindmap Interactive Viewer inside Chat Bubble */}
                      {msg.mode === 'mindmap' && parsedMindmap && (
                        <div className="pt-1">
                          <VisualMindmapViewer mindmapData={parsedMindmap} />
                        </div>
                      )}

                      {/* Render Markdown Content */}
                      <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed">
                        <MarkdownContentRenderer content={msg.text} />
                      </div>

                      {/* Interactive Flashcards inside Chat Bubble */}
                      {extractedFlashcards.length > 0 && msg.mode === 'comprehensive' && (
                        <div className="pt-2 border-t border-[#E2E8F0]">
                          <InteractiveFlashcardsViewer flashcards={extractedFlashcards} />
                        </div>
                      )}

                      {/* Assistant Message Actions Toolbar */}
                      <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0] text-xs text-[#64748B] flex-wrap gap-2 print:hidden">
                        <div className="flex items-center gap-1.5">
                          {/* Audio TTS Button */}
                          <button
                            onClick={() => toggleSpeech(msg.id, msg.text)}
                            className={`px-2.5 py-1.5 rounded-lg border font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                              playingMessageId === msg.id
                                ? 'bg-rose-600 text-white border-rose-600 animate-pulse'
                                : 'bg-[#F8FAFC] hover:bg-[#F1F5F9] border-[#CBD5E1] text-slate-700'
                            }`}
                            title="الاستماع للملخص صوتياً"
                          >
                            {playingMessageId === msg.id ? <HiStop className="w-3.5 h-3.5" /> : <HiVolumeUp className="w-3.5 h-3.5 text-rose-600" />}
                            <span>{playingMessageId === msg.id ? 'إيقاف' : 'استماع 🔊'}</span>
                          </button>

                          {/* Copy Button */}
                          <button
                            onClick={() => handleCopyMessage(msg.id, msg.text)}
                            className="p-1.5 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#CBD5E1] text-slate-700 transition-colors cursor-pointer"
                            title="نسخ النص"
                          >
                            <HiClipboardCopy className="w-3.5 h-3.5" />
                          </button>

                          {/* Download Button */}
                          <button
                            onClick={() => handleDownloadMessage(msg.text, msg.streamName)}
                            className="p-1.5 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#CBD5E1] text-slate-700 transition-colors cursor-pointer"
                            title="تنزيل كملف Markdown"
                          >
                            <HiDownload className="w-3.5 h-3.5" />
                          </button>

                          {/* Print A4 Button */}
                          <button
                            onClick={handlePrint}
                            className="p-1.5 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-white transition-colors cursor-pointer"
                            title="طباعة A4"
                          >
                            <HiPrinter className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {copiedId === msg.id && (
                          <span className="text-emerald-600 font-bold text-[11px]">
                            تم النسخ بنجاح ✓
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                </div>

                {/* User Avatar */}
                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center text-sm shrink-0 shadow-2xs mt-1">
                    👤
                  </div>
                )}

              </div>
            );
          })}

          {/* Loading Indicator in Chat Stream */}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-xl bg-[#0F172A] text-white flex items-center justify-center text-sm shrink-0 shadow-2xs mt-1">
                🤖
              </div>
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs flex items-center gap-3 text-xs text-[#0F172A]">
                <span className="inline-block w-4 h-4 border-2 border-[#E11D48] border-t-transparent rounded-full animate-spin"></span>
                <span className="font-bold">{statusMessage || 'جاري التفكير والتوليد بالذكاء الاصطناعي...'}</span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs space-y-2">
              <div className="flex items-center gap-2">
                <span>⚠️</span>
                <span className="font-bold">{errorMessage}</span>
              </div>
              <div className="flex items-center gap-2 pt-1 border-t border-rose-200">
                <button
                  onClick={() => handleSendMessage(null, true)}
                  className="px-3 py-1 bg-white hover:bg-rose-100 text-rose-900 font-bold rounded-lg border border-rose-300 transition-colors text-[11px] cursor-pointer"
                >
                  ⚡ إعادة التلخيص بالوضع المحلي
                </button>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 3. Bottom Sticky Prompt Dock (ChatGPT/Claude Style) */}
      <div className="bg-white border-t border-[#E2E8F0] p-3 sm:p-4 shrink-0 z-20 shadow-md print:hidden">
        <div className="max-w-4xl mx-auto space-y-2.5">
          
          {/* Mode Selector Chips Strip */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-bold text-[#64748B] shrink-0 ml-1">
              النمط:
            </span>
            {MODES_LIST.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setSummaryMode(mode.id)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1 ${
                  summaryMode === mode.id
                    ? 'bg-[#E11D48] text-white shadow-2xs'
                    : 'bg-[#F8FAFC] text-slate-700 hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                }`}
              >
                <span>{mode.label}</span>
              </button>
            ))}
          </div>

          {/* Attached File Preview Chip */}
          {attachedFile && (
            <div className="flex items-center justify-between bg-rose-50 border border-rose-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 animate-fadeIn">
              <div className="flex items-center gap-2 truncate">
                <HiDocumentText className="w-4 h-4 text-[#E11D48] shrink-0" />
                <span className="font-bold truncate">{attachedFile.name}</span>
                <span className="text-[10px] text-slate-500 font-mono">
                  ({(attachedFile.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
              <button
                onClick={handleRemoveAttachedFile}
                className="text-rose-600 hover:text-rose-800 p-1 cursor-pointer"
                title="إلغاء الملف"
              >
                <HiX className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Main Input Bar */}
          <div className="flex items-end gap-2 bg-[#F8FAFC] border border-[#CBD5E1] focus-within:border-[#E11D48] rounded-2xl p-2 transition-all shadow-inner">
            
            {/* Attachment Button */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.webp,.txt"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-xl text-slate-500 hover:text-[#E11D48] hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
              title="إرفاق ملف PDF أو صورة درس"
            >
              <HiPaperClip className="w-5 h-5" />
            </button>

            {/* Expanding Textarea */}
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputText}
              onChange={handleTextareaChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="اكتب سؤالك، الصق نص الدرس، أو أرفق ملفاً لتلخيصه فورياً... (Enter للإرسال)"
              className="flex-1 bg-transparent border-0 text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none resize-none py-1.5 px-1 max-h-44 leading-relaxed"
            />

            {/* Send Button */}
            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={isLoading || (!inputText.trim() && !attachedFile)}
              className="p-2.5 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] disabled:opacity-40 disabled:hover:bg-[#E11D48] text-white shadow-xs transition-all cursor-pointer shrink-0 disabled:cursor-not-allowed"
              title="إرسال"
            >
              <HiArrowUp className="w-4 h-4" />
            </button>

          </div>

          <div className="flex items-center justify-between text-[10px] text-[#94A3B8] px-1">
            <span>مدعوم بنماذج NVIDIA NIM و Vision السريعة 🇩🇿</span>
            <span>اضغط Shift + Enter لسطر جديد</span>
          </div>

        </div>
      </div>

      {/* 4. History Sessions Slide-Over Drawer */}
      <AnimatePresence>
        {isHistoryOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity"
              onClick={() => setIsHistoryOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.25 }}
              className="relative mr-auto w-full max-w-xs bg-white h-full shadow-2xl z-10 flex flex-col justify-between p-5 text-right"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                  <div className="flex items-center gap-2">
                    <HiChatAlt2 className="w-5 h-5 text-[#E11D48]" />
                    <h3 className="text-sm font-bold text-[#0F172A]">سجل المحادثات والملخصات</h3>
                  </div>
                  <button 
                    onClick={() => setIsHistoryOpen(false)}
                    className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                  >
                    <HiX className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={handleNewChat}
                  className="w-full py-2.5 rounded-xl bg-[#E11D48] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-2xs hover:bg-[#BE123C] transition-colors cursor-pointer"
                >
                  <HiRefresh className="w-4 h-4" />
                  <span>بدء محادثة جديدة +</span>
                </button>

                {/* Sessions List */}
                <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-220px)] scrollbar-thin">
                  {historySessions.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-8">
                      لا توجد محادثات سابقة محفوظة.
                    </p>
                  ) : (
                    historySessions.map((session) => (
                      <div
                        key={session.id}
                        onClick={() => handleRestoreSession(session)}
                        className="p-3 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-xs cursor-pointer flex items-center justify-between gap-2 group transition-colors"
                      >
                        <div className="truncate min-w-0">
                          <p className="font-bold text-[#0F172A] truncate group-hover:text-[#E11D48]">
                            {session.title}
                          </p>
                          <p className="text-[10px] text-[#64748B]">
                            {session.date} • {session.streamName}
                          </p>
                        </div>
                        <button
                          onClick={(e) => handleDeleteSession(session.id, e)}
                          className="text-slate-400 hover:text-rose-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          title="حذف"
                        >
                          <HiTrash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {historySessions.length > 0 && (
                <button
                  onClick={() => {
                    setHistorySessions([]);
                    localStorage.removeItem('naja7i_chat_sessions_history');
                  }}
                  className="text-xs text-rose-600 hover:underline pt-3 border-t border-[#E2E8F0] text-center block w-full cursor-pointer"
                >
                  مسح كامل السجل
                </button>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. Custom API Key Modal */}
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
