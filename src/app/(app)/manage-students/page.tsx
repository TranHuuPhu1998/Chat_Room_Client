import StudentTable from '@/components/app/manage-students';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function StudentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Student Management</h2>
        <p className="text-muted-foreground">
          View, add, edit, and manage all student profiles in your classroom.
        </p>
      </div>
      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <StudentTable />
      </Suspense>
    </div>
  );
}
