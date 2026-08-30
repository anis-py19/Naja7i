import { Keyboard, InlineKeyboard } from 'grammy';

/**
 * Main Persistent Reply Keyboard (Bottom Bar)
 */
export function getMainReplyKeyboard() {
  return new Keyboard()
    .text('📚 الشعب والمكتبة').text('🏛️ أرشيف البكالوريا').row()
    .text('🧮 حاسبة المعدل').text('🎯 بنك الأسئلة والكويز').row()
    .text('📓 كراس الأخطاء والفخاخ').text('🎓 التوجيه والمعدل الموزون').row()
    .text('📅 مخطط المراجعة').text('⏳ عداد البكالوريا').row()
    .text('🎥 أساتذة اليوتيوب').text('⏱️ جلسة تركيز وبومودورو').row()
    .text('💡 نصائح ومنهجيات').text('🔍 بحث فوري').row()
    .text('ℹ️ حول البوت')
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
    .text('📓 كراس الأخطاء وفخاخ البكالوريا', 'menu_traps').row()
    .text('🎓 التوجيه الجامعي والمعدل الموزون', 'menu_orientation').row()
    .text('📅 مخطط المراجعة الأسبوعي', 'menu_planner')
    .text('⏳ عداد البكالوريا', 'menu_countdown').row()
    .text('🎥 أساتذة وقنوات اليوتيوب', 'menu_teachers')
    .text('⏱️ جلسة تركيز وبومودورو', 'menu_focus').row()
    .text('💡 نصائح ومنهجية الإجابة', 'menu_tips')
    .text('🔍 بحث فوري في الملفات', 'menu_search');
}
