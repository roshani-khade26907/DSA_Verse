export interface UserProfile {
  name: string;
  avatar: string;
  role: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  overallProgress: number; // percentage
  topicsCompleted: number;
  totalTopics: number;
  problemsSolved: number;
  totalProblems: number;
  currentStreak: number; // days
  longestStreak: number;
  readinessScore: number; // out of 100
  dailyGoalSolved: number;
  dailyGoalTarget: number;
}

export interface DSATopic {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  difficulty: 'Beginner' | 'Easy' | 'Medium' | 'Hard';
  progress: number;
  problemsCount: number;
  solvedCount: number;
  status: 'Completed' | 'In Progress' | 'Locked' | 'Recommended';
  iconName: string;
  keyConcepts: string[];
  cppSyntax: string;
  exampleCode: string;
  complexity: {
    time: string;
    space: string;
    description: string;
  };
  commonMistakes: { title: string; desc: string; fix: string }[];
  dryRunSteps: {
    step: number;
    title: string;
    arrayState: number[];
    highlightIndices: number[];
    pointers: { [key: string]: number };
    description: string;
  }[];
}

export interface DSAProblem {
  id: string;
  title: string;
  topicId: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  acceptance: string;
  solved: boolean;
  platform: 'DSAverse' | 'LeetCode' | 'Codeforces' | 'GFG';
  statement: string;
  examples: { input: string; output: string; explanation: string }[];
  constraints: string[];
  hints: string[];
  expectedTime: string;
  expectedSpace: string;
  starterCode: string;
  solutionCode: string;
  testCases: { input: string; expectedOutput: string }[];
}

export interface MistakeEntry {
  id: string;
  problemId: string;
  problemTitle: string;
  topic: string;
  mistakeType: 'Boundary Condition' | 'Off-by-one' | 'Null Pointer' | 'Time Limit Exceeded' | 'Logic Error' | 'Memory Leak';
  date: string;
  whatWentWrong: string;
  whatILearned: string;
  reviewed: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  durationDays: number;
  totalProblems: number;
  completedProblems: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'In Progress' | 'Not Started' | 'Completed';
  tags: string[];
}

export interface Contest {
  id: string;
  title: string;
  date: string;
  timeRemaining: string;
  duration: string;
  problemsCount: number;
  participantsCount: number;
  status: 'Upcoming' | 'Live' | 'Ended';
}

export interface CommunityPost {
  id: string;
  author: string;
  authorAvatar: string;
  authorRole: string;
  title: string;
  content: string;
  tags: string[];
  likes: number;
  commentsCount: number;
  timeAgo: string;
  isBookmarked?: boolean;
}

// Initial Mock User Data
export const mockUser: UserProfile = {
  name: "Prisha Sharma",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  role: "B.Tech Computer Science (3rd Year)",
  level: "Intermediate",
  overallProgress: 42,
  topicsCompleted: 4,
  totalTopics: 12,
  problemsSolved: 28,
  totalProblems: 150,
  currentStreak: 5,
  longestStreak: 14,
  readinessScore: 68,
  dailyGoalSolved: 1,
  dailyGoalTarget: 2
};

