// Comprehensive Curated YouTube Teachers & Channels Guide for Algerian BAC (All Streams)
// Pedagogical Style Analysis, Core Methodologies, Key Topics, and Direct YouTube Links.
// Objective, respectful presentation with zero vanity metrics or divisive rankings.

export const YOUTUBE_STREAMS = [
  { id: 'all', name: 'جميع الشعب', icon: '🎓' },
  { id: 'sciences', name: 'علوم تجريبية', icon: '🧬' },
  { id: 'math', name: 'رياضيات', icon: '📐' },
  { id: 'technique', name: 'تقني رياضي', icon: '⚙️' },
  { id: 'gestion', name: 'تسيير واقتصاد', icon: '📊' },
  { id: 'philo', name: 'آداب وفلسفة', icon: '📚' },
  { id: 'langues', name: 'لغات أجنبية', icon: '🌐' },
  { id: 'arts', name: 'فنون', icon: '🎨' }
];

export const YOUTUBE_SUBJECTS = [
  { id: 'all', name: 'جميع المواد' },
  { id: 'math', name: 'الرياضيات' },
  { id: 'sciences_nat', name: 'علوم الطبيعة والحياة' },
  { id: 'physique', name: 'العلوم الفيزيائية' },
  { id: 'hisgeo', name: 'التاريخ والجغرافيا' },
  { id: 'islamic', name: 'العلوم الإسلامية' },
  { id: 'philo', name: 'الفلسفة' },
  { id: 'arabic', name: 'اللغة العربية وآدابها' },
  { id: 'english', name: 'اللغة الإنجليزية' },
  { id: 'french', name: 'اللغة الفرنسية' },
  { id: 'gestion_fin', name: 'التسيير المحاسبي والمالي' },
  { id: 'economy', name: 'الاقتصاد والمناجمنت' },
  { id: 'droit', name: 'القانون' },
  { id: 'genie_elec', name: 'هندسة كهربائية' },
  { id: 'genie_meca', name: 'هندسة ميكانيكية' },
  { id: 'genie_civil', name: 'هندسة مدنية' },
  { id: 'genie_proc', name: 'هندسة الطرائق' },
  { id: 'langues_tierces', name: 'اللغات الثالثة (ألماني/إسباني/إيطالي)' }
];

