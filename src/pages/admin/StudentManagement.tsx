import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Users, Filter, Download, Upload, Eye, Key } from 'lucide-react';
import { StudentData, StudyProgram, Specialization, EntryPath } from '../../types/admin';

export function StudentManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [programFilter, setProgramFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentData | null>(null);
  const [activeTab, setActiveTab] = useState<'academic' | 'account'>('academic');

  // Mock data
  const studyPrograms: StudyProgram[] = [
    { id: '1', facultyId: '1', code: 'AGR', name: 'Agroteknologi', level: 'S1', isActive: true, createdAt: '2024-01-15' },
    { id: '2', facultyId: '1', code: 'TP', name: 'Teknologi Pangan', level: 'S1', isActive: true, createdAt: '2024-01-15' },
    { id: '3', facultyId: '2', code: 'AGB', name: 'Agribisnis', level: 'S1', isActive: true, createdAt: '2024-01-15' }
  ];

  const specializations: Specialization[] = [
    { id: '1', studyProgramId: '1', code: 'AGR-HRT', name: 'Hortikultura', isActive: true, createdAt: '2024-01-15' },
    { id: '2', studyProgramId: '1', code: 'AGR-AGR', name: 'Agronomi', isActive: true, createdAt: '2024-01-15' }
  ];

  const entryPaths: EntryPath[] = [
    { id: '1', name: 'Reguler', code: 'REG', isActive: true, createdAt: '2024-01-15' },
    { id: '2', name: 'Mandiri', code: 'MAN', isActive: true, createdAt: '2024-01-15' },
    { id: '3', name: 'Beasiswa', code: 'BEA', isActive: true, createdAt: '2024-01-15' }
  ];

  const students: StudentData[] = [
    {
      id: '1',
      nim: '2024001',
      registrationNumber: 'REG2024001',
      fullName: 'Ahmad Rizki Pratama',
      studyProgramId: '1',
      specializationId: '1',
      entryPathId: '1',
      academicYear: '2024',
      academicStatus: 'Aktif',
      userId: 'user1',
      createdAt: '2024-01-15',
      studyProgram: studyPrograms[0],
      specialization: specializations[0],
      entryPath: entryPaths[0],
      user: { id: 'user1', username: 'ahmad.rizki', email: 'ahmad.rizki@student.instiper.ac.id' }
    },
    {
      id: '2',
      nim: '2024002',
      registrationNumber: 'REG2024002',
      fullName: 'Siti Nurhaliza',
      studyProgramId: '2',
      entryPathId: '2',
      academicYear: '2024',
      academicStatus: 'Aktif',
      userId: 'user2',
      createdAt: '2024-01-15',
      studyProgram: studyPrograms[1],
      entryPath: entryPaths[1],
      user: { id: 'user2', username: 'siti.nurhaliza', email: 'siti.nurhaliza@student.instiper.ac.id' }
    }
  ];

  const [formData, setFormData] = useState({
    nim: '',
    registrationNumber: '',
    fullName: '',
    studyProgramId: '',
    specializationId: '',
    entryPathId: '',
    academicYear: '',
    academicStatus: 'Aktif' as 'Aktif' | 'Cuti' | 'Lulus' | 'DO',
    username: '',
    email: '',
    password: ''
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aktif': return 'bg-green-100 text-green-800';
      case 'Cuti': return 'bg-yellow-100 text-yellow-800';
      case 'Lulus': return 'bg-blue-100 text-blue-800';
      case 'DO': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.nim.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = programFilter === 'all' || student.studyProgramId === programFilter;
    const matchesStatus = statusFilter === 'all' || student.academicStatus === statusFilter;
    return matchesSearch && matchesProgram && matchesStatus;
  });

  const availableSpecializations = specializations.filter(spec => 
    spec.studyProgramId === formData.studyProgramId
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowCreateModal(false);
    setEditingStudent(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      nim: '',
      registrationNumber: '',
      fullName: '',
      studyProgramId: '',
      specializationId: '',
      entryPathId: '',
      academicYear: '',
      academicStatus: 'Aktif',
      username: '',
      email: '',
      password: ''
    });
    setActiveTab('academic');
  };

  const handleEdit = (student: StudentData) => {
    setEditingStudent(student);
    setFormData({
      nim: student.nim,
      registrationNumber: student.registrationNumber || '',
      fullName: student.fullName,
      studyProgramId: student.studyProgramId,
      specializationId: student.specializationId || '',
      entryPathId: student.entryPathId,
      academicYear: student.academicYear,
      academicStatus: student.academicStatus,
      username: student.user?.username || '',
      email: student.user?.email || '',
      password: ''
    });
    setShowCreateModal(true);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Mahasiswa</h1>
          <p className="text-gray-600 mt-1">Kelola data detail mahasiswa</p>
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
            Tambah Mahasiswa
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Mahasiswa</p>
              <p className="text-2xl font-bold text-gray-900">{students.length}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Mahasiswa Aktif</p>
              <p className="text-2xl font-bold text-green-600">
                {students.filter(s => s.academicStatus === 'Aktif').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Angkatan 2024</p>
              <p className="text-2xl font-bold text-blue-600">
                {students.filter(s => s.academicYear === '2024').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Lulus</p>
              <p className="text-2xl font-bold text-purple-600">
                {students.filter(s => s.academicStatus === 'Lulus').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
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
                placeholder="Cari berdasarkan NIM atau nama lengkap..."
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
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Cuti">Cuti</option>
              <option value="Lulus">Lulus</option>
              <option value="DO">DO</option>
            </select>
          </div>
          <button className="btn-outline flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">NIM</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Nama Lengkap</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Program Studi</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Angkatan</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Status Akademik</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className="font-mono text-sm font-medium text-gray-900">
                      {student.nim}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{student.fullName}</p>
                      <p className="text-sm text-gray-500">{student.user?.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-gray-900">{student.studyProgram?.name}</p>
                      {student.specialization && (
                        <p className="text-sm text-gray-500">{student.specialization.name}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                      {student.academicYear}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(student.academicStatus)}`}>
                      {student.academicStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Lihat Detail">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEdit(student)}
                        className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg" 
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg" title="Reset Password">
                        <Key className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Hapus">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Tidak ada mahasiswa yang ditemukan</p>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingStudent ? 'Edit Data Mahasiswa' : 'Tambah Mahasiswa Baru'}
              </h3>
              
              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab('academic')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'academic'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Data Akademik
                  </button>
                  <button
                    onClick={() => setActiveTab('account')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'account'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Akun Login
                  </button>
                </nav>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {activeTab === 'academic' && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                        NIM
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="2024001"
                        value={formData.nim}
                        onChange={(e) => setFormData({...formData, nim: e.target.value})}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nomor Pendaftar
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="REG2024001"
                        value={formData.registrationNumber}
                        onChange={(e) => setFormData({...formData, registrationNumber: e.target.value})}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="Ahmad Rizki Pratama"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                        Program Studi
                      </label>
                      <select 
                        className="input-field"
                        value={formData.studyProgramId}
                        onChange={(e) => setFormData({...formData, studyProgramId: e.target.value, specializationId: ''})}
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

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Peminatan
                      </label>
                      <select 
                        className="input-field"
                        value={formData.specializationId}
                        onChange={(e) => setFormData({...formData, specializationId: e.target.value})}
                        disabled={!formData.studyProgramId}
                      >
                        <option value="">Pilih Peminatan (Opsional)</option>
                        {availableSpecializations.map(spec => (
                          <option key={spec.id} value={spec.id}>
                            {spec.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                        Jalur Masuk
                      </label>
                      <select 
                        className="input-field"
                        value={formData.entryPathId}
                        onChange={(e) => setFormData({...formData, entryPathId: e.target.value})}
                        required
                      >
                        <option value="">Pilih Jalur Masuk</option>
                        {entryPaths.map(path => (
                          <option key={path.id} value={path.id}>
                            {path.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                        Tahun Angkatan
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="2024"
                        value={formData.academicYear}
                        onChange={(e) => setFormData({...formData, academicYear: e.target.value})}
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                        Status Akademik
                      </label>
                      <select 
                        className="input-field"
                        value={formData.academicStatus}
                        onChange={(e) => setFormData({...formData, academicStatus: e.target.value as 'Aktif' | 'Cuti' | 'Lulus' | 'DO'})}
                        required
                      >
                        <option value="Aktif">Aktif</option>
                        <option value="Cuti">Cuti</option>
                        <option value="Lulus">Lulus</option>
                        <option value="DO">DO</option>
                      </select>
                    </div>
                  </div>
                )}

                {activeTab === 'account' && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                        Username
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="ahmad.rizki"
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                        Email
                      </label>
                      <input
                        type="email"
                        className="input-field"
                        placeholder="ahmad.rizki@student.instiper.ac.id"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>

                    {!editingStudent && (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                          Password
                        </label>
                        <input
                          type="password"
                          className="input-field"
                          placeholder="Password untuk akun mahasiswa"
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          required={!editingStudent}
                        />
                      </div>
                    )}

                    {editingStudent && (
                      <div className="md:col-span-2">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <p className="text-yellow-700 text-sm">
                            Untuk mengubah password, gunakan tombol "Reset Password" di tabel data mahasiswa.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex gap-4 mt-6">
                  <button type="submit" className="btn-primary flex-1">
                    {editingStudent ? 'Update' : 'Simpan'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setEditingStudent(null);
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