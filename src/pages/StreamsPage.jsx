import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HiHome, 
  HiChevronLeft
} from 'react-icons/hi';
import StreamHub from '../components/StreamHub';

export default function StreamsPage({ selectedStreamId, onSelectStream, onOpenSubject, onOpenPdf }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pb-16 font-['Cairo']">
      
      {/* Top Banner & Breadcrumb */}
      <div className="bg-white border-b border-[#E2E8F0] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#64748B] mb-3">
            <Link to="/" className="hover:text-[#E11D48] flex items-center gap-1 transition-colors">
              <HiHome className="w-4 h-4" />
              <span>الرئيسية</span>
            </Link>
            <span>/</span>
            <span className="text-[#0F172A] font-bold">الشعب والمواد الدراسية</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-[#F1F5F9] text-[#E11D48] font-bold text-xs border border-[#E2E8F0]">
                  البرنامج الوزاري 🇩🇿
                </span>
                <span className="text-xs text-[#64748B]">جميع الشعب مع المعاملات والوحدات التعليمية</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
                فضاء الشعب والمواد التعليمية
              </h1>
              <p className="text-xs text-[#475569] mt-1 max-w-xl">
                تصفح مقررات ومواد شعبتك بالتفصيل، وتابع نسبة إنجازك للوحدات الدراسية وافتح الدروس والملخصات المقررة.
              </p>
            </div>

            <Link
              to="/"
              className="self-start md:self-auto px-4 py-2 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0F172A] text-xs font-bold border border-[#CBD5E1] transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <span>العودة للرئيسية</span>
              <HiChevronLeft className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>

      {/* Stream Hub Interactive Explorer */}
      <StreamHub 
        selectedStreamId={selectedStreamId}
        onSelectStream={onSelectStream}
        onOpenSubject={onOpenSubject}
      />

    </div>
  );
}
