import React, { useState, useEffect } from 'react';
import { 
  HiMail, 
  HiRefresh, 
  HiClock,
  HiShieldCheck,
  HiCog
} from 'react-icons/hi';
import { getMaintenanceDetails } from '../config/siteConfig';
import AdminMaintenanceModal from '../components/AdminMaintenanceModal';

export default function MaintenancePage({ onBypass }) {
  const [details, setDetails] = useState(getMaintenanceDetails());
  const [copied, setCopied] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setDetails(getMaintenanceDetails());
    };
    window.addEventListener('naja7i_maintenance_change', handleUpdate);
    return () => window.removeEventListener('naja7i_maintenance_change', handleUpdate);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(details.adminEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col justify-between font-['Cairo'] antialiased" dir="rtl">
      
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

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1 transition-colors cursor-pointer"
              title="لوحة تحكم المسؤول"
            >
              <HiCog className="w-3.5 h-3.5 text-rose-400" />
              <span>لوحة الإدارة</span>
            </button>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-rose-400 font-bold text-xs border border-slate-700 hidden sm:inline">
              تحديث دوري 🇩🇿
            </span>
          </div>
        </div>
      </header>

      {/* Center Hero Card */}
      <main className="max-w-2xl mx-auto px-4 py-12 flex-1 flex flex-col justify-center items-center text-center">
        
        <div className="w-20 h-20 rounded-2xl bg-white border border-[#E2E8F0] flex items-center justify-center text-3xl shadow-sm mb-6">
          🛠️
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-bold text-[#E11D48] mb-3 shadow-2xs">
          <HiClock className="w-3.5 h-3.5" />
          <span>{details.estimatedReturn}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] mb-3 leading-snug">
          {details.title}
        </h1>

        <p className="text-xs sm:text-sm text-[#475569] max-w-lg mx-auto leading-relaxed mb-6">
          {details.notice}
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
            href={`mailto:${details.adminEmail}`}
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
            {copied ? '✅ تم نسخ البريد بنجاح!' : `نسخ بريد الإدارة: ${details.adminEmail}`}
          </button>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#E2E8F0] bg-white py-4 text-center text-xs text-[#64748B]">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>منصة نجاحي — صدقة جارية لكل طالب وأستاذ جزائري 🇩🇿</span>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="text-[11px] text-slate-600 hover:text-[#E11D48] transition-colors cursor-pointer flex items-center gap-1 font-bold"
            >
              <HiCog className="w-3.5 h-3.5" />
              <span>[لوحة تحكم الصيانة ON/OFF]</span>
            </button>

            {onBypass && (
              <button
                onClick={onBypass}
                className="text-[11px] text-[#94A3B8] hover:text-[#E11D48] transition-colors cursor-pointer flex items-center gap-1 font-bold"
                title="معاينة الموقع كمسؤول"
              >
                <HiShieldCheck className="w-3.5 h-3.5" />
                <span>[معاينة الموقع]</span>
              </button>
            )}
          </div>
        </div>
      </footer>

      {/* Admin Control Modal */}
      <AdminMaintenanceModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onStateChange={(isNowActive) => {
          if (!isNowActive && onBypass) {
            onBypass();
          }
        }}
      />

    </div>
  );
}
