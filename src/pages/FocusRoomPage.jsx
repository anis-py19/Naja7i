import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiHome, 
  HiPlay, 
  HiPause, 
  HiRefresh, 
  HiVolumeUp, 
  HiChevronLeft, 
  HiChevronRight, 
  HiCheck, 
  HiArrowsExpand,
  HiAdjustments,
  HiX
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { BAC_FOCUS_TIPS, getRandomFocusTips } from '../data/focusTipsData';
import { focusSoundEngine } from '../utils/focusSoundEngine';

// Minimalist Themes (Clean, Calm & Focused)
const THEMES = [
  {
    id: 'slate-dark',
    name: 'الهدوء الليلي (Slate Dark)',
    bg: 'bg-[#0B0F19]',
    cardBg: 'bg-[#151D2E]/70 border-slate-700/50',
    accent: '#E11D48',
    accentClass: 'bg-[#E11D48] text-white hover:bg-[#be123c]'
  },
  {
    id: 'lofi-warm',
    name: 'الدفء والأصالة (Warm Lofi)',
    bg: 'bg-[#18121E]',
    cardBg: 'bg-[#261C30]/70 border-purple-800/40',
    accent: '#F43F5E',
    accentClass: 'bg-rose-500 text-white hover:bg-rose-600'
  },
  {
    id: 'zen-forest',
    name: 'هدوء الغابة (Zen Emerald)',
    bg: 'bg-[#061812]',
    cardBg: 'bg-[#0E2820]/70 border-emerald-800/40',
    accent: '#10B981',
    accentClass: 'bg-emerald-500 text-white hover:bg-emerald-600'
  },
  {
    id: 'pure-black',
    name: 'السكون التام (Pure OLED)',
    bg: 'bg-[#000000]',
    cardBg: 'bg-[#111111]/80 border-neutral-800',
    accent: '#FFFFFF',
    accentClass: 'bg-white text-black hover:bg-neutral-200'
  }
];

// Simple Quick Presets
const PRESETS = [
  { label: '25 دقيقة', focus: 25, short: 5, long: 15 },
  { label: '50 دقيقة', focus: 50, short: 10, long: 20 },
  { label: '90 دقيقة', focus: 90, short: 20, long: 30 }
];

