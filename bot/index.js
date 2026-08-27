import { Bot, GrammyError, HttpError } from 'grammy';
import { CONFIG } from './config.js';
import { registerStartHandlers } from './handlers/startHandler.js';
import { registerLibraryHandlers } from './handlers/libraryHandler.js';
import { registerBacHandlers } from './handlers/bacHandler.js';
import { registerQuizHandlers } from './handlers/quizHandler.js';
import { registerCalcHandlers } from './handlers/calcHandler.js';
import { registerTeachersHandlers } from './handlers/teachersHandler.js';
import { registerPlannerHandlers } from './handlers/plannerHandler.js';
import { registerSearchHandlers } from './handlers/searchHandler.js';
import { registerInlineQueryHandlers } from './handlers/inlineQueryHandler.js';

console.log('---------------------------------------------------------');
console.log('🤖 جاري تهيئة وتشغيل بوت منصة نجاحي (Naja7i Telegram Bot)...');
console.log('---------------------------------------------------------');

if (!CONFIG.BOT_TOKEN) {
  console.error('\n❌ خطأ: لم يتم العثور على TELEGRAM_BOT_TOKEN أو BOT_TOKEN.');
  console.log('📌 للتشغيل:');
  console.log('1. احصل على توكن البوت من @BotFather في تيليجرام.');
  console.log('2. أضف التوكن في ملف .env:');
  console.log('   BOT_TOKEN=1234567890:ABCdefGhIJKlmNoPQRsTUVwxyZ');
  console.log('3. أعد تشغيل الأمر: npm run bot\n');
  process.exit(0);
}

// إنشاء نسخة البوت
const bot = new Bot(CONFIG.BOT_TOKEN);

// تسجيل معالجات الأقسام والخدمات
registerStartHandlers(bot);
registerLibraryHandlers(bot);
registerBacHandlers(bot);
registerQuizHandlers(bot);
registerCalcHandlers(bot);
registerTeachersHandlers(bot);
registerPlannerHandlers(bot);
registerSearchHandlers(bot);
registerInlineQueryHandlers(bot);

// معالجة الأخطاء الشاملة
bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`❌ خطأ أثناء معالجة التحديث ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error('خطأ في استدعاء Telegram API:', e.description);
  } else if (e instanceof HttpError) {
    console.error('تعذر الاتصال بخوادم تيليجرام:', e);
  } else {
    console.error('خطأ غير معروف:', e);
  }
});

// تعيين قائمة الأوامر الرسمية في تيليجرام
async function setupBotCommands() {
  try {
    await bot.api.setMyCommands([
      { command: 'start', description: '🏠 القائمة الرئيسية والترحيب' },
      { command: 'library', description: '📚 تصفح مكتبة الدروس والملخصات' },
      { command: 'bac', description: '🏛️ مواضيع وحلول البكالوريا (2008-2026)' },
      { command: 'quiz', description: '⏱️ كويزات واختبارات تفاعلية سريعة' },
      { command: 'calc', description: '🧮 حاسبة معدل البكالوريا والمعاملات' },
      { command: 'teachers', description: '🎥 دليل أساتذة وقنوات اليوتيوب' },
      { command: 'planner', description: '📅 مخطط المراجعة الأسبوعي' },
      { command: 'countdown', description: '⏳ العد التنازلي لبكالوريا 2026' },
      { command: 'search', description: '🔍 بحث سريع في كامل المنصة' },
      { command: 'help', description: '📖 دليل المساعدة والأوامر' },
    ]);
    console.log('✅ تم تسجيل قائمة أوامر البوت الرسمية في تيليجرام بنجاح.');
  } catch (err) {
    console.warn('⚠️ تعذر تسجيل قائمة الأوامر:', err.message);
  }
}

// بدء تشغيل البوت
async function startBot() {
  await setupBotCommands();
  
  const botInfo = await bot.api.getMe();
  console.log(`\n🚀 تم تشغيل البوت بنجاح!`);
  console.log(`👤 اسم البوت: @${botInfo.username} (${botInfo.first_name})`);
  console.log(`🌐 Mini App URL: ${CONFIG.WEB_APP_URL}`);
  console.log(`⚡ البوت الآن في وضع الاستماع للتحديثات (Long Polling)...\n`);

  bot.start();
}

startBot().catch((err) => {
  if (err instanceof GrammyError && err.error_code === 401) {
    console.error('\n❌ فشل تشغيل البوت: رمز التوكن (BOT_TOKEN) غير صالح أو تم إلغاؤه (401 Unauthorized).');
    console.error('📌 يرجى التحقق من صحة التوكن في ملف .env وتحديثه من @BotFather.\n');
  } else {
    console.error('❌ فشل تشغيل البوت:', err);
  }
});
