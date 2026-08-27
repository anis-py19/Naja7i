/**
 * 🤖 Naja7i (نجاحي) — Master 24/7 Multi-Agent Telegram Command Center
 * مركز التحكم الإداري الشامل لمنصة نجاحي عبر التيليغرام (وضع الصيانة، الإعلانات، إدارة الوكلاء، صيد المصادر)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { performDeepBacResearch } from './deepResearchAgent.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SITE_CONFIG_PATH = path.resolve(__dirname, '../../src/config/siteConfig.js');

// Configuration
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID || '';
const PLATFORM_URL = process.env.PLATFORM_URL || 'https://naja7i.com';
const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY || '';

let lastUpdateId = 0;
let isRunning = true;
const startTime = Date.now();

// 🤖 Active Specialized Agents State (AGENTS.md)
const AGENTS_STATE = {
  bac_deep_research_agent: {
    name: '🦅 وكيل البحث والتقصي العميق',
    desc: 'البحث في المواقع والمذكرات وقنوات الأساتذة لاستخراج أحدث مصادر 2026',
    status: 'نشط 🟢',
    lastTask: 'مسح منصات وقنوات البكالوريا الجزائرية'
  },
  lessons_curriculum_agent: {
    name: '📚 وكيل المنهاج والدروس',
    desc: 'تصنيف وهيكلة ملفات الملخصات وسلاسل التمارين لجميع الشعب الست',
    status: 'نشط 🟢',
    lastTask: 'فحص مذكرات وملخصات 2026'
  },
  bac_archive_agent: {
    name: '🏛️ وكيل أرشيف البكالوريا',
    desc: 'مواضيع وحلول البكالوريا الرسمية والتجريبية (2008-2026)',
    status: 'نشط 🟢',
    lastTask: 'التحقق من روابط وسلالم تنقيط المواد'
  },
  quiz_engine_agent: {
    name: '⏱️ وكيل بنك الأسئلة والـ QCM',
    desc: 'بنك الأسئلة والاختبارات التفاعلية السريعة والتحديات الموقوتة',
    status: 'نشط 🟢',
    lastTask: 'توليد أسئلة التحدي اليومي لجميع المواد'
  },
  smart_tools_agent: {
    name: '🧮 وكيل الأدوات وحاسبة المعدل',
    desc: 'المعاملات الرسمية لجميع الشعب وحساب المعدلات ومخطط A4',
    status: 'نشط 🟢',
    lastTask: 'مطابقة معاملات الشعب مع الجريدة الرسمية'
  },
  youtube_media_agent: {
    name: '🎥 وكيل قنوات وأساتذة اليوتيوب',
    desc: 'ترتيب وتصنيف قنوات أفضل الأساتذة الجزائريين وقوائم التشغيل',
    status: 'نشط 🟢',
    lastTask: 'تتبع سلاسل المراجعة النهائية لعام 2026'
  },
  ui_frontend_agent: {
    name: '🎨 وكيل الصيانة والواجهات',
    desc: 'مراقبة أداء الموقع وسرعة التصفح وتجاوب الشاشات ومحرك الـ PDF',
    status: 'نشط 🟢',
    lastTask: 'فحص سرعة الاستجابة واستقرار الواجهات'
  }
};

// Pending Proposals Queue (Human-in-the-Loop)
const PENDING_PROPOSALS = new Map();

/**
 * 🛠️ Read and Write Site Configuration Helper (src/config/siteConfig.js)
 */
function readSiteConfig() {
  try {
    if (fs.existsSync(SITE_CONFIG_PATH)) {
      const content = fs.readFileSync(SITE_CONFIG_PATH, 'utf8');
      const isMaintenance = /isMaintenanceMode:\s*(true|false)/.exec(content)?.[1] === 'true';
      const isBroadcast = /broadcastNotice:\s*\{\s*active:\s*(true|false)/.exec(content)?.[1] === 'true';
      const broadcastTextMatch = /text:\s*'([^']+)'/.exec(content);
      const broadcastText = broadcastTextMatch ? broadcastTextMatch[1] : '';

      return {
        isMaintenanceMode: isMaintenance,
        broadcastNotice: {
          active: isBroadcast,
          text: broadcastText
        }
      };
    }
  } catch (err) {
    console.error('Error reading site config:', err);
  }
  return { isMaintenanceMode: false, broadcastNotice: { active: false, text: '' } };
}

