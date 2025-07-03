import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Calendar, Filter, Download, AlertCircle } from 'lucide-react';
import { AcademicPeriod } from '../../types/admin';

export function AcademicPeriodManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPeriod, setEditingPeriod] = useState<AcademicPeriod | null>(null);

  // Mock data
  const academicPeriods: AcademicPeriod[] = [
    {
      id: '1',
      academicYear: '2024',
      periodType: 'Ganjil',
      isActive: true,
      startDate: '2024-08-01',
      endDate: '2024-12-31',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      academicYear: '2024',
      periodType: 'Genap',
      isActive: false,
      startDate: '2025-01-01',
      endDate: '2025-06-30',
      createdAt: '2024-01-15'
    },
    {
      id: '3',
      academicYear: '2023',
      periodType: 'Genap',
      isActive: false,
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      createdAt: '2023-12-01'
    }
  ];

  const [formData, setFormData] = useState({
    academicYear: '',
    periodType: 'Ganjil' as 'Ganjil' | 'Genap' | 'Pendek',
    startDate: '',
    endDate: '',
    isActive: false
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

  const getPeriodTypeColor = (type: string) => {
    switch (type) {
      case 'Ganjil': return 'bg-blue-100 text-blue-800';
      case 'Genap': return 'bg-purple-100 text-purple-800';
      case 'Pendek': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPeriods = academicPeriods.filter(period => {
    const searchString = `${period.academicYear} ${period.periodType}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  const activePeriod = academicPeriods.find(p => p.isActive);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowCreateModal(false);
    setEditingPeriod(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      academicYear: '',
      periodType: 'Ganjil',
      startDate: '',
      endDate: '',
      isActive: false
    });
  };

  const handleEdit = (period: AcademicPeriod) => {
    setEditingPeriod(period);
    setFormData({
      academicYear: period.academicYear,
      periodType: period.periodType,
      startDate: period.startDate,
      endDate: period.endDate,
      isActive: period.isActive
    });
    setShowCreateModal(true);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Periode Akademik</h1>
          <p className="text-gray-600 mt-1">Kelola periode/semester akademik</p>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Tambah Periode
          </button>
        </div>
      </div>

      {/* Active Period Alert */}
      {activePeriod && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-green-600" />
            <div>
              <h3 className="font-semibold text-green-800">Periode Akademik Aktif</h3>
              <p className="text-green-700">
                {activePeriod.academicYear} {activePeriod.periodType} 
                ({formatDate(activePeriod.startDate)} - {formatDate(activePeriod.endDate)})
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Periode</p>
              <p className="text-2xl font-bold text-gray-900">{academicPeriods.length}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Periode Aktif</p>
              <p className="text-2xl font-bold text-green-600">
                {academicPeriods.filter(p => p.isActive).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Tahun Akademik</p>
              <p className="text-2xl font-bold text-blue-600">
                {new Set(academicPeriods.map(p => p.academicYear)).size}
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
              <p className="text-gray-600 text-sm">Periode Ganjil</p>
              <p className="text-2xl font-bold text-purple-600">
                {academicPeriods.filter(p => p.periodType === 'Ganjil').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
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
                placeholder="Cari tahun akademik atau jenis periode..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <button className="btn-outline flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Periods Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Tahun Akademik</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Jenis Periode</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Tanggal Mulai</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Tanggal Selesai</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredPeriods.map((period) => (
                <tr key={period.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className="font-semibold text-gray-900">{period.academicYear}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPeriodTypeColor(period.periodType)}`}>
                      {period.periodType}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-900">{formatDate(period.startDate)}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-900">{formatDate(period.endDate)}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(period.isActive)}`}>
                      {period.isActive ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleEdit(period)}
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

        {filteredPeriods.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Tidak ada periode akademik yang ditemukan</p>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingPeriod ? 'Edit Periode Akademik' : 'Tambah Periode Akademik Baru'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                    Tahun Akademik
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="2024"
                    value={formData.academicYear}
                    onChange={(e) => setFormData({...formData, academicYear: e.target.value})}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Format: YYYY (contoh: 2024)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                    Jenis Periode
                  </label>
                  <select 
                    className="input-field"
                    value={formData.periodType}
                    onChange={(e) => setFormData({...formData, periodType: e.target.value as 'Ganjil' | 'Genap' | 'Pendek'})}
                    required
                  >
                    <option value="Ganjil">Ganjil</option>
                    <option value="Genap">Genap</option>
                    <option value="Pendek">Pendek</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                    Tanggal Mulai
                  </label>
                  <input
                    type="date"
                    className="input-field"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                    Tanggal Selesai
                  </label>
                  <input
                    type="date"
                    className="input-field"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
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
                    Jadikan Periode Aktif
                  </label>
                </div>

                {formData.isActive && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                      <p className="text-yellow-700 text-sm font-medium">
                        Hanya satu periode yang dapat aktif pada satu waktu. 
                        Periode aktif lainnya akan dinonaktifkan secara otomatis.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 mt-6">
                  <button type="submit" className="btn-primary flex-1">
                    {editingPeriod ? 'Update' : 'Simpan'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setEditingPeriod(null);
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