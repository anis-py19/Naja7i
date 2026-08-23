import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiHome, 
  HiChevronLeft, 
  HiAcademicCap, 
  HiBookOpen,
  HiSearch
} from 'react-icons/hi';
import StreamHub from '../components/StreamHub';
import SubjectViewer from '../components/SubjectViewer';
import PdfReaderModal from '../components/PdfReaderModal';

export default function StreamsPage({ onOpenSubject, onOpenPdf }) {
  const [selectedStreamId, setSelectedStreamId] = useState('sciences');

  return (
    <div className="min-h-screen bg-[#FFFAF3] text-[#1c1917] pb-16 font-['Cairo']">
      
      {/* Top Banner & Breadcrumb */}
      <div className="bg-[#FFF2DB] border-b border-[#FFE5BF] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#78716c] mb-3">
            <Link to="/" className="hover:text-[#F62440] flex items-center gap-1 transition-colors">
              <HiHome className="w-4 h-4" />
              <span>الرئيسية</span>
            </Link>
            <span>/</span>
            <span className="text-[#1c1917] font-bold">الشعب والمواد الدراسية</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-md bg-[#F62440] text-white font-bold text-xs shadow-2xs">
                  البرنامج الوزاري المعتمد 🇩🇿
                </span>
                <span className="text-xs text-[#78716c]">جميع الشعب الستة مع المعاملات والوحدات التعليمية</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#1c1917]">
                فضاء الشعب والمواد التعليمية 🏛️
              </h1>
              <p className="text-xs text-[#57534e] mt-1 max-w-xl">
                تصفح مقررات ومواد شعبتك بالتفصيل، وتابع نسبة إنجازك للوحدات الدراسية وافتح الدروس والملخصات المقررة.
              </p>
            </div>

            <Link
              to="/"
              className="self-start md:self-auto px-4 py-2 rounded-xl bg-white hover:bg-[#FFE5BF] text-[#1c1917] text-xs font-bold border border-[#FFE5BF] transition-colors flex items-center gap-1.5 shadow-2xs"
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
        onSelectStream={(sId) => setSelectedStreamId(sId)}
        onOpenSubject={onOpenSubject}
      />

    </div>
  );
}
