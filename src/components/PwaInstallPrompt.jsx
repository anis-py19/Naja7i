import React, { useState, useEffect } from 'react';
import { 
  HiDownload, 
  HiX, 
  HiCheckCircle
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showOnlineToast, setShowOnlineToast] = useState(false);

  // 1. Listen for PWA Install Prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent default mini-infobar
      e.preventDefault();
      setDeferredPrompt(e);

      // Check if user dismissed it recently (cooldown 5 days)
      const lastDismissed = localStorage.getItem('naja7i_pwa_dismissed');
      if (lastDismissed) {
        const diffDays = (Date.now() - parseInt(lastDismissed, 10)) / (1000 * 60 * 60 * 24);
        if (diffDays < 5) return;
      }

      setShowInstallBanner(true);
    };

    const handleAppInstalled = () => {
      setShowInstallBanner(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // 2. Listen for Online / Offline Connectivity
  useEffect(() => {
    let onlineTimer = null;

    const handleOnline = () => {
      setIsOffline(false);
      setShowOnlineToast(true);
      if (onlineTimer) clearTimeout(onlineTimer);
      onlineTimer = setTimeout(() => setShowOnlineToast(false), 3500);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setShowOnlineToast(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      if (onlineTimer) clearTimeout(onlineTimer);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Trigger browser install
  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallBanner(false);
    }
    setDeferredPrompt(null);
  };

  // Dismiss install banner with cooldown
  const handleDismiss = () => {
    setShowInstallBanner(false);
    try {
      localStorage.setItem('naja7i_pwa_dismissed', Date.now().toString());
    } catch {}
  };

  return (
    <>
      {/* 📡 1. Offline Mode Alert Toast */}
      <AnimatePresence>
        {isOffline && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-2 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-amber-500 text-slate-950 text-xs font-bold shadow-xl border border-amber-400 flex items-center gap-2 max-w-lg w-[92%] font-['Cairo']"
          >
            <span className="text-base">📡</span>
            <div className="flex-1 min-w-0">
              <span className="block font-black">أنت تتصفح في وضع عدم الاتصال (Offline)</span>
              <span className="text-[11px] font-medium text-slate-900 opacity-90 truncate block">
                كراس الأخطاء، غرفة التركيز، المخطط والحاسبة تعمل كالمعتاد.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ⚡ 2. Back Online Alert Toast */}
      <AnimatePresence>
        {showOnlineToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-2 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-2xl bg-emerald-600 text-white text-xs font-bold shadow-xl border border-emerald-500 flex items-center gap-2 font-['Cairo']"
          >
            <HiCheckCircle className="w-5 h-5 text-emerald-200" />
            <span>تم استعادة الاتصال بالإنترنت بنجاح! ⚡</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📲 3. PWA Install Bottom Floating Banner */}
      <AnimatePresence>
        {showInstallBanner && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-[#0F172A] border border-slate-700 text-white p-4 rounded-2xl shadow-2xl font-['Cairo'] flex items-center justify-between gap-3 backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white p-0.5 shadow-md flex items-center justify-center shrink-0 border border-white/20">
                <img src="/logo.jpg" alt="نجاحي" className="w-full h-full object-contain rounded-lg" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 leading-none mb-1">
                  <span className="font-bold text-xs text-white">تثبيت تطبيق نجاحي 🇩🇿</span>
                  <span className="text-[10px] bg-rose-600 text-white px-1.5 py-0.2 rounded font-sans font-bold">PWA</span>
                </div>
                <p className="text-[11px] text-slate-300 line-clamp-1">
                  وصول سريع بنقرة واحدة ودراسة بدون إنترنت.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleInstallClick}
                className="px-3.5 py-1.5 rounded-xl bg-[#E11D48] hover:bg-[#be123c] text-white text-xs font-bold transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
              >
                <HiDownload className="w-3.5 h-3.5" />
                <span>تثبيت</span>
              </button>

              <button
                onClick={handleDismiss}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="إغلاق"
              >
                <HiX className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
