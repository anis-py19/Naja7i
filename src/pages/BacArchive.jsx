import React, { useState } from 'react';
import { STREAMS } from '../data/streamsData';
import { Link } from 'react-router-dom';
import { 
  HiBookOpen, 
  HiDownload, 
  HiSearch, 
  HiFilter, 
  HiCheckCircle, 
  HiDocumentText,
  HiArrowRight
} from 'react-icons/hi';
import { motion } from 'framer-motion';

export default function BacArchive() {
  const [selectedStream, setSelectedStream] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const years = Array.from({ length: 18 }, (_, i) => 2025 - i); // 2025 down to 2008

  const mockExams = [
    { year: 2025, stream: 'sciences', subject: 'العلوم الفيزيائية', session: 'الدورة العادية', topic: 'الموضوع الأول + الثاني مع الحل النموذجي والتنقيط' },
    { year: 2025, stream: 'sciences', subject: 'علوم الطبيعة والحياة', session: 'الدورة العادية', topic: 'الموضوع الأول + الثاني مع سلم التنقيط الوزاري' },
    { year: 2025, stream: 'math', subject: 'الرياضيات', session: 'الدورة العادية', topic: 'الموضوعان مع الحلول المفصلة للأستاذ نور الدين' },
    { year: 2024, stream: 'sciences', subject: 'الرياضيات', session: 'الدورة العادية', topic: 'الموضوع الأول + الثاني بالحل المفصل' },
    { year: 2024, stream: 'technique_math', subject: 'التكنولوجيا (هندسة مدنية)', session: 'الدورة العادية', topic: 'الموضوع الشامل مع رسم المخططات والحل' },
    { year: 2024, stream: 'gestion', subject: 'التسيير المحاسبي والمالي', session: 'الدورة العادية', topic: 'الموضوع الأول والثاني مع ميزانية الإقفال' },
    { year: 2023, stream: 'lettres_philo', subject: 'الفلسفة', session: 'الدورة العادية', topic: 'المقالات الثلاثة مع نماذج الإجابة الفلسفية' },
    { year: 2023, stream: 'langues', subject: 'اللغة الإسبانية', session: 'الدورة العادية', topic: 'النص والأسئلة مع التعبير الكتابي' },
    { year: 2022, stream: 'sciences', subject: 'العلوم الفيزيائية', session: 'الدورة العادية', topic: 'الموضوع النموذجي في الميكانيك والكهرباء' }
  ];

  const filteredExams = mockExams.filter(exam => {
    const matchStream = selectedStream === 'all' || exam.stream === selectedStream;
    const matchYear = selectedYear === 'all' || exam.year.toString() === selectedYear;
    const matchSearch = searchQuery === '' || 
      exam.subject.includes(searchQuery) || 
      exam.topic.includes(searchQuery);
    return matchStream && matchYear && matchSearch;
  });

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
          <HiBookOpen className="w-4 h-4" />
          <span>الأرشيف الوطني الرسمي لامتحانات البكالوريا</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
          مواضيع وحلول البكالوريا الرسمية (2008 – 2025)
        </h1>
        <p className="text-sm text-slate-400">
          تحميل مباشر لجميع مواضيع شهادة البكالوريا مع الحلول النموذجية وسلم التنقيط المعتمد
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 mb-8 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Search Box */}
          <div>
            <label className="text-xs font-bold text-slate-400 mb-1.5 block">
              بحث عن مادة أو كلمة مفتاحية:
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="مثلاً: فيزياء، رياضيات، ميكانيك..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
              />
              <HiSearch className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          {/* Stream Filter */}
          <div>
            <label className="text-xs font-bold text-slate-400 mb-1.5 block">
              تصفية حسب الشعبة:
            </label>
            <select
              value={selectedStream}
              onChange={(e) => setSelectedStream(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:border-amber-500 outline-none"
            >
              <option value="all">كل الشعب الدراسية</option>
              {STREAMS.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div>
            <label className="text-xs font-bold text-slate-400 mb-1.5 block">
              تصفية حسب السنة (الدورة):
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:border-amber-500 outline-none"
            >
              <option value="all">جميع السنوات (2008 - 2025)</option>
              {years.map(y => (
                <option key={y} value={y.toString()}>بكالوريا {y}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Exams List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2 px-2">
          <span>النتائج المتطابقة ({filteredExams.length} موضوع)</span>
          <span>تحميل مباشر PDF</span>
        </div>

        {filteredExams.map((exam, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: idx * 0.04 }}
            className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-sm">
                {exam.year}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-white">
                    {exam.subject}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {exam.session}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  {exam.topic}
                </p>
              </div>
            </div>

            <button
              onClick={() => alert(`جاري تحميل موضوع بكالوريا ${exam.year} - ${exam.subject}`)}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
            >
              <HiDownload className="w-4 h-4" />
              <span>تحميل الموضوع + الحل (PDF)</span>
            </button>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
