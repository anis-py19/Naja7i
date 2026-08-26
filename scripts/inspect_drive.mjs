import fs from 'fs';

async function inspectDriveFolder() {
  const folderId = '1t3HZtqpQA8F5qmI6nhoW35T5EN3h0SxR';
  const url = `https://drive.google.com/drive/folders/${folderId}`;
  console.log('Fetching:', url);

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9,ar;q=0.8'
      }
    });

    console.log('Response status:', res.status);
    const html = await res.text();
    fs.writeFileSync('./scripts/drive_folder.html', html, 'utf8');
    console.log('Saved HTML, length:', html.length);

    // Look for JSON payload in HTML
    const jsonMatch = html.match(/window\['_DRIVE_ivd'\]\s*=\s*'([^']+)'/);
    if (jsonMatch) {
      console.log('Found _DRIVE_ivd payload!');
    }

    // Look for files
    const regex = /\["([a-zA-Z0-9_-]{28,})","([^"]+\.(?:pdf|docx?|pptx?))"/g;
    let match;
    const found = [];
    while ((match = regex.exec(html)) !== null) {
      found.push({ id: match[1], name: match[2] });
    }
    console.log('Direct regex matches:', found);

  } catch (err) {
    console.error('Error fetching drive folder:', err);
  }
}

inspectDriveFolder();
