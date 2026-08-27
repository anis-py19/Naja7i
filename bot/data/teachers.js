import { YOUTUBE_TEACHERS, YOUTUBE_SUBJECTS, YOUTUBE_STREAMS } from '../../src/data/youtubeData.js';

export { YOUTUBE_TEACHERS, YOUTUBE_SUBJECTS, YOUTUBE_STREAMS };

/**
 * Filter teachers by subject or stream
 */
export function getTeachersBySubjectOrStream({ subjectId = null, streamId = null } = {}) {
  return YOUTUBE_TEACHERS.filter(t => {
    if (subjectId && subjectId !== 'all') {
      if (t.subjectId !== subjectId) return false;
    }
    if (streamId && streamId !== 'all') {
      if (t.streams && !t.streams.includes(streamId) && !t.streams.includes('all')) return false;
    }
    return true;
  });
}
