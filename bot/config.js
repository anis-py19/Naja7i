import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root or bot directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '.env') });

export const CONFIG = {
  BOT_TOKEN: (process.env.BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN || '').trim().replace(/^["']|["']$/g, ''),
  WEB_APP_URL: (process.env.WEB_APP_URL || 'https://naja7i-platform.vercel.app').trim(),
  PLATFORM_NAME: 'منصة نجاحي (Naja7i 🇩🇿)',
  DEV_NAME: 'فريق نجاحي التعليمي',
  BAC_TARGET_DATE: '2026-06-07T08:00:00+01:00', // تقريبي لبكالوريا جوان 2026
  PAGINATION_LIMIT: 5,
};

if (!CONFIG.BOT_TOKEN) {
  console.warn('⚠️ تحذير: لم يتم تعيين BOT_TOKEN أو TELEGRAM_BOT_TOKEN في ملف .env!');
  console.warn('ℹ️ يرجى وضع التوكن الخاص بك في ملف .env للتمكن من تشغيل البوت مع خوادم تيليجرام.');
}
