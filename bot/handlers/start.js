import { getMainReplyKeyboard, getMainInlineKeyboard } from '../keyboards/mainKeyboards.js';
import { getStreamsKeyboard } from '../keyboards/streamKeyboards.js';
import { getBacCountdown } from '../utils/helpers.js';

export const WELCOME_MESSAGE = `
🎓 *مرحباً بك في بوت نجاحي للبكالوريا الجزائري 🇩🇿*
*(Naja7i BAC Telegram Bot — رفيقك نحو الامتياز في البكالوريا)*

📚 *منصة تعليمية متكاملة لجميع الشعب الست (6):*
🧬 علوم تجريبية | 📐 رياضيات | ⚙️ تقني رياضي
📊 تسيير واقتصاد | 📚 آداب وفلسفة | 🌐 لغات أجنبية

🌟 *ماذا يقدم لك البوت؟*
• 📑 *مكتبة شاملة:* أكثر من 330 ملخص وسلاسل تمارين مع روابط تحميل ومعاينة سريعة.
• 🏛️ *أرشيف البكالوريا:* مواضيع وحلول رسمية من 2008 إلى 2025/2026 لجميع المواد.
• 🧮 *حاسبة معدل البكالوريا:* حساب دقيق بالمعاملات الرسمية مع التوجيه الجامعي.
• 🎯 *بنك الأسئلة والكويز (QCM):* اختبارات تفاعلية مع شروحات نموذجية فورية.
• 📅 *مخطط المراجعة الأسبوعي:* جداول تنظيم الوقت للأحرار والمتمدرسين.
• ⏳ *عداد تنازلي للبكالوريا:* لمعرفة الوقت المتبقي بدقة وتحفيزك يومياً.
• 🎥 *دليل أساتذة اليوتيوب:* أفضل الأساتذة والقنوات وقوائم التشغيل.
• 💡 *منهجيات الإجابة ونظام كراس الأخطاء.*

👇 *اختر من القائمة أدناه أو استعمل الأزرار الدائمة في الأسفل للبدء فوراً:*
`;

export function setupStartHandlers(bot) {
  // /start command
  bot.command(['start', 'menu'], async (ctx) => {
    // Send persistent keyboard first then interactive message
    await ctx.reply('👋 مرحباً بك في بوت البكالوريا! استخدم القوائم للتنقل السريع:', {
      reply_markup: getMainReplyKeyboard()
    });

    await ctx.reply(WELCOME_MESSAGE, {
      parse_mode: 'Markdown',
      reply_markup: getMainInlineKeyboard()
    });
  });

  // /help command
  bot.command('help', async (ctx) => {
    const helpText = `
📖 *دليل أوامر واستخدام بوت البكالوريا (نجاحي):*

• /start - فتح الشاشة الرئيسية للبوت والقوائم
• /streams - تصفح الشعب الست والمكتبة
• /archive - تصفح مواضيع وحلول البكالوريا (2008-2026)
• /calc - حاسبة معدل البكالوريا التفاعلية
• /quiz - اختبارات سريعة وكويزات QCM مع الشرح
• /planner - جدول ومخطط المراجعة الأسبوعي
• /countdown - كم تبقى على امتحان البكالوريا
• /teachers - دليل أفضل أساتذة وقنوات اليوتيوب
• /tips - نصائح ومنهجية الإجابة في الامتحان
• /search <كلمة> - البحث الفوري في جميع الملفات والمواد

💡 *تلميح:* يمكنك أيضاً استخدام الأزرار الدائمة في أسفل الشاشة للتنقل بلمسة واحدة!
`;
    await ctx.reply(helpText, {
      parse_mode: 'Markdown',
      reply_markup: getMainInlineKeyboard()
    });
  });

  // /about command
  bot.command('about', async (ctx) => {
    await ctx.reply(`
🎓 *بوت نجاحي للبكالوريا (Naja7i BAC Bot 🇩🇿)*
*الإصدار:* 2.0.0 (نسخة التيليجرام المستقلة)
*الهدف:* مساعدة تلاميذ البكالوريا في الجزائر وتوفير أفضل المصادر التعليمية المجانية بدون إعلانات منبثقة أو تعقيد.

⚡ جميع الملفات والروابط مفحوصة ومأخوذة من منصة نجاحي والمنهاج الوزاري الرسمي.
دعواتكم لنا بالتوفيق والنجاح لجميع الطلبة! 🤲
`, {
      parse_mode: 'Markdown',
      reply_markup: getMainInlineKeyboard()
    });
  });

  // Callback to return home
  bot.callbackQuery('menu_home', async (ctx) => {
    await ctx.answerCallbackQuery();
    try {
      await ctx.editMessageText(WELCOME_MESSAGE, {
        parse_mode: 'Markdown',
        reply_markup: getMainInlineKeyboard()
      });
    } catch (e) {
      await ctx.reply(WELCOME_MESSAGE, {
        parse_mode: 'Markdown',
        reply_markup: getMainInlineKeyboard()
      });
    }
  });

  // Text matches from persistent reply keyboard
  bot.hears('📚 الشعب والمكتبة', async (ctx) => {
    await ctx.reply('📚 *اختر شعبتك لتصفح المواد والملخصات:*', {
      parse_mode: 'Markdown',
      reply_markup: getStreamsKeyboard('stream')
    });
  });

  bot.hears('ℹ️ حول البوت', async (ctx) => {
    await ctx.reply(`
🎓 *بوت نجاحي للبكالوريا (Naja7i BAC Bot 🇩🇿)*
*الإصدار:* 2.0.0 (نسخة التيليجرام المستقلة)
*الهدف:* مساعدة تلاميذ البكالوريا في الجزائر وتوفير أفضل المصادر التعليمية المجانية بدون إعلانات منبثقة أو تعقيد.

⚡ جميع الملفات والروابط مفحوصة ومأخوذة من منصة نجاحي والمنهاج الوزاري الرسمي.
`, {
      parse_mode: 'Markdown',
      reply_markup: getMainInlineKeyboard()
    });
  });
}
