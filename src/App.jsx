import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import SubjectViewer from './components/SubjectViewer';
import PdfReaderModal from './components/PdfReaderModal';
import BacCalculatorModal from './components/BacCalculatorModal';
import SearchModal from './components/SearchModal';
import ContactContributionModal from './components/ContactContributionModal';
import FloatingQuickActions from './components/FloatingQuickActions';
import PwaInstallPrompt from './components/PwaInstallPrompt';
import FeatureGuard from './components/FeatureGuard';
import AdminControlModal from './components/AdminControlModal';

// Page Views
import HomePage from './pages/HomePage';
import StreamsPage from './pages/StreamsPage';
import LibraryPage from './pages/LibraryPage';
import BacArchivePage from './pages/BacArchivePage';
import YouTubeTeachersPage from './pages/YouTubeTeachersPage';
import StudyPlannerPage from './pages/StudyPlannerPage';
import QuizBankPage from './pages/QuizBankPage';
import AiSummarizerPage from './pages/AiSummarizerPage';
import CurriculumPage from './pages/CurriculumPage';
import CalculatorPage from './pages/CalculatorPage';
import CountdownPage from './pages/CountdownPage';
import FocusRoomPage from './pages/FocusRoomPage';
import MistakesNotebookPage from './pages/MistakesNotebookPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import MaintenancePage from './pages/MaintenancePage';
import NotFound from './pages/NotFound';

import { STREAMS } from './data/streamsData';
import { SITE_CONFIG, getActiveFeaturesConfig } from './config/siteConfig';