// 12 Structured DSA Topics
export const dsaTopics: DSATopic[] = [
  {
    id: "cpp-basics",
    name: "C++ Basics",
    shortDesc: "Pointers, references, memory allocation, vectors, and STL containers.",
    fullDesc: "Master foundational C++ features essential for competitive programming and DSA implementation including pointers, dynamic memory, vectors, and STL algorithms.",
    difficulty: "Beginner",
    progress: 100,
    problemsCount: 15,
    solvedCount: 15,
    status: "Completed",
    iconName: "Code2",
    keyConcepts: [
      "Pointers & Address-Of Operator (&, *)",
      "Pass by Value vs Pass by Reference",
      "Dynamic Memory (`new` / `delete`)",
      "Standard Template Library (std::vector, std::pair)",
      "Fast I/O in C++ (`ios_base::sync_with_stdio(0)`)"
    ],
    cppSyntax: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector<int> nums = {10, 20, 30};
    nums.push_back(40);

    for (int x : nums) {
        cout << x << " ";
    }
    return 0;
}`,
    exampleCode: `#include <iostream>
using namespace std;

void swapByRef(int &a, int &b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 5, y = 10;
    swapByRef(x, y);
    cout << "x: " << x << ", y: " << y << endl; // x: 10, y: 5
    return 0;
}`,
    complexity: {
      time: "O(1)",
      space: "O(1)",
      description: "Direct memory access via reference is constant time."
    },
    commonMistakes: [
      {
        title: "Dangling Pointers",
        desc: "Accessing memory after `delete` or returning address of local function variable.",
        fix: "Set pointers to `nullptr` after deleting or use smart pointers like `unique_ptr`."
      },
      {
        title: "Vector Out-of-Bounds",
        desc: "Using `v[i]` where `i >= v.size()` causing undefined behavior.",
        fix: "Use `v.at(i)` during debug or check bounds explicitly."
      }
    ],
    dryRunSteps: [
      {
        step: 1,
        title: "Initialize Pointers",
        arrayState: [10, 20, 30, 40],
        highlightIndices: [0],
        pointers: { ptr: 0 },
        description: "Pointer `ptr` points to first element array index 0 (val = 10)."
      },
      {
        step: 2,
        title: "Dereference & Increment",
        arrayState: [10, 20, 30, 40],
        highlightIndices: [1],
        pointers: { ptr: 1 },
        description: "Moving pointer `ptr++` to index 1. Current value is 20."
      }
    ]
  },
  {
    id: "time-complexity",
    name: "Time Complexity",
    shortDesc: "Big-O notation, asymptotic analysis, recurrence relations, and space bounds.",
    fullDesc: "Learn how to analyze algorithm efficiency, count operation growth rates, compute Big-O bounds, and optimize space usage.",
    difficulty: "Beginner",
    progress: 100,
    problemsCount: 10,
    solvedCount: 10,
    status: "Completed",
    iconName: "Timer",
    keyConcepts: [
      "Asymptotic Bounds (Big-O, Big-Omega, Big-Theta)",
      "Dominant terms vs lower-order constants",
      "Nested Loops vs Single Pass Analysis",
      "Master Theorem for Recurrences",
      "Auxiliary Space vs Total Space Complexity"
    ],
    cppSyntax: `// O(n^2) Quadratic Example
for(int i = 0; i < n; i++) {
    for(int j = 0; j < n; j++) {
        // Constant time operation O(1)
    }
}`,
    exampleCode: `// Logarithmic O(log n) Binary Search Loop
int count = 0;
while (n > 0) {
    n = n / 2;
    count++;
}`,
    complexity: {
      time: "O(log n)",
      space: "O(1)",
      description: "Halving input size in each step yields logarithmic time."
    },
    commonMistakes: [
      {
        title: "Confusing O(N + M) with O(N * M)",
        desc: "Assuming two consecutive loops take quadratic time instead of additive linear time.",
        fix: "Sum independent loop bounds when sequential; multiply when nested."
      }
    ],
    dryRunSteps: [
      {
        step: 1,
        title: "Input N = 16",
        arrayState: [16, 8, 4, 2, 1],
        highlightIndices: [0],
        pointers: { N: 0 },
        description: "Start with N = 16 (Step 0)."
      },
      {
        step: 2,
        title: "First Divide",
        arrayState: [16, 8, 4, 2, 1],
        highlightIndices: [1],
        pointers: { N: 1 },
        description: "N = 16 / 2 = 8. Iteration 1."
      }
    ]
  },
  {
    id: "arrays",
    name: "Arrays",
    shortDesc: "Two pointers, sliding window, prefix sums, Kadane's algorithm, and sub-arrays.",
    fullDesc: "Master contiguous memory structures, two-pointer techniques, sliding window optimizations, and prefix sum arrays.",
    difficulty: "Easy",
    progress: 90,
    problemsCount: 20,
    solvedCount: 18,
    status: "Completed",
    iconName: "LayoutGrid",
    keyConcepts: [
      "Two Pointers (Left / Right pointers)",
      "Sliding Window (Fixed & Variable size)",
      "Prefix Sum Array & Range Queries",
      "Kadane's Algorithm for Max Subarray",
      "Dutch National Flag 3-Way Partition"
    ],
    cppSyntax: `#include <vector>
#include <algorithm>

std::vector<int> nums = {1, 2, 3, 4, 5};
int prefixSum[5];
prefixSum[0] = nums[0];
for(int i = 1; i < 5; i++) {
    prefixSum[i] = prefixSum[i-1] + nums[i];
}`,
    exampleCode: `// Two Pointers Target Sum
bool hasTwoSum(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) return true;
        else if (sum < target) left++;
        else right--;
    }
    return false;
}`,
    complexity: {
      time: "O(n)",
      space: "O(1)",
      description: "Two pointers scan the array from both ends in a single pass."
    },
    commonMistakes: [
      {
        title: "Off-By-One Array Boundary",
        desc: "Accessing `arr[n]` instead of `arr[n-1]`.",
        fix: "Always maintain loop condition `i < arr.size()`."
      }
    ],
    dryRunSteps: [
      {
        step: 1,
        title: "Initialize Pointers",
        arrayState: [2, 7, 11, 15],
        highlightIndices: [0, 3],
        pointers: { L: 0, R: 3 },
        description: "Target = 9. L = index 0 (val 2), R = index 3 (val 15). Sum = 17 > 9. Move R left."
      },
      {
        step: 2,
        title: "Move Right Pointer Left",
        arrayState: [2, 7, 11, 15],
        highlightIndices: [0, 1],
        pointers: { L: 0, R: 1 },
        description: "L = 0 (val 2), R = 1 (val 7). Sum = 2 + 7 = 9. Target found!"
      }
    ]
  },
  {
    id: "searching",
    name: "Searching",
    shortDesc: "Linear search, binary search variations, search in rotated arrays, and binary search on answer.",
    fullDesc: "Learn logarithmic search techniques, lower/upper bounds in sorted arrays, and binary searching on monotonic solution spaces.",
    difficulty: "Easy",
    progress: 76,
    problemsCount: 15,
    solvedCount: 11,
    status: "Completed",
    iconName: "Search",
    keyConcepts: [
      "Binary Search on Sorted Arrays",
      "Lower Bound (`std::lower_bound`) & Upper Bound",
      "Search in Rotated Sorted Array",
      "Binary Search on Answer (Predicate Functions)",
      "Ternary Search for Unimodal Functions"
    ],
    cppSyntax: `int binarySearch(const vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
    exampleCode: `int low = 1, high = maxElement, ans = -1;
while(low <= high) {
    int mid = low + (high - low) / 2;
    if (isValid(mid)) {
        ans = mid;
        high = mid - 1; // seek smaller valid answer
    } else {
        low = mid + 1;
    }
}`,
    complexity: {
      time: "O(log n)",
      space: "O(1)",
      description: "Search space halves each iteration."
    },
    commonMistakes: [
      {
        title: "Integer Overflow in Mid Calculation",
        desc: "Using `(low + high) / 2` when `low + high` can overflow 32-bit `int`.",
        fix: "Use `low + (high - low) / 2`."
      },
      {
        title: "Infinite Loop in Binary Search",
        desc: "Setting `low = mid` without adding 1 when boundaries are inclusive.",
        fix: "Use `low = mid + 1` or check boundary conditions carefully."
      }
    ],
    dryRunSteps: [
      {
        step: 1,
        title: "Initial Array [1, 3, 5, 7, 9, 11, 13]",
        arrayState: [1, 3, 5, 7, 9, 11, 13],
        highlightIndices: [3],
        pointers: { L: 0, M: 3, H: 6 },
        description: "Target = 9. low=0, high=6. mid = 3 (val 7). Since 7 < 9, set low = mid + 1 = 4."
      },
      {
        step: 2,
        title: "Second Iteration",
        arrayState: [1, 3, 5, 7, 9, 11, 13],
        highlightIndices: [4],
        pointers: { L: 4, M: 4, H: 6 },
        description: "low=4, high=6. mid = 4 (val 9). Match found at index 4!"
      }
    ]
  },
  {
    id: "sorting",
    name: "Sorting",
    shortDesc: "Bubble, Insertion, Merge Sort, Quick Sort, Counting Sort, and Custom Comparator Functions.",
    fullDesc: "Understand fundamental sorting algorithms, divide-and-conquer strategy, stability in sorting, and custom comparator lambdas in C++ STL.",
    difficulty: "Medium",
    progress: 61,
    problemsCount: 15,
    solvedCount: 9,
    status: "In Progress",
    iconName: "ArrowUpDown",
    keyConcepts: [
      "Bubble, Selection, Insertion Sort (O(n^2))",
      "Merge Sort (Stable, Divide & Conquer O(n log n))",
      "Quick Sort (Lomuto/Hoare Partitioning)",
      "Non-Comparison Sorts (Counting & Radix Sort)",
      "C++ STL `std::sort` with custom lambdas"
    ],
    cppSyntax: `#include <algorithm>

vector<pair<int, int>> vec = {{1, 4}, {2, 2}, {3, 5}};

// Sort descending by second element
sort(vec.begin(), vec.end(), [](const pair<int,int>& a, const pair<int,int>& b) {
    return a.second > b.second;
});`,
    exampleCode: `void mergeSort(vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int mid = l + (r - l) / 2;
    mergeSort(arr, l, mid);
    mergeSort(arr, mid + 1, r);
    merge(arr, l, mid, r);
}`,
    complexity: {
      time: "O(n log n)",
      space: "O(n)",
      description: "Merge Sort splits into log n levels and merges in linear time."
    },
    commonMistakes: [
      {
        title: "Incorrect Comparator Logic",
        desc: "Returning `>=` instead of strict `<` in C++ comparators causing segmentation faults.",
        fix: "Comparators must enforce strict weak ordering (use `<` or `>`)."
      }
    ],
    dryRunSteps: [
      {
        step: 1,
        title: "Unsorted Array [38, 27, 43, 3, 9, 82, 10]",
        arrayState: [38, 27, 43, 3, 9, 82, 10],
        highlightIndices: [0, 1, 2],
        pointers: { LeftHalf: 0, RightHalf: 3 },
        description: "Split array into Left [38, 27, 43] and Right [3, 9, 82, 10]."
      },
      {
        step: 2,
        title: "Merged Output",
        arrayState: [3, 9, 10, 27, 38, 43, 82],
        highlightIndices: [0, 1, 2, 3, 4, 5, 6],
        pointers: { Sorted: 0 },
        description: "Merge phase combines sub-arrays in sorted order."
      }
    ]
  },
  {
    id: "hashing",
    name: "Hashing",
    shortDesc: "Hash maps, hash sets, collision handling, frequency count, and rolling hash.",
    fullDesc: "Learn fast O(1) lookup strategies, frequency mapping using `std::unordered_map`, and custom hash functions for competitive programming.",
    difficulty: "Medium",
    progress: 50,
    problemsCount: 15,
    solvedCount: 8,
    status: "In Progress",
    iconName: "Hash",
    keyConcepts: [
      "`std::unordered_map` vs `std::map`",
      "Collision Resolution (Chaining vs Open Addressing)",
      "Frequency Counting & Anagram Detection",
      "Custom Hash Functions for `std::pair`",
      "Rabin-Karp Rolling Hash Algorithm"
    ],
    cppSyntax: `#include <unordered_map>
#include <string>

unordered_map<string, int> freq;
freq["apple"]++;
freq["banana"] += 2;

if (freq.find("apple") != freq.end()) {
    // Key exists
}`,
    exampleCode: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> mp;
    for (int i = 0; i < nums.size(); i++) {
        int diff = target - nums[i];
        if (mp.count(diff)) return {mp[diff], i};
        mp[nums[i]] = i;
    }
    return {};
}`,
    complexity: {
      time: "O(1) Avg",
      space: "O(n)",
      description: "Hash map lookups are average constant time O(1)."
    },
    commonMistakes: [
      {
        title: "Assuming O(1) Worst Case",
        desc: "`unordered_map` can degrade to O(N) worst case under anti-hash test cases.",
        fix: "Use `std::map` (O(log N)) or custom hash function with random seeds."
      }
    ],
    dryRunSteps: [
      {
        step: 1,
        title: "Process Element 2",
        arrayState: [2, 7, 11, 15],
        highlightIndices: [0],
        pointers: { i: 0 },
        description: "target = 9. Element = 2. Complement = 7. Hash map has {}. Insert key 2 -> index 0."
      },
      {
        step: 2,
        title: "Process Element 7",
        arrayState: [2, 7, 11, 15],
        highlightIndices: [1],
        pointers: { i: 1 },
        description: "Element = 7. Complement = 2. Complement 2 exists in map at index 0! Return {0, 1}."
      }
    ]
  },
  {
    id: "recursion",
    name: "Recursion",
    shortDesc: "Base cases, call stack visual, backtracking, subset generation, and memoization.",
    fullDesc: "Build deep intuition for recursive call stacks, base conditions, tree of execution, and backtracking state space trees.",
    difficulty: "Medium",
    progress: 42,
    problemsCount: 15,
    solvedCount: 6,
    status: "Recommended",
    iconName: "RotateCcw",
    keyConcepts: [
      "Base Case vs Recursive Step",
      "Call Stack & Stack Overflow Limits",
      "Backtracking (Include / Exclude pattern)",
      "Permutations & Combinations Generation",
      "Tail Recursion Optimization"
    ],
    cppSyntax: `int factorial(int n) {
    if (n <= 1) return 1; // Base case
    return n * factorial(n - 1); // Recursive call
}`,
    exampleCode: `void generateSubsets(int idx, vector<int>& nums, vector<int>& current) {
    if (idx == nums.size()) {
        // Process current subset
        return;
    }
    // Choice 1: Include element
    current.push_back(nums[idx]);
    generateSubsets(idx + 1, nums, current);
    
    // Backtrack & Choice 2: Exclude element
    current.pop_back();
    generateSubsets(idx + 1, nums, current);
}`,
    complexity: {
      time: "O(2^n)",
      space: "O(n)",
      description: "Subsets decision tree creates 2^n calls with depth n call stack."
    },
    commonMistakes: [
      {
        title: "Missing Base Case",
        desc: "Omitting base case condition leads to infinite recursion and Stack Overflow.",
        fix: "Define terminal conditions before any recursive call."
      },
      {
        title: "Forgetting to Backtrack",
        desc: "Modifying global/reference data structures without restoring state after call returns.",
        fix: "Undo state modifications (`pop_back()`) after recursive call."
      }
    ],
    dryRunSteps: [
      {
        step: 1,
        title: "Call fib(4)",
        arrayState: [4, 3, 2, 1, 0],
        highlightIndices: [0],
        pointers: { stackDepth: 1 },
        description: "fib(4) calls fib(3) + fib(2)."
      },
      {
        step: 2,
        title: "Unwind Stack for Base Cases",
        arrayState: [4, 3, 2, 1, 0],
        highlightIndices: [3, 4],
        pointers: { stackDepth: 4 },
        description: "fib(1)=1, fib(0)=0. Return sum up the stack."
      }
    ]
  },
  {
    id: "linked-lists",
    name: "Linked Lists",
    shortDesc: "Singly & Doubly Linked Lists, Floyd's cycle detection, reverse in k-groups.",
    fullDesc: "Understand non-contiguous pointer nodes, list traversal, memory management, and fast/slow pointer algorithms.",
    difficulty: "Medium",
    progress: 25,
    problemsCount: 15,
    solvedCount: 4,
    status: "In Progress",
    iconName: "GitCommit",
    keyConcepts: [
      "Node Definition & Pointer Manipulation",
      "Dummy Head Pointer Technique",
      "Floyd's Tortoise and Hare Cycle Detection",
      "Reversing Linked List (3 Pointers: prev, curr, next)",
      "Merge Two Sorted Lists"
    ],
    cppSyntax: `struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* reverseList(ListNode* head) {
    ListNode *prev = nullptr, *curr = head;
    while (curr != nullptr) {
        ListNode *nextTemp = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}`,
    exampleCode: `bool hasCycle(ListNode *head) {
    ListNode *slow = head, *fast = head;
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}`,
    complexity: {
      time: "O(n)",
      space: "O(1)",
      description: "Reversing list in-place requires linear time and constant auxiliary memory."
    },
    commonMistakes: [
      {
        title: "Null Pointer Dereference",
        desc: "Accessing `curr->next` when `curr` is `nullptr`.",
        fix: "Check `curr != nullptr` before dereferencing `curr->next`."
      }
    ],
    dryRunSteps: [
      {
        step: 1,
        title: "Initialize Pointers",
        arrayState: [1, 2, 3, 4],
        highlightIndices: [0],
        pointers: { prev: -1, curr: 0 },
        description: "prev = null, curr = Node(1)."
      },
      {
        step: 2,
        title: "Reverse Pointer Link",
        arrayState: [1, 2, 3, 4],
        highlightIndices: [0, 1],
        pointers: { prev: 0, curr: 1 },
        description: "Node(1)->next set to null. Move prev to Node(1) and curr to Node(2)."
      }
    ]
  },
  {
    id: "stacks-queues",
    name: "Stacks & Queues",
    shortDesc: "LIFO vs FIFO, Monotonic Stack, Next Greater Element, Sliding Window Maximum.",
    fullDesc: "Master linear abstract data types, expression evaluation, monotonic stack patterns, and double-ended queue (deque) optimizations.",
    difficulty: "Medium",
    progress: 10,
    problemsCount: 15,
    solvedCount: 2,
    status: "In Progress",
    iconName: "Layers",
    keyConcepts: [
      "LIFO (Stack) vs FIFO (Queue)",
      "Monotonic Stack (Increasing / Decreasing)",
      "Valid Parentheses Matching",
      "Next Greater Element Pattern",
      "Deque for Sliding Window Maximum O(n)"
    ],
    cppSyntax: `#include <stack>
#include <queue>

stack<int> st;
st.push(10);
int topVal = st.top();
st.pop();

queue<int> q;
q.push(10);
int frontVal = q.front();
q.pop();`,
    exampleCode: `bool isValidParentheses(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') st.push(c);
        else {
            if (st.empty()) return false;
            char top = st.top();
            if ((c == ')' && top != '(') ||
                (c == '}' && top != '{') ||
                (c == ']' && top != '[')) return false;
            st.pop();
        }
    }
    return st.empty();
}`,
    complexity: {
      time: "O(n)",
      space: "O(n)",
      description: "Each element is pushed and popped at most once."
    },
    commonMistakes: [
      {
        title: "Calling top()/pop() on Empty Stack",
        desc: "Accessing top element when stack size is 0 produces undefined behavior / crash.",
        fix: "Always check `!st.empty()` prior to `st.top()` or `st.pop()`."
      }
    ],
    dryRunSteps: [
      {
        step: 1,
        title: "Push '('",
        arrayState: [1, 0, 0],
        highlightIndices: [0],
        pointers: { stackTop: 0 },
        description: "Read '('. Stack contents: ['(']."
      },
      {
        step: 2,
        title: "Match ')'",
        arrayState: [0, 0, 0],
        highlightIndices: [],
        pointers: { stackTop: -1 },
        description: "Read ')'. Top '(' matches. Pop from stack. Stack empty!"
      }
    ]
  },
  {
    id: "trees",
    name: "Trees",
    shortDesc: "Binary Trees, BST, Traversals (Inorder, Preorder, Postorder, BFS), LCA, Tree DP.",
    fullDesc: "Learn hierarchical data structures, binary search trees, recursive tree traversals, level-order traversal using queue, and Lowest Common Ancestor.",
    difficulty: "Hard",
    progress: 0,
    problemsCount: 20,
    solvedCount: 0,
    status: "Locked",
    iconName: "Network",
    keyConcepts: [
      "Binary Tree Properties & Node Structure",
      "Depth-First Search (Preorder, Inorder, Postorder)",
      "Breadth-First Search (Level Order Traversal)",
      "Binary Search Tree (BST) Validation & Operations",
      "Lowest Common Ancestor (LCA)"
    ],
    cppSyntax: `struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

