import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, DollarSign, Users, Calendar, Download, Upload } from 'lucide-react';

interface BillingRule {
  id: string;
  name: string;
  paymentType: string;
  academicYear: string;
  program: string;
  entryPath: string;
  amount: number;
  components: BillingComponent[];
  status: 'active' | 'inactive';
  createdAt: string;
}

interface BillingComponent {
  id: string;
  name: string;
  amount: number;
}

export function BillingEngine() {
  const [activeTab, setActiveTab] = useState<'rules' | 'generate' | 'history'>('rules');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data
  const billingRules: BillingRule[] = [
    {
      id: '1',
      name: 'UKT Agroteknologi 2024',
      paymentType: 'UKT',
      academicYear: '2024/2025',
      program: 'Agroteknologi',
      entryPath: 'Reguler',
      amount: 5000000,
      components: [
        { id: '1', name: 'Biaya Pengembangan', amount: 2000000 },
        { id: '2', name: 'Biaya SKS', amount: 2500000 },
        { id: '3', name: 'Biaya Praktikum', amount: 500000 }
      ],
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Herregistrasi 2024 Ganjil',
      paymentType: 'Herregistrasi',
      academicYear: '2024/2025',
      program: 'Semua Program',
      entryPath: 'Semua Jalur',
      amount: 500000,
      components: [
        { id: '1', name: 'Biaya Daftar Ulang', amount: 500000 }
      ],
      status: 'active',
      createdAt: '2024-01-10'
    }
  ];

  const billingHistory = [
    {
      id: '1',
      batchName: 'UKT Semester Ganjil 2024/2025',
      paymentType: 'UKT',
      totalStudents: 1250,
      totalAmount: 6250000000,
      generatedDate: '2024-08-01',
      status: 'completed'
    },
    {
      id: '2',
      batchName: 'Herregistrasi Semester Ganjil 2024/2025',
      paymentType: 'Herregistrasi',
      totalStudents: 1180,
      totalAmount: 590000000,
      generatedDate: '2024-07-15',
      status: 'completed'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Billing Engine</h1>
          <p className="text-gray-600 mt-1">Kelola tarif pembayaran dan generate tagihan</p>
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
            Buat Aturan Baru
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Aturan Aktif</p>
              <p className="text-2xl font-bold text-gray-900">
                {billingRules.filter(rule => rule.status === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Tagihan Bulan Ini</p>
              <p className="text-2xl font-bold text-gray-900">1,250</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Nilai Tagihan</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(6250000000)}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Batch Terproses</p>
              <p className="text-2xl font-bold text-gray-900">{billingHistory.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Download className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('rules')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'rules'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Aturan Tarif
          </button>
          <button
            onClick={() => setActiveTab('generate')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'generate'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Generate Tagihan
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'history'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Riwayat Generate
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'rules' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="card">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Cari aturan tarif..."
                    className="input-field pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select className="input-field min-w-40">
                  <option value="">Semua Jenis</option>
                  <option value="UKT">UKT</option>
                  <option value="Herregistrasi">Herregistrasi</option>
                  <option value="Pendaftaran">Pendaftaran</option>
                </select>
              </div>
            </div>
          </div>

          {/* Rules Table */}
          <div className="card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Nama Aturan</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Jenis Pembayaran</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Program Studi</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Total Tarif</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {billingRules.map((rule) => (
                    <tr key={rule.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{rule.name}</p>
                          <p className="text-sm text-gray-500">{rule.academicYear}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                          {rule.paymentType}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-gray-900">{rule.program}</p>
                          <p className="text-sm text-gray-500">{rule.entryPath}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-gray-900">
                          {formatCurrency(rule.amount)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          rule.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {rule.status === 'active' ? 'Aktif' : 'Nonaktif'}
                        </span>
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

      {activeTab === 'generate' && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Generate Tagihan Massal</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jenis Pembayaran *
                  </label>
                  <select className="input-field">
                    <option value="">Pilih jenis pembayaran</option>
                    <option value="UKT">UKT</option>
                    <option value="Herregistrasi">Herregistrasi</option>
                    <option value="Pendaftaran">Pendaftaran</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Periode Akademik *
                  </label>
                  <select className="input-field">
                    <option value="">Pilih periode</option>
                    <option value="2024/2025-1">2024/2025 Ganjil</option>
                    <option value="2024/2025-2">2024/2025 Genap</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Program Studi
                  </label>
                  <select className="input-field">
                    <option value="">Semua Program Studi</option>
                    <option value="agroteknologi">Agroteknologi</option>
                    <option value="teknologi-pangan">Teknologi Pangan</option>
                    <option value="agribisnis">Agribisnis</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Angkatan
                  </label>
                  <select className="input-field">
                    <option value="">Semua Angkatan</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jalur Masuk
                  </label>
                  <select className="input-field">
                    <option value="">Semua Jalur</option>
                    <option value="reguler">Reguler</option>
                    <option value="mandiri">Mandiri</option>
                    <option value="beasiswa">Beasiswa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Jatuh Tempo *
                  </label>
                  <input
                    type="date"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keterangan
                  </label>
                  <textarea
                    className="input-field"
                    rows={3}
                    placeholder="Keterangan tambahan untuk tagihan ini..."
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">Preview Generate</h4>
                  <div className="text-blue-700 text-sm space-y-1">
                    <p>Estimasi mahasiswa: <strong>1,250 mahasiswa</strong></p>
                    <p>Total nilai tagihan: <strong>{formatCurrency(6250000000)}</strong></p>
                    <p>Format nomor tagihan: <strong>202401-UKT-[NIM]</strong></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button className="btn-primary">
                Generate Tagihan
              </button>
              <button className="btn-outline">
                Preview Data
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Nama Batch</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Jenis</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Jumlah Mahasiswa</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Total Nilai</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Tanggal Generate</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {billingHistory.map((batch) => (
                    <tr key={batch.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <p className="font-medium text-gray-900">{batch.batchName}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                          {batch.paymentType}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-gray-900">
                          {batch.totalStudents.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-gray-900">
                          {formatCurrency(batch.totalAmount)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-600">
                          {formatDate(batch.generatedDate)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          Selesai
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="btn-outline text-sm flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Unduh
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}