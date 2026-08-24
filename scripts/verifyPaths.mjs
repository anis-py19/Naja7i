import fs from 'fs';
import path from 'path';
import { USER_STUDY_FILES } from '../src/data/userFilesData.js';

let missing = 0;
let present = 0;

USER_STUDY_FILES.forEach(item => {
  const diskPath = path.resolve('public' + item.rawPath);
  if (fs.existsSync(diskPath)) {
    present++;
  } else {
    missing++;
    console.error(`MISSING: ${diskPath}`);
  }
});

console.log(`Verification: ${present} files present on disk, ${missing} missing files.`);