void inorder(TreeNode* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->val << " ";
    inorder(root->right);
}`,
    exampleCode: `int maxDepth(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(maxDepth(root->left), maxDepth(root->right));
}`,
    complexity: {
      time: "O(n)",
      space: "O(h)",
      description: "Traverses all n nodes with max recursion depth h equal to tree height."
    },
    commonMistakes: [
      {
        title: "Confusing Tree Height with Depth",
        desc: "Incorrectly calculating root null condition base cases.",
        fix: "Return 0 when root is null."
      }
    ],
    dryRunSteps: [
      {
        step: 1,
        title: "Visit Root (Node 1)",
        arrayState: [1, 2, 3],
        highlightIndices: [0],
        pointers: { currNode: 0 },
        description: "Start BFS at root node 1. Enqueue children 2 and 3."
      }
    ]
  },
  {
    id: "graphs",
    name: "Graphs",
    shortDesc: "Adjacency list, BFS, DFS, Dijkstra's algorithm, Topological Sort, Union-Find.",
    fullDesc: "Master network structures, Breadth-First & Depth-First traversals, shortest path algorithms (Dijkstra/Bellman-Ford), and Disjoint Set Union (DSU).",
    difficulty: "Hard",
    progress: 0,
    problemsCount: 20,
    solvedCount: 0,
    status: "Locked",
    iconName: "Share2",
    keyConcepts: [
      "Graph Representation (Adjacency List vs Matrix)",
      "BFS & Shortest Path in Unweighted Graph",
      "DFS & Connected Components",
      "Dijkstra's Algorithm (Priority Queue O((E+V) log V))",
      "Disjoint Set Union (DSU with Path Compression)"
    ],
    cppSyntax: `#include <vector>
