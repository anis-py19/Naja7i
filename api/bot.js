import { webhookCallback } from 'grammy';
import { createBot } from '../bot/index.js';

let botInstance = null;
let webhookHandler = null;

function getHandler() {
  const token = process.env.BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return null;

  if (!botInstance) {
    botInstance = createBot(token);
    webhookHandler = webhookCallback(botInstance, 'node:http');
  }
  return webhookHandler;
}

/**
 * Serverless Webhook Handler for Vercel
 * Supports Telegram POST updates + GET health checks
 */
export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'active',
      service: 'Naja7i BAC Telegram Bot 🇩🇿',
      mode: 'Serverless 24/7 Webhook',
      timestamp: new Date().toISOString()
    });
  }

  if (req.method === 'POST') {
    const handler = getHandler();
    if (!handler) {
      console.error('BOT_TOKEN is not configured in Vercel environment variables.');
      return res.status(500).json({ error: 'BOT_TOKEN environment variable is missing.' });
    }
    return handler(req, res);
  }

  return res.status(405).send('Method Not Allowed');
}
