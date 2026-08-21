import React, { useState } from 'react';
import { Trophy, Clock, Users, CheckCircle2 } from 'lucide-react';
import { mockContests } from '../data/dsaData';

export const ContestsPage: React.FC = () => {
  const [registered, setRegistered] = useState<{ [key: string]: boolean }>({});

  const handleRegister = (id: string) => {
    setRegistered(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="pb-4 border-b border-purple-500/15">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white flex items-center">
          <Trophy className="w-8 h-8 mr-3 text-amber-400" />
          DSAverse Coding Contests
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Compete in timed C++ contests, climb global student leaderboards, and win badges.
        </p>
      </div>

      {/* Upcoming Contests */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-purple-400 flex items-center">
          <Clock className="w-4 h-4 mr-1.5" /> Upcoming & Live Contests
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockContests.filter(c => c.status !== 'Ended').map((contest) => (
            <div
              key={contest.id}
              className="p-6 rounded-3xl bg-slate-900/80 border border-purple-500/30 glass-panel shadow-xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {contest.duration}
                  </span>
                  <span className="text-xs font-mono text-amber-400 flex items-center font-bold">
                    <Clock className="w-3.5 h-3.5 mr-1" /> {contest.timeRemaining}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white">{contest.title}</h3>
                <div className="text-xs text-slate-400 flex items-center space-x-4 font-mono">
                  <span>{contest.date}</span>
                  <span>•</span>
                  <span>{contest.problemsCount} Problems</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-1 text-xs text-slate-400">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span>{contest.participantsCount} Registered</span>
                </div>

                <button
                  onClick={() => handleRegister(contest.id)}
                  disabled={registered[contest.id]}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    registered[contest.id]
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md'
                  }`}
                >
                  {registered[contest.id] ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Registered!</span>
                    </>
                  ) : (
                    <span>Register Now →</span>
                  )}
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Past Contests */}
      <div className="space-y-4 pt-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Previous Contests & Leaderboards
        </h2>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 glass-panel">
          <div className="flex items-center justify-between text-xs">
            <div>
              <h4 className="font-bold text-white">DSAverse Weekly Contest 41</h4>
              <p className="text-slate-400 mt-0.5">Sun, Aug 10, 2026 • 2,150 Participants</p>
            </div>
            <button onClick={() => alert('Viewing contest leaderboard')} className="px-4 py-1.5 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700">
              View Leaderboard
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