#include <queue>

int V = 5;
vector<vector<int>> adj(V);
// Add edge between u and v
adj[u].push_back(v);
adj[v].push_back(u);`,
    exampleCode: `void bfs(int start, vector<vector<int>>& adj, vector<bool>& visited) {
    queue<int> q;
    q.push(start);
    visited[start] = true;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}`,
    complexity: {
      time: "O(V + E)",
      space: "O(V)",
      description: "Visits every vertex and explores every edge."
    },
    commonMistakes: [
      {
        title: "Forgetting Visited Array in BFS/DFS",
        desc: "Re-visiting nodes in cyclic graphs causing infinite loops.",
        fix: "Mark node as visited immediately when pushing to queue/stack."
      }
    ],
    dryRunSteps: [
      {
        step: 1,
        title: "Start BFS from Node 0",
        arrayState: [0, 1, 2, 3],
        highlightIndices: [0],
        pointers: { activeNode: 0 },
        description: "Push Node 0 to queue. Mark visited[0] = true."
      }
    ]
  },
  {
    id: "dp",
    name: "Dynamic Programming",
    shortDesc: "Overlapping subproblems, Memoization (Top-down), Tabulation (Bottom-up), 0/1 Knapsack.",
    fullDesc: "Learn optimization of recursive solutions, identifying state transitions, 1D/2D DP tables, and space reduction techniques.",
    difficulty: "Hard",
    progress: 0,
    problemsCount: 20,
    solvedCount: 0,
    status: "Locked",
    iconName: "Boxes",
    keyConcepts: [
      "Optimal Substructure & Overlapping Subproblems",
      "Top-Down Recursion + Memoization",
      "Bottom-Up Tabulation",
      "0/1 Knapsack & Unbounded Knapsack",
      "Longest Common Subsequence (LCS)"
    ],
    cppSyntax: `// Climbing Stairs DP Tabulation
