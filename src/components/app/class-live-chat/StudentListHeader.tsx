import { Wifi, WifiOff } from 'lucide-react';
import { CardHeader, CardTitle } from '@/components/ui/card';

interface StudentListHeaderProps {
  isConnected: boolean;
}

export function StudentListHeader({ isConnected }: StudentListHeaderProps) {
  return (
    <CardHeader className='max-md:px-0 max-md:gap-0'>
      <CardTitle className="flex items-center gap-2">
        Students
        <div className="flex items-center gap-1">
          {isConnected ? (
            <Wifi className="h-4 w-4 text-green-500" />
          ) : (
            <WifiOff className="h-4 w-4 text-red-500" />
          )}
          <span className="text-xs text-muted-foreground">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </CardTitle>
    </CardHeader>
  );
}

