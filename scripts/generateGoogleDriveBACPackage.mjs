import fs from 'fs';
import path from 'path';

const baseDir = path.join(process.cwd(), '..', 'BAC_Drive_Package');

const streamsData = [
  {
    folderName: '01_شعبة_علوم_تجريبية',
    name: 'شعبة علوم تجريبية',
    subjects: [
      { folder: '01_علوم_الطبيعة_والحياة', name: 'علوم الطبيعة والحياة', coef: 6, code: 'snv' },
      { folder: '02_العلوم_الفيزيائية', name: 'العلوم الفيزيائية', coef: 5, code: 'phy' },
      { folder: '03_الرياضيات', name: 'الرياضيات', coef: 5, code: 'math' },
      { folder: '04_اللغة_العربية_وآدابها', name: 'اللغة العربية وآدابها', coef: 3, code: 'arabic' },
      { folder: '05_العلوم_الإسلامية', name: 'العلوم الإسلامية', coef: 2, code: 'islamiya' },
      { folder: '06_التاريخ_والجغرافيا', name: 'التاريخ والجغرافيا', coef: 2, code: 'hisgeo' },
      { folder: '07_الفلسفة', name: 'الفلسفة', coef: 2, code: 'philo' },
      { folder: '08_اللغة_الفرنسية', name: 'اللغة الفرنسية', coef: 2, code: 'french' },
      { folder: '09_اللغة_الإنجليزية', name: 'اللغة الإنجليزية', coef: 2, code: 'english' }
    ]
  },
  {
    folderName: '02_شعبة_رياضيات',
    name: 'شعبة رياضيات',
    subjects: [
      { folder: '01_الرياضيات', name: 'الرياضيات', coef: 7, code: 'math' },
      { folder: '02_العلوم_الفيزيائية', name: 'العلوم الفيزيائية', coef: 6, code: 'phy' },
      { folder: '03_علوم_الطبيعة_والحياة', name: 'علوم الطبيعة والحياة', coef: 2, code: 'snv' },
      { folder: '04_اللغة_العربية_وآدابها', name: 'اللغة العربية وآدابها', coef: 3, code: 'arabic' },
      { folder: '05_العلوم_الإسلامية', name: 'العلوم الإسلامية', coef: 2, code: 'islamiya' },
      { folder: '06_التاريخ_والجغرافيا', name: 'التاريخ والجغرافيا', coef: 2, code: 'hisgeo' },
      { folder: '07_الفلسفة', name: 'الفلسفة', coef: 2, code: 'philo' },
      { folder: '08_اللغة_الفرنسية', name: 'اللغة الفرنسية', coef: 2, code: 'french' },
      { folder: '09_اللغة_الإنجليزية', name: 'اللغة الإنجليزية', coef: 2, code: 'english' }
    ]
  },
  {
    folderName: '03_شعبة_تقني_رياضي',
    name: 'شعبة تقني رياضي',
    subjects: [
      { folder: '01_هندسة_ميكانيكية', name: 'الهندسة الميكانيكية', coef: 7, code: 'gm' },
      { folder: '02_هندسة_مدنية', name: 'الهندسة المدنية', coef: 7, code: 'gc' },
      { folder: '03_هندسة_كهربائية', name: 'الهندسة الكهربائية', coef: 7, code: 'ge' },
      { folder: '04_هندسة_طرائق', name: 'هندسة الطرائق', coef: 7, code: 'gp' },
      { folder: '05_الرياضيات', name: 'الرياضيات', coef: 6, code: 'math' },
      { folder: '06_العلوم_الفيزيائية', name: 'العلوم الفيزيائية', coef: 6, code: 'phy' },
      { folder: '07_اللغة_العربية_وآدابها', name: 'اللغة العربية وآدابها', coef: 3, code: 'arabic' },
      { folder: '08_العلوم_الإسلامية', name: 'العلوم الإسلامية', coef: 2, code: 'islamiya' },
      { folder: '09_التاريخ_والجغرافيا', name: 'التاريخ والجغرافيا', coef: 2, code: 'hisgeo' },
      { folder: '10_الفلسفة', name: 'الفلسفة', coef: 2, code: 'philo' },
      { folder: '11_اللغة_الفرنسية', name: 'اللغة الفرنسية', coef: 2, code: 'french' },
      { folder: '12_اللغة_الإنجليزية', name: 'اللغة الإنجليزية', coef: 2, code: 'english' }
    ]
  },
  {
    folderName: '04_شعبة_تسيير_واقتصاد',
    name: 'شعبة تسيير واقتصاد',
    subjects: [
      { folder: '01_التسيير_المحاسبي_والمالي', name: 'التسيير المحاسبي والمالي', coef: 6, code: 'compta' },
      { folder: '02_الاقتصاد_والمناجمنت', name: 'الاقتصاد والمناجمنت', coef: 5, code: 'eco' },
      { folder: '03_القانون', name: 'القانون', coef: 2, code: 'droit' },
      { folder: '04_الرياضيات', name: 'الرياضيات', coef: 5, code: 'math' },
      { folder: '05_التاريخ_والجغرافيا', name: 'التاريخ والجغرافيا', coef: 4, code: 'hisgeo' },
      { folder: '06_اللغة_العربية_وآدابها', name: 'اللغة العربية وآدابها', coef: 3, code: 'arabic' },
      { folder: '07_العلوم_الإسلامية', name: 'العلوم الإسلامية', coef: 2, code: 'islamiya' },
      { folder: '08_الفلسفة', name: 'الفلسفة', coef: 2, code: 'philo' },
      { folder: '09_اللغة_الفرنسية', name: 'اللغة الفرنسية', coef: 2, code: 'french' },
      { folder: '10_اللغة_الإنجليزية', name: 'اللغة الإنجليزية', coef: 2, code: 'english' }
    ]
  },
  {
    folderName: '05_شعبة_آداب_وفلسفة',
    name: 'شعبة آداب وفلسفة',
    subjects: [
      { folder: '01_الفلسفة', name: 'الفلسفة', coef: 6, code: 'philo' },
      { folder: '02_اللغة_العربية_وآدابها', name: 'اللغة العربية وآدابها', coef: 6, code: 'arabic' },
      { folder: '03_التاريخ_والجغرافيا', name: 'التاريخ والجغرافيا', coef: 4, code: 'hisgeo' },
      { folder: '04_اللغة_الفرنسية', name: 'اللغة الفرنسية', coef: 3, code: 'french' },
      { folder: '05_اللغة_الإنجليزية', name: 'اللغة الإنجليزية', coef: 3, code: 'english' },
      { folder: '06_العلوم_الإسلامية', name: 'العلوم الإسلامية', coef: 2, code: 'islamiya' },
      { folder: '07_الرياضيات', name: 'الرياضيات', coef: 2, code: 'math' }
    ]
  },
  {
    folderName: '06_شعبة_لغات_أجنبية',
    name: 'شعبة لغات أجنبية',
    subjects: [
      { folder: '01_اللغة_الإسبانية', name: 'اللغة الإسبانية', coef: 5, code: 'esp' },
      { folder: '02_اللغة_الألمانية', name: 'اللغة الألمانية', coef: 5, code: 'all' },
      { folder: '03_اللغة_الإيطالية', name: 'اللغة الإيطالية', coef: 5, code: 'ita' },
      { folder: '04_اللغة_الفرنسية', name: 'اللغة الفرنسية', coef: 5, code: 'french' },
      { folder: '05_اللغة_الإنجليزية', name: 'اللغة الإنجليزية', coef: 5, code: 'english' },
      { folder: '06_اللغة_العربية_وآدابها', name: 'اللغة العربية وآدابها', coef: 5, code: 'arabic' },
      { folder: '07_الفلسفة', name: 'الفلسفة', coef: 2, code: 'philo' },
      { folder: '08_التاريخ_والجغرافيا', name: 'التاريخ والجغرافيا', coef: 2, code: 'hisgeo' },
      { folder: '09_العلوم_الإسلامية', name: 'العلوم الإسلامية', coef: 2, code: 'islamiya' },
      { folder: '10_الرياضيات', name: 'الرياضيات', coef: 2, code: 'math' }
    ]
  }
];

