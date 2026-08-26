import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/build/pdf.mjs';

const filePath = 'public/FileFromMe/Anglais/BAC literary stream REVISION ALL UNITS NOUARA.pdf';
const data = fs.readFileSync(filePath);
const uint8 = new Uint8Array(data);

try {
  const loadingTask = pdfjsLib.getDocument({ data: uint8 });
  const doc = await loadingTask.promise;
  console.log('SUCCESS! PDF Loaded successfully! Total pages:', doc.numPages);
  const page = await doc.getPage(1);
  console.log('Page 1 viewport:', page.getViewport({ scale: 1 }));
} catch (err) {
  console.error('Error loading PDF:', err);
}
