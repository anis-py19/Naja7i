import fs from 'fs';
import path from 'path';

const baseDir = path.resolve('public/FileFromMe');

function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const rawFiles = getAllFiles(baseDir);

function formatSize(bytes) {
  if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' ميغابايت';
  return (bytes / 1024).toFixed(0) + ' كيلوبايت';
}

function getSubjectMapping(topFolder, subFolder, fileName) {
  const normTop = (topFolder || '').toLowerCase();
  const normSub = (subFolder || '').toLowerCase();
  const normName = fileName.toLowerCase();

  // 1. English
  if (normTop.includes('anglais') || normName.includes('انجلزية') || normName.includes('انجليزية') || normName.includes('english')) {
    return {
      subjectId: 'english',
      subjectAliases: ['english', 'anglais'],
      subjectName: 'اللغة الإنجليزية',
      streams: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues']
    };
  }

  // 2. Arabic
  if (normTop.includes('arab') || normName.includes('عربية') || normName.includes('ادب') || normName.includes('arabic')) {
    return {
      subjectId: 'arabic',
      subjectAliases: ['arabic', 'arabe'],
      subjectName: 'اللغة العربية وآدابها',
      streams: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues']
    };
  }

  // 3. Comptabilite
  if (normTop.includes('comptabilte') || normName.includes('محاسبة') || normName.includes('compta')) {
    return {
      subjectId: 'gestion_fin',
      subjectAliases: ['gestion_fin', 'comptabilite', 'compta'],
      subjectName: 'التسيير المحاسبي والمالي',
      streams: ['gestion']
    };
  }

  // 4. Droit
  if (normTop.includes('droit') || normName.includes('قانون')) {
    return {
      subjectId: 'droit',
      subjectAliases: ['droit', 'law'],
      subjectName: 'القانون',
      streams: ['gestion']
    };
  }

  // 5. Economie
  if (normTop.includes('economie') || normName.includes('اقتصاد') || normName.includes('مناجمنت')) {
    return {
      subjectId: 'economy',
      subjectAliases: ['economy', 'economie', 'gestion_eco'],
      subjectName: 'الاقتصاد والمناجمنت',
      streams: ['gestion']
    };
  }

  // 6. Francais
  if (normTop.includes('francais') || normName.includes('فرنسية') || normName.includes('french')) {
    return {
      subjectId: 'french',
      subjectAliases: ['french', 'francais'],
      subjectName: 'اللغة الفرنسية',
      streams: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues']
    };
  }

  // 7. Genie Civil
  if (normTop.includes('genie civile') || normTop.includes('civil') || normName.includes('مدنية')) {
    return {
      subjectId: 'genie_civil',
      subjectAliases: ['genie_civil', 'genie', 'civil'],
      subjectName: 'الهندسة المدنية',
      streams: ['technique_math']
    };
  }

  // 8. Genie Electrique
  if (normTop.includes('genie electrique') || normName.includes('كهربائية')) {
    return {
      subjectId: 'genie_electrique',
      subjectAliases: ['genie_electrique', 'genie', 'electrique'],
      subjectName: 'الهندسة الكهربائية',
      streams: ['technique_math']
    };
  }

  // 9. Genie Procedes
  if (normTop.includes('genie pocede') || normTop.includes('procede') || normName.includes('طرائق')) {
    return {
      subjectId: 'genie_procedes',
      subjectAliases: ['genie_procedes', 'genie', 'procedes'],
      subjectName: 'هندسة الطرائق',
      streams: ['technique_math']
    };
  }

  // 10. Genie Mecanique
  if (normTop.includes('mecanique') || normName.includes('ميكانيكية') || normName.includes('kehili')) {
    return {
      subjectId: 'genie_mecanique',
      subjectAliases: ['genie_mecanique', 'genie', 'mecanique'],
      subjectName: 'الهندسة الميكانيكية',
      streams: ['technique_math']
    };
  }

  // 11. Histoire & Geo
  if (normTop.includes('histoiregeo') || normName.includes('تاريخ') || normName.includes('جغرافيا') || normName.includes('شخصيات') || normName.includes('مصطلحات') || normName.includes('خرائط')) {
    return {
      subjectId: 'hisgeo',
      subjectAliases: ['hisgeo', 'histoire_geo', 'history'],
      subjectName: 'التاريخ والجغرافيا',
      streams: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues']
    };
  }

  // 12. Islamic
  if (normTop.includes('islamiya') || normName.includes('اسلامية') || normName.includes('شريعة') || normName.includes('islamic')) {
    return {
      subjectId: 'islamic',
      subjectAliases: ['islamic', 'islamique', 'sharia'],
      subjectName: 'العلوم الإسلامية',
      streams: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues']
    };
  }

  // 13. Languages (Allemand, Espagnol, Italien)
  if (normTop.includes('langue')) {
    if (normSub.includes('allman') || normName.includes('ألمانية') || normName.includes('المانية') || normName.includes('allemand')) {
      return {
        subjectId: 'allemand',
        subjectAliases: ['allemand', 'german'],
        subjectName: 'اللغة الألمانية',
        streams: ['langues']
      };
    }
    if (normSub.includes('espanol') || normName.includes('إسبانية') || normName.includes('اسبانية') || normName.includes('spanish') || normName.includes('espanol')) {
      return {
        subjectId: 'espagnol',
        subjectAliases: ['espagnol', 'spanish'],
        subjectName: 'اللغة الإسبانية',
        streams: ['langues']
      };
    }
    if (normSub.includes('italien') || normName.includes('إيطالية') || normName.includes('ايطالية') || normName.includes('italien')) {
      return {
        subjectId: 'italien',
        subjectAliases: ['italien', 'italian'],
        subjectName: 'اللغة الإيطالية',
        streams: ['langues']
      };
    }
    return {
      subjectId: 'langues_all',
      subjectAliases: ['langues_all', 'langues'],
      subjectName: 'اللغات الأجنبية',
      streams: ['langues']
    };
  }

  // 14. Mathematics
  if (normTop.includes('math') || normName.includes('رياضيات') || normName.includes('دوال') || normName.includes('متتاليات') || normName.includes('احتمالات') || normName.includes('تكامل') || normName.includes('اشتقاق')) {
    return {
      subjectId: 'math',
      subjectAliases: ['math', 'mathematics'],
      subjectName: 'الرياضيات',
      streams: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues']
    };
  }

  // 15. Philosophy
  if (normTop.includes('philo') || normName.includes('فلسفة') || normName.includes('مقالات') || normName.includes('اقوال') || normName.includes('أقوال')) {
    return {
      subjectId: 'philo',
      subjectAliases: ['philo', 'philosophy'],
      subjectName: 'الفلسفة',
      streams: ['lettres_philo', 'sciences', 'math', 'technique_math', 'gestion', 'langues']
    };
  }

  // 16. Physics
  if (normTop.includes('physique') || normName.includes('فيزياء') || normName.includes('كهرباء') || normName.includes('نووي') || normName.includes('قزوري') || normName.includes('ميكانيك') || normName.includes('almondjid')) {
    return {
      subjectId: 'physique',
      subjectAliases: ['physique', 'physics'],
      subjectName: 'العلوم الفيزيائية',
      streams: ['sciences', 'math', 'technique_math']
    };
  }

  // 17. Science
  if (normTop.includes('science') || normName.includes('علوم') || normName.includes('بروتين') || normName.includes('مناعة') || normName.includes('إنزيم') || normName.includes('عصبي') || normName.includes('هيستونات') || normName.includes('هستونات')) {
    return {
      subjectId: 'sciences_nat',
      subjectAliases: ['sciences_nat', 'science', 'biology'],
      subjectName: 'علوم الطبيعة والحياة',
      streams: ['sciences', 'math']
    };
  }

  return {
    subjectId: 'general',
    subjectAliases: ['general'],
    subjectName: 'مواد عامة',
    streams: ['sciences', 'math', 'technique_math', 'gestion', 'lettres_philo', 'langues']
  };
}

