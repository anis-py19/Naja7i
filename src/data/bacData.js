// Comprehensive Data Structure based on Algerian BAC Curriculum and Ency-Education Archive

export const BAC_COEFFICIENTS = {
  sciences: {
    name: 'علوم تجريبية',
    subjects: [
      { id: 'sciences_nat', name: 'علوم الطبيعة والحياة', coef: 6, isMain: true, icon: '🧬' },
      { id: 'physique', name: 'العلوم الفيزيائية', coef: 5, isMain: true, icon: '⚡' },
      { id: 'math', name: 'الرياضيات', coef: 5, isMain: true, icon: '📐' },
      { id: 'arabic', name: 'اللغة العربية وآدابها', coef: 3, isMain: false, icon: '📖' },
      { id: 'philo', name: 'الفلسفة', coef: 2, isMain: false, icon: '🤔' },
      { id: 'hisgeo', name: 'التاريخ والجغرافيا', coef: 2, isMain: false, icon: '🗺️' },
      { id: 'islamic', name: 'العلوم الإسلامية', coef: 2, isMain: false, icon: '🕌' },
      { id: 'french', name: 'اللغة الفرنسية', coef: 2, isMain: false, icon: '🇫🇷' },
      { id: 'english', name: 'اللغة الإنجليزية', coef: 2, isMain: false, icon: '🇬🇧' },
      { id: 'sport', name: 'التربية البدنية', coef: 1, isMain: false, icon: '🏃' }
    ]
  },
  math: {
    name: 'رياضيات',
    subjects: [
      { id: 'math', name: 'الرياضيات', coef: 7, isMain: true, icon: '📐' },
      { id: 'physique', name: 'العلوم الفيزيائية', coef: 6, isMain: true, icon: '⚡' },
      { id: 'arabic', name: 'اللغة العربية وآدابها', coef: 3, isMain: false, icon: '📖' },
      { id: 'sciences_nat', name: 'علوم الطبيعة والحياة', coef: 2, isMain: false, icon: '🧬' },
      { id: 'philo', name: 'الفلسفة', coef: 2, isMain: false, icon: '🤔' },
      { id: 'hisgeo', name: 'التاريخ والجغرافيا', coef: 2, isMain: false, icon: '🗺️' },
      { id: 'islamic', name: 'العلوم الإسلامية', coef: 2, isMain: false, icon: '🕌' },
      { id: 'french', name: 'اللغة الفرنسية', coef: 2, isMain: false, icon: '🇫🇷' },
      { id: 'english', name: 'اللغة الإنجليزية', coef: 2, isMain: false, icon: '🇬🇧' },
      { id: 'sport', name: 'التربية البدنية', coef: 1, isMain: false, icon: '🏃' }
    ]
  },
  technique_math: {
    name: 'تقني رياضي',
    subjects: [
      { id: 'genie', name: 'التكنولوجيا (هندسة ميكانيكية/مدنية/كهربائية/طرائق)', coef: 7, isMain: true, icon: '⚙️' },
      { id: 'math', name: 'الرياضيات', coef: 6, isMain: true, icon: '📐' },
      { id: 'physique', name: 'العلوم الفيزيائية', coef: 6, isMain: true, icon: '⚡' },
      { id: 'arabic', name: 'اللغة العربية وآدابها', coef: 3, isMain: false, icon: '📖' },
      { id: 'philo', name: 'الفلسفة', coef: 2, isMain: false, icon: '🤔' },
      { id: 'hisgeo', name: 'التاريخ والجغرافيا', coef: 2, isMain: false, icon: '🗺️' },
      { id: 'islamic', name: 'العلوم الإسلامية', coef: 2, isMain: false, icon: '🕌' },
      { id: 'french', name: 'اللغة الفرنسية', coef: 2, isMain: false, icon: '🇫🇷' },
      { id: 'english', name: 'اللغة الإنجليزية', coef: 2, isMain: false, icon: '🇬🇧' },
      { id: 'sport', name: 'التربية البدنية', coef: 1, isMain: false, icon: '🏃' }
    ]
  },
  gestion: {
    name: 'تسيير واقتصاد',
    subjects: [
      { id: 'gestion_fin', name: 'التسيير المحاسبي والمالي', coef: 6, isMain: true, icon: '📊' },
      { id: 'economy', name: 'الاقتصاد والمناجمنت', coef: 5, isMain: true, icon: '📈' },
      { id: 'math', name: 'الرياضيات', coef: 5, isMain: true, icon: '📐' },
      { id: 'arabic', name: 'اللغة العربية وآدابها', coef: 3, isMain: false, icon: '📖' },
      { id: 'droit', name: 'القانون', coef: 2, isMain: true, icon: '⚖️' },
      { id: 'hisgeo', name: 'التاريخ والجغرافيا', coef: 4, isMain: true, icon: '🗺️' },
      { id: 'philo', name: 'الفلسفة', coef: 2, isMain: false, icon: '🤔' },
      { id: 'islamic', name: 'العلوم الإسلامية', coef: 2, isMain: false, icon: '🕌' },
      { id: 'french', name: 'اللغة الفرنسية', coef: 2, isMain: false, icon: '🇫🇷' },
      { id: 'english', name: 'اللغة الإنجليزية', coef: 2, isMain: false, icon: '🇬🇧' },
      { id: 'sport', name: 'التربية البدنية', coef: 1, isMain: false, icon: '🏃' }
    ]
  },
  lettres_philo: {
    name: 'آداب وفلسفة',
    subjects: [
      { id: 'philo', name: 'الفلسفة', coef: 6, isMain: true, icon: '🤔' },
      { id: 'arabic', name: 'اللغة العربية وآدابها', coef: 6, isMain: true, icon: '📖' },
      { id: 'hisgeo', name: 'التاريخ والجغرافيا', coef: 4, isMain: true, icon: '🗺️' },
      { id: 'french', name: 'اللغة الفرنسية', coef: 3, isMain: false, icon: '🇫🇷' },
      { id: 'english', name: 'اللغة الإنجليزية', coef: 3, isMain: false, icon: '🇬🇧' },
      { id: 'islamic', name: 'العلوم الإسلامية', coef: 2, isMain: false, icon: '🕌' },
      { id: 'math', name: 'الرياضيات', coef: 2, isMain: false, icon: '📐' },
      { id: 'sport', name: 'التربية البدنية', coef: 1, isMain: false, icon: '🏃' }
    ]
  },
  langues: {
    name: 'لغات أجنبية',
    subjects: [
      { id: 'langue3', name: 'اللغة الأجنبية الثالثة (إسبانية/ألمانية/إيطالية)', coef: 5, isMain: true, icon: '🇪🇸' },
      { id: 'french', name: 'اللغة الفرنسية', coef: 5, isMain: true, icon: '🇫🇷' },
      { id: 'english', name: 'اللغة الإنجليزية', coef: 5, isMain: true, icon: '🇬🇧' },
      { id: 'arabic', name: 'اللغة العربية وآدابها', coef: 5, isMain: true, icon: '📖' },
      { id: 'philo', name: 'الفلسفة', coef: 2, isMain: false, icon: '🤔' },
      { id: 'hisgeo', name: 'التاريخ والجغرافيا', coef: 2, isMain: false, icon: '🗺️' },
      { id: 'islamic', name: 'العلوم الإسلامية', coef: 2, isMain: false, icon: '🕌' },
      { id: 'math', name: 'الرياضيات', coef: 2, isMain: false, icon: '📐' },
      { id: 'sport', name: 'التربية البدنية', coef: 1, isMain: false, icon: '🏃' }
    ]
  }
};

