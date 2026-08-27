import { searchStudyFiles } from '../data/files.js';
import { searchArchive } from '../data/archive.js';
import { truncate } from '../utils/helpers.js';
import { InlineKeyboard } from 'grammy';

export function setupSearchHandlers(bot) {
  // Command /search
  bot.command('search', async (ctx) => {
    const query = ctx.match;
    if (!query || !query.trim()) {
      return ctx.reply(`
🔍 *كيفية استخدام البحث السريع:*
أرسل الأمر مع كلمة البحث مباشرة:
مثال:
• \`/search متتاليات\`
• \`/search علوم إسلامية\`
• \`/search نور الدين\`
• \`/search 2024\`

أو اكتب الكلمة التي تبحث عنها هنا مباشرة في المحادثة!
`, { parse_mode: 'Markdown' });
    }

    await performSearch(ctx, query.trim());
  });

  // Reply keyboard match
  bot.hears('🔍 بحث فوري', async (ctx) => {
    await ctx.reply(`
🔍 *محرك البحث الفوري في مكتبة وأرشيف البكالوريا 🇩🇿*
━━━━━━━━━━━━━━━━━━━━━━━━━
اكتب اسم أي درس أو مادة أو أستاذ أو سنة للبحث الفوري:
(مثال: *دوال أسية*، *أستاذ قزوري*، *بكالوريا 2023*، *مقالات فلسفية*)
`, {
      parse_mode: 'Markdown',
      reply_markup: new InlineKeyboard().text('🏠 الرئيسية', 'menu_home')
    });
  });

  // Menu callback
  bot.callbackQuery('menu_search', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.editMessageText(`
🔍 *محرك البحث الفوري في مكتبة وأرشيف البكالوريا 🇩🇿*
━━━━━━━━━━━━━━━━━━━━━━━━━
أرسل كلمة البحث في الشات مباشرة:
(مثال: \`/search مناعة\` أو \`/search نووي\`)
`, {
      parse_mode: 'Markdown',
      reply_markup: new InlineKeyboard().text('🏠 الرئيسية', 'menu_home')
    });
  });

  async function performSearch(ctx, query) {
    const matchedFiles = searchStudyFiles(query, 8);
    const matchedArchive = searchArchive(query, 5);

    if (!matchedFiles.length && !matchedArchive.length) {
      return ctx.reply(`ℹ️ لم يتم العثور على نتائج مطابقة لـ "*${query}*". جرب البحث بكلمات أخرى مثل اسم المادة أو المحور.`, {
        reply_markup: new InlineKeyboard().text('🏠 الرئيسية', 'menu_home')
      });
    }

    let text = `🔍 *نتائج البحث عن:* «${query}»\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    const keyboard = new InlineKeyboard();

    if (matchedFiles.length > 0) {
      text += `📑 *الملخصات وسلاسل التمارين (${matchedFiles.length}):*\n`;
      matchedFiles.forEach((file, idx) => {
        text += `• *${idx + 1}.* ${truncate(file.title, 35)} (${file.subjectName || 'مادة'})\n`;
        const link = file.drivePreviewUrl || file.driveFileUrl || file.fileUrl;
        if (link && link.startsWith('http')) {
          keyboard.url(`📄 ${truncate(file.title, 20)}`, link).row();
        }
      });
      text += `\n`;
    }

    if (matchedArchive.length > 0) {
      text += `🏛️ *مواضيع وحلول البكالوريا الرسمية (${matchedArchive.length}):*\n`;
      matchedArchive.forEach((item) => {
        text += `• *بكالوريا ${item.year}* — ${item.subjectName} (${item.streamName})\n`;
        if (item.sujetUrl) {
          keyboard.url(`📄 موضوع ${item.year} (${item.subjectName})`, item.sujetUrl);
        }
        if (item.corrigeUrl) {
          keyboard.url(`📝 حل ${item.year}`, item.corrigeUrl);
        }
        if (item.sujetUrl || item.corrigeUrl) keyboard.row();
      });
    }

    keyboard.text('🏠 الرئيسية', 'menu_home');

    await ctx.reply(text, {
      parse_mode: 'Markdown',
      reply_markup: keyboard
    });
  }

  // Handle inline queries (@bot query in any chat)
  bot.on('inline_query', async (ctx) => {
    const query = (ctx.inlineQuery.query || '').trim();
    if (!query) return;

    try {
      const files = searchStudyFiles(query, 12);
      const results = files.map((file, idx) => {
        const link = file.driveDownloadUrl || file.driveFileUrl || file.fileUrl || 'https://naja7i-platform.vercel.app';
        return {
          type: 'article',
          id: `file_${file.id || idx}`,
          title: `📄 ${truncate(file.title || file.rawFileName, 45)}`,
          description: `📘 ${file.subjectName || ''} | 🏷️ ${file.category || 'ملخص'} | 📦 ${file.sizeReadable || 'PDF'}`,
          input_message_content: {
            message_text: `🎓 *مستند من بوت نجاحي للبكالوريا (Naja7i 🇩🇿)*\n\n📌 *العنوان:* ${file.title}\n📘 *المادة:* ${file.subjectName}\n🏷️ *التصنيف:* ${file.category || 'ملخص دراسي'}\n📦 *الحجم:* ${file.sizeReadable || file.size || 'PDF'}\n\n📥 [اضغط هنا لتحميل أو معاينة المستند عبر Google Drive](${link})`,
            parse_mode: 'Markdown'
          }
        };
      });

      await ctx.answerInlineQuery(results, { cache_time: 15 });
    } catch (err) {
      console.error('Error in inline_query:', err);
    }
  });

  // Handle free text messages if they are not bot commands
  bot.on('message:text', async (ctx, next) => {
    const text = ctx.message.text.trim();
    // Skip if command or keyboard button
    if (text.startsWith('/') || text.includes('📚') || text.includes('🏛️') || text.includes('🧮') || text.includes('🎯') || text.includes('📅') || text.includes('⏳') || text.includes('🎥') || text.includes('💡') || text.includes('🔍') || text.includes('ℹ️')) {
      return next();
    }

    if (text.length >= 2) {
      await performSearch(ctx, text);
    } else {
      return next();
    }
  });
}
