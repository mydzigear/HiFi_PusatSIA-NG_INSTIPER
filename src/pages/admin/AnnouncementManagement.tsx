import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Bell, Filter, Download, Upload, Eye, Calendar, User, Sparkles, TrendingUp, Users } from 'lucide-react';
import { Announcement } from '../../types';

export function AnnouncementManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);

  // Mock data
  const announcements: Announcement[] = [
    {
      id: '1',
      title: 'Pembukaan Pendaftaran Mahasiswa Baru 2024/2025',
      content: 'Pendaftaran mahasiswa baru untuk tahun akademik 2024/2025 telah dibuka...',
      excerpt: 'Pendaftaran mahasiswa baru untuk tahun akademik 2024/2025 telah dibuka. Daftar sekarang dan raih masa depan cerah bersama INSTIPER.',
      author: 'Admin Akademik',
      publishDate: '2024-01-20',
      category: 'academic',
      status: 'published',
      featured: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: '2',
      title: 'Pengumuman Jadwal Ujian Tengah Semester',
      content: 'Jadwal ujian tengah semester genap 2023/2024 telah ditetapkan...',
      excerpt: 'Jadwal ujian tengah semester genap 2023/2024 telah ditetapkan. Mahasiswa diharapkan mempersiapkan diri dengan baik.',
      author: 'Bagian Akademik',
      publishDate: '2024-01-18',
      category: 'academic',
      status: 'published',
      featured: false,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-18'
    },
    {
      id: '3',
      title: 'Beasiswa Prestasi Akademik 2024',
      content: 'Program beasiswa prestasi akademik untuk mahasiswa berprestasi...',
      excerpt: 'Program beasiswa prestasi akademik untuk mahasiswa berprestasi telah dibuka. Syarat dan ketentuan dapat dilihat di pengumuman lengkap.',
      author: 'Bagian Kemahasiswaan',
      publishDate: '2024-01-15',
      category: 'general',
      status: 'published',
      featured: true,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-15'
    }
  ];

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'general' as 'academic' | 'general' | 'urgent',
    status: 'draft' as 'draft' | 'published' | 'archived',
    featured: false
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
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-blue-100 text-blue-800';
      case 'general': return 'bg-green-100 text-green-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return '🎓';
      case 'general': return '📢';
      case 'urgent': return '🚨';
      default: return '📝';
    }
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || announcement.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || announcement.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowCreateModal(false);
    setEditingAnnouncement(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      category: 'general',
      status: 'draft',
      featured: false
    });
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      excerpt: announcement.excerpt,
      category: announcement.category,
      status: announcement.status,
      featured: announcement.featured
    });
    setShowCreateModal(true);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-6 h-6 text-orange-500" />
            <span className="text-sm font-medium text-orange-600 bg-orange-100 px-3 py-1 rounded-full">Content Management</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Pengumuman</h1>
          <p className="text-gray-600 mt-1">Kelola pengumuman dan berita kampus</p>
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
            Buat Pengumuman
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Pengumuman</p>
              <p className="text-2xl font-bold text-gray-900">{announcements.length}</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600">+12% bulan ini</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Dipublikasi</p>
              <p className="text-2xl font-bold text-green-600">
                {announcements.filter(a => a.status === 'published').length}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <Eye className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600">Live</span>
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
              <p className="text-gray-600 text-sm">Draft</p>
              <p className="text-2xl font-bold text-yellow-600">
                {announcements.filter(a => a.status === 'draft').length}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <Edit className="w-3 h-3 text-yellow-500" />
                <span className="text-xs text-yellow-600">Pending</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Edit className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Views Bulan Ini</p>
              <p className="text-2xl font-bold text-purple-600">15.2K</p>
              <div className="flex items-center gap-1 mt-1">
                <Users className="w-3 h-3 text-purple-500" />
                <span className="text-xs text-purple-600">+25% dari bulan lalu</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
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
                placeholder="Cari pengumuman..."
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
              <option value="general">Umum</option>
              <option value="urgent">Penting</option>
            </select>
            <select
              className="input-field min-w-32"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Semua Status</option>
              <option value="published">Dipublikasi</option>
              <option value="draft">Draft</option>
              <option value="archived">Arsip</option>
            </select>
          </div>
          <button className="btn-outline flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Announcements Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAnnouncements.map((announcement) => (
          <div key={announcement.id} className="card hover:scale-105 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(announcement.category)} flex items-center gap-1`}>
                <span>{getCategoryIcon(announcement.category)}</span>
                {announcement.category === 'academic' ? 'Akademik' :
                 announcement.category === 'general' ? 'Umum' : 'Penting'}
              </span>
              {announcement.featured && (
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Featured
                </span>
              )}
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
              {announcement.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {announcement.excerpt}
            </p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <User className="w-3 h-3" />
                <span>{announcement.author}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(announcement.publishDate)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(announcement.status)}`}>
                {announcement.status === 'published' ? '🟢 Live' :
                 announcement.status === 'draft' ? '🟡 Draft' : '⚫ Arsip'}
              </span>
              
              <div className="flex items-center gap-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Lihat">
                  <Eye className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleEdit(announcement)}
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

      {filteredAnnouncements.length === 0 && (
        <div className="card text-center py-12">
          <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada pengumuman ditemukan</h3>
          <p className="text-gray-600 mb-4">Coba ubah filter pencarian atau buat pengumuman baru</p>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="btn-primary"
          >
            Buat Pengumuman Pertama
          </button>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {editingAnnouncement ? 'Edit Pengumuman' : 'Buat Pengumuman Baru'}
                  </h3>
                  <p className="text-gray-600">Sampaikan informasi penting kepada civitas akademika</p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    Judul Pengumuman *
                  </label>
                  <input
                    type="text"
                    className="input-field text-base"
                    placeholder="Masukkan judul yang menarik dan informatif..."
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    Ringkasan *
                  </label>
                  <textarea
                    className="input-field text-base"
                    rows={3}
                    placeholder="Ringkasan singkat untuk preview..."
                    value={formData.excerpt}
                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    Konten Lengkap *
                  </label>
                  <textarea
                    className="input-field text-base"
                    rows={8}
                    placeholder="Tulis konten pengumuman lengkap di sini..."
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Kategori *
                    </label>
                    <select 
                      className="input-field text-base"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value as 'academic' | 'general' | 'urgent'})}
                      required
                    >
                      <option value="general">🔔 Umum</option>
                      <option value="academic">🎓 Akademik</option>
                      <option value="urgent">🚨 Penting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Status *
                    </label>
                    <select 
                      className="input-field text-base"
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value as 'draft' | 'published' | 'archived'})}
                      required
                    >
                      <option value="draft">📝 Draft</option>
                      <option value="published">🟢 Publikasikan</option>
                      <option value="archived">📦 Arsipkan</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-200"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  />
                  <label className="ml-2 text-sm text-gray-700 font-medium flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    Jadikan Featured (akan ditampilkan di beranda)
                  </label>
                </div>

                <div className="flex gap-4 mt-6">
                  <button type="submit" className="btn-primary flex-1">
                    {editingAnnouncement ? 'Update Pengumuman' : 'Publikasikan'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setEditingAnnouncement(null);
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