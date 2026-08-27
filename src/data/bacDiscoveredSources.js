/**
 * 🎓 Naja7i (نجاحي) — دليل المصادر والسلاسل والملخصات المعتمدة لبكالوريا الجزائر (3AS) 🇩🇿
 * ==============================================================================
 * مسح وبحث شامل وتصنيف لأفضل مصادر دروس وملخصات وسلاسل تمارين شهادة البكالوريا
 * لجميع الشعب الست:
 * 1. علوم تجريبية (Sciences Expérimentales)
 * 2. رياضيات (Mathématiques)
 * 3. تقني رياضي (Technique Mathématiques: كهربائية، ميكانيكية، مدنية، طرائق)
 * 4. تسيير واقتصاد (Gestion et Économie)
 * 5. آداب وفلسفة (Lettres et Philosophie)
 * 6. لغات أجنبية (Langues Étrangères: فرنسية، إنجليزية، ألمانية، إسبانية، إيطالية)
 *
 * يشمل:
 * - البوابات الرسمية والمستودعات المعتمدة (Ency-Education, DzExams, ONEFD, ONEC)
 * - سلاسل ومجلات وكراسات كبار الأساتذة البارزين في الميدان التربوي الجزائري
 * - مستودعات Google Drive وقنوات Telegram التعليمية المفتوحة
 * - الخرائط الذهنية ومخططات المنهجية الرسمية وفق التدرجات الوزارية
 */

export const SOURCE_CATEGORIES = [
  { id: 'all', name: 'جميع الأنواع', icon: '🌟' },
  { id: 'official_portal', name: 'بوابات ومستودعات رسمية', icon: '🏛️' },
  { id: 'magazines', name: 'مجلات وسلاسل أساتذة شاملة', icon: '📰' },
  { id: 'summary_notes', name: 'ملخصات ومذكرات دروس', icon: '📝' },
  { id: 'exercises_series', name: 'سلاسل تمارين وحوليات محلولة', icon: '✏️' },
  { id: 'mindmaps', name: 'خرائط ذهنية ومخططات ذكية', icon: '🧠' },
  { id: 'exam_proposals', name: 'مواضيع مقترحة وبكالوريات تجريبية', icon: '📑' },
  { id: 'teacher_drives', name: 'مجلدات Google Drive المفتوحة', icon: '☁️' },
  { id: 'telegram_repos', name: 'مستودعات Telegram التعليمية', icon: '✈️' }
];

