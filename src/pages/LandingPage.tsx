import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Target, 
  BarChart3, 
  BookOpen, 
  Terminal, 
  Cpu, 
  Flame 
} from 'lucide-react';
import { dsaTopics } from '../data/dsaData';
import { DifficultyBadge } from '../components/DifficultyBadge';
import { ProgressBar } from '../components/ProgressBar';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-grid-pattern">
        {/* Glowing Background Orbs */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse"></div>
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-semibold glow-purple">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Designed for Engineering & CS Students</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Master <span className="text-gradient-purple">DSA</span>.<br />
              Build Your Future.
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              Learn Data Structures and Algorithms through a structured roadmap, interactive lessons, curated C++ problems, personalized analytics, and an AI Mentor.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-purple-600/35 hover:shadow-purple-600/50 transition-all flex items-center justify-center space-x-2 group"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/roadmap"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-purple-500/25 hover:border-purple-500/50 text-slate-200 font-semibold text-sm transition-all flex items-center justify-center space-x-2 glass-panel"
              >
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span>Explore Roadmap</span>
              </Link>
            </div>

            {/* Micro badges */}
            <div className="pt-4 flex items-center justify-center lg:justify-start space-x-6 text-xs text-slate-400 font-mono">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>C++ Focused</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Interactive Dry Runs</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>AI Mentoring</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Illustration */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Glassmorphic Laptop / Code Window */}
              <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden glass-panel glow-purple transition-transform hover:scale-[1.01]">
                
                {/* Code Window Header */}
                <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                    <span className="ml-2 text-xs font-mono text-slate-400 flex items-center">
                      <Terminal className="w-3.5 h-3.5 mr-1.5 text-purple-400" /> binary_search.cpp
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                    O(log n)
                  </span>
                </div>

                {/* Code Body & Visual DSA Array */}
                <div className="p-5 font-mono text-xs text-slate-300 space-y-3 bg-slate-950/60">
                  <div className="text-purple-400 font-semibold">
                    // Binary Search on Sorted Array
                  </div>
                  <div className="text-slate-400">
                    <span className="text-indigo-400">int</span> binarySearch(<span className="text-indigo-400">vector</span>&lt;<span className="text-indigo-400">int</span>&gt;& nums, <span className="text-indigo-400">int</span> target) &#123;
                  </div>
                  
                  {/* Array Node Visual Graphic */}
                  <div className="py-3 px-2 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">arr:</span>
                    <div className="flex items-center space-x-1.5">
                      <div className="px-2.5 py-1 rounded bg-slate-800 text-slate-400 text-[11px]">1</div>
                      <div className="px-2.5 py-1 rounded bg-slate-800 text-slate-400 text-[11px]">3</div>
                      <div className="px-2.5 py-1 rounded bg-slate-800 text-slate-400 text-[11px]">5</div>
                      <div className="px-2.5 py-1 rounded bg-purple-600 text-white font-bold text-[11px] ring-2 ring-purple-400 animate-pulse">
                        7 (mid)
                      </div>
                      <div className="px-2.5 py-1 rounded bg-slate-800 text-slate-400 text-[11px]">9</div>
                      <div className="px-2.5 py-1 rounded bg-slate-800 text-slate-400 text-[11px]">11</div>
                    </div>
                  </div>

                  <div className="pl-4 text-slate-300">
                    <span className="text-indigo-400">int</span> low = <span className="text-amber-400">0</span>, high = nums.size() - <span className="text-amber-400">1</span>;
                  </div>
                  <div className="pl-4 text-slate-300">
                    <span className="text-purple-400">while</span> (low &lt;= high) &#123;
                  </div>
                  <div className="pl-8 text-slate-300">
                    <span className="text-indigo-400">int</span> mid = low + (high - low) / <span className="text-amber-400">2</span>;
                  </div>
                  <div className="pl-8 text-emerald-400 font-semibold">
                    if (nums[mid] == target) return mid; // Target Found!
                  </div>
                  <div className="pl-4 text-slate-300">&#125;</div>
                </div>

                {/* Floating AI Badge */}
                <div className="px-4 py-2.5 bg-gradient-to-r from-purple-950/80 to-indigo-950/80 border-t border-purple-500/20 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                    <span className="text-purple-200 font-medium">AI Mentor: &quot;Check boundary low &lt;= high carefully!&quot;</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">✓ Test Case Passed</span>
                </div>

              </div>

              {/* Floating Stat Card 1 */}
              <div className="absolute -bottom-6 -left-6 bg-slate-900/90 border border-purple-500/30 rounded-2xl p-4 shadow-xl glass-panel hidden sm:flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">5 Day Streak</div>
                  <div className="text-[10px] text-slate-400">Prisha Sharma</div>
                </div>
              </div>

              {/* Floating Stat Card 2 */}
              <div className="absolute -top-6 -right-6 bg-slate-900/90 border border-blue-500/30 rounded-2xl p-4 shadow-xl glass-panel hidden sm:flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Readiness Score</div>
                  <div className="text-[10px] text-emerald-400 font-mono">68 / 100</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. STATS COUNTER SECTION */}
      <section className="py-12 border-y border-purple-500/15 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 glass-panel">
              <div className="text-3xl sm:text-4xl font-extrabold text-gradient-purple font-mono">1000+</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Curated C++ Problems</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 glass-panel">
              <div className="text-3xl sm:text-4xl font-extrabold text-gradient-cyan font-mono">100+</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Interactive Tutorials</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 glass-panel">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">12</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Structured DSA Topics</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 glass-panel">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono">10K+</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Active Engineering Learners</div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FEATURE CARDS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-purple-400">
            Engineered For Excellence
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Everything you need to crack technical interviews
          </h3>
          <p className="text-slate-400 text-sm">
            DSAverse replaces fragmented learning with a unified, smart learning environment tailored for college engineering students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-purple-500/20 glass-card glass-card-hover group">
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">1. Structured Roadmap</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sequential 13-stage progression from C++ Basics and Big-O notation to Graphs and Dynamic Programming.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-purple-500/20 glass-card glass-card-hover group">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">2. Interactive Learning</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Step-by-step dry-run visualization engine showing pointer movement, array indices, and stack changes in real-time.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-purple-500/20 glass-card glass-card-hover group">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
              <Code2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">3. Curated C++ Practice</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dual-pane live C++ editor with instant test runner, memory breakdown, and expected complexity targets.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-purple-500/20 glass-card glass-card-hover group">
            <div className="w-12 h-12 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">4. AI C++ Mentor</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get intelligent non-spoiler hints, code explanations, error diagnoses, and dry runs without revealing direct answers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-purple-500/20 glass-card glass-card-hover group">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">5. Progress Analytics</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Comprehensive accuracy charts, readiness score calculators, and GitHub-style activity heatmaps.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-purple-500/20 glass-card glass-card-hover group">
            <div className="w-12 h-12 rounded-xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-110 transition-transform">
              <Target className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">6. Weakness Detection</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automatic identification of weak areas (e.g. Low Recursion Accuracy) with smart recommendations on next problems to solve.
            </p>
          </div>

        </div>
      </section>

      {/* 4. LEARNING TOPICS GRID */}
      <section className="py-20 border-t border-slate-900 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-2">
                12 Comprehensive Modules
              </h2>
              <h3 className="text-3xl font-extrabold text-white">Master DSA Topic by Topic</h3>
            </div>
            <Link
              to="/roadmap"
              className="mt-4 md:mt-0 text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center"
            >
              View Full Interactive Roadmap <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dsaTopics.map((topic) => (
              <div
                key={topic.id}
                className="p-5 rounded-2xl bg-slate-900/80 border border-purple-500/15 hover:border-purple-500/40 glass-panel flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                        <Code2 className="w-4 h-4" />
                      </span>
                      <h4 className="text-base font-bold text-white">{topic.name}</h4>
                    </div>
                    <DifficultyBadge difficulty={topic.difficulty} size="sm" />
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{topic.shortDesc}</p>
                </div>

                <div>
                  <ProgressBar progress={topic.progress} showLabel color={topic.progress === 100 ? 'emerald' : 'purple'} />
                  <div className="flex items-center justify-between text-xs text-slate-400 mt-3 pt-3 border-t border-slate-800/80">
                    <span>{topic.solvedCount} / {topic.problemsCount} Solved</span>
                    <Link
                      to={`/learn/${topic.id}`}
                      className="px-3 py-1 rounded-lg bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white text-xs font-semibold transition-all"
                    >
                      {topic.progress > 0 ? 'Continue →' : 'Start →'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW DSAVERSE WORKS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-2">Systematic Method</h2>
          <h3 className="text-3xl font-extrabold text-white">How DSAverse Accelerates Learning</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-purple-500/20 glass-panel relative">
            <span className="text-4xl font-extrabold font-mono text-gradient-purple mb-4 block">01</span>
            <h4 className="text-lg font-bold text-white mb-2">Learn</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Study structured C++ concepts, dry runs, pointer diagrams, and time complexity bounds.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-purple-500/20 glass-panel relative">
            <span className="text-4xl font-extrabold font-mono text-gradient-cyan mb-4 block">02</span>
            <h4 className="text-lg font-bold text-white mb-2">Practice</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Solve curated C++ problems inside our built-in live code runner with test case feedback.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-purple-500/20 glass-panel relative">
            <span className="text-4xl font-extrabold font-mono text-amber-400 mb-4 block">03</span>
            <h4 className="text-lg font-bold text-white mb-2">Analyze</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Track topic accuracy, identify weak areas, and log mistakes into your Mistake Journal.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-purple-500/20 glass-panel relative">
            <span className="text-4xl font-extrabold font-mono text-emerald-400 mb-4 block">04</span>
            <h4 className="text-lg font-bold text-white mb-2">Improve</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Follow smart AI recommendations to systematically bridge skill gaps and boost readiness.
            </p>
          </div>

        </div>
      </section>

      {/* 6. AI MENTOR TEASER */}
      <section className="py-20 border-t border-purple-500/15 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-semibold">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>AI C++ Mentor</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Stuck on a problem?<br />
                <span className="text-gradient-purple">&quot;Don't give me the answer. Help me understand.&quot;</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Our AI Mentor acts as your personal pair programmer. It guides you using small hints, error breakdowns, complexity checks, and step-by-step dry runs without spoiling the answer.
              </p>
              <div className="pt-2">
                <Link
                  to="/mentor"
                  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all inline-flex items-center space-x-2"
                >
                  <span>Try AI Mentor Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* AI Mock UI Chat Showcase */}
            <div className="lg:col-span-7">
              <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-5 glass-panel shadow-2xl space-y-4">
                
                <div className="flex items-start space-x-3 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-indigo-300">Student:</div>
                    <div className="text-xs text-slate-200 mt-1 font-mono">&quot;Why is my binary search looping infinitely?&quot;</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-purple-950/30 p-3.5 rounded-xl border border-purple-500/30">
                  <div className="w-7 h-7 rounded-lg bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-purple-300">AI C++ Mentor:</div>
                    <p className="text-xs text-slate-200 leading-relaxed font-sans">
                      Let's inspect your loop condition. Check whether the right boundary `high` is updated using `high = mid - 1`. If you write `high = mid`, adjacent indices won't converge!
                    </p>
                    <div className="flex items-center space-x-2 pt-1">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono">
                        💡 Small Hint Generated
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 text-center max-w-4xl mx-auto px-4">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-violet-900/60 via-purple-900/40 to-indigo-900/60 border border-purple-500/30 glass-panel shadow-2xl space-y-6">
          <h2 className="text-3xl font-extrabold text-white">Ready to Master DSA in C++?</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Join thousands of engineering students mastering Data Structures and Algorithms smarter and faster.
          </p>
          <div>
            <Link
              to="/signup"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-sm shadow-xl hover:scale-105 transition-all inline-block"
            >
              Get Started For Free →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
