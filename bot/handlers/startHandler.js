import { getMainMenuInlineKeyboard, getMainMenuReplyKeyboard } from '../keyboards/mainKeyboard.js';
import { getStreamsInlineKeyboard } from '../keyboards/streamKeyboard.js';
import { getBacYearsKeyboard } from './bacHandler.js';
import { getQuizStartKeyboard } from './quizHandler.js';
import { sendCountdownMessage } from './plannerHandler.js';
import { CONFIG } from '../config.js';

export function registerStartHandlers(bot) {
  // أمر البداية /start
  bot.command('start', async (ctx) => {
    const userName = ctx.from?.first_name || 'طالبنا العزيز';
    
    const welcomeText = `
🎓 **مرحباً بك يا ${userName} في بوت منصة نجاحي (Naja7i 🇩🇿)**

رفيقك الشامل والمتكامل للتحضير لشهادة البكالوريا عبر جميع الشعب الست 🚀

📌 **ماذا يقدم لك البوت؟**
• 📚 **المكتبة والدروس:** مئات الملخصات، المذكرات، وسلاسل التمارين المحلولة.
• 🏛️ **أرشيف البكالوريا (2008-2026):** مواضيع وحلول نموذجية وسلم التنقيط الرسمي.
• ⏱️ **كويزات تفاعلية:** أسئلة QCM موقوتة مع الشرح النموذجي المعتمد.
• 🧮 **حاسبة المعدل:** حساب دقيق لمعدل البكالوريا بالمعاملات الرسمية.
• 🎥 **أساتذة اليوتيوب:** دليل أفضل القنوات والمدرسين الجزائريين.
• 📅 **مخطط المراجعة:** جدول تنظيم الوقت والعد التنازلي للبكالوريا.

👇 **اختر من القائمة أدناه أو استخدم الأزرار السريعة للبدء:**
    `;

    await ctx.reply('✨ أهلاً بك في فضاء النجاح والامتياز!', {
      reply_markup: getMainMenuReplyKeyboard()
    });

    await ctx.reply(welcomeText, {
      parse_mode: 'Markdown',
      reply_markup: getMainMenuInlineKeyboard()
    });
  });

  // أمر المساعدة /help
  bot.command('help', async (ctx) => {
    const helpText = `
📖 **دليل أوامر واستخدام بوت نجاحي (Naja7i):**

🔹 /start - فتح القائمة الرئيسية للخدمات
🔹 /library - تصفح مكتبة الدروس والملخصات والتمارين
🔹 /bac - أرشيف مواضيع وحلول البكالوريا (2008-2026)
🔹 /quiz - بدء كويز واختبار تفاعلي سريع
🔹 /calc - حاسبة معدل البكالوريا والمعاملات
🔹 /teachers - دليل قنوات وأساتذة اليوتيوب
🔹 /planner - مخطط المراجعة الأسبوعي
🔹 /countdown - العد التنازلي لبكالوريا 2026
🔹 /search <كلمة> - بحث سريع في كامل المكتبة والأرشيف

💡 **ميزة البحث السريع في المحادثات (Inline Search):**
يمكنك كتابة \`@${ctx.me?.username || 'Naja7iBot'} الدوال\` في أي شات مع زملائك للبحث ومشاركة الملفات فوراً!
    `;

    await ctx.reply(helpText, {
      parse_mode: 'Markdown',
      reply_markup: getMainMenuInlineKeyboard()
    });
  });

  // العودة للقائمة الرئيسية عبر Callback Query
  bot.callbackQuery('main_menu', async (ctx) => {
    await ctx.answerCallbackQuery();
    const mainText = `
🏠 **القائمة الرئيسية — منصة نجاحي (Naja7i)**

اختر القسم الذي ترغب في استكشافه:
    `;

    try {
      await ctx.editMessageText(mainText, {
        parse_mode: 'Markdown',
        reply_markup: getMainMenuInlineKeyboard()
      });
    } catch {
      await ctx.reply(mainText, {
        parse_mode: 'Markdown',
        reply_markup: getMainMenuInlineKeyboard()
      });
    }
  });

  // استجابة للأزرار النصية (Reply Keyboard)
  bot.hears('📚 المكتبة والدروس', async (ctx) => {
    await ctx.reply('📚 **المكتبة والدروس:** اختر شعبتك لتصفح الملفات والملخصات:', {
      parse_mode: 'Markdown',
      reply_markup: getStreamsInlineKeyboard('lib_stream')
    });
  });

  bot.hears('🏛️ أرشيف البكالوريا', async (ctx) => {
    await ctx.reply('🏛️ **أرشيف مواضيع وحلول البكالوريا (2008-2026):**\nاختر السنة المطلوبة:', {
      parse_mode: 'Markdown',
      reply_markup: getBacYearsKeyboard(1)
    });
  });

  bot.hears('⏱️ كويز تفاعلي', async (ctx) => {
    await ctx.reply('⏱️ **بنك الكويزات التفاعلية:** اختر نمط الاختبار:', {
      parse_mode: 'Markdown',
      reply_markup: getQuizStartKeyboard()
    });
  });

  bot.hears('🧮 حاسبة المعدل', async (ctx) => {
    await ctx.reply('🧮 **حاسبة معدل البكالوريا:** اختر شعبتك لعرض المعاملات وحساب المعدل:', {
      parse_mode: 'Markdown',
      reply_markup: getStreamsInlineKeyboard('calc_stream')
    });
  });

  bot.hears('🎥 أساتذة اليوتيوب', async (ctx) => {
    await ctx.reply('🎥 **دليل أساتذة وقنوات اليوتيوب:** اختر الشعبة:', {
      parse_mode: 'Markdown',
      reply_markup: getStreamsInlineKeyboard('tea_stream')
    });
  });

  bot.hears('📅 مخطط المراجعة', async (ctx) => {
    await ctx.reply('📅 **مخطط المراجعة الأسبوعي:** اختر شعبتك لعرض البرنامج:', {
      parse_mode: 'Markdown',
      reply_markup: getStreamsInlineKeyboard('plan_stream')
    });
  });

  bot.hears('⏳ العد التنازلي', async (ctx) => {
    await sendCountdownMessage(ctx, false);
  });

  bot.hears('🔍 بحث فوري', async (ctx) => {
    await ctx.reply('🔍 **البحث السريع:**\nاكتب الأمر التالي متبوعاً بالكلمة التي تبحث عنها:\n\nمثال:\n`/search الدوال الأسية`\nأو\n`/search فيزياء نووي`', {
      parse_mode: 'Markdown'
    });
  });
}