export const BAC_DISCOVERED_SOURCES = [
  // =========================================================================
  // 1. 🏛️ البوابات والمستودعات التعليمية الرسمية المعتمدة (Official Portals)
  // =========================================================================
  {
    id: 'src_ency_education_portal',
    title: 'الموقع الأول للدراسة في الجزائر (Ency-Education 3AS)',
    author: 'فريق الموسوعة التعليمية الجزائرية',
    subjectId: 'all',
    subjectName: 'جميع المواد',
    streamIds: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues'],
    streamNames: ['علوم تجريبية', 'رياضيات', 'تقني رياضي', 'تسيير واقتصاد', 'آداب وفلسفة', 'لغات أجنبية'],
    contentType: 'official_portal',
    contentTypeName: 'بوابة تعليمية شاملة',
    url: 'https://3as.ency-education.com',
    format: 'Web / PDF',
    isVerified: true,
    rating: 5.0,
    description: 'المرجع الرقمي الأول لتلاميذ السنة الثالثة ثانوي في الجزائر. يضم فهرساً شاملاً للدروس، الملخصات المكتوبة، سلاسل تمارين الدعم لجميع الأساتذة، مطويات كليك (Click)، نماذج الفروض والاختبارات الفصلية لكافة ثانويات الوطن، وحوليات البكالوريا الرسمية من 2008 إلى 2025 مع التصحيحات الوزارية النموذجية وسلالم التنقيط.',
    tags: ['ency education', '3as', 'حوليات', 'فروض واختبارات', 'مطويات كليك', 'جميع الشعب']
  },
  {
    id: 'src_dzexams_portal',
    title: 'بنك الفروض والاختبارات الجزائري (DzExams 3AS)',
    author: 'منصة DzExams التربوية',
    subjectId: 'all',
    subjectName: 'جميع المواد',
    streamIds: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues'],
    streamNames: ['علوم تجريبية', 'رياضيات', 'تقني رياضي', 'تسيير واقتصاد', 'آداب وفلسفة', 'لغات أجنبية'],
    contentType: 'official_portal',
    contentTypeName: 'مستودع اختبارات وتطبيقات',
    url: 'https://www.dzexams.com/ar/3as',
    format: 'Web / PDF',
    isVerified: true,
    rating: 4.9,
    description: 'أضخم قاعدة بيانات جزائرية لفروض واختبارات الفصول الثلاثة ونماذج البكالوريا التجريبية لثانويات النخبة عبر 58 ولاية، مصنفة بدقة حسب الشعبة والمادة والفصل الدراسي مع ملفات التصحيح وسلم التنقيط.',
    tags: ['dzexams', 'اختبارات فصلية', 'بكالوريا تجريبية', 'فروض', 'تصحيحات نموذجية']
  },
  {
    id: 'src_onefd_scolarium',
    title: 'الأرضية التعليمية للديوان الوطني للتعليم والتكوين عن بعد (ONEFD Scolarium 3AS)',
    author: 'وزارة التربية الوطنية - ONEFD',
    subjectId: 'all',
    subjectName: 'جميع المواد',
    streamIds: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues'],
    streamNames: ['علوم تجريبية', 'رياضيات', 'تقني رياضي', 'تسيير واقتصاد', 'آداب وفلسفة', 'لغات أجنبية'],
    contentType: 'official_portal',
    contentTypeName: 'منصة رسمية حكومية',
    url: 'http://scolarium-3as.onefd.edu.dz',
    format: 'Web / Moodle / PDF',
    isVerified: true,
    rating: 4.8,
    description: 'المنصة الرسمية المعتمدة لتقديم المنهاج الجزائري وفروض المراقبة الذاتية وحلولها النموذجية، توفر ملخصات مطابقة تماماً للمنهاج الرسمي التابع للمفتشية العامة للبيداغوجيا.',
    tags: ['onefd', 'ديوان التعليم عن بعد', 'فروض المراقبة الذاتية', 'منهاج رسمي']
  },
  {
    id: 'src_onec_bac_archive',
    title: 'مستودع الديوان الوطني للامتحانات والمسابقات (ONEC Baccalaureate Portal)',
    author: 'الديوان الوطني للامتحانات والمسابقات ONEC',
    subjectId: 'all',
    subjectName: 'جميع المواد',
    streamIds: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues'],
    streamNames: ['علوم تجريبية', 'رياضيات', 'تقني رياضي', 'تسيير واقتصاد', 'آداب وفلسفة', 'لغات أجنبية'],
    contentType: 'official_portal',
    contentTypeName: 'أرشيف امتحانات وطنية',
    url: 'https://bac.onec.dz',
    format: 'Web / PDF',
    isVerified: true,
    rating: 5.0,
    description: 'الموقع الرسمي لإعلان نتائج واستخراج مواضيع وتصحيحات شهادة البكالوريا الصادرة عن لجان الصياغة والتصحيح بوزارة التربية الوطنية الجزائرية.',
    tags: ['onec', 'بكالوريا رسمية', 'تصحيح وزاري', 'ديوان الامتحانات']
  },

  // =========================================================================
  // 2. 🧬 علوم الطبيعة والحياة (Sciences Expérimentales & Math)
  // =========================================================================
  {
    id: 'src_boualriche_series',
    title: 'سلاسل التحدي والمستقبل في العلوم الطبيعية',
    author: 'الأستاذ أحمد بوالريش',
    subjectId: 'sciences_nat',
    subjectName: 'علوم الطبيعة والحياة',
    streamIds: ['sciences', 'math'],
    streamNames: ['علوم تجريبية', 'رياضيات'],
    contentType: 'exercises_series',
    contentTypeName: 'سلسلة تمارين منهجية وحلول',
    url: 'https://3as.ency-education.com/snv-lessons.html',
    format: 'PDF',
    isVerified: true,
    rating: 5.0,
    description: 'السلاسل المرجعية الأقوى في الجزائر لتدريب الطالب على المنهجية الوزارية الجديدة (التمرين الأول: استرجاع وتنظيم المعارف مع نص علمي مهيكل، التمرين الثاني: الاستدلال العلمي، التمرين الثالث: المسعى العلمي التجريبي)، تغطي وحدات: تركيب البروتين، التخصص الوظيفي للبروتينات في التحفيز الإنزيمي، الدفاع عن الذات (المناعة)، الاتصال العصبي، والتحولات الطاقوية.',
    tags: ['بوالريش', 'سلاسل المستقبل', 'استدلال علمي', 'مسعى علمي', 'نص علمي', 'المناعة', 'الإنزيمات']
  },
  {
    id: 'src_kotfi_histones_magazine',
    title: 'مجلة الهيستونات الشاملة في علوم الطبيعة والحياة (سلسلة الأعداد الكاملة)',
    author: 'الأستاذة كتفي شريف زينة',
    subjectId: 'sciences_nat',
    subjectName: 'علوم الطبيعة والحياة',
    streamIds: ['sciences', 'math'],
    streamNames: ['علوم تجريبية', 'رياضيات'],
    contentType: 'magazines',
    contentTypeName: 'مجلة علمية شاملة',
    url: 'https://www.dzexams.com/ar/3as/sciences-naturelles',
    format: 'PDF',
    isVerified: true,
    rating: 5.0,
    description: 'المجلة الأكثر شهرة وطلباً لطلاب شعبة العلوم التجريبية. تحتوي على مراجعات مفصلة لكل وحدة، رسومات تخطيطية عالية الدقة، نصوص علمية نموذجية جاهزة، وباقة من التمارين المركبة ذات الأفكار الجديدة المقتبسة من البكالوريات الأجنبية والتجريبية الراقية مع تصحيح منهجي مدعم بشبكات التقويم والمعايير والمؤشرات.',
    tags: ['الهيستونات', 'كتفي شريف زينة', 'رسومات تخطيطية', 'شبكة تقويم', 'علوم تجريبية']
  },
  {
    id: 'src_chaouch_biomag',
    title: 'المجلة البيولوجية وسلاسل المتميز',
    author: 'الأستاذ محمد شاوش',
    subjectId: 'sciences_nat',
    subjectName: 'علوم الطبيعة والحياة',
    streamIds: ['sciences', 'math'],
    streamNames: ['علوم تجريبية', 'رياضيات'],
    contentType: 'magazines',
    contentTypeName: 'مجلة وتمارين محلولة',
    url: 'https://3as.ency-education.com/snv-lessons.html',
    format: 'PDF',
    isVerified: true,
    rating: 4.9,
    description: 'مجلة علمية متميزة تركز على دقة التحليل والتفسير والاستنتاج، وتفكيك المعطيات التجريبية والمنحنيات البيانية، مدعمة بخرائط ذهنية لوحدات المناعة والاتصال العصبي والجيولوجيا (تكتونية الصفائح).',
    tags: ['شاوش', 'المجلة البيولوجية', 'تحليل منحنيات', 'تكتونية الصفائح', 'جيولوجيا']
  },
  {
    id: 'src_akil_snv_mag',
    title: 'مجلة الأستاذ عقيل في العلوم الطبيعية للبكالوريا',
    author: 'الأستاذ عقيل',
    subjectId: 'sciences_nat',
    subjectName: 'علوم الطبيعة والحياة',
    streamIds: ['sciences'],
    streamNames: ['علوم تجريبية'],
    contentType: 'magazines',
    contentTypeName: 'مجلة مراجعة وتطبيقات',
    url: 'https://www.dzexams.com/ar/3as/sciences-naturelles',
    format: 'PDF',
    isVerified: true,
    rating: 4.8,
    description: 'سلسلة مجلات دورية تقدم ملخصات مركزة وتمارين استدلال علمي محلولة وفق معايير شبكة التقويم الوزارية (الوجاهة، الاستعمال السليم لأدوات المادة، والانسجام).',
    tags: ['عقيل', 'مجلة عقيل', 'شبكة التقويم', 'علوم']
  },
  {
    id: 'src_benkhrif_svt',
    title: 'سلاسل ومطبوعات الأستاذ مصطفى بن خريف',
    author: 'الأستاذ مصطفى بن خريف',
    subjectId: 'sciences_nat',
    subjectName: 'علوم الطبيعة والحياة',
    streamIds: ['sciences', 'math'],
    streamNames: ['علوم تجريبية', 'رياضيات'],
    contentType: 'summary_notes',
    contentTypeName: 'مذكرات وتمارين موجهة',
    url: 'https://3as.ency-education.com/snv-lessons.html',
    format: 'PDF',
    isVerified: true,
    rating: 4.8,
    description: 'مذكرات بيداغوجية موجهة تشتمل على مخططات تحصيلية شاملة لكافة آليات الخلية (النسخ، الترجمة، البنية الفراغية، التثبيط والتنشيط الإنزيمي، الاستجابة الخلطية والخلوية، والمشبك العصبي).',
    tags: ['بن خريف', 'مخططات تحصيلية', 'بنية البروتين', 'المشبك']
  },

  // =========================================================================
  // 3. ⚡ العلوم الفيزيائية (Physique - Chimie)
  // =========================================================================
  {
    id: 'src_guezouri_series_full',
    title: 'كراس وسلاسل الأستاذ قزوري عبد القادر (الموقع الرسمي kzouri.com)',
    author: 'الأستاذ قزوري عبد القادر',
    subjectId: 'physique',
    subjectName: 'العلوم الفيزيائية',
    streamIds: ['sciences', 'math', 'technique_math'],
    streamNames: ['علوم تجريبية', 'رياضيات', 'تقني رياضي'],
    contentType: 'exercises_series',
    contentTypeName: 'سلاسل تمارين نموذجية ومذكرات',
    url: 'https://www.guezouri.org',
    format: 'Web / PDF',
    isVerified: true,
    rating: 5.0,
    description: 'المرجع الأسطوري الأول في مادة الفيزياء لطلاب البكالوريا في الجزائر. يشمل كراس الأستاذ قزوري النظري مع شروحات القوانين والاستنتاجات الرياضية، وسلاسل تمارين ضخمة ومحلولة بالتفصيل لوحدات: المتابعة الزمنية لتحول كيميائي، التحولات النووية، الظواهر الكهربائية (ثنائي القطب RC و RL والدائرة RLC)، تطور جملة كيميائية نحو حالة التوازن (الأحماض والأسس وتفاعل الأسترة)، وتطور جملة ميكانيكية (قوانين نيوتن، حركة الكواكب والأقمار، السقوط الشاقولي، المستوي المائل، وحركة القذائف)، والاهتزازات الميكانيكية.',
    tags: ['قزوري', 'guezouri', 'سلاسل قزوري', 'فيزياء', 'ميكانيك', 'كهرباء', 'نووي', 'أسترة']
  },
  {
    id: 'src_cherifi_physics',
    title: 'سلسلة المتميز في العلوم الفيزيائية',
    author: 'الأستاذ شريفي كمال',
    subjectId: 'physique',
    subjectName: 'العلوم الفيزيائية',
    streamIds: ['sciences', 'math', 'technique_math'],
    streamNames: ['علوم تجريبية', 'رياضيات', 'تقني رياضي'],
    contentType: 'exercises_series',
    contentTypeName: 'سلاسل تمارين شاملة',
    url: 'https://3as.ency-education.com/physics-lessons.html',
    format: 'PDF',
    isVerified: true,
    rating: 4.9,
    description: 'سلاسل تمارين ممتازة تجمع بين الشرح المبسط والتدرج الدقيق في الصعوبة من التمارين التدريبية المباشرة إلى المسائل الفيزيائية المركبة والشاملة الموافقة لنمط مواضيع البكالوريا الرسمية.',
    tags: ['شريفي كمال', 'المتميز في الفيزياء', 'سلاسل شريفي', 'حلول مفصلة']
  },
  {
    id: 'src_tayayba_physics',
    title: 'حقيبة وبكالوريات مقترحة في الفيزياء',
    author: 'الأستاذ طيايبة عمار',
    subjectId: 'physique',
    subjectName: 'العلوم الفيزيائية',
    streamIds: ['sciences', 'math', 'technique_math'],
    streamNames: ['علوم تجريبية', 'رياضيات', 'تقني رياضي'],
    contentType: 'exam_proposals',
    contentTypeName: 'مواضيع مقترحة وسلاسل',
    url: 'https://www.dzexams.com/ar/3as/physique',
    format: 'PDF',
    isVerified: true,
    rating: 4.8,
    description: 'مواضيع مقترحة عالية الجودة مع تصحيحات نموذجية تركز على الأفكار الرياضية والفيزيائية الجديدة والمنحنيات البيانية غير المألوفة (العلاقات الخطية والمعاملات الموجهة).',
    tags: ['طيايبة', 'مقترحات فيزياء', 'منحنيات بيانية', 'أفكار متقدمة']
  },
  {
    id: 'src_moughni_zad_physics',
    title: 'سلسلة المغني وسلسلة الزاد في العلوم الفيزيائية',
    author: 'نخبة من مفتشي وأساتذة التعليم الثانوي',
    subjectId: 'physique',
    subjectName: 'العلوم الفيزيائية',
    streamIds: ['sciences', 'math', 'technique_math'],
    streamNames: ['علوم تجريبية', 'رياضيات', 'تقني رياضي'],
    contentType: 'summary_notes',
    contentTypeName: 'كتب خارجية مرجعية',
    url: 'https://3as.ency-education.com/physics-lessons.html',
    format: 'PDF / Book',
    isVerified: true,
    rating: 4.9,
    description: 'أشهر الكتب الخارجية المعتمدة في الساحة التعليمية الجزائرية؛ تحتوي على ملخصات نظرية دقيقة لكل درس مع استنتاج العلاقات، وبنك ضخم من المسائل المحلولة بالتفصيل.',
    tags: ['المغني في الفيزياء', 'سلسلة الزاد', 'كتب خارجية', 'مراجع البكالوريا']
  },

  // =========================================================================
  // 4. 📐 الرياضيات (Mathematics - Toutes les filières)
  // =========================================================================
  {
    id: 'src_noureddine_math_pack',
    title: 'مكتبة وسلاسل الأستاذ نور الدين الشاملة في الرياضيات',
    author: 'الأستاذ نور الدين',
    subjectId: 'math',
    subjectName: 'الرياضيات',
    streamIds: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues'],
    streamNames: ['علوم تجريبية', 'رياضيات', 'تقني رياضي', 'تسيير واقتصاد', 'آداب وفلسفة', 'لغات أجنبية'],
    contentType: 'exercises_series',
    contentTypeName: 'سلاسل تمارين وحلول وبكالوريات',
    url: 'https://www.youtube.com/user/noureddine2013',
    format: 'PDF / Video Playlists',
    isVerified: true,
    rating: 5.0,
    description: 'الموسوعة الأكبر للرياضيات في الجزائر. تشمل سلاسل مطبوعة وفيديوهات حل مفصل لجميع المحاور: الدوال العددية، الأسية، اللوغاريتمية، التزايد المقارن، نقط الانعطاف، المستقيمات المقاربة، المتتاليات العددية (الحسابية، الهندسية، والتراجعية مع البرهان بالتراجع)، الاحتمالات والمتغيرات العشوائية، الهندسة الفضائية، الأعداد المركبة والتحويلات النقطية، وقسمة إقليدس والموافقات والحساب لشعبتي الرياضيات والتقني رياضي.',
    tags: ['نور الدين', 'سلاسل نور الدين', 'رياضيات', 'دوال', 'متتاليات', 'احتمالات', 'أعداد مركبة', 'موافقات']
  },
  {
    id: 'src_mostefai_raed_math',
    title: 'سلسلة ومجلة الرائد في الرياضيات للبكالوريا',
    author: 'الأستاذ مصطفاي عبد العزيز',
    subjectId: 'math',
    subjectName: 'الرياضيات',
    streamIds: ['sciences', 'math', 'technique_math', 'gestion'],
    streamNames: ['علوم تجريبية', 'رياضيات', 'تقني رياضي', 'تسيير واقتصاد'],
    contentType: 'magazines',
    contentTypeName: 'مجلة تمارين وحلول نموذجية',
    url: 'https://3as.ency-education.com/math-lessons.html',
    format: 'PDF',
    isVerified: true,
    rating: 5.0,
    description: 'سلسلة الرائد للأستاذ مصطفاي عبد العزيز تعد من أنقى وأرقى المطبوعات الجزائرية في مادة الرياضيات. تتميز بحلولها المطبوعة بدقة فائقة وبخط رياضي معياري مطابق لمعايير الوزارة مع تنظيم منهجي من التمرين التدريبي إلى المسألة الشاملة.',
    tags: ['مصطفاي عبد العزيز', 'سلسلة الرائد', 'تمارين نموذجية', 'رياضيات 3AS']
  },
  {
    id: 'src_boucif_math_series',
    title: 'سلاسل التميز والمسائل الشاملة في الرياضيات',
    author: 'الأستاذ بوسيف (Prof Boucif)',
    subjectId: 'math',
    subjectName: 'الرياضيات',
    streamIds: ['sciences', 'math', 'technique_math'],
    streamNames: ['علوم تجريبية', 'رياضيات', 'تقني رياضي'],
    contentType: 'exercises_series',
    contentTypeName: 'سلسلة مسائل التميز المركبة',
    url: 'https://3as.ency-education.com/math-lessons.html',
    format: 'PDF',
    isVerified: true,
    rating: 4.9,
    description: 'سلاسل تركز على المسائل الرياضية التجميعية المعقدة وأفكار الدوال المركبة والمناقشة البيانية (المائلة، الدورانية، والأفقية) الموجهة للطلاب الراغبين في نيل العلامة الكاملة 20/20.',
    tags: ['بوسيف', 'مسائل شاملة', 'مناقشة بيانية', 'العلامة الكاملة']
  },
  {
    id: 'src_guesmi_math',
    title: 'سلاسل مجلة الرياضيات للبكالوريا',
    author: 'الأستاذ قويسم إبراهيم الخليل',
    subjectId: 'math',
    subjectName: 'الرياضيات',
    streamIds: ['sciences', 'math', 'technique_math', 'gestion'],
    streamNames: ['علوم تجريبية', 'رياضيات', 'تقني رياضي', 'تسيير واقتصاد'],
    contentType: 'magazines',
    contentTypeName: 'مجلة وسلاسل تمارين',
    url: 'https://www.dzexams.com/ar/3as/mathematiques',
    format: 'PDF',
    isVerified: true,
    rating: 4.8,
    description: 'مجموعات تمارين منسقة تغطي التدرجات الوزارية الجديدة وتشتمل على ملخصات قوانين وخرائط القواعد الرياضية وتمارين بكالوريات أجنبية وتجريبية محلولة.',
    tags: ['قويسم', 'مجلة الرياضيات', 'ملخص قوانين', 'تمارين تدريبية']
  },

  // =========================================================================
  // 5. 🗺️ التاريخ والجغرافيا (Histoire - Géographie - Toutes les filières)
  // =========================================================================
  {
    id: 'src_mahmoudi_adel_full',
    title: 'كراس التميز والخرائط الذهنية في التاريخ والجغرافيا',
    author: 'الأستاذ محمودي عادل',
    subjectId: 'hisgeo',
    subjectName: 'التاريخ والجغرافيا',
    streamIds: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues'],
    streamNames: ['علوم تجريبية', 'رياضيات', 'تقني رياضي', 'تسيير واقتصاد', 'آداب وفلسفة', 'لغات أجنبية'],
    contentType: 'mindmaps',
    contentTypeName: 'كراس وخرائط ذهنية وملخصات',
    url: 'https://3as.ency-education.com/history-geography-lessons.html',
    format: 'PDF / Mindmaps',
    isVerified: true,
    rating: 5.0,
    description: 'المطبوع الأكثر اعتماداً ونجاحاً في تاريخ البكالوريا الجزائرية. يشتمل على: الخرائط الذهنية الملونة للحفظ الذكي السريع، جداول المقارنة التاريخية (الحرب الباردة، معسكر غربي وشرقي، الأزمات الدولية، الثورة التحريرية ومراحلها وهجومات الشمال القسنطيني ومؤتمر الصومام، استعادة السيادة)، كراس الجغرافيا الشامل (القوى الاقتصادية الكبرى: أمريكا، الاتحاد الأوروبي، شرق وجنوب شرق آسيا، حركة رؤوس الأموال والبترول والقمح، والتنمية في الجنوب: البرازيل والهند)، بالإضافة لملخص الشخصيات والتواريخ والمصطلحات المعتمدة حرفياً في التصحيح الوزاري، ودليل منهجية التعليق على الجداول ورسم الأعمدة والدوائر النسبية وتوقيع الخرائط الصماء.',
    tags: ['محمودي عادل', 'خرائط ذهنية', 'كراس التميز', 'شخصيات وتواريخ', 'حرب باردة', 'ثورة تحريرية', 'جغرافيا']
  },
  {
    id: 'src_bournane_mouyasser',
    title: 'سلسلة الميسر في التاريخ والجغرافيا',
    author: 'الأستاذ بورنان عمار',
    subjectId: 'hisgeo',
    subjectName: 'التاريخ والجغرافيا',
    streamIds: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues'],
    streamNames: ['علوم تجريبية', 'رياضيات', 'تقني رياضي', 'تسيير واقتصاد', 'آداب وفلسفة', 'لغات أجنبية'],
    contentType: 'summary_notes',
    contentTypeName: 'ملخص شامل وجداول حفظ',
    url: 'https://www.dzexams.com/ar/3as/histoire-geographie',
    format: 'PDF',
    isVerified: true,
    rating: 4.9,
    description: 'ملخص مركّز مبني على العناصر النقطية الواضحة التي تسهل الحفظ والتذكر، يتضمن منهجية كتابة المقال التاريخي والجغرافي (مقدمة وطرح إشكالية، العرض في نقاط، وخاتمة كاستنتاج)، مع باقة تواريخ وشخصيات ومصطلحات لا غنى عنها.',
    tags: ['بورنان عمار', 'الميسر', 'مقال تاريخي', 'منهجية المقال', 'تواريخ البكالوريا']
  },

  // =========================================================================
  // 6. 🕌 العلوم الإسلامية (Islamic Sciences - Toutes les filières)
  // =========================================================================
  {
    id: 'src_boukhebla_islamic',
    title: 'كراس التميز في العلوم الإسلامية',
    author: 'الأستاذ عبد العزيز بوخبلة',
    subjectId: 'islamic',
    subjectName: 'العلوم الإسلامية',
    streamIds: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues'],
    streamNames: ['علوم تجريبية', 'رياضيات', 'تقني رياضي', 'تسيير واقتصاد', 'آداب وفلسفة', 'لغات أجنبية'],
    contentType: 'summary_notes',
    contentTypeName: 'كراس دراسي وملخص مفاهيمي',
    url: 'https://3as.ency-education.com/islamic-lessons.html',
    format: 'PDF',
    isVerified: true,
    rating: 5.0,
    description: 'كراس منظم بدقة وفق التدرجات الوزارية الأخيرة. يوضح كيفية استخراج وسائل تثبيت العقيدة، مقاصد الشريعة الإسلامية (ضروريات، حاجيات، تحسينيات وترتيبها)، أحكام الجريمة والعقوبة، المعاملات المالية المعاصرة وقواعد الربا والصرف، فقه الأسرة (الميراث، النسب، التبني والكفالة)، وتحليل الآيات واستخراج الفوائد والأحكام وفق القواعد الأصولية.',
    tags: ['بوخبلة', 'علوم إسلامية', 'مقاصد الشريعة', 'فوائد وأحكام', 'ربا ومعاملات', 'ميراث']
  },
  {
    id: 'src_samir_rabeh_saraj',
    title: 'كراس السراج في العلوم الإسلامية وبنك أسئلة الفهم',
    author: 'الأستاذ سمير رابح',
    subjectId: 'islamic',
    subjectName: 'العلوم الإسلامية',
    streamIds: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues'],
    streamNames: ['علوم تجريبية', 'رياضيات', 'تقني رياضي', 'تسيير واقتصاد', 'آداب وفلسفة', 'لغات أجنبية'],
    contentType: 'summary_notes',
    contentTypeName: 'ملخص وبنك أسئلة فكرية',
    url: 'https://www.dzexams.com/ar/3as/sciences-islamiques',
    format: 'PDF',
    isVerified: true,
    rating: 4.9,
    description: 'ملخص متميز يركز على أسئلة الفهم والربط والاستنباط غير المباشرة التي أصبحت السمة الغالبة على اختبارات العلوم الإسلامية في السنوات الأخيرة، مع جداول تفصيلية لأنصبة الورثة وموانع الإرث.',
    tags: ['سمير رابح', 'السراج', 'أسئلة فهم', 'شريعة إسلامية', 'فقه']
  },
  {
    id: 'src_chamseddine_islamic',
    title: 'المطبوعات الفقهية والتيسير في الشريعة',
    author: 'الشيخ الأستاذ شمس الدين الجزائري',
    subjectId: 'islamic',
    subjectName: 'العلوم الإسلامية',
    streamIds: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues'],
    streamNames: ['علوم تجريبية', 'رياضيات', 'تقني رياضي', 'تسيير واقتصاد', 'آداب وفلسفة', 'لغات أجنبية'],
    contentType: 'summary_notes',
    contentTypeName: 'شروحات مبسطة ومطويات',
    url: 'https://3as.ency-education.com/islamic-lessons.html',
    format: 'PDF',
    isVerified: true,
    rating: 4.8,
    description: 'شروحات وأمثلة واقعية معاصرة تبسط المعاملات المالية، أنواع البيوع الجائزة والمحرمة، ومقاصد الشريعة بأسلوب شيق وواضح.',
    tags: ['شمس الدين', 'شريعة', 'تبسيط الفقه', 'إسلامية']
  },

  // =========================================================================
  // 7. 📖 الفلسفة (Philosophie - Littéraire & Scientifique)
  // =========================================================================
  {
    id: 'src_kenan_laani_philo',
    title: 'مذكرات وموسوعة المقالات الفلسفية والمنهجيات الأربع',
    author: 'الأستاذ كنان العاني',
    subjectId: 'philo',
    subjectName: 'الفلسفة',
    streamIds: ['lettres_philo', 'langues', 'sciences', 'math', 'technique_math', 'gestion'],
    streamNames: ['آداب وفلسفة', 'لغات أجنبية', 'علوم تجريبية', 'رياضيات', 'تقني رياضي', 'تسيير واقتصاد'],
    contentType: 'summary_notes',
    contentTypeName: 'مذكرات منهجية ومقالات فلسفية جاهزة',
    url: 'https://3as.ency-education.com/philosophy-lessons.html',
    format: 'PDF',
    isVerified: true,
    rating: 5.0,
    description: 'المرجع الفلسفي الأشهر في الجزائر. يقدم تفصيلاً دقيقاً للمنهجيات الأربع المعتمدة وزارياً: 1) المقارنة (أوجه الاختلاف، أوجه الاتفاق، ومواطن التداخل)، 2) الجدلية (الموقف الأول وحججه ونقده، الموقف الثاني وحججه ونقده، والتركيب أو التجاوز)، 3) الاستقصاء بالوضع (عرض منطق الأطروحة والدفاع عنها بحجج شخصية ونقد الخصوم)، 4) تحليل النص الفلسفي. يحتوي على مقالات كاملة موسعة لجميع الإشكاليات: الإحساس والإدراك، اللغة والفكر، الشعور واللاشعور، الذاكرة والخيال، العادة والإرادة، الأخلاق بين المطلق والنسبي، الحقوق والواجبات والعدالة، الأنظمة السياسية، الاقتصاد والمجتمع، فلسفة العلوم والرياضيات والبيولوجيا، والعلوم الإنسانية (التاريخ وعلم النفس وعلم الاجتماع).',
    tags: ['كنان العاني', 'فلسفة', 'استقصاء بالوضع', 'طريقة جدلية', 'مقارنة', 'مقالات فلسفية', 'آداب وفلسفة']
  },
  {
    id: 'src_saidani_philo',
    title: 'سلسلة التحدي في الفلسفة ومقالات التميز',
    author: 'الأستاذ خليل سعيداني',
    subjectId: 'philo',
    subjectName: 'الفلسفة',
    streamIds: ['lettres_philo', 'langues', 'sciences', 'math', 'technique_math', 'gestion'],
    streamNames: ['آداب وفلسفة', 'لغات أجنبية', 'علوم تجريبية', 'رياضيات', 'تقني رياضي', 'تسيير واقتصاد'],
    contentType: 'summary_notes',
    contentTypeName: 'مقالات نموذجية ومخططات أفكار',
    url: 'https://www.dzexams.com/ar/3as/philosophie',
    format: 'PDF',
    isVerified: true,
    rating: 4.9,
    description: 'مقالات فلسفية غنية بالحجج الواقعية، الأقوال الفلسفية الموثقة، والأمثلة العلمية والأدبية، مع مخططات سهلة الاستيعاب تساعد التلميذ على التوسع والتعبير الفلسفي السليم والابتعاد عن الحفظ الآلي.',
    tags: ['خليل سعيداني', 'التحدي', 'أقوال فلاسفة', 'حجج وبراهين', 'مقالات جاهزة']
  },
  {
    id: 'src_toumi_philo',
    title: 'الموجه الفلسفي والمقالات المركزة للشعب العلمية واللغات',
    author: 'الأستاذ عبد السلام تومي',
    subjectId: 'philo',
    subjectName: 'الفلسفة',
    streamIds: ['sciences', 'math', 'technique_math', 'gestion', 'langues'],
    streamNames: ['علوم تجريبية', 'رياضيات', 'تقني رياضي', 'تسيير واقتصاد', 'لغات أجنبية'],
    contentType: 'summary_notes',
    contentTypeName: 'مقالات مختصرة ومنهجيات مبسطة',
    url: 'https://3as.ency-education.com/philosophy-lessons.html',
    format: 'PDF',
    isVerified: true,
    rating: 4.8,
    description: 'مذكرات موجهة خصيصاً للشعب العلمية وشعبة اللغات الأجنبية تركز على المقالات المقررة وتفادي الحشو، مع ضمان استيفاء شروط سلم التنقيط (4 نقاط للمقدمة، 12 نقطة للعرض، 4 نقاط للخاتمة).',
    tags: ['تومي', 'فلسفة علميين', 'فلسفة لغات', 'مقال مختصر']
  },

  // =========================================================================
  // 8. ✍️ اللغة العربية وآدابها (Arabe - Toutes les filières)
  // =========================================================================
  {
    id: 'src_berrik_mouine_arabic',
    title: 'سلسلة المعين في الأدب العربي والبلاغة والتقويم النقدي',
    author: 'الأستاذ توفيق بريك',
    subjectId: 'arabic',
    subjectName: 'اللغة العربية وآدابها',
    streamIds: ['lettres_philo', 'langues', 'sciences', 'math', 'technique_math', 'gestion'],
    streamNames: ['آداب وفلسفة', 'لغات أجنبية', 'علوم تجريبية', 'رياضيات', 'تقني رياضي', 'تسيير واقتصاد'],
    contentType: 'summary_notes',
    contentTypeName: 'كتاب شامل وملخصات قواعد وبلاغة',
    url: 'https://3as.ency-education.com/arabic-lessons.html',
    format: 'PDF',
    isVerified: true,
    rating: 5.0,
    description: 'المرجع الأشمل في اللغة العربية للبكالوريا. يغطي: 1) القواعد والإعراب (إعراب إذ، إذا، إذن، حينئذ، لو، لولا، لوما، البدل وعطف البيان، التمييز والحال، جمل لها محل وجمل لا محل لها من الإعراب)، 2) البلاغة (الصور البيانية: التشبيه، الاستعارة التصريحية والمكنية، الكناية، والمجاز المرسل وسر بلاغتها، والمحسنات البديعية اللفظية والمعنوية)، 3) العروض وموسيقى الشعر، 4) دراسة المحاور والمدارس الأدبية والتقويم النقدي (عصر الانحطاط والضعف وشعر المديح والزهد، عصر النهضة وشعر المنفى والمهجر ومدرسة الرابطة القلمية، الشعر الحر وقضية الالتزام، القضية الفلسطينية، والثورة التحريرية الجزائرية، وظاهرة الحزن والألم والرمز والأسطورة، والنثر العلمي والنثر العلمي المتأدب، والمقال وتطوره).',
    tags: ['توفيق بريك', 'المعين في الأدب', 'إعراب إذا وإذ', 'صور بيانية', 'تقويم نقدي', 'شعر الثورة', 'المنفى والمهجر']
  },
  {
    id: 'src_haygoun_saher_arabic',
    title: 'سلسلة الميسر والساحر في الأدب العربي',
    author: 'الأستاذ أسامة حيقون',
    subjectId: 'arabic',
    subjectName: 'اللغة العربية وآدابها',
    streamIds: ['lettres_philo', 'langues', 'sciences', 'math', 'technique_math', 'gestion'],
    streamNames: ['آداب وفلسفة', 'لغات أجنبية', 'علوم تجريبية', 'رياضيات', 'تقني رياضي', 'تسيير واقتصاد'],
    contentType: 'summary_notes',
    contentTypeName: 'مذكرات تدريبية وجداول إعراب',
    url: 'https://www.dzexams.com/ar/3as/arabe',
    format: 'PDF',
    isVerified: true,
    rating: 4.9,
    description: 'أسلوب تبسيطي ممتاز يفكك أسئلة البناء الفكري والبناء اللغوي، مع بنك أسئلة متكررة وإجابات نموذجية وفق المنهجية المتبعة في تصحيح البكالوريا الرسمية.',
    tags: ['أسامة حيقون', 'الساحر في الأدب', 'بناء فكري', 'بناء لغوي', 'جداول إعراب']
  },
  {
    id: 'src_mekki_arabic',
    title: 'سلاسل التمارين التطبيقية وتحليل النصوص الأدبية',
    author: 'الأستاذ مكي',
    subjectId: 'arabic',
    subjectName: 'اللغة العربية وآدابها',
    streamIds: ['lettres_philo', 'langues', 'sciences', 'math', 'technique_math', 'gestion'],
    streamNames: ['آداب وفلسفة', 'لغات أجنبية', 'علوم تجريبية', 'رياضيات', 'تقني رياضي', 'تسيير واقتصاد'],
    contentType: 'exercises_series',
    contentTypeName: 'سلاسل نصوص وتطبيقات محلولة',
    url: 'https://3as.ency-education.com/arabic-lessons.html',
    format: 'PDF',
    isVerified: true,
    rating: 4.8,
    description: 'سلاسل نصوص شعرية ونثرية مقترحة مطابقة لنمط مواضيع شهادة البكالوريا مع أسئلة وإجابات نموذجية مفصلة.',
    tags: ['الأستاذ مكي', 'نصوص شعرية', 'نثر علمي', 'تطبيقات لغة عربية']
  },

  // =========================================================================
  // 9. 📊 شعبة التسيير والاقتصاد (Gestion et Économie)
  // =========================================================================
  {
    id: 'src_amoura_gestion_fin',
    title: 'سلسلة التميز في التسيير المحاسبي والمالي 3AS',
    author: 'الأستاذ عمورة',
    subjectId: 'gestion_fin',
    subjectName: 'التسيير المحاسبي والمالي',
    streamIds: ['gestion'],
    streamNames: ['تسيير واقتصاد'],
    contentType: 'exercises_series',
    contentTypeName: 'سلاسل محاسبة وتمارين شاملة',
    url: 'https://3as.ency-education.com/accounting-lessons.html',
    format: 'PDF',
    isVerified: true,
    rating: 5.0,
    description: 'المرجع الرائد والأول لطلاب شعبة تسيير واقتصاد في الجزائر. يغطي جميع أعمال نهاية السنة: اهتلاك وتدني قيم التثبيتات (الخطي، المتناقص، والمتزايد)، تسوية المخزونات وخسائر القيمة، تسوية الزبائن المشكوك فيهم، تسوية السندات وقيم التوظيف، تسوية حسابات الأعباء والمنتوجات، إعداد جدول حسابات النتائج حسب الطبيعة وحسب الوظيفة، التمويل واختيار المشاريع الاستثمارية، وتحليل الاستغلال التفاضلي والوظائفي، والميزانية الوظيفية ومؤشرات التوازن المالي (FRNG, BFR, TN).',
    tags: ['عمورة', 'محاسبة', 'أعمال نهاية السنة', 'اهتلاكات', 'ميزانية وظيفية', 'حسابات النتائج', 'تسيير واقتصاد']
  },
  {
    id: 'src_elias_gestion',
    title: 'سلسلة المحاسبة المبسطة وبنك تمارين التسويات',
    author: 'الأستاذ إلياس',
    subjectId: 'gestion_fin',
    subjectName: 'التسيير المحاسبي والمالي',
    streamIds: ['gestion'],
    streamNames: ['تسيير واقتصاد'],
    contentType: 'summary_notes',
    contentTypeName: 'ملخصات محاسبية وتمارين تطبيقية',
    url: 'https://www.dzexams.com/ar/3as/gestion-comptable-et-financiere',
    format: 'PDF',
    isVerified: true,
    rating: 4.9,
    description: 'تمارين تطبيقية متدرجة تتيح للطالب التمكن من التسجيل المحاسبي في دفتر اليومية وإعداد الميزانيات الختامية مع تفكيك الفخاخ المحاسبية الأكثر شيوعاً في امتحانات البكالوريا.',
    tags: ['إلياس محاسبة', 'دفتر اليومية', 'تسويات', 'تسيير مالي']
  },
  {
    id: 'src_abdelbasset_compta',
    title: 'حقيبة الأستاذ عبد الباسط للبكالوريا في المحاسبة والاقتصاد',
    author: 'الأستاذ عبد الباسط',
    subjectId: 'gestion_fin',
    subjectName: 'التسيير المحاسبي والمالي',
    streamIds: ['gestion'],
    streamNames: ['تسيير واقتصاد'],
    contentType: 'exam_proposals',
    contentTypeName: 'مواضيع مقترحة وتمارين محلولة',
    url: 'https://3as.ency-education.com/accounting-lessons.html',
    format: 'PDF',
    isVerified: true,
    rating: 4.8,
    description: 'مواضيع بكالوريا تجريبية متميزة لشعبة التسيير والاقتصاد مع حلول مفصلة لجداول الاهتلاك، حسابات النتائج، وحساب التكاليف والتحليل التفاضلي.',
    tags: ['عبد الباسط', 'بكالوريات تجريبية محاسبة', 'تحليل مالي']
  },
  {
    id: 'src_economy_law_mats',
    title: 'موسوعة ملخصات الاقتصاد والمناجمنت والقانون 3AS',
    author: 'نخبة من أساتذة الاقتصاد والقانون الجزائريين',
    subjectId: 'economy',
    subjectName: 'الاقتصاد والمناجمنت والقانون',
    streamIds: ['gestion'],
    streamNames: ['تسيير واقتصاد'],
    contentType: 'summary_notes',
    contentTypeName: 'ملخصات حفظ ذكية ومخططات',
    url: 'https://3as.ency-education.com/law-lessons.html',
    format: 'PDF',
    isVerified: true,
    rating: 4.9,
    description: 'ملخصات شاملة ومحدثة وفق التعديلات القانونية والتشريعية الأخيرة. تشمل: 1) الاقتصاد والمناجمنت (النقود ووظائفها، الكتلة النقدية، السوق والأسعار، النظام المصرفي والبنك المركزي والبنوك التجارية، التجارة الخارجية وميزان المدفوعات، الصرف، التضخم والبطالة)، 2) القانون (عقد العمل الفردي، علاقات العمل الجماعية والنزاعات، الشركات التجارية: شركة التضامن، شركة المساهمة، والشركة ذات المسؤولية المحدودة SARL، عقد البيع، عقد الشركة، والملكية وحقوق الارتفاق).',
    tags: ['اقتصاد ومناجمنت', 'قانون', 'نقود وتضخم', 'عقد العمل', 'شركات تجارية', 'تسيير واقتصاد']
  },

  // =========================================================================
  // 10. ⚙️ شعبة التقني رياضي (Technique Mathématique - 4 Branches)
  // =========================================================================
  {
    id: 'src_genie_electrique_lakhdar',
    title: 'حقيبة الأستاذ لخضر والأستاذ مراد في الهندسة الكهربائية 3AS',
    author: 'الأستاذ لخضر والأستاذ مراد',
    subjectId: 'genie_elec',
    subjectName: 'هندسة كهربائية',
    streamIds: ['technique_math'],
    streamNames: ['تقني رياضي'],
    contentType: 'exercises_series',
    contentTypeName: 'حقيبة تقنية وتمارين محلولة',
    url: 'https://3as.ency-education.com/gelectrique-lessons.html',
    format: 'PDF',
    isVerified: true,
    rating: 5.0,
    description: 'الدليل الأشمل لفرع الهندسة الكهربائية. يغطي: المنطق التعاقبي (القلابات R-S, J-K, D)، العدادات اللاتزامنية والتزامنية، السجلات، المؤقتات المندمجة NE555، مكبرات العمليات وتطبيقاتها، أنظمة التحكم الآلي ودفتر الشروط والغرافست (GRAFCET من المستوى 1 و 2)، المحركات اللاتزامنية ثلاثية الطور، محولات الطاقة، والأنظمة الرقمية ومعالجة الإشارة مع حلول بكالوريات كاملة.',
    tags: ['هندسة كهربائية', 'لخضر', 'مراد', 'غرافست', 'GRAFCET', 'عدادات', 'قلابات', 'NE555', 'محركات']
  },
  {
    id: 'src_genie_mecanique_motamayez',
    title: 'كتاب وسلاسل المتميز في الهندسة الميكانيكية (دراسة الآليات والتحليل الوظيفي)',
    author: 'الأستاذ كروش والأستاذ عودين',
    subjectId: 'genie_meca',
    subjectName: 'هندسة ميكانيكية',
    streamIds: ['technique_math'],
    streamNames: ['تقني رياضي'],
    contentType: 'exercises_series',
    contentTypeName: 'سلسلة دراسة الأنظمة الميكانيكية ورسومات الإنجاز',
    url: 'https://3as.ency-education.com/gmecanique-lessons.html',
    format: 'PDF',
    isVerified: true,
    rating: 5.0,
    description: 'سلاسل تمارين مصورة وعالية الدقة تغطي: دراسة آليات الأنظمة الميكانيكية، التحليل الوظيفي والتنازلي (SADT و FAST)، دراسة الإنشاءات وتعيين الوصلات الميكانيكية الميكانيكية (الاندماجية، المتمفصلة، الانزلاقية)، حسابات المقاومة والمواد (RDM: الشد، الانضغاط، القص، والانحناء المستوي البسيط)، السلاسل البعدية وتعيين التفاوتات، وتصاميم الإنجاز التخطيطية والتعريفية.',
    tags: ['هندسة ميكانيكية', 'المتميز', 'كروش', 'عودين', 'RDM', 'مقاومة المواد', 'وصلات ميكانيكية', 'SADT']
  },
  {
    id: 'src_genie_civil_mouyasser',
    title: 'سلسلة الميسر ومذكرات الأستاذ شيباني وكعوان في الهندسة المدنية',
    author: 'الأستاذ شيباني والأستاذ كعوان',
    subjectId: 'genie_civil',
    subjectName: 'هندسة مدنية',
    streamIds: ['technique_math'],
    streamNames: ['تقني رياضي'],
    contentType: 'exercises_series',
    contentTypeName: 'مذكرات وحسابات المنشآت والخرسانة',
    url: 'https://3as.ency-education.com/gcivil-lessons.html',
    format: 'PDF',
    isVerified: true,
    rating: 5.0,
    description: 'المطبوعات المعتمدة لفرع الهندسة المدنية. تشمل: حساب العوارض المحددة إستاتيكياً، مخططات الجهود القاطعة وعزوم الانحناء (T(x) و M(x))، دراسة المنشآت العلوية والسفلية (الأساسات، الأعمدة، الروافد، والأرضيات)، مبادئ الخرسانة المسلحة وفق قواعد BAEL 91، خواص مواد البناء (الإسمنت، الخرسانة، الفولاذ)، الطبوغرافيا وحساب الارتفاعات والإحداثيات والمسافات.',
    tags: ['هندسة مدنية', 'شيباني', 'كعوان', 'عزوم الانحناء', 'خرسانة مسلحة', 'BAEL', 'طبوغرافيا']
  },
  {
    id: 'src_genie_procedes_mekdad',
    title: 'كراس وسلاسل الأستاذ مقداد وزروقي في هندسة الطرائق',
    author: 'الأستاذ مقداد والأستاذ زروقي',
    subjectId: 'genie_proc',
    subjectName: 'هندسة الطرائق',
    streamIds: ['technique_math'],
    streamNames: ['تقني رياضي'],
    contentType: 'summary_notes',
    contentTypeName: 'مذكرات الكيمياء الصناعية والطرائق',
    url: 'https://3as.ency-education.com/gprocedes-lessons.html',
    format: 'PDF',
    isVerified: true,
    rating: 4.9,
    description: 'مذكرات شاملة ومفصلة لفرع هندسة الطرائق (الكيمياء). تغطي: الكيمياء العضوية وتفاعلات المركبات العضوية (الفحوم الهيدروجينية، الكحولات، الألدهيدات، الكيتونات، الأحماض الكربوكسيلية ومشتقاتها، والبوليميرات والبلمرة)، الديناميكا الحرارية الكيميائية (قانون هس، الإنطالبي، والإنتروبي)، الحركية الكيميائية، وعمليات الفصل والتنقية والتحاليل الصناعية والبيولوجية (السكريات، البروتينات، والليبيدات).',
    tags: ['هندسة الطرائق', 'مقداد', 'زروقي', 'كيمياء عضوية', 'ديناميكا حرارية', 'بلمرة', 'ليبيدات']
  },

  // =========================================================================
  // 11. 🌐 اللغات الأجنبية (Langues Étrangères: Français, Anglais, Espagnol, Allemand, Italien)
  // =========================================================================
  {
    id: 'src_francais_compterendu',
    title: 'دليل اللغة الفرنسية وتقنية التقرير النقدي (Le Compte Rendu Objectif et Critique)',
    author: 'الأستاذ قاطة والأستاذ طارق',
    subjectId: 'french',
    subjectName: 'اللغة الفرنسية',
    streamIds: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues'],
    streamNames: ['علوم تجريبية', 'رياضيات', 'تقني رياضي', 'تسيير واقتصاد', 'آداب وفلسفة', 'لغات أجنبية'],
    contentType: 'summary_notes',
    contentTypeName: 'دليل منهجية وقواعد النصوص',
    url: 'https://3as.ency-education.com/french-lessons.html',
    format: 'PDF',
    isVerified: true,
    rating: 5.0,
    description: 'الدليل المنهجي الأكثر طلباً لضمان أعلى النقاط في الفرنسية. يشرح خطوة بخطوة كيفية صياغة التقرير الموضوعي (Le Compte Rendu Objectif) لجميع الشعب والتقرير النقدي (Le Compte Rendu Critique) لشعبة اللغات والآداب، مع تحليل معمق لأنماط النصوص المقررة: 1) Le texte d\'histoire (نص التاريخ وعلامات الزمن والشواهد وحيادية الكاتب أو انخراطه)، 2) Le texte argumentatif / Le débat d\'idées (النص الحجاجي وجدل الأفكار)، 3) L\'appel / Le texte exhortatif (النص التحريضي والنداء).',
    tags: ['فرنسية', 'compte rendu', 'texte d histoire', 'debat d idees', 'appel', 'قواعد فرنسية']
  },
  {
    id: 'src_nasri_english',
    title: 'حقيبة وسلاسل الأستاذ منير ناصري في اللغة الإنجليزية (Nasri English)',
    author: 'الأستاذ منير ناصري',
    subjectId: 'english',
    subjectName: 'اللغة الإنجليزية',
    streamIds: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues'],
    streamNames: ['علوم تجريبية', 'رياضيات', 'تقني رياضي', 'تسيير واقتصاد', 'آداب وفلسفة', 'لغات أجنبية'],
    contentType: 'summary_notes',
    contentTypeName: 'ملخصات وحدات ووضعيات وقواعد',
    url: 'https://3as.ency-education.com/english-lessons.html',
    format: 'PDF / Video',
    isVerified: true,
    rating: 5.0,
    description: 'الحقيبة التدريبية الأولى للإنجليزية في الجزائر. تغطي ملخصات شاملة للوحدات الدراسية الأربع: Ethics in Business (الأخلاقيات في المعاملات ومحاربة الفساد والرشوة وتبييض الأموال)، Ancient Civilizations (الحضارات القديمة: الفراعنة، السومريون، اليونان، الرومان، وأسباب انهيارها)، Education in the World (أنظمة التعليم في بريطانيا وأمريكا والجزائر والمقارنة بينها)، و Feelings and Emotions (المشاعر والإعلانات والتأثير النفسي). بالإضافة إلى شرح مبسط لجميع قواعد البكالوريا: (Conditional, Passive Voice, Reported Speech, Wish & If Only, Cause & Effect, connectors, suffixes/prefixes) ومنهجية كتابة الفقرات الإدماجية (Written Expression) بنوعيها (Topic 1 Guided & Topic 2 Free).',
    tags: ['منير ناصري', 'nasri english', 'ethics in business', 'ancient civilizations', 'written expression', 'انجليزية']
  },
  {
    id: 'src_espagnol_riad',
    title: 'سلاسل ومذكرات اللغة الإسبانية للبكالوريا (Lengua Española)',
    author: 'الأستاذ سنيور رياض (Señor Riad)',
    subjectId: 'spanish',
    subjectName: 'اللغة الإسبانية',
    streamIds: ['langues'],
    streamNames: ['لغات أجنبية'],
    contentType: 'summary_notes',
    contentTypeName: 'مذكرات وقواعد ونصوص إسبانية',
    url: 'https://3as.ency-education.com/spanish-lessons.html',
    format: 'PDF',
    isVerified: true,
    rating: 4.9,
    description: 'مذكرات متخصصة ومبسطة لطلاب شعبة اللغات الأجنبية (خيار إسباني). تشمل تصريف الأفعال في كافة الأزمنة (Presente, Pretérito Indefinido, Imperfecto, Subjuntivo, Imperativo)، القواعد اللغوية (Ser y Estar, Por y Para, Pronombres)، تحليل نصوص البكالوريا السابقة مع نماذج جاهزة لكتابة الوضعيات الإدماجية (Expresión Escrita).',
    tags: ['إسباني', 'señor riad', 'subjuntivo', 'expresion escrita', 'لغات أجنبية']
  },
  {
    id: 'src_allemand_chlouch',
    title: 'حقيبة الأستاذ شلوش في اللغة الألمانية للبكالوريا (Deutsche Sprache)',
    author: 'الأستاذ شلوش (Herr Chlouch)',
    subjectId: 'german',
    subjectName: 'اللغة الألمانية',
    streamIds: ['langues'],
    streamNames: ['لغات أجنبية'],
    contentType: 'summary_notes',
    contentTypeName: 'مذكرات وقواعد ألمانية',
    url: 'https://3as.ency-education.com/german-lessons.html',
    format: 'PDF',
    isVerified: true,
    rating: 4.9,
    description: 'دليل شامل لطلاب شعبة اللغات الأجنبية (خيار ألماني). يغطي قواعد النحو والصرف الألمانية (Passiv, Konjunktiv II, Nebensätze: weil, dass, obwohl, wenn, Relativsätze, Präpositionen)، مع نماذج نصوص مترجمة وفقرات تعبير كتابي جاهزة ومترجمة بالعربية.',
    tags: ['ألماني', 'herr chlouch', 'passiv', 'konjunktiv', 'لغات أجنبية']
  },
  {
    id: 'src_italien_sabrina',
    title: 'مذكرات اللغة الإيطالية للبكالوريا (Lingua Italiana)',
    author: 'الأستاذة صابرينة (Professoressa Sabrina)',
    subjectId: 'italian',
    subjectName: 'اللغة الإيطالية',
    streamIds: ['langues'],
    streamNames: ['لغات أجنبية'],
    contentType: 'summary_notes',
    contentTypeName: 'مذكرات وقواعد إيطالية',
    url: 'https://3as.ency-education.com/italian-lessons.html',
    format: 'PDF',
    isVerified: true,
    rating: 4.8,
    description: 'مذكرات مخصصة لطلاب شعبة اللغات الأجنبية (خيار إيطالي). تشمل تصاريف الأفعال (Passato Prossimo, Imperfetto, Futuro, Congiuntivo, Condizionale)، القواعد والضمائر، ونماذج فقرات مقترحة مع حلول مواضيع البكالوريا الرسمية السابقة.',
    tags: ['إيطالي', 'italiano', 'congiuntivo', 'passato prossimo', 'لغات أجنبية']
  },

  // =========================================================================
  // 12. ☁️ مستودعات Google Drive المفتوحة والمجانية (Open Google Drives)
  // =========================================================================
  {
    id: 'src_drive_naja7i_mega_library',
    title: 'المستودع السحابي الضخم لمنصة نجاحي (Mega BAC Archive)',
    author: 'مبادرة نجاحي المجتمعية المفتوحة',
    subjectId: 'all',
    subjectName: 'جميع المواد',
    streamIds: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues'],
    streamNames: ['علوم تجريبية', 'رياضيات', 'تقني رياضي', 'تسيير واقتصاد', 'آداب وفلسفة', 'لغات أجنبية'],
    contentType: 'teacher_drives',
    contentTypeName: 'مستودع سحابي مفتوح',
    url: 'https://drive.google.com/drive/folders/1t3HZtqpQA8F5qmI6nhoW35T5EN3h0SxR',
    format: 'Google Drive / PDF / ZIP',
    isVerified: true,
    rating: 5.0,
    description: 'أضخم مجلد سحابي موحد ومفهرس يضم أكثر من 330 ملفاً نادراً ومحفوظاً من سلاسل التمارين والمذكرات والكتب الخارجية والخرائط الذهنية لجميع الشعب دون استثناء مع روابط تحميل ومعاينة سريعة ومجانية مدى الحياة.',
    tags: ['google drive', 'درايف بكالوريا', 'مكتبة نجاحي', 'سحابي', 'تحميل مجاني']
  },
  {
    id: 'src_drive_boualriche_svt_open',
    title: 'المجلد السحابي المفتوح لعلوم الطبيعة والحياة (حقيبة المتفوقين)',
    author: 'ملتقى أساتذة ومتفوقي البكالوريا',
    subjectId: 'sciences_nat',
    subjectName: 'علوم الطبيعة والحياة',
    streamIds: ['sciences', 'math'],
    streamNames: ['علوم تجريبية', 'رياضيات'],
    contentType: 'teacher_drives',
    contentTypeName: 'مجلد Google Drive مفتوح',
    url: 'https://drive.google.com/drive/folders/1t3HZtqpQA8F5qmI6nhoW35T5EN3h0SxR',
    format: 'Google Drive / PDF',
    isVerified: true,
    rating: 4.9,
    description: 'مجلد سحابي يحتوي على جميع أعداد مجلة الهيستونات، سلاسل الأستاذ بوالريش، مجلة المتميز، كراس المنهجية، والمواضيع المقترحة لثانويات الرياضيات بالقبة وثانويات القمة في الجزائر.',
    tags: ['drive svt', 'درايف علوم', 'هيستونات', 'بوالريش سحابي']
  },
  {
    id: 'src_drive_math_physics_archive',
    title: 'المستودع السحابي الشامل للرياضيات والفيزياء 3AS',
    author: 'نخبة أساتذة الرياضيات والفيزياء',
    subjectId: 'physique',
    subjectName: 'الرياضيات والفيزياء',
    streamIds: ['sciences', 'math', 'technique_math'],
    streamNames: ['علوم تجريبية', 'رياضيات', 'تقني رياضي'],
    contentType: 'teacher_drives',
    contentTypeName: 'مجلد Google Drive مفتوح',
    url: 'https://drive.google.com/drive/folders/1t3HZtqpQA8F5qmI6nhoW35T5EN3h0SxR',
    format: 'Google Drive / PDF',
    isVerified: true,
    rating: 4.9,
    description: 'مستودع سحابي يضم كراسات قزوري المحلولة كاملة، سلاسل نور الدين، سلاسل مصطفاي عبد العزيز، سلاسل شريفي، وسلاسل المفتشين الرسمية.',
    tags: ['drive math physique', 'درايف فيزياء ورياضيات', 'قزوري درايف', 'نور الدين درايف']
  },

  // =========================================================================
  // 13. ✈️ مستودعات وقنوات Telegram التعليمية المفتوحة (Telegram Channels)
  // =========================================================================
  {
    id: 'src_tg_bac_dz_official_hub',
    title: 'المستودع التعليمي الجامع لبكالوريا الجزائر (BAC DZ Hub Telegram)',
    author: 'مجمع قنوات البكالوريا الجزائرية المفتوحة',
    subjectId: 'all',
    subjectName: 'جميع المواد',
    streamIds: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues'],
    streamNames: ['علوم تجريبية', 'رياضيات', 'تقني رياضي', 'تسيير واقتصاد', 'آداب وفلسفة', 'لغات أجنبية'],
    contentType: 'telegram_repos',
    contentTypeName: 'قناة ومستودع تيليجرام تفاعلي',
    url: 'https://t.me/doros_bac',
    format: 'Telegram / PDF Files',
    isVerified: true,
    rating: 4.9,
    description: 'قناة ومستودع تيليجرام نشط يوفر تحديثات يومية للمذكرات، البكالوريات التجريبية الحديثة لجميع الولايات، ومقترحات الأساتذة مع ميزة البحث السريع بالهاشتاغات والملفات بصيغة PDF قابلة للتحميل الفوري بدون إعلانات.',
    tags: ['telegram', 'تيليجرام بكالوريا', 'doros_bac', 'مستودع مفتوح', 'ملفات فورية']
  },
  {
    id: 'src_tg_wassim_hisgeo',
    title: 'قناة الأستاذ وسيم في الاجتماعيات والشريعة الإسلامية',
    author: 'الأستاذ وسيم',
    subjectId: 'hisgeo',
    subjectName: 'التاريخ والجغرافيا والعلوم الإسلامية',
    streamIds: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues'],
    streamNames: ['علوم تجريبية', 'رياضيات', 'تقني رياضي', 'تسيير واقتصاد', 'آداب وفلسفة', 'لغات أجنبية'],
    contentType: 'telegram_repos',
    contentTypeName: 'قناة تيليجرام للملخصات والصوتيات',
    url: 'https://t.me/wassimhis',
    format: 'Telegram / PDF / Voice Notes',
    isVerified: true,
    rating: 4.8,
    description: 'قناة متخصصة تقدم ملخصات دورية، تسجيلات صوتية للحفظ والتكرار السريع في التاريخ والجغرافيا والشريعة الإسلامية مع كويزات تدريبية مباشرة على التطبيق.',
    tags: ['تيليجرام وسيم', 'wassimhis', 'تسجيلات صوتية', 'حفظ سريع']
  },
  {
    id: 'src_tg_hamza_gestion',
    title: 'قناة التسيير والمحاسبة للبكالوريا (Hamza Comptabilité Telegram)',
    author: 'الأستاذ حمزة',
    subjectId: 'gestion_fin',
    subjectName: 'التسيير المحاسبي والمالي',
    streamIds: ['gestion'],
    streamNames: ['تسيير واقتصاد'],
    contentType: 'telegram_repos',
    contentTypeName: 'قناة تيليجرام متخصصة في المحاسبة',
    url: 'https://t.me/Hamza_comptabilite',
    format: 'Telegram / PDF / Exercises',
    isVerified: true,
    rating: 4.8,
    description: 'قناة مكرسة لطلاب شعبة تسيير واقتصاد، تنشر تمارين يومية في أعمال نهاية السنة، جداول الاهتلاك، تسويات الحسابات، مع حلول ومناقشات تفاعلية.',
    tags: ['تيليجرام محاسبة', 'Hamza_comptabilite', 'تسيير واقتصاد']
  }
];

