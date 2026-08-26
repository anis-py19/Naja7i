import fs from 'fs';
import path from 'path';

// Define the comprehensive folder tree for Algerian BAC
const streamsStructure = [
  {
    folderName: '01_شعبة_علوم_تجريبية',
    frenchName: '01_Sciences_Experimentales',
    subjects: [
      '01_علوم_الطبيعة_والحياة',
      '02_العلوم_الفيزيائية',
      '03_الرياضيات',
      '04_اللغة_العربية_وآدابها',
      '05_العلوم_الإسلامية',
      '06_التاريخ_والجغرافيا',
      '07_الفلسفة',
      '08_اللغة_الفرنسية',
      '09_اللغة_الإنجليزية'
    ]
  },
  {
    folderName: '02_شعبة_رياضيات',
    frenchName: '02_Mathematiques',
    subjects: [
      '01_الرياضيات',
      '02_العلوم_الفيزيائية',
      '03_علوم_الطبيعة_والحياة',
      '04_اللغة_العربية_وآدابها',
      '05_العلوم_الإسلامية',
      '06_التاريخ_والجغرافيا',
      '07_الفلسفة',
      '08_اللغة_الفرنسية',
      '09_اللغة_الإنجليزية'
    ]
  },
  {
    folderName: '03_شعبة_تقني_رياضي',
    frenchName: '03_Technique_Mathematique',
    subjects: [
      '01_هندسة_ميكانيكية',
      '02_هندسة_مدنية',
      '03_هندسة_كهربائية',
      '04_هندسة_طرائق',
      '05_الرياضيات',
      '06_العلوم_الفيزيائية',
      '07_اللغة_العربية_وآدابها',
      '08_العلوم_الإسلامية',
      '09_التاريخ_والجغرافيا',
      '10_الفلسفة',
      '11_اللغة_الفرنسية',
      '12_اللغة_الإنجليزية'
    ]
  },
  {
    folderName: '04_شعبة_تسيير_واقتصاد',
    frenchName: '04_Gestion_et_Economie',
    subjects: [
      '01_التسيير_المحاسبي_والمالي',
      '02_الاقتصاد_والمناجمنت',
      '03_القانون',
      '04_الرياضيات',
      '05_التاريخ_والجغرافيا',
      '06_اللغة_العربية_وآدابها',
      '07_العلوم_الإسلامية',
      '08_الفلسفة',
      '09_اللغة_الفرنسية',
      '10_اللغة_الإنجليزية'
    ]
  },
  {
    folderName: '05_شعبة_آداب_وفلسفة',
    frenchName: '05_Lettres_et_Philosophie',
    subjects: [
      '01_الفلسفة',
      '02_اللغة_العربية_وآدابها',
      '03_التاريخ_والجغرافيا',
      '04_العلوم_الإسلامية',
      '05_اللغة_الفرنسية',
      '06_اللغة_الإنجليزية',
      '07_الرياضيات'
    ]
  },
  {
    folderName: '06_شعبة_لغات_أجنبية',
    frenchName: '06_Langues_Etrangeres',
    subjects: [
      '01_اللغة_الإسبانية',
      '02_اللغة_الألمانية',
      '03_اللغة_الإيطالية',
      '04_اللغة_الفرنسية',
      '05_اللغة_الإنجليزية',
      '06_اللغة_العربية_وآدابها',
      '07_الفلسفة',
      '08_التاريخ_والجغرافيا',
      '09_العلوم_الإسلامية',
      '10_الرياضيات'
    ]
  }
];

const targetBaseDir = path.join(process.cwd(), '..', 'GoogleDrive_BAC_Structure');

console.log(`Creating Google Drive Folders structure at: ${targetBaseDir}`);

if (!fs.existsSync(targetBaseDir)) {
  fs.mkdirSync(targetBaseDir, { recursive: true });
}

let totalFoldersCreated = 0;

// Also create a Readme guide inside root
const readmeContent = `# 🎓 دليل مجلدات شهادة البكالوريا الجزائرية (Google Drive) 🇩🇿

تم تنظيم وهيكلة هذه المجلدات خصيصاً لمنصة نجاحي (Naja7i.com) لتسهيل رفع ومزامنة مواضيع وحلول وملخصات البكالوريا لجميع الشعب الست.

## 📂 هيكلة الشعب الست:
1. **01_شعبة_علوم_تجريبية** (9 مواد)
2. **02_شعبة_رياضيات** (9 مواد)
3. **03_شعبة_تقني_رياضي** (12 مادة / فروع التكنولوجيا الأربعة)
4. **04_شعبة_تسيير_واقتصاد** (10 مواد)
5. **05_شعبة_آداب_وفلسفة** (7 مواد)
6. **06_شعبة_لغات_أجنبية** (10 مواد / لغات ثالثة: إسبانية، ألمانية، إيطالية)

🚀 يكفي سحب هذا المجلد بأكمله (Drag & Drop) ورميه في Google Drive ليتم إنشاء كل المجلدات فارغة وجاهزة فوراً!
`;

fs.writeFileSync(path.join(targetBaseDir, 'README_دليل_المجلدات.txt'), readmeContent, 'utf8');

streamsStructure.forEach((stream) => {
  const streamPath = path.join(targetBaseDir, stream.folderName);
  if (!fs.existsSync(streamPath)) {
    fs.mkdirSync(streamPath, { recursive: true });
    totalFoldersCreated++;
  }

  stream.subjects.forEach((subject) => {
    const subjectPath = path.join(streamPath, subject);
    if (!fs.existsSync(subjectPath)) {
      fs.mkdirSync(subjectPath, { recursive: true });
      totalFoldersCreated++;
    }
    // Place an empty placeholder file so git/zip keeps empty directories
    fs.writeFileSync(path.join(subjectPath, '.keep'), '', 'utf8');
  });
});

console.log(`✅ Successfully created ${totalFoldersCreated} organized folders for Google Drive!`);
console.log(`Directory: ${targetBaseDir}`);
