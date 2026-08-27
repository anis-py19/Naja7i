import { getQuizStreamsKeyboard, getQuizSubjectsKeyboard, getQuestionKeyboard } from '../keyboards/quizKeyboards.js';
import { getRandomQuestion, getQuestionById, QUIZ_QUESTIONS } from '../data/quizzes.js';
import { getStreamById, getSubjectById } from '../data/streams.js';
import { InlineKeyboard } from 'grammy';

export function setupQuizHandlers(bot) {
  // Command /quiz
  bot.command('quiz', async (ctx) => {
    await ctx.reply('🎯 *بنك الأسئلة والاختبارات التفاعلية السريعة (QCM)* 🇩🇿\n\nوفق المنهاج الوزاري الرسمي؛ اختبر معلوماتك مع الشرح الفوري للإجابات:', {
      parse_mode: 'Markdown',
      reply_markup: getQuizStreamsKeyboard()
    });
  });

  // Command /poll - Native Telegram Quiz Poll
  bot.command('poll', async (ctx) => {
    const question = getRandomQuestion();
    if (!question) {
      return ctx.reply('ℹ️ لا توجد أسئلة متوفرة حالياً.');
    }

    try {
      const explanationText = question.explanation ? question.explanation.slice(0, 195) : undefined;
      await ctx.replyWithPoll(
        `📚 [${question.subjectName}] ${question.question}`.slice(0, 290),
        question.options.map(opt => opt.slice(0, 95)),
        {
          type: 'quiz',
          correct_option_id: question.correctIndex,
          explanation: explanationText,
          is_anonymous: false
        }
      );
    } catch (e) {
      console.error('Error sending native poll:', e);
      await startQuizRound(ctx, 'all', 'all');
    }
  });

  // Reply keyboard match
  bot.hears('🎯 بنك الأسئلة والكويز', async (ctx) => {
    await ctx.reply('🎯 *بنك الأسئلة والاختبارات التفاعلية السريعة (QCM)* 🇩🇿\n\nوفق المنهاج الوزاري الرسمي؛ اختبر معلوماتك مع الشرح الفوري للإجابات:', {
      parse_mode: 'Markdown',
      reply_markup: getQuizStreamsKeyboard()
    });
  });

  // Menu callback
  bot.callbackQuery('menu_quiz', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.editMessageText('🎯 *بنك الأسئلة والاختبارات التفاعلية السريعة (QCM)* 🇩🇿\n\nاختر الشعبة أو المادة لبدء التحدي:', {
      parse_mode: 'Markdown',
      reply_markup: getQuizStreamsKeyboard()
    });
  });

  // Stream selected for quiz -> Show subjects
  bot.callbackQuery(/^qz_stream:([a-z_]+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const streamId = ctx.match[1];
    const stream = getStreamById(streamId);

    const text = `
🎯 *كويز واختبارات: ${stream?.name || 'جميع الشعب'}*
اختر المادة التي تريد اختبار نفسك فيها:
`;

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: getQuizSubjectsKeyboard(streamId)
    });
  });

  // Shortcut from subject action menu
  bot.callbackQuery(/^sub_quiz:([a-z_]+):([a-z_0-9]+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const streamId = ctx.match[1];
    const subjectId = ctx.match[2];
    await startQuizRound(ctx, streamId, subjectId);
  });

  // Start question round
  bot.callbackQuery(/^qz_play:([a-z_]+):([a-z_0-9]+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const streamId = ctx.match[1];
    const subjectId = ctx.match[2];
    await startQuizRound(ctx, streamId, subjectId);
  });

  async function startQuizRound(ctx, streamId, subjectId) {
    const question = getRandomQuestion({
      streamId: streamId === 'all' ? null : streamId,
      subjectId: subjectId === 'all' ? null : subjectId
    });

    if (!question) {
      const emptyKb = new InlineKeyboard()
        .text('🔙 تغيير المادة', `qz_stream:${streamId === 'all' ? 'sciences' : streamId}`)
        .text('🏠 الرئيسية', 'menu_home');

      return ctx.editMessageText('ℹ️ عذراً، لا توجد أسئلة متوفرة حالياً لهذا التحديد. جرب مادة أخرى!', {
        reply_markup: emptyKb
      });
    }

    let text = `🎯 *تحدي البكالوريا السريع — QCM*\n`;
    text += `📘 *المادة:* ${question.subjectName || 'مادة عامة'}\n`;
    if (question.unitName) text += `📌 *الوحدة:* ${question.unitName}\n`;
    text += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    text += `❓ *السؤال:*\n${question.question}\n\n`;
    text += `👇 *اختر الإجابة الصحيحة من الخيارات أدناه:*`;

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: getQuestionKeyboard(question, streamId, subjectId, null)
    });
  }

  // Answer selected by user
  bot.callbackQuery(/^qz_ans:([a-z0-9_]+):(\d+):([a-z_]+):([a-z_0-9]+)$/, async (ctx) => {
    const qId = ctx.match[1];
    const userChoice = parseInt(ctx.match[2], 10);
    const streamId = ctx.match[3];
    const subjectId = ctx.match[4];

    const question = getQuestionById(qId);
    if (!question) {
      return ctx.answerCallbackQuery('⚠️ انتهت صلاحية هذا السؤال.');
    }

    const isCorrect = userChoice === question.correctIndex;
    if (isCorrect) {
      await ctx.answerCallbackQuery('🎉 إجابة صحيحة وممتازة! أحسنت!');
    } else {
      await ctx.answerCallbackQuery('❌ للأسف إجابة غير صحيحة! تفقد التعليل النموذجي.');
    }

    let text = `🎯 *نتيجة الإجابة:*\n`;
    text += isCorrect ? `✅ *إجابة صحيحة 100%! أحسنت يا بطل!*\n\n` : `❌ *إجابة خاطئة! لا بأس، المهم أن نتعلم من الخطأ!*\n\n`;
    text += `📘 *المادة:* ${question.subjectName}\n`;
    text += `❓ *السؤال:*\n${question.question}\n\n`;
    text += `🎯 *الإجابة النموذجية المعتمدة:*\n✅ \`${question.options[question.correctIndex]}\`\n\n`;
    text += `👇 *اضغط على زر الشرح والتعليل لقراءة التوضيح الوزاري المفصل:*`;

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: getQuestionKeyboard(question, streamId, subjectId, userChoice)
    });
  });

  // Explanation viewer
  bot.callbackQuery(/^qz_exp:([a-z0-9_]+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const qId = ctx.match[1];
    const question = getQuestionById(qId);

    if (!question || !question.explanation) {
      return ctx.reply('ℹ️ لا يتوفر شرح إضافي لهذا السؤال.');
    }

    const text = `
💡 *الشرح والتعليل النموذجي الوزاري:*
━━━━━━━━━━━━━━━━━━━━
📌 *الوحدة:* ${question.unitName || 'المنهاج الرسمي'}
❓ *السؤال:* ${question.question}

📝 *التوضيح العلمي والمفاهيمي:*
${question.explanation}
`;

    await ctx.reply(text, {
      parse_mode: 'Markdown'
    });
  });
}
