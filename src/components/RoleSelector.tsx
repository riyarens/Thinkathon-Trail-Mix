import { UserRole } from '@/types/learning';
import { Button } from '@/components/ui/button';
import { GraduationCap, Users } from 'lucide-react';
interface RoleSelectorProps {
  onSelectRole: (role: UserRole) => void;
}
export function RoleSelector({
  onSelectRole
}: RoleSelectorProps) {
  return <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-primary mb-6 shadow-glow">
            <GraduationCap className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            ​MindSpark  
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AI-powered personalized learning and early intervention system for better educational outcomes
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-6 animate-slide-up" style={{
        animationDelay: '0.2s'
      }}>
          {/* Student Card */}
          <button onClick={() => onSelectRole('student')} className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg text-left">
            <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-3">
                I'm a Student
              </h2>
              <p className="text-muted-foreground mb-6">
                Take diagnostic quizzes, access personalized learning content, and track your progress
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Diagnostic assessment
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Personalized learning paths
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Engagement tracking
                </li>
              </ul>
              <div className="mt-6">
                <Button variant="student" className="w-full">
                  Continue as Student
                </Button>
              </div>
            </div>
          </button>

          {/* Teacher Card */}
          <button onClick={() => onSelectRole('teacher')} className="group relative p-8 rounded-2xl bg-card border border-border hover:border-beginner/50 transition-all duration-300 hover:shadow-lg text-left">
            <div className="absolute inset-0 rounded-2xl bg-beginner/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-beginner/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-beginner" />
              </div>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-3">
                I'm a Teacher
              </h2>
              <p className="text-muted-foreground mb-6">
                Monitor student progress, identify at-risk learners, and get AI-powered insights
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-beginner" />
                  Student performance dashboard
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-beginner" />
                  Risk detection alerts
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-beginner" />
                  AI-generated insights
                </li>
              </ul>
              <div className="mt-6">
                <Button variant="teacher" className="w-full">
                  Continue as Teacher
                </Button>
              </div>
            </div>
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-muted-foreground mt-12 animate-fade-in" style={{
        animationDelay: '0.4s'
      }}>
          🎓 This is a prototype demonstrating AI-powered educational support without machine learning
        </p>
      </div>
    </div>;
}