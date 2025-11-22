import ManageLessons from '@/components/app/manage-lessons';
import { Suspense } from 'react';
import BasicFullscreenLoader from '@/components/common/components/BasicFullscreenLoader';

export default function LessonsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Lesson Management</h2>
        <p className="text-muted-foreground">
          Create new lessons and assign them to your students.
        </p>
      </div>
      <Suspense fallback={<BasicFullscreenLoader />}>
        <ManageLessons />
      </Suspense>
    </div>
  );
}
