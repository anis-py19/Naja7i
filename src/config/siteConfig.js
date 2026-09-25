// ============================================================================
// ⚙️ إعدادات المنصة والتحكم في أوضاع الصيانة (Site & Feature Maintenance System)
// ============================================================================

export const DEFAULT_FEATURES_CONFIG = {
  // 1. الوضع العام لكامل المنصة
  global_site: {
    id: 'global_site',
    name: 'كامل المنصة (وضع الصيانة العام)',
    icon: '🌐',
    isMaintenance: false,
    notice: 'نقوم حالياً برفع ملخصات وسلاسل تمارين جديدة وتحديث المنصة لتقديم أفضل تجربة لجميع مترشحي شهادة البكالوريا في الجزائر 🇩🇿.',
    estimatedReturn: 'سنعود قريباً جداً بإذن الله ⏱️'
  },

  // 2. أرشيف البكالوريا الرسمي (2008—2026)
  bac_archive: {
    id: 'bac_archive',
    name: 'أرشيف مواضيع البكالوريا (2008—2026)',
    icon: '🏛️',
    path: '/bac-archive',
    isMaintenance: false,
    notice: 'نقوم حالياً بفهرسة وتحديث مواضيع وحلول وسلالم تنقيط دورات البكالوريا الرسمية.',
    estimatedReturn: 'سيعود الأرشيف خلال دقائق ⏱️'
  },


  // 4. غرفة التركيز وبومودورو
  focus_room: {
    id: 'focus_room',
    name: 'غرفة التركيز وبومودورو (Focus Room)',
    icon: '🎧',
    path: '/focus-room',
    isMaintenance: false,
    notice: 'جاري صيانة وتحديث محرك الأصوات المحيطية والمؤقت الذكي لتوفير أفضل بيئة دراسة.',
    estimatedReturn: 'قريباً ⏱️'
  },

  // 5. كراس الأخطاء والفخاخ الذكي (Carnet d'Erreurs)
  mistakes_notebook: {
    id: 'mistakes_notebook',
    name: 'كراس الأخطاء والفخاخ الذكي',
    icon: '📓',
    path: '/mistakes-notebook',
    isMaintenance: false,
    notice: 'جاري إضافة وتصنيف بنك فخاخ منهجية جديدة لمختلف المواد لشهادة البكالوريا.',
    estimatedReturn: 'قريباً ⏱️'
  },

  // 6. بنك الأسئلة والاختبارات التفاعلية (Quiz & QCM)
  quiz: {
    id: 'quiz',
    name: 'بنك الأسئلة والاختبارات التفاعلية',
    icon: '⏱️',
    path: '/quiz',
    isMaintenance: false,
    notice: 'جاري إضافة أسئلة وتحديات موقوتة QCM جديدة وفق المنهاج الوزاري مع التصحيح الفوري.',
    estimatedReturn: 'قريباً ⏱️'
  },

  // 7. حاسبة معدل البكالوريا
  calculator: {
    id: 'calculator',
    name: 'حاسبة معدل البكالوريا',
    icon: '🧮',
    path: '/calculator',
    isMaintenance: false,
    notice: 'جاري مراجعة وتحديث معاملات المواد ومعدلات التوجيه الجامعي الرسمي.',
    estimatedReturn: 'قريباً ⏱️'
  },

  // 8. مخطط وجداول المراجعة الأسبوعية
  study_planner: {
    id: 'study_planner',
    name: 'مخطط وجداول المراجعة الأسبوعية',
    icon: '📅',
    path: '/study-planner',
    isMaintenance: false,
    notice: 'جاري تحديث وتطوير جداول الأهداف الأسبوعية ونماذج الطباعة A4 للمتمدرسين والأحرار.',
    estimatedReturn: 'قريباً ⏱️'
  },

  // 9. مكتبة الملخصات والسلاسل
  library: {
    id: 'library',
    name: 'مكتبة الملخصات والسلاسل',
    icon: '📚',
    path: '/library',
    isMaintenance: false,
    notice: 'جاري رفع وتنظيم ملخصات جديدة وسلاسل تمارين محلولة لأفضل أساتذة الجزائر.',
    estimatedReturn: 'قريباً ⏱️'
  },

  // 10. الشعب والمواد الدراسية
  streams: {
    id: 'streams',
    name: 'الشعب والمواد الدراسية',
    icon: '🏛️',
    path: '/streams',
    isMaintenance: false,
    notice: 'جاري مراجعة تفاصيل الوحدات والدروس لجميع الشعب الست.',
    estimatedReturn: 'قريباً ⏱️'
  },

  // 11. دليل قنوات وأساتذة اليوتيوب
  youtube_teachers: {
    id: 'youtube_teachers',
    name: 'دليل قنوات وأساتذة اليوتيوب',
    icon: '🎥',
    path: '/youtube-teachers',
    isMaintenance: false,
    notice: 'جاري مراجعة وترتيب أفضل القنوات التعليمية الجزائرية لجميع المواد.',
    estimatedReturn: 'قريباً ⏱️'
  },

  // 12. دليل المنهاج والبرنامج الوزاري
  curriculum: {
    id: 'curriculum',
    name: 'دليل المنهاج والبرنامج الوزاري',
    icon: '📖',
    path: '/curriculum',
    isMaintenance: false,
    notice: 'جاري تدقيق المحاور والكفاءات المستهدفة وفق التوزيع السنوي الرسمي.',
    estimatedReturn: 'قريباً ⏱️'
  },

  // 13. العداد التنازلي للبكالوريا
  countdown: {
    id: 'countdown',
    name: 'العداد التنازلي والمواعيد الرسمية',
    icon: '⏳',
    path: '/countdown',
    isMaintenance: false,
    notice: 'جاري ضبط وتحديث رزنامة محطات ومواعيد امتحان شهادة البكالوريا.',
    estimatedReturn: 'قريباً ⏱️'
  }
};

