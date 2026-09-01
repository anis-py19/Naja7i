import React, { useState } from 'react';
import { 
  HiRefresh, 
  HiCheckCircle, 
  HiChevronLeft, 
  HiChevronRight, 
  HiLightBulb,
  HiSparkles
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

export default function InteractiveFlashcardsViewer({ flashcards = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState({});

  if (!flashcards || flashcards.length === 0) {
    return (
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#E11D48] flex items-center justify-center text-2xl mx-auto">
          🎴
        </div>
        <h4 className="text-sm font-bold text-[#0F172A]">لا توجد بطاقات مراجعة متوفرة</h4>
        <p className="text-xs text-[#64748B]">
          اختر «ملخص أكاديمي شامل» لتوليد بطاقات المراجعة الذكية للدرس تلقائياً.
        </p>
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];
  const isMastered = masteredCards[currentCard?.id];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const toggleMastered = (e) => {
    e.stopPropagation();
    setMasteredCards((prev) => ({
      ...prev,
      [currentCard.id]: !prev[currentCard.id]
    }));
  };

  const masteredCount = Object.values(masteredCards).filter(Boolean).length;

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-sm space-y-6 select-none font-['Cairo']">
      
      {/* Top Bar Info */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#E11D48] border border-rose-200 flex items-center justify-center text-sm font-bold shadow-2xs">
            🎴
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-[#0F172A] flex items-center gap-1.5">
              <span>بطاقات المراجعة الذكية (Flashcards)</span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 font-medium border border-rose-200/60 font-mono">
                {currentIndex + 1} / {flashcards.length}
              </span>
            </h3>
            <span className="text-[11px] text-[#64748B]">
              اضغط على البطاقة لقلبها واختبار تذكرك للمعلومة (Active Recall)
            </span>
          </div>
        </div>

        {/* Mastered Counter */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700">
          <HiCheckCircle className="w-4 h-4 text-emerald-600" />
          <span>المتقنة:</span>
          <span className="font-mono text-[#E11D48]">{masteredCount}</span>
          <span className="text-slate-400">/</span>
          <span className="font-mono text-slate-600">{flashcards.length}</span>
        </div>
      </div>

      {/* Flip Card Area */}
      <div className="flex justify-center py-2">
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="w-full max-w-lg min-h-[220px] sm:min-h-[260px] rounded-2xl cursor-pointer perspective-1000 relative group transition-transform"
        >
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full min-h-[220px] sm:min-h-[260px] relative preserve-3d"
          >
            {/* FRONT: Question */}
            <div
              className={`absolute inset-0 backface-hidden rounded-2xl p-6 sm:p-8 flex flex-col justify-between border-2 transition-all ${
                isMastered 
                  ? 'bg-emerald-50/70 border-emerald-300 shadow-sm'
                  : 'bg-gradient-to-br from-white to-rose-50/40 border-rose-200 shadow-md group-hover:border-[#E11D48]'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800 flex items-center gap-1">
                  <HiLightBulb className="w-3.5 h-3.5 text-rose-600" />
                  <span>السؤال / المصطلح:</span>
                </span>

                <button
                  type="button"
                  onClick={toggleMastered}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer flex items-center gap-1 text-[11px] ${
                    isMastered
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-slate-500 hover:text-emerald-700 border-slate-200'
                  }`}
                  title="تحديد كبطاقة متقنة"
                >
                  <HiCheckCircle className="w-4 h-4" />
                  <span>{isMastered ? 'تم الحفظ ✓' : 'حفظ'}</span>
                </button>
              </div>

              <div className="text-center py-4">
                <p className="text-sm sm:text-base font-bold text-[#0F172A] leading-relaxed">
                  {currentCard?.question}
                </p>
              </div>

              <div className="text-center">
                <span className="text-[11px] text-[#64748B] bg-white/80 px-3 py-1 rounded-full border border-slate-200 inline-block">
                  🔄 اضغط لرؤية الإجابة النموذجية
                </span>
              </div>
            </div>

            {/* BACK: Answer */}
            <div
              className={`absolute inset-0 backface-hidden rotateY-180 rounded-2xl p-6 sm:p-8 flex flex-col justify-between border-2 bg-gradient-to-br from-slate-900 to-slate-950 text-white border-slate-800 shadow-xl`}
            >
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <span>الإجابة النموذجية الوزارية:</span>
                </span>

                <span className="text-[10px] text-slate-400 font-mono">
                  # {currentIndex + 1}
                </span>
              </div>

              <div className="text-center py-4">
                <p className="text-xs sm:text-sm font-medium text-slate-100 leading-relaxed">
                  {currentCard?.answer}
                </p>
              </div>

              <div className="text-center">
                <span className="text-[11px] text-slate-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700 inline-block">
                  🔄 اضغط للعودة للسؤال
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0] gap-2">
        <button
          onClick={handlePrev}
          className="px-4 py-2 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F172A] border border-[#CBD5E1] text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
        >
          <HiChevronRight className="w-4 h-4 text-[#E11D48]" />
          <span>البطاقة السابقة</span>
        </button>

        {/* Dots Indicator */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-[200px] px-2 py-1">
          {flashcards.map((fc, idx) => (
            <button
              key={fc.id || idx}
              onClick={() => {
                setIsFlipped(false);
                setCurrentIndex(idx);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'bg-[#E11D48] scale-125'
                  : masteredCards[fc.id]
                  ? 'bg-emerald-400'
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
              title={`البطاقة ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
        >
          <span>البطاقة التالية</span>
          <HiChevronLeft className="w-4 h-4 text-white" />
        </button>
      </div>

    </div>
  );
}
