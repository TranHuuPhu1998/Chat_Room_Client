import type { Student, Lesson, Message } from './types';

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: 'https://placehold.co/100x100.png',
    lessons: [
      { lessonId: '101', status: 'Completed' },
      { lessonId: '102', status: 'In Progress' },
    ],
  },
  {
    id: '2',
    name: 'Bob Williams',
    email: 'bob@example.com',
    avatar: 'https://placehold.co/100x100.png',
    lessons: [{ lessonId: '101', status: 'In Progress' }],
  },
  {
    id: '3',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    avatar: 'https://placehold.co/100x100.png',
    lessons: [{ lessonId: '103', status: 'Not Started' }],
  },
  {
    id: '4',
    name: 'Diana Miller',
    email: 'diana@example.com',
    avatar: 'https://placehold.co/100x100.png',
    lessons: [],
  },
  {
    id: '5',
    name: 'Ethan Davis',
    email: 'ethan@example.com',
    avatar: 'https://placehold.co/100x100.png',
    lessons: [
      { lessonId: '102', status: 'Completed' },
      { lessonId: '103', status: 'In Progress' },
    ],
  },
];

export const mockLessons: Lesson[] = [
  {
    id: '101',
    title: 'Introduction to Algebra',
    description: 'A comprehensive introduction to the fundamental concepts of algebra.',
    assignedTo: ['1', '2'],
  },
  {
    id: '102',
    title: 'World History: Ancient Civilizations',
    description: 'Explore the history of ancient civilizations from around the globe.',
    assignedTo: ['1', '5'],
  },
  {
    id: '103',
    title: 'Basics of Python Programming',
    description: 'Learn the basics of programming using the Python language.',
    assignedTo: ['3', '5'],
  },
];

export const mockChats: Record<string, Message[]> = {
  '1': [
    {
      id: 'msg1',
      sender: 'student',
      text: 'Hi, I have a question about the first assignment.',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
    {
      id: 'msg2',
      sender: 'instructor',
      text: 'Hello Alice, I am here to help. What is your question?',
      timestamp: new Date(Date.now() - 1000 * 60 * 4),
    },
  ],
  '2': [
    {
      id: 'msg3',
      sender: 'student',
      text: 'Can we get an extension for the project?',
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
    },
  ],
  '3': [],
  '4': [],
  '5': [
    {
      id: 'msg4',
      sender: 'student',
      text: 'I am really enjoying the Python course!',
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
    },
    {
      id: 'msg5',
      sender: 'instructor',
      text: 'Glad to hear that, Ethan!',
      timestamp: new Date(Date.now() - 1000 * 60 * 19),
    },
  ],
};
