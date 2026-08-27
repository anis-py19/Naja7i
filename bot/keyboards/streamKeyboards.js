import { InlineKeyboard } from 'grammy';
import { STREAMS, getStreamById, getSubjectById } from '../data/streams.js';

/**
 * Keyboards for Stream Selection (6 streams)
 */
export function getStreamsKeyboard(prefix = 'stream') {
  const keyboard = new InlineKeyboard();

  STREAMS.forEach((stream, idx) => {
    keyboard.text(`${stream.icon} ${stream.name}`, `${prefix}:${stream.id}`);
    if (idx % 2 === 1) keyboard.row();
  });

  if (STREAMS.length % 2 !== 0) keyboard.row();
  keyboard.text('🏠 القائمة الرئيسية', 'menu_home');
  return keyboard;
}

/**
 * Keyboards for Subject Selection within a Stream
 */
export function getStreamSubjectsKeyboard(streamId) {
  const stream = getStreamById(streamId);
  const keyboard = new InlineKeyboard();

  stream.subjects.forEach((sub, idx) => {
    const isMainTag = sub.isMain ? '⭐ ' : '';
    keyboard.text(`${sub.icon} ${isMainTag}${sub.name} (${sub.coef})`, `subject:${streamId}:${sub.id}`);
    if (idx % 2 === 1) keyboard.row();
  });

  if (stream.subjects.length % 2 !== 0) keyboard.row();
  keyboard.row()
    .text('🏛️ أرشيف بكالوريات الشعبة', `stream_archive:${streamId}`).row()
    .text('📅 مخطط مراجعة الشعبة', `stream_plan:${streamId}`)
    .text('🎯 كويزات الشعبة', `stream_quiz:${streamId}`).row()
    .text('🔙 قائمة الشعب', 'menu_streams')
    .text('🏠 الرئيسية', 'menu_home');

  return keyboard;
}

/**
 * Keyboards for Actions on a specific Subject
 */
export function getSubjectActionKeyboard(streamId, subjectId) {
  const keyboard = new InlineKeyboard();

  keyboard
    .text('📑 ملخصات ودروس', `files:${streamId}:${subjectId}:summaries:1`)
    .text('📝 سلاسل وتمارين', `files:${streamId}:${subjectId}:exercises:1`).row()
    .text('🏛️ مواضيع البكالوريا للمادة', `sub_archive:${streamId}:${subjectId}:1`).row()
    .text('🎯 كويز واختبار المادة', `sub_quiz:${streamId}:${subjectId}`).row()
    .text('🎥 أساتذة اليوتيوب للمادة', `sub_teachers:${streamId}:${subjectId}`)
    .text('📋 المنهاج والبرنامج الوزاري', `sub_curriculum:${streamId}:${subjectId}`).row()
    .text('🔙 رجوع لمواد الشعبة', `stream:${streamId}`)
    .text('🏠 الرئيسية', 'menu_home');

  return keyboard;
}
