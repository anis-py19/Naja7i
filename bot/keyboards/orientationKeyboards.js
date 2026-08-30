import { InlineKeyboard } from 'grammy';
import { UNIVERSITY_MAJORS } from '../data/orientation.js';

export function getMajorsKeyboard() {
  const keyboard = new InlineKeyboard();

  UNIVERSITY_MAJORS.forEach((major, idx) => {
    keyboard.text(`${major.icon} ${major.name}`, `major_view:${major.id}`);
    keyboard.row();
  });

  keyboard
    .text('🧮 حاسبة المعدل الموزون السريعة', 'weighted_calc_quick').row()
    .text('🏠 الرئيسية', 'menu_home');

  return keyboard;
}

export function getSingleMajorKeyboard(majorId) {
  return new InlineKeyboard()
    .text('🧮 احسب معدلي الموزون لهذا التخصص 🎯', `calc_w_${majorId}`).row()
    .text('🔙 دليل التخصصات', 'menu_orientation')
    .text('🏠 الرئيسية', 'menu_home');
}

export function getWeightedScoreKeypad(majorId, step = 'bac') {
  const keyboard = new InlineKeyboard();

  const presets = [
    [18, 17, 16, 15],
    [14, 13, 12, 10]
  ];

  presets.forEach(row => {
    row.forEach(val => {
      keyboard.text(`${val}`, `wval_${majorId}_${step}_${val}`);
    });
    keyboard.row();
  });

  keyboard
    .text('🔙 رجوع للتخصص', `major_view:${majorId}`)
    .text('🏠 الرئيسية', 'menu_home');

  return keyboard;
}
