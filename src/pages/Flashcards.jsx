import React, { useState } from 'react';
import { FLASHCARD_SETS } from '../data/bacData';
import { 
  HiSparkles, 
  HiArrowRight, 
  HiArrowLeft, 
  HiRefresh, 
  HiEye, 
  HiCheckCircle,
  HiCollection
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

export default function Flashcards() {
  const [selectedSetId, setSelectedSetId] = useState(FLASHCARD_SETS[0].id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentSet = FLASHCARD_SETS.find(s => s.id === selectedSetId) || FLASHCARD_SETS[0];
  const currentCard = currentSet.cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % currentSet.cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + currentSet.cards.length) % currentSet.cards.length);
  };

  const handleSetChange = (id) => {
    setSelectedSetId(id);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-3">
          <HiSparkles className="w-4 h-4" />
          <span>التكرار المتباعد والحفظ السريع (Active Recall)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
          بطاقات الاسترجاع الذكية (Flashcards)
        </h1>
        <p className="text-sm text-slate-400">
          احفظ التواريخ، الشخصيات، المصطلحات ومقالات الفلسفة بسهولة عبر البطاقات التفاعلية
        </p>
      </div>

      {/* Set Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 justify-start sm:justify-center no-scrollbar">
        {FLASHCARD_SETS.map(set => (
          <button
            key={set.id}
            onClick={() => handleSetChange(set.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              set.id === selectedSetId
                ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <HiCollection className="w-4 h-4" />
            <span>{set.title}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950/40 text-slate-300">
              {set.cards.length}
            </span>
          </button>
        ))}
      </div>

      {/* Card Arena */}
      <div className="max-w-xl mx-auto">
        
        {/* Progress bar */}
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-3 px-2">
          <span>بطاقة {currentIndex + 1} من {currentSet.cards.length}</span>
          <span>{Math.round(((currentIndex + 1) / currentSet.cards.length) * 100)}%</span>
        </div>

        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mb-6 border border-slate-800">
          <div 
            className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / currentSet.cards.length) * 100}%` }}
          />
        </div>

        {/* Flip Card Container */}
        <div 
          onClick={() => setIsFlipped(!isFlipped)}
          className="relative min-h-[300px] sm:min-h-[340px] bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 rounded-3xl p-8 flex flex-col justify-between items-center text-center shadow-2xl cursor-pointer transition-all duration-300 hover:scale-[1.01] select-none"
        >
          <div className="w-full flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold text-slate-400">{currentSet.category}</span>
            <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded-md text-emerald-400 font-mono">
              {isFlipped ? 'الإجابة / الشرح 💡' : 'السؤال / المصطلح ❓'}
            </span>
          </div>

          <div className="my-auto py-6">
            <AnimatePresence mode="wait">
              {!isFlipped ? (
                <motion.div
                  key="front"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-xl sm:text-2xl font-black text-white leading-relaxed"
                >
                  {currentCard.q}
                </motion.div>
              ) : (
                <motion.div
                  key="back"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-base sm:text-lg font-bold text-emerald-300 leading-relaxed"
                >
                  {currentCard.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <HiEye className="w-4 h-4 text-slate-400" />
            <span>انقر على البطاقة لقلبها وعرض الإجابة</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-4 mt-6">
          <button
            onClick={handlePrev}
            className="flex-1 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <HiArrowRight className="w-4 h-4" />
            <span>البطاقة السابقة</span>
          </button>

          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <HiRefresh className="w-4 h-4" />
            <span>قلب</span>
          </button>

          <button
            onClick={handleNext}
            className="flex-1 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer transition-colors"
          >
            <span>البطاقة التالية</span>
            <HiArrowLeft className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