int climbStairs(int n) {
    if (n <= 2) return n;
    vector<int> dp(n + 1);
    dp[1] = 1; dp[2] = 2;
    for(int i = 3; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}`,
    exampleCode: `int knapsack(int W, vector<int>& wt, vector<int>& val, int n) {
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= W; w++) {
            if (wt[i-1] <= w)
                dp[i][w] = max(val[i-1] + dp[i-1][w - wt[i-1]], dp[i-1][w]);
            else
                dp[i][w] = dp[i-1][w];
        }
    }
    return dp[n][W];
}`,
    complexity: {
      time: "O(n * W)",
      space: "O(n * W)",
      description: "Fills 2D table of size n x W in constant time per cell."
    },
    commonMistakes: [
      {
        title: "Incorrect DP Table Initialization",
        desc: "Not initializing base cases or memoization table with -1.",
        fix: "Initialize base cases carefully before iteration loop."
      }
    ],
    dryRunSteps: [
      {
        step: 1,
        title: "DP Table Initialization",
        arrayState: [0, 1, 2, 3, 5],
        highlightIndices: [0, 1],
        pointers: { dpIdx: 2 },
        description: "dp[0]=0, dp[1]=1, dp[2]=2. Compute dp[3] = dp[2] + dp[1] = 3."
      }
    ]
  }
];

// Curated C++ Practice Problems
export const dsaProblems: DSAProblem[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    topicId: "arrays",
    difficulty: "Easy",
    acceptance: "49.8%",
    solved: true,
    platform: "DSAverse",
    statement: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "nums[1] + nums[2] == 6."
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    hints: [
      "A really brute force way would be to search for all possible pairs. That would take O(N^2).",
      "Can we use a Hash Map to store elements we have seen so far for O(1) lookups?"
    ],
    expectedTime: "O(n)",
    expectedSpace: "O(n)",
    starterCode: `#include <iostream>
