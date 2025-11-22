import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function TableHeaderColumns() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Student Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Phone</TableHead>
        <TableHead>Address</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="w-[100px] text-center">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}