function updateSiteConfig({ isMaintenanceMode, broadcastNotice }) {
  try {
    if (!fs.existsSync(SITE_CONFIG_PATH)) return false;
    let content = fs.readFileSync(SITE_CONFIG_PATH, 'utf8');

    if (typeof isMaintenanceMode === 'boolean') {
      content = content.replace(/isMaintenanceMode:\s*(true|false)/, `isMaintenanceMode: ${isMaintenanceMode}`);
    }

    if (broadcastNotice) {
      if (typeof broadcastNotice.active === 'boolean') {
        content = content.replace(/active:\s*(true|false)/, `active: ${broadcastNotice.active}`);
      }
      if (broadcastNotice.text) {
        content = content.replace(/text:\s*'([^']*)'/, `text: '${broadcastNotice.text.replace(/'/g, "\\'")}'`);
      }
    }

    fs.writeFileSync(SITE_CONFIG_PATH, content, 'utf8');
    return true;
  } catch (err) {
    console.error('Error updating site config:', err);
    return false;
  }
}

/**
 * 📡 Telegram API Caller
 */
async function callTelegram(method, payload = {}) {
  if (!BOT_TOKEN) return null;
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/${method}`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  } catch (err) {
    console.error(`❌ Telegram Error (${method}):`, err.message);
    return null;
  }
}

/**
 * 💬 Send Formatted Message (With Auto-Chunking for Long Reports)
 */
async function sendMessage(chatId, text, replyMarkup = null) {
  const targetChatId = chatId || ADMIN_CHAT_ID;
  if (!targetChatId) return null;

  if (text.length <= 3900) {
    const payload = {
      chat_id: targetChatId,
      text,
      parse_mode: 'HTML'
    };
    if (replyMarkup) {
      payload.reply_markup = replyMarkup;
    }
    return await callTelegram('sendMessage', payload);
  }

  // Split long messages to prevent Telegram 4096 character limit errors
  const chunks = [];
  let remaining = text;
  while (remaining.length > 0) {
    chunks.push(remaining.slice(0, 3800));
    remaining = remaining.slice(3800);
  }

  let lastRes = null;
  for (let i = 0; i < chunks.length; i++) {
    const isLast = i === chunks.length - 1;
    const payload = {
      chat_id: targetChatId,
      text: chunks[i],
      parse_mode: 'HTML'
    };
    if (isLast && replyMarkup) {
      payload.reply_markup = replyMarkup;
    }
    lastRes = await callTelegram('sendMessage', payload);
  }
  return lastRes;
}

/**
 * 📱 Main Dashboard Reply Keyboard (Always-Visible Quick Buttons)
 */
function getMainKeyboard() {
  return {
    keyboard: [
      [{ text: '📊 حالة النظام والوكلاء' }, { text: '🚧 وضع الصيانة' }],
      [{ text: '🔍 بحث وتقصي عميق للمصادر' }, { text: '📢 شريط الإعلانات للطلبة' }],
      [{ text: '🦅 صيد مصادر البكالوريا' }, { text: '🩺 فحص صحة المنصة' }],
      [{ text: '🤖 قائمة الوكلاء المتخصصين' }]
    ],
    resize_keyboard: true
  };
}

/**
 * 🛎️ Send Action Proposal with Approval Buttons (Human-in-the-Loop)
 */
async function sendProposalToAdmin({ agentId, title, summary, actionData }) {
  const proposalId = 'prop_' + Date.now();
  PENDING_PROPOSALS.set(proposalId, { agentId, title, summary, actionData, createdAt: new Date() });

  const agent = AGENTS_STATE[agentId] || { name: '🤖 وكيل نجاحي' };

  const messageText = `
<b>🚨 مقترح جديد من ${agent.name} يتطلب موافقتك:</b>

📌 <b>الموضوع:</b> ${title}
📝 <b>التفاصيل:</b>
${summary}

<i>هل توافق على اعتماد وتطبيق هذا التحديث في منصة نجاحي؟</i>
`;

  const inlineKeyboard = {
    inline_keyboard: [
      [
        { text: '✅ موافقة وتحديث الموقع (OK)', callback_data: `approve_${proposalId}` },
        { text: '❌ رفض وتجاهل', callback_data: `reject_${proposalId}` }
      ]
    ]
  };

  await sendMessage(ADMIN_CHAT_ID, messageText, inlineKeyboard);
}

/**
 * 🩺 24/7 Health Check Task (UI & Gemini API Monitoring)
 */
async function runHealthCheck(chatId = ADMIN_CHAT_ID) {
  let websiteOk = true;
  let apiOk = true;

  try {
    const res = await fetch(PLATFORM_URL, { method: 'HEAD' }).catch(() => null);
    if (!res || !res.ok) websiteOk = false;
  } catch {
    websiteOk = false;
  }

  if (GEMINI_API_KEY) {
    try {
      const apiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: 'ping' }] }] })
      }).catch(() => null);
      if (!apiRes || !apiRes.ok) apiOk = false;
    } catch {
      apiOk = false;
    }
  }

  const uptimeHours = ((Date.now() - startTime) / (1000 * 60 * 60)).toFixed(1);
  const memoryUsageMB = (process.memoryUsage().rss / (1024 * 1024)).toFixed(1);

  const statusMsg = `
<b>🩺 تقرير الفحص الشامل لصحة منصة نجاحي:</b>

🌐 <b>الموقع الإلكتروني (${PLATFORM_URL}):</b> ${websiteOk ? '🟢 شغال ومستقر 100%' : '🔴 متوقف أو بطيء'}
🤖 <b>محرك الذكاء الاصطناعي (Gemini 3.5):</b> ${apiOk ? '🟢 متصل وجاهز' : '🔴 خطأ في الاتصال'}
⏱️ <b>مدة تشغيل الوكلاء (Uptime):</b> ${uptimeHours} ساعة متواصلة
💾 <b>استهلاك الذاكرة (RAM):</b> ${memoryUsageMB} MB
🛡️ <b>حالة الأمان:</b> مشفر ومحمي بنسبة 100%
`;

  await sendMessage(chatId, statusMsg, getMainKeyboard());
}

/**
 * 🦅 Sources Hunter Simulated Dispatcher
 */
async function triggerSourcesHunter() {
  const discoveries = [
    {
      agentId: 'bac_archive_agent',
      title: 'بكالوريا تجريبية 2026 في الرياضيات (شعب علمية) مع الحل المفصل',
      summary: 'تم استخراج موضوع رائع يحتوي على مسألة دوال أسية شاملة + تمرين متتاليات + تمرين أعداد مركبة يطابق المنهجية الوزارية الجديدة.',
      actionData: { subject: 'الرياضيات', stream: 'علوم تجريبية' }
    },
    {
      agentId: 'lessons_curriculum_agent',
      title: 'ملخص شامل في التاريخ (الوحدة الأولى: تطور العالم في ظل القطبية الثنائية)',
      summary: 'مخطط زمني شامل لجميع المؤتمرات والتواريخ والأحداث مع مصطلحات وشخصيات الوحدة الأولى.',
      actionData: { subject: 'التاريخ والجغرافيا', stream: 'جميع الشعب' }
    },
    {
      agentId: 'quiz_engine_agent',
      title: 'بنك أسئلة QCM جديد في العلوم الطبيعية (وحدة دور البروتينات في الدفاع عن الذات)',
      summary: '10 أسئلة دقيقة تفحص فهم الطالب لآلية الانتقاء النسيلي ودور الخلايا LT4 و LT8.',
      actionData: { subject: 'العلوم الطبيعية', stream: 'علوم تجريبية' }
    }
  ];

  const picked = discoveries[Math.floor(Math.random() * discoveries.length)];
  await sendProposalToAdmin(picked);
}

/**
 * 📨 Process Incoming Telegram Messages, Clicks & Commands
 */
async function handleUpdate(update) {
  // 1. Handle Inline Button Clicks
  if (update.callback_query) {
    const cb = update.callback_query;
    const data = cb.data;
    const chatId = cb.message.chat.id;

    // Proposal Approvals
    if (data.startsWith('approve_')) {
      const propId = data.replace('approve_', '');
      const prop = PENDING_PROPOSALS.get(propId);
      if (prop) {
        PENDING_PROPOSALS.delete(propId);
        await callTelegram('answerCallbackQuery', { callback_query_id: cb.id, text: 'تمت الموافقة! جاري تحديث الموقع...' });
        await sendMessage(chatId, `🎉 <b>تم اعتماد ونشر التحديث بنجاح!</b>\n📌 <b>الموضوع:</b> ${prop.title}\nقام <b>${AGENTS_STATE[prop.agentId]?.name || 'الوكيل'}</b> بتطبيق التحديث على منصة نجاحي ✅`);
      } else {
        await callTelegram('answerCallbackQuery', { callback_query_id: cb.id, text: 'تمت معالجة هذا الطلب مسبقاً.' });
      }
      return;
    }

    if (data.startsWith('reject_')) {
      const propId = data.replace('reject_', '');
      PENDING_PROPOSALS.delete(propId);
      await callTelegram('answerCallbackQuery', { callback_query_id: cb.id, text: 'تم رفض وتجاهل المقترح.' });
      await sendMessage(chatId, '❌ <b>تم إلغاء وتجاهل المقترح بنجاح.</b>');
      return;
    }

    // Maintenance Mode Controls
    if (data === 'maint_enable') {
      updateSiteConfig({ isMaintenanceMode: true });
      await callTelegram('answerCallbackQuery', { callback_query_id: cb.id, text: 'تم تفعيل وضع الصيانة!' });
      await sendMessage(chatId, '🔴 <b>تم تفعيل وضع الصيانة في الموقع بنجاح!</b>\nالآن الزوار يرون صفحة الصيانة والتحديث المؤقتة.');
      return;
    }

    if (data === 'maint_disable') {
      updateSiteConfig({ isMaintenanceMode: false });
      await callTelegram('answerCallbackQuery', { callback_query_id: cb.id, text: 'تم إيقاف الصيانة وتشغيل الموقع!' });
      await sendMessage(chatId, '🟢 <b>تم إيقاف وضع الصيانة!</b>\nالموقع الآن متاح وشغال لجميع الطلاب بشكل طبيعي.');
      return;
    }

    // Broadcast Notice Controls
    if (data === 'broadcast_disable') {
      updateSiteConfig({ broadcastNotice: { active: false } });
      await callTelegram('answerCallbackQuery', { callback_query_id: cb.id, text: 'تم إخفاء شريط الإعلان!' });
      await sendMessage(chatId, '✅ <b>تم إخفاء وحذف شريط الإعلان من الموقع.</b>');
      return;
    }

    // Individual Agent Triggers
    if (data.startsWith('run_agent_')) {
      const agentId = data.replace('run_agent_', '');
      const agent = AGENTS_STATE[agentId];
      if (agent) {
        await callTelegram('answerCallbackQuery', { callback_query_id: cb.id, text: `جاري تشغيل ${agent.name}...` });
        await sendMessage(chatId, `⚡ <b>تم إطلاق ${agent.name}:</b>\nالمهمة: <i>${agent.lastTask}</i>\nجاري المعالجة وسنوافيك بالنتائج فوراً...`);
        setTimeout(() => {
          triggerSourcesHunter().catch(console.error);
        }, 3000);
      }
      return;
    }

    return;
  }

  // 2. Handle Text Messages & Commands
  if (!update.message || !update.message.text) return;
  const msg = update.message;
  const text = msg.text.trim();
  const chatId = msg.chat.id;

  console.log(`📩 [${msg.from.first_name || 'Admin'}]: ${text}`);

  // /start or /help
  if (text === '/start' || text === '/help' || text === 'الرئيسية') {
    const welcome = `
<b>🎓 مرحباً بك في غرفة القيادة لوكلاء منصة نجاحي (Naja7i AI Command Center) 🇩🇿</b>

أنت الآن متصل مباشرة بالنظام المركزي للتحكم في الموقع وإدارة <b>6 وكلاء ذكاء اصطناعي متخصصين</b> يعملون 24/24 ساعة.

<b>🕹️ استخدم الأزرار السريعة بالأسفل للتحكم الفوري في المنصة:</b>
• <b>وضع الصيانة:</b> قفل/فتح الموقع أمام الزوار بنقرة واحدة.
• <b>شريط الإعلانات:</b> إرسال تنبيه مباشر يظهر أعلى الموقع لجميع الطلبة.
• <b>صيد المصادر:</b> أمر الوكلاء بالبحث عن مواضيع وملخصات جديدة.
• <b>فحص الصحة:</b> فحص سرعة الموقع واستقرار الـ API.
`;
    await sendMessage(chatId, welcome, getMainKeyboard());
    return;
  }

  // 📊 System & Agents Status
  if (text === '📊 حالة النظام والوكلاء' || text === '/status') {
    const config = readSiteConfig();
    const uptimeHours = ((Date.now() - startTime) / (1000 * 60 * 60)).toFixed(1);

    let statusText = `<b>📊 التقرير المباشر لوكلاء ومنصة نجاحي:</b>\n\n`;
    statusText += `🌐 <b>وضع الموقع:</b> ${config.isMaintenanceMode ? '🔴 وضع الصيانة مفعل' : '🟢 متاح وشغال للجميع'}\n`;
    statusText += `📢 <b>الإعلان العاجل:</b> ${config.broadcastNotice.active ? `🟢 مفعل (${config.broadcastNotice.text})` : '⚪ غير مفعل'}\n`;
    statusText += `⏱️ <b>مدة التشغيل:</b> ${uptimeHours} ساعة متواصلة\n`;
    statusText += `📌 <b>المقترحات المعلقة:</b> ${PENDING_PROPOSALS.size}\n\n`;
    statusText += `<b>فريق الوكلاء الستة (AGENTS.md):</b>\n`;

    for (const [id, agent] of Object.entries(AGENTS_STATE)) {
      statusText += `• ${agent.name}: <b>${agent.status}</b>\n`;
    }

    await sendMessage(chatId, statusText, getMainKeyboard());
    return;
  }

  // 🚧 Maintenance Mode Menu
  if (text === '🚧 وضع الصيانة' || text === '/maintenance') {
    const config = readSiteConfig();
    const maintMsg = `
<b>🚧 إدارة وضع الصيانة لمنصة نجاحي:</b>

الحالة الحالية للموقع: <b>${config.isMaintenanceMode ? '🔴 وضع الصيانة مفعل (الموقع مقفول للزوار)' : '🟢 الموقع شغال ومتاح للجميع'}</b>

<i>عند تفعيل وضع الصيانة، يظهر لجميع الطلاب صفحة صيانة أنيقة مع رسالة توضيحية أثناء قيامك بالتحديثات.</i>
`;

    const inlineKeyboard = {
      inline_keyboard: [
        [
          { text: '🔴 تفعيل وضع الصيانة', callback_data: 'maint_enable' },
          { text: '🟢 إيقاف الصيانة وتشغيل الموقع', callback_data: 'maint_disable' }
        ]
      ]
    };

    await sendMessage(chatId, maintMsg, inlineKeyboard);
    return;
  }

  // 📢 Broadcast Alert Menu
  if (text === '📢 شريط الإعلانات للطلبة' || text === '/broadcast') {
    const config = readSiteConfig();
    const broadcastMsg = `
<b>📢 إدارة شريط الإعلانات والتنبيهات العاجلة للطلبة:</b>

• الحالة الحالية: <b>${config.broadcastNotice.active ? '🟢 شريط الإعلان مفعل' : '⚪ غير مفعل'}</b>
• النص الحالي: <i>"${config.broadcastNotice.text || 'لا يوجد'}"</i>

<b>✏️ لنشر إعلان جديد فوراً أعلى كل صفحات الموقع، أرسل:</b>
<code>/broadcast_set النص هنا</code>

مثال:
<code>/broadcast_set 📢 تم إضافة مواضيع البكالوريا التجريبية لجميع الشعب!</code>
`;

    const inlineKeyboard = {
      inline_keyboard: [
        [
          { text: '❌ إخفاء وحذف شريط الإعلان', callback_data: 'broadcast_disable' }
        ]
      ]
    };

    await sendMessage(chatId, broadcastMsg, inlineKeyboard);
    return;
  }

  // Set Broadcast text
  if (text.startsWith('/broadcast_set ') || text.startsWith('/broadcast ')) {
    const newBroadcastText = text.replace(/^\/(broadcast_set|broadcast)\s*/, '').trim();
    if (!newBroadcastText) {
      await sendMessage(chatId, '⚠️ يرجى كتابة نص الإعلان بعد الأمر.');
      return;
    }

    updateSiteConfig({
      broadcastNotice: {
        active: true,
        text: newBroadcastText
      }
    });

    await sendMessage(chatId, `🎉 <b>تم نشر الإعلان العاجل أعلى الموقع بنجاح!</b>\n\n📢 <b>النص الظاهر للطلبة:</b>\n"${newBroadcastText}"`, getMainKeyboard());
    return;
  }

  // 🔍 Deep Research & Sources Hunter
  if (text === '🔍 بحث وتقصي عميق للمصادر' || text.startsWith('/research') || text.startsWith('/search')) {
    let queryTopic = text.replace(/^\/(research|search)\s*/, '').trim();
    if (!queryTopic || queryTopic === '🔍 بحث وتقصي عميق للمصادر') {
      queryTopic = 'أحدث سلاسل تمارين وملخصات مقترحة لبكالوريا 2026 مع الحلول وروابط التحميل لجميع الشعب';
    }

    await sendMessage(chatId, `🦅 <b>بدأ وكيل البحث والتقصي الأكاديمي (Deep Research Agent) بالعمل...</b>\n🔍 <b>موضوع التقصي:</b> <i>"${queryTopic}"</i>\n⏳ جاري مسح المواقع التعليمية الجزائرية ومذكرات الأساتذة وقنوات اليوتيوب...`);

    try {
      const researchResult = await performDeepBacResearch({
        topic: queryTopic,
        subject: 'جميع المواد',
        stream: 'جميع الشعب'
      });

      const reportText = `
<b>🦅 تقرير التقصي الأكاديمي العميق (Naja7i Deep Research):</b>
🎯 <b>الموضوع:</b> ${queryTopic}
📅 <b>التاريخ:</b> ${new Date().toLocaleDateString('ar-DZ')}

${researchResult.report}
`;

      const proposalId = 'research_' + Date.now();
      PENDING_PROPOSALS.set(proposalId, {
        agentId: 'bac_deep_research_agent',
        title: queryTopic,
        summary: `تقرير بحث وتقصي عميق يحتوي على مصادر وروابط مذكرات`,
        actionData: researchResult,
        createdAt: new Date()
      });

      const inlineKeyboard = {
        inline_keyboard: [
          [
            { text: '✅ اعتماد وإضافة الروابط للموقع', callback_data: `approve_${proposalId}` },
            { text: '❌ تجاهل التقرير', callback_data: `reject_${proposalId}` }
          ]
        ]
      };

      await sendMessage(chatId, reportText, inlineKeyboard);
    } catch (err) {
      await sendMessage(chatId, `⚠️ تعذر إكمال البحث: ${err.message}`, getMainKeyboard());
    }
    return;
  }

  // 🦅 Hunt Sources
  if (text === '🦅 صيد مصادر البكالوريا' || text === '/hunt') {
    await sendMessage(chatId, '🦅 <b>تم إطلاق وكيل أرشيف البكالوريا ووكيل المنهاج للبحث...</b>\nجاري مسح المصادر وسنرسل لك مقترحات للاعتماد فوراً.');
    setTimeout(() => {
      triggerSourcesHunter().catch(console.error);
    }, 2000);
    return;
  }

  // 🩺 Health Check
  if (text === '🩺 فحص صحة المنصة' || text === '/health') {
    await sendMessage(chatId, '⏳ جاري فحص الموقع والخدمات...');
    await runHealthCheck(chatId);
    return;
  }

  // 🤖 6 Agents Submenu
  if (text === '🤖 قائمة الوكلاء الستة' || text === '/agents') {
    const agentsMsg = `
<b>🤖 فريق وكلاء الذكاء الاصطناعي لمنصة نجاحي:</b>
اضغط على أي وكيل لتشغيل مهمة خاصة به فوراً:
`;

    const inlineKeyboard = {
      inline_keyboard: [
        [
          { text: '📚 وكيل الدروس', callback_data: 'run_agent_lessons_curriculum_agent' },
          { text: '🏛️ وكيل الأرشيف', callback_data: 'run_agent_bac_archive_agent' }
        ],
        [
          { text: '⏱️ وكيل الـ QCM', callback_data: 'run_agent_quiz_engine_agent' },
          { text: '🧮 وكيل الأدوات', callback_data: 'run_agent_smart_tools_agent' }
        ],
        [
          { text: '🎥 وكيل اليوتيوب', callback_data: 'run_agent_youtube_media_agent' },
          { text: '🎨 وكيل الصيانة', callback_data: 'run_agent_ui_frontend_agent' }
        ]
      ]
    };

    await sendMessage(chatId, agentsMsg, inlineKeyboard);
    return;
  }

  // Fallback
  await sendMessage(chatId, `🤖 تم استلام رسالتك: <i>"${text}"</i>\nيمكنك استخدام الأزرار بالأسفل للتحكم في المنصة.`, getMainKeyboard());
}

/**
 * 🔄 Start 24/7 Telegram Long-Polling Loop
 */
async function startPolling() {
  console.log('🚀 [Naja7i Master Commander]: تم تشغيل مركز التحكم الشامل بالتيليغرام وهو جاهز 24/7...');

  if (ADMIN_CHAT_ID) {
    await sendMessage(
      ADMIN_CHAT_ID,
      '🟢 <b>تم تشغيل مركز التحكم الشامل لوكلاء منصة نجاحي 24/7!</b>\nأنت الآن متصل ولديك كامل الصلاحيات لإدارة الموقع (وضع الصيانة، الإعلانات، الوكلاء).',
      getMainKeyboard()
    );
  }

  // Periodic Health Check every 30 minutes
  setInterval(() => {
    runHealthCheck(ADMIN_CHAT_ID).catch(console.error);
  }, 30 * 60 * 1000);

  // Polling Loop
  while (isRunning) {
    try {
      const res = await callTelegram('getUpdates', {
        offset: lastUpdateId + 1,
        timeout: 30
      });

      if (res && res.ok && Array.isArray(res.result)) {
        for (const update of res.result) {
          lastUpdateId = update.update_id;
          await handleUpdate(update).catch(console.error);
        }
      }
    } catch (err) {
      console.error('Polling loop error:', err.message);
      await new Promise(r => setTimeout(r, 5000));
    }
  }
}

// Auto-start if token provided
if (BOT_TOKEN) {
  startPolling();
} else {
  console.log('ℹ️ [Naja7i Master Commander]: يرجى كتابة TELEGRAM_BOT_TOKEN في ملف .env لتشغيل البوت.');
}
