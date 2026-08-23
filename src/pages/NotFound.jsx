import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HiHome, 
  HiBookOpen, 
  HiSearch, 
  HiAcademicCap, 
  HiArrowRight,
  HiHeart
} from 'react-icons/hi';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[#FFFAF3] font-['Cairo']">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-xl w-full bg-white border border-[#FFE5BF] rounded-3xl p-8 sm:p-12 text-center shadow-lg shadow-black/3 space-y-6"
      >
        
        {/* Animated Badge & Code */}
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-3xl bg-[#FFF2DB] border-2 border-[#FFE5BF] text-[#F62440] flex items-center justify-center text-4xl shadow-xs mx-auto mb-2">
            🧭
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-[#F62440] text-white font-mono font-black text-xs shadow-xs">
            خطأ 404
          </span>
        </div>

        {/* Headlines */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-[#1c1917]">
            عذراً.. يبدو أنك تهت في طريق المراجعة! 🎓
          </h1>
          <p className="text-xs sm:text-sm text-[#57534e] max-w-md mx-auto leading-relaxed">
            الصفحة أو المستند الذي تحاول الوصول إليه غير موجود أو تم نقله، لكن طريق النجاح والتفوق في البكالوريا ما زال مفتوحاً أمامك.
          </p>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-right">
          <Link
            to="/"
            className="p-3.5 rounded-xl bg-[#FFFAF3] hover:bg-[#FFF2DB] border border-[#FFE5BF] hover:border-[#F62440] transition-colors group flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <HiHome className="w-5 h-5 text-[#F62440]" />
              <div>
                <span className="text-xs font-bold text-[#1c1917] block group-hover:text-[#F62440]">
                  الصفحة الرئيسية
                </span>
                <span className="text-[11px] text-[#78716c]">
                  فضاء الشعب والمواد
                </span>
              </div>
            </div>
            <HiArrowRight className="w-4 h-4 text-[#78716c] group-hover:text-[#F62440] rotate-180 transition-transform" />
          </Link>

          <Link
            to="/library"
            className="p-3.5 rounded-xl bg-[#FFFAF3] hover:bg-[#FFF2DB] border border-[#FFE5BF] hover:border-[#F62440] transition-colors group flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <HiBookOpen className="w-5 h-5 text-[#F62440]" />
              <div>
                <span className="text-xs font-bold text-[#1c1917] block group-hover:text-[#F62440]">
                  مكتبة الملخصات
                </span>
                <span className="text-[11px] text-[#78716c]">
                  سلاسل وتمارين PDF
                </span>
              </div>
            </div>
            <HiArrowRight className="w-4 h-4 text-[#78716c] group-hover:text-[#F62440] rotate-180 transition-transform" />
          </Link>
        </div>

        {/* Primary Return Button */}
        <div className="pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#F62440] hover:bg-[#d81b34] text-white font-bold text-xs shadow-xs transition-colors"
          >
            <HiHome className="w-4 h-4" />
            <span>العودة إلى الصفحة الرئيسية</span>
          </Link>
        </div>

        {/* Motivational Quote Footer */}
        <div className="pt-4 border-t border-[#FFE5BF] text-[11px] text-[#78716c]">
          <span>«لا تيأس، فكل محاولة فاشلة هي خطوة إضافية نحو نيل البكالوريا بمعدل الامتياز 🇩🇿»</span>
        </div>

      </motion.div>
    </div>
  );
}