// Curated Detailed Resources per Subject
export const SUBJECT_RESOURCES = {
  math: {
    title: 'الرياضيات',
    frenchTitle: 'Mathématiques',
    description: 'ملخصات المحاور، سلاسل تمارين محلولة، فيديوهات الأستاذ نور الدين، وبكالوريات 2008-2025.',
    units: [
      {
        id: 'math-u1',
        title: 'الوحدة 1: دراسة الدوال العددية، الأسية واللوغاريتمية',
        summary: 'دراسة النهايات، الاستمرارية، الاشتقاقية، التزايد المقارن، ورسم المنحنيات البيانية بدقة.',
        summaries: [
          { name: 'ملخص شامل للدوال الأسية واللوغاريتمية', author: 'الأستاذ قزوري', pages: '14 ص', link: 'https://3as.ency-education.com/math-lessons2.html' },
          { name: 'مطوية كليك: ملخص قواعد الاشتقاق وحالات عدم التعيين', author: 'سلسلة كليك', pages: '4 ص', link: 'https://3as.ency-education.com/math-lessons.html' },
          { name: 'ملخص مركز لدراسة الدوال ونقط الانعطاف والمستقيمات المقاربة', author: 'الأستاذ نور الدين', pages: '8 ص', link: 'https://3as.ency-education.com/math-lessons1.html' }
        ],
        exercises: [
          { name: 'سلسلة التحدي في الدوال مع الحل المفصل (60 تمرين)', author: 'الأستاذ نور الدين', type: 'تطبيقي وشامل', link: 'https://3as.ency-education.com/math-activities2.html' },
          { name: 'تمارين الدوال المختارة من البكالوريات الأجنبية والوطنية', author: 'الأستاذ حليلات', type: 'مستوى متقدم', link: 'https://3as.ency-education.com/math-activities1.html' }
        ],
        videos: [
          { title: 'الدوال العددية من الألف إلى الياء (مراجعة شاملة)', teacher: 'الأستاذ نور الدين', views: '2.1M', duration: '2h 15m', url: 'https://www.youtube.com/results?search_query=الأستاذ+نور+الدين+الدوال+العددية' },
          { title: 'الدالة الأسية: كل الأفكار والأسئلة الشائعة في البكالوريا', teacher: 'الأستاذ نور الدين', views: '1.8M', duration: '1h 45m', url: 'https://www.youtube.com/results?search_query=الأستاذ+نور+الدين+الدالة+الأسية' },
          { title: 'الدالة اللوغاريتمية ln: ملخص القوانين مع تمارين نموذجية', teacher: 'الأستاذ نور الدين', views: '1.4M', duration: '1h 30m', url: 'https://www.youtube.com/results?search_query=الأستاذ+نور+الدين+الدالة+اللوغاريتمية' }
        ]
      },
      {
        id: 'math-u2',
        title: 'الوحدة 2: المتتاليات العددية (Suites Numériques)',
        summary: 'المتتاليات الحسابية والهندسية، البرهان بالتراجع، التقارب، وحساب المجاميع والجداءات.',
        summaries: [
          { name: 'ملخص شامل لقوانين المتتاليات وحساب المجاميع S و P', author: 'الأستاذ نور الدين', pages: '10 ص', link: 'https://3as.ency-education.com/math-lessons3.html' },
          { name: 'منهجية البرهان بالتراجع مع كل الحالات الخاصة', author: 'الأستاذ بوالريش', pages: '6 ص', link: 'https://3as.ency-education.com/math-lessons3.html' }
        ],
        exercises: [
          { name: 'سلسلة 100 تمرين في المتتاليات بالحلول النموذجية', author: 'سلسلة هباج', type: 'شامل وتدريجي', link: 'https://3as.ency-education.com/math-activities4.html' },
          { name: 'المتتاليات المرفقة بالدوال من بكالوريات سابقة', author: 'الأستاذ قزوري', type: 'أفكار بكالوريا', link: 'https://3as.ency-education.com/math-activities4.html' }
        ],
        videos: [
          { title: 'المتتاليات العددية: كل ما تحتاج معرفته للعلامة الكاملة', teacher: 'الأستاذ نور الدين', views: '1.9M', duration: '3h 10m', url: 'https://www.youtube.com/results?search_query=الأستاذ+نور+الدين+المتتاليات' },
          { title: 'حساب المجاميع المعقدة في المتتاليات بطرق سحرية', teacher: 'الأستاذ نور الدين', views: '950K', duration: '1h 10m', url: 'https://www.youtube.com/results?search_query=الأستاذ+نور+الدين+مجاميع+المتتاليات' }
        ]
      },
      {
        id: 'math-u3',
        title: 'الوحدة 3: الدوال الأصلية والحساب التكاملي',
        summary: 'جدول الدوال الأصلية، التكامل بالتجزئة، وحساب المساحات والحجوم.',
        summaries: [
          { name: 'جدول الدوال الأصلية الشهيرة وطرق التكامل بالتجزئة', author: 'الأستاذ قزوري', pages: '8 ص', link: 'https://3as.ency-education.com/math-lessons5.html' }
        ],
        exercises: [
          { name: 'سلسلة تمارين حساب التكامل والمساحات بالحل', author: 'الأستاذ نور الدين', type: 'تطبيقي', link: 'https://3as.ency-education.com/math-activities5.html' }
        ],
        videos: [
          { title: 'التكامل والدوال الأصلية وحساب المساحات خطوة بخطوة', teacher: 'الأستاذ نور الدين', views: '800K', duration: '1h 50m', url: 'https://www.youtube.com/results?search_query=الأستاذ+نور+الدين+التكامل' }
        ]
      },
      {
        id: 'math-u4',
        title: 'الوحدة 4: الاحتمالات (Probabilités)',
        summary: 'التحليل التوفيقي، السحب في آن واحد، على التوالي بإرجاع وبدون إرجاع، والمتغير العشوائي.',
        summaries: [
          { name: 'ملخص قوانين الاحتمالات وشجرة الإمكانيات والمتغير العشوائي', author: 'الأستاذ نور الدين', pages: '12 ص', link: 'https://3as.ency-education.com/math-lessons.html' }
        ],
        exercises: [
          { name: 'سلسلة مسائل الاحتمالات مع الحلول التفصيلية', author: 'سلسلة المتميز', type: 'مسائل بكالوريا', link: 'https://3as.ency-education.com/math-activities9.html' }
        ],
        videos: [
          { title: 'الاحتمالات من الصفر للمبتدئين حتى الاحتراف', teacher: 'الأستاذ نور الدين', views: '1.2M', duration: '2h 20m', url: 'https://www.youtube.com/results?search_query=الأستاذ+نور+الدين+الاحتمالات' }
        ]
      },
      {
        id: 'math-u5',
        title: 'الوحدة 5: الهندسة الفضائية والأعداد المركبة (خاص بالرياضيات والتقني والعلوم)',
        summary: 'الجداء السلمي في الفضاء، معادلة المستوي والكرة، العمدة والشكل المثلثي والتحويلات النقطية.',
        summaries: [
          { name: 'ملخص الهندسة في الفضاء والمعادلات الديكارتية', author: 'الأستاذ قزوري', pages: '10 ص', link: 'https://3as.ency-education.com/math-lessons6.html' },
          { name: 'ملخص شامل في الأعداد المركبة والتحويلات النقطية', author: 'الأستاذ نور الدين', pages: '16 ص', link: 'https://3as.ency-education.com/math-lessons7.html' }
        ],
        exercises: [
          { name: 'سلسلة تمارين الأعداد المركبة والهندسة الفضائية مع الحلول', author: 'الأستاذ نور الدين', type: 'مستوى عالي', link: 'https://3as.ency-education.com/math-activities8.html' }
        ],
        videos: [
          { title: 'الهندسة الفضائية كاملة ومبسطة', teacher: 'الأستاذ نور الدين', views: '700K', duration: '2h 00m', url: 'https://www.youtube.com/results?search_query=الأستاذ+نور+الدين+الهندسة+الفضائية' },
          { title: 'الأعداد المركبة من البداية إلى التحويلات النقطية', teacher: 'الأستاذ نور الدين', views: '1.5M', duration: '3h 30m', url: 'https://www.youtube.com/results?search_query=الأستاذ+نور+الدين+الأعداد+المركبة' }
        ]
      }
    ]
  },
  sciences_nat: {
    title: 'علوم الطبيعة والحياة',
    frenchTitle: 'Sciences Naturelles',
    description: 'منهجية الإجابة الوزارية، ملخصات الأستاذ بوالريش، سلاسل تمارين المسعى العلمي، والرسومات التخطيطية.',
    units: [
      {
        id: 'sci-u1',
        title: 'المجال 1: التخصص الوظيفي للبروتينات',
        summary: 'تركيب البروتين (الاستنساخ والترجمة)، البنية الفراغية، النشاط الإنزيمي، المناعة والاتصال العصبي.',
        summaries: [
          { name: 'مجلة بوالريش: تركيب البروتين مع المنهجية الجديدة', author: 'الأستاذ بوالريش أحمد', pages: '45 ص', link: 'https://3as.ency-education.com/sciences-lessons.html' },
          { name: 'ملخص شامل لآليات المناعة الخلطية والخلوية والذات واللاذات', author: 'الأستاذ بوالريش أحمد', pages: '38 ص', link: 'https://3as.ency-education.com/sciences-lessons.html' },
          { name: 'ملخص الإنزيمات والعوامل المؤثرة على النشاط الإنزيمي', author: 'الأستاذ عقبة بن نافع', pages: '18 ص', link: 'https://3as.ency-education.com/sciences-lessons.html' },
          { name: 'ملخص الاتصال العصبي: كمون الراحة، كمون العمل، وإدماج المشابك', author: 'الأستاذ بوالريش', pages: '32 ص', link: 'https://3as.ency-education.com/sciences-lessons.html' }
        ],
        exercises: [
          { name: 'سلسلة تمارين المسعى العلمي والاستدلال (تمارين البكالوريا الحديثة)', author: 'الأستاذ بوالريش', type: 'منهجية الاستدلال العلمي', link: 'https://3as.ency-education.com/sciences-activities.html' },
          { name: 'تمارين المناعة والاتصال العصبي بالحل النموذجي وسلم التنقيط', author: 'الأستاذ بن خريف', type: 'تمارين نموذجية', link: 'https://3as.ency-education.com/sciences-activities.html' }
        ],
        videos: [
          { title: 'شرح تركيب البروتين (الاستنساخ والترجمة) بتقنية 3D', teacher: 'الأستاذ بوالريش', views: '950K', duration: '1h 15m', url: 'https://www.youtube.com/results?search_query=بوالريش+تركيب+البروتين' },
          { title: 'دورة المناعة الشاملة: فهم كل التفاصيل بدقة متناهية', teacher: 'الأستاذ بوالريش', views: '1.4M', duration: '2h 45m', url: 'https://www.youtube.com/results?search_query=بوالريش+المناعة' },
          { title: 'الاتصال العصبي: المشابك والإدماج العصبي والظواهر الكهربائية', teacher: 'الأستاذ بوالريش', views: '800K', duration: '2h 10m', url: 'https://www.youtube.com/results?search_query=بوالريش+الاتصال+العصبي' }
        ]
      },
      {
        id: 'sci-u2',
        title: 'المجال 2: التحولات الطاقوية (تركيب ضوئي وتنفس وتخمر)',
        summary: 'تحويل الطاقة الضوئية إلى كيميائية كامنة، الأكسدة التنفسية، وحلقة كريبس والفسفرة التأكسدية.',
        summaries: [
          { name: 'ملخص التحولات الطاقوية والتركيب الضوئي الميسر', author: 'الأستاذ بوالريش', pages: '25 ص', link: 'https://3as.ency-education.com/sciences-lessons.html' }
        ],
        exercises: [
          { name: 'تمارين التركيب الضوئي والتنفس من بكالوريات سابقة مع الحلول', author: 'سلسلة التميز', type: 'شامل', link: 'https://3as.ency-education.com/sciences-activities.html' }
        ],
        videos: [
          { title: 'التحولات الطاقوية كاملة (التركيب الضوئي والتنفس)', teacher: 'الأستاذ شاوش', views: '650K', duration: '1h 50m', url: 'https://www.youtube.com/results?search_query=التحولات+الطاقوية+بكالوريا' }
        ]
      },
      {
        id: 'sci-u3',
        title: 'المجال 3: الجيولوجيا والتكتونية العامة (خاص بشعبة علوم تجريبية)',
        summary: 'حركة الصفائح، الغوص والظواهر المرتبطة به، وبنية الكرة الأرضية والنشاط التكتوني.',
        summaries: [
          { name: 'ملخص شامل ومبسط في الجيولوجيا وحركة الصفائح', author: 'الأستاذ بوالريش', pages: '20 ص', link: 'https://3as.ency-education.com/sciences-lessons.html' }
        ],
        exercises: [
          { name: 'تمارين الجيولوجيا المختارة مع الحل النموذجي', author: 'الأستاذ بوخلخال', type: 'تطبيقي', link: 'https://3as.ency-education.com/sciences-activities.html' }
        ],
        videos: [
          { title: 'الجيولوجيا في فيديو واحد: كل ما تحتاجه للبكالوريا', teacher: 'الأستاذ شاوش', views: '450K', duration: '1h 30m', url: 'https://www.youtube.com/results?search_query=جيولوجيا+بكالوريا+علوم' }
        ]
      }
    ]
  },
  physique: {
    title: 'العلوم الفيزيائية',
    frenchTitle: 'Sciences Physiques',
    description: 'الميكانيك، الكهرباء RC/RL/RLC، النووي، المتابعة الزمنية والأسترة مع شروحات الأستاذ جوفر وقزوري وشريفي.',
    units: [
      {
        id: 'phy-u1',
        title: 'الوحدة 1: المتابعة الزمنية لتحول كيميائي في وسط مائي',
        summary: 'طرق المتابعة (قياس الناقلية، المعايرة اللونية، ضغط وحجم الغاز)، جدول التقدم، وزمن نصف التفاعل t1/2.',
        summaries: [
          { name: 'ملخص شامل في المتابعة الزمنية مع كل المنحنيات البيانية والسرعات', author: 'الأستاذ قزوري', pages: '12 ص', link: 'https://3as.ency-education.com/physics-lessons.html' },
          { name: 'ملخص قوانين الكيمياء وحساب السرعات والناقلية', author: 'الأستاذ جوفر', pages: '8 ص', link: 'https://3as.ency-education.com/physics-lessons.html' }
        ],
        exercises: [
          { name: 'سلسلة 50 تمرين في المتابعة الزمنية بالحلول المفصلة', author: 'الأستاذ شريفي', type: 'سلاسل تدرج', link: 'https://3as.ency-education.com/physics-activities.html' },
          { name: 'مسائل المتابعة الزمنية من بكالوريات سابقة', author: 'الأستاذ قزوري', type: 'أفكار بكالوريا', link: 'https://3as.ency-education.com/physics-activities.html' }
        ],
        videos: [
          { title: 'المتابعة الزمنية كاملة من الصفر مع الأستاذ جوفر', teacher: 'الأستاذ جوفر', views: '1.6M', duration: '2h 10m', url: 'https://www.youtube.com/results?search_query=الأستاذ+جوفر+المتابعة+الزمنية' },
          { title: 'حساب جميع السرعات واستنتاجها من المنحنيات البيانية', teacher: 'الأستاذ شريفي', views: '900K', duration: '1h 05m', url: 'https://www.youtube.com/results?search_query=الأستاذ+شريفي+سرعات+التفاعل' }
        ]
      },
      {
        id: 'phy-u2',
        title: 'الوحدة 2: التحولات النووية (Nucléaire)',
        summary: 'قوانين صودي للانحفاظ، أنواع التفككات النشطة، التناقص الإشعاعي، الطاقة المحررة، ومخطط سيغري وأستون.',
        summaries: [
          { name: 'ملخص قوانين النووي وحساب النقص الكتلي والطاقة المحررة Elib', author: 'الأستاذ قزوري', pages: '10 ص', link: 'https://3as.ency-education.com/physics-lessons.html' }
        ],
        exercises: [
          { name: 'سلسلة تمارين النووي والتأريخ مع الحلول النموذجية', author: 'الأستاذ جوفر', type: 'تطبيقي', link: 'https://3as.ency-education.com/physics-activities.html' }
        ],
        videos: [
          { title: 'التحولات النووية كاملة مع حل تمارين نموذجية', teacher: 'الأستاذ جوفر', views: '1.2M', duration: '1h 40m', url: 'https://www.youtube.com/results?search_query=الأستاذ+جوفر+النووي' }
        ]
      },
      {
        id: 'phy-u3',
        title: 'الوحدة 3: دراسة الظواهر الكهربائية (RC / RL / RLC)',
        summary: 'ثنائي القطب RC (شحن وتفريغ المكثفة)، ثنائي القطب RL (تطبيق وقطع التيار)، والمعادلات التفاضلية.',
        summaries: [
          { name: 'ملخص شامل في الدارات الكهربائية RC و RL مع حل المعادلات التفاضلية', author: 'الأستاذ قزوري', pages: '16 ص', link: 'https://3as.ency-education.com/physics-lessons.html' }
        ],
        exercises: [
          { name: 'سلسلة 40 تمرين في الكهرباء مع الحلول', author: 'الأستاذ شريفي', type: 'تدرج ومسائل', link: 'https://3as.ency-education.com/physics-activities.html' }
        ],
        videos: [
          { title: 'الدارة RC بالتفصيل: المعادلات التفاضلية والحلول والمنحنيات', teacher: 'الأستاذ جوفر', views: '1.5M', duration: '2h 00m', url: 'https://www.youtube.com/results?search_query=الأستاذ+جوفر+RC' },
          { title: 'الدارة RL والوشيعة: كل الأفكار المهمة للبكالوريا', teacher: 'الأستاذ جوفر', views: '1.1M', duration: '1h 35m', url: 'https://www.youtube.com/results?search_query=الأستاذ+جوفر+RL' }
        ]
      },
      {
        id: 'phy-u4',
        title: 'الوحدة 4: تطور جملة كيميائية نحو حالة توازن (الأحماض والأسس pH)',
        summary: 'الـ pH، كسر التفاعل Qr، ثابت التوازن K و pKa، المعايرة البي إتشية والناقلية، والصفة الغالبة.',
        summaries: [
          { name: 'ملخص شامل في الأحماض والأسس والمعايرة الـ pH مترية', author: 'الأستاذ قزوري', pages: '14 ص', link: 'https://3as.ency-education.com/physics-lessons.html' }
        ],
        exercises: [
          { name: 'سلسلة تمارين الأحماض والأسس مع الحلول', author: 'الأستاذ جوفر', type: 'تطبيقي', link: 'https://3as.ency-education.com/physics-activities.html' }
        ],
        videos: [
          { title: 'الأحماض والأسس: شرح مبسط لكل القوانين وحساب الـ pH', teacher: 'الأستاذ جوفر', views: '1.3M', duration: '2h 15m', url: 'https://www.youtube.com/results?search_query=الأستاذ+جوفر+أحماض+وأسس' }
        ]
      },
      {
        id: 'phy-u5',
        title: 'الوحدة 5: تطور جملة ميكانيكية (Mécanique)',
        summary: 'قوانين نيوتن، حركة الأقمار والكواكب (قوانين كبلر)، السقوط الشاقولي الحقيقي والحر، وحركة القذائف والمستوي.',
        summaries: [
          { name: 'ملخص شامل في الميكانيك: الأقمار، السقوط الشاقولي، المستوي المائل والقذائف', author: 'الأستاذ قزوري', pages: '22 ص', link: 'https://3as.ency-education.com/physics-lessons.html' }
        ],
        exercises: [
          { name: 'سلسلة مسائل الميكانيك الشاملة من البكالوريات الوطنية والأجنبية', author: 'الأستاذ قزوري', type: 'مستوى متقدم', link: 'https://3as.ency-education.com/physics-activities.html' }
        ],
        videos: [
          { title: 'الميكانيك من الصفر: حركة الأقمار وقوانين كبلر وقوانين نيوتن', teacher: 'الأستاذ جوفر', views: '1.7M', duration: '3h 00m', url: 'https://www.youtube.com/results?search_query=الأستاذ+جوفر+الميكانيك' },
          { title: 'حركة القذائف والمستويات المائلة والأفقية بدون تعقيد', teacher: 'الأستاذ شريفي', views: '1.1M', duration: '1h 50m', url: 'https://www.youtube.com/results?search_query=الأستاذ+شريفي+القذائف' }
        ]
      }
    ]
  },
  philo: {
    title: 'الفلسفة',
    frenchTitle: 'Philosophie',
    description: 'مقالات فلسفية جاهزة لجميع الشعب، منهجية الجدل والمقارنة والاستقصاء بالوضع، وشروحات الأستاذ خليل سعيداني.',
    units: [
      {
        id: 'phi-u1',
        title: 'منهجيات كتابة المقال الفلسفي',
        summary: 'طريقة الجدل، الاستقصاء بالوضع، المقارنة، وتحليل النص الفلسفي مع سلم التنقيط الوزاري.',
        summaries: [
          { name: 'دليل كتابة المقالات الفلسفية بالمنهجية الرسمية (20/20)', author: 'الأستاذ خليل سعيداني', pages: '15 ص', link: 'https://3as.ency-education.com/philo-lessons.html' },
          { name: 'مطوية كليك: خطوات الاستقصاء بالوضع والجدل خطوة بخطوة', author: 'سلسلة كليك', pages: '6 ص', link: 'https://3as.ency-education.com/philo-lessons.html' }
        ],
        exercises: [
          { name: 'نماذج مقالات مصححة ومعدلة وفق البكالوريا', author: 'الأستاذ سعيداني', type: 'مقالات نموذجية', link: 'https://3as.ency-education.com/philo-activities.html' }
        ],
        videos: [
          { title: 'كيف تكتب مقالة استقصاء بالوضع وتضمن أكثر من 16/20', teacher: 'الأستاذ خليل سعيداني', views: '1.5M', duration: '45m', url: 'https://www.youtube.com/results?search_query=خليل+سعيداني+استقصاء+بالوضع' },
          { title: 'منهجية الجدل بالتفصيل مع تطبيق حي على مقالة فلسفية', teacher: 'الأستاذ خليل سعيداني', views: '1.2M', duration: '50m', url: 'https://www.youtube.com/results?search_query=خليل+سعيداني+منهجية+الجدل' }
        ]
      },
      {
        id: 'phi-u2',
        title: 'مقالات الشعب العلمية والتقنية وتسيير واقتصاد',
        summary: 'مقالة السؤال العلمي والفلسفي، البيولوجيا، الرياضيات، العلوم الإنسانية، واليقين الرياضي.',
        summaries: [
          { name: 'جميع المقالات المقترحة للشعب العلمية والتسيير جاهزة للحفظ', author: 'الأستاذ خليل سعيداني', pages: '30 ص', link: 'https://3as.ency-education.com/philo-lessons.html' }
        ],
        exercises: [
          { name: 'مواضيع فلسفة مقترحة مع الحلول للشعب العلمية', author: 'سلسلة السبيل', type: 'مقترحات', link: 'https://3as.ency-education.com/philo-activities.html' }
        ],
        videos: [
          { title: 'مقالة الرياضيات والمفاهيم الرياضية (أصل المفاهيم الرياضية)', teacher: 'الأستاذ خليل سعيداني', views: '980K', duration: '40m', url: 'https://www.youtube.com/results?search_query=خليل+سعيداني+مقالة+الرياضيات' },
          { title: 'مقالة البيولوجيا والمادة الحية (تطبيق المنهج التجريبي على المادة الحية)', teacher: 'الأستاذ خليل سعيداني', views: '850K', duration: '35m', url: 'https://www.youtube.com/results?search_query=خليل+سعيداني+مقالة+البيولوجيا' }
        ]
      },
      {
        id: 'phi-u3',
        title: 'مقالات شعبة آداب وفلسفة ولغات أجنبية',
        summary: 'الإحساس والإدراك، الذاكرة والخيال، اللغة والفكر، الشعور واللاشعور، والحرية والمسؤولية، والأنظمة السياسية.',
        summaries: [
          { name: 'كتاب المقالات الفلسفية الشاملة لشعبة آداب وفلسفة', author: 'الأستاذ خليل سعيداني', pages: '65 ص', link: 'https://3as.ency-education.com/philo-lessons.html' }
        ],
        exercises: [
          { name: 'بنك المقالات الفلسفية من 2008 إلى 2025 محلولة وموسعة', author: 'الأستاذ عيسى بوحسون', type: 'أرشيف كامل', link: 'https://3as.ency-education.com/philo-activities.html' }
        ],
        videos: [
          { title: 'مقالة الإحساس والإدراك (العوامل الذاتية والموضوعية)', teacher: 'الأستاذ خليل سعيداني', views: '1.1M', duration: '45m', url: 'https://www.youtube.com/results?search_query=خليل+سعيداني+الإحساس+والإدراك' },
          { title: 'مقالة الدال والمدلول واللغة والفكر بالتفصيل', teacher: 'الأستاذ خليل سعيداني', views: '750K', duration: '40m', url: 'https://www.youtube.com/results?search_query=خليل+سعيداني+اللغة+والفكر' }
        ]
      }
    ]
  },
  hisgeo: {
    title: 'التاريخ والجغرافيا',
    frenchTitle: 'Histoire & Géographie',
    description: 'ملخصات الأستاذ بورنان، جميع التواريخ والشخصيات والمصطلحات المقررة، ورسومات الخرائط.',
    units: [
      {
        id: 'hg-u1',
        title: 'التاريخ: الحرب الباردة وبروز الصراع وتشكل العالم',
        summary: 'معايير تشكل العالم، الاستراتيجيات الخاصة بكل كتلة، الأزمات الدولية، والتعايش السلمي وانفراج العلاقات.',
        summaries: [
          { name: 'ملخص شامل في الحرب الباردة وفق المخططات الذهنية', author: 'الأستاذ بورنان', pages: '14 ص', link: 'https://3as.ency-education.com/hisgeo-lessons.html' },
          { name: 'جدول جميع التواريخ والشخصيات المقررة في الحرب الباردة', author: 'الأستاذ بورنان', pages: '6 ص', link: 'https://3as.ency-education.com/hisgeo-lessons.html' }
        ],
        exercises: [
          { name: 'أسئلة الفهم والاستنتاج غير المباشرة في التاريخ مع الحلول', author: 'الأستاذ بورنان', type: 'أسئلة غير مباشرة', link: 'https://3as.ency-education.com/hisgeo-activities.html' }
        ],
        videos: [
          { title: 'الحرب الباردة كاملة في فيديو واحد بطريقة الحفظ السريع والخرائط الذهنية', teacher: 'الأستاذ بورنان', views: '2.3M', duration: '1h 30m', url: 'https://www.youtube.com/results?search_query=الأستاذ+بورنان+الحرب+الباردة' }
        ]
      },
      {
        id: 'hg-u2',
        title: 'التاريخ: الثورة التحريرية الجزائرية الكبرى (1954 - 1962)',
        summary: 'استراتيجية الثورة داخلياً وخارجياً، مؤتمر الصومام، هجمات الشمال القسنطيني، ومفاوضات إيفيان واستعادة السيادة.',
        summaries: [
          { name: 'ملخص الثورة التحريرية الجزائرية بأسلوب النقاط السهلة للحفظ', author: 'الأستاذ بورنان', pages: '18 ص', link: 'https://3as.ency-education.com/hisgeo-lessons.html' }
        ],
        exercises: [
          { name: 'بنك أسئلة الثورة الجزائرية من شهادات البكالوريا السابقة', author: 'الأستاذ منصوري', type: 'مواضيع بكالوريا', link: 'https://3as.ency-education.com/hisgeo-activities.html' }
        ],
        videos: [
          { title: 'الثورة الجزائرية كاملة ومبسطة جداً مع الأستاذ بورنان', teacher: 'الأستاذ بورنان', views: '1.9M', duration: '1h 45m', url: 'https://www.youtube.com/results?search_query=الأستاذ+بورنان+الثورة+الجزائرية' }
        ]
      },
      {
        id: 'hg-u3',
        title: 'الجغرافيا: إشكالية التقدم والتخلف والقوى الاقتصادية الكبرى',
        summary: 'مفهوم التقدم والتخلف، البترول والغاز والقمح، القوة الاقتصادية الأمريكية، الاتحاد الأوروبي، وشرق وجنوب شرق آسيا.',
        summaries: [
          { name: 'ملخص مصطلحات وخرائط الجغرافيا المقررة في البكالوريا', author: 'الأستاذ بورنان', pages: '16 ص', link: 'https://3as.ency-education.com/hisgeo-lessons.html' },
          { name: 'طريقة التعليق على الجداول والرسومات البيانية وتوقيع الخرائط', author: 'الأستاذ بورنان', pages: '4 ص', link: 'https://3as.ency-education.com/hisgeo-lessons.html' }
        ],
        exercises: [
          { name: 'تمارين التعليق على الجداول وتوقيع الخرائط المصححة', author: 'الأستاذ منصوري', type: 'مهارات الجغرافيا', link: 'https://3as.ency-education.com/hisgeo-activities.html' }
        ],
        videos: [
          { title: 'كيفية التعليق على الجداول والحصول على العلامة الكاملة', teacher: 'الأستاذ بورنان', views: '1.1M', duration: '25m', url: 'https://www.youtube.com/results?search_query=الأستاذ+بورنان+التعليق+على+الجدول' },
          { title: 'القوى الاقتصادية (أمريكا، أوروبا، آسيا) ملخصة في دقائق', teacher: 'الأستاذ بورنان', views: '1.4M', duration: '1h 10m', url: 'https://www.youtube.com/results?search_query=الأستاذ+بورنان+الجغرافيا' }
        ]
      }
    ]
  },
  islamic: {
    title: 'العلوم الإسلامية',
    frenchTitle: 'Sciences Islamiques',
    description: 'دروس الشريعة الإسلامية وفق المنهاج الوزاري الجديد مع ملخصات الأستاذ شمس الدين والأستاذة بوسعادي.',
    units: [
      {
        id: 'isl-u1',
        title: 'دروس العقيدة والقرآن والفكر الإسلامي',
        summary: 'العقيدة الإسلامية وأثرها، وسائل القرآن في تثبيت العقيدة، الصحة النفسية والجسمية، والقيم في القرآن.',
        summaries: [
          { name: 'ملخص شامل في العلوم الإسلامية بطريقة الجداول والمخططات', author: 'الأستاذة بوسعادي نوال', pages: '24 ص', link: 'https://3as.ency-education.com/islamic-lessons.html' },
          { name: 'ملخص مفاهيم الآيات واستخراج الأحكام والفوائد', author: 'الأستاذ عمارة', pages: '10 ص', link: 'https://3as.ency-education.com/islamic-lessons.html' }
        ],
        exercises: [
          { name: 'بنك أسئلة الفهم في التربية الإسلامية مع الإجابات النموذجية', author: 'الأستاذة بوسعادي', type: 'أسئلة فهم واستنباط', link: 'https://3as.ency-education.com/islamic-activities.html' }
        ],
        videos: [
          { title: 'مراجعة شاملة لجميع دروس الشريعة الإسلامية في جلسة واحدة', teacher: 'الأستاذ شمس الدين', views: '1.8M', duration: '2h 00m', url: 'https://www.youtube.com/results?search_query=الأستاذ+شمس+الدين+علوم+إسلامية+بكالوريا' },
          { title: 'طريقة استخراج الأحكام والفوائد وضمان 4 نقاط كاملة في البكالوريا', teacher: 'الأستاذة بوسعادي', views: '950K', duration: '30m', url: 'https://www.youtube.com/results?search_query=استخراج+الأحكام+والفوائد+بكالوريا' }
        ]
      },
      {
        id: 'isl-u2',
        title: 'دروس التشريع الإسلامي والمعاملات والميراث',
        summary: 'مصادر التشريع (الإجماع والقياس والمصلحة المرسلة)، مقاصد الشريعة، المعاملات المالية، والميراث وأحكامه.',
        summaries: [
          { name: 'ملخص مقاصد الشريعة والربا والمعاملات المالية المعاصرة ومسائل الميراث', author: 'الأستاذة بوسعادي', pages: '20 ص', link: 'https://3as.ency-education.com/islamic-lessons.html' }
        ],
        exercises: [
          { name: 'حل مسائل الميراث والربا من البكالوريات السابقة', author: 'الأستاذ عمارة', type: 'مسائل تطبيقية', link: 'https://3as.ency-education.com/islamic-activities.html' }
        ],
        videos: [
          { title: 'مسائل الميراث وشرح شجرة الورثة بطريقة مبسطة لا تُنسى', teacher: 'الأستاذ شمس الدين', views: '1.1M', duration: '40m', url: 'https://www.youtube.com/results?search_query=الميراث+شمس+الدين+بكالوريا' }
        ]
      }
    ]
  },
  arabic: {
    title: 'اللغة العربية وآدابها',
    frenchTitle: 'Langue Arabe',
    description: 'عصر الضعف والانحطاط، شعر المنفى والمهجر، الشعر الحر، الالتزام، القواعد والإعراب والبلاغة مع الأستاذ حيقون.',
    units: [
      {
        id: 'ar-u1',
        title: 'الوحدة 1: دراسة النصوص والشعر (المنفى، المهجر، الثورة والقضية الفلسطينية)',
        summary: 'شعر المديح والزهد، النزعة الإنسانية في شعر المهجر، شعر الثورة التحريرية، ظاهرة الحزن والألم، وظاهرة الالتزام.',
        summaries: [
          { name: 'ملخص شامل في الأدب العربي: الرواد، الخصائص، النزعات، والقيم', author: 'الأستاذ حيقون أسامة', pages: '18 ص', link: 'https://3as.ency-education.com/arabic-lessons.html' },
          { name: 'دليل الإجابة على أسئلة البناء الفكري ونيل العلامة الكاملة', author: 'الأستاذ خالد فكرون', pages: '8 ص', link: 'https://3as.ency-education.com/arabic-lessons.html' }
        ],
        exercises: [
          { name: 'نماذج نصوص شعرية ونثرية محلولة بالتفصيل وفق سلم التنقيط', author: 'الأستاذ حيقون', type: 'نصوص نموذجية', link: 'https://3as.ency-education.com/arabic-activities.html' }
        ],
        videos: [
          { title: 'مراجعة البناء الفكري لجميع الشعب: النزعات والقيم والحقول الدلالية', teacher: 'الأستاذ حيقون أسامة', views: '1.4M', duration: '1h 20m', url: 'https://www.youtube.com/results?search_query=حيقون+أسامة+البناء+الفكري' },
          { title: 'شعر المنفى والمهجر والثورة الجزائرية وفلسطين بالتفصيل', teacher: 'الأستاذ حيقون أسامة', views: '1.1M', duration: '1h 15m', url: 'https://www.youtube.com/results?search_query=حيقون+أسامة+الأدب' }
        ]
      },
      {
        id: 'ar-u2',
        title: 'الوحدة 2: القواعد والإعراب والبلاغة (البناء اللغوي)',
        summary: 'إعراب إذن، لو، لولا، لوما، إذا وإذ وحينئذ، البدل وعطف البيان، الجمل التي لها محل والتي لا محل لها، والصور البيانية والمحسنات.',
        summaries: [
          { name: 'ملخص قواعد اللغة العربية والإعرابات الشائعة في البكالوريا', author: 'الأستاذ حيقون', pages: '14 ص', link: 'https://3as.ency-education.com/arabic-lessons.html' },
          { name: 'جدول الصور البيانية (التشبيه، الاستعارة، الكناية) وسر بلاغتها', author: 'الأستاذ حيقون', pages: '6 ص', link: 'https://3as.ency-education.com/arabic-lessons.html' }
        ],
        exercises: [
          { name: 'بنك تمارين الإعراب والصور البيانية من بكالوريا 2008 إلى 2025', author: 'الأستاذ فكرون', type: 'تطبيقات قواعد', link: 'https://3as.ency-education.com/arabic-activities.html' }
        ],
        videos: [
          { title: 'قواعد اللغة العربية كاملة في فيديو واحد لجميع الشعب', teacher: 'الأستاذ حيقون أسامة', views: '2.0M', duration: '2h 00m', url: 'https://www.youtube.com/results?search_query=حيقون+أسامة+قواعد+اللغة+العربية' },
          { title: 'الصور البيانية في 15 دقيقة: كيف تفرق بين الاستعارة والكناية والتشبيه', teacher: 'الأستاذ حيقون أسامة', views: '1.6M', duration: '20m', url: 'https://www.youtube.com/results?search_query=حيقون+أسامة+الصور+البيانية' }
        ]
      }
    ]
  }
};

