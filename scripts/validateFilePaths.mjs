import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { USER_STUDY_FILES } from '../src/data/userFilesData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../public');

let found = 0;
let missing = [];

for (const file of USER_STUDY_FILES) {
  const filePath = path.join(publicDir, file.fileUrl);
  if (fs.existsSync(filePath)) {
    found++;
  } else {
    missing.push({
      id: file.id,
      title: file.title,
      fileUrl: file.fileUrl
    });
  }
}

console.log(`Found: ${found} / ${USER_STUDY_FILES.length}`);
console.log(`Missing count: ${missing.length}`);
if (missing.length > 0) {
  console.log('Sample missing:');
  console.log(JSON.stringify(missing.slice(0, 10), null, 2));
}
