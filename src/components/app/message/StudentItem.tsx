import * as React from 'react';
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

function StudentItemComponent({ student, isSelected, onClick, index }: StudentItemProps) {
  // Only animate on initial mount, not on every render
  const [hasAnimated, setHasAnimated] = React.useState(false);

  React.useEffect(() => {
    if (!hasAnimated) {
      setHasAnimated(true);
    }
  }, [hasAnimated]);

  return (
    <motion.div
      initial={hasAnimated ? false : { opacity: 0, x: -20 }}
      animate={hasAnimated ? {} : { opacity: 1, x: 0 }}
      transition={
        hasAnimated
          ? {}
          : {
              duration: 0.2,
              delay: Math.min(index * 0.03, 0.3), // Cap delay to prevent long animations
              ease: 'easeOut',
            }
      }
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <Button
        variant={isSelected ? 'secondary' : 'ghost'}
        className="w-full justify-start gap-3 h-12 transition-all"
        onClick={onClick}
      >
        <Avatar>
          <AvatarImage src={student.avatar} data-ai-hint="person face" loading="lazy" />
          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="truncate">{student.name}</span>
      </Button>
    </motion.div>
  );
}

export const StudentItem = React.memo(StudentItemComponent);

