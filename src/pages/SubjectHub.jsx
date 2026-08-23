import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { STREAMS } from '../data/streamsData';
import { STREAM_SUBJECTS, SUBJECT_DETAILS } from '../data/bacData';
import { 
  HiDocumentDownload, 
  HiVideoCamera, 
  HiCheckCircle, 
  HiArrowRight,
  HiAcademicCap,
  HiBookOpen,
  HiSparkles,
  HiPlay,
  HiFolderDownload
} from 'react-icons/hi';
import { motion } from 'framer-motion';

export default function SubjectHub() {
  const { streamId, subjectId } = useParams();
  const [activeTab, setActiveTab] = useState('lessons'); // lessons | exercises | videos | bacs

  const currentStream = STREAMS.find(s => s.id === streamId) || STREAMS[0];
  const streamSubjects = STREAM_SUBJECTS[currentStream.id] || STREAM_SUBJECTS['sciences'];
  const currentSubjectMeta = streamSubjects.find(s => s.id === subjectId) || { name: 'المادة', coef: 5, icon: '📚' };

  // Fallback to math details if specific subject mock details not created yet
  const details = SUBJECT_DETAILS[subjectId] || SUBJECT_DETAILS['math'];

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
        <Link to="/" className="hover:text-emerald-400 transition-colors">الرئيسية</Link>
        <span>/</span>
        <Link to={`/stream/${currentStream.id}`} className="hover:text-emerald-400 transition-colors">
          شعبة {currentStream.name}
        </Link>
        <span>/</span>
        <span className="text-white">{currentSubjectMeta.name}</span>
      </div>

      {/* Subject Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-8 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-4xl shadow-inner">
              {currentSubjectMeta.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  شعبة {currentStream.name}
                </span>
                <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
                  المعامل: {currentSubjectMeta.coef}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                {currentSubjectMeta.name}
              </h1>
            </div>
          </div>

          <Link
            to={`/stream/${currentStream.id}`}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <HiArrowRight className="w-4 h-4" />
            <span>العودة لمواد الشعبة</span>
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-8 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('lessons')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'lessons'
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <HiBookOpen className="w-4 h-4" />
          <span>الملخصات والدروس PDF</span>
        </button>

        <button
          onClick={() => setActiveTab('exercises')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'exercises'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <HiSparkles className="w-4 h-4" />
          <span>سلاسل التمارين بالحل</span>
        </button>

        <button
          onClick={() => setActiveTab('videos')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'videos'
              ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <HiVideoCamera className="w-4 h-4" />
          <span>فيديوهات اليوتيوب المختارة</span>
        </button>

        <button
          onClick={() => setActiveTab('units')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'units'
              ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <HiAcademicCap className="w-4 h-4" />
          <span>محاور ووحدات المنهج</span>
        </button>
      </div>

      {/* Tab Content */}
      <div>
        
        {/* 1. Lessons Tab */}
        {activeTab === 'lessons' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">ملخصات ودروس PDF جاهزة للتحميل</h3>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                تحميل مباشر ⚡
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {details.lessonsList.map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                        {item.type}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {item.size} • {item.pages}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white mb-2 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 mb-4">
                      إعداد: <strong className="text-slate-300 font-semibold">{item.author}</strong>
                    </p>
                  </div>

                  <button 
                    onClick={() => alert(`جاري بدء تحميل: ${item.title}`)}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <HiFolderDownload className="w-4 h-4" />
                    <span>تحميل الملف الآن (مجاناً)</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Exercises Tab */}
        {activeTab === 'exercises' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">سلاسل التمارين بالحلول النموذجية المفصلة</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {details.exercisesList.map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {item.level}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {item.questions} تمرين ومسألة
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white mb-4 leading-snug">
                      {item.title}
                    </h4>
                  </div>

                  <button 
                    onClick={() => alert(`جاري فتح السلسلة: ${item.title}`)}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <HiCheckCircle className="w-4 h-4" />
                    <span>عرض السلسلة والحل النموذجي</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Videos Tab */}
        {activeTab === 'videos' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">قوائم تشغيل يوتيوب المنظمة</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {details.videos.map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-red-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 font-mono">
                        {item.channel}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {item.duration} • {item.views}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white mb-4 leading-snug">
                      {item.title}
                    </h4>
                  </div>

                  <a 
                    href="https://www.youtube.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-red-500 hover:text-white text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <HiPlay className="w-4 h-4" />
                    <span>مشاهدة الدرس على يوتيوب</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Units Tab */}
        {activeTab === 'units' && (
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white mb-4">وحدات ومحاور البرنامج الرسمي</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {details.units.map((u) => (
                <div 
                  key={u.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-sm font-bold text-white">{u.name}</h4>
                    <span className="text-xs text-slate-400">
                      {u.lessons} دروس • {u.exercises} تمارين
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-slate-800 px-2 py-1 rounded-lg">
                    مكتمل ✓
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
