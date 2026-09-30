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
    outputDetails: 'Test Case 1: [0,1] Passed\nTest Case 2: [1,2] Passed\nTest Case 3: [0,1] Passed'
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
        outputDetails: problem.testCases.map((tc, i) => `Test Case ${i + 1}: ${tc.expectedOutput} - Passed`).join('\n')
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
        outputDetails: 'Accepted! Beats 94.2% of C++ submissions on DSAverse.\nRuntime: 4 ms | Memory: 9.2 MB'
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
    <div className="h-[calc(100vh-4rem)] bg-theme-bg text-theme-text flex flex-col overflow-hidden">
      
      {/* Editor Top Bar */}
      <div className="px-4 py-2.5 bg-theme-card border-b border-teal-500/20 flex items-center justify-between shrink-0">
        
        <div className="flex items-center space-x-3">
          <Link to="/practice" className="p-1.5 rounded-lg border-theme-border text-theme-text-muted hover:text-theme-text transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center space-x-2">
            <h2 className="text-sm font-bold text-theme-text">{problem.title}</h2>
            <DifficultyBadge difficulty={problem.difficulty} size="sm" />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-theme-card text-teal-300 border border-theme-border">
            C++ 20 (GCC)
          </span>

          <button
            onClick={() => setCode(problem.starterCode)}
            className="p-1.5 rounded-lg border-theme-border text-theme-text-muted hover:text-theme-text transition-colors text-xs flex items-center space-x-1"
            title="Reset Code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleRunCode}
            disabled={isRunning || isSubmitting}
            className="px-4 py-1.5 rounded-xl border-theme-border hover:bg-slate-700 border border-theme-border text-theme-text text-xs font-semibold transition-all flex items-center space-x-1.5"
          >
            <Play className="w-3.5 h-3.5 text-emerald-400 fill-current" />
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </button>

          <button
            onClick={handleSubmit}
            disabled={isRunning || isSubmitting}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-theme-text text-xs font-bold shadow-md shadow-teal-600/30 transition-all flex items-center space-x-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
          </button>

          <button
            onClick={() => setShowMentor(!showMentor)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 border ${
              showMentor ? 'bg-teal-600 text-theme-text border-teal-400' : 'bg-teal-500/10 text-teal-300 border-teal-500/30 hover:bg-theme-surface-hover0/20'
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
        <div className="lg:col-span-5 border-r border-theme-border flex flex-col overflow-hidden bg-theme-card/50">
          
          {/* Left Tabs */}
          <div className="px-4 py-2 border-b border-theme-border bg-theme-card/80 flex items-center space-x-4 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('statement')}
              className={`py-1 ${activeTab === 'statement' ? 'text-teal-400 border-b-2 border-teal-500' : 'text-theme-text-muted hover:text-theme-text'}`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('hints')}
              className={`py-1 ${activeTab === 'hints' ? 'text-teal-400 border-b-2 border-teal-500' : 'text-theme-text-muted hover:text-theme-text'}`}
            >
              Hints ({problem.hints.length})
            </button>
            <button
              onClick={() => setActiveTab('solution')}
              className={`py-1 ${activeTab === 'solution' ? 'text-teal-400 border-b-2 border-teal-500' : 'text-theme-text-muted hover:text-theme-text'}`}
            >
              Official Solution
            </button>
          </div>

          {/* Left Content Scrollable */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs leading-relaxed">
            
            {activeTab === 'statement' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-theme-text mb-2">{problem.title}</h3>
                  <div className="flex items-center space-x-3 text-theme-text-muted font-mono text-[11px]">
                    <span>Acceptance: {problem.acceptance}</span>
                    <span>|</span>
                    <span>Platform: {problem.platform}</span>
                  </div>
                </div>

                <div className="whitespace-pre-wrap text-theme-text-muted">
                  {problem.statement}
                </div>

                {/* Examples */}
                <div className="space-y-4">
                  <h4 className="font-bold text-theme-text uppercase text-[10px] tracking-wider">Examples</h4>
                  {problem.examples.map((ex, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-theme-card border border-theme-border font-mono space-y-1">
                      <div><strong className="text-teal-400">Input:</strong> {ex.input}</div>
                      <div><strong className="text-emerald-400">Output:</strong> {ex.output}</div>
                      <div className="text-theme-text-muted font-sans mt-1 text-[11px]">
                        <strong>Explanation:</strong> {ex.explanation}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div className="space-y-2">
                  <h4 className="font-bold text-theme-text uppercase text-[10px] tracking-wider">Constraints</h4>
                  <ul className="list-disc list-inside space-y-1 text-theme-text-muted font-mono text-[11px]">
                    {problem.constraints.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>

                {/* Expected Complexity */}
                <div className="p-3.5 rounded-xl bg-theme-card border border-teal-500/20 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-theme-text-muted uppercase tracking-wider">Expected Complexity</div>
                    <div className="font-mono text-teal-300 font-bold mt-0.5">
                      Time: {problem.expectedTime} | Space: {problem.expectedSpace}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'hints' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-theme-text">Problem Hints</h3>
                {problem.hints.map((hint, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-theme-card border border-amber-500/20 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Hint {idx + 1}</span>
                    <p className="text-xs text-theme-text-muted leading-relaxed">{hint}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'solution' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-theme-text">C++ Official Solution</h3>
                <div className="p-4 rounded-xl bg-theme-card border border-theme-border overflow-x-auto font-mono text-xs text-teal-300">
                  <pre>{problem.solutionCode}</pre>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Right Pane: C++ Editor + Output Console */}
        <div className={`lg:col-span-${showMentor ? '4' : '7'} flex flex-col overflow-hidden bg-theme-card`}>
          
          {/* C++ Code TextArea / Editor */}
          <div className="flex-1 relative flex flex-col">
            <div className="px-4 py-1.5 bg-theme-card/60 border-b border-theme-border flex items-center justify-between text-[11px] font-mono text-theme-text-muted">
              <span>main.cpp</span>
              <span>UTF-8</span>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 w-full bg-theme-bg text-theme-text font-mono text-xs p-4 focus:outline-none resize-none leading-relaxed"
              spellCheck={false}
            />
          </div>

          {/* Bottom Test Case Output Console Panel */}
          <div className="h-48 border-t border-theme-border bg-theme-card/90 flex flex-col">
            
            {/* Console Tab Selector */}
            <div className="px-4 py-2 border-b border-theme-border bg-theme-card/80 flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setConsoleTab('testcases')}
                  className={`py-0.5 ${consoleTab === 'testcases' ? 'text-teal-400 border-b-2 border-teal-500' : 'text-theme-text-muted hover:text-theme-text'}`}
                >
                  Test Cases
                </button>
                <button
                  onClick={() => setConsoleTab('result')}
                  className={`py-0.5 ${consoleTab === 'result' ? 'text-teal-400 border-b-2 border-teal-500' : 'text-theme-text-muted hover:text-theme-text'}`}
                >
                  Execution Result
                </button>
              </div>

              {testResult.status !== 'Idle' && (
                <div className="flex items-center space-x-3 text-[11px] font-mono">
                  <span className="text-emerald-400 flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> {testResult.status}
                  </span>
                  <span className="text-theme-text-muted">Runtime: {testResult.runtime}</span>
                  <span className="text-theme-text-muted">Memory: {testResult.memory}</span>
                </div>
              )}
            </div>

            {/* Console Content */}
            <div className="flex-1 p-4 overflow-y-auto font-mono text-xs">
              {consoleTab === 'testcases' ? (
                <div className="space-y-3">
                  {problem.testCases.map((tc, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-theme-card border border-theme-border">
                      <div className="text-[10px] text-theme-text-muted uppercase tracking-wider mb-1">Test Case {i + 1}</div>
                      <div>Input: <span className="text-teal-300">{tc.input}</span></div>
                      <div>Expected: <span className="text-emerald-400">{tc.expectedOutput}</span></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="whitespace-pre-wrap text-theme-text-muted leading-relaxed">
                  {isRunning || isSubmitting ? (
                    <div className="flex items-center space-x-2 text-teal-400">
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
          <div className="lg:col-span-3 border-l border-theme-border bg-theme-card p-2 overflow-hidden flex flex-col">
            <AIChatPanel problemTitle={problem.title} codeContext={code} />
          </div>
        )}

      </div>

    </div>
  );
};

