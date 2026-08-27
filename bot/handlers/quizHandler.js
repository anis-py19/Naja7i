import { InlineKeyboard } from 'grammy';
import { getRandomQuiz, getQuizById, getStreamById } from '../dataAdapter.js';
import { getStreamsInlineKeyboard } from '../keyboards/streamKeyboard.js';

export function getQuizStartKeyboard() {
  return new InlineKeyboard()
    .text('🎲 كويز عشوائي سريع', 'quiz_rand').row()
    .text('🧬 علوم الطبيعة والحياة', 'quiz_sub:sciences_nat').row()
    .text('⚡ العلوم الفيزيائية', 'quiz_sub:physique').row()
    .text('📐 الرياضيات', 'quiz_sub:math').row()
    .text('🕌 العلوم الإسلامية', 'quiz_sub:islamic').row()
    .text('🗺️ التاريخ والجغرافيا', 'quiz_sub:hisgeo').row()
    .text('🤔 الفلسفة', 'quiz_sub:philo').row()
    .text('🔙 القائمة الرئيسية', 'main_menu');
}

export function formatQuizMessage(q) {
  const letters = ['A', 'B', 'C', 'D'];
  const diffBadge = q.difficulty === 'easy' ? '🟢 سهل' : q.difficulty === 'medium' ? '🟡 متوسط' : '🔴 دقيق/متقدم';

  let text = `
🎯 **تحدي كويز البكالوريا — ${q.subjectName || 'اختبار تفاعلي'}**
🏷️ **الوحدة:** ${q.unitName || 'البرنامج الرسمي'} | **المستوى:** ${diffBadge}

❓ **السؤال:**
**${q.question}**

🔢 **الخيارات:**
`;

  q.options.forEach((opt, idx) => {
    text += `\n**[${letters[idx]}]** ${opt}`;
  });

  text += `\n\n👇 *اختر الإجابة الصحيحة بالضغط على الزر المناسب أدناه:*`;

  const kb = new InlineKeyboard();
  q.options.forEach((_, idx) => {
    kb.text(`[ ${letters[idx]} ]`, `quiz_ans:${q.id}:${idx}`);
  });
  kb.row();
  kb.text('🔄 سؤال آخر', `quiz_next:${q.subjectId || 'all'}`).text('🔙 قائمة الكويزات', 'menu_quiz');

  return { text, kb };
}

export function registerQuizHandlers(bot) {
  // أمر /quiz
  bot.command('quiz', async (ctx) => {
    await ctx.reply('⏱️ **بنك الأسئلة والكويزات التفاعلية للبكالوريا:**\nاختر نمط الاختبار للبدء فوراً:', {
      parse_mode: 'Markdown',
      reply_markup: getQuizStartKeyboard()
    });
  });

  bot.callbackQuery('menu_quiz', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.editMessageText('⏱️ **بنك الأسئلة والكويزات التفاعلية للبكالوريا:**\nاختر نمط الاختبار للبدء فوراً:', {
      parse_mode: 'Markdown',
      reply_markup: getQuizStartKeyboard()
    });
  });

  // كويز عشوائي
  bot.callbackQuery('quiz_rand', async (ctx) => {
    await ctx.answerCallbackQuery();
    const q = getRandomQuiz();
    if (!q) return ctx.reply('⚠️ لا توجد أسئلة متوفرة حالياً.');

    const { text, kb } = formatQuizMessage(q);
    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: kb
    });
  });

  // كويز لمادة معينة
  bot.callbackQuery(/^quiz_sub:(.+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const subjectId = ctx.match[1];
    const q = getRandomQuiz(null, subjectId);

    if (!q) {
      return ctx.editMessageText('⚠️ لا توجد أسئلة متوفرة لهذه المادة حالياً.', {
        reply_markup: getQuizStartKeyboard()
      });
    }

    const { text, kb } = formatQuizMessage(q);
    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: kb
    });
  });

  // السؤال التالي
  bot.callbackQuery(/^quiz_next:(.+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const subjectId = ctx.match[1];
    const q = subjectId === 'all' ? getRandomQuiz() : getRandomQuiz(null, subjectId);

    if (!q) return ctx.reply('⚠️ تعذر تحميل السؤال.');

    const { text, kb } = formatQuizMessage(q);
    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: kb
    });
  });

  // استلام إجابة الطالب وفحصها
  bot.callbackQuery(/^quiz_ans:(.+):(\d+)$/, async (ctx) => {
    const [qId, selectedIdxStr] = [ctx.match[1], ctx.match[2]];
    const selectedIdx = parseInt(selectedIdxStr, 10);
    const q = getQuizById(qId);

    if (!q) {
      await ctx.answerCallbackQuery({ text: '⚠️ انتهت صلاحية هذا السؤال.' });
      return;
    }

    const isCorrect = selectedIdx === q.correctIndex;
    const letters = ['A', 'B', 'C', 'D'];

    if (isCorrect) {
      await ctx.answerCallbackQuery({
        text: '🎉 إجابة صحيحة! أحسنت وممتاز!',
        show_alert: false
      });
    } else {
      await ctx.answerCallbackQuery({
        text: '❌ إجابة خاطئة! راجع الشرح والتعليل النموذجي.',
        show_alert: false
      });
    }

    const resultHeader = isCorrect 
      ? `✅ **إجابة صحيحة وممتازة! 🎉**` 
      : `❌ **إجابة غير صحيحة!**\nالصواب هو الخيار **[${letters[q.correctIndex]}]**: ${q.options[q.correctIndex]}`;

    let resultText = `
${resultHeader}

❓ **السؤال:** ${q.question}

📘 **مادة:** ${q.subjectName || ''} | **الوحدة:** ${q.unitName || ''}

💡 **التعليل والشرح النموذجي المعتمد وزارياً:**
${q.explanation || 'تم اعتماد هذا السؤال بناء على معايير المنهاج والتصحيح الرسمي لبكالوريا الجزائر.'}
    `;

    const kb = new InlineKeyboard()
      .text('🔄 سؤال آخر في نفس المادة', `quiz_next:${q.subjectId || 'all'}`).row()
      .text('🎲 سؤال عشوائي جديد', 'quiz_rand').row()
      .text('🔙 اختيار مادة أخرى', 'menu_quiz');

    await ctx.editMessageText(resultText, {
      parse_mode: 'Markdown',
      reply_markup: kb
    });
  });
}
