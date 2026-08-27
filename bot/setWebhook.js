import { Bot } from 'grammy';
import { CONFIG } from './config.js';

async function setupWebhook() {
  console.log('---------------------------------------------------------');
  console.log('🌐 جاري ربط البوت بالـ Webhook للعمل 24/7 سحابياً...');
  console.log('---------------------------------------------------------');

  if (!CONFIG.BOT_TOKEN) {
    console.error('❌ خطأ: BOT_TOKEN غير موجود في ملف .env');
    process.exit(1);
  }

  const bot = new Bot(CONFIG.BOT_TOKEN);
  
  // الرابط السحابي للـ Webhook
  let webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) {
    const base = CONFIG.WEB_APP_URL.replace(/\/$/, '');
    webhookUrl = `${base}/api/webhook`;
  }

  console.log(`🔗 Webhook URL المستهدف: ${webhookUrl}`);

  try {
    // 1. تسجيل قائمة الأوامر
    await bot.api.setMyCommands([
      { command: 'start', description: '🏠 القائمة الرئيسية والترحيب' },
      { command: 'library', description: '📚 تصفح مكتبة الدروس والملخصات' },
      { command: 'bac', description: '🏛️ مواضيع وحلول البكالوريا (2008-2026)' },
      { command: 'quiz', description: '⏱️ كويزات واختبارات تفاعلية سريعة' },
      { command: 'calc', description: '🧮 حاسبة معدل البكالوريا والمعاملات' },
      { command: 'teachers', description: '🎥 دليل أساتذة وقنوات اليوتيوب' },
      { command: 'planner', description: '📅 مخطط المراجعة الأسبوعي' },
      { command: 'countdown', description: '⏳ العد التنازلي لبكالوريا 2026' },
      { command: 'search', description: '🔍 بحث سريع في كامل المنصة' },
      { command: 'help', description: '📖 دليل المساعدة والأوامر' },
    ]);
    console.log('✅ تم تحديث قائمة أوامر البوت على تيليجرام.');

    // 2. تفعيل الـ Webhook
    await bot.api.setWebhook(webhookUrl, {
      drop_pending_updates: true
    });
    console.log('🚀 تم تفعيل الـ Webhook بنجاح!');

    // 3. جلب معلومات الـ Webhook الحالية للتأكيد
    const info = await bot.api.getWebhookInfo();
    console.log('\n📊 تفاصيل الـ Webhook الحالية:');
    console.log(`- URL: ${info.url}`);
    console.log(`- Pending Updates: ${info.pending_update_count}`);
    console.log(`- Last Error: ${info.last_error_message || 'لا توجد أخطاء (سليم 100%)'}`);
    console.log('\n✨ مبروك! البوت الآن مربوط بالسيرفر وسيعمل 24/7 للجميع بدون الحاجة لتشغيل جهازك أو أمر npm run bot.');
  } catch (error) {
    console.error('❌ حدث خطأ أثناء إعداد الـ Webhook:', error.message);
  }
}

setupWebhook();
