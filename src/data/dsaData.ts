export interface UserProfile {
  name: string;
  avatar: string;
  role: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  overallProgress: number;
  topicsCompleted: number;
  totalTopics: number;
  problemsSolved: number;
  totalProblems: number;
  currentStreak: number;
  longestStreak: number;
  readinessScore: number;
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
  platform: 'LeetCode';
  leetcodeUrl: string;
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
  topic: string;
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
  totalTopics: 10,
  problemsSolved: 10,
  totalProblems: 30,
  currentStreak: 5,
  longestStreak: 14,
  readinessScore: 68,
  dailyGoalSolved: 1,
  dailyGoalTarget: 2
};

// 10 Structured DSA Topics
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
      "Pointers and Address-Of Operator (&, *)",
      "Pass by Value vs Pass by Reference",
      "Dynamic Memory (new / delete)",
      "Standard Template Library (std::vector, std::pair)",
      "Fast I/O in C++ (ios_base::sync_with_stdio(false))"
    ],
    cppSyntax: `include <iostream>
include <vector>

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
    exampleCode: `include <iostream>
using namespace std;

void swapByRef(int &a, int &b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 5, y = 10;
    swapByRef(x, y);
    cout << "x: " << x << ", y: " << y << endl;
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
        desc: "Accessing memory after delete or returning address of local function variable.",
        fix: "Set pointers to nullptr after deleting or use smart pointers like unique_ptr."
      },
      {
        title: "Vector Out-of-Bounds",
        desc: "Using v[i] where i >= v.size() causing undefined behavior.",
        fix: "Use v.at(i) during debug or check bounds explicitly."
      }
    ],
    dryRunSteps: [
      {
        step: 1,
        title: "Initialize Pointers",
        arrayState: [10, 20, 30, 40],
        highlightIndices: [0],
        pointers: { ptr: 0 },
        description: "Pointer ptr points to first element array index 0 (val = 10)."
      },
      {
        step: 2,
        title: "Dereference & Increment",
        arrayState: [10, 20, 30, 40],
        highlightIndices: [1],
        pointers: { ptr: 1 },
        description: "Moving pointer ptr++ to index 1. Current value is 20."
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
    problemsCount: 4,
    solvedCount: 3,
    status: "Completed",
    iconName: "LayoutGrid",
    keyConcepts: [
      "Two Pointers (Left / Right pointers)",
      "Sliding Window (Fixed & Variable size)",
      "Prefix Sum Array & Range Queries",
      "Kadane's Algorithm for Max Subarray",
      "Dutch National Flag 3-Way Partition"
    ],
    cppSyntax: `include <vector>
include <algorithm>

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
        desc: "Accessing arr[n] instead of arr[n-1].",
        fix: "Always maintain loop condition i < arr.size()."
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
    problemsCount: 3,
    solvedCount: 2,
    status: "Completed",
    iconName: "Search",
    keyConcepts: [
      "Binary Search on Sorted Arrays",
      "Lower Bound (std::lower_bound) & Upper Bound",
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
        high = mid - 1;
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
        desc: "Using (low + high) / 2 when low + high can overflow 32-bit int.",
        fix: "Use low + (high - low) / 2."
      },
      {
        title: "Infinite Loop in Binary Search",
        desc: "Setting low = mid without adding 1 when boundaries are inclusive.",
        fix: "Use low = mid + 1 or check boundary conditions carefully."
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
    problemsCount: 3,
    solvedCount: 1,
    status: "In Progress",
    iconName: "ArrowUpDown",
    keyConcepts: [
      "Bubble, Selection, Insertion Sort (O(n^2))",
      "Merge Sort (Stable, Divide & Conquer O(n log n))",
      "Quick Sort (Lomuto/Hoare Partitioning)",
      "Non-Comparison Sorts (Counting & Radix Sort)",
      "C++ STL std::sort with custom lambdas"
    ],
    cppSyntax: `include <algorithm>

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
        desc: "Returning >= instead of strict < in C++ comparators causing segmentation faults.",
        fix: "Comparators must enforce strict weak ordering (use < or >)."
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
    fullDesc: "Learn fast O(1) lookup strategies, frequency mapping using std::unordered_map, and custom hash functions for competitive programming.",
    difficulty: "Medium",
    progress: 50,
    problemsCount: 3,
    solvedCount: 1,
    status: "In Progress",
    iconName: "Hash",
    keyConcepts: [
      "std::unordered_map vs std::map",
      "Collision Resolution (Chaining vs Open Addressing)",
      "Frequency Counting & Anagram Detection",
      "Custom Hash Functions for std::pair",
      "Rabin-Karp Rolling Hash Algorithm"
    ],
    cppSyntax: `include <unordered_map>
include <string>

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
        desc: "unordered_map can degrade to O(N) worst case under anti-hash test cases.",
        fix: "Use std::map (O(log N)) or custom hash function with random seeds."
      }
    ],
    dryRunSteps: [
      {
        step: 1,
        title: "Process Element 2",
        arrayState: [2, 7, 11, 15],
        highlightIndices: [0],
        pointers: { i: 0 },
        description: "target = 9. Element = 2. Complement = 7. Insert key 2 -> index 0."
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
    problemsCount: 3,
    solvedCount: 1,
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
        fix: "Undo state modifications (pop_back()) after recursive call."
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
    problemsCount: 3,
    solvedCount: 1,
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
        desc: "Accessing curr->next when curr is nullptr.",
        fix: "Check curr != nullptr before dereferencing curr->next."
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
    problemsCount: 3,
    solvedCount: 1,
    status: "In Progress",
    iconName: "Layers",
    keyConcepts: [
      "LIFO (Stack) vs FIFO (Queue)",
      "Monotonic Stack (Increasing / Decreasing)",
      "Valid Parentheses Matching",
      "Next Greater Element Pattern",
      "Deque for Sliding Window Maximum O(n)"
    ],
    cppSyntax: `include <stack>
include <queue>

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
        fix: "Always check !st.empty() prior to st.top() or st.pop()."
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
    problemsCount: 3,
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
    problemsCount: 3,
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
    cppSyntax: `include <vector>
include <queue>

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
    problemsCount: 2,
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

const buildProblem = (
  id: string,
  title: string,
  topicId: string,
  difficulty: 'Easy' | 'Medium' | 'Hard',
  acceptance: string,
  solved: boolean,
  leetcodeUrl: string,
  statement: string,
  expectedTime: string,
  expectedSpace: string,
  hints: string[],
  starterCode?: string,
  solutionCode?: string
): DSAProblem => ({
  id,
  title,
  topicId,
  difficulty,
  acceptance,
  solved,
  platform: 'LeetCode',
  leetcodeUrl,
  statement,
  examples: [
    {
      input: "Sample test input",
      output: "Expected output",
      explanation: `Standard test case for ${title}.`
    }
  ],
  constraints: [
    "1 <= N <= 10^5",
    "Time Limit: 1.0 sec"
  ],
  hints,
  expectedTime,
  expectedSpace,
  starterCode:
    starterCode ||
    `include <vector>\ninclude <iostream>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        // Write your C++ solution for ${title}\n    }\n};`,
  solutionCode:
    solutionCode ||
    `// Optimal C++ Solution for ${title}\n// Time Complexity: ${expectedTime} | Space Complexity: ${expectedSpace}`,
  testCases: [
    { input: "Case 1", expectedOutput: "Passed" },
    { input: "Case 2", expectedOutput: "Passed" }
  ]
});

