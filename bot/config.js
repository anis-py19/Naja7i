import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root or bot directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '.env') });

export const CONFIG = {
  BOT_TOKEN: process.env.BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN || '',
  BOT_NAME: process.env.BOT_NAME || 'Naja7iBacBot',
  DEVELOPER_NAME: 'Naja7i Team',
  ENVIRONMENT: process.env.NODE_ENV || 'development'
};
