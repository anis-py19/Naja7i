import { InlineKeyboard } from 'grammy';
import { getStreamsInlineKeyboard } from '../keyboards/streamKeyboard.js';
import { getStreamById, getSubjectsForStream, getFilesForStream, getFileById } from '../dataAdapter.js';
import { CONFIG } from '../config.js';

export function registerLibraryHandlers(bot) {
  // أمر المكتبة /library و القائمة
  bot.command('library', async (ctx) => {
    await ctx.reply('📚 **المكتبة والدروس:** اختر شعبتك لتصفح الملفات والملخصات:', {
      parse_mode: 'Markdown',
      reply_markup: getStreamsInlineKeyboard('lib_stream')
    });
  });

  bot.callbackQuery('menu_library', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.editMessageText('📚 **المكتبة والدروس:** اختر شعبتك لتصفح الملفات والملخصات والسلاسل:', {
      parse_mode: 'Markdown',
      reply_markup: getStreamsInlineKeyboard('lib_stream')
    });
  });

  // اختيار الشعبة -> عرض قائمة المواد
  bot.callbackQuery(/^lib_stream:(.+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const streamId = ctx.match[1];
    const stream = getStreamById(streamId);

    if (!stream) {
      return ctx.reply('⚠️ عذراً، لم يتم العثور على بيانات هذه الشعبة.');
    }

    const subjects = getSubjectsForStream(streamId);
    const kb = new InlineKeyboard();

    subjects.forEach((sub, idx) => {
      kb.text(`${sub.icon || '📖'} ${sub.name}`, `lib_sub:${streamId}:${sub.id}:1`);
      if (idx % 2 === 1) kb.row();
    });

    if (subjects.length % 2 !== 0) kb.row();

    kb.text('📁 عرض جميع ملفات الشعبة', `lib_all:${streamId}:1`).row();
    kb.text('🔙 اختيار شعبة أخرى', 'menu_library');

    const text = `
📚 **مكتبة ${stream.name} ${stream.icon}**
اختر المادة التي تريد استعراض ملخصاتها وسلاسلها:
    `;

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: kb
    });
  });

  // عرض ملفات المادة مع الترقيم (Pagination)
  bot.callbackQuery(/^lib_sub:(.+):(.+):(\d+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const [streamId, subjectId, pageStr] = [ctx.match[1], ctx.match[2], ctx.match[3]];
    const page = parseInt(pageStr, 10) || 1;
    const stream = getStreamById(streamId);

    const files = getFilesForStream(streamId, subjectId);
    const totalFiles = files.length;
    const pageSize = CONFIG.PAGINATION_LIMIT || 5;
    const totalPages = Math.ceil(totalFiles / pageSize) || 1;
    const startIdx = (page - 1) * pageSize;
    const currentFiles = files.slice(startIdx, startIdx + pageSize);

    const kb = new InlineKeyboard();

    if (currentFiles.length === 0) {
      kb.text('🔙 العودة للمواد', `lib_stream:${streamId}`);
      return ctx.editMessageText(`ℹ️ لا توجد ملفات متوفرة حالياً لهذه المادة في شعبة ${stream?.name || ''}.`, {
        reply_markup: kb
      });
    }

    currentFiles.forEach((file) => {
      const titleShort = file.title.length > 32 ? file.title.substring(0, 29) + '...' : file.title;
      kb.text(`📄 ${titleShort}`, `lib_file:${file.id}:${streamId}:${subjectId}:${page}`).row();
    });

    // أزرار الترقيم
    if (totalPages > 1) {
      if (page > 1) {
        kb.text('⬅️ السابق', `lib_sub:${streamId}:${subjectId}:${page - 1}`);
      }
      kb.text(`📄 ${page} / ${totalPages}`, 'noop');
      if (page < totalPages) {
        kb.text('التالي ➡️', `lib_sub:${streamId}:${subjectId}:${page + 1}`);
      }
      kb.row();
    }

    kb.text('🔙 قائمة المواد', `lib_stream:${streamId}`);

    const subName = currentFiles[0]?.subjectName || subjectId;
    const text = `
📚 **ملخصات ومذكرات:** ${subName}
🎓 **الشعبة:** ${stream?.name} (${totalFiles} ملف متاح)

اضغط على أي ملف لعرض التفاصيل وروابط التحميل والمعاينة المباشرة:
    `;

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: kb
    });
  });

  // عرض جميع ملفات الشعبة
  bot.callbackQuery(/^lib_all:(.+):(\d+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const [streamId, pageStr] = [ctx.match[1], ctx.match[2]];
    const page = parseInt(pageStr, 10) || 1;
    const stream = getStreamById(streamId);

    const files = getFilesForStream(streamId);
    const totalFiles = files.length;
    const pageSize = CONFIG.PAGINATION_LIMIT || 5;
    const totalPages = Math.ceil(totalFiles / pageSize) || 1;
    const startIdx = (page - 1) * pageSize;
    const currentFiles = files.slice(startIdx, startIdx + pageSize);

    const kb = new InlineKeyboard();

    currentFiles.forEach((file) => {
      const titleShort = file.title.length > 30 ? file.title.substring(0, 27) + '...' : file.title;
      kb.text(`📄 [${file.subjectName || 'مادة'}] ${titleShort}`, `lib_file:${file.id}:${streamId}:all:${page}`).row();
    });

    if (totalPages > 1) {
      if (page > 1) {
        kb.text('⬅️ السابق', `lib_all:${streamId}:${page - 1}`);
      }
      kb.text(`📄 ${page} / ${totalPages}`, 'noop');
      if (page < totalPages) {
        kb.text('التالي ➡️', `lib_all:${streamId}:${page + 1}`);
      }
      kb.row();
    }

    kb.text('🔙 العودة لقائمة المواد', `lib_stream:${streamId}`);

    const text = `
📁 **جميع ملفات شعبة:** ${stream?.name} (${totalFiles} ملف)
    `;

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: kb
    });
  });

  // تفاصيل ملف محدد ورابط الفتح والتحميل
  bot.callbackQuery(/^lib_file:(.+):(.+):(.+):(\d+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const [fileId, streamId, subId, page] = [ctx.match[1], ctx.match[2], ctx.match[3], ctx.match[4]];
    const file = getFileById(fileId);

    if (!file) {
      return ctx.reply('⚠️ لم يتم العثور على هذا الملف.');
    }

    const kb = new InlineKeyboard();

    if (file.drivePreviewUrl || file.driveFileUrl) {
      kb.url('👁️ معاينة وقراءة الملف', file.drivePreviewUrl || file.driveFileUrl).row();
    }
    if (file.driveDownloadUrl) {
      kb.url('📥 تحميل مباشر (Google Drive)', file.driveDownloadUrl).row();
    }
    if (CONFIG.WEB_APP_URL) {
      kb.webApp('📖 فتح في مستعرض نجاحي', `${CONFIG.WEB_APP_URL}/library`).row();
    }

    const backAction = subId === 'all' ? `lib_all:${streamId}:${page}` : `lib_sub:${streamId}:${subId}:${page}`;
    kb.text('🔙 العودة لقائمة الملفات', backAction);

    const fileDetails = `
📑 **عنوان الملف:**
${file.title}

📘 **المادة:** ${file.subjectName || 'عام'}
🏷️ **النوع:** ${file.category || 'ملخصات ودروس'}
👨‍🏫 **المصدر/الأستاذ:** ${file.author || 'أساتذة متميزون'}
📦 **الحجم التقريبي:** ${file.sizeReadable || file.size || 'ملف PDF'}

💡 يمكنك فتح الملف للمعاينة المباشرة أو تحميله فوراً لجهازك عبر الأزرار أدناه:
    `;

    await ctx.editMessageText(fileDetails, {
      parse_mode: 'Markdown',
      reply_markup: kb
    });
  });
}
