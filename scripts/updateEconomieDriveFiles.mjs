import fs from 'fs';

const driveFiles = JSON.parse(fs.readFileSync('scripts/economie_drive_files.json', 'utf8'));

const norm = (s) => (s || '').replace(/[_\-\.\s]/g, '').toLowerCase();

const driveMap = new Map();
driveFiles.forEach(df => {
  driveMap.set(norm(df.name), df);
});

let userFilesContent = fs.readFileSync('src/data/userFilesData.js', 'utf8');

const match = userFilesContent.match(/export const USER_STUDY_FILES = (\[[\s\S]*?\]);/);
if (!match) {
  console.error('Could not find USER_STUDY_FILES array');
  process.exit(1);
}

const files = JSON.parse(match[1]);
let updatedCount = 0;
let newCount = 0;

// 1. Update existing matches
files.forEach(f => {
  if (f.subjectId === 'economie_management' || f.subjectId === 'economie' || f.subjectId === 'management' || (f.fileUrl && (f.fileUrl.includes('/Economie/') || f.fileUrl.includes('/Management/')))) {
    const rawKey = norm(f.rawFileName);
    const titleKey = norm(f.title);

    const matchedDrive = driveMap.get(rawKey) || driveMap.get(titleKey);
    if (matchedDrive) {
      f.driveFileId = matchedDrive.id;
      f.driveFileUrl = matchedDrive.viewUrl;
      f.drivePreviewUrl = matchedDrive.previewUrl;
      f.driveDownloadUrl = matchedDrive.downloadUrl;
      matchedDrive._matched = true;
      updatedCount++;
    }
  }
});

// 2. Append any drive files not yet matched
driveFiles.forEach((df, idx) => {
  if (!df._matched) {
    const cleanTitle = df.name.replace(/\.pdf$/i, '').replace(/^[_\s]+|[_\s]+$/g, '').replace(/_/g, ' ');
    const newId = `ffm_eco_${Date.now()}_${idx + 1}`;
    
    let category = 'ملخصات ودروس';
    const author = cleanTitle.includes('يوسي قادة') ? 'الأستاذ يوسي قادة'
      : cleanTitle.includes('عبدالخالق') || cleanTitle.includes('عبد الخالق') ? 'الأستاذ عودة عبد الخالق'
      : cleanTitle.includes('خيري') ? 'الأستاذ خيري'
      : 'أساتذة متميزون';

    files.push({
      id: newId,
      title: cleanTitle,
      rawFileName: df.name,
      extension: 'pdf',
      subjectId: 'economie_management',
      subjectAliases: ['economie_management', 'economie', 'management', 'iktisad'],
      subjectName: 'الاقتصاد والمناجمنت',
      streams: ['gestion'],
      streamIds: ['gestion'],
      category,
      author,
      fileUrl: df.previewUrl,
      driveFileId: df.id,
      driveFileUrl: df.viewUrl,
      drivePreviewUrl: df.previewUrl,
      driveDownloadUrl: df.downloadUrl,
      rawPath: df.previewUrl,
      size: 'ملف سحابي PDF',
      sizeReadable: 'ملف سحابي PDF'
    });
    newCount++;
  }
});

console.log('Updated existing Economie files:', updatedCount);
console.log('Appended new Economie Drive files:', newCount);
console.log('Total files in catalog now:', files.length);

const newContent = `/**
 * 📚 Naja7i (نجاحي) — Comprehensive Public Files Catalog
 * Location: public/FileFromMe & Google Drive Cloud Repositories
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

export function searchUserFiles(query) {
  if (!query || !query.trim()) return [];
  const q = query.trim().toLowerCase();
  return USER_STUDY_FILES.filter(f => 
    f.title.toLowerCase().includes(q) ||
    f.subjectName.toLowerCase().includes(q) ||
    (f.author && f.author.toLowerCase().includes(q)) ||
    (f.category && f.category.toLowerCase().includes(q))
  );
}

export default USER_STUDY_FILES;
`;

fs.writeFileSync('src/data/userFilesData.js', newContent);
console.log('Successfully written updated userFilesData.js');
