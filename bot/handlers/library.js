import { getStreamsKeyboard, getStreamSubjectsKeyboard, getSubjectActionKeyboard } from '../keyboards/streamKeyboards.js';
import { getPaginatedFilesKeyboard } from '../keyboards/pagination.js';
import { getStreamById, getSubjectById } from '../data/streams.js';
import { getFilesByStreamAndSubject, USER_STUDY_FILES } from '../data/files.js';
import { truncate } from '../utils/helpers.js';
import { InlineKeyboard } from 'grammy';

export function setupLibraryHandlers(bot) {
  // Command /streams
  bot.command('streams', async (ctx) => {
    await ctx.reply('📚 *اختر شعبتك لتصفح المواد والمكتبة الدراسية:*', {
      parse_mode: 'Markdown',
      reply_markup: getStreamsKeyboard('stream')
    });
  });

  // Callback menu_streams
  bot.callbackQuery('menu_streams', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.editMessageText('📚 *اختر شعبتك لتصفح المواد والمكتبة الدراسية:*', {
      parse_mode: 'Markdown',
      reply_markup: getStreamsKeyboard('stream')
    });
  });

  // Stream selected -> Show subjects
  bot.callbackQuery(/^stream:([a-z_]+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const streamId = ctx.match[1];
    const stream = getStreamById(streamId);

    const text = `
${stream.icon} *${stream.name}*
_${stream.frenchName}_

📝 *الوصف:* ${stream.description}
⭐ *المواد الأساسية:* ${stream.subjects.filter(s => s.isMain).map(s => s.name).join('، ')}

👇 *اختر مادة للوصول إلى الملخصات، التمارين، البكالوريات، والكويزات:*
`;

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: getStreamSubjectsKeyboard(streamId)
    });
  });

  // Subject selected -> Show options (ملخصات، تمارين، أرشيف، كويز، أساتذة، منهاج)
  bot.callbackQuery(/^subject:([a-z_]+):([a-z_0-9]+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const streamId = ctx.match[1];
    const subjectId = ctx.match[2];

    const stream = getStreamById(streamId);
    const subject = getSubjectById(streamId, subjectId);

    if (!subject) {
      return ctx.reply('⚠️ تعذر العثور على المادة المطلوبة.');
    }

    const text = `
${subject.icon || '📘'} *مادة: ${subject.name}*
🏫 *الشعبة:* ${stream.name}
⚖️ *المعامل الرسمي:* ${subject.coef} ${subject.isMain ? '(مادة أساسية ⭐)' : '(مادة ثانوية)'}

👇 *ماذا تريد أن تتصفح في هذه المادة؟*
`;

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: getSubjectActionKeyboard(streamId, subjectId)
    });
  });

  // Files list with pagination
  bot.callbackQuery(/^files:([a-z_]+):([a-z_0-9]+):([a-z_]+):(\d+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const streamId = ctx.match[1];
    const subjectId = ctx.match[2];
    const category = ctx.match[3]; // 'summaries' | 'exercises' | 'all'
    const page = parseInt(ctx.match[4], 10) || 1;

    const stream = getStreamById(streamId);
    const subject = getSubjectById(streamId, subjectId);
    const allFiles = getFilesByStreamAndSubject(streamId, subjectId);

    if (!allFiles.length) {
      const emptyKb = new InlineKeyboard()
        .text('🔙 رجوع للمادة', `subject:${streamId}:${subjectId}`)
        .text('🏠 الرئيسية', 'menu_home');

      return ctx.editMessageText(`ℹ️ لم يتم العثور على ملفات مخصصة لمادة *${subject?.name || subjectId}* حالياً، تفقد باقي المواد أو استخدم محرك البحث.`, {
        parse_mode: 'Markdown',
        reply_markup: emptyKb
      });
    }

    const { keyboard, currentPage, totalPages, totalItems, pageItems } = getPaginatedFilesKeyboard(
      allFiles,
      page,
      5,
      `files:${streamId}:${subjectId}:${category}`,
      `subject:${streamId}:${subjectId}`
    );

    let text = `📚 *مكتبة ملفات مادة: ${subject?.name || subjectId}*\n`;
    text += `🏫 *الشعبة:* ${stream?.name}\n`;
    text += `📊 *إجمالي الملفات:* ${totalItems} ملف | صفحة ${currentPage} من ${totalPages}\n\n`;

    pageItems.forEach((f, idx) => {
      const num = (currentPage - 1) * 5 + idx + 1;
      text += `*${num}.* 📄 *${truncate(f.title, 40)}*\n`;
      text += `   🏷️ *النوع:* ${f.category || 'ملخص'} | 📦 *الحجم:* ${f.sizeReadable || f.size || 'PDF'}\n`;
      if (f.author) text += `   ✍️ *المؤلف/الأستاذ:* ${f.author}\n`;
      text += `\n`;
    });

    text += `👇 *اضغط على أزرار المعاينة أو التحميل المباشر أدناه:*`;

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: keyboard
    });
  });

  // Single file view
  bot.callbackQuery(/^fview:([a-z0-9_]+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const fileId = ctx.match[1];
    const file = USER_STUDY_FILES.find(f => f.id === fileId);

    if (!file) {
      return ctx.reply('⚠️ تعذر العثور على تفاصيل الملف.');
    }

    const previewUrl = file.drivePreviewUrl || file.driveFileUrl || file.fileUrl;
    const downloadUrl = file.driveDownloadUrl || file.driveFileUrl || file.fileUrl;

    const keyboard = new InlineKeyboard();
    if (previewUrl && previewUrl.startsWith('http')) {
      keyboard.url('👁️ معاينة سريعة بالمتصفح', previewUrl);
    }
    if (downloadUrl && downloadUrl.startsWith('http')) {
      keyboard.url('📥 تحميل مباشر (Google Drive)', downloadUrl);
    }
    keyboard.row().text('🏠 الرئيسية', 'menu_home');

    const text = `
📄 *تفاصيل المستند:*
━━━━━━━━━━━━━━━━━━
📌 *العنوان:* ${file.title || file.rawFileName}
📘 *المادة:* ${file.subjectName || 'عام'}
🏷️ *التصنيف:* ${file.category || 'ملخص دراسي'}
📦 *الحجم:* ${file.sizeReadable || file.size || 'PDF'}
✍️ *المعد / الأستاذ:* ${file.author || 'نخبة من الأساتذة'}

👇 *اضغط على الزر أدناه لمعاينة أو تحميل المستند فوراً:*
`;

    await ctx.reply(text, {
      parse_mode: 'Markdown',
      reply_markup: keyboard
    });
  });
}
