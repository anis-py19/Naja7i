import React, { useState } from 'react';
import { 
  HiMail, 
  HiRefresh, 
  HiSparkles, 
  HiCheckCircle,
  HiClock
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
    <div className="min-h-screen bg-[#FFFAF3] text-[#1c1917] flex flex-col justify-between font-['Cairo'] antialiased">
      
      {/* Top Header */}
      <header className="border-b border-[#FFE5BF] bg-[#FFF2DB]/60 py-4">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F62440] text-white flex items-center justify-center font-bold text-base shadow-2xs">
              🎓
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-[#1c1917]">
                نجاحي <span className="text-[#F62440] text-xs">Naja7i</span>
              </span>
              <span className="text-[10px] text-[#78716c]">فضاء البكالوريا لجميع الشعب</span>
            </div>
          </div>

          <span className="px-2.5 py-0.5 rounded-full bg-[#FFF2DB] text-[#F62440] font-bold text-[11px] border border-[#FFE5BF]">
            تحديث دوري 🇩🇿
          </span>
        </div>
      </header>

      {/* Center Hero Card */}
      <main className="max-w-2xl mx-auto px-4 py-12 flex-1 flex flex-col justify-center items-center text-center">
        
        {/* Animated-free clean badge */}
        <div className="w-20 h-20 rounded-2xl bg-[#FFF2DB] border-2 border-[#FFE5BF] flex items-center justify-center text-3xl text-[#F62440] shadow-xs mb-6">
          🛠️
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF2DB] border border-[#FFE5BF] text-xs font-bold text-[#F62440] mb-3">
          <HiClock className="w-3.5 h-3.5" />
          <span>{SITE_CONFIG.estimatedReturn}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-[#1c1917] mb-3 leading-snug">
          {SITE_CONFIG.maintenanceTitle}
        </h1>

        <p className="text-xs sm:text-sm text-[#57534e] max-w-lg mx-auto leading-relaxed mb-6">
          {SITE_CONFIG.maintenanceNotice}
        </p>

        {/* Motivational Card for BAC Students */}
        <div className="w-full bg-white border border-[#FFE5BF] rounded-2xl p-5 mb-8 text-right space-y-2 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1c1917] border-b border-[#FFE5BF] pb-2">
            <span className="text-base">📖</span>
            <span>نصيحة أثناء التحديث:</span>
          </div>
          <p className="text-xs text-[#57534e] leading-relaxed">
            استغل هذا الوقت في مراجعة كراسك، حل تمرين بالورقة والقلم، أو حفظ 3 شخصيات وتواريخ في التاريخ والجغرافيا. الوقت الذي تقضيه في المراجعة هو استثمارك الحقيقي نحو نيل شهادة البكالوريا بمعدل ممتاز!
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md justify-center">
          
          <button
            onClick={handleReload}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#F62440] hover:bg-[#d81b34] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
          >
            <HiRefresh className="w-4 h-4" />
            <span>تحديث الصفحة للتحقق</span>
          </button>

          <a
            href={`mailto:${SITE_CONFIG.adminEmail}`}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-[#FFE5BF] text-[#1c1917] font-bold text-xs border border-[#FFE5BF] flex items-center justify-center gap-2 transition-colors"
          >
            <HiMail className="w-4 h-4 text-[#F62440]" />
            <span>تواصل مع الإدارة</span>
          </a>

        </div>

        {/* Copy email option */}
        <div className="mt-4">
          <button
            onClick={handleCopyEmail}
            className="text-[11px] text-[#78716c] hover:text-[#1c1917] underline transition-colors cursor-pointer"
          >
            {copied ? '✅ تم نسخ البريد بنجاح!' : `نسخ بريد الإدارة: ${SITE_CONFIG.adminEmail}`}
          </button>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#FFE5BF] bg-[#FFF2DB]/40 py-4 text-center text-xs text-[#78716c]">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>منصة نجاحي — صدقة جارية لكل طالب وأستاذ جزائري 🇩🇿</span>
          
          {/* Secret Admin Bypass Link */}
          {onBypass && (
            <button
              onClick={onBypass}
              className="text-[10px] text-[#a8a29e] hover:text-[#F62440] transition-colors cursor-pointer"
              title="معاينة الموقع كمسؤول"
            >
              [دخول الإدارة للمعاينة]
            </button>
          )}
        </div>
      </footer>

    </div>
  );
}
