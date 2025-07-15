import { useState } from 'react';
import { Plus, Search, Edit, Trash2, BookOpen, Users, Calendar, Filter, Download, Upload } from 'lucide-react';
import { Course, StudyProgram } from '../../types/admin';

export function CourseManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [programFilter, setProgramFilter] = useState('all');
  const [semesterFilter, setSemesterFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Mock data
  const studyPrograms: StudyProgram[] = [
    { id: '1', facultyId: '1', code: 'AGR', name: 'Agroteknologi', level: 'S1', isActive: true, createdAt: '2024-01-15' },
    { id: '2', facultyId: '1', code: 'TP', name: 'Teknologi Pangan', level: 'S1', isActive: true, createdAt: '2024-01-15' },
    { id: '3', facultyId: '2', code: 'AGB', name: 'Agribisnis', level: 'S1', isActive: true, createdAt: '2024-01-15' }
  ];

  const courses: Course[] = [
    {
      id: '1',
      studyProgramId: '1',
      code: 'AGR101',
      name: 'Pengantar Ilmu Pertanian',
      credits: 3,
      semester: 1,
      courseType: 'Wajib',
      isActive: true,
      description: 'Mata kuliah pengantar tentang ilmu pertanian',
      createdAt: '2024-01-15',
      studyProgram: studyPrograms[0]
    },
    {
      id: '2',
      studyProgramId: '1',
      code: 'AGR201',
      name: 'Fisiologi Tumbuhan',
      credits: 3,
      semester: 3,
      courseType: 'Wajib',
      isActive: true,
      description: 'Mata kuliah tentang fisiologi tumbuhan',
      createdAt: '2024-01-15',
      studyProgram: studyPrograms[0]
    },
    {
      id: '3',
      studyProgramId: '2',
      code: 'TP301',
      name: 'Teknologi Pengolahan Pangan',
      credits: 4,
      semester: 5,
      courseType: 'Wajib',
      isActive: true,
      description: 'Mata kuliah tentang teknologi pengolahan pangan',
      createdAt: '2024-01-15',
      studyProgram: studyPrograms[1]
    }
  ];

  const [formData, setFormData] = useState({
    studyProgramId: '',
    code: '',
    name: '',
    credits: 3,
    semester: 1,
    courseType: 'Wajib' as 'Wajib' | 'Pilihan',
    isActive: true,
    description: ''
  });

  const getStatusColor = (status: boolean) => {
    return status ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const getCourseTypeColor = (type: string) => {
    return type === 'Wajib' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800';
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = programFilter === 'all' || course.studyProgramId === programFilter;
    const matchesSemester = semesterFilter === 'all' || course.semester.toString() === semesterFilter;
    return matchesSearch && matchesProgram && matchesSemester;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowCreateModal(false);
    setEditingCourse(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      studyProgramId: '',
      code: '',
      name: '',
      credits: 3,
      semester: 1,
      courseType: 'Wajib',
      isActive: true,
      description: ''
    });
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      studyProgramId: course.studyProgramId,
      code: course.code,
      name: course.name,
      credits: course.credits,
      semester: course.semester,
      courseType: course.courseType,
      isActive: course.isActive,
      description: course.description || ''
    });
    setShowCreateModal(true);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Mata Kuliah</h1>
          <p className="text-gray-600 mt-1">Kelola mata kuliah dan kurikulum</p>
        </div>
        
        <div className="flex gap-4">
          <button className="btn-outline flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Import Data
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Tambah Mata Kuliah
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Mata Kuliah</p>
              <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Mata Kuliah Aktif</p>
              <p className="text-2xl font-bold text-green-600">
                {courses.filter(c => c.isActive).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Mata Kuliah Wajib</p>
              <p className="text-2xl font-bold text-blue-600">
                {courses.filter(c => c.courseType === 'Wajib').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total SKS</p>
              <p className="text-2xl font-bold text-orange-600">
                {courses.reduce((sum, course) => sum + course.credits, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari mata kuliah atau kode..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              className="input-field min-w-40"
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
            >
              <option value="all">Semua Program Studi</option>
              {studyPrograms.map(program => (
                <option key={program.id} value={program.id}>
                  {program.name}
                </option>
              ))}
            </select>
            <select
              className="input-field min-w-32"
              value={semesterFilter}
              onChange={(e) => setSemesterFilter(e.target.value)}
            >
              <option value="all">Semua Semester</option>
              {[1,2,3,4,5,6,7,8].map(sem => (
                <option key={sem} value={sem.toString()}>
                  Semester {sem}
                </option>
              ))}
            </select>
          </div>
          <button className="btn-outline flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Courses Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Kode MK</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Nama Mata Kuliah</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">SKS</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Program Studi</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Semester</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Jenis</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className="font-mono text-sm font-medium text-gray-900">
                      {course.code}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{course.name}</p>
                      {course.description && (
                        <p className="text-sm text-gray-500 truncate max-w-xs">{course.description}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="font-semibold text-gray-900">{course.credits}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-900">{course.studyProgram?.name}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                      {course.semester}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCourseTypeColor(course.courseType)}`}>
                      {course.courseType}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(course.isActive)}`}>
                      {course.isActive ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleEdit(course)}
                        className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Tidak ada mata kuliah yang ditemukan</p>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingCourse ? 'Edit Mata Kuliah' : 'Tambah Mata Kuliah Baru'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                    Program Studi
                  </label>
                  <select 
                    className="input-field"
                    value={formData.studyProgramId}
                    onChange={(e) => setFormData({...formData, studyProgramId: e.target.value})}
                    required
                  >
                    <option value="">Pilih Program Studi</option>
                    {studyPrograms.map(program => (
                      <option key={program.id} value={program.id}>
                        {program.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                      Kode Mata Kuliah
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="AGR101"
                      value={formData.code}
                      onChange={(e) => setFormData({...formData, code: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                      SKS
                    </label>
                    <select 
                      className="input-field"
                      value={formData.credits}
                      onChange={(e) => setFormData({...formData, credits: parseInt(e.target.value)})}
                      required
                    >
                      <option value={1}>1 SKS</option>
                      <option value={2}>2 SKS</option>
                      <option value={3}>3 SKS</option>
                      <option value={4}>4 SKS</option>
                      <option value={5}>5 SKS</option>
                      <option value={6}>6 SKS</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                    Nama Mata Kuliah
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Pengantar Ilmu Pertanian"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                      Semester Ditawarkan
                    </label>
                    <select 
                      className="input-field"
                      value={formData.semester}
                      onChange={(e) => setFormData({...formData, semester: parseInt(e.target.value)})}
                      required
                    >
                      {[1,2,3,4,5,6,7,8].map(sem => (
                        <option key={sem} value={sem}>Semester {sem}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                      Jenis Mata Kuliah
                    </label>
                    <select 
                      className="input-field"
                      value={formData.courseType}
                      onChange={(e) => setFormData({...formData, courseType: e.target.value as 'Wajib' | 'Pilihan'})}
                      required
                    >
                      <option value="Wajib">Wajib</option>
                      <option value="Pilihan">Pilihan</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deskripsi
                  </label>
                  <textarea
                    className="input-field"
                    rows={3}
                    placeholder="Deskripsi mata kuliah..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-200"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  />
                  <label className="ml-2 text-sm text-gray-700 font-medium">
                    Status Aktif
                  </label>
                </div>

                <div className="flex gap-4 mt-6">
                  <button type="submit" className="btn-primary flex-1">
                    {editingCourse ? 'Update' : 'Simpan'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setEditingCourse(null);
                      resetForm();
                    }}
                    className="btn-outline flex-1"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}