import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import StreamsPage from './pages/StreamsPage';
import LibraryPage from './pages/LibraryPage';
import BacArchivePage from './pages/BacArchivePage';
import YouTubeTeachersPage from './pages/YouTubeTeachersPage';
import CountdownPage from './pages/CountdownPage';
import CalculatorPage from './pages/CalculatorPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';

import SubjectViewer from './components/SubjectViewer';
import PdfReaderModal from './components/PdfReaderModal';
import BacCalculatorModal from './components/BacCalculatorModal';
import SearchModal from './components/SearchModal';
import ContactContributionModal from './components/ContactContributionModal';
import FloatingQuickActions from './components/FloatingQuickActions';
import MaintenancePage from './pages/MaintenancePage';
import { SITE_CONFIG } from './config/siteConfig';
import { STREAMS } from './data/streamsData';

function App() {
  const [selectedStreamId, setSelectedStreamId] = useState('sciences');
  const [activeSubject, setActiveSubject] = useState(null);
  const [activePdf, setActivePdf] = useState(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  
  // Admin bypass state (allows Anis to preview even if maintenance is active)
  const [adminBypass, setAdminBypass] = useState(() => {
    return localStorage.getItem('naja7i_admin_bypass') === 'true' || 
           window.location.search.includes('bypass=anis');
  });

  const handleOpenSubject = (subjectId, streamName) => {
    setActiveSubject({
      id: subjectId,
      streamName: streamName || STREAMS.find(s => s.id === selectedStreamId)?.name || 'علوم تجريبية'
    });
  };

  // If maintenance mode is ON and admin hasn't bypassed it, show the Maintenance Page
  if (SITE_CONFIG.isMaintenanceMode && !adminBypass) {
    return (
      <MaintenancePage 
        onBypass={() => {
          localStorage.setItem('naja7i_admin_bypass', 'true');
          setAdminBypass(true);
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-[#E11D48] selection:text-white font-['Cairo'] antialiased flex flex-col justify-between">
      
      {/* Admin Notice if Maintenance Mode is active for public but bypassed by admin */}
      {SITE_CONFIG.isMaintenanceMode && adminBypass && (
        <div className="bg-[#E11D48] text-white text-xs py-1.5 px-4 text-center font-bold flex items-center justify-center gap-3 sticky top-0 z-50 shadow-xs">
          <span>⚠️ وضع الصيانة مفعل حالياً للزوار العاديين — أنت تتصفح كمسؤول (Admin Preview)</span>
          <button 
            onClick={() => {
              localStorage.removeItem('naja7i_admin_bypass');
              setAdminBypass(false);
            }}
            className="underline text-[11px] hover:text-white/80 cursor-pointer"
          >
            إغلاق المعاينة والعودة لصفحة الصيانة
          </button>
        </div>
      )}

      <div>
        {/* Navigation Bar */}
        <Navbar 
          onSelectStream={(sId) => setSelectedStreamId(sId)}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* Main Multi-Page Routed Content */}
        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  onOpenCalculator={() => setIsCalculatorOpen(true)}
                  onOpenSearch={() => setIsSearchOpen(true)}
                  onOpenContact={() => setIsContactOpen(true)}
                  onSelectStream={(sId) => setSelectedStreamId(sId)}
                />
              } 
            />
            <Route 
              path="/streams" 
              element={
                <StreamsPage 
                  selectedStreamId={selectedStreamId}
                  onSelectStream={(sId) => setSelectedStreamId(sId)}
                  onOpenSubject={handleOpenSubject}
                  onOpenPdf={(file) => setActivePdf(file)}
                />
              } 
            />
            <Route 
              path="/library" 
              element={
                <LibraryPage 
                  onOpenPdf={(file) => setActivePdf(file)}
                />
              } 
            />
            <Route 
              path="/bac-archive" 
              element={
                <BacArchivePage />
              } 
            />
            <Route 
              path="/youtube-teachers" 
              element={
                <YouTubeTeachersPage />
              } 
            />
            <Route 
              path="/countdown" 
              element={
                <CountdownPage />
              } 
            />
            <Route 
              path="/calculator" 
              element={
                <CalculatorPage />
              } 
            />
            <Route 
              path="/about" 
              element={
                <AboutPage />
              } 
            />
            <Route 
              path="/contact" 
              element={
                <ContactPage />
              } 
            />
            <Route 
              path="*" 
              element={
                <NotFound />
              } 
            />
          </Routes>
        </main>
      </div>

      {/* Global Modals */}

      {/* Subject Viewer Modal */}
      {activeSubject && (
        <SubjectViewer 
          subjectId={activeSubject.id}
          streamName={activeSubject.streamName}
          onClose={() => setActiveSubject(null)}
          onOpenPdf={(file) => setActivePdf(file)}
        />
      )}

      {/* Embedded PDF Reader Modal */}
      {activePdf && (
        <PdfReaderModal 
          file={activePdf}
          isOpen={!!activePdf}
          onClose={() => setActivePdf(null)}
        />
      )}

      {/* Quick BAC Average Calculator Modal */}
      <BacCalculatorModal 
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      {/* Global Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onOpenSubject={(subId) => handleOpenSubject(subId)}
        onOpenPdf={(file) => setActivePdf(file)}
      />

      {/* Quick Contact & Contribution Modal */}
      <ContactContributionModal 
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Floating Quick Action Buttons */}
      <FloatingQuickActions 
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Clean Academic Footer */}
      <footer className="border-t border-[#E2E8F0] bg-white py-10 text-xs text-[#64748B] mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E11D48] text-white flex items-center justify-center text-lg font-bold shadow-2xs">
              🎓
            </div>
            <div>
              <span className="font-bold text-sm text-[#0F172A] block">منصة نجاحي — Naja7i BAC 3AS</span>
              <span className="text-[#64748B]">مبادرة الطالب أنيس إيزري (Anis Izri) • صدقة جارية لدعم طلبة البكالوريا 🇩🇿</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[#475569] font-medium">
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
            <Link to="/countdown" className="hover:text-[#E11D48] transition-colors">العداد</Link>
            <span>•</span>
            <Link to="/calculator" className="hover:text-[#E11D48] transition-colors">حاسبة المعدل</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-[#E11D48] transition-colors">قصة المنصة</Link>
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
