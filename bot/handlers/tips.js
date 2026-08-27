import { BAC_TIPS, getTipById } from '../data/tips.js';
import { InlineKeyboard } from 'grammy';

export function setupTipsHandlers(bot) {
  // Command /tips
  bot.command('tips', async (ctx) => {
    await sendTipsMenu(ctx);
  });

  // Reply keyboard match
  bot.hears('💡 نصائح ومنهجيات', async (ctx) => {
    await sendTipsMenu(ctx);
  });

  // Menu callback
  bot.callbackQuery('menu_tips', async (ctx) => {
    await ctx.answerCallbackQuery();
    await sendTipsMenu(ctx, true);
  });

  async function sendTipsMenu(ctx, isEdit = false) {
    const text = `
💡 *دليل نصائح ومنهجيات التفوق في البكالوريا 🇩🇿*
━━━━━━━━━━━━━━━━━━━━━━━━━
توجيهات عملية مجربة من الأوائل والمفتشين لضمان أعلى النقاط في الامتحان الرسمي.

👇 *اختر الموضوع الذي تريد قراءته:*
`;

    const keyboard = new InlineKeyboard();

    BAC_TIPS.forEach(tip => {
      keyboard.text(`${tip.icon} ${tip.title}`, `tip_view:${tip.id}`).row();
    });

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

  // View specific tip
  bot.callbackQuery(/^tip_view:([a-z_]+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const tipId = ctx.match[1];
    const tip = getTipById(tipId);

    if (!tip) {
      return ctx.reply('⚠️ لم يتم العثور على النصيحة المطلوبة.');
    }

    const keyboard = new InlineKeyboard()
      .text('🔙 رجوع لدليل النصائح', 'menu_tips')
      .text('🏠 الرئيسية', 'menu_home');

    await ctx.editMessageText(tip.content, {
      parse_mode: 'Markdown',
      reply_markup: keyboard
    });
  });
}
