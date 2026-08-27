import { searchFiles, searchBacArchive } from '../dataAdapter.js';
import { InlineKeyboard } from 'grammy';

export function registerInlineQueryHandlers(bot) {
  bot.on('inline_query', async (ctx) => {
    const query = ctx.inlineQuery.query.trim();
    const results = [];

    // إذا لم يكتب شيئاً، نقترح أحدث الملفات والمواضيع
    const files = searchFiles(query || 'رياضيات', 15);
    const bacItems = searchBacArchive(query || '2024', 10);

    // 1. نتائج الملفات والملخصات
    files.forEach((file, index) => {
      const link = file.drivePreviewUrl || file.driveFileUrl || file.driveDownloadUrl || 'https://naja7i.vercel.app';
      const kb = new InlineKeyboard();
      if (link) kb.url('📥 معاينة وتحميل الملف', link);

      results.push({
        type: 'article',
        id: `file_${file.id}_${index}`,
        title: `📚 [${file.subjectName || 'ملخص'}] ${file.title}`,
        description: `شعبة: ${file.streamIds?.join(', ') || 'عام'} | الحجم: ${file.sizeReadable || file.size || 'PDF'}`,
        input_message_content: {
          message_text: `
📚 **مشاركة ملف دراسي من منصة نجاحي (Naja7i 🇩🇿)**

📑 **العنوان:** ${file.title}
📘 **المادة:** ${file.subjectName || 'عام'}
🏷️ **النوع:** ${file.category || 'ملخصات ودروس'}
👨‍🏫 **الأستاذ/المصدر:** ${file.author || 'نخبة الأساتذة'}

🔗 **رابط التحميل المباشر والمعاينة:**
${link}
          `,
          parse_mode: 'Markdown'
        },
        reply_markup: kb
      });
    });

    // 2. نتائج أرشيف البكالوريا
    bacItems.forEach((item, index) => {
      const kb = new InlineKeyboard();
      if (item.sujetUrl) kb.url('📑 الموضوع الرسمي', item.sujetUrl);
      if (item.corrigeUrl) kb.url('✅ الحل النموذجي', item.corrigeUrl);

      results.push({
        type: 'article',
        id: `bac_${item.id}_${index}`,
        title: `🏛️ بكالوريا ${item.year} — ${item.subjectName} (${item.streamName})`,
        description: `الموضوع الرسمي مع الحل النموذجي وسلم التنقيط المعتمد`,
        input_message_content: {
          message_text: `
🏛️ **موضوع بكالوريا الجزائر — دورة ${item.year}**
🎓 **الشعبة:** ${item.streamName}
📘 **المادة:** ${item.subjectName} (المعامل: ${item.coef || 2})

${item.sujetUrl ? `📑 **رابط الموضوع:** ${item.sujetUrl}\n` : ''}
${item.corrigeUrl ? `✅ **رابط التصحيح:** ${item.corrigeUrl}\n` : ''}
${item.encyUrl ? `🌐 **صفحة الأرشيف:** ${item.encyUrl}\n` : ''}
          `,
          parse_mode: 'Markdown'
        },
        reply_markup: kb
      });
    });

    await ctx.answerInlineQuery(results.slice(0, 30), {
      cache_time: 300,
      is_personal: false
    });
  });
}
