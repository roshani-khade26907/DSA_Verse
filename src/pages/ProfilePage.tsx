import React from 'react';
import { Trophy, Flame, Award, ShieldCheck } from 'lucide-react';
import { mockUser } from '../data/dsaData';
import { ProgressBar } from '../components/ProgressBar';

export const ProfilePage: React.FC = () => {
  const achievements = [
    { id: '1', title: 'First Problem', desc: 'Solved your first C++ problem on DSAverse', icon: 'ðŸ†', unlocked: true, date: 'Aug 01, 2026' },
    { id: '2', title: '7 Day Streak', desc: 'Maintained a 7-day continuous coding streak', icon: 'ðŸ”¥', unlocked: true, date: 'Aug 07, 2026' },
    { id: '3', title: '25 Problems Mastered', desc: 'Solved 25 curated C++ DSA problems', icon: 'ðŸ’»', unlocked: true, date: 'Aug 11, 2026' },
    { id: '4', title: 'Tree Explorer', desc: 'Complete Binary Tree BFS & DFS traversals', icon: 'ðŸŒ³', unlocked: false, date: 'Locked' },
    { id: '5', title: 'Speed Solver', desc: 'Solve an Easy C++ problem in under 5 minutes', icon: 'âš¡', unlocked: true, date: 'Aug 13, 2026' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      
      {/* Profile Header Box */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-teal-950/80 via-teal-950/50 to-emerald-950/80 border border-teal-500/30 glass-panel shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-5">
          <img
            src={mockUser.avatar}
            alt={mockUser.name}
            className="w-20 h-20 rounded-full object-cover ring-4 ring-teal-500/50 shadow-xl"
          />
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black text-white">{mockUser.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                {mockUser.level}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">{mockUser.role}</p>
            <div className="pt-1 flex items-center space-x-4 text-xs text-slate-300 font-mono">
              <span className="flex items-center text-amber-400"><Flame className="w-3.5 h-3.5 mr-1" /> {mockUser.currentStreak} Day Streak</span>
              <span className="flex items-center text-emerald-400"><Trophy className="w-3.5 h-3.5 mr-1" /> Score: {mockUser.readinessScore}/100</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 text-right shrink-0">
          <div className="text-xs text-slate-400">Overall Progress</div>
          <div className="text-3xl font-black text-white font-mono">{mockUser.overallProgress}%</div>
          <ProgressBar progress={mockUser.overallProgress} color="teal" height="sm" className="w-36 ml-auto" />
        </div>
      </div>

      {/* Grid: Achievements + Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Achievements List */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-teal-500/20 glass-panel space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center">
              <Award className="w-4 h-4 mr-2 text-amber-400" /> Unlockable Achievements
            </h3>
            <span className="text-xs font-mono text-teal-400">4 / 5 Unlocked</span>
          </div>

          <div className="space-y-3">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                  ach.unlocked
                    ? 'bg-slate-950/80 border-teal-500/30'
                    : 'bg-slate-950/30 border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{ach.icon}</span>
                  <div>
                    <h4 className="text-xs font-bold text-white">{ach.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{ach.desc}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-500">{ach.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Summary Panel */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-teal-500/20 glass-panel space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center">
              <ShieldCheck className="w-4 h-4 mr-2 text-emerald-400" /> DSA Readiness Breakdown
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-300">Topics Completed</span>
              <span className="font-mono font-bold text-teal-400">4 / 12</span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-300">Total Problems Solved</span>
              <span className="font-mono font-bold text-blue-400">28 / 150</span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-300">Longest Streak Record</span>
              <span className="font-mono font-bold text-amber-400">14 Days</span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-300">Average Problem Time</span>
              <span className="font-mono font-bold text-emerald-400">14.5 mins</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

