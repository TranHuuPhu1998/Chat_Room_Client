import api from '@/lib/axios';
import { Student, Role } from '@/lib/types';

interface StudentResponse {
  success: boolean;
  students: Array<{
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
  }>;
}

/**
 * Get all students from the server
 * @returns Promise<Student[]> Array of students
 */
export const getStudents = async (): Promise<Student[]> => {
  try {
    // The axios interceptor returns response.data directly, so we need to type assert
    const response = (await api.get('/api/students')) as StudentResponse;
    
    // Extract students array from response
    const students = response.students || [];
    
    // Map backend response to frontend Student type
    // Add default values for missing fields (role, avatar, lessons)
    return students.map((student: {
      id: string;
      name: string;
      email: string;
      phone: string;
      address: string;
    }) => ({
      id: student.id,
      name: student.name,
      email: student.email,
      phone: student.phone,
      address: student.address,
      role: Role.Student, // Default role
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=random`, // Generate avatar from name
      lessons: [], // Empty lessons array by default
    }));
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