export const SITE_CONFIG = {
  // وضع الصيانة العام لكامل المنصة
  isMaintenanceMode: false,
  maintenanceTitle: 'المنصة قيد الصيانة والتحديثات الدورية 🛠️',
  maintenanceNotice: 'نقوم حالياً برفع ملخصات وسلاسل تمارين جديدة وتحديث المنصة لتقديم أفضل تجربة لجميع مترشحي شهادة البكالوريا في الجزائر 🇩🇿.',
  estimatedReturn: 'سنعود قريباً جداً بإذن الله ⏱️',
  adminEmail: 'anisrayaneizri@gmail.com'
};

/**
 * 🔄 Helper: Retrieve current active features config.
 * DEFAULT_FEATURES_CONFIG & SITE_CONFIG in this file are the master source of truth.
 */
export function getActiveFeaturesConfig() {
  const isGlobalMaintenance = Boolean(
    SITE_CONFIG?.isMaintenanceMode ||
    DEFAULT_FEATURES_CONFIG?.global_site?.isMaintenance
  );

  const config = {};
  for (const key of Object.keys(DEFAULT_FEATURES_CONFIG)) {
    config[key] = { ...DEFAULT_FEATURES_CONFIG[key] };
  }

  if (config.global_site) {
    config.global_site.isMaintenance = isGlobalMaintenance;
  }

  // Clear legacy localStorage cache that previously blocked direct code edits in siteConfig.js
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem('naja7i_features_config');
      localStorage.removeItem('naja7i_admin_bypass');
    } catch { }

    // Support runtime session overrides (e.g. temporary toggles from AdminControlModal)
    try {
      const sessionSaved = sessionStorage.getItem('naja7i_features_config');
      if (sessionSaved) {
        const parsed = JSON.parse(sessionSaved);
        Object.keys(parsed).forEach((key) => {
          if (config[key]) {
            config[key] = { ...config[key], ...parsed[key] };
          }
        });
      }
    } catch (e) {
      console.warn('Failed to parse features config from sessionStorage:', e);
    }
  }

  return config;
}

/**
 * 💾 Helper: Save updated features config during active admin session
 */
export function saveActiveFeaturesConfig(newConfig) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem('naja7i_features_config', JSON.stringify(newConfig));
    localStorage.removeItem('naja7i_features_config');
    // Dispatch custom event for real-time reactive sync across components
    window.dispatchEvent(new Event('naja7i_features_config_changed'));
  } catch (e) {
    console.error('Failed to save features config:', e);
  }
}

// ⚡ Real-time HMR Sync: instantly apply edits to true/false in siteConfig.js without needing reload
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('naja7i_features_config_changed'));
    }
  });
}

export default SITE_CONFIG;

