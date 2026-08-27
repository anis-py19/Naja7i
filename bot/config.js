import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root or bot directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '.env') });

const configuredAdminIds = (process.env.ADMIN_ID || process.env.ADMIN_IDS || '')
  .split(',')
  .map(id => id.trim())
  .filter(Boolean);

// Runtime active admin list
export const runtimeAdmins = new Set(configuredAdminIds);

// Global Maintenance Mode State
let isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true';

export function getMaintenanceStatus() {
  return isMaintenanceMode;
}

export function setMaintenanceStatus(status) {
  isMaintenanceMode = Boolean(status);
  return isMaintenanceMode;
}

export function isAdmin(userId) {
  if (!userId) return false;
  const idStr = String(userId);
  // If no admin is configured at all in .env, anyone can be authenticated or first person claiming
  if (runtimeAdmins.size === 0) return true;
  return runtimeAdmins.has(idStr);
}

export function addAdmin(userId) {
  if (userId) runtimeAdmins.add(String(userId));
}

export const CONFIG = {
  BOT_TOKEN: process.env.BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN || '',
  BOT_NAME: process.env.BOT_NAME || 'Naja7iBacBot',
  DEVELOPER_NAME: 'Naja7i Team',
  ENVIRONMENT: process.env.NODE_ENV || 'development',
  ADMIN_SECRET: process.env.ADMIN_SECRET || 'naja7i2026'
};
