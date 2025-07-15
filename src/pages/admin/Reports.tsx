import { useState } from 'react';
import { Download, Search } from 'lucide-react';

interface PaymentReport {
  no: number;
  registrationNumber: string;
  nim: string;
  name: string;
  semester: string;
  studyProgram: string;
  specialization: string;
  invoiceNumber: string;
  paymentType: string;
  totalBill: number;
  totalPayment: number;
  remainingPayment: number;
  dueDate: string;
  paymentStatus: string;
  paymentDate: string;
  channel: string;
}

export function Reports() {
  const [filters, setFilters] = useState({
    nimOrName: '',
    semester: 'Ganjil 2025/2026',
    startDate: '2025-06-01',
    endDate: '2025-06-30',
    faculty: 'Pertanian',
    studyProgram: 'S1 - Agroteknologi',
    specialization: 'Perkebunan Kelapa Sawit',
    paymentType: 'SEMUA',
    paymentStatus: 'SEMUA'
  });

  // Mock data sesuai dengan mockup
  const paymentReports: PaymentReport[] = [
    {
      no: 1,
      registrationNumber: '20250001',
      nim: '',
      name: 'Masih Burnielead',
      semester: 'Ganjil 2025/2026',
      studyProgram: 'S1 - Agroteknologi',
      specialization: 'Perkebunan Kelapa Sawit',
      invoiceNumber: '251012025404021',
      paymentType: 'Registrasi',
      totalBill: 5000000,
      totalPayment: 0,
      remainingPayment: 5000000,
      dueDate: '15/07/2025',
      paymentStatus: 'Belum Bayar',
      paymentDate: '',
      channel: ''
    },
    {
      no: 2,
      registrationNumber: '20250002',
      nim: '20250100002',
      name: 'Finn Ames',
      semester: 'Ganjil 2025/2026',
      studyProgram: 'S1 - Agroteknologi',
      specialization: 'Perkebunan Kelapa Sawit',
      invoiceNumber: '251012025404022',
      paymentType: 'Registrasi',
      totalBill: 5000000,
      totalPayment: 2500000,
      remainingPayment: 2500000,
      dueDate: '15/07/2025',
      paymentStatus: 'Belum Lunas',
      paymentDate: '01/06/2025',
      channel: 'Manual (Admin)'
    },
    {
      no: 3,
      registrationNumber: '20250003',
      nim: '20250100003',
      name: 'Lance Crown',
      semester: 'Ganjil 2025/2026',
      studyProgram: 'S1 - Agroteknologi',
      specialization: 'Perkebunan Kelapa Sawit',
      invoiceNumber: '251012025404023',
      paymentType: 'Registrasi',
      totalBill: 5000000,
      totalPayment: 5000000,
      remainingPayment: 0,
      dueDate: '15/07/2025',
      paymentStatus: 'Lunas',
      paymentDate: '01/06/2025',
      channel: 'BNI'
    },
    {
      no: 4,
      registrationNumber: '20240005',
      nim: '20250100004',
      name: 'Lemon Irvine',
      semester: 'Ganjil 2025/2026',
      studyProgram: 'S1 - Agroteknologi',
      specialization: 'Perkebunan Kelapa Sawit',
      invoiceNumber: '251012025404024',
      paymentType: 'Herregistrasi',
      totalBill: 7500000,
      totalPayment: 5000000,
      remainingPayment: 2500000,
      dueDate: '15/07/2025',
      paymentStatus: 'Belum Lunas',
      paymentDate: '15/06/2025',
      channel: 'Manual (Heru)'
    },
    {
      no: 5,
      registrationNumber: '20240006',
      nim: '20250100005',
      name: 'Abel Walker',
      semester: 'Ganjil 2025/2026',
      studyProgram: 'S1 - Agroteknologi',
      specialization: 'Perkebunan Kelapa Sawit',
      invoiceNumber: '251012025404025',
      paymentType: 'Herregistrasi',
      totalBill: 7500000,
      totalPayment: 0,
      remainingPayment: 7500000,
      dueDate: '15/07/2025',
      paymentStatus: 'Belum Bayar',
      paymentDate: '',
      channel: ''
    }
  ];

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    console.log('Searching with filters:', filters);
  };

  const handleExportExcel = () => {
    console.log('Exporting to Excel...');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getPaymentStatusClass = (status: string) => {
    switch (status) {
      case 'Lunas':
        return 'bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium';
      case 'Belum Lunas':
        return 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium';
      case 'Belum Bayar':
        return 'bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium';
      default:
        return 'bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium';
    }
  };

  // Calculate summary
  const totalBill = paymentReports.reduce((sum, report) => sum + report.totalBill, 0);
  const totalPayment = paymentReports.reduce((sum, report) => sum + report.totalPayment, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Laporan Pembayaran Mahasiswa</h1>
      </div>

      {/* Filter Form */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-6 bg-blue-500 rounded"></div>
          <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded">Pencarian</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              NIM/No. Pendaftaran/Nama
            </label>
            <input
              type="text"
              value={filters.nimOrName}
              onChange={(e) => handleFilterChange('nimOrName', e.target.value)}
              className="input-field"
              placeholder="Masukkan NIM, No. Pendaftaran, atau Nama"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Semester
            </label>
            <select
              value={filters.semester}
              onChange={(e) => handleFilterChange('semester', e.target.value)}
              className="input-field"
            >
              <option value="Ganjil 2025/2026">Ganjil 2025/2026</option>
              <option value="Genap 2024/2025">Genap 2024/2025</option>
              <option value="Ganjil 2024/2025">Ganjil 2024/2025</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fakultas
            </label>
            <select
              value={filters.faculty}
              onChange={(e) => handleFilterChange('faculty', e.target.value)}
              className="input-field"
            >
              <option value="Pertanian">Pertanian</option>
              <option value="Peternakan">Peternakan</option>
              <option value="Teknologi Pertanian">Teknologi Pertanian</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Program Studi
            </label>
            <select
              value={filters.studyProgram}
              onChange={(e) => handleFilterChange('studyProgram', e.target.value)}
              className="input-field"
            >
              <option value="S1 - Agroteknologi">S1 - Agroteknologi</option>
              <option value="S1 - Agribisnis">S1 - Agribisnis</option>
              <option value="S1 - Peternakan">S1 - Peternakan</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Peminatan
            </label>
            <select
              value={filters.specialization}
              onChange={(e) => handleFilterChange('specialization', e.target.value)}
              className="input-field"
            >
              <option value="Perkebunan Kelapa Sawit">Perkebunan Kelapa Sawit</option>
              <option value="Hortikultura">Hortikultura</option>
              <option value="Tanaman Pangan">Tanaman Pangan</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jenis Pembayaran
            </label>
            <select
              value={filters.paymentType}
              onChange={(e) => handleFilterChange('paymentType', e.target.value)}
              className="input-field"
            >
              <option value="SEMUA">SEMUA</option>
              <option value="Registrasi">Registrasi</option>
              <option value="Herregistrasi">Herregistrasi</option>
              <option value="UKT">UKT</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Periode Pembayaran (Dari)
            </label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Periode Pembayaran (Sampai)
            </label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status Bayar
            </label>
            <select
              value={filters.paymentStatus}
              onChange={(e) => handleFilterChange('paymentStatus', e.target.value)}
              className="input-field"
            >
              <option value="SEMUA">SEMUA</option>
              <option value="Lunas">Lunas</option>
              <option value="Belum Lunas">Belum Lunas</option>
              <option value="Belum Bayar">Belum Bayar</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="btn-primary flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          Cari
        </button>
      </div>

      {/* Summary Table */}
      <div className="card p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 border">Semester</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 border">Periode Pembayaran</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 border">Total Tagihan</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 border">Total Pembayaran</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-900 border">{filters.semester}</td>
                <td className="px-4 py-3 text-sm text-gray-900 border">
                  {new Date(filters.startDate).toLocaleDateString('id-ID')} - {new Date(filters.endDate).toLocaleDateString('id-ID')}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 border font-medium">{formatCurrency(totalBill)}</td>
                <td className="px-4 py-3 text-sm text-green-600 border font-medium bg-green-50">{formatCurrency(totalPayment)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Report */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Detail Pembayaran</h2>
          <button
            onClick={handleExportExcel}
            className="btn-secondary flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Excel
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-50">
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-900 border">No.</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-900 border">No. Pendaftaran</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-900 border">NIM</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-900 border">Nama</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-900 border">Semester</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-900 border">Program Studi</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-900 border">Peminatan</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-900 border">Nomor Tagihan</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-900 border">Jenis Pembayaran</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-900 border">Total Tagihan</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-900 border">Total Pembayaran</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-900 border">Total Kurang Bayar</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-900 border">Tanggal Akhir Pembayaran</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-900 border">Status Bayar</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-900 border">Tanggal Pembayaran</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-900 border">Kanal</th>
              </tr>
            </thead>
            <tbody>
              {paymentReports.map((report, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-2 py-3 text-xs text-gray-900 border">{report.no}</td>
                  <td className="px-2 py-3 text-xs text-gray-900 border">{report.registrationNumber}</td>
                  <td className="px-2 py-3 text-xs text-gray-900 border">{report.nim}</td>
                  <td className="px-2 py-3 text-xs text-gray-900 border">{report.name}</td>
                  <td className="px-2 py-3 text-xs text-gray-900 border">{report.semester}</td>
                  <td className="px-2 py-3 text-xs text-gray-900 border">{report.studyProgram}</td>
                  <td className="px-2 py-3 text-xs text-gray-900 border">{report.specialization}</td>
                  <td className="px-2 py-3 text-xs text-gray-900 border">{report.invoiceNumber}</td>
                  <td className="px-2 py-3 text-xs text-gray-900 border">{report.paymentType}</td>
                  <td className="px-2 py-3 text-xs text-gray-900 border font-medium">{formatCurrency(report.totalBill)}</td>
                  <td className="px-2 py-3 text-xs text-gray-900 border font-medium">
                    {report.totalPayment > 0 ? formatCurrency(report.totalPayment) : '-'}
                  </td>
                  <td className="px-2 py-3 text-xs text-gray-900 border font-medium">
                    {report.remainingPayment > 0 ? formatCurrency(report.remainingPayment) : '-'}
                  </td>
                  <td className="px-2 py-3 text-xs text-gray-900 border">{report.dueDate}</td>
                  <td className="px-2 py-3 text-xs border">
                    <span className={getPaymentStatusClass(report.paymentStatus)}>
                      {report.paymentStatus}
                    </span>
                  </td>
                  <td className="px-2 py-3 text-xs text-gray-900 border">{report.paymentDate || '-'}</td>
                  <td className="px-2 py-3 text-xs text-gray-900 border">{report.channel || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}