#include <vector>
#include <unordered_map>

using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        
        return {};
    }
};`,
    solutionCode: `#include <iostream>
#include <vector>
#include <unordered_map>

using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> mp;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (mp.count(complement)) {
                return {mp[complement], i};
            }
            mp[nums[i]] = i;
        }
        return {};
    }
};`,
    testCases: [
      { input: "nums = [2,7,11,15], target = 9", expectedOutput: "[0,1]" },
      { input: "nums = [3,2,4], target = 6", expectedOutput: "[1,2]" },
      { input: "nums = [3,3], target = 6", expectedOutput: "[0,1]" }
    ]
  },
  {
    id: "binary-search",
    title: "Binary Search",
    topicId: "searching",
    difficulty: "Easy",
    acceptance: "56.2%",
    solved: false,
    platform: "DSAverse",
    statement: "Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.",
    examples: [
      {
        input: "nums = [-1,0,3,5,9,12], target = 9",
        output: "4",
        explanation: "9 exists in nums and its index is 4."
      },
      {
        input: "nums = [-1,0,3,5,9,12], target = 2",
        output: "-1",
        explanation: "2 does not exist in nums so return -1."
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "All elements in nums are unique.",
      "nums is sorted in ascending order."
    ],
    hints: [
      "Compare the target with the middle element of the array.",
      "If target is greater than mid, search right half. Else search left half."
    ],
    expectedTime: "O(log n)",
    expectedSpace: "O(1)",
    starterCode: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        // Write binary search logic
        
        return -1;
    }
};`,
    solutionCode: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
};`,
    testCases: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", expectedOutput: "4" },
      { input: "nums = [-1,0,3,5,9,12], target = 2", expectedOutput: "-1" }
    ]
  },
  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    topicId: "linked-lists",
    difficulty: "Easy",
    acceptance: "74.1%",
    solved: true,
    platform: "LeetCode",
    statement: "Given the `head` of a singly linked list, reverse the list, and return the reversed list.",
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]",
        explanation: "The order of pointers is reversed."
      }
    ],
    constraints: [
      "The number of nodes in the list is in the range [0, 5000].",
      "-5000 <= Node.val <= 5000"
    ],
    hints: [
      "Maintain three pointers: prev, current, next.",
      "At each step, change current->next to point to prev."
    ],
    expectedTime: "O(n)",
    expectedSpace: "O(1)",
    starterCode: `struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        // Implement reverse list
        return nullptr;
    }
};`,
    solutionCode: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode *prev = nullptr, *curr = head;
        while (curr != nullptr) {
            ListNode *nextTemp = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
};`,
    testCases: [
      { input: "head = [1,2,3,4,5]", expectedOutput: "[5,4,3,2,1]" }
    ]
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    topicId: "stacks-queues",
    difficulty: "Easy",
    acceptance: "40.3%",
    solved: false,
    platform: "DSAverse",
    statement: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
    examples: [
      { input: "s = \"()[]{}\"", output: "true", explanation: "All open brackets match correctly." },
      { input: "s = \"(]\"", output: "false", explanation: "Mismatched bracket types." }
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    hints: [
      "Use a stack data structure to push open brackets.",
      "When encountering a close bracket, verify it matches the stack top."
    ],
    expectedTime: "O(n)",
    expectedSpace: "O(n)",
    starterCode: `#include <string>
#include <stack>

using namespace std;

class Solution {
public:
    bool isValid(string s) {
        // Your code here
        return false;
    }
};`,
    solutionCode: `#include <string>
#include <stack>

using namespace std;

class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') st.push(c);
            else {
                if (st.empty()) return false;
                char top = st.top();
                if ((c == ')' && top != '(') ||
                    (c == '}' && top != '{') ||
                    (c == ']' && top != '[')) return false;
                st.pop();
            }
        }
        return st.empty();
    }
};`,
    testCases: [
      { input: "s = \"()[]{}\"", expectedOutput: "true" },
      { input: "s = \"(]\"", expectedOutput: "false" }
    ]
  },
  {
    id: "maximum-subarray",
    title: "Maximum Subarray (Kadane's)",
    topicId: "arrays",
    difficulty: "Medium",
    acceptance: "50.4%",
    solved: true,
    platform: "LeetCode",
    statement: "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.",
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6."
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    hints: [
      "Consider Kadane's algorithm.",
      "Keep a running sum and update max sum. If running sum becomes negative, reset it to 0."
    ],
    expectedTime: "O(n)",
    expectedSpace: "O(1)",
    starterCode: `#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        // Implement Kadane's Algorithm
        return 0;
    }
};`,
    solutionCode: `#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int maxSoFar = nums[0], currentSum = 0;
        for (int x : nums) {
            currentSum += x;
            maxSoFar = max(maxSoFar, currentSum);
            if (currentSum < 0) currentSum = 0;
        }
        return maxSoFar;
    }
};`,
    testCases: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6" },
      { input: "nums = [1]", expectedOutput: "1" }
    ]
  },
  {
    id: "merge-sort",
    title: "Merge Sort Array",
    topicId: "sorting",
    difficulty: "Medium",
    acceptance: "61.0%",
    solved: false,
    platform: "DSAverse",
    statement: "Given an unsorted array of integers, sort the array in ascending order using Merge Sort algorithm.",
    examples: [
      { input: "nums = [5,2,3,1]", output: "[1,2,3,5]", explanation: "Sorted array." }
    ],
    constraints: [
      "1 <= nums.length <= 5 * 10^4",
      "-5 * 10^4 <= nums[i] <= 5 * 10^4"
    ],
    hints: [
      "Divide the array into halves recursively until size is 1.",
      "Merge two sorted halves in linear O(N) time."
    ],
    expectedTime: "O(n log n)",
    expectedSpace: "O(n)",
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        // Implement Merge Sort
        return nums;
    }
};`,
    solutionCode: `#include <vector>
