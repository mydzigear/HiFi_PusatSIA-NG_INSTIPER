import { useState } from 'react';
import { Plus, Search, Edit, Trash2, BookOpen, Filter, Download, Upload } from 'lucide-react';
import { Specialization, StudyProgram } from '../../types/admin';

export function SpecializationManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [programFilter, setProgramFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingSpecialization, setEditingSpecialization] = useState<Specialization | null>(null);

  // Mock data
  const studyPrograms: StudyProgram[] = [
    {
      id: '1',
      facultyId: '1',
      code: 'AGR',
      name: 'Agroteknologi',
      level: 'S1',
      isActive: true,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      facultyId: '1',
      code: 'TP',
      name: 'Teknologi Pangan',
      level: 'S1',
      isActive: true,
      createdAt: '2024-01-15'
    }
  ];

  const specializations: Specialization[] = [
    {
      id: '1',
      studyProgramId: '1',
      code: 'AGR-HRT',
      name: 'Hortikultura',
      isActive: true,
      createdAt: '2024-01-15',
      studyProgram: studyPrograms[0]
    },
    {
      id: '2',
      studyProgramId: '1',
      code: 'AGR-AGR',
      name: 'Agronomi',
      isActive: true,
      createdAt: '2024-01-15',
      studyProgram: studyPrograms[0]
    },
    {
      id: '3',
      studyProgramId: '2',
      code: 'TP-FT',
      name: 'Food Technology',
      isActive: true,
      createdAt: '2024-01-15',
      studyProgram: studyPrograms[1]
    }
  ];

  const [formData, setFormData] = useState({
    studyProgramId: '',
    code: '',
    name: '',
    isActive: true
  });


  const getStatusColor = (status: boolean) => {
    return status ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const filteredSpecializations = specializations.filter(spec => {
    const matchesSearch = spec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         spec.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = programFilter === 'all' || spec.studyProgramId === programFilter;
    return matchesSearch && matchesProgram;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowCreateModal(false);
    setEditingSpecialization(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      studyProgramId: '',
      code: '',
      name: '',
      isActive: true
    });
  };

  const handleEdit = (specialization: Specialization) => {
    setEditingSpecialization(specialization);
    setFormData({
      studyProgramId: specialization.studyProgramId,
      code: specialization.code,
      name: specialization.name,
      isActive: specialization.isActive
    });
    setShowCreateModal(true);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Peminatan</h1>
          <p className="text-gray-600 mt-1">Kelola peminatan/konsentrasi program studi</p>
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
            Tambah Peminatan
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Peminatan</p>
              <p className="text-2xl font-bold text-gray-900">{specializations.length}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Peminatan Aktif</p>
              <p className="text-2xl font-bold text-green-600">
                {specializations.filter(s => s.isActive).length}
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
              <p className="text-gray-600 text-sm">Program Studi</p>
              <p className="text-2xl font-bold text-blue-600">{studyPrograms.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
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
                placeholder="Cari peminatan atau kode..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              className="input-field min-w-48"
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
          </div>
          <button className="btn-outline flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Specializations Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Kode Peminatan</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Nama Peminatan</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Program Studi Induk</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredSpecializations.map((specialization) => (
                <tr key={specialization.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className="font-mono text-sm font-medium text-gray-900">
                      {specialization.code}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-gray-900">{specialization.name}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-900">{specialization.studyProgram?.name}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(specialization.isActive)}`}>
                      {specialization.isActive ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleEdit(specialization)}
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

        {filteredSpecializations.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Tidak ada peminatan yang ditemukan</p>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingSpecialization ? 'Edit Peminatan' : 'Tambah Peminatan Baru'}
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                    Kode Peminatan
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="AGR-HRT"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                    Nama Peminatan
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Hortikultura"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
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
                    {editingSpecialization ? 'Update' : 'Simpan'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setEditingSpecialization(null);
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