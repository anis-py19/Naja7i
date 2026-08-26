import fs from 'node:fs';

const src = fs.readFileSync('src/data/userFilesData.js', 'utf8');
const urls = [...src.matchAll(/"fileUrl":\s*"([^"]+)"/g)].map((m) => m[1]);
const BASE = 'http://127.0.0.1:5199';

const bad = [];
let ok = 0;
for (const u of urls) {
  const encoded = encodeURI(decodeURI(u));
  try {
    const res = await fetch(BASE + encoded);
    const ct = res.headers.get('content-type') || '';
    const buf = Buffer.from(await res.arrayBuffer());
    const head = buf.subarray(0, 5).toString('latin1');
    if (!res.ok || (head !== '%PDF-' && u.toLowerCase().endsWith('.pdf'))) {
      bad.push({ u, status: res.status, ct, head, len: buf.length });
    } else ok++;
  } catch (e) {
    bad.push({ u, err: e.message });
  }
}
console.log('served OK:', ok, '/ ', urls.length);
console.log('BAD:', bad.length);
bad.slice(0, 40).forEach((b) => console.log(JSON.stringify(b).slice(0, 300)));
