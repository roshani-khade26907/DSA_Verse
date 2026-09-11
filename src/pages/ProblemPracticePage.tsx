import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Code2, 
  Search, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Play 
} from 'lucide-react';
import { dsaProblems } from '../data/dsaData';
import { DifficultyBadge } from '../components/DifficultyBadge';

export const ProblemPracticePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Solved' | 'Unsolved'>('All');

  const filteredProblems = dsaProblems.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.topicId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
    const matchesTopic = selectedTopic === 'All' || p.topicId === selectedTopic;
    const matchesStatus = selectedStatus === 'All' || (selectedStatus === 'Solved' ? p.solved : !p.solved);

    return matchesSearch && matchesDiff && matchesTopic && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-teal-500/15">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white flex items-center">
            <Code2 className="w-8 h-8 mr-3 text-teal-400" />
            Curated C++ Problem Bank
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Solve top interview problems curated for engineering campus placements.
          </p>
        </div>

        <div className="flex items-center space-x-3">
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
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-teal-500/20 glass-panel flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problems or topics..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto text-xs">
          
          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-teal-500"
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
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-teal-500"
          >
            <option value="All">All Topics</option>
            <option value="arrays">Arrays</option>
            <option value="searching">Searching</option>
            <option value="sorting">Sorting</option>
            <option value="recursion">Recursion</option>
            <option value="linked-lists">Linked Lists</option>
            <option value="stacks-queues">Stacks & Queues</option>
            <option value="graphs">Graphs</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-teal-500"
          >
            <option value="All">All Statuses</option>
            <option value="Solved">Solved Only</option>
            <option value="Unsolved">Unsolved Only</option>
          </select>

        </div>

      </div>

      {/* Problem Table */}
      <div className="rounded-2xl bg-slate-900/80 border border-teal-500/20 glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4 w-12 text-center">Status</th>
                <th className="py-3.5 px-4">Title</th>
                <th className="py-3.5 px-4">Topic</th>
                <th className="py-3.5 px-4">Difficulty</th>
                <th className="py-3.5 px-4">Acceptance</th>
                <th className="py-3.5 px-4">Platform</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredProblems.map((prob) => (
                <tr key={prob.id} className="hover:bg-teal-950/20 transition-colors group">
                  
                  <td className="py-4 px-4 text-center">
                    {prob.solved ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-600 mx-auto" />
                    )}
                  </td>

                  <td className="py-4 px-4 font-bold text-white group-hover:text-teal-300 transition-colors">
                    <Link to={`/editor/${prob.id}`}>{prob.title}</Link>
                  </td>

                  <td className="py-4 px-4 text-slate-400 font-mono capitalize">
                    {prob.topicId}
                  </td>

                  <td className="py-4 px-4">
                    <DifficultyBadge difficulty={prob.difficulty} size="sm" />
                  </td>

                  <td className="py-4 px-4 font-mono text-slate-400">
                    {prob.acceptance}
                  </td>

                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                      {prob.platform}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => navigate(`/editor/${prob.id}`)}
                      className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition-all inline-flex items-center space-x-1"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Solve</span>
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
};

