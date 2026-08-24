import fs from 'fs';
import path from 'path';

const baseDir = path.resolve('public/FileFromMe');

function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const rawFiles = getAllFiles(baseDir);

function formatSize(bytes) {
  if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' ميغابايت';
  return (bytes / 1024).toFixed(0) + ' كيلوبايت';
}

function cleanTitle(rawName, folder, subfolder) {
  let name = rawName;
  
  // Remove file extensions
  name = name.replace(/\.(pdf|doc|docx|rar|zip|pdf\.pdf)$/gi, '');
  name = name.replace(/\.(pdf|doc|docx|rar|zip)$/gi, '');

  // Remove web urls and signatures
  name = name.replace(/https?_[^\s_]+/gi, '');
  name = name.replace(/www_[^\s_]+/gi, '');
  name = name.replace(/bac35\.com-?/gi, '');
  name = name.replace(/ahlamontada/gi, '');
  name = name.replace(/Copier/gi, '');
  name = name.replace(/_organized/gi, '');
  name = name.replace(/j_h_m_l/gi, '');
  name = name.replace(/ج_ح_م_لــ/gi, '');
  name = name.replace(/www_msila_info/gi, '');
  name = name.replace(/docx/gi, '');
  
  // Replace underscores and clean spaces
  name = name.replace(/_+/g, ' ');
  name = name.replace(/\s+/g, ' ').trim();

  // If subfolder exists, prepend context if helpful
  if (subfolder && !name.includes(subfolder)) {
    if (subfolder.includes('فراح عيسى') || subfolder.includes('حمزة سمراني')) {
      name = `${subfolder} — ${name}`;
    }
  }

  // Remove leading underscores or dashes
  name = name.replace(/^[-_\s]+/, '').replace(/[-_\s]+$/, '');

  return name;
}

console.log(`Processing ${rawFiles.length} files...`);

const processed = rawFiles.map((fullPath, idx) => {
  const relPath = path.relative('public', fullPath).replace(/\\/g, '/');
  const size = fs.statSync(fullPath).size;
  const fileName = path.basename(fullPath);
  const ext = path.extname(fullPath).toLowerCase().replace('.', '') || 'pdf';
  
  const relInside = path.relative(baseDir, fullPath).replace(/\\/g, '/');
  const parts = relInside.split('/');
  const topFolder = parts[0];
  const subFolder = parts.length > 2 ? parts[1] : '';

  const clean = cleanTitle(fileName, topFolder, subFolder);

  return {
    id: `ffm_${idx + 1}`,
    rawFileName: fileName,
    relPath: '/' + relPath,
    topFolder,
    subFolder,
    cleanTitle: clean,
    ext,
    size: formatSize(size),
    bytes: size
  };
});

fs.writeFileSync('scripts/analysis_output.json', JSON.stringify(processed, null, 2), 'utf8');
console.log('Saved analysis to scripts/analysis_output.json');
