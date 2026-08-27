import { STREAMS } from '../src/data/streamsData.js';
import { USER_STUDY_FILES } from '../src/data/userFilesData.js';
import { BAC_FULL_ARCHIVE } from '../src/data/bacArchiveFullData.js';
import { QUIZ_QUESTIONS } from '../src/data/quizData.js';
import { STREAM_STUDY_PLANS } from '../src/data/plannerData.js';
import { YOUTUBE_TEACHERS, YOUTUBE_STREAMS, YOUTUBE_SUBJECTS } from '../src/data/youtubeData.js';
import { BAC_COEFFICIENTS } from '../src/data/bacData.js';

/**
 * 📊 Naja7i Centralized Data Adapter for Telegram Bot
 */

// 1. الشعب الست (Streams)
export function getAllStreams() {
  return STREAMS;
}

export function getStreamById(streamId) {
  return STREAMS.find(s => s.id === streamId) || null;
}

// 2. المكتبة والملخصات (Library & User Files)
export function getSubjectsForStream(streamId) {
  const stream = getStreamById(streamId);
  if (!stream) return [];

  // جمع المواد الفريدة المتوفرة لهذه الشعبة من ملفات المكتبة والمعاملات
  const subjectsMap = new Map();

  // أولاً من المعاملات الرسمية
  if (BAC_COEFFICIENTS[streamId]?.subjects) {
    BAC_COEFFICIENTS[streamId].subjects.forEach(sub => {
      subjectsMap.set(sub.id, { id: sub.id, name: sub.name, coef: sub.coef, icon: sub.icon || '📘' });
    });
  }

  // ثانياً من الملفات المرفوعة
  USER_STUDY_FILES.forEach(f => {
    if (f.streamIds && f.streamIds.includes(streamId) && f.subjectId) {
      if (!subjectsMap.has(f.subjectId)) {
        subjectsMap.set(f.subjectId, {
          id: f.subjectId,
          name: f.subjectName || f.subjectId,
          coef: 2,
          icon: '📄'
        });
      }
    }
  });

  return Array.from(subjectsMap.values());
}

export function getFilesForStream(streamId, subjectId = null, category = null) {
  return USER_STUDY_FILES.filter(file => {
    const matchStream = !streamId || (file.streamIds && file.streamIds.includes(streamId));
    const matchSubject = !subjectId || file.subjectId === subjectId;
    const matchCategory = !category || file.category === category;
    return matchStream && matchSubject && matchCategory;
  });
}

export function getFileById(fileId) {
  return USER_STUDY_FILES.find(f => f.id === fileId) || null;
}

export function searchFiles(query, limit = 10) {
  if (!query || query.trim().length === 0) return [];
  const q = query.trim().toLowerCase();

  return USER_STUDY_FILES.filter(file => {
    const titleMatch = file.title?.toLowerCase().includes(q);
    const rawMatch = file.rawFileName?.toLowerCase().includes(q);
    const subMatch = file.subjectName?.toLowerCase().includes(q);
    const catMatch = file.category?.toLowerCase().includes(q);
    const authorMatch = file.author?.toLowerCase().includes(q);
    return titleMatch || rawMatch || subMatch || catMatch || authorMatch;
  }).slice(0, limit);
}

// 3. أرشيف البكالوريا (BAC Archive 2008 - 2026)
export function getBacArchiveYears() {
  const yearsSet = new Set();
  BAC_FULL_ARCHIVE.forEach(item => {
    if (item.year) yearsSet.add(item.year);
  });
  return Array.from(yearsSet).sort((a, b) => b - a);
}

export function getBacArchiveByYear(year, streamId = null) {
  return BAC_FULL_ARCHIVE.filter(item => {
    const matchYear = Number(item.year) === Number(year);
    const matchStream = !streamId || item.streamId === streamId;
    return matchYear && matchStream;
  });
}

export function getBacArchiveItem(year, streamId, subjectId) {
  return BAC_FULL_ARCHIVE.find(item => 
    Number(item.year) === Number(year) && 
    item.streamId === streamId && 
    item.subjectId === subjectId
  ) || null;
}

