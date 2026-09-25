import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiHome, 
  HiChevronLeft, 
  HiRefresh, 
  HiClock, 
  HiCheckCircle, 
  HiXCircle, 
  HiLightBulb,
  HiArrowRight,
  HiFire,
  HiBookOpen,
  HiBookmark
} from 'react-icons/hi';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { STREAMS } from '../data/streamsData';

// Map quiz subjectId to MistakesNotebook subjectId standard
const mapToMistakeSubjectId = (subjectId) => {
  const map = {
    sciences_nat: 'sciences_nat',
    physique: 'physique',
    math: 'math',
    histoire_geo: 'hisgeo',
    islamic: 'islamic',
    philo: 'philo',
    arabe: 'arabic',
    francais: 'french',
    anglais: 'english',
    espagnol: 'english',
    allemand: 'english',
    italien: 'english',
    compta: 'gestion_fin',
    economie: 'economy',
    droit: 'economy',
    genie_civil: 'genie',
    genie_mecanique: 'genie',
    genie_electrique: 'genie',
    genie_procedes: 'genie'
  };
  return map[subjectId] || subjectId;
};

export default function QuizBankPage() {
  const [selectedStreamId, setSelectedStreamId] = useState('sciences');
  const [selectedSubjectId, setSelectedSubjectId] = useState('all');
  const [quizLength, setQuizLength] = useState(5); // 5 | 10 | 'all'
  const [isTimed, setIsTimed] = useState(false);
  const [emptyWarning, setEmptyWarning] = useState(false);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState(null);

  // Saved mistakes set to track which quiz questions are in user's mistakes notebook
  const [savedMistakeIds, setSavedMistakeIds] = useState(() => {
    try {
      const saved = localStorage.getItem('naja7i_mistakes_book');
      if (saved) {
        const arr = JSON.parse(saved);
        return new Set(arr.map(item => item.quizQuestionId).filter(Boolean));
      }
      return new Set();
    } catch {
      return new Set();
    }
  });

  // Recent quiz attempts history
  const [quizHistory, setQuizHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('naja7i_quiz_history') || '[]');
    } catch {
      return [];
    }
  });

  // Quiz State
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [qId]: optionIndex }
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasSubmittedCurrent, setHasSubmittedCurrent] = useState(false);
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState(60); // 60s per question if timed

  const showToast = (text) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Available questions for selected stream
  const availableQuestionsForStream = useMemo(() => {
    return QUIZ_QUESTIONS.filter(q => q.streamIds.includes(selectedStreamId));
  }, [selectedStreamId]);

  const availableSubjects = useMemo(() => {
    const subs = new Map();
    availableQuestionsForStream.forEach(q => {
      subs.set(q.subjectId, q.subjectName);
    });
    return Array.from(subs.entries()).map(([id, name]) => ({ id, name }));
  }, [availableQuestionsForStream]);

  const currentStream = useMemo(() => {
    return STREAMS.find(s => s.id === selectedStreamId) || STREAMS[0];
  }, [selectedStreamId]);

  const currentQ = currentQuestions[currentIndex];

  const handleSelectOption = (idx) => {
    if (hasSubmittedCurrent) return;
    setSelectedOption(idx);
  };

  const handleConfirmAnswer = useCallback(() => {
    if (hasSubmittedCurrent || !currentQ) return;
    const ans = selectedOption !== null ? selectedOption : -1;
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: ans }));
    setHasSubmittedCurrent(true);
  }, [hasSubmittedCurrent, currentQ, selectedOption]);

  // Start Quiz
  const startQuiz = () => {
    let pool = availableQuestionsForStream;
    if (selectedSubjectId !== 'all') {
      pool = pool.filter(q => q.subjectId === selectedSubjectId);
    }

    if (pool.length === 0) {
      setEmptyWarning(true);
      setTimeout(() => setEmptyWarning(false), 3500);
      return;
    }

    // Shuffle pool
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const count = quizLength === 'all' ? shuffled.length : Math.min(quizLength, shuffled.length);
    const selected = shuffled.slice(0, count);

    setCurrentQuestions(selected);
    setCurrentIndex(0);
    setUserAnswers({});
    setSelectedOption(null);
    setHasSubmittedCurrent(false);
    setQuizStarted(true);
    setQuizFinished(false);
    setTimeLeft(60);
  };

  // Timer Tick
  useEffect(() => {
    if (!quizStarted || quizFinished || !isTimed || hasSubmittedCurrent) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleConfirmAnswer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, quizFinished, isTimed, hasSubmittedCurrent, handleConfirmAnswer]);

  // Score Calculation
  const calculateScore = () => {
    let correct = 0;
    currentQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    const total = currentQuestions.length || 1;
    const percent = Math.round((correct / total) * 100);
    const mark20 = ((correct / total) * 20).toFixed(1);
    return { correct, total, percent, mark20 };
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < currentQuestions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setHasSubmittedCurrent(false);
      setTimeLeft(60);
    } else {
      setQuizFinished(true);
      // Save high score to localStorage
      try {
        const history = JSON.parse(localStorage.getItem('naja7i_quiz_history') || '[]');
        const score = calculateScore();
        const newRecord = {
          date: new Date().toLocaleDateString('ar-DZ'),
          streamId: selectedStreamId,
          streamName: currentStream?.name || 'اختبار بكالوريا',
          subjectName: selectedSubjectId === 'all' ? 'جميع المواد' : (availableSubjects.find(s => s.id === selectedSubjectId)?.name || 'مادة محددة'),
          score: score.mark20,
          total: currentQuestions.length,
          percentage: score.percent
        };
        const updatedHistory = [newRecord, ...history].slice(0, 10);
        localStorage.setItem('naja7i_quiz_history', JSON.stringify(updatedHistory));
        setQuizHistory(updatedHistory);
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Save single question to Mistakes Notebook
  const handleSaveToMistakes = (question, userAnsIdx) => {
    if (!question) return;
    try {
      const raw = localStorage.getItem('naja7i_mistakes_book');
      const existing = raw ? JSON.parse(raw) : [];

      const exists = existing.some(m => m.quizQuestionId === question.id || m.title === question.question);
      if (exists) {
        showToast('هذا السؤال محفوظ مسبقاً في كراس الأخطاء 📓');
        return;
      }

      const userAnsText = userAnsIdx !== null && userAnsIdx !== undefined && userAnsIdx >= 0
        ? question.options[userAnsIdx]
        : 'لم يتم تحديد إجابة (انتهاء الوقت)';

      const newEntry = {
        id: `quiz-mistake-${question.id}-${Date.now()}`,
        quizQuestionId: question.id,
        subjectId: mapToMistakeSubjectId(question.subjectId),
        subjectName: question.subjectName,
        unit: question.unitName || 'عام',
        level: 'critical',
        levelLabel: '🔥 فخ وتطبيق بكالوريا',
        title: question.question,
        mistake: `إجابتك: ${userAnsText}`,
        rule: `الإجابة النموذجية: ${question.options[question.correctIndex]}\n\nالتعليل المنهجي:\n${question.explanation}`,
        image: '',
        isMastered: false,
        isPreloaded: false,
        createdAt: `اختبار Quiz (${new Date().toLocaleDateString('ar-DZ')})`
      };

      const updated = [newEntry, ...existing];
      localStorage.setItem('naja7i_mistakes_book', JSON.stringify(updated));
      setSavedMistakeIds(prev => new Set(prev).add(question.id));
      showToast(`تم حفظ "${question.subjectName} - ${question.unitName}" في كراس الأخطاء بنجاح ✓`);
    } catch (err) {
      console.error(err);
      showToast('حدث خطأ أثناء الحفظ في كراس الأخطاء');
    }
  };

  // Save all incorrect questions to Mistakes Notebook in 1 click
  const handleSaveAllMistakes = () => {
    const incorrectQuestions = currentQuestions.filter(q => userAnswers[q.id] !== q.correctIndex);
    if (incorrectQuestions.length === 0) {
      showToast('لا توجد أخطاء لحفظها! جميع إجاباتك صحيحة 👏');
      return;
    }

    try {
      const raw = localStorage.getItem('naja7i_mistakes_book');
      let existing = raw ? JSON.parse(raw) : [];
      let added = 0;
      const nextIds = new Set(savedMistakeIds);

      incorrectQuestions.forEach(q => {
        const exists = existing.some(m => m.quizQuestionId === q.id || m.title === q.question);
        if (!exists) {
          const userAns = userAnswers[q.id];
          const userAnsText = userAns !== null && userAns !== undefined && userAns >= 0
            ? q.options[userAns]
            : 'لم يتم تحديد إجابة';

          const newEntry = {
            id: `quiz-mistake-${q.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            quizQuestionId: q.id,
            subjectId: mapToMistakeSubjectId(q.subjectId),
            subjectName: q.subjectName,
            unit: q.unitName || 'عام',
            level: 'critical',
            levelLabel: '🔥 فخ وتطبيق بكالوريا',
            title: q.question,
            mistake: `إجابتك: ${userAnsText}`,
            rule: `الإجابة النموذجية: ${q.options[q.correctIndex]}\n\nالتعليل المنهجي:\n${q.explanation}`,
            image: '',
            isMastered: false,
            isPreloaded: false,
            createdAt: `اختبار Quiz (${new Date().toLocaleDateString('ar-DZ')})`
          };
          existing.unshift(newEntry);
          nextIds.add(q.id);
          added++;
        }
      });

      localStorage.setItem('naja7i_mistakes_book', JSON.stringify(existing));
      setSavedMistakeIds(nextIds);
      showToast(`تم حفظ ${added} سؤال خاطئ في كراس الأخطاء بنجاح! 📓`);
    } catch (err) {
      console.error(err);
      showToast('حدث خطأ أثناء حفظ الأخطاء');
    }
  };

  const scoreData = quizFinished ? calculateScore() : null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pb-20 font-['Cairo']">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-4 py-3 rounded-xl shadow-lg text-xs font-bold flex items-center gap-2.5 border border-slate-700 animate-fadeIn">
          <span className="text-base">📓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner Header */}
      <div className="bg-white border-b border-[#E2E8F0] py-5 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#64748B] mb-3">
            <Link to="/" className="hover:text-[#E11D48] flex items-center gap-1 transition-colors">
              <HiHome className="w-4 h-4" />
              <span>الرئيسية</span>
            </Link>
            <span>/</span>
            <span className="text-[#0F172A] font-bold">بنك الأسئلة والاختبارات التفاعلية</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] flex items-center gap-2">
                <span>بنك الأسئلة والاختبارات السريعة (Quiz & QCM)</span>
                <span className="text-xl">⏱️</span>
              </h1>
              <p className="text-xs sm:text-sm text-[#475569] mt-1 max-w-2xl leading-relaxed">
                اختبر معلوماتك وفهمك للوحدات في دقائق معدودة، اكتشف أخطاءك فورياً مع تعليل منهجي وحفظ مباشر في كراس الأخطاء.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <Link
                to="/mistakes-notebook"
                className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100/80 text-[#E11D48] text-xs font-bold border border-rose-200 transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <HiBookOpen className="w-4 h-4" />
                <span>كراس الأخطاء الذكي</span>
              </Link>

              <Link
                to="/"
                className="px-4 py-2 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0F172A] text-xs font-bold border border-[#CBD5E1] transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <span>الرئيسية</span>
                <HiChevronLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 space-y-6">

        {/* 1. SETUP VIEW (عندما لا يكون الاختبار مبدوءاً) */}
        {!quizStarted && (
          <div className="space-y-6">
            
            {/* Stream Selector */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-3">
              <label className="block text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#E11D48]"></span>
                <span>1. اختر الشعبة الدراسية:</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {STREAMS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedStreamId(s.id);
                      setSelectedSubjectId('all');
                    }}
                    className={`p-3 rounded-xl text-xs font-bold transition-all text-right flex items-center gap-2.5 cursor-pointer shadow-2xs ${
                      selectedStreamId === s.id
                        ? 'bg-[#E11D48] text-white'
                        : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                    }`}
                  >
                    <span className="text-xl shrink-0">{s.icon}</span>
                    <span className="truncate">{s.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Selector */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-3">
              <label className="block text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#E11D48]"></span>
                <span>2. اختر المادة الدراسية:</span>
              </label>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedSubjectId('all')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedSubjectId === 'all'
                      ? 'bg-[#0F172A] text-white shadow-2xs'
                      : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                  }`}
                >
                  جميع مواد الشعبة ({availableQuestionsForStream.length} سؤال)
                </button>

                {availableSubjects.map(sub => {
                  const count = availableQuestionsForStream.filter(q => q.subjectId === sub.id).length;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubjectId(sub.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedSubjectId === sub.id
                          ? 'bg-[#0F172A] text-white shadow-2xs'
                          : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                      }`}
                    >
                      {sub.name} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quiz Mode & Length */}
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-4">
              <label className="block text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#E11D48]"></span>
                <span>3. نمط وعدد الأسئلة:</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => { setQuizLength(5); setIsTimed(false); }}
                  className={`p-3.5 rounded-xl border text-right transition-all cursor-pointer ${
                    quizLength === 5 && !isTimed 
                      ? 'bg-rose-50 border-[#E11D48] text-[#E11D48]' 
                      : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#CBD5E1]'
                  }`}
                >
                  <div className="font-bold text-xs flex items-center gap-1.5 mb-1">
                    <span>⚡ اختبار سريع</span>
                  </div>
                  <p className="text-[11px] text-[#64748B]">5 أسئلة سريعة لتقييم الفهم في 3 دقائق.</p>
                </button>

                <button
                  onClick={() => { setQuizLength(10); setIsTimed(true); }}
                  className={`p-3.5 rounded-xl border text-right transition-all cursor-pointer ${
                    quizLength === 10 && isTimed 
                      ? 'bg-rose-50 border-[#E11D48] text-[#E11D48]' 
                      : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#CBD5E1]'
                  }`}
                >
                  <div className="font-bold text-xs flex items-center gap-1.5 mb-1">
                    <HiFire className="text-amber-500" />
                    <span>⏱️ تحدي البكالوريا الموقوت</span>
                  </div>
                  <p className="text-[11px] text-[#64748B]">10 أسئلة مع عداد 60 ثانية لكل سؤال.</p>
                </button>

                <button
                  onClick={() => { setQuizLength('all'); setIsTimed(false); }}
                  className={`p-3.5 rounded-xl border text-right transition-all cursor-pointer ${
                    quizLength === 'all' 
                      ? 'bg-rose-50 border-[#E11D48] text-[#E11D48]' 
                      : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#CBD5E1]'
                  }`}
                >
                  <div className="font-bold text-xs flex items-center gap-1.5 mb-1">
                    <span>📚 اختبار شامل</span>
                  </div>
                  <p className="text-[11px] text-[#64748B]">كل الأسئلة المتوفرة للمادة المحددة.</p>
                </button>
              </div>

              {/* Start Quiz Action */}
              <div className="pt-2 space-y-2">
                {emptyWarning && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold text-center animate-fadeIn">
                    ⚠️ لا توجد أسئلة متوفرة حالياً لهذا التحديد، يرجى اختيار مادة أخرى أو تغيير الشعبة.
                  </div>
                )}
                <button
                  type="button"
                  onClick={startQuiz}
                  className="w-full py-3.5 rounded-xl bg-[#E11D48] hover:bg-[#be123c] text-white font-black text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-98"
                >
                  <span>ابدأ الاختبار الآن</span>
                  <HiArrowRight className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </div>

            {/* 4. Recent Attempts History (سجل الاختبارات السابقة) */}
            {quizHistory.length > 0 && (
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
                    <span>📊 آخر نتائجك في الاختبارات:</span>
                  </h4>
                  <button
                    onClick={() => {
                      localStorage.removeItem('naja7i_quiz_history');
                      setQuizHistory([]);
                      showToast('تم مسح سجل الاختبارات السابقة');
                    }}
                    className="text-[11px] text-slate-400 hover:text-rose-600 font-medium cursor-pointer"
                  >
                    مسح السجل
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {quizHistory.slice(0, 3).map((h, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-[#0F172A] truncate max-w-[140px]">{h.streamName || 'اختبار بكالوريا'}</div>
                        <div className="text-[10px] text-slate-500">{h.subjectName} • {h.date}</div>
                      </div>
                      <div className="text-left font-mono">
                        <span className={`font-black text-sm ${h.percentage >= 80 ? 'text-emerald-600' : h.percentage >= 50 ? 'text-blue-600' : 'text-rose-600'}`}>
                          {h.score}/20
                        </span>
                        <div className="text-[10px] text-slate-400 font-sans">({h.percentage}%)</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* 2. ACTIVE QUIZ VIEW (شاشة حل السؤال النشط) */}
        {quizStarted && !quizFinished && currentQ && (
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            
            {/* Top Question Progress & Timer */}
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-bold text-[#E11D48]">
                  {currentQ.subjectName}
                </span>
                <span className="text-xs text-[#64748B] font-semibold">
                  • {currentQ.unitName}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {isTimed && (
                  <span className={`px-2.5 py-1 rounded-lg font-mono text-xs font-bold flex items-center gap-1 ${
                    timeLeft <= 10 ? 'bg-rose-100 text-rose-700 animate-pulse' : 'bg-slate-100 text-[#0F172A]'
                  }`}>
                    <HiClock className="w-3.5 h-3.5" />
                    <span>{timeLeft} ثانية</span>
                  </span>
                )}
                <span className="text-xs font-bold text-[#0F172A]">
                  السؤال {currentIndex + 1} / {currentQuestions.length}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#E11D48] rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / currentQuestions.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              <h2 className="text-base sm:text-lg font-black text-[#0F172A] leading-relaxed">
                {currentQ.question}
              </h2>
            </div>

            {/* Options List */}
            <div className="space-y-2.5">
              {currentQ.options.map((optionText, optIdx) => {
                const isSelected = selectedOption === optIdx;
                const isCorrect = optIdx === currentQ.correctIndex;
                
                let optionStyle = 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#CBD5E1] text-[#0F172A]';

                if (hasSubmittedCurrent) {
                  if (isCorrect) {
                    optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'bg-rose-50 border-rose-500 text-rose-950';
                  } else {
                    optionStyle = 'bg-gray-50/50 border-[#E2E8F0] text-gray-400 opacity-60';
                  }
                } else if (isSelected) {
                  optionStyle = 'bg-rose-50 border-[#E11D48] text-[#E11D48] font-bold shadow-xs';
                }

                const letters = ['أ', 'ب', 'ج', 'د'];

                return (
                  <div
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`p-3.5 sm:p-4 rounded-xl border-2 transition-all flex items-start gap-3 cursor-pointer ${optionStyle}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-white border border-[#CBD5E1] text-xs font-black shrink-0 flex items-center justify-center shadow-2xs mt-0.5">
                      {letters[optIdx]}
                    </span>
                    <span className="text-xs sm:text-sm leading-relaxed flex-1 pt-0.5">
                      {optionText}
                    </span>

                    {hasSubmittedCurrent && isCorrect && (
                      <HiCheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    {hasSubmittedCurrent && isSelected && !isCorrect && (
                      <HiXCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Explanation Card (يظهر فورياً بعد تأكيد الإجابة مع زر الحفظ في كراس الأخطاء) */}
            {hasSubmittedCurrent && (
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950 space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-black text-amber-900">
                    <HiLightBulb className="w-4 h-4 text-amber-600" />
                    <span>الشرح المنهجي وفق معايير البكالوريا:</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSaveToMistakes(currentQ, selectedOption)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      savedMistakeIds.has(currentQ.id)
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-white hover:bg-amber-100/80 text-amber-900 border border-amber-300 shadow-2xs'
                    }`}
                  >
                    {savedMistakeIds.has(currentQ.id) ? (
                      <>
                        <HiCheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>محفوظ في الكراس ✓</span>
                      </>
                    ) : (
                      <>
                        <HiBookOpen className="w-4 h-4 text-amber-600" />
                        <span>حفظ في كراس الأخطاء 📓</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs leading-relaxed text-amber-900/90 font-medium">
                  {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  if (window.confirm('هل تريد إنهاء الاختبار والعودة للقائمة؟')) {
                    setQuizStarted(false);
                  }
                }}
                className="text-xs text-[#64748B] hover:text-[#0F172A] font-bold underline cursor-pointer"
              >
                إلغاء الاختبار
              </button>

              {!hasSubmittedCurrent ? (
                <button
                  onClick={handleConfirmAnswer}
                  disabled={selectedOption === null}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    selectedOption !== null
                      ? 'bg-[#E11D48] hover:bg-[#be123c] text-white shadow-2xs'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  تأكيد الإجابة ✓
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-xl bg-[#0F172A] hover:bg-black text-white font-bold text-xs transition-all flex items-center gap-2 shadow-2xs cursor-pointer"
                >
                  <span>{currentIndex + 1 < currentQuestions.length ? 'السؤال التالي' : 'عرض النتيجة النهائية'}</span>
                  <HiArrowRight className="w-3.5 h-3.5 rotate-180" />
                </button>
              )}
            </div>

          </div>
        )}

        {/* 3. FINAL RESULTS VIEW (كشف النتيجة وتحليل الأداء مع تكامل كراس الأخطاء) */}
        {quizFinished && scoreData && (
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            
            {/* Scorecard Hero */}
            <div className="text-center space-y-3 pb-6 border-b border-[#E2E8F0]">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-2xl border border-rose-200 flex items-center justify-center mx-auto shadow-2xs">
                {scoreData.percent >= 80 ? '🏆' : scoreData.percent >= 50 ? '👏' : '💡'}
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-[#0F172A]">
                {scoreData.percent >= 80 ? 'أداء ممتاز ومستوى تفوق!' : scoreData.percent >= 50 ? 'أداء جيد ومجهود طيب' : 'تحتاج لمراجعة أعمق لهذه الوحدة'}
              </h2>

              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div>
                  <span className="text-xs text-[#64748B] block">العلامة المقدرة:</span>
                  <strong className="text-lg font-black text-[#E11D48]">{scoreData.mark20} / 20</strong>
                </div>
                <div className="w-px h-8 bg-[#CBD5E1]" />
                <div>
                  <span className="text-xs text-[#64748B] block">نسبة الإجابات الصحيحة:</span>
                  <strong className="text-lg font-black text-[#0F172A]">{scoreData.correct} من {scoreData.total} ({scoreData.percent}%)</strong>
                </div>
              </div>
            </div>

            {/* Mistakes Notebook Callout Banner */}
            {scoreData.correct < scoreData.total && (
              <div className="p-4 rounded-xl bg-[#0F172A] text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center text-xl shrink-0">
                    📓
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold">كراس الأخطاء وفخاخ البكالوريا (Carnet d'Erreurs)</h4>
                    <p className="text-[11px] text-slate-300">
                      لديك {scoreData.total - scoreData.correct} أسئلة خاطئة، احفظها بضغطة واحدة لمراجعتها قبل يوم الامتحان.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                  <button
                    type="button"
                    onClick={handleSaveAllMistakes}
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-lg bg-[#E11D48] hover:bg-[#be123c] text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <HiBookmark className="w-4 h-4" />
                    <span>حفظ كل الأخطاء</span>
                  </button>

                  <Link
                    to="/mistakes-notebook"
                    className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all border border-slate-700 flex items-center gap-1"
                  >
                    <span>فتح الكراس</span>
                    <HiChevronLeft className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* Detailed Question Review */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-[#0F172A]">
                  مراجعة إجاباتك والشروحات المنهجية:
                </h3>
                <span className="text-xs text-[#64748B]">
                  {scoreData.correct} صحيحة • {scoreData.total - scoreData.correct} خاطئة
                </span>
              </div>

              <div className="space-y-3">
                {currentQuestions.map((q, idx) => {
                  const userAns = userAnswers[q.id];
                  const isCorrect = userAns === q.correctIndex;
                  const isSaved = savedMistakeIds.has(q.id);

                  return (
                    <div 
                      key={idx}
                      className={`p-4 rounded-xl border transition-all text-xs space-y-3 ${
                        isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-[#0F172A] leading-relaxed">
                          {idx + 1}. {q.question}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black shrink-0 ${
                          isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                        }`}>
                          {isCorrect ? 'صحيحة ✓' : 'خاطئة ✗'}
                        </span>
                      </div>

                      <div className="text-[11px] text-[#475569] space-y-1">
                        <div>
                          <strong>إجابتك:</strong> {userAns !== -1 && userAns !== undefined ? q.options[userAns] : 'لم تجب'}
                        </div>
                        {!isCorrect && (
                          <div className="text-emerald-800 font-bold">
                            <strong>الإجابة الصحيحة:</strong> {q.options[q.correctIndex]}
                          </div>
                        )}
                      </div>

                      <div className="pt-2 border-t border-slate-200 text-[11px] text-[#64748B] leading-relaxed">
                        <strong>الشرح المنهجي:</strong> {q.explanation}
                      </div>

                      {/* Action to save this specific question */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-200/70">
                        <span className="text-[10px] text-slate-500">
                          {q.subjectName} • {q.unitName}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleSaveToMistakes(q, userAns)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                            isSaved
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 shadow-2xs'
                          }`}
                        >
                          {isSaved ? (
                            <>
                              <HiCheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                              <span>محفوظ في الكراس ✓</span>
                            </>
                          ) : (
                            <>
                              <HiBookOpen className="w-3.5 h-3.5 text-slate-500" />
                              <span>حفظ في كراس الأخطاء 📓</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Final Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#E2E8F0]">
              <button
                onClick={startQuiz}
                className="w-full sm:w-auto flex-1 py-3 rounded-xl bg-[#E11D48] hover:bg-[#be123c] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
              >
                <HiRefresh className="w-4 h-4" />
                <span>إعادة نفس الاختبار</span>
              </button>

              <button
                onClick={() => setQuizStarted(false)}
                className="w-full sm:w-auto flex-1 py-3 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F172A] font-bold text-xs border border-[#CBD5E1] flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>اختيار مادة أو شعبة أخرى</span>
              </button>

              <Link
                to="/mistakes-notebook"
                className="w-full sm:w-auto py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0F172A] font-bold text-xs border border-slate-300 flex items-center justify-center gap-1.5 transition-all"
              >
                <HiBookOpen className="w-4 h-4 text-[#E11D48]" />
                <span>مراجعة كراس الأخطاء 📓</span>
              </Link>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
