import { getCalcStreamsKeyboard, getCalcSubjectKeyboard, getScorePickerKeyboard } from '../keyboards/calculatorKeyboards.js';
import { getStreamById, getSubjectById } from '../data/streams.js';
import { calculateBacAverage } from '../utils/helpers.js';
import { InlineKeyboard } from 'grammy';

// User temporary session cache for calculator
const userCalcSessions = new Map();

function getSession(userId) {
  if (!userCalcSessions.has(userId)) {
    userCalcSessions.set(userId, {
      streamId: 'sciences',
      marks: {},
      includeOptional: { amazigh: false, sport: true }
    });
  }
  return userCalcSessions.get(userId);
}

export function setupCalculatorHandlers(bot) {
  // /calc command
  bot.command(['calc', 'calculator'], async (ctx) => {
    await ctx.reply('🧮 *حاسبة معدل البكالوريا التفاعلية 🇩🇿*\n\nاختر شعبتك لحساب المعدل بدقة وفق المعاملات الرسمية لوزارة التربية الوطنية:', {
      parse_mode: 'Markdown',
      reply_markup: getCalcStreamsKeyboard()
    });
  });

  // Reply keyboard match
  bot.hears('🧮 حاسبة المعدل', async (ctx) => {
    await ctx.reply('🧮 *حاسبة معدل البكالوريا التفاعلية 🇩🇿*\n\nاختر شعبتك لحساب المعدل بدقة وفق المعاملات الرسمية لوزارة التربية الوطنية:', {
      parse_mode: 'Markdown',
      reply_markup: getCalcStreamsKeyboard()
    });
  });

  // Menu callback
  bot.callbackQuery('menu_calculator', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.editMessageText('🧮 *حاسبة معدل البكالوريا التفاعلية 🇩🇿*\n\nاختر شعبتك لحساب المعدل بدقة وفق المعاملات الرسمية لوزارة التربية الوطنية:', {
      parse_mode: 'Markdown',
      reply_markup: getCalcStreamsKeyboard()
    });
  });

  // Stream selected for calculator
  bot.callbackQuery(/^calc_stream:([a-z_]+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const streamId = ctx.match[1];
    const stream = getStreamById(streamId);
    const userId = ctx.from.id;

    const session = getSession(userId);
    session.streamId = streamId;
    // Default preset marks to 12 for convenience
    session.marks = {};
    stream.subjects.forEach(s => {
      session.marks[s.id] = 12;
    });

    const text = `
🧮 *حاسبة معدل البكالوريا — ${stream.name}*
━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 *طريقة الاستخدام:*
1️⃣ اضغط على أي مادة لتعديل علامتها (من 0 إلى 20).
2️⃣ أو جرب الأزرار السريعة بالأعلى (معدل 12 أو 15 أو 18).
3️⃣ قم بتفعيل أو تعطيل علامة الرياضة / الأمازيغية.
4️⃣ اضغط على *«احسب المعدل النهائي»* لرؤية النتيجة والتوجيه الجامعي!
`;

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: getCalcSubjectKeyboard(streamId, session.marks, session.includeOptional)
    });
  });

  // Preset button
  bot.callbackQuery(/^calc_preset:([a-z_]+):(\d+)$/, async (ctx) => {
    await ctx.answerCallbackQuery('تم تطبيق التوزيع التجريبي للعلامات');
    const streamId = ctx.match[1];
    const preset = parseInt(ctx.match[2], 10);
    const stream = getStreamById(streamId);
    const userId = ctx.from.id;

    const session = getSession(userId);
    session.streamId = streamId;

    stream.subjects.forEach(s => {
      session.marks[s.id] = preset;
    });

    const text = `
🧮 *حاسبة معدل البكالوريا — ${stream.name}*
━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ تم ضبط جميع المواد على علامة تجريبية: *${preset} / 20*

اضغط على المواد لتعديلها بشكل مخصص أو اضغط *«احسب المعدل النهائي»*:
`;

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: getCalcSubjectKeyboard(streamId, session.marks, session.includeOptional)
    });
  });

  // Toggle optional subject
  bot.callbackQuery(/^calc_toggle:([a-z_]+):(amazigh|sport)$/, async (ctx) => {
    const streamId = ctx.match[1];
    const field = ctx.match[2];
    const userId = ctx.from.id;
    const session = getSession(userId);

    session.includeOptional[field] = !session.includeOptional[field];
    await ctx.answerCallbackQuery(`تم ${session.includeOptional[field] ? 'تفعيل' : 'تعطيل'} مادة ${field === 'amazigh' ? 'الأمازيغية' : 'التربية البدنية'}`);

    const stream = getStreamById(streamId);
    const text = `
🧮 *حاسبة معدل البكالوريا — ${stream.name}*
━━━━━━━━━━━━━━━━━━━━━━━━━━
تم تحديث خيارات المواد الاختيارية. اضغط على *«احسب المعدل النهائي»* عند الانتهاء:
`;

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: getCalcSubjectKeyboard(streamId, session.marks, session.includeOptional)
    });
  });

  // Reset marks
  bot.callbackQuery(/^calc_reset:([a-z_]+)$/, async (ctx) => {
    await ctx.answerCallbackQuery('تمت إعادة تعيين العلامات');
    const streamId = ctx.match[1];
    const stream = getStreamById(streamId);
    const userId = ctx.from.id;
    const session = getSession(userId);

    session.marks = {};
    stream.subjects.forEach(s => {
      session.marks[s.id] = 10;
    });

    const text = `
🧮 *حاسبة معدل البكالوريا — ${stream.name}*
━━━━━━━━━━━━━━━━━━━━━━━━━━
🔄 تمت إعادة ضبط جميع العلامات إلى 10/20.
`;

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: getCalcSubjectKeyboard(streamId, session.marks, session.includeOptional)
    });
  });

  // Pick score for a specific subject
  bot.callbackQuery(/^calc_set:([a-z_]+):([a-z_0-9]+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const streamId = ctx.match[1];
    const subjectId = ctx.match[2];
    const subject = getSubjectById(streamId, subjectId);

    const text = `
✏️ *تعديل علامة:* ${subject?.name || subjectId} (معامل ${subject?.coef || 1})
👇 اختر العلامة المتوقعة من لوحة المفاتيح:
`;

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: getScorePickerKeyboard(streamId, subjectId)
    });
  });

  // Value selected for subject
  bot.callbackQuery(/^calc_val:([a-z_]+):([a-z_0-9]+):(\d+)$/, async (ctx) => {
    const streamId = ctx.match[1];
    const subjectId = ctx.match[2];
    const val = parseInt(ctx.match[3], 10);
    const userId = ctx.from.id;
    const session = getSession(userId);

    session.marks[subjectId] = val;
    await ctx.answerCallbackQuery(`تم حفظ علامة ${val}/20`);

    const stream = getStreamById(streamId);
    const text = `
🧮 *حاسبة معدل البكالوريا — ${stream.name}*
━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ تم تعديل العلامات بنجاح.
`;

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: getCalcSubjectKeyboard(streamId, session.marks, session.includeOptional)
    });
  });

  // Return to calc main from score picker
  bot.callbackQuery(/^calc_back:([a-z_]+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const streamId = ctx.match[1];
    const stream = getStreamById(streamId);
    const userId = ctx.from.id;
    const session = getSession(userId);

    const text = `
🧮 *حاسبة معدل البكالوريا — ${stream.name}*
━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: getCalcSubjectKeyboard(streamId, session.marks, session.includeOptional)
    });
  });

  // Run calculation and show certificate-style result
  bot.callbackQuery(/^calc_run:([a-z_]+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const streamId = ctx.match[1];
    const stream = getStreamById(streamId);
    const userId = ctx.from.id;
    const session = getSession(userId);

    const result = calculateBacAverage(stream, session.marks, session.includeOptional);

    let message = `
🎓 *كشف نقاط البكالوريا التقديري (BAC Result)*
━━━━━━━━━━━━━━━━━━━━━━━━━━
🏫 *الشعبة:* ${result.streamName}
📊 *مجموع النقاط المحصل عليها:* ${result.totalPoints}
⚖️ *مجموع المعاملات:* ${result.totalCoefficients}

🏆 *المعدل العام:* \`${result.average} / 20\`
📈 *المستوى:* \`[${result.progressBar}]\`
🎖️ *التقدير:* ${result.gradeIcon} *${result.grade}*
━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 *تفصيل المواد والعلامات:*
`;

    result.breakdown.forEach(b => {
      const star = b.isMain ? '⭐ ' : '• ';
      message += `${star}*${b.subjectName}:* ${b.mark}/20 (معامل ${b.coef} ⬅️ ${b.weighted} ن)\n`;
    });

    message += `
━━━━━━━━━━━━━━━━━━━━━━━━━━
🧭 *التوجيه والفرص الجامعية المتاحة:*
${result.guidance}
`;

    const resultKeyboard = new InlineKeyboard()
      .text('🔄 إعادة الحساب / تعديل النقاط', `calc_stream:${streamId}`).row()
      .text('🔙 تغيير الشعبة', 'menu_calculator')
      .text('🏠 الرئيسية', 'menu_home');

    await ctx.editMessageText(message, {
      parse_mode: 'Markdown',
      reply_markup: resultKeyboard
    });
  });
}
