
import { useState } from 'react';
import { Search, Users, DollarSign, Play, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';

interface BillGenerationRule {
  id: string;
  name: string;
  type: 'tariff' | 'dispensation';
  status: 'active' | 'inactive' | 'draft';
  lastRun: string;
  studentsAffected: number;
  totalAmount: number;
}

export function BillGeneration() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'tariff' | 'dispensation'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'inactive' | 'draft'>('all');

  // Mock data for bill generation rules
  const rules: BillGenerationRule[] = [
    {
      id: '1',
      name: 'UKT Semester Ganjil 2024/2025',
      type: 'tariff',
      status: 'active',
      lastRun: '2024-07-15',
      studentsAffected: 1250,
      totalAmount: 6250000000
    },
    {
      id: '2',
      name: 'Dispensasi COVID-19',
      type: 'dispensation',
      status: 'active',
      lastRun: '2024-07-10',
      studentsAffected: 85,
      totalAmount: 425000000
    },
    {
      id: '3',
      name: 'Herregistrasi Semester Baru',
      type: 'tariff',
      status: 'draft',
      lastRun: '-',
      studentsAffected: 0,
      totalAmount: 0
    }
  ];

  const filteredRules = rules.filter(rule => {
    const matchesSearch = rule.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || rule.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || rule.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (dateString === '-') return '-';
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
          <h1 className="text-3xl font-bold text-gray-900">Generate Tagihan Massal</h1>
          <p className="text-gray-600 mt-1">Jalankan aturan tarif dan dispensasi untuk generate tagihan</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Aturan</p>
              <p className="text-2xl font-bold text-gray-900">{rules.length}</p>
            </div>
            <Play className="w-8 h-8 text-primary-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Aturan Aktif</p>
              <p className="text-2xl font-bold text-green-600">
                {rules.filter(r => r.status === 'active').length}
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Mahasiswa Terdampak</p>
              <p className="text-2xl font-bold text-blue-600">
                {rules.reduce((sum, rule) => sum + rule.studentsAffected, 0).toLocaleString()}
              </p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Nilai Tagihan</p>
              <p className="text-lg font-bold text-purple-600">
                {formatCurrency(rules.reduce((sum, rule) => sum + rule.totalAmount, 0))}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-600" />
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
                placeholder="Cari aturan..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select 
              className="p-2 border border-gray-300 rounded-md min-w-40"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as 'all' | 'tariff' | 'dispensation')}
            >
              <option value="all">Semua Jenis</option>
              <option value="tariff">Tarif</option>
              <option value="dispensation">Dispensasi</option>
            </select>
            <select 
              className="p-2 border border-gray-300 rounded-md min-w-40"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as 'all' | 'active' | 'inactive' | 'draft')}
            >
              <option value="all">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="inactive">Nonaktif</option>
              <option value="draft">Draft</option>
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
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Jenis</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Terakhir Dijalankan</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Mahasiswa</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Total Nilai</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredRules.map((rule) => (
                <tr key={rule.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <p className="font-medium text-gray-900">{rule.name}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      rule.type === 'tariff' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {rule.type === 'tariff' ? 'Tarif' : 'Dispensasi'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      rule.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : rule.status === 'draft'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {rule.status === 'active' ? 'Aktif' : rule.status === 'draft' ? 'Draft' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {formatDate(rule.lastRun)}
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-900">
                    {rule.studentsAffected.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-900">
                    {formatCurrency(rule.totalAmount)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={rule.status !== 'active'}
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Jalankan
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
