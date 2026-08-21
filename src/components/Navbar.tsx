import React, { useState } from 'react';
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
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Learn', path: '/learn/cpp-basics' },
    { name: 'Practice', path: '/practice' },
    { name: 'Roadmap', path: '/roadmap' },
    { name: 'Challenges', path: '/challenges' },
    { name: 'Contests', path: '/contests' },
    { name: 'Community', path: '/community' },
  ];

  const notifications = [
    { id: '1', title: 'Daily Goal Reminder', time: '10m ago', unread: true, desc: 'Complete 1 more C++ problem today to preserve your 5-day streak!' },
    { id: '2', title: 'New Weakness Analysis Available', time: '1h ago', unread: true, desc: 'Your Recursion accuracy dropped to 42%. View recommendations.' },
    { id: '3', title: 'Weekly Contest 42', time: '1d ago', unread: false, desc: 'Registration is now open for Sunday\'s contest.' },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-purple-500/15 bg-slate-950/85 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Brand Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white flex items-center">
                  DSA<span className="text-gradient-purple">verse</span>
                  <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-mono font-semibold rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    C++
                  </span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide -mt-1 hidden sm:inline">
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
                      ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
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
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 text-xs font-medium transition-all"
            >
              <Search className="w-3.5 h-3.5 text-purple-400" />
              <span>Search...</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 rounded text-slate-400 border border-slate-700">
                Ctrl K
              </kbd>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-purple-300 hover:border-purple-500/30 transition-all"
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>

            {/* Notification Drawer Toggle */}
            <div className="relative">
              <button
                onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-purple-300 hover:border-purple-500/30 transition-all relative"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-500 animate-ping"></span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-500"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden glass-panel z-50 animate-fadeIn">
                  <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
                    <span className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center">
                      <Bell className="w-3.5 h-3.5 mr-1.5" /> Notifications
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
                      2 New
                    </span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/50">
                    {notifications.map((n) => (
                      <div key={n.id} className={`p-3 text-left hover:bg-slate-800/40 transition-colors ${n.unread ? 'bg-purple-950/20' : ''}`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-slate-200">{n.title}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{n.time}</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t border-slate-800 bg-slate-950/60 text-center">
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-xs text-purple-400 hover:text-purple-300 font-medium"
                    >
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
                className="flex items-center space-x-2 p-1 pl-2 pr-1.5 rounded-full bg-slate-900 border border-purple-500/30 hover:border-purple-400 transition-all"
              >
                <span className="text-xs font-medium text-slate-200 hidden xl:inline">
                  Prisha
                </span>
                <img
                  src={mockUser.avatar}
                  alt={mockUser.name}
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-purple-500/40"
                />
              </button>

              {/* Profile Menu Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden glass-panel z-50 animate-fadeIn">
                  <div className="p-3.5 border-b border-slate-800 bg-slate-950/60 flex items-center space-x-3">
                    <img src={mockUser.avatar} alt={mockUser.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/50" />
                    <div>
                      <h4 className="text-sm font-semibold text-white">{mockUser.name}</h4>
                      <span className="text-[11px] text-purple-400 font-mono flex items-center">
                        <Flame className="w-3 h-3 mr-1 text-amber-400" /> {mockUser.currentStreak} Day Streak
                      </span>
                    </div>
                  </div>
                  <div className="p-2 space-y-1">
                    <button
                      onClick={() => { setShowProfileMenu(false); navigate('/dashboard'); }}
                      className="w-full px-3 py-2 rounded-xl text-left text-xs font-medium text-slate-200 hover:bg-purple-900/20 hover:text-purple-300 flex items-center"
                    >
                      <LayoutDashboard className="w-4 h-4 mr-2 text-purple-400" /> Student Dashboard
                    </button>
                    <button
                      onClick={() => { setShowProfileMenu(false); navigate('/analytics'); }}
                      className="w-full px-3 py-2 rounded-xl text-left text-xs font-medium text-slate-200 hover:bg-purple-900/20 hover:text-purple-300 flex items-center"
                    >
                      <BarChart3 className="w-4 h-4 mr-2 text-blue-400" /> Weakness Analytics
                    </button>
                    <button
                      onClick={() => { setShowProfileMenu(false); navigate('/journal'); }}
                      className="w-full px-3 py-2 rounded-xl text-left text-xs font-medium text-slate-200 hover:bg-purple-900/20 hover:text-purple-300 flex items-center"
                    >
                      <BookMarked className="w-4 h-4 mr-2 text-amber-400" /> Mistake Journal
                    </button>
                    <button
                      onClick={() => { setShowProfileMenu(false); navigate('/profile'); }}
                      className="w-full px-3 py-2 rounded-xl text-left text-xs font-medium text-slate-200 hover:bg-purple-900/20 hover:text-purple-300 flex items-center"
                    >
                      <User className="w-4 h-4 mr-2 text-emerald-400" /> Profile & Badges
                    </button>
                  </div>
                  <div className="p-2 border-t border-slate-800 bg-slate-950/60">
                    <button
                      onClick={() => { setShowProfileMenu(false); navigate('/login'); }}
                      className="w-full px-3 py-1.5 rounded-lg text-left text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Prominent Dashboard CTA */}
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 transition-all flex items-center space-x-1.5"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white"
            >
              <Search className="w-5 h-5 text-purple-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-purple-500/20 bg-slate-950/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-xs font-medium bg-slate-900/80 border border-slate-800 text-slate-200 hover:bg-purple-900/30 hover:border-purple-500/40 text-center"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={mockUser.avatar} alt={mockUser.name} className="w-9 h-9 rounded-full object-cover border border-purple-500" />
              <div>
                <div className="text-xs font-bold text-white">{mockUser.name}</div>
                <div className="text-[10px] text-purple-400 font-mono">Streak: {mockUser.currentStreak} Days 🔥</div>
              </div>
            </div>
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold shadow-md"
            >
              Dashboard
            </Link>
          </div>
        </div>
      )}

    </nav>
  );
};
