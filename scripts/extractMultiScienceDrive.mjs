import https from 'https';
import fs from 'fs';

const folders = [
  {
    name: 'Science سمراني',
    author: 'الأستاذ سمراني',
    id: '178YoesaESjYW4fB3XzPJRoBgISL4t4TY'
  },
  {
    name: 'ملخص طلبة',
    author: 'طلبة متفوقون في البكالوريا',
    id: '1i9MjG_iEFQYA2RrcFMUDLGPBvk-c-xwY'
  },
  {
    name: 'فراح عيسى',
    author: 'الأستاذ فراح عيسى',
    id: '1sGc7HKKMLF70XnVuJeyTTcCXdvSQ5WiW'
  },
  {
    name: 'كتفي شريف زينة',
    author: 'الأستاذة كتفي شريف زينة',
    id: '17QnOVzuz1OjNjzI2zL9CnL3V2WLW3rkM'
  }
];

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function parseFilesFromHtml(html) {
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
      files.push({ id, name: cleanName(fullLabel), fullLabel });
    }
  }

  while ((m = regex2.exec(html)) !== null) {
    const id = m[1];
    const fullLabel = m[3];
    if (!seen.has(id) && !fullLabel.includes('Google Drive') && !fullLabel.includes('Sign in')) {
      seen.add(id);
      files.push({ id, name: cleanName(fullLabel), fullLabel });
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

  return unique;
}

async function extractAll() {
  const allResults = [];

  for (const folder of folders) {
    console.log(`Fetching ${folder.name} (${folder.id})...`);
    const url = `https://drive.google.com/drive/folders/${folder.id}?usp=sharing`;
    const html = await fetchHtml(url);
    fs.writeFileSync(`scripts/drive_sci_${folder.name.replace(/\s+/g, '_')}_raw.html`, html);
    const files = parseFilesFromHtml(html);
    console.log(`Found ${files.length} files in ${folder.name}`);
    files.forEach((f, i) => console.log(`  ${i + 1}. [${f.name}] -> ${f.viewUrl}`));
    
    allResults.push({
      folder,
      files
    });
  }

  fs.writeFileSync('scripts/all_science_extracted.json', JSON.stringify(allResults, null, 2));
  console.log('Saved to scripts/all_science_extracted.json');
}

extractAll().catch(console.error);
