import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StreamHub from './components/StreamHub';
import FounderStorySection from './components/FounderStorySection';
import ContactContributionSection from './components/ContactContributionSection';
import ContactContributionModal from './components/ContactContributionModal';
import BacArchiveExplorer from './components/BacArchiveExplorer';
import YouTubeRoadmaps from './components/YouTubeRoadmaps';
import BacCountdown from './components/BacCountdown';
import SubjectViewer from './components/SubjectViewer';
import PdfReaderModal from './components/PdfReaderModal';
import BacCalculatorModal from './components/BacCalculatorModal';
import SearchModal from './components/SearchModal';
import FloatingQuickActions from './components/FloatingQuickActions';
import LibraryPage from './pages/LibraryPage';
import AboutPage from './pages/AboutPage';
import NotFound from './pages/NotFound';
import { STREAMS } from './data/streamsData';

function HomePage({ selectedStreamId, setSelectedStreamId, handleOpenSubject, setIsCalculatorOpen, setActivePdf, onOpenContact }) {
  return (
    <>
      {/* 1. Hero Section & Branch Selector */}
      <Hero 
        onSelectStream={(sId) => {
          setSelectedStreamId(sId);
          const elem = document.getElementById('stream-hub');
          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
      />

      {/* 2. Stream Hub & Subjects Explorer */}
      <StreamHub 
        selectedStreamId={selectedStreamId}
        onSelectStream={(sId) => setSelectedStreamId(sId)}
        onOpenSubject={handleOpenSubject}
      />

      {/* 3. Founder Story & Mission Highlight */}
      <FounderStorySection />

      {/* 4. Official BAC Exam Archive (2008 - 2025) */}
      <BacArchiveExplorer />

      {/* 5. Live BAC Countdown & Milestones */}
      <BacCountdown />

      {/* 6. Curated Algerian YouTube Teachers */}
      <YouTubeRoadmaps />

      {/* 7. Contact & File Contribution Banner */}
      <ContactContributionSection onOpenContact={onOpenContact} />
    </>
  );
}

function App() {
  const [selectedStreamId, setSelectedStreamId] = useState('sciences');
  const [activeSubject, setActiveSubject] = useState(null);
  const [activePdf, setActivePdf] = useState(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleSelectStream = (streamId) => {
    setSelectedStreamId(streamId);
    const elem = document.getElementById('stream-hub');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenSubject = (subjectId, streamName) => {
    setActiveSubject({
      id: subjectId,
      streamName: streamName || STREAMS.find(s => s.id === selectedStreamId)?.name || 'علوم تجريبية'
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFAF3] text-[#1c1917] selection:bg-[#F62440] selection:text-white font-['Cairo'] antialiased">
      
      {/* Navigation Bar */}
      <Navbar 
        onSelectStream={handleSelectStream}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Routed Content */}
      <main>
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                selectedStreamId={selectedStreamId}
                setSelectedStreamId={setSelectedStreamId}
                handleOpenSubject={handleOpenSubject}
                setIsCalculatorOpen={setIsCalculatorOpen}
                setActivePdf={setActivePdf}
                onOpenContact={() => setIsContactOpen(true)}
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
            path="/about" 
            element={
              <AboutPage />
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

      {/* BAC Average Calculator Modal */}
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

      {/* Contact & Contribution Modal */}
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
      <footer className="border-t border-[#FFE5BF] bg-[#FFFAF3] py-10 text-xs text-[#78716c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F62440] text-white flex items-center justify-center text-lg font-bold">
              🎓
            </div>
            <div>
              <span className="font-bold text-sm text-[#1c1917] block">موقع نجاحي — Naja7i BAC 3AS</span>
              <span className="text-[#78716c]">مبادرة الطالب أنيس إيزري (Anis Izri) • صدقة جارية لدعم طلبة البكالوريا 🇩🇿</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[#57534e] font-medium">
            <Link to="/" className="hover:text-[#F62440] transition-colors">الرئيسية</Link>
            <span>•</span>
            <Link to="/library" className="hover:text-[#F62440] transition-colors">مكتبة الملخصات والسلاسل</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-[#F62440] transition-colors">قصة المنصة والرسالة</Link>
            <span>•</span>
            <button 
              onClick={() => setIsContactOpen(true)} 
              className="hover:text-[#F62440] transition-colors cursor-pointer font-bold text-[#F62440]"
            >
              تواصل واقترح ملفات 📥
            </button>
            <span>•</span>
            <a href="/#bac-archive" className="hover:text-[#F62440] transition-colors">أرشيف البكالوريا</a>
            <span>•</span>
            <button onClick={() => setIsCalculatorOpen(true)} className="hover:text-[#F62440] transition-colors cursor-pointer font-bold">
              حاسبة المعدل
            </button>
          </div>

          <div className="text-[#a8a29e] text-[11px]">
            جميع الحقوق محفوظة © {new Date().getFullYear()} لمنصة نجاحي التعليمية • نسألكم الدعاء بالتوفيق والبركة
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
