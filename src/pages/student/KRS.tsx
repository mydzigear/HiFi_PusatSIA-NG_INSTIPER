import React, { useState } from 'react';
import { Plus, Trash2, Search, Filter, BookOpen, Users, Calendar, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Course } from '../../types';

export function KRS() {
  const { courses } = useApp();
  const [selectedCourses, setSelectedCourses] = useState<string[]>(['1', '2']); // Mock selected courses
  const [searchTerm, setSearchTerm] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('all');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSemester = semesterFilter === 'all' || course.semester.toString() === semesterFilter;
    return matchesSearch && matchesSemester;
  });

  const selectedCourseObjects = courses.filter(course => selectedCourses.includes(course.id));
  const totalCredits = selectedCourseObjects.reduce((sum, course) => sum + course.credits, 0);

  const handleAddCourse = (courseId: string) => {
    if (!selectedCourses.includes(courseId)) {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  const handleRemoveCourse = (courseId: string) => {
    setSelectedCourses(selectedCourses.filter(id => id !== courseId));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">KRS Online</h1>
          <p className="text-gray-600 mt-1">Kartu Rencana Studi Semester Genap 2023/2024</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-primary-50 px-4 py-2 rounded-lg">
            <p className="text-sm text-primary-600">Total SKS: <span className="font-bold">{totalCredits}</span></p>
          </div>
          <button className="btn-primary">
            Simpan KRS
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course Selection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters */}
          <div className="card">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Cari mata kuliah..."
                    className="input-field pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  className="input-field min-w-32"
                  value={semesterFilter}
                  onChange={(e) => setSemesterFilter(e.target.value)}
                >
                  <option value="all">Semua Semester</option>
                  <option value="1">Semester 1</option>
                  <option value="2">Semester 2</option>
                  <option value="3">Semester 3</option>
                  <option value="4">Semester 4</option>
                  <option value="5">Semester 5</option>
                  <option value="6">Semester 6</option>
                </select>
              </div>
            </div>
          </div>

          {/* Available Courses */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary-500" />
              Mata Kuliah Tersedia
            </h2>

            <div className="space-y-4">
              {filteredCourses.map((course) => {
                const isSelected = selectedCourses.includes(course.id);
                const isFullyBooked = course.enrolled >= course.quota;
                
                return (
                  <div
                    key={course.id}
                    className={`p-4 border rounded-lg transition-all ${
                      isSelected
                        ? 'border-primary-200 bg-primary-50'
                        : isFullyBooked
                        ? 'border-gray-200 bg-gray-50 opacity-60'
                        : 'border-gray-200 bg-white hover:border-primary-200 hover:bg-primary-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{course.name}</h3>
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {course.code}
                          </span>
                          <span className="px-2 py-1 bg-primary-100 text-primary-600 text-xs rounded-full">
                            {course.credits} SKS
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{course.lecturer}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Semester {course.semester}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{course.schedule}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <span className={`${course.enrolled >= course.quota * 0.8 ? 'text-orange-600' : 'text-green-600'}`}>
                              Kuota: {course.enrolled}/{course.quota}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="ml-4">
                        {isSelected ? (
                          <button
                            onClick={() => handleRemoveCourse(course.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Hapus
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAddCourse(course.id)}
                            disabled={isFullyBooked}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                              isFullyBooked
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
                            }`}
                          >
                            <Plus className="w-4 h-4" />
                            {isFullyBooked ? 'Penuh' : 'Tambah'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Tidak ada mata kuliah yang ditemukan</p>
              </div>
            )}
          </div>
        </div>

        {/* Selected Courses Summary */}
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">KRS Saya</h2>

            {selectedCourseObjects.length > 0 ? (
              <div className="space-y-4">
                {selectedCourseObjects.map((course) => (
                  <div key={course.id} className="p-3 bg-primary-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{course.name}</h3>
                      <button
                        onClick={() => handleRemoveCourse(course.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">{course.code} • {course.credits} SKS</p>
                    <p className="text-xs text-gray-500 mt-1">{course.schedule}</p>
                  </div>
                ))}

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total SKS:</span>
                    <span className="text-primary-600">{totalCredits}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Belum ada mata kuliah yang dipilih</p>
              </div>
            )}
          </div>

          {/* KRS Guidelines */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Panduan KRS</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p>Maksimal 24 SKS per semester untuk mahasiswa dengan IPK ≥ 3.0</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p>Maksimal 20 SKS per semester untuk mahasiswa dengan IPK &lt; 3.0</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p>Pastikan tidak ada bentrok jadwal mata kuliah</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p>Perhatikan prasyarat mata kuliah sebelum mengambil</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}