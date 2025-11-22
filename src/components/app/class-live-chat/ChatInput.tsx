import { SendHorizonal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatInputProps {
  message: string;
  isConnected: boolean;
  onMessageChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ChatInput({
  message,
  isConnected,
  onMessageChange,
  onSubmit,
}: ChatInputProps) {
  return (
    <div className="p-4 border-t">
      <form onSubmit={onSubmit} className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder={isConnected ? 'Type a message...' : 'Connecting...'}
          disabled={!isConnected}
        />
        <Button type="submit" size="icon" disabled={!isConnected || !message.trim()}>
          <SendHorizonal className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}

