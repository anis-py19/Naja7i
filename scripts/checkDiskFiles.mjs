import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../public/FileFromMe');

function scanDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(scanDir(fullPath));
    } else {
      results.push({
        fullPath,
        relPath: path.relative(path.resolve(__dirname, '../public'), fullPath).replace(/\\/g, '/'),
        name: file,
        size: stat.size
      });
    }
  });
  return results;
}

const diskFiles = scanDir(publicDir);
console.log(`Total files on disk: ${diskFiles.length}`);

// Check question marks in filenames
const corrupted = diskFiles.filter(f => f.name.includes('?'));
console.log(`Files with '?' in name on disk: ${corrupted.length}`);
corrupted.slice(0, 10).forEach(f => {
  console.log(' - ' + f.name);
});
