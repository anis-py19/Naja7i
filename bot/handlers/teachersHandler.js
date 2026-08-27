import { InlineKeyboard } from 'grammy';
import { getYouTubeTeachers, getYouTubeTeacherById, getAllStreams } from '../dataAdapter.js';

export function registerTeachersHandlers(bot) {
  // أمر أساتذة اليوتيوب
  bot.command('teachers', async (ctx) => {
    await ctx.reply('🎥 **دليل قنوات وأساتذة اليوتيوب المعتمدين للبكالوريا:**\nاختر شعبتك لتصفح أفضل الأساتذة:', {
      parse_mode: 'Markdown',
      reply_markup: getTeachersStreamsKeyboard()
    });
  });

  bot.callbackQuery('menu_teachers', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.editMessageText('🎥 **دليل قنوات وأساتذة اليوتيوب المعتمدين للبكالوريا:**\nاختر شعبتك لتصفح أفضل الأساتذة:', {
      parse_mode: 'Markdown',
      reply_markup: getTeachersStreamsKeyboard()
    });
  });

  // قائمة الأساتذة حسب الشعبة
  bot.callbackQuery(/^tea_stream:(.+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const streamId = ctx.match[1];
    const teachers = getYouTubeTeachers(streamId);

    const kb = new InlineKeyboard();

    teachers.forEach((t, idx) => {
      kb.text(`${t.icon || '👨‍🏫'} ${t.name} (${t.subject})`, `tea_view:${t.id}:${streamId}`).row();
    });

    kb.text('🔙 اختيار شعبة أخرى', 'menu_teachers');

    const text = `
🎥 **نخبة أساتذة وقنوات اليوتيوب:**
تم ترتيب وتصنيف الأساتذة بناءً على المنهجية الرسمية وجودة الشرح والتمارين:
    `;

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: kb
    });
  });

  // بطاقة تفاصيل الأستاذ وقناته
  bot.callbackQuery(/^tea_view:(.+):(.+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const [teacherId, streamId] = [ctx.match[1], ctx.match[2]];
    const teacher = getYouTubeTeacherById(teacherId);

    if (!teacher) {
      return ctx.reply('⚠️ لم يتم العثور على بيانات هذا الأستاذ.');
    }

    const kb = new InlineKeyboard();
    if (teacher.url) {
      kb.url('▶️ زيارة قناة اليوتيوب الرسمية', teacher.url).row();
    }
    kb.text('🔙 العودة لقائمة الأساتذة', `tea_stream:${streamId}`);

    let playlistsText = '';
    if (teacher.topPlaylists && teacher.topPlaylists.length > 0) {
      playlistsText = '\n📂 **أهم السلاسل وقوائم التشغيل:**\n' + teacher.topPlaylists.map(p => `• ${p}`).join('\n');
    }

    const text = `
👨‍🏫 **الأستاذ:** ${teacher.name}
📘 **المادة:** ${teacher.subject}
🌟 **الأسلوب:** ${teacher.styleBadge || 'شرح مبسط ومنهجي'}

📖 **المنهجية وطريقة العمل:**
${teacher.pedagogy || 'متابعة شاملة ومستمرة لبرنامج البكالوريا.'}

🎯 **أفضل ما يركز عليه:**
${teacher.bestFor || 'جميع وحدات المنهاج والمواضيع المقترحة.'}
${playlistsText}
    `;

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: kb
    });
  });
}

function getTeachersStreamsKeyboard() {
  const streams = getAllStreams();
  const kb = new InlineKeyboard();

  kb.text('🌟 جميع الشعب والمواد', 'tea_stream:all').row();

  streams.forEach((stream, idx) => {
    kb.text(`${stream.icon} ${stream.name}`, `tea_stream:${stream.id}`);
    if (idx % 2 === 1) kb.row();
  });

  if (streams.length % 2 !== 0) kb.row();

  kb.text('🔙 القائمة الرئيسية', 'main_menu');
  return kb;
}
