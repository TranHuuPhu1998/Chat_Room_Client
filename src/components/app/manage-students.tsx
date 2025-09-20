'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus, Edit, Trash2, Search, Filter } from 'lucide-react';
import { toast } from 'sonner';
import type { Student, Lesson } from '@/lib/types';
import { mockStudents, mockLessons } from '@/lib/mock-data';
import { useSocketConnection } from '@/hooks/useSocket';

export default function StudentTable() {
  const [students, setStudents] = React.useState<Student[]>([]);
  const [lessons] = React.useState<Lesson[]>(mockLessons);
  const [isAddEditDialogOpen, setAddEditDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(null);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    role: 1,
  });
  const { isConnected, socket } = useSocketConnection();

  // Listen for server-pushed student list and update state
  React.useEffect(() => {
    if (!socket) return;

    const handleSendListOfStudents = (payload: { students: Student[] }) => {
      setStudents(payload.students || []);
    };

    const handleStudentAdded = (payload: { student: Student }) => {
      setStudents((prev) => [payload.student, ...prev]);
    };

    const handleStudentDeleted = (payload: { id: string }) => {
      setStudents((prev) => prev.filter((student) => student.id !== payload.id));
    };

    socket.on('send-list-of-students', handleSendListOfStudents);
    socket.on('student-added', handleStudentAdded);
    socket.on('student-deleted', handleStudentDeleted);

    return () => {
      socket.off('send-list-of-students', handleSendListOfStudents);
      socket.off('student-added', handleStudentAdded);
      socket.off('student-deleted', handleStudentDeleted);
    };
  }, [socket]);

  // Request the list when connected/reconnected
  React.useEffect(() => {
    if (socket && isConnected) {
      socket.emit('get-list-of-students');
    }
  }, [socket, isConnected]);

  const handleAddClick = () => {
    setSelectedStudent(null);
    setFormData({ name: '', email: '', address: '', phone: '', role: 1 });
    setAddEditDialogOpen(true);
  };

  const handleEditClick = (student: Student) => {
    setSelectedStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      address: student.address,
      phone: student.phone,
      role: 1,
    });
    setAddEditDialogOpen(true);
  };

  const handleDeleteClick = (student: Student) => {
    setSelectedStudent(student);
    setDeleteDialogOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveStudent = () => {
    if (!formData.name || !formData.email) {
      toast.error('Please fill all fields.');
      return;
    }

    if (selectedStudent) {
      // Edit student
      setStudents(students.map((s) => (s.id === selectedStudent.id ? { ...s, ...formData } : s)));
      toast.success('Student updated successfully.');
    } else {
      // Add new student via Socket.io
      if (socket && isConnected) {
        socket.emit('add-student', {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        });
        toast.success('Student add request sent.');
      } else {
        toast.error('Not connected. Please try again when online.');
        return;
      }
    }
    setAddEditDialogOpen(false);
  };

  const confirmDelete = () => {
    if (selectedStudent) {
      setStudents(students.filter((s) => s.id !== selectedStudent.id));
      // Delete student via Socket.io
      if (socket && isConnected) {
        socket.emit('delete-student', { id: selectedStudent.id });
      }
      toast.success('Student deleted.');
    }
    setDeleteDialogOpen(false);
  };

  const getLessonStatus = () => {
    return (
      <Badge className="px-2 py-1" variant="secondary">
        Active
      </Badge>
    );
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button className="mr-2" variant="outline" onClick={handleAddClick}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
        <Button className="mr-2 flex justify-between" variant="outline">
          <Filter />
          Filter
        </Button>
      </div>
      <Card className="py-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={student.avatar} data-ai-hint="person face" />
                      <AvatarFallback>{student.name?.[0] || ''}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{student.name}</span>
                  </div>
                </TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.phone}</TableCell>
                <TableCell>{student.address}</TableCell>
                <TableCell>{getLessonStatus()}</TableCell>
                <TableCell className="flex justify-between w-[210px]">
                  <Button variant="outline" onClick={() => handleEditClick(student)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => handleDeleteClick(student)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isAddEditDialogOpen} onOpenChange={setAddEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedStudent ? 'Edit Student' : 'Add New Student'}</DialogTitle>
            <DialogDescription>
              {selectedStudent
                ? "Update the student's profile information."
                : 'Fill in the details to add a new student to your class.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleFormChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleFormChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={handleFormChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={handleFormChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveStudent}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the student profile for{' '}
              {selectedStudent?.name}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
