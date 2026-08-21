import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  ThumbsUp, 
  Bookmark, 
  Plus, 
  Search, 
  Sparkles 
} from 'lucide-react';
import { mockCommunityPosts } from '../data/dsaData';
import type { CommunityPost } from '../data/dsaData';

export const CommunityPage: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>(mockCommunityPosts);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTag, setNewTag] = useState('C++');

  const handleLike = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleBookmark = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, isBookmarked: !p.isBookmarked } : p));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const newPost: CommunityPost = {
      id: Date.now().toString(),
      author: 'Prisha Sharma',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      authorRole: 'B.Tech CS Student',
      title: newTitle,
      content: newContent,
      tags: [newTag, 'Discussion'],
      likes: 1,
      commentsCount: 0,
      timeAgo: 'Just now'
    };

    setPosts([newPost, ...posts]);
    setShowNewPostModal(false);
    setNewTitle('');
    setNewContent('');
  };

  const filteredPosts = posts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.tags.some(t => t.toLowerCase() === activeCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-500/15">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white flex items-center">
            <Users className="w-8 h-8 mr-3 text-purple-400" />
            Engineering Student Forum
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Discuss DSA intuition, share interview tips, and solve code bugs with peers.
          </p>
        </div>

        <button
          onClick={() => setShowNewPostModal(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition-all flex items-center space-x-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Discussion</span>
        </button>
      </div>

      {/* Category Tabs & Search */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/20 glass-panel flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto">
          {['All', 'Recursion', 'Searching', 'Tips', 'Interview Prep'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all shrink-0 ${
                activeCategory === cat
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search discussions..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

      </div>

      {/* Posts Stream */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="p-6 rounded-2xl bg-slate-900/80 border border-purple-500/20 glass-panel space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={post.authorAvatar} alt={post.author} className="w-9 h-9 rounded-full object-cover border border-purple-500/40" />
                <div>
                  <h4 className="text-xs font-bold text-white">{post.author}</h4>
                  <p className="text-[10px] text-slate-400 font-mono">{post.authorRole}</p>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">{post.timeAgo}</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-white hover:text-purple-300 transition-colors cursor-pointer">
                {post.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{post.content}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((t, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  #{t}
                </span>
              ))}
            </div>

            {/* Actions Bar */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center space-x-1.5 hover:text-purple-300 transition-colors"
                >
                  <ThumbsUp className="w-4 h-4 text-purple-400" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-1.5 hover:text-blue-300 transition-colors">
                  <MessageSquare className="w-4 h-4 text-blue-400" />
                  <span>{post.commentsCount} Comments</span>
                </button>
              </div>

              <button
                onClick={() => handleBookmark(post.id)}
                className={`p-1.5 rounded-lg hover:bg-slate-800 transition-colors ${post.isBookmarked ? 'text-amber-400' : 'text-slate-500'}`}
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg bg-slate-900 border border-purple-500/30 rounded-3xl p-6 shadow-2xl glass-panel space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-purple-400" /> Start Student Discussion
              </h3>
              <button onClick={() => setShowNewPostModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Post Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. How to dry run recursive trees effectively?"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Tag / Topic</label>
                <select
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500"
                >
                  <option value="Recursion">Recursion</option>
                  <option value="Searching">Searching</option>
                  <option value="Arrays">Arrays</option>
                  <option value="Study Strategy">Study Strategy</option>
                  <option value="Interview Prep">Interview Prep</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Post Content</label>
                <textarea
                  required
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Share your questions, insights, or code tips with fellow coders..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-md"
                >
                  Publish Post
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
