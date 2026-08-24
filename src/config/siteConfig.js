// ============================================================================
// ⚙️ إعدادات المنصة والروابط السحابية (Site Config & Cloud Drive)
// ============================================================================

export const SITE_CONFIG = {
  /**
   * 🔴 وضع الصيانة (Maintenance Switch):
   * - ضع `true` لتفعيل وضع الصيانة (يظهر للزوار أن الموقع قيد التحديث).
   * - ضع `false` لتشغيل الموقع بشكل عادي ومباشر للجميع.
   */
  isMaintenanceMode: false,

  // عنوان صفحة الصيانة
  maintenanceTitle: 'المنصة قيد الصيانة والتحديثات الدورية 🛠️',

  // الرسالة التوضيحية لطلبة وأساتذة البكالوريا
  maintenanceNotice: 'نقوم حالياً برفع ملخصات وسلاسل تمارين جديدة وتحديث المنصة لتقديم أفضل تجربة لجميع مترشحي شهادة البكالوريا في الجزائر 🇩🇿.',

  // الوقت المتوقع للعودة
  estimatedReturn: 'سنعود قريباً جداً بإذن الله ⏱️',

  // البريد الإلكتروني للتواصل العاجل أثناء الصيانة
  adminEmail: 'anisrayaneizri@gmail.com',

  // 📂 مجلد Google Drive الرسمي الشامل لمنصة نجاحي
  googleDriveMainFolder: 'https://drive.google.com/drive/folders/1bHHkMnURu_3OVBKI2oNMlM_kHltW2nG1',
  googleDriveFolderId: '1bHHkMnURu_3OVBKI2oNMlM_kHltW2nG1'
};

export default SITE_CONFIG;