// Exactly 30 Curated DSA Problems across all core DSA topics with direct LeetCode links
export const dsaProblems: DSAProblem[] = [
  // 1-4: Arrays (4)
  buildProblem(
    "two-sum",
    "Two Sum",
    "arrays",
    "Easy",
    "53.2%",
    true,
    "https://leetcode.com/problems/two-sum/",
    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    "O(n)",
    "O(n)",
    [
      "Brute force checks all pairs in O(n^2) time.",
      "Use an unordered_map to store seen numbers and their indices for O(1) complement lookup."
    ]
  ),
  buildProblem(
    "best-time-to-buy-and-sell-stock",
    "Best Time to Buy and Sell Stock",
    "arrays",
    "Easy",
    "54.1%",
    true,
    "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    "You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize your profit by choosing a single day to buy and a future day to sell.",
    "O(n)",
    "O(1)",
    [
      "Track the minimum price seen so far as you iterate.",
      "At each day, calculate prices[i] - minPrice and update maxProfit."
    ]
  ),
  buildProblem(
    "maximum-subarray",
    "Maximum Subarray (Kadane's Algorithm)",
    "arrays",
    "Medium",
    "51.0%",
    true,
    "https://leetcode.com/problems/maximum-subarray/",
    "Given an integer array nums, find the contiguous subarray which has the largest sum and return its sum.",
    "O(n)",
    "O(1)",
    [
      "Use Kadane's algorithm: maintain a running currentSum.",
      "If currentSum drops below 0, reset it to 0."
    ]
  ),
  buildProblem(
    "product-of-array-except-self",
    "Product of Array Except Self",
    "arrays",
    "Medium",
    "66.4%",
    false,
    "https://leetcode.com/problems/product-of-array-except-self/",
    "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i], without using division.",
    "O(n)",
    "O(1)",
    [
      "Compute prefix products in a forward pass.",
      "Multiply by suffix products in a backward pass using a single running variable."
    ]
  ),

  // 5-7: Searching (3)
  buildProblem(
    "binary-search",
    "Binary Search",
    "searching",
    "Easy",
    "58.1%",
    true,
    "https://leetcode.com/problems/binary-search/",
    "Given an array of integers nums which is sorted in ascending order, and an integer target, search target in nums and return its index or -1.",
    "O(log n)",
    "O(1)",
    [
      "Compare target with the middle element mid = low + (high - low) / 2.",
      "Halve the search space in each step based on comparison."
    ]
  ),
  buildProblem(
    "search-in-rotated-sorted-array",
    "Search in Rotated Sorted Array",
    "searching",
    "Medium",
    "41.2%",
    true,
    "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    "Given a sorted and rotated array of unique elements nums and an integer target, return the index of target if it is in nums, or -1 otherwise in O(log n) time.",
    "O(log n)",
    "O(1)",
    [
      "At any mid, at least one half (left..mid or mid..right) is strictly sorted.",
      "Check which half is sorted, then check if target lies within that sorted boundary."
    ]
  ),
  buildProblem(
    "find-minimum-in-rotated-sorted-array",
    "Find Minimum in Rotated Sorted Array",
    "searching",
    "Medium",
    "50.9%",
    false,
    "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
    "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Find the minimum element in O(log n) time.",
    "O(log n)",
    "O(1)",
    [
      "Compare nums[mid] with nums[high].",
      "If nums[mid] > nums[high], the minimum must be in the right half (low = mid + 1)."
    ]
  ),

  // 8-10: Sorting (3)
  buildProblem(
    "sort-an-array",
    "Sort an Array (Merge Sort)",
    "sorting",
    "Medium",
    "57.3%",
    true,
    "https://leetcode.com/problems/sort-an-array/",
    "Given an array of integers nums, sort the array in ascending order and return it in O(n log n) time complexity.",
    "O(n log n)",
    "O(n)",
    [
      "Divide the array recursively into two halves until size is 1.",
      "Merge the two sorted halves using a temporary vector."
    ]
  ),
  buildProblem(
    "merge-intervals",
    "Merge Intervals",
    "sorting",
    "Medium",
    "47.8%",
    false,
    "https://leetcode.com/problems/merge-intervals/",
    "Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals and return an array of non-overlapping intervals.",
    "O(n log n)",
    "O(n)",
    [
      "Sort intervals by their start time first.",
      "Iterate and merge if current.start <= previous.end."
    ]
  ),
  buildProblem(
    "sort-colors",
    "Sort Colors (Dutch National Flag)",
    "sorting",
    "Medium",
    "63.5%",
    false,
    "https://leetcode.com/problems/sort-colors/",
    "Given an array nums with n objects colored red (0), white (1), or blue (2), sort them in-place so that objects of the same color are adjacent.",
    "O(n)",
    "O(1)",
    [
      "Maintain three pointers: low, mid, and high.",
      "Swap 0s to low, keep 1s at mid, and swap 2s to high."
    ]
  ),

  // 11-13: Hashing (3)
  buildProblem(
    "valid-anagram",
    "Valid Anagram",
    "hashing",
    "Easy",
    "65.1%",
    true,
    "https://leetcode.com/problems/valid-anagram/",
    "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    "O(n)",
    "O(1)",
    [
      "Count character frequencies using a fixed-size array of length 26.",
      "Increment for s and decrement for t, then verify all counts are zero."
    ]
  ),
  buildProblem(
    "group-anagrams",
    "Group Anagrams",
    "hashing",
    "Medium",
    "68.9%",
    false,
    "https://leetcode.com/problems/group-anagrams/",
    "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
    "O(n * k log k)",
    "O(n * k)",
    [
      "Use an unordered_map<string, vector<string>>.",
      "Sort each word to use as the canonical hash key."
    ]
  ),
  buildProblem(
    "longest-consecutive-sequence",
    "Longest Consecutive Sequence",
    "hashing",
    "Medium",
    "47.3%",
    false,
    "https://leetcode.com/problems/longest-consecutive-sequence/",
    "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence in O(n) time.",
    "O(n)",
    "O(n)",
    [
      "Insert all elements into an unordered_set for O(1) lookups.",
      "Only start counting a streak from numbers x where (x - 1) is NOT in the set."
    ]
  ),

  // 14-16: Recursion & Backtracking (3)
  buildProblem(
    "subsets",
    "Subsets",
    "recursion",
    "Medium",
    "78.4%",
    true,
    "https://leetcode.com/problems/subsets/",
    "Given an integer array nums of unique elements, return all possible subsets (the power set).",
    "O(n * 2^n)",
    "O(n)",
    [
      "At each index, make two recursive choices: include nums[i] or exclude nums[i].",
      "Remember to pop_back() when backtracking."
    ]
  ),
  buildProblem(
    "permutations",
    "Permutations",
    "recursion",
    "Medium",
    "79.1%",
    false,
    "https://leetcode.com/problems/permutations/",
    "Given an array nums of distinct integers, return all the possible permutations in any order.",
    "O(n * n!)",
    "O(n)",
    [
      "Swap the current index with each subsequent index i from idx to n-1.",
      "Recurse for idx + 1, then swap back to restore state."
    ]
  ),
  buildProblem(
    "combination-sum",
    "Combination Sum",
    "recursion",
    "Medium",
    "72.0%",
    false,
    "https://leetcode.com/problems/combination-sum/",
    "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target.",
    "O(2^t)",
    "O(t)",
    [
      "Build a recursive decision tree where you can reuse the same index i if remaining target >= candidates[i].",
      "Base cases: remaining == 0 (valid combination) or remaining < 0 (prune branch)."
    ]
  ),

  // 17-19: Linked Lists (3)
  buildProblem(
    "reverse-linked-list",
    "Reverse Linked List",
    "linked-lists",
    "Easy",
    "77.2%",
    true,
    "https://leetcode.com/problems/reverse-linked-list/",
    "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    "O(n)",
    "O(1)",
    [
      "Track three pointers: prev = nullptr, curr = head, and nextTemp.",
      "Rewire curr->next = prev in each step."
    ]
  ),
  buildProblem(
    "linked-list-cycle",
    "Linked List Cycle",
    "linked-lists",
    "Easy",
    "50.8%",
    false,
    "https://leetcode.com/problems/linked-list-cycle/",
    "Given head, the head of a linked list, determine if the linked list has a cycle in it.",
    "O(n)",
    "O(1)",
    [
      "Use Floyd's Cycle Detection (slow and fast pointers).",
      "Move slow by 1 step and fast by 2 steps; if they meet, a cycle exists."
    ]
  ),
  buildProblem(
    "merge-two-sorted-lists",
    "Merge Two Sorted Lists",
    "linked-lists",
    "Easy",
    "65.0%",
    false,
    "https://leetcode.com/problems/merge-two-sorted-lists/",
    "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list.",
    "O(n + m)",
    "O(1)",
    [
      "Create a dummy node to simplify head edge cases.",
      "Compare list1->val and list2->val and attach the smaller node."
    ]
  ),

  // 20-22: Stacks & Queues (3)
  buildProblem(
    "valid-parentheses",
    "Valid Parentheses",
    "stacks-queues",
    "Easy",
    "40.9%",
    true,
    "https://leetcode.com/problems/valid-parentheses/",
    "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    "O(n)",
    "O(n)",
    [
      "Push opening brackets onto a stack.",
      "On a closing bracket, check if the stack is non-empty and top matches."
    ]
  ),
  buildProblem(
    "min-stack",
    "Min Stack",
    "stacks-queues",
    "Medium",
    "54.8%",
    false,
    "https://leetcode.com/problems/min-stack/",
    "Design a stack that supports push, pop, top, and retrieving the minimum element in constant O(1) time.",
    "O(1)",
    "O(n)",
    [
      "Store pairs {val, currentMin} in the stack.",
      "Each pushed element records the minimum up to that point."
    ]
  ),
  buildProblem(
    "daily-temperatures",
    "Daily Temperatures",
    "stacks-queues",
    "Medium",
    "66.1%",
    false,
    "https://leetcode.com/problems/daily-temperatures/",
    "Given an array of integers temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.",
    "O(n)",
    "O(n)",
    [
      "Maintain a monotonic decreasing stack of indices.",
      "When current temperature > temperatures[st.top()], pop and record i - st.top()."
    ]
  ),

  // 23-25: Trees (3)
  buildProblem(
    "maximum-depth-of-binary-tree",
    "Maximum Depth of Binary Tree",
    "trees",
    "Easy",
    "75.8%",
    false,
    "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    "Given the root of a binary tree, return its maximum depth (number of nodes along the longest path from root down to the farthest leaf).",
    "O(n)",
    "O(h)",
    [
      "Base case: if root == nullptr return 0.",
      "Return 1 + max(maxDepth(root->left), maxDepth(root->right))."
    ]
  ),
  buildProblem(
    "invert-binary-tree",
    "Invert Binary Tree",
    "trees",
    "Easy",
    "77.1%",
    false,
    "https://leetcode.com/problems/invert-binary-tree/",
    "Given the root of a binary tree, invert the tree (mirror left and right subtrees), and return its root.",
    "O(n)",
    "O(h)",
    [
      "Swap root->left and root->right at each node.",
      "Recursively invert the left and right subtrees."
    ]
  ),
  buildProblem(
    "lowest-common-ancestor-of-a-binary-search-tree",
    "Lowest Common Ancestor of a BST",
    "trees",
    "Medium",
    "65.6%",
    false,
    "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
    "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.",
    "O(h)",
    "O(1)",
    [
      "Leverage BST property: if both p and q are smaller than root, move left.",
      "If both are larger than root, move right; otherwise root is the split point (LCA)."
    ]
  ),

  // 26-28: Graphs (3)
  buildProblem(
    "number-of-islands",
    "Number of Islands",
    "graphs",
    "Medium",
    "60.1%",
    false,
    "https://leetcode.com/problems/number-of-islands/",
    "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
    "O(m * n)",
    "O(m * n)",
    [
      "Iterate through each cell; when you see '1', increment island count and launch DFS/BFS.",
      "Mark visited land cells as '0' so they are not counted again."
    ]
  ),
  buildProblem(
    "clone-graph",
    "Clone Graph",
    "graphs",
    "Medium",
    "58.9%",
    false,
    "https://leetcode.com/problems/clone-graph/",
    "Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.",
    "O(V + E)",
    "O(V)",
    [
      "Use an unordered_map<Node*, Node*> to map original nodes to cloned nodes.",
      "Traverse using BFS or DFS and populate neighbors from the map."
    ]
  ),
  buildProblem(
    "course-schedule",
    "Course Schedule (Topological Sort)",
    "graphs",
    "Medium",
    "47.4%",
    false,
    "https://leetcode.com/problems/course-schedule/",
    "There are a total of numCourses courses you have to take. Given prerequisites pairs, return true if you can finish all courses (detect if the directed graph is acyclic).",
    "O(V + E)",
    "O(V + E)",
    [
      "Use Kahn's Algorithm (BFS with in-degree array).",
      "Push all nodes with in-degree 0 into a queue and count how many nodes get processed."
    ]
  ),

  // 29-30: Dynamic Programming (2)
  buildProblem(
    "climbing-stairs",
    "Climbing Stairs",
    "dp",
    "Easy",
    "53.0%",
    false,
    "https://leetcode.com/problems/climbing-stairs/",
    "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    "O(n)",
    "O(1)",
    [
      "ways(n) = ways(n - 1) + ways(n - 2), which follows the Fibonacci sequence.",
      "Maintain two variables prev1 and prev2 for O(1) space."
    ]
  ),
  buildProblem(
    "coin-change",
    "Coin Change",
    "dp",
    "Medium",
    "44.8%",
    false,
    "https://leetcode.com/problems/coin-change/",
    "You are given an integer array coins representing coins of different denominations and an integer amount. Return the fewest number of coins that you need to make up that amount.",
    "O(amount * n)",
    "O(amount)",
    [
      "Create a 1D DP array dp[amount + 1] initialized to infinity, with dp[0] = 0.",
      "For each amount i from 1 to amount, try every coin: dp[i] = min(dp[i], 1 + dp[i - coin])."
    ]
  )
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
    whatWentWrong: "Used low < high instead of low <= high. Missed searching single-element subarray.",
    whatILearned: "When boundaries low and high are inclusive, the loop condition must be low <= high.",
    reviewed: false
  },
  {
    id: "m-2",
    problemId: "subsets",
    problemTitle: "Subsets Generation",
    topic: "Recursion",
    mistakeType: "Logic Error",
    date: "2026-08-10",
    whatWentWrong: "Forgot to call pop_back() after the recursive call, causing accumulation of unwanted elements in current vector.",
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
    totalProblems: 30,
    completedProblems: 10,
    difficulty: "Advanced",
    status: "In Progress",
    tags: ["Full DSA", "Interview Prep"]
  }
];

