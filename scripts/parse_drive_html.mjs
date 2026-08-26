import fs from 'fs';

const html = fs.readFileSync('./scripts/drive_folder.html', 'utf8');

// Search for any .pdf occurrences in the HTML
const pdfRegex = /([\w\u0600-\u06FF\s\-_\(\)\.]+\.pdf)/gi;
const matches = [...html.matchAll(pdfRegex)].map(m => m[1]);
console.log('PDF matches found:', Array.from(new Set(matches)));

// Search for drive item structure in JS variables
const driveItems = [];
// Pattern in Google Drive initial data: ["item-id", "item-name", ...]
const itemRegex = /\["(1[a-zA-Z0-9_-]{28,34})",\[?"([^"]+)"/g;
let m;
while ((m = itemRegex.exec(html)) !== null) {
  driveItems.push({ id: m[1], name: m[2] });
}
console.log('Drive items found:', driveItems.slice(0, 30));
