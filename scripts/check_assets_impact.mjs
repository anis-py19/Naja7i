import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');

const src = fs.readFileSync('src/data/userFilesData.js', 'utf8');
const urls = [...src.matchAll(/"fileUrl":\s*"([^"]+)"/g)].map((m) => m[1]).filter((u) => u.endsWith('.pdf'));

const GOOD = {
  cMapUrl: pathToFileURL('node_modules/pdfjs-dist/cmaps/').href,
  cMapPacked: true,
  standardFontDataUrl: pathToFileURL('node_modules/pdfjs-dist/standard_fonts/').href,
  wasmUrl: pathToFileURL('node_modules/pdfjs-dist/wasm/').href,
  iccUrl: pathToFileURL('node_modules/pdfjs-dist/iccs/').href,
};

// exactly what PdfReaderModal.jsx currently passes (both CDN URLs are 404)
const CURRENT = {
  cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@legacy/cmaps/',
  cMapPacked: true,
  standardFontDataUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@legacy/standard_fonts/',
};

async function probe(u, opts) {
  const p = path.join('public', decodeURIComponent(u));
  const data = new Uint8Array(fs.readFileSync(p));
  const errs = [];
  const origWarn = console.warn, origErr = console.error, origLog = console.log;
  console.warn = console.error = (...a) => errs.push(String(a[0]));
  try {
    const task = pdfjs.getDocument({ data, verbosity: 1, ...opts });
    const doc = await task.promise;
    const nPages = Math.min(doc.numPages, 3);
    let jpx = 0, missingFont = 0;
    for (let i = 1; i <= nPages; i++) {
      const page = await doc.getPage(i);
      const ops = await page.getOperatorList();
      // OPS.paintImageXObject etc. -- just count ops
      if (!ops.fnArray.length) errs.push('EMPTY_OPLIST p' + i);
    }
    await task.destroy();
    return { errs };
  } catch (e) {
    return { errs, fatal: e?.name + ': ' + e?.message };
  } finally {
    console.warn = origWarn; console.error = origErr; console.log = origLog;
  }
}

const interesting = [];
for (const u of urls) {
  const cur = await probe(u, CURRENT);
  const good = await probe(u, GOOD);
  const curBad = (cur.fatal ? 1 : 0) + cur.errs.length;
  const goodBad = (good.fatal ? 1 : 0) + good.errs.length;
  if (curBad > goodBad) {
    interesting.push({ u, curFatal: cur.fatal, curErrs: [...new Set(cur.errs)].slice(0, 4), goodErrs: [...new Set(good.errs)].slice(0, 2) });
  }
}
console.log('\n=== FILES THAT DEGRADE WITH CURRENT (broken) CONFIG:', interesting.length, '===');
for (const i of interesting.slice(0, 40)) {
  console.log('\n', i.u);
  if (i.curFatal) console.log('    FATAL:', i.curFatal);
  i.curErrs.forEach((e) => console.log('    cur:', e.slice(0, 180)));
  i.goodErrs.forEach((e) => console.log('    good:', e.slice(0, 180)));
}
