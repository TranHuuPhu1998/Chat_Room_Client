import { WifiOff } from 'lucide-react';

export function StudentListDisconnected() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <WifiOff className="h-12 w-12 text-muted-foreground mb-4" />
      <p className="text-sm font-medium text-muted-foreground mb-1">
        Đang kết nối...
      </p>
      <p className="text-xs text-muted-foreground/70">
        Vui lòng đợi kết nối với server
      </p>
    </div>
  );
}