using namespace std;

class Solution {
    void merge(vector<int>& nums, int l, int mid, int r) {
        vector<int> temp(r - l + 1);
        int i = l, j = mid + 1, k = 0;
        while (i <= mid && j <= r) {
            if (nums[i] <= nums[j]) temp[k++] = nums[i++];
            else temp[k++] = nums[j++];
        }
        while (i <= mid) temp[k++] = nums[i++];
        while (j <= r) temp[k++] = nums[j++];
        for (int p = 0; p < k; p++) nums[l + p] = temp[p];
    }
    void mergeSort(vector<int>& nums, int l, int r) {
        if (l >= r) return;
        int mid = l + (r - l) / 2;
        mergeSort(nums, l, mid);
        mergeSort(nums, mid + 1, r);
        merge(nums, l, mid, r);
    }
public:
    vector<int> sortArray(vector<int>& nums) {
        mergeSort(nums, 0, nums.size() - 1);
        return nums;
    }
};`,
    testCases: [
      { input: "nums = [5,2,3,1]", expectedOutput: "[1,2,3,5]" }
    ]
  },
  {
    id: "number-of-islands",
    title: "Number of Islands",
    topicId: "graphs",
    difficulty: "Medium",
    acceptance: "57.5%",
    solved: false,
    platform: "LeetCode",
    statement: "Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
    examples: [
      {
        input: "grid = [[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]",
        output: "1",
        explanation: "All connected land forms 1 island."
      }
    ],
    constraints: [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 300",
      "grid[i][j] is '0' or '1'."
    ],
    hints: [
      "Traverse each cell. If '1' is found, trigger BFS/DFS traversal to sink all connected land cells ('1' -> '0').",
      "Increment island count for each new BFS/DFS trigger."
    ],
    expectedTime: "O(m * n)",
    expectedSpace: "O(m * n)",
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        // Implement BFS or DFS graph traversal
        return 0;
    }
};`,
    solutionCode: `#include <vector>
using namespace std;

class Solution {
    void dfs(vector<vector<char>>& grid, int r, int c) {
        int m = grid.size(), n = grid[0].size();
        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] == '0') return;
        grid[r][c] = '0';
        dfs(grid, r + 1, c);
        dfs(grid, r - 1, c);
        dfs(grid, r, c + 1);
        dfs(grid, r, c - 1);
    }
public:
    int numIslands(vector<vector<char>>& grid) {
        int count = 0;
        for (int r = 0; r < grid.size(); r++) {
            for (int c = 0; c < grid[0].size(); c++) {
                if (grid[r][c] == '1') {
                    count++;
                    dfs(grid, r, c);
                }
            }
        }
        return count;
    }
};`,
    testCases: [
      { input: "grid = [[\"1\",\"1\",\"0\"],[\"1\",\"0\",\"0\"],[\"0\",\"0\",\"1\"]]", expectedOutput: "2" }
    ]
  }
];

// Mistake Journal Initial Data
export const mockMistakes: MistakeEntry[] = [
  {
    id: "m-1",
    problemId: "binary-search",
    problemTitle: "Binary Search",
    topic: "Searching",
    mistakeType: "Boundary Condition",
    date: "2026-08-12",
    whatWentWrong: "Used `low < high` instead of `low <= high`. Missed searching single-element subarray.",
    whatILearned: "When boundaries `low` and `high` are inclusive, the loop condition must be `low <= high`.",
    reviewed: false
  },
  {
    id: "m-2",
    problemId: "recursion-subsets",
    problemTitle: "Subsets Generation",
    topic: "Recursion",
    mistakeType: "Logic Error",
    date: "2026-08-10",
    whatWentWrong: "Forgot to call `pop_back()` after the recursive call, causing accumulation of unwanted elements in current vector.",
    whatILearned: "Backtracking step is essential to clean up global/reference state before visiting sibling branches.",
    reviewed: true
  },
  {
    id: "m-3",
    problemId: "two-sum",
    problemTitle: "Two Sum",
    topic: "Hashing",
    mistakeType: "Off-by-one",
    date: "2026-08-08",
    whatWentWrong: "Checked map after inserting current element, causing pair matching with itself when target == 2 * val.",
    whatILearned: "Check map complement BEFORE inserting current element into hash map.",
    reviewed: true
  }
];

