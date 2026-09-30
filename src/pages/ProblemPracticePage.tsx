import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, 
  Search, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  ExternalLink 
} from 'lucide-react';
import { dsaProblems } from '../data/dsaData';
import { DifficultyBadge } from '../components/DifficultyBadge';

const topicLabels: Record<string, string> = {
  'arrays': 'Arrays',
  'searching': 'Searching',
  'sorting': 'Sorting',
  'hashing': 'Hashing',
  'recursion': 'Recursion',
  'linked-lists': 'Linked Lists',
  'stacks-queues': 'Stacks & Queues',
  'trees': 'Trees',
  'graphs': 'Graphs',
  'dp': 'Dynamic Programming',
};

export const ProblemPracticePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Solved' | 'Unsolved'>('All');
  const [solvedMap, setSolvedMap] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    dsaProblems.forEach((p) => {
      initial[p.id] = p.solved;
    });
    return initial;
  });

  const toggleSolved = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSolvedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProblems = dsaProblems.filter((p) => {
    const isSolved = solvedMap[p.id] ?? p.solved;
    const topicLabel = topicLabels[p.topicId] || p.topicId;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topicLabel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
    const matchesTopic = selectedTopic === 'All' || p.topicId === selectedTopic;
    const matchesStatus = selectedStatus === 'All' || (selectedStatus === 'Solved' ? isSolved : !isSolved);

    return matchesSearch && matchesDiff && matchesTopic && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-teal-500/15">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-theme-text flex items-center">
            <Code2 className="w-8 h-8 mr-3 text-teal-400" />
            Curated 30 DSA Problem Bank
          </h1>
          <p className="text-xs sm:text-sm text-theme-text-muted mt-1">
            30 hand-picked questions covering all major DSA topics. Click any question to practice directly on LeetCode.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <span className="px-3 py-1.5 rounded-xl bg-theme-card border border-teal-500/30 text-teal-300 text-xs font-mono font-semibold">
            Showing {filteredProblems.length} / {dsaProblems.length} Questions
          </span>
          <Link
            to="/mentor"
            className="px-4 py-2 rounded-xl bg-teal-600/20 border border-teal-500/30 text-teal-300 hover:bg-teal-600 hover:text-white text-xs font-semibold transition-all flex items-center space-x-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Mentor Guidance</span>
          </Link>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-theme-text-muted absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 30 DSA questions or topics..."
            className="w-full bg-theme-card border border-theme-border rounded-xl pl-10 pr-4 py-2 text-xs text-theme-text placeholder-slate-500 focus:outline-none focus:border-teal-500"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto text-xs">
          
          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value as 'All' | 'Easy' | 'Medium' | 'Hard')}
            className="bg-theme-card border border-theme-border rounded-xl px-3 py-2 text-theme-text focus:outline-none focus:border-teal-500"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Topic Filter */}
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="bg-theme-card border border-theme-border rounded-xl px-3 py-2 text-theme-text focus:outline-none focus:border-teal-500"
          >
            <option value="All">All DSA Topics (30)</option>
            <option value="arrays">Arrays</option>
            <option value="searching">Searching</option>
            <option value="sorting">Sorting</option>
            <option value="hashing">Hashing</option>
            <option value="recursion">Recursion & Backtracking</option>
            <option value="linked-lists">Linked Lists</option>
            <option value="stacks-queues">Stacks & Queues</option>
            <option value="trees">Trees & BST</option>
            <option value="graphs">Graphs</option>
            <option value="dp">Dynamic Programming</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as 'All' | 'Solved' | 'Unsolved')}
            className="bg-theme-card border border-theme-border rounded-xl px-3 py-2 text-theme-text focus:outline-none focus:border-teal-500"
          >
            <option value="All">All Statuses</option>
            <option value="Solved">Solved Only</option>
            <option value="Unsolved">Unsolved Only</option>
          </select>

        </div>

      </div>

      {/* Problem Table */}
      <div className="rounded-2xl bg-theme-card border border-teal-500/20 glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            
            <thead className="bg-theme-card/80 border-b border-theme-border text-theme-text-muted font-mono uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4 w-12 text-center">No.</th>
                <th className="py-3.5 px-4 w-16 text-center">Status</th>
                <th className="py-3.5 px-4">Question Title</th>
                <th className="py-3.5 px-4">Topic</th>
                <th className="py-3.5 px-4">Difficulty</th>
                <th className="py-3.5 px-4">Complexity</th>
                <th className="py-3.5 px-4 text-right">LeetCode Link</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredProblems.map((prob, index) => {
                const isSolved = solvedMap[prob.id] ?? prob.solved;
                return (
                  <tr
                    key={prob.id}
                    className="hover:bg-teal-950/20 transition-colors group"
                  >
                    <td className="py-4 px-4 text-center font-mono text-theme-text-muted">
                      {index + 1}
                    </td>

                    <td className="py-4 px-4 text-center">
                      <button
                        type="button"
                        onClick={(e) => toggleSolved(e, prob.id)}
                        title="Toggle solved status"
                        className="mx-auto flex items-center justify-center"
                      >
                        {isSolved ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Circle className="w-4 h-4 text-theme-text-muted hover:text-teal-400" />
                        )}
                      </button>
                    </td>

                    <td className="py-4 px-4 font-bold text-theme-text group-hover:text-teal-400 transition-colors">
                      <a
                        href={prob.leetcodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 hover:underline"
                      >
                        <span>{prob.title}</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 text-teal-400" />
                      </a>
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-300 font-mono text-[11px]">
                        {topicLabels[prob.topicId] || prob.topicId}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <DifficultyBadge difficulty={prob.difficulty} size="sm" />
                    </td>

                    <td className="py-4 px-4 font-mono text-theme-text-muted">
                      {prob.expectedTime}
                    </td>

                    <td className="py-4 px-4 text-right">
                      <a
                        href={prob.leetcodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition-all inline-flex items-center space-x-1.5"
                      >
                        <span>Solve on LeetCode</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
};
