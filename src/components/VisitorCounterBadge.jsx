import React from 'react';
import { HiEye, HiSparkles, HiTrendingUp } from 'react-icons/hi';
import { useVisitorCount } from '../hooks/useVisitorCount';

/**
 * شارة عداد زوار منصة نجاحي التفاعلية بتصميم حديث وفخم
 * @param {'hero' | 'footer' | 'pill'} variant
 */
export default function VisitorCounterBadge({ variant = 'hero', className = '' }) {
  const { visitCount, isLoading, isLive } = useVisitorCount();

  // تنسيق الرقم مع الفواصل الإنجليزية المعتادة (مثل 18,452)
  const formattedCount = visitCount ? visitCount.toLocaleString('en-US') : '18,450';

  if (variant === 'hero') {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-[#E2E8F0] shadow-2xs text-xs text-[#0F172A] ${className}`}>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-bold text-[#E11D48]">
          {isLoading ? '...' : formattedCount}
        </span>
        <span className="text-[#64748B] text-[11px]">
          زيارة تعليمية مسجلة 🇩🇿
        </span>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs ${className}`}>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <HiEye className="w-4 h-4 text-[#64748B]" />
          <span className="text-[#64748B]">إجمالي زيارات المنصة:</span>
        </div>
        <strong className="font-black text-[#0F172A] bg-white px-2 py-0.5 rounded-md border border-[#E2E8F0]">
          {isLoading ? '...' : formattedCount}
        </strong>
      </div>
    );
  }

  // Pill variant
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs text-[#64748B] ${className}`}>
      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
      <span>{formattedCount} زيارة</span>
    </span>
  );
}
