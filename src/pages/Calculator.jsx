import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { STREAMS } from '../data/streamsData';
import { STREAM_SUBJECTS } from '../data/bacData';
import { 
  HiCalculator, 
  HiSparkles, 
  HiAcademicCap, 
  HiRefresh, 
  HiCheckCircle, 
  HiExclamationCircle,
  HiArrowRight
} from 'react-icons/hi';
import { motion } from 'framer-motion';

export default function Calculator() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialStream = searchParams.get('stream') || 'sciences';

  const [selectedStreamId, setSelectedStreamId] = useState(initialStream);
  const subjects = STREAM_SUBJECTS[selectedStreamId] || STREAM_SUBJECTS['sciences'];

  // State to hold grades for each subject: { [subjectId]: number | '' }
  const [grades, setGrades] = useState(() => {
    const init = {};
    subjects.forEach(s => {
      init[s.id] = '';
    });
    return init;
  });

  const handleStreamChange = (newStreamId) => {
    setSelectedStreamId(newStreamId);
    setSearchParams({ stream: newStreamId });
    const newSubjects = STREAM_SUBJECTS[newStreamId] || STREAM_SUBJECTS['sciences'];
    const newGrades = {};
    newSubjects.forEach(s => {
      newGrades[s.id] = '';
    });
    setGrades(newGrades);
  };

  const handleGradeChange = (subjectId, value) => {
    if (value === '') {
      setGrades(prev => ({ ...prev, [subjectId]: '' }));
      return;
    }
    const num = parseFloat(value);
    if (!isNaN(num) && num >= 0 && num <= 20) {
      setGrades(prev => ({ ...prev, [subjectId]: value }));
    }
  };

  const fillExampleGrades = () => {
    const filled = {};
    subjects.forEach(s => {
      filled[s.id] = (Math.floor(Math.random() * 6) + 14).toString(); // 14 - 19
    });
    setGrades(filled);
  };

  const resetGrades = () => {
    const empty = {};
    subjects.forEach(s => {
      empty[s.id] = '';
    });
    setGrades(empty);
  };

  // Calculations
  const { totalPoints, totalCoeffs, average, status } = useMemo(() => {
    let totalP = 0;
    let totalC = 0;
    let isComplete = true;

    subjects.forEach(sub => {
      const val = parseFloat(grades[sub.id]);
      if (!isNaN(val)) {
        totalP += val * sub.coef;
        totalC += sub.coef;
      } else {
        isComplete = false;
      }
    });

    const avg = totalC > 0 ? (totalP / totalC).toFixed(2) : '0.00';
    const numAvg = parseFloat(avg);

    let mention = { text: 'في انتظار إدخال النقاط', color: 'text-slate-400', badge: 'bg-slate-800' };
    if (numAvg >= 18) {
      mention = { text: 'ممتاز (Mention Très Bien avec Félicitations)', color: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
    } else if (numAvg >= 16) {
      mention = { text: 'جيد جداً (Mention Très Bien)', color: 'text-teal-400', badge: 'bg-teal-500/20 text-teal-300 border-teal-500/40' };
    } else if (numAvg >= 14) {
      mention = { text: 'جيد (Mention Bien)', color: 'text-cyan-400', badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' };
    } else if (numAvg >= 12) {
      mention = { text: 'قريب من الجيد (Mention Assez Bien)', color: 'text-blue-400', badge: 'bg-blue-500/20 text-blue-300 border-blue-500/40' };
    } else if (numAvg >= 10) {
      mention = { text: 'مقبول (Mention Passable)', color: 'text-amber-400', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
    } else if (numAvg > 0) {
      mention = { text: 'مؤجل / غير ناجح (يمكنك التعويض والتحسين!)', color: 'text-rose-400', badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40' };
    }

    return {
      totalPoints: totalP.toFixed(2),
      totalCoeffs: totalC,
      average: avg,
      status: mention,
      isComplete
    };
  }, [grades, subjects]);

  const currentStream = STREAMS.find(s => s.id === selectedStreamId) || STREAMS[0];

  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-3">
          <HiCalculator className="w-4 h-4" />
          <span>المعاملات الرسمية لوزارة التربية الوطنية الجزائرية</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
          حاسبة معدل البكالوريا 2026
        </h1>
        <p className="text-sm text-slate-400">
          احسب معدلك التقديري بدقة تامة وتعرف على ميزتك والتخصصات المتاحة لك
        </p>
      </div>

      {/* Stream Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar justify-start sm:justify-center">
        {STREAMS.map(s => (
          <button
            key={s.id}
            onClick={() => handleStreamChange(s.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              s.id === selectedStreamId
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-lg shadow-emerald-500/20 font-black'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>{s.icon}</span>
            <span>{s.name}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Subjects Input List */}
        <div className="lg:col-span-2 space-y-3 bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-bold text-slate-300">
              مواد شعبة {currentStream.name}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={fillExampleGrades}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 font-bold px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 transition-colors"
              >
                نقاط تجريبية ✨
              </button>
              <button
                onClick={resetGrades}
                className="text-[11px] text-slate-400 hover:text-rose-400 font-bold px-2.5 py-1 rounded-lg bg-slate-800 transition-colors"
              >
                تفريغ الحقول
              </button>
            </div>
          </div>

          <div className="space-y-2.5">
            {subjects.map((sub) => {
              const gradeVal = grades[sub.id] || '';
              const subTotal = gradeVal !== '' ? (parseFloat(gradeVal) * sub.coef).toFixed(1) : '—';

              return (
                <div 
                  key={sub.id}
                  className="flex items-center justify-between bg-slate-950/70 border border-slate-800/80 rounded-2xl p-3.5 hover:border-slate-700 transition-colors gap-3"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-xl">{sub.icon}</span>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-white">
                        {sub.name}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        معامل: <strong className="text-emerald-400 font-mono">{sub.coef}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-left">
                      <div className="text-[10px] text-slate-500 font-mono">النقاط x المعامل</div>
                      <div className="text-xs font-bold text-cyan-400 font-mono">{subTotal}</div>
                    </div>

                    <div className="relative w-20 sm:w-24">
                      <input 
                        type="number"
                        min="0"
                        max="20"
                        step="0.25"
                        placeholder="0.00"
                        value={gradeVal}
                        onChange={(e) => handleGradeChange(sub.id, e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-3 py-2 text-center text-sm font-bold text-white font-mono placeholder:text-slate-600 outline-none transition-all"
                      />
                      <span className="absolute left-2 top-2.5 text-[10px] text-slate-500 font-mono pointer-events-none">
                        /20
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Results Card */}
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 text-center shadow-2xl relative overflow-hidden sticky top-28">
            <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500" />

            <span className="text-xs font-bold text-slate-400 mb-2 block">
              المعدل العام المتوقع
            </span>

            <div className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent font-mono my-3 tracking-tight">
              {average}
            </div>

            <div className="text-xs font-semibold text-slate-400 font-mono mb-4">
              من 20.00
            </div>

            <div className={`p-3 rounded-2xl border text-xs font-bold mb-6 ${status.badge}`}>
              {status.text}
            </div>

            <div className="grid grid-cols-2 gap-2 text-left bg-slate-950/80 p-3 rounded-2xl border border-slate-800 mb-6">
              <div className="text-right">
                <span className="text-[10px] text-slate-500 block">مجموع النقاط</span>
                <span className="text-sm font-bold text-white font-mono">{totalPoints}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 block">مجموع المعاملات</span>
                <span className="text-sm font-bold text-emerald-400 font-mono">{totalCoeffs}</span>
              </div>
            </div>

            <Link
              to={`/stream/${selectedStreamId}`}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-colors"
            >
              <span>راجع دروس شعبة {currentStream.name}</span>
              <HiArrowRight className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
