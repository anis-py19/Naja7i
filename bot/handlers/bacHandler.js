import { InlineKeyboard } from 'grammy';
import { getBacArchiveYears, getBacArchiveByYear, getBacArchiveItem, getStreamById, getAllStreams } from '../dataAdapter.js';
import { CONFIG } from '../config.js';

export function getBacYearsKeyboard(page = 1) {
  const years = getBacArchiveYears();
  const pageSize = 8;
  const totalPages = Math.ceil(years.length / pageSize) || 1;
  const startIdx = (page - 1) * pageSize;
  const currentYears = years.slice(startIdx, startIdx + pageSize);

  const kb = new InlineKeyboard();

  currentYears.forEach((year, idx) => {
    const isNew = Number(year) >= 2025 ? ' 🌟' : '';
    kb.text(`📅 دورة ${year}${isNew}`, `bac_yr:${year}`);
    if (idx % 2 === 1) kb.row();
  });

  if (currentYears.length % 2 !== 0) kb.row();

  // أزرار الترقيم
  if (totalPages > 1) {
    if (page > 1) {
      kb.text('⬅️ أحدث', `bac_ypage:${page - 1}`);
    }
    kb.text(`📄 ${page} / ${totalPages}`, 'noop');
    if (page < totalPages) {
      kb.text('أقدم ➡️', `bac_ypage:${page + 1}`);
    }
    kb.row();
  }

  kb.text('🔙 القائمة الرئيسية', 'main_menu');
  return kb;
}

export function registerBacHandlers(bot) {
  // أمر أرشيف البكالوريا
  bot.command('bac', async (ctx) => {
    await ctx.reply('🏛️ **أرشيف مواضيع وحلول البكالوريا الرسمية (2008 - 2026):**\nاختر سنة الدورة المطلوبة:', {
      parse_mode: 'Markdown',
      reply_markup: getBacYearsKeyboard(1)
    });
  });

  bot.callbackQuery('menu_bac', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.editMessageText('🏛️ **أرشيف مواضيع وحلول البكالوريا الرسمية (2008 - 2026):**\nاختر سنة الدورة المطلوبة:', {
      parse_mode: 'Markdown',
      reply_markup: getBacYearsKeyboard(1)
    });
  });

  // تقليب صفحات السنوات
  bot.callbackQuery(/^bac_ypage:(\d+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const page = parseInt(ctx.match[1], 10) || 1;
    await ctx.editMessageText('🏛️ **أرشيف مواضيع وحلول البكالوريا الرسمية (2008 - 2026):**\nاختر سنة الدورة المطلوبة:', {
      parse_mode: 'Markdown',
      reply_markup: getBacYearsKeyboard(page)
    });
  });

  // اختيار السنة -> عرض الشعب المتوفرة
  bot.callbackQuery(/^bac_yr:(\d+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const year = ctx.match[1];
    const streams = getAllStreams();

    const kb = new InlineKeyboard();

    streams.forEach((stream, idx) => {
      kb.text(`${stream.icon} ${stream.name}`, `bac_st:${year}:${stream.id}`);
      if (idx % 2 === 1) kb.row();
    });

    if (streams.length % 2 !== 0) kb.row();

    kb.text('🔙 اختيار دورة أخرى', 'menu_bac');

    const is2026 = Number(year) === 2026;
    const desc = is2026 ? '*(الدورة المرتقبة — تشمل المواضيع النموذجية والتوقعات الوزارية)*' : '*(المواضيع الرسمية + التصحيحات النموذجية الكاملة)*';

    const text = `
🏛️ **بكالوريا دورة ${year}** ${desc}
اختر الشعبة لعرض المواد ومواضيعها:
    `;

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: kb
    });
  });

  // اختيار الشعبة لسنة محددة -> عرض قائمة المواد
  bot.callbackQuery(/^bac_st:(\d+):(.+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const [year, streamId] = [ctx.match[1], ctx.match[2]];
    const stream = getStreamById(streamId);
    const items = getBacArchiveByYear(year, streamId);

    const kb = new InlineKeyboard();

    if (items.length === 0) {
      kb.text('🔙 العودة للشعب', `bac_yr:${year}`);
      return ctx.editMessageText(`ℹ️ جاري تجهيز وفهرسة مواضيع دورة ${year} لشعبة ${stream?.name || ''}.`, {
        reply_markup: kb
      });
    }

    items.forEach((item, idx) => {
      kb.text(`📖 ${item.subjectName}`, `bac_item:${year}:${streamId}:${item.subjectId}`);
      if (idx % 2 === 1) kb.row();
    });

    if (items.length % 2 !== 0) kb.row();

    kb.text('🔙 اختيار شعبة أخرى', `bac_yr:${year}`);

    const text = `
🏛️ **دورة ${year} — ${stream?.name} ${stream?.icon || ''}**
اختر المادة لتحميل الموضوع الرسمي والتصحيح وسلم التنقيط:
    `;

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: kb
    });
  });

  // تفاصيل موضوع البكالوريا والحل النموذجي
  bot.callbackQuery(/^bac_item:(\d+):(.+):(.+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const [year, streamId, subjectId] = [ctx.match[1], ctx.match[2], ctx.match[3]];
    const item = getBacArchiveItem(year, streamId, subjectId);
    const stream = getStreamById(streamId);

    if (!item) {
      return ctx.reply('⚠️ لم يتم العثور على بيانات هذا الموضوع.');
    }

    const kb = new InlineKeyboard();

    if (item.sujetUrl) {
      kb.url('📑 تحميل الموضوع (PDF / مباشر)', item.sujetUrl).row();
    }
    if (item.corrigeUrl) {
      kb.url('✅ تحميل الحل النموذجي وسلم التنقيط', item.corrigeUrl).row();
    }
    if (item.encyUrl) {
      kb.url('🌐 فتح في أرشيف Ency-Education', item.encyUrl).row();
    }
    if (CONFIG.WEB_APP_URL) {
      kb.webApp('🚀 فتح مستعرض البكالوريا (Naja7i)', `${CONFIG.WEB_APP_URL}/bac-archive`).row();
    }

    kb.text('🔙 العودة لقائمة المواد', `bac_st:${year}:${streamId}`);

    const isUpcoming = item.isUpcoming;
    const text = `
🏛️ **موضوع بكالوريا الجزائر — دورة ${year}**
🎓 **الشعبة:** ${stream?.name || item.streamName}
📘 **المادة:** ${item.subjectName} (المعامل: ${item.coef || 2})
📊 **مستوى الموضوع:** ${item.difficulty || 'شامل ومطابق للبرنامج الوزاري'}
${isUpcoming ? '\n⏳ *ملاحظة: دورة 2026 قيد التحضير، الروابط تتضمن النماذج الوزارية والتوقعات الرسمية.*' : ''}

👇 يمكنك تحميل الموضوع والحل النموذجي مباشرة من الأزرار:
    `;

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: kb
    });
  });
}