// Challenges Data
export const mockChallenges: Challenge[] = [
  {
    id: "7-day-arrays",
    title: "7-Day Arrays Mastery",
    description: "Conquer Two Pointers, Sliding Window, and Prefix Sums in 7 days.",
    durationDays: 7,
    totalProblems: 14,
    completedProblems: 10,
    difficulty: "Beginner",
    status: "In Progress",
    tags: ["Arrays", "Two Pointers", "Prefix Sum"]
  },
  {
    id: "recursion-sprint",
    title: "Recursion & Backtracking Sprint",
    description: "Build call-stack mental models and master subset & permutation generation.",
    durationDays: 10,
    totalProblems: 12,
    completedProblems: 4,
    difficulty: "Intermediate",
    status: "In Progress",
    tags: ["Recursion", "Backtracking", "Subsets"]
  },
  {
    id: "30-days-dsa",
    title: "30 Days of Core DSA",
    description: "Complete roadmap covering Arrays, Trees, Graphs, and DP.",
    durationDays: 30,
    totalProblems: 60,
    completedProblems: 28,
    difficulty: "Advanced",
    status: "In Progress",
    tags: ["Full DSA", "Interview Prep"]
  }
];

// Contests Mock Data
export const mockContests: Contest[] = [
  {
    id: "contest-42",
    title: "DSAverse Weekly Contest 42",
    date: "Sun, Aug 17, 2026",
    timeRemaining: "2 days 08 hrs",
    duration: "1.5 Hours",
    problemsCount: 4,
    participantsCount: 1420,
    status: "Upcoming"
  },
  {
    id: "biweekly-18",
    title: "Biweekly C++ Speed Challenge",
    date: "Sat, Aug 23, 2026",
    timeRemaining: "8 days 14 hrs",
    duration: "2 Hours",
    problemsCount: 4,
    participantsCount: 890,
    status: "Upcoming"
  },
  {
    id: "contest-41",
    title: "DSAverse Weekly Contest 41",
    date: "Sun, Aug 10, 2026",
    timeRemaining: "Ended",
    duration: "1.5 Hours",
    problemsCount: 4,
    participantsCount: 2150,
    status: "Ended"
  }
];

// Community Mock Forum Posts
export const mockCommunityPosts: CommunityPost[] = [
  {
    id: "post-1",
    author: "Rohan V.",
    authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
    authorRole: "CS Undergraduate @ IIT Delhi",
    title: "How I finally developed intuition for Recursion & Call Stacks!",
    content: "When starting with recursion, drawing the call tree on paper helped me 100x more than staring at code. Think of base case as your return elevator!",
    tags: ["Recursion", "Study Strategy", "C++"],
    likes: 42,
    commentsCount: 15,
    timeAgo: "2 hours ago"
  },
  {
    id: "post-2",
    author: "Ananya Roy",
    authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
    authorRole: "Software Engineer Intern",
    title: "Binary Search tricks every beginner fails on (boundary conditions)",
    content: "Always remember: low <= high vs low < high depends on whether high is inclusive (n-1) or exclusive (n). Also use `low + (high - low) / 2` to avoid integer overflow!",
    tags: ["Searching", "Binary Search", "Tips"],
    likes: 89,
    commentsCount: 24,
    timeAgo: "1 day ago"
  },
  {
    id: "post-3",
    author: "Dev K.",
    authorAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
    authorRole: "4th Year Engineering Student",
    title: "Best approach to master Graph BFS & DFS for tech interviews?",
    content: "I'm comfortable with Arrays and Trees, but graphs feel overwhelming. What order should I solve graph problems in?",
    tags: ["Graphs", "Interview Prep"],
    likes: 19,
    commentsCount: 11,
    timeAgo: "3 days ago"
  }
];

// Pre-packaged responses for the 6 AI C++ Mentor Quick Action buttons
export const aiMentorActionResponses = {
  hint: {
    actionName: "💡 Small Hint",
    text: "Let's look at the boundary condition. In binary search, check if `high` starts at `nums.size() - 1` (inclusive) or `nums.size()` (exclusive). If inclusive, your loop must run while `low <= high`!"
  },
  error: {
    actionName: "🐛 Explain Error",
    text: "You encountered an **Off-By-One Error** or **Infinite Loop**. When updating your search space, writing `low = mid` instead of `low = mid + 1` causes the algorithm to get stuck when `low` and `high` are adjacent."
  },
  explainCode: {
    actionName: "🔍 Explain Code",
    text: "Here is how this snippet operates step-by-step:\n1. `low` and `high` define current search interval.\n2. `mid = low + (high - low) / 2` calculates midpoint without 32-bit integer overflow.\n3. If `arr[mid] == target`, returns index immediately."
  },
  optimize: {
    actionName: "⚡ Suggest Optimization",
    text: "Your current solution uses nested loops taking $O(N^2)$ time. You can optimize this to $O(N)$ time by using a **Hash Map** (`unordered_map` in C++) to look up complement values in average $O(1)$ time."
  },
  complexity: {
    actionName: "⏱️ Time & Space Complexity",
    text: "• **Time Complexity**: $O(\\log N)$ because the search space is divided by 2 in every step.\n• **Space Complexity**: $O(1)$ auxiliary space since only scalar variables (`low`, `high`, `mid`) are stored in memory."
  },
  dryRun: {
    actionName: "🧪 Help Dry-Run",
    text: "Let's dry-run `nums = [1, 3, 5, 7, 9]`, `target = 7`:\n- Step 1: `low = 0, high = 4` -> `mid = 2` (val 5). Since 5 < 7, set `low = 3`.\n- Step 2: `low = 3, high = 4` -> `mid = 3` (val 7). Match found at index 3!"
  }
};
