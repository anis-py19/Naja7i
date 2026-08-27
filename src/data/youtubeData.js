// Comprehensive Curated YouTube Teachers & Channels Guide for Algerian BAC (All Streams)
// Neutral, Respectful Directory Organized by Pedagogical Style, Specialty, and Verified Channels.

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

export const CORE_SUMMARY_TABLE = [
  { subject: 'الرياضيات 📐', teachers: ['الأستاذ نورالدين', 'الأستاذ بوسيف', 'الأستاذ جوفر', 'قناة Infinity', 'الأستاذ عبد الباسط', 'الأستاذ أحمد ترير'] },
  { subject: 'علوم الطبيعة والحياة 🧬', teachers: ['الأستاذة كتفي شريف زينة', 'الأستاذ شاوش', 'الأستاذ ربيع ياسين', 'الأستاذ مصطفى بدد', 'الأستاذ طلحي عبد الرحمان', 'الأستاذ بوالريش'] },
  { subject: 'العلوم الفيزيائية ⚡', teachers: ['الأستاذ محمد الأمين زدون', 'الأستاذ شريفي رابح', 'الأستاذ مولاي عمر', 'الأستاذ بن بلخير إلياس', 'الأستاذ أحمد ترير', 'سيد أحمد شعلال'] },
  { subject: 'التاريخ والجغرافيا 🌍', teachers: ['الأستاذ بورنان عمار', 'الأستاذ عبدوش مختار', 'الأستاذ عبد النور خليفي', 'الأستاذ قنشوبة', 'الأستاذ زرطال أمين', 'الأستاذ محمودي عادل'] },
  { subject: 'العلوم الإسلامية 🕌', teachers: ['الأستاذ كنان العاني', 'الدكتور سعدون شعيب', 'الأستاذة نوال بوسعادي', 'الشيخ شمس الدين', 'الأستاذ عبد الحق موسلي'] },
  { subject: 'الفلسفة 🧠', teachers: ['الأستاذ عادل مقرود', 'الأستاذ خليل سعيداني', 'الأستاذ سبوسي توفيق', 'الأستاذ إسكندر لطفي', 'الأستاذ حمداش عبد الحق'] },
  { subject: 'اللغة الإنجليزية 🇬🇧', teachers: ['الأستاذ ناصري (Nasri)', 'الأستاذة رندة (Randa)', 'English m3a Bilou', 'الأستاذ فرني', 'Bacaloge English'] },
  { subject: 'اللغة الفرنسية 🇫🇷', teachers: ['الأستاذة سالي (Sally Français)', 'الأستاذ منير شبوة', 'L.A Tube Français', 'سعيداني ناصر'] },
  { subject: 'اللغة العربية 📖', teachers: ['الأستاذ حيقون أسامة', 'الأستاذ أبوبكر مبروك', 'الأستاذ حماش خالد'] },
  { subject: 'شعبة تسيير واقتصاد 📊', teachers: ['الأستاذ عباشي', 'الأستاذ عبد الفتاح', 'الأستاذ حسين موسى', 'الأستاذ سفيان'] },
  { subject: 'شعبة تقني رياضي ⚙️', teachers: ['الأستاذ بريك (كهرباء)', 'الأستاذ عادل (ميكانيك)', 'الأستاذ مكي (مدنية)', 'الأستاذ كمال (طرائق)'] },
  { subject: 'اللغات الأجنبية الثالثة 🌐', teachers: ['قناة لغات البكالوريا في المتناول (إسباني/ألماني/إيطالي)'] }
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
    specialtyTag: 'شرح وتأسيس وحل جميع البكالوريات',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '📐',
    pedagogy: 'يشرح من الصفر إلى أصعب المسائل المعقدة والأولمبياد مع تغطية شاملة لكل مواضيع البكالوريا الرسمية والتجريبية.',
    bestFor: 'الدوال العددية، المتتاليات، الاحتمالات، الأعداد المركبة، والتكامل',
    topPlaylists: [
      'المراجعة الشاملة للدوال الأسية واللوغارتمية',
      'حل جميع بكالوريات المتتاليات بالترتيب',
      'سلسلة 100 تمرين مقترح في الاحتمالات والأعداد المركبة'
    ],
    url: 'https://www.youtube.com/user/noureddine2013'
  },
  {
    id: 'boucif_math',
    name: 'الأستاذ بوسيف (ProfBoucif)',
    subject: 'الرياضيات',
    subjectId: 'math',
    specialtyTag: 'تمارين وأفكار الباك العميقة',
    streams: ['sciences', 'math', 'technique', 'arts'],
    icon: '📐',
    pedagogy: 'شروحات دقيقة، تمارين متدرجة، حلول مواضيع البكالوريا وتصحيحات نموذجية تركز على أفكار التفوق والمنهجية.',
    bestFor: 'أفكار الدوال الصعبة، المتتاليات المركبة، وحل التمارين الشاملة',
    topPlaylists: [
      'سلسلة أفكار البكالوريا في الرياضيات',
      'مواضيع مقترحة محلولة بالتفصيل'
    ],
    url: 'https://www.youtube.com/c/ProfBoucif'
  },
  {
    id: 'djofer_math',
    name: 'الأستاذ عبد الجليل جوفر (Djofer)',
    subject: 'الرياضيات',
    subjectId: 'math',
    specialtyTag: 'شرح مبسط وتدريب حماسي',
    streams: ['sciences', 'math', 'technique', 'arts'],
    icon: '📐',
    pedagogy: 'أسلوب حيوي وحماسي يسهل أصعب القوانين الرياضية مع تقديم طرق سريعة ومختصرة للحل ورفع المعنويات.',
    bestFor: 'الفهم السريع للقواعد، الدوال، المتتاليات، والمراجعة المركزة',
    topPlaylists: [
      'دورة الرياضيات من الصفر',
      'المراجعات النهائية وليالي الامتحان'
    ],
    url: 'https://www.youtube.com/@djoferofficiel'
  },
  {
    id: 'infinity_math',
    name: 'قناة Infinity أنفينيتي',
    subject: 'الرياضيات',
    subjectId: 'math',
    specialtyTag: 'مراجعات شاملة وتغطية متكاملة',
    streams: ['sciences', 'math', 'technique', 'gestion', 'arts'],
    icon: '📐',
    pedagogy: 'قناة متخصصة في الرياضيات للبكالوريا؛ تقدم مراجعات شاملة للمنهاج وسلاسل تمارين محلولة بدقة.',
    bestFor: 'المراجعات السريعة، القوانين المركزة، والتدريب على الامتحانات',
    topPlaylists: [
      'المراجعة الشاملة لبرنامج الرياضيات للبكالوريا',
      'سلسلة حل التمارين الامتحانية'
    ],
    url: 'https://www.youtube.com/results?search_query=Infinity+أنفينيتي+رياضيات+بكالوريا'
  },
  {
    id: 'abdelbasset_math',
    name: 'الأستاذ عبد الباسط',
    subject: 'الرياضيات',
    subjectId: 'math',
    specialtyTag: 'سلاسل تمارين متدرجة للشعب العلمية',
    streams: ['sciences', 'math', 'technique', 'arts'],
    icon: '📐',
    pedagogy: 'موجه للشعب العلمية والرياضيات والتقني رياضي، يتميز بحل التمارين المتدرجة بطرق منهجية وسريعة.',
    bestFor: 'تمارين الدوال، المتتاليات، والهندسة الفضائية',
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
    specialtyTag: 'مواضيع واختبارات تجريبية مطابقة',
    streams: ['sciences', 'math', 'technique'],
    icon: '📐',
    pedagogy: 'إعداد نماذج ومواضيع بكالوريا دقيقة مطابقة لتعليمات الوزارة مع تصحيحات نموذجية.',
    bestFor: 'المواضيع المقترحة والاختبارات التجريبية',
    topPlaylists: ['سلسلة مواضيع بلفاطمي التجريبية'],
    url: 'https://www.youtube.com/results?search_query=مجموعة+بلفاطمي+رياضيات+بكالوريا'
  },
  {
    id: 'terir_math',
    name: 'الأستاذ أحمد ترير',
    subject: 'الرياضيات',
    subjectId: 'math',
    specialtyTag: 'شرح أكاديمي منظم ومريح',
    streams: ['sciences', 'math', 'technique'],
    icon: '📐',
    pedagogy: 'شرح منظم ومريح للعين مع التركيز على البراهين والتطبيقات المباشرة لأفكار البكالوريا.',
    bestFor: 'المراجعة النهائية وحل نماذج الامتحانات الرسمية',
    topPlaylists: ['سلسلة المراجعة المركزة للبكالوريا'],
    url: 'https://www.youtube.com/results?search_query=الأستاذ+أحمد+ترير+رياضيات'
  },
  {
    id: 'sayari_math',
    name: 'الأستاذ سياري أحمد',
    subject: 'الرياضيات',
    subjectId: 'math',
    specialtyTag: 'دروس وتمارين تفصيلية',
    streams: ['sciences', 'math', 'technique'],
    icon: '📐',
    pedagogy: 'شرح مفصل لدروس الرياضيات مع حلول تمارين الكتاب المدرسي والبكالوريا.',
    bestFor: 'الدوال والمتتاليات',
    topPlaylists: ['دروس وتمارين الرياضيات للبكالوريا'],
    url: 'https://www.youtube.com/results?search_query=سياري+أحمد+رياضيات+بكالوريا'
  },
  {
    id: 'farhat_math',
    name: 'الأستاذ فرحات جيلالي',
    subject: 'الرياضيات',
    subjectId: 'math',
    specialtyTag: 'حلول وتمارين موجهة',
    streams: ['sciences', 'math', 'technique'],
    icon: '📐',
    pedagogy: 'شروحات مبسطة لحل مسائل البكالوريا خطوة بخطوة.',
    bestFor: 'التمارين التدريبية',
    topPlaylists: ['سلاسل تمارين فرحات جيلالي'],
    url: 'https://www.youtube.com/results?search_query=فرحات+جيلالي+رياضيات+بكالوريا'
  },
  {
    id: 'bourissa_math',
    name: 'الأستاذ بوريسة زكريا',
    subject: 'الرياضيات',
    subjectId: 'math',
    specialtyTag: 'شرح مبسط للوحدات',
    streams: ['sciences', 'math', 'technique'],
    icon: '📐',
    pedagogy: 'تبسيط المفاهيم الرياضية للشعب العلمية والتقنية.',
    bestFor: 'المتتاليات والاحتمالات',
    topPlaylists: ['سلاسل تمارين بوريسة زكريا'],
    url: 'https://www.youtube.com/results?search_query=بوريسة+زكريا+رياضيات+بكالوريا'
  },
  {
    id: 'ferradi_math',
    name: 'الأستاذ فرادي يوسف',
    subject: 'الرياضيات',
    subjectId: 'math',
    specialtyTag: 'تمارين وتطبيقات نموذجية',
    streams: ['sciences', 'math', 'technique'],
    icon: '📐',
    pedagogy: 'شروحات للمسائل الرياضية وحلول نموذجية.',
    bestFor: 'الدوال والجبر',
    topPlaylists: ['سلسلة تمارين فرادي يوسف'],
    url: 'https://www.youtube.com/results?search_query=الأستاذ+فرادي+يوسف+رياضيات'
  },
  {
    id: 'soufiane_math_gestion',
    name: 'الأستاذ سفيان (تسيير واقتصاد)',
    subject: 'الرياضيات',
    subjectId: 'math',
    specialtyTag: 'رياضيات شعبة تسيير واقتصاد',
    streams: ['gestion'],
    icon: '📐',
    pedagogy: 'تبسيط شامل لبرنامج الرياضيات الخاص بشعبة التسيير والاقتصاد وتدريب على الأسئلة المتكررة في الباك.',
    bestFor: 'الدوال والمتتاليات والإحصاء والاحتمالات لشعبة التسيير',
    topPlaylists: ['شرح رياضيات تسيير واقتصاد من الصفر'],
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
    specialtyTag: 'شرح دقيق ومجلات الهيستونات والمنهجية',
    streams: ['sciences', 'math'],
    icon: '🧬',
    pedagogy: 'شروحات دقيقة جداً لكل آليات تركيب البروتين، النشاط الإنزيمي، المناعة والاتصال العصبي، مع مجلات الهيستونات والمنهجية الوزارية الرسمية.',
    bestFor: 'المنهجية، تركيب البروتين، المناعة، والاتصال العصبي ومجلات الهيستونات',
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
    specialtyTag: 'منهجية المسعى العلمي والاستدلال البيولوجي',
    streams: ['sciences', 'math'],
    icon: '🧬',
    pedagogy: 'معروف بقوة شرحه لمنهجية الإجابة الحديثة والمسعى العلمي (الاستدلال البيولوجي ضمن مسعى علمي) وتفكيك أسئلة البكالوريا.',
    bestFor: 'منهجية المسعى العلمي، استغلال الوثائق، وتفكيك الأسئلة المعقدة',
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
    specialtyTag: 'شرح مبسط ورسومات تخطيطية متقنة',
    streams: ['sciences', 'math'],
    icon: '🧬',
    pedagogy: 'تبسيط الظواهر الحيوية المعقدة برسومات تخطيطية واضحة وشرح خطوة بخطوة يجعل التلميذ يستوعب آليات الخلية والبروتين بسلاسة.',
    bestFor: 'الرسومات التخطيطية، الجيولوجيا، والمناعة والتركيب الضوئي',
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
    specialtyTag: 'حلول التمارين وسلاسل المراجعة',
    streams: ['sciences', 'math'],
    icon: '🧬',
    pedagogy: 'شروحات أكاديمية وسلاسل تمارين محلولة ومنهجيات استغلال الوثائق.',
    bestFor: 'تمارين الوحدات والمراجعة الشاملة',
    topPlaylists: ['سلسلة تمارين ومواضيع مصطفى بدد'],
    url: 'https://www.youtube.com/c/MostafaBdd'
  },
  {
    id: 'talhi_sciences',
    name: 'الأستاذ طلحي عبد الرحمان',
    subject: 'علوم الطبيعة والحياة',
    subjectId: 'sciences_nat',
    specialtyTag: 'تدريب منهجي وسلاسل متدرجة',
    streams: ['sciences', 'math'],
    icon: '🧬',
    pedagogy: 'حل التمارين وفق شبكة التقويم الوزارية وشرح خطوات استرجاع المعلومات والاستدلال.',
    bestFor: 'استرجاع المعلومات والتمارين المسعوية',
    topPlaylists: ['دورة التمارين والمنهجية لطلحي عبد الرحمان'],
    url: 'https://www.youtube.com/channel/UCssTaejaQZvINAlhnn5rQEw'
  },
  {
    id: 'messaoud_kacem_sciences',
    name: 'الأستاذ مسعود قاسم',
    subject: 'علوم الطبيعة والحياة',
    subjectId: 'sciences_nat',
    specialtyTag: 'منهجية التحليل والتفسير والوصف العلمي',
    streams: ['sciences', 'math'],
    icon: '🧬',
    pedagogy: 'محتوى يركز على صياغة الإجابات المنهجية الدقيقة (التحليل، المقارنة، التفسير، والاستنتاج).',
    bestFor: 'منهجية التحليل والتفسير واستغلال السندات',
    topPlaylists: ['دروس ومنهجية الأستاذ مسعود قاسم'],
    url: 'https://www.youtube.com/user/doros3sn'
  },
  {
    id: 'boumediene_science_bac',
    name: 'الأستاذ بومدين — Science Bac',
    subject: 'علوم الطبيعة والحياة',
    subjectId: 'sciences_nat',
    specialtyTag: 'شروحات تفصيلية وتمارين البكالوريا',
    streams: ['sciences', 'math'],
    icon: '🧬',
    pedagogy: 'تغطية شاملة لوحدات العلوم الطبيعية مع التركيز على سلاسل التمارين النموذجية.',
    bestFor: 'المناعة، الإنزيمات، والجيولوجيا',
    topPlaylists: ['سلسلة Science Bac للأستاذ بومدين'],
    url: 'https://www.youtube.com/channel/UCXQtoyoJ2hTkQW7Vd1dBeTw'
  },
  {
    id: 'kalkal_sciences',
    name: 'الأستاذ قلقل — Masinissa School',
    subject: 'علوم الطبيعة والحياة',
    subjectId: 'sciences_nat',
    specialtyTag: 'دورات وتمارين منهجية',
    streams: ['sciences', 'math'],
    icon: '🧬',
    pedagogy: 'شرح آليات العلوم الطبيعية والتدريب على الامتحانات.',
    bestFor: 'حل المواضيع الشاملة',
    topPlaylists: ['دورات العلوم للأستاذ قلقل'],
    url: 'https://www.youtube.com/results?search_query=Masinissa+School+علوم+الأستاذ+قلقل'
  },
  {
    id: 'louzai_clicbac_sciences',
    name: 'الأستاذ لوزاعي — Clicbac',
    subject: 'علوم الطبيعة والحياة',
    subjectId: 'sciences_nat',
    specialtyTag: 'ملخصات مكثفة ومراجعات مركزة',
    streams: ['sciences', 'math'],
    icon: '🧬',
    pedagogy: 'شروحات مبسطة وملخصات مكثفة لوحدات العلوم الطبيعية.',
    bestFor: 'الملخصات المركزة والمراجعات',
    topPlaylists: ['ملخصات ودروس الأستاذ لوزاعي'],
    url: 'https://www.youtube.com/results?search_query=Clicbac+الأستاذ+لوزاعي+علوم'
  },
  {
    id: 'abdelhamid_bac_success',
    name: 'الأستاذ عبد الحميد — BAC Success',
    subject: 'علوم الطبيعة والحياة',
    subjectId: 'sciences_nat',
    specialtyTag: 'دروس وتمارين السنة الثالثة ثانوي',
    streams: ['sciences', 'math'],
    icon: '🧬',
    pedagogy: 'شروحات وتمارين موجهة للبكالوريا وفق التدرج السنوي.',
    bestFor: 'الوحدات الأساسية وتمارين البكالوريا',
    topPlaylists: ['دروس BAC Success للأستاذ عبد الحميد'],
    url: 'https://www.youtube.com/results?search_query=BAC+Success+عبد+الحميد+علوم'
  },
  {
    id: 'benyahia_sciences',
    name: 'الأستاذة بن يحيى — التفوق في العلوم',
    subject: 'علوم الطبيعة والحياة',
    subjectId: 'sciences_nat',
    specialtyTag: 'شرح دروس العلوم وملخصات النصوص العلمية',
    streams: ['sciences', 'math'],
    icon: '🧬',
    pedagogy: 'تبسيط المفاهيم العلمية وتقديم نصوص علمية جاهزة للحفظ والاستعمال في الباك.',
    bestFor: 'النصوص العلمية والرسومات التخطيطية',
    topPlaylists: ['سلسلة النصوص العلمية والملخصات'],
    url: 'https://www.youtube.com/results?search_query=الأستاذة+بن+يحيى+التفوق+في+العلوم+الطبيعية'
  },
  {
    id: 'boulariche_sciences',
    name: 'الأستاذ بوالريش أحمد',
    subject: 'علوم الطبيعة والحياة',
    subjectId: 'sciences_nat',
    specialtyTag: 'السلاسل النموذجية والمسعى العلمي',
    streams: ['sciences', 'math'],
    icon: '🧬',
    pedagogy: 'مؤسس السلاسل والمطبوعات المعتمدة وسلاسل تمارين المسعى العلمي لجميع الوحدات.',
    bestFor: 'سلاسل التمارين الشاملة والمطبوعات النموذجية',
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
    specialtyTag: 'مكتبة شاملة لجميع الوحدات والتمارين',
    streams: ['sciences', 'math', 'technique'],
    icon: '⚡',
    pedagogy: 'تغطية شاملة لكل صغيرة وكبيرة في البرنامج، حل سلاسل ضخمة من التمارين وتفسير التجارب خطوة بخطوة.',
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
    specialtyTag: 'شروحات تأسيسية عميقة لقوانين الفيزياء',
    streams: ['sciences', 'math', 'technique'],
    icon: '⚡',
    pedagogy: 'عنده محتوى أصيل وقوي في فيزياء البكالوريا، يشرح المبادئ والقوانين الفيزيائية بعمق مع حلول دقيقة.',
    bestFor: 'التأسيس الفيزيائي القوي، الميكانيك، والكهرباء',
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
    specialtyTag: 'ترتيب منهجي دقيق للوحدات والتمارين',
    streams: ['sciences', 'math', 'technique'],
    icon: '⚡',
    pedagogy: 'يتميز بمحتواه المنظم بدقة حسب الوحدات والحلول النموذجية المريحة لجميع الشعب.',
    bestFor: 'المتابعة الزمنية، النووي، والأحماض والأسس',
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
    specialtyTag: 'دروس وتمارين الكهرباء والميكانيك',
    streams: ['sciences', 'math', 'technique'],
    icon: '⚡',
    pedagogy: 'شروحات دقيقة لدروس وتمارين الناقلية والدارات الكهربائية المعقدة والميكانيك مع تبيان منهجية سلم التنقيط.',
    bestFor: 'الناقلية، دارات RL و RLC، والميكانيك',
    topPlaylists: ['سلسلة الكهرباء والناقلية للأستاذ بن بلخير'],
    url: 'https://www.youtube.com/channel/UC85KuQiQiM7HZgyQXK-NufQ'
  },
  {
    id: 'terir_physique',
    name: 'الأستاذ أحمد ترير',
    subject: 'العلوم الفيزيائية',
    subjectId: 'physique',
    specialtyTag: 'شرح أكاديمي سلس ومراجعات شاملة',
    streams: ['sciences', 'math', 'technique'],
    icon: '⚡',
    pedagogy: 'شرح أكاديمي منظم ومريح للعين مع التركيز على البراهين والتطبيقات المباشرة لأفكار البكالوريا.',
    bestFor: 'المراجعات النهائية وحل التمارين الشاملة',
    topPlaylists: ['سلسلة فيزياء البكالوريا لأحمد ترير'],
    url: 'https://www.youtube.com/results?search_query=الأستاذ+أحمد+ترير+فيزياء'
  },
  {
    id: 'touahria_physique',
    name: 'الأستاذ طواهرية عبد العزيز',
    subject: 'العلوم الفيزيائية',
    subjectId: 'physique',
    specialtyTag: 'أكاديمية متكاملة لفيزياء البكالوريا',
    streams: ['sciences', 'math', 'technique'],
    icon: '⚡',
    pedagogy: 'شروحات ودورات فيزيائية شاملة وفق المنهاج الجزائري المعتمد.',
    bestFor: 'شرح القوانين والتطبيقات النموذجية',
    topPlaylists: ['دورات أكاديمية الأستاذ طواهرية'],
    url: 'https://www.youtube.com/results?search_query=الأستاذ+طواهرية+عبد+العزيز+فيزياء'
  },
  {
    id: 'tiaybia_physique',
    name: 'الأستاذ طيايبية',
    subject: 'العلوم الفيزيائية',
    subjectId: 'physique',
    specialtyTag: 'شروحات مبسطة لدروس الفيزياء',
    streams: ['sciences', 'math', 'technique'],
    icon: '⚡',
    pedagogy: 'شروحات مبسطة للوحدات وحل تمارين نموذجية.',
    bestFor: 'الكهرباء والميكانيك',
    topPlaylists: ['سلاسل تمارين الأستاذ طيايبية'],
    url: 'https://www.youtube.com/results?search_query=الأستاذ+طيايبية+فيزياء+بكالوريا'
  },
  {
    id: 'boudache_physique',
    name: 'الأستاذ لخضر بوداش',
    subject: 'العلوم الفيزيائية',
    subjectId: 'physique',
    specialtyTag: 'حلول مواضيع وتمارين البكالوريا',
    streams: ['sciences', 'math', 'technique'],
    icon: '⚡',
    pedagogy: 'حلول مفصلة لتمارين ومواضيع البكالوريا الرسمية والتجريبية.',
    bestFor: 'تمارين البكالوريا والنووي',
    topPlaylists: ['تمارين الأستاذ لخضر بوداش فيزياء'],
    url: 'https://www.youtube.com/results?search_query=الأستاذ+لخضر+بوداش+فيزياء'
  },
  {
    id: 'legraa_lazhar_physique',
    name: 'الأستاذ لقرع لزهر',
    subject: 'العلوم الفيزيائية',
    subjectId: 'physique',
    specialtyTag: 'مواضيع وتمارين مقترحة دقيقة',
    streams: ['sciences', 'math', 'technique'],
    icon: '⚡',
    pedagogy: 'معروف بإعداد مواضيع البكالوريا وسلاسل التمارين النموذجية.',
    bestFor: 'المواضيع المقترحة والتمارين الشاملة',
    topPlaylists: ['تمارين الأستاذ لقرع لزهر'],
    url: 'https://www.youtube.com/results?search_query=الأستاذ+لقرع+لزهر+فيزياء'
  },
  {
    id: 'chealal_physique',
    name: 'الأستاذ سيد أحمد شعلال',
    subject: 'العلوم الفيزيائية',
    subjectId: 'physique',
    specialtyTag: 'الأفكار الامتحانية وتفادي فخاخ التحويلات',
    streams: ['sciences', 'math', 'technique'],
    icon: '⚡',
    pedagogy: 'قناة تركز على الأفكار الامتحانية الدقيقة وتفادي فخاخ التحويلات وحسابات الثوابت.',
    bestFor: 'تمارين البكالوريا المتقدمة والأفكار المبتكرة',
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
    specialtyTag: 'شرح وتنظيم وخرائط ذهنية للحفظ السريع',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🗺️',
    pedagogy: 'شرح ممتع يربط الأحداث التاريخية والجغرافية بخرائط ذهنية، مع تحفيظ التواريخ والمصطلحات والشخصيات بسلاسة وبدون نسيان.',
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
    specialtyTag: 'شرح أكاديمي ومنهجية المقال والتعليق',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🗺️',
    pedagogy: 'عنده دروس بكالوريا كاملة، ويتميز بطرحه الأكاديمي الرصين ومنهجية المقال الجغرافي والتاريخي الدقيقة.',
    bestFor: 'كتابة المقال التاريخي والجغرافي، ومنهجية التعليق على الجداول والخرائط',
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
    specialtyTag: 'منهجية الإجابة وفق المعايير الوزارية',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🗺️',
    pedagogy: 'معروف بالمنهجية الصارمة وكيفية صياغة إجابة نموذجية لا يخصم منها المصحح أي نصف نقطة.',
    bestFor: 'المنهجية، حل البكالوريات، وحفظ المصطلحات الأساسية',
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
    specialtyTag: 'مراجعة مكثفة وتقنيات الحفظ البصري',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🗺️',
    pedagogy: 'أسلوب حركي وممتع يركز على تثبيت الأفكار الرئيسية والمصطلحات والتواريخ عبر الحفظ البصري.',
    bestFor: 'المراجعات السريعة وحفظ العناصر المهمة',
    topPlaylists: ['سلسلة المراجعة والحفظ مع الأستاذ قنشوبة'],
    url: 'https://www.youtube.com/results?search_query=قنشوبة+Officiel+تاريخ+وجغرافيا'
  },
  {
    id: 'zartal_amine_hisgeo',
    name: 'الأستاذ زرطال أمين',
    subject: 'التاريخ والجغرافيا',
    subjectId: 'hisgeo',
    specialtyTag: 'دروس تفصيلية وملخصات دقيقة',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🗺️',
    pedagogy: 'يقدم دروساً مفصلة مرتبة مع مراجعات نهائية وملخصات مريحة للطالب.',
    bestFor: 'فهم الأحداث، الدروس المفصلة، والمراجعات',
    topPlaylists: ['دروس ومراجعات الأستاذ زرطال أمين'],
    url: 'https://www.youtube.com/results?search_query=التاريخ+والجغرافيا+مع+الأستاذ+زرطال+أمين'
  },
  {
    id: 'mahmoudi_hisgeo',
    name: 'الأستاذ محمودي عادل',
    subject: 'التاريخ والجغرافيا',
    subjectId: 'hisgeo',
    specialtyTag: 'ملخصات مركزة وجداول مقارنة',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🗺️',
    pedagogy: 'شروحات دقيقة تعتمد على الجداول المقارنة والخرائط والمطبوعات المعتمدة.',
    bestFor: 'المصطلحات والجداول والخرائط',
    topPlaylists: ['سلسلة محمودي عادل في الاجتماعيات'],
    url: 'https://www.youtube.com/results?search_query=محمودي+عادل+تاريخ+وجغرافيا'
  },
  {
    id: 'el_amin_school_hisgeo',
    name: 'قناة El Amin School',
    subject: 'التاريخ والجغرافيا',
    subjectId: 'hisgeo',
    specialtyTag: 'شروحات ومراجعات منهجية',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🗺️',
    pedagogy: 'شروحات منهجية وتلخيصات مفصلة لدروس التاريخ والجغرافيا لجميع الشعب.',
    bestFor: 'المراجعات الدورية للوحدات',
    topPlaylists: ['دروس El Amin School في التاريخ والجغرافيا'],
    url: 'https://www.youtube.com/results?search_query=El+Amin+School+تاريخ+وجغرافيا'
  },
  {
    id: 'laamri_hisgeo',
    name: 'الأستاذ لعمري منير',
    subject: 'التاريخ والجغرافيا',
    subjectId: 'hisgeo',
    specialtyTag: 'شرح مفصل وتبسيط للوحدات',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🗺️',
    pedagogy: 'شروحات مفصلة لبرنامج الاجتماعيات.',
    bestFor: 'شرح الوحدات والمصطلحات',
    topPlaylists: ['دروس الأستاذ لعمري منير'],
    url: 'https://www.youtube.com/results?search_query=الأستاذ+لعمري+منير+تاريخ+وجغرافيا'
  },
  {
    id: 'zorki_hisgeo',
    name: 'الأستاذ زرقي',
    subject: 'التاريخ والجغرافيا',
    subjectId: 'hisgeo',
    specialtyTag: 'شروحات ميسرة للمنهاج',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🗺️',
    pedagogy: 'تبسيط دروس التاريخ والجغرافيا للشعب الأدبية والعلمية.',
    bestFor: 'الحفظ والدروس',
    topPlaylists: ['دروس الأستاذ زرقي'],
    url: 'https://www.youtube.com/results?search_query=الأستاذ+زرقي+تاريخ+وجغرافيا'
  },
  {
    id: 'maroussi_hisgeo',
    name: 'الأستاذ يوسف مروسي',
    subject: 'التاريخ والجغرافيا',
    subjectId: 'hisgeo',
    specialtyTag: 'شروحات ومراجعات تطبيقية',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🗺️',
    pedagogy: 'شروحات لدروس التاريخ والجغرافيا مع تطبيقات عملية.',
    bestFor: 'مراجعة الوحدات',
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
    specialtyTag: 'شرح بالصور والخرائط الذهنية وتثبيت الذاكرة البصرية',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🕌',
    pedagogy: 'طريقة فريدة تعتمد على الخرائط الذهنية والرسومات البصرية لتثبيت عناصر دروس العلوم الإسلامية في الذاكرة طويلة المدى.',
    bestFor: 'الخرائط الذهنية، حفظ الآيات والأحاديث والأحكام والفوائد، وأسئلة الفهم',
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
    specialtyTag: 'تأصيل شرعي ومنهجية أسئلة الفهم والاستنباط',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🕌',
    pedagogy: 'شروحات أكاديمية دقيقة تفصل في مقاصد الشريعة، العقيدة، الربا والميراث، مع إجابات نموذجية وفق معايير الوزارة.',
    bestFor: 'مقاصد الشريعة، الميراث، الربا، وأسئلة الاستنباط والفهم',
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
    specialtyTag: 'تلخيصات مركزة وأسئلة مباشرة للبكالوريا',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🕌',
    pedagogy: 'أسلوب مريح وسلس ومباشر لتبسيط الدروس وتحديد الأسئلة المتوقعة في كل وحدة.',
    bestFor: 'التلخيص السريع وحل الأسئلة المباشرة',
    topPlaylists: ['سلسلة دروس العلوم الإسلامية لنوال بوسعادي'],
    url: 'https://www.youtube.com/results?search_query=الأستاذة+نوال+بوسعادي+إسلامية'
  },
  {
    id: 'chamseddine_islamic',
    name: 'الشيخ شمس الدين بوالريش',
    subject: 'العلوم الإسلامية',
    subjectId: 'islamic',
    specialtyTag: 'أسلوب قصصي جذاب وممتع للحفظ السلس',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🕌',
    pedagogy: 'يربط الدروس بالأمثلة المعاصرة والقصص الشرعية لتسهيل استيعاب مقاصد الشريعة والتشريع.',
    bestFor: 'الفهم العام والربط العملي',
    topPlaylists: ['سلسلة دروس الشريعة للشيخ شمس الدين'],
    url: 'https://www.youtube.com/results?search_query=الشيخ+شمس+الدين+علوم+إسلامية+بكالوريا'
  },
  {
    id: 'mousli_islamic',
    name: 'الأستاذ عبد الحق موسلي',
    subject: 'العلوم الإسلامية',
    subjectId: 'islamic',
    specialtyTag: 'مراجعات مكثفة وتدريب على الأسئلة',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🕌',
    pedagogy: 'يركز على التدريب المكثف على حل أسئلة البكالوريات السابقة واستخراج الأحكام والفوائد.',
    bestFor: 'استخراج الأحكام والفوائد وحل المواضيع',
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
    specialtyTag: 'فهم المقالات والمنهجيات المعتمدة لجميع الشعب',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🤔',
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
    specialtyTag: 'المقالات الفلسفية والمنهجية السليمة لتحقيق علامة ممتازة',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🤔',
    pedagogy: 'تبسيط المقالات الفلسفية وتحويلها إلى مخططات أفكار واضحة وسهلة الحفظ والاستحضار يوم الامتحان.',
    bestFor: 'مقالات شعبة آداب وفلسفة، وشعبة العلوم والتسيير',
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
    specialtyTag: 'مراجعات ومقترحات شاملة لجميع الشعب',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🤔',
    pedagogy: 'شروحات مباشرة ومنهجية لجميع الشعب مع مراجعات دورية ومقترحات امتحانية دقيقة.',
    bestFor: 'المراجعات الدورية، المقالات المقترحة، ومنهجية التحليل',
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
    specialtyTag: 'شروحات منهجية وتفكيك أقوال الفلاسفة',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🤔',
    pedagogy: 'يقدم حججاً وأقوالاً فلسفية قوية ترفع علامة المقال الفلسفي لدى المصحح.',
    bestFor: 'أقوال الفلاسفة والأمثلة الواقعية',
    topPlaylists: ['سلاسل إسكندر لطفي في الفلسفة'],
    url: 'https://www.youtube.com/results?search_query=إسكندر+لطفي+غربي+فلسفة'
  },
  {
    id: 'hamdache_philo',
    name: 'الأستاذ حمداش عبد الحق',
    subject: 'الفلسفة',
    subjectId: 'philo',
    specialtyTag: 'مقالات نموذجية وخطوات معيارية',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🤔',
    pedagogy: 'تدريب على خطوات كتابة المقدمة، العرض، والتركيب والخاتمة بطريقة معيارية.',
    bestFor: 'خطوات المقال والتركيب الفلسفي',
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
    specialtyTag: 'منهجية النصوص و Le Compte Rendu',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🇫🇷',
    pedagogy: 'تشرح أنواع النصوص (Historique, Argumentatif, Appel) مع منهجية كتابة الـ Compte Rendu بدقة واحترافية.',
    bestFor: 'منهجية الـ Compte Rendu، أسئلة فهم النص، والقواعد الفرنسية المتكررة في الباك',
    topPlaylists: [
      'منهجية كتابة Le Compte Rendu Objectif et Critique',
      'دورة Le Texte d\'Histoire الشاملة',
      'سلسلة حل مواضيع البكالوريا في الفرنسية'
    ],
    url: 'https://www.youtube.com/results?search_query=Sally+français+bac'
  },
  {
    id: 'mounir_chebboua_french',
    name: 'الأستاذ منير شبوة (Mounir Chebboua)',
    subject: 'اللغة الفرنسية',
    subjectId: 'french',
    specialtyTag: 'شرح الدروس والملخصات والقواعد',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🇫🇷',
    pedagogy: 'أستاذ لغة فرنسية متمكن يشرح القواعد المعقدة بتبسيط كبير ويساعد الطالب على تفكيك نصوص البكالوريا.',
    bestFor: 'القواعد، التصريف، ومعاني المصطلحات الصعبة في النصوص',
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
    specialtyTag: 'منهجية دقيقة وحل مواضيع البكالوريا الرسمية',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🇫🇷',
    pedagogy: 'تركز على حل مواضيع البكالوريا بالتدريج وتدريب الطالب على استخراج الإجابات من النص بسلاسة.',
    bestFor: 'حل المواضيع والـ Compte Rendu',
    topPlaylists: ['سلسلة حل مواضيع البكالوريا L.A Tube'],
    url: 'https://www.youtube.com/results?search_query=L.A+TUBE+FRANCAIS+POUR+TOUS'
  },
  {
    id: 'saidani_nacer_french',
    name: 'الأستاذ ناصر منصوري / سعيداني ناصر',
    subject: 'اللغة الفرنسية',
    subjectId: 'french',
    specialtyTag: 'شرح الأساسيات والقواعد المبرمجة',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🇫🇷',
    pedagogy: 'شرح مبسط لقواعد اللغة الفرنسية والنصوص المبرمجة.',
    bestFor: 'القواعد والأساسيات',
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
    specialtyTag: 'المرجع الشامل لوحدات وقواعد الإنجليزية',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🇬🇧',
    pedagogy: 'شرح شامل لجميع وحدات الإنجليزية (Ethics in Business, Astronomy, Safety First, Education, Feel Feelings)، تبسيط القواعد، ومنهجية كتابة الـ Written Expression.',
    bestFor: 'شرح الوحدات، القواعد (Grammar & Phonetics)، ومنهجية كتابة الفقرات (Written Expression)',
    topPlaylists: [
      'المراجعة الشاملة لجميع وحدات الإنجليزية للبكالوريا',
      'سلسلة قواعد الإنجليزية من الصفر',
      'منهجية كتابة الفقرة (Written Expression) والحصول على العلامة الكاملة'
    ],
    url: 'https://www.youtube.com/results?search_query=Nasri+English+bac'
  },
  {
    id: 'randa_english',
    name: 'الأستاذة رندة (Randa English)',
    subject: 'اللغة الإنجليزية',
    subjectId: 'english',
    specialtyTag: 'منهجية حل المواضيع والتحضير للبكالوريا',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🇬🇧',
    pedagogy: 'قناة متخصصة في حل مواضيع البكالوريا، تدريب على أسئلة النصوص والـ Phonetics وتلخيص قواعد الوحدات.',
    bestFor: 'حل المواضيع، منهجية الإجابة، والقواعد الامتحانية',
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
    specialtyTag: 'شرح مبسط وسلس لقواعد الإنجليزية',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🇬🇧',
    pedagogy: 'أسلوب ممتع يبسط قواعد الإنجليزية ويساعد الطالب على فهم النصوص والتعبير.',
    bestFor: 'الشرح المبسط والمراجعات السريعة',
    topPlaylists: ['دروس الإنجليزية مع Bilou'],
    url: 'https://www.youtube.com/results?search_query=English+m3a+Bilou'
  },
  {
    id: 'ferni_english',
    name: 'الأستاذ فرني للإنجليزية',
    subject: 'اللغة الإنجليزية',
    subjectId: 'english',
    specialtyTag: 'منهجية ودروس مفصلة',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🇬🇧',
    pedagogy: 'شروحات لقواعد الإنجليزية وحلول نموذجية لمواضيع البكالوريا.',
    bestFor: 'القواعد وحل التمارين',
    topPlaylists: ['دروس الإنجليزية للأستاذ فرني'],
    url: 'https://www.youtube.com/results?search_query=الأستاذ+فرني+إنجليزية+بكالوريا'
  },
  {
    id: 'bacaloge_english',
    name: 'قناة Bacaloge English',
    subject: 'اللغة الإنجليزية',
    subjectId: 'english',
    specialtyTag: 'مراجعات سريعة للمصطلحات والقواعد',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '🇬🇧',
    pedagogy: 'مراجعات سريعة للمصطلحات والقواعد الأساسية.',
    bestFor: 'المراجعات السريعة',
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
    specialtyTag: 'البناء الفكري واللغوي والتقويم النقدي',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '📖',
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
    specialtyTag: 'تفكيك النصوص الأدبية والعلمية المتأدبة',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '📖',
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
    specialtyTag: 'تلخيص القواعد والصور البيانية وإعراب الجمل',
    streams: ['sciences', 'math', 'technique', 'gestion', 'philo', 'langues', 'arts'],
    icon: '📖',
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
    specialtyTag: 'أعمال نهاية السنة والميزانيات والاقتصاد والقانون',
    streams: ['gestion'],
    icon: '📊',
    pedagogy: 'شروحات لأعمال نهاية السنة، إعداد الميزانيات، حسابات النتائج، والقروض واهتلاك التثبيتات مع حلول مواضيع الباك.',
    bestFor: 'أعمال نهاية السنة، التسويات، جدول حسابات النتائج، واختيار المشاريع',
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
    specialtyTag: 'تمارين المحاسبة المعمقة وجداول الاستغلال',
    streams: ['gestion'],
    icon: '📊',
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
    specialtyTag: 'حلول نموذجية لمواضيع البكالوريا في المحاسبة',
    streams: ['gestion'],
    icon: '📊',
    pedagogy: 'تدريب مباشر على نماذج امتحانات البكالوريا مع كشف الأخطاء الشائعة في التسجيل المحاسبي.',
    bestFor: 'حل مواضيع البكالوريا في المحاسبة',
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
    specialtyTag: 'المنطق التعاقبي والتحكم الآلي والغرافست',
    streams: ['technique'],
    icon: '⚡',
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
    specialtyTag: 'الرسم التقني ومقاومة المواد والوصلات',
    streams: ['technique'],
    icon: '⚙️',
    pedagogy: 'شرح الرسوم التجميعية والتعريفية، دراسة الجدوى، حسابات التحمل، والوصلات الحركية مع حلول مواضيع البكالوريا بدقة.',
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
    specialtyTag: 'الميكانيك التطبيقية وعلم السكون والخرسانة',
    streams: ['technique'],
    icon: '🏗️',
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
    specialtyTag: 'الكيمياء العضوية والديناميكا الحرارية',
    streams: ['technique'],
    icon: '🧪',
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
    specialtyTag: 'قواعد اللغات الأجنبية وحل المواضيع',
    streams: ['langues'],
    icon: '🌐',
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
