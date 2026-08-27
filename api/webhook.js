import { Bot, webhookCallback } from 'grammy';
import { CONFIG } from '../bot/config.js';
import { registerStartHandlers } from '../bot/handlers/startHandler.js';
import { registerLibraryHandlers } from '../bot/handlers/libraryHandler.js';
import { registerBacHandlers } from '../bot/handlers/bacHandler.js';
import { registerQuizHandlers } from '../bot/handlers/quizHandler.js';
import { registerCalcHandlers } from '../bot/handlers/calcHandler.js';
import { registerTeachersHandlers } from '../bot/handlers/teachersHandler.js';
import { registerPlannerHandlers } from '../bot/handlers/plannerHandler.js';
import { registerSearchHandlers } from '../bot/handlers/searchHandler.js';
import { registerInlineQueryHandlers } from '../bot/handlers/inlineQueryHandler.js';

let botInstance = null;

function getBot() {
  if (botInstance) return botInstance;

  const token = process.env.BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN || CONFIG.BOT_TOKEN;
  if (!token) {
    throw new Error('BOT_TOKEN is missing in environment variables');
  }

  const bot = new Bot(token);

  registerStartHandlers(bot);
  registerLibraryHandlers(bot);
  registerBacHandlers(bot);
  registerQuizHandlers(bot);
  registerCalcHandlers(bot);
  registerTeachersHandlers(bot);
  registerPlannerHandlers(bot);
  registerSearchHandlers(bot);
  registerInlineQueryHandlers(bot);

  botInstance = bot;
  return botInstance;
}

const handleUpdate = (req, res) => {
  try {
    const bot = getBot();
    return webhookCallback(bot, 'node:http')(req, res);
  } catch (error) {
    console.error('Webhook Error:', error);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: error.message }));
  }
};

export default handleUpdate;
