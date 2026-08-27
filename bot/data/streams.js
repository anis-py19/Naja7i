/**
 * 🇩🇿 Algerian BAC Streams, Subjects, and Official Ministerial Coefficients Data
 * Tailored for Naja7i BAC Telegram Bot (@bacdztopbot Clone)
 */

export const STREAMS = [
  {
    id: 'sciences',
    name: 'شعبة علوم تجريبية',
    frenchName: 'Sciences Expérimentales',
    icon: '🧬',
    shortName: 'علوم تجريبية',
    description: 'علوم الطبيعة والحياة، العلوم الفيزيائية، والرياضيات بالحلول المفصلة.',
    subjects: [
      { id: 'sciences_nat', name: 'علوم الطبيعة والحياة', coef: 6, isMain: true, icon: '🧬' },
      { id: 'physique', name: 'العلوم الفيزيائية', coef: 5, isMain: true, icon: '⚡' },
      { id: 'math', name: 'الرياضيات', coef: 5, isMain: true, icon: '📐' },
      { id: 'arabic', name: 'اللغة العربية وآدابها', coef: 3, isMain: false, icon: '📖' },
      { id: 'philo', name: 'الفلسفة', coef: 2, isMain: false, icon: '🧠' },
      { id: 'islamic', name: 'العلوم الإسلامية', coef: 2, isMain: false, icon: '🕌' },
      { id: 'hisgeo', name: 'التاريخ والجغرافيا', coef: 2, isMain: false, icon: '🗺️' },
      { id: 'french', name: 'اللغة الفرنسية', coef: 2, isMain: false, icon: '🇫🇷' },
      { id: 'english', name: 'اللغة الإنجليزية', coef: 2, isMain: false, icon: '🇬🇧' },
      { id: 'amazigh', name: 'اللغة الأمازيغية (اختياري)', coef: 2, isMain: false, isOptional: true, icon: 'ⵣ' },
      { id: 'sport', name: 'التربية البدنية (اختياري)', coef: 1, isMain: false, isOptional: true, icon: '🏃' }
    ]
  },
  {
    id: 'math',
    name: 'شعبة رياضيات',
    frenchName: 'Mathématiques',
    icon: '📐',
    shortName: 'رياضيات',
    description: 'التركيز العالي على الرياضيات والفيزياء، سلاسل تمارين مميزة وحلول معقدة.',
    subjects: [
      { id: 'math', name: 'الرياضيات', coef: 7, isMain: true, icon: '📐' },
      { id: 'physique', name: 'العلوم الفيزيائية', coef: 6, isMain: true, icon: '⚡' },
      { id: 'sciences_nat', name: 'علوم الطبيعة والحياة', coef: 2, isMain: false, icon: '🧬' },
      { id: 'arabic', name: 'اللغة العربية وآدابها', coef: 3, isMain: false, icon: '📖' },
      { id: 'philo', name: 'الفلسفة', coef: 2, isMain: false, icon: '🧠' },
      { id: 'islamic', name: 'العلوم الإسلامية', coef: 2, isMain: false, icon: '🕌' },
      { id: 'hisgeo', name: 'التاريخ والجغرافيا', coef: 2, isMain: false, icon: '🗺️' },
      { id: 'french', name: 'اللغة الفرنسية', coef: 2, isMain: false, icon: '🇫🇷' },
      { id: 'english', name: 'اللغة الإنجليزية', coef: 2, isMain: false, icon: '🇬🇧' },
      { id: 'amazigh', name: 'اللغة الأمازيغية (اختياري)', coef: 2, isMain: false, isOptional: true, icon: 'ⵣ' },
      { id: 'sport', name: 'التربية البدنية (اختياري)', coef: 1, isMain: false, isOptional: true, icon: '🏃' }
    ]
  },
  {
    id: 'technique_math',
    name: 'شعبة تقني رياضي',
    frenchName: 'Technique Mathématiques',
    icon: '⚙️',
    shortName: 'تقني رياضي',
    description: 'هندسة ميكانيكية، كهربائية، مدنية، وطرائق مع الرياضيات والفيزياء.',
    subBranches: [
      { id: 'genie_meca', name: 'هندسة ميكانيكية' },
      { id: 'genie_elec', name: 'هندسة كهربائية' },
      { id: 'genie_civil', name: 'هندسة مدنية' },
      { id: 'genie_proc', name: 'هندسة الطرائق' }
    ],
    subjects: [
      { id: 'tech_engineering', name: 'التكنولوجيا (الهندسة المختارة)', coef: 6, isMain: true, icon: '⚙️' },
      { id: 'math', name: 'الرياضيات', coef: 6, isMain: true, icon: '📐' },
      { id: 'physique', name: 'العلوم الفيزيائية', coef: 5, isMain: true, icon: '⚡' },
      { id: 'arabic', name: 'اللغة العربية وآدابها', coef: 3, isMain: false, icon: '📖' },
      { id: 'philo', name: 'الفلسفة', coef: 2, isMain: false, icon: '🧠' },
      { id: 'islamic', name: 'العلوم الإسلامية', coef: 2, isMain: false, icon: '🕌' },
      { id: 'hisgeo', name: 'التاريخ والجغرافيا', coef: 2, isMain: false, icon: '🗺️' },
      { id: 'french', name: 'اللغة الفرنسية', coef: 2, isMain: false, icon: '🇫🇷' },
      { id: 'english', name: 'اللغة الإنجليزية', coef: 2, isMain: false, icon: '🇬🇧' },
      { id: 'amazigh', name: 'اللغة الأمازيغية (اختياري)', coef: 2, isMain: false, isOptional: true, icon: 'ⵣ' },
      { id: 'sport', name: 'التربية البدنية (اختياري)', coef: 1, isMain: false, isOptional: true, icon: '🏃' }
    ]
  },
  {
    id: 'gestion',
    name: 'شعبة تسيير واقتصاد',
    frenchName: 'Gestion et Économie',
    icon: '📊',
    shortName: 'تسيير واقتصاد',
    description: 'محاسبة ومالية، اقتصاد ومناجمنت، وقانون مع ملخصات وقوانين جاهزة.',
    subjects: [
      { id: 'gestion_fin', name: 'التسيير المحاسبي والمالي', coef: 6, isMain: true, icon: '💰' },
      { id: 'math', name: 'الرياضيات', coef: 5, isMain: true, icon: '📐' },
      { id: 'economy', name: 'الاقتصاد والمناجمنت', coef: 5, isMain: true, icon: '📈' },
      { id: 'hisgeo', name: 'التاريخ والجغرافيا', coef: 4, isMain: true, icon: '🗺️' },
      { id: 'arabic', name: 'اللغة العربية وآدابها', coef: 3, isMain: false, icon: '📖' },
      { id: 'droit', name: 'القانون', coef: 2, isMain: false, icon: '⚖️' },
      { id: 'philo', name: 'الفلسفة', coef: 2, isMain: false, icon: '🧠' },
      { id: 'islamic', name: 'العلوم الإسلامية', coef: 2, isMain: false, icon: '🕌' },
      { id: 'french', name: 'اللغة الفرنسية', coef: 2, isMain: false, icon: '🇫🇷' },
      { id: 'english', name: 'اللغة الإنجليزية', coef: 2, isMain: false, icon: '🇬🇧' },
      { id: 'amazigh', name: 'اللغة الأمازيغية (اختياري)', coef: 2, isMain: false, isOptional: true, icon: 'ⵣ' },
      { id: 'sport', name: 'التربية البدنية (اختياري)', coef: 1, isMain: false, isOptional: true, icon: '🏃' }
    ]
  },
  {
    id: 'lettres_philo',
    name: 'شعبة آداب وفلسفة',
    frenchName: 'Lettres et Philosophie',
    icon: '📚',
    shortName: 'آداب وفلسفة',
    description: 'مقالات فلسفية جاهزة ومنهجيات التحليل، لغة عربية، وتاريخ وجغرافيا.',
    subjects: [
      { id: 'philo', name: 'الفلسفة', coef: 6, isMain: true, icon: '🧠' },
      { id: 'arabic', name: 'اللغة العربية وآدابها', coef: 6, isMain: true, icon: '📖' },
      { id: 'hisgeo', name: 'التاريخ والجغرافيا', coef: 4, isMain: true, icon: '🗺️' },
      { id: 'french', name: 'اللغة الفرنسية', coef: 3, isMain: false, icon: '🇫🇷' },
      { id: 'english', name: 'اللغة الإنجليزية', coef: 3, isMain: false, icon: '🇬🇧' },
      { id: 'islamic', name: 'العلوم الإسلامية', coef: 2, isMain: false, icon: '🕌' },
      { id: 'math', name: 'الرياضيات', coef: 2, isMain: false, icon: '📐' },
      { id: 'amazigh', name: 'اللغة الأمازيغية (اختياري)', coef: 2, isMain: false, isOptional: true, icon: 'ⵣ' },
      { id: 'sport', name: 'التربية البدنية (اختياري)', coef: 1, isMain: false, isOptional: true, icon: '🏃' }
    ]
  },
  {
    id: 'langues',
    name: 'شعبة لغات أجنبية',
    frenchName: 'Langues Étrangères',
    icon: '🌍',
    shortName: 'لغات أجنبية',
    description: 'فرنسية، إنجليزية، لغة ثالثة (إسبانية، ألمانية، إيطالية) مع الفلسفة والأدب.',
    subjects: [
      { id: 'langue_3', name: 'اللغة الأجنبية الثالثة (إسباني/ألماني/إيطالي)', coef: 5, isMain: true, icon: '🇪🇸' },
      { id: 'french', name: 'اللغة الفرنسية', coef: 5, isMain: true, icon: '🇫🇷' },
      { id: 'english', name: 'اللغة الإنجليزية', coef: 5, isMain: true, icon: '🇬🇧' },
      { id: 'arabic', name: 'اللغة العربية وآدابها', coef: 5, isMain: true, icon: '📖' },
      { id: 'hisgeo', name: 'التاريخ والجغرافيا', coef: 2, isMain: false, icon: '🗺️' },
      { id: 'philo', name: 'الفلسفة', coef: 2, isMain: false, icon: '🧠' },
      { id: 'islamic', name: 'العلوم الإسلامية', coef: 2, isMain: false, icon: '🕌' },
      { id: 'math', name: 'الرياضيات', coef: 2, isMain: false, icon: '📐' },
      { id: 'amazigh', name: 'اللغة الأمازيغية (اختياري)', coef: 2, isMain: false, isOptional: true, icon: 'ⵣ' },
      { id: 'sport', name: 'التربية البدنية (اختياري)', coef: 1, isMain: false, isOptional: true, icon: '🏃' }
    ]
  }
];

export function getStreamById(streamId) {
  return STREAMS.find(s => s.id === streamId) || STREAMS[0];
}

export function getSubjectById(streamId, subjectId) {
  const stream = getStreamById(streamId);
  return stream.subjects.find(sub => sub.id === subjectId);
}
