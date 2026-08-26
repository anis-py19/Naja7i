import React, { useState, useEffect } from 'react';
import { HiArrowUp, HiCalculator, HiSearch } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingQuickActions({ onOpenCalculator, onOpenSearch }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-3.5 left-3.5 sm:bottom-5 sm:left-5 z-40 flex flex-col gap-2">
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            title="العودة للأعلى"
            className="w-10 h-10 rounded-xl bg-white border border-[#CBD5E1] text-[#0F172A] hover:text-[#E11D48] hover:border-[#E11D48] shadow-md flex items-center justify-center transition-all cursor-pointer"
          >
            <HiArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <button
        onClick={onOpenCalculator}
        title="حاسبة المعدل"
        className="w-10 h-10 rounded-xl bg-[#E11D48] text-white shadow-md hover:bg-[#be123c] flex items-center justify-center transition-all cursor-pointer"
      >
        <HiCalculator className="w-5 h-5" />
      </button>

      <button
        onClick={onOpenSearch}
        title="بحث سريع (Ctrl + K)"
        className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F172A] hover:border-[#E11D48] shadow-md flex items-center justify-center transition-all cursor-pointer"
      >
        <HiSearch className="w-5 h-5" />
      </button>
    </div>
  );
}
