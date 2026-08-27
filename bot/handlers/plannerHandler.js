import { InlineKeyboard } from 'grammy';
import { getStreamsInlineKeyboard } from '../keyboards/streamKeyboard.js';
import { getStudyPlan, getStreamById } from '../dataAdapter.js';
import { CONFIG } from '../config.js';

export async function sendCountdownMessage(ctx, isEdit = false) {
  const targetDate = new Date(CONFIG.BAC_TARGET_DATE);
  const now = new Date();
  const diffTime = targetDate - now;

  let countdownText = '';
  if (diffTime > 0) {
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

    countdownText = `
⏳ **العد التنازلي الرسمي لامتحانات شهادة البكالوريا 2026 🇩🇿**

🎯 **الموعد المرتقب:** \`${targetDate.toLocaleDateString('ar-DZ', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}\`

⏱️ **الوقت المتبقي:**
🔥 **${days}** يوم  |  ⏰ **${hours}** ساعة  |  ⏳ **${minutes}** دقيقة

💪 **رسالة تحفيزية لليوم:**
"كل ساعة تقضيها اليوم في المراجعة والتركيز هي استثمار حقيقي في مستقبلك وفرحة والديك يوم إعلان النتائج.. توكل على الله وانطلق بقوة!" 🌟
    `;
  } else {
    countdownText = `
🎉 **انطلقت دورة بكالوريا 2026!**
نسأل الله التوفيق والنجاح والسداد لجميع أبنائنا وبناتنا التلاميذ! 🇩🇿✨
    `;
  }

  const kb = new InlineKeyboard()
    .text('📅 مخطط المراجعة الأسبوعي', 'menu_planner').row()
    .text('🔙 القائمة الرئيسية', 'main_menu');

  if (isEdit) {
    await ctx.editMessageText(countdownText, {
      parse_mode: 'Markdown',
      reply_markup: kb
    });
  } else {
    await ctx.reply(countdownText, {
      parse_mode: 'Markdown',
      reply_markup: kb
    });
  }
}

export function registerPlannerHandlers(bot) {
  // أمر المخطط
  bot.command('planner', async (ctx) => {
    await ctx.reply('📅 **مخطط المراجعة الأسبوعي المنظم حسب الشعبة:**\nاختر شعبتك لعرض جدول تنظيم الوقت وإنجاز الأهداف:', {
      parse_mode: 'Markdown',
      reply_markup: getStreamsInlineKeyboard('plan_stream')
    });
  });

  bot.callbackQuery('menu_planner', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.editMessageText('📅 **مخطط المراجعة الأسبوعي المنظم حسب الشعبة:**\nاختر شعبتك لعرض جدول تنظيم الوقت وإنجاز الأهداف:', {
      parse_mode: 'Markdown',
      reply_markup: getStreamsInlineKeyboard('plan_stream')
    });
  });

  // أمر العد التنازلي
  bot.command('countdown', async (ctx) => {
    await sendCountdownMessage(ctx, false);
  });

  bot.callbackQuery('menu_countdown', async (ctx) => {
    await ctx.answerCallbackQuery();
    await sendCountdownMessage(ctx, true);
  });

  // عرض مخطط الشعبة
  bot.callbackQuery(/^plan_stream:(.+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const streamId = ctx.match[1];
    const plan = getStudyPlan(streamId);
    const stream = getStreamById(streamId);

    if (!plan || !plan.school) {
      return ctx.reply('⚠️ لا يتوفر مخطط مفصل لهذه الشعبة حالياً.');
    }

    let planText = `
📅 **مخطط المراجعة الأسبوعي — ${plan.streamName || stream?.name} ${plan.icon || ''}**
⏱️ **السقف اليومي:** ${plan.school.maxDailyHours || '3 ساعات يومياً'}
🎯 **الاستراتيجية:** ${plan.school.dailyGoalDesc || 'مادتان يومياً: أساسية + ثانوية'}

📌 **برنامج الأسبوع (السبت إلى الجمعة):**
`;

    plan.school.days.forEach(d => {
      planText += `\n🗓️ **يوم ${d.day}:**\n`;
      planText += `  1️⃣ **${d.subject1.name}:** ${d.subject1.goal}\n`;
      planText += `  2️⃣ **${d.subject2.name}:** ${d.subject2.goal}\n`;
      if (d.notes) planText += `  💡 _${d.notes}_\n`;
    });

    const kb = new InlineKeyboard()
      .text('⏳ العد التنازلي للباك', 'menu_countdown').row()
      .text('🔙 اختيار شعبة أخرى', 'menu_planner');

    await ctx.editMessageText(planText, {
      parse_mode: 'Markdown',
      reply_markup: kb
    });
  });
}
