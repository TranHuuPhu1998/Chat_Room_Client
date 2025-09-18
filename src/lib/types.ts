export enum Role {
  Student = 0,
  Instructor = 1,
}

export interface Student {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  role: Role;
  avatar: string;
  lessons: { lessonId: string; status: 'Not Started' | 'In Progress' | 'Completed' }[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  assignedTo: string[];
}

export interface Message {
  id: string;
  sender: 'instructor' | 'student';
  text: string;
  timestamp: Date;
}