const years = Array.from({ length: 18 }, (_, i) => 2025 - i); // 2025 down to 2008

console.log(`Generating Google Drive ready structure at: ${baseDir}`);

if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}

// Master README
const masterReadme = `# 🎓 أرشيف شهادة البكالوريا الجزائرية (2008 — 2025) 🇩🇿
## منصة نجاحي (Naja7i.com) — المجلد الرئيسي السحابي لقوقل درايف (Google Drive)

هذا المجلد جاهز ومصنف بالكامل للرفع المباشر على **Google Drive** ليخدم جميع طلبة البكالوريا في الجزائر عبر الشعب الست:

1. **📁 01_شعبة_علوم_تجريبية** (9 مواد)
2. **📁 02_شعبة_رياضيات** (9 مواد)
3. **📁 03_شعبة_تقني_رياضي** (12 مادة: ميكانيك / مدنية / كهرباء / طرائق)
4. **📁 04_شعبة_تسيير_واقتصاد** (10 مواد)
5. **📁 05_شعبة_آداب_وفلسفة** (7 مواد)
6. **📁 06_شعبة_لغات_أجنبية** (10 مواد: إسبانية / ألمانية / إيطالية)

---
*تم إنشاء وتنظيم هذه الهيكلة السحابية بواسطة فريق عمل منصة نجاحي (Naja7i) — صدقة جارية لطلبة البكالوريا 🇩🇿.*
`;
fs.writeFileSync(path.join(baseDir, 'README.md'), masterReadme, 'utf8');

