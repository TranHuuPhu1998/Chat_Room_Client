export interface Student {
    id: string;
    name: string;
    email: string;
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
  