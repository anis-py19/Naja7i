import React, { useState, useEffect } from 'react';
import { 
  HiX, 
  HiShieldCheck, 
  HiCheck, 
  HiRefresh, 
  HiSearch, 
  HiAdjustments,
  HiLightningBolt,
  HiClock,
  HiInformationCircle
} from 'react-icons/hi';
import { 
  DEFAULT_FEATURES_CONFIG, 
  getActiveFeaturesConfig, 
  saveActiveFeaturesConfig 
} from '../config/siteConfig';

export default function AdminControlModal({ isOpen, onClose }) {
  const [config, setConfig] = useState(getActiveFeaturesConfig());
  const [searchQuery, setSearchQuery] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [editingFeatureId, setEditingFeatureId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setConfig(getActiveFeaturesConfig());
      setSavedSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Toggle maintenance for a specific feature
  const handleToggle = (featureId) => {
    const updated = {
      ...config,
      [featureId]: {
        ...config[featureId],
        isMaintenance: !config[featureId].isMaintenance
      }
    };
    setConfig(updated);
    saveActiveFeaturesConfig(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  // Toggle all features on or off
  const handleToggleAll = (status) => {
    const updated = { ...config };
    Object.keys(updated).forEach((key) => {
      updated[key] = {
        ...updated[key],
        isMaintenance: status
      };
    });
    setConfig(updated);
    saveActiveFeaturesConfig(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  // Reset to default config
  const handleResetToDefault = () => {
    if (window.confirm('هل تريد استعادة الإعدادات الافتراضية (تشغيل جميع الميزات)؟')) {
      setConfig(DEFAULT_FEATURES_CONFIG);
      saveActiveFeaturesConfig(DEFAULT_FEATURES_CONFIG);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };

  // Update custom notice or estimated return
  const handleUpdateText = (featureId, field, value) => {
    const updated = {
      ...config,
      [featureId]: {
        ...config[featureId],
        [field]: value
      }
    };
    setConfig(updated);
    saveActiveFeaturesConfig(updated);
  };

  // Filtered feature list
  const featureEntries = Object.entries(config).filter(([key, feat]) => {
    if (key === 'global_site') return false; // Handled separately on top
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      feat.name.toLowerCase().includes(q) ||
      (feat.path && feat.path.toLowerCase().includes(q))
    );
  });

  const maintenanceCount = Object.values(config).filter(f => f.isMaintenance).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs font-['Cairo']" dir="rtl">
      
      <div className="bg-white border border-[#E2E8F0] rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#E2E8F0] flex items-center justify-between bg-slate-900 text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-600/20 border border-rose-500/30 text-[#E11D48] flex items-center justify-center text-lg">
              <HiAdjustments className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-black text-white">
                  لوحة التحكم في أوضاع الصيانة (Feature Maintenance Manager)
                </h2>
                <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 font-mono text-[10px] font-bold border border-rose-500/30">
                  Admin Panel
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                التحكم اللحظي في تشغيل أو إيقاف أي قسم أو ميزة في المنصة
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <HiX className="w-5 h-5" />
          </button>
        </div>

        {/* Global Master Switch Box */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50 to-rose-50/30 border-b border-[#E2E8F0] shrink-0 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-rose-200/80 shadow-2xs">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{config.global_site?.icon || '🌐'}</span>
              <div>
                <strong className="text-xs sm:text-sm font-black text-[#0F172A] block">
                  {config.global_site?.name || 'وضع الصيانة العام لكامل المنصة'}
                </strong>
                <span className="text-[11px] text-[#64748B]">
                  {config.global_site?.isMaintenance 
                    ? '⚠️ المنصة مغلقة بالكامل حالياً أمام الزوار العاديين' 
                    : '🟢 المنصة مفتوحة وتعمل بكامل طاقتها لجميع الزوار'}
                </span>
              </div>
            </div>

            <button
              onClick={() => handleToggle('global_site')}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                config.global_site?.isMaintenance
                  ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <span>{config.global_site?.isMaintenance ? 'وضع الصيانة مفعّل 🔴' : 'الموقع نشط ومتاح 🟢'}</span>
            </button>
          </div>

          {/* Quick Filter & Global Action Strip */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="relative flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="ابحث عن ميزة أو قسم..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3 pr-8 py-1.5 rounded-lg bg-white border border-[#CBD5E1] text-xs text-[#0F172A] focus:outline-none focus:border-[#E11D48]"
              />
              <HiSearch className="w-4 h-4 text-slate-400 absolute right-2.5 top-2" />
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => handleToggleAll(false)}
                className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-200 transition-colors cursor-pointer"
                title="تشغيل جميع الميزات"
              >
                تشغيل الكل 🟢
              </button>

              <button
                onClick={() => handleToggleAll(true)}
                className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 text-[11px] font-bold border border-rose-200 transition-colors cursor-pointer"
                title="تفعيل الصيانة للكل"
              >
                صيانة للكل 🛠️
              </button>

              <button
                onClick={handleResetToDefault}
                className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold border border-slate-200 transition-colors cursor-pointer"
                title="استعادة الإعدادات الافتراضية"
              >
                افتراضي ↺
              </button>
            </div>
          </div>
        </div>

        {/* Features Toggle List (Scrollable Area) */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-2.5 divide-y divide-slate-100">
          
          {savedSuccess && (
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between animate-fadeIn mb-2">
              <span>✓ تم حفظ التغييرات وتطبيقها لحظياً على المنصة!</span>
              <span className="text-[10px] text-emerald-600 font-mono">Live Updated</span>
            </div>
          )}

          {featureEntries.map(([fKey, feature]) => {
            const isEditing = editingFeatureId === fKey;

            return (
              <div
                key={fKey}
                className={`pt-2.5 pb-1 rounded-xl p-3 transition-all ${
                  feature.isMaintenance 
                    ? 'bg-rose-50/50 border border-rose-200/80' 
                    : 'bg-white border border-[#E2E8F0] hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xl shrink-0">
                      {feature.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-xs sm:text-sm text-[#0F172A] truncate">
                          {feature.name}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                          {feature.path}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#64748B] truncate mt-0.5">
                        {feature.isMaintenance ? `⚠️ قيد الصيانة: ${feature.notice}` : 'متاح ونشط للطلاب والأساتذة'}
                      </p>
                    </div>
                  </div>

                  {/* Switch & Edit Controls */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setEditingFeatureId(isEditing ? null : fKey)}
                      className="text-[11px] font-bold text-slate-600 hover:text-[#E11D48] p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                      title="تعديل رسالة الصيانة والوقت"
                    >
                      {isEditing ? 'إغلاق ✕' : 'تعديل ✍️'}
                    </button>

                    <button
                      onClick={() => handleToggle(fKey)}
                      className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        feature.isMaintenance ? 'bg-rose-600' : 'bg-emerald-500'
                      }`}
                      title={feature.isMaintenance ? 'انقر لتشغيل الميزة' : 'انقر لوضع الميزة في الصيانة'}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          feature.isMaintenance ? 'translate-x-0' : '-translate-x-6'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Edit Form Drawer */}
                {isEditing && (
                  <div className="mt-3 pt-3 border-t border-slate-200/80 space-y-2 text-xs bg-slate-50 p-3 rounded-xl">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        رسالة التوضيح للطالب أثناء الصيانة:
                      </label>
                      <input
                        type="text"
                        value={feature.notice || ''}
                        onChange={(e) => handleUpdateText(fKey, 'notice', e.target.value)}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#E11D48]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        الوقت المتوقع للعودة:
                      </label>
                      <input
                        type="text"
                        value={feature.estimatedReturn || ''}
                        onChange={(e) => handleUpdateText(fKey, 'estimatedReturn', e.target.value)}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#E11D48]"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#E2E8F0] bg-slate-50 flex items-center justify-between text-xs shrink-0">
          <span className="text-[11px] text-slate-600">
            عدد الميزات تحت الصيانة: <strong className="text-rose-600 font-bold">{maintenanceCount}</strong> / {featureEntries.length}
          </span>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer shadow-2xs"
          >
            إغلاق وحفظ ✓
          </button>
        </div>

      </div>

    </div>
  );
}
