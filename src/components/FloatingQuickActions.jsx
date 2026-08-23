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
    <div className="fixed bottom-5 left-5 z-40 flex flex-col gap-2">
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            title="العودة للأعلى"
            className="w-10 h-10 rounded-xl bg-white border border-[#FFE5BF] text-[#1c1917] hover:text-[#F62440] hover:border-[#F62440] shadow-md flex items-center justify-center transition-all cursor-pointer"
          >
            <HiArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <button
        onClick={onOpenCalculator}
        title="حاسبة المعدل"
        className="w-10 h-10 rounded-xl bg-[#F62440] text-white shadow-md hover:bg-[#d81b34] flex items-center justify-center transition-all cursor-pointer"
      >
        <HiCalculator className="w-5 h-5" />
      </button>

      <button
        onClick={onOpenSearch}
        title="بحث سريع (Ctrl + K)"
        className="w-10 h-10 rounded-xl bg-[#FFF2DB] border border-[#FFE5BF] text-[#1c1917] hover:border-[#F62440] shadow-md flex items-center justify-center transition-all cursor-pointer"
      >
        <HiSearch className="w-5 h-5" />
      </button>
    </div>
  );
}
