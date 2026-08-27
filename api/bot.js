import { createBot } from '../bot/index.js';

let bot = null;

/**
 * Serverless Webhook Handler for Vercel (24/7 Execution)
 */
export default async function handler(req, res) {
  // GET: Health Check
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'active',
      service: 'Naja7i BAC Telegram Bot 🇩🇿',
      mode: 'Serverless 24/7 Webhook',
      tokenConfigured: Boolean(process.env.BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN),
      timestamp: new Date().toISOString()
    });
  }

  // POST: Telegram Webhook Update
  if (req.method === 'POST') {
    const token = process.env.BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
      console.error('❌ [Vercel Bot Error]: BOT_TOKEN is missing in Environment Variables.');
      return res.status(500).json({ error: 'BOT_TOKEN is missing in Vercel settings.' });
    }

    if (!bot) {
      bot = createBot(token);
    }

    try {
      const update = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (update && update.update_id !== undefined) {
        await bot.handleUpdate(update);
      }
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error('❌ Error in bot.handleUpdate:', err);
      // Return 200 to acknowledge receipt to Telegram
      return res.status(200).json({ ok: false, error: err.message });
    }
  }

  return res.status(405).send('Method Not Allowed');
}
