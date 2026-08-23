import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { STREAMS } from '../data/streamsData';
import { STREAM_SUBJECTS } from '../data/bacData';
import { 
  HiArrowRight, 
  HiAcademicCap, 
  HiCalculator, 
  HiBookOpen, 
  HiSparkles,
  HiCheckCircle,
  HiChevronLeft
} from 'react-icons/hi';
import { motion } from 'framer-motion';

export default function StreamHub() {
  const { streamId } = useParams();
  const navigate = useNavigate();

  const currentStream = STREAMS.find(s => s.id === streamId) || STREAMS[0];
  const subjects = STREAM_SUBJECTS[currentStream.id] || STREAM_SUBJECTS['sciences'];

  const totalCoef = subjects.reduce((sum, s) => sum + s.coef, 0);

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Back Navigation & Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
        <Link to="/" className="hover:text-emerald-400 transition-colors">الرئيسية</Link>
        <span>/</span>
        <span className="text-white">شعبة {currentStream.name}</span>
      </div>

      {/* Stream Header Banner */}
      <div className="relative bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 mb-10 overflow-hidden shadow-2xl">
        <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${currentStream.color} opacity-10 blur-[100px] pointer-events-none`} />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-4xl sm:text-5xl shadow-inner">
              {currentStream.icon}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${currentStream.badgeColor}`}>
                  بكالوريا الجزائر
                </span>
                <span className="text-xs font-mono text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
                  مجموع المعاملات: {totalCoef}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white font-['Cairo']">
                شعبة {currentStream.name}
              </h1>
              <p className="text-sm text-slate-400 font-sans mt-1">
                {currentStream.frenchName}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <Link
              to={`/calculator?stream=${currentStream.id}`}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-all"
            >
              <HiCalculator className="w-4 h-4" />
              <span>حاسبة معدل الشعبة</span>
            </Link>

            <Link
              to="/bac-archive"
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-all"
            >
              <HiBookOpen className="w-4 h-4" />
              <span>بكالوريات سابقة</span>
            </Link>
          </div>
        </div>

        <p className="text-slate-300 text-sm mt-6 leading-relaxed max-w-3xl">
          {currentStream.description} اختر مادة من القائمة أدناه للوصول إلى الدروس، الملخصات الشاملة، سلاسل التمارين المحلولة، وفيديوهات اليوتيوب المصنفة.
        </p>
      </div>

      {/* Subjects Grid */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            مواد شعبة {currentStream.name} ({subjects.length} مواد)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            مرتبة حسب المعامل والأهمية في شهادة البكالوريا
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {subjects.map((sub, idx) => (
          <motion.div
            key={sub.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
          >
            <Link
              to={`/stream/${currentStream.id}/subject/${sub.id}`}
              className="block bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {sub.icon}
                </div>
                <div className="flex items-center gap-2">
                  {sub.isEssential && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      مادة أساسية
                    </span>
                  )}
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">
                    معامل {sub.coef}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mb-2">
                {sub.name}
              </h3>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800/80">
                <span className="flex items-center gap-1 text-slate-500 group-hover:text-slate-300">
                  <span>دروس، تمارين وفيديوهات</span>
                </span>
                <span className="text-emerald-400 font-bold flex items-center gap-1 group-hover:-translate-x-1 transition-transform">
                  <span>فتح المادة</span>
                  <HiChevronLeft className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Switch Stream Quick Bar */}
      <div className="mt-16 pt-8 border-t border-slate-800/80">
        <h3 className="text-sm font-bold text-slate-400 mb-4 text-center">
          تبديل الشعبة الدراسية:
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {STREAMS.map(s => (
            <Link
              key={s.id}
              to={`/stream/${s.id}`}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                s.id === currentStream.id
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>{s.icon}</span>
              <span>{s.name}</span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
