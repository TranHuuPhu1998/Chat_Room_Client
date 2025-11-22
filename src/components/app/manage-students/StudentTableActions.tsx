import { Button } from '@/components/ui/button';
import { UserPlus, Filter } from 'lucide-react';

interface StudentTableActionsProps {
  onAddClick: () => void;
}

export function StudentTableActions({ onAddClick }: StudentTableActionsProps) {
  return (
    <div className="flex justify-end mb-4">
      <Button className="mr-2" variant="outline" onClick={onAddClick}>
        <UserPlus className="mr-2 h-4 w-4" />
        Add Student
      </Button>
      <Button className="mr-2 flex justify-between" variant="outline">
        <Filter />
        Filter
      </Button>
    </div>
  );
}

