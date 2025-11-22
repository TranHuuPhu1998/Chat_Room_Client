import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';
import type { Student } from '@/lib/types';

interface StudentTableRowProps {
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

function StudentTableRowComponent({ student, onEdit, onDelete }: StudentTableRowProps) {
  const handleEdit = React.useCallback(() => {
    onEdit(student);
  }, [student, onEdit]);

  const handleDelete = React.useCallback(() => {
    onDelete(student);
  }, [student, onDelete]);

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={student.avatar} data-ai-hint="person face" loading="lazy" />
            <AvatarFallback>{student.name?.[0] || ''}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{student.name}</span>
        </div>
      </TableCell>
      <TableCell>{student.email}</TableCell>
      <TableCell>{student.phone}</TableCell>
      <TableCell>{student.address}</TableCell>
      <TableCell>
        <Badge className="px-2 py-1" variant="secondary">
          Active
        </Badge>
      </TableCell>
      <TableCell className="flex justify-between w-[210px]">
        <Button variant="outline" onClick={handleEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <Button variant="destructive" onClick={handleDelete}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}

export const StudentTableRow = React.memo(StudentTableRowComponent);