// Contests Mock Data (kept for type compatibility)
export const mockContests: Contest[] = [];

// Community Forum Topics
export const communityTopics = [
  "All",
  "Arrays",
  "Searching",
  "Sorting",
  "Hashing",
  "Recursion",
  "Linked Lists",
  "Stacks & Queues",
  "Trees",
  "Graphs",
  "Dynamic Programming",
  "Interview Prep"
];

// Community Mock Forum Posts (segregated by topic)
export const mockCommunityPosts: CommunityPost[] = [
  {
    id: "post-1",
    author: "Rohan V.",
    authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
    authorRole: "CS Undergraduate",
    title: "How I finally developed intuition for Recursion and Call Stacks!",
    content: "When starting with recursion, drawing the recursion tree on paper helped me 100x more than staring at code. Always write your base case first, then trust the recursive leap of faith for (n - 1), and remember to pop_back() when backtracking!",
    topic: "Recursion",
    tags: ["Recursion", "Backtracking", "C++"],
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
    content: "Always remember: low <= high vs low < high depends on whether high is inclusive (n-1) or exclusive (n). Also use low + (high - low) / 2 to avoid 32-bit signed integer overflow in C++!",
    topic: "Searching",
    tags: ["Searching", "Binary Search", "Interview Prep"],
    likes: 89,
    commentsCount: 24,
    timeAgo: "5 hours ago"
  },
  {
    id: "post-3",
    author: "Dev K.",
    authorAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
    authorRole: "4th Year Engineering Student",
    title: "Best approach to master Graph BFS and DFS for tech interviews?",
    content: "Start with Number of Islands (grid DFS/BFS), then Clone Graph, and then Course Schedule (Kahn's topological sort). Marking nodes visited BEFORE pushing to the BFS queue prevents TLE on dense graphs!",
    topic: "Graphs",
    tags: ["Graphs", "BFS", "DFS"],
    likes: 31,
    commentsCount: 11,
    timeAgo: "1 day ago"
  },
  {
    id: "post-4",
    author: "Siddharth M.",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    authorRole: "3rd Year IT Student",
    title: "When to use Two Pointers vs Sliding Window on Array problems",
    content: "Use Two Pointers (left = 0, right = n - 1) when dealing with sorted pairs or palindromes. Use Sliding Window when finding longest/shortest contiguous subarrays satisfying a condition in O(N) time.",
    topic: "Arrays",
    tags: ["Arrays", "Two Pointers", "Sliding Window"],
    likes: 54,
    commentsCount: 9,
    timeAgo: "1 day ago"
  },
  {
    id: "post-5",
    author: "Neha Kulkarni",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    authorRole: "Final Year CS Student",
    title: "Avoiding O(N) hash collisions in C++ unordered_map",
    content: "In time-critical tests, unordered_map can hit worst-case O(N) per lookup if many keys collide. Reserve bucket space with mp.reserve(n) and set mp.max_load_factor(0.25) for consistent O(1) lookups.",
    topic: "Hashing",
    tags: ["Hashing", "C++ STL", "Optimization"],
    likes: 37,
    commentsCount: 7,
    timeAgo: "2 days ago"
  },
  {
    id: "post-6",
    author: "Aarav Deshmukh",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    authorRole: "Placement Coordinator",
    title: "From Memoization to Tabulation: 3-Step DP Framework",
    content: "Step 1: Define state parameters (e.g., idx and remaining capacity). Step 2: Write top-down recursion with a dp memo table initialized to -1. Step 3: Convert base cases into table row 0 and iterate bottom-up.",
    topic: "Dynamic Programming",
    tags: ["Dynamic Programming", "Interview Prep"],
    likes: 63,
    commentsCount: 18,
    timeAgo: "3 days ago"
  },
  {
    id: "post-7",
    author: "Karan Patil",
    authorAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
    authorRole: "3rd Year CS Student",
    title: "Monotonic Stack pattern explained for Daily Temperatures & Next Greater Element",
    content: "Whenever a problem asks for the next greater or smaller element to the left/right, push array indices onto a stack while maintaining monotonic order. Each element is pushed and popped at most once, giving O(N) time!",
    topic: "Stacks & Queues",
    tags: ["Stacks & Queues", "Monotonic Stack"],
    likes: 29,
    commentsCount: 6,
    timeAgo: "4 days ago"
  }
];