// Official BAC Exam Archive (2008 - 2025)
export const BAC_YEARS = [
  2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008
];

export const BAC_ARCHIVE_DATA = [
  {
    year: 2024,
    session: 'الدورة العادية',
    stream: 'sciences',
    subject: 'math',
    subjectName: 'الرياضيات',
    sujetUrl: 'https://www.ency-education.com/bac2024.html',
    corrigeUrl: 'https://www.ency-education.com/bac2024.html',
    topicsCount: 2,
    difficulty: 'متوسط إلى دقيق'
  },
  {
    year: 2024,
    session: 'الدورة العادية',
    stream: 'sciences',
    subject: 'physique',
    subjectName: 'العلوم الفيزيائية',
    sujetUrl: 'https://www.ency-education.com/bac2024.html',
    corrigeUrl: 'https://www.ency-education.com/bac2024.html',
    topicsCount: 2,
    difficulty: 'متوسط'
  },
  {
    year: 2024,
    session: 'الدورة العادية',
    stream: 'sciences',
    subject: 'sciences_nat',
    subjectName: 'علوم الطبيعة والحياة',
    sujetUrl: 'https://www.ency-education.com/bac2024.html',
    corrigeUrl: 'https://www.ency-education.com/bac2024.html',
    topicsCount: 2,
    difficulty: 'يتطلب منهجية دقيقة'
  },
  {
    year: 2023,
    session: 'الدورة العادية',
    stream: 'sciences',
    subject: 'math',
    subjectName: 'الرياضيات',
    sujetUrl: 'https://www.ency-education.com/bac2023.html',
    corrigeUrl: 'https://www.ency-education.com/bac2023.html',
    topicsCount: 2,
    difficulty: 'في المتناول'
  },
  {
    year: 2023,
    session: 'الدورة العادية',
    stream: 'sciences',
    subject: 'physique',
    subjectName: 'العلوم الفيزيائية',
    sujetUrl: 'https://www.ency-education.com/bac2023.html',
    corrigeUrl: 'https://www.ency-education.com/bac2023.html',
    topicsCount: 2,
    difficulty: 'شامل'
  },
  {
    year: 2023,
    session: 'الدورة العادية',
    stream: 'sciences',
    subject: 'sciences_nat',
    subjectName: 'علوم الطبيعة والحياة',
    sujetUrl: 'https://www.ency-education.com/bac2023.html',
    corrigeUrl: 'https://www.ency-education.com/bac2023.html',
    topicsCount: 2,
    difficulty: 'متوسط'
  },
  {
    year: 2022,
    session: 'الدورة العادية',
    stream: 'sciences',
    subject: 'math',
    subjectName: 'الرياضيات',
    sujetUrl: 'https://www.ency-education.com/bac2022.html',
    corrigeUrl: 'https://www.ency-education.com/bac2022.html',
    topicsCount: 2,
    difficulty: 'متوسط'
  },
  {
    year: 2021,
    session: 'الدورة العادية',
    stream: 'sciences',
    subject: 'math',
    subjectName: 'الرياضيات',
    sujetUrl: 'https://www.ency-education.com/bac2021.html',
    corrigeUrl: 'https://www.ency-education.com/bac2021.html',
    topicsCount: 2,
    difficulty: 'دقيق'
  },
  {
    year: 2020,
    session: 'الدورة الاستثنائية/العادية',
    stream: 'sciences',
    subject: 'math',
    subjectName: 'الرياضيات',
    sujetUrl: 'https://www.ency-education.com/bac2020.html',
    corrigeUrl: 'https://www.ency-education.com/bac2020.html',
    topicsCount: 2,
    difficulty: 'في المتناول'
  }
];

