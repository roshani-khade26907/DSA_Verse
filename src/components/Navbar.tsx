import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Code2, 
  Search, 
  Sun, 
  Moon, 
  Bell, 
  User, 
  Menu, 
  X, 
  LayoutDashboard, 
  Flame, 
  BarChart3, 
  BookMarked
} from 'lucide-react';
import { mockUser } from '../data/dsaData';

interface NavbarProps {
  onOpenSearch: () => void;
  onSignOut?: () => Promise<void>;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onSignOut }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return true;
  });
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDarkMode;
    setIsDarkMode(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Learn', path: '/learn/cpp-basics' },
    { name: 'Practice', path: '/practice' },
    { name: 'Roadmap', path: '/roadmap' },
    { name: 'Challenges', path: '/challenges' },
    { name: 'Community', path: '/community' },
  ];

  const notifications = [
    { id: '1', title: 'Daily Goal Reminder', time: '10m ago', unread: true, desc: 'Complete 1 more C++ problem today to preserve your 5-day streak!' },
    { id: '2', title: 'New Weakness Analysis Available', time: '1h ago', unread: true, desc: 'Your Recursion accuracy dropped to 42%. View recommendations.' },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-teal-500/20 bg-theme-surface-elevated/85 dark:bg-[#061417]/85 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Brand Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/30 group-hover:scale-105 transition-transform">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-theme-text flex items-center">
                  DSA<span className="text-gradient-teal">verse</span>
                  <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-mono font-semibold rounded bg-teal-500/20 text-teal-600 dark:text-teal-300 border border-teal-500/30">
                    C++
                  </span>
                </span>
                <span className="text-[10px] text-theme-text-muted font-medium tracking-wide -mt-1 hidden sm:inline">
                  Learn DSA Smarter
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path.startsWith('/learn') && location.pathname.startsWith('/learn'));
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30 shadow-sm'
                      : 'text-theme-text-muted hover:text-theme-accent hover:bg-theme-bg'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center space-x-3">
            
            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-theme-card border border-theme-border text-theme-text-muted hover:text-theme-text dark:hover:text-slate-200 hover:border-teal-400/50 text-xs font-medium transition-all"
            >
              <Search className="w-3.5 h-3.5 text-teal-500" />
              <span>Search...</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-theme-card rounded text-theme-text-muted border border-theme-border">
                Ctrl K
              </kbd>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-theme-card border border-theme-border text-theme-text-muted hover:text-teal-600 dark:hover:text-teal-300 hover:border-teal-500/40 transition-all"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-teal-500" />}
            </button>

            {/* Notification Drawer Toggle */}
            <div className="relative">
              <button
                onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }}
                className="p-2 rounded-xl bg-theme-card border border-theme-border text-theme-text-muted hover:text-teal-600 dark:hover:text-teal-300 hover:border-teal-500/40 transition-all relative"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-500 animate-ping"></span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-500"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-theme-card border border-teal-500/30 rounded-2xl shadow-2xl overflow-hidden glass-panel z-50">
                  <div className="p-3 border-b border-theme-border flex items-center justify-between bg-theme-card">
                    <span className="text-xs font-bold text-teal-600 dark:text-teal-300 uppercase tracking-wider flex items-center">
                      <Bell className="w-3.5 h-3.5 mr-1.5" /> Notifications
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-600 dark:text-teal-300 font-mono">2 New</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/50">
                    {notifications.map((n) => (
                      <div key={n.id} className={`p-3 text-left hover:bg-theme-surface-elevated dark:hover:bg-theme-card/40 transition-colors ${n.unread ? 'bg-teal-50/40 dark:bg-teal-950/20' : ''}`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-theme-text text-theme-text">{n.title}</span>
                          <span className="text-[10px] text-theme-text-muted dark:text-theme-text-muted font-mono">{n.time}</span>
                        </div>
                        <p className="text-xs text-theme-text-muted leading-relaxed">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t border-theme-border bg-theme-card text-center">
                    <button onClick={() => setShowNotifications(false)} className="text-xs text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium">
                      Mark all as read
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar / Dropdown */}
            <div className="relative">
              <button
                onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}
                className="flex items-center space-x-2 p-1 pl-2 pr-1.5 rounded-full bg-theme-card border border-teal-500/30 hover:border-teal-400 transition-all"
              >
                <span className="text-xs font-medium text-theme-text text-theme-text hidden xl:inline">Prisha</span>
                <img src={mockUser.avatar} alt={mockUser.name} className="w-7 h-7 rounded-full object-cover ring-2 ring-teal-500/40" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-theme-card border border-teal-500/30 rounded-2xl shadow-2xl overflow-hidden glass-panel z-50">
                  <div className="p-3.5 border-b border-theme-border bg-theme-card flex items-center space-x-3">
                    <img src={mockUser.avatar} alt={mockUser.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-500/50" />
                    <div>
                      <h4 className="text-sm font-semibold text-theme-text">{mockUser.name}</h4>
                      <span className="text-[11px] text-teal-600 dark:text-teal-400 font-mono flex items-center">
                        <Flame className="w-3 h-3 mr-1 text-amber-400" /> {mockUser.currentStreak} Day Streak
                      </span>
                    </div>
                  </div>
                  <div className="p-2 space-y-1">
                    <button onClick={() => { setShowProfileMenu(false); navigate('/dashboard'); }} className="w-full px-3 py-2 rounded-xl text-left text-xs font-medium text-theme-text text-theme-text hover:bg-theme-surface-hover dark:hover:bg-theme-surface-hover0/20 hover:text-teal-700 dark:hover:text-teal-300 flex items-center">
                      <LayoutDashboard className="w-4 h-4 mr-2 text-teal-500" /> Student Dashboard
                    </button>
                    <button onClick={() => { setShowProfileMenu(false); navigate('/analytics'); }} className="w-full px-3 py-2 rounded-xl text-left text-xs font-medium text-theme-text text-theme-text hover:bg-theme-surface-hover dark:hover:bg-theme-surface-hover0/20 hover:text-teal-700 dark:hover:text-teal-300 flex items-center">
                      <BarChart3 className="w-4 h-4 mr-2 text-blue-400" /> Weakness Analytics
                    </button>
                    <button onClick={() => { setShowProfileMenu(false); navigate('/journal'); }} className="w-full px-3 py-2 rounded-xl text-left text-xs font-medium text-theme-text text-theme-text hover:bg-theme-surface-hover dark:hover:bg-theme-surface-hover0/20 hover:text-teal-700 dark:hover:text-teal-300 flex items-center">
                      <BookMarked className="w-4 h-4 mr-2 text-amber-400" /> Mistake Journal
                    </button>
                    <button onClick={() => { setShowProfileMenu(false); navigate('/profile'); }} className="w-full px-3 py-2 rounded-xl text-left text-xs font-medium text-theme-text text-theme-text hover:bg-theme-surface-hover dark:hover:bg-theme-surface-hover0/20 hover:text-teal-700 dark:hover:text-teal-300 flex items-center">
                      <User className="w-4 h-4 mr-2 text-emerald-400" /> Profile & Badges
                    </button>
                  </div>
                  <div className="p-2 border-t border-theme-border bg-theme-card">
                    <button
                      onClick={async () => { setShowProfileMenu(false); if (onSignOut) await onSignOut(); navigate('/login'); }}
                      className="w-full px-3 py-1.5 rounded-lg text-left text-xs font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Dashboard CTA */}
            <Link to="/dashboard" className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white text-xs font-semibold shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all flex items-center space-x-1.5">
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button onClick={onOpenSearch} className="p-2 rounded-lg bg-theme-card text-theme-text-muted">
              <Search className="w-5 h-5 text-teal-500" />
            </button>
            <button onClick={toggleTheme} className="p-2 rounded-lg bg-theme-card text-theme-text-muted">
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-teal-500" />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg bg-theme-card text-theme-text-muted hover:text-theme-accent">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-teal-500/20 bg-theme-surface-elevated/95 dark:bg-[#061417]/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl text-xs font-medium bg-theme-card border border-theme-border text-theme-text-muted text-theme-text hover:bg-theme-surface-hover dark:hover:bg-theme-surface-hover0/30 hover:border-teal-500/40 hover:text-teal-700 dark:hover:text-teal-300 text-center">
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-3 border-t border-theme-border flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={mockUser.avatar} alt={mockUser.name} className="w-9 h-9 rounded-full object-cover border border-teal-500" />
              <div>
                <div className="text-xs font-bold text-theme-text">{mockUser.name}</div>
                <div className="text-[10px] text-teal-600 dark:text-teal-400 font-mono">Streak: {mockUser.currentStreak} Days</div>
              </div>
            </div>
            <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-xs font-semibold shadow-md">
              Dashboard
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
