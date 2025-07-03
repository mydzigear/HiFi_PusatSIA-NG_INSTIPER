import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course, Invoice, Notification, AcademicPeriod } from '../types';

interface AppContextType {
  courses: Course[];
  invoices: Invoice[];
  notifications: Notification[];
  academicPeriods: AcademicPeriod[];
  markNotificationAsRead: (id: string) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data
const mockCourses: Course[] = [
  {
    id: '1',
    code: 'AGR101',
    name: 'Pengantar Ilmu Pertanian',
    credits: 3,
    semester: 1,
    lecturer: 'Dr. Budi Santoso',
    quota: 40,
    enrolled: 35,
    schedule: 'Senin, 08:00-10:30'
  },
  {
    id: '2',
    code: 'AGR201',
    name: 'Fisiologi Tumbuhan',
    credits: 3,
    semester: 3,
    lecturer: 'Dr. Siti Aminah',
    quota: 35,
    enrolled: 30,
    schedule: 'Selasa, 10:30-13:00'
  },
  {
    id: '3',
    code: 'AGR301',
    name: 'Teknologi Pengolahan Pangan',
    credits: 4,
    semester: 5,
    lecturer: 'Prof. Ahmad Rahman',
    quota: 30,
    enrolled: 28,
    schedule: 'Rabu, 13:00-16:30'
  }
];

const mockInvoices: Invoice[] = [
  {
    id: '1',
    studentId: '2024001',
    amount: 5000000,
    dueDate: '2024-02-15',
    status: 'pending',
    type: 'tuition',
    description: 'UKT Semester Genap 2023/2024',
    vaNumber: '8877665544332211'
  },
  {
    id: '2',
    studentId: '2024001',
    amount: 500000,
    dueDate: '2024-01-20',
    status: 'paid',
    type: 'other',
    description: 'Biaya Praktikum Laboratorium'
  }
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Pembayaran UKT',
    message: 'Tagihan UKT semester genap telah tersedia. Batas pembayaran 15 Februari 2024.',
    type: 'warning',
    read: false,
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Periode KRS Dibuka',
    message: 'Periode pengisian KRS semester genap 2023/2024 telah dibuka sampai dengan 20 Januari 2024.',
    type: 'info',
    read: false,
    createdAt: '2024-01-10T09:00:00Z'
  }
];

const mockAcademicPeriods: AcademicPeriod[] = [
  {
    id: '1',
    name: 'Semester Genap 2023/2024',
    year: '2023/2024',
    semester: 'genap',
    startDate: '2024-02-01',
    endDate: '2024-06-30',
    isActive: true
  }
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [courses] = useState<Course[]>(mockCourses);
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [academicPeriods] = useState<AcademicPeriod[]>(mockAcademicPeriods);

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      courses,
      invoices,
      notifications,
      academicPeriods,
      markNotificationAsRead,
      addNotification
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}