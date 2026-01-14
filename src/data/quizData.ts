import { QuizQuestion, LearningContent } from '@/types/learning';

export const diagnosticQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the primary function of a variable in programming?",
    options: [
      "To store data values",
      "To create visual effects",
      "To connect to the internet",
      "To delete files"
    ],
    correctAnswer: 0,
    difficulty: 'beginner'
  },
  {
    id: 2,
    question: "Which data structure uses LIFO (Last In, First Out) principle?",
    options: [
      "Queue",
      "Array",
      "Stack",
      "Linked List"
    ],
    correctAnswer: 2,
    difficulty: 'intermediate'
  },
  {
    id: 3,
    question: "What is the time complexity of binary search?",
    options: [
      "O(n)",
      "O(n²)",
      "O(log n)",
      "O(1)"
    ],
    correctAnswer: 2,
    difficulty: 'advanced'
  },
  {
    id: 4,
    question: "Which loop is best when you know the exact number of iterations?",
    options: [
      "while loop",
      "for loop",
      "do-while loop",
      "infinite loop"
    ],
    correctAnswer: 1,
    difficulty: 'beginner'
  },
  {
    id: 5,
    question: "What does API stand for?",
    options: [
      "Application Programming Interface",
      "Advanced Program Integration",
      "Automatic Process Initialization",
      "Application Process Integration"
    ],
    correctAnswer: 0,
    difficulty: 'beginner'
  },
  {
    id: 6,
    question: "Which sorting algorithm has the best average-case time complexity?",
    options: [
      "Bubble Sort",
      "Selection Sort",
      "Quick Sort",
      "Insertion Sort"
    ],
    correctAnswer: 2,
    difficulty: 'advanced'
  },
  {
    id: 7,
    question: "What is encapsulation in OOP?",
    options: [
      "Hiding data within a class",
      "Creating multiple classes",
      "Deleting objects",
      "Printing output"
    ],
    correctAnswer: 0,
    difficulty: 'intermediate'
  },
  {
    id: 8,
    question: "Which symbol is used for single-line comments in JavaScript?",
    options: [
      "/* */",
      "#",
      "//",
      "<!-- -->"
    ],
    correctAnswer: 2,
    difficulty: 'beginner'
  },
  {
    id: 9,
    question: "What is recursion?",
    options: [
      "A function that calls itself",
      "A type of loop",
      "A data structure",
      "A debugging technique"
    ],
    correctAnswer: 0,
    difficulty: 'intermediate'
  },
  {
    id: 10,
    question: "What is the space complexity of merge sort?",
    options: [
      "O(1)",
      "O(n)",
      "O(log n)",
      "O(n²)"
    ],
    correctAnswer: 1,
    difficulty: 'advanced'
  }
];

