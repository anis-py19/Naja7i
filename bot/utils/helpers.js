/**
 * 🛠️ Utility Functions & Helpers for Naja7i BAC Telegram Bot
 */

/**
 * Calculate BAC Average from marks map and stream subjects
 */
export function calculateBacAverage(stream, marks = {}, includeOptional = { amazigh: false, sport: true }) {
  let totalWeightedScore = 0;
  let totalCoefficients = 0;
  const breakdown = [];

  for (const subject of stream.subjects) {
    if (subject.id === 'amazigh' && !includeOptional.amazigh) continue;
    if (subject.id === 'sport' && !includeOptional.sport) continue;

    const rawMark = marks[subject.id];
    const mark = typeof rawMark === 'number' && !isNaN(rawMark) ? Math.min(20, Math.max(0, rawMark)) : 10;
    const weighted = mark * subject.coef;

    totalWeightedScore += weighted;
    totalCoefficients += subject.coef;

    breakdown.push({
      subjectName: subject.name,
      coef: subject.coef,
      mark: mark,
      weighted: weighted,
      isMain: subject.isMain
    });
  }

  const average = totalCoefficients > 0 ? (totalWeightedScore / totalCoefficients) : 0;
  const formattedAverage = Number(average.toFixed(2));

  let grade = '';
  let gradeIcon = '🎓';
  let guidance = '';

  if (formattedAverage >= 18) {
    grade = 'ممتاز (Excellence) 🏆';
    gradeIcon = '🌟';
    guidance = 'معدل أسطوري يؤهلك لجميع التخصصات الوطنية العليا: الطب، الذكاء الاصطناعي ENSIA، المدرسة الوطنية للإعلام الآلي ESI، الصيدلة، طب الأسنان، وهندسة الطيران!';
  } else if (formattedAverage >= 16) {
    grade = 'جيد جداً (Très Bien) 🥇';
    gradeIcon = '🥇';
    guidance = 'معدل متميز يفتح لك أبواب كليات الطب، الصيدلة، المدارس العليا للأساتذة ENS، والمدارس الوطنية المتعددة التقنيات Polytechnique!';
  } else if (formattedAverage >= 14) {
    grade = 'جيد (Bien) 🥈';
    gradeIcon = '🥈';
    guidance = 'معدل قوي يؤهلك للشبه طبي، المدارس التحضيرية في العلوم والتقنيات، الإعلام الآلي، هندسة معمارية، والعلوم الاقتصادية والتجارية!';
  } else if (formattedAverage >= 12) {
    grade = 'قريب من الجيد (Assez Bien) 🥉';
    gradeIcon = '🥉';
    guidance = 'معدل جيد يؤهلك لـ ST (علوم وتكنولوجيا)، SM (علوم المادة)، بيولوجيا SNV، لغات أجنبية، وحقوق وعلوم سياسية!';
  } else if (formattedAverage >= 10) {
    grade = 'مقبول (Passable) ✅';
    gradeIcon = '✅';
    guidance = 'مبارك النجاح في شهادة البكالوريا! يمكنك التسجيل في مسارات الليسانس المتنوعة بالجامعات الوطنية والتكوين المتخصص!';
  } else {
    grade = 'راسب (Ajourné) ❌';
    gradeIcon = '❌';
    guidance = 'لا تيأس! البكالوريا محطة وتجربة؛ بقليل من التخطيط والمواظبة وسد الثغرات ستحقق النجاح بمعدل باهر في الدورة القادمة!';
  }

  return {
    streamName: stream.name,
    average: formattedAverage,
    progressBar: getScoreProgressBar(formattedAverage, 20),
    totalPoints: totalWeightedScore.toFixed(2),
    totalCoefficients,
    grade,
    gradeIcon,
    guidance,
    breakdown
  };
}

/**
 * Generate a clean visual progress bar
 */
export function getScoreProgressBar(score, max = 20) {
  const ratio = Math.max(0, Math.min(1, score / max));
  const totalBlocks = 12;
  const filled = Math.round(ratio * totalBlocks);
  const empty = totalBlocks - filled;
  return '█'.repeat(filled) + '░'.repeat(empty);
}

/**
 * Calculate BAC Countdown (Target: Dynamic upcoming BAC June session)
 */
export function getBacCountdown() {
  const now = new Date();
  let targetYear = now.getFullYear();
  
  // BAC in Algeria is typically held in early/mid June (around June 7-15)
  let targetDate = new Date(`${targetYear}-06-07T08:00:00+01:00`);
  
  // If current date has passed June of this year, target next year's BAC
  if (now > targetDate) {
    targetYear += 1;
    targetDate = new Date(`${targetYear}-06-07T08:00:00+01:00`);
  }

  const diffMs = targetDate - now;

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  return {
    isDone: false,
    days,
    hours,
    minutes,
    seconds,
    targetDateStr: `الأحد 07 جوان ${targetYear}`
  };
}

/**
 * Format bytes into readable format
 */
export function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

/**
 * Truncate long text with ellipsis
 */
export function truncate(str, max = 50) {
  if (!str) return '';
  return str.length > max ? str.slice(0, max - 3) + '...' : str;
}
