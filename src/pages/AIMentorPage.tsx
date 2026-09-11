import React from 'react';
import { Sparkles } from 'lucide-react';
import { AIChatPanel } from '../components/AIChatPanel';

export const AIMentorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pt-2">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-900/30 border border-teal-500/30 text-teal-300 text-xs font-semibold glow-teal">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Intelligent Pair Programmer</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          AI C++ <span className="text-gradient-teal">Mentor</span> Workspace
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
          Learn how to think through complex algorithms step-by-step without having solutions spoiled.
        </p>
      </div>

      {/* Main Full Height Chat Panel Container */}
      <div className="h-[650px] w-full max-w-4xl mx-auto">
        <AIChatPanel problemTitle="General DSA & C++ Concepts" />
      </div>

    </div>
  );
};

