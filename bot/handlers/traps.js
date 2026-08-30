import { getTrapsSubjectsKeyboard, getTrapsListKeyboard, getSingleTrapKeyboard } from '../keyboards/trapsKeyboards.js';
import { getTrapsBySubject, getTrapById, getRandomTrap, TRAP_SUBJECTS } from '../data/traps.js';
import { InlineKeyboard } from 'grammy';

export function setupTrapsHandlers(bot) {
  // Command /traps
  bot.command('traps', async (ctx) => {
    await sendTrapsMenu(ctx);
  });

  // Reply keyboard match
  bot.hears('📓 كراس الأخطاء والفخاخ', async (ctx) => {
    await sendTrapsMenu(ctx);
  });

  // Menu callback
  bot.callbackQuery('menu_traps', async (ctx) => {
    await ctx.answerCallbackQuery();
    await sendTrapsMenu(ctx, true);
  });

  async function sendTrapsMenu(ctx, isEdit = false) {
    const text = `
📓 *كراس الأخطاء الذكي وفخاخ البكالوريا (Carnet d'Erreurs) 🇩🇿*
━━━━━━━━━━━━━━━━━━━━━━━━━
🔥 قاعدة بيانات حصرية للفخاخ المتكررة والأخطاء الشائعة التي يقع فيها تلاميذ البكالوريا وسلبتهم النقاط في الدورات السابقة.

👇 *اختر المادة لتصفح الفخاخ وحيل الحل المنهجية:*
`;

    const keyboard = getTrapsSubjectsKeyboard();

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

  // Subject selected for traps
  bot.callbackQuery(/^trap_sub:([a-z_]+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const subjectId = ctx.match[1];
    const traps = getTrapsBySubject(subjectId);
    const subjObj = TRAP_SUBJECTS.find(s => s.id === subjectId);

    if (!traps.length) {
      const fallbackKb = new InlineKeyboard()
        .text('🔙 رجوع لقائمة المواد', 'menu_traps')
        .text('🏠 الرئيسية', 'menu_home');

      return ctx.editMessageText(`ℹ️ لم يتم العثور على فخاخ مخصصة لمادة *${subjObj?.name || subjectId}* حالياً. تفقد باقي المواد!`, {
        parse_mode: 'Markdown',
        reply_markup: fallbackKb
      });
    }

    let text = `📓 *فخاخ البكالوريا الشائعة — مادة ${subjObj?.name || 'جميع المواد'}*\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `اضغط على أي فخ لقراءة الخطأ الشائع والقاعدة الذهبية لتجنبه:\n\n`;

    traps.forEach((t, idx) => {
      text += `*${idx + 1}.* ${t.levelLabel || '⚠️'} *${t.title}*\n`;
      text += `   📌 _الوحدة:_ ${t.unit}\n\n`;
    });

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: getTrapsListKeyboard(subjectId, traps)
    });
  });

  // Random trap
  bot.callbackQuery('trap_rand', async (ctx) => {
    await ctx.answerCallbackQuery('تم اختيار فخ عشوائي جديد');
    const trap = getRandomTrap();
    if (!trap) return ctx.reply('ℹ️ لا توجد فخاخ متوفرة.');
    await renderSingleTrap(ctx, trap);
  });

  // View specific trap
  bot.callbackQuery(/^trap_view:([a-z0-9_-]+)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const trapId = ctx.match[1];
    const trap = getTrapById(trapId);

    if (!trap) {
      return ctx.reply('⚠️ تعذر العثور على تفاصيل هذا الفخ.');
    }

    await renderSingleTrap(ctx, trap);
  });

  async function renderSingleTrap(ctx, trap) {
    const text = `
${trap.levelLabel || '🔥 فخ بكالوريا شائـع'}
━━━━━━━━━━━━━━━━━━━━━━━━━
📌 *المادة:* ${trap.subjectName}
📖 *الوحدة / المحور:* ${trap.unit}
🏷️ *عنوان الفخ:* *${trap.title}*

❌ *الخطأ الشائع الذي يقع فيه التلاميذ:*
${trap.mistake}

✅ *القاعدة الذهبية وطريقة تجنب الفخ:*
${trap.rule}
━━━━━━━━━━━━━━━━━━━━━━━━━
💡 *نصيحة:* سجّل هذه الملاحظة فوراً في كراس الأخطاء الخاص بك وراجعها ليلة الامتحان!
`;

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: getSingleTrapKeyboard(trap)
    });
  }
}