function App() {
  const [selectedStreamId, setSelectedStreamId] = useState('sciences');
  const [activeSubject, setActiveSubject] = useState(null);
  const [activePdf, setActivePdf] = useState(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAdminControlOpen, setIsAdminControlOpen] = useState(false);
  const [featuresConfig, setFeaturesConfig] = useState(getActiveFeaturesConfig());

  const location = useLocation();
  const navigate = useNavigate();
  const isFocusRoom = ['/focus-room', '/focus', '/pomodoro'].includes(location.pathname);

  // Listen to live feature config changes
  useEffect(() => {
    const handleConfigChange = () => {
      setFeaturesConfig(getActiveFeaturesConfig());
    };
    window.addEventListener('naja7i_features_config_changed', handleConfigChange);
    return () => window.removeEventListener('naja7i_features_config_changed', handleConfigChange);
  }, []);

  // Admin Bypass for Maintenance Mode
  const [bypassMaintenance, setBypassMaintenance] = useState(() => {
    try {
      const saved = localStorage.getItem('naja7i_admin_bypass');
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === 'true' || location.pathname === '/admin') {
        localStorage.setItem('naja7i_admin_bypass', 'true');
        return true;
      }
      return saved === 'true';
    } catch {
      return false;
    }
  });

  // Automatically open Admin modal if visiting /admin
  useEffect(() => {
    if (location.pathname === '/admin') {
      setIsAdminControlOpen(true);
      setBypassMaintenance(true);
      localStorage.setItem('naja7i_admin_bypass', 'true');
    }
  }, [location.pathname]);

  const handleSelectStream = (streamId) => {
    setSelectedStreamId(streamId);
  };

  const handleOpenSubject = (subjectId, streamName) => {
    setActiveSubject({
      id: subjectId,
      streamName: streamName || STREAMS.find(s => s.id === selectedStreamId)?.name || 'علوم تجريبية'
    });
  };

  const handleBypassOn = () => {
    setBypassMaintenance(true);
    localStorage.setItem('naja7i_admin_bypass', 'true');
  };

  const isGlobalMaintenance = featuresConfig.global_site?.isMaintenance ?? SITE_CONFIG.isMaintenanceMode;

  // If global site maintenance mode is active and admin has not bypassed it, display full MaintenancePage
  if (isGlobalMaintenance && !bypassMaintenance && location.pathname !== '/maintenance') {
    return (
      <MaintenancePage
        onBypass={handleBypassOn}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-[#E11D48] selection:text-white font-['Cairo'] antialiased flex flex-col justify-between">

      {/* Admin Alert & Feature Manager Bar */}
      {(isGlobalMaintenance || bypassMaintenance) && (
        <div className="bg-slate-900 text-white px-4 py-2 text-xs font-bold flex items-center justify-between z-50 print:hidden shadow-md flex-wrap gap-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>
              {isGlobalMaintenance 
                ? '⚠️ وضع الصيانة العام مفعّل للزوار العاديين • أنت تتصفح كمسؤول (Admin Preview Mode)' 
                : '🛡️ وضع الإدارة نشط (Admin Mode Active)'}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAdminControlOpen(true)}
              className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
            >
              <span>⚙️ لوحة التحكم في أوضاع الصيانة</span>
            </button>

            {isGlobalMaintenance && (
              <button
                onClick={() => {
                  setBypassMaintenance(false);
                  localStorage.removeItem('naja7i_admin_bypass');
                }}
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold transition-colors cursor-pointer"
              >
                إغلاق المعاينة ورؤية صفحة الصيانة
              </button>
            )}
          </div>
        </div>
      )}

      {/* Top Navbar */}
      {!isFocusRoom && (
        <Navbar
          onSelectStream={handleSelectStream}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
          onOpenAdmin={() => setIsAdminControlOpen(true)}
          isAdmin={bypassMaintenance}
        />
      )}

      {/* Main Routed Content */}
      <main className="flex-1">
        <Routes>
          {/* 1. الرئيسية */}
          <Route
            path="/"
            element={
              <HomePage
                selectedStreamId={selectedStreamId}
                setSelectedStreamId={setSelectedStreamId}
                handleOpenSubject={handleOpenSubject}
                setIsCalculatorOpen={setIsCalculatorOpen}
                setActivePdf={setActivePdf}
                onOpenSearch={() => setIsSearchOpen(true)}
                onOpenContact={() => setIsContactOpen(true)}
              />
            }
          />

          {/* 2. الشعب والمواد */}
          <Route
            path="/streams"
            element={
              <FeatureGuard featureId="streams" bypassMaintenance={bypassMaintenance} onBypass={handleBypassOn}>
                <StreamsPage
                  selectedStreamId={selectedStreamId}
                  setSelectedStreamId={setSelectedStreamId}
                  onOpenSubject={handleOpenSubject}
                />
              </FeatureGuard>
            }
          />

          {/* 3. مكتبة الملخصات والسلاسل */}
          <Route
            path="/library"
            element={
              <FeatureGuard featureId="library" bypassMaintenance={bypassMaintenance} onBypass={handleBypassOn}>
                <LibraryPage
                  onOpenPdf={(file) => setActivePdf(file)}
                />
              </FeatureGuard>
            }
          />

          {/* 4. أرشيف البكالوريا الرسمي (2008—2026) */}
          <Route
            path="/bac-archive"
            element={
              <FeatureGuard featureId="bac_archive" bypassMaintenance={bypassMaintenance} onBypass={handleBypassOn}>
                <BacArchivePage
                  onOpenPdf={(file) => setActivePdf(file)}
                />
              </FeatureGuard>
            }
          />

          {/* 5. دليل أساتذة وقنوات اليوتيوب */}
          <Route
            path="/youtube-teachers"
            element={
              <FeatureGuard featureId="youtube_teachers" bypassMaintenance={bypassMaintenance} onBypass={handleBypassOn}>
                <YouTubeTeachersPage />
              </FeatureGuard>
            }
          />

          {/* 6. مخطط الأهداف وجداول المراجعة الأسبوعية (A4) */}
          <Route
            path="/study-planner"
            element={
              <FeatureGuard featureId="study_planner" bypassMaintenance={bypassMaintenance} onBypass={handleBypassOn}>
                <StudyPlannerPage />
              </FeatureGuard>
            }
          />

          {/* 6.5 بنك الأسئلة والاختبارات التفاعلية السريعة (Quiz & QCM) */}
          <Route
            path="/quiz"
            element={
              <FeatureGuard featureId="quiz" bypassMaintenance={bypassMaintenance} onBypass={handleBypassOn}>
                <QuizBankPage />
              </FeatureGuard>
            }
          />

          {/* 6.6 الملخص الذكي بالذكاء الاصطناعي (AI Summarizer) */}
          <Route
            path="/ai-summarizer"
            element={
              <FeatureGuard featureId="ai_summarizer" bypassMaintenance={bypassMaintenance} onBypass={handleBypassOn}>
                <AiSummarizerPage />
              </FeatureGuard>
            }
          />
          <Route
            path="/ai-summarize"
            element={
              <FeatureGuard featureId="ai_summarizer" bypassMaintenance={bypassMaintenance} onBypass={handleBypassOn}>
                <AiSummarizerPage />
              </FeatureGuard>
            }
          />

          {/* 6.8 دليل المنهاج والبرنامج الوزاري الرسمي */}
          <Route
            path="/curriculum"
            element={
              <FeatureGuard featureId="curriculum" bypassMaintenance={bypassMaintenance} onBypass={handleBypassOn}>
                <CurriculumPage />
              </FeatureGuard>
            }
          />

          {/* 7. حاسبة معدل البكالوريا بالمعاملات الرسمية */}
          <Route
            path="/calculator"
            element={
              <FeatureGuard featureId="calculator" bypassMaintenance={bypassMaintenance} onBypass={handleBypassOn}>
                <CalculatorPage />
              </FeatureGuard>
            }
          />

          {/* 8. العداد التنازلي للبكالوريا ورزنامة المحطات */}
          <Route
            path="/countdown"
            element={
              <FeatureGuard featureId="countdown" bypassMaintenance={bypassMaintenance} onBypass={handleBypassOn}>
                <CountdownPage />
              </FeatureGuard>
            }
          />

          {/* 8.5 غرفة التركيز وبومودورو (Focus Room) */}
          <Route
            path="/focus-room"
            element={
              <FeatureGuard featureId="focus_room" bypassMaintenance={bypassMaintenance} onBypass={handleBypassOn}>
                <FocusRoomPage />
              </FeatureGuard>
            }
          />
          <Route
            path="/focus"
            element={
              <FeatureGuard featureId="focus_room" bypassMaintenance={bypassMaintenance} onBypass={handleBypassOn}>
                <FocusRoomPage />
              </FeatureGuard>
            }
          />
          <Route
            path="/pomodoro"
            element={
              <FeatureGuard featureId="focus_room" bypassMaintenance={bypassMaintenance} onBypass={handleBypassOn}>
                <FocusRoomPage />
              </FeatureGuard>
            }
          />

          {/* 8.6 كراس الأخطاء والفخاخ الذكي (Carnet d'Erreurs) */}
          <Route
            path="/mistakes-notebook"
            element={
              <FeatureGuard featureId="mistakes_notebook" bypassMaintenance={bypassMaintenance} onBypass={handleBypassOn}>
                <MistakesNotebookPage />
              </FeatureGuard>
            }
          />
          <Route
            path="/carnet-erreurs"
            element={
              <FeatureGuard featureId="mistakes_notebook" bypassMaintenance={bypassMaintenance} onBypass={handleBypassOn}>
                <MistakesNotebookPage />
              </FeatureGuard>
            }
          />

          {/* 8.8 مسار لوحة التحكم في الصيانة (Admin Direct URL) */}
          <Route
            path="/admin"
            element={
              <HomePage
                selectedStreamId={selectedStreamId}
                setSelectedStreamId={setSelectedStreamId}
                handleOpenSubject={handleOpenSubject}
                setIsCalculatorOpen={setIsCalculatorOpen}
                setActivePdf={setActivePdf}
                onOpenSearch={() => setIsSearchOpen(true)}
                onOpenContact={() => setIsContactOpen(true)}
              />
            }
          />

          {/* 9. عن المنصة والمؤسس */}
          <Route
            path="/about"
            element={
              <AboutPage />
            }
          />

          {/* 10. تواصل ومساهمة */}
          <Route
            path="/contact"
            element={
              <ContactPage onOpenContact={() => setIsContactOpen(true)} />
            }
          />

          {/* 11. صفحة الصيانة العامة المستقلة */}
          <Route
            path="/maintenance"
            element={
              <MaintenancePage onBypass={handleBypassOn} />
            }
          />

          {/* 12. صفحة 404 */}
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </main>

      {/* Footer */}
      {!isFocusRoom && (
        <footer className="bg-white border-t border-[#E2E8F0] py-8 text-center text-xs text-[#64748B] font-['Cairo'] print:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-2">
              <span className="font-black text-[#0F172A]">نجاحي Naja7i</span>
              <span>—</span>
              <span>فضاء تحضير شهادة البكالوريا في الجزائر 🇩🇿</span>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <Link to="/about" className="hover:text-[#E11D48] transition-colors">
                قصة المنصة والرسالة
              </Link>
              <span>•</span>
              <button
                onClick={() => setIsContactOpen(true)}
                className="hover:text-[#E11D48] transition-colors cursor-pointer"
              >
                مساهمة بملف أو ملخص
              </button>
              <span>•</span>
              <button
                onClick={() => setIsAdminControlOpen(true)}
                className="hover:text-[#E11D48] text-slate-400 hover:text-slate-700 transition-colors cursor-pointer flex items-center gap-1 font-mono text-[11px]"
                title="لوحة تحكم الصيانة"
              >
                <span>⚙️ [إدارة الصيانة]</span>
              </button>
            </div>

          </div>
        </footer>
      )}

      {/* Interactive Global Modals */}
      <SubjectViewer
        subjectId={activeSubject?.id}
        streamName={activeSubject?.streamName}
        onClose={() => setActiveSubject(null)}
        onOpenPdf={(file) => setActivePdf(file)}
      />

      <PdfReaderModal
        pdfFile={activePdf}
        onClose={() => setActivePdf(null)}
      />

      <BacCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        selectedStreamId={selectedStreamId}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onOpenPdf={(file) => setActivePdf(file)}
        onOpenSubject={handleOpenSubject}
      />

      <ContactContributionModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Admin Feature Maintenance Manager Modal */}
      <AdminControlModal
        isOpen={isAdminControlOpen}
        onClose={() => {
          setIsAdminControlOpen(false);
          if (location.pathname === '/admin') {
            navigate('/');
          }
        }}
      />

      {/* Floating Quick Action Buttons */}
      {!isFocusRoom && (
        <FloatingQuickActions
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
        />
      )}

      {/* PWA Smart Install Prompt */}
      <PwaInstallPrompt />

    </div>
  );
}

export default App;
