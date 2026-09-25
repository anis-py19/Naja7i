/**
 * 🎯 بنك الأسئلة والاختبارات التفاعلية السريعة لشهادة البكالوريا (BAC Quiz & QCM Bank)
 * وفق المنهاج الوزاري الرسمي لوزارة التربية الوطنية الجزائرية 🇩🇿
 * يغطي جميع الشعب الست مع الشروحات النموذجية المعتمدة في التصحيح الرسمي.
 */

export const QUIZ_QUESTIONS = [
  // =========================================================================
  // 🧬 1. علوم الطبيعة والحياة (Sciences de la Nature et de la Vie)
  // =========================================================================
  {
    id: 'sn_01',
    streamIds: ['sciences', 'math'],
    subjectId: 'sciences_nat',
    subjectName: 'علوم الطبيعة والحياة',
    unitName: 'تركيب البروتين',
    question: 'ما هو الدور الرئيسي لإنزيم ARN بوليميراز (ARN polymérase) أثناء عملية الاستنساخ؟',
    options: [
      'تثبيت الأحماض الأمينية على الـ ARNt النوعي في الهيولى',
      'التعرف على بداية المورثة، كسر الروابط الهيدروجينية، وربط النكليوتيدات الريبية المتكاملة',
      'تفكيك الـ ARNm بعد اكتمال مرحلة الترجمة في الريبوزوم',
      'ربط الأحماض الأمينية وتشكيل الرابطة الببتيدية داخل الموقع P للريبوزوم'
    ],
    correctIndex: 1,
    explanation: 'يقوم إنزيم ARN بوليميراز بالتعرف على إشارة بداية المورثة، فتح سلسلتي الـ ADN بكسر الروابط الهيدروجينية، وقراءة تتابع النكليوتيدات على السلسلة الناسخة لتركيب سلسلة ARNm مكملة لها.',
    difficulty: 'easy'
  },
  {
    id: 'sn_02',
    streamIds: ['sciences', 'math'],
    subjectId: 'sciences_nat',
    subjectName: 'علوم الطبيعة والحياة',
    unitName: 'العلاقة بين بنية ووظيفة البروتين',
    question: 'ما هي الروابط الكيميائية المسؤولة عن ثبات واستقرار البنية الثالثية للبروتينات؟',
    options: [
      'الروابط الببتيدية فقط بين المجموعات الكربوكسيلية والأمينية',
      'الروابط الهيدروجينية، الشاردية، الكارهة للماء، والجسور ثنائية الكبريت (S-S)',
      'الروابط الفوسفاتية ثنائية الإستر والروابط الغليكوزيدية',
      'الروابط النيتروجينية التساهمية بين القواعد الأزوتية'
    ],
    correctIndex: 1,
    explanation: 'تنشأ البنية الثالثية نتيجة انطواء السلسلة الببتيدية بتدخل 4 أنواع من الروابط بين جذور الأحماض الأمينية: الهيدروجينية، الشاردية (الملحية)، قوى فان دير فالس وتجاذب الجذور الكارهة للماء، والجسور ثنائية الكبريت التساهمية.',
    difficulty: 'medium'
  },
  {
    id: 'sn_03',
    streamIds: ['sciences', 'math'],
    subjectId: 'sciences_nat',
    subjectName: 'علوم الطبيعة والحياة',
    unitName: 'النشاط الإنزيمي للبروتينات',
    question: 'كيف يؤثر الارتفاع الشديد في درجة الحرارة (أكثر من 60°م) على النشاط الإنزيمي؟',
    options: [
      'يثبط الإنزيم مؤقتاً ويمكن استرجاع نشاطه بالتبريد',
      'يخرب البنية الفراغية للإنزيم ويفقد الموقع الفعال شكله الوظيفي بشكل غير عكوس',
      'يزيد من سرعة التفاعل الإنزيمي بمضاعفة الطاقة الحركية للجزيئات',
      'يغير الطبيعة الكيميائية لمادة التفاعل دون المساس بالإنزيم'
    ],
    correctIndex: 1,
    explanation: 'الحرارة المرتفعة تكسر الروابط الضعيفة (الهيدروجينية والشاردية) المحافظة على البنية الفراغية، مما يؤدي إلى تخريب الإنزيم (Dénaturation) وفقدان تشكل الموقع الفعال نهائياً وبشكل غير عكوس.',
    difficulty: 'easy'
  },
  {
    id: 'sn_04',
    streamIds: ['sciences'],
    subjectId: 'sciences_nat',
    subjectName: 'علوم الطبيعة والحياة',
    unitName: 'المناعة والدفاع عن الذات',
    question: 'ما هي الخلايا المناعية المسؤولة مباشرة عن إفراز الأجسام المضادة النوعية في الاستجابة الخلطية؟',
    options: [
      'الخلايا اللمفاوية التائية القاتلة (LTc)',
      'الخلايا البلازمية (Plasmocytes) الناتجة عن تمايز اللمفاويات البائية (LB)',
      'البالعات الكبيرة (Macrophage) بعد بلعمة المعقد المناعي',
      'الخلايا اللمفاوية المساعدة (LTh)'
    ],
    correctIndex: 1,
    explanation: 'بعد تنشيط اللمفاويات البائية LB وتمايزها بتأثير الإنترلوكين، تتحول إلى خلايا بلازمية غنية بالشبكة الهيولية المحببة وجهاز غولجي متطور، متخصصة في تركيب وإفراز الأجسام المضادة بكميات كبيرة.',
    difficulty: 'easy'
  },
  {
    id: 'sn_05',
    streamIds: ['sciences'],
    subjectId: 'sciences_nat',
    subjectName: 'علوم الطبيعة والحياة',
    unitName: 'الاتصال العصبي',
    question: 'يعود كمون الراحة (-70mV) للغشاء الهيولي لليف العصبي أساساً إلى:',
    options: [
      'دخول شوارد الصوديوم بكثافة عبر القنوات الفولطية',
      'نفاذية الغشاء الانتقائية المتفاوتة لشوارد البوتاسيوم ونشاط مضخة (Na+/K+ ATPase)',
      'تراكم الشحنات الموجبة على السطح الداخلي لغشاء الليف العصبي',
      'انفتاح قنوات الكالسيوم المبوبة كيميائياً في الغشاء بعد المشبكي'
    ],
    correctIndex: 1,
    explanation: 'ينتج كمون الراحة عن التوزع غير المتساوي للشوارد، حيث تكون نفاذية الغشاء لشوارد K+ أكبر من نفاذيته لـ Na+ لوجود قنوات تسرب مفتوحة لـ K+ بكثرة، مع المحافظة على التدرج عبر عمل مضخة Na+/K+ المستهلكة للطاقة ATP.',
    difficulty: 'medium'
  },
  {
    id: 'sn_06',
    streamIds: ['sciences'],
    subjectId: 'sciences_nat',
    subjectName: 'علوم الطبيعة والحياة',
    unitName: 'المناعة الخلوية',
    question: 'تتعرف الخلايا اللمفاوية التائية السامة (LTc) على الخلية المصابة عن طريق التعرف المزدوج بين:',
    options: [
      'الجسم المضاد النوعي ومولد الضد الحر في المصل',
      'مستقبل TCR ومحدد مولد الضد المعروض مع جزيئة HLA-I (CMH-I)',
      'مستقبل CD4 وجزيئة HLA-II على غشاء البالعة',
      'السمين التكفيكي والبيرفورين في السائل بين الخلوي'
    ],
    correctIndex: 1,
    explanation: 'التعرف المزدوج شرط أساسي لعمل LTc: يتعرف مستقبل التائي TCR على محدد المستضد الببتيدي المعروض، بينما يثبت مؤشر CD8 على جزيئة CMH-I للخلية المستهدفة المصابة.',
    difficulty: 'medium'
  },

  // =========================================================================
  // ⚡ 2. العلوم الفيزيائية (Sciences Physiques)
  // =========================================================================
  {
    id: 'ph_01',
    streamIds: ['sciences', 'math', 'technique_math'],
    subjectId: 'physique',
    subjectName: 'العلوم الفيزيائية',
    unitName: 'المتابعة الزمنية لتحول كيميائي',
    question: 'يُعرَّف زمن نصف التفاعل (t1/2) لتحول كيميائي تام بأنه:',
    options: [
      'المدة الزمنية اللازمة لاختفاء جميع المتفاعلات وتوقف التفاعل',
      'المدة الزمنية اللازمة لبلوغ تقدم التفاعل نصف قيمته النهائية: x(t1/2) = x_final / 2',
      'الزمن اللازم لتصل سرعة التفاعل الحجمية إلى قيمتها الأعظمية',
      'المدة المقاسة بين لحظة المزج ولحظة حدوث التكافؤ اللوني'
    ],
    correctIndex: 1,
    explanation: 'وفق التعريف الوزاري المعتمد في البكالوريا، زمن نصف التفاعل t1/2 هو المدة اللازمة لتقدم التفاعل ليصل إلى نصف قيمته النهائية x_f / 2 (أو الأعظمية x_max في حالة التفاعل التام).',
    difficulty: 'easy'
  },
  {
    id: 'ph_02',
    streamIds: ['sciences', 'math', 'technique_math'],
    subjectId: 'physique',
    subjectName: 'العلوم الفيزيائية',
    unitName: 'الظواهر الكهربائية (الدارة RC)',
    question: 'في دارة شحن مكثفة (RC) عبر مقاومة R ومولد قوته المحركة E، يساوي ثابت الزمن τ:',
    options: [
      'τ = R / C بوحدة الهنري (H)',
      'τ = R * C وله بعد زمني يُقاس بالثانية (s)',
      'τ = 1 / (R * C) وله بعد التردد بوحدة الهرتز (Hz)',
      'τ = C / R وهو بدون وحدة قياس'
    ],
    correctIndex: 1,
    explanation: 'ثابت الزمن للدارة RC هو الجداء τ = R * C. عبر التحليل البعدي: [R] = [U]/[I] و [C] = [I]*[T]/[U]، وبالتالي [R*C] = [T] أي بعد زمني يقاس بالثانية في النظام الدولي للوحدات.',
    difficulty: 'easy'
  },
  {
    id: 'ph_03',
    streamIds: ['sciences', 'math', 'technique_math'],
    subjectId: 'physique',
    subjectName: 'العلوم الفيزيائية',
    unitName: 'الميكانيك وقوانين نيوتن',
    question: 'عند السقوط الشاقولي الحقيقي لجسم صلب في مائع (هواء أو زيت)، تبلغ سرعته قيمة حدية ثابته V_limite عندما:',
    options: [
      'تنعدم قوة الثقل تماماً بتأثير الارتفاع',
      'تتساوى محصلة قوى الاحتكاك ودافعة أرخميدس مع قوة الثقل وينعدم التسارع (a = 0)',
      'تصل طاقة الحركة إلى الصفر ويتوقف الجسم عن الحركة',
      'تتضاعف دافعة أرخميدس لتفوق وزن الجسم بمرتين'
    ],
    correctIndex: 1,
    explanation: 'بتطبيق القانون الثاني لنيوتن: Σ F_ext = m * a. عند بلوغ السرعة الحدية تصبح السرعة ثابته dv/dt = a = 0، وبالتالي محصلة القوى تنعدم: P = f + Π (حيث f قوة الاحتكاك و Π دافعة أرخميدس).',
    difficulty: 'medium'
  },
  {
    id: 'ph_04',
    streamIds: ['sciences', 'math', 'technique_math'],
    subjectId: 'physique',
    subjectName: 'العلوم الفيزيائية',
    unitName: 'التحولات النووية',
    question: 'تكون النواة أكثر استقراراً كلما كانت:',
    options: [
      'طاقة الربط الكلية للنواة El أكبر ما يمكن دون اعتبار عدد النويات',
      'طاقة الربط لكل نوية (El / A) أكبر ما يمكن (تقترب من 8.8 MeV/nucléon)',
      'طاقة التفكك مساوية تماماً للصفر',
      'عدد البروتونات مضاعفاً لعدد النيوترونات'
    ],
    correctIndex: 1,
    explanation: 'معيار استقرار النواة ليس طاقة الربط الإجمالية El، بل طاقة الربط لكل نوية (El / A). النوى الواقعة في قعر منحنى أستون (مثل الحديد Fe-56) هي الأكثر استقراراً لأن طاقة ربط نويتها تفوق 8.7 MeV/نوية.',
    difficulty: 'medium'
  },
  {
    id: 'ph_05',
    streamIds: ['sciences', 'math', 'technique_math'],
    subjectId: 'physique',
    subjectName: 'العلوم الفيزيائية',
    unitName: 'تفاعلات حمض - أساس ومحلول مائي',
    question: 'في محلول مائي عند 25°م، يكون المحلول معتدلاً كهربائياً ومحايداً حمضياً عندما:',
    options: [
      'الـ pH = 0 والتركيز المولي للحمض معدوم',
      'الـ pH = 7.0 ويكون [H3O+] = [OH-] = 10^(-7) mol/L',
      'الـ pKa يساوي ثابت التوازن K',
      'يكون المحلول مشبعاً برواسب الملح'
    ],
    correctIndex: 1,
    explanation: 'الجداء الشاردي للماء عند 25°م هو Ke = [H3O+][OH-] = 10^(-14). عند التعديل يكون [H3O+] = [OH-] = 10^(-7) mol/L وبالتالي pH = -log(10^-7) = 7.',
    difficulty: 'easy'
  },
  {
    id: 'ph_06',
    streamIds: ['sciences', 'math', 'technique_math'],
    subjectId: 'physique',
    subjectName: 'العلوم الفيزيائية',
    unitName: 'حركة الكواكب والأقمار الاصطناعية',
    question: 'ينص القانون الثالث لكبلر على أن النسبة بين مربع الدور T ومكعب نصف المحور الأكبر a لمدار الكوكب:',
    options: [
      'تتناسب طرداً مع كتلة الكوكب الدائر',
      'تساوي مقداراً ثابتاً لجميع الكواكب التي تدور حول نفس النجم المركزي (T² / a³ = ثابت)',
      'تتغير بتغير زاوية ميلان خط الاستواء',
      'تساوي الصفر عند نقطة الحضيض'
    ],
    correctIndex: 1,
    explanation: 'القانون الثالث لكبلر ينص على أن T² / a³ = 4π² / (G * M_soleil)، وهي قيمة ثابتة لجميع الأجرام التي تدور حول نفس المركز الثقالي المستقطب.',
    difficulty: 'medium'
  },

  // =========================================================================
  // 📐 3. الرياضيات (Mathématiques)
  // =========================================================================
  {
    id: 'ma_01',
    streamIds: ['sciences', 'math', 'technique_math', 'gestion'],
    subjectId: 'math',
    subjectName: 'الرياضيات',
    unitName: 'المتتاليات العددية',
    question: 'تكون المتتالية العددية (Un) متقاربة بالضرورة إذا كانت:',
    options: [
      'موجبة تماماً وحدودها متزايدة نحو اللانهاية',
      'متزايدة ومحدودة من الأعلى، أو متناقصة ومحدودة من الأدنى',
      'حسابية أساسها عدد حقيقي موجب تماماً r > 0',
      'متذبذبة بين قيمتين موجبتين'
    ],
    correctIndex: 1,
    explanation: 'مبرهنة تقارب المتتاليات الرتيبة تنص على: كل متتالية عددية متزايدة ومحدودة من الأعلى بعدد حقيقي M هي متتالية متقاربة، وكل متتالية متناقصة ومحدودة من الأدنى هي متتالية متقاربة.',
    difficulty: 'easy'
  },
  {
    id: 'ma_02',
    streamIds: ['sciences', 'math', 'technique_math'],
    subjectId: 'math',
    subjectName: 'الرياضيات',
    unitName: 'الدوال الأسية واللوغارتمية',
    question: 'قيمة النهاية الشهيرة lim (x ➔ 0) لـ (e^x - 1) / x تساوي:',
    options: [
      '0',
      '1',
      '+∞',
      '-1'
    ],
    correctIndex: 1,
    explanation: 'تمثل هذه النهاية العدد المشتق للدالة f(x) = e^x عند النقطة x0 = 0، وبما أن f\'(0) = e^0 = 1، فإن النهاية الشهيرة lim (x->0) (e^x - 1)/x = 1.',
    difficulty: 'easy'
  },
  {
    id: 'ma_03',
    streamIds: ['sciences', 'math', 'technique_math'],
    subjectId: 'math',
    subjectName: 'الرياضيات',
    unitName: 'الأعداد المركبة والتحويلات النقطية',
    question: 'في المستوي المركب، طبيعة التحويل النقطي المعرف بعبارته المركبة z\' = 2 * z + 3 - 2i هو:',
    options: [
      'دوران زاويته π/2 ومركزه مبدأ المعلم',
      'تحاكٍ (Homothétie) نسبته k = 2 وله نقطة صامدة تمثل مركزه',
      'انسحاب شعاعه V ذو اللاحقة 3 - 2i',
      'تناظر محوري بالنسبة لمحور الفواصل'
    ],
    correctIndex: 1,
    explanation: 'العبارة المركبة من الشكل z\' = a * z + b مع a عدد حقيقي غير معدوم ويختلف عن 1 (هنا a = 2). إذن هو تحاكٍ نسبته k = a = 2، ومركزه النقطة الصامدة ω = b / (1 - a).',
    difficulty: 'medium'
  },
  {
    id: 'ma_04',
    streamIds: ['sciences', 'math', 'technique_math', 'gestion'],
    subjectId: 'math',
    subjectName: 'الرياضيات',
    unitName: 'الاحتمالات والمتغير العشوائي',
    question: 'إذا كان A و B حادثتين مستقلتين من فضاء احتمالي، فإن احتمال تقاطعهما P(A ∩ B) يحسب بـ:',
    options: [
      'P(A) + P(B)',
      'P(A) * P(B)',
      'P(A) / P(B)',
      'P(A ∪ B) - 1'
    ],
    correctIndex: 1,
    explanation: 'شرط استقلال حادثتين A و B رياضياً هو أن تحقق العلاقة: P(A ∩ B) = P(A) * P(B).',
    difficulty: 'easy'
  },
  {
    id: 'ma_05',
    streamIds: ['math', 'technique_math'],
    subjectId: 'math',
    subjectName: 'الرياضيات',
    unitName: 'الحساب والقسمة في Z',
    question: 'إذا كان العدد الصحيح a يوافق 3 بترديد 5 (a ≡ 3 [5])، فإن باقي قسمة a² على 5 هو:',
    options: [
      '3',
      '4',
      '1',
      '2'
    ],
    correctIndex: 1,
    explanation: 'باستخدام خواص التوافقات: a ≡ 3 [5] يستلزم أن a² ≡ 3² [5]، و 9 = 5 * 1 + 4، إذن 9 ≡ 4 [5]، وبالتالي باقي قسمة a² على 5 هو 4.',
    difficulty: 'medium'
  },
  {
    id: 'ma_06',
    streamIds: ['lettres_philo', 'langues'],
    subjectId: 'math',
    subjectName: 'الرياضيات',
    unitName: 'المتتاليات لشعبة الآداب واللغات',
    question: 'في متتالية حسابية حدها الأول u1 = 2 وأساسها r = 3، قيمة الحد الرابع u4 هي:',
    options: [
      '8',
      '11',
      '14',
      '9'
    ],
    correctIndex: 1,
    explanation: 'عبارة الحد العام لمتتالية حسابية تبدأ بـ u1 هي: un = u1 + (n - 1) * r. بالتعويض لـ n = 4: u4 = 2 + (4 - 1) * 3 = 2 + 3 * 3 = 2 + 9 = 11.',
    difficulty: 'easy'
  },

  // =========================================================================
  // 🗺️ 4. التاريخ والجغرافيا (Histoire et Géographie)
  // =========================================================================
  {
    id: 'hg_01',
    streamIds: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues'],
    subjectId: 'hisgeo',
    subjectName: 'التاريخ والجغرافيا',
    unitName: 'تطور العالم وبروز الصراع (الحرب الباردة)',
    question: 'ما هو الهدف المعلن لمبدأ ترومان (Truman Doctrine) الصادر سنة 1947؟',
    options: [
      'بناء حلف وارسو العسكري لمواجهة حلف الناتو',
      'تقديم مساعدات مالية وعسكرية لليونان وتركيا لمنع انتشار المد الشيوعي السوفياتي',
      'تقسيم ألمانيا وبرلين إلى 4 مناطق احتلال عسكري',
      'تأسيس منظمة عدم الانحياز في مؤتمر باندونغ'
    ],
    correctIndex: 1,
    explanation: 'أعلن الرئيس الأمريكي هاري ترومان مشروعه في مارس 1947 لتقديم دعم مالي وعسكري بقيمة 400 مليون دولار لليونان وتركيا كإستراتيجية لتطويق النفوذ السوفياتي ومنع تمدد الشيوعية (سياسة الاحتواء).',
    difficulty: 'easy'
  },
  {
    id: 'hg_02',
    streamIds: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues'],
    subjectId: 'hisgeo',
    subjectName: 'التاريخ والجغرافيا',
    unitName: 'الثورة التحريرية الجزائرية (1954 - 1962)',
    question: 'ما هي أهم القرارات التنظيمية التي انبثقت عن مؤتمر الصومام التاريخي في 20 أوت 1956؟',
    options: [
      'حل جبهة التحرير الوطني وإعلان الهدنة المؤقتة',
      'إقرار مبدأ أولوية الداخل على الخارج وأولوية السياسي على العسكري وهيكلة جيش التحرير',
      'تأسيس الحكومة الجزائرية المؤقتة بالقاهرة',
      'مقاطعة محادثات إيفيان نهائياً'
    ],
    correctIndex: 1,
    explanation: 'أرسى مؤتمر الصومام هياكل الثورة الجزائرية وقواعدها التنظيمية بإقرار قيادة جماعية، إنشاء المجلس الوطني للثورة ولجنة التنسيق والتنفيذ، وإقرار أولويتي السياسي على العسكري والداخل على الخارج.',
    difficulty: 'medium'
  },
  {
    id: 'hg_03',
    streamIds: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues'],
    subjectId: 'hisgeo',
    subjectName: 'التاريخ والجغرافيا',
    unitName: 'القوى الاقتصادية الكبرى (الجغرافيا)',
    question: 'يُقصد بإقليم "حزام الشمس" (Sun Belt) في الولايات المتحدة الأمريكية:',
    options: [
      'الإقليم الشمالي الشرقي القديم المعروف بالصناعات الثقيلة والصدأ',
      'الأقاليم الجنوبية والغربية الحديثة النشطة ذات الصناعات التكنولوجية المتطورة والمناخ الدافئ',
      'السهول الكبرى المخصصة لزراعة الذرة والقمح فقط',
      'شبه جزيرة ألاسكا الغنية باحتياطيات النفط'
    ],
    correctIndex: 1,
    explanation: 'إقليم حزام الشمس (Sun Belt) يمتد عبر الولايات الجنوبية والغربية (مثل كاليفورنيا، تكساس، فلوريدا)، ويتميز بديناميكية سكانية وصناعات تكنولوجية فائقة (Silicon Valley والصناعات الفضائية والبتروكيماوية).',
    difficulty: 'medium'
  },
  {
    id: 'hg_04',
    streamIds: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues'],
    subjectId: 'hisgeo',
    subjectName: 'التاريخ والجغرافيا',
    unitName: 'حركة التحرر في العالم الثالث',
    question: 'تأسست حركة عدم الانحياز (Mouvement des non-alignés) بصفة رسمية في مؤتمر:',
    options: [
      'مؤتمر باندونغ 1955',
      'مؤتمر بلغراد 1961',
      'مؤتمر الجزائر 1973',
      'مؤتمر يالطا 1945'
    ],
    correctIndex: 1,
    explanation: 'رغم أن النواة التأسيسية والمبادئ وُضعت في مؤتمر باندونغ بإندونيسيا سنة 1955، إلا أن التأسيس الرسمي لمنظمة حركة عدم الانحياز كان في مؤتمر بلغراد بيوغسلافيا في سبتمبر 1961.',
    difficulty: 'medium'
  },

  // =========================================================================
  // 🕌 5. العلوم الإسلامية (Sciences Islamiques)
  // =========================================================================
  {
    id: 'is_01',
    streamIds: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues'],
    subjectId: 'islamic',
    subjectName: 'العلوم الإسلامية',
    unitName: 'مقاصد الشريعة الإسلامية',
    question: 'ترتيب مقاصد الشريعة الإسلامية من حيث الأهمية والأولوية والأصالة هو:',
    options: [
      'التحسينيات ثم الحاجيات ثم الضروريات',
      'الضروريات ثم الحاجيات ثم التحسينيات',
      'الحاجيات ثم الضروريات ثم التكميليات',
      'الضروريات والتحسينيات في مرتبة واحدة متساوية'
    ],
    correctIndex: 1,
    explanation: 'قسم علماء الأصول مقاصد الشريعة إلى ثلاث مراتب: الضروريات (الكليات الخمس: حفظ الدين، النفس، العقل، النسل، والمال)، تليها الحاجيات (ما يرفع الحرج والمشقة)، ثم التحسينيات (محاسن العادات ومكارم الأخلاق).',
    difficulty: 'easy'
  },
  {
    id: 'is_02',
    streamIds: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues'],
    subjectId: 'islamic',
    subjectName: 'العلوم الإسلامية',
    unitName: 'الربا والمعاملات المالية',
    question: 'يُعرَّف "ربا الفضل" شرعاً في الفقه الإسلامي بأنه:',
    options: [
      'الزيادة المشروطة مقابل تأجيل وتأخير سداد الدين',
      'بيع مطعومين أو نقدين من جنس واحد مع التفاضل والزيادة في أحدهما نقداً (يداً بيد)',
      'شراء بضاعة بالتقسيط مع بيعها فورياً لطرف ثالث',
      'اقتراض مال مع الرهن العقاري التوثيقي'
    ],
    correctIndex: 1,
    explanation: 'ربا الفضل هو بيع الجنس الواحد من الأموال الربوية (مثل الذهب بالذهب، أو القمح بالقمح) مع زيادة في أحد البدلين في مجلس العقد دون تأجيل، وهو محرم بنص حديث الأصناف الستة.',
    difficulty: 'medium'
  },
  {
    id: 'is_03',
    streamIds: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues'],
    subjectId: 'islamic',
    subjectName: 'العلوم الإسلامية',
    unitName: 'وسائل القرآن في تثبيت العقيدة',
    question: 'من وسائل القرآن الكريم المعتمدة في تثبيت العقيدة، إثارة الوجدان والتفكر عبر:',
    options: [
      'التذكير بمراقبة الله وقدرته في الكون، ورسم الصور المحببة للمؤمنين',
      'استخدام القياس المنطقي الأرسطي المجرد دون شواهد حسية',
      'فرض الإيمان بالقوة والإلزام الجبري',
      'التركيز على العقوبات الدنيوية فقط'
    ],
    correctIndex: 0,
    explanation: 'يعتمد القرآن وسائل محددة لتثبيت العقيدة: إثارة العقل والوجدان، التذكير بقدرة الله ومراقبته، رسم الصور المحببة للمؤمنين، رسم صور الكافرين المنفرة، ومناقشة الانحرافات بالحجة والبرهان.',
    difficulty: 'easy'
  },

  // =========================================================================
  // 🤔 6. الفلسفة (Philosophie)
  // =========================================================================
  {
    id: 'philo_01',
    streamIds: ['lettres_philo', 'sciences', 'math', 'technique_math', 'gestion', 'langues'],
    subjectId: 'philo',
    subjectName: 'الفلسفة',
    unitName: 'السؤال العلمي والسؤال الفلسفي',
    question: 'يمتاز السؤال العلمي عن السؤال الفلسفي من حيث المجال والمنهج بأنه:',
    options: [
      'يبحث في الماورائيات والميتافيزيقا ويعتمد على التأمل العقلي المطلق',
      'يتناول الظواهر الطبيعية المحسوسة الجزئية ويعتمد على الملاحظة والفرضية والتجربة المخبرية',
      'يصل إلى نتائج قطعية مطلقة غير قابلة للتعديل أو الدحض',
      'يبحث في الغايات الأولى للوجود الإنساني والأخلاق'
    ],
    correctIndex: 1,
    explanation: 'مجال العلم هو عالم الطبيعة والظواهر الفيزيائية المحسوسة (عالم المادة)، ويعتمد على المنهج التجريبي الاستقرائي وصياغة القوانين الرياضية الكمية، خلافاً للفلسفة التي تبحث في الكليات والعلل الأولى.',
    difficulty: 'easy'
  },
  {
    id: 'philo_02',
    streamIds: ['lettres_philo'],
    subjectId: 'philo',
    subjectName: 'الفلسفة',
    unitName: 'اللغة والفكر (الدال والمدلول)',
    question: 'يذهب الاتجاه الاصطلاحي المعاصر (فرديناند دي سوسير Ferdinand de Saussure) إلى أن العلاقة بين اللفظ (الدال) والمعنى (المدلول) هي علاقة:',
    options: [
      'ضرورية ذاتية وطبيعية تحاكي أصوات الطبيعة',
      'اعتباطية تحكمية اصطلاحية مبنية على التواضع والمواضعة الاجتماعية',
      'بيولوجية فطرية متوارثة جينياً عبر الأجيال',
      'رياضية ثابتة لا تقبل التغير بتغير الزمن والبيئات'
    ],
    correctIndex: 1,
    explanation: 'يرى سوسير ومعه اللسانيون المعاصرون أن العلاقة بين الدال والمدلول علاقة اعتباطية غير مبررة ذاتياً (Arbitraire)، بدليل تعدد اللغات وتسمية الشيء الواحد بأسماء متباينة في مختلف الثقافات.',
    difficulty: 'medium'
  },
  {
    id: 'philo_03',
    streamIds: ['lettres_philo', 'gestion'],
    subjectId: 'philo',
    subjectName: 'الفلسفة',
    unitName: 'الأنظمة الاقتصادية',
    question: 'يرى المذهب الرأسمالي الليبرالي (آدم سميث Adam Smith) أن أساس الازدهار الاقتصادي يقوم على:',
    options: [
      'ملكية الدولة العامة لوسائل الإنتاج والتخطيط المركزي الموجه',
      'الملكية الفردية الخاصة، حرية المبادرة الفردية، والمنافسة الحرة (دعه يعمل دعه يمر)',
      'إلغاء الطبقية وتوزيع الثروات بحسب الحاجة فقط',
      'تأميم جميع البنوك والمصانع وفرض أسعار جبرية للمنتجات'
    ],
    correctIndex: 1,
    explanation: 'يقوم النظام الرأسمالي على مبادئ: الملكية الفردية لوسائل الإنتاج، دافع الربح الشخصي، المنافسة الحرة، وقانون العرض والطلب لتحديد الأسعار تلقائياً دون تدخل الدولة (اليد الخفية لآدم سميث).',
    difficulty: 'easy'
  },

  // =========================================================================
  // 📖 7. اللغة العربية وآدابها (Langue Arabe)
  // =========================================================================
  {
    id: 'ar_01',
    streamIds: ['lettres_philo', 'langues', 'sciences', 'math', 'technique_math', 'gestion'],
    subjectId: 'arabic',
    subjectName: 'اللغة العربية وآدابها',
    unitName: 'القواعد والإعراب التقديري',
    question: 'في الجملة: "يسعى الفتى إلى العلا"، تُعرب كلمة "الفتى":',
    options: [
      'فاعلاً مرفوعاً وعلامة رفعه الضمة الظاهرة على آخره',
      'فاعلاً مرفوعاً وعلامة رفعه الضمة المقدرة على الألف منع من ظهورها التعذر',
      'مفعولاً به منصوباً بالفتحة المقدرة للثقل',
      'مبتدأ مؤخراً مرفوعاً بالواو نيابة عن الضمة'
    ],
    correctIndex: 1,
    explanation: 'الفتى اسم مقصور ينتهي بألف لازمة، فالحركات الإعرابية تقدر عليه جميعها (رفعاً ونصباً وجراً) لمانع "التعذر" (استحالة نطق الحركة على الألف مطلقاً)، بينما تقدر على الياء والواو لمانع "الثقل".',
    difficulty: 'easy'
  },
  {
    id: 'ar_02',
    streamIds: ['lettres_philo', 'langues', 'sciences', 'math', 'technique_math', 'gestion'],
    subjectId: 'arabic',
    subjectName: 'اللغة العربية وآدابها',
    unitName: 'الظواهر الأدبية الحديثة',
    question: 'يُعرَّف "الالتزام" (L\'engagement) في الشعر العربي المعاصر بأنه:',
    options: [
      'الالتزام الصارم ببحور الخليل بن أحمد الفراهيدي والقافية الموحدة',
      'أن يسخر الأديب قلمه وإبداعه لخدمة قضايا أمته السياسية والاجتماعية مشاركاً آلامهم ومقترحاً الحلول',
      'الانعزال عن المجتمع والتغني بالطبيعة المجردة والهموم الذاتية الضيقة',
      'الاقتصار على مدح الملوك والزعماء ونيل المكافآت المالية'
    ],
    correctIndex: 1,
    explanation: 'الالتزام هو موقف فكري وإنساني يجعل فيه الشاعر فنه في خدمة قضايا وطنه وأمته (كالتحرر من الاستعمار ومحاربة الجهل والظلم)، والشاعر مفدي زكريا ومحمود درويش من أبرز رواده في البكالوريا.',
    difficulty: 'easy'
  },
  {
    id: 'ar_03',
    streamIds: ['lettres_philo', 'langues'],
    subjectId: 'arabic',
    subjectName: 'اللغة العربية وآدابها',
    unitName: 'الصور البيانية والبلاغة',
    question: 'في قول الشاعر: "واشتعل الرأس شيباً"، نوع الصورة البيانية وسر بلاغتها:',
    options: [
      'تشبيه بليغ حذفت فيه الأداة ووجه الشبه للتوضيح',
      'استعارة مكنية؛ شبه الشيب بالنار وحذف المشبه به ورمز له بشيء من لوازمه (اشتعل) للتجسيم وبيان سرعة الانتشار',
      'استعارة تصريحية صرح فيها بالمشبه به وحذف المشبه',
      'كناية عن موصوف وهو الوجه المبتسم'
    ],
    correctIndex: 1,
    explanation: 'استعارة مكنية: شبه بياض الشيب بالنار المشتعلة في الحطب وسرعة سريانها، ثم حذف المشبه به (النار) وترك قرينة دالة عليه وهي فعل (اشتعل) على سبيل الاستعارة المكنية، وسر بلاغتها التجسيم وتأكيد انتشار الشيب.',
    difficulty: 'medium'
  },

  // =========================================================================
  // 🇫🇷 8. اللغة الفرنسية (Français BAC)
  // =========================================================================
  {
    id: 'fr_01',
    streamIds: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues'],
    subjectId: 'french',
    subjectName: 'اللغة الفرنسية',
    unitName: 'Le texte d\'histoire (نص التاريخ)',
    question: 'Dans un texte d\'histoire sur la guerre de libération algérienne, la visée communicative principale de l\'auteur est généralement de :',
    options: [
      'Divertir le lecteur avec des récits imaginaires et fantastiques',
      'Informer, témoigner, et rendre hommage aux sacrifices des martyrs et du peuple',
      'Donner des consignes médicales ou scientifiques aux combattants',
      'Critiquer la révolution et inciter à la reddition'
    ],
    correctIndex: 1,
    explanation: 'Dans le texte d\'histoire du BAC algérien, la visée communicative (l\'intention de l\'auteur) est informative et commémorative : faire connaître des événements historiques réels, apporter des témoignages et rendre hommage aux acteurs de la Révolution.',
    difficulty: 'easy'
  },
  {
    id: 'fr_02',
    streamIds: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues'],
    subjectId: 'french',
    subjectName: 'اللغة الفرنسية',
    unitName: 'Le texte argumentatif (النص الحجاجي)',
    question: 'Quelle est la fonction d\'une "thèse réfutée" (ou antithèse) dans un texte argumentatif polémique ?',
    options: [
      'L\'opinion que l\'auteur soutient et défend de toutes ses forces',
      'L\'opinion adverse que l\'auteur rejette et cherche à démolir à l\'aide d\'arguments et de contre-exemples',
      'Une simple phrase d\'introduction sans rapport avec le sujet',
      'La conclusion finale du texte où l\'auteur remercie ses lecteurs'
    ],
    correctIndex: 1,
    explanation: 'La thèse réfutée représente la position opposée à celle de l\'auteur. L\'auteur l\'introduit pour la contredire, la discréditer et prouver la validité de sa propre thèse (thèse défendue).',
    difficulty: 'medium'
  },
  {
    id: 'fr_03',
    streamIds: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues'],
    subjectId: 'french',
    subjectName: 'اللغة الفرنسية',
    unitName: 'L\'appel et le discours exhortatif (النص الإرشادي / النداء)',
    question: 'Un texte exhortatif (l\'appel) s\'articule rigoureusement autour de trois parties ordonnées :',
    options: [
      'Introduction romanesque, poème lyrique, et conclusion politique',
      'La partie expositive (constat négatif), la partie argumentative (nécessité du changement), et l\'appel (l\'incitation à l\'action)',
      'Une thèse, une synthèse, et des remerciements',
      'Le passé simple, l\'imparfait, et le plus-que-parfait'
    ],
    correctIndex: 1,
    explanation: 'La structure canonique de l\'appel au BAC comprend : 1) Le constat d\'une situation insatisfaisante ou alarmante ; 2) La nécessité urgente d\'agir (arguments) ; 3) L\'appel proprement dit marqué par l\'impératif et les verbes d\'obligation (exhortation).',
    difficulty: 'medium'
  },

  // =========================================================================
  // 🇬🇧 9. اللغة الإنجليزية (English BAC)
  // =========================================================================
  {
    id: 'en_01',
    streamIds: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues'],
    subjectId: 'english',
    subjectName: 'اللغة الإنجليزية',
    unitName: 'Ethics in Business (الأخلاق في المعاملات)',
    question: 'What is the exact definition of "Counterfeiting" in the business and legal world?',
    options: [
      'Donating large sums of money to non-profit charitable organizations',
      'The illegal manufacturing and selling of imitation products bearing a brand name without authorization',
      'Paying annual taxes on time to government revenue services',
      'Hiring skilled employees and offering fair minimum wages'
    ],
    correctIndex: 1,
    explanation: 'Counterfeiting (التقليد / التزوير) is the fraudulent practice of forging or copying authentic genuine goods (clothing, medicines, electronics) to deceive consumers and gain illicit profits, which is heavily punished by law.',
    difficulty: 'easy'
  },
  {
    id: 'en_02',
    streamIds: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues'],
    subjectId: 'english',
    subjectName: 'اللغة الإنجليزية',
    unitName: 'Grammar: Expressing Wish and Regret',
    question: 'Choose the grammatically correct sentence expressing a regret about an event in the past:',
    options: [
      'I wish I study harder for yesterday\'s exam.',
      'I wish I had studied harder for yesterday\'s exam.',
      'I wish I will study harder yesterday.',
      'I wish I am studying harder right now.'
    ],
    correctIndex: 1,
    explanation: 'To express a past regret with "wish", we always use the Past Perfect tense: Subject + wish + Subject + had + Past Participle (e.g., "I wish I had studied").',
    difficulty: 'medium'
  },
  {
    id: 'en_03',
    streamIds: ['lettres_philo', 'langues', 'sciences', 'math'],
    subjectId: 'english',
    subjectName: 'اللغة الإنجليزية',
    unitName: 'Ancient Civilizations (الحضارات القديمة)',
    question: 'Which ancient civilization is credited with inventing the earliest known form of writing (Cuneiform)?',
    options: [
      'The Roman Empire in Western Europe',
      'The Sumerians of Ancient Mesopotamia',
      'The Maya Civilization in Central America',
      'The Vikings of Scandinavia'
    ],
    correctIndex: 1,
    explanation: 'The Sumerians of Mesopotamia (present-day Iraq) developed Cuneiform writing (الكتابة المسمارية) around 3400 BC on clay tablets, marking the beginning of recorded human history.',
    difficulty: 'easy'
  },

  // =========================================================================
  // 🇪🇸 10. اللغة الإسبانية (Espagnol BAC - Langues)
  // =========================================================================
  {
    id: 'es_01',
    streamIds: ['langues'],
    subjectId: 'spanish',
    subjectName: 'اللغة الإسبانية',
    unitName: 'Gramática y Verbos en Subjuntivo',
    question: 'Completa la frase con la forma correcta del verbo: "Espero que todos los estudiantes ________ el examen de selectividad."',
    options: [
      'aprueban (Presente de Indicativo)',
      'aprueben (Presente de Subjuntivo)',
      'aprobaron (Pretérito Indefinido)',
      'aprobar (Infinitivo)'
    ],
    correctIndex: 1,
    explanation: 'Los verbos de deseo o esperanza (como "esperar que") exigen obligatoriamente el modo Subjuntivo en la oración subordinada. Con el sujeto plural "los estudiantes", la forma correcta es "aprueben".',
    difficulty: 'easy'
  },

  // =========================================================================
  // 🇩🇪 11. اللغة الألمانية (Allemand BAC - Langues)
  // =========================================================================
  {
    id: 'de_01',
    streamIds: ['langues'],
    subjectId: 'german',
    subjectName: 'اللغة الألمانية',
    unitName: 'Die Passivform im Deutschen',
    question: 'Wie lautet die korrekte Passivform des Satzes: "Der Lehrer korrigiert die Prüfungen."?',
    options: [
      'Die Prüfungen werden von dem Lehrer korrigiert.',
      'Die Prüfungen haben der Lehrer korrigieren.',
      'Der Lehrer wird die Prüfungen korrigieren.',
      'Die Prüfungen sind der Lehrer korrigiert.'
    ],
    correctIndex: 0,
    explanation: 'Das Passiv Präsens im Deutschen wird mit dem Hilfsverb "werden" im Präsens + Partizip II des Hauptverbs gebildet. Da "die Prüfungen" Plural ist: "werden ... korrigiert".',
    difficulty: 'medium'
  },

  // =========================================================================
  // 🇮🇹 12. اللغة الإيطالية (Italien BAC - Langues)
  // =========================================================================
  {
    id: 'it_01',
    streamIds: ['langues'],
    subjectId: 'italian',
    subjectName: 'اللغة الإيطالية',
    unitName: 'Il Passato Prossimo',
    question: 'Qual è la forma corretta del passato prossimo per il verbo "andare" con soggetto femminile singolare: "Maria ________ a Roma ieri."?',
    options: [
      'ha andato',
      'è andata',
      'sono andate',
      'ha andata'
    ],
    correctIndex: 1,
    explanation: 'I verbi di movimento come "andare" prendono sempre l\'ausiliare "essere" al passato prossimo, e il participio passato si accorda in genere e numero con il soggetto: Maria (femminile singolare) -> "è andata".',
    difficulty: 'easy'
  },

  // =========================================================================
  // 📊 13. التسيير المحاسبي والمالي (Gestion et Économie)
  // =========================================================================
  {
    id: 'gf_01',
    streamIds: ['gestion'],
    subjectId: 'gestion_fin',
    subjectName: 'التسيير المحاسبي والمالي',
    unitName: 'الاهتلاكات ونقص قيمة التثبيتات',
    question: 'في طريقة الاهتلاك الخطي (Amortissement linéaire)، يُحسب قسط الاهتلاك السنوي (Annuité d\'amortissement A) بالعلاقة:',
    options: [
      'A = القيمة المحاسبية الصافية VNC * معدل الفائدة المركبة',
      'A = المبلغ القابل للاهتلاك Base Amortissable (المبلغ الأصلي - القيمة المتبقية) * معدل الاهتلاك الخطي (t)',
      'A = مجموع أقساط الاهتلاك للسنوات السابقة مقسوماً على 2',
      'A = سعر البيع الصافي ناقص الخسارة المؤكدة'
    ],
    correctIndex: 1,
    explanation: 'وفق النظام المحاسبي المالي الجزائري (SCF)، قسط الاهتلاك الخطي ثابت سنوياً ويحسب بضرب القاعدة القابلة للاهتلاك (تكلفة الحيازة - القيمة المتبقية المحتملة) في معدل الاهتلاك الخطي t = 100 / N.',
    difficulty: 'easy'
  },
  {
    id: 'gf_02',
    streamIds: ['gestion'],
    subjectId: 'gestion_fin',
    subjectName: 'التسيير المحاسبي والمالي',
    unitName: 'تسوية المخزونات وحساب النتائج',
    question: 'في حساب النتائج حسب الطبيعة، يمثل "حساب 70 (المبيعات والمنتجات الملحقة)" ناقص "حساب 609 (تخفيضات تجارية)" العنصر الأساسي لحساب:',
    options: [
      'النتيجة الإجمالية خارج الاستغلال',
      'رقم الأعمال الإجمالي الصافي (Chiffre d\'affaires)',
      'مجموع الأعباء المالية وحسابات الضرائب المؤجلة',
      'القدرة على التمويل الذاتي CAF'
    ],
    correctIndex: 1,
    explanation: 'رقم الأعمال الإجمالي الصافي يحسب بطرح التخفيضات والتنزيلات والحسومات التجارية الممنوحة للزبائن من إجمالي مبيعات البضائع والمنتجات المصنعة.',
    difficulty: 'medium'
  },

  // =========================================================================
  // 📈 14. الاقتصاد والمناجمنت (Économie et Management)
  // =========================================================================
  {
    id: 'ec_01',
    streamIds: ['gestion'],
    subjectId: 'economy',
    subjectName: 'الاقتصاد والمناجمنت',
    unitName: 'النقود والكتلة النقدية',
    question: 'أيٌّ مما يلي يُعد من الوظائف الأساسية للنقود في الاقتصاد المعاصر؟',
    options: [
      'تجميد المبادلات وحصر التجارة في المقايضة المباشرة',
      'مقياس للقيمة (وحدة حساب)، وسيط للمبادلات، ومستودع للقيمة والادخار',
      'إلغاء المعاملات الآجلة والائتمانية',
      'تثبيت أسعار جميع المنتجات إجبارياً دون مراعاة قوى السوق'
    ],
    correctIndex: 1,
    explanation: 'تؤدي النقود في الاقتصاد الحديث ثلاث وظائف رئيسية: 1. مقياس موحد لقيم السلع والخدمات؛ 2. وسيط عام ومقبول للمبادلات والتداول؛ 3. أداة للاحتياط ومستودع آمن للقيم والقوة الشرائية للإنفاق المستقبلي.',
    difficulty: 'easy'
  },
  {
    id: 'ec_02',
    streamIds: ['gestion'],
    subjectId: 'economy',
    subjectName: 'الاقتصاد والمناجمنت',
    unitName: 'التضخم والسياسة النقدية',
    question: 'يُعرَّف التضخم (Inflation) في علم الاقتصاد بأنه:',
    options: [
      'ارتفاع مؤقت في سعر سلعة زراعية واحدة نتيجة موجة جفاف',
      'الارتفاع المستمر والملموس في المستوى العام للأسعار مصحوباً بانخفاض القوة الشرائية للعملة',
      'انخفاض كمية النقود المتداولة في السوق مقارنة بالسلع',
      'تراجع الصادرات الوطنية مقابل ارتفاع الواردات'
    ],
    correctIndex: 1,
    explanation: 'التضخم ليس ارتفاعاً عارضاً في سلعة واحدة، بل هو حركة تصاعدية مستمرة وشاملة للمستوى العام لجميع الأسعار تؤدي إلى تآكل القوة الشرائية للنقود الوطنية.',
    difficulty: 'easy'
  },

  // =========================================================================
  // ⚖️ 15. القانون (Droit)
  // =========================================================================
  {
    id: 'dr_01',
    streamIds: ['gestion'],
    subjectId: 'droit',
    subjectName: 'القانون',
    unitName: 'عقد العمل',
    question: 'ينتهي عقد العمل الفردي قانوناً وبصفة مشروعة بأحد الأسباب التالية وفق القانون 90-11:',
    options: [
      'تغيير العنوان السكني للموظف دون إشعار مسبق',
      'البطلان أو انقضاء الأجل، الاستقالة، العجز الكلي، التسريح القانوني، أو التقاعد والوفاة',
      'مطالبة العامل بزيادة الأجر وفق التضخم السنوي',
      'انضمام العامل لنقابة عمالية قانونية معتمدة'
    ],
    correctIndex: 1,
    explanation: 'حدد المشرع الجزائري في قانون العمل 90-11 أسباب انقضاء علاقة العمل: الانقضاء القانوني لأجل العقد المحدد، الاستقالة، العزل لخطأ جسيم، العجز الكلي، التقاعد، التسريح لتقليص العمال، والوفاة.',
    difficulty: 'medium'
  },
  {
    id: 'dr_02',
    streamIds: ['gestion'],
    subjectId: 'droit',
    subjectName: 'القانون',
    unitName: 'عقد البيع التجاري والمدني',
    question: 'من الالتزامات الجوهرية التي تقع على عاتق البائع بموجب عقد البيع الصحيح:',
    options: [
      'دفع الثمن النقدي المتفق عليه وتسلم المبيع فوراً',
      'نقل ملكية المبيع، تسليم المبيع للمشتري، وضمان العيوب الخفية وعدم التعرض والاستحقاق',
      'توفير العمل اليومي للمشتري وتأمينه اجتماعياً',
      'تحمل تكاليف نقل المشتري وأسرته'
    ],
    correctIndex: 1,
    explanation: 'يلتزم البائع بنقل الملكية للمشتري، تسليم الشيء المبيع بالحالة التي كان عليها وقت البيع، وضمان السلامة من العيوب الخفية التي تنقص من قيمته أو منفعته، وضمان عدم التعرض المادي والقانوني.',
    difficulty: 'easy'
  },

  // =========================================================================
  // ⚙️ 16. الهندسة والتقني الرياضي (Technique Mathématique)
  // =========================================================================
  {
    id: 'tm_01',
    streamIds: ['technique_math'],
    subjectId: 'genie_civil',
    subjectName: 'الهندسة المدنية',
    unitName: 'التحريضات البسيطة (الشد والانضغاط)',
    question: 'في التحريض البسيط بالشد، يُعبَّر عن شرط المقاومة للقطعة بالمتباينة التالية:',
    options: [
      'الإجهاد الناظمي σ = N / S ≤ الإجهاد التطبيقي المسموح به σ_bar',
      'الإجهاد المماسي τ = T / S > معامل الأمان الإجمالي s',
      'الاستطالة المطلقة ΔL = 0 في جميع حالات التحميل',
      'عزم الانحناء Mf = N * L'
    ],
    correctIndex: 0,
    explanation: 'شرط المقاومة في الشد البسيط ينص على ألا يتجاوز الإجهاد الناظمي الأقصى المطبق (σ = N/S) قيمة الإجهاد المسموح به للمادة (σ_bar = Re / s).',
    difficulty: 'medium'
  },
  {
    id: 'tm_02',
    streamIds: ['technique_math'],
    subjectId: 'genie_mecanique',
    subjectName: 'الهندسة الميكانيكية',
    unitName: 'نقل الحركة والمسننات',
    question: 'نسبة نقل الحركة (Rapport de transmission r) بين مسننين تدور أسنانهما بدون انزلاق تحسب بالعلاقة:',
    options: [
      'r = N_sortie / N_entrée = Z_menante / Z_menée',
      'r = N_entrée * N_sortie',
      'r = Z_menée / Z_menante',
      'r = القطر الابتدائي d / الخطوة p'
    ],
    correctIndex: 0,
    explanation: 'نسبة النقل r هي النسبة بين سرعة الدوران للشجرة المستقبلة (N_sortie) إلى الشجرة المحركة (N_entrée)، وتساوي عدد أسنان المسنن القائد على عدد أسنان المسنن المنقاد (Z_menante / Z_menée).',
    difficulty: 'medium'
  },
  {
    id: 'tm_03',
    streamIds: ['technique_math'],
    subjectId: 'genie_electrique',
    subjectName: 'الهندسة الكهربائية',
    unitName: 'المنطق التعاقبي والقلابات',
    question: 'في القلاب JK (Bascule JK) المتزامن، عند تطبيق المدخلين J = 1 و K = 1 مع ورود جبهة الساعة، تكون حالة المخرج Q هي:',
    options: [
      'الاحتفاظ بالحالة السابقة (Mémorisation)',
      'التبديل والتناوب (Basculement: Q = Q_barre السابق)',
      'الحالة المحظورة الممنوعة (État indéterminé)',
      'الإرجاع إلى الصفر الإجباري (Remise à zéro)'
    ],
    correctIndex: 1,
    explanation: 'تم تصميم القلاب JK خصيصاً لتجاوز الحالة المحظورة في القلاب RS. فعند تطبيق J=1 و K=1 يقوم القلاب بعكس حالته السابقة في كل نبضة ساعة (وضعية التبديل Basculement / Toggle).',
    difficulty: 'medium'
  },
  {
    id: 'tm_04',
    streamIds: ['technique_math'],
    subjectId: 'genie_procedes',
    subjectName: 'هندسة الطرائق',
    unitName: 'الكيمياء العضوية وتفاعلات الأسترة',
    question: 'تفاعل الأسترة بين حمض كربوكسيلي وكحول أولي يتميز بأنه تفاعل:',
    options: [
      'تام وسريع جداً وحراري بشدة',
      'عكوس وبطيء ولا حراري، ويصل إلى توازن كيميائي عند مردود تقريبي 67%',
      'تفاعل أحادي الاتجاه غير عكوس',
      'يتطلب درجات حرارة تفوق 1000°م لحدوثه'
    ],
    correctIndex: 1,
    explanation: 'تفاعل الأسترة بين حمض وكحول أولي بنسب متساوية في كمية المادة هو تفاعل عكوس، محدود، وبطيء، يصل إلى حالة توازن عند مردود r ≈ 67% (حيث تتساوى سرعة الأسترة مع سرعة الإماهة).',
    difficulty: 'medium'
  }
];

export default QUIZ_QUESTIONS;
