import React from 'react';
import { HiSparkles, HiShieldCheck, HiOutlineRefresh } from 'react-icons/hi';

export default function MaintenanceOverlay({ config }) {
  return (
    <div className="fixed inset-0 z-[99999] bg-[#0F172A] text-white flex items-center justify-center p-4 overflow-y-auto font-['Cairo']" dir="rtl">
      
      {/* Background Subtle Gradient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#E11D48]/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl"></div>
      </div>

      <div className="relative max-w-lg w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 text-center shadow-2xl backdrop-blur-xl space-y-6">
        
        {/* Animated Badge & Icon */}
        <div className="relative inline-block mx-auto">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-500 to-[#E11D48] flex items-center justify-center text-4xl shadow-lg shadow-rose-500/30 mx-auto animate-bounce">
            🚧
          </div>
          <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] shadow-sm">
            صيانة دورية
          </div>
        </div>

        {/* Title & Founder Subtitle */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-rose-400">
            <HiSparkles className="w-4 h-4" />
            <span>منصة نجاحي (Naja7i.com) 🇩🇿</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white leading-snug">
            الموقع في وضع الصيانة والتحديث
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
            {config?.maintenanceMessage || 'نقوم حالياً بتحديث خوادم المنصة وإضافة ميزات جديدة لتقديم أفضل تجربة لطلبة البكالوريا.'}
          </p>
        </div>

        {/* Info Pill */}
        <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-200 flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span><b>المدة المقدرة:</b> {config?.expectedReturn || 'العودة خلال دقائق قليلة'}</span>
        </div>

        {/* Action / Refresh */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#E11D48] hover:bg-[#be123c] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <HiOutlineRefresh className="w-4 h-4" />
            <span>إعادة المحاولة الآن</span>
          </button>
        </div>

        {/* Footer Credit */}
        <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between flex-wrap gap-2">
          <span>إشراف وتطوير: <b>أنيس ازري (Anis Izri)</b></span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <HiShieldCheck className="w-3.5 h-3.5" />
            <span>بياناتك محفوظة بأمان ✓</span>
          </span>
        </div>

      </div>

    </div>
  );
}
