export type LearningLevel = 'beginner' | 'intermediate' | 'advanced';
export type EngagementLevel = 'high' | 'medium' | 'low';
export type RiskLevel = 'high' | 'moderate' | 'low';
export type UserRole = 'student' | 'teacher';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: LearningLevel;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  learningLevel: LearningLevel;
  answers: number[];
}

export interface LearningContent {
  level: LearningLevel;
  title: string;
  explanation: string;
  practiceQuestions: string[];
  tips: string[];
}

export interface EngagementData {
  timeSpent: number; // in minutes
  quizAttempts: number;
  interactionClicks: number;
  lessonsCompleted: number;
  engagementScore: EngagementLevel;
}

export interface StudentData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  learningLevel: LearningLevel;
  quizScore: number;
  assignmentCompletion: boolean;
  loginFrequency: number; // days active in last 7 days
  engagementData: EngagementData;
  riskLevel: RiskLevel;
  lastActive: string;
}

export interface Alert {
  id: string;
  type: 'risk' | 'engagement' | 'achievement';
  severity: 'high' | 'medium' | 'low';
  studentId: string;
  studentName: string;
  message: string;
  timestamp: string;
  aiSuggestion?: string;
}
