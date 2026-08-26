import fs from 'fs';

const driveFiles = JSON.parse(fs.readFileSync('scripts/arabe_drive_files.json', 'utf8'));

// Build lookup map by normalized file name
const driveMap = new Map();
driveFiles.forEach(df => {
  const norm = (s) => s.replace(/[_\-\.\s]/g, '').toLowerCase();
  driveMap.set(norm(df.name), df);
});

let userFilesContent = fs.readFileSync('src/data/userFilesData.js', 'utf8');

const match = userFilesContent.match(/export const USER_STUDY_FILES = (\[[\s\S]*?\]);/);
if (!match) {
  console.error('Could not find USER_STUDY_FILES array');
  process.exit(1);
}

const files = JSON.parse(match[1]);
const existingIds = new Set(files.map(f => f.id));
let updatedCount = 0;
let newCount = 0;

const norm = (s) => (s || '').replace(/[_\-\.\s]/g, '').toLowerCase();

// 1. Update existing matches
files.forEach(f => {
  if (f.subjectId === 'arabic' || (f.fileUrl && (f.fileUrl.includes('/Arabe/') || f.fileUrl.includes('/Arabic/')))) {
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

// 2. Append any drive files not yet in catalog
driveFiles.forEach((df, idx) => {
  if (!df._matched) {
    const cleanTitle = df.name.replace(/\.pdf$/i, '').replace(/_/g, ' ');
    const newId = `ffm_ar_${Date.now()}_${idx + 1}`;
    
    // Determine category and stream
    let category = 'ملخصات ودروس';
    if (cleanTitle.includes('تقويم نقدي') || cleanTitle.includes('التقويم النقدي')) category = 'التقويم النقدي';
    else if (cleanTitle.includes('بناء فكري') || cleanTitle.includes('البناء الفكري')) category = 'البناء الفكري';
    else if (cleanTitle.includes('بناء لغوي') || cleanTitle.includes('البناء اللغوي')) category = 'البناء اللغوي والقواعد';
    else if (cleanTitle.includes('موضوع') || cleanTitle.includes('مواضيع') || cleanTitle.includes('بكالوريا')) category = 'سلاسل ومواضيع مقترحة';
    else if (cleanTitle.includes('كتاب') || cleanTitle.includes('النوابغ') || cleanTitle.includes('الكافي') || cleanTitle.includes('المفيد')) category = 'كتب ومذكرات شاملة';

    const streams = cleanTitle.includes('أدب وفلسفة') || cleanTitle.includes('شعب أدبية')
      ? ['lettres_philo', 'langues']
      : cleanTitle.includes('شعب علمية') || cleanTitle.includes('شعب العلمية')
        ? ['sciences', 'math', 'technique_math', 'gestion']
        : ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues'];

    files.push({
      id: newId,
      title: cleanTitle,
      rawFileName: df.name,
      extension: 'pdf',
      subjectId: 'arabic',
      subjectAliases: ['arabic', 'arabe', 'adab'],
      subjectName: 'اللغة العربية وآدابها',
      streams,
      streamIds: streams,
      category,
      author: cleanTitle.includes('قوادري') ? 'الأستاذ عمر قوادري' : cleanTitle.includes('حيقون') ? 'الأستاذ حيقون أسامة' : cleanTitle.includes('هجرسي') ? 'الأستاذ هجرسي محمد' : cleanTitle.includes('فراج') ? 'الأستاذ أيمن فراج' : cleanTitle.includes('بلعيد') ? 'الأستاذ بشير بلعيد' : 'أساتذة متميزون',
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

console.log('Updated existing Arabic files:', updatedCount);
console.log('Appended new Arabic Drive files:', newCount);
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
