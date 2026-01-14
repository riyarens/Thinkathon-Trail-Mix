import { EngagementData, EngagementLevel } from '@/types/learning';
import { generateEngagementSuggestions } from '@/lib/learningUtils';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  MousePointerClick, 
  BookCheck, 
  ClipboardCheck,
  TrendingUp,
  Sparkles,
  Zap
} from 'lucide-react';

interface EngagementTrackerProps {
  data: EngagementData;
}

export function EngagementTracker({ data }: EngagementTrackerProps) {
  const suggestions = generateEngagementSuggestions(data.engagementScore);

  const getEngagementBadgeVariant = (level: EngagementLevel) => {
    switch (level) {
      case 'high': return 'engagementHigh';
      case 'medium': return 'engagementMedium';
      case 'low': return 'engagementLow';
    }
  };

  const getEngagementColor = (level: EngagementLevel) => {
    switch (level) {
      case 'high': return 'text-success';
      case 'medium': return 'text-warning';
      case 'low': return 'text-destructive';
    }
  };

  const getProgressColor = (level: EngagementLevel) => {
    switch (level) {
      case 'high': return 'bg-success';
      case 'medium': return 'bg-warning';
      case 'low': return 'bg-destructive';
    }
  };

  const engagementPercentage = 
    data.engagementScore === 'high' ? 85 :
    data.engagementScore === 'medium' ? 55 : 25;

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
              data.engagementScore === 'high' ? 'bg-success/10' :
              data.engagementScore === 'medium' ? 'bg-warning/10' : 'bg-destructive/10'
            }`}>
              <TrendingUp className={`w-8 h-8 ${getEngagementColor(data.engagementScore)}`} />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground">
                Engagement Score
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={getEngagementBadgeVariant(data.engagementScore)} className="capitalize">
                  {data.engagementScore} Engagement
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-3xl font-display font-bold text-foreground">
                {engagementPercentage}%
              </p>
              <p className="text-sm text-muted-foreground">Overall Score</p>
            </div>
            <div className="w-24 h-24 relative">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${engagementPercentage * 2.51} 251`}
                  className={getEngagementColor(data.engagementScore)}
                />
              </svg>
            </div>
          </div>
        </div>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Time Spent</span>
          </div>
          <p className="text-2xl font-display font-bold text-foreground">
            {data.timeSpent}
            <span className="text-sm font-normal text-muted-foreground ml-1">min</span>
          </p>
          <Progress value={Math.min((data.timeSpent / 60) * 100, 100)} className="h-1.5 mt-3" />
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <ClipboardCheck className="w-5 h-5 text-success" />
            </div>
            <span className="text-sm text-muted-foreground">Quiz Attempts</span>
          </div>
          <p className="text-2xl font-display font-bold text-foreground">
            {data.quizAttempts}
          </p>
          <Progress value={Math.min((data.quizAttempts / 5) * 100, 100)} className="h-1.5 mt-3" />
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
              <MousePointerClick className="w-5 h-5 text-warning" />
            </div>
            <span className="text-sm text-muted-foreground">Interactions</span>
          </div>
          <p className="text-2xl font-display font-bold text-foreground">
            {data.interactionClicks}
          </p>
          <Progress value={Math.min((data.interactionClicks / 100) * 100, 100)} className="h-1.5 mt-3" />
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-beginner/10 flex items-center justify-center">
              <BookCheck className="w-5 h-5 text-beginner" />
            </div>
            <span className="text-sm text-muted-foreground">Lessons Done</span>
          </div>
          <p className="text-2xl font-display font-bold text-foreground">
            {data.lessonsCompleted}
          </p>
          <Progress value={Math.min((data.lessonsCompleted / 10) * 100, 100)} className="h-1.5 mt-3" />
        </Card>
      </div>

      {/* AI Suggestions */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground">
              AI-Powered Suggestions
            </h3>
            <p className="text-sm text-muted-foreground">
              Personalized recommendations to boost your engagement
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-muted/50 border border-border hover:border-primary/30 hover:bg-muted transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-primary mt-0.5 group-hover:scale-110 transition-transform" />
                <p className="text-sm text-foreground">{suggestion}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
