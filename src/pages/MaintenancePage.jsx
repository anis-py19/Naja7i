import React, { useState } from 'react';
import { 
  HiMail, 
  HiRefresh, 
  HiClock,
  HiShieldCheck
} from 'react-icons/hi';
import { SITE_CONFIG } from '../config/siteConfig';

export default function MaintenancePage({ onBypass }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.adminEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col justify-between font-['Cairo'] antialiased">
      
      {/* Top Header */}
      <header className="bg-[#0F172A] border-b border-slate-800 text-white py-3 shadow-md">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white p-0.5 shadow-md flex items-center justify-center border border-white/20">
              <img 
                src="/logo.jpg" 
                alt="نجاحي Naja7i" 
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-black text-sm text-white">
                  نجاحي
                </span>
                <span className="text-[#E11D48] text-xs font-bold font-mono">
                  Naja7i
                </span>
              </div>
              <span className="text-[10px] text-slate-300 leading-tight mt-0.5">
                فضاء البكالوريا لجميع الشعب
              </span>
            </div>
          </div>

          <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-rose-400 font-bold text-xs border border-slate-700">
            تحديث دوري 🇩🇿
          </span>
        </div>
      </header>

      {/* Center Hero Card */}
      <main className="max-w-2xl mx-auto px-4 py-12 flex-1 flex flex-col justify-center items-center text-center">
        
        <div className="w-20 h-20 rounded-2xl bg-white border border-[#E2E8F0] flex items-center justify-center text-3xl shadow-sm mb-6">
          🛠️
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-bold text-[#E11D48] mb-3 shadow-2xs">
          <HiClock className="w-3.5 h-3.5" />
          <span>{SITE_CONFIG.estimatedReturn}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] mb-3 leading-snug">
          {SITE_CONFIG.maintenanceTitle}
        </h1>

        <p className="text-xs sm:text-sm text-[#475569] max-w-lg mx-auto leading-relaxed mb-6">
          {SITE_CONFIG.maintenanceNotice}
        </p>

        {/* Motivational Card for BAC Students */}
        <div className="w-full bg-white border border-[#E2E8F0] rounded-2xl p-5 mb-8 text-right space-y-2 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-2">
            <span className="text-base">📖</span>
            <span>نصيحة أثناء التحديث:</span>
          </div>
          <p className="text-xs text-[#475569] leading-relaxed">
            استغل هذا الوقت في مراجعة كراسك، حل تمرين بالورقة والقلم، أو حفظ 3 شخصيات وتواريخ في التاريخ والجغرافيا. الوقت الذي تقضيه في المراجعة هو استثمارك الحقيقي نحو نيل شهادة البكالوريا بمعدل ممتاز!
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md justify-center">
          
          <button
            onClick={handleReload}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#E11D48] hover:bg-[#be123c] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
          >
            <HiRefresh className="w-4 h-4" />
            <span>تحديث الصفحة للتحقق</span>
          </button>

          <a
            href={`mailto:${SITE_CONFIG.adminEmail}`}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0F172A] font-bold text-xs border border-[#CBD5E1] flex items-center justify-center gap-2 transition-colors"
          >
            <HiMail className="w-4 h-4 text-[#E11D48]" />
            <span>تواصل مع الإدارة</span>
          </a>

        </div>

        {/* Copy email option */}
        <div className="mt-4">
          <button
            onClick={handleCopyEmail}
            className="text-[11px] text-[#64748B] hover:text-[#0F172A] underline transition-colors cursor-pointer"
          >
            {copied ? '✅ تم نسخ البريد بنجاح!' : `نسخ بريد الإدارة: ${SITE_CONFIG.adminEmail}`}
          </button>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#E2E8F0] bg-white py-4 text-center text-xs text-[#64748B]">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>منصة نجاحي — صدقة جارية لكل طالب وأستاذ جزائري 🇩🇿</span>
          
          {/* Secret Admin Bypass Link */}
          {onBypass && (
            <button
              onClick={onBypass}
              className="text-[11px] text-[#94A3B8] hover:text-[#E11D48] transition-colors cursor-pointer flex items-center gap-1 font-bold"
              title="معاينة الموقع كمسؤول"
            >
              <HiShieldCheck className="w-3.5 h-3.5" />
              <span>[دخول الإدارة للمعاينة]</span>
            </button>
          )}
        </div>
      </footer>

    </div>
  );
}
