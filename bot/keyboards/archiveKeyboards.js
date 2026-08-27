import { InlineKeyboard } from 'grammy';
import { AVAILABLE_YEARS } from '../data/archive.js';
import { STREAMS } from '../data/streams.js';

/**
 * Keyboard for selecting stream for archive
 */
export function getArchiveStreamsKeyboard() {
  const keyboard = new InlineKeyboard();

  STREAMS.forEach((stream, idx) => {
    keyboard.text(`${stream.icon} ${stream.shortName || stream.name}`, `arc_stream:${stream.id}`);
    if (idx % 2 === 1) keyboard.row();
  });

  if (STREAMS.length % 2 !== 0) keyboard.row();
  keyboard.text('🏠 الرئيسية', 'menu_home');
  return keyboard;
}

/**
 * Keyboard for selecting year for a stream
 */
export function getArchiveYearsKeyboard(streamId) {
  const keyboard = new InlineKeyboard();

  AVAILABLE_YEARS.forEach((year, idx) => {
    keyboard.text(`📅 ${year}`, `arc_year:${streamId}:${year}`);
    if ((idx + 1) % 3 === 0) keyboard.row();
  });

  if (AVAILABLE_YEARS.length % 3 !== 0) keyboard.row();
  keyboard.text('🔙 تغيير الشعبة', 'menu_archive')
    .text('🏠 الرئيسية', 'menu_home');

  return keyboard;
}

/**
 * Keyboard for subjects of an archive year with topic/solution links
 */
export function getArchiveSubjectsKeyboard(streamId, year, items = []) {
  const keyboard = new InlineKeyboard();

  items.forEach(item => {
    keyboard.text(`📘 ${item.subjectName}`, `arc_item:${item.id}`).row();
    if (item.sujetUrl) {
      keyboard.url('📄 موضوع الامتحان', item.sujetUrl);
    }
    if (item.corrigeUrl) {
      keyboard.url('📝 التصحيح النموذجي', item.corrigeUrl);
    }
    if (item.sujetUrl || item.corrigeUrl) keyboard.row();
  });

  keyboard
    .text(`🔙 رجوع لسنوات (${year})`, `arc_stream:${streamId}`).row()
    .text('🏛️ أرشيف الشعب', 'menu_archive')
    .text('🏠 الرئيسية', 'menu_home');

  return keyboard;
}
