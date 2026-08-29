import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiHome, 
  HiChevronLeft, 
  HiPlay, 
  HiPause, 
  HiRefresh, 
  HiSparkles,
  HiVolumeUp,
  HiChevronRight,
  HiCheck,
  HiArrowsExpand
} from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { BAC_FOCUS_TIPS, getRandomFocusTips } from '../data/focusTipsData';
import { focusSoundEngine } from '../utils/focusSoundEngine';

// Aesthetic Animated Visual Themes
const THEMES = [
  {
    id: 'lofi-desk',
    name: 'غرفة الأنمي الدافئة ☕',
    badge: 'Lofi Study',
    bgClass: 'from-[#1e1b4b] via-[#2e1065] to-[#0f172a]',
    glowColor: 'rgba(244, 63, 94, 0.15)',
    accent: '#f43f5e',
    ambientAnimation: 'particles'
  },
  {
    id: 'rain-cafe',
    name: 'مطر النافذة الهادئ 🌧️',
    badge: 'Rainy Cafe',
    bgClass: 'from-[#0f172a] via-[#1e293b] to-[#090d16]',
    glowColor: 'rgba(56, 189, 248, 0.15)',
    accent: '#38bdf8',
    ambientAnimation: 'rain'
  },
  {
    id: 'midnight-stars',
    name: 'سماء النجوم الهادئة 🌌',
    badge: 'Midnight Stars',
    bgClass: 'from-[#090a0f] via-[#18122B] to-[#020617]',
    glowColor: 'rgba(168, 85, 247, 0.15)',
    accent: '#a855f7',
    ambientAnimation: 'stars'
  },
  {
    id: 'zen-forest',
    name: 'غابة الهدوء والتركيز 🌲',
    badge: 'Zen Forest',
    bgClass: 'from-[#064e3b] via-[#022c22] to-[#021c15]',
    glowColor: 'rgba(52, 211, 153, 0.15)',
    accent: '#34d399',
    ambientAnimation: 'forest'
  },
  {
    id: 'pure-minimal',
    name: 'التركيز المظلم الصافي 🖤',
    badge: 'Pure Minimal',
    bgClass: 'from-[#0a0a0a] via-[#121212] to-[#050505]',
    glowColor: 'rgba(255, 255, 255, 0.08)',
    accent: '#ffffff',
    ambientAnimation: 'none'
  }
];

// Presets for Pomodoro
const TIME_PRESETS = [
  { label: '25 دقيقة (كلاسيكي)', focus: 25, short: 5, long: 15, tag: 'بومودورو' },
  { label: '50 دقيقة (تركيز عميق)', focus: 50, short: 10, long: 20, tag: 'Deep Work' },
  { label: '90 دقيقة (جلسة البكالوريا)', focus: 90, short: 20, long: 30, tag: 'محاكاة امتحان' }
];

