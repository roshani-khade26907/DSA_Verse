import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Code2, 
  Timer, 
  LayoutGrid, 
  Search, 
  ArrowUpDown, 
  Hash, 
  RotateCcw, 
  GitCommit, 
  Layers, 
  Network, 
  Share2, 
  Boxes 
} from 'lucide-react';
import { dsaTopics } from '../data/dsaData';
import { DifficultyBadge } from '../components/DifficultyBadge';
import { ProgressBar } from '../components/ProgressBar';

export const RoadmapPage: React.FC = () => {

  const getTopicIcon = (iconName: string) => {
    switch(iconName) {
      case 'Code2': return <Code2 className="w-5 h-5" />;
      case 'Timer': return <Timer className="w-5 h-5" />;
      case 'LayoutGrid': return <LayoutGrid className="w-5 h-5" />;
      case 'Search': return <Search className="w-5 h-5" />;
      case 'ArrowUpDown': return <ArrowUpDown className="w-5 h-5" />;
      case 'Hash': return <Hash className="w-5 h-5" />;
      case 'RotateCcw': return <RotateCcw className="w-5 h-5" />;
      case 'GitCommit': return <GitCommit className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Network': return <Network className="w-5 h-5" />;
      case 'Share2': return <Share2 className="w-5 h-5" />;
      case 'Boxes': return <Boxes className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pt-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-semibold glow-purple">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Curated Engineering Pathway</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          C++ DSA <span className="text-gradient-purple">Roadmap</span>
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
          Sequential 12-stage learning path from core C++ fundamentals to advanced graph traversals and dynamic programming.
        </p>
      </div>

      {/* Status Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-400 py-3 border-y border-slate-900">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
          <span>Completed</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(139,92,246,0.5)]"></span>
          <span>In Progress</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></span>
          <span>Recommended Next</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-slate-700"></span>
          <span>Locked</span>
        </div>
      </div>

      {/* Vertical Flow Pathway */}
      <div className="relative border-l-2 border-purple-500/20 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8">
        {dsaTopics.map((topic, index) => {
          const isCompleted = topic.status === 'Completed';
          const isInProgress = topic.status === 'In Progress';
          const isRecommended = topic.status === 'Recommended';
          const isLocked = topic.status === 'Locked';

          return (
            <div key={topic.id} className="relative group">
              
              {/* Node Connector Bullet */}
              <div className={`absolute -left-[31px] sm:-left-[47px] top-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white border-2 transition-all ${
                isCompleted ? 'bg-emerald-600 border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.6)]' :
                isRecommended ? 'bg-amber-600 border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.6)] animate-pulse' :
                isInProgress ? 'bg-purple-600 border-purple-400 shadow-[0_0_12px_rgba(139,92,246,0.6)]' :
                'bg-slate-900 border-slate-700 text-slate-500'
              }`}>
                {isCompleted ? <CheckCircle2 className="w-4 h-4" /> :
                 isLocked ? <Lock className="w-3.5 h-3.5" /> :
                 <span className="text-xs font-mono font-bold">{index + 1}</span>}
              </div>

              {/* Node Card */}
              <div className={`p-5 rounded-2xl border transition-all ${
                isRecommended ? 'bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-900 border-amber-500/40 shadow-xl shadow-amber-500/10' :
                isCompleted ? 'bg-slate-900/80 border-emerald-500/30 hover:border-emerald-500/50' :
                isInProgress ? 'bg-slate-900/80 border-purple-500/30 hover:border-purple-500/50' :
                'bg-slate-900/40 border-slate-800/80 opacity-75'
              } glass-panel`}>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2.5 rounded-xl border ${
                      isCompleted ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                      isRecommended ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                      isInProgress ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' :
                      'bg-slate-800 text-slate-500 border-slate-700'
                    }`}>
                      {getTopicIcon(topic.iconName)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono text-purple-400 font-bold">STAGE {index + 1}</span>
                        <DifficultyBadge difficulty={topic.difficulty} size="sm" />
                      </div>
                      <h3 className="text-lg font-bold text-white mt-0.5">{topic.name}</h3>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="shrink-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                      isCompleted ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                      isRecommended ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 animate-pulse' :
                      isInProgress ? 'bg-purple-500/10 text-purple-300 border-purple-500/30' :
                      'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                      {topic.status}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">{topic.shortDesc}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-3 border-t border-slate-800/80">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>{topic.solvedCount} of {topic.problemsCount} Solved</span>
                      <span className="font-mono">{topic.progress}%</span>
                    </div>
                    <ProgressBar progress={topic.progress} color={isCompleted ? 'emerald' : isRecommended ? 'amber' : 'purple'} height="sm" />
                  </div>

                  <div className="flex justify-end">
                    <Link
                      to={`/learn/${topic.id}`}
                      className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                        isLocked
                          ? 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'
                          : isRecommended
                          ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-md shadow-amber-500/20'
                          : 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/30'
                      }`}
                    >
                      <span>{isCompleted ? 'Review Topic' : isLocked ? 'Unlock Topic' : 'Start Topic'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
