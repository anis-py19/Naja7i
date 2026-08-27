import { InlineKeyboard } from 'grammy';
import { searchFiles, searchBacArchive } from '../dataAdapter.js';
import { CONFIG } from '../config.js';

export function registerSearchHandlers(bot) {
  // أمر البحث /search
  bot.command('search', async (ctx) => {
    const query = ctx.message.text.split(/\s+/).slice(1).join(' ').trim();

    if (!query) {
      return ctx.reply(`
🔍 **محرك البحث الذكي في منصة نجاحي 🇩🇿**

اكتب كلمة البحث بعد الأمر مباشرة:
• \`/search متتاليات\`
• \`/search تركيب البروتين\`
• \`/search فيزياء 2024\`
• \`/search مقالات فلسفة\`
      `, { parse_mode: 'Markdown' });
    }

    const files = searchFiles(query, 6);
    const bacItems = searchBacArchive(query, 4);

    if (files.length === 0 && bacItems.length === 0) {
      return ctx.reply(`❌ لم يتم العثور على نتائج تطابق \`${query}\`.\nجرب كلمات بحث أخرى مثل: \`رياضيات\`, \`دوال\`, \`2023\`, \`نووي\`.`, { parse_mode: 'Markdown' });
    }

    let resultText = `🔍 **نتائج البحث عن:** \`${query}\`\n\n`;
    const kb = new InlineKeyboard();

    if (files.length > 0) {
      resultText += `📚 **الملخصات والتمارين المكتشفة (${files.length}):**\n`;
      files.forEach((f, idx) => {
        const titleShort = f.title.length > 30 ? f.title.substring(0, 27) + '...' : f.title;
        resultText += `${idx + 1}. [${f.subjectName || 'مادة'}] ${titleShort}\n`;
        const link = f.drivePreviewUrl || f.driveDownloadUrl || f.driveFileUrl;
        if (link) {
          kb.url(`📥 فتح: ${titleShort}`, link).row();
        }
      });
      resultText += '\n';
    }

    if (bacItems.length > 0) {
      resultText += `🏛️ **مواضيع البكالوريا الرسمية (${bacItems.length}):**\n`;
      bacItems.forEach((b, idx) => {
        resultText += `• بكالوريا ${b.year} (${b.streamName}) — ${b.subjectName}\n`;
        if (b.sujetUrl) {
          kb.url(`📑 موضوع ${b.year} (${b.subjectName})`, b.sujetUrl).row();
        }
      });
    }

    kb.text('🔙 القائمة الرئيسية', 'main_menu');

    await ctx.reply(resultText, {
      parse_mode: 'Markdown',
      reply_markup: kb
    });
  });

  bot.callbackQuery('menu_search', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply(`
🔍 **طريقة البحث الفوري:**

اكتب في الشات:
\`/search <الكلمة>\`

💡 **مثال:**
\`/search ملخص المناعة\`
\`/search احتمالات\`
\`/search بكالوريا 2024\`
    `, { parse_mode: 'Markdown' });
  });
}
