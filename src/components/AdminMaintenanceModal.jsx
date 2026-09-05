import React, { useState, useEffect } from 'react';
import { 
  HiX, 
  HiShieldCheck, 
  HiKey, 
  HiCheckCircle, 
  HiExclamationCircle, 
  HiRefresh, 
  HiSave, 
  HiEye,
  HiEyeOff,
  HiClock,
  HiInformationCircle
} from 'react-icons/hi';
import { 
  getMaintenanceMode, 
  setMaintenanceMode, 
  getMaintenanceDetails, 
  saveMaintenanceDetails,
  verifyAdminPin,
  setAdminPin,
  SITE_CONFIG
} from '../config/siteConfig';

export default function AdminMaintenanceModal({ isOpen, onClose, onStateChange, onBypassToggle }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem('naja7i_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [showChangePin, setShowChangePin] = useState(false);
  const [newPinInput, setNewPinInput] = useState('');
  const [pinSuccessMsg, setPinSuccessMsg] = useState('');

  // Maintenance Form State
  const [isMaintenanceOn, setIsMaintenanceOn] = useState(getMaintenanceMode());
  const [details, setDetails] = useState(getMaintenanceDetails());
  const [saveSuccessToast, setSaveSuccessToast] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMaintenanceOn(getMaintenanceMode());
      setDetails(getMaintenanceDetails());
      setPinError(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (verifyAdminPin(pinInput)) {
      setIsAuthenticated(true);
      setPinError(false);
      try {
        localStorage.setItem('naja7i_admin_auth', 'true');
      } catch {}
    } else {
      setPinError(true);
    }
  };

  const handleToggleMaintenance = (newVal) => {
    setIsMaintenanceOn(newVal);
    setMaintenanceMode(newVal);
    if (onStateChange) onStateChange(newVal);

    // If activating maintenance, automatically enable admin bypass so the admin can see the site
    if (newVal) {
      try {
        localStorage.setItem('naja7i_admin_bypass', 'true');
      } catch {}
    }

    setSaveSuccessToast(true);
    setTimeout(() => setSaveSuccessToast(false), 3000);
  };

  const handleSaveDetails = (e) => {
    e.preventDefault();
    saveMaintenanceDetails(details);
    setSaveSuccessToast(true);
    setTimeout(() => setSaveSuccessToast(false), 3000);
  };

  const handleResetDefaults = () => {
    if (window.confirm('هل تريد استعادة النصوص الافتراضية لصفحة الصيانة؟')) {
      const defs = {
        title: SITE_CONFIG.maintenanceTitle,
        notice: SITE_CONFIG.maintenanceNotice,
        estimatedReturn: SITE_CONFIG.estimatedReturn,
        adminEmail: SITE_CONFIG.adminEmail
      };
      setDetails(defs);
      saveMaintenanceDetails(defs);
      setSaveSuccessToast(true);
      setTimeout(() => setSaveSuccessToast(false), 2000);
    }
  };

  const handleChangePinSubmit = (e) => {
    e.preventDefault();
    if (newPinInput.trim().length >= 4) {
      setAdminPin(newPinInput.trim());
      setPinSuccessMsg('تم تغيير رمز الأمان (PIN) بنجاح!');
      setNewPinInput('');
      setShowChangePin(false);
      setTimeout(() => setPinSuccessMsg(''), 3000);
    } else {
      alert('يجب أن يتكون رمز الأمان من 4 أرقام/حروف على الأقل.');
    }
  };

  const handleLogoutAdmin = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('naja7i_admin_auth');
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs font-['Cairo'] antialiased select-none" dir="rtl">
      
      <div className="bg-white border border-[#E2E8F0] rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-right">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#0F172A] text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-lg text-rose-400">
              <HiShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                <span>لوحة التحكم في وضع الصيانة (Maintenance Control)</span>
              </h3>
              <span className="text-[10px] text-slate-300 block">
                تفعيل وإيقاف وضع الصيانة وإدارة رسائل الزوار
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <HiX className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          
          {/* STEP 1: PIN AUTHENTICATION (إذا لم يكن مسجلاً) */}
          {!isAuthenticated ? (
            <form onSubmit={handleLogin} className="space-y-4 py-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-[#E11D48] flex items-center justify-center text-2xl mx-auto shadow-2xs">
                <HiKey className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#0F172A]">
                  أدخل رمز أمان المسؤول (Admin PIN)
                </h4>
                <p className="text-xs text-[#64748B]">
                  لحماية المنصة، يُرجى إدخال رمز الأمان للتحكم في حالة الموقع
                </p>
              </div>

              <div className="max-w-xs mx-auto space-y-2">
                <input
                  type="password"
                  autoFocus
                  placeholder="الرمز السري (الافتراضي: 1919)"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  className={`w-full text-center tracking-widest text-base font-mono bg-[#F8FAFC] border rounded-xl p-2.5 focus:outline-none ${
                    pinError ? 'border-rose-500 bg-rose-50/50' : 'border-[#CBD5E1] focus:border-[#E11D48]'
                  }`}
                />

                {pinError && (
                  <p className="text-xs text-rose-600 font-bold flex items-center justify-center gap-1">
                    <HiExclamationCircle className="w-4 h-4" />
                    <span>رمز الأمان غير صحيح! جرب الرمز الافتراضي: 1919</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#E11D48] hover:bg-[#be123c] text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
              >
                تأكيد الدخول للوحة الصيانة ✓
              </button>
            </form>
          ) : (
            /* STEP 2: AUTHENTICATED ADMIN DASHBOARD */
            <div className="space-y-5">
              
              {/* Toast Success Message */}
              {saveSuccessToast && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
                  <HiCheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>تم تحديث وحفظ إعدادات الصيانة بنجاح!</span>
                </div>
              )}

              {pinSuccessMsg && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <HiCheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{pinSuccessMsg}</span>
                </div>
              )}

              {/* 🔴 MAIN ON / OFF SWITCH CARD */}
              <div className={`p-4 sm:p-5 rounded-2xl border-2 transition-all ${
                isMaintenanceOn
                  ? 'bg-rose-50/60 border-rose-300 shadow-xs'
                  : 'bg-emerald-50/60 border-emerald-300 shadow-xs'
              }`}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-3 h-3 rounded-full ${isMaintenanceOn ? 'bg-rose-600 animate-pulse' : 'bg-emerald-500'}`} />
                      <h4 className="text-sm font-black text-[#0F172A]">
                        حالة وضع الصيانة (Maintenance Mode):
                      </h4>
                    </div>
                    <p className="text-xs text-[#475569]">
                      {isMaintenanceOn 
                        ? '🔴 الموقع مغلق حالياً أمام الزوار وتظهر لهم صفحة الصيانة.' 
                        : '🟢 الموقع يعمل بشكل طبيعي ومتاح لجميع الطلبة والأساتذة.'}
                    </p>
                  </div>

                  {/* Toggle Button */}
                  <div className="shrink-0 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleMaintenance(!isMaintenanceOn)}
                      className={`relative inline-flex h-8 w-15 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isMaintenanceOn ? 'bg-[#E11D48]' : 'bg-emerald-500'
                      }`}
                      title={isMaintenanceOn ? 'تعطيل وضع الصيانة' : 'تفعيل وضع الصيانة'}
                    >
                      <span
                        className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out flex items-center justify-center text-xs font-black ${
                          isMaintenanceOn ? '-translate-x-7 text-[#E11D48]' : 'translate-x-0 text-emerald-600'
                        }`}
                      >
                        {isMaintenanceOn ? 'ON' : 'OFF'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Quick Helper under Switch */}
                <div className="mt-3 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-[#64748B]">
                  <span>التغيير يسري فوراً على كافة صفحات المنصة.</span>
                  <button
                    type="button"
                    onClick={() => handleToggleMaintenance(!isMaintenanceOn)}
                    className="text-[#0F172A] font-bold hover:underline cursor-pointer"
                  >
                    {isMaintenanceOn ? 'انقر لفتح الموقع للجميع 🟢' : 'انقر لإغلاق الموقع للصيانة 🔴'}
                  </button>
                </div>
              </div>

              {/* 📝 EDIT MAINTENANCE DETAILS FORM */}
              <form onSubmit={handleSaveDetails} className="space-y-3 bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-2xl">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
                  <span className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
                    <span>✏️ تخصيص الرسائل المعروضة للزوار:</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleResetDefaults}
                    className="text-[11px] text-slate-500 hover:text-[#E11D48] flex items-center gap-1 cursor-pointer"
                  >
                    <HiRefresh className="w-3.5 h-3.5" />
                    <span>استعادة الافتراضي</span>
                  </button>
                </div>

                {/* Field 1: Title */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-[#475569]">
                    عنوان صفحة الصيانة:
                  </label>
                  <input
                    type="text"
                    value={details.title}
                    onChange={(e) => setDetails({ ...details, title: e.target.value })}
                    className="w-full bg-white border border-[#CBD5E1] rounded-xl p-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#E11D48]"
                  />
                </div>

                {/* Field 2: Notice Message */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-[#475569]">
                    الرسالة التوضيحية للطلبة:
                  </label>
                  <textarea
                    rows={3}
                    value={details.notice}
                    onChange={(e) => setDetails({ ...details, notice: e.target.value })}
                    className="w-full bg-white border border-[#CBD5E1] rounded-xl p-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#E11D48] leading-relaxed"
                  />
                </div>

                {/* Field 3: Estimated Return */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-[#475569]">
                      الوقت المقدر للعودة:
                    </label>
                    <input
                      type="text"
                      value={details.estimatedReturn}
                      onChange={(e) => setDetails({ ...details, estimatedReturn: e.target.value })}
                      className="w-full bg-white border border-[#CBD5E1] rounded-xl p-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#E11D48]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-[#475569]">
                      بريد التواصل أثناء الصيانة:
                    </label>
                    <input
                      type="email"
                      value={details.adminEmail}
                      onChange={(e) => setDetails({ ...details, adminEmail: e.target.value })}
                      className="w-full bg-white border border-[#CBD5E1] rounded-xl p-2 text-xs text-[#0F172A] font-mono focus:outline-none focus:border-[#E11D48]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                  >
                    <HiSave className="w-4 h-4 text-rose-400" />
                    <span>حفظ التعديلات على النصوص ✓</span>
                  </button>
                </div>
              </form>

              {/* 🔑 PIN MANAGEMENT & LOGOUT */}
              <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-xs flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setShowChangePin(!showChangePin)}
                  className="text-slate-600 hover:text-[#E11D48] font-bold flex items-center gap-1 cursor-pointer"
                >
                  <HiKey className="w-3.5 h-3.5" />
                  <span>{showChangePin ? 'إخفاء تعديل الرمز السري' : 'تغيير رمز الأمان (PIN)'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleLogoutAdmin}
                  className="text-rose-600 hover:underline cursor-pointer"
                >
                  تسجيل خروج المسؤول
                </button>
              </div>

              {/* Change PIN Dropdown */}
              {showChangePin && (
                <form onSubmit={handleChangePinSubmit} className="p-3 rounded-xl bg-slate-100 border border-slate-200 space-y-2">
                  <label className="block text-[11px] font-bold text-slate-700">
                    أدخل الرمز السري الجديد (4 أرقام على الأقل):
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="password"
                      placeholder="الرمز الجديد..."
                      value={newPinInput}
                      onChange={(e) => setNewPinInput(e.target.value)}
                      className="bg-white border border-slate-300 rounded-lg p-1.5 text-xs font-mono flex-1 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-[#E11D48] text-white font-bold text-xs rounded-lg cursor-pointer"
                    >
                      تحديث الرمز
                    </button>
                  </div>
                </form>
              )}

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
          <div className="text-[#64748B] text-[11px] flex items-center gap-1">
            <HiInformationCircle className="w-4 h-4 text-slate-400" />
            <span>اختصار الفتح السريع من أي صفحة: <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono text-[10px]">Ctrl + Shift + M</kbd></span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-[#0F172A] border border-slate-300 font-bold transition-colors cursor-pointer"
          >
            إغلاق
          </button>
        </div>

      </div>

    </div>
  );
}