let totalFoldersCreated = 0;
let totalIndexFilesCreated = 0;

for (const stream of streamsData) {
  const streamPath = path.join(baseDir, stream.folderName);
  if (!fs.existsSync(streamPath)) fs.mkdirSync(streamPath, { recursive: true });
  totalFoldersCreated++;

  for (const subject of stream.subjects) {
    const subjectPath = path.join(streamPath, subject.folder);
    if (!fs.existsSync(subjectPath)) fs.mkdirSync(subjectPath, { recursive: true });
    totalFoldersCreated++;

    // Create a subject index HTML file
    const htmlContent = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>مواضيع وحلول بكالوريا ${subject.name} (${stream.name}) 2008-2025</title>
  <style>
    body { font-family: 'Cairo', 'Segoe UI', Tahoma, sans-serif; background: #f8fafc; color: #0f172a; margin: 0; padding: 25px; }
    .container { max-width: 900px; margin: 0 auto; background: white; border-radius: 16px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
    h1 { color: #0f172a; margin-top: 0; font-size: 24px; border-bottom: 2px solid #e11d48; padding-bottom: 12px; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: bold; background: #f1f5f9; color: #e11d48; margin-bottom: 20px; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    th, td { padding: 12px 16px; text-align: right; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
    th { background: #f8fafc; color: #475569; font-weight: bold; }
    tr:hover { background: #fff1f2; }
    .btn { display: inline-block; padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: bold; text-decoration: none; background: #e11d48; color: white; transition: 0.2s; }
    .btn:hover { background: #be123c; }
    .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px; }
  </style>
</head>
<body>
  <div class="container">
    <span class="badge">${stream.name} • المعامل: ${subject.coef}</span>
    <h1>📄 أرشيف مواضيع وحلول بكالوريا مادة ${subject.name} (2008 — 2025)</h1>
    <p>جميع مواضيع شهادة البكالوريا الرسمية الصادرة عن وزارة التربية الوطنية مع التصحيحات النموذجية وسلم التنقيط المفصل:</p>
    
    <table>
      <thead>
        <tr>
          <th>الدورة (السنة)</th>
          <th>موضوع الامتحان</th>
          <th>التصحيح وسلم التنقيط</th>
          <th>المصدر الرسمي</th>
        </tr>
      </thead>
      <tbody>
        ${years.map(y => `
        <tr>
          <td><strong>بكالوريا ${y}</strong></td>
          <td>موضوع مادة ${subject.name} دورة جوان ${y}</td>
          <td>التصحيح النموذجي دورة ${y}</td>
          <td><a class="btn" href="https://www.ency-education.com/bac${y}.html" target="_blank">فتح الموضوع والحل ↗</a></td>
        </tr>
        `).join('')}
      </tbody>
    </table>

    <div class="footer">
      منصة نجاحي التعليمية (Naja7i.com) — صدقة جارية لطلبة البكالوريا 🇩🇿
    </div>
  </div>
</body>
</html>`;

    fs.writeFileSync(path.join(subjectPath, 'فهرس_المواضيع_والحلول_2008_2025.html'), htmlContent, 'utf8');

    // Create TXT Direct links
    const txtContent = `========================================================================
🎓 مواضيع وحلول شهادة البكالوريا (2008 - 2025) — مادة ${subject.name}
الشعبة: ${stream.name} | المعامل الرسمي: ${subject.coef}
منصة نجاحي التعليمية (Naja7i.com)
========================================================================

${years.map(y => `• بكالوريا دورة جوان ${y}:
  - الموضوع + التصحيح النموذجي: https://www.ency-education.com/bac${y}.html
`).join('\n')}
`;
    fs.writeFileSync(path.join(subjectPath, 'روابط_مواضيع_وحلول_البكالوريا.txt'), txtContent, 'utf8');
    totalIndexFilesCreated += 2;
  }
}

console.log(`\n🎉 Generated successfully!`);
console.log(`📁 Total Stream & Subject folders created: ${totalFoldersCreated}`);
console.log(`📄 Total Index & Link documents generated: ${totalIndexFilesCreated}`);
console.log(`📍 Output Path: ${baseDir}`);
