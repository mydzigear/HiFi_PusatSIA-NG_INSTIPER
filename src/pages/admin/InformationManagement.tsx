import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, FileText, Filter, Download, Upload, Eye, Calendar, User, Sparkles, TrendingUp, Users } from 'lucide-react';
import { Information } from '../../types';

export function InformationManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingInformation, setEditingInformation] = useState<Information | null>(null);

  // Mock data
  const information: Information[] = [
    {
      id: '1',
      title: 'Panduan Penggunaan Sistem Akademik Online',
      content: 'Panduan lengkap untuk menggunakan sistem akademik online INSTIPER...',
      excerpt: 'Panduan lengkap untuk menggunakan sistem akademik online INSTIPER, mulai dari login hingga pengisian KRS.',
      author: 'Tim IT',
      publishDate: '2024-01-19',
      category: 'academic',
      status: 'published',
      featured: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-19'
    },
    {
      id: '2',
      title: 'Fasilitas Laboratorium Terbaru',
      content: 'INSTIPER telah menambah fasilitas laboratorium modern...',
      excerpt: 'INSTIPER telah menambah fasilitas laboratorium modern untuk mendukung kegiatan praktikum mahasiswa.',
      author: 'Bagian Sarana',
      publishDate: '2024-01-17',
      category: 'facility',
      status: 'published',
      featured: false,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-17'
    },
    {
      id: '3',
      title: 'Prosedur Pembayaran UKT Online',
      content: 'Informasi lengkap mengenai tata cara pembayaran UKT...',
      excerpt: 'Informasi lengkap mengenai tata cara pembayaran UKT melalui sistem online dan virtual account.',
      author: 'Bagian Keuangan',
      publishDate: '2024-01-16',
      category: 'general',
      status: 'published',
      featured: true,
      createdAt: '2024-01-12',
      updatedAt: '2024-01-16'
    }
  ];

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'general' as 'admission' | 'academic' | 'facility' | 'general',
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
      case 'admission': return 'bg-purple-100 text-purple-800';
      case 'academic': return 'bg-blue-100 text-blue-800';
      case 'facility': return 'bg-green-100 text-green-800';
      case 'general': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'admission': return '🎯';
      case 'academic': return '📚';
      case 'facility': return '🏢';
      case 'general': return '💡';
      default: return '📄';
    }
  };

  const filteredInformation = information.filter(info => {
    const matchesSearch = info.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         info.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || info.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || info.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowCreateModal(false);
    setEditingInformation(null);
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

  const handleEdit = (info: Information) => {
    setEditingInformation(info);
    setFormData({
      title: info.title,
      content: info.content,
      excerpt: info.excerpt,
      category: info.category,
      status: info.status,
      featured: info.featured
    });
    setShowCreateModal(true);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-6 h-6 text-blue-500" />
            <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">Knowledge Base</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Informasi</h1>
          <p className="text-gray-600 mt-1">Kelola panduan dan informasi kampus</p>
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
            Buat Informasi
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Informasi</p>
              <p className="text-2xl font-bold text-gray-900">{information.length}</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600">+8% bulan ini</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Dipublikasi</p>
              <p className="text-2xl font-bold text-green-600">
                {information.filter(i => i.status === 'published').length}
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
              <p className="text-gray-600 text-sm">Featured</p>
              <p className="text-2xl font-bold text-yellow-600">
                {information.filter(i => i.featured).length}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <Sparkles className="w-3 h-3 text-yellow-500" />
                <span className="text-xs text-yellow-600">Trending</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Views Bulan Ini</p>
              <p className="text-2xl font-bold text-purple-600">8.7K</p>
              <div className="flex items-center gap-1 mt-1">
                <Users className="w-3 h-3 text-purple-500" />
                <span className="text-xs text-purple-600">+18% dari bulan lalu</span>
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
                placeholder="Cari informasi..."
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
              <option value="admission">Admisi</option>
              <option value="academic">Akademik</option>
              <option value="facility">Fasilitas</option>
              <option value="general">Umum</option>
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

      {/* Information Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInformation.map((info) => (
          <div key={info.id} className="card hover:scale-105 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(info.category)} flex items-center gap-1`}>
                <span>{getCategoryIcon(info.category)}</span>
                {info.category === 'admission' ? 'Admisi' :
                 info.category === 'academic' ? 'Akademik' :
                 info.category === 'facility' ? 'Fasilitas' : 'Umum'}
              </span>
              {info.featured && (
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Featured
                </span>
              )}
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
              {info.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {info.excerpt}
            </p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <User className="w-3 h-3" />
                <span>{info.author}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(info.publishDate)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(info.status)}`}>
                {info.status === 'published' ? '🟢 Live' :
                 info.status === 'draft' ? '🟡 Draft' : '⚫ Arsip'}
              </span>
              
              <div className="flex items-center gap-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Lihat">
                  <Eye className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleEdit(info)}
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

      {filteredInformation.length === 0 && (
        <div className="card text-center py-12">
          <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada informasi ditemukan</h3>
          <p className="text-gray-600 mb-4">Coba ubah filter pencarian atau buat informasi baru</p>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="btn-primary"
          >
            Buat Informasi Pertama
          </button>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {editingInformation ? 'Edit Informasi' : 'Buat Informasi Baru'}
                  </h3>
                  <p className="text-gray-600">Bagikan panduan dan informasi berguna untuk civitas akademika</p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    Judul Informasi *
                  </label>
                  <input
                    type="text"
                    className="input-field text-base"
                    placeholder="Masukkan judul yang jelas dan deskriptif..."
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
                    placeholder="Tulis panduan atau informasi lengkap di sini..."
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
                      onChange={(e) => setFormData({...formData, category: e.target.value as 'admission' | 'academic' | 'facility' | 'general'})}
                      required
                    >
                      <option value="general">💡 Umum</option>
                      <option value="admission">🎯 Admisi</option>
                      <option value="academic">📚 Akademik</option>
                      <option value="facility">🏢 Fasilitas</option>
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
                    {editingInformation ? 'Update Informasi' : 'Publikasikan'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setEditingInformation(null);
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