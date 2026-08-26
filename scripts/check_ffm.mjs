import fs from 'node:fs';
import path from 'node:path';

const src = fs.readFileSync('src/data/userFilesData.js', 'utf8');
const urls = [...src.matchAll(/"fileUrl":\s*"([^"]+)"/g)].map((m) => m[1]);
console.log('data entries:', urls.length);

const missing = [];
for (const u of urls) {
  const p = path.join('public', decodeURIComponent(u));
  if (!fs.existsSync(p)) missing.push(u);
}
console.log('MISSING ON DISK:', missing.length);
missing.slice(0, 30).forEach((m) => console.log('   ', m));

const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]
  );
const disk = walk('public/FileFromMe').map(
  (p) => '/' + p.split(path.sep).join('/').replace(/^public\//, '')
);
const set = new Set(urls);
const orphan = disk.filter((d) => !set.has(d));
console.log('DISK FILES NOT IN DATA:', orphan.length);
orphan.slice(0, 30).forEach((m) => console.log('   ', m));

// Characters that break URL fetching
const risky = { '#': [], '?': [], '%': [], '+': [], '&': [], "'": [], '[': [], ']': [] };
for (const u of urls) {
  for (const c of Object.keys(risky)) if (u.includes(c)) risky[c].push(u);
}
console.log('\n--- risky chars in paths ---');
for (const [c, list] of Object.entries(risky)) {
  console.log(`  "${c}" -> ${list.length}`);
  list.slice(0, 3).forEach((l) => console.log('       ', l));
}

// Validate real PDF magic bytes on disk
let notPdf = [];
let tiny = [];
for (const f of disk) {
  const p = path.join('public', decodeURIComponent(f));
  const stat = fs.statSync(p);
  if (stat.size < 1024) tiny.push([f, stat.size]);
  const fd = fs.openSync(p, 'r');
  const buf = Buffer.alloc(5);
  fs.readSync(fd, buf, 0, 5, 0);
  fs.closeSync(fd);
  if (buf.toString('latin1') !== '%PDF-') notPdf.push([f, buf.toString('latin1')]);
}
console.log('\nFILES WITHOUT %PDF- HEADER:', notPdf.length);
notPdf.slice(0, 30).forEach(([f, h]) => console.log('   ', f, '=>', JSON.stringify(h)));
console.log('FILES < 1KB:', tiny.length);
tiny.slice(0, 20).forEach(([f, s]) => console.log('   ', f, s, 'bytes'));

// Check encodeURI(decodeURI(x)) round trip safety
let decodeFails = [];
for (const u of urls) {
  try {
    encodeURI(decodeURI(u));
  } catch (e) {
    decodeFails.push([u, e.message]);
  }
}
console.log('\ndecodeURI() THROWS ON:', decodeFails.length);
decodeFails.slice(0, 20).forEach(([u, m]) => console.log('   ', u, '=>', m));
