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
page.on('console', (m) => logs.push(`[${m.type()}] ${m.text()}`));
page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}`));
page.on('requestfailed', (r) => logs.push(`[reqfail] ${r.url().slice(0, 120)} :: ${r.failure()?.errorText}`));
page.on('response', (r) => {
  if (r.status() >= 400) logs.push(`[http ${r.status()}] ${r.url().slice(0, 140)}`);
});

await page.goto(`${BASE}/library`, { waitUntil: 'networkidle2', timeout: 60000 });
await new Promise((r) => setTimeout(r, 1500));

console.log('--- page title:', await page.title());

// Find and click the first file card that opens the PDF modal
const clicked = await page.evaluate(() => {
  const btns = [...document.querySelectorAll('button')];
  const target = btns.find((b) => /استعراض|قراءة|فتح|عرض/.test(b.textContent || ''));
  if (target) {
    target.click();
    return target.textContent.trim().slice(0, 60);
  }
  return null;
});
console.log('--- clicked:', clicked);

await new Promise((r) => setTimeout(r, 6000));

const state = await page.evaluate(() => {
  const canvas = document.querySelector('canvas');
  const iframe = document.querySelector('iframe');
  let nonBlank = null;
  if (canvas) {
    try {
      const ctx = canvas.getContext('2d');
      const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let nonWhite = 0;
      for (let i = 0; i < d.length; i += 4 * 97) {
        if (d[i] < 245 || d[i + 1] < 245 || d[i + 2] < 245) nonWhite++;
      }
      nonBlank = nonWhite;
    } catch (e) {
      nonBlank = 'ERR ' + e.message;
    }
  }
  return {
    hasCanvas: !!canvas,
    canvasW: canvas?.width,
    canvasH: canvas?.height,
    cssW: canvas ? getComputedStyle(canvas).width : null,
    nonWhiteSamples: nonBlank,
    hasIframe: !!iframe,
    iframeSrc: iframe?.src?.slice(0, 80),
    bodyHasError: /تعذر|⚠️/.test(document.body.innerText),
    pageIndicator: document.body.innerText.match(/\d+\s*\/\s*\d+/)?.[0] || null,
  };
});
console.log('--- viewer state:', JSON.stringify(state, null, 2));

console.log('\n--- console/network log ---');
[...new Set(logs)].slice(0, 60).forEach((l) => console.log(l.slice(0, 300)));

await page.screenshot({ path: 'scripts/shot-before.png' });
console.log('\nscreenshot -> scripts/shot-before.png');
await browser.close();
