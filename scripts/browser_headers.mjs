import puppeteer from 'file:///C:/Users/anisr/AppData/Local/Temp/naja7i-test/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://127.0.0.1:5199';
const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();

const seen = [];
page.on('request', (r) => {
  if (r.url().includes('FileFromMe')) seen.push({ phase: 'req', url: r.url().slice(-60), headers: r.headers() });
});
page.on('response', async (r) => {
  if (r.url().includes('FileFromMe')) {
    seen.push({ phase: 'res', status: r.status(), headers: r.headers(), fromCache: r.fromCache() });
  }
});

await page.goto(`${BASE}/library`, { waitUntil: 'networkidle2', timeout: 60000 });
const r = await page.evaluate(async () => {
  const url = encodeURI('/FileFromMe/Anglais/305433775-Written-Expressions-3as-1-pdf.pdf');
  const res = await fetch(url);
  const h = {};
  res.headers.forEach((v, k) => (h[k] = v));
  const ab = await res.arrayBuffer();
  // second attempt with cache bust
  const res2 = await fetch(url + '?v=1');
  const h2 = {};
  res2.headers.forEach((v, k) => (h2[k] = v));
  const ab2 = await res2.arrayBuffer();
  // third: no-store
  const res3 = await fetch(url, { cache: 'no-store' });
  const ab3 = await res3.arrayBuffer();
  return {
    a: { status: res.status, len: ab.byteLength, headers: h },
    b: { status: res2.status, len: ab2.byteLength, headers: h2 },
    c: { status: res3.status, len: ab3.byteLength },
  };
});
console.log(JSON.stringify(r, null, 2));
console.log('--- network events ---');
console.log(JSON.stringify(seen, null, 2).slice(0, 3000));
await browser.close();
