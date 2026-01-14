import { StudentData, Alert } from '@/types/learning';

export const mockStudents: StudentData[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    email: 'emma.j@school.edu',
    learningLevel: 'beginner',
    quizScore: 35,
    assignmentCompletion: false,
    loginFrequency: 1,
    engagementData: {
      timeSpent: 15,
      quizAttempts: 1,
      interactionClicks: 12,
      lessonsCompleted: 1,
      engagementScore: 'low'
    },
    riskLevel: 'high',
    lastActive: '3 days ago'
  },
  {
    id: '2',
    name: 'Liam Smith',
    email: 'liam.s@school.edu',
    learningLevel: 'intermediate',
    quizScore: 65,
    assignmentCompletion: true,
    loginFrequency: 4,
    engagementData: {
      timeSpent: 45,
      quizAttempts: 3,
      interactionClicks: 78,
      lessonsCompleted: 5,
      engagementScore: 'medium'
    },
    riskLevel: 'moderate',
    lastActive: '1 day ago'
  },
  {
    id: '3',
    name: 'Olivia Brown',
    email: 'olivia.b@school.edu',
    learningLevel: 'advanced',
    quizScore: 92,
    assignmentCompletion: true,
    loginFrequency: 7,
    engagementData: {
      timeSpent: 120,
      quizAttempts: 5,
      interactionClicks: 245,
      lessonsCompleted: 12,
      engagementScore: 'high'
    },
    riskLevel: 'low',
    lastActive: 'Just now'
  },
  {
    id: '4',
    name: 'Noah Davis',
    email: 'noah.d@school.edu',
    learningLevel: 'beginner',
    quizScore: 28,
    assignmentCompletion: false,
    loginFrequency: 2,
    engagementData: {
      timeSpent: 20,
      quizAttempts: 1,
      interactionClicks: 18,
      lessonsCompleted: 2,
      engagementScore: 'low'
    },
    riskLevel: 'high',
    lastActive: '5 days ago'
  },
  {
    id: '5',
    name: 'Ava Wilson',
    email: 'ava.w@school.edu',
    learningLevel: 'intermediate',
    quizScore: 72,
    assignmentCompletion: true,
    loginFrequency: 5,
    engagementData: {
      timeSpent: 65,
      quizAttempts: 4,
      interactionClicks: 112,
      lessonsCompleted: 7,
      engagementScore: 'high'
    },
    riskLevel: 'low',
    lastActive: '2 hours ago'
  },
  {
    id: '6',
    name: 'Mason Taylor',
    email: 'mason.t@school.edu',
    learningLevel: 'beginner',
    quizScore: 45,
    assignmentCompletion: true,
    loginFrequency: 3,
    engagementData: {
      timeSpent: 35,
      quizAttempts: 2,
      interactionClicks: 45,
      lessonsCompleted: 4,
      engagementScore: 'medium'
    },
    riskLevel: 'moderate',
    lastActive: '1 day ago'
  },
  {
    id: '7',
    name: 'Sophia Martinez',
    email: 'sophia.m@school.edu',
    learningLevel: 'advanced',
    quizScore: 88,
    assignmentCompletion: true,
    loginFrequency: 6,
    engagementData: {
      timeSpent: 95,
      quizAttempts: 6,
      interactionClicks: 198,
      lessonsCompleted: 10,
      engagementScore: 'high'
    },
    riskLevel: 'low',
    lastActive: '4 hours ago'
  },
  {
    id: '8',
    name: 'James Anderson',
    email: 'james.a@school.edu',
    learningLevel: 'intermediate',
    quizScore: 55,
    assignmentCompletion: false,
    loginFrequency: 2,
    engagementData: {
      timeSpent: 25,
      quizAttempts: 2,
      interactionClicks: 32,
      lessonsCompleted: 3,
      engagementScore: 'low'
    },
    riskLevel: 'high',
    lastActive: '4 days ago'
  }
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'risk',
    severity: 'high',
    studentId: '1',
    studentName: 'Emma Johnson',
    message: 'Student has not logged in for 3 days and quiz score is below 40%',
    timestamp: '2 hours ago',
    aiSuggestion: 'Consider reaching out personally. Offer a one-on-one tutoring session and simpler practice exercises.'
  },
  {
    id: '2',
    type: 'risk',
    severity: 'high',
    studentId: '4',
    studentName: 'Noah Davis',
    message: 'Lowest quiz score in class (28%) and missed last assignment',
    timestamp: '5 hours ago',
    aiSuggestion: 'Recommend foundational review materials. Consider pairing with a peer mentor from the advanced group.'
  },
  {
    id: '3',
    type: 'engagement',
    severity: 'medium',
    studentId: '8',
    studentName: 'James Anderson',
    message: 'Engagement dropped by 40% this week',
    timestamp: '1 day ago',
    aiSuggestion: 'Try interactive coding challenges instead of reading materials. Schedule a check-in to understand any blockers.'
  },
  {
    id: '4',
    type: 'achievement',
    severity: 'low',
    studentId: '3',
    studentName: 'Olivia Brown',
    message: 'Completed all advanced modules with 92% accuracy!',
    timestamp: '3 hours ago',
    aiSuggestion: 'Excellent candidate for peer tutoring program. Consider recommending additional challenge projects.'
  },
  {
    id: '5',
    type: 'engagement',
    severity: 'high',
    studentId: '1',
    studentName: 'Emma Johnson',
    message: 'Only 12 interaction clicks recorded this week',
    timestamp: '6 hours ago',
    aiSuggestion: 'Content may be too difficult. Recommend adaptive learning path with more visual explanations.'
  }
];
