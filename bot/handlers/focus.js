import { getRandomFocusTip, BAC_FOCUS_TIPS } from '../data/focus.js';
import { InlineKeyboard } from 'grammy';

export function setupFocusHandlers(bot) {
  // Command /focus or /pomodoro
  bot.command(['focus', 'pomodoro'], async (ctx) => {
    await sendFocusRoom(ctx);
  });

  // Reply keyboard match
  bot.hears('⏱️ جلسة تركيز وبومودورو', async (ctx) => {
    await sendFocusRoom(ctx);
  });

  // Menu callback
  bot.callbackQuery('menu_focus', async (ctx) => {
    await ctx.answerCallbackQuery();
    await sendFocusRoom(ctx, true);
  });

  async function sendFocusRoom(ctx, isEdit = false) {
    const tip = getRandomFocusTip();

    const text = `
⏱️ *غرفة التركيز وبومودورو البكالوريا (Focus Room) 🧠*
━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 *تقنية بومودورو الذهبية:*
• 25 دقيقة مراجعة عميقة بدون هاتف 📵
• 5 دقائق استراحة لتجديد طاقة الدماغ ☕

💡 *نصيحة تركيز لجلستك الحالية:*
${tip?.icon || '🌟'} *${tip?.category || 'نصيحة'}:*
_${tip?.text || 'أبعد هاتفك وابدأ فوراً؛ الانضباط اليومي هو سر الامتياز.'}_

━━━━━━━━━━━━━━━━━━━━━━━━━
👇 اختر إجراء لبدء جلستك:
`;

    const keyboard = new InlineKeyboard()
      .text('💡 نصيحة تركيز جديدة', 'focus_tip_rand').row()
      .text('📅 مخطط المراجعة الأسبوعي', 'menu_planner')
      .text('⏳ عداد البكالوريا', 'menu_countdown').row()
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

  // Random focus tip
  bot.callbackQuery('focus_tip_rand', async (ctx) => {
    await ctx.answerCallbackQuery('نصيحة جديدة!');
    await sendFocusRoom(ctx, true);
  });
}
