import { getMainReplyKeyboard, getMainInlineKeyboard } from '../keyboards/mainKeyboards.js';
import { getStreamsKeyboard } from '../keyboards/streamKeyboards.js';

export const WELCOME_MESSAGE = `
🎓 *مرحباً بك في بوت نجاحي للبكالوريا الجزائري 🇩🇿*
*(Naja7i BAC Telegram Bot — رفيقك نحو الامتياز في البكالوريا)*

📚 *منصة تعليمية متكاملة لجميع الشعب الست (6):*
🧬 علوم تجريبية | 📐 رياضيات | ⚙️ تقني رياضي
📊 تسيير واقتصاد | 📚 آداب وفلسفة | 🌐 لغات أجنبية

🌟 *ماذا يقدم لك البوت في التحديث الجديد؟*
• 📑 *مكتبة شاملة:* أكثر من 330 ملخص وسلاسل تمارين مع روابط تحميل ومعاينة سريعة.
• 🏛️ *أرشيف البكالوريا:* مواضيع وحلول رسمية من 2008 إلى 2025/2026 لجميع المواد.
• 🧮 *حاسبة معدل البكالوريا والمعدل الموزون:* بالمعاملات وقوانين التوجيه الجامعي.
• 📓 *كراس الأخطاء الذكي:* فخاخ البكالوريا الشائعة المتكررة في الامتحانات وطرق تفاديها.
• 🎓 *دليل التوجيه الجامعي:* شروط المدارس الوطنية العليا (ENSIA, ESI, Polytech, Med...).
• 🎯 *بنك الأسئلة والكويز (QCM):* اختبارات تفاعلية واستطلاعات مع شروحات نموذجية.
• ⏱️ *غرفة التركيز وبومودورو:* نصائح المذاكرة الفعالة ومحاربة التسويف.
• 📅 *مخطط المراجعة الأسبوعي:* جداول تنظيم الأهداف للأحرار والمتمدرسين.
• ⏳ *عداد تنازلي للبكالوريا:* لمعرفة الوقت المتبقي بدقة وتحفيزك يومياً.
• 🎥 *دليل أساتذة اليوتيوب:* أفضل الأساتذة والقنوات وقوائم التشغيل.

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
• /traps - كراس الأخطاء وفخاخ البكالوريا الشائعة
• /orientation - التوجيه الجامعي وحساب المعدل الموزون
• /quiz - اختبارات سريعة وكويزات QCM مع الشرح
• /poll - استطلاع تفاعلي سريع بنظام تيليجرام
• /focus - غرفة التركيز وبومودورو
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
*الإصدار:* 2.2.0 (التحديث الشامل 2026)
*الهدف:* رفيق تلميذ البكالوريا في الجزائر لتوفير أفضل المصادر التعليمية والمعدلات الموزونة وفخاخ المنهجية مجاناً وبدون إعلانات.

⚡ جميع الملفات والروابط مفحوصة ومأخوذة من المنهاج الوزاري الرسمي ومنصة نجاحي.
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
*الإصدار:* 2.2.0 (التحديث الشامل 2026)
*الهدف:* مساعدة تلاميذ البكالوريا في الجزائر وتوفير أفضل المصادر التعليمية وفخاخ المنهجية وحاسبات المعدلات مجاناً.
`, {
      parse_mode: 'Markdown',
      reply_markup: getMainInlineKeyboard()
    });
  });
}
