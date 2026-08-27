import { Bot } from 'grammy';
import { CONFIG } from './config.js';

async function removeWebhook() {
  console.log('🔄 جاري حذف الـ Webhook والعودة لوضع Long Polling المحلي...');
  if (!CONFIG.BOT_TOKEN) {
    console.error('❌ BOT_TOKEN غير موجود.');
    process.exit(1);
  }

  const bot = new Bot(CONFIG.BOT_TOKEN);
  await bot.api.deleteWebhook({ drop_pending_updates: true });
  console.log('✅ تم حذف الـ Webhook بنجاح. يمكنك الآن استخدام npm run bot محلياً إن أردت.');
}

removeWebhook();
