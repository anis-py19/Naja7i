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
import { setupTrapsHandlers } from './handlers/traps.js';
import { setupOrientationHandlers } from './handlers/orientation.js';
import { setupFocusHandlers } from './handlers/focus.js';

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
  setupTrapsHandlers(bot);
  setupOrientationHandlers(bot);
  setupFocusHandlers(bot);

  return bot;
}

/**
 * Automatically register official Bot Commands, Descriptions, and Menus in Telegram
 */
export async function registerBotCommands(bot) {
  try {
    await bot.api.setMyCommands([
      { command: 'start', description: '🏠 الشاشة الرئيسية والقوائم' },
      { command: 'streams', description: '📚 الشعب الست والمكتبة الدراسية' },
      { command: 'archive', description: '🏛️ أرشيف البكالوريا (2008-2026)' },
      { command: 'calc', description: '🧮 حاسبة معدل البكالوريا التفاعلية' },
      { command: 'traps', description: '📓 كراس الأخطاء وفخاخ البكالوريا' },
      { command: 'orientation', description: '🎓 التوجيه والمعدل الموزون' },
      { command: 'quiz', description: '🎯 بنك الأسئلة والكويزات QCM' },
      { command: 'poll', description: '📊 استطلاع كويز تفاعلي سريع' },
      { command: 'planner', description: '📅 مخطط المراجعة الأسبوعي' },
      { command: 'countdown', description: '⏳ العداد التنازلي للبكالوريا' },
      { command: 'teachers', description: '🎥 أفضل أساتذة وقنوات اليوتيوب' },
      { command: 'focus', description: '⏱️ غرفة التركيز وبومودورو' },
      { command: 'tips', description: '💡 نصائح ومنهجيات التفوق' },
      { command: 'search', description: '🔍 بحث فوري في الملفات' },
      { command: 'help', description: '📖 دليل استخدام البوت والمساعدة' }
    ]);

    await bot.api.setMyDescription(
      '🎓 بوت نجاحي للبكالوريا الجزائري (Naja7i BAC Bot 🇩🇿)\n' +
      'رفيقك نحو الامتياز في البكالوريا لجميع الشعب الست!\n\n' +
      '📚 +330 ملخص وسلاسل تمارين محلولة\n' +
      '🏛️ مواضيع وحلول البكالوريا (2008-2026)\n' +
      '🧮 حاسبة معدل البكالوريا والمعدل الموزون\n' +
      '📓 كراس الأخطاء وفخاخ البكالوريا الشائعة\n' +
      '🎓 دليل التوجيه الجامعي والمدارس العليا\n' +
      '🎯 بنك كويزات تفاعلية وشروحات نموذجية\n' +
      '📅 مخططات مراجعة الأهداف وقنوات اليوتيوب'
    );

    await bot.api.setMyShortDescription('🎓 بوت البكالوريا الجزائري الشامل — نجاحي (Naja7i BAC DZ)');
    console.log('✅ تم تسجيل قائمة الأوامر ووصف البوت المحدث بنجاح في سيرفرات تيليجرام.');
  } catch (err) {
    console.warn('⚠️ فشل في تسجيل الأوامر التلقائية:', err.message);
  }
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
