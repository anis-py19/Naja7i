// ============================================================================
// ⚙️ إعدادات المنصة والتحكم في وضع الصيانة (Maintenance Mode Settings)
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

  // ☁️ رابط مجلد Google Drive الرسمي لملفات المنصة (FileFromMe)
  googleDriveFolderUrl: 'https://drive.google.com/drive/folders/1UpO-4A5XCujpsmLT3LLnhwRtP8Cl37Wx',
  googleDriveFolderId: '1UpO-4A5XCujpsmLT3LLnhwRtP8Cl37Wx'
};

export default SITE_CONFIG;
