import { QuizQuestion, LearningContent } from '@/types/learning';

// Computer Networks Question Bank - 20 Questions
export const questionBank: QuizQuestion[] = [
  {
    id: 1,
    question: "What is a computer network?",
    options: [
      "A single computer",
      "A group of connected computers",
      "A software program",
      "A database"
    ],
    correctAnswer: 1,
    difficulty: 'beginner'
  },
  {
    id: 2,
    question: "Which device is used to connect multiple networks together?",
    options: [
      "Switch",
      "Hub",
      "Router",
      "Repeater"
    ],
    correctAnswer: 2,
    difficulty: 'beginner'
  },
  {
    id: 3,
    question: "What does LAN stand for?",
    options: [
      "Large Area Network",
      "Local Area Network",
      "Logical Area Network",
      "Limited Area Network"
    ],
    correctAnswer: 1,
    difficulty: 'beginner'
  },
  {
    id: 4,
    question: "Which protocol is used to send emails?",
    options: [
      "FTP",
      "SMTP",
      "HTTP",
      "TCP"
    ],
    correctAnswer: 1,
    difficulty: 'intermediate'
  },
  {
    id: 5,
    question: "What is the main function of the OSI model?",
    options: [
      "Hardware manufacturing",
      "Network communication standardization",
      "Data storage",
      "Software testing"
    ],
    correctAnswer: 1,
    difficulty: 'intermediate'
  },
  {
    id: 6,
    question: "How many layers are there in the OSI model?",
    options: [
      "5",
      "6",
      "7",
      "8"
    ],
    correctAnswer: 2,
    difficulty: 'beginner'
  },
  {
    id: 7,
    question: "Which layer of the OSI model is responsible for routing?",
    options: [
      "Transport",
      "Network",
      "Data Link",
      "Physical"
    ],
    correctAnswer: 1,
    difficulty: 'intermediate'
  },
  {
    id: 8,
    question: "What is an IP address?",
    options: [
      "A physical address",
      "A logical address",
      "A MAC address",
      "A port number"
    ],
    correctAnswer: 1,
    difficulty: 'beginner'
  },
  {
    id: 9,
    question: "Which protocol is used for secure web communication?",
    options: [
      "HTTP",
      "FTP",
      "HTTPS",
      "SMTP"
    ],
    correctAnswer: 2,
    difficulty: 'intermediate'
  },
  {
    id: 10,
    question: "What does DNS do?",
    options: [
      "Encrypts data",
      "Translates domain names to IP addresses",
      "Sends emails",
      "Routes packets"
    ],
    correctAnswer: 1,
    difficulty: 'intermediate'
  },
  {
    id: 11,
    question: "Which topology connects all devices to a central hub?",
    options: [
      "Bus",
      "Ring",
      "Star",
      "Mesh"
    ],
    correctAnswer: 2,
    difficulty: 'beginner'
  },
  {
    id: 12,
    question: "What is the full form of TCP?",
    options: [
      "Transmission Control Protocol",
      "Transfer Communication Protocol",
      "Technical Control Protocol",
      "Transport Connection Protocol"
    ],
    correctAnswer: 0,
    difficulty: 'beginner'
  },
  {
    id: 13,
    question: "Which device works at the Data Link layer?",
    options: [
      "Router",
      "Switch",
      "Modem",
      "Gateway"
    ],
    correctAnswer: 1,
    difficulty: 'advanced'
  },
  {
    id: 14,
    question: "What is packet switching?",
    options: [
      "Circuit-based communication",
      "Data divided into packets",
      "Direct data transfer",
      "Wireless transmission"
    ],
    correctAnswer: 1,
    difficulty: 'intermediate'
  },
  {
    id: 15,
    question: "What is the function of a firewall?",
    options: [
      "Increase speed",
      "Protect network security",
      "Store data",
      "Convert signals"
    ],
    correctAnswer: 1,
    difficulty: 'beginner'
  },
  {
    id: 16,
    question: "Which address is used for physical identification of a device?",
    options: [
      "IP address",
      "MAC address",
      "Port number",
      "URL"
    ],
    correctAnswer: 1,
    difficulty: 'intermediate'
  },
  {
    id: 17,
    question: "What type of network is the Internet?",
    options: [
      "LAN",
      "MAN",
      "WAN",
      "PAN"
    ],
    correctAnswer: 2,
    difficulty: 'beginner'
  },
  {
    id: 18,
    question: "Which protocol is used for file transfer?",
    options: [
      "FTP",
      "SMTP",
      "POP3",
      "SNMP"
    ],
    correctAnswer: 0,
    difficulty: 'intermediate'
  },
  {
    id: 19,
    question: "What does bandwidth refer to?",
    options: [
      "Network security",
      "Data transfer capacity",
      "Cable length",
      "Signal type"
    ],
    correctAnswer: 1,
    difficulty: 'advanced'
  },
  {
    id: 20,
    question: "Which layer ensures error-free data transmission?",
    options: [
      "Application",
      "Transport",
      "Network",
      "Session"
    ],
    correctAnswer: 1,
    difficulty: 'advanced'
  }
];

// Fisher-Yates shuffle algorithm for randomization
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Generate a random quiz of 10 questions from the question bank
export function generateRandomQuiz(count: number = 10): QuizQuestion[] {
  const shuffled = shuffleArray(questionBank);
  return shuffled.slice(0, count);
}

// AI-generated feedback messages based on learning level
export const feedbackMessages = {
  beginner: [
    "🌱 Great start! You're building a foundation in networking concepts. Let's strengthen your basics step by step.",
    "📚 Every expert was once a beginner! Focus on understanding core concepts like LAN, WAN, and basic protocols.",
    "💪 Don't worry about the score – what matters is your willingness to learn. Let's master the fundamentals together!"
  ],
  intermediate: [
    "📈 Good progress! You have a solid grasp of networking basics. Now let's dive deeper into protocols and architecture.",
    "🎯 You're on the right track! Focus on understanding how different network layers work together.",
    "🔧 Nice work! Let's strengthen your understanding of TCP/IP and network security concepts."
  ],
  advanced: [
    "🌟 Excellent performance! You have strong networking knowledge. Ready for advanced topics and real-world applications!",
    "🏆 Outstanding! Your understanding of network concepts is impressive. Let's explore complex scenarios and optimizations.",
    "🚀 Amazing results! You're well-prepared for advanced networking challenges and certifications."
  ]
};

// Get random feedback message based on level
export function getRandomFeedback(level: 'beginner' | 'intermediate' | 'advanced'): string {
  const messages = feedbackMessages[level];
  return messages[Math.floor(Math.random() * messages.length)];
}

