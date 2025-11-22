import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Student } from '@/lib/types';

interface StudentItemProps {
  student: Student;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

export function StudentItem({ student, isSelected, onClick, index }: StudentItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: 'easeOut',
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        variant={isSelected ? 'secondary' : 'ghost'}
        className="w-full justify-start gap-3 h-12 transition-all max-md:px-0"
        onClick={onClick}
      >
        <Avatar>
          <AvatarImage src={student.avatar} data-ai-hint="person face" />
          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="truncate">{student.name}</span>
      </Button>
    </motion.div>
  );
}

