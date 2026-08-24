import fs from 'fs';
import path from 'path';
import { USER_STUDY_FILES } from '../src/data/userFilesData.js';

console.log('Total files in catalog:', USER_STUDY_FILES.length);

const matched = USER_STUDY_FILES.filter(f => f.title.includes('الأسئلة') || f.rawFileName.includes('الأسئلة'));
console.log('Matched files:', JSON.stringify(matched, null, 2));

matched.forEach(f => {
  const disk = path.resolve('public' + f.rawPath);
  console.log(`Checking: ${disk}`);
  console.log(`Exists? ${fs.existsSync(disk)}`);
});
