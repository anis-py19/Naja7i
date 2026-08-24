import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import SubjectViewer from './components/SubjectViewer';
import PdfReaderModal from './components/PdfReaderModal';
import BacCalculatorModal from './components/BacCalculatorModal';
import SearchModal from './components/SearchModal';
import ContactContributionModal from './components/ContactContributionModal';
import FloatingQuickActions from './components/FloatingQuickActions';

// Page Views
import HomePage from './pages/HomePage';
import StreamsPage from './pages/StreamsPage';
import LibraryPage from './pages/LibraryPage';
import BacArchivePage from './pages/BacArchivePage';
import YouTubeTeachersPage from './pages/YouTubeTeachersPage';
import StudyPlannerPage from './pages/StudyPlannerPage';
import CalculatorPage from './pages/CalculatorPage';
import CountdownPage from './pages/CountdownPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import MaintenancePage from './pages/MaintenancePage';
import NotFound from './pages/NotFound';

import { STREAMS } from './data/streamsData';

function App() {
  const [selectedStreamId, setSelectedStreamId] = useState('sciences');
  const [activeSubject, setActiveSubject] = useState(null);
  const [activePdf, setActivePdf] = useState(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleSelectStream = (streamId) => {
    setSelectedStreamId(streamId);
  };

  const handleOpenSubject = (subjectId, streamName) => {
    setActiveSubject({
      id: subjectId,
      streamName: streamName || STREAMS.find(s => s.id === selectedStreamId)?.name || 'علوم تجريبية'
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-[#E11D48] selection:text-white font-['Cairo'] antialiased flex flex-col justify-between">

      {/* Top Navbar */}
      <Navbar
        onSelectStream={handleSelectStream}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

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

          {/* 11. صفحة الصيانة */}
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
      <FloatingQuickActions
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Global Academic Footer */}
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
              <span className="text-[#64748B]">مبادرة الطالب أنيس إيزري (Anis Izri) • صدقة جارية لدعم طلبة البكالوريا 🇩🇿</span>
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

          <div className="text-[#94A3B8] text-[11px]">
            جميع الحقوق محفوظة © {new Date().getFullYear()} لمنصة نجاحي التعليمية • نسألكم الدعاء بالتوفيق والبركة
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
