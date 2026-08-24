import fs from 'fs';
import path from 'path';

// Define years 2008 to 2026
const years = [];
for (let y = 2008; y <= 2026; y++) {
  years.push(y.toString());
}

// Define streams and their official subjects
const streamStructures = [
  {
    name: '1- شعبة علوم تجريبية',
    subjects: [
      'علوم الطبيعة والحياة',
      'العلوم الفيزيائية',
      'الرياضيات',
      'اللغة العربية وآدابها',
      'العلوم الإسلامية',
      'التاريخ والجغرافيا',
      'اللغة الفرنسية',
      'اللغة الإنجليزية',
      'الفلسفة'
    ]
  },
  {
    name: '2- شعبة رياضيات',
    subjects: [
      'الرياضيات',
      'العلوم الفيزيائية',
      'علوم الطبيعة والحياة',
      'اللغة العربية وآدابها',
      'العلوم الإسلامية',
      'التاريخ والجغرافيا',
      'اللغة الفرنسية',
      'اللغة الإنجليزية',
      'الفلسفة'
    ]
  },
  {
    name: '3- شعبة تقني رياضي',
    subjects: [
      'التكنولوجيا - هندسة مدنية',
      'التكنولوجيا - هندسة ميكانيكية',
      'التكنولوجيا - هندسة كهربائية',
      'التكنولوجيا - هندسة الطرائق',
      'الرياضيات',
      'العلوم الفيزيائية',
      'اللغة العربية وآدابها',
      'العلوم الإسلامية',
      'التاريخ والجغرافيا',
      'اللغة الفرنسية',
      'اللغة الإنجليزية',
      'الفلسفة'
    ]
  },
  {
    name: '4- شعبة تسيير واقتصاد',
    subjects: [
      'التسيير المحاسبي والمالي',
      'الاقتصاد والمناجمنت',
      'القانون',
      'الرياضيات',
      'اللغة العربية وآدابها',
      'العلوم الإسلامية',
      'التاريخ والجغرافيا',
      'اللغة الفرنسية',
      'اللغة الإنجليزية',
      'الفلسفة'
    ]
  },
  {
    name: '5- شعبة آداب وفلسفة',
    subjects: [
      'الفلسفة',
      'اللغة العربية وآدابها',
      'التاريخ والجغرافيا',
      'العلوم الإسلامية',
      'اللغة الفرنسية',
      'اللغة الإنجليزية',
      'الرياضيات'
    ]
  },
  {
    name: '6- شعبة لغات أجنبية',
    subjects: [
      'اللغة الألمانية',
      'اللغة الإسبانية',
      'اللغة الإيطالية',
      'اللغة الفرنسية',
      'اللغة الإنجليزية',
      'اللغة العربية وآدابها',
      'التاريخ والجغرافيا',
      'الفلسفة',
      'العلوم الإسلامية',
      'الرياضيات'
    ]
  }
];

// Target directories:
const targetDirs = [
  path.resolve('c:/Users/anisr/OneDrive/Desktop/Naja7i/BAC_Archive_2008_2026'),
  path.resolve('c:/Users/anisr/OneDrive/Desktop/Naja7i/naja7i/public/BAC_Archive')
];

for (const baseDir of targetDirs) {
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  console.log(`Creating BAC Archive folders in: ${baseDir}`);

  for (const year of years) {
    const yearDir = path.join(baseDir, `BAC_${year}`);
    if (!fs.existsSync(yearDir)) {
      fs.mkdirSync(yearDir, { recursive: true });
    }

    for (const stream of streamStructures) {
      const streamDir = path.join(yearDir, stream.name);
      if (!fs.existsSync(streamDir)) {
        fs.mkdirSync(streamDir, { recursive: true });
      }

      for (const subject of stream.subjects) {
        const subjectDir = path.join(streamDir, subject);
        if (!fs.existsSync(subjectDir)) {
          fs.mkdirSync(subjectDir, { recursive: true });
        }
      }
    }
  }
}

console.log('✅ Successfully created all BAC folders from 2008 to 2026!');
