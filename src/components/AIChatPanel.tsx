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
import { aiMentorActionResponses, dsaProblems, dsaTopics } from '../data/dsaData';
import { useAuth } from '../context/AuthContext';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  actionTitle?: string;
  timestamp: string;
}

function generateRelevantDSAResponse(
  query: string,
  problemTitle: string,
  codeContext: string
): string {
  const q = query.toLowerCase();
  const matchedProblem = dsaProblems.find(
    (p) =>
      q.includes(p.title.toLowerCase()) ||
      q.includes(p.id.replace(/-/g, ' ')) ||
      problemTitle.toLowerCase().includes(p.title.toLowerCase())
  );

  const matchedTopic = dsaTopics.find(
    (t) =>
      q.includes(t.name.toLowerCase()) ||
      q.includes(t.id.replace(/-/g, ' ')) ||
      (matchedProblem && matchedProblem.topicId === t.id)
  );

  if (q.includes('binary search') || q.includes('low <= high') || q.includes('mid') || q.includes('rotated')) {
    return [
      'Binary Search Intuition & Boundary Guide:',
      '1. Loop Condition (low <= high vs low < high):',
      '   - When high = nums.size() - 1 (inclusive closed interval [low, high]), use while (low <= high) so single-element intervals (low == high) are still checked.',
      '   - When shrinking, always update low = mid + 1 or high = mid - 1 so the interval strictly shrinks every step.',
      '2. Overflow-Safe Midpoint:',
      '   - Always write: int mid = low + (high - low) / 2; instead of (low + high) / 2 to prevent 32-bit integer overflow.',
      '3. Rotated Sorted Array Tip:',
      '   - At any mid, either the left half [low..mid] or right half [mid..high] is strictly sorted. Check nums[low] <= nums[mid] first, then check if target lies inside that sorted range.',
      '4. Complexity: Time O(log N), Auxiliary Space O(1).'
    ].join('\n');
  }

  if (q.includes('two sum') || q.includes('hash') || q.includes('unordered_map') || q.includes('anagram')) {
    return [
      'Hashing & unordered_map Strategy in C++:',
      '1. Core Idea: Trade O(N) space to turn O(N^2) linear searches into O(1) average hash table lookups.',
      '2. Two Sum Pattern:',
      '   - Iterate i from 0 to n - 1 and compute complement = target - nums[i].',
      '   - Check if mp.count(complement) BEFORE inserting mp[nums[i]] = i so an element never pairs with itself.',
      '3. Frequency Counting (Valid / Group Anagrams):',
      '   - For lowercase English letters, a fixed array int freq[26] = {0} is faster and uses O(1) space compared to unordered_map<char, int>.',
      '4. Complexity: Time O(N) average, Space O(N).'
    ].join('\n');
  }

  if (q.includes('recursion') || q.includes('backtrack') || q.includes('subset') || q.includes('permutation') || q.includes('call stack')) {
    return [
      'Recursion & Backtracking Framework in C++:',
      '1. Base Case First: Always check termination at the top of the function (e.g., if (idx == nums.size()) { res.push_back(curr); return; }).',
      '2. Pick / Non-Pick Decision Tree:',
      '   - Choice 1 (Include): curr.push_back(nums[idx]); solve(idx + 1, nums, curr);',
      '   - Backtrack Step: curr.pop_back(); (restores vector state before exploring the next branch).',
      '   - Choice 2 (Exclude): solve(idx + 1, nums, curr);',
      '3. Complexity: Subsets take O(N * 2^N) time and O(N) recursion stack space; Permutations take O(N * N!) time.'
    ].join('\n');
  }

  if (q.includes('dp') || q.includes('dynamic programming') || q.includes('knapsack') || q.includes('memo') || q.includes('coin change') || q.includes('climbing stairs')) {
    return [
      'Dynamic Programming (Memoization to Tabulation) Guide:',
      '1. Identify State: Determine the changing parameters in your recursion (e.g., index i and remaining target/amount).',
      '2. Top-Down Memoization:',
      '   - Create vector<int> dp(n + 1, -1); and return dp[i] immediately if dp[i] != -1.',
      '3. Bottom-Up Tabulation (e.g., Coin Change):',
      '   - Initialize vector<int> dp(amount + 1, amount + 1); dp[0] = 0;',
      '   - Transition: for each state i from 1 to amount, try each coin: dp[i] = min(dp[i], 1 + dp[i - coin]).',
      '4. Complexity: Reduces exponential O(2^N) recursion down to polynomial O(N * amount) time.'
    ].join('\n');
  }

  if (q.includes('linked list') || q.includes('cycle') || q.includes('floyd') || q.includes('reverse list') || q.includes('pointer')) {
    return [
      'Linked Lists & Pointer Manipulation in C++:',
      '1. Reversing a Singly Linked List (3-Pointer Pattern):',
      '   - Initialize ListNode *prev = nullptr, *curr = head;',
      '   - Inside while (curr != nullptr): save ListNode *nextTemp = curr->next; set curr->next = prev; advance prev = curr; curr = nextTemp;',
      '2. Floyd Cycle Detection (Tortoise & Hare):',
      '   - Move slow = slow->next and fast = fast->next->next inside while (fast && fast->next). If slow == fast, a cycle exists in O(1) space.',
      '3. Safety Rule: Always guard fast != nullptr && fast->next != nullptr before dereferencing fast->next->next.'
    ].join('\n');
  }

  if (q.includes('stack') || q.includes('queue') || q.includes('parenthes') || q.includes('monotonic') || q.includes('temperature')) {
    return [
      'Stacks, Queues & Monotonic Stack Guide:',
      '1. Valid Parentheses:',
      '   - Push open brackets onto stack<char>. On a closing bracket, first check if (!st.empty()) before reading st.top().',
      '2. Monotonic Stack (Next Greater Element / Daily Temperatures):',
      '   - Store indices in stack<int> st in decreasing order of values.',
      '   - When nums[i] > nums[st.top()], pop st.top() and record i - st.top() as the distance.',
      '3. Complexity: Each element is pushed and popped at most once -> Time O(N), Space O(N).'
    ].join('\n');
  }

  if (q.includes('tree') || q.includes('bst') || q.includes('lca') || q.includes('inorder') || q.includes('depth')) {
    return [
      'Binary Trees & BST Traversal Guide:',
      '1. DFS Traversals:',
      '   - Preorder (Root, Left, Right), Inorder (Left, Root, Right -> yields sorted order in a BST), Postorder (Left, Right, Root).',
      '2. Maximum Depth Formula:',
      '   - Base case: if (root == nullptr) return 0;',
      '   - Recursive relation: return 1 + max(maxDepth(root->left), maxDepth(root->right));',
      '3. Lowest Common Ancestor in BST:',
      '   - If both p->val and q->val < root->val, go left. If both > root->val, go right. Otherwise root is the LCA in O(H) time.'
    ].join('\n');
  }

  if (q.includes('graph') || q.includes('bfs') || q.includes('dfs') || q.includes('island') || q.includes('topological') || q.includes('dijkstra')) {
    return [
      'Graph Algorithms (BFS, DFS & Topological Sort) in C++:',
      '1. BFS vs DFS:',
      '   - Use BFS (queue<int>) for shortest path in unweighted graphs or level-by-level traversal.',
      '   - Use DFS (recursion or stack) for connected components, cycle detection, and grid flood-fill (Number of Islands).',
      '2. Critical BFS Rule: Mark visited[next] = true WHEN PUSHING to the queue, not when popping, to avoid duplicate enqueues and TLE.',
      '3. Topological Sort (Kahn Algorithm):',
      '   - Compute indegree[v] for all nodes, push all nodes with indegree == 0 into a queue, and decrement neighbor indegrees as you pop.',
      '4. Complexity: Time O(V + E), Space O(V).'
    ].join('\n');
  }

  if (q.includes('sort') || q.includes('merge') || q.includes('quick') || q.includes('kadane') || q.includes('subarray') || q.includes('two pointer') || q.includes('sliding window')) {
    return [
      'Arrays, Sliding Window & Sorting Techniques:',
      '1. Kadane Algorithm (Maximum Subarray):',
      '   - Maintain currentSum += nums[i] and maxSum = max(maxSum, currentSum). If currentSum < 0, reset currentSum = 0. Time O(N), Space O(1).',
      '2. Sliding Window:',
      '   - Expand right pointer r each step; while window violates the constraint, shrink from left pointer l++. Runs in O(N) time.',
      '3. Merge Sort & Custom Sorting:',
      '   - Merge Sort guarantees stable O(N log N) worst-case time. When writing custom comparators in std::sort, always use strict inequality (< or >), never <=.'
    ].join('\n');
  }

  if (matchedProblem) {
    return [
      `Guidance for ${matchedProblem.title} (${matchedProblem.difficulty}):`,
      `1. Problem Goal: ${matchedProblem.statement}`,
      `2. Key Hints:`,
      ...matchedProblem.hints.map((h, idx) => `   - Step ${idx + 1}: ${h}`),
      `3. Target Efficiency: Time Complexity ${matchedProblem.expectedTime}, Space Complexity ${matchedProblem.expectedSpace}.`,
      `4. Practice Link: You can also test your solution on LeetCode from the Practice page.`
    ].join('\n');
  }

  if (matchedTopic) {
    return [
      `${matchedTopic.name} — C++ Concept Breakdown:`,
      `1. Overview: ${matchedTopic.fullDesc}`,
      `2. Key Patterns to Master: ${matchedTopic.keyConcepts.join(', ')}.`,
      `3. Common Pitfall: ${matchedTopic.commonMistakes[0]?.title || 'Boundary conditions'} — ${matchedTopic.commonMistakes[0]?.fix || 'Check edge cases for N = 0 and N = 1.'}`,
      `4. Target Complexity: Time ${matchedTopic.complexity.time}, Space ${matchedTopic.complexity.space}.`
    ].join('\n');
  }

  return [
    `Step-by-Step C++ DSA Analysis for "${query}":`,
    `1. Core Approach (${problemTitle}):`,
    '   - Identify whether the input is sorted (Binary Search / Two Pointers), asks for contiguous ranges (Sliding Window / Prefix Sum), requires fast lookups (unordered_map), or explores state choices (Recursion / DP / BFS).',
    '2. C++ Implementation Checklist:',
    '   - Pass vectors by reference (vector<int>&) to avoid O(N) copy overhead.',
    '   - Check edge cases: empty input, single element, negative numbers, and 64-bit integer overflow (use long long for large sums).',
    codeContext ? '3. Code Context Tip: Verify your loop termination condition and return value on boundary test cases.' : '3. Complexity Target: Aim to reduce O(N^2) brute force down to O(N) or O(N log N) time.',
    'Ask me about any specific algorithm (e.g., "Explain Kadane algorithm", "How does Binary Search on rotated array work?", "Dry run Reverse Linked List", or "DP state for Coin Change") for a tailored walkthrough!'
  ].join('\n');
}

