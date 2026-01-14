import { useState } from 'react';
import { UserRole } from '@/types/learning';
import { RoleSelector } from '@/components/RoleSelector';
import { StudentDashboard } from '@/components/student/StudentDashboard';
import { TeacherDashboard } from '@/components/teacher/TeacherDashboard';

const Index = () => {
  const [role, setRole] = useState<UserRole | null>(null);

  const handleSelectRole = (selectedRole: UserRole) => {
    setRole(selectedRole);
  };

  const handleLogout = () => {
    setRole(null);
  };

  if (!role) {
    return <RoleSelector onSelectRole={handleSelectRole} />;
  }

  if (role === 'student') {
    return <StudentDashboard onLogout={handleLogout} />;
  }

  return <TeacherDashboard onLogout={handleLogout} />;
};

export default Index;
