import ChatLayout from '@/components/app/message';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ChatPage() {
  return (
    <div className="space-y-6 h-full">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Live Chat</h2>
        <p className="text-muted-foreground">Communicate with your students in real-time.</p>
      </div>
      <Suspense fallback={<Skeleton className="h-[calc(100vh-200px)] w-full" />}>
        <ChatLayout />
      </Suspense>
    </div>
  );
}