export const AIChatPanel: React.FC<{ problemTitle?: string; codeContext?: string }> = ({ 
  problemTitle = "General DSA & C++ Concepts", 
  codeContext = "" 
}) => {
  const { userProfile } = useAuth();
  const studentName = userProfile?.displayName || 'Prisha';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hello ${studentName}! I'm your AI C++ Mentor. Ask me any question about Data Structures, Algorithms, time complexity, or debugging.\n\nCurrent focus: ${problemTitle}. How can I help you solve this step-by-step?`,
      timestamp: 'Just now'
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleActionClick = (actionKey: keyof typeof aiMentorActionResponses) => {
    const data = aiMentorActionResponses[actionKey];
    const currentProb = dsaProblems.find(
      (p) => p.title.toLowerCase() === problemTitle.toLowerCase()
    );

    let contextualText = data.text;
    if (currentProb) {
      if (actionKey === 'hint') {
        contextualText = `Hint for ${currentProb.title}:\n- ${currentProb.hints.join('\n- ')}`;
      } else if (actionKey === 'complexity') {
        contextualText = `Complexity Analysis for ${currentProb.title}:\n- Expected Time Complexity: ${currentProb.expectedTime}\n- Expected Space Complexity: ${currentProb.expectedSpace}\n- Why: ${currentProb.hints[currentProb.hints.length - 1] || 'Optimal traversal of the input structure.'}`;
      }
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: data.actionName,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      actionTitle: data.actionName,
      text: contextualText.replace(/[$#]/g, ''),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim() || isLoading) return;

    const userText = inputQuery.trim();
    setInputQuery('');

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setIsLoading(true);

    try {
      const res = await fetch('/api/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userText,
          problemTitle,
          codeContext,
          history: updatedHistory.slice(-6).map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply && typeof data.reply === 'string' && data.reply.trim()) {
          const aiMsg: Message = {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: data.reply.replace(/[$#]/g, '').trim(),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages((prev) => [...prev, aiMsg]);
          setIsLoading(false);
          return;
        }
      }
    } catch {
      // Fall back to built-in DSA expert engine below
    }

    const fallbackText = generateRelevantDSAResponse(userText, problemTitle, codeContext);
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: fallbackText.replace(/[$#]/g, ''),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-theme-card border border-teal-500/20 rounded-2xl overflow-hidden glass-panel">
      
      {/* Header */}
      <div className="px-4 py-3 border-b border-theme-border bg-gradient-to-r from-teal-950/40 to-slate-950 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-teal-600/30 border border-teal-500/40 flex items-center justify-center text-teal-300 shadow-md">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white flex items-center">
              AI C++ Mentor
              <span className="ml-2 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </h3>
            <p className="text-[10px] text-theme-text-muted">Step-by-step guidance | Non-spoiler hints</p>
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="p-1.5 rounded-lg text-theme-text-muted hover:text-slate-200 hover:bg-theme-card text-xs flex items-center space-x-1"
          title="Reset Conversation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Quick Action Trigger Buttons */}
      <div className="p-3 bg-theme-card/60 border-b border-theme-border">
        <div className="text-[10px] font-bold text-theme-text-muted uppercase tracking-wider mb-2">
          Smart Quick Actions
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          <button
            onClick={() => handleActionClick('hint')}
            className="p-2 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/20 text-teal-300 text-xs font-medium flex items-center space-x-1.5 transition-all text-left"
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
            className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-300 text-xs font-medium flex items-center space-x-1.5 transition-all text-left"
          >
            <Timer className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
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
              <div className="w-7 h-7 rounded-lg bg-teal-600/30 border border-teal-500/40 flex items-center justify-center text-teal-300 shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-teal-600 text-white rounded-br-none shadow-md'
                : 'bg-theme-card/90 border border-teal-500/20 text-theme-text rounded-bl-none shadow-lg'
            }`}>
              {msg.actionTitle && (
                <div className="text-[10px] font-bold uppercase tracking-wider text-teal-400 mb-1 flex items-center">
                  <Sparkles className="w-3 h-3 mr-1" /> {msg.actionTitle}
                </div>
              )}

              <div className="whitespace-pre-wrap font-sans">
                {msg.text}
              </div>

              {msg.sender === 'ai' && (
                <div className="mt-2 pt-2 border-t border-theme-border/80 flex items-center justify-between text-[10px] text-theme-text-muted">
                  <span>{msg.timestamp}</span>
                  <button
                    onClick={() => handleCopyText(msg.text, msg.id)}
                    className="hover:text-teal-300 flex items-center space-x-1"
                  >
                    {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center space-x-2 text-xs text-teal-400 font-mono pl-2">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>AI Mentor is analyzing your DSA question...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-theme-border bg-theme-card/90 flex items-center space-x-2">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask AI Mentor (e.g. 'Why does low <= high matter in binary search?')..."
          className="flex-1 bg-theme-card border border-theme-border rounded-xl px-3.5 py-2 text-xs text-theme-text placeholder-slate-500 focus:outline-none focus:border-teal-500/50"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || isLoading}
          className="p-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white disabled:opacity-40 hover:from-teal-500 hover:to-emerald-500 transition-all shadow-md"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
