'use client';

import * as React from 'react';
import { toast } from 'sonner';
import type { Student } from '@/lib/types';
import { useSocketConnection } from '@/hooks/useSocket';
import { StudentTableActions } from './StudentTableActions';
import { StudentTable as StudentTableComponent } from './StudentTable';
import { AddEditStudentDialog } from './AddEditStudentDialog';
import { DeleteStudentDialog } from './DeleteStudentDialog';

export default function ManageStudents() {
  const [students, setStudents] = React.useState<Student[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
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
      setIsLoading(false);
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
      setIsLoading(true);
      socket.emit('get-list-of-students');
    } else {
      setIsLoading(false);
    }
  }, [socket, isConnected]);

  const handleAddClick = React.useCallback(() => {
    setSelectedStudent(null);
    setFormData({ name: '', email: '', address: '', phone: '', role: 1 });
    setAddEditDialogOpen(true);
  }, []);

  const handleEditClick = React.useCallback((student: Student) => {
    setSelectedStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      address: student.address,
      phone: student.phone,
      role: 1,
    });
    setAddEditDialogOpen(true);
  }, []);

  const handleDeleteClick = React.useCallback((student: Student) => {
    setSelectedStudent(student);
    setDeleteDialogOpen(true);
  }, []);

  const handleFormChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleSaveStudent = React.useCallback(() => {
    if (!formData.name || !formData.email) {
      toast.error('Please fill all fields.');
      return;
    }

    if (selectedStudent) {
      // Edit student
      setStudents((prev) =>
        prev.map((s) => (s.id === selectedStudent.id ? { ...s, ...formData } : s))
      );
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
  }, [formData, selectedStudent, socket, isConnected]);

  const confirmDelete = React.useCallback(() => {
    if (selectedStudent) {
      setStudents((prev) => prev.filter((s) => s.id !== selectedStudent.id));
      // Delete student via Socket.io
      if (socket && isConnected) {
        socket.emit('delete-student', { id: selectedStudent.id });
      }
      toast.success('Student deleted.');
    }
    setDeleteDialogOpen(false);
  }, [selectedStudent, socket, isConnected]);

  return (
    <>
      <StudentTableActions onAddClick={handleAddClick} />
      <StudentTableComponent
        students={students}
        isLoading={isLoading}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
      <AddEditStudentDialog
        open={isAddEditDialogOpen}
        onOpenChange={setAddEditDialogOpen}
        student={selectedStudent}
        formData={formData}
        onFormChange={handleFormChange}
        onSave={handleSaveStudent}
      />
      <DeleteStudentDialog
        open={isDeleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        student={selectedStudent}
        onConfirm={confirmDelete}
      />
    </>
  );
}
