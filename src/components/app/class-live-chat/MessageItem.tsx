import { motion } from 'framer-motion';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { Message } from '@/lib/types';

interface MessageItemProps {
  message: Message;
  studentAvatar?: string;
}

export function MessageItem({ message, studentAvatar }: MessageItemProps) {
  const isInstructor = message.sender === 'instructor';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'flex items-end gap-2',
        isInstructor ? 'justify-end' : 'justify-start'
      )}
    >
      {!isInstructor && studentAvatar && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={studentAvatar} />
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-xs rounded-lg p-3 text-sm',
          isInstructor
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted'
        )}
      >
        <p>{message.text}</p>
        <p
          className={cn(
            'text-xs mt-1',
            isInstructor
              ? 'text-primary-foreground/70'
              : 'text-muted-foreground/70'
          )}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
      {isInstructor && (
        <Avatar className="h-8 w-8">
          <AvatarImage
            src="https://placehold.co/100x100.png"
            data-ai-hint="person face"
          />
        </Avatar>
      )}
    </motion.div>
  );
}

