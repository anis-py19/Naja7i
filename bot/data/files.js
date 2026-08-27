import { USER_STUDY_FILES } from '../../src/data/userFilesData.js';

export { USER_STUDY_FILES };

/**
 * Filter files by stream and subject
 */
export function getFilesByStreamAndSubject(streamId, subjectId) {
  return USER_STUDY_FILES.filter(file => {
    // Check stream match
    const matchStream = file.streams?.includes(streamId) || file.streamIds?.includes(streamId) || file.streams?.includes('all');
    if (!matchStream) return false;

    // Check subject match
    if (!subjectId || subjectId === 'all') return true;

    if (file.subjectId === subjectId) return true;
    if (file.subjectAliases && file.subjectAliases.includes(subjectId)) return true;

    // Map common aliases
    const subjectMapping = {
      'sciences_nat': ['sciences_nat', 'science', 'svt', 'sciences', 'علوم الطبيعة والحياة'],
      'physique': ['physique', 'physics', 'العلوم الفيزيائية', 'فيزياء'],
      'math': ['math', 'mathematics', 'الرياضيات'],
      'arabic': ['arabic', 'arabe', 'اللغة العربية وآدابها', 'عربية'],
      'philo': ['philo', 'philosophie', 'الفلسفة'],
      'islamic': ['islamic', 'islamique', 'العلوم الإسلامية', 'إسلامية'],
      'hisgeo': ['hisgeo', 'histoire_geo', 'التاريخ والجغرافيا', 'اجتماعيات', 'تاريخ', 'جغرافيا'],
      'french': ['french', 'francais', 'اللغة الفرنسية', 'فرنسية'],
      'english': ['english', 'anglais', 'اللغة الإنجليزية', 'إنجليزية'],
      'gestion_fin': ['gestion_fin', 'comptabilite', 'التسيير المحاسبي والمالي', 'محاسبة'],
      'economy': ['economy', 'economie', 'الاقتصاد والمناجمنت', 'اقتصاد'],
      'droit': ['droit', 'القانون'],
      'tech_engineering': ['tech_engineering', 'genie_meca', 'genie_elec', 'genie_civil', 'genie_proc', 'تكنولوجيا', 'هندسة'],
      'langue_3': ['langue_3', 'espagnol', 'allemand', 'italien', 'لغة أجنبية ثالثة']
    };

    const targetAliases = subjectMapping[subjectId] || [subjectId];
    return targetAliases.some(alias => 
      file.subjectId === alias || 
      (file.subjectAliases && file.subjectAliases.includes(alias)) ||
      (file.subjectName && file.subjectName.toLowerCase().includes(alias.toLowerCase()))
    );
  });
}

/**
 * Search all files by query string
 */
export function searchStudyFiles(query, limit = 15) {
  if (!query || !query.trim()) return [];
  const q = query.trim().toLowerCase();
  
  return USER_STUDY_FILES.filter(file => {
    const title = (file.title || '').toLowerCase();
    const raw = (file.rawFileName || '').toLowerCase();
    const subj = (file.subjectName || '').toLowerCase();
    const cat = (file.category || '').toLowerCase();
    const author = (file.author || '').toLowerCase();

    return title.includes(q) || raw.includes(q) || subj.includes(q) || cat.includes(q) || author.includes(q);
  }).slice(0, limit);
}
