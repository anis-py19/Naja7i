import fs from 'fs';
import path from 'path';

function listAll(dir) {
  if (!fs.existsSync(dir)) return [];
  const results = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      results.push(...listAll(fullPath));
    } else {
      results.push({
        fullPath,
        relPath: path.relative(dir, fullPath).replace(/\\/g, '/'),
        name: item.name,
        size: fs.statSync(fullPath).size
      });
    }
  }
  return results;
}

const fileFromMe = listAll('public/FileFromMe');
const filesOld = listAll('public/files');

console.log(`public/FileFromMe count: ${fileFromMe.length}`);
console.log(`public/files count: ${filesOld.length}`);

// Check if any in FileFromMe is missing in public/files
const oldNames = new Set(filesOld.map(f => f.name));
const missingInOld = fileFromMe.filter(f => !oldNames.has(f.name));

console.log(`Files in FileFromMe not in public/files: ${missingInOld.length}`);
missingInOld.forEach(f => console.log('  -> ' + f.relPath));
