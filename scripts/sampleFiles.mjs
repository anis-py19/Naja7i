import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { USER_STUDY_FILES } from '../src/data/userFilesData.js';

const sample = USER_STUDY_FILES.slice(0, 15);
console.log('Sample verified files:');
sample.forEach(s => {
  console.log(`- [${s.subjectName}] ${s.title} -> ${s.fileUrl}`);
});
