import { QUIZ_QUESTIONS } from '../../src/data/quizData.js';

export { QUIZ_QUESTIONS };

/**
 * Get questions filtered by stream and/or subject
 */
export function getQuestions({ streamId = null, subjectId = null } = {}) {
  return QUIZ_QUESTIONS.filter(q => {
    if (streamId && streamId !== 'all') {
      if (q.streamIds && !q.streamIds.includes(streamId) && !q.streamIds.includes('all')) {
        return false;
      }
    }
    if (subjectId && subjectId !== 'all') {
      if (q.subjectId !== subjectId) {
        return false;
      }
    }
    return true;
  });
}

/**
 * Get a random question
 */
export function getRandomQuestion({ streamId = null, subjectId = null } = {}) {
  const pool = getQuestions({ streamId, subjectId });
  if (!pool.length) return null;
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}

/**
 * Get question by ID
 */
export function getQuestionById(id) {
  return QUIZ_QUESTIONS.find(q => q.id === id);
}