export default function FocusRoomPage() {
  // Theme & Zen Fullscreen
  const [themeId, setThemeId] = useState('slate-dark');
  const [isZen, setIsZen] = useState(false);

  // Timer Modes: 'focus' | 'shortBreak' | 'longBreak'
  const [mode, setMode] = useState('focus');
  const [focusMins, setFocusMins] = useState(25);
  const [shortMins, setShortMins] = useState(5);
  const [longMins, setLongMins] = useState(15);
  const [showCustomModal, setShowCustomModal] = useState(false);

  // Active duration in seconds
  const currentDuration = useMemo(() => {
    if (mode === 'focus') return focusMins * 60;
    if (mode === 'shortBreak') return shortMins * 60;
    return longMins * 60;
  }, [mode, focusMins, shortMins, longMins]);

  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  // Focus Statistics in localStorage
  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem('naja7i_focus_stats');
      if (saved) return JSON.parse(saved);
    } catch {}
    return { completedSessions: 0, totalFocusMinutes: 0, streakDays: 1, lastSessionDate: '' };
  });

  // Current Session Goal
  const [currentGoal, setCurrentGoal] = useState('');
  const [isGoalDone, setIsGoalDone] = useState(false);

  // Ambient Web Audio Sounds
  const [activeSound, setActiveSound] = useState('none');
  const [volume, setVolume] = useState(0.5);

  // Rotating Tips (Randomized every 20 seconds)
  const shuffledTips = useMemo(() => getRandomFocusTips(BAC_FOCUS_TIPS), []);
  const [tipIndex, setTipIndex] = useState(0);
  const activeTip = shuffledTips[tipIndex] || BAC_FOCUS_TIPS[0];

  // Active Theme object
  const activeTheme = useMemo(() => THEMES.find((t) => t.id === themeId) || THEMES[0], [themeId]);

  // Mode Switch Helper
  const handleSwitchMode = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    if (newMode === 'focus') setTimeLeft(focusMins * 60);
    else if (newMode === 'shortBreak') setTimeLeft(shortMins * 60);
    else setTimeLeft(longMins * 60);
  };

  // Completion Handler
  const handleSessionFinished = useCallback(() => {
    setIsRunning(false);
    focusSoundEngine.playCompletionChime();

    if (mode === 'focus') {
      const todayStr = new Date().toISOString().slice(0, 10);
      const isNewDay = stats.lastSessionDate !== todayStr;
      const updatedStats = {
        completedSessions: stats.completedSessions + 1,
        totalFocusMinutes: stats.totalFocusMinutes + focusMins,
        streakDays: isNewDay ? (stats.streakDays || 0) + 1 : (stats.streakDays || 1),
        lastSessionDate: todayStr
      };
      setStats(updatedStats);
      try {
        localStorage.setItem('naja7i_focus_stats', JSON.stringify(updatedStats));
      } catch {}

      // Auto-switch to Short Break
      setMode('shortBreak');
      setTimeLeft(shortMins * 60);
    } else {
      // Auto-switch back to Focus
      setMode('focus');
      setTimeLeft(focusMins * 60);
    }
  }, [mode, focusMins, shortMins, stats]);

  // 1. Countdown Timer Engine
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSessionFinished();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, handleSessionFinished]);

  // 2. 20-Second Advice Auto-Rotation
  useEffect(() => {
    const tipInterval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % shuffledTips.length);
    }, 20000);
    return () => clearInterval(tipInterval);
  }, [shuffledTips.length]);

  // 3. Tab Title Sync
  useEffect(() => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    const modeLabel = mode === 'focus' ? '🎯 تركيز' : mode === 'shortBreak' ? '☕ استراحة' : '🌿 استراحة';
    document.title = `${formatted} | ${modeLabel} — نجاحي`;
    return () => {
      document.title = 'نجاحي | Naja7i — منصة تحضير شهادة البكالوريا 🇩🇿';
    };
  }, [timeLeft, mode]);

  // 4. Keyboard Shortcut: Spacebar for Start/Pause
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsRunning((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sound Handler
  const handleSoundChange = (sndId) => {
    setActiveSound(sndId);
    focusSoundEngine.playSound(sndId, volume);
  };

  const handleVolumeChange = (newVol) => {
    setVolume(newVol);
    focusSoundEngine.setVolume(newVol);
  };

  // Clean Audio on Unmount
  useEffect(() => {
    return () => {
      focusSoundEngine.stop();
    };
  }, []);

  // Time calculations
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  const progressPercent = ((currentDuration - timeLeft) / currentDuration) * 100;

  return (
    <div className={`min-h-screen ${activeTheme.bg} text-white font-['Cairo'] flex flex-col justify-between transition-colors duration-500 selection:bg-rose-500 selection:text-white`}>
      
      {/* ========================================================================= */}
      {/* 🧭 1. TOP MINIMALIST HEADER */}
      {/* ========================================================================= */}
      <header className={`px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-white/10 transition-opacity duration-300 ${isZen ? 'opacity-10 hover:opacity-100' : 'opacity-100'}`}>
        
        {/* Back Link & Title */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold transition-all text-white border border-white/15 cursor-pointer"
          >
            <HiHome className="w-4 h-4" />
            <span className="hidden sm:inline">الرئيسية</span>
          </Link>

          <div className="flex items-center gap-2 border-r border-white/15 pr-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <h1 className="text-xs sm:text-sm font-black tracking-wide">
              غرفة التركيز (بومودورو)
            </h1>
          </div>
        </div>

        {/* Header Right: Stats & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick Stats Pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs">
            <span className="text-amber-300 font-bold">🔥 {stats.streakDays} أيام</span>
            <span className="text-white/20">•</span>
            <span className="text-emerald-300 font-bold">🎯 {stats.completedSessions} جلسات ({stats.totalFocusMinutes}د)</span>
          </div>

          {/* Theme Dropdown */}
          <select
            value={themeId}
            onChange={(e) => setThemeId(e.target.value)}
            aria-label="تغيير الثيم"
            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white focus:outline-none cursor-pointer"
          >
            {THEMES.map((th) => (
              <option key={th.id} value={th.id} className="bg-slate-900 text-white">
                {th.name}
              </option>
            ))}
          </select>

          {/* Zen Fullscreen Button */}
          <button
            onClick={() => setIsZen((prev) => !prev)}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              isZen ? 'bg-rose-500 border-rose-400 text-white' : 'bg-white/10 hover:bg-white/20 border-white/15 text-white'
            }`}
            title={isZen ? 'الخروج من وضع التركيز الكامل' : 'تفعيل وضع التركيز الكامل (Zen)'}
          >
            <HiArrowsExpand className="w-4 h-4" />
          </button>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* ⏱️ 2. MAIN CENTER: CLEAN & MINIMALIST POMODORO */}
      {/* ========================================================================= */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 max-w-2xl mx-auto w-full my-auto">
        
        {/* Simple Mode Switcher */}
        <div className={`flex items-center gap-1.5 p-1 rounded-xl bg-white/10 border border-white/15 mb-6 transition-all ${isZen ? 'opacity-20 hover:opacity-100' : 'opacity-100'}`}>
          <button
            onClick={() => handleSwitchMode('focus')}
            className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'focus'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            🎯 جلسة تركيز ({focusMins}د)
          </button>

          <button
            onClick={() => handleSwitchMode('shortBreak')}
            className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'shortBreak'
                ? 'bg-emerald-400 text-slate-900 shadow-sm'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            ☕ استراحة قصيرة ({shortMins}د)
          </button>

          <button
            onClick={() => handleSwitchMode('longBreak')}
            className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mode === 'longBreak'
                ? 'bg-sky-400 text-slate-900 shadow-sm'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            🌿 استراحة طويلة ({longMins}د)
          </button>
        </div>

        {/* Clean Goal Input Line */}
        <div className={`w-full max-w-md mb-6 transition-all ${isZen ? 'opacity-30 hover:opacity-100' : 'opacity-100'}`}>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 focus-within:border-white/30 transition-all">
            <button
              onClick={() => setIsGoalDone((prev) => !prev)}
              aria-label="تأشير الهدف"
              className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                isGoalDone
                  ? 'bg-emerald-400 border-emerald-300 text-slate-900'
                  : 'border-white/30 hover:border-white/60 bg-transparent'
              }`}
            >
              {isGoalDone && <HiCheck className="w-3.5 h-3.5 font-black" />}
            </button>

            <input
              type="text"
              value={currentGoal}
              onChange={(e) => {
                setCurrentGoal(e.target.value);
                if (isGoalDone) setIsGoalDone(false);
              }}
              placeholder="ما هو هدفك المحدد في هذه الجلسة؟ (اختياري)"
              className={`w-full bg-transparent text-xs text-white placeholder-white/40 focus:outline-none ${
                isGoalDone ? 'line-through text-white/40' : ''
              }`}
            />
          </div>
        </div>

        {/* ⏰ Large Minimalist Digital Clock */}
        <div className="text-center my-4 space-y-2">
          <div className="text-7xl sm:text-8xl md:text-9xl font-black font-mono tracking-tighter text-white drop-shadow-md select-none">
            {formattedMinutes}:{formattedSeconds}
          </div>

          {/* Minimalist Progress Line */}
          <div className="w-48 sm:w-64 h-1.5 bg-white/10 rounded-full mx-auto overflow-hidden">
            <div 
              className="h-full transition-all duration-1000 ease-linear rounded-full"
              style={{ width: `${progressPercent}%`, backgroundColor: activeTheme.accent }}
            />
          </div>
        </div>

        {/* 🎮 Core Controls (Start / Pause / Reset / Skip) */}
        <div className="flex items-center gap-3 mt-6">
          
          {/* Reset */}
          <button
            onClick={() => {
              setIsRunning(false);
              setTimeLeft(currentDuration);
            }}
            className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all active:scale-95 cursor-pointer"
            title="إعادة التعيين"
          >
            <HiRefresh className="w-5 h-5" />
          </button>

          {/* Main Play / Pause Button */}
          <button
            onClick={() => setIsRunning((prev) => !prev)}
            className="px-8 py-3.5 rounded-xl font-black text-sm sm:text-base transition-all active:scale-95 flex items-center gap-2 shadow-lg cursor-pointer"
            style={{
              backgroundColor: isRunning ? '#FFFFFF' : activeTheme.accent,
              color: isRunning ? '#0F172A' : '#FFFFFF'
            }}
          >
            {isRunning ? (
              <>
                <HiPause className="w-5 h-5" />
                <span>إيقاف مؤقت (Space)</span>
              </>
            ) : (
              <>
                <HiPlay className="w-5 h-5 ml-0.5" />
                <span>ابدأ الآن (Space)</span>
              </>
            )}
          </button>

          {/* Skip */}
          <button
            onClick={handleSessionFinished}
            className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all active:scale-95 cursor-pointer"
            title="تخطي الجلسة"
          >
            <HiChevronLeft className="w-5 h-5" />
          </button>

        </div>

        {/* ⏱️ Simple Presets Row */}
        <div className={`flex flex-wrap items-center justify-center gap-1.5 mt-6 transition-opacity ${isZen ? 'opacity-0' : 'opacity-100'}`}>
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setFocusMins(p.focus);
                setShortMins(p.short);
                setLongMins(p.long);
                setIsRunning(false);
                if (mode === 'focus') setTimeLeft(p.focus * 60);
                else if (mode === 'shortBreak') setTimeLeft(p.short * 60);
                else setTimeLeft(p.long * 60);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer border ${
                focusMins === p.focus
                  ? 'bg-white/20 border-white/40 text-white'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/60'
              }`}
            >
              {p.label}
            </button>
          ))}

          <button
            onClick={() => setShowCustomModal(true)}
            className="px-3 py-1 rounded-lg text-xs font-bold bg-white/5 hover:bg-white/15 border border-white/10 text-amber-300 transition-colors cursor-pointer flex items-center gap-1"
          >
            <HiAdjustments className="w-3.5 h-3.5" />
            <span>تخصيص...</span>
          </button>
        </div>

        {/* 🎧 Clean Ambient Sounds Selector */}
        <div className={`mt-5 flex flex-wrap items-center justify-center gap-1.5 p-2 rounded-xl bg-white/5 border border-white/10 transition-all ${isZen ? 'opacity-20 hover:opacity-100' : 'opacity-100'}`}>
          <span className="text-xs text-white/60 flex items-center gap-1 ml-2">
            <HiVolumeUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>الأصوات:</span>
          </span>

          {[
            { id: 'none', label: '🔇 صامت' },
            { id: 'rain', label: '🌧️ مطر' },
            { id: 'brown', label: '📻 ضوضاء بنية' },
            { id: 'fire', label: '🔥 حطب' },
            { id: 'waves', label: '🌊 أمواج' }
          ].map((snd) => (
            <button
              key={snd.id}
              onClick={() => handleSoundChange(snd.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                activeSound === snd.id
                  ? 'bg-emerald-500 text-white border-emerald-400'
                  : 'bg-transparent hover:bg-white/5 border-transparent text-white/70'
              }`}
            >
              {snd.label}
            </button>
          ))}

          {activeSound !== 'none' && (
            <div className="flex items-center gap-1.5 mr-2 pr-2 border-r border-white/15">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                aria-label="مستوى الصوت"
                className="w-14 accent-emerald-400 cursor-pointer"
              />
            </div>
          )}
        </div>

      </main>

      {/* ========================================================================= */}
      {/* 💡 3. BOTTOM: SUBTLE ROTATING BAC ADVICE (20s) */}
      {/* ========================================================================= */}
      <footer className={`p-4 transition-all ${isZen ? 'opacity-10 hover:opacity-100' : 'opacity-100'}`}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-center justify-between gap-3 text-xs">
            
            <button
              onClick={() => setTipIndex((prev) => (prev - 1 + shuffledTips.length) % shuffledTips.length)}
              className="p-1 rounded text-white/50 hover:text-white transition-colors cursor-pointer shrink-0"
              title="السابقة"
            >
              <HiChevronRight className="w-4 h-4" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTip.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="flex-1 min-w-0"
              >
                <span className="text-[11px] font-bold text-amber-300 ml-1.5">
                  {activeTip.icon} {activeTip.category}:
                </span>
                <span className="text-white/80 font-medium">
                  « {activeTip.text} »
                </span>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={() => setTipIndex((prev) => (prev + 1) % shuffledTips.length)}
              className="p-1 rounded text-white/50 hover:text-white transition-colors cursor-pointer shrink-0"
              title="التالية"
            >
              <HiChevronLeft className="w-4 h-4" />
            </button>

          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* ⚙️ 4. CUSTOM TIME MODAL */}
      {/* ========================================================================= */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl text-white space-y-4 text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="font-bold text-sm">⏱️ تخصيص أوقات البومودورو</h3>
              <button
                onClick={() => setShowCustomModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <HiX className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block font-bold text-slate-300 mb-1">جلسة التركيز (بالدقائق):</label>
                <input
                  type="number"
                  min="1"
                  max="180"
                  value={focusMins}
                  onChange={(e) => setFocusMins(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono font-bold focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">استراحة قصيرة (بالدقائق):</label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={shortMins}
                  onChange={(e) => setShortMins(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">استراحة طويلة (بالدقائق):</label>
                <input
                  type="number"
                  min="1"
                  max="90"
                  value={longMins}
                  onChange={(e) => setLongMins(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono font-bold focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <button
              onClick={() => {
                setShowCustomModal(false);
                setIsRunning(false);
                if (mode === 'focus') setTimeLeft(focusMins * 60);
                else if (mode === 'shortBreak') setTimeLeft(shortMins * 60);
                else setTimeLeft(longMins * 60);
              }}
              className="w-full py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition-colors cursor-pointer"
            >
              حفظ وتطبيق
            </button>
          </motion.div>
        </div>
      )}

    </div>
  );
}
