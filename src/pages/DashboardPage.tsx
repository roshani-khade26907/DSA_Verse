import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Flame, 
  Trophy, 
  Target, 
  BarChart3, 
  BookOpen, 
  Code2, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Play, 
  Check 
} from 'lucide-react';
import { mockUser } from '../data/dsaData';
import { ProgressBar } from '../components/ProgressBar';
import { DifficultyBadge } from '../components/DifficultyBadge';
import { Heatmap } from '../components/Heatmap';

export const DashboardPage: React.FC = () => {
  const [dailyGoalSolved, setDailyGoalSolved] = useState(mockUser.dailyGoalSolved);

  const incrementGoal = () => {
    if (dailyGoalSolved < mockUser.dailyGoalTarget) {
      setDailyGoalSolved(prev => prev + 1);
    }
  };

  const topicStatuses = [
    { name: 'Arrays', progress: 90, status: 'Strong', color: 'emerald' },
    { name: 'Searching', progress: 76, status: 'Good', color: 'blue' },
    { name: 'Sorting', progress: 61, status: 'Improve', color: 'amber' },
    { name: 'Recursion', progress: 42, status: 'Weak', color: 'rose' },
  ];

  const recentActivities = [
    { title: 'Solved Two Sum', type: 'problem', time: '2 hours ago', tag: 'C++' },
    { title: 'Completed Arrays Module', type: 'topic', time: '1 day ago', tag: '100%' },
    { title: 'Attempted Binary Search', type: 'problem', time: '2 days ago', tag: 'Easy' },
    { title: 'Asked AI Mentor for Recursion Help', type: 'ai', time: '3 days ago', tag: 'AI' },
    { title: 'Reviewed Boundary Errors in Journal', type: 'journal', time: '4 days ago', tag: 'Note' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Greeting Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-teal-500/15">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center">
            Good afternoon, Prisha ðŸ‘‹
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Ready to continue your DSA journey today?</p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/roadmap"
            className="px-4 py-2 rounded-xl bg-slate-900 border border-teal-500/30 text-teal-300 text-xs font-semibold hover:bg-slate-800 transition-all flex items-center space-x-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>View Full Roadmap</span>
          </Link>
          <Link
            to="/mentor"
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-lg shadow-teal-600/30 transition-all flex items-center space-x-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Mentor</span>
          </Link>
        </div>
      </div>

      {/* Summary Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Overall Progress */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-teal-500/20 glass-panel">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Overall Progress</span>
            <BookOpen className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{mockUser.overallProgress}%</div>
          <div className="text-[11px] text-teal-400 mt-1">{mockUser.topicsCompleted} / {mockUser.totalTopics} Topics Completed</div>
        </div>

        {/* Problems Solved */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-blue-500/20 glass-panel">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Problems Solved</span>
            <Code2 className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{mockUser.problemsSolved}</div>
          <div className="text-[11px] text-blue-400 mt-1">Out of {mockUser.totalProblems} Curated C++</div>
        </div>

        {/* Current Streak */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/20 glass-panel">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Current Streak</span>
            <Flame className="w-4 h-4 text-amber-400 fill-amber-500/20" />
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono flex items-center">
            {mockUser.currentStreak} <span className="text-sm ml-1 font-normal">days</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Longest: {mockUser.longestStreak} days</div>
        </div>

        {/* DSA Readiness Score */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/20 glass-panel">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Readiness Score</span>
            <Trophy className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            {mockUser.readinessScore} <span className="text-xs text-slate-500 font-normal">/ 100</span>
          </div>
          <div className="text-[11px] text-emerald-400 mt-1">Target: 85 for Top Tech</div>
        </div>

        {/* Coding Level */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 glass-panel col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Coding Level</span>
            <Target className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-lg font-bold text-white mt-1">{mockUser.level}</div>
          <div className="text-[11px] text-slate-400 mt-1">Computer Science (3rd Yr)</div>
        </div>

      </div>

      {/* Recommended Next Step Prominent Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-950/80 via-teal-950/50 to-emerald-950/80 border border-teal-500/30 glass-panel shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Smart Next-Step Recommendation</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white flex items-center">
            Binary Search â€” Easy
            <span className="ml-3"><DifficultyBadge difficulty="Easy" size="sm" /></span>
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            <strong className="text-teal-300">Reason:</strong> You completed Arrays and achieved 82% accuracy in Linear Search. Solving Binary Search now consolidates $O(\log n)$ search intuition.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <Link
            to="/editor/binary-search"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-xs font-bold shadow-lg shadow-teal-600/30 transition-all flex items-center space-x-2"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Start Problem</span>
          </Link>
          <Link
            to="/learn/searching"
            className="px-5 py-3 rounded-xl bg-slate-900 border border-teal-500/30 text-teal-300 text-xs font-semibold hover:bg-slate-800 transition-all"
          >
            View Topic
          </Link>
        </div>
      </div>

      {/* Grid: Continue Learning + Daily Goal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Continue Learning Card */}
        <div className="md:col-span-2 p-6 rounded-2xl bg-slate-900/80 border border-teal-500/20 glass-panel space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-teal-400" />
              <h3 className="text-base font-bold text-white">Continue Learning: Recursion</h3>
            </div>
            <span className="text-xs font-mono text-teal-400 font-semibold">62% Complete</span>
          </div>
          
          <p className="text-xs text-slate-300 leading-relaxed">
            Next concept: <strong className="text-white">Call Stack Unwinding & Base Conditions</strong>. Master state space trees before moving to Backtracking.
          </p>

          <ProgressBar progress={62} color="teal" showLabel />

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">6 of 15 Problems Solved</span>
            <Link
              to="/learn/recursion"
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md transition-all flex items-center space-x-1.5"
            >
              <span>Continue Learning</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Daily Goal Card */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-teal-500/20 glass-panel space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Daily Goal</h3>
              </div>
              <span className="text-xs font-mono text-amber-400 font-semibold">{dailyGoalSolved} / {mockUser.dailyGoalTarget} Solved</span>
            </div>

            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              Solve 2 C++ problems today to protect your 5-day streak.
            </p>

            <div className="mt-4">
              <ProgressBar progress={(dailyGoalSolved / mockUser.dailyGoalTarget) * 100} color="amber" showLabel />
            </div>
          </div>

          <button
            onClick={incrementGoal}
            disabled={dailyGoalSolved >= mockUser.dailyGoalTarget}
            className="w-full py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold hover:bg-amber-500/30 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {dailyGoalSolved >= mockUser.dailyGoalTarget ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Daily Goal Accomplished!</span>
              </>
            ) : (
              <span>Simulate Solving 1 Problem</span>
            )}
          </button>
        </div>

      </div>

      {/* Grid: Topic Progress + Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Topic Progress Breakdown */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-teal-500/20 glass-panel space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center">
              <BarChart3 className="w-4 h-4 mr-2 text-teal-400" /> Topic Progress & Status
            </h3>
            <Link to="/analytics" className="text-xs text-teal-400 hover:text-teal-300 font-semibold">
              Full Analytics â†’
            </Link>
          </div>

          <div className="space-y-4">
            {topicStatuses.map((t) => (
              <div key={t.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{t.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      t.status === 'Strong' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                      t.status === 'Good' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                      t.status === 'Improve' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                      'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    }`}>
                      {t.status}
                    </span>
                    <span className="font-mono text-slate-400">{t.progress}%</span>
                  </div>
                </div>
                <ProgressBar progress={t.progress} color={t.color as any} height="sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-teal-500/20 glass-panel space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center">
              <Clock className="w-4 h-4 mr-2 text-blue-400" /> Recent Activity
            </h3>
            <span className="text-xs text-slate-500 font-mono">Last 5 actions</span>
          </div>

          <div className="space-y-3">
            {recentActivities.map((act, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-xs font-semibold text-slate-200">{act.title}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{act.time}</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-400 border border-slate-700">
                  {act.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* GitHub-style Coding Streak Heatmap */}
      <Heatmap streak={mockUser.currentStreak} />

    </div>
  );
};

