import { useSocket as useSocketContext } from '@/contexts/SocketContext';

// Re-export the useSocket hook from context for convenience
export { useSocketContext as useSocket };

// Additional custom hooks for specific Socket.io functionality
export const useSocketConnection = () => {
  const { isConnected, socket } = useSocketContext();
  return { isConnected, socket };
};
