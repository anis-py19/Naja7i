import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import SubjectViewer from './components/SubjectViewer';
import PdfReaderModal from './components/PdfReaderModal';
import BacCalculatorModal from './components/BacCalculatorModal';
import SearchModal from './components/SearchModal';
import ContactContributionModal from './components/ContactContributionModal';
import FloatingQuickActions from './components/FloatingQuickActions';
import PwaInstallPrompt from './components/PwaInstallPrompt';

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
import { SITE_CONFIG } from './config/siteConfig';

function App() {
  const [selectedStreamId, setSelectedStreamId] = useState('sciences');
  const [activeSubject, setActiveSubject] = useState(null);
  const [activePdf, setActivePdf] = useState(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const location = useLocation();
  const isFocusRoom = ['/focus-room', '/focus', '/pomodoro'].includes(location.pathname);

  // Admin Bypass for Maintenance Mode
  const [bypassMaintenance, setBypassMaintenance] = useState(() => {
    try {
      const saved = localStorage.getItem('naja7i_admin_bypass');
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === 'true') {
        localStorage.setItem('naja7i_admin_bypass', 'true');
        return true;
      }
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const handleSelectStream = (streamId) => {
    setSelectedStreamId(streamId);
  };

  const handleOpenSubject = (subjectId, streamName) => {
    setActiveSubject({
      id: subjectId,
      streamName: streamName || STREAMS.find(s => s.id === selectedStreamId)?.name || 'علوم تجريبية'
    });
  };

  // If maintenance mode is activated and admin has not bypassed it, display MaintenancePage
  if (SITE_CONFIG.isMaintenanceMode && !bypassMaintenance && location.pathname !== '/maintenance') {
    return (
      <MaintenancePage
        onBypass={() => {
          setBypassMaintenance(true);
          localStorage.setItem('naja7i_admin_bypass', 'true');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-[#E11D48] selection:text-white font-['Cairo'] antialiased flex flex-col justify-between">

      {/* Admin Maintenance Alert Bar (يظهر فقط للمسؤول عند تفعيل وضع الصيانة وتجاوزه للمعاينة) */}
      {SITE_CONFIG.isMaintenanceMode && bypassMaintenance && (
        <div className="bg-amber-500 text-slate-950 px-4 py-1.5 text-xs font-bold flex items-center justify-between z-50 print:hidden shadow-xs">
          <span>⚠️ وضع الصيانة مفعل حالياً للزوار العاديين • أنت تتصفح المنصة كمسؤول (Admin Preview Mode)</span>
          <button
            onClick={() => {
              setBypassMaintenance(false);
              localStorage.removeItem('naja7i_admin_bypass');
            }}
            className="px-2 py-0.5 rounded bg-slate-900 text-white text-[11px] font-bold hover:bg-black transition-colors cursor-pointer"
          >
            إغلاق المعاينة ورؤية صفحة الصيانة
          </button>
        </div>
      )}

      {/* Top Navbar */}
      {!isFocusRoom && (
        <Navbar
          onSelectStream={handleSelectStream}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
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
              <StreamsPage
                selectedStreamId={selectedStreamId}
                setSelectedStreamId={setSelectedStreamId}
                onOpenSubject={handleOpenSubject}
              />
            }
          />

          {/* 3. مكتبة الملخصات والسلاسل */}
          <Route
            path="/library"
            element={
              <LibraryPage
                onOpenPdf={(file) => setActivePdf(file)}
              />
            }
          />

          {/* 4. أرشيف البكالوريا الرسمي (2008—2025) */}
          <Route
            path="/bac-archive"
            element={
              <BacArchivePage
                onOpenPdf={(file) => setActivePdf(file)}
              />
            }
          />

          {/* 5. دليل أساتذة وقنوات اليوتيوب */}
          <Route
            path="/youtube-teachers"
            element={
              <YouTubeTeachersPage />
            }
          />

          {/* 6. مخطط الأهداف وجداول المراجعة الأسبوعية (A4) */}
          <Route
            path="/study-planner"
            element={
              <StudyPlannerPage />
            }
          />

          {/* 6.5 بنك الأسئلة والاختبارات التفاعلية السريعة (Quiz & QCM) */}
          <Route
            path="/quiz"
            element={
              <QuizBankPage />
            }
          />

          {/* 6.6 الملخص الذكي بالذكاء الاصطناعي (AI Summarizer) */}
          <Route
            path="/ai-summarizer"
            element={
              <AiSummarizerPage />
            }
          />
          <Route
            path="/ai-summarize"
            element={
              <AiSummarizerPage />
            }
          />

          {/* 6.8 دليل المنهاج والبرنامج الوزاري الرسمي */}
          <Route
            path="/curriculum"
            element={
              <CurriculumPage />
            }
          />

          {/* 7. حاسبة معدل البكالوريا بالمعاملات الرسمية */}
          <Route
            path="/calculator"
            element={
              <CalculatorPage />
            }
          />

          {/* 8. العداد التنازلي للبكالوريا ورزنامة المحطات */}
          <Route
            path="/countdown"
            element={
              <CountdownPage />
            }
          />

          {/* 8.5 غرفة التركيز وبومودورو (Focus Room) */}
          <Route
            path="/focus-room"
            element={
              <FocusRoomPage />
            }
          />
          <Route
            path="/focus"
            element={
              <FocusRoomPage />
            }
          />
          <Route
            path="/pomodoro"
            element={
              <FocusRoomPage />
            }
          />

          {/* 8.6 كراس الأخطاء والفخاخ الذكي (Carnet d'Erreurs) */}
          <Route
            path="/mistakes-notebook"
            element={
              <MistakesNotebookPage />
            }
          />
          <Route
            path="/carnet-erreurs"
            element={
              <MistakesNotebookPage />
            }
          />
          <Route
            path="/mistakes"
            element={
              <MistakesNotebookPage />
            }
          />

          {/* 9. عن المنصة ومؤسسها */}
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
              <ContactPage />
            }
          />

          {/* 11. صفحة الصيانة المباشرة */}
          <Route
            path="/maintenance"
            element={
              <MaintenancePage />
            }
          />

          {/* 12. صفحة 404 */}
          <Route
            path="*"
            element={
              <NotFound />
            }
          />
        </Routes>
      </main>

      {/* Global Subject Viewer Modal */}
      {activeSubject && (
        <SubjectViewer
          subjectId={activeSubject.id}
          streamName={activeSubject.streamName}
          onClose={() => setActiveSubject(null)}
          onOpenPdf={(file) => setActivePdf(file)}
        />
      )}

      {/* Global PDF Viewer Modal */}
      {activePdf && (
        <PdfReaderModal
          file={activePdf}
          isOpen={!!activePdf}
          onClose={() => setActivePdf(null)}
        />
      )}

      {/* Global BAC Calculator Modal */}
      <BacCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      {/* Global Search Modal (Ctrl + K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onOpenSubject={(subId) => handleOpenSubject(subId)}
        onOpenPdf={(file) => setActivePdf(file)}
      />

      {/* Global Contact & Contribution Modal */}
      <ContactContributionModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Floating Action Buttons */}
      {!isFocusRoom && (
        <FloatingQuickActions
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
        />
      )}

      {/* PWA Install Prompt & Live Offline/Online Status */}
      <PwaInstallPrompt />

      {/* Global Academic Footer */}
      {!isFocusRoom && (
        <footer className="border-t border-[#E2E8F0] bg-white py-8 text-xs text-[#64748B] mt-12 print:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img
                src="/logo.jpg"
                alt="منصة نجاحي"
                className="w-10 h-10 object-contain rounded-xl border border-[#E2E8F0] shadow-xs bg-white"
              />
              <div>
                <span className="font-black text-sm text-[#0F172A] block">منصة نجاحي — Naja7i BAC 3AS</span>
                <span className="text-[#64748B]">مبادرة الطالب أنيس ازري (Anis Izri) • صدقة جارية لدعم طلبة البكالوريا 🇩🇿</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3.5 text-[#475569] font-medium">
              <Link to="/" className="hover:text-[#E11D48] transition-colors">الرئيسية</Link>
              <span>•</span>
              <Link to="/streams" className="hover:text-[#E11D48] transition-colors">الشعب والمواد</Link>
              <span>•</span>
              <Link to="/library" className="hover:text-[#E11D48] transition-colors">مكتبة الملخصات</Link>
              <span>•</span>
              <Link to="/bac-archive" className="hover:text-[#E11D48] transition-colors">أرشيف البكالوريا</Link>
              <span>•</span>
              <Link to="/youtube-teachers" className="hover:text-[#E11D48] transition-colors">أساتذة اليوتيوب</Link>
              <span>•</span>
              <Link to="/focus-room" className="hover:text-[#E11D48] transition-colors font-bold text-indigo-600">غرفة التركيز (بومودورو) 🎧</Link>
              <span>•</span>
              <Link to="/mistakes-notebook" className="hover:text-[#E11D48] transition-colors font-bold text-amber-600">كراس الأخطاء الذكي 📓</Link>
              <span>•</span>
              <Link to="/curriculum" className="hover:text-[#E11D48] transition-colors font-bold text-[#E11D48]">المنهاج والبرنامج الوزاري 📚</Link>
              <span>•</span>
              <Link to="/ai-summarizer" className="hover:text-[#E11D48] transition-colors font-bold text-[#E11D48]">الملخص الذكي (AI) 🤖</Link>
              <span>•</span>
              <Link to="/quiz" className="hover:text-[#E11D48] transition-colors">بنك الأسئلة (Quiz)</Link>
              <span>•</span>
              <Link to="/study-planner" className="hover:text-[#E11D48] transition-colors">مخطط المراجعة</Link>
              <span>•</span>
              <Link to="/calculator" className="hover:text-[#E11D48] transition-colors">حاسبة المعدل</Link>
              <span>•</span>
              <Link to="/countdown" className="hover:text-[#E11D48] transition-colors">العداد</Link>
              <span>•</span>
              <Link to="/about" className="hover:text-[#E11D48] transition-colors">عن المنصة</Link>

              <span>•</span>
              <Link to="/contact" className="hover:text-[#E11D48] transition-colors text-[#E11D48] font-bold">تواصل ومساهمة 📥</Link>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pt-4 border-t border-[#F1F5F9] text-center text-[#94A3B8] text-[11px]">
            جميع الحقوق محفوظة © {new Date().getFullYear()} لمنصة نجاحي التعليمية • نسألكم الدعاء بالتوفيق والبركة
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
