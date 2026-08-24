import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/analysis_output.json', 'utf8'));

const byFolder = {};
data.forEach(item => {
  if (!byFolder[item.topFolder]) byFolder[item.topFolder] = [];
  byFolder[item.topFolder].push(item);
});

for (const [folder, items] of Object.entries(byFolder)) {
  console.log(`\n=================== 📂 ${folder} (${items.length} files) ===================`);
  items.slice(0, 8).forEach(it => {
    console.log(`- [${it.ext.toUpperCase()}] "${it.cleanTitle}" (${it.size})`);
    console.log(`    URL: ${it.relPath}`);
  });
}
