export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'student' | 'applicant';
  avatar?: string;
}

export interface Student extends User {
  studentId: string;
  program: string;
  semester: number;
  gpa: number;
  totalCredits: number;
  status: 'active' | 'inactive' | 'graduated';
}

export interface Applicant extends User {
  applicationId?: string;
  status: 'draft' | 'submitted' | 'verified' | 'accepted' | 'rejected';
  progress: number;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  semester: number;
  lecturer: string;
  quota: number;
  enrolled: number;
  schedule: string;
}

export interface Invoice {
  id: string;
  studentId: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
  type: 'admission' | 'tuition' | 'other';
  description: string;
  vaNumber?: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  paymentDate: string;
  method: string;
  status: 'success' | 'pending' | 'failed';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface AcademicPeriod {
  id: string;
  name: string;
  year: string;
  semester: 'ganjil' | 'genap';
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface KRSRecord {
  id: string;
  studentId: string;
  courseId: string;
  periodId: string;
  grade?: string;
  status: 'enrolled' | 'dropped' | 'completed';
}

// New interfaces for portal content
export interface Announcement {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishDate: string;
  category: 'academic' | 'general' | 'urgent';
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Information {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishDate: string;
  category: 'admission' | 'academic' | 'facility' | 'general';
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Agenda {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  organizer: string;
  category: 'academic' | 'seminar' | 'workshop' | 'exam' | 'event';
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  isPublic: boolean;
  participants?: string[];
  createdAt: string;
  updatedAt: string;
}