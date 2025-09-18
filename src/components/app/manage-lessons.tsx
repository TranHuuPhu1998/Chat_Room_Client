'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import type { Student, Lesson } from '@/lib/types';
import { mockStudents, mockLessons } from '@/lib/mock-data';

export default function LessonList() {
  const [lessons, setLessons] = React.useState<Lesson[]>(mockLessons);
  const [students] = React.useState<Student[]>(mockStudents);
  const [isAssignDialogOpen, setAssignDialogOpen] = React.useState(false);
  const [selectedLesson, setSelectedLesson] = React.useState<Lesson | null>(null);
  const [selectedStudents, setSelectedStudents] = React.useState<string[]>([]);
  const [newLesson, setNewLesson] = React.useState({ title: '', description: '' });

  const handleCreateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLesson.title || !newLesson.description) {
      toast.error('Please fill all fields.');
      return;
    }
    const newLessonData: Lesson = {
      id: (Math.random() * 10000).toString(),
      ...newLesson,
      assignedTo: [],
    };
    setLessons([newLessonData, ...lessons]);
    setNewLesson({ title: '', description: '' });
    toast.success('Lesson created successfully.');
  };

  const handleAssignClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setSelectedStudents(lesson.assignedTo);
    setAssignDialogOpen(true);
  };

  const handleStudentSelection = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId]
    );
  };

  const confirmAssignment = () => {
    if (selectedLesson) {
      setLessons(
        lessons.map((l) =>
          l.id === selectedLesson.id ? { ...l, assignedTo: selectedStudents } : l
        )
      );
      toast.success(`Lesson assigned to ${selectedStudents.length} student(s).`);
    }
    setAssignDialogOpen(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Create New Lesson</CardTitle>
            <CardDescription>Fill in the details below to add a new lesson.</CardDescription>
          </CardHeader>
          <form onSubmit={handleCreateLesson}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newLesson.title}
                  onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                  placeholder="e.g., Introduction to Physics"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newLesson.description}
                  onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })}
                  placeholder="A brief summary of the lesson content."
                />
              </div>
            </CardContent>
            <CardFooter className="mt-4">
              <Button type="submit" className="w-full">
                Create Lesson
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
      <div className="md:col-span-2">
        <h3 className="text-lg font-semibold mb-4">Existing Lessons</h3>
        <ScrollArea className="h-[60vh]">
          <div className="space-y-4 pr-4">
            {lessons.map((lesson) => (
              <Card key={lesson.id}>
                <CardHeader>
                  <CardTitle>{lesson.title}</CardTitle>
                  <CardDescription>{lesson.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Assigned to {lesson.assignedTo.length} student(s)
                  </span>
                  <Button variant="outline" onClick={() => handleAssignClick(lesson)}>
                    Assign
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      <Dialog open={isAssignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Assign Lesson: {selectedLesson?.title}</DialogTitle>
            <DialogDescription>
              Select the students you want to assign this lesson to.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-72 my-4">
            <div className="space-y-4 pr-6">
              {students.map((student) => (
                <div key={student.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={`student-${student.id}`}
                    checked={selectedStudents.includes(student.id)}
                    onCheckedChange={() => handleStudentSelection(student.id)}
                  />
                  <Label htmlFor={`student-${student.id}`} className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={student.avatar} data-ai-hint="person face" />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{student.name}</span>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmAssignment}>Save Assignments</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
