import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// الصفحات التي تريد استخراج الملفات منها
const targetPages = [
  
]

// مجلد التخزين الرئيسي
const outputDir = path.join(__dirname, '..', 'downloaded_pdfs');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// دالة تحميل ملف مع دعم Redirects والرؤوس المناسبة
async function downloadFile(url, destPath) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': '*/*'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(destPath, buffer);
}

// دالة استخراج وتحميل الملفات من كل صفحة
async function processPage(pageUrl) {
  console.log(`\n🔍 جاري فحص الصفحة: ${pageUrl}`);
  try {
    const res = await fetch(pageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!res.ok) {
      console.error(`❌ تعذر فتح الصفحة: HTTP ${res.status}`);
      return;
    }

    const html = await res.text();

    // استخراج جميع روابط ملفات الـ PDF
    const pdfRegex = /href=["'](https?:\/\/[^"']+\.pdf|\/[^"']+\.pdf|[^"']+\.pdf)["']/gi;
    let match;
    const links = new Set();

    while ((match = pdfRegex.exec(html)) !== null) {
      let fileUrl = match[1].trim();
      if (fileUrl.startsWith('//')) {
        fileUrl = 'https:' + fileUrl;
      } else if (fileUrl.startsWith('/')) {
        fileUrl = 'https://www.ency-education.net' + fileUrl;
      } else if (!fileUrl.startsWith('http')) {
        fileUrl = 'https://www.ency-education.net/' + fileUrl;
      }
      links.add(fileUrl);
    }

    const linksList = Array.from(links);
    console.log(`🎯 تم العثور على ${linksList.length} ملف PDF في هذه الصفحة.`);

    for (let i = 0; i < linksList.length; i++) {
      const link = linksList[i];
      let rawName = path.basename(link.split('?')[0]);
      if (!rawName.endsWith('.pdf')) rawName += '.pdf';
      const fileName = decodeURIComponent(rawName).replace(/[<>:"/\\|?*]/g, '_');
      const filePath = path.join(outputDir, fileName);

      if (!fs.existsSync(filePath)) {
        console.log(`⬇️ [${i + 1}/${linksList.length}] جاري تحميل: ${fileName}...`);
        try {
          await downloadFile(link, filePath);
          const sizeKb = (fs.statSync(filePath).size / 1024).toFixed(1);
          console.log(`✅ تم تحميل: ${fileName} (${sizeKb} KB)`);
        } catch (err) {
          console.error(`❌ تعذر تحميل ${link}: ${err.message}`);
        }
      } else {
        console.log(`⏭️ [${i + 1}/${linksList.length}] موجود مسبقاً: ${fileName}`);
      }
    }
  } catch (error) {
    console.error(`❌ خطأ في معالجة الصفحة ${pageUrl}: ${error.message}`);
  }
}

// تشغيل السكربت بالكامل
async function run() {
  console.log('🚀 انطلاق عملية استخراج وتحميل ملفات البكالوريا من موسوعة التعليم الجزائري...');
  console.log(`📁 مجلد الحفظ: ${outputDir}`);
  for (const page of targetPages) {
    await processPage(page);
  }
  console.log('\n🎉 اكتملت عملية الفحص والتحميل بنجاح!');
}

run();