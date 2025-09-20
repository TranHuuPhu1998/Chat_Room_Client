'use client';

import { motion } from 'framer-motion';
import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { SendHorizonal, Wifi, WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockStudents } from '@/lib/mock-data';
import type { Student, Message } from '@/lib/types';
import { useSocket, useSocketConnection } from '@/hooks/useSocket';

export default function ChatLayout() {
  const [students] = React.useState<Student[]>(mockStudents);
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(null);
  const [message, setMessage] = React.useState('');
  const [currentRoom, setCurrentRoom] = React.useState<string | null>(null);
  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);

  // Socket.io hooks
  const { isConnected } = useSocketConnection();
  // const { messages, sendMessage } = useSocketMessages();
  // const { joinRoom, leaveRoom, setUser } = useSocket();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Set user when component mounts
  // React.useEffect(() => {
  //   setUser({
  //     id: 'instructor-1',
  //     name: 'Instructor',
  //     role: 'instructor',
  //   });
  // }, [setUser]);

  // Handle room changes
  // React.useEffect(() => {
  //   if (selectedStudent) {
  //     const roomId = `chat-${selectedStudent.id}`;
  //     if (currentRoom && currentRoom !== roomId) {
  //       leaveRoom(currentRoom);
  //     }
  //     joinRoom(roomId);
  //     setCurrentRoom(roomId);
  //   }
  // }, [selectedStudent, joinRoom, leaveRoom, currentRoom]);

  // React.useEffect(() => {
  //   scrollToBottom();
  // }, [messages, selectedStudent]);

  // const handleSendMessage = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!message.trim() || !selectedStudent || !isConnected) return;

  //   sendMessage(message, 'instructor');
  //   setMessage('');
  // };

  return (
    <Card className="h-[calc(100vh-220px)] w-full flex flex-col md:flex-row">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-full">
        <div className="col-span-1 border-r">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Students
              <div className="flex items-center gap-1">
                {isConnected ? (
                  <Wifi className="h-4 w-4 text-green-500" />
                ) : (
                  <WifiOff className="h-4 w-4 text-red-500" />
                )}
                <span className="text-xs text-muted-foreground">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <ScrollArea className="h-[calc(100%-80px)]">
            <div className="p-2 space-y-1">
              {students.map((student) => (
                <Button
                  key={student.id}
                  variant={selectedStudent?.id === student.id ? 'secondary' : 'ghost'}
                  className="w-full justify-start gap-3 h-12"
                  onClick={() => setSelectedStudent(student)}
                >
                  <Avatar>
                    <AvatarImage src={student.avatar} data-ai-hint="person face" />
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{student.name}</span>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col h-full">
          {selectedStudent ? (
            <>
              <div className="flex items-center gap-4 p-3 border-b">
                <Avatar>
                  <AvatarImage src={selectedStudent.avatar} data-ai-hint="person face" />
                  <AvatarFallback>{selectedStudent.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold">{selectedStudent.name}</h3>
              </div>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        'flex items-end gap-2',
                        msg.sender === 'instructor' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      {msg.sender === 'student' && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={selectedStudent.avatar} />
                        </Avatar>
                      )}
                      <div
                        className={cn(
                          'max-w-xs rounded-lg p-3 text-sm',
                          msg.sender === 'instructor'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        )}
                      >
                        <p>{msg.text}</p>
                        <p
                          className={cn(
                            'text-xs mt-1',
                            msg.sender === 'instructor'
                              ? 'text-primary-foreground/70'
                              : 'text-muted-foreground/70'
                          )}
                        >
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      {msg.sender === 'instructor' && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src="https://placehold.co/100x100.png"
                            data-ai-hint="person face"
                          />
                        </Avatar>
                      )}
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={isConnected ? 'Type a message...' : 'Connecting...'}
                    disabled={!isConnected}
                  />

                  <Button type="submit" size="icon" disabled={!isConnected || !message.trim()}>
                    <SendHorizonal className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center text-muted-foreground">
              <p>Select a student to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
