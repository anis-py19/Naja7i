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
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[#F8FAFC] font-['Cairo']">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-xl w-full bg-white border border-[#E2E8F0] rounded-3xl p-8 sm:p-12 text-center shadow-lg shadow-black/5 space-y-6"
      >
        
        {/* Badge & Code */}
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#E11D48] flex items-center justify-center text-4xl shadow-2xs mx-auto mb-2">
            🧭
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-[#E11D48] text-white font-mono font-black text-xs shadow-2xs">
            خطأ 404
          </span>
        </div>

        {/* Headlines */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
            عذراً.. يبدو أنك تهت في طريق المراجعة! 🎓
          </h1>
          <p className="text-xs sm:text-sm text-[#475569] max-w-md mx-auto leading-relaxed">
            الصفحة أو المستند الذي تحاول الوصول إليه غير موجود أو تم نقله، لكن طريق النجاح والتفوق في البكالوريا ما زال مفتوحاً أمامك.
          </p>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-right">
          <Link
            to="/"
            className="p-3.5 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] hover:border-[#E11D48] transition-colors group flex items-center justify-between shadow-2xs"
          >
            <div className="flex items-center gap-2.5">
              <HiHome className="w-5 h-5 text-[#E11D48]" />
              <div>
                <span className="text-xs font-bold text-[#0F172A] block group-hover:text-[#E11D48]">
                  الصفحة الرئيسية
                </span>
                <span className="text-[11px] text-[#64748B]">
                  فضاء الشعب والمواد
                </span>
              </div>
            </div>
            <HiArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-[#E11D48] rotate-180 transition-transform" />
          </Link>

          <Link
            to="/library"
            className="p-3.5 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] hover:border-[#E11D48] transition-colors group flex items-center justify-between shadow-2xs"
          >
            <div className="flex items-center gap-2.5">
              <HiBookOpen className="w-5 h-5 text-[#E11D48]" />
              <div>
                <span className="text-xs font-bold text-[#0F172A] block group-hover:text-[#E11D48]">
                  مكتبة الملخصات
                </span>
                <span className="text-[11px] text-[#64748B]">
                  سلاسل وتمارين PDF
                </span>
              </div>
            </div>
            <HiArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-[#E11D48] rotate-180 transition-transform" />
          </Link>
        </div>

        {/* Primary Return Button */}
        <div className="pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#E11D48] hover:bg-[#be123c] text-white font-bold text-xs shadow-2xs transition-colors"
          >
            <HiHome className="w-4 h-4" />
            <span>العودة إلى الصفحة الرئيسية</span>
          </Link>
        </div>

        {/* Motivational Quote Footer */}
        <div className="pt-4 border-t border-[#E2E8F0] text-[11px] text-[#64748B]">
          <span>«لا تيأس، فكل محاولة هي خطوة إضافية نحو نيل البكالوريا بمعدل الامتياز 🇩🇿»</span>
        </div>

      </motion.div>
    </div>
  );
}
