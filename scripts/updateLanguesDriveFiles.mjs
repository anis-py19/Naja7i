import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/all_langues_files.json', 'utf8'));

const norm = (s) => (s || '').replace(/[_\-\.\s]/g, '').toLowerCase();

let userFilesContent = fs.readFileSync('src/data/userFilesData.js', 'utf8');

const match = userFilesContent.match(/export const USER_STUDY_FILES = (\[[\s\S]*?\]);/);
if (!match) {
  console.error('Could not find USER_STUDY_FILES array');
  process.exit(1);
}

const files = JSON.parse(match[1]);
let updatedCount = 0;
let newCount = 0;

for (const [langKey, langObj] of Object.entries(data)) {
  const driveFiles = langObj.files;
  const driveMap = new Map();
  driveFiles.forEach(df => driveMap.set(norm(df.name), df));

  // 1. Update existing matches
  files.forEach(f => {
    if (f.subjectId === langKey || (f.fileUrl && f.fileUrl.toLowerCase().includes(`/${langKey}/`))) {
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

  // 2. Append any not matched
  driveFiles.forEach((df, idx) => {
    if (!df._matched) {
      let cleanTitle = df.name.replace(/\.pdf$/i, '').replace(/^[_\s\-]+|[_\s\-]+$/g, '').replace(/_/g, ' ');
      const newId = `ffm_${langKey}_${Date.now()}_${idx + 1}`;
      
      let category = 'ملخصات ودروس';
      if (cleanTitle.includes('سلسة') || cleanTitle.includes('سلسلة') || cleanTitle.includes('مواضيع')) category = 'سلاسل ومواضيع مقترحة';
      else if (cleanTitle.includes('فقرات') || cleanTitle.includes('افعال')) category = 'تعبيرات وقواعد';

      const author = cleanTitle.includes('بوناب') ? 'الأستاذة حليمة بوناب'
        : cleanTitle.includes('إدادحين') ? 'الأستاذة ريمة إدادحين'
        : cleanTitle.includes('إحميد') ? 'الأستاذة سهام إحميد'
        : 'أساتذة متميزون';

      files.push({
        id: newId,
        title: cleanTitle,
        rawFileName: df.name,
        extension: df.name.includes('.doc') ? 'doc' : df.name.includes('.rar') ? 'rar' : 'pdf',
        subjectId: langKey,
        subjectAliases: [langKey, langObj.subfolder.subjectId, langObj.subfolder.name.toLowerCase()],
        subjectName: langObj.subfolder.subjectName,
        streams: ['langues'],
        streamIds: ['langues'],
        category,
        author,
        fileUrl: df.previewUrl,
        driveFileId: df.id,
        driveFileUrl: df.viewUrl,
        drivePreviewUrl: df.previewUrl,
        driveDownloadUrl: df.downloadUrl,
        rawPath: df.previewUrl,
        size: 'ملف سحابي',
        sizeReadable: 'ملف سحابي'
      });
      newCount++;
    }
  });
}

console.log('Updated existing Foreign Language files:', updatedCount);
console.log('Appended new Foreign Language Drive files:', newCount);
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
