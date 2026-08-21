import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Lightbulb, 
  Bug, 
  Search, 
  Zap, 
  Timer, 
  TestTube, 
  Bot, 
  User, 
  Copy, 
  Check, 
  RotateCcw
} from 'lucide-react';
import { aiMentorActionResponses } from '../data/dsaData';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  actionTitle?: string;
  timestamp: string;
}

export const AIChatPanel: React.FC<{ problemTitle?: string; codeContext?: string }> = ({ 
  problemTitle = "Binary Search", 
  codeContext: _codeContext = "" 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hello Prisha! I'm your **AI C++ Mentor**. I won't spoil complete solutions right away, but I'll guide you step-by-step to understand logic errors, dry runs, and time complexities.\n\nCurrently inspecting: **${problemTitle}**. How can I assist?`,
      timestamp: 'Just now'
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleActionClick = (actionKey: keyof typeof aiMentorActionResponses) => {
    const data = aiMentorActionResponses[actionKey];
    
    // User message
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: data.actionName,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // AI Mentor response
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      actionTitle: data.actionName,
      text: data.text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg, aiMsg]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userText = inputQuery.trim();
    setInputQuery('');

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);

    // Simulated AI response
    setTimeout(() => {
      let responseText = `Great question regarding "${userText}". Let's break this down:\n\n1. In C++, check your pointer bounds and data types first.\n2. Ensure your loop condition has a clear termination clause.\n\nWould you like me to generate a dry-run matrix or suggest a hint?`;
      
      if (userText.toLowerCase().includes('answer') || userText.toLowerCase().includes('solution')) {
        responseText = "Remember, DSAverse focuses on building your problem-solving muscle! Let me give you a key structural hint instead: consider using two pointers moving inwards towards each other.";
      }

      const aiMsg: Message = {
        id: Date.now().toString(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 600);
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 border border-purple-500/20 rounded-2xl overflow-hidden glass-panel">
      
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-800 bg-gradient-to-r from-purple-950/40 to-slate-950 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-md">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white flex items-center">
              AI C++ Mentor
              <span className="ml-2 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </h3>
            <p className="text-[10px] text-slate-400">Step-by-step guidance • Non-spoiler hints</p>
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 text-xs flex items-center space-x-1"
          title="Reset Conversation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Quick Action Trigger Buttons */}
      <div className="p-3 bg-slate-900/60 border-b border-slate-800">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          Smart Quick Actions
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          <button
            onClick={() => handleActionClick('hint')}
            className="p-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-300 text-xs font-medium flex items-center space-x-1.5 transition-all text-left"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">Small Hint</span>
          </button>

          <button
            onClick={() => handleActionClick('error')}
            className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-300 text-xs font-medium flex items-center space-x-1.5 transition-all text-left"
          >
            <Bug className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="truncate">Explain Error</span>
          </button>

          <button
            onClick={() => handleActionClick('explainCode')}
            className="p-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-300 text-xs font-medium flex items-center space-x-1.5 transition-all text-left"
          >
            <Search className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span className="truncate">Explain Code</span>
          </button>

          <button
            onClick={() => handleActionClick('optimize')}
            className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-300 text-xs font-medium flex items-center space-x-1.5 transition-all text-left"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">Optimization</span>
          </button>

          <button
            onClick={() => handleActionClick('complexity')}
            className="p-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-300 text-xs font-medium flex items-center space-x-1.5 transition-all text-left"
          >
            <Timer className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="truncate">Complexity</span>
          </button>

          <button
            onClick={() => handleActionClick('dryRun')}
            className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-300 text-xs font-medium flex items-center space-x-1.5 transition-all text-left"
          >
            <TestTube className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">Help Dry-Run</span>
          </button>
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-7 h-7 rounded-lg bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-purple-600 text-white rounded-br-none shadow-md'
                : 'bg-slate-900/90 border border-purple-500/20 text-slate-200 rounded-bl-none shadow-lg'
            }`}>
              {msg.actionTitle && (
                <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400 mb-1 flex items-center">
                  <Sparkles className="w-3 h-3 mr-1" /> {msg.actionTitle}
                </div>
              )}

              <div className="whitespace-pre-wrap font-sans">
                {msg.text}
              </div>

              {msg.sender === 'ai' && (
                <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span>{msg.timestamp}</span>
                  <button
                    onClick={() => handleCopyText(msg.text, msg.id)}
                    className="hover:text-purple-300 flex items-center space-x-1"
                  >
                    {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-slate-950/90 flex items-center space-x-2">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask AI Mentor (e.g. 'Why does low <= high matter in binary search?')..."
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim()}
          className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white disabled:opacity-40 hover:from-purple-500 hover:to-indigo-500 transition-all shadow-md"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
