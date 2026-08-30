import { InlineKeyboard } from 'grammy';
import { TRAP_SUBJECTS } from '../data/traps.js';
import { truncate } from '../utils/helpers.js';

export function getTrapsSubjectsKeyboard() {
  const keyboard = new InlineKeyboard();

  keyboard.text('🎲 فخ بكالوريا عشوائي سريع', 'trap_rand').row();

  TRAP_SUBJECTS.forEach((subj, idx) => {
    keyboard.text(`${subj.icon} ${subj.name}`, `trap_sub:${subj.id}`);
    if (idx % 2 === 1) keyboard.row();
  });

  if (TRAP_SUBJECTS.length % 2 !== 0) keyboard.row();
  keyboard.text('🏠 الرئيسية', 'menu_home');

  return keyboard;
}

export function getTrapsListKeyboard(subjectId, traps = []) {
  const keyboard = new InlineKeyboard();

  traps.forEach((trap, idx) => {
    keyboard.text(`${idx + 1}. ${truncate(trap.title, 38)}`, `trap_view:${trap.id}`).row();
  });

  keyboard
    .text('🎲 فخ عشوائي آخر', 'trap_rand').row()
    .text('🔙 قائمة المواد', 'menu_traps')
    .text('🏠 الرئيسية', 'menu_home');

  return keyboard;
}

export function getSingleTrapKeyboard(trap) {
  return new InlineKeyboard()
    .text('🎲 فخ آخر في نفس المادة', `trap_sub:${trap.subjectId}`).row()
    .text('🔙 كراس الأخطاء', 'menu_traps')
    .text('🏠 الرئيسية', 'menu_home');
}
