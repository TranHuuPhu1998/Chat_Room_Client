import ChatLayout from '@/components/app/class-live-chat';
import { Suspense } from 'react';
import BasicFullscreenLoader from '@/components/common/components/BasicFullscreenLoader';

export default function ChatPage() {
  return (
    <div className="space-y-6 h-full">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Live Chat</h2>
        <p className="text-muted-foreground">Communicate with your students in real-time.</p>
      </div>
      <Suspense fallback={<BasicFullscreenLoader />}>
        <ChatLayout />
      </Suspense>
    </div>
  );
}
