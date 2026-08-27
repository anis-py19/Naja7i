import { InlineKeyboard } from 'grammy';
import { STREAMS } from '../data/streams.js';

/**
 * Quiz stream selection keyboard
 */
export function getQuizStreamsKeyboard() {
  const keyboard = new InlineKeyboard();

  keyboard.text('🎲 كويز عشوائي عام (كل الشعب)', 'qz_play:all:all').row();

  STREAMS.forEach((stream, idx) => {
    keyboard.text(`${stream.icon} ${stream.shortName || stream.name}`, `qz_stream:${stream.id}`);
    if (idx % 2 === 1) keyboard.row();
  });

  if (STREAMS.length % 2 !== 0) keyboard.row();
  keyboard.text('🏠 الرئيسية', 'menu_home');
  return keyboard;
}

/**
 * Quiz subjects keyboard for a stream
 */
export function getQuizSubjectsKeyboard(streamId) {
  const keyboard = new InlineKeyboard();

  keyboard.text('🎲 كويز عشوائي في جميع مواد الشعبة', `qz_play:${streamId}:all`).row();

  const subjects = [
    { id: 'sciences_nat', name: 'علوم الطبيعة والحياة', icon: '🧬' },
    { id: 'physique', name: 'العلوم الفيزيائية', icon: '⚡' },
    { id: 'math', name: 'الرياضيات', icon: '📐' },
    { id: 'islamic', name: 'العلوم الإسلامية', icon: '🕌' },
    { id: 'hisgeo', name: 'التاريخ والجغرافيا', icon: '🗺️' },
    { id: 'philo', name: 'الفلسفة', icon: '🧠' },
    { id: 'arabic', name: 'اللغة العربية', icon: '📖' },
    { id: 'french', name: 'اللغة الفرنسية', icon: '🇫🇷' },
    { id: 'english', name: 'اللغة الإنجليزية', icon: '🇬🇧' }
  ];

  subjects.forEach((sub, idx) => {
    keyboard.text(`${sub.icon} ${sub.name}`, `qz_play:${streamId}:${sub.id}`);
    if (idx % 2 === 1) keyboard.row();
  });

  if (subjects.length % 2 !== 0) keyboard.row();
  keyboard
    .text('🔙 تغيير الشعبة', 'menu_quiz')
    .text('🏠 الرئيسية', 'menu_home');

  return keyboard;
}

/**
 * Keyboard with question options (A, B, C, D)
 */
export function getQuestionKeyboard(question, streamId = 'all', subjectId = 'all', answeredIndex = null) {
  const keyboard = new InlineKeyboard();
  const optionLabels = ['🅰️', '🅱️', '🅲', '🅳'];

  question.options.forEach((opt, idx) => {
    let buttonText = `${optionLabels[idx] || (idx + 1)} ${opt}`;
    
    if (answeredIndex !== null) {
      if (idx === question.correctIndex) {
        buttonText = `✅ ${opt}`;
      } else if (idx === answeredIndex) {
        buttonText = `❌ ${opt}`;
      }
    }

    keyboard.text(buttonText, `qz_ans:${question.id}:${idx}:${streamId}:${subjectId}`).row();
  });

  if (answeredIndex !== null) {
    keyboard
      .text('💡 الشرح والتعليل النموذجي', `qz_exp:${question.id}`)
      .text('سؤال تالي ⏭️', `qz_play:${streamId}:${subjectId}`).row();
  }

  keyboard
    .text('🔙 اختيار مادة', `qz_stream:${streamId === 'all' ? 'sciences' : streamId}`)
    .text('🏠 الرئيسية', 'menu_home');

  return keyboard;
}
