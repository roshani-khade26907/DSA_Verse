import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Code2, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  Timer, 
  Copy, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  ChevronRight, 
  Sparkles 
} from 'lucide-react';
import { dsaTopics, dsaProblems } from '../data/dsaData';
import { DifficultyBadge } from '../components/DifficultyBadge';

export const TopicLearningPage: React.FC = () => {
  const { topicId = 'arrays' } = useParams<{ topicId: string }>();
  const navigate = useNavigate();

  const currentTopic = dsaTopics.find(t => t.id === topicId) || dsaTopics[2]; // Default to Arrays
  const relatedProblems = dsaProblems.filter(p => p.topicId === currentTopic.id || p.topicId === 'arrays');

  const [activeTab, setActiveTab] = useState<'concepts' | 'syntax' | 'dryrun' | 'complexity' | 'mistakes' | 'practice'>('concepts');
  const [copiedSyntax, setCopiedSyntax] = useState(false);
  const [dryRunIndex, setDryRunIndex] = useState(0);

  const dryRunSteps = currentTopic.dryRunSteps;

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSyntax(true);
    setTimeout(() => setCopiedSyntax(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Top Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-500/15">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1">
            <Link to="/roadmap" className="hover:text-purple-300 flex items-center">
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Roadmap
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-purple-300 font-semibold">{currentTopic.name}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white flex items-center space-x-3">
            <span>{currentTopic.name}</span>
            <DifficultyBadge difficulty={currentTopic.difficulty} size="md" />
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate(`/editor/${relatedProblems[0]?.id || 'two-sum'}`)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition-all flex items-center space-x-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Practice C++ Problems</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Navigation Tabs + Right Main Learning Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar Navigation */}
        <div className="lg:col-span-3 space-y-2">
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-purple-500/20 glass-panel space-y-1">
            
            <button
              onClick={() => setActiveTab('concepts')}
              className={`w-full px-3 py-2.5 rounded-xl text-left text-xs font-semibold flex items-center space-x-2.5 transition-all ${
                activeTab === 'concepts' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>1. Overview & Concepts</span>
            </button>

            <button
              onClick={() => setActiveTab('syntax')}
              className={`w-full px-3 py-2.5 rounded-xl text-left text-xs font-semibold flex items-center space-x-2.5 transition-all ${
                activeTab === 'syntax' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>2. C++ Syntax & Example</span>
            </button>

            <button
              onClick={() => setActiveTab('dryrun')}
              className={`w-full px-3 py-2.5 rounded-xl text-left text-xs font-semibold flex items-center space-x-2.5 transition-all ${
                activeTab === 'dryrun' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Play className="w-4 h-4 text-emerald-400" />
              <span>3. Step-by-Step Dry Run</span>
            </button>

            <button
              onClick={() => setActiveTab('complexity')}
              className={`w-full px-3 py-2.5 rounded-xl text-left text-xs font-semibold flex items-center space-x-2.5 transition-all ${
                activeTab === 'complexity' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Timer className="w-4 h-4 text-amber-400" />
              <span>4. Complexity Analysis</span>
            </button>

            <button
              onClick={() => setActiveTab('mistakes')}
              className={`w-full px-3 py-2.5 rounded-xl text-left text-xs font-semibold flex items-center space-x-2.5 transition-all ${
                activeTab === 'mistakes' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>5. Common Mistakes</span>
            </button>

            <button
              onClick={() => setActiveTab('practice')}
              className={`w-full px-3 py-2.5 rounded-xl text-left text-xs font-semibold flex items-center space-x-2.5 transition-all ${
                activeTab === 'practice' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>6. Practice Questions</span>
            </button>

          </div>

          {/* AI Quick Prompt Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/60 to-slate-900 border border-purple-500/30 glass-panel space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-purple-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Need help with {currentTopic.name}?</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Ask our AI Mentor to explain tricky pointers, dry run recursive trees, or suggest code optimization!
            </p>
            <button
              onClick={() => navigate('/mentor')}
              className="w-full py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600 border border-purple-500/40 text-white text-xs font-semibold transition-all"
            >
              Ask AI Mentor
            </button>
          </div>

        </div>

        {/* Right Main Learning Workspace Panel */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: CONCEPTS & OVERVIEW */}
          {activeTab === 'concepts' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Beginner Friendly Explanation */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-purple-500/20 glass-panel space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-purple-400" /> Simple Explanation
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {currentTopic.fullDesc}
                </p>
              </div>

              {/* Key Concepts Grid */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-purple-500/20 glass-panel space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center">
                  <CheckCircle2 className="w-5 h-5 mr-2 text-emerald-400" /> Important Concepts to Master
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentTopic.keyConcepts.map((concept, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start space-x-3">
                      <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold font-mono flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-medium text-slate-200 leading-snug">{concept}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: C++ SYNTAX & EXAMPLE */}
          {activeTab === 'syntax' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-purple-500/20 glass-panel space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center">
                    <Code2 className="w-5 h-5 mr-2 text-indigo-400" /> Standard C++ Syntax Template
                  </h3>
                  <button
                    onClick={() => handleCopyCode(currentTopic.cppSyntax)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center space-x-1.5 transition-colors"
                  >
                    {copiedSyntax ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSyntax ? 'Copied' : 'Copy Code'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 overflow-x-auto font-mono text-xs text-purple-300 leading-relaxed">
                  <pre>{currentTopic.cppSyntax}</pre>
                </div>
              </div>

              {/* Practical Example Code */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-purple-500/20 glass-panel space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-amber-400" /> Complete Example Solution
                </h3>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 overflow-x-auto font-mono text-xs text-slate-200 leading-relaxed">
                  <pre>{currentTopic.exampleCode}</pre>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => navigate(`/editor/${relatedProblems[0]?.id || 'two-sum'}`)}
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md transition-all flex items-center space-x-2"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run in Code Editor</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: STEP-BY-STEP DRY RUN VISUALIZER */}
          {activeTab === 'dryrun' && (
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-purple-500/20 glass-panel space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center">
                    <Play className="w-5 h-5 mr-2 text-emerald-400 fill-emerald-500/20" /> Interactive Step-by-Step Dry Run
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Visualize array elements, pointer moves, and state changes</p>
                </div>

                {/* Dry Run Controls */}
                <div className="flex items-center space-x-2 font-mono">
                  <button
                    onClick={() => setDryRunIndex(Math.max(0, dryRunIndex - 1))}
                    disabled={dryRunIndex === 0}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 disabled:opacity-40 text-slate-200 text-xs font-semibold hover:bg-slate-700"
                  >
                    Prev Step
                  </button>
                  <span className="text-xs text-purple-400 px-2">
                    Step {dryRunIndex + 1} / {dryRunSteps.length}
                  </span>
                  <button
                    onClick={() => setDryRunIndex(Math.min(dryRunSteps.length - 1, dryRunIndex + 1))}
                    disabled={dryRunIndex === dryRunSteps.length - 1}
                    className="px-3 py-1.5 rounded-lg bg-purple-600 disabled:opacity-40 text-white text-xs font-semibold hover:bg-purple-500"
                  >
                    Next Step
                  </button>
                </div>
              </div>

              {/* Dry Run Visual Display Area */}
              {dryRunSteps[dryRunIndex] && (
                <div className="p-6 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-6">
                  
                  <h4 className="text-sm font-bold text-purple-300">
                    Step {dryRunSteps[dryRunIndex].step}: {dryRunSteps[dryRunIndex].title}
                  </h4>

                  {/* Array Elements Visualization Grid */}
                  <div className="py-6 px-4 bg-slate-900/90 rounded-2xl border border-slate-800 flex items-center justify-center space-x-3 overflow-x-auto">
                    {dryRunSteps[dryRunIndex].arrayState.map((val, idx) => {
                      const isHighlighted = dryRunSteps[dryRunIndex].highlightIndices.includes(idx);
                      return (
                        <div key={idx} className="flex flex-col items-center">
                          <span className="text-[10px] font-mono text-slate-500 mb-1">Index {idx}</span>
                          <div className={`w-12 h-14 rounded-xl flex items-center justify-center font-mono text-sm font-bold transition-all ${
                            isHighlighted
                              ? 'bg-purple-600 text-white ring-4 ring-purple-500/50 scale-110 shadow-lg shadow-purple-600/50'
                              : 'bg-slate-800 text-slate-300 border border-slate-700'
                          }`}>
                            {val}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Pointer Readout */}
                  <div className="flex flex-wrap items-center gap-3">
                    {Object.entries(dryRunSteps[dryRunIndex].pointers).map(([pName, pVal]) => (
                      <span key={pName} className="px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
                        {pName} = {pVal}
                      </span>
                    ))}
                  </div>

                  {/* Step Description */}
                  <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-900 p-4 rounded-xl border border-slate-800">
                    {dryRunSteps[dryRunIndex].description}
                  </p>

                </div>
              )}

            </div>
          )}

          {/* TAB 4: COMPLEXITY ANALYSIS */}
          {activeTab === 'complexity' && (
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-purple-500/20 glass-panel space-y-6 animate-fadeIn">
              <h3 className="text-lg font-bold text-white flex items-center">
                <Timer className="w-5 h-5 mr-2 text-amber-400" /> Complexity Breakdown
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/30 glass-panel space-y-2">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Time Complexity</span>
                  <div className="text-3xl font-extrabold text-purple-400 font-mono">
                    {currentTopic.complexity.time}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Growth rate relative to input size N.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-blue-500/30 glass-panel space-y-2">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Space Complexity</span>
                  <div className="text-3xl font-extrabold text-blue-400 font-mono">
                    {currentTopic.complexity.space}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Auxiliary memory allocated on heap or call stack.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <strong className="text-purple-300">Explanation:</strong> {currentTopic.complexity.description}
              </div>
            </div>
          )}

          {/* TAB 5: COMMON MISTAKES */}
          {activeTab === 'mistakes' && (
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-purple-500/20 glass-panel space-y-4 animate-fadeIn">
              <h3 className="text-lg font-bold text-white flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-rose-400" /> Common Beginner Pitfalls & Fixes
              </h3>

              <div className="space-y-4">
                {currentTopic.commonMistakes.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-rose-500/20 space-y-2">
                    <h4 className="text-sm font-bold text-rose-300 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-rose-500 mr-2"></span> {m.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{m.desc}</p>
                    <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300">
                      <strong>Fix:</strong> {m.fix}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: PRACTICE QUESTIONS */}
          {activeTab === 'practice' && (
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-purple-500/20 glass-panel space-y-4 animate-fadeIn">
              <h3 className="text-lg font-bold text-white flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-cyan-400" /> Curated C++ Practice Problems
              </h3>

              <div className="space-y-3">
                {relatedProblems.map((prob) => (
                  <div
                    key={prob.id}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 flex items-center justify-between transition-all"
                  >
                    <div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-bold text-white">{prob.title}</span>
                        <DifficultyBadge difficulty={prob.difficulty} size="sm" />
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Acceptance: {prob.acceptance} • Platform: {prob.platform}</p>
                    </div>

                    <Link
                      to={`/editor/${prob.id}`}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all flex items-center space-x-1"
                    >
                      <span>Solve Problem</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
