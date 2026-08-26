import fs from 'fs';
import path from 'path';

const srcImg = 'C:/Users/anisr/.gemini/antigravity/brain/33188e98-f847-4241-9fc0-6fdb8c544361/.user_uploaded/media_1787776355032.jpg';
const destImg = path.join(process.cwd(), 'public', 'anis-izri.jpg');

console.log('Copying founder image...');
fs.copyFileSync(srcImg, destImg);
console.log('Successfully copied to:', destImg);
