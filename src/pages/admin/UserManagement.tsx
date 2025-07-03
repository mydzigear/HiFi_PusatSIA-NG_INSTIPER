import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Mail, Key, Users, Shield, Eye, EyeOff } from 'lucide-react';

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
}

interface UserGroup {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  createdAt: string;
}

export function UserManagement() {
  const [activeTab, setActiveTab] = useState<'users' | 'groups'>('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data
  const users: User[] = [
    {
      id: '1',
      name: 'Administrator',
      username: 'admin',
      email: 'admin@instiper.ac.id',
      role: 'Super Admin',
      status: 'active',
      lastLogin: '2024-01-20T10:30:00Z',
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      name: 'Siti Aminah',
      username: 'siti.aminah',
      email: 'siti.aminah@instiper.ac.id',
      role: 'Operator Keuangan',
      status: 'active',
      lastLogin: '2024-01-19T14:20:00Z',
      createdAt: '2024-01-05'
    },
    {
      id: '3',
      name: 'Budi Santoso',
      username: 'budi.santoso',
      email: 'budi.santoso@instiper.ac.id',
      role: 'Operator Akademik',
      status: 'active',
      lastLogin: '2024-01-18T09:15:00Z',
      createdAt: '2024-01-10'
    }
  ];

  const userGroups: UserGroup[] = [
    {
      id: '1',
      name: 'Super Admin',
      description: 'Akses penuh ke semua fitur sistem',
      permissions: ['dashboard', 'users', 'billing', 'reports', 'settings'],
      userCount: 1,
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      name: 'Operator Keuangan',
      description: 'Akses ke modul keuangan dan pembayaran',
      permissions: ['dashboard', 'billing', 'payments', 'reports'],
      userCount: 5,
      createdAt: '2024-01-01'
    },
    {
      id: '3',
      name: 'Operator Akademik',
      description: 'Akses ke modul akademik dan mahasiswa',
      permissions: ['dashboard', 'students', 'academic', 'reports'],
      userCount: 3,
      createdAt: '2024-01-01'
    },
    {
      id: '4',
      name: 'Pimpinan',
      description: 'Akses read-only untuk laporan dan dashboard',
      permissions: ['dashboard', 'reports'],
      userCount: 2,
      createdAt: '2024-01-01'
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Super Admin':
        return 'bg-red-100 text-red-800';
      case 'Operator Keuangan':
        return 'bg-blue-100 text-blue-800';
      case 'Operator Akademik':
        return 'bg-green-100 text-green-800';
      case 'Pimpinan':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Pengguna</h1>
          <p className="text-gray-600 mt-1">Kelola pengguna dan hak akses sistem</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Pengguna</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pengguna Aktif</p>
              <p className="text-2xl font-bold text-green-600">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Grup Pengguna</p>
              <p className="text-2xl font-bold text-blue-600">{userGroups.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Login Hari Ini</p>
              <p className="text-2xl font-bold text-orange-600">8</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('users')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'users'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Daftar Pengguna ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'groups'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Grup Pengguna ({userGroups.length})
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          {/* Header Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari pengguna..."
                  className="input-field pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Tambah Pengguna
            </button>
          </div>

          {/* Users Table */}
          <div className="card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Pengguna</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Username</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Role</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Login Terakhir</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-primary-600 font-semibold">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-mono text-sm text-gray-900">{user.username}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(user.status)}`}>
                          {user.status === 'active' ? 'Aktif' : 'Nonaktif'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-600 text-sm">
                          {formatDateTime(user.lastLogin)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg" title="Edit">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Reset Password">
                            <Key className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg" title="Kirim Info Akun">
                            <Mail className="w-4 h-4" />
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
          </div>
        </div>
      )}

      {activeTab === 'groups' && (
        <div className="space-y-6">
          {/* Header Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari grup..."
                  className="input-field pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <button className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Tambah Grup
            </button>
          </div>

          {/* Groups Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userGroups.map((group) => (
              <div key={group.id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{group.name}</h3>
                      <p className="text-sm text-gray-500">{group.userCount} pengguna</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{group.description}</p>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 text-sm">Hak Akses:</h4>
                  <div className="flex flex-wrap gap-2">
                    {group.permissions.map((permission) => (
                      <span 
                        key={permission}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    Dibuat: {formatDate(group.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tambah Pengguna Baru</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username *
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Masukkan username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="Masukkan email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="Masukkan password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grup Pengguna *
                </label>
                <select className="input-field">
                  <option value="">Pilih grup pengguna</option>
                  {userGroups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button className="btn-primary flex-1">
                Simpan
              </button>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="btn-outline flex-1"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}