import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, BookOpen, Filter, Download, Upload, Building } from 'lucide-react';
import { StudyProgram, Faculty } from '../../types/admin';

export function StudyProgramManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [facultyFilter, setFacultyFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState<StudyProgram | null>(null);

  // Mock data
  const faculties: Faculty[] = [
    {
      id: '1',
      name: 'Fakultas Pertanian',
      code: 'FP',
      description: 'Fakultas Pertanian dan Teknologi Pangan',
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      name: 'Fakultas Ekonomi',
      code: 'FE',
      description: 'Fakultas Ekonomi dan Bisnis',
      isActive: true,
      createdAt: '2024-01-01'
    }
  ];

  const studyPrograms: StudyProgram[] = [
    {
      id: '1',
      facultyId: '1',
      code: 'AGR',
      name: 'Agroteknologi',
      level: 'S1',
      isActive: true,
      pddiktiUuid: 'uuid-agr-001',
      createdAt: '2024-01-15',
      faculty: faculties[0]
    },
    {
      id: '2',
      facultyId: '1',
      code: 'TP',
      name: 'Teknologi Pangan',
      level: 'S1',
      isActive: true,
      pddiktiUuid: 'uuid-tp-001',
      createdAt: '2024-01-15',
      faculty: faculties[0]
    },
    {
      id: '3',
      facultyId: '2',
      code: 'AGB',
      name: 'Agribisnis',
      level: 'S1',
      isActive: true,
      pddiktiUuid: 'uuid-agb-001',
      createdAt: '2024-01-15',
      faculty: faculties[1]
    }
  ];

  const [formData, setFormData] = useState({
    facultyId: '',
    code: '',
    name: '',
    level: 'S1' as 'S1' | 'S2' | 'D3',
    isActive: true,
    pddiktiUuid: ''
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: boolean) => {
    return status ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'S1': return 'bg-blue-100 text-blue-800';
      case 'S2': return 'bg-purple-100 text-purple-800';
      case 'D3': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPrograms = studyPrograms.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFaculty = facultyFilter === 'all' || program.facultyId === facultyFilter;
    return matchesSearch && matchesFaculty;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle create/update logic here
    console.log('Form submitted:', formData);
    setShowCreateModal(false);
    setEditingProgram(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      facultyId: '',
      code: '',
      name: '',
      level: 'S1',
      isActive: true,
      pddiktiUuid: ''
    });
  };

  const handleEdit = (program: StudyProgram) => {
    setEditingProgram(program);
    setFormData({
      facultyId: program.facultyId,
      code: program.code,
      name: program.name,
      level: program.level,
      isActive: program.isActive,
      pddiktiUuid: program.pddiktiUuid || ''
    });
    setShowCreateModal(true);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Program Studi</h1>
          <p className="text-gray-600 mt-1">Kelola data master program studi</p>
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
            Tambah Program Studi
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Program Studi</p>
              <p className="text-2xl font-bold text-gray-900">{studyPrograms.length}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Program Aktif</p>
              <p className="text-2xl font-bold text-green-600">
                {studyPrograms.filter(p => p.isActive).length}
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
              <p className="text-gray-600 text-sm">Program S1</p>
              <p className="text-2xl font-bold text-blue-600">
                {studyPrograms.filter(p => p.level === 'S1').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Fakultas</p>
              <p className="text-2xl font-bold text-purple-600">{faculties.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-purple-600" />
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
                placeholder="Cari program studi atau kode..."
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
              value={facultyFilter}
              onChange={(e) => setFacultyFilter(e.target.value)}
            >
              <option value="all">Semua Fakultas</option>
              {faculties.map(faculty => (
                <option key={faculty.id} value={faculty.id}>
                  {faculty.name}
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

      {/* Programs Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Kode Prodi</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Nama Prodi</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Jenjang</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Fakultas</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrograms.map((program) => (
                <tr key={program.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className="font-mono text-sm font-medium text-gray-900">
                      {program.code}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{program.name}</p>
                      {program.pddiktiUuid && (
                        <p className="text-xs text-gray-500">PDDIKTI: {program.pddiktiUuid}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(program.level)}`}>
                      {program.level}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-900">{program.faculty?.name}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(program.isActive)}`}>
                      {program.isActive ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleEdit(program)}
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

        {filteredPrograms.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Tidak ada program studi yang ditemukan</p>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingProgram ? 'Edit Program Studi' : 'Tambah Program Studi Baru'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                    Fakultas
                  </label>
                  <select 
                    className="input-field"
                    value={formData.facultyId}
                    onChange={(e) => setFormData({...formData, facultyId: e.target.value})}
                    required
                  >
                    <option value="">Pilih Fakultas</option>
                    {faculties.map(faculty => (
                      <option key={faculty.id} value={faculty.id}>
                        {faculty.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                    Kode Prodi
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="AGR"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                    Nama Prodi
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Agroteknologi"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                    Jenjang
                  </label>
                  <select 
                    className="input-field"
                    value={formData.level}
                    onChange={(e) => setFormData({...formData, level: e.target.value as 'S1' | 'S2' | 'D3'})}
                    required
                  >
                    <option value="S1">S1</option>
                    <option value="S2">S2</option>
                    <option value="D3">D3</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PDDIKTI UUID
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="uuid-agr-001"
                    value={formData.pddiktiUuid}
                    onChange={(e) => setFormData({...formData, pddiktiUuid: e.target.value})}
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
                    {editingProgram ? 'Update' : 'Simpan'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setEditingProgram(null);
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