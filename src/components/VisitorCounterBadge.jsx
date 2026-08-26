import React from 'react';
import { useVisitorCount } from '../hooks/useVisitorCount';

export default function VisitorCounterBadge({ variant = 'hero' }) {
  const { count, loading } = useVisitorCount();

  const displayCount = loading || count === null ? '1' : count.toLocaleString('ar-DZ');

  if (variant === 'compact') {
    return (
      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] text-[11px] font-bold text-[#0F172A]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span>{displayCount} زيارة</span>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#64748B] shadow-2xs hover:border-[#CBD5E1] transition-colors">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <div className="flex items-center gap-1.5 text-xs">
          <span>الزيارات المباشرة:</span>
          <strong className="text-[#0F172A] font-black">{displayCount}</strong>
          <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-100">
            حي ومباشر
          </span>
        </div>
      </div>
    );
  }

  // Hero / Default: Ultra-clean, integrated pill badge
  return (
    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] text-xs transition-all shadow-2xs">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      
      <div className="flex items-center gap-1.5 text-xs">
        <span className="text-[#64748B] font-medium text-[11px] sm:text-xs">
          إجمالي الزيارات الحقيقية للمنصة:
        </span>
        <span className="px-2 py-0.5 rounded-md bg-white text-[#0F172A] font-black text-xs border border-[#E2E8F0] shadow-2xs">
          {displayCount} طالب
        </span>
        <span className="text-[10px] text-[#94A3B8] hidden sm:inline font-normal">
          • سحابي مباشر 🇩🇿
        </span>
      </div>
    </div>
  );
}
