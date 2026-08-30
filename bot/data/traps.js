import { COMMON_BAC_TRAPS } from '../../src/data/commonBacTrapsData.js';

export { COMMON_BAC_TRAPS };

export const TRAP_SUBJECTS = [
  { id: 'all', name: 'جميع المواد', icon: '⚡' },
  { id: 'math', name: 'الرياضيات', icon: '📐' },
  { id: 'physique', name: 'العلوم الفيزيائية', icon: '⚡' },
  { id: 'sciences_nat', name: 'علوم الطبيعة والحياة', icon: '🧬' },
  { id: 'islamic', name: 'العلوم الإسلامية', icon: '🕌' },
  { id: 'hisgeo', name: 'التاريخ والجغرافيا', icon: '🗺️' },
  { id: 'philo', name: 'الفلسفة', icon: '🧠' },
  { id: 'arabic', name: 'اللغة العربية', icon: '📖' }
];

export function getTrapsBySubject(subjectId) {
  if (!subjectId || subjectId === 'all') return COMMON_BAC_TRAPS;
  return COMMON_BAC_TRAPS.filter(t => t.subjectId === subjectId);
}

export function getTrapById(id) {
  return COMMON_BAC_TRAPS.find(t => t.id === id);
}

export function getRandomTrap() {
  if (!COMMON_BAC_TRAPS.length) return null;
  return COMMON_BAC_TRAPS[Math.floor(Math.random() * COMMON_BAC_TRAPS.length)];
}
