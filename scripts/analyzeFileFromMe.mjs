import fs from 'fs';
import path from 'path';

const baseDir = path.resolve('public/FileFromMe');

function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const files = getAllFiles(baseDir);
console.log(`Total files found in public/FileFromMe: ${files.length}`);

// Group by top folder / extension
const subjectStats = {};
const extStats = {};

files.forEach(f => {
  const rel = path.relative(baseDir, f);
  const parts = rel.split(path.sep);
  const folder = parts[0] || 'Root';
  subjectStats[folder] = (subjectStats[folder] || 0) + 1;
  const ext = path.extname(f).toLowerCase() || 'no_ext';
  extStats[ext] = (extStats[ext] || 0) + 1;
});

console.log('--- Subject Folder Breakdown ---');
console.log(JSON.stringify(subjectStats, null, 2));

console.log('--- File Extensions Breakdown ---');
console.log(JSON.stringify(extStats, null, 2));
