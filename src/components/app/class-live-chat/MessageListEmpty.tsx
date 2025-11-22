import { SendHorizonal } from 'lucide-react';

interface MessageListEmptyProps {
  studentName: string;
}

export function MessageListEmpty({ studentName }: MessageListEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-12 text-center">
      <div className="rounded-full bg-muted p-3 mb-3">
        <SendHorizonal className="h-6 w-6 text-muted-foreground" />
      </div>
      <p className="text-sm text-muted-foreground">
        Chưa có tin nhắn nào
      </p>
      <p className="text-xs text-muted-foreground/70 mt-1">
        Bắt đầu cuộc trò chuyện với {studentName}
      </p>
    </div>
  );
}

