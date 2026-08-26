import puppeteer from 'file:///C:/Users/anisr/AppData/Local/Temp/naja7i-test/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://127.0.0.1:5199';

async function run(label, extraArgs) {
  const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', ...extraArgs] });
  const page = await browser.newPage();
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  const out = await page.evaluate(async () => {
    const targets = [
      '/logo.jpg',
      '/FileFromMe/Anglais/305433775-Written-Expressions-3as-1-pdf.pdf',
      '/FileFromMe/Philo/' + encodeURIComponent('جميع المقالات الفلسفية.doc'),
      '/vite.svg',
    ];
    const rows = [];
    for (const t of targets) {
      try {
        const r = await fetch(t);
        const b = await r.arrayBuffer();
        rows.push(`${r.status} len=${b.byteLength} ct=${r.headers.get('content-type')} :: ${t.slice(0, 55)}`);
      } catch (e) {
        rows.push(`ERR ${e.message} :: ${t.slice(0, 55)}`);
      }
    }
    // XHR path too
    const xhrRes = await new Promise((res) => {
      const x = new XMLHttpRequest();
      x.open('GET', '/FileFromMe/Anglais/305433775-Written-Expressions-3as-1-pdf.pdf');
      x.responseType = 'arraybuffer';
      x.onload = () => res(`XHR ${x.status} len=${x.response?.byteLength}`);
      x.onerror = () => res('XHR error');
      x.send();
    });
    rows.push(xhrRes);
    return rows;
  });
  console.log(`\n### ${label}`);
  out.forEach((o) => console.log('   ', o));
  await browser.close();
}

await run('default headless', []);
await run('no-proxy-server', ['--no-proxy-server']);
await run('proxy-bypass-list', ['--proxy-bypass-list=*']);
