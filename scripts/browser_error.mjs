import puppeteer from 'file:///C:/Users/anisr/AppData/Local/Temp/naja7i-test/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://127.0.0.1:5199';

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 900 });

const logs = [];
page.on('console', async (m) => {
  const parts = [];
  for (const a of m.args()) {
    try {
      parts.push(await a.evaluate((v) => (v instanceof Error ? `${v.name}: ${v.message}\n${v.stack}` : typeof v === 'object' ? JSON.stringify(v) : String(v))));
    } catch { parts.push('<unserializable>'); }
  }
  logs.push(`[${m.type()}] ${parts.join(' ')}`);
});
page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}\n${e.stack}`));
page.on('requestfailed', (r) => logs.push(`[reqfail] ${r.url().slice(0, 160)} :: ${r.failure()?.errorText}`));
page.on('response', (r) => { if (r.status() >= 400) logs.push(`[http ${r.status()}] ${r.url().slice(0, 160)}`); });

await page.goto(`${BASE}/library`, { waitUntil: 'networkidle2', timeout: 60000 });
await new Promise((r) => setTimeout(r, 1200));
await page.evaluate(() => {
  const b = [...document.querySelectorAll('button')].find((x) => /قراءة/.test(x.textContent || ''));
  b?.click();
});
await new Promise((r) => setTimeout(r, 7000));

console.log('=== FULL LOG ===');
[...new Set(logs)].forEach((l) => console.log(l.slice(0, 1400), '\n'));
await browser.close();