// =========================================================================
// 🔍 Helper & Lookup Functions
// =========================================================================

/**
 * Get all discovered resources
 */
export function getAllDiscoveredSources() {
  return BAC_DISCOVERED_SOURCES;
}

/**
 * Filter sources by Stream ID
 */
export function getSourcesByStream(streamId) {
  if (!streamId || streamId === 'all') return BAC_DISCOVERED_SOURCES;
  return BAC_DISCOVERED_SOURCES.filter(s => s.streamIds.includes(streamId) || s.streamIds.includes('all'));
}

/**
 * Filter sources by Subject ID
 */
export function getSourcesBySubject(subjectId) {
  if (!subjectId || subjectId === 'all') return BAC_DISCOVERED_SOURCES;
  return BAC_DISCOVERED_SOURCES.filter(s => s.subjectId === subjectId || s.subjectId === 'all');
}

/**
 * Filter sources by Content Category
 */
export function getSourcesByCategory(categoryId) {
  if (!categoryId || categoryId === 'all') return BAC_DISCOVERED_SOURCES;
  return BAC_DISCOVERED_SOURCES.filter(s => s.contentType === categoryId);
}

/**
 * Search sources by fulltext query
 */
export function searchSources(query) {
  if (!query || typeof query !== 'string') return BAC_DISCOVERED_SOURCES;
  const q = query.trim().toLowerCase();
  return BAC_DISCOVERED_SOURCES.filter(s => {
    return (
      s.title.toLowerCase().includes(q) ||
      s.author.toLowerCase().includes(q) ||
      s.subjectName.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      (s.tags && s.tags.some(t => t.toLowerCase().includes(q))) ||
      s.streamNames.some(sn => sn.toLowerCase().includes(q))
    );
  });
}

/**
 * Get Top Famous Teacher Series
 */
export function getTopTeacherSeries() {
  return BAC_DISCOVERED_SOURCES.filter(s => s.contentType === 'magazines' || s.contentType === 'exercises_series');
}

/**
 * Get Official Educational Portals
 */
export function getOfficialPortals() {
  return BAC_DISCOVERED_SOURCES.filter(s => s.contentType === 'official_portal');
}

/**
 * Get Free Google Drive & Telegram Repositories
 */
export function getFreeCloudAndTelegramRepos() {
  return BAC_DISCOVERED_SOURCES.filter(s => s.contentType === 'teacher_drives' || s.contentType === 'telegram_repos');
}
