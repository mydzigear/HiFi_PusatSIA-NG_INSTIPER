export interface Faculty {
  id: string;
  name: string;
  code: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
}

export interface StudyProgram {
  id: string;
  facultyId: string;
  code: string;
  name: string;
  level: 'S1' | 'S2' | 'D3';
  isActive: boolean;
  pddiktiUuid?: string;
  createdAt: string;
  faculty?: Faculty;
}

export interface Specialization {
  id: string;
  studyProgramId: string;
  code: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  studyProgram?: StudyProgram;
}

export interface AcademicPeriod {
  id: string;
  academicYear: string;
  periodType: 'Ganjil' | 'Genap' | 'Pendek';
  isActive: boolean;
  startDate: string;
  endDate: string;
  createdAt: string;
}

export interface StudentData {
  id: string;
  nim: string;
  registrationNumber?: string;
  fullName: string;
  studyProgramId: string;
  specializationId?: string;
  entryPathId: string;
  academicYear: string;
  academicStatus: 'Aktif' | 'Cuti' | 'Lulus' | 'DO';
  userId?: string;
  createdAt: string;
  studyProgram?: StudyProgram;
  specialization?: Specialization;
  entryPath?: EntryPath;
  user?: {
    id: string;
    username: string;
    email: string;
  };
}

export interface EntryPath {
  id: string;
  name: string;
  code: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Course {
  id: string;
  studyProgramId: string;
  code: string;
  name: string;
  credits: number;
  semester: number;
  courseType: 'Wajib' | 'Pilihan';
  isActive: boolean;
  description?: string;
  createdAt: string;
  studyProgram?: StudyProgram;
}