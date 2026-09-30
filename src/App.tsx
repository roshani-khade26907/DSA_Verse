import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LogIn, X } from 'lucide-react';
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
import { CommunityPage } from './pages/CommunityPage';

// Scroll to Top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

// Initialize theme from localStorage / system preference
const initializeTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
};

// ─── Auth Gate Modal ───────────────────────────────────────────────────────────
// Shown when an unauthenticated user tries to access a protected page.
// Per user preference: show modal instead of redirecting.
const AuthGateModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div className="w-full max-w-sm bg-theme-card border border-teal-500/30 rounded-3xl p-8 shadow-2xl glass-panel relative animate-in fade-in zoom-in-95 duration-200">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-1.5 rounded-lg text-theme-text-muted hover:bg-theme-surface-hover transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
      <div className="text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-teal-600/30">
          <LogIn className="w-7 h-7 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-theme-text">Sign in required</h3>
          <p className="text-xs text-theme-text-muted mt-1">
            Create a free account or log in to access your DSA dashboard.
          </p>
        </div>
        <div className="flex flex-col gap-2 pt-1">
          <Link
            to="/login"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-xs font-bold shadow-lg shadow-teal-600/30 transition-all flex items-center justify-center"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl border border-theme-border bg-theme-surface-elevated hover:bg-theme-surface-hover text-theme-text text-xs font-semibold transition-all flex items-center justify-center"
          >
            Create Free Account
          </Link>
        </div>
      </div>
    </div>
  </div>
);

// ─── Protected Route Wrapper ───────────────────────────────────────────────────
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setShowModal(true);
    }
  }, [loading, user]);

  if (loading) {
    // Brief loading spinner while Supabase resolves the session
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme-bg">
        <div className="w-10 h-10 rounded-full border-4 border-teal-500/30 border-t-teal-500 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <>
        {/* Render page dimly behind modal so it doesn't flash */}
        <div className="pointer-events-none opacity-30 select-none">{children}</div>
        {showModal && <AuthGateModal onClose={() => setShowModal(false)} />}
      </>
    );
  }

  return <>{children}</>;
};

// ─── Navbar with real sign-out ─────────────────────────────────────────────────
// The existing Navbar uses mockUser data. We pass the real signOut so the
// profile menu's "Log Out" button works correctly.
export const AppContent: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { signOut } = useAuth();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isEditorPage = location.pathname.startsWith('/editor');
  const isLandingPage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-teal-500/30 selection:text-teal-900 dark:selection:text-white">
      <ScrollToTop />

      {!isAuthPage && !isEditorPage && !isLandingPage && (
        <Navbar onOpenSearch={() => setIsSearchOpen(true)} onSignOut={signOut} />
      )}

      <main className="flex-1">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected routes — show auth gate modal if not logged in */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/roadmap" element={<ProtectedRoute><RoadmapPage /></ProtectedRoute>} />
          <Route path="/learn" element={<ProtectedRoute><TopicLearningPage /></ProtectedRoute>} />
          <Route path="/learn/:topicId" element={<ProtectedRoute><TopicLearningPage /></ProtectedRoute>} />
          <Route path="/practice" element={<ProtectedRoute><ProblemPracticePage /></ProtectedRoute>} />
          <Route path="/editor" element={<ProtectedRoute><CodeEditorPage /></ProtectedRoute>} />
          <Route path="/editor/:problemId" element={<ProtectedRoute><CodeEditorPage /></ProtectedRoute>} />
          <Route path="/mentor" element={<ProtectedRoute><AIMentorPage /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><WeaknessAnalysisPage /></ProtectedRoute>} />
          <Route path="/recommendations" element={<ProtectedRoute><RecommendationsPage /></ProtectedRoute>} />
          <Route path="/journal" element={<ProtectedRoute><MistakeJournalPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/challenges" element={<ProtectedRoute><ChallengesPage /></ProtectedRoute>} />
          <Route path="/community" element={<ProtectedRoute><CommunityPage /></ProtectedRoute>} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isAuthPage && !isEditorPage && !isLandingPage && <Footer />}

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default function App() {
  useEffect(() => { initializeTheme(); }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
