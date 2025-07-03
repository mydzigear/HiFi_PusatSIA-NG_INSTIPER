import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Calendar, Filter, Download, Upload, Eye, MapPin, Clock, User, Sparkles, TrendingUp, Users } from 'lucide-react';
import { Agenda } from '../../types';

export function AgendaManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAgenda, setEditingAgenda] = useState<Agenda | null>(null);

  // Mock data
  const agenda: Agenda[] = [
    {
      id: '1',
      title: 'Seminar Nasional Teknologi Pertanian',
      description: 'Seminar nasional dengan tema "Inovasi Teknologi untuk Pertanian Berkelanjutan"',
      startDate: '2024-02-15',
      endDate: '2024-02-15',
      location: 'Auditorium INSTIPER',
      organizer: 'Fakultas Pertanian',
      category: 'seminar',
      status: 'scheduled',
      isPublic: true,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Workshop Penulisan Skripsi',
      description: 'Workshop untuk mahasiswa tingkat akhir tentang teknik penulisan skripsi yang baik dan benar',
      startDate: '2024-02-20',
      endDate: '2024-02-21',
      location: 'Ruang Seminar Lt. 2',
      organizer: 'Bagian Akademik',
      category: 'workshop',
      status: 'scheduled',
      isPublic: true,
      createdAt: '2024-01-12',
      updatedAt: '2024-01-18'
    },
    {
      id: '3',
      title: 'Ujian Tengah Semester',
      description: 'Pelaksanaan ujian tengah semester genap tahun akademik 2023/2024',
      startDate: '2024-03-01',
      endDate: '2024-03-15',
      location: 'Berbagai Ruang',
      organizer: 'Bagian Akademik',
      category: 'exam',
      status: 'scheduled',
      isPublic: true,
      createdAt: '2024-01-08',
      updatedAt: '2024-01-20'
    }
  ];

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    organizer: '',
    category: 'event' as 'academic' | 'seminar' | 'workshop' | 'exam' | 'event',
    status: 'scheduled' as 'scheduled' | 'ongoing' | 'completed' | 'cancelled',
    isPublic: true
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
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-blue-100 text-blue-800';
      case 'seminar': return 'bg-purple-100 text-purple-800';
      case 'workshop': return 'bg-orange-100 text-orange-800';
      case 'exam': return 'bg-red-100 text-red-800';
      case 'event': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return '📚';
      case 'seminar': return '🎤';
      case 'workshop': return '🛠️';
      case 'exam': return '📝';
      case 'event': return '🎉';
      default: return '📅';
    }
  };

  const filteredAgenda = agenda.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowCreateModal(false);
    setEditingAgenda(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      location: '',
      organizer: '',
      category: 'event',
      status: 'scheduled',
      isPublic: true
    });
  };

  const handleEdit = (item: Agenda) => {
    setEditingAgenda(item);
    setFormData({
      title: item.title,
      description: item.description,
      startDate: item.startDate,
      endDate: item.endDate,
      location: item.location,
      organizer: item.organizer,
      category: item.category,
      status: item.status,
      isPublic: item.isPublic
    });
    setShowCreateModal(true);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-6 h-6 text-purple-500" />
            <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">Event Management</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Agenda</h1>
          <p className="text-gray-600 mt-1">Kelola jadwal kegiatan dan acara kampus</p>
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
            Buat Agenda
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Agenda</p>
              <p className="text-2xl font-bold text-gray-900">{agenda.length}</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600">+15% bulan ini</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Terjadwal</p>
              <p className="text-2xl font-bold text-blue-600">
                {agenda.filter(a => a.status === 'scheduled').length}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3 text-blue-500" />
                <span className="text-xs text-blue-600">Upcoming</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Berlangsung</p>
              <p className="text-2xl font-bold text-green-600">
                {agenda.filter(a => a.status === 'ongoing').length}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <Eye className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600">Live now</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Selesai</p>
              <p className="text-2xl font-bold text-gray-600">
                {agenda.filter(a => a.status === 'completed').length}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <Users className="w-3 h-3 text-purple-500" />
                <span className="text-xs text-purple-600">2.5K peserta</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
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
                placeholder="Cari agenda..."
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
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">Semua Kategori</option>
              <option value="academic">Akademik</option>
              <option value="seminar">Seminar</option>
              <option value="workshop">Workshop</option>
              <option value="exam">Ujian</option>
              <option value="event">Acara</option>
            </select>
            <select
              className="input-field min-w-32"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Semua Status</option>
              <option value="scheduled">Terjadwal</option>
              <option value="ongoing">Berlangsung</option>
              <option value="completed">Selesai</option>
              <option value="cancelled">Dibatalkan</option>
            </select>
          </div>
          <button className="btn-outline flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Agenda Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgenda.map((item) => (
          <div key={item.id} className="card hover:scale-105 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(item.category)} flex items-center gap-1`}>
                <span>{getCategoryIcon(item.category)}</span>
                {item.category === 'academic' ? 'Akademik' :
                 item.category === 'seminar' ? 'Seminar' :
                 item.category === 'workshop' ? 'Workshop' :
                 item.category === 'exam' ? 'Ujian' : 'Acara'}
              </span>
              {item.isPublic && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  🌐 Publik
                </span>
              )}
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
              {item.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {item.description}
            </p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>
                  {item.startDate === item.endDate 
                    ? formatDate(item.startDate)
                    : `${formatDate(item.startDate)} - ${formatDate(item.endDate)}`
                  }
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <MapPin className="w-3 h-3" />
                <span>{item.location}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <User className="w-3 h-3" />
                <span>{item.organizer}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                {item.status === 'scheduled' ? '📅 Terjadwal' :
                 item.status === 'ongoing' ? '🔴 Live' :
                 item.status === 'completed' ? '✅ Selesai' : '❌ Dibatalkan'}
              </span>
              
              <div className="flex items-center gap-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Lihat">
                  <Eye className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleEdit(item)}
                  className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" 
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAgenda.length === 0 && (
        <div className="card text-center py-12">
          <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada agenda ditemukan</h3>
          <p className="text-gray-600 mb-4">Coba ubah filter pencarian atau buat agenda baru</p>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="btn-primary"
          >
            Buat Agenda Pertama
          </button>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {editingAgenda ? 'Edit Agenda' : 'Buat Agenda Baru'}
                  </h3>
                  <p className="text-gray-600">Buat acara yang menarik untuk komunitas kampus</p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    Judul Agenda *
                  </label>
                  <input
                    type="text"
                    className="input-field text-base"
                    placeholder="Masukkan judul acara yang menarik..."
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    Deskripsi *
                  </label>
                  <textarea
                    className="input-field text-base"
                    rows={4}
                    placeholder="Deskripsi lengkap agenda..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Tanggal Mulai *
                    </label>
                    <input
                      type="date"
                      className="input-field text-base"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Tanggal Selesai *
                    </label>
                    <input
                      type="date"
                      className="input-field text-base"
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Lokasi *
                    </label>
                    <input
                      type="text"
                      className="input-field text-base"
                      placeholder="Lokasi kegiatan..."
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Penyelenggara *
                    </label>
                    <input
                      type="text"
                      className="input-field text-base"
                      placeholder="Nama penyelenggara..."
                      value={formData.organizer}
                      onChange={(e) => setFormData({...formData, organizer: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Kategori *
                    </label>
                    <select 
                      className="input-field text-base"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value as 'academic' | 'seminar' | 'workshop' | 'exam' | 'event'})}
                      required
                    >
                      <option value="event">🎉 Acara</option>
                      <option value="academic">📚 Akademik</option>
                      <option value="seminar">🎤 Seminar</option>
                      <option value="workshop">🛠️ Workshop</option>
                      <option value="exam">📝 Ujian</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Status *
                    </label>
                    <select 
                      className="input-field text-base"
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value as 'scheduled' | 'ongoing' | 'completed' | 'cancelled'})}
                      required
                    >
                      <option value="scheduled">📅 Terjadwal</option>
                      <option value="ongoing">🔴 Berlangsung</option>
                      <option value="completed">✅ Selesai</option>
                      <option value="cancelled">❌ Dibatalkan</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-200"
                    checked={formData.isPublic}
                    onChange={(e) => setFormData({...formData, isPublic: e.target.checked})}
                  />
                  <label className="ml-2 text-sm text-gray-700 font-medium flex items-center gap-1">
                    🌐 Publikasikan untuk umum (akan ditampilkan di website)
                  </label>
                </div>

                <div className="flex gap-4 mt-6">
                  <button type="submit" className="btn-primary flex-1">
                    {editingAgenda ? 'Update Agenda' : 'Buat Agenda'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setEditingAgenda(null);
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