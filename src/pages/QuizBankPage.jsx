import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiHome, 
  HiChevronLeft, 
  HiRefresh, 
  HiClock, 
  HiSparkles,
  HiCheckCircle, 
  HiXCircle, 
  HiLightBulb,
  HiArrowRight,
  HiFilter,
  HiFire
} from 'react-icons/hi';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { STREAMS } from '../data/streamsData';

export default function QuizBankPage() {
  const [selectedStreamId, setSelectedStreamId] = useState('sciences');
  const [selectedSubjectId, setSelectedSubjectId] = useState('all');
  const [quizLength, setQuizLength] = useState(5); // 5 | 10 | 'all'
  const [isTimed, setIsTimed] = useState(false);

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

  // Available subjects for selected stream
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

  // Start Quiz
  const startQuiz = () => {
    let pool = availableQuestionsForStream;
    if (selectedSubjectId !== 'all') {
      pool = pool.filter(q => q.subjectId === selectedSubjectId);
    }

    if (pool.length === 0) {
      alert('لا توجد أسئلة متوفرة حالياً لهذا التحديد.');
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

    if (timeLeft <= 0) {
      // Auto submit with no answer or current selection
      handleConfirmAnswer();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, quizFinished, isTimed, timeLeft, hasSubmittedCurrent]);

  const currentQ = currentQuestions[currentIndex];

  const handleSelectOption = (idx) => {
    if (hasSubmittedCurrent) return;
    setSelectedOption(idx);
  };

  const handleConfirmAnswer = () => {
    if (hasSubmittedCurrent) return;
    const ans = selectedOption !== null ? selectedOption : -1;
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: ans }));
    setHasSubmittedCurrent(true);
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
        history.unshift({
          date: new Date().toLocaleDateString('ar-DZ'),
          streamId: selectedStreamId,
          score: score.mark20,
          total: currentQuestions.length,
          percentage: score.percent
        });
        localStorage.setItem('naja7i_quiz_history', JSON.stringify(history.slice(0, 10)));
      } catch (e) {
        console.error(e);
      }
    }
  };

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

  const scoreData = quizFinished ? calculateScore() : null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pb-20 font-['Cairo']">
      
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
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
                بنك الأسئلة والاختبارات السريعة (Quiz & QCM) ⏱️
              </h1>
              <p className="text-xs sm:text-sm text-[#475569] mt-1 max-w-2xl leading-relaxed">
                اختبر معلوماتك وفهمك للوحدات في دقائق معدودة، اكتشف أخطاءك فورياً مع تعليل منهجي لكل إجابة.
              </p>
            </div>

            <Link
              to="/"
              className="px-4 py-2 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0F172A] text-xs font-bold border border-[#CBD5E1] transition-colors flex items-center gap-1.5 shadow-2xs self-start md:self-auto"
            >
              <span>الرئيسية</span>
              <HiChevronLeft className="w-4 h-4" />
            </Link>
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
              <div className="pt-2">
                <button
                  onClick={startQuiz}
                  className="w-full py-3.5 rounded-xl bg-[#E11D48] hover:bg-[#be123c] text-white font-black text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-98"
                >
                  <span>ابدأ الاختبار الآن</span>
                  <HiArrowRight className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </div>

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

            {/* Explanation Card (يظهر فورياً بعد تأكيد الإجابة) */}
            {hasSubmittedCurrent && (
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950 space-y-2 animate-fadeIn">
                <div className="flex items-center gap-1.5 text-xs font-black text-amber-900">
                  <HiLightBulb className="w-4 h-4 text-amber-600" />
                  <span>الشرح المنهجي وفق معايير البكالوريا:</span>
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

        {/* 3. FINAL RESULTS VIEW (كشف النتيجة وتحليل الأداء) */}
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

            {/* Detailed Question Review */}
            <div className="space-y-4">
              <h3 className="text-sm font-black text-[#0F172A]">
                مراجعة إجاباتك والشروحات المنهجية:
              </h3>

              <div className="space-y-3">
                {currentQuestions.map((q, idx) => {
                  const userAns = userAnswers[q.id];
                  const isCorrect = userAns === q.correctIndex;

                  return (
                    <div 
                      key={idx}
                      className={`p-4 rounded-xl border transition-all text-xs space-y-2 ${
                        isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-[#0F172A]">
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

                      <div className="pt-1.5 border-t border-gray-200 text-[11px] text-[#64748B] leading-relaxed">
                        <strong>الشرح:</strong> {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
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
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