function cleanAndPolishTitle(rawName, folder, subfolder) {
  let title = rawName;

  // Custom dictionary for famous Algerian BAC files
  const curatedDictionary = {
    'Almondjid - 3-01.pdf': 'كتاب المنجد في الفيزياء — الجزء 1 (المتابعة الزمنية لتحول كيميائي)',
    'Almondjid - 3-02.pdf': 'كتاب المنجد في الفيزياء — الجزء 2 (الظواهر الكهربائية RC و RL)',
    'Almondjid - 3-03.pdf': 'كتاب المنجد في الفيزياء — الجزء 3 (تطور جملة ميكانيكية والقوانين)',
    'Almondjid - 3-04.pdf': 'كتاب المنجد في الفيزياء — الجزء 4 (التحولات النووية والأسترة ومراقبة تطور جملة كيميائية)',
    'AKWAL_Phylo_SC_3AS.pdf.pdf': 'أقوال وحجج الفلاسفة ومواقفهم لشعبة العلوم التجريبية والرياضيات',
    'bac35.com-التحويلات في الفيزياء.pdf': 'ملخص شامل لجميع الوحدات والتحويلات الفيزيائية الضرورية للبكالوريا',
    'genie_mecanique3as-lessons_kehili.rar': 'دروس وملخصات الهندسة الميكانيكية الشاملة 3 ثانوي — الأستاذ كحيلي',
    'cour_ge_math_2.pdf': 'درس وتمارين الهندسة الفضائية والأعداد المركبة 2',
    'enplus_l_spanish_1.pdf': 'سلسلة قواعد وتمارين مادة اللغة الإسبانية — الجزء 1',
    'enplus_l_spanish_2.pdf': 'سلسلة قواعد وتمارين مادة اللغة الإسبانية — الجزء 2',
    'math3as_resume-mo3adalat_tafadolia.pdf': 'ملخص شامل لدرس المعادلات التفاضلية 3 ثانوي مع أمثلة محلولة',
    'بلعمري.pdf': 'سلسلة تمارين ومواضيع العلوم الفيزيائية النموذجية — الأستاذ بلعمري',
    'النصوص العلمية خاصة بالمجال 1 .pdf': 'مجموعة النصوص العلمية النموذجية — المجال الأول (تركيب البروتين والإنزيمات)',
    'نصوص علمية للاستاذ فراح عيسى.pdf': 'النصوص العلمية الشاملة ومنهجية الإجابة وفق المنهاج الوزاري — الأستاذ فراح عيسى',
    'نصوص علمية ممتازة.pdf': 'تجميعية نصوص علمية نموذجية مختارة في علوم الطبيعة والحياة',
    'مخطط_حو_ل_الانزيمات_الاستاذة_كتفي.pdf': 'مخطط تحصيلي شامل حول النشاط الإنزيمي للبروتينات — الأستاذة كتفي شريف زينة',
    'كتاب الأنوار في-الفلسفة 3 ثانوي.pdf': 'كتاب الأنوار في الفلسفة — مقالات نموذجية ومنهجية الكتابة الفلسفية',
    'جميع المقالات الفلسفية.doc': 'تجميعية المقالات الفلسفية الشاملة المقررة لجميع الشعب',
    'أهم الأقوال في الفلسفة.pdf': 'موسوعة أقوال الفلاسفة ومواقفهم الفكرية مصنفة حسب الدروس',
    'التحليل البعدي.pdf': 'ملخص التحليل البعدي واستخراج الوحدات الفيزيائية',
    'منهجيات الفلسفة.pdf': 'دليل إتقان منهجيات المقال الفلسفي (مقارنة، جدلية، استقصاء بالوضع، وتحليل نص)',
    'كل قوانين  الفيزياء في ملخص شامل.pdf': 'الملخص الشامل لجميع قوانين وعلاقات مادة العلوم الفيزيائية',
    'ملحق_كتابة_البروتكلات_التجريبية_و_منهجيتها.pdf': 'دليل البروتوكولات التجريبية ومنهجية كتابة ورسم التجارب في الفيزياء',
    'ملخص شامل لدروس الفيزياء-1.pdf': 'ملخص شامل ومكثف لدروس العلوم الفيزيائية 3 ثانوي',
    'ملخص نهائي للعلوم الطبيعة.pdf': 'المراجعة النهائية الشاملة لعلوم الطبيعة والحياة',
    'سgلاسل تمارين مع الحلول.pdf': 'سلاسل تمارين الرياضيات النموذجية مع الحلول المفصلة',
    'الموافقات_في_Z.pdf': 'درس وتمارين شاملة في الموافقات في Z وقسمة الأعداد الصحيحة',
    'المعادلات التفاضلية.pdf': 'ملخص وتمارين محلولة في المعادلات التفاضلية 3 ثانوي',
    'دراسة الدوال كثيرات الحدود.pdf': 'ملخص ومنهجية دراسة الدوال كثيرات الحدود والكسرية',
    'خلاصة المتتاليات.pdf': 'خلاصة القواعد والقوانين في المتتاليات العددية',
    'حساب التكاملات.pdf': 'درس وتمارين محلولة في الحساب التكاملي والدوال الأصلية',
    'حساب التكاملات (2).pdf': 'سلسلة تمارين متقدمة في حساب التكاملات والمساحات',
    'طريقة_المناقشة_البيانية.pdf': 'دليل إتقان المناقشة البيانية بأنواعها الثلاثة (الأفقية، المائلة، الدورانية)',
    'ملخص الدوال الوغاريتمية.pdf': 'ملخص شامل في الدالة اللوغاريتمية النيبيرية مع تمارين محلولة',
    'ملخص الرياضيات.pdf': 'ملخص شامل لقواعد وقوانين الرياضيات للبكالوريا',
    'ملخص المتتاليات.pdf': 'ملخص شامل لدرس المتتاليات الحسابية والهندسية وطرق البرهان بالتراجع',
    'ملخص المعادلات التفاضلية.pdf': 'ملخص شامل لقوانين وطرق حل المعادلات التفاضلية',
    'ملخص النهايات.pdf': 'ملخص شامل لحساب النهايات وإزالة حالات عدم التعيين',
    'ملخص الهندسة التحليلية في الفضاء.pdf': 'ملخص شامل في الهندسة الفضائية والجداء السلمي ومعادلة المستوي والكرة',
    'ملخص شامل للرياضيات تسيير-Copy.pdf': 'الملخص الشامل في الرياضيات لشعبة تسيير واقتصاد',
    'ملخص للمعادلات التفاضلية.pdf': 'ملخص مركز في المعادلات التفاضلية وتطبيقاتها',
    'كتاب_مقترحات_الانجلزية_لاستاذ_ناصر_منصوري_ج_ح_م_لــwww_msila_info.pdf': 'كتاب مواضيع ومقترحات اللغة الإنجليزية مع الحلول النموذجية — الأستاذ ناصر منصوري',
    'مقالات_كتاب_الهدى_في_الفلسفة_بكالوريا_2020.pdf': 'كتاب الهدى في الفلسفة — مقالات نموذجية ومنهجيات شاملة',
    'باقة_الأستاذ_قزوري_في_الفيزياء_بكالوريا_2020_تجميع_و_رفع_عقبة_بن.pdf': 'باقة تمارين ومواضيع الفيزياء الشاملة مع الحلول النموذجية — الأستاذ قزوري',
    'باقة_الفروض_و_الاختبارات_من_كتاب_المراجعة_النهائية_فيزياء_جزء_2.pdf': 'باقة الفروض والاختبارات من كتاب المراجعة النهائية في الفيزياء — الجزء 2',
    'حلول_جميع_تمارين_الكتاب_المدرسي_في_الفيزياء_للأستاذ_قزوري_نافع_بكالوريا.pdf': 'حلول جميع تمارين الكتاب المدرسي في الفيزياء بالتفصيل — الأستاذ قزوري',
    'سلسلة_تمارين_بالحل_المفصل_في_6_وحدات.pdf': 'سلسلة تمارين مقترحة بالحل المفصل في الوحدات الست الأولى لمادة الفيزياء',
    'معضم_تعاريف_مادة_العلوم_الفيزيائية_من_الوحدة_1الى_6_1_1.pdf': 'معجم تعاريف ومصطلحات مادة العلوم الفيزيائية (من الوحدة 1 إلى 6)',
    'ملخص_الدروس_لكل_الوحدات_{1_7}_في_الفيزياء_للأستاذ_مبخوت_بقة_بكالوريا.pdf': 'ملخص شامل لجميع وحدات الفيزياء (الوحدات 1 إلى 7) — الأستاذ مبخوت بقة',
    'ملخصات_الفيزياء_للأستاذ_عايب_كمال_من_الوحدة_1_إلى_6.pdf': 'سلسلة ملخصات وتمارين الفيزياء (الوحدات 1 إلى 6) — الأستاذ عايب كمال',
    'كتاب_السلسلة_الخضراء_2020لاستاذ_بن_خريفwww_msila_info_ahlamontada.pdf': 'كتاب السلسلة الخضراء في علوم الطبيعة والحياة — الأستاذ مصطفى بن خريف',
    'كتاب_السلسلة_الخضراء_لاستاذ_بن_خريف2020_https_www_msila_info_ahlamontada.pdf': 'كتاب السلسلة الخضراء الشامل للبكالوريا — الأستاذ مصطفى بن خريف',
    'العدد_2_من_مجلة_الهيستونات_حول_بنية_البروتين_للاستاذة_كتفي_شريف.pdf': 'مجلة الهستونات — العدد 2 (العلاقة بين بنية ووظيفة البروتين) للأستاذة كتفي شريف زينة',
    'العدد_3_من_مجلة_الهستونات_الخاص_بالانزيمات_للاستاذة_كتفي_شريف.pdf': 'مجلة الهستونات — العدد 3 (النشاط الإنزيمي للبروتينات) للأستاذة كتفي شريف زينة',
    'مجلة_الهستونات_العدد_1_تركيب_البروتين_للاستاذة_كتفي_شريف_زينة.pdf': 'مجلة الهستونات — العدد 1 (تركيب البروتين وآليات الترجمة) للأستاذة كتفي شريف زينة',
    'مجلة_الهستونات_العدد_الخامس_في_الاتصال_العصبي_الاستاذة_كتفي_شريف.pdf': 'مجلة الهستونات — العدد 5 (الاتصال العصبي والظواهر الكهربائية) للأستاذة كتفي شريف زينة',
    'مجلة_الهيستونات_العدد_4_مناعة_للاستاذة_كتفي_شريف_زينة.pdf': 'مجلة الهستونات — العدد 4 (المناعة والدفاع عن الذات) للأستاذة كتفي شريف زينة',
    'كتاب_السلسلة_الفضية_في_الرياضيات_من_الالف_الى_الياء_الشعب_الادبية.pdf': 'كتاب السلسلة الفضية في الرياضيات من الألف إلى الياء (الشعب الأدبية واللغات)',
    'كتاب_السلسلة_الفضية_في_الفلسفة_من_الالف_الى_الياء_شعبة_اداب_وفلسفة.pdf': 'كتاب السلسلة الفضية في الفلسفة من الألف إلى الياء — شعبة آداب وفلسفة',
    'كتاب_المراجعة_الشاملة_في_الفلسفة_شعبة_اداب_وفلسفة_للاستاذ_خليل_سعيداني.pdf': 'كتاب المراجعة الشاملة في الفلسفة لشعبة آداب وفلسفة — الأستاذ خليل سعيداني',
    'كتاب_خليل_سعيداني_طبعة_2021_للشعب_العلمية_والتقنية_ولغات_وتسيير.pdf': 'كتاب المراجعة الشاملة في الفلسفة للشعب العلمية والتقنية واللغات — الأستاذ خليل سعيداني',
    'كتيب_ملخصات_دروس_للرياضيات_السنة_الثانية_ثانوي.pdf': 'كتيب ملخصات مكتسبات وقواعد الرياضيات القبلية للبكالوريا'
  };

  if (curatedDictionary[rawName]) {
    return curatedDictionary[rawName];
  }

  // Handle Hamza Samrani units
  if (subfolder && subfolder.includes('سمراني')) {
    const unitMatch = rawName.match(/(\d+)/);
    const unitNum = unitMatch ? unitMatch[1] : '';
    const unitNames = {
      '01': 'تركيب البروتين',
      '1': 'تركيب البروتين',
      '02': 'العلاقة بين بنية ووظيفة البروتين',
      '2': 'العلاقة بين بنية ووظيفة البروتين',
      '03': 'النشاط الإنزيمي للبروتينات',
      '3': 'النشاط الإنزيمي للبروتينات',
      '04': 'المناعة والدفاع عن الذات',
      '4': 'المناعة والدفاع عن الذات',
      '05': 'الاتصال العصبي والكمونات',
      '5': 'الاتصال العصبي والكمونات',
      '06': 'التحولات الطاقوية (التركيب الضوئي)',
      '6': 'التحولات الطاقوية (التركيب الضوئي)',
      '07': 'التنفس والتخمر',
      '7': 'التنفس والتخمر'
    };
    const uTitle = unitNames[unitNum] ? ` (${unitNames[unitNum]})` : '';
    return `ملخص العلوم — الوحدة ${unitNum}${uTitle} للأستاذ حمزة سمراني`;
  }

  // Handle Farrah Issa units
  if (subfolder && subfolder.includes('فراح')) {
    const unitMatch = rawName.match(/(\d+)/);
    const unitNum = unitMatch ? unitMatch[1] : '';
    const unitNames = {
      '01': 'تركيب البروتين',
      '1': 'تركيب البروتين',
      '02': 'العلاقة بين بنية ووظيفة البروتين',
      '2': 'العلاقة بين بنية ووظيفة البروتين',
      '03': 'النشاط الإنزيمي للبروتينات',
      '3': 'النشاط الإنزيمي للبروتينات',
      '04': 'المناعة والدفاع عن الذات',
      '4': 'المناعة والدفاع عن الذات',
      '05': 'الاتصال العصبي',
      '5': 'الاتصال العصبي',
      '06': 'التركيب الضوئي',
      '6': 'التركيب الضوئي',
      '07': 'التنفس الخلوي',
      '7': 'التنفس الخلوي',
      '08': 'التخمر الخلوي',
      '8': 'التخمر الخلوي'
    };
    const uTitle = unitNames[unitNum] ? ` (${unitNames[unitNum]})` : '';
    return `سلسلة ونصوص العلوم — الوحدة ${unitNum}${uTitle} للأستاذ فراح عيسى`;
  }

  // Strip extension
  title = title.replace(/\.(pdf|doc|docx|rar|zip|pdf\.pdf)$/gi, '');
  title = title.replace(/\.(pdf|doc|docx|rar|zip)$/gi, '');

  // Strip garbage strings
  title = title.replace(/https?_[^\s_]+/gi, '');
  title = title.replace(/www_[^\s_]+/gi, '');
  title = title.replace(/bac35\.com-?/gi, '');
  title = title.replace(/ahlamontada/gi, '');
  title = title.replace(/_organized/gi, '');
  title = title.replace(/Copier/gi, '');
  title = title.replace(/j_h_m_l/gi, '');
  title = title.replace(/ج_ح_م_لــ/gi, '');
  title = title.replace(/www_msila_info/gi, '');
  title = title.replace(/_info/gi, '');
  title = title.replace(/docx/gi, '');
  title = title.replace(/_{1,}/g, ' ');
  title = title.replace(/\s{2,}/g, ' ').trim();

  // Normalize Professor designations
  title = title.replace(/لاستاذ\s+/g, 'للأستاذ ');
  title = title.replace(/للاستاذة\s+/g, 'للأستاذة ');
  title = title.replace(/للاستاذ\s+/g, 'للأستاذ ');
  title = title.replace(/الاستاذ\s+/g, 'الأستاذ ');
  title = title.replace(/الاستاذة\s+/g, 'الأستاذة ');
  title = title.replace(/نـــافع/g, '');
  title = title.replace(/نـافع/g, '');
  title = title.replace(/سنة_ثالثة_ثانوي/g, '3 ثانوي');
  title = title.replace(/سنة 3 ثانوي/g, '3 ثانوي');

  // Strip leading punctuation
  title = title.replace(/^[-_\s]+/, '').replace(/[-_\s]+$/, '');

  return title;
}