export const learningContentByLevel: Record<string, LearningContent> = {
  beginner: {
    level: 'beginner',
    title: "Computer Networks Fundamentals",
    explanation: `Welcome to your personalized learning journey! Based on your diagnostic quiz, we'll start with the fundamentals of Computer Networks.

**What is a Computer Network?**
A computer network is a collection of interconnected devices (computers, printers, servers) that can share data and resources with each other.

**Types of Networks:**
- **LAN (Local Area Network)**: Covers a small geographic area like a home or office
- **WAN (Wide Area Network)**: Covers large areas, like the Internet
- **MAN (Metropolitan Area Network)**: Spans a city or campus

**Basic Network Devices:**
- **Router**: Connects different networks together
- **Switch**: Connects devices within the same network
- **Hub**: Basic device that broadcasts data to all ports

**Key Concepts to Master:**
1. Network types (LAN, WAN, MAN)
2. Basic devices (Router, Switch, Hub)
3. IP addresses and their purpose
4. What protocols do (HTTP, FTP, SMTP)`,
    practiceQuestions: [
      "Explain the difference between a router and a switch.",
      "What type of network would you use to connect computers in your home?",
      "Why do computers need IP addresses?",
      "Draw a simple star topology network."
    ],
    tips: [
      "🎯 Start by understanding what each network device does",
      "📝 Create flashcards for common networking acronyms",
      "🔄 Practice identifying network components in your daily life",
      "💡 Remember: Routers connect networks, Switches connect devices"
    ]
  },
  intermediate: {
    level: 'intermediate',
    title: "Building Network Knowledge",
    explanation: `Great progress! You have a solid foundation. Let's build on that.

**The OSI Model (7 Layers)**
The OSI model standardizes network communication:

| Layer | Name | Function |
|-------|------|----------|
| 7 | Application | User interface (HTTP, FTP) |
| 6 | Presentation | Data formatting |
| 5 | Session | Connection management |
| 4 | Transport | Reliable delivery (TCP/UDP) |
| 3 | Network | Routing (IP addresses) |
| 2 | Data Link | MAC addresses, Switches |
| 1 | Physical | Cables, signals |

**Important Protocols:**
- **TCP**: Reliable, connection-oriented (like a phone call)
- **UDP**: Fast, connectionless (like sending mail)
- **HTTP/HTTPS**: Web communication
- **DNS**: Domain name to IP translation

**Network Security Basics:**
\`\`\`
Firewall → Filters traffic
Encryption → Protects data
VPN → Secure remote access
\`\`\``,
    practiceQuestions: [
      "List all 7 layers of the OSI model and their main functions.",
      "Explain the difference between TCP and UDP with examples.",
      "What happens when you type a website URL in your browser?",
      "How does a firewall protect a network?"
    ],
    tips: [
      "🏗️ Memorize OSI layers: Please Do Not Throw Sausage Pizza Away",
      "📚 Compare TCP vs UDP – know when to use each",
      "🧪 Use command prompt tools like ping and traceroute",
      "🔍 Study how DNS resolution works step by step"
    ]
  },
  advanced: {
    level: 'advanced',
    title: "Mastering Network Concepts",
    explanation: `Excellent! You're ready for advanced networking challenges.

**Subnetting & IP Addressing**
Understanding subnetting is crucial for network design:

\`\`\`
IP Address: 192.168.1.100
Subnet Mask: 255.255.255.0
Network: 192.168.1.0
Broadcast: 192.168.1.255
\`\`\`

**Advanced Protocols:**
- **BGP**: Border Gateway Protocol (Internet backbone)
- **OSPF**: Open Shortest Path First (routing)
- **SNMP**: Network management
- **SSL/TLS**: Secure communications

**Network Architecture Concepts:**
- **Three-tier architecture**: Access, Distribution, Core
- **Software-Defined Networking (SDN)**
- **Network virtualization**

**Security Deep Dive:**
\`\`\`
IDS/IPS → Intrusion Detection/Prevention
DMZ → Demilitarized Zone
ACL → Access Control Lists
NAT → Network Address Translation
\`\`\``,
    practiceQuestions: [
      "Calculate the number of usable hosts in a /24 subnet.",
      "Design a network topology for a small business with 3 departments.",
      "Explain how NAT helps with IPv4 address exhaustion.",
      "Compare and contrast IDS and IPS systems."
    ],
    tips: [
      "🎯 Practice subnetting calculations regularly",
      "📖 Study for networking certifications (CCNA, Network+)",
      "🤝 Set up a home lab to practice configurations",
      "🧠 Understand the difference between Layer 2 and Layer 3"
    ]
  }
};

export const aiGeneratedSuggestions = {
  lowEngagement: [
    "🎮 Try our interactive network simulation to visualize concepts!",
    "📹 Watch this 5-minute video on how the Internet works",
    "🏆 Complete today's mini-challenge on network devices!",
    "👥 Join a study group session on OSI model basics",
    "⏰ Set a reminder to practice for just 10 minutes tomorrow"
  ],
  mediumEngagement: [
    "📈 You're doing well! Try the TCP/IP protocol challenge",
    "🎯 Focus on understanding subnetting for 15 minutes",
    "💡 Explore the network security bonus content",
    "🔄 Review the OSI model layers to reinforce learning"
  ],
  highEngagement: [
    "🌟 Amazing progress! Ready for advanced routing challenges?",
    "🏅 You've earned a networking streak badge!",
    "📚 Explore CCNA-level materials",
    "🤝 Consider helping peers with basic networking concepts"
  ]
};