// Curated Selected Algerian BAC YouTube Channels (Pedagogical focus)
export const TOP_CHANNELS = [
  {
    name: 'الأستاذ نور الدين',
    subject: 'الرياضيات',
    icon: '📐',
    tag: 'شرح وتأسيس شامل من الصفر',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    description: 'شروحات دقيقة من الصفر لكل محاور الرياضيات مع حل جميع البكالوريات السابقة بالتفصيل.',
    youtubeQuery: 'https://www.youtube.com/results?search_query=الأستاذ+نور+الدين+bac'
  },
  {
    name: 'الأستاذ محمد الأمين زدون',
    subject: 'العلوم الفيزيائية',
    icon: '⚡',
    tag: 'تغطية شاملة لجميع الوحدات',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    description: 'تغطية شاملة لبرنامج الفيزياء مع حل سلاسل وتمارين متنوعة وتفسير التجارب خطوة بخطوة.',
    youtubeQuery: 'https://www.youtube.com/results?search_query=محمد+الأمين+زدون+فيزياء'
  },
  {
    name: 'الأستاذة كتفي شريف زينة',
    subject: 'علوم الطبيعة والحياة',
    icon: '🧬',
    tag: 'شرح آليات الظواهر الحيوية ومجلات الهيستونات',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    description: 'شرح آليات تركيب البروتين والنشاط الإنزيمي والمناعة والاتصال العصبي مع مجلات الهيستونات.',
    youtubeQuery: 'https://www.youtube.com/results?search_query=كتفي+شريف+زينة+علوم'
  },
  {
    name: 'الأستاذ عادل مقرود',
    subject: 'الفلسفة',
    icon: '🤔',
    tag: 'فهم المقالات والمنهجيات المعتمدة',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
    description: 'تفكيك الإشكاليات الفلسفية بطريقة مفهومة وشرح منهجيات المقارنة والجدل والاستقصاء بالوضع.',
    youtubeQuery: 'https://www.youtube.com/results?search_query=أستاذ+الفلسفة+عادل+مقرود'
  },
  {
    name: 'الأستاذ بورنان عمار',
    subject: 'التاريخ والجغرافيا',
    icon: '🗺️',
    tag: 'خرائط ذهنية وحفظ سريع',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
    description: 'ربط الأحداث التاريخية والجغرافية بالخرائط الذهنية وتسهيل حفظ التواريخ والمصطلحات والشخصيات.',
    youtubeQuery: 'https://www.youtube.com/results?search_query=الأستاذ+بورنان+تاريخ+وجغرافيا'
  },
  {
    name: 'الأستاذ حيقون أسامة',
    subject: 'اللغة العربية',
    icon: '📖',
    tag: 'البناء الفكري واللغوي والإعراب',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
    description: 'شرح مبسط للبلاغة، القواعد، الإعراب، والتعامل المنهجي مع أسئلة النصوص الشعرية والنثرية.',
    youtubeQuery: 'https://www.youtube.com/results?search_query=حيقون+أسامة+لغة+عربية'
  }
];