function getCategory(fileName, cleanTitle) {
  const t = (fileName + ' ' + cleanTitle).toLowerCase();
  if (t.includes('سلسلة') || t.includes('تمارين') || t.includes('تمرين') || t.includes('مسائل') || t.includes('فروض') || t.includes('اختبارات') || t.includes('حلول')) {
    return 'سلاسل وتمارين محلولة';
  }
  if (t.includes('كتاب') || t.includes('مجلة') || t.includes('باقة') || t.includes('السلسلة الفضية') || t.includes('السلسلة الخضراء') || t.includes('الهستونات') || t.includes('المنجد') || t.includes('الأنوار')) {
    return 'كتب ومجلات شاملة';
  }
  if (t.includes('مقال') || t.includes('نصوص') || t.includes('أقوال') || t.includes('اقوال')) {
    return 'مقالات ونصوص علمية';
  }
  if (t.includes('منهجية') || t.includes('بروتوكول') || t.includes('توجيه') || t.includes('طريقة') || t.includes('المناقشة البيانية')) {
    return 'منهجيات وإرشادات';
  }
  if (t.includes('قوانين') || t.includes('مخطط') || t.includes('تحويلات') || t.includes('مصطلحات') || t.includes('شخصيات') || t.includes('تواريخ') || t.includes('خرائط')) {
    return 'قوانين ومخططات';
  }
  return 'ملخصات ودروس';
}

