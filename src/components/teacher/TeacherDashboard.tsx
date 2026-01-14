import { useState } from 'react';
import { StudentData } from '@/types/learning';
import { mockStudents, mockAlerts } from '@/data/mockStudents';
import { StudentTable } from './StudentTable';
import { AlertsPanel } from './AlertsPanel';
import { StudentDetailModal } from './StudentDetailModal';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  GraduationCap,
  LogOut,
  BarChart3,
  Bell
} from 'lucide-react';

interface TeacherDashboardProps {
  onLogout: () => void;
}

export function TeacherDashboard({ onLogout }: TeacherDashboardProps) {
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSelectStudent = (student: StudentData) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  // Calculate stats
  const totalStudents = mockStudents.length;
  const highRiskCount = mockStudents.filter(s => s.riskLevel === 'high').length;
  const lowEngagementCount = mockStudents.filter(s => s.engagementData.engagementScore === 'low').length;
  const avgScore = Math.round(mockStudents.reduce((acc, s) => acc + s.quizScore, 0) / totalStudents);

  const stats = [
    { 
      label: 'Total Students', 
      value: totalStudents, 
      icon: Users, 
      color: 'bg-primary/10 text-primary' 
    },
    { 
      label: 'High Risk', 
      value: highRiskCount, 
      icon: AlertTriangle, 
      color: 'bg-destructive/10 text-destructive' 
    },
    { 
      label: 'Low Engagement', 
      value: lowEngagementCount, 
      icon: TrendingUp, 
      color: 'bg-warning/10 text-warning' 
    },
    { 
      label: 'Avg. Score', 
      value: `${avgScore}%`, 
      icon: BarChart3, 
      color: 'bg-success/10 text-success' 
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display font-bold text-foreground">Smart Learning</h1>
                <p className="text-xs text-muted-foreground">Teacher Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                  {mockAlerts.filter(a => a.severity === 'high').length}
                </span>
              </Button>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Exit
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className="p-5 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Student Table */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-bold text-foreground">
                Student Overview
              </h2>
              <Badge variant="secondary">
                {totalStudents} students
              </Badge>
            </div>
            <StudentTable 
              students={mockStudents} 
              onSelectStudent={handleSelectStudent}
            />
          </div>

          {/* Alerts Panel */}
          <div className="lg:col-span-1">
            <AlertsPanel alerts={mockAlerts} />
          </div>
        </div>

        {/* Risk Summary */}
        <Card className="mt-8 p-6">
          <h3 className="font-display font-semibold text-foreground mb-4">
            Risk Level Distribution
          </h3>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-sm text-muted-foreground">Low Risk</span>
                <span className="text-sm font-medium ml-auto">
                  {mockStudents.filter(s => s.riskLevel === 'low').length} students
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-full bg-success rounded-full transition-all"
                  style={{ 
                    width: `${(mockStudents.filter(s => s.riskLevel === 'low').length / totalStudents) * 100}%` 
                  }}
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-warning" />
                <span className="text-sm text-muted-foreground">Moderate Risk</span>
                <span className="text-sm font-medium ml-auto">
                  {mockStudents.filter(s => s.riskLevel === 'moderate').length} students
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-full bg-warning rounded-full transition-all"
                  style={{ 
                    width: `${(mockStudents.filter(s => s.riskLevel === 'moderate').length / totalStudents) * 100}%` 
                  }}
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <span className="text-sm text-muted-foreground">High Risk</span>
                <span className="text-sm font-medium ml-auto">
                  {mockStudents.filter(s => s.riskLevel === 'high').length} students
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-full bg-destructive rounded-full transition-all"
                  style={{ 
                    width: `${(mockStudents.filter(s => s.riskLevel === 'high').length / totalStudents) * 100}%` 
                  }}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Future Scope Note */}
        <Card className="mt-8 p-6 border-dashed border-2">
          <h3 className="font-display font-semibold text-foreground mb-3">
            🔮 Future Scope (Prototype Note)
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Full implementation using React for frontend (current demo)</li>
            <li>• Firebase/Supabase for authentication and real-time database</li>
            <li>• Machine learning models for advanced prediction (TensorFlow.js)</li>
            <li>• Natural Language Processing for AI-generated explanations</li>
            <li>• Real-time collaboration features for peer learning</li>
          </ul>
        </Card>
      </main>

      {/* Student Detail Modal */}
      <StudentDetailModal
        student={selectedStudent}
        open={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
