import { LearningLevel, EngagementLevel, RiskLevel, EngagementData } from '@/types/learning';

/**
 * Calculate learning level based on quiz score percentage
 * Rule-based classification without ML
 */
export function calculateLearningLevel(percentage: number): LearningLevel {
  if (percentage <= 40) return 'beginner';
  if (percentage <= 70) return 'intermediate';
  return 'advanced';
}

/**
 * Calculate engagement score based on interaction metrics
 * Uses weighted rules to determine engagement level
 */
export function calculateEngagementScore(data: {
  timeSpent: number;
  quizAttempts: number;
  interactionClicks: number;
  lessonsCompleted: number;
}): EngagementLevel {
  // Weighted scoring system
  let score = 0;
  
  // Time spent (max 30 points)
  if (data.timeSpent >= 60) score += 30;
  else if (data.timeSpent >= 30) score += 20;
  else if (data.timeSpent >= 15) score += 10;
  
  // Quiz attempts (max 25 points)
  if (data.quizAttempts >= 4) score += 25;
  else if (data.quizAttempts >= 2) score += 15;
  else if (data.quizAttempts >= 1) score += 5;
  
  // Interaction clicks (max 25 points)
  if (data.interactionClicks >= 100) score += 25;
  else if (data.interactionClicks >= 50) score += 15;
  else if (data.interactionClicks >= 20) score += 5;
  
  // Lessons completed (max 20 points)
  if (data.lessonsCompleted >= 8) score += 20;
  else if (data.lessonsCompleted >= 4) score += 12;
  else if (data.lessonsCompleted >= 2) score += 5;
  
  // Classify based on total score
  if (score >= 70) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
}

/**
 * Calculate risk level for a student
 * Rule-based detection for at-risk students
 */
export function calculateRiskLevel(data: {
  quizScore: number;
  assignmentCompletion: boolean;
  loginFrequency: number; // days active in last 7 days
}): RiskLevel {
  let riskScore = 0;
  
  // Quiz score impact
  if (data.quizScore < 40) riskScore += 3;
  else if (data.quizScore < 60) riskScore += 2;
  else if (data.quizScore < 70) riskScore += 1;
  
  // Assignment completion
  if (!data.assignmentCompletion) riskScore += 2;
  
  // Login frequency (out of 7 days)
  if (data.loginFrequency <= 1) riskScore += 3;
  else if (data.loginFrequency <= 3) riskScore += 1;
  
  // Classify risk
  if (riskScore >= 5) return 'high';
  if (riskScore >= 3) return 'moderate';
  return 'low';
}

/**
 * Generate AI-like suggestions based on engagement level
 */
export function generateEngagementSuggestions(level: EngagementLevel): string[] {
  const suggestions: Record<EngagementLevel, string[]> = {
    low: [
      "🎮 Try our interactive coding mini-game to make learning fun!",
      "📹 Switch to video lessons - they might work better for your learning style",
      "⏰ Set a daily 10-minute learning reminder",
      "🎯 Start with a quick 3-question practice quiz",
      "👥 Join a live study session with other students"
    ],
    medium: [
      "📈 Great progress! Push yourself with a slightly harder challenge",
      "🏆 You're close to earning a streak badge - log in tomorrow!",
      "💡 Explore the bonus coding puzzles section",
      "🔄 Quick review of yesterday's topic will boost retention"
    ],
    high: [
      "🌟 Outstanding! Ready for our advanced challenge mode?",
      "🏅 You've earned top learner status this week!",
      "🤝 Consider helping peers as a student mentor",
      "📚 Unlock exclusive deep-dive content"
    ]
  };
  
  return suggestions[level];
}

/**
 * Generate AI insights for teachers about a student
 */
export function generateStudentInsight(student: {
  name: string;
  learningLevel: LearningLevel;
  quizScore: number;
  engagementScore: EngagementLevel;
  riskLevel: RiskLevel;
}): string {
  const insights: string[] = [];
  
  if (student.riskLevel === 'high') {
    insights.push(`⚠️ ${student.name} needs immediate attention.`);
    if (student.quizScore < 40) {
      insights.push('Consider scheduling a one-on-one session to review fundamentals.');
    }
    if (student.engagementScore === 'low') {
      insights.push('Try alternative learning formats like videos or interactive exercises.');
    }
  } else if (student.riskLevel === 'moderate') {
    insights.push(`📊 ${student.name} is showing some concerning patterns.`);
    insights.push('A brief check-in conversation might help identify any blockers.');
  } else {
    insights.push(`✅ ${student.name} is performing well.`);
    if (student.learningLevel === 'advanced') {
      insights.push('Consider offering mentorship opportunities or advanced projects.');
    }
  }
  
  return insights.join(' ');
}

/**
 * Get color class for learning level
 */
export function getLevelColorClass(level: LearningLevel): string {
  const classes: Record<LearningLevel, string> = {
    beginner: 'level-beginner',
    intermediate: 'level-intermediate',
    advanced: 'level-advanced'
  };
  return classes[level];
}

/**
 * Get color class for risk level
 */
export function getRiskColorClass(level: RiskLevel): string {
  const classes: Record<RiskLevel, string> = {
    high: 'risk-high',
    moderate: 'risk-moderate',
    low: 'risk-low'
  };
  return classes[level];
}

/**
 * Get color class for engagement level
 */
export function getEngagementColorClass(level: EngagementLevel): string {
  const classes: Record<EngagementLevel, string> = {
    high: 'engagement-high',
    medium: 'engagement-medium',
    low: 'engagement-low'
  };
  return classes[level];
}
