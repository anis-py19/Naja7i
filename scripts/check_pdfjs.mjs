import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');

const src = fs.readFileSync('src/data/userFilesData.js', 'utf8');
const urls = [...src.matchAll(/"fileUrl":\s*"([^"]+)"/g)].map((m) => m[1]);

const CMAP = pathToFileURL('node_modules/pdfjs-dist/cmaps/').href;
const FONTS = pathToFileURL('node_modules/pdfjs-dist/standard_fonts/').href;
const WASM = pathToFileURL('node_modules/pdfjs-dist/wasm/').href;
const ICC = pathToFileURL('node_modules/pdfjs-dist/iccs/').href;

const failures = [];
const warnings = [];
let ok = 0;

for (const u of urls) {
  if (!u.toLowerCase().endsWith('.pdf')) continue;
  const p = path.join('public', decodeURIComponent(u));
  const data = new Uint8Array(fs.readFileSync(p));
  const captured = [];
  try {
    const task = pdfjs.getDocument({
      data,
      cMapUrl: CMAP,
      cMapPacked: true,
      standardFontDataUrl: FONTS,
      wasmUrl: WASM,
      iccUrl: ICC,
      verbosity: 0,
    });
    const doc = await task.promise;
    // exercise page 1 like the modal does
    const page = await doc.getPage(1);
    page.getViewport({ scale: 1.2 });
    const opList = await page.getOperatorList();
    if (!opList.fnArray.length) captured.push('EMPTY_OPLIST');
    await task.destroy();
    if (captured.length) warnings.push([u, captured.join(',')]);
    ok++;
  } catch (e) {
    failures.push([u, e?.name + ': ' + e?.message]);
  }
}
console.log('parsed+page1 OK:', ok);
console.log('FAILURES:', failures.length);
failures.forEach(([u, m]) => console.log('  FAIL', u, '=>', m));
console.log('WARNINGS:', warnings.length);
warnings.slice(0, 20).forEach(([u, m]) => console.log('  WARN', u, '=>', m));
