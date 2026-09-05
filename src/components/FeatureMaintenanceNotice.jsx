import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiHome, 
  HiRefresh, 
  HiClock, 
  HiMail, 
  HiShieldCheck, 
  HiChevronLeft,
  HiBookOpen,
  HiSparkles
} from 'react-icons/hi';
import { SITE_CONFIG } from '../config/siteConfig';

export default function FeatureMaintenanceNotice({ feature, onBypass }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.adminEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReload = () => {
    window.location.reload();
  };

  const alternativeLinks = [
    { title: 'أرشيف البكالوريا الرسمي', path: '/bac-archive', icon: '🏛️' },
    { title: 'مكتبة الملخصات والسلاسل', path: '/library', icon: '📚' },
    { title: 'غرفة التركيز وبومودورو', path: '/focus-room', icon: '🎧' },
    { title: 'حاسبة معدل البكالوريا', path: '/calculator', icon: '🧮' }
  ].filter(l => l.path !== feature?.path);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-['Cairo'] pb-20 flex flex-col justify-between antialiased">
      
      {/* Top Banner */}
      <div className="bg-white border-b border-[#E2E8F0] py-6 sm:py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-xs text-[#64748B] mb-3">
            <Link to="/" className="hover:text-[#E11D48] flex items-center gap-1 transition-colors">
              <HiHome className="w-4 h-4" />
              <span>الرئيسية</span>
            </Link>
            <span>/</span>
            <span className="text-[#0F172A] font-bold">{feature?.name || 'القسم'}</span>
            <span>/</span>
            <span className="text-[#E11D48] font-bold">وضع الصيانة</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-rose-50 border border-rose-200/60 text-xs font-medium text-[#E11D48] mb-3 shadow-2xs">
            <HiClock className="w-3.5 h-3.5" />
            <span>{feature?.estimatedReturn || 'سنعود قريباً ⏱️'}</span>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-white border border-[#E2E8F0] flex items-center justify-center text-3xl shadow-sm mx-auto mb-4">
            {feature?.icon || '🛠️'}
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] mb-2">
            قسم «{feature?.name || 'هذه الميزة'}» قيد الصيانة والتحديث 🛠️
          </h1>

          <p className="text-xs sm:text-sm text-[#475569] max-w-xl mx-auto leading-relaxed">
            {feature?.notice || 'نقوم حالياً بتحديث هذا القسم ورفع تحسينات ومحتوى جديد لتقديم أفضل تجربة دراسية ممكنة.'}
          </p>

        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex-1 w-full space-y-6">
        
        {/* Advice Card */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-2 text-right">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-2">
            <span className="text-base">💡</span>
            <span>بينما نقوم بالتحديث، يمكنك تصفح الأقسام النشطة الأخرى:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {alternativeLinks.slice(0, 4).map((alt, idx) => (
              <Link
                key={idx}
                to={alt.path}
                className="p-3.5 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] hover:border-[#E11D48] transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{alt.icon}</span>
                  <span className="text-xs font-bold text-[#0F172A] group-hover:text-[#E11D48]">
                    {alt.title}
                  </span>
                </div>
                <HiChevronLeft className="w-4 h-4 text-[#94A3B8] group-hover:text-[#E11D48] transition-transform group-hover:-translate-x-1" />
              </Link>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs"
          >
            <HiHome className="w-4 h-4" />
            <span>العودة للرئيسية</span>
          </Link>

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
        <div className="text-center pt-2">
          <button
            onClick={handleCopyEmail}
            className="text-[11px] text-[#64748B] hover:text-[#0F172A] underline transition-colors cursor-pointer"
          >
            {copied ? '✅ تم نسخ البريد بنجاح!' : `نسخ بريد الإدارة: ${SITE_CONFIG.adminEmail}`}
          </button>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#E2E8F0] bg-white py-4 text-center text-xs text-[#64748B] mt-12">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>منصة نجاحي — صدقة جارية لكل طالب وأستاذ جزائري 🇩🇿</span>
          
          {/* Admin Bypass Link */}
          {onBypass && (
            <button
              onClick={onBypass}
              className="text-[11px] text-[#94A3B8] hover:text-[#E11D48] transition-colors cursor-pointer flex items-center gap-1 font-bold"
              title="معاينة الميزة كمسؤول"
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
