import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Settings, CreditCard, FileText, User, Mail } from 'lucide-react';

interface PaymentType {
  id: string;
  code: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

interface CostComponent {
  id: string;
  code: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

interface Signatory {
  id: string;
  name: string;
  position: string;
  signature: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export function PaymentSettings() {
  const [activeTab, setActiveTab] = useState<'types' | 'components' | 'signatories' | 'notifications'>('types');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const paymentTypes: PaymentType[] = [
    {
      id: '1',
      code: 'UKT',
      name: 'Uang Kuliah Tunggal',
      description: 'Biaya kuliah per semester',
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      code: 'HERREG',
      name: 'Herregistrasi',
      description: 'Biaya daftar ulang semester',
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '3',
      code: 'DAFTAR',
      name: 'Pendaftaran',
      description: 'Biaya pendaftaran mahasiswa baru',
      status: 'active',
      createdAt: '2024-01-15'
    }
  ];

  const costComponents: CostComponent[] = [
    {
      id: '1',
      code: 'PENGEMBANGAN',
      name: 'Biaya Pengembangan',
      description: 'Biaya untuk pengembangan fasilitas kampus',
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      code: 'SKS',
      name: 'Biaya SKS',
      description: 'Biaya per satuan kredit semester',
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '3',
      code: 'PRAKTIKUM',
      name: 'Biaya Praktikum',
      description: 'Biaya kegiatan praktikum laboratorium',
      status: 'active',
      createdAt: '2024-01-15'
    }
  ];

  const signatories: Signatory[] = [
    {
      id: '1',
      name: 'Dr. Budi Santoso, M.Si.',
      position: 'Rektor',
      signature: '/signatures/rektor.png',
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Dra. Siti Aminah, M.M.',
      position: 'Wakil Rektor Bidang Keuangan',
      signature: '/signatures/warek.png',
      status: 'active',
      createdAt: '2024-01-15'
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pengaturan Pembayaran</h1>
          <p className="text-gray-600 mt-1">Kelola referensi data pembayaran</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('types')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'types'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Jenis Pembayaran
          </button>
          <button
            onClick={() => setActiveTab('components')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'components'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Komponen Biaya
          </button>
          <button
            onClick={() => setActiveTab('signatories')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'signatories'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Penandatangan
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'notifications'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Template Notifikasi
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'types' && (
        <div className="space-y-6">
          {/* Header Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari jenis pembayaran..."
                  className="input-field pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <button className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Tambah Jenis Pembayaran
            </button>
          </div>

          {/* Payment Types Table */}
          <div className="card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Kode</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Nama</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Deskripsi</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Dibuat</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentTypes.map((type) => (
                    <tr key={type.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="font-mono text-sm font-medium text-gray-900">
                          {type.code}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-900">{type.name}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-600">{type.description}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(type.status)}`}>
                          {type.status === 'active' ? 'Aktif' : 'Nonaktif'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-600">{formatDate(type.createdAt)}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg">
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
          </div>
        </div>
      )}

      {activeTab === 'components' && (
        <div className="space-y-6">
          {/* Header Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari komponen biaya..."
                  className="input-field pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <button className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Tambah Komponen Biaya
            </button>
          </div>

          {/* Cost Components Table */}
          <div className="card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Kode</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Nama</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Deskripsi</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Dibuat</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {costComponents.map((component) => (
                    <tr key={component.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="font-mono text-sm font-medium text-gray-900">
                          {component.code}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-900">{component.name}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-600">{component.description}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(component.status)}`}>
                          {component.status === 'active' ? 'Aktif' : 'Nonaktif'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-600">{formatDate(component.createdAt)}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg">
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
          </div>
        </div>
      )}

      {activeTab === 'signatories' && (
        <div className="space-y-6">
          {/* Header Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari penandatangan..."
                  className="input-field pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <button className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Tambah Penandatangan
            </button>
          </div>

          {/* Signatories Table */}
          <div className="card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Nama</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Jabatan</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Tanda Tangan</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Dibuat</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {signatories.map((signatory) => (
                    <tr key={signatory.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-primary-600" />
                          </div>
                          <span className="font-medium text-gray-900">{signatory.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-900">{signatory.position}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="w-20 h-10 bg-gray-100 rounded border flex items-center justify-center">
                          <FileText className="w-4 h-4 text-gray-400" />
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(signatory.status)}`}>
                          {signatory.status === 'active' ? 'Aktif' : 'Nonaktif'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-600">{formatDate(signatory.createdAt)}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg">
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
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="space-y-6">
          {/* Header Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Template Notifikasi</h2>
              <p className="text-gray-600">Kelola template pesan untuk berbagai jenis notifikasi</p>
            </div>
            <button className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Tambah Template
            </button>
          </div>

          {/* Notification Templates */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email Tagihan Baru</h3>
                  <p className="text-sm text-gray-600">Template email untuk tagihan baru</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-700">
                  <strong>Subject:</strong> Tagihan Baru - [JENIS_PEMBAYARAN]<br/>
                  <strong>Body:</strong> Yth. [NAMA_MAHASISWA], Anda memiliki tagihan baru...
                </p>
              </div>

              <div className="flex gap-2">
                <button className="btn-outline text-sm flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button className="btn-outline text-sm">
                  Test Kirim
                </button>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">WhatsApp Pembayaran Berhasil</h3>
                  <p className="text-sm text-gray-600">Template WA konfirmasi pembayaran</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-700">
                  Pembayaran Anda untuk [JENIS_PEMBAYARAN] sebesar [NOMINAL] telah berhasil dikonfirmasi...
                </p>
              </div>

              <div className="flex gap-2">
                <button className="btn-outline text-sm flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button className="btn-outline text-sm">
                  Test Kirim
                </button>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Reminder Jatuh Tempo</h3>
                  <p className="text-sm text-gray-600">Template pengingat jatuh tempo</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-700">
                  Pengingat: Tagihan [JENIS_PEMBAYARAN] Anda akan jatuh tempo pada [TANGGAL_JATUH_TEMPO]...
                </p>
              </div>

              <div className="flex gap-2">
                <button className="btn-outline text-sm flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button className="btn-outline text-sm">
                  Test Kirim
                </button>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Tagihan Overdue</h3>
                  <p className="text-sm text-gray-600">Template tagihan terlambat</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-700">
                  Tagihan [JENIS_PEMBAYARAN] Anda telah melewati batas waktu pembayaran...
                </p>
              </div>

              <div className="flex gap-2">
                <button className="btn-outline text-sm flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button className="btn-outline text-sm">
                  Test Kirim
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}