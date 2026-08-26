import React from 'react';
import { useVisitorCount } from '../hooks/useVisitorCount';

export default function VisitorCounterBadge({ variant = 'hero' }) {
  const { count, loading } = useVisitorCount();

  const displayCount = loading || count === null ? '1' : count.toLocaleString('ar-DZ');

  if (variant === 'compact') {
    return (
      <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] text-[11px] font-bold text-[#0F172A]">
        <span>{displayCount} زيارة</span>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#64748B] shadow-2xs">
        <span>الزيارات المباشرة:</span>
        <strong className="text-[#0F172A] font-black">{displayCount}</strong>
      </div>
    );
  }

  // Hero / Default: Clean, solid pill without any dot
  return (
    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#64748B] shadow-2xs">
      <span>إجمالي الزيارات الحقيقية للمنصة:</span>
      <span className="px-2 py-0.5 rounded-md bg-white text-[#0F172A] font-black border border-[#E2E8F0] shadow-2xs">
        {displayCount} طالب
      </span>
      <span className="text-[10px] text-[#94A3B8] hidden sm:inline font-normal">
        • سحابي مباشر 🇩🇿
      </span>
    </div>
  );
}
