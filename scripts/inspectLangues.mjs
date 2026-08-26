import fs from 'fs';

const html = fs.readFileSync('scripts/drive_langues_raw.html', 'utf8');

const regex = /aria-label="([^"]+?)"/g;
let m;
const labels = [];
while ((m = regex.exec(html)) !== null) {
  if (!m[1].includes('Google Drive') && !m[1].includes('Sign in')) {
    labels.push(m[1]);
  }
}

console.log('Labels:', labels);

// Look for subfolder IDs and names
const driveItemRegex = /\["(1[a-zA-Z0-9_-]{20,})",\["([^"]+)"/g;
let dm;
while ((dm = driveItemRegex.exec(html)) !== null) {
  console.log('Drive item:', dm[1], dm[2]);
}

// Find any strings with Espagnol, Allemand, Italien, Spanish, German, Italian, etc.
const langWords = ['espagnol', 'allemand', 'italien', 'spanish', 'german', 'italian', 'español', 'deutsch', 'italiano'];
langWords.forEach(w => {
  const idx = html.toLowerCase().indexOf(w);
  if (idx !== -1) {
    console.log(`Found "${w}" at index ${idx}:`, html.substring(Math.max(0, idx - 100), Math.min(html.length, idx + 100)));
  }
});