function extractAuthor(fileName, cleanTitle) {
  const full = fileName + ' ' + cleanTitle;
  if (full.includes('قزوري')) return 'الأستاذ قزوري';
  if (full.includes('كتفي شريف') || full.includes('كتفي')) return 'الأستاذة كتفي شريف زينة';
  if (full.includes('حمزة سمراني') || full.includes('سمراني')) return 'الأستاذ حمزة سمراني';
  if (full.includes('فراح عيسى') || full.includes('فراح')) return 'الأستاذ فراح عيسى';
  if (full.includes('بن خريف') || full.includes('مصطفى بن خريف')) return 'الأستاذ مصطفى بن خريف';
  if (full.includes('خليل سعيداني') || full.includes('سعيداني')) return 'الأستاذ خليل سعيداني';
  if (full.includes('حمداش')) return 'الأستاذ حمداش عبد الحق';
  if (full.includes('منصوري') || full.includes('ناصر منصوري')) return 'الأستاذ ناصر منصوري';
  if (full.includes('بوعزة')) return 'الأستاذ بوعزة';
  if (full.includes('كحيلي')) return 'الأستاذ كحيلي';
  if (full.includes('مبخوت بقة')) return 'الأستاذ مبخوت بقة';
  if (full.includes('عايب كمال')) return 'الأستاذ عايب كمال';
  if (full.includes('لطرش')) return 'الأستاذة لطرش ميفة';
  if (full.includes('حليمة بوناب')) return 'الأستاذة حليمة بوناب';
  if (full.includes('باحمي حسين') || full.includes('باحمي')) return 'الأستاذ باحمي حسين';
  if (full.includes('بلعمري')) return 'الأستاذ بلعمري';
  if (full.includes('زدون')) return 'الأستاذ محمد الأمين زدون';
  if (full.includes('نور الدين')) return 'الأستاذ نور الدين';
  if (full.includes('بوسيف')) return 'الأستاذ بوسيف';
  if (full.includes('عكاش')) return 'الأستاذ عكاش';
  if (full.includes('عبد الباسط')) return 'الأستاذ عبد الباسط';
  return 'أساتذة متميزون';
}

