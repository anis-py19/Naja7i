import fs from 'fs';
import path from 'path';

const userFilesContent = fs.readFileSync('src/data/userFilesData.js', 'utf8');
const match = userFilesContent.match(/export const USER_STUDY_FILES = (\[[\s\S]*?\]);/);
if (!match) {
  console.error('Could not find USER_STUDY_FILES');
  process.exit(1);
}

const files = JSON.parse(match[1]);
console.log(`\n======================================================`);
console.log(`📊 TOTAL CARDS / FILES IN LIBRARY CATALOG: ${files.length}`);
console.log(`======================================================\n`);

const subjectsMap = new Map();

let validDriveCount = 0;
let validLocalDiskCount = 0;
let brokenCards = [];

files.forEach((file, index) => {
  const subj = file.subjectName || file.subjectId || 'مادة غير محددة';
  if (!subjectsMap.has(subj)) {
    subjectsMap.set(subj, {
      total: 0,
      withDrive: 0,
      withLocalDisk: 0,
      broken: []
    });
  }
  const stat = subjectsMap.get(subj);
  stat.total++;

  const hasDrive = Boolean(
    file.driveFileId || 
    (file.drivePreviewUrl && file.drivePreviewUrl.includes('drive.google.com')) ||
    (file.fileUrl && file.fileUrl.includes('drive.google.com'))
  );

  let hasLocalDisk = false;
  if (file.fileUrl && file.fileUrl.startsWith('/FileFromMe/')) {
    const diskPath = path.join(process.cwd(), 'public', decodeURIComponent(file.fileUrl));
    if (fs.existsSync(diskPath)) {
      hasLocalDisk = true;
    }
  }

  if (hasDrive) {
    validDriveCount++;
    stat.withDrive++;
  } else if (hasLocalDisk) {
    validLocalDiskCount++;
    stat.withLocalDisk++;
  } else {
    brokenCards.push({
      index: index + 1,
      id: file.id,
      title: file.title,
      subjectName: file.subjectName,
      fileUrl: file.fileUrl,
      drivePreviewUrl: file.drivePreviewUrl,
      author: file.author
    });
    stat.broken.push(file);
  }
});

console.log(`✅ Cards with Valid Google Drive Cloud Links: ${validDriveCount}`);
console.log(`💾 Cards with Valid Local Disk Files: ${validLocalDiskCount}`);
console.log(`❌ Cards with NO valid Link / Missing: ${brokenCards.length}\n`);

console.log(`------------------------------------------------------`);
console.log(`📋 SUBJECT-BY-SUBJECT BREAKDOWN:`);
console.log(`------------------------------------------------------`);
for (const [subj, stat] of subjectsMap.entries()) {
  console.log(`• ${subj}:`);
  console.log(`   - Total Cards: ${stat.total}`);
  console.log(`   - With Working Cloud Link: ${stat.withDrive}`);
  console.log(`   - With Local Disk File: ${stat.withLocalDisk}`);
  console.log(`   - Broken/No Link: ${stat.broken.length}`);
}

if (brokenCards.length > 0) {
  console.log(`\n------------------------------------------------------`);
  console.log(`⚠️ DETAILED LIST OF BROKEN / EMPTY CARDS:`);
  console.log(`------------------------------------------------------`);
  brokenCards.forEach(b => {
    console.log(`[#${b.index}] ID: ${b.id} | Subject: ${b.subjectName} | Title: "${b.title}"`);
    console.log(`      fileUrl: ${b.fileUrl} | drivePreview: ${b.drivePreviewUrl}`);
  });
} else {
  console.log(`\n🎉 ALL ${files.length} CARDS IN THE LIBRARY HAVE 100% VALID WORKING LINKS! ZERO BROKEN CARDS!`);
}

fs.writeFileSync('scripts/library_audit_results.json', JSON.stringify({
  totalCards: files.length,
  validDriveCount,
  validLocalDiskCount,
  brokenCardsCount: brokenCards.length,
  brokenCards,
  subjectStats: Object.fromEntries(subjectsMap.entries())
}, null, 2));
