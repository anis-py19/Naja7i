import React from 'react';
import { useVisitorCount } from '../hooks/useVisitorCount';
import { HiUserGroup, HiChartBar } from 'react-icons/hi';

export default function VisitorCounterBadge({ variant = 'banner' }) {
  const { count, loading } = useVisitorCount();

  const displayCount = loading || count === null ? '...' : count.toLocaleString('ar-DZ');

  if (variant === 'compact') {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs border border-white/10 backdrop-blur-xs">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[11px] font-bold">
          {displayCount} زيارة حقيقية
        </span>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0F172A] shadow-2xs">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-[#64748B] text-[11px]">إجمالي الزيارات الحقيقية:</span>
          <strong className="text-[#0F172A] font-black text-xs font-mono">{displayCount}</strong>
          <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded font-bold border border-emerald-200">
            مباشر ⚡
          </span>
        </div>
      </div>
    );
  }

  // Default: Banner / Hero card
  return (
    <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs text-xs text-[#0F172A]">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
      </span>
      
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[#64748B] text-[11px]">الزيارات الحقيقية للمنصة:</span>
        <span className="px-2 py-0.5 rounded-lg bg-rose-50 text-[#E11D48] font-black text-xs border border-rose-100">
          {displayCount} طالب وزائر
        </span>
        <span className="text-[10px] text-[#94A3B8] hidden sm:inline">
          (عداد سحابي حي 100% حقيقي)
        </span>
      </div>
    </div>
  );
}
