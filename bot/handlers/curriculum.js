import { getCurriculumBySubject } from '../data/curriculum.js';
import { getSubjectById, getStreamById } from '../data/streams.js';
import { InlineKeyboard } from 'grammy';

export function setupCurriculumHandlers(bot) {
  // Shortcut from subject action menu
  bot.callbackQuery(/^sub_curriculum:([a-z_]+):([a-z_0-9]+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const streamId = ctx.match[1];
    const subjectId = ctx.match[2];

    const stream = getStreamById(streamId);
    const subject = getSubjectById(streamId, subjectId);
    const cur = getCurriculumBySubject(subjectId);

    const keyboard = new InlineKeyboard()
      .text('🔙 رجوع للمادة', `subject:${streamId}:${subjectId}`)
      .text('🏠 الرئيسية', 'menu_home');

    if (!cur) {
      return ctx.editMessageText(`ℹ️ المنهاج الوزاري لمادة *${subject?.name || subjectId}* متاح ضمن الملخصات وسلاسل التمارين.`, {
        parse_mode: 'Markdown',
        reply_markup: keyboard
      });
    }

    let text = `📋 *المنهاج والتدرج الوزاري الرسمي لمادة: ${cur.name}*\n`;
    text += `🏫 *الشعبة:* ${stream.name}\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    cur.trimesters.forEach((trim) => {
      text += `🌟 *${trim.trimester}:*\n`;
      trim.units.forEach(u => {
        text += `  • ${u}\n`;
      });
      text += `\n`;
    });

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: keyboard
    });
  });
}
