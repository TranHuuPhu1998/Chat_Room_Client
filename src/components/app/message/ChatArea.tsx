import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import type { Student, Message } from '@/lib/types';

interface ChatAreaProps {
  student: Student;
  messages: Message[];
  message: string;
  isConnected: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  onMessageChange: (value: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
}

export function ChatArea({
  student,
  messages,
  message,
  isConnected,
  messagesEndRef,
  onMessageChange,
  onSendMessage,
}: ChatAreaProps) {
  return (
    <>
      <ChatHeader student={student} />
      <MessageList
        messages={messages}
        student={student}
        messagesEndRef={messagesEndRef}
      />
      <ChatInput
        message={message}
        isConnected={isConnected}
        onMessageChange={onMessageChange}
        onSubmit={onSendMessage}
      />
    </>
  );
}

