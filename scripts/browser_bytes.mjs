import puppeteer from 'file:///C:/Users/anisr/AppData/Local/Temp/naja7i-test/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BASE = 'http://127.0.0.1:5199';
const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
page.on('console', (m) => console.log('[page]', m.text().slice(0, 400)));
page.on('pageerror', (e) => console.log('[pageerror]', e.message));

await page.goto(`${BASE}/library`, { waitUntil: 'networkidle2', timeout: 60000 });

const out = await page.evaluate(async () => {
  const url = '/FileFromMe/Anglais/305433775-Written-Expressions-3as-1-pdf.pdf';
  const res = await fetch(encodeURI(decodeURI(url)));
  const ab = await res.arrayBuffer();
  const step1 = { ok: res.ok, status: res.status, ct: res.headers.get('content-type'), abLen: ab.byteLength };

  const blob = new Blob([ab], { type: 'application/pdf' });
  const step2 = { blobSize: blob.size, abLenAfterBlob: ab.byteLength };

  // Now load pdf.js the same way the app does
  const lib = await import('/node_modules/pdfjs-dist/build/pdf.mjs');
  lib.GlobalWorkerOptions.workerSrc = '/node_modules/pdfjs-dist/build/pdf.worker.min.mjs';

  const step3 = { abLenBeforeGetDoc: ab.byteLength };
  let step4;
  try {
    const task = lib.getDocument({
      data: ab,
      cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@legacy/cmaps/',
      cMapPacked: true,
      standardFontDataUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@legacy/standard_fonts/',
    });
    const doc = await task.promise;
    step4 = { numPages: doc.numPages };
  } catch (e) {
    step4 = { err: `${e.name}: ${e.message}`, abLenAfterFail: ab.byteLength };
  }
  return { step1, step2, step3, step4 };
});
console.log(JSON.stringify(out, null, 2));
await browser.close();
