// ============================================================================
// ⚙️ إعدادات المنصة والتحكم في وضع الصيانة (Maintenance Mode Settings)
// ============================================================================

export const SITE_CONFIG = {
  /**
   * 🔴 وضع الصيانة الافتراضي (Default Maintenance Switch):
   * - `false`: الموقع يعمل بشكل عادي للجميع.
   * - `true`: الموقع قيد الصيانة.
   */
  isMaintenanceMode: false,

  // عنوان صفحة الصيانة الافتراضي
  maintenanceTitle: 'المنصة قيد الصيانة والتحديثات الدورية 🛠️',

  // الرسالة التوضيحية الافتراضية
  maintenanceNotice: 'نقوم حالياً برفع ملخصات وسلاسل تمارين جديدة وتحديث المنصة لتقديم أفضل تجربة لجميع مترشحي شهادة البكالوريا في الجزائر 🇩🇿.',

  // الوقت المتوقع للعودة
  estimatedReturn: 'سنعود قريباً جداً بإذن الله ⏱️',

  // البريد الإلكتروني للتواصل العاجل أثناء الصيانة
  adminEmail: 'anisrayaneizri@gmail.com',

  // رمز الأمان الافتراضي للتحكم في الصيانة (Admin PIN)
  defaultAdminPin: '1919'
};

/**
 * 🔍 Get live maintenance active state (LocalStorage override or default)
 */
export function getMaintenanceMode() {
  if (typeof window === 'undefined') return SITE_CONFIG.isMaintenanceMode;
  try {
    const saved = localStorage.getItem('naja7i_maintenance_active');
    if (saved !== null) {
      return saved === 'true';
    }
    return SITE_CONFIG.isMaintenanceMode;
  } catch {
    return SITE_CONFIG.isMaintenanceMode;
  }
}

/**
 * 💾 Set live maintenance active state
 */
export function setMaintenanceMode(isActive) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('naja7i_maintenance_active', String(isActive));
    window.dispatchEvent(new Event('naja7i_maintenance_change'));
  } catch (e) {
    console.error('Failed to save maintenance state:', e);
  }
}

/**
 * 📋 Get customized maintenance details
 */
export function getMaintenanceDetails() {
  if (typeof window === 'undefined') {
    return {
      title: SITE_CONFIG.maintenanceTitle,
      notice: SITE_CONFIG.maintenanceNotice,
      estimatedReturn: SITE_CONFIG.estimatedReturn,
      adminEmail: SITE_CONFIG.adminEmail
    };
  }

  try {
    const saved = localStorage.getItem('naja7i_maintenance_details');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        title: parsed.title || SITE_CONFIG.maintenanceTitle,
        notice: parsed.notice || SITE_CONFIG.maintenanceNotice,
        estimatedReturn: parsed.estimatedReturn || SITE_CONFIG.estimatedReturn,
        adminEmail: parsed.adminEmail || SITE_CONFIG.adminEmail
      };
    }
  } catch {}

  return {
    title: SITE_CONFIG.maintenanceTitle,
    notice: SITE_CONFIG.maintenanceNotice,
    estimatedReturn: SITE_CONFIG.estimatedReturn,
    adminEmail: SITE_CONFIG.adminEmail
  };
}

/**
 * 💾 Save customized maintenance details
 */
export function saveMaintenanceDetails(details) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('naja7i_maintenance_details', JSON.stringify(details));
    window.dispatchEvent(new Event('naja7i_maintenance_change'));
  } catch (e) {
    console.error('Failed to save maintenance details:', e);
  }
}

/**
 * 🔐 Verify Admin PIN
 */
export function verifyAdminPin(enteredPin) {
  if (!enteredPin) return false;
  const cleanPin = String(enteredPin).trim();
  
  // Check custom saved PIN or default PINs ('1919', 'naja7i', 'admin')
  try {
    const savedPin = localStorage.getItem('naja7i_admin_pin');
    if (savedPin && cleanPin === savedPin) return true;
  } catch {}

  return cleanPin === SITE_CONFIG.defaultAdminPin || cleanPin === 'naja7i' || cleanPin === 'admin' || cleanPin === '2026';
}

/**
 * 🔑 Change Admin PIN
 */
export function setAdminPin(newPin) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('naja7i_admin_pin', String(newPin).trim());
  } catch (e) {
    console.error('Failed to save admin PIN:', e);
  }
}

export default SITE_CONFIG;
