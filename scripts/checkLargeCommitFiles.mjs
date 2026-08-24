import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const out = execSync('git diff-tree --no-commit-id --name-only -r 1869458', { encoding: 'utf8' });
const files = out.trim().split('\n');

const largeFiles = [];
files.forEach(f => {
  const cleanF = f.replace(/^"|"$/g, '').replace(/\\(\d{3})/g, (_, oct) => String.fromCharCode(parseInt(oct, 8)));
  const p = path.resolve(cleanF);
  if (fs.existsSync(p)) {
    const sizeMB = fs.statSync(p).size / (1024 * 1024);
    if (sizeMB > 50) {
      largeFiles.push({ path: cleanF, sizeMB: sizeMB.toFixed(2) + ' MB' });
    }
  }
});

console.log('Large files in commit (>50MB):', largeFiles);
