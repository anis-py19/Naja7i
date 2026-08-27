import { InlineKeyboard } from 'grammy';
import { STREAMS, getStreamById } from '../data/streams.js';

/**
 * Keyboard to select stream for calculator
 */
export function getCalcStreamsKeyboard() {
  const keyboard = new InlineKeyboard();

  STREAMS.forEach((stream, idx) => {
    keyboard.text(`${stream.icon} ${stream.shortName || stream.name}`, `calc_stream:${stream.id}`);
    if (idx % 2 === 1) keyboard.row();
  });

  if (STREAMS.length % 2 !== 0) keyboard.row();
  keyboard.text('🏠 الرئيسية', 'menu_home');
  return keyboard;
}

/**
 * Keyboard for interactive calculator interface
 */
export function getCalcSubjectKeyboard(streamId, marks = {}, includeOptional = { amazigh: false, sport: true }) {
  const stream = getStreamById(streamId);
  const keyboard = new InlineKeyboard();

  // Quick preset averages
  keyboard
    .text('⚡ تجربة معدل 12', `calc_preset:${streamId}:12`)
    .text('⚡ معدل 15 (جيد)', `calc_preset:${streamId}:15`)
    .text('⚡ معدل 18 (ممتاز)', `calc_preset:${streamId}:18`).row();

  // Each subject with current score
  stream.subjects.forEach((subject, idx) => {
    if (subject.id === 'amazigh' && !includeOptional.amazigh) return;
    if (subject.id === 'sport' && !includeOptional.sport) return;

    const currentScore = marks[subject.id] !== undefined ? marks[subject.id] : 'لم يُحدد';
    const mainTag = subject.isMain ? '⭐ ' : '';
    keyboard.text(`${mainTag}${subject.name} (${subject.coef}): [ ${currentScore} / 20 ]`, `calc_set:${streamId}:${subject.id}`).row();
  });

  // Toggles for optional subjects
  const amazighStatus = includeOptional.amazigh ? '✅ الأمازيغية (مُفعل)' : '⚪ الأمازيغية (معطّل)';
  const sportStatus = includeOptional.sport ? '✅ الرياضة (مُفعل)' : '⚪ الرياضة (معطّل)';

  keyboard
    .text(amazighStatus, `calc_toggle:${streamId}:amazigh`)
    .text(sportStatus, `calc_toggle:${streamId}:sport`).row();

  // Calculate & Reset buttons
  keyboard
    .text('🧮 احسب المعدل النهائي الآن 📊', `calc_run:${streamId}`).row()
    .text('🔄 إعادة تعيين النقاط', `calc_reset:${streamId}`)
    .text('🔙 تغيير الشعبة', 'menu_calculator').row()
    .text('🏠 الرئيسية', 'menu_home');

  return keyboard;
}

/**
 * Score picker keypad (0 to 20)
 */
export function getScorePickerKeyboard(streamId, subjectId) {
  const keyboard = new InlineKeyboard();

  // Common quick scores
  const scoreRows = [
    [20, 19, 18, 17],
    [16, 15, 14, 13],
    [12, 11, 10, 9],
    [8, 7, 6, 5]
  ];

  scoreRows.forEach(row => {
    row.forEach(score => {
      keyboard.text(`${score}`, `calc_val:${streamId}:${subjectId}:${score}`);
    });
    keyboard.row();
  });

  keyboard
    .text('0 (صفر)', `calc_val:${streamId}:${subjectId}:0`)
    .text('🔙 رجوع للحاسبة', `calc_back:${streamId}`);

  return keyboard;
}
