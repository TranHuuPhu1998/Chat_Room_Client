'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { StudentList } from './StudentList';
import { ChatArea } from './ChatArea';
import { ChatPlaceholder } from './ChatPlaceholder';
import type { Student } from '@/lib/types';
import { useSocketExtended, useSocketConnection, useSocketMessages } from '@/hooks/useSocket';

export default function ChatLayout() {
  const [students, setStudents] = React.useState<Student[]>([]);
  const [isLoadingStudents, setIsLoadingStudents] = React.useState(true);
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(null);
  const [message, setMessage] = React.useState('');
  const [currentRoom, setCurrentRoom] = React.useState<string | null>(null);
  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);

  // Socket.io hooks
  const { isConnected, socket } = useSocketConnection();
  const { messages, sendMessage } = useSocketMessages();
  const { joinRoom, leaveRoom, setUser } = useSocketExtended();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    if (!isConnected) {
      setIsLoadingStudents(false);
      return;
    }
    setIsLoadingStudents(true);
    socket.emit('get-list-of-students');
  }, [isConnected, socket]);

  React.useEffect(() => {
    if (!socket || !isConnected) return;

    const handleSendListOfStudents = (payload: { students: Student[] }) => {
      setStudents(payload.students || []);
      setIsLoadingStudents(false);
    };

    socket.on('send-list-of-students', handleSendListOfStudents);

    return () => {
      socket.off('send-list-of-students', handleSendListOfStudents);
    };
  }, [socket, isConnected]);

  // Set user when component mounts
  React.useEffect(() => {
    setUser({
      id: 'instructor-1',
      name: 'Instructor',
      role: 'instructor',
    });
  }, [setUser]);

  // Handle room changes
  React.useEffect(() => {
    if (selectedStudent) {
      const roomId = `chat-${selectedStudent.id}`;
      if (currentRoom && currentRoom !== roomId) {
        leaveRoom(currentRoom);
      }
      joinRoom(roomId);
      setCurrentRoom(roomId);
    }
  }, [selectedStudent, joinRoom, leaveRoom, currentRoom]);

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, selectedStudent]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !selectedStudent || !isConnected) return;

    sendMessage(message, 'instructor');
    setMessage('');
  };

  return (
    <Card className="h-[calc(100vh-220px)] w-full flex flex-col md:flex-row">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-full">
        <StudentList
          students={students}
          selectedStudent={selectedStudent}
          isLoading={isLoadingStudents}
          isConnected={isConnected}
          onSelectStudent={setSelectedStudent}
        />
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col h-full">
          {selectedStudent ? (
            <ChatArea
              student={selectedStudent}
              messages={messages}
              message={message}
              isConnected={isConnected}
              messagesEndRef={messagesEndRef}
              onMessageChange={setMessage}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <ChatPlaceholder />
          )}
        </div>
      </div>
    </Card>
  );
}
