import { Keyboard, InlineKeyboard } from 'grammy';
import { STREAMS } from '../data/streams.js';

/**
 * Main Persistent Reply Keyboard (Bottom Bar)
 */
export function getMainReplyKeyboard() {
  return new Keyboard()
    .text('📚 الشعب والمكتبة').text('🏛️ أرشيف البكالوريا').row()
    .text('🧮 حاسبة المعدل').text('🎯 بنك الأسئلة والكويز').row()
    .text('📅 مخطط المراجعة').text('⏳ عداد البكالوريا').row()
    .text('🎥 أساتذة اليوتيوب').text('💡 نصائح ومنهجيات').row()
    .text('🔍 بحث فوري').text('ℹ️ حول البوت')
    .resized()
    .persistent();
}

/**
 * Main Inline Keyboard (Home Menu)
 */
export function getMainInlineKeyboard() {
  return new InlineKeyboard()
    .text('📚 الشعب والمكتبة الدراسية', 'menu_streams').row()
    .text('🏛️ أرشيف البكالوريا (2008-2026)', 'menu_archive').row()
    .text('🧮 حاسبة معدل البكالوريا', 'menu_calculator')
    .text('🎯 بنك الأسئلة والكويز', 'menu_quiz').row()
    .text('📅 مخطط المراجعة الأسبوعي', 'menu_planner')
    .text('⏳ عداد البكالوريا', 'menu_countdown').row()
    .text('🎥 أساتذة وقنوات اليوتيوب', 'menu_teachers')
    .text('💡 نصائح ومنهجية الإجابة', 'menu_tips').row()
    .text('🔍 بحث فوري في الملفات', 'menu_search');
}
