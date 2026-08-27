import { InlineKeyboard } from 'grammy';
import { getAllStreams } from '../dataAdapter.js';

/**
 * أزرار اختيار الشعبة لغرض معين (actionPrefix: 'lib_stream', 'bac_stream', 'quiz_stream', 'calc_stream', 'plan_stream')
 */
export function getStreamsInlineKeyboard(actionPrefix = 'stream', backAction = 'main_menu') {
  const streams = getAllStreams();
  const kb = new InlineKeyboard();

  streams.forEach((stream, index) => {
    kb.text(`${stream.icon} ${stream.name}`, `${actionPrefix}:${stream.id}`);
    if (index % 2 === 1) {
      kb.row();
    }
  });

  if (streams.length % 2 !== 0) {
    kb.row();
  }

  kb.text('🔙 العودة للقائمة الرئيسية', backAction);
  return kb;
}
