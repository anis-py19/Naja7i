import https from 'https';
import fs from 'fs';

const folderUrl = 'https://drive.google.com/drive/folders/1t3HZtqpQA8F5qmI6nhoW35T5EN3h0SxR?usp=sharing';

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function extract() {
  console.log('Fetching Google Drive folder...');
  const html = await fetchHtml(folderUrl);
  fs.writeFileSync('scripts/drive_raw.html', html);
  console.log('Saved raw HTML (' + html.length + ' bytes)');

  // Extract initial data arrays
  // Google Drive stores files in JS array format: ["FILE_ID","FILE_NAME",...]
  const matches = [];
  
  // Regex to find Google Drive file patterns: [..., "1[a-zA-Z0-9_-]{25,}", "filename.ext", ...]
  const fileRegex = /\["(1[a-zA-Z0-9_-]{25,})","([^"]+\.(pdf|docx?|pptx?|xlsx?|mp4|zip|rar|png|jpg))"/gi;
  let m;
  while ((m = fileRegex.exec(html)) !== null) {
    matches.push({
      id: m[1],
      name: m[2],
      url: `https://drive.google.com/file/d/${m[1]}/view`
    });
  }

  // Also search for general strings with extensions
  const nameRegex = /"([^"]{3,100}\.(pdf|docx?|pptx?|xlsx?|zip|rar))"/gi;
  const foundNames = new Set();
  while ((m = nameRegex.exec(html)) !== null) {
    foundNames.add(m[1]);
  }

  // Also search for all 33-character Google Drive IDs
  const idRegex = /"(1[a-zA-Z0-9_-]{28,34})"/g;
  const foundIds = new Set();
  while ((m = idRegex.exec(html)) !== null) {
    foundIds.add(m[1]);
  }

  console.log('Specific File Matches:', matches.length);
  console.log('Found File Names:', Array.from(foundNames));
  console.log('Found IDs Count:', foundIds.size);

  fs.writeFileSync('scripts/drive_extracted.json', JSON.stringify({
    matches,
    names: Array.from(foundNames),
    ids: Array.from(foundIds)
  }, null, 2));
}

extract().catch(console.error);
