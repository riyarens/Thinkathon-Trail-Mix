import { StudentData } from '@/types/learning';
import { generateStudentInsight } from '@/lib/learningUtils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { 
  Clock, 
  MousePointerClick, 
  BookCheck, 
  ClipboardCheck,
  Sparkles,
  Calendar,
  CheckCircle2,
  XCircle
} from 'lucide-react';

interface StudentDetailModalProps {
  student: StudentData | null;
  open: boolean;
  onClose: () => void;
}

export function StudentDetailModal({ student, open, onClose }: StudentDetailModalProps) {
  if (!student) return null;

  const insight = generateStudentInsight({
    name: student.name,
    learningLevel: student.learningLevel,
    quizScore: student.quizScore,
    engagementScore: student.engagementData.engagementScore,
    riskLevel: student.riskLevel
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getLevelVariant = (level: string) => {
    switch (level) {
      case 'beginner': return 'beginner';
      case 'intermediate': return 'intermediate';
      case 'advanced': return 'advanced';
      default: return 'secondary';
    }
  };

  const getRiskVariant = (level: string) => {
    switch (level) {
      case 'high': return 'riskHigh';
      case 'moderate': return 'riskModerate';
      case 'low': return 'riskLow';
      default: return 'secondary';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Student Details</DialogTitle>
        </DialogHeader>

        {/* Student Header */}
        <div className="flex items-start gap-4 pb-6 border-b border-border">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-primary/10 text-primary text-xl">
              {getInitials(student.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-xl font-display font-bold text-foreground">
              {student.name}
            </h2>
            <p className="text-sm text-muted-foreground mb-3">{student.email}</p>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={getLevelVariant(student.learningLevel)} className="capitalize">
                {student.learningLevel} Level
              </Badge>
              <Badge variant={getRiskVariant(student.riskLevel)} className="capitalize">
                {student.riskLevel} Risk
              </Badge>
            </div>
          </div>
        </div>

        {/* AI Insight */}
        <Card className="p-4 border-2 border-dashed border-primary/30 bg-primary/5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">AI Insight</h3>
              <p className="text-sm text-muted-foreground">{insight}</p>
            </div>
          </div>
        </Card>

        {/* Performance Metrics */}
        <div className="space-y-4">
          <h3 className="font-display font-semibold text-foreground">Performance Overview</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-muted/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Quiz Score</span>
                <span className="font-bold text-foreground">{student.quizScore}%</span>
              </div>
              <Progress value={student.quizScore} className="h-2" />
            </div>

            <div className="p-4 rounded-xl bg-muted/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Login Frequency</span>
                <span className="font-bold text-foreground">{student.loginFrequency}/7 days</span>
              </div>
              <Progress value={(student.loginFrequency / 7) * 100} className="h-2" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-muted/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Assignment Completion</span>
            </div>
            {student.assignmentCompletion ? (
              <div className="flex items-center gap-2 text-success">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">Completed</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-destructive">
                <XCircle className="w-5 h-5" />
                <span className="font-medium">Not Completed</span>
              </div>
            )}
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className="space-y-4">
          <h3 className="font-display font-semibold text-foreground">Engagement Metrics</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Time Spent</span>
              </div>
              <p className="text-xl font-bold text-foreground">
                {student.engagementData.timeSpent} min
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border">
              <div className="flex items-center gap-2 mb-2">
                <ClipboardCheck className="w-4 h-4 text-success" />
                <span className="text-sm text-muted-foreground">Quiz Attempts</span>
              </div>
              <p className="text-xl font-bold text-foreground">
                {student.engagementData.quizAttempts}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border">
              <div className="flex items-center gap-2 mb-2">
                <MousePointerClick className="w-4 h-4 text-warning" />
                <span className="text-sm text-muted-foreground">Interactions</span>
              </div>
              <p className="text-xl font-bold text-foreground">
                {student.engagementData.interactionClicks}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border">
              <div className="flex items-center gap-2 mb-2">
                <BookCheck className="w-4 h-4 text-beginner" />
                <span className="text-sm text-muted-foreground">Lessons Done</span>
              </div>
              <p className="text-xl font-bold text-foreground">
                {student.engagementData.lessonsCompleted}
              </p>
            </div>
          </div>
        </div>

        {/* Last Active */}
        <div className="pt-4 border-t border-border text-sm text-muted-foreground">
          Last active: {student.lastActive}
        </div>
      </DialogContent>
    </Dialog>
  );
}
