import { Message, Student } from '@/lib/types';

// Socket.io event types
export interface ServerToClientEvents {
  // Message events
  message: (message: Message) => void;
  messageHistory: (messages: Message[]) => void;

  // Student events
  'send-list-of-students': (payload: { students: Student[] }) => void;
  'student-added': (student: Student) => void;

  // User events
  userJoined: (user: { id: string; name: string; role: 'instructor' | 'student' }) => void;
  userLeft: (userId: string) => void;
  onlineUsers: (users: { id: string; name: string; role: 'instructor' | 'student' }[]) => void;

  // Connection events
  connected: () => void;
  disconnected: () => void;

  // Error events
  error: (error: string) => void;
}

export interface ClientToServerEvents {
  // Message events
  sendMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;

  // Student events
  'get-list-of-students': () => void;
  'add-student': (student: Pick<Student, 'name' | 'email' | 'address' | 'phone' | 'role'>) => void;

  // User events
  setUser: (user: { id: string; name: string; role: 'instructor' | 'student' }) => void;

  // Connection events
  connect: () => void;
  disconnect: () => void;
}

// Socket context type
export interface SocketContextType {
  socket: any; // Will be typed properly with socket.io-client
  isConnected: boolean;
}
