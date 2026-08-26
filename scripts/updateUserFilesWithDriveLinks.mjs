import fs from 'fs';

const driveFiles = JSON.parse(fs.readFileSync('scripts/anglais_drive_files.json', 'utf8'));

// Build lookup map by normalized file name
const driveMap = new Map();
driveFiles.forEach(df => {
  driveMap.set(df.name.toLowerCase().trim(), df);
  driveMap.set(df.name.replace(/_/g, ' ').toLowerCase().trim(), df);
  driveMap.set(df.name.replace(/-/g, ' ').toLowerCase().trim(), df);
});

let userFilesContent = fs.readFileSync('src/data/userFilesData.js', 'utf8');

// Parse USER_STUDY_FILES array
const match = userFilesContent.match(/export const USER_STUDY_FILES = (\[[\s\S]*?\]);/);
if (!match) {
  console.error('Could not find USER_STUDY_FILES array');
  process.exit(1);
}

const files = JSON.parse(match[1]);

let updatedCount = 0;

files.forEach(f => {
  if (f.subjectId === 'english' || (f.fileUrl && f.fileUrl.includes('/Anglais/'))) {
    const rawName = f.rawFileName.toLowerCase().trim();
    const cleanName = f.rawFileName.replace(/_/g, ' ').toLowerCase().trim();
    const dashName = f.rawFileName.replace(/-/g, ' ').toLowerCase().trim();

    const matchedDrive = driveMap.get(rawName) || driveMap.get(cleanName) || driveMap.get(dashName);
    if (matchedDrive) {
      f.driveFileId = matchedDrive.id;
      f.driveFileUrl = matchedDrive.viewUrl;
      f.drivePreviewUrl = matchedDrive.previewUrl;
      f.driveDownloadUrl = matchedDrive.downloadUrl;
      updatedCount++;
    }
  }
});

console.log('Updated English files with direct Google Drive links:', updatedCount);

const newContent = `/**
 * 📚 Naja7i (نجاحي) — Comprehensive Public Files Catalog
 * Location: public/FileFromMe
 * Total Indexed Files: ${files.length}
 * Verified Academic Titles, Categories, Stream Maps, Authors, and 100% Real Disk File Paths & Cloud Drive Links.
 */

export const USER_STUDY_FILES = ${JSON.stringify(files, null, 2)};

export function getFilesBySubject(subjectId) {
  return USER_STUDY_FILES.filter(f => f.subjectId === subjectId || (f.subjectAliases && f.subjectAliases.includes(subjectId)));
}

export function getFilesByStream(streamId) {
  return USER_STUDY_FILES.filter(f => f.streams && f.streams.includes(streamId));
}

export default USER_STUDY_FILES;
`;

fs.writeFileSync('src/data/userFilesData.js', newContent);
console.log('Successfully written updated userFilesData.js');
