import React, { useRef, useState } from 'react';
import { 
  HiDownload, 
  HiZoomIn, 
  HiZoomOut, 
  HiRefresh, 
  HiSparkles,
  HiEye,
  HiCheckCircle
} from 'react-icons/hi';

// Color themes matching academic mindmaps (Red, Cyan/Blue, Green, Pink, Purple, Amber)
const BRANCH_COLORS = [
  {
    name: 'rose',
    headerBg: 'bg-rose-100 text-rose-950 border-rose-400',
    headerBorder: '#f43f5e',
    nodeBg: 'bg-rose-50 text-rose-900 border-rose-300',
    lineColor: '#f43f5e'
  },
  {
    name: 'cyan',
    headerBg: 'bg-sky-100 text-sky-950 border-sky-400',
    headerBorder: '#0ea5e9',
    nodeBg: 'bg-sky-50 text-sky-900 border-sky-300',
    lineColor: '#0ea5e9'
  },
  {
    name: 'emerald',
    headerBg: 'bg-emerald-100 text-emerald-950 border-emerald-400',
    headerBorder: '#10b981',
    nodeBg: 'bg-emerald-50 text-emerald-900 border-emerald-300',
    lineColor: '#10b981'
  },
  {
    name: 'purple',
    headerBg: 'bg-purple-100 text-purple-950 border-purple-400',
    headerBorder: '#a855f7',
    nodeBg: 'bg-purple-50 text-purple-900 border-purple-300',
    lineColor: '#a855f7'
  },
  {
    name: 'amber',
    headerBg: 'bg-amber-100 text-amber-950 border-amber-400',
    headerBorder: '#f59e0b',
    nodeBg: 'bg-amber-50 text-amber-900 border-amber-300',
    lineColor: '#f59e0b'
  },
  {
    name: 'indigo',
    headerBg: 'bg-indigo-100 text-indigo-950 border-indigo-400',
    headerBorder: '#6366f1',
    nodeBg: 'bg-indigo-50 text-indigo-900 border-indigo-300',
    lineColor: '#6366f1'
  }
];

export default function VisualMindmapViewer({ mindmapData, title }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  if (!mindmapData || !mindmapData.branches || mindmapData.branches.length === 0) {
    return null;
  }

  const handleDownloadPng = () => {
    // Printable / Export view
    window.print();
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-6 shadow-sm space-y-6">
      
      {/* Top Toolbar */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3 flex-wrap gap-2 print:hidden">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#E11D48] border border-rose-200 flex items-center justify-center text-sm font-bold shadow-2xs">
            🗺️
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-[#0F172A] flex items-center gap-1.5">
              <span>المخطط الذهني البصري التفاعلي</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-50 text-[#E11D48] font-bold border border-rose-200">
                تصميم ملون
              </span>
            </h3>
            <span className="text-[11px] text-[#64748B]">
              تسلسل هرمي بصري لتسهيل وتثبيت الحفظ ليلة الامتحان
            </span>
          </div>
        </div>

        {/* Zoom & Export Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setScale(prev => Math.min(prev + 0.1, 1.4))}
            className="p-1.5 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F172A] border border-[#CBD5E1] transition-colors cursor-pointer text-xs flex items-center gap-1"
            title="تكبير"
          >
            <HiZoomIn className="w-3.5 h-3.5 text-[#E11D48]" />
          </button>

          <button
            onClick={() => setScale(prev => Math.max(prev - 0.1, 0.7))}
            className="p-1.5 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F172A] border border-[#CBD5E1] transition-colors cursor-pointer text-xs flex items-center gap-1"
            title="تصغير"
          >
            <HiZoomOut className="w-3.5 h-3.5 text-[#E11D48]" />
          </button>

          <button
            onClick={() => setScale(1)}
            className="p-1.5 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1] transition-colors cursor-pointer text-xs"
            title="إعادة الحجم"
          >
            <HiRefresh className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleDownloadPng}
            className="px-3 py-1.5 rounded-lg bg-[#E11D48] hover:bg-[#be123c] text-white text-xs font-bold transition-colors flex items-center gap-1 shadow-2xs cursor-pointer mr-1"
            title="طباعة أو تصدير المخطط"
          >
            <HiDownload className="w-3.5 h-3.5" />
            <span>طباعة / حفظ A4</span>
          </button>
        </div>
      </div>

      {/* Mindmap Interactive Canvas Area */}
      <div 
        ref={containerRef}
        className="overflow-x-auto p-4 sm:p-8 bg-[#FAFAFA] rounded-2xl border border-slate-200/80 shadow-inner flex flex-col items-center justify-center min-h-[420px]"
      >
        <div 
          style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
          className="transition-transform duration-200 flex flex-col items-center w-full max-w-5xl space-y-10"
        >
          
          {/* 1. ROOT NODE (العقدة المركزية الرئيسية) */}
          <div className="relative group flex flex-col items-center">
            <div className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-[#E11D48] to-rose-600 text-white font-black text-sm sm:text-base shadow-xl border-2 border-white ring-4 ring-rose-200 text-center tracking-wide min-w-[220px] transition-transform group-hover:scale-105">
              {mindmapData.title || title || 'عنوان الدرس والمحور الأساسي'}
            </div>
            
            {/* Downward Connector Stem */}
            <div className="w-0.5 h-6 bg-gradient-to-b from-rose-500 to-slate-300"></div>
          </div>

          {/* Horizontal Connecting Bar (Desktop) */}
          <div className="hidden lg:block w-3/4 h-0.5 bg-slate-300 -mt-6 rounded-full"></div>

          {/* 2. MAIN BRANCHES (الأغصان والمحاور الفرعية) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full items-start justify-center">
            {mindmapData.branches.map((branch, bIdx) => {
              const colorTheme = BRANCH_COLORS[bIdx % BRANCH_COLORS.length];

              return (
                <div 
                  key={bIdx} 
                  className="flex flex-col items-center space-y-3 relative w-full"
                >
                  {/* Branch Main Header Capsule */}
                  <div className={`px-5 py-2.5 rounded-full font-bold text-xs text-center border-2 shadow-sm w-full max-w-[240px] transition-transform hover:scale-102 ${colorTheme.headerBg}`}>
                    {branch.title}
                  </div>

                  {/* Connecting Line Downward */}
                  <div 
                    className="w-0.5 h-4" 
                    style={{ backgroundColor: colorTheme.lineColor }}
                  ></div>

                  {/* Branch Child Leaves / Sub-Nodes */}
                  <div className="flex flex-col space-y-2.5 w-full">
                    {branch.nodes.map((subNode, sIdx) => (
                      <div
                        key={sIdx}
                        className={`p-3 rounded-2xl border text-xs leading-relaxed text-center font-medium shadow-xs transition-all hover:shadow-md hover:scale-101 ${colorTheme.nodeBg}`}
                      >
                        {subNode}
                      </div>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Helper Legend */}
      <div className="text-[11px] text-[#64748B] flex items-center justify-between border-t border-[#E2E8F0] pt-3 flex-wrap gap-2">
        <span className="flex items-center gap-1.5">
          <HiSparkles className="w-3.5 h-3.5 text-[#E11D48]" />
          <span>مخطط ذهني بصري مولد بالذكاء الاصطناعي وفق المعايير البيداغوجية الرسمية 🇩🇿</span>
        </span>
        <span className="font-mono text-[#0F172A] font-bold">
          {mindmapData.branches.length} محاور رئيسية
        </span>
      </div>

    </div>
  );
}