export const YOUTUBE_TEACHERS = [
  // =========================================================================
  // 1. الرياضيات (Mathematics)
  // =========================================================================
  {
    id: 'noureddine_math',
    name: 'الأستاذ نورالدين',
    subject: 'الرياضيات',
    subjectId: 'math',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '📐',
    styleBadge: 'شرح وتأسيس شامل من الصفر وحل جميع البكالوريات',
    pedagogy: 'المرجع الأكبر والأشمل في الجزائر؛ يشرح الدروس من الصفر المطلق ويبسط المفاهيم الرياضية خطوة بخطوة مع تغطية شاملة ودقيقة لجميع مواضيع البكالوريا الرسمية والتجريبية السابقة.',
    bestFor: 'الدوال العددية، الأسية، اللوغارتمية، المتتاليات، الاحتمالات، الأعداد المركبة، والحساب التكاملي',
    topPlaylists: [
      'المراجعة الشاملة للدوال الأسية واللوغارتمية',
      'حل جميع بكالوريات المتتاليات بالترتيب',
      'سلسلة الاحتمالات والأعداد المركبة من الصفر'
    ],
    url: 'https://www.youtube.com/user/noureddine2013'
  },
  {
    id: 'boucif_math',
    name: 'الأستاذ بوسيف (ProfBoucif)',
    subject: 'الرياضيات',
    subjectId: 'math',
    streams: ['sciences', 'math', 'technique', 'arts'],
    icon: '📐',
    styleBadge: 'تمارين نوعية وأفكار البكالوريا المتقدمة',
    pedagogy: 'يركز على الأفكار الرياضية العميقة والتمارين المركبة التي تستهدف أعلى العلامات، مع تصحيحات نموذجية دقيقة وطرق تفكير منهجية في معالجة المسائل غير المألوفة.',
    bestFor: 'المسائل الرياضية الشاملة، مناقشة حلول الدوال بيانياً وجبرياً، وأفكار البكالوريا المتقدمة',
    topPlaylists: [
      'سلسلة أفكار التميز في الرياضيات للبكالوريا',
      'تصحيحات مواضيع البكالوريا التجريبية النموذجية'
    ],
    url: 'https://www.youtube.com/c/ProfBoucif'
  },
  {
    id: 'djofer_math',
    name: 'الأستاذ عبد الجليل جوفر (Djofer)',
    subject: 'الرياضيات',
    subjectId: 'math',
    streams: ['sciences', 'math', 'technique', 'arts'],
    icon: '📐',
    styleBadge: 'شرح مبسط وتحفيز وتدريب عملي سريع',
    pedagogy: 'أسلوب حماسي يزيل الخوف من مادة الرياضيات، يبسط القوانين المجردة بأمثلة واضحة ويقدم حيل وتقنيات حل سريعة ومختصرة تساعد على رفع المعنويات وتثبيت القواعد.',
    bestFor: 'الفهم السريع للقوانين، إزالة العقد من الدوال والمتتاليات، والمراجعات السريعة المكثفة',
    topPlaylists: [
      'دورة الرياضيات من الصفر',
      'سلسلة المراجعة المركزة قبل الباك'
    ],
    url: 'https://www.youtube.com/@djoferofficiel'
  },
  {
    id: 'infinity_math',
    name: 'قناة Infinity أنفينيتي',
    subject: 'الرياضيات',
    subjectId: 'math',
    streams: ['sciences', 'math', 'technique', 'gestion', 'arts'],
    icon: '📐',
    styleBadge: 'مراجعات منهجية شاملة وتغطية كاملة للمنهاج',
    pedagogy: 'محتوى منظم وشامل يغطي كامل البرنامج الوزاري مع فيديوهات مراجعة مركزة وسلاسل تمارين محلولة بطريقة منهجية هادئة تناسب المراجعة المنتظمة.',
    bestFor: 'المراجعات الدورية للوحدات، تثبيت القوانين، والتدريب على التمارين النمطية',
    topPlaylists: [
      'المراجعة الشاملة لمنهاج الرياضيات للبكالوريا',
      'سلسلة حل التمارين التطبيقية'
    ],
    url: 'https://www.youtube.com/results?search_query=Infinity+أنفينيتي+رياضيات+بكالوريا'
  },
  {
    id: 'abdelbasset_math',
    name: 'الأستاذ عبد الباسط',
    subject: 'الرياضيات',
    subjectId: 'math',
    streams: ['sciences', 'math', 'technique', 'arts'],
    icon: '📐',
    styleBadge: 'تمارين متدرجة للشعب العلمية والتقنية',
    pedagogy: 'طرح منظم يخدم طلبة العلوم التجريبية والرياضيات والتقني رياضي، يركز على التدرج السلس من المستوى الأساسي إلى المسائل الصعبة في سلاسل التمارين.',
    bestFor: 'سلاسل تمارين الدوال والمتتاليات، والهندسة الفضائية',
    topPlaylists: [
      'سلاسل الدوال العددية الشاملة',
      'دورة المتتاليات العددية للشعب العلمية'
    ],
    url: 'https://www.youtube.com/results?search_query=الأستاذ+عبد+الباسط+رياضيات'
  },
  {
    id: 'belfatmi_math',
    name: 'مجموعة بلفاطمي للرياضيات (محمد سفيان)',
    subject: 'الرياضيات',
    subjectId: 'math',
    streams: ['sciences', 'math', 'technique'],
    icon: '📐',
    styleBadge: 'إعداد المواضيع التجريبية ونماذج البكالوريا',
    pedagogy: 'إعداد مواضيع البكالوريا التجريبية المطابقة للنمط الوزاري بدقة، وشرح تفاصيل سلم التنقيط الرياضي وكيفية التعامل مع ورقة الامتحان.',
    bestFor: 'الاختبارات التجريبية، المواضيع المقترحة، والتدريب على النمط الامتحاني الرسمي',
    topPlaylists: [
      'مواضيع بلفاطمي التجريبية المحلولة',
      'سلسلة أفكار الامتحانات'
    ],
    url: 'https://www.youtube.com/results?search_query=مجموعة+بلفاطمي+رياضيات+بكالوريا'
  },
  {
    id: 'terir_math',
    name: 'الأستاذ أحمد ترير',
    subject: 'الرياضيات',
    subjectId: 'math',
    streams: ['sciences', 'math', 'technique'],
    icon: '📐',
    styleBadge: 'شرح أكاديمي رصين وتطبيقات البراهين',
    pedagogy: 'شرح كلاسيكي منظم وواضح يركز على سلامة البرهان الرياضي والدقة الأكاديمية وربط المفاهيم النظرية بالتطبيقات المباشرة.',
    bestFor: 'التأسيس المنطقي للبرهان، الدوال، والنهايات وحساب المشتقات',
    topPlaylists: [
      'دروس الرياضيات الممنهجة للبكالوريا',
      'حلول مواضيع وتمارين البكالوريا'
    ],
    url: 'https://www.youtube.com/results?search_query=الأستاذ+أحمد+ترير+رياضيات'
  },
  {
    id: 'sayari_math',
    name: 'الأستاذ سياري أحمد',
    subject: 'الرياضيات',
    subjectId: 'math',
    streams: ['sciences', 'math', 'technique'],
    icon: '📐',
    styleBadge: 'شروحات تفصيلية وتمارين الكتاب المدرسي',
    pedagogy: 'شرح تفصيلي هادئ يركز على استيعاب أسس الكتاب المدرسي وحل نماذج متنوعة تناسب التأسيس القوي.',
    bestFor: 'التأسيس القاعدي وفهم خواص الدوال والمتتاليات',
    topPlaylists: ['شرح دروس وتمارين الرياضيات للبكالوريا'],
    url: 'https://www.youtube.com/results?search_query=سياري+أحمد+رياضيات+بكالوريا'
  },
  {
    id: 'farhat_math',
    name: 'الأستاذ فرحات جيلالي',
    subject: 'الرياضيات',
    subjectId: 'math',
    streams: ['sciences', 'math', 'technique'],
    icon: '📐',
    styleBadge: 'تفكيك المسائل الرياضية خطوة بخطوة',
    pedagogy: 'تفكيك المسائل الرياضية بطريقة سهلة وتدريب الطالب على الخطوات الصحيحة للوصول إلى النتيجة النهائية دون الوقوع في الأخطاء الحسابية.',
    bestFor: 'التدريب على حل المسائل الكاملة وتفادي أخطاء الإشارات والحساب',
    topPlaylists: ['سلاسل تمارين فرحات جيلالي'],
    url: 'https://www.youtube.com/results?search_query=فرحات+جيلالي+رياضيات+بكالوريا'
  },
  {
    id: 'bourissa_math',
    name: 'الأستاذ بوريسة زكريا',
    subject: 'الرياضيات',
    subjectId: 'math',
    streams: ['sciences', 'math', 'technique'],
    icon: '📐',
    styleBadge: 'تبسيط القوانين وسلاسل التمارين التدريبية',
    pedagogy: 'تقديم ملخصات قوانين مركزة مع حلول تمارين تطبيقية مباشرة للشعب العلمية والتقنية.',
    bestFor: 'المتتاليات العددية، الاحتمالات، والتطبيقات المباشرة',
    topPlaylists: ['سلاسل التمارين والملخصات'],
    url: 'https://www.youtube.com/results?search_query=بوريسة+زكريا+رياضيات+بكالوريا'
  },
  {
    id: 'ferradi_math',
    name: 'الأستاذ فرادي يوسف',
    subject: 'الرياضيات',
    subjectId: 'math',
    streams: ['sciences', 'math', 'technique'],
    icon: '📐',
    styleBadge: 'تطبيقات جبرية وهندسة رياضية',
    pedagogy: 'شرح مبسط للأفكار الجبرية والتحليلية مع حلول نموذجية للمسائل.',
    bestFor: 'الدوال العددية ومسائل البكالوريا',
    topPlaylists: ['سلاسل التمارين للأستاذ فرادي'],
    url: 'https://www.youtube.com/results?search_query=الأستاذ+فرادي+يوسف+رياضيات'
  },
  {
    id: 'soufiane_math_gestion',
    name: 'الأستاذ سفيان (تسيير واقتصاد)',
    subject: 'الرياضيات',
    subjectId: 'math',
    streams: ['gestion'],
    icon: '📐',
    styleBadge: 'مرجع رياضيات شعبة تسيير واقتصاد',
    pedagogy: 'متخصص بالكامل في برنامج رياضيات التسيير والاقتصاد؛ يبسط الإحصاء والدوال والمتتاليات بطريقة مصممة خصيصاً لمعاملات وطبيعة أسئلة الشعبة.',
    bestFor: 'رياضيات التسيير والاقتصاد، الإحصاء، المتتاليات، والتطبيقات الاقتصادية',
    topPlaylists: [
      'شرح رياضيات تسيير واقتصاد من الصفر',
      'حل بكالوريات التسيير'
    ],
    url: 'https://www.youtube.com/results?search_query=الأستاذ+سفيان+رياضيات+تسيير+واقتصاد'
  },

  // =========================================================================
  // 2. علوم الطبيعة والحياة (Natural Sciences)
  // =========================================================================
  {
    id: 'ketfi_cherif_sciences',
    name: 'الأستاذة كتفي شريف زينة',
    subject: 'علوم الطبيعة والحياة',
    subjectId: 'sciences_nat',
    streams: ['sciences', 'math'],
    icon: '🧬',
    styleBadge: 'شرح آليات الظواهر الحيوية ومجلات الهيستونات',
    pedagogy: 'شروحات دقيقة وتفصيلية لآليات تركيب البروتين، النشاط الإنزيمي، المناعة والاتصال العصبي، مع مجلات الهيستونات النموذجية وحلول مفصلة لتمارين الاستدلال.',
    bestFor: 'آليات تركيب البروتين، المناعة، الاتصال العصبي، ومجلات الهيستونات المنهجية',
    topPlaylists: [
      'دورة المناعة الشاملة لطلبة البكالوريا',
      'سلسلة مجلة الهيستونات والمسعى العلمي',
      'حل تمارين تركيب البروتين والإنزيمات'
    ],
    url: 'https://www.youtube.com/c/الأستاذةكتفيشريفزينةلمادةعلوماSource19'
  },
  {
    id: 'chaouch_sciences',
    name: 'الأستاذ شاوش',
    subject: 'علوم الطبيعة والحياة',
    subjectId: 'sciences_nat',
    streams: ['sciences', 'math'],
    icon: '🧬',
    styleBadge: 'منهجية المسعى العلمي والاستدلال البيولوجي',
    pedagogy: 'متخصص في تدريب التلاميذ على شبكة التقويم الرسمية ومنهجية الاستدلال العلمي ضمن مسعى علمي، وتفكيك الوثائق والتجارب المعقدة لاستخراج الاستنتاجات بدقة.',
    bestFor: 'منهجية المسعى العلمي، استغلال الوثائق، وتفكيك أسئلة الاستدلال البيولوجي المركبة',
    topPlaylists: [
      'دورة منهجية الإجابة في علوم الطبيعة والحياة',
      'سلسلة حل تمارين المسعى العلمي'
    ],
    url: 'https://www.youtube.com/channel/UC0BE1aNXDWxcJqIVCBqN3rg'
  },
  {
    id: 'rabia_yacine_sciences',
    name: 'الأستاذ ربيع ياسين',
    subject: 'علوم الطبيعة والحياة',
    subjectId: 'sciences_nat',
    streams: ['sciences', 'math'],
    icon: '🧬',
    styleBadge: 'رسومات تخطيطية وتبسيط بصري دقيق',
    pedagogy: 'يبسط الظواهر البيولوجية المعقدة برسومات تخطيطية واضحة تجعل الطالب يتخيل الآليات الخلوية والجزيئية بسهولة وسلاسة.',
    bestFor: 'الرسومات التخطيطية الوظيفية، الجيولوجيا، التركيب الضوئي، والتنفس والمناعة',
    topPlaylists: [
      'شرح دروس العلوم الطبيعية بالرسومات التوضيحية',
      'حلول مواضيع البكالوريا في العلوم'
    ],
    url: 'https://www.youtube.com/channel/UCcFMNIcwJTOESWsS4_cX13g'
  },
  {
    id: 'mostafa_bdd_sciences',
    name: 'الأستاذ مصطفى بدد (Mostafa Bdd)',
    subject: 'علوم الطبيعة والحياة',
    subjectId: 'sciences_nat',
    streams: ['sciences', 'math'],
    icon: '🧬',
    styleBadge: 'شروحات منهجية وسلاسل تمارين محلولة',
    pedagogy: 'تقديم شروحات واضحة لوحدات المنهاج مع سلاسل تمارين تدمج بين استرجاع المعلومات المنظم واستغلال الوثائق التجريبية.',
    bestFor: 'تمارين الوحدات، سلاسل المراجعة، والتأسيس البيولوجي',
    topPlaylists: ['سلسلة تمارين ومواضيع مصطفى بدد'],
    url: 'https://www.youtube.com/c/MostafaBdd'
  },
  {
    id: 'talhi_sciences',
    name: 'الأستاذ طلحي عبد الرحمان',
    subject: 'علوم الطبيعة والحياة',
    subjectId: 'sciences_nat',
    streams: ['sciences', 'math'],
    icon: '🧬',
    styleBadge: 'تدريب منهجي وفق شبكة التقويم الوزارية',
    pedagogy: 'يركز على صياغة الحل النموذجي وفق معايير المصحح الوزاري، مع تفكيك معايير استرجاع المعلومات والاستدلال العلمي.',
    bestFor: 'معايير التنقيط، استرجاع المعلومات، وتدريبات البكالوريا',
    topPlaylists: ['دورة التمارين والمنهجية لطلحي عبد الرحمان'],
    url: 'https://www.youtube.com/channel/UCssTaejaQZvINAlhnn5rQEw'
  },
  {
    id: 'messaoud_kacem_sciences',
    name: 'الأستاذ مسعود قاسم',
    subject: 'علوم الطبيعة والحياة',
    subjectId: 'sciences_nat',
    streams: ['sciences', 'math'],
    icon: '🧬',
    styleBadge: 'منهجية التحليل والمقارنة والتفسير والوصف العلمي',
    pedagogy: 'محتوى متخصص في صقل مهارات الإجابة الدقيقة: كيفية التحليل الإجرائي، شروط المقارنة العلمية، صياغة الفرضيات، والتفسير السببي المعتمد.',
    bestFor: 'مهارات التحليل والمقارنة والتفسير، وصياغة النصوص العلمية الدقيقة',
    topPlaylists: ['دروس ومنهجية الأستاذ مسعود قاسم'],
    url: 'https://www.youtube.com/user/doros3sn'
  },
  {
    id: 'boumediene_science_bac',
    name: 'الأستاذ بومدين — Science Bac',
    subject: 'علوم الطبيعة والحياة',
    subjectId: 'sciences_nat',
    streams: ['sciences', 'math'],
    icon: '🧬',
    styleBadge: 'شروحات شاملة وسلاسل تمارين تطبيقية',
    pedagogy: 'تغطية مفصلة لوحدات العلوم الطبيعية مع حل سلاسل وتمارين متنوعة تناسب مختلف المستويات.',
    bestFor: 'المناعة، النشاط الإنزيمي، والجيولوجيا',
    topPlaylists: ['سلسلة Science Bac للأستاذ بومدين'],
    url: 'https://www.youtube.com/channel/UCXQtoyoJ2hTkQW7Vd1dBeTw'
  },
  {
    id: 'kalkal_sciences',
    name: 'الأستاذ قلقل — Masinissa School',
    subject: 'علوم الطبيعة والحياة',
    subjectId: 'sciences_nat',
    streams: ['sciences', 'math'],
    icon: '🧬',
    styleBadge: 'دورات وتمارين منهجية شاملة',
    pedagogy: 'شرح آليات العلوم وتدريب مكثف على التعامل مع مواضيع الاختبارات والامتحانات الرسمية.',
    bestFor: 'حل المواضيع الشاملة والمراجعات الدورية',
    topPlaylists: ['دورات العلوم للأستاذ قلقل'],
    url: 'https://www.youtube.com/results?search_query=Masinissa+School+علوم+الأستاذ+قلقل'
  },
  {
    id: 'louzai_clicbac_sciences',
    name: 'الأستاذ لوزاعي — Clicbac',
    subject: 'علوم الطبيعة والحياة',
    subjectId: 'sciences_nat',
    streams: ['sciences', 'math'],
    icon: '🧬',
    styleBadge: 'ملخصات مركزة ومراجعات امتحانية',
    pedagogy: 'تقديم ملخصات مكثفة ومباشرة تسلط الضوء على الأفكار الجوهرية في كل وحدة بيولوجية.',
    bestFor: 'المراجعات السريعة وتثبيت المفاهيم قبل الاختبارات',
    topPlaylists: ['ملخصات ودروس الأستاذ لوزاعي'],
    url: 'https://www.youtube.com/results?search_query=Clicbac+الأستاذ+لوزاعي+علوم'
  },
  {
    id: 'abdelhamid_bac_success',
    name: 'الأستاذ عبد الحميد — BAC Success',
    subject: 'علوم الطبيعة والحياة',
    subjectId: 'sciences_nat',
    streams: ['sciences', 'math'],
    icon: '🧬',
    styleBadge: 'دروس وتطبيقات السنة الثالثة ثانوي',
    pedagogy: 'شروحات مرتبة وفق التدرج السنوي الوزاري مع التركيز على الأمثلة والتطبيقات المباشرة.',
    bestFor: 'الوحدات الأساسية ومتابعة البرنامج السنوي',
    topPlaylists: ['دروس BAC Success للأستاذ عبد الحميد'],
    url: 'https://www.youtube.com/results?search_query=BAC+Success+عبد+الحميد+علوم'
  },
  {
    id: 'benyahia_sciences',
    name: 'الأستاذة بن يحيى — التفوق في العلوم',
    subject: 'علوم الطبيعة والحياة',
    subjectId: 'sciences_nat',
    streams: ['sciences', 'math'],
    icon: '🧬',
    styleBadge: 'نصوص علمية ورسومات ملخصة للحفظ',
    pedagogy: 'مساعدة الطالب على حفظ وصياغة النصوص العلمية الدقيقة والرسومات الحيوية بأقل جهد ممكن.',
    bestFor: 'النصوص العلمية الجاهزة، تلخيص الآليات، والحفظ السريع',
    topPlaylists: ['سلسلة النصوص العلمية والملخصات'],
    url: 'https://www.youtube.com/results?search_query=الأستاذة+بن+يحيى+التفوق+في+العلوم+الطبيعية'
  },
  {
    id: 'boulariche_sciences',
    name: 'الأستاذ بوالريش أحمد',
    subject: 'علوم الطبيعة والحياة',
    subjectId: 'sciences_nat',
    streams: ['sciences', 'math'],
    icon: '🧬',
    styleBadge: 'المؤسس الكلاسيكي للمسعى العلمي وسلاسل التمارين',
    pedagogy: 'صاحب أشهر سلاسل ومطبوعات العلوم في الجزائر؛ مطبوعاته وسلاسله مرجع أساسي وشامل لجميع الوحدات.',
    bestFor: 'سلاسل التمارين الشاملة والمطبوعات المنهجية المعتمدة',
    topPlaylists: ['سلاسل الأستاذ بوالريش أحمد'],
    url: 'https://www.youtube.com/results?search_query=الأستاذ+بوالريش+أحمد+علوم'
  },

  // =========================================================================
  // 3. العلوم الفيزيائية (Physical Sciences)
  // =========================================================================
  {
    id: 'zeddoun_physique',
    name: 'الأستاذ محمد الأمين زدون',
    subject: 'العلوم الفيزيائية',
    subjectId: 'physique',
    streams: ['sciences', 'math', 'technique'],
    icon: '⚡',
    styleBadge: 'تغطية شاملة لجميع الوحدات وسلاسل التمارين',
    pedagogy: 'مكتبة ضخمة تغطي كل صغيرة وكبيرة في البرنامج، حل سلاسل ضخمة من التمارين وتفسير التجارب خطوة بخطوة مع شروحات نظرية وتطبيقية.',
    bestFor: 'المتابعة الزمنية، الكهرباء RC/RL/RLC، الميكانيك وحركة القذائف والأقمار، والنووي',
    topPlaylists: [
      'المراجعة الشاملة للوحدة الأولى (المتابعة الزمنية)',
      'سلسلة الميكانيك الشاملة لجميع الشعب العلمية',
      'حلول مواضيع البكالوريا في الفيزياء'
    ],
    url: 'https://www.youtube.com/results?search_query=محمد+الأمين+زدون+فيزياء'
  },
  {
    id: 'cherifi_rabeh_physique',
    name: 'الأستاذ شريفي رابح',
    subject: 'العلوم الفيزيائية',
    subjectId: 'physique',
    streams: ['sciences', 'math', 'technique'],
    icon: '⚡',
    styleBadge: 'تأسيس فيزيائي عميق وشروحات أصلية للقوانين',
    pedagogy: 'عميد فيزياء البكالوريا في الجزائر؛ يشرح المبادئ والقوانين الفيزيائية بعمق ودقة أكاديمية عالية مع براهين واضحة وحلول رصينة.',
    bestFor: 'التأسيس الفيزيائي القوي، الميكانيك الكلاسيكي، وقوانين نيوتن وحركة الكواكب',
    topPlaylists: [
      'شرح دروس الفيزياء للأستاذ شريفي رابح',
      'سلاسل التمارين النموذجية في الميكانيك'
    ],
    url: 'https://www.youtube.com/channel/UCvFQrnbn0o9Tpj-83fpi2Hg'
  },
  {
    id: 'moulay_omar_physique',
    name: 'الأستاذ مولاي عمر',
    subject: 'العلوم الفيزيائية',
    subjectId: 'physique',
    streams: ['sciences', 'math', 'technique'],
    icon: '⚡',
    styleBadge: 'ترتيب منهجي دقيق للوحدات والتمارين',
    pedagogy: 'محتوى منظم ومرتب بدقة حسب الوحدات والحلول النموذجية المريحة للعين، مما يسهل متابعة المنهاج دون تشتت.',
    bestFor: 'المتابعة الزمنية، التحولات النووية، الظواهر الكهربائية، والأحماض والأسس',
    topPlaylists: [
      'الوحدة 01: المتابعة الزمنية لتحول كيميائي',
      'الوحدة 02: التحولات النووية',
      'الوحدة 03: الظواهر الكهربائية'
    ],
    url: 'https://www.youtube.com/channel/UCh7Gz8vMb4OC5LqX-W7h_yw'
  },
  {
    id: 'benbelkheir_physique',
    name: 'الأستاذ بن بلخير إلياس',
    subject: 'العلوم الفيزيائية',
    subjectId: 'physique',
    streams: ['sciences', 'math', 'technique'],
    icon: '⚡',
    styleBadge: 'تمارين متقدمة في الناقلية، دارات RL/RLC، والميكانيك',
    pedagogy: 'شروحات نوعية تفصل في المنحنيات البيانية المعقدة، حسابات الناقلية النوعية، المعادلات التفاضلية للكهرباء والميكانيك.',
    bestFor: 'الناقلية، دارات RL و RLC، دراسة المنحنيات البيانية، وحساب الثوابت',
    topPlaylists: ['سلسلة الكهرباء والناقلية للأستاذ بن بلخير'],
    url: 'https://www.youtube.com/channel/UC85KuQiQiM7HZgyQXK-NufQ'
  },
  {
    id: 'terir_physique',
    name: 'الأستاذ أحمد ترير',
    subject: 'العلوم الفيزيائية',
    subjectId: 'physique',
    streams: ['sciences', 'math', 'technique'],
    icon: '⚡',
    styleBadge: 'شرح أكاديمي منظم ومراجعات فيزيائية شاملة',
    pedagogy: 'شرح متوازن يجمع بين التأسيس النظري والتطبيق الامتحاني المباشر لمواضيع البكالوريا الرسمية.',
    bestFor: 'المراجعات النهائية وحل التمارين الشاملة',
    topPlaylists: ['سلسلة فيزياء البكالوريا لأحمد ترير'],
    url: 'https://www.youtube.com/results?search_query=الأستاذ+أحمد+ترير+فيزياء'
  },
  {
    id: 'touahria_physique',
    name: 'الأستاذ طواهرية عبد العزيز',
    subject: 'العلوم الفيزيائية',
    subjectId: 'physique',
    streams: ['sciences', 'math', 'technique'],
    icon: '⚡',
    styleBadge: 'أكاديمية الفيزياء وتطبيقات المنهاج الجزائري',
    pedagogy: 'شروحات ودورات فيزيائية شاملة وفق المنهاج الجزائري المعتمد لجميع الشعب العلمية والتقنية.',
    bestFor: 'شرح القوانين والتطبيقات النموذجية',
    topPlaylists: ['دورات أكاديمية الأستاذ طواهرية'],
    url: 'https://www.youtube.com/results?search_query=الأستاذ+طواهرية+عبد+العزيز+فيزياء'
  },
  {
    id: 'tiaybia_physique',
    name: 'الأستاذ طيايبية',
    subject: 'العلوم الفيزيائية',
    subjectId: 'physique',
    streams: ['sciences', 'math', 'technique'],
    icon: '⚡',
    styleBadge: 'تبسيط المفاهيم الفيزيائية وحل التمارين',
    pedagogy: 'شروحات مبسطة للوحدات وحل تمارين نموذجية تناسب مختلف مستويات التلاميذ.',
    bestFor: 'الكهرباء والميكانيك والكيمياء الحركية',
    topPlaylists: ['سلاسل تمارين الأستاذ طيايبية'],
    url: 'https://www.youtube.com/results?search_query=الأستاذ+طيايبية+فيزياء+بكالوريا'
  },
  {
    id: 'boudache_physique',
    name: 'الأستاذ لخضر بوداش',
    subject: 'العلوم الفيزيائية',
    subjectId: 'physique',
    streams: ['sciences', 'math', 'technique'],
    icon: '⚡',
    styleBadge: 'حلول مفصلة لتمارين ومواضيع البكالوريا',
    pedagogy: 'حلول مفصلة لتمارين ومواضيع البكالوريا الرسمية والتجريبية مع التركيز على تفادي الأخطاء الشائعة.',
    bestFor: 'التحولات النووية وحلول البكالوريات السابقة',
    topPlaylists: ['تمارين الأستاذ لخضر بوداش فيزياء'],
    url: 'https://www.youtube.com/results?search_query=الأستاذ+لخضر+بوداش+فيزياء'
  },
  {
    id: 'legraa_lazhar_physique',
    name: 'الأستاذ لقرع لزهر',
    subject: 'العلوم الفيزيائية',
    subjectId: 'physique',
    streams: ['sciences', 'math', 'technique'],
    icon: '⚡',
    styleBadge: 'مواضيع وسلاسل امتحانية مقترحة',
    pedagogy: 'أستاذ معروف بإعداد مواضيع البكالوريا المتقنة وسلاسل التمارين النموذجية لترسيخ الأفكار.',
    bestFor: 'المواضيع المقترحة والتمارين الشاملة',
    topPlaylists: ['تمارين الأستاذ لقرع لزهر'],
    url: 'https://www.youtube.com/results?search_query=الأستاذ+لقرع+لزهر+فيزياء'
  },
  {
    id: 'chealal_physique',
    name: 'الأستاذ سيد أحمد شعلال',
    subject: 'العلوم الفيزيائية',
    subjectId: 'physique',
    streams: ['sciences', 'math', 'technique'],
    icon: '⚡',
    styleBadge: 'سلاسل التمارين المركزة وتفادي فخاخ الامتحانات',
    pedagogy: 'قناة نوعية تركز على الأفكار الامتحانية الدقيقة وتفادي فخاخ التحويلات وحسابات الثوابت.',
    bestFor: 'تمارين البكالوريا المتقدمة والأفكار المبتكرة في الميكانيك والكهرباء',
    topPlaylists: ['سلاسل شعلال في الميكانيك والكهرباء'],
    url: 'https://www.youtube.com/results?search_query=سيد+أحمد+شعلال+فيزياء'
  },

  // =========================================================================
  // 4. التاريخ والجغرافيا (History & Geography)
  // =========================================================================
  {
    id: 'bournan_hisgeo',
    name: 'الأستاذ بورنان عمار',
    subject: 'التاريخ والجغرافيا',
    subjectId: 'hisgeo',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🗺️',
    styleBadge: 'خرائط ذهنية وحفظ سريع وبرنامج كامل',
    pedagogy: 'شرح ممتع يربط الأحداث التاريخية والجغرافية بقصص وخرائط ذهنية، مع تحفيظ التواريخ والمصطلحات والشخصيات في وقت قياسي وبدون نسيان.',
    bestFor: 'الحفظ السريع، التواريخ، الشخصيات، المصطلحات، ورسم الخرائط والمنحنيات البيانية',
    topPlaylists: [
      'سلسلة حفظ تواريخ وشخصيات الحرب الباردة',
      'دورة الجغرافيا الشاملة (القوى الاقتصادية الكبرى)',
      'المراجعة النهائية ليلة امتحان التاريخ والجغرافيا'
    ],
    url: 'https://www.youtube.com/channel/UCeyN7ipOQs6Ld4jEIMFAaKw'
  },
  {
    id: 'abdouche_hisgeo',
    name: 'الأستاذ عبدوش مختار',
    subject: 'التاريخ والجغرافيا',
    subjectId: 'hisgeo',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🗺️',
    styleBadge: 'طرح أكاديمي رصين ومنهجية المقال التاريخي والجغرافي',
    pedagogy: 'يتميز بطرحه الأكاديمي الرصين ومنهجية المقال الجغرافي والتاريخي الدقيقة التي تضمن الإجابة الكاملة دون إطناب أو نقص.',
    bestFor: 'كتابة الوضعية الإدماجية، منهجية التعليق على الجداول والخرائط، وفهم الأحداث التاريخية',
    topPlaylists: [
      'شرح دروس التاريخ والجغرافيا كاملة للأستاذ عبدوش',
      'منهجية كتابة الوضعية الإدماجية والتعليق'
    ],
    url: 'https://www.youtube.com/results?search_query=الأستاذ+عبدوش+مختار+تاريخ+وجغرافيا'
  },
  {
    id: 'khelifi_hisgeo',
    name: 'الأستاذ عبد النور خليفي',
    subject: 'التاريخ والجغرافيا',
    subjectId: 'hisgeo',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🗺️',
    styleBadge: 'منهجية الإجابة وفق سلم التنقيط الوزاري',
    pedagogy: 'معروف بالمنهجية الصارمة وكيفية صياغة إجابة نموذجية مطابقة لمعايير المصحح الوزاري دون إطناب أو نقصان.',
    bestFor: 'المنهجية الدقيقة، حل البكالوريات، وحفظ المصطلحات الأساسية',
    topPlaylists: [
      'سلسلة منهجية الإجابة في الاجتماعيات',
      'حل بكالوريات التاريخ والجغرافيا'
    ],
    url: 'https://www.youtube.com/results?search_query=الأستاذ+عبد+النور+خليفي+تاريخ+وجغرافيا'
  },
  {
    id: 'kenechouba_hisgeo',
    name: 'الأستاذ قنشوبة (Kenechouba Officiel)',
    subject: 'التاريخ والجغرافيا',
    subjectId: 'hisgeo',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🗺️',
    styleBadge: 'مراجعة مكثفة وتقنيات الحفظ الذكي',
    pedagogy: 'أسلوب حركي وممتع يركز على تثبيت الأفكار الرئيسية والمصطلحات والتواريخ عبر الحفظ البصري والسريع.',
    bestFor: 'المراجعات السريعة، حفظ العناصر المهمة، والتذكير السريع قبل الامتحانات',
    topPlaylists: ['سلسلة المراجعة والحفظ مع الأستاذ قنشوبة'],
    url: 'https://www.youtube.com/results?search_query=قنشوبة+Officiel+تاريخ+وجغرافيا'
  },
  {
    id: 'zartal_amine_hisgeo',
    name: 'الأستاذ زرطال أمين',
    subject: 'التاريخ والجغرافيا',
    subjectId: 'hisgeo',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🗺️',
    styleBadge: 'دروس تفصيلية وملخصات مرتبة لجميع الشعب',
    pedagogy: 'يقدم دروساً مفصلة ومرتبة مع مراجعات نهائية وملخصات مريحة للطالب تساعده على الفهم الشامل.',
    bestFor: 'فهم الأحداث، الدروس المفصلة، والمراجعات المنظمة لجميع الشعب',
    topPlaylists: ['دروس ومراجعات الأستاذ زرطال أمين'],
    url: 'https://www.youtube.com/results?search_query=التاريخ+والجغرافيا+مع+الأستاذ+زرطال+أمين'
  },
  {
    id: 'mahmoudi_hisgeo',
    name: 'الأستاذ محمودي عادل',
    subject: 'التاريخ والجغرافيا',
    subjectId: 'hisgeo',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🗺️',
    styleBadge: 'مؤلف المطبوعات المعتمدة والجداول المقارنة',
    pedagogy: 'صاحب المطبوعات والكتب الشهيرة في الاجتماعيات؛ شروحات دقيقة تعتمد على الجداول المقارنة والخرائط التوضيحية.',
    bestFor: 'المصطلحات، الجداول المقارنة، والخرائط',
    topPlaylists: ['سلسلة محمودي عادل في الاجتماعيات'],
    url: 'https://www.youtube.com/results?search_query=محمودي+عادل+تاريخ+وجغرافيا'
  },
  {
    id: 'el_amin_school_hisgeo',
    name: 'قناة El Amin School',
    subject: 'التاريخ والجغرافيا',
    subjectId: 'hisgeo',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🗺️',
    styleBadge: 'شروحات ومراجعات منهجية لبرنامج الاجتماعيات',
    pedagogy: 'شروحات منهجية وتلخيصات مفصلة لدروس التاريخ والجغرافيا لجميع الشعب.',
    bestFor: 'المراجعات الدورية للوحدات وتثبيت المعلومات',
    topPlaylists: ['دروس El Amin School في التاريخ والجغرافيا'],
    url: 'https://www.youtube.com/results?search_query=El+Amin+School+تاريخ+وجغرافيا'
  },
  {
    id: 'laamri_hisgeo',
    name: 'الأستاذ لعمري منير',
    subject: 'التاريخ والجغرافيا',
    subjectId: 'hisgeo',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🗺️',
    styleBadge: 'تبسيط وشرح مفصل لبرنامج الاجتماعيات',
    pedagogy: 'شروحات مفصلة لبرنامج الاجتماعيات بأسلوب ميسر.',
    bestFor: 'شرح الوحدات والمصطلحات',
    topPlaylists: ['دروس الأستاذ لعمري منير'],
    url: 'https://www.youtube.com/results?search_query=الأستاذ+لعمري+منير+تاريخ+وجغرافيا'
  },
  {
    id: 'zorki_hisgeo',
    name: 'الأستاذ زرقي',
    subject: 'التاريخ والجغرافيا',
    subjectId: 'hisgeo',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🗺️',
    styleBadge: 'شروحات ميسرة للمنهاج لجميع الشعب',
    pedagogy: 'تبسيط دروس التاريخ والجغرافيا للشعب الأدبية والعلمية.',
    bestFor: 'الحفظ والدروس الأساسية',
    topPlaylists: ['دروس الأستاذ زرقي'],
    url: 'https://www.youtube.com/results?search_query=الأستاذ+زرقي+تاريخ+وجغرافيا'
  },
  {
    id: 'maroussi_hisgeo',
    name: 'الأستاذ يوسف مروسي',
    subject: 'التاريخ والجغرافيا',
    subjectId: 'hisgeo',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🗺️',
    styleBadge: 'شروحات وتطبيقات عملية على الخرائط',
    pedagogy: 'شروحات لدروس التاريخ والجغرافيا مع تطبيقات عملية على الخرائط والجداول.',
    bestFor: 'مراجعة الوحدات والتدريب على الخرائط',
    topPlaylists: ['دروس يوسف مروسي'],
    url: 'https://www.youtube.com/results?search_query=يوسف+مروسي+تاريخ+وجغرافيا'
  },

  // =========================================================================
  // 5. العلوم الإسلامية (Islamic Studies)
  // =========================================================================
  {
    id: 'kinane_al_ani_islamic',
    name: 'الأستاذ كنان العاني (Kinane AL ANI)',
    subject: 'العلوم الإسلامية',
    subjectId: 'islamic',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🕌',
    styleBadge: 'شرح بالصور والخرائط الذهنية وتثبيت الذاكرة البصرية',
    pedagogy: 'طريقة مبتكرة تعتمد على الخرائط الذهنية والرسومات البصرية لتثبيت عناصر دروس العلوم الإسلامية في الذاكرة طويلة المدى، وتسهيل استيعاب الأحكام والفوائد.',
    bestFor: 'الخرائط الذهنية، حفظ الآيات والأحاديث، استخراج الأحكام والفوائد بسهولة، وأسئلة الفهم',
    topPlaylists: [
      'شرح دروس العلوم الإسلامية بالخرائط الذهنية',
      'سلسلة استخراج الأحكام والفوائد بسهولة',
      'المراجعة الشاملة ليلة الامتحان'
    ],
    url: 'https://www.youtube.com/@kinane.al-ani'
  },
  {
    id: 'dr_saadoune_islamic',
    name: 'الدكتور سعدون شعيب — قناة التجديد',
    subject: 'العلوم الإسلامية',
    subjectId: 'islamic',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🕌',
    styleBadge: 'تأصيل أكاديمي شرعي ومنهجية أسئلة الفهم والاستنباط',
    pedagogy: 'شروحات أكاديمية دقيقة تفصل في مقاصد الشريعة، العقيدة، الربا والميراث، مع إجابات نموذجية تفكك أسئلة الفهم والاستنباط المعتمدة في البكالوريا.',
    bestFor: 'مقاصد الشريعة، الميراث، الربا والمعاملات المالية، وأسئلة الاستنباط والفهم',
    topPlaylists: [
      'شرح برنامج العلوم الإسلامية كاملاً على قناة التجديد',
      'حل بكالوريات العلوم الإسلامية السابقة'
    ],
    url: 'https://www.youtube.com/@Dr_saadoune/videos'
  },
  {
    id: 'boussaadi_islamic',
    name: 'الأستاذة نوال بوسعادي',
    subject: 'العلوم الإسلامية',
    subjectId: 'islamic',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🕌',
    styleBadge: 'تلخيصات مركزة وأسئلة مباشرة للبكالوريا',
    pedagogy: 'أسلوب مريح وسلس ومباشر لتبسيط الدروس وتحديد الأسئلة المتوقعة في كل وحدة مع ملخصات واضحة.',
    bestFor: 'التلخيص السريع وحل الأسئلة المباشرة والمراجعة قبل الامتحان',
    topPlaylists: ['سلسلة دروس العلوم الإسلامية لنوال بوسعادي'],
    url: 'https://www.youtube.com/results?search_query=الأستاذة+نوال+بوسعادي+إسلامية'
  },
  {
    id: 'chamseddine_islamic',
    name: 'الشيخ شمس الدين بوالريش',
    subject: 'العلوم الإسلامية',
    subjectId: 'islamic',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🕌',
    styleBadge: 'أسلوب قصصي جذاب وربط بالواقع المعاصر',
    pedagogy: 'يربط الدروس بالأمثلة المعاصرة والقصص الشرعية لتسهيل استيعاب مقاصد الشريعة والتشريع دون تعقيد.',
    bestFor: 'الفهم العام، الربط العملي، وتثبيت المفاهيم الشرعية',
    topPlaylists: ['سلسلة دروس الشريعة للشيخ شمس الدين'],
    url: 'https://www.youtube.com/results?search_query=الشيخ+شمس+الدين+علوم+إسلامية+بكالوريا'
  },
  {
    id: 'mousli_islamic',
    name: 'الأستاذ عبد الحق موسلي',
    subject: 'العلوم الإسلامية',
    subjectId: 'islamic',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🕌',
    styleBadge: 'تطبيقات وتدريب على استخراج الأحكام والفوائد',
    pedagogy: 'يركز على التدريب المكثف على حل أسئلة البكالوريات السابقة واستخراج الأحكام والفوائد بطريقة منهجية سليمة.',
    bestFor: 'استخراج الأحكام والفوائد وحل المواضيع السابقة',
    topPlaylists: ['مراجعات العلوم الإسلامية لعبد الحق موسلي'],
    url: 'https://www.youtube.com/results?search_query=عبد+الحق+موسلي+علوم+إسلامية'
  },

  // =========================================================================
  // 6. الفلسفة (Philosophy)
  // =========================================================================
  {
    id: 'adel_makroud_philo',
    name: 'الأستاذ عادل مقرود',
    subject: 'الفلسفة',
    subjectId: 'philo',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🤔',
    styleBadge: 'فهم المقالات والمنهجيات المعتمدة لجميع الشعب',
    pedagogy: 'شروحات استثنائية تفكك الإشكاليات الفلسفية بطريقة مفهومة بدون تعقيد، مع تقديم منهجيات المقارنة، الجدل، والاستقصاء بالوضع لجميع الشعب.',
    bestFor: 'المنهجية الفلسفية، المقالات الجدلية، الاستقصاء بالوضع، وتحليل النصوص',
    topPlaylists: [
      'دورة منهجية الاستقصاء بالوضع والجدل',
      'مقالات الفلسفة المقترحة لجميع الشعب',
      'سلسلة تفكيك الإشكاليات الفلسفية'
    ],
    url: 'https://www.youtube.com/results?search_query=أستاذ+الفلسفة+عادل+مقرود'
  },
  {
    id: 'khalil_saidani_philo',
    name: 'الأستاذ خليل سعيداني',
    subject: 'الفلسفة',
    subjectId: 'philo',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🤔',
    styleBadge: 'المقالات الفلسفية ومخططات الأفكار الواضحة',
    pedagogy: 'تبسيط المقالات الفلسفية المعقدة وتحويلها إلى مخططات أفكار واضحة وسهلة الحفظ والاستحضار يوم الامتحان لتحقيق علامات ممتازة.',
    bestFor: 'مقالات شعبة آداب وفلسفة، وشعبة العلوم والتسيير، ومخططات الحجج',
    topPlaylists: [
      'أهم مقالات الفلسفة للشعب العلمية والتسيير',
      'المقالات الكبرى لشعبة آداب وفلسفة'
    ],
    url: 'https://www.youtube.com/results?search_query=خليل+سعيداني+فلسفة'
  },
  {
    id: 'sboussi_toufik_philo',
    name: 'الأستاذ سبوسي توفيق',
    subject: 'الفلسفة',
    subjectId: 'philo',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🤔',
    styleBadge: 'مراجعات ومقترحات منهجية لجميع الشعب',
    pedagogy: 'أستاذ بالتعليم الثانوي يقدم شروحات مباشرة ومنهجية لجميع الشعب مع مراجعات دورية ومقترحات امتحانية دقيقة.',
    bestFor: 'المراجعات الدورية، المقالات المقترحة، ومنهجية كتابة المقال الفلسفي',
    topPlaylists: [
      'دورات ومراجعات الفلسفة للأستاذ سبوسي توفيق',
      'منهجية كتابة المقال الفلسفي'
    ],
    url: 'https://www.youtube.com/results?search_query=أستاذ+فلسفة+سبوسي+توفيق'
  },
  {
    id: 'iskander_lotfi_philo',
    name: 'الأستاذ إسكندر لطفي غربي',
    subject: 'الفلسفة',
    subjectId: 'philo',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🤔',
    styleBadge: 'تفكيك المذاهب الفلسفية وتدعيم الحجج والأقوال',
    pedagogy: 'يقدم حججاً وأقوالاً فلسفية قوية ترفع علامة المقال الفلسفي لدى المصحح الوزاري.',
    bestFor: 'أقوال الفلاسفة، الأمثلة الواقعية، وتدعيم الحجج',
    topPlaylists: ['سلاسل إسكندر لطفي في الفلسفة'],
    url: 'https://www.youtube.com/results?search_query=إسكندر+لطفي+غربي+فلسفة'
  },
  {
    id: 'hamdache_philo',
    name: 'الأستاذ حمداش عبد الحق',
    subject: 'الفلسفة',
    subjectId: 'philo',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🤔',
    styleBadge: 'خطوات المقال الفلسفي والتركيب النموذجي',
    pedagogy: 'تدريب عملي على خطوات كتابة المقدمة، العرض، والتركيب والخاتمة بطريقة معيارية تضمن سلامة البناء الفلسفي.',
    bestFor: 'خطوات المقال، التركيب الفلسفي، وتفادي الخروج عن الموضوع',
    topPlaylists: ['مقالات ودروس حمداش عبد الحق'],
    url: 'https://www.youtube.com/results?search_query=حمداش+عبد+الحق+فلسفة'
  },

  // =========================================================================
  // 7. اللغة الفرنسية (French Language)
  // =========================================================================
  {
    id: 'sally_francais',
    name: 'Sally Français (الأستاذة سالي)',
    subject: 'اللغة الفرنسية',
    subjectId: 'french',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🇫🇷',
    styleBadge: 'منهجية Texte Historique و Argumentatif و Appel و Compte Rendu',
    pedagogy: 'القناة المعتمدة لطلبة البكالوريا؛ تشرح أنواع النصوص مع منهجية كتابة الـ Compte Rendu Objectif et Critique بدقة واحترافية عالية.',
    bestFor: 'منهجية الـ Compte Rendu، أسئلة فهم النص، والقواعد الفرنسية المتكررة في الباك',
    topPlaylists: [
      'منهجية كتابة Le Compte Rendu',
      'دورة Le Texte d\'Histoire',
      'حل مواضيع البكالوريا في الفرنسية'
    ],
    url: 'https://www.youtube.com/results?search_query=Sally+français+bac'
  },
  {
    id: 'mounir_chebboua_french',
    name: 'الأستاذ منير شبوة (Mounir Chebboua)',
    subject: 'اللغة الفرنسية',
    subjectId: 'french',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🇫🇷',
    styleBadge: 'شرح القواعد والدروس والملخصات بأسلوب رصين',
    pedagogy: 'أستاذ لغة فرنسية متمكن يشرح القواعد المعقدة بتبسيط كبير ويساعد الطالب على تفكيك نصوص البكالوريا واستيعاب معانيها.',
    bestFor: 'القواعد، التصريف، ومعاني المفردات الصعبة في النصوص',
    topPlaylists: [
      'سلسلة قواعد اللغة الفرنسية للبكالوريا',
      'ملخصات ومواضيع منير شبوة'
    ],
    url: 'https://www.youtube.com/results?search_query=Mounir+chebboua+منير+شبوة+français'
  },
  {
    id: 'la_tube_french',
    name: 'قناة L.A TUBE Français Pour Tous',
    subject: 'اللغة الفرنسية',
    subjectId: 'french',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🇫🇷',
    styleBadge: 'منهجية وحل مواضيع البكالوريا لجميع الشعب',
    pedagogy: 'تركز على حل مواضيع البكالوريا بالتدريج وتدريب الطالب على استخراج الإجابات من النص بسلاسة.',
    bestFor: 'حل المواضيع والـ Compte Rendu والتدريب الامتحاني',
    topPlaylists: ['سلسلة حل مواضيع البكالوريا L.A Tube'],
    url: 'https://www.youtube.com/results?search_query=L.A+TUBE+FRANCAIS+POUR+TOUS'
  },
  {
    id: 'saidani_nacer_french',
    name: 'الأستاذ ناصر منصوري / سعيداني ناصر',
    subject: 'اللغة الفرنسية',
    subjectId: 'french',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🇫🇷',
    styleBadge: 'شرح الأساسيات والقواعد المشتركة',
    pedagogy: 'شرح مبسط لقواعد اللغة الفرنسية والنصوص المبرمجة مع تسهيل الانتقال بين اللغتين الفرنسية والإنجليزية.',
    bestFor: 'القواعد والأساسيات وفهم النصوص',
    topPlaylists: ['دروس الفرنسية لسعيداني ناصر'],
    url: 'https://www.youtube.com/results?search_query=سعيداني+ناصر+فرنسية+بكالوريا'
  },

  // =========================================================================
  // 8. اللغة الإنجليزية (English Language)
  // =========================================================================
  {
    id: 'nasri_english',
    name: 'الأستاذ ناصري (Nasri English)',
    subject: 'اللغة الإنجليزية',
    subjectId: 'english',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🇬🇧',
    styleBadge: 'شرح شامل لوحدات وقواعد ومنهجية Written Expression',
    pedagogy: 'شرح شامل لجميع وحدات الإنجليزية (Ethics in Business, Astronomy, Safety First, Education, Feel Feelings)، تبسيط القواعد، ومنهجية كتابة الفقرات بطلاقة.',
    bestFor: 'شرح الوحدات، القواعد (Grammar & Phonetics)، ومنهجية كتابة الفقرات (Written Expression)',
    topPlaylists: [
      'المراجعة الشاملة لجميع وحدات الإنجليزية',
      'سلسلة قواعد الإنجليزية من الصفر',
      'منهجية كتابة الفقرة Written Expression'
    ],
    url: 'https://www.youtube.com/results?search_query=Nasri+English+bac'
  },
  {
    id: 'randa_english',
    name: 'الأستاذة رندة (Randa English)',
    subject: 'اللغة الإنجليزية',
    subjectId: 'english',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🇬🇧',
    styleBadge: 'منهجية حل المواضيع وتدريبات البكالوريا المركزة',
    pedagogy: 'قناة متخصصة في حل مواضيع البكالوريا، تدريب على أسئلة النصوص والـ Phonetics وتلخيص قواعد الوحدات بطريقة عملية.',
    bestFor: 'حل المواضيع، منهجية الإجابة، والقواعد الامتحانية المتكررة',
    topPlaylists: [
      'سلسلة حل مواضيع البكالوريا للأستاذة رندة',
      'مراجعات الوحدات وقواعد الإنجليزية'
    ],
    url: 'https://www.youtube.com/results?search_query=Randa+English+bac'
  },
  {
    id: 'english_bilou',
    name: 'قناة English m3a Bilou',
    subject: 'اللغة الإنجليزية',
    subjectId: 'english',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🇬🇧',
    styleBadge: 'شرح مبسط وسلس لقواعد الإنجليزية لجميع الشعب',
    pedagogy: 'أسلوب شبابي ممتع يبسط قواعد الإنجليزية ويساعد الطالب على فهم النصوص والتعبير دون تعقيد.',
    bestFor: 'الشرح المبسط، القواعد الأساسية، والمراجعات السريعة',
    topPlaylists: ['دروس الإنجليزية مع Bilou'],
    url: 'https://www.youtube.com/results?search_query=English+m3a+Bilou'
  },
  {
    id: 'ferni_english',
    name: 'الأستاذ فرني للإنجليزية',
    subject: 'اللغة الإنجليزية',
    subjectId: 'english',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🇬🇧',
    styleBadge: 'منهجية ودروس مفصلة لحل التمارين',
    pedagogy: 'شروحات لقواعد الإنجليزية وحلول نموذجية لمواضيع البكالوريا.',
    bestFor: 'القواعد وحل التمارين التطبيقية',
    topPlaylists: ['دروس الإنجليزية للأستاذ فرني'],
    url: 'https://www.youtube.com/results?search_query=الأستاذ+فرني+إنجليزية+بكالوريا'
  },
  {
    id: 'bacaloge_english',
    name: 'قناة Bacaloge English',
    subject: 'اللغة الإنجليزية',
    subjectId: 'english',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🇬🇧',
    styleBadge: 'مراجعات إضافية وتمارين للبكالوريا',
    pedagogy: 'مراجعات سريعة للمصطلحات والقواعد الأساسية والتدريب على نماذج الامتحانات.',
    bestFor: 'المراجعات السريعة وتثبيت المفردات',
    topPlaylists: ['مراجعات Bacaloge English'],
    url: 'https://www.youtube.com/results?search_query=Bacaloge+English'
  },

  // =========================================================================
  // 9. اللغة العربية وآدابها (Arabic Literature)
  // =========================================================================
  {
    id: 'haigoun_arabic',
    name: 'الأستاذ حيقون أسامة',
    subject: 'اللغة العربية وآدابها',
    subjectId: 'arabic',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '📖',
    styleBadge: 'البناء الفكري واللغوي، التقويم النقدي، والإعراب',
    pedagogy: 'شرح مبسط للبلاغة، القواعد، الإعراب، وكيفية التعامل مع أسئلة النصوص الشعرية والنثرية والتقويم النقدي لجميع الشعب.',
    bestFor: 'البناء الفكري، البناء اللغوي، الصور البيانية، المحسنات، والتقويم النقدي',
    topPlaylists: [
      'سلسلة البناء الفكري واللغوي الشاملة',
      'دورة الإعراب والقواعد من الصفر',
      'حل بكالوريات اللغة العربية لجميع الشعب'
    ],
    url: 'https://www.youtube.com/results?search_query=حيقون+أسامة+لغة+عربية'
  },
  {
    id: 'aboubakr_mabrouk_arabic',
    name: 'الأستاذ أبوبكر مبروك',
    subject: 'اللغة العربية وآدابها',
    subjectId: 'arabic',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '📖',
    styleBadge: 'تفكيك النصوص الشعرية والنثرية والتقويم النقدي',
    pedagogy: 'شروحات عميقة للشعر التعليمي، شعر المهجر، القضية الفلسطينية، والنثر العلمي المتأدب مع منهجية إجابة نموذجية.',
    bestFor: 'شعر المنفى والمهجر، القضية الفلسطينية والجزائرية، والمقال النقدي',
    topPlaylists: [
      'شرح محاور الأدب العربي بالتفصيل',
      'سلاسل التقويم النقدي لطلبة اللغات والآداب'
    ],
    url: 'https://www.youtube.com/results?search_query=أبوبكر+مبروك+لغة+عربية'
  },
  {
    id: 'hammache_arabic',
    name: 'الأستاذ حماش خالد',
    subject: 'اللغة العربية وآدابها',
    subjectId: 'arabic',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '📖',
    styleBadge: 'تلخيص القواعد وإعراب الجمل والصور البيانية',
    pedagogy: 'يركز على النقاط الدقيقة في الإعراب، معاني الحروف، والجمل التي لها والتي ليس لها محل من الإعراب.',
    bestFor: 'إعراب الجمل، الصور البيانية، والتلخيص',
    topPlaylists: ['سلسلة إعراب الجمل والصور البيانية'],
    url: 'https://www.youtube.com/results?search_query=حماش+خالد+لغة+عربية'
  },

  // =========================================================================
  // 10. شعبة تسيير واقتصاد (Gestion et Économie)
  // =========================================================================
  {
    id: 'abbachi_gestion',
    name: 'الأستاذ عباشي (Compta BAC)',
    subject: 'التسيير المحاسبي والمالي',
    subjectId: 'gestion_fin',
    streams: ['gestion'],
    icon: '📊',
    styleBadge: 'شرح أعمال نهاية السنة والميزانيات والقوانين',
    pedagogy: 'شروحات شاملة لأعمال نهاية السنة، إعداد الميزانيات الوظيفية، حسابات النتائج، والقروض واهتلاك التثبيتات مع حلول مواضيع البكالوريا.',
    bestFor: 'أعمال نهاية السنة، التسويات، جدول حسابات النتائج، واختيار المشاريع الاستثمارية',
    topPlaylists: [
      'دورة أعمال نهاية السنة وتسوية التثبيتات',
      'شرح إعداد الميزانية الوظيفية وجدول حسابات النتائج',
      'حل جميع بكالوريات المحاسبة السابقة'
    ],
    url: 'https://www.youtube.com/results?search_query=الأستاذ+عباشي+محاسبة'
  },
  {
    id: 'abdelftah_gestion',
    name: 'الأستاذ عبد الفتاح',
    subject: 'التسيير المحاسبي والمالي',
    subjectId: 'gestion_fin',
    streams: ['gestion'],
    icon: '📊',
    styleBadge: 'تمارين المحاسبة المعمقة وجداول الاستغلال',
    pedagogy: 'شرح تفصيلي للقيود المحاسبية، تسوية المخزونات، وحساب الضرائب والفوائض المالية بطريقة سهلة ومبسطة.',
    bestFor: 'قيود التسوية، خسائر القيمة، وحسابات التكاليف',
    topPlaylists: ['سلاسل المحاسبة والمالية للأستاذ عبد الفتاح'],
    url: 'https://www.youtube.com/results?search_query=الأستاذ+عبد+الفتاح+محاسبة'
  },
  {
    id: 'moussa_gestion',
    name: 'الأستاذ حسين موسى',
    subject: 'التسيير المحاسبي والمالي',
    subjectId: 'gestion_fin',
    streams: ['gestion'],
    icon: '📊',
    styleBadge: 'حلول نموذجية لمواضيع البكالوريا في المحاسبة',
    pedagogy: 'تدريب مباشر على نماذج امتحانات البكالوريا مع كشف الأخطاء الشائعة في التسجيل المحاسبي.',
    bestFor: 'حل مواضيع البكالوريا في المحاسبة والتسويات',
    topPlaylists: ['حلول بكالوريات التسيير المحاسبي'],
    url: 'https://www.youtube.com/results?search_query=حسين+موسى+محاسبة+بكالوريا'
  },

  // =========================================================================
  // 11. الشعب التقنية (Technique Mathématique: Civil, Meca, Elec, Proc)
  // =========================================================================
  {
    id: 'berrik_elec',
    name: 'الأستاذ بريك (هندسة كهربائية)',
    subject: 'هندسة كهربائية',
    subjectId: 'genie_elec',
    streams: ['technique'],
    icon: '⚡',
    styleBadge: 'المنطق التعاقبي والتحكم الآلي والميكروكونترولر',
    pedagogy: 'شرح الأنظمة الآلية (GRAFCET)، السجلات، العدادات، المحولات الكهربائية، والمحركات مع حل مواضيع الباك بالتفصيل.',
    bestFor: 'الغرافست (GRAFCET)، الدارات المندمجة، المحركات، والعدادات',
    topPlaylists: [
      'دورة الغرافست والأنظمة الآلية من الصفر',
      'حل بكالوريات الهندسة الكهربائية'
    ],
    url: 'https://www.youtube.com/results?search_query=الأستاذ+بريك+هندسة+كهربائية'
  },
  {
    id: 'adel_meca',
    name: 'الأستاذ عادل (هندسة ميكانيكية)',
    subject: 'هندسة ميكانيكية',
    subjectId: 'genie_meca',
    streams: ['technique'],
    icon: '⚙️',
    styleBadge: 'الرسم التقني ومقاومة المواد والوصلات الميكانيكية',
    pedagogy: 'شرح الرسوم التجميعية والتعريفية، دراسة الجدوى، حسابات التحمل، والوصلات الحركية مع حلول مواضيع البكالوريا بدقة متناهية.',
    bestFor: 'الرسم التجميعي، مقاومة المواد (RDM)، وحسابات نقل الحركة والمسننات',
    topPlaylists: [
      'شرح الرسوم التجميعية والوصلات الميكانيكية',
      'سلسلة مقاومة المواد RDM للبكالوريا'
    ],
    url: 'https://www.youtube.com/results?search_query=الأستاذ+عادل+هندسة+ميكانيكية'
  },
  {
    id: 'makki_civil',
    name: 'الأستاذ مكي (هندسة مدنية)',
    subject: 'هندسة مدنية',
    subjectId: 'genie_civil',
    streams: ['technique'],
    icon: '🏗️',
    styleBadge: 'الميكانيك التطبيقية وعلم السكون والخرسانة المسلحة',
    pedagogy: 'شرح حساب ردود الأفعال، عزم الانحناء، قوى القص، والخرسانة المسلحة والطرقات مع حلول تمارين الباك.',
    bestFor: 'الأنظمة المثلثية، عزم الانحناء وقوى القص، والخرسانة المسلحة (BAEL)',
    topPlaylists: [
      'دورة الأنظمة المثلثية وحساب ردود الأفعال',
      'شرح الخرسانة المسلحة والميكانيك التطبيقية'
    ],
    url: 'https://www.youtube.com/results?search_query=الأستاذ+مكي+هندسة+مدنية'
  },
  {
    id: 'kamal_proc',
    name: 'الأستاذ كمال (هندسة الطرائق)',
    subject: 'هندسة الطرائق',
    subjectId: 'genie_proc',
    streams: ['technique'],
    icon: '🧪',
    styleBadge: 'الكيمياء العضوية والديناميكا الحرارية وعلم التغذية',
    pedagogy: 'شرح تفاعلات المركبات العضوية، الديناميكا الحرارية، الحركية الكيميائية، والبوليميرات مع حل سلاسل البكالوريا.',
    bestFor: 'الكيمياء العضوية، الثرموديناميك، وعمليات التقطير واستخلاص الزيوت',
    topPlaylists: [
      'شرح الكيمياء العضوية لطلبة هندسة الطرائق',
      'حل بكالوريات هندسة الطرائق'
    ],
    url: 'https://www.youtube.com/results?search_query=الأستاذ+كمال+هندسة+الطرائق'
  },

  // =========================================================================
  // 12. اللغات الأجنبية الثالثة (Third Languages: Spanish, German, Italian)
  // =========================================================================
  {
    id: 'langues_facile',
    name: 'قناة لغات البكالوريا في المتناول (إسباني/ألماني/إيطالي)',
    subject: 'اللغات الثالثة (ألماني/إسباني/إيطالي)',
    subjectId: 'langues_tierces',
    streams: ['langues'],
    icon: '🌐',
    styleBadge: 'شرح قواعد ومفردات اللغة الإسبانية والألمانية والإيطالية',
    pedagogy: 'شروحات مبسطة بالعربية لقواعد الإسبانية والألمانية والإيطالية مع تدريب على أسئلة النصوص والـ Expression Écrite.',
    bestFor: 'قواعد اللغة الإسبانية، الألمانية، الإيطالية، والفقرات المقترحة',
    topPlaylists: [
      'دورة قواعد اللغة الإسبانية للبكالوريا',
      'دورة قواعد اللغة الألمانية للبكالوريا',
      'دورة قواعد اللغة الإيطالية للبكالوريا'
    ],
    url: 'https://www.youtube.com/results?search_query=لغات+البكالوريا+إسباني+ألماني+إيطالي'
  }
];
