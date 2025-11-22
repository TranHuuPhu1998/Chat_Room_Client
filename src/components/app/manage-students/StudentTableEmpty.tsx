import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Users } from 'lucide-react';

export function StudentTableEmpty() {
  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={6} className="h-64">
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Chưa có học sinh nào
            </p>
            <p className="text-xs text-muted-foreground/70">
              Hãy thêm học sinh đầu tiên để bắt đầu
            </p>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

