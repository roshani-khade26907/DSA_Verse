import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Globe, Share2, Heart, Sparkles, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-purple-500/15 bg-slate-950 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-600/30">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                DSA<span className="text-gradient-purple">verse</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The complete, interactive DSA learning platform designed specifically for engineering students to master Data Structures & Algorithms in C++.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 text-slate-400 hover:text-white transition-all">
                <Code2 className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 text-slate-400 hover:text-white transition-all">
                <Globe className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 text-slate-400 hover:text-white transition-all">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column 1: Learn */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-purple-400" /> Learn
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/roadmap" className="hover:text-purple-300 transition-colors">Structured Roadmap</Link></li>
              <li><Link to="/learn/arrays" className="hover:text-purple-300 transition-colors">Arrays & Pointers</Link></li>
              <li><Link to="/learn/searching" className="hover:text-purple-300 transition-colors">Binary Search</Link></li>
              <li><Link to="/learn/recursion" className="hover:text-purple-300 transition-colors">Recursion & Backtracking</Link></li>
              <li><Link to="/learn/trees" className="hover:text-purple-300 transition-colors">Trees & Graph BFS/DFS</Link></li>
            </ul>
          </div>

          {/* Quick Links Column 2: Practice */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center">
              <Code2 className="w-3.5 h-3.5 mr-1.5 text-blue-400" /> Practice
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/practice" className="hover:text-purple-300 transition-colors">Curated C++ Problems</Link></li>
              <li><Link to="/editor/two-sum" className="hover:text-purple-300 transition-colors">C++ Code Editor</Link></li>
              <li><Link to="/challenges" className="hover:text-purple-300 transition-colors">Coding Challenges</Link></li>
              <li><Link to="/contests" className="hover:text-purple-300 transition-colors">Weekly Contests</Link></li>
              <li><Link to="/mentor" className="hover:text-purple-300 transition-colors">AI C++ Mentor</Link></li>
            </ul>
          </div>

          {/* Quick Links Column 3: Platform */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-emerald-400" /> Platform
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/dashboard" className="hover:text-purple-300 transition-colors">Student Dashboard</Link></li>
              <li><Link to="/analytics" className="hover:text-purple-300 transition-colors">Weakness Analysis</Link></li>
              <li><Link to="/recommendations" className="hover:text-purple-300 transition-colors">Smart Recommendations</Link></li>
              <li><Link to="/journal" className="hover:text-purple-300 transition-colors">Mistake Journal</Link></li>
              <li><Link to="/community" className="hover:text-purple-300 transition-colors">Community Forum</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 DSAverse Inc. Built for Engineering Students worldwide.</p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0 font-mono">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span className="flex items-center text-slate-400">
              Crafted with <Heart className="w-3 h-3 text-rose-500 mx-1 fill-rose-500" /> for C++ Coders
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
