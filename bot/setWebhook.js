import { Bot } from 'grammy';
import { CONFIG } from './config.js';

const token = CONFIG.BOT_TOKEN;

if (!token) {
  console.error('❌ خطأ: يرجى وضع BOT_TOKEN في ملف .env أولاً.');
  process.exit(1);
}

const bot = new Bot(token);
const action = process.argv[2] || 'info';
const url = process.argv[3];

async function main() {
  try {
    if (action === 'set') {
      if (!url) {
        console.error('❌ يرجى تحديد رابط الـ Webhook:\nمثال: node bot/setWebhook.js set https://your-site.vercel.app/api/bot');
        process.exit(1);
      }
      console.log(`📡 جارٍ ربط التيليجرام بالرابط: ${url} ...`);
      await bot.api.setWebhook(url);
      console.log('✅ تم تفعيل الـ Webhook بنجاح! البوت الآن يشتغل 24/7 سحابياً بدون الحاجة لتشغيل جهازك!');
    } else if (action === 'delete' || action === 'del') {
      console.log('🗑️ جارٍ إزالة الـ Webhook للعودة إلى وضع الـ Long Polling...');
      await bot.api.deleteWebhook();
      console.log('✅ تم حذف الـ Webhook بنجاح. يمكنك الآن تشغيل البوت محلياً بالأمر: npm run bot');
    } else {
      console.log('🔍 فحص حالة الـ Webhook الحالية في تيليجرام:');
      const info = await bot.api.getWebhookInfo();
      console.log(info);
    }
  } catch (err) {
    console.error('❌ حدث خطأ:', err);
  }
}

main();
