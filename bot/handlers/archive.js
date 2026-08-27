import { getArchiveStreamsKeyboard, getArchiveYearsKeyboard, getArchiveSubjectsKeyboard } from '../keyboards/archiveKeyboards.js';
import { getArchiveForStreamAndYear, BAC_FULL_ARCHIVE } from '../data/archive.js';
import { getStreamById, getSubjectById } from '../data/streams.js';
import { InlineKeyboard } from 'grammy';

export function setupArchiveHandlers(bot) {
  // Command /archive
  bot.command('archive', async (ctx) => {
    await ctx.reply('🏛️ *أرشيف مواضيع وحلول البكالوريا الرسمية (2008 - 2026):*\n\nاختر الشعبة لعرض السنوات والمواد:', {
      parse_mode: 'Markdown',
      reply_markup: getArchiveStreamsKeyboard()
    });
  });

  // Reply keyboard text match
  bot.hears('🏛️ أرشيف البكالوريا', async (ctx) => {
    await ctx.reply('🏛️ *أرشيف مواضيع وحلول البكالوريا الرسمية (2008 - 2026):*\n\nاختر الشعبة لعرض السنوات والمواد:', {
      parse_mode: 'Markdown',
      reply_markup: getArchiveStreamsKeyboard()
    });
  });

  // Menu archive callback
  bot.callbackQuery('menu_archive', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.editMessageText('🏛️ *أرشيف مواضيع وحلول البكالوريا الرسمية (2008 - 2026):*\n\nاختر الشعبة لعرض السنوات والمواد:', {
      parse_mode: 'Markdown',
      reply_markup: getArchiveStreamsKeyboard()
    });
  });

  // Stream selected -> Show years grid
  bot.callbackQuery(/^arc_stream:([a-z_]+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const streamId = ctx.match[1];
    const stream = getStreamById(streamId);

    const text = `
${stream.icon} *أرشيف ${stream.name}*
اختر السنة لعرض جميع مواضيع وحلول مواد هذه الشعبة (2008 - 2025/2026):
`;

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: getArchiveYearsKeyboard(streamId)
    });
  });

  // Stream archive shortcut from stream page
  bot.callbackQuery(/^stream_archive:([a-z_]+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const streamId = ctx.match[1];
    const stream = getStreamById(streamId);

    const text = `
${stream.icon} *أرشيف مواضيع وحلول: ${stream.name}*
اختر دورة البكالوريا (السنة):
`;

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: getArchiveYearsKeyboard(streamId)
    });
  });

  // Year selected -> Show subject topics & solutions
  bot.callbackQuery(/^arc_year:([a-z_]+):(\d+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const streamId = ctx.match[1];
    const year = parseInt(ctx.match[2], 10);
    const stream = getStreamById(streamId);

    const items = getArchiveForStreamAndYear(streamId, year);

    if (!items.length) {
      const fallbackKb = new InlineKeyboard()
        .text('🔙 رجوع للسنوات', `arc_stream:${streamId}`)
        .text('🏠 الرئيسية', 'menu_home');

      return ctx.editMessageText(`ℹ️ لم تتوفر بعد مواضيع مرفوعة لدورة *${year}* لشعبة *${stream.name}*.`, {
        parse_mode: 'Markdown',
        reply_markup: fallbackKb
      });
    }

    let text = `🏛️ *مواضيع وحلول بكالوريا ${year}*\n`;
    text += `🏫 *الشعبة:* ${stream.name}\n`;
    text += `━━━━━━━━━━━━━━━━━━━━\n`;
    text += `اضغط على زر *📄 الموضوع* أو *📝 التصحيح النموذجي* لكل مادة:\n\n`;

    items.forEach(it => {
      text += `• *${it.subjectName}* (معامل ${it.coef || '-'})\n`;
    });

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: getArchiveSubjectsKeyboard(streamId, year, items)
    });
  });

  // Subject archive shortcut from subject action menu
  bot.callbackQuery(/^sub_archive:([a-z_]+):([a-z_0-9]+):(\d+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const streamId = ctx.match[1];
    const subjectId = ctx.match[2];
    const stream = getStreamById(streamId);
    const subject = getSubjectById(streamId, subjectId);

    const matches = BAC_FULL_ARCHIVE.filter(item => {
      return item.streamId === streamId && (item.subjectId === subjectId || (item.subjectName && item.subjectName.includes(subject?.name || '')));
    }).slice(0, 10);

    const keyboard = new InlineKeyboard();

    matches.forEach(m => {
      keyboard.text(`📅 بكالوريا ${m.year} - ${m.subjectName}`, `arc_year:${streamId}:${m.year}`).row();
      if (m.sujetUrl) keyboard.url(`📄 موضوع ${m.year}`, m.sujetUrl);
      if (m.corrigeUrl) keyboard.url(`📝 حل ${m.year}`, m.corrigeUrl);
      if (m.sujetUrl || m.corrigeUrl) keyboard.row();
    });

    keyboard
      .text('🔙 رجوع للمادة', `subject:${streamId}:${subjectId}`)
      .text('🏠 الرئيسية', 'menu_home');

    const text = `
🏛️ *أرشيف مواضيع البكالوريا لمادة: ${subject?.name || subjectId}*
🏫 *الشعبة:* ${stream.name}

👇 اختر الدورة لتحميل موضوع الامتحان والحل النموذجي مع سلم التنقيط:
`;

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: keyboard
    });
  });
}
