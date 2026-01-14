import { StudentData } from '@/types/learning';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface StudentTableProps {
  students: StudentData[];
  onSelectStudent: (student: StudentData) => void;
}

export function StudentTable({ students, onSelectStudent }: StudentTableProps) {
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

  const getEngagementVariant = (level: string) => {
    switch (level) {
      case 'high': return 'engagementHigh';
      case 'medium': return 'engagementMedium';
      case 'low': return 'engagementLow';
      default: return 'secondary';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Student</TableHead>
            <TableHead className="font-semibold">Learning Level</TableHead>
            <TableHead className="font-semibold">Quiz Score</TableHead>
            <TableHead className="font-semibold">Engagement</TableHead>
            <TableHead className="font-semibold">Risk Level</TableHead>
            <TableHead className="font-semibold">Last Active</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow 
              key={student.id}
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => onSelectStudent(student)}
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {getInitials(student.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={getLevelVariant(student.learningLevel)} className="capitalize">
                  {student.learningLevel}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    student.quizScore >= 70 ? 'bg-success' :
                    student.quizScore >= 40 ? 'bg-warning' : 'bg-destructive'
                  }`} />
                  <span className="font-medium">{student.quizScore}%</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={getEngagementVariant(student.engagementData.engagementScore)} className="capitalize">
                  {student.engagementData.engagementScore}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={getRiskVariant(student.riskLevel)} className="capitalize">
                  {student.riskLevel}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">{student.lastActive}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
