import React, { useState, useEffect } from 'react';
import { 
  HiSearch, 
  HiX, 
  HiArrowRight,
  HiExternalLink,
  HiEye,
  HiDownload
} from 'react-icons/hi';
import { motion } from 'framer-motion';
import { SUBJECT_RESOURCES, TOP_CHANNELS } from '../data/bacData';
import { searchUserFiles } from '../data/userFilesData';

export default function SearchModal({ isOpen, onClose, onOpenSubject, onOpenPdf }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();
  const results = [];

  if (trimmed.length > 1) {
    // 1. Search in 324 User PDF Files
    const userMatchedFiles = searchUserFiles(trimmed);
    userMatchedFiles.slice(0, 8).forEach(file => {
      results.push({
        type: 'ملف PDF مباشر',
        title: file.title,
        subtext: `${file.subjectName} • ${file.author} (${file.sizeReadable})`,
        icon: '📄',
        fileData: file,
        action: () => {
          if (onOpenPdf) onOpenPdf(file);
          onClose();
        }
      });
    });

    // 2. Search in Subject Resources
    Object.entries(SUBJECT_RESOURCES).forEach(([subjectKey, subject]) => {
      if (subject.title.toLowerCase().includes(trimmed) || subject.description.toLowerCase().includes(trimmed)) {
        results.push({
          type: 'مادة دراسية',
          title: subject.title,
          subtext: subject.description,
          icon: '📚',
          action: () => {
            onOpenSubject(subjectKey);
            onClose();
          }
        });
      }

      subject.units.forEach((unit) => {
        if (unit.title.toLowerCase().includes(trimmed) || unit.summary.toLowerCase().includes(trimmed)) {
          results.push({
            type: 'محور / وحدة',
            title: `${subject.title}: ${unit.title}`,
            subtext: unit.summary,
            icon: '📑',
            action: () => {
              onOpenSubject(subjectKey);
              onClose();
            }
          });
        }
      });
    });

    // 3. Search in Top Channels
    TOP_CHANNELS.forEach((ch) => {
      if (ch.name.toLowerCase().includes(trimmed) || ch.subject.toLowerCase().includes(trimmed)) {
        results.push({
          type: 'أستاذ يوتيوب',
          title: ch.name,
          subtext: `أستاذ مادة ${ch.subject} (${ch.subscribers})`,
          icon: '🎓',
          link: ch.youtubeQuery
        });
      }
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 bg-black/50 backdrop-blur-xs font-['Cairo']">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: -10 }}
        className="w-full max-w-2xl bg-white border border-[#E2E8F0] rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[80vh]"
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#E2E8F0] flex items-center gap-3 bg-[#F8FAFC]">
          <HiSearch className="w-5 h-5 text-[#64748B] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="ابحث عن درس، ملخص PDF، تمرين، أو أستاذ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base text-[#0F172A] placeholder-[#94A3B8] focus:outline-none"
          />
          <button
            onClick={onClose}
            aria-label="إغلاق البحث"
            className="p-1.5 rounded-lg bg-white border border-[#CBD5E1] text-[#64748B] hover:text-[#0F172A] cursor-pointer shadow-2xs"
          >
            <HiX className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1 bg-white">
          {trimmed.length < 2 ? (
            <div className="text-center py-10 text-[#64748B] text-xs">
              <p className="mb-2 font-medium">💡 اكتب كلمتين على الأقل لبدء البحث الفوري في جميع الملفات والمواد</p>
              <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3">
                <span className="px-2.5 py-1 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] text-[#0F172A]">الدوال الأسية</span>
                <span className="px-2.5 py-1 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] text-[#0F172A]">الأستاذ نور الدين</span>
                <span className="px-2.5 py-1 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] text-[#0F172A]">المناعة سمراني</span>
                <span className="px-2.5 py-1 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] text-[#0F172A]">مقالات الفلسفة</span>
                <span className="px-2.5 py-1 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] text-[#0F172A]">الهندسة المدنية</span>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-10 text-[#64748B] text-xs">
              <p>لم يتم العثور على نتائج لـ "{query}".</p>
            </div>
          ) : (
            results.map((res, idx) => (
              <div
                key={idx}
                onClick={res.action ? res.action : undefined}
                className="bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] hover:border-[#E11D48] rounded-xl p-3 flex items-center justify-between gap-3 transition-colors cursor-pointer group shadow-2xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">{res.icon}</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-[#0F172A] group-hover:text-[#E11D48]">
                        {res.title}
                      </h4>
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white text-[#475569] border border-[#E2E8F0]">
                        {res.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#64748B] line-clamp-1">
                      {res.subtext}
                    </p>
                  </div>
                </div>

                {res.fileData ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenPdf) onOpenPdf(res.fileData);
                        onClose();
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#F1F5F9] text-[#0F172A] border border-[#CBD5E1] text-xs font-bold flex items-center gap-1 shadow-2xs"
                    >
                      <HiEye className="w-3.5 h-3.5 text-[#E11D48]" />
                      <span>قراءة</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const pdfUrl = res.fileData.fileUrl || res.fileData.url;
                        const fileName = res.fileData.rawFileName || `${res.fileData.title}.pdf`;
                        const link = document.createElement('a');
                        link.href = pdfUrl;
                        link.download = fileName;
                        link.target = '_blank';
                        link.rel = 'noopener noreferrer';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-[#E11D48] hover:bg-[#be123c] text-white text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
                    >
                      <HiDownload className="w-3.5 h-3.5" />
                      <span>تحميل</span>
                    </button>
                  </div>
                ) : res.link ? (
                  <a
                    href={res.link}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#E11D48] text-[#0F172A] hover:text-white border border-[#CBD5E1] hover:border-[#E11D48] transition-colors text-xs font-bold flex items-center gap-1 shadow-2xs"
                  >
                    <HiExternalLink className="w-3.5 h-3.5" />
                    <span>فتح</span>
                  </a>
                ) : (
                  <div className="w-6 h-6 rounded bg-white text-[#64748B] group-hover:text-[#E11D48] flex items-center justify-center">
                    <HiArrowRight className="w-3.5 h-3.5 rotate-180" />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}
