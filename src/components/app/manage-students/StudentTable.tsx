import * as React from 'react';
import { Card } from '@/components/ui/card';
import { Table, TableBody } from '@/components/ui/table';
import { StudentTableRow } from './StudentTableRow';
import { StudentTableLoading } from './StudentTableLoading';
import { StudentTableEmpty } from './StudentTableEmpty';
import { TableHeaderColumns } from './TableHeaderColumns';
import type { Student } from '@/lib/types';

interface StudentTableProps {
  students: Student[];
  isLoading: boolean;
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

const TableWrapper = ({ children }: { children: React.ReactNode }) => (
  <Card className="py-0">
    <Table>
      <TableHeaderColumns />
      {children}
    </Table>
  </Card>
);

export function StudentTable({ students = [], isLoading = false, onEdit, onDelete }: StudentTableProps) {
  if (isLoading) {
    return (
      <TableWrapper>
        <StudentTableLoading />
      </TableWrapper>
    );
  }

  if (students.length === 0) {
    return (
      <TableWrapper>
        <StudentTableEmpty />
      </TableWrapper>
    );
  }

  return (
    <TableWrapper>
      <TableBody>
        {students.map((student) => (
          <StudentTableRow
            key={student.id}
            student={student}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </TableBody>
    </TableWrapper>
  );
}

