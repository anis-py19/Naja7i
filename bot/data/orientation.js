/**
 * 🎓 دليل التوجيه الجامعي وحساب المعدل الموزون (Moyenne Pondérée) للبكالوريا الجزائرية 🇩🇿
 */

export const UNIVERSITY_MAJORS = [
  {
    id: 'medicine',
    name: 'العلوم الطبية (طب / صيدلة / طب أسنان)',
    frenchName: 'Sciences Médicales (Médecine, Pharmacie, Dentaire)',
    icon: '🩺',
    streams: ['sciences', 'math', 'technique_math'],
    formulaDesc: '(معدل البكالوريا × 2 + علامة العلوم الطبيعية) ÷ 3',
    formulaType: 'medicine',
    typicalThreshold: '15.50 - 17.20',
    description: 'كليات الطب الوطنية (الجزائر، وهران، قسنطينة، سطيف، عنابة، باتنة، تيزي وزو، سيدي بلعباس، ورقلة، وغيرها). تتطلب أولوية لشعبة علوم تجريبية ورياضيات مع حساب المعدل الموزون مع مادة علوم الطبيعة والحياة.'
  },
  {
    id: 'ensia',
    name: 'المدرسة الوطنية العليا للذكاء الاصطناعي (ENSIA)',
    frenchName: 'École Nationale Supérieure d\'Intelligence Artificielle',
    icon: '🤖',
    streams: ['math', 'technique_math', 'sciences'],
    formulaDesc: '(معدل البكالوريا × 2 + علامة الرياضيات) ÷ 3',
    formulaType: 'math_based',
    typicalThreshold: '16.80 - 18.20',
    description: 'قطب سيدي عبد الله التكنولوجي بالجزائر العاصمة. إحدى أرقى المدارس الوطنية العليا للنخبة في مجال الذكاء الاصطناعي وتعلّم الآلة وعلم البيانات.'
  },
  {
    id: 'esi',
    name: 'المدرسة الوطنية العليا للإعلام الآلي (ESI Alger / SBA)',
    frenchName: 'École Nationale Supérieure d\'Informatique',
    icon: '💻',
    streams: ['math', 'technique_math', 'sciences'],
    formulaDesc: '(معدل البكالوريا × 2 + علامة الرياضيات) ÷ 3',
    formulaType: 'math_based',
    typicalThreshold: '16.50 - 17.80',
    description: 'أعرق مدرسة للإعلام الآلي في الجزائر (واد السمار وسيدي بلعباس). تخرج مهندسي دولة في هندسة البرمجيات، الأمن السيبراني، والشبكات والأنظمة الموزعة.'
  },
  {
    id: 'polytech',
    name: 'المدرسة الوطنية المتعددة التقنيات (ENP Polytechnique)',
    frenchName: 'École Nationale Polytechnique',
    icon: '⚙️',
    streams: ['math', 'technique_math', 'sciences'],
    formulaDesc: '(معدل البكالوريا × 2 + (الرياضيات + الفيزياء) ÷ 2) ÷ 3',
    formulaType: 'stem_hybrid',
    typicalThreshold: '15.80 - 17.00',
    description: 'مدارس البوليتكنيك (الحراش، وهران، قسنطينة). تكوين نخبوي لنيل شهادة مهندس دولة في الهندسة الميكانيكية، الكهربائية، الطاقوية، والمدنية.'
  },
  {
    id: 'ens',
    name: 'المدارس العليا للأساتذة (ENS - أساتذة التعليم الثانوي والمتوسط)',
    frenchName: 'Écoles Normales Supérieures',
    icon: '👨‍🏫',
    streams: ['sciences', 'math', 'technique_math', 'lettres_philo', 'langues', 'gestion'],
    formulaDesc: '(معدل البكالوريا × 2 + علامة مادة التخصص) ÷ 3',
    formulaType: 'subject_based',
    typicalThreshold: '14.50 - 16.50',
    description: 'تكوين أساتذة التعليم للطورين الثانوي والمتوسط (بوزريعة، القبة، قسنطينة، وهران، الأغواط، سطيف). وظيفة مضمونة وعقد عمل مباشر بعد التخرج.'
  },
  {
    id: 'paramedical',
    name: 'الشبه طبي العالي (Paramédical)',
    frenchName: 'Instituts Supérieurs Paramédicaux',
    icon: '🩹',
    streams: ['sciences', 'math', 'lettres_philo', 'gestion'],
    formulaDesc: 'معدل البكالوريا العام المباشر',
    formulaType: 'direct',
    typicalThreshold: '14.00 - 15.50',
    description: 'معاهد التكوين الشبه طبي (ممرض للصحة العمومية، مخبري، علاج طبيعي وفيزيائي، التخدير والإنعاش، القبالة). توظيف مباشر في المستشفيات الحكومية.'
  },
  {
    id: 'architecture',
    name: 'الهندسة المعمارية والعمران (Architecture - EPAU)',
    frenchName: 'Architecture et Urbanisme',
    icon: '🏛️',
    streams: ['math', 'technique_math', 'sciences'],
    formulaDesc: '(معدل البكالوريا × 2 + علامة الرياضيات) ÷ 3',
    formulaType: 'math_based',
    typicalThreshold: '14.00 - 15.50',
    description: 'المدرسة المتعددة العلوم للهندسة المعمارية والعمران (الحراش) والأقسام الجامعية للهندسة المعمارية عبر مختلف ولايات الوطن.'
  }
];

/**
 * Calculate Weighted Average based on formula type
 */
export function calculateWeightedAverage(bacAverage, subjectMark, physicsMark = null, formulaType = 'medicine') {
  const bac = Number(bacAverage) || 0;
  const subj = Number(subjectMark) || 0;
  const phys = Number(physicsMark) || 0;

  let weighted = 0;

  if (formulaType === 'medicine' || formulaType === 'math_based' || formulaType === 'subject_based') {
    weighted = (bac * 2 + subj) / 3;
  } else if (formulaType === 'stem_hybrid') {
    const stemAvg = (subj + phys) / 2;
    weighted = (bac * 2 + stemAvg) / 3;
  } else {
    weighted = bac;
  }

  return Number(weighted.toFixed(2));
}
