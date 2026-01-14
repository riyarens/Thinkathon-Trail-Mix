import { useState, useEffect } from 'react';
import { QuizResult, EngagementData } from '@/types/learning';
import { calculateEngagementScore } from '@/lib/learningUtils';
import { DiagnosticQuiz } from './DiagnosticQuiz';
import { PersonalizedLearning } from './PersonalizedLearning';
import { EngagementTracker } from './EngagementTracker';
import { Button } from '@/components/ui/button';
import { 
  GraduationCap, 
  BookOpen, 
  BarChart3, 
  ClipboardList,
  ArrowLeft,
  LogOut
} from 'lucide-react';

interface StudentDashboardProps {
  onLogout: () => void;
}

type StudentView = 'quiz' | 'learning' | 'engagement';

export function StudentDashboard({ onLogout }: StudentDashboardProps) {
  const [currentView, setCurrentView] = useState<StudentView>('quiz');
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [engagementData, setEngagementData] = useState<EngagementData>({
    timeSpent: 0,
    quizAttempts: 0,
    interactionClicks: 0,
    lessonsCompleted: 0,
    engagementScore: 'low'
  });

  // Track time spent
  useEffect(() => {
    const interval = setInterval(() => {
      setEngagementData(prev => {
        const newTimeSpent = prev.timeSpent + 1;
        const newData = { ...prev, timeSpent: newTimeSpent };
        newData.engagementScore = calculateEngagementScore(newData);
        return newData;
      });
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);
    setEngagementData(prev => {
      const newData = { 
        ...prev, 
        quizAttempts: prev.quizAttempts + 1,
        timeSpent: prev.timeSpent + 5 // Add quiz time
      };
      newData.engagementScore = calculateEngagementScore(newData);
      return newData;
    });
    setCurrentView('learning');
  };

  const handleInteraction = () => {
    setEngagementData(prev => {
      const newData = { 
        ...prev, 
        interactionClicks: prev.interactionClicks + 1 
      };
      newData.engagementScore = calculateEngagementScore(newData);
      return newData;
    });
  };

  const navItems = [
    { id: 'quiz' as const, label: 'Quiz', icon: ClipboardList, disabled: false },
    { id: 'learning' as const, label: 'Learning', icon: BookOpen, disabled: !quizResult },
    { id: 'engagement' as const, label: 'Engagement', icon: BarChart3, disabled: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display font-bold text-foreground">Smart Learning</h1>
                <p className="text-xs text-muted-foreground">Student Dashboard</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => !item.disabled && setCurrentView(item.id)}
                  disabled={item.disabled}
                  className="gap-2"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              ))}
            </nav>

            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Exit
            </Button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex md:hidden items-center gap-1 mt-4 overflow-x-auto pb-2">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={currentView === item.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => !item.disabled && setCurrentView(item.id)}
                disabled={item.disabled}
                className="gap-2 shrink-0"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentView === 'quiz' && (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">
                Diagnostic Assessment
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Complete this quiz to determine your current learning level. 
                Your personalized content will be based on your results.
              </p>
            </div>
            <DiagnosticQuiz onComplete={handleQuizComplete} />
          </div>
        )}

        {currentView === 'learning' && quizResult && (
          <div className="animate-fade-in">
            <PersonalizedLearning 
              quizResult={quizResult} 
              onInteraction={handleInteraction}
            />
          </div>
        )}

        {currentView === 'engagement' && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">
                Your Engagement
              </h2>
              <p className="text-muted-foreground">
                Track your learning activity and get personalized suggestions
              </p>
            </div>
            <EngagementTracker data={engagementData} />
          </div>
        )}
      </main>
    </div>
  );
}
