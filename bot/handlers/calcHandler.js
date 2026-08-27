import { InlineKeyboard } from 'grammy';
import { getStreamsInlineKeyboard } from '../keyboards/streamKeyboard.js';
import { getStreamById, getCoefficientsByStream, calculateBacAverage } from '../dataAdapter.js';
import { CONFIG } from '../config.js';

export function registerCalcHandlers(bot) {
  // أمر الحاسبة
  bot.command('calc', async (ctx) => {
    await ctx.reply('🧮 **حاسبة معدل البكالوريا والمعاملات الرسمية 🇩🇿**\nاختر شعبتك لعرض المعاملات وحساب المعدل:', {
      parse_mode: 'Markdown',
      reply_markup: getStreamsInlineKeyboard('calc_stream')
    });
  });

  bot.callbackQuery('menu_calc', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.editMessageText('🧮 **حاسبة معدل البكالوريا والمعاملات الرسمية 🇩🇿**\nاختر شعبتك لعرض المعاملات وحساب المعدل:', {
      parse_mode: 'Markdown',
      reply_markup: getStreamsInlineKeyboard('calc_stream')
    });
  });

  // عرض معاملات الشعبة وطرق الحساب
  bot.callbackQuery(/^calc_stream:(.+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const streamId = ctx.match[1];
    const stream = getStreamById(streamId);
    const coefData = getCoefficientsByStream(streamId);

    if (!coefData) {
      return ctx.reply('⚠️ تعذر العثور على معاملات هذه الشعبة.');
    }

    let totalCoeffs = 0;
    let tableText = `📊 **جدول المعاملات الرسمية — ${coefData.name}**\n\n`;

    coefData.subjects.forEach(sub => {
      const star = sub.isMain ? '⭐' : '▫️';
      tableText += `${star} **${sub.name}:** المعامل (${sub.coef})\n`;
      totalCoeffs += sub.coef;
    });

    tableText += `\n📌 **مجموع المعاملات:** ${totalCoeffs}\n`;
    tableText += `\n💡 **كيفية الحساب السريع بالبوت:**\nيمكنك حساب معدلك فوراً بكتابة الأمر:\n\`/calc_run ${streamId} 15 14 16 13 12 14 15 14 16 18\`\n*(اكتب النقاط من 0 إلى 20 مفصولة بمسافات بنفس ترتيب المواد أعلاه)*`;

    const kb = new InlineKeyboard();

    if (CONFIG.WEB_APP_URL) {
      kb.webApp('🚀 فتح الحاسبة التفاعلية (Mini App)', `${CONFIG.WEB_APP_URL}/calculator`).row();
    }

    kb.text('🎲 تجربة محاكاة تقديرية (15.50)', `calc_sim:${streamId}:15.5`).row();
    kb.text('🎲 تجربة محاكاة امتياز (17.50)', `calc_sim:${streamId}:17.5`).row();
    kb.text('🔙 اختيار شعبة أخرى', 'menu_calc');

    await ctx.editMessageText(tableText, {
      parse_mode: 'Markdown',
      reply_markup: kb
    });
  });

  // محاكاة فورية للمعدل
  bot.callbackQuery(/^calc_sim:(.+):([\d.]+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const [streamId, targetAvgStr] = [ctx.match[1], ctx.match[2]];
    const target = parseFloat(targetAvgStr);
    const coefData = getCoefficientsByStream(streamId);

    const grades = {};
    coefData.subjects.forEach(sub => {
      // إعطاء علامات مقترحة قريبة من التقدير المطلوب
      const variance = (Math.random() * 2 - 1).toFixed(1);
      const g = Math.min(20, Math.max(8, target + parseFloat(variance)));
      grades[sub.id] = Number(g.toFixed(2));
    });

    const res = calculateBacAverage(streamId, grades);

    let resText = `
🎯 **نموذج محاكاة معدل البكالوريا:**
🎓 **الشعبة:** ${res.streamName}
📈 **المعدل المحسوب:** \`${res.average} / 20\`
🏆 **التقدير:** ${res.appreciation}
🔢 **مجموع النقاط:** ${res.totalPoints} / ${(res.totalCoeffs * 20)}

📋 **توزيع النقاط المقترح:**
`;

    res.details.forEach(d => {
      resText += `• ${d.name} (${d.coef}): \`${d.grade}/20\` ⬅️ ${d.pts} نقطة\n`;
    });

    const kb = new InlineKeyboard()
      .text('🔄 إعادة المحاكاة', `calc_sim:${streamId}:${targetAvgStr}`).row()
      .text('🔙 العودة للشعبة', `calc_stream:${streamId}`);

    await ctx.editMessageText(resText, {
      parse_mode: 'Markdown',
      reply_markup: kb
    });
  });

  // أمر الحساب اليدوي /calc_run <streamId> <g1> <g2> ...
  bot.command('calc_run', async (ctx) => {
    const parts = ctx.message.text.split(/\s+/).slice(1);
    if (parts.length < 2) {
      return ctx.reply('⚠️ طريقة الاستخدام:\n`/calc_run <stream_id> <نقاط_المواد>`\n\nمثال:\n`/calc_run sciences 15 16 14 13 12 15 14 15 16 18`', { parse_mode: 'Markdown' });
    }

    const streamId = parts[0];
    const gradeNumbers = parts.slice(1).map(n => parseFloat(n)).filter(n => !isNaN(n));
    const coefData = getCoefficientsByStream(streamId);

    if (!coefData) {
      return ctx.reply(`⚠️ لم يتم التعرف على الشعبة \`${streamId}\`.\nالشعب المتاحة: \`sciences\`, \`math\`, \`technique_math\`, \`gestion\`, \`lettres_philo\`, \`langues\``, { parse_mode: 'Markdown' });
    }

    const grades = {};
    coefData.subjects.forEach((sub, idx) => {
      grades[sub.id] = gradeNumbers[idx] !== undefined ? gradeNumbers[idx] : 10;
    });

    const res = calculateBacAverage(streamId, grades);

    let resText = `
🎉 **نتيجة حساب معدل البكالوريا:**
🎓 **الشعبة:** ${res.streamName}
📈 **المعدل العام:** \`${res.average} / 20\`
🏆 **التقدير:** ${res.appreciation}
🔢 **مجموع النقاط:** ${res.totalPoints} / ${(res.totalCoeffs * 20)}

📋 **تفاصيل المواد والنقاط:**
`;

    res.details.forEach(d => {
      resText += `• ${d.name} (معامل ${d.coef}): \`${d.grade}/20\` ⬅️ ${d.pts} ن\n`;
    });

    await ctx.reply(resText, { parse_mode: 'Markdown' });
  });
}