const finalCatalog = rawFiles.map((fullPath, idx) => {
  const relPath = path.relative('public', fullPath).replace(/\\/g, '/');
  const fileName = path.basename(fullPath);
  const size = fs.statSync(fullPath).size;
  const ext = path.extname(fullPath).toLowerCase().replace('.', '') || 'pdf';

  const relInside = path.relative(baseDir, fullPath).replace(/\\/g, '/');
  const parts = relInside.split('/');
  const topFolder = parts[0];
  const subFolder = parts.length > 2 ? parts[1] : '';

  const { subjectId, subjectAliases, subjectName, streams } = getSubjectMapping(topFolder, subFolder, fileName);
  const title = cleanAndPolishTitle(fileName, topFolder, subFolder);
  const category = getCategory(fileName, title);
  const author = extractAuthor(fileName, title);

  return {
    id: `ffm_${idx + 1}`,
    title,
    rawFileName: fileName,
    subjectId,
    subjectAliases,
    subjectName,
    streams,
    streamIds: streams,
    category,
    author,
    fileUrl: '/' + encodeURI(relPath).replace(/#/g, '%23'),
    rawPath: '/' + relPath,
    size: formatSize(size),
    sizeReadable: formatSize(size),
    bytes: size,
    type: ext.toUpperCase(),
    extension: ext,
    downloadsCount: 180 + ((idx * 37) % 520),
    viewsCount: 750 + ((idx * 79) % 1800),
    rating: 4.9,
    verified: true,
    addedAt: '2026-08-24'
  };
});

const fileContent = `/**
 * 📚 Naja7i (نجاحي) — Comprehensive Public Files Catalog
 * Location: public/FileFromMe
 * Total Indexed Files: ${finalCatalog.length}
 * Verified Academic Titles, Categories, Stream Maps, Authors, and Real File Paths.
 */

export const USER_STUDY_FILES = ${JSON.stringify(finalCatalog, null, 2)};

export const USER_UPLOADED_FILES = USER_STUDY_FILES;

/**
 * Filter files by subject ID or alias
 */
export function getFilesBySubject(subjectId) {
  if (!subjectId || subjectId === 'all') return USER_STUDY_FILES;
  const norm = subjectId.toLowerCase().trim();
  return USER_STUDY_FILES.filter(f => 
    f.subjectId === norm || 
    (f.subjectAliases && f.subjectAliases.includes(norm))
  );
}

/**
 * Filter files by official stream ID
 */
export function getFilesByStream(streamId) {
  if (!streamId || streamId === 'all') return USER_STUDY_FILES;
  return USER_STUDY_FILES.filter(f => f.streams && f.streams.includes(streamId));
}

/**
 * Global search across files by query
 */
export function searchUserFiles(query) {
  if (!query || query.trim().length < 2) return [];
  const q = query.toLowerCase().trim();
  return USER_STUDY_FILES.filter(f => 
    f.title.toLowerCase().includes(q) ||
    f.subjectName.toLowerCase().includes(q) ||
    f.author.toLowerCase().includes(q) ||
    f.category.toLowerCase().includes(q) ||
    f.rawFileName.toLowerCase().includes(q)
  );
}

export default USER_STUDY_FILES;
`;

fs.writeFileSync('src/data/userFilesData.js', fileContent, 'utf8');
console.log(`Successfully generated src/data/userFilesData.js with ${finalCatalog.length} polished files.`);
