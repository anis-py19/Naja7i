import { InlineKeyboard } from 'grammy';
import { CONFIG, isAdmin, addAdmin, getMaintenanceStatus, setMaintenanceStatus, runtimeAdmins } from '../config.js';
import { USER_STUDY_FILES } from '../data/files.js';
import { BAC_FULL_ARCHIVE } from '../data/archive.js';
import { QUIZ_QUESTIONS } from '../data/quizzes.js';
import { YOUTUBE_TEACHERS } from '../data/teachers.js';

/**
 * Admin Panel Keyboards
 */
export function getAdminKeyboard() {
  const isMaint = getMaintenanceStatus();
  const maintButtonText = isMaint 
    ? '🔴 وضع الصيانة: مُفعل (مغلق للمستخدمين)' 
    : '🟢 وضع الصيانة: معطّل (البوت متاح للجميع)';

  return new InlineKeyboard()
    .text(maintButtonText, 'adm_toggle_maint').row()
    .text('📊 إحصائيات المنصة والملفات', 'adm_stats')
    .text('🆔 معرفي (My ID)', 'adm_myid').row()
    .text('📢 رسالة إذاعية عامة (قريباً)', 'adm_broadcast').row()
    .text('🏠 العودة للرئيسية', 'menu_home');
}

export function setupAdminHandlers(bot) {
  // 🛡️ Global Maintenance Mode Middleware
  bot.use(async (ctx, next) => {
    const userId = ctx.from?.id;
    const text = ctx.message?.text || '';
    const callbackData = ctx.callbackQuery?.data || '';

    // Always allow admin commands and claimadmin / myid
    if (
      text.startsWith('/admin') ||
      text.startsWith('/myid') ||
      text.startsWith('/claimadmin') ||
      callbackData.startsWith('adm_')
    ) {
      return next();
    }

    // If maintenance mode is ACTIVE and user is NOT admin
    if (getMaintenanceStatus() && !isAdmin(userId)) {
      const maintenanceMessage = `
🚧 *عذراً! البوت في وضع الصيانة والتحديث المؤقت* 🛠️
━━━━━━━━━━━━━━━━━━━━━━━━━━
⏳ نقوم حالياً بترقية السيرفرات وإضافة مصادر وملخصات جديدة لشهادة البكالوريا 🇩🇿.

سنعود للعمل بكامل طاقتنا في أقرب وقت بإذن الله!
شكراً لتفهمكم وصبركم 🤲
`;
      if (ctx.callbackQuery) {
        return ctx.answerCallbackQuery('🚧 البوت حالياً في وضع الصيانة المؤقتة.');
      } else {
        return ctx.reply(maintenanceMessage, { parse_mode: 'Markdown' });
      }
    }

    return next();
  });

  // /myid command - Check your Telegram ID
  bot.command('myid', async (ctx) => {
    const userId = ctx.from.id;
    const isUserAdmin = isAdmin(userId);

    await ctx.reply(`
🆔 *معلومات حسابك في تيليجرام:*
━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *الاسم:* ${ctx.from.first_name || ''} ${ctx.from.last_name || ''}
🏷️ *اسم المستخدم:* @${ctx.from.username || 'غير محدد'}
🔢 *الـ User ID الخاص بك:* \`${userId}\`
🛡️ *صلاحية الإدارة:* ${isUserAdmin ? '✅ مسؤول معتمد (Admin)' : '👤 مستخدم عادي'}

💡 *لتعيين هذا الحساب كمسؤول دائم في Vercel:*
أضف المتغير \`ADMIN_ID="${userId}"\` في إعدادات البيئة (Environment Variables).
`, { parse_mode: 'Markdown' });
  });

  // /claimadmin <secret> command
  bot.command('claimadmin', async (ctx) => {
    const inputSecret = ctx.match?.trim();
    const userId = ctx.from.id;

    if (inputSecret === CONFIG.ADMIN_SECRET) {
      addAdmin(userId);
      await ctx.reply(`
🎉 *تهانينا! تم تفعيل صلاحيات الأدمن بحسابك بنجاح!*
━━━━━━━━━━━━━━━━━━━━━━━━━━
🔢 *الآيدي الخاص بك:* \`${userId}\`

يمكنك الآن فتح لوحة الإدارة والتحكم في أي وقت عبر الأمر:
👉 /admin
`, {
        parse_mode: 'Markdown',
        reply_markup: getAdminKeyboard()
      });
    } else {
      await ctx.reply('❌ كلمة السر غير صحيحة. الاستخدام: `/claimadmin كلمة_السر`', { parse_mode: 'Markdown' });
    }
  });

  // /admin command
  bot.command('admin', async (ctx) => {
    const userId = ctx.from.id;

    // Check admin permission
    if (!isAdmin(userId)) {
      return ctx.reply(`
⛔ *عذراً، هذه اللوحة مخصصة لإدارة منصة نجاحي فقط.*
إذا كنت أنت مالك البوت، يمكنك تفعيل حسابك فوراً عبر الأمر:
\`/claimadmin ${CONFIG.ADMIN_SECRET}\`
أو إضافة الآيدي \`${userId}\` في ملف \`.env\` كـ \`ADMIN_ID="${userId}"\`.
`, { parse_mode: 'Markdown' });
    }

    // If verified admin, show dashboard
    const isMaint = getMaintenanceStatus();
    const text = `
👑 *لوحة تحكم وإدارة بوت نجاحي (Admin Dashboard)*
━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *المسؤول الحالي:* ${ctx.from.first_name || 'Admin'} (\`${userId}\`)
⚙️ *حالة النظام الآن:* ${isMaint ? '🔴 في وضع الصيانة (مغلق)' : '🟢 شغال ومتاح للجميع'}

👇 *اختر الإجراء المطلوب من لوحة التحكم:*
`;

    await ctx.reply(text, {
      parse_mode: 'Markdown',
      reply_markup: getAdminKeyboard()
    });
  });

  // Toggle Maintenance Mode Callback
  bot.callbackQuery('adm_toggle_maint', async (ctx) => {
    const userId = ctx.from.id;
    if (!isAdmin(userId)) {
      return ctx.answerCallbackQuery('⛔ ليس لديك صلاحية.');
    }

    const currentStatus = getMaintenanceStatus();
    const newStatus = setMaintenanceStatus(!currentStatus);

    await ctx.answerCallbackQuery(newStatus ? '🔴 تم تفعيل وضع الصيانة!' : '🟢 تم إلغاء وضع الصيانة وإتاحة البوت للجميع!');

    const text = `
👑 *لوحة تحكم وإدارة بوت نجاحي (Admin Dashboard)*
━━━━━━━━━━━━━━━━━━━━━━━━━━
⚙️ *حالة وضع الصيانة الآن:*
${newStatus ? '🔴 *مُفعل:* البوت مغلق أمام المستخدمين العاديين ويظهر رسالة الصيانة.' : '🟢 *معطّل:* البوت شغال ومتاح 100% لجميع الطلبة.'}

👇 اضغط للتبديل مجدداً أو اختر من القائمة:
`;

    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: getAdminKeyboard()
    });
  });

  // System Stats Callback
  bot.callbackQuery('adm_stats', async (ctx) => {
    const userId = ctx.from.id;
    if (!isAdmin(userId)) return ctx.answerCallbackQuery('⛔ ليس لديك صلاحية.');

    await ctx.answerCallbackQuery();

    const isMaint = getMaintenanceStatus();
    const statsText = `
📊 *إحصائيات ومحتويات منصة نجاحي في البوت:*
━━━━━━━━━━━━━━━━━━━━━━━━━━
📚 *عدد الشعب المغطاة:* 6 شعب كاملة
📑 *إجمالي الملفات والملخصات المرفوعة:* ${USER_STUDY_FILES.length} ملف
🏛️ *أرشيف البكالوريا (2008-2026):* ${BAC_FULL_ARCHIVE.length} موضوع وحل نموذجي
🎯 *بنك أسئلة الـ QCM:* ${QUIZ_QUESTIONS.length} سؤال بالشرح
🎥 *دليل أساتذة اليوتيوب:* ${YOUTUBE_TEACHERS.length} أستاذ وقناة
⚙️ *وضع الصيانة:* ${isMaint ? '🔴 مُفعل' : '🟢 معطّل'}
👥 *عدد المسؤولين النشطين:* ${runtimeAdmins.size}

⚡ السيرفر يعمل سحابياً 24/7 بنظام Serverless Webhook.
`;

    const kb = new InlineKeyboard()
      .text('🔙 رجوع للوحة الإدارة', 'adm_refresh')
      .text('🏠 الرئيسية', 'menu_home');

    await ctx.editMessageText(statsText, {
      parse_mode: 'Markdown',
      reply_markup: kb
    });
  });

  // Refresh Admin Panel
  bot.callbackQuery('adm_refresh', async (ctx) => {
    await ctx.answerCallbackQuery();
    const isMaint = getMaintenanceStatus();
    const text = `
👑 *لوحة تحكم وإدارة بوت نجاحي (Admin Dashboard)*
━━━━━━━━━━━━━━━━━━━━━━━━━━
⚙️ *حالة النظام الآن:* ${isMaint ? '🔴 في وضع الصيانة (مغلق)' : '🟢 شغال ومتاح للجميع'}

👇 *اختر الإجراء المطلوب من لوحة التحكم:*
`;
    await ctx.editMessageText(text, {
      parse_mode: 'Markdown',
      reply_markup: getAdminKeyboard()
    });
  });

  // Admin MyID Callback
  bot.callbackQuery('adm_myid', async (ctx) => {
    await ctx.answerCallbackQuery();
    const userId = ctx.from.id;

    await ctx.reply(`
🆔 *معرفك الشخصي في تيليجرام:*
\`${userId}\`

(تم تسجيلك كمسؤول معتمد في البوت ✅)
`, { parse_mode: 'Markdown' });
  });

  // Broadcast Placeholder Callback
  bot.callbackQuery('adm_broadcast', async (ctx) => {
    await ctx.answerCallbackQuery('📢 ميزة الإذاعة العامة جاهزة ومبرمجة وسيتم ربط قاعدة المشتركين قريباً.');
  });
}