export default function FocusRoomPage() {
  // Theme & Zen Mode
  const [currentThemeId, setCurrentThemeId] = useState('lofi-desk');
  const [isZenMode, setIsZenMode] = useState(false);

  // Timer Modes: 'focus' | 'shortBreak' | 'longBreak'
  const [timerMode, setTimerMode] = useState('focus');
  const [customFocusMinutes, setCustomFocusMinutes] = useState(25);
  const [customShortMinutes, setCustomShortMinutes] = useState(5);
  const [customLongMinutes, setCustomLongMinutes] = useState(15);
  const [showCustomModal, setShowCustomModal] = useState(false);

  // Active duration in seconds
  const currentDurationSeconds = useMemo(() => {
    if (timerMode === 'focus') return customFocusMinutes * 60;
    if (timerMode === 'shortBreak') return customShortMinutes * 60;
    return customLongMinutes * 60;
  }, [timerMode, customFocusMinutes, customShortMinutes, customLongMinutes]);

  const [timeLeft, setTimeLeft] = useState(currentDurationSeconds);
  const [isRunning, setIsRunning] = useState(false);

  // Session Statistics in localStorage
  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem('naja7i_focus_stats');
      return saved ? JSON.parse(saved) : { completedSessions: 0, totalFocusMinutes: 0, streakDays: 1, lastDate: new Date().toDateString() };
    } catch {
      return { completedSessions: 0, totalFocusMinutes: 0, streakDays: 1, lastDate: new Date().toDateString() };
    }
  });

  // Current session goal
  const [currentGoal, setCurrentGoal] = useState('');
  const [isGoalCompleted, setIsGoalCompleted] = useState(false);

  // Ambient sound state
  const [activeSound, setActiveSound] = useState('none'); // 'none' | 'rain' | 'brown' | 'fire' | 'waves'
  const [soundVolume, setSoundVolume] = useState(0.5);

  // 20-second rotating tips
  const shuffledTips = useMemo(() => getRandomFocusTips(100), []);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  // Handle Tip rotation every 20 seconds
  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % (shuffledTips.length || BAC_FOCUS_TIPS.length));
    }, 20000); // 20 seconds
    return () => clearInterval(tipInterval);
  }, [shuffledTips.length]);

  // Sync timeLeft when switching modes or custom duration if not running
  const prevDurationRef = useRef(currentDurationSeconds);
  useEffect(() => {
    if (!isRunning || prevDurationRef.current !== currentDurationSeconds) {
      setTimeLeft(currentDurationSeconds);
      prevDurationRef.current = currentDurationSeconds;
    }
  }, [currentDurationSeconds, isRunning]);

  // Trigger celebration & audio on session complete
  const handleSessionComplete = useCallback(() => {
    setIsRunning(false);
    focusSoundEngine.playCompletionChime();

    if (timerMode === 'focus') {
      const addedMinutes = customFocusMinutes;
      const todayStr = new Date().toDateString();
      setStats((prev) => {
        const next = {
          completedSessions: prev.completedSessions + 1,
          totalFocusMinutes: prev.totalFocusMinutes + addedMinutes,
          streakDays: prev.lastDate === todayStr ? prev.streakDays : prev.streakDays + 1,
          lastDate: todayStr
        };
        try {
          localStorage.setItem('naja7i_focus_stats', JSON.stringify(next));
        } catch {}
        return next;
      });

      // Switch to short break automatically
      setTimerMode('shortBreak');
    } else {
      // Break completed -> switch back to focus
      setTimerMode('focus');
    }
  }, [timerMode, customFocusMinutes]);

  // Main countdown timer interval
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, handleSessionComplete]);

  // Update browser document title with remaining time
  useEffect(() => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    const formatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    const modeLabel = timerMode === 'focus' ? '🎯 تركيز' : '☕ استراحة';
    document.title = `${formatted} | ${modeLabel} — منصة نجاحي`;

    return () => {
      document.title = 'منصة نجاحي (Naja7i) — البوابة الشاملة لبكالوريا الجزائر';
    };
  }, [timeLeft, timerMode]);

  // Handle ambient sound changes
  const handleSoundChange = (soundId) => {
    setActiveSound(soundId);
    if (soundId === 'rain') focusSoundEngine.playRain();
    else if (soundId === 'brown') focusSoundEngine.playBrownNoise();
    else if (soundId === 'fire') focusSoundEngine.playFireplace();
    else if (soundId === 'waves') focusSoundEngine.playWaves();
    else focusSoundEngine.stopCurrent();
  };

  const handleVolumeChange = (newVol) => {
    setSoundVolume(newVol);
    focusSoundEngine.setVolume(newVol);
  };

  // Keyboard shortcut: Spacebar to toggle Play/Pause
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

  // Format MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  // Circular progress stroke calculation
  const totalSecs = currentDurationSeconds || 1;
  const progressRatio = Math.max(0, Math.min(1, (totalSecs - timeLeft) / totalSecs));
  const strokeDashoffset = 880 - (880 * progressRatio);

  const activeTheme = THEMES.find((t) => t.id === currentThemeId) || THEMES[0];
  const activeTip = shuffledTips[currentTipIndex] || BAC_FOCUS_TIPS[0];

  return (
    <div className={`min-h-screen bg-linear-to-b ${activeTheme.bgClass} text-white relative overflow-hidden font-['Cairo'] transition-colors duration-700 flex flex-col justify-between select-none`}>
      
      {/* 🌌 Atmospheric Visual Animation Layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Glow Radial Accents */}
        <div 
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] transition-all duration-1000"
          style={{ background: activeTheme.glowColor }}
        />

        {/* Dynamic Canvas/CSS particle vibes */}
        {activeTheme.ambientAnimation === 'particles' && (
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] animate-pulse" />
        )}
        {activeTheme.ambientAnimation === 'rain' && (
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(175deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:16px_28px]" />
        )}
        {activeTheme.ambientAnimation === 'stars' && (
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:32px_32px]" />
        )}
      </div>

      {/* ========================================================================= */}
      {/* 🧭 TOP NAVBAR & CONTROLS STRIP */}
      {/* ========================================================================= */}
      <header className={`relative z-20 px-4 sm:px-8 py-4 flex items-center justify-between border-b border-white/10 backdrop-blur-md transition-opacity duration-300 ${isZenMode ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
        
        {/* Logo & Back */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold transition-all text-white backdrop-blur-xs"
          >
            <HiHome className="w-4 h-4" />
            <span className="hidden sm:inline">الرئيسية</span>
          </Link>

          <div className="flex items-center gap-2 border-r border-white/15 pr-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <h1 className="text-sm sm:text-base font-black tracking-wide flex items-center gap-1.5">
              <span>غرفة التركيز وبومودورو</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 border border-white/20 font-sans">
                {activeTheme.badge}
              </span>
            </h1>
          </div>
        </div>

        {/* Stats, Sound & Theme Selectors */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Daily Streak & Completed Sessions */}
          <div className="hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs backdrop-blur-xs">
            <span className="flex items-center gap-1 text-amber-300 font-bold">
              <span>🔥</span>
              <span>{stats.streakDays} أيام متتالية</span>
            </span>
            <span className="text-white/30">•</span>
            <span className="flex items-center gap-1 text-emerald-300 font-bold">
              <span>🎯</span>
              <span>{stats.completedSessions} جلسات منجزة ({stats.totalFocusMinutes} دقيقة)</span>
            </span>
          </div>

          {/* Theme Selector Dropdown */}
          <div className="relative">
            <select
              value={currentThemeId}
              onChange={(e) => setCurrentThemeId(e.target.value)}
              aria-label="تغيير الأجواء والثيم"
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white focus:outline-none cursor-pointer backdrop-blur-xs appearance-none pr-7 pl-3"
            >
              {THEMES.map((th) => (
                <option key={th.id} value={th.id} className="bg-slate-900 text-white">
                  {th.name}
                </option>
              ))}
            </select>
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-white/60">▼</span>
          </div>

          {/* Zen Mode Button */}
          <button
            onClick={() => setIsZenMode((prev) => !prev)}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isZenMode ? 'bg-rose-500 border-rose-400 text-white' : 'bg-white/10 hover:bg-white/20 border-white/15 text-white'
            }`}
            title={isZenMode ? 'الخروج من وضع التركيز الكامل' : 'تفعيل وضع التركيز الكامل (Zen Mode)'}
          >
            <HiArrowsExpand className="w-4 h-4" />
          </button>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* ⏱️ MAIN POMODORO CIRCULAR DISPLAY & INTERACTIVE CONTROLS */}
      {/* ========================================================================= */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 sm:p-6 max-w-4xl mx-auto w-full">
        
        {/* Mode Switcher Tabs */}
        <div className={`flex items-center gap-1.5 p-1 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 mb-6 transition-all duration-300 ${isZenMode ? 'opacity-20 hover:opacity-100' : 'opacity-100'}`}>
          <button
            onClick={() => {
              setTimerMode('focus');
              setIsRunning(false);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              timerMode === 'focus'
                ? 'bg-white text-[#0F172A] shadow-md scale-102'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            🎯 جلسة تركيز ({customFocusMinutes}د)
          </button>

          <button
            onClick={() => {
              setTimerMode('shortBreak');
              setIsRunning(false);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              timerMode === 'shortBreak'
                ? 'bg-emerald-400 text-[#0F172A] shadow-md scale-102'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            ☕ استراحة قصيرة ({customShortMinutes}د)
          </button>

          <button
            onClick={() => {
              setTimerMode('longBreak');
              setIsRunning(false);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              timerMode === 'longBreak'
                ? 'bg-sky-400 text-[#0F172A] shadow-md scale-102'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            🌿 استراحة طويلة ({customLongMinutes}د)
          </button>
        </div>

        {/* 🎯 Current Session Goal Input Strip */}
        <div className={`w-full max-w-md mb-6 transition-all duration-300 ${isZenMode ? 'opacity-30 hover:opacity-100' : 'opacity-100'}`}>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 focus-within:border-white/40 transition-all shadow-lg">
            <button
              onClick={() => setIsGoalCompleted((prev) => !prev)}
              aria-label="تأشير إنجاز الهدف"
              className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                isGoalCompleted
                  ? 'bg-emerald-400 border-emerald-300 text-slate-900'
                  : 'border-white/30 hover:border-white/60 bg-white/5'
              }`}
            >
              {isGoalCompleted && <HiCheck className="w-4 h-4 font-black" />}
            </button>

            <input
              type="text"
              value={currentGoal}
              onChange={(e) => {
                setCurrentGoal(e.target.value);
                if (isGoalCompleted) setIsGoalCompleted(false);
              }}
              placeholder="ما هو هدفك المحدد في هذه الجلسة؟ (مثلاً: حل تمرينين في الدوال)"
              className={`w-full bg-transparent text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none font-medium ${
                isGoalCompleted ? 'line-through text-white/50' : ''
              }`}
            />

            {isGoalCompleted && (
              <span className="text-[11px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-400/30 whitespace-nowrap">
                تم بنجاح 🎉
              </span>
            )}
          </div>
        </div>

        {/* ⭕ Modern Circular SVG Stopwatch Display */}
        <div className="relative flex items-center justify-center my-2">
          
          <svg className="w-68 h-68 sm:w-84 sm:h-84 -rotate-90 drop-shadow-2xl">
            {/* Background Track Circle */}
            <circle
              cx="50%"
              cy="50%"
              r="140"
              className="stroke-white/10"
              strokeWidth="10"
              fill="transparent"
            />
            {/* Active Animated Progress Circle */}
            <circle
              cx="50%"
              cy="50%"
              r="140"
              className="transition-all duration-1000 ease-linear"
              style={{
                stroke: activeTheme.accent,
                strokeDasharray: 880,
                strokeDashoffset: strokeDashoffset
              }}
              strokeWidth="10"
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Time digits & Status Center Box */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-5xl sm:text-7xl font-black tracking-tighter font-mono text-white drop-shadow-lg">
              {formattedMinutes}:{formattedSeconds}
            </span>
            
            <div className="flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold">
              <span className="w-2 h-2 rounded-full" style={{ background: isRunning ? '#10b981' : '#f59e0b' }} />
              <span>{isRunning ? 'التركيز نشط الآن' : 'المؤقت متوقف مؤقتاً'}</span>
            </div>
          </div>

        </div>

        {/* 🎮 Playback Control Buttons */}
        <div className="flex items-center gap-4 mt-8">
          
          {/* Reset */}
          <button
            onClick={() => {
              setIsRunning(false);
              setTimeLeft(currentDurationSeconds);
            }}
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md shadow-md"
            title="إعادة تعيين المؤقت (Reset)"
          >
            <HiRefresh className="w-5 h-5" />
          </button>

          {/* Big Play / Pause Button */}
          <button
            onClick={() => setIsRunning((prev) => !prev)}
            className="px-8 py-4 rounded-2xl font-black text-sm sm:text-base transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2.5 shadow-2xl cursor-pointer"
            style={{
              background: isRunning ? '#ffffff' : activeTheme.accent,
              color: isRunning ? '#0f172a' : '#ffffff'
            }}
          >
            {isRunning ? (
              <>
                <HiPause className="w-6 h-6" />
                <span>إيقاف مؤقت (Space)</span>
              </>
            ) : (
              <>
                <HiPlay className="w-6 h-6 ml-0.5" />
                <span>ابدأ التركيز الآن (Space)</span>
              </>
            )}
          </button>

          {/* Skip / Next */}
          <button
            onClick={handleSessionComplete}
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md shadow-md"
            title="تخطي الجلسة الحالية (Skip)"
          >
            <HiChevronLeft className="w-5 h-5" />
          </button>

        </div>

        {/* ⏱️ Duration Presets & Custom Trigger */}
        <div className={`flex flex-wrap items-center justify-center gap-2 mt-6 transition-opacity duration-300 ${isZenMode ? 'opacity-0' : 'opacity-100'}`}>
          {TIME_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCustomFocusMinutes(preset.focus);
                setCustomShortMinutes(preset.short);
                setCustomLongMinutes(preset.long);
                setIsRunning(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                customFocusMinutes === preset.focus
                  ? 'bg-white/25 border-white/50 text-white shadow-xs'
                  : 'bg-white/5 hover:bg-white/15 border-white/10 text-white/70'
              }`}
            >
              <span>{preset.label}</span>
            </button>
          ))}

          <button
            onClick={() => setShowCustomModal(true)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-amber-300 transition-all cursor-pointer flex items-center gap-1"
          >
            <HiSparkles className="w-3.5 h-3.5" />
            <span>تخصيص الوقت...</span>
          </button>
        </div>

        {/* 🎧 Ambient Sound Mixer Strip */}
        <div className={`mt-6 flex flex-wrap items-center justify-center gap-2 p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 transition-all duration-300 ${isZenMode ? 'opacity-20 hover:opacity-100' : 'opacity-100'}`}>
          <span className="text-xs font-bold text-white/80 flex items-center gap-1 ml-2">
            <HiVolumeUp className="w-4 h-4 text-emerald-400" />
            <span>أصوات التركيز (Web Audio):</span>
          </span>

          {[
            { id: 'none', label: '🔇 صامت', name: 'Mute' },
            { id: 'rain', label: '🌧️ مطر هادئ', name: 'Rain' },
            { id: 'brown', label: '📻 ضوضاء بنية', name: 'Brown Noise' },
            { id: 'fire', label: '🔥 مدفأة حطب', name: 'Fireplace' },
            { id: 'waves', label: '🌊 أمواج البحر', name: 'Ocean Waves' }
          ].map((snd) => (
            <button
              key={snd.id}
              onClick={() => handleSoundChange(snd.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                activeSound === snd.id
                  ? 'bg-emerald-400 text-slate-900 border-emerald-300 shadow-xs'
                  : 'bg-white/5 hover:bg-white/15 border-white/10 text-white/80'
              }`}
            >
              {snd.label}
            </button>
          ))}

          {activeSound !== 'none' && (
            <div className="flex items-center gap-1.5 mr-2 pr-2 border-r border-white/15">
              <span className="text-[11px] text-white/60">الصوت:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={soundVolume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                aria-label="مستوى صوت الخلفية"
                className="w-16 accent-emerald-400 cursor-pointer"
              />
            </div>
          )}
        </div>

      </main>

      {/* ========================================================================= */}
      {/* 💡 ROTATING 20-SECOND BAC METHODOLOGY ADVICE CARD */}
      {/* ========================================================================= */}
      <footer className={`relative z-20 p-4 sm:p-6 transition-all duration-500 ${isZenMode ? 'opacity-10 hover:opacity-100' : 'opacity-100'}`}>
        <div className="max-w-3xl mx-auto">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 shadow-xl relative overflow-hidden">
            
            {/* Top Bar of Advice Card */}
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-white/15 border border-white/20 text-[11px] font-bold text-amber-300 flex items-center gap-1">
                  <span>{activeTip.icon}</span>
                  <span>{activeTip.category}</span>
                </span>
                <span className="text-[11px] text-white/60">نصيحة تتجدد كل 20 ثانية</span>
              </div>

              {/* Next / Prev Manual Navigation */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentTipIndex((prev) => (prev - 1 + shuffledTips.length) % shuffledTips.length)}
                  className="p-1 rounded-lg bg-white/5 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="النصيحة السابقة"
                >
                  <HiChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentTipIndex((prev) => (prev + 1) % shuffledTips.length)}
                  className="p-1 rounded-lg bg-white/5 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="النصيحة التالية"
                >
                  <HiChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Animated Advice Text */}
            <AnimatePresence mode="wait">
              <motion.p
                key={activeTip.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="text-xs sm:text-sm font-medium text-white/95 leading-relaxed"
              >
                « {activeTip.text} »
              </motion.p>
            </AnimatePresence>

          </div>

        </div>
      </footer>

      {/* ========================================================================= */}
      {/* ⚙️ CUSTOM DURATION MODAL */}
      {/* ========================================================================= */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl text-white space-y-5"
          >
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <h3 className="text-base font-bold flex items-center gap-2">
                <span>⏱️</span>
                <span>تخصيص أوقات جلسة البومودورو</span>
              </h3>
              <button
                onClick={() => setShowCustomModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  مدة جلسة التركيز (بالدقائق):
                </label>
                <input
                  type="number"
                  min="1"
                  max="180"
                  value={customFocusMinutes}
                  onChange={(e) => setCustomFocusMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  مدة الاستراحة القصيرة (بالدقائق):
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={customShortMinutes}
                  onChange={(e) => setCustomShortMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  مدة الاستراحة الطويلة (بالدقائق):
                </label>
                <input
                  type="number"
                  min="1"
                  max="90"
                  value={customLongMinutes}
                  onChange={(e) => setCustomLongMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-700">
              <button
                onClick={() => {
                  setShowCustomModal(false);
                  setIsRunning(false);
                }}
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                تطبيق وحفظ التوقيت
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
