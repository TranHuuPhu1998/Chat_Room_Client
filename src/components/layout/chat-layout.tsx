"use client";

import { motion } from "framer-motion";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SendHorizonal } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockStudents, mockChats } from "@/lib/mock-data";
import type { Student, Message } from "@/lib/types";

export default function ChatLayout() {
  const [students] = React.useState<Student[]>(mockStudents);
  const [chats, setChats] = React.useState<Record<string, Message[]>>(mockChats);
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(null);
  const [message, setMessage] = React.useState("");
  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [chats, selectedStudent]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !selectedStudent) return;
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'instructor',
      text: message,
      timestamp: new Date()
    };

    setChats(prevChats => ({
      ...prevChats,
      [selectedStudent.id]: [...(prevChats[selectedStudent.id] || []), newMessage]
    }));
    setMessage("");
  };

  return (
    <Card className="h-[calc(100vh-220px)] w-full flex flex-col md:flex-row">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-full">
        <div className="col-span-1 border-r">
          <CardHeader>
            <CardTitle>Students</CardTitle>
          </CardHeader>
          <ScrollArea className="h-[calc(100%-80px)]">
            <div className="p-2 space-y-1">
              {students.map((student) => (
                <Button
                  key={student.id}
                  variant={selectedStudent?.id === student.id ? "secondary" : "ghost"}
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
                  <AvatarImage
                    src={selectedStudent.avatar}
                    data-ai-hint="person face"
                  />
                  <AvatarFallback>{selectedStudent.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold">{selectedStudent.name}</h3>
              </div>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {(chats[selectedStudent.id] || []).map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        "flex items-end gap-2",
                        msg.sender === "instructor" ? "justify-end" : "justify-start"
                      )}
                    >
                      {msg.sender === "student" && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={selectedStudent.avatar} />
                        </Avatar>
                      )}
                      <div
                        className={cn(
                          "max-w-xs rounded-lg p-3 text-sm",
                          msg.sender === "instructor"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                      >
                        <p>{msg.text}</p>
                        <p className={cn("text-xs mt-1", msg.sender === 'instructor' ? 'text-primary-foreground/70' : 'text-muted-foreground/70')}>
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {msg.sender === "instructor" && (
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
                    placeholder="Type a message..."
                  />

                  <Button type="submit" size="icon">
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
