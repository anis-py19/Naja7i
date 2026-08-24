import fs from 'fs';
import path from 'path';

const targetDirs = [
  path.resolve('c:/Users/anisr/OneDrive/Desktop/Naja7i/BAC_Archive_2008_2026'),
  path.resolve('c:/Users/anisr/OneDrive/Desktop/Naja7i/naja7i/public/BAC_Archive')
];

let removedCount = 0;

function removeAmazighFolders(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.includes('أمازيغ') || entry.name.includes('امازيغ') || entry.name.toLowerCase().includes('amazigh')) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        removedCount++;
        console.log(`Deleted: ${fullPath}`);
      } else {
        removeAmazighFolders(fullPath);
      }
    }
  }
}

for (const target of targetDirs) {
  removeAmazighFolders(target);
}

console.log(`✅ Total Amazigh folders removed: ${removedCount}`);
