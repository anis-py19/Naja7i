import fs from 'fs';

const filePath = './src/data/userFilesData.js';
let content = fs.readFileSync(filePath, 'utf8');

const driveFolderUrl = 'https://drive.google.com/drive/folders/1t3HZtqpQA8F5qmI6nhoW35T5EN3h0SxR';

// Match each English item (subjectId: 'english' or ffm_1..ffm_15)
let updatedCount = 0;
content = content.replace(/(\"id\":\s*\"ffm_(?:[1-9]|1[0-5])\"[\s\S]*?\"fileUrl\":\s*\"[^\"]+\")/g, (match) => {
  if (!match.includes('driveFolderUrl')) {
    updatedCount++;
    return `${match},\n    "driveFolderUrl": "${driveFolderUrl}"`;
  }
  return match;
});

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Updated ${updatedCount} English files with Google Drive folder URL in userFilesData.js`);
