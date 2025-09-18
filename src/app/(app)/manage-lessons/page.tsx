import ManageLessons from '@/components/app/manage-lessons';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function LessonsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Lesson Management</h2>
        <p className="text-muted-foreground">
          Create new lessons and assign them to your students.
        </p>
      </div>
      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <ManageLessons />
      </Suspense>
    </div>
  );
}
