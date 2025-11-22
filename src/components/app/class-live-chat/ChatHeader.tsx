import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Student } from '@/lib/types';

interface ChatHeaderProps {
  student: Student;
}

export function ChatHeader({ student }: ChatHeaderProps) {
  return (
    <div className="flex items-center gap-4 p-3 border-b">
      <Avatar>
        <AvatarImage src={student.avatar} data-ai-hint="person face" />
        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <h3 className="text-lg font-semibold">{student.name}</h3>
    </div>
  );
}

