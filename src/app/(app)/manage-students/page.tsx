import StudentTable from '@/components/app/manage-students';
import { Suspense } from 'react';
import BasicFullscreenLoader from '@/components/common/components/BasicFullscreenLoader';

export default function StudentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Student Management</h2>
        <p className="text-muted-foreground">
          View, add, edit, and manage all student profiles in your classroom.
        </p>
      </div>
      <Suspense fallback={<BasicFullscreenLoader />}>
        <StudentTable />
      </Suspense>
    </div>
  );
}
