import { InlineKeyboard, Keyboard } from 'grammy';
import { CONFIG } from '../config.js';

/**
 * لوحة المفاتيح الرئيسية الثابتة (Reply Keyboard)
 */
export function getMainMenuReplyKeyboard() {
  return new Keyboard()
    .text('📚 المكتبة والدروس').text('🏛️ أرشيف البكالوريا')
    .row()
    .text('⏱️ كويز تفاعلي').text('🧮 حاسبة المعدل')
    .row()
    .text('🎥 أساتذة اليوتيوب').text('📅 مخطط المراجعة')
    .row()
    .text('⏳ العد التنازلي').text('🔍 بحث فوري')
    .row()
    .webApp('🌐 فتح المنصة (Mini App)', CONFIG.WEB_APP_URL)
    .resized();
}

/**
 * لوحة القائمة الرئيسية المضمنة (Inline Keyboard)
 */
export function getMainMenuInlineKeyboard() {
  const kb = new InlineKeyboard()
    .text('📚 المكتبة المدرسية', 'menu_library')
    .text('🏛️ أرشيف البكالوريا', 'menu_bac')
    .row()
    .text('⏱️ كويزات تفاعلية', 'menu_quiz')
    .text('🧮 حاسبة المعدل', 'menu_calc')
    .row()
    .text('🎥 أساتذة اليوتيوب', 'menu_teachers')
    .text('📅 مخطط المراجعة', 'menu_planner')
    .row()
    .text('⏳ العد التنازلي للباك', 'menu_countdown')
    .text('🔍 بحث فوري', 'menu_search');

  if (CONFIG.WEB_APP_URL) {
    kb.row().webApp('🚀 فتح منصة نجاحي كاملة (Mini App)', CONFIG.WEB_APP_URL);
  }

  return kb;
}
