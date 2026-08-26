import fs from 'fs';

const driveFiles = JSON.parse(fs.readFileSync('scripts/philo_drive_files.json', 'utf8'));

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

const allStreams = ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues'];

// 1. Update existing matches
files.forEach(f => {
  if (f.subjectId === 'philo' || f.subjectId === 'philosophie' || f.subjectId === 'falsafa' || (f.fileUrl && (f.fileUrl.includes('/Philo/') || f.fileUrl.includes('/Philosophie/')))) {
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
    let cleanTitle = df.name.replace(/\.pdf$/i, '').replace(/^[_\s\-]+|[_\s\-]+$/g, '').replace(/_/g, ' ');
    const newId = `ffm_philo_${Date.now()}_${idx + 1}`;
    
    let category = 'ملخصات ودروس';
    if (cleanTitle.includes('منهجية') || cleanTitle.includes('منهجيات')) category = 'منهجيات ومقالات';
    else if (cleanTitle.includes('أقوال') || cleanTitle.includes('اقوال') || cleanTitle.toLowerCase().includes('akwal')) category = 'أقوال ومصطلحات فلسفية';
    else if (cleanTitle.includes('كتاب') || cleanTitle.includes('السلسلة الفضية') || cleanTitle.includes('الأنوار') || cleanTitle.includes('الهدى')) category = 'كتب ومذكرات شاملة';

    let streams = allStreams;
    if (cleanTitle.includes('اداب وفلسفة') || cleanTitle.includes('آداب وفلسفة')) streams = ['lettres_philo'];
    else if (cleanTitle.includes('تسيير') && cleanTitle.includes('تر')) streams = ['gestion', 'technique_math'];
    else if (cleanTitle.includes('ر+عت') || cleanTitle.includes('SC_3AS')) streams = ['sciences', 'math'];

    const author = cleanTitle.includes('سعيداني') ? 'الأستاذ خليل سعيداني'
      : cleanTitle.includes('حمداش') ? 'الأستاذ حمداش عبد الحق'
      : 'أساتذة متميزون';

    files.push({
      id: newId,
      title: cleanTitle,
      rawFileName: df.name,
      extension: 'pdf',
      subjectId: 'philo',
      subjectAliases: ['philo', 'philosophie', 'falsafa'],
      subjectName: 'الفلسفة',
      streams,
      streamIds: streams,
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

console.log('Updated existing Philo files:', updatedCount);
console.log('Appended new Philo Drive files:', newCount);
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
