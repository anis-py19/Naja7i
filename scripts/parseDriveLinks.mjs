import fs from 'fs';

const html = fs.readFileSync('scripts/drive_raw.html', 'utf8');

// Match all elements with aria-label and ssk/data-id
const regex1 = /aria-label="([^"]+?)"[^>]*?ssk=['"][^'"]*?:(1[a-zA-Z0-9_-]{20,})(-\d+)?['"]/g;
const regex2 = /ssk=['"][^'"]*?:(1[a-zA-Z0-9_-]{20,})(-\d+)?['"][^>]*?aria-label="([^"]+?)"/g;

const files = [];
const seen = new Set();

function cleanName(label) {
  return label
    .replace(/\s+(PDF|Word|Document|Shared|Folder|Spreadsheet|Presentation|Zip).*$/i, '')
    .trim();
}

let m;
while ((m = regex1.exec(html)) !== null) {
  const fullLabel = m[1];
  const id = m[2];
  if (!seen.has(id) && !fullLabel.includes('Google Drive') && !fullLabel.includes('Sign in')) {
    seen.add(id);
    files.push({
      id,
      name: cleanName(fullLabel),
      fullLabel,
      viewUrl: `https://drive.google.com/file/d/${id}/view`,
      previewUrl: `https://drive.google.com/file/d/${id}/preview`,
      downloadUrl: `https://drive.google.com/uc?export=download&id=${id}`
    });
  }
}

while ((m = regex2.exec(html)) !== null) {
  const id = m[1];
  const fullLabel = m[3];
  if (!seen.has(id) && !fullLabel.includes('Google Drive') && !fullLabel.includes('Sign in')) {
    seen.add(id);
    files.push({
      id,
      name: cleanName(fullLabel),
      fullLabel,
      viewUrl: `https://drive.google.com/file/d/${id}/view`,
      previewUrl: `https://drive.google.com/file/d/${id}/preview`,
      downloadUrl: `https://drive.google.com/uc?export=download&id=${id}`
    });
  }
}

console.log('Successfully extracted', files.length, 'files:');
files.forEach((f, i) => {
  console.log(`${i + 1}. [${f.name}] -> ${f.viewUrl}`);
});

fs.writeFileSync('scripts/drive_extracted_links.json', JSON.stringify(files, null, 2));
