import { getBacCountdown } from '../utils/helpers.js';
import { STREAM_STUDY_PLANS, PLANNING_PRINCIPLES, getStudyPlan } from '../data/planner.js';
import { STREAMS, getStreamById } from '../data/streams.js';
import { InlineKeyboard } from 'grammy';

export function setupPlannerHandlers(bot) {
  // Command /countdown
  bot.command('countdown', async (ctx) => {
    await sendCountdownMessage(ctx);
  });

  // Reply keyboard text match
  bot.hears('⏳ عداد البكالوريا', async (ctx) => {
    await sendCountdownMessage(ctx);
  });

  // Menu countdown callback
  bot.callbackQuery('menu_countdown', async (ctx) => {
    await ctx.answerCallbackQuery();
    await sendCountdownMessage(ctx, true);
  });

  async function sendCountdownMessage(ctx, isEdit = false) {
    const cd = getBacCountdown();

    const quotes = [
      '«النجاح لا يأتي بالصدفة، بل هو حصيلة انضباط يومي وتعب مستمر.» ✨',
      '«كل دقيقة تراجع فيها بتركيز اليوم، تقربك خطوة من بهجة البكالوريا وزغاريد الوالدة!» 🎓',
      '«ثق في قدراتك ولا تقارن نفسك بأحد؛ طريقك خاص ونجاحك مضمون بإذن الله.» 🌟',
      '«التعب يزول والنتائج المشرفة تبقى مدى الحياة في ذاكرتك!» 🚀'
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    const text = `
⏳ *العداد التنازلي لانطلاق شهادة البكالوريا 2026 🇩🇿*
━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 *الموعد الرسمي المستهدف:* ${cd.targetDateStr}

⏰ *الوقت المتبقي بدقة:*
🌟 *${cd.days}* يـــوم
⏱️ *${cd.hours}* ســاعة
⌛ *${cd.minutes}* دقيقــة
⚡ *${cd.seconds}* ثانيـــة

━━━━━━━━━━━━━━━━━━━━━━━━━
💭 *حكمة وتحفيز اليوم:*
${randomQuote}
`;

    const keyboard = new InlineKeyboard()
      .text('📅 مخطط المراجعة الأسبوعي', 'menu_planner').row()
      .text('🔄 تحديث العداد الآن', 'menu_countdown')
      .text('🏠 الرئيسية', 'menu_home');

    if (isEdit && ctx.callbackQuery) {
      await ctx.editMessageText(text, {
        parse_mode: 'Markdown',
        reply_markup: keyboard
      });
    } else {
      await ctx.reply(text, {
        parse_mode: 'Markdown',
        reply_markup: keyboard
      });
    }
  }

  // Command /planner
  bot.command('planner', async (ctx) => {
    await sendPlannerStreamPicker(ctx);
  });

  // Reply keyboard text match
  bot.hears('📅 مخطط المراجعة', async (ctx) => {
    await sendPlannerStreamPicker(ctx);
  });

  // Menu planner callback
  bot.callbackQuery('menu_planner', async (ctx) => {
    await ctx.answerCallbackQuery();
    await sendPlannerStreamPicker(ctx, true);
  });

  async function sendPlannerStreamPicker(ctx, isEdit = false) {
    const text = `
📅 *مخطط تنظيم المراجعة الأسبوعي — نظام الأهداف الذكي 🇩🇿*
━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 نظام مصمم خصيصاً للتلميذ الجزائري:
• بدون تقييد صارم بالساعات بالدقيقة.
• مادتان في اليوم للمتمدرس (أساسية + ثانوية).
• راحة إلزامية يوم الجمعة لاسترجاع الطاقة.

👇 *اختر شعبتك لعرض المخطط الأسبوعي المخصص:*
`;

    const keyboard = new InlineKeyboard();
    STREAMS.forEach((stream, idx) => {
      keyboard.text(`${stream.icon} ${stream.shortName || stream.name}`, `plan_stream:${stream.id}`);
      if (idx % 2 === 1) keyboard.row();
    });

    if (STREAMS.length % 2 !== 0) keyboard.row();
    keyboard.text('💡 القواعد الذهبية للتنظيم', 'plan_rules').row();
    keyboard.text('🏠 الرئيسية', 'menu_home');

    if (isEdit && ctx.callbackQuery) {
      await ctx.editMessageText(text, {
        parse_mode: 'Markdown',
        reply_markup: keyboard
      });
    } else {
      await ctx.reply(text, {
        parse_mode: 'Markdown',
        reply_markup: keyboard
      });
    }
  }

  // Study plan rules callback
  bot.callbackQuery('plan_rules', async (ctx) => {
    await ctx.answerCallbackQuery();
    let text = `💡 *القواعد الذهبية لتنظيم وقت المراجعة:* \n━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    PLANNING_PRINCIPLES.forEach((p, idx) => {
      text += `${p.icon} *${idx + 1}. ${p.title}:*\n${p.desc}\n\n`;
    });

    const kb = new InlineKeyboard()
      .text('🔙 رجوع لاختيار الشعبة', 'menu_planner')
      .text('🏠 الرئيسية', 'menu_home');

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: kb
    });
  });

  // Stream selected -> show plan (school vs free)
  bot.callbackQuery(/^plan_stream:([a-z_]+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const streamId = ctx.match[1];
    await renderPlan(ctx, streamId, 'school');
  });

  // Toggle plan type (school / free)
  bot.callbackQuery(/^plan_type:([a-z_]+):(school|free)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const streamId = ctx.match[1];
    const type = ctx.match[2];
    await renderPlan(ctx, streamId, type);
  });

  // Shortcut from stream subject menu
  bot.callbackQuery(/^stream_plan:([a-z_]+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const streamId = ctx.match[1];
    await renderPlan(ctx, streamId, 'school');
  });

  async function renderPlan(ctx, streamId, type = 'school') {
    const { streamInfo, planData } = getStudyPlan(streamId, type);
    const stream = getStreamById(streamId);

    const typeLabel = type === 'school' ? 'طالب متمدرس 🏫' : 'مترشح حر ☕';

    let text = `📅 *مخطط الأهداف الأسبوعي — ${stream.name}*\n`;
    text += `👤 *الفئة:* ${typeLabel}\n`;
    text += `⏳ *سقف المراجعة:* ${planData.maxDailyHours || 'ساعات مرنة'}\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    planData.days.forEach(d => {
      text += `📌 *يوم ${d.day}:*\n`;
      if (d.subject1) text += `  1️⃣ *${d.subject1.name}:* ${d.subject1.goal}\n`;
      if (d.subject2) text += `  2️⃣ *${d.subject2.name}:* ${d.subject2.goal}\n`;
      if (d.subject3) text += `  3️⃣ *${d.subject3.name}:* ${d.subject3.goal}\n`;
      if (d.notes) text += `  💡 _توجيه:_ ${d.notes}\n`;
      text += `\n`;
    });

    const keyboard = new InlineKeyboard();
    if (type === 'school') {
      keyboard.text('🔄 التبديل إلى مخطط الأحرار (Candidat Libre)', `plan_type:${streamId}:free`).row();
    } else {
      keyboard.text('🔄 التبديل إلى مخطط المتمدرسين (Scolarisé)', `plan_type:${streamId}:school`).row();
    }

    keyboard
      .text('🔙 اختيار شعبة أخرى', 'menu_planner')
      .text('🏠 الرئيسية', 'menu_home');

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: keyboard
    });
  }
}
