# Socket.io Client Implementation

This document describes the Socket.io client implementation for the chat room application.

## Features Implemented

### 1. Socket.io Context Provider

- **File**: `src/contexts/SocketContext.tsx`
- **Purpose**: Provides Socket.io connection and state management across the application
- **Features**:
  - Automatic connection to Socket.io server
  - Real-time message handling
  - User management (online users, join/leave events)
  - Room management (join/leave chat rooms)
  - Connection status tracking

### 2. Custom Hooks

- **File**: `src/hooks/useSocket.ts`
- **Purpose**: Provides convenient hooks for Socket.io functionality
- **Hooks Available**:
  - `useSocket()`: Main hook with all Socket.io functionality
  - `useSocketConnection()`: Connection status and socket instance
  - `useSocketMessages()`: Message handling
  - `useSocketUsers()`: Online users management
  - `useSocketRooms()`: Room management

### 3. TypeScript Types

- **File**: `src/types/socket.ts`
- **Purpose**: Type definitions for Socket.io events and context
- **Includes**:
  - Server-to-client event types
  - Client-to-server event types
  - Socket context type definitions

### 4. Updated Message Component

- **File**: `src/components/app/message.tsx`
- **Features**:
  - Real-time messaging with Socket.io
  - Connection status indicator
  - Automatic room joining/leaving
  - User identification
  - Disabled state when disconnected

## Configuration

### Environment Variables

Set the following environment variable in your `.env.local` file:

```env
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

### Socket.io Server Events

#### Client to Server Events

- `sendMessage(message)`: Send a message to the current room
- `joinRoom(roomId)`: Join a specific chat room
- `leaveRoom(roomId)`: Leave a specific chat room
- `setUser(user)`: Set user information (id, name, role)

#### Server to Client Events

- `message`: Receive a new message
- `messageHistory`: Receive message history for a room
- `userJoined`: User joined the room
- `userLeft`: User left the room
- `onlineUsers`: List of currently online users
- `connected`: Connection established
- `disconnected`: Connection lost
- `error`: Error occurred

## Usage

### Basic Usage

```tsx
import { useSocket } from '@/hooks/useSocket';

function MyComponent() {
  const { isConnected, messages, sendMessage } = useSocket();

  const handleSend = () => {
    sendMessage('Hello World', 'instructor');
  };

  return (
    <div>
      <p>Status: {isConnected ? 'Connected' : 'Disconnected'}</p>
      <button onClick={handleSend}>Send Message</button>
    </div>
  );
}
```

### Room Management

```tsx
import { useSocket } from '@/hooks/useSocket';

function ChatRoom() {
  const { joinRoom, leaveRoom } = useSocket();

  useEffect(() => {
    joinRoom('room-123');
    return () => leaveRoom('room-123');
  }, []);
}
```

## Dependencies

- `socket.io-client`: Socket.io client library
- `@types/socket.io-client`: TypeScript types (if needed)

## Notes

- The Socket.io provider is wrapped around the entire application in `src/app/layout.tsx`
- Connection is automatically established when the app loads
- Messages are stored in the context state and automatically updated
- The implementation includes proper TypeScript typing for all Socket.io events
- Connection status is visually indicated in the UI
