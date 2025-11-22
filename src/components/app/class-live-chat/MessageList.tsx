import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageListEmpty } from './MessageListEmpty';
import { MessageItem } from './MessageItem';
import type { Message, Student } from '@/lib/types';

interface MessageListProps {
  messages: Message[];
  student: Student;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export function MessageList({ messages, student, messagesEndRef }: MessageListProps) {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.length === 0 ? (
          <MessageListEmpty studentName={student.name} />
        ) : (
          messages.map((msg) => (
            <MessageItem
              key={msg.id}
              message={msg}
              studentAvatar={student.avatar}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
}

