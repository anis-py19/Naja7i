import https from 'https';
import fs from 'fs';

const folderUrl = 'https://drive.google.com/drive/folders/17AVfaOubwhIezUeclK-Nia_mWe3vzm4I?usp=sharing';

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function extractLanguesDrive() {
  console.log('Fetching Langues (اللغات الأجنبية) Google Drive folder...');
  const html = await fetchHtml(folderUrl);
  fs.writeFileSync('scripts/drive_langues_raw.html', html);

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
        fullLabel
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
        fullLabel
      });
    }
  }

  const cleanPdfs = files
    .filter(f => f.name.toLowerCase().endsWith('.pdf') || f.fullLabel.toLowerCase().includes('pdf') || !f.fullLabel.toLowerCase().includes('folder'))
    .map(p => {
      const realId = p.id.replace(/-\d+-\d+$/, '').replace(/-\d+$/, '');
      const isPdf = p.name.toLowerCase().endsWith('.pdf') || p.fullLabel.toLowerCase().includes('pdf');
      return {
        name: isPdf ? (p.name.endsWith('.pdf') ? p.name : `${p.name}.pdf`) : p.name,
        id: realId,
        isFolder: p.fullLabel.toLowerCase().includes('folder'),
        viewUrl: `https://drive.google.com/file/d/${realId}/view?usp=drivesdk`,
        previewUrl: `https://drive.google.com/file/d/${realId}/preview`,
        downloadUrl: `https://drive.google.com/uc?export=download&id=${realId}`
      };
    });

  const unique = [];
  const seenIds = new Set();
  for (const p of cleanPdfs) {
    if (!seenIds.has(p.id)) {
      seenIds.add(p.id);
      unique.push(p);
    }
  }

  console.log('Total unique Langues Drive items:', unique.length);
  fs.writeFileSync('scripts/langues_drive_files.json', JSON.stringify(unique, null, 2));

  unique.forEach((f, i) => {
    console.log(`${i + 1}. [${f.name}] (${f.isFolder ? 'Folder' : 'File'}) -> ${f.viewUrl}`);
  });
}

extractLanguesDrive().catch(console.error);
