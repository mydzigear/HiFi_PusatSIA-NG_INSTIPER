import React, { useState } from 'react';
import { GraduationCap, Download, TrendingUp, Award, BookOpen, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Student } from '../../types';

interface Grade {
  courseCode: string;
  courseName: string;
  credits: number;
  grade: string;
  gradePoint: number;
  semester: string;
}

export function AcademicHistory() {
  const { user } = useAuth();
  const student = user as Student;
  const [selectedSemester, setSelectedSemester] = useState('all');

  // Mock academic data
  const academicData = {
    semesters: [
      {
        id: '2023-1',
        name: '2023/2024 Ganjil',
        gpa: 3.75,
        credits: 20,
        grades: [
          { courseCode: 'AGR101', courseName: 'Pengantar Ilmu Pertanian', credits: 3, grade: 'A', gradePoint: 4.0 },
          { courseCode: 'BIO101', courseName: 'Biologi Umum', credits: 3, grade: 'A-', gradePoint: 3.7 },
          { courseCode: 'KIM101', courseName: 'Kimia Dasar', credits: 3, grade: 'B+', gradePoint: 3.3 },
          { courseCode: 'MAT101', courseName: 'Matematika Dasar', credits: 3, grade: 'B', gradePoint: 3.0 },
          { courseCode: 'ING101', courseName: 'Bahasa Inggris', credits: 2, grade: 'A', gradePoint: 4.0 },
          { courseCode: 'PKN101', courseName: 'Pendidikan Kewarganegaraan', credits: 2, grade: 'A', gradePoint: 4.0 },
          { courseCode: 'AGM101', courseName: 'Agama', credits: 2, grade: 'A', gradePoint: 4.0 },
          { courseCode: 'IND101', courseName: 'Bahasa Indonesia', credits: 2, grade: 'B+', gradePoint: 3.3 },
        ]
      },
      {
        id: '2023-2',
        name: '2023/2024 Genap',
        gpa: 3.80,
        credits: 22,
        grades: [
          { courseCode: 'AGR201', courseName: 'Fisiologi Tumbuhan', credits: 3, grade: 'A', gradePoint: 4.0 },
          { courseCode: 'AGR202', courseName: 'Ilmu Tanah', credits: 3, grade: 'A-', gradePoint: 3.7 },
          { courseCode: 'AGR203', courseName: 'Genetika', credits: 3, grade: 'B+', gradePoint: 3.3 },
          { courseCode: 'STA201', courseName: 'Statistika', credits: 3, grade: 'B+', gradePoint: 3.3 },
          { courseCode: 'AGR204', courseName: 'Ekologi Pertanian', credits: 3, grade: 'A', gradePoint: 4.0 },
          { courseCode: 'AGR205', courseName: 'Mikrobiologi', credits: 3, grade: 'A-', gradePoint: 3.7 },
          { courseCode: 'AGR206', courseName: 'Praktikum Fisiologi', credits: 1, grade: 'A', gradePoint: 4.0 },
          { courseCode: 'AGR207', courseName: 'Praktikum Tanah', credits: 1, grade: 'A', gradePoint: 4.0 },
          { courseCode: 'AGR208', courseName: 'Praktikum Genetika', credits: 1, grade: 'B+', gradePoint: 3.3 },
          { courseCode: 'AGR209', courseName: 'Praktikum Mikrobiologi', credits: 1, grade: 'A', gradePoint: 4.0 },
        ]
      }
    ]
  };

  const totalCredits = academicData.semesters.reduce((sum, sem) => sum + sem.credits, 0);
  const weightedGPA = academicData.semesters.reduce((sum, sem) => sum + (sem.gpa * sem.credits), 0) / totalCredits;

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A':
        return 'bg-green-100 text-green-800';
      case 'A-':
        return 'bg-green-100 text-green-700';
      case 'B+':
        return 'bg-blue-100 text-blue-800';
      case 'B':
        return 'bg-blue-100 text-blue-700';
      case 'B-':
        return 'bg-yellow-100 text-yellow-800';
      case 'C+':
        return 'bg-orange-100 text-orange-800';
      case 'C':
        return 'bg-orange-100 text-orange-700';
      case 'D':
        return 'bg-red-100 text-red-800';
      case 'E':
        return 'bg-red-100 text-red-900';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredSemesters = selectedSemester === 'all' 
    ? academicData.semesters 
    : academicData.semesters.filter(sem => sem.id === selectedSemester);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Riwayat Akademik</h1>
          <p className="text-gray-600 mt-1">Kartu Hasil Studi dan Transkrip Nilai</p>
        </div>
        
        <div className="flex items-center gap-4">
          <select 
            className="input-field min-w-48"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option value="all">Semua Semester</option>
            {academicData.semesters.map(semester => (
              <option key={semester.id} value={semester.id}>
                {semester.name}
              </option>
            ))}
          </select>
          <button className="btn-primary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Unduh Transkrip
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">IPK Kumulatif</p>
              <p className="text-2xl font-bold text-green-600">{weightedGPA.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total SKS</p>
              <p className="text-2xl font-bold text-primary-600">{totalCredits}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Semester</p>
              <p className="text-2xl font-bold text-gray-900">{student?.semester}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Predikat</p>
              <p className="text-2xl font-bold text-purple-600">
                {weightedGPA >= 3.5 ? 'Cum Laude' : 
                 weightedGPA >= 3.0 ? 'Sangat Baik' : 
                 weightedGPA >= 2.5 ? 'Baik' : 'Cukup'}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Academic Records */}
      <div className="space-y-6">
        {filteredSemesters.map((semester) => (
          <div key={semester.id} className="card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary-500" />
                  {semester.name}
                </h2>
                <div className="flex items-center gap-6 mt-2 text-sm text-gray-600">
                  <span>IPS: <strong className="text-gray-900">{semester.gpa}</strong></span>
                  <span>SKS: <strong className="text-gray-900">{semester.credits}</strong></span>
                </div>
              </div>
              <button className="btn-outline flex items-center gap-2">
                <Download className="w-4 h-4" />
                Unduh KHS
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Kode MK</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Mata Kuliah</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">SKS</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Nilai</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Bobot</th>
                  </tr>
                </thead>
                <tbody>
                  {semester.grades.map((grade, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="font-mono text-sm font-medium text-gray-900">
                          {grade.courseCode}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-900">{grade.courseName}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="font-semibold text-gray-900">{grade.credits}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(grade.grade)}`}>
                          {grade.grade}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="font-semibold text-gray-900">{grade.gradePoint.toFixed(1)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-gray-300 bg-gray-50">
                    <td colSpan={2} className="py-3 px-4 font-bold text-gray-900">
                      Total Semester
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-gray-900">
                      {semester.credits}
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-primary-600">
                      IPS: {semester.gpa}
                    </td>
                    <td className="py-3 px-4"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Grade Scale */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skala Penilaian</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { grade: 'A', range: '85-100', point: '4.0' },
            { grade: 'A-', range: '80-84', point: '3.7' },
            { grade: 'B+', range: '75-79', point: '3.3' },
            { grade: 'B', range: '70-74', point: '3.0' },
            { grade: 'B-', range: '65-69', point: '2.7' },
            { grade: 'C+', range: '60-64', point: '2.3' },
            { grade: 'C', range: '55-59', point: '2.0' },
            { grade: 'D', range: '40-54', point: '1.0' },
            { grade: 'E', range: '0-39', point: '0.0' },
          ].map((scale) => (
            <div key={scale.grade} className="text-center p-3 bg-gray-50 rounded-lg">
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${getGradeColor(scale.grade)}`}>
                {scale.grade}
              </div>
              <p className="text-xs text-gray-600">{scale.range}</p>
              <p className="text-xs font-semibold text-gray-900">{scale.point}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}