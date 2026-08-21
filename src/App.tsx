import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { TopicLearningPage } from './pages/TopicLearningPage';
import { ProblemPracticePage } from './pages/ProblemPracticePage';
import { CodeEditorPage } from './pages/CodeEditorPage';
import { AIMentorPage } from './pages/AIMentorPage';
import { WeaknessAnalysisPage } from './pages/WeaknessAnalysisPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { MistakeJournalPage } from './pages/MistakeJournalPage';
import { ProfilePage } from './pages/ProfilePage';
import { ChallengesPage } from './pages/ChallengesPage';
import { ContestsPage } from './pages/ContestsPage';
import { CommunityPage } from './pages/CommunityPage';

// Scroll to Top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const AppContent: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  // Hide global navbar and footer on editor and auth pages for maximal coding space
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isEditorPage = location.pathname.startsWith('/editor');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      <ScrollToTop />
      
      {!isAuthPage && !isEditorPage && (
        <Navbar onOpenSearch={() => setIsSearchOpen(true)} />
      )}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/learn" element={<TopicLearningPage />} />
          <Route path="/learn/:topicId" element={<TopicLearningPage />} />
          <Route path="/practice" element={<ProblemPracticePage />} />
          <Route path="/editor" element={<CodeEditorPage />} />
          <Route path="/editor/:problemId" element={<CodeEditorPage />} />
          <Route path="/mentor" element={<AIMentorPage />} />
          <Route path="/analytics" element={<WeaknessAnalysisPage />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
          <Route path="/journal" element={<MistakeJournalPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/challenges" element={<ChallengesPage />} />
          <Route path="/contests" element={<ContestsPage />} />
          <Route path="/community" element={<CommunityPage />} />
        </Routes>
      </main>

      {!isAuthPage && !isEditorPage && <Footer />}

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
