import { useState } from 'react';
import { LearningLevel, QuizResult } from '@/types/learning';
import { learningContentByLevel } from '@/data/quizData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Lightbulb, 
  Target, 
  CheckCircle2,
  ChevronRight,
  Star,
  Trophy,
  Sparkles
} from 'lucide-react';

interface PersonalizedLearningProps {
  quizResult: QuizResult;
  onInteraction: () => void;
}

export function PersonalizedLearning({ quizResult, onInteraction }: PersonalizedLearningProps) {
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [expandedTip, setExpandedTip] = useState<number | null>(null);

  const content = learningContentByLevel[quizResult.learningLevel];
  const totalSections = 4; // explanation, practice, tips, quiz
  const progress = (completedSections.length / totalSections) * 100;

  const handleSectionComplete = (section: string) => {
    onInteraction();
    if (!completedSections.includes(section)) {
      setCompletedSections([...completedSections, section]);
    }
  };

  const handleTipClick = (index: number) => {
    onInteraction();
    setExpandedTip(expandedTip === index ? null : index);
  };

  const getLevelBadgeVariant = (level: LearningLevel) => {
    switch (level) {
      case 'beginner': return 'beginner';
      case 'intermediate': return 'intermediate';
      case 'advanced': return 'advanced';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant={getLevelBadgeVariant(quizResult.learningLevel)} className="capitalize">
                {quizResult.learningLevel} Level
              </Badge>
              <span className="text-sm text-muted-foreground">
                Score: {quizResult.percentage}%
              </span>
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              {content.title}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Lesson Progress</p>
              <p className="text-lg font-semibold text-foreground">{Math.round(progress)}%</p>
            </div>
            <div className="w-24">
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Explanation Section */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-display font-semibold text-foreground">
                    Lesson Content
                  </h2>
                  {completedSections.includes('explanation') && (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  )}
                </div>
                
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <div className="whitespace-pre-wrap">
                    {content.explanation}
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => handleSectionComplete('explanation')}
                >
                  {completedSections.includes('explanation') ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      Completed
                    </>
                  ) : (
                    <>
                      Mark as Complete
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>

          {/* Practice Questions */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center shrink-0">
                <Target className="w-5 h-5 text-success" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-display font-semibold text-foreground">
                    Practice Questions
                  </h2>
                  {completedSections.includes('practice') && (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  )}
                </div>
                
                <div className="space-y-3">
                  {content.practiceQuestions.map((question, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-xl bg-muted/50 border border-border hover:border-primary/30 transition-colors cursor-pointer"
                      onClick={onInteraction}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center shrink-0">
                          {index + 1}
                        </span>
                        <p className="text-foreground">{question}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => handleSectionComplete('practice')}
                >
                  {completedSections.includes('practice') ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      Completed
                    </>
                  ) : (
                    <>
                      Mark as Complete
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tips Card */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-warning" />
              </div>
              <h3 className="font-display font-semibold text-foreground">
                Learning Tips
              </h3>
            </div>
            
            <div className="space-y-2">
              {content.tips.map((tip, index) => (
                <button
                  key={index}
                  onClick={() => handleTipClick(index)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    expandedTip === index 
                      ? 'bg-warning/10 border border-warning/30' 
                      : 'bg-muted/50 hover:bg-muted border border-transparent'
                  }`}
                >
                  <p className="text-sm text-foreground">{tip}</p>
                </button>
              ))}
            </div>
          </Card>

          {/* Achievement Card */}
          <Card className="p-6 gradient-primary text-primary-foreground">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-6 h-6" />
              <h3 className="font-display font-semibold">Your Progress</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm opacity-90">Sections Completed</span>
                <span className="font-semibold">{completedSections.length}/{totalSections}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm opacity-90">Quiz Score</span>
                <span className="font-semibold">{quizResult.percentage}%</span>
              </div>

              <div className="pt-4 border-t border-primary-foreground/20">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  <span className="text-sm">
                    {completedSections.length >= 3 
                      ? "Great job! Keep going!" 
                      : "Complete more sections to earn stars!"}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* AI Suggestion Card */}
          <Card className="p-6 border-dashed border-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-beginner/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-beginner" />
              </div>
              <h3 className="font-display font-semibold text-foreground">
                AI Recommendation
              </h3>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              {quizResult.learningLevel === 'beginner' && 
                "Focus on understanding the basics first. Don't rush - solid foundations lead to faster progress later!"}
              {quizResult.learningLevel === 'intermediate' && 
                "You're doing great! Challenge yourself with the practice questions and try explaining concepts to others."}
              {quizResult.learningLevel === 'advanced' && 
                "Ready for advanced challenges? Try implementing the concepts in a real project or help other students."}
            </p>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={onInteraction}
            >
              Get More Suggestions
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
