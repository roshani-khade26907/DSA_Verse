import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, Code2, Sparkles, Award, ArrowRight } from 'lucide-react';
import { dsaTopics, dsaProblems, mockChallenges } from '../data/dsaData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered from navbar
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredTopics = query
    ? dsaTopics.filter(t => t.name.toLowerCase().includes(query.toLowerCase()) || t.shortDesc.toLowerCase().includes(query.toLowerCase()))
    : dsaTopics.slice(0, 3);

  const filteredProblems = query
    ? dsaProblems.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || p.topicId.toLowerCase().includes(query.toLowerCase()))
    : dsaProblems.slice(0, 3);

  const filteredChallenges = query
    ? mockChallenges.filter(c => c.title.toLowerCase().includes(query.toLowerCase()))
    : [];

  const handleSelectTopic = (id: string) => {
    onClose();
    navigate(`/learn/${id}`);
  };

  const handleSelectProblem = (id: string) => {
    onClose();
    navigate(`/editor/${id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-slate-900 border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden glass-panel">
        
        {/* Search Input Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-950/60">
          <Search className="w-5 h-5 text-purple-400 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search DSA topics, C++ problems, roadmap, or AI mentor (e.g. 'recursion', 'binary search')..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none text-base font-normal"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-white mr-2">
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="px-2 py-0.5 text-xs font-mono text-slate-400 bg-slate-800 border border-slate-700 rounded">
            ESC
          </span>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          
          {/* Quick AI Mentor Suggestion */}
          {query && (
            <div
              onClick={() => { onClose(); navigate('/mentor'); }}
              className="p-3.5 rounded-xl bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-slate-900 border border-purple-500/30 hover:border-purple-400 cursor-pointer flex items-center justify-between group transition-all"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-purple-200">Ask AI Mentor: "{query}"</h4>
                  <p className="text-xs text-slate-400">Get step-by-step non-spoiler hints, complexity analysis, or code breakdown</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </div>
          )}

          {/* Topics Section */}
          {filteredTopics.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center">
                <BookOpen className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
                DSA Learning Topics
              </div>
              <div className="space-y-1.5">
                {filteredTopics.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => handleSelectTopic(topic.id)}
                    className="p-3 rounded-xl bg-slate-800/50 hover:bg-purple-900/20 border border-transparent hover:border-purple-500/30 cursor-pointer flex items-center justify-between transition-all"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-slate-100">{topic.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          {topic.difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{topic.shortDesc}</p>
                    </div>
                    <span className="text-xs font-mono text-purple-400 flex items-center">
                      Learn <ArrowRight className="w-3 h-3 ml-1" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Problems Section */}
          {filteredProblems.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center">
                <Code2 className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
                C++ Coding Problems
              </div>
              <div className="space-y-1.5">
                {filteredProblems.map((prob) => (
                  <div
                    key={prob.id}
                    onClick={() => handleSelectProblem(prob.id)}
                    className="p-3 rounded-xl bg-slate-800/50 hover:bg-blue-900/20 border border-transparent hover:border-blue-500/30 cursor-pointer flex items-center justify-between transition-all"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-slate-100">{prob.title}</span>
                        <span className={`text-xs px-2 py-0.5 rounded border ${
                          prob.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                          prob.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                          'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        }`}>
                          {prob.difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">Topic: {prob.topicId} • Acceptance: {prob.acceptance}</p>
                    </div>
                    <span className="text-xs font-mono text-blue-400 flex items-center">
                      Solve <ArrowRight className="w-3 h-3 ml-1" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Challenges Section */}
          {filteredChallenges.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center">
                <Award className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                Coding Challenges
              </div>
              <div className="space-y-1.5">
                {filteredChallenges.map((ch) => (
                  <div
                    key={ch.id}
                    onClick={() => { onClose(); navigate('/challenges'); }}
                    className="p-3 rounded-xl bg-slate-800/50 hover:bg-amber-900/20 border border-transparent hover:border-amber-500/30 cursor-pointer flex items-center justify-between transition-all"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-slate-100">{ch.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{ch.description}</p>
                    </div>
                    <span className="text-xs font-mono text-amber-400">View</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {query && filteredTopics.length === 0 && filteredProblems.length === 0 && filteredChallenges.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-slate-400">No direct matches for "{query}".</p>
              <button
                onClick={() => { onClose(); navigate('/mentor'); }}
                className="mt-3 px-4 py-2 text-xs font-semibold rounded-xl bg-purple-600 text-white hover:bg-purple-500 shadow-lg shadow-purple-600/30 transition-all"
              >
                Ask AI Mentor for help with "{query}"
              </button>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-500">
          <span>Navigate with mouse or enter key</span>
          <span className="font-mono">DSAverse Search v1.0</span>
        </div>
      </div>
    </div>
  );
};