export const learningContentByLevel: Record<string, LearningContent> = {
  beginner: {
    level: 'beginner',
    title: "Programming Foundations",
    explanation: `Welcome to your personalized learning journey! Based on your diagnostic quiz, we'll start with the fundamentals.

**What is Programming?**
Programming is like giving instructions to a computer. Just like following a recipe to bake a cake, you write step-by-step instructions for the computer to follow.

**Variables - Your Data Containers**
Think of variables as labeled boxes where you store things. You can put a number, text, or other data in these boxes and use them later.

**Example:**
\`\`\`javascript
let myName = "Alex";  // A box labeled 'myName' containing "Alex"
let age = 15;         // A box labeled 'age' containing 15
\`\`\`

**Key Concepts to Master:**
1. Variables and data types
2. Basic operators (+, -, *, /)
3. Simple if-else statements
4. For and while loops`,
    practiceQuestions: [
      "Create a variable to store your favorite number and print it.",
      "Write a simple program that adds two numbers together.",
      "Create an if-else statement that checks if a number is positive or negative.",
      "Write a for loop that prints numbers from 1 to 5."
    ],
    tips: [
      "🎯 Practice coding for at least 15 minutes daily",
      "📝 Write code by hand first, then type it",
      "🔄 Don't be afraid to make mistakes - they help you learn!",
      "💡 Break problems into smaller steps"
    ]
  },
  intermediate: {
    level: 'intermediate',
    title: "Building Stronger Foundations",
    explanation: `Great progress! You have a solid foundation. Let's build on that.

**Object-Oriented Programming (OOP)**
OOP is a way to organize code using "objects" - bundles of related data and functions.

**The Four Pillars of OOP:**
1. **Encapsulation**: Hiding internal details and exposing only what's necessary
2. **Inheritance**: Creating new classes based on existing ones
3. **Polymorphism**: Objects behaving differently based on their type
4. **Abstraction**: Simplifying complex systems by hiding unnecessary details

**Data Structures Deep Dive:**
\`\`\`javascript
// Stack - LIFO (Last In, First Out)
const stack = [];
stack.push(1);  // Add to top
stack.pop();    // Remove from top

// Queue - FIFO (First In, First Out)
const queue = [];
queue.push(1);    // Add to back
queue.shift();    // Remove from front
\`\`\``,
    practiceQuestions: [
      "Create a class 'Car' with properties like brand, model, and a method to display info.",
      "Implement a simple stack with push and pop operations.",
      "Write a recursive function to calculate factorial.",
      "Create a function that reverses a string without using built-in methods."
    ],
    tips: [
      "🏗️ Start thinking about code organization",
      "📚 Read other people's code on GitHub",
      "🧪 Write tests for your functions",
      "🔍 Learn to use debugging tools effectively"
    ]
  },
  advanced: {
    level: 'advanced',
    title: "Mastering Complex Concepts",
    explanation: `Excellent! You're ready for advanced challenges.

**Algorithm Analysis & Optimization**
Understanding Big O notation is crucial for writing efficient code.

**Time Complexity Examples:**
- O(1): Accessing array element by index
- O(log n): Binary search
- O(n): Linear search
- O(n log n): Merge sort, Quick sort (average)
- O(n²): Bubble sort, nested loops

**Advanced Data Structures:**
\`\`\`javascript
// Binary Search Tree Node
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Hash Map for O(1) lookups
const hashMap = new Map();
hashMap.set('key', 'value');
\`\`\`

**Design Patterns to Master:**
- Singleton, Factory, Observer
- MVC, MVVM architectures
- Dependency Injection`,
    practiceQuestions: [
      "Implement binary search from scratch and analyze its time complexity.",
      "Create a balanced binary search tree with insert and search operations.",
      "Solve a dynamic programming problem (e.g., longest common subsequence).",
      "Implement the Observer design pattern for an event system."
    ],
    tips: [
      "🎯 Solve algorithmic problems daily on LeetCode/HackerRank",
      "📖 Study system design principles",
      "🤝 Contribute to open-source projects",
      "🧠 Teach concepts to others - it deepens your understanding"
    ]
  }
};

export const aiGeneratedSuggestions = {
  lowEngagement: [
    "🎮 Try our interactive coding game to practice loops!",
    "📹 Watch this 5-minute video explanation instead of reading",
    "🏆 Complete today's mini-challenge to earn bonus points!",
    "👥 Join a study group session happening in 30 minutes",
    "⏰ Set a reminder to practice for just 10 minutes tomorrow"
  ],
  mediumEngagement: [
    "📈 You're doing well! Try a slightly harder problem",
    "🎯 Focus on your weakest topic for 15 minutes",
    "💡 Explore the bonus content section",
    "🔄 Review yesterday's lesson to reinforce learning"
  ],
  highEngagement: [
    "🌟 Amazing progress! Ready for an advanced challenge?",
    "🏅 You've earned a streak badge! Keep it up!",
    "📚 Explore optional deep-dive materials",
    "🤝 Consider becoming a peer tutor"
  ]
};
