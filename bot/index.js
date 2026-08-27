import { Bot } from 'grammy';
import { CONFIG } from './config.js';

// Import Handlers
import { setupStartHandlers } from './handlers/start.js';
import { setupLibraryHandlers } from './handlers/library.js';
import { setupArchiveHandlers } from './handlers/archive.js';
import { setupCalculatorHandlers } from './handlers/calculator.js';
import { setupQuizHandlers } from './handlers/quiz.js';
import { setupPlannerHandlers } from './handlers/planner.js';
import { setupTeachersHandlers } from './handlers/teachers.js';
import { setupTipsHandlers } from './handlers/tips.js';
import { setupCurriculumHandlers } from './handlers/curriculum.js';
import { setupSearchHandlers } from './handlers/search.js';

console.log('🚀 تهيئة بوت تيليجرام نجاحي للبكالوريا (Naja7i BAC Bot)...');

const token = CONFIG.BOT_TOKEN;

if (!token) {
  console.warn('\n⚠️ [تنبيه هام]: لم يتم العثور على TELEGRAM_BOT_TOKEN في ملف .env');
  console.warn('📌 للحصول على توكن البوت:');
  console.warn('1. افتح تطبيق تيليجرام وتحدث مع @BotFather');
  console.warn('2. أرسل الأمر /newbot واتبع التعليمات لاختيار اسم البوت ومعرفه.');
  console.warn('3. انسخ الـ HTTP API Token وضعه في ملف .env كالتالي:');
  console.warn('   BOT_TOKEN="your_token_here"\n');
  console.warn('💡 تم تجهيز وهيكلة كافة ملفات البوت بنجاح! بمجرد إضافة التوكن، شغّل البوت بالأمر:');
  console.warn('   npm run bot\n');
}

export function createBot(customToken) {
  const botToken = customToken || token || 'DUMMY_TOKEN_FOR_TESTING';
  const bot = new Bot(botToken);

  // Global Error Handler
  bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`❌ خطأ أثناء معالجة التحديث ${ctx.update.update_id}:`);
    const e = err.error;
    console.error(e);
  });

  // Setup all feature handlers
  setupStartHandlers(bot);
  setupLibraryHandlers(bot);
  setupArchiveHandlers(bot);
  setupCalculatorHandlers(bot);
  setupQuizHandlers(bot);
  setupPlannerHandlers(bot);
  setupTeachersHandlers(bot);
  setupTipsHandlers(bot);
  setupCurriculumHandlers(bot);
  setupSearchHandlers(bot);

  return bot;
}

// Auto start if running directly and token exists
if (process.argv[1] && process.argv[1].endsWith('index.js')) {
  if (token) {
    const bot = createBot(token);
    console.log('✅ تم تسجيل جميع الوحدات بنجاح. جارٍ الاتصال بخوادم تيليجرام (Long Polling)...');
    bot.start({
      onStart: (botInfo) => {
        console.log(`\n🎉 البوت يعمل بنجاح تحت اسم: @${botInfo.username}`);
        console.log(`🤖 جاهز لاستقبال رسائل تلاميذ البكالوريا في الجزائر 🇩🇿\n`);
      }
    });

    // Graceful Stop
    process.once('SIGINT', () => bot.stop());
    process.once('SIGTERM', () => bot.stop());
  }
}
