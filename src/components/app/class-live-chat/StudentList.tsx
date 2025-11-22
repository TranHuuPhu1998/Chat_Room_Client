// path: components/StudentList.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { StudentListHeader } from './StudentListHeader';
import { StudentListLoading } from './StudentListLoading';
import { StudentListDisconnected } from './StudentListDisconnected';
import { StudentListEmpty } from './StudentListEmpty';
import { StudentItem } from './StudentItem';

import type { Student } from '@/lib/types';

interface StudentListProps {
  students: Student[];
  selectedStudent: Student | null;
  isLoading: boolean;
  isConnected: boolean;
  onSelectStudent: (student: Student) => void;
}

export function StudentList({
  students,
  selectedStudent,
  isLoading,
  isConnected,
  onSelectStudent,
}: StudentListProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* ---------- MOBILE HEADER ---------- */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white dark:bg-neutral-900 shadow-sm z-40 flex items-center justify-between px-4">
        <div className="flex items-center justify-between w-full" onClick={() => setSidebarOpen(true)}>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-600 dark:text-sky-300">
              💬
            </div>
            <span className="font-medium text-slate-800 dark:text-slate-200">
              Danh sách học sinh
            </span>
          </div>

          <button
            className="p-2 rounded-lg active:scale-95 transition text-slate-700 dark:text-slate-300"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* ---------- DESKTOP SIDEBAR ---------- */}
      <div className="hidden md:block col-span-1 border-r w-[280px] flex-shrink-0">
        <StudentListHeader isConnected={isConnected} />

        <ScrollArea className="h-[calc(100%-80px)]">
          <div className="p-2 space-y-1">
            {isLoading ? (
              <StudentListLoading />
            ) : !isConnected ? (
              <StudentListDisconnected />
            ) : students.length === 0 ? (
              <StudentListEmpty />
            ) : (
              students.map((student, index) => (
                <StudentItem
                  key={student.id}
                  student={student}
                  index={index}
                  isSelected={selectedStudent?.id === student.id}
                  onClick={() => onSelectStudent(student)}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* ---------- MOBILE SIDEBAR ---------- */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />

            {/* Slide Panel */}
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{
                type: 'spring',
                stiffness: 240,
                damping: 26,
              }}
              className="
                fixed top-0 left-0 h-full w-[280px]
                bg-white dark:bg-neutral-900 
                shadow-xl z-50 md:hidden
                flex flex-col
              "
            >
              {/* Mobile Sidebar Header */}
              <div className="flex items-center justify-between h-14 px-4 border-b dark:border-neutral-700">
                <StudentListHeader isConnected={isConnected} />
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg active:scale-95 transition text-slate-700 dark:text-slate-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Items */}
              <ScrollArea className="flex-1">
                <div className="p-2 space-y-1 max-md:px-4">
                  {isLoading ? (
                    <StudentListLoading />
                  ) : !isConnected ? (
                    <StudentListDisconnected />
                  ) : students.length === 0 ? (
                    <StudentListEmpty />
                  ) : (
                    students.map((student, index) => (
                      <StudentItem
                        key={student.id}
                        student={student}
                        index={index}
                        isSelected={selectedStudent?.id === student.id}
                        onClick={() => {
                          onSelectStudent(student);
                          setSidebarOpen(false); // close on select
                        }}
                      />
                    ))
                  )}
                </div>
              </ScrollArea>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
