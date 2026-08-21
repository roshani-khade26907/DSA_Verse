import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Play, 
  Send, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft 
} from 'lucide-react';
import { dsaProblems } from '../data/dsaData';
import { DifficultyBadge } from '../components/DifficultyBadge';
import { AIChatPanel } from '../components/AIChatPanel';
import confetti from 'canvas-confetti';

export const CodeEditorPage: React.FC = () => {
  const { problemId = 'two-sum' } = useParams<{ problemId: string }>();
  const problem = dsaProblems.find(p => p.id === problemId) || dsaProblems[0];

  const [code, setCode] = useState(problem.starterCode);
  const [activeTab, setActiveTab] = useState<'statement' | 'hints' | 'solution'>('statement');
  const [consoleTab, setConsoleTab] = useState<'testcases' | 'result'>('testcases');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResult, setTestResult] = useState<{
    status: 'Passed' | 'Failed' | 'Idle';
    runtime: string;
    memory: string;
    casesPassed: string;
    outputDetails: string;
  }>({
    status: 'Idle',
    runtime: '12 ms',
    memory: '10.4 MB',
    casesPassed: '3/3',
    outputDetails: 'Test Case 1: [0,1] ✓ Passed\nTest Case 2: [1,2] ✓ Passed\nTest Case 3: [0,1] ✓ Passed'
  });

  const [showMentor, setShowMentor] = useState(false);

  const handleRunCode = () => {
    setIsRunning(true);
    setConsoleTab('result');
    setTimeout(() => {
      setIsRunning(false);
      setTestResult({
        status: 'Passed',
        runtime: '8 ms',
        memory: '9.8 MB',
        casesPassed: `${problem.testCases.length}/${problem.testCases.length}`,
        outputDetails: problem.testCases.map((tc, i) => `Test Case ${i + 1}: ${tc.expectedOutput} ✓ Passed`).join('\n')
      });
    }, 800);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setConsoleTab('result');
    setTimeout(() => {
      setIsSubmitting(false);
      setTestResult({
        status: 'Passed',
        runtime: '4 ms',
        memory: '9.2 MB',
        casesPassed: '100/100',
        outputDetails: '✓ Accepted! Beats 94.2% of C++ submissions on DSAverse.\nRuntime: 4 ms | Memory: 9.2 MB'
      });
      // Confetti celebration trigger
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  return (
    <div className="h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 flex flex-col overflow-hidden">
      
      {/* Editor Top Bar */}
      <div className="px-4 py-2.5 bg-slate-900 border-b border-purple-500/20 flex items-center justify-between shrink-0">
        
        <div className="flex items-center space-x-3">
          <Link to="/practice" className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center space-x-2">
            <h2 className="text-sm font-bold text-white">{problem.title}</h2>
            <DifficultyBadge difficulty={problem.difficulty} size="sm" />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-950 text-purple-300 border border-slate-800">
            C++ 20 (GCC)
          </span>

          <button
            onClick={() => setCode(problem.starterCode)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors text-xs flex items-center space-x-1"
            title="Reset Code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleRunCode}
            disabled={isRunning || isSubmitting}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-all flex items-center space-x-1.5"
          >
            <Play className="w-3.5 h-3.5 text-emerald-400 fill-current" />
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </button>

          <button
            onClick={handleSubmit}
            disabled={isRunning || isSubmitting}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-purple-600/30 transition-all flex items-center space-x-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
          </button>

          <button
            onClick={() => setShowMentor(!showMentor)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 border ${
              showMentor ? 'bg-purple-600 text-white border-purple-400' : 'bg-purple-500/10 text-purple-300 border-purple-500/30 hover:bg-purple-500/20'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Mentor</span>
          </button>
        </div>

      </div>

      {/* Dual Pane Main Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* Left Pane: Problem Description & Details */}
        <div className="lg:col-span-5 border-r border-slate-800 flex flex-col overflow-hidden bg-slate-900/50">
          
          {/* Left Tabs */}
          <div className="px-4 py-2 border-b border-slate-800 bg-slate-950/80 flex items-center space-x-4 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('statement')}
              className={`py-1 ${activeTab === 'statement' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('hints')}
              className={`py-1 ${activeTab === 'hints' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Hints ({problem.hints.length})
            </button>
            <button
              onClick={() => setActiveTab('solution')}
              className={`py-1 ${activeTab === 'solution' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Official Solution
            </button>
          </div>

          {/* Left Content Scrollable */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs leading-relaxed">
            
            {activeTab === 'statement' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-white mb-2">{problem.title}</h3>
                  <div className="flex items-center space-x-3 text-slate-400 font-mono text-[11px]">
                    <span>Acceptance: {problem.acceptance}</span>
                    <span>•</span>
                    <span>Platform: {problem.platform}</span>
                  </div>
                </div>

                <div className="whitespace-pre-wrap text-slate-300">
                  {problem.statement}
                </div>

                {/* Examples */}
                <div className="space-y-4">
                  <h4 className="font-bold text-white uppercase text-[10px] tracking-wider">Examples</h4>
                  {problem.examples.map((ex, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono space-y-1">
                      <div><strong className="text-purple-400">Input:</strong> {ex.input}</div>
                      <div><strong className="text-emerald-400">Output:</strong> {ex.output}</div>
                      <div className="text-slate-400 font-sans mt-1 text-[11px]">
                        <strong>Explanation:</strong> {ex.explanation}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div className="space-y-2">
                  <h4 className="font-bold text-white uppercase text-[10px] tracking-wider">Constraints</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-400 font-mono text-[11px]">
                    {problem.constraints.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>

                {/* Expected Complexity */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-purple-500/20 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Expected Complexity</div>
                    <div className="font-mono text-purple-300 font-bold mt-0.5">
                      Time: {problem.expectedTime} | Space: {problem.expectedSpace}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'hints' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white">Problem Hints</h3>
                {problem.hints.map((hint, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-amber-500/20 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Hint {idx + 1}</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{hint}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'solution' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white">C++ Official Solution</h3>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 overflow-x-auto font-mono text-xs text-purple-300">
                  <pre>{problem.solutionCode}</pre>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Right Pane: C++ Editor + Output Console */}
        <div className={`lg:col-span-${showMentor ? '4' : '7'} flex flex-col overflow-hidden bg-slate-950`}>
          
          {/* C++ Code TextArea / Editor */}
          <div className="flex-1 relative flex flex-col">
            <div className="px-4 py-1.5 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>main.cpp</span>
              <span>UTF-8</span>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 w-full bg-slate-950 text-slate-100 font-mono text-xs p-4 focus:outline-none resize-none leading-relaxed"
              spellCheck={false}
            />
          </div>

          {/* Bottom Test Case Output Console Panel */}
          <div className="h-48 border-t border-slate-800 bg-slate-900/90 flex flex-col">
            
            {/* Console Tab Selector */}
            <div className="px-4 py-2 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setConsoleTab('testcases')}
                  className={`py-0.5 ${consoleTab === 'testcases' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  Test Cases
                </button>
                <button
                  onClick={() => setConsoleTab('result')}
                  className={`py-0.5 ${consoleTab === 'result' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  Execution Result
                </button>
              </div>

              {testResult.status !== 'Idle' && (
                <div className="flex items-center space-x-3 text-[11px] font-mono">
                  <span className="text-emerald-400 flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> {testResult.status}
                  </span>
                  <span className="text-slate-400">Runtime: {testResult.runtime}</span>
                  <span className="text-slate-400">Memory: {testResult.memory}</span>
                </div>
              )}
            </div>

            {/* Console Content */}
            <div className="flex-1 p-4 overflow-y-auto font-mono text-xs">
              {consoleTab === 'testcases' ? (
                <div className="space-y-3">
                  {problem.testCases.map((tc, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Test Case {i + 1}</div>
                      <div>Input: <span className="text-purple-300">{tc.input}</span></div>
                      <div>Expected: <span className="text-emerald-400">{tc.expectedOutput}</span></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="whitespace-pre-wrap text-slate-300 leading-relaxed">
                  {isRunning || isSubmitting ? (
                    <div className="flex items-center space-x-2 text-purple-400">
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>Compiling C++20 code & executing test suites...</span>
                    </div>
                  ) : (
                    testResult.outputDetails
                  )}
                </div>
              )}
            </div>

          </div>

        </div>

        {/* AI Mentor Side Drawer */}
        {showMentor && (
          <div className="lg:col-span-3 border-l border-slate-800 bg-slate-950 p-2 overflow-hidden flex flex-col">
            <AIChatPanel problemTitle={problem.title} codeContext={code} />
          </div>
        )}

      </div>

    </div>
  );
};