export function searchBacArchive(query, limit = 10) {
  if (!query || query.trim().length === 0) return [];
  const q = query.trim().toLowerCase();

  return BAC_FULL_ARCHIVE.filter(item => {
    const yearMatch = item.year?.toString().includes(q);
    const subMatch = item.subjectName?.toLowerCase().includes(q);
    const streamMatch = item.streamName?.toLowerCase().includes(q);
    const sujetTitleMatch = item.sujetTitle?.toLowerCase().includes(q);
    return yearMatch || subMatch || streamMatch || sujetTitleMatch;
  }).slice(0, limit);
}

// 4. بنك الكويزات (BAC Quiz Bank)
export function getQuizQuestions(streamId = null, subjectId = null) {
  return QUIZ_QUESTIONS.filter(q => {
    const matchStream = !streamId || (q.streamIds && q.streamIds.includes(streamId));
    const matchSubject = !subjectId || q.subjectId === subjectId;
    return matchStream && matchSubject;
  });
}

export function getRandomQuiz(streamId = null, subjectId = null) {
  const questions = getQuizQuestions(streamId, subjectId);
  if (questions.length === 0) {
    // إذا لم تتوفر أسئلة للمادة المحددة، نختار من جميع الأسئلة
    const all = QUIZ_QUESTIONS;
    return all[Math.floor(Math.random() * all.length)];
  }
  return questions[Math.floor(Math.random() * questions.length)];
}

export function getQuizById(id) {
  return QUIZ_QUESTIONS.find(q => q.id === id) || null;
}

// 5. حاسبة المعدل والمعاملات (BAC Calculator)
export function getCoefficientsByStream(streamId) {
  return BAC_COEFFICIENTS[streamId] || null;
}

export function calculateBacAverage(streamId, grades) {
  const streamData = BAC_COEFFICIENTS[streamId];
  if (!streamData) return null;

  let totalPoints = 0;
  let totalCoeffs = 0;
  const details = [];

  streamData.subjects.forEach(subject => {
    const grade = typeof grades[subject.id] === 'number' ? grades[subject.id] : 10;
    const pts = grade * subject.coef;
    totalPoints += pts;
    totalCoeffs += subject.coef;
    details.push({
      subjectId: subject.id,
      name: subject.name,
      coef: subject.coef,
      grade,
      pts
    });
  });

  const average = totalCoeffs > 0 ? (totalPoints / totalCoeffs) : 0;
  const isPassed = average >= 10.0;

  let appreciation = 'راسب';
  if (average >= 18) appreciation = 'ممتاز (Mention Très Bien avec Félicitations)';
  else if (average >= 16) appreciation = 'جيد جداً (Mention Très Bien)';
  else if (average >= 14) appreciation = 'جيد (Mention Bien)';
  else if (average >= 12) appreciation = 'قريب من الجيد (Mention Assez Bien)';
  else if (average >= 10) appreciation = 'مقبول (Mention Passable)';

  return {
    streamName: streamData.name,
    totalPoints: Number(totalPoints.toFixed(2)),
    totalCoeffs,
    average: Number(average.toFixed(2)),
    isPassed,
    appreciation,
    details
  };
}

// 6. دليل أساتذة اليوتيوب (YouTube Teachers)
export function getYouTubeTeachers(streamId = null, subjectId = null) {
  return YOUTUBE_TEACHERS.filter(teacher => {
    const matchStream = !streamId || streamId === 'all' || (teacher.streams && (teacher.streams.includes(streamId) || teacher.streams.includes('all')));
    const matchSubject = !subjectId || subjectId === 'all' || teacher.subjectId === subjectId;
    return matchStream && matchSubject;
  });
}

export function getYouTubeTeacherById(id) {
  return YOUTUBE_TEACHERS.find(t => t.id === id) || null;
}

// 7. مخطط المراجعة الأسبوعي (Study Planner)
export function getStudyPlan(streamId) {
  return STREAM_STUDY_PLANS[streamId] || STREAM_STUDY_PLANS['sciences'];
}
