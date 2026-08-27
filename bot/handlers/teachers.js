import { YOUTUBE_TEACHERS, YOUTUBE_SUBJECTS, getTeachersBySubjectOrStream } from '../data/teachers.js';
import { getSubjectById } from '../data/streams.js';
import { InlineKeyboard } from 'grammy';

export function setupTeachersHandlers(bot) {
  // Command /teachers
  bot.command('teachers', async (ctx) => {
    await sendTeachersSubjectPicker(ctx);
  });

  // Reply keyboard match
  bot.hears('🎥 أساتذة اليوتيوب', async (ctx) => {
    await sendTeachersSubjectPicker(ctx);
  });

  // Menu callback
  bot.callbackQuery('menu_teachers', async (ctx) => {
    await ctx.answerCallbackQuery();
    await sendTeachersSubjectPicker(ctx, true);
  });

  async function sendTeachersSubjectPicker(ctx, isEdit = false) {
    const text = `
🎥 *دليل أفضل أساتذة وقنوات اليوتيوب للبكالوريا 🇩🇿*
━━━━━━━━━━━━━━━━━━━━━━━━━
تجميعة موثوقة ومختارة بعناية لأبرز الأساتذة الجزائريين مع تفصيل أسلوب الشرح وأهم السلاسل وقوائم التشغيل.

👇 *اختر المادة لعرض الأساتذة الموصى بهم:*
`;

    const keyboard = new InlineKeyboard();

    const subjects = [
      { id: 'math', name: 'الرياضيات', icon: '📐' },
      { id: 'sciences_nat', name: 'علوم الطبيعة والحياة', icon: '🧬' },
      { id: 'physique', name: 'العلوم الفيزيائية', icon: '⚡' },
      { id: 'islamic', name: 'العلوم الإسلامية', icon: '🕌' },
      { id: 'hisgeo', name: 'التاريخ والجغرافيا', icon: '🗺️' },
      { id: 'philo', name: 'الفلسفة', icon: '🧠' },
      { id: 'arabic', name: 'اللغة العربية', icon: '📖' },
      { id: 'french', name: 'اللغة الفرنسية', icon: '🇫🇷' },
      { id: 'english', name: 'اللغة الإنجليزية', icon: '🇬🇧' },
      { id: 'gestion_fin', name: 'محاسبة ومالية', icon: '💰' },
      { id: 'economy', name: 'اقتصاد وقانون', icon: '📈' },
      { id: 'genie_elec', name: 'هندسة كهربائية', icon: '⚡' },
      { id: 'genie_meca', name: 'هندسة ميكانيكية', icon: '⚙️' },
      { id: 'genie_civil', name: 'هندسة مدنية', icon: '🏗️' }
    ];

    subjects.forEach((s, idx) => {
      keyboard.text(`${s.icon} ${s.name}`, `yt_sub:${s.id}`);
      if (idx % 2 === 1) keyboard.row();
    });

    if (subjects.length % 2 !== 0) keyboard.row();
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

  // Subject selected for teachers
  bot.callbackQuery(/^yt_sub:([a-z_0-9]+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const subjectId = ctx.match[1];
    await renderTeachersList(ctx, subjectId);
  });

  // Shortcut from subject action menu
  bot.callbackQuery(/^sub_teachers:([a-z_]+):([a-z_0-9]+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const streamId = ctx.match[1];
    const subjectId = ctx.match[2];
    await renderTeachersList(ctx, subjectId);
  });

  async function renderTeachersList(ctx, subjectId) {
    const teachers = getTeachersBySubjectOrStream({ subjectId });

    if (!teachers.length) {
      const fallbackKb = new InlineKeyboard()
        .text('🔙 اختيار مادة أخرى', 'menu_teachers')
        .text('🏠 الرئيسية', 'menu_home');

      return ctx.editMessageText('ℹ️ عذراً، لا يوجد أساتذة مسجلين حالياً لهذه المادة. تفقد باقي المواد!', {
        reply_markup: fallbackKb
      });
    }

    let text = `🎥 *أفضل أساتذة اليوتيوب — مادة ${teachers[0]?.subject || subjectId}*\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    const keyboard = new InlineKeyboard();

    teachers.forEach((t, idx) => {
      text += `🌟 *${idx + 1}. ${t.name}*\n`;
      if (t.styleBadge) text += `🏷️ _${t.styleBadge}_\n`;
      if (t.pedagogy) text += `📝 *الأسلوب:* ${t.pedagogy}\n`;
      if (t.bestFor) text += `🎯 *أبرز ما يميزه:* ${t.bestFor}\n`;
      text += `\n`;

      if (t.url) {
        keyboard.url(`▶️ قناة ${t.name}`, t.url);
      }
      keyboard.row();
    });

    keyboard
      .text('🔙 رجوع لقائمة المواد', 'menu_teachers')
      .text('🏠 الرئيسية', 'menu_home');

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: keyboard
    });
  }
}
