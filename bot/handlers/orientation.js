import { getMajorsKeyboard, getSingleMajorKeyboard, getWeightedScoreKeypad } from '../keyboards/orientationKeyboards.js';
import { UNIVERSITY_MAJORS, calculateWeightedAverage } from '../data/orientation.js';
import { getScoreProgressBar } from '../utils/helpers.js';
import { InlineKeyboard } from 'grammy';

const weightedSessions = new Map();

function getWSession(userId) {
  if (!weightedSessions.has(userId)) {
    weightedSessions.set(userId, {
      bacAvg: 16.00,
      subjectMark: 16.00,
      physicsMark: 16.00
    });
  }
  return weightedSessions.get(userId);
}

export function setupOrientationHandlers(bot) {
  // Command /orientation
  bot.command(['orientation', 'weighted_calc'], async (ctx) => {
    await sendOrientationMenu(ctx);
  });

  // Reply keyboard match
  bot.hears('🎓 التوجيه والمعدل الموزون', async (ctx) => {
    await sendOrientationMenu(ctx);
  });

  // Menu callback
  bot.callbackQuery('menu_orientation', async (ctx) => {
    await ctx.answerCallbackQuery();
    await sendOrientationMenu(ctx, true);
  });

  async function sendOrientationMenu(ctx, isEdit = false) {
    const text = `
🎓 *دليل التوجيه الجامعي وحساب المعدل الموزون (Moyenne Pondérée) 🇩🇿*
━━━━━━━━━━━━━━━━━━━━━━━━━
تخصصات النخبة الوطنية، شروط القبول الرسمية لوزارة التعليم العالي، وقوانين حساب المعدل الموزون للعلوم الطبية والمدارس الوطنية العليا.

👇 *اختر التخصص لمعرفة شروطه وحساب معدلك الموزون بدقة:*
`;

    const keyboard = getMajorsKeyboard();

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

  // Major selected
  bot.callbackQuery(/^major_view:([a-z_]+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const majorId = ctx.match[1];
    const major = UNIVERSITY_MAJORS.find(m => m.id === majorId);

    if (!major) {
      return ctx.reply('⚠️ تعذر العثور على التخصص المطلوب.');
    }

    const text = `
${major.icon} *${major.name}*
_${major.frenchName}_
━━━━━━━━━━━━━━━━━━━━━━━━━
📝 *التعريف والمستقبل المهني:*
${major.description}

📐 *قانون حساب المعدل الموزون:*
\`${major.formulaDesc}\`

🎯 *المعدل التقديري المعتاد للقبول:*
🌟 *${major.typicalThreshold}* (يختلف حسب الدورة وعدد المناصب)

👇 *اضغط على الزر أدناه لحساب معدلك الموزون المتوقع لهذا التخصص:*
`;

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: getSingleMajorKeyboard(majorId)
    });
  });

  // Start calculating weighted average for major
  bot.callbackQuery(/^calc_w_([a-z_]+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const majorId = ctx.match[1];
    const major = UNIVERSITY_MAJORS.find(m => m.id === majorId);
    const userId = ctx.from.id;
    const session = getWSession(userId);

    const weightedResult = calculateWeightedAverage(
      session.bacAvg,
      session.subjectMark,
      session.physicsMark,
      major?.formulaType || 'medicine'
    );

    const bar = getScoreProgressBar(weightedResult, 20);

    const text = `
🧮 *حاسبة المعدل الموزون — ${major?.name || 'تخصص جامعي'}*
━━━━━━━━━━━━━━━━━━━━━━━━━
📊 *المعدل العام التقديري:* \`${session.bacAvg} / 20\`
📘 *علامة المادة الأساسية:* \`${session.subjectMark} / 20\`
📐 *قانون الحساب:* \`${major?.formulaDesc}\`

🏆 *معدلك الموزون المحسوب (Moyenne Pondérée):*
\`${weightedResult} / 20\`
📈 *المستوى:* \`[${bar}]\`

━━━━━━━━━━━━━━━━━━━━━━━━━
👇 *اختر لتعديل معدل البكالوريا العام:*
`;

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: getWeightedScoreKeypad(majorId, 'bac')
    });
  });

  // Value picker for weighted calc
  bot.callbackQuery(/^wval_([a-z_]+)_(bac|subj)_(\d+)$/, async (ctx) => {
    const majorId = ctx.match[1];
    const step = ctx.match[2];
    const val = parseInt(ctx.match[3], 10);
    const userId = ctx.from.id;
    const session = getWSession(userId);
    const major = UNIVERSITY_MAJORS.find(m => m.id === majorId);

    if (step === 'bac') {
      session.bacAvg = val;
      await ctx.answerCallbackQuery(`تم ضبط معدل البكالوريا على ${val}`);

      const text = `
🧮 *حاسبة المعدل الموزون — ${major?.name}*
━━━━━━━━━━━━━━━━━━━━━━━━━
✅ تم ضبط معدل البكالوريا: *${val}/20*
👇 الآن اختر علامة المادة الأساسية المتوقعة في الامتحان:
`;

      return ctx.editMessageText(text, {
        parse_mode: 'Markdown',
        reply_markup: getWeightedScoreKeypad(majorId, 'subj')
      });
    } else {
      session.subjectMark = val;
      session.physicsMark = val;
      await ctx.answerCallbackQuery(`تم ضبط علامة المادة على ${val}`);

      const weightedResult = calculateWeightedAverage(
        session.bacAvg,
        session.subjectMark,
        session.physicsMark,
        major?.formulaType || 'medicine'
      );

      const bar = getScoreProgressBar(weightedResult, 20);

      const text = `
🎓 *نتيجة حساب المعدل الموزون — ${major?.name}*
━━━━━━━━━━━━━━━━━━━━━━━━━
📊 *معدل البكالوريا العام:* \`${session.bacAvg} / 20\`
📘 *علامة مادة التخصص:* \`${session.subjectMark} / 20\`
📐 *قانون الحساب:* \`${major?.formulaDesc}\`

🏆 *المعدل الموزون النهائي (Moyenne Pondérée):*
\`${weightedResult} / 20\`
📈 *المستوى:* \`[${bar}]\`

━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 *المعدل المطلوب عادةً:* *${major?.typicalThreshold}*
${weightedResult >= 16 ? '🎉 حظوظك قوية جداً وممتازة لنيل هذا التخصص بإذن الله!' : '⚡ كثف تركيزك في المادة الأساسية لرفع المعدل الموزون وضمان القبول!'}
`;

      const resultKb = new InlineKeyboard()
        .text('🔄 إعادة الحساب', `calc_w_${majorId}`).row()
        .text('🔙 اختيار تخصص آخر', 'menu_orientation')
        .text('🏠 الرئيسية', 'menu_home');

      return ctx.editMessageText(text, {
        parse_mode: 'Markdown',
        reply_markup: resultKb
      });
    }
  });
}
