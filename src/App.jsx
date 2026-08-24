import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StreamHub from './components/StreamHub';
import FounderStorySection from './components/FounderStorySection';
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
import { STREAMS } from './data/streamsData';

function HomePage({ selectedStreamId, setSelectedStreamId, handleOpenSubject, setIsCalculatorOpen, setActivePdf }) {
  return (
    <>
      <Hero
        onSelectStream={(sId) => {
          setSelectedStreamId(sId);
          const elem = document.getElementById('stream-hub');
          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
      />

      <StreamHub
        selectedStreamId={selectedStreamId}
        onSelectStream={(sId) => setSelectedStreamId(sId)}
        onOpenSubject={handleOpenSubject}
      />

      <FounderStorySection />

      <BacArchiveExplorer />

      <BacCountdown />

      <YouTubeRoadmaps />
    </>
  );
}

function App() {
  //hello
  const [selectedStreamId, setSelectedStreamId] = useState('sciences');
  const [activeSubject, setActiveSubject] = useState(null);
  const [activePdf, setActivePdf] = useState(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

      <Navbar
        onSelectStream={handleSelectStream}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

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
        </Routes>
      </main>

      {activeSubject && (
        <SubjectViewer
          subjectId={activeSubject.id}
          streamName={activeSubject.streamName}
          onClose={() => setActiveSubject(null)}
          onOpenPdf={(file) => setActivePdf(file)}
        />
      )}

      {activePdf && (
        <PdfReaderModal
          file={activePdf}
          isOpen={!!activePdf}
          onClose={() => setActivePdf(null)}
        />
      )}

      <BacCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onOpenSubject={(subId) => handleOpenSubject(subId)}
        onOpenPdf={(file) => setActivePdf(file)}
      />

      <FloatingQuickActions
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

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
            <Link to="/library" className="hover:text-[#F62440] transition-colors">مكتبة الملخصات (324 ملف)</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-[#F62440] transition-colors font-bold text-[#F62440]">قصة المنصة والرسالة</Link>
            <span>•</span>
            <a href="/#bac-archive" className="hover:text-[#F62440] transition-colors">أرشيف البكالوريا</a>
            <span>•</span>
            <a href="/#youtube-roadmaps" className="hover:text-[#F62440] transition-colors">أساتذة اليوتيوب</a>
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
