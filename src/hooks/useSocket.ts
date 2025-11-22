import { useSocket as useSocketContext } from '@/contexts/SocketContext';
import { useEffect, useState, useCallback } from 'react';
import { Message } from '@/lib/types';

// Re-export the useSocket hook from context for convenience
export { useSocketContext as useSocket };

// Additional custom hooks for specific Socket.io functionality
export const useSocketConnection = () => {
  const { isConnected, socket } = useSocketContext();
  return { isConnected, socket };
};

// Hook for managing socket messages
export const useSocketMessages = () => {
  const { socket } = useSocketContext();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!socket) return;

    // Listen for new messages
    const handleMessage = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

    // Listen for message history
    const handleMessageHistory = (messageHistory: Message[]) => {
      setMessages(messageHistory);
    };

    socket.on('message', handleMessage);
    socket.on('messageHistory', handleMessageHistory);

    return () => {
      socket.off('message', handleMessage);
      socket.off('messageHistory', handleMessageHistory);
    };
  }, [socket]);

  const sendMessage = useCallback(
    (text: string, sender: 'instructor' | 'student') => {
      if (!socket) return;

      socket.emit('sendMessage', {
        text,
        sender,
      });
    },
    [socket]
  );

  return { messages, sendMessage };
};

// Extended useSocket hook with room and user management
export const useSocketExtended = () => {
  const { socket } = useSocketContext();

  const joinRoom = useCallback(
    (roomId: string) => {
      if (!socket) return;
      socket.emit('joinRoom', roomId);
    },
    [socket]
  );

  const leaveRoom = useCallback(
    (roomId: string) => {
      if (!socket) return;
      socket.emit('leaveRoom', roomId);
    },
    [socket]
  );

  const setUser = useCallback(
    (user: { id: string; name: string; role: 'instructor' | 'student' }) => {
      if (!socket) return;
      socket.emit('setUser', user);
    },
    [socket]
  );

  return { joinRoom, leaveRoom, setUser };
};
