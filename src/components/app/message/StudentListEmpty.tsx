import { Users } from 'lucide-react';

export function StudentListEmpty() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="rounded-full bg-muted p-4 mb-4">
        <Users className="h-8 w-8 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium text-muted-foreground mb-1">
        Chưa có học sinh nào
      </p>
      <p className="text-xs text-muted-foreground/70">
        Hãy thêm học sinh để bắt đầu trò chuyện
      </p>
    </div>
  );
}