// Pre-packaged responses for the 6 AI C++ Mentor Quick Action buttons (clean text, no $ or #)
export const aiMentorActionResponses = {
  hint: {
    actionName: "Small Hint",
    text: "Check your boundary conditions and loop invariant first. For example, in Binary Search, if high starts at nums.size() - 1 (inclusive), your loop condition must be low <= high. For Array or Hash Map problems, verify if you can trade O(N) auxiliary space to reduce nested O(N^2) loops down to a single O(N) pass."
  },
  error: {
    actionName: "Explain Error",
    text: "Common C++ DSA bugs to check in your code:\n1. Off-By-One / Infinite Loop: Updating low = mid instead of low = mid + 1 or accessing nums[n] out of bounds.\n2. Integer Overflow: Using (low + high) / 2 instead of low + (high - low) / 2, or accumulating sums in 32-bit int instead of long long.\n3. Null Pointer Dereference: Accessing curr->next or st.top() before checking curr != nullptr or !st.empty()."
  },
  explainCode: {
    actionName: "Explain Code",
    text: "Step-by-step execution breakdown:\n1. Initialization: Pointers or auxiliary containers (vector / unordered_map / stack) set up the initial state.\n2. Core Loop / Recursion: Each iteration processes one element or halves the search interval while preserving the invariant.\n3. Termination: Once the base condition or boundary is reached, the optimal result is returned in clean C++."
  },
  optimize: {
    actionName: "Suggest Optimization",
    text: "How to optimize from brute force to optimal in C++:\n1. Replace O(N^2) nested loops with an unordered_map or unordered_set for O(1) average lookup -> O(N) total time.\n2. On sorted arrays, use Two Pointers or Binary Search -> O(N) or O(log N) time with O(1) space.\n3. Pass large vectors by const reference (const vector<int>& nums) to avoid O(N) copying overhead."
  },
  complexity: {
    actionName: "Time & Space Complexity",
    text: "- Time Complexity: Count how many times the innermost operation executes relative to input size N (e.g., O(log N) when halving each step, O(N) for single pass or two pointers, O(N log N) for sorting).\n- Space Complexity: Measure extra heap/stack memory allocated (O(1) for scalar pointers, O(N) for hash maps or recursion stack of depth N)."
  },
  dryRun: {
    actionName: "Help Dry-Run",
    text: "Dry-Run Trace Example (nums = [1, 3, 5, 7, 9], target = 7):\n- Iteration 1: low = 0, high = 4 -> mid = 2 (nums[2] = 5). Since 5 < 7, move right: low = mid + 1 = 3.\n- Iteration 2: low = 3, high = 4 -> mid = 3 (nums[3] = 7). nums[3] matches target 7 -> return index 3!"
  }
};
