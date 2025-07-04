import React, { useState } from 'react';
import { Search, Filter, Download, Calendar, Users, DollarSign, FileText, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

interface PaymentRecord {
  id: string;
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
  remainingBalance: number;
  lastPaymentDate: string;
  paymentStatus: 'Belum Bayar' | 'Belum Lunas' | 'Lunas';
  lastPaymentDate2: string;
  paymentChannel: string;
}

export function StudentPaymentReport() {
  const [filters, setFilters] = useState({
    nimOrName: '',
    semester: 'Ganjil 2025/2026',
    startDate: '2025-01-01',
    endDate: '2025-06-30',
    faculty: 'Pertanian',
    studyProgram: 'S1 - Agroteknologi',
    specialization: 'Perkebunan Kelapa Sawit',
    paymentType: 'SEMUA',
    paymentStatus: 'SEMUA'
  });

  const [currentDate, setCurrentDate] = useState(new Date(2014, 9, 24)); // October 24, 2014 as shown in mockup

  // Mock data based on the mockup
  const paymentRecords: PaymentRecord[] = [
    {
      id: '1',
      registrationNumber: '20250001',
      nim: '',
      name: 'Masih Burnelead',
      semester: 'Ganjil 2025/2026',
      studyProgram: 'S1 - Agroteknologi',
      specialization: 'Perkebunan Kelapa Sawit',
      invoiceNumber: '261012025040421',
      paymentType: 'Registrasi',
      totalBill: 5000000,
      totalPayment: 0,
      remainingBalance: 0,
      lastPaymentDate: '15/07/2025',
      paymentStatus: 'Belum Bayar',
      lastPaymentDate2: '',
      paymentChannel: ''
    },
    {
      id: '2',
      registrationNumber: '20250002',
      nim: '20501002',
      name: 'Finn Ames',
      semester: 'Ganjil 2025/2026',
      studyProgram: 'S1 - Agroteknologi',
      specialization: 'Perkebunan Kelapa Sawit',
      invoiceNumber: '261012025040422',
      paymentType: 'Registrasi',
      totalBill: 5000000,
      totalPayment: 2500000,
      remainingBalance: 2500000,
      lastPaymentDate: '15/07/2025',
      paymentStatus: 'Belum Lunas',
      lastPaymentDate2: '01/06/2025',
      paymentChannel: 'Manual (Admin)'
    },
    {
      id: '3',
      registrationNumber: '20250003',
      nim: '20501003',
      name: 'Lance Crown',
      semester: 'Ganjil 2025/2026',
      studyProgram: 'S1 - Agroteknologi',
      specialization: 'Perkebunan Kelapa Sawit',
      invoiceNumber: '261012025040423',
      paymentType: 'Registrasi',
      totalBill: 5000000,
      totalPayment: 5000000,
      remainingBalance: 0,
      lastPaymentDate: '15/07/2025',
      paymentStatus: 'Lunas',
      lastPaymentDate2: '01/06/2025',
      paymentChannel: 'BNI'
    },
    {
      id: '4',
      registrationNumber: '20240005',
      nim: '20501004',
      name: 'Lemon Irvine',
      semester: 'Ganjil 2025/2026',
      studyProgram: 'S1 - Agroteknologi',
      specialization: 'Perkebunan Kelapa Sawit',
      invoiceNumber: '261012025040424',
      paymentType: 'Herregistrasi',
      totalBill: 7500000,
      totalPayment: 5000000,
      remainingBalance: 2500000,
      lastPaymentDate: '15/07/2025',
      paymentStatus: 'Belum Lunas',
      lastPaymentDate2: '15/06/2025',
      paymentChannel: 'Manual (Heru)'
    },
    {
      id: '5',
      registrationNumber: '20240005',
      nim: '20501005',
      name: 'Abel Walker',
      semester: 'Ganjil 2025/2026',
      studyProgram: 'S1 - Agroteknologi',
      specialization: 'Perkebunan Kelapa Sawit',
      invoiceNumber: '261012025040425',
      paymentType: 'Herregistrasi',
      totalBill: 7500000,
      totalPayment: 0,
      remainingBalance: 0,
      lastPaymentDate: '15/07/2025',
      paymentStatus: 'Belum Bayar',
      lastPaymentDate2: '',
      paymentChannel: ''
    }
  ];

  const summaryData = {
    semester: 'Ganjil 2025/2026',
    period: '01 Juni 2025 - 30 Juni 2025',
    totalBill: 30000000,
    totalPayment: 12500000
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Lunas':
        return 'bg-green-100 text-green-800';
      case 'Belum Lunas':
        return 'bg-yellow-100 text-yellow-800';
      case 'Belum Bayar':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSearch = () => {
    console.log('Searching with filters:', filters);
  };

  const handleExportExcel = () => {
    console.log('Exporting to Excel...');
  };

  // Calendar navigation
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'next') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Laporan Pembayaran Mahasiswa</h1>
          <p className="text-gray-600 mt-1">Laporan detail pembayaran dan tagihan mahasiswa</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="card">
        <div className="bg-blue-500 text-white px-4 py-2 rounded-t-lg">
          <h2 className="font-semibold">Pencarian</h2>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Filters */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NIM/No. Pendaftaran/Nama
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={filters.nimOrName}
                  onChange={(e) => setFilters({...filters, nimOrName: e.target.value})}
                  placeholder="Masukkan NIM, No. Pendaftaran, atau Nama"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Semester
                </label>
                <select
                  className="input-field"
                  value={filters.semester}
                  onChange={(e) => setFilters({...filters, semester: e.target.value})}
                >
                  <option value="Ganjil 2025/2026">Ganjil 2025/2026</option>
                  <option value="Genap 2024/2025">Genap 2024/2025</option>
                  <option value="Ganjil 2024/2025">Ganjil 2024/2025</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Periode Pembayaran
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="date"
                    className="input-field flex-1"
                    value={filters.startDate}
                    onChange={(e) => setFilters({...filters, startDate: e.target.value})}
                  />
                  <span className="text-gray-500">s/d</span>
                  <input
                    type="date"
                    className="input-field flex-1"
                    value={filters.endDate}
                    onChange={(e) => setFilters({...filters, endDate: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fakultas
                </label>
                <select
                  className="input-field"
                  value={filters.faculty}
                  onChange={(e) => setFilters({...filters, faculty: e.target.value})}
                >
                  <option value="Pertanian">Pertanian</option>
                  <option value="Ekonomi">Ekonomi</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Program Studi
                </label>
                <select
                  className="input-field"
                  value={filters.studyProgram}
                  onChange={(e) => setFilters({...filters, studyProgram: e.target.value})}
                >
                  <option value="S1 - Agroteknologi">S1 - Agroteknologi</option>
                  <option value="S1 - Teknologi Pangan">S1 - Teknologi Pangan</option>
                  <option value="S1 - Agribisnis">S1 - Agribisnis</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Peminatan
                </label>
                <select
                  className="input-field"
                  value={filters.specialization}
                  onChange={(e) => setFilters({...filters, specialization: e.target.value})}
                >
                  <option value="Perkebunan Kelapa Sawit">Perkebunan Kelapa Sawit</option>
                  <option value="Hortikultura">Hortikultura</option>
                  <option value="Agronomi">Agronomi</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jenis Pembayaran
                </label>
                <select
                  className="input-field"
                  value={filters.paymentType}
                  onChange={(e) => setFilters({...filters, paymentType: e.target.value})}
                >
                  <option value="SEMUA">SEMUA</option>
                  <option value="Registrasi">Registrasi</option>
                  <option value="Herregistrasi">Herregistrasi</option>
                  <option value="UKT">UKT</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status Bayar
                </label>
                <select
                  className="input-field"
                  value={filters.paymentStatus}
                  onChange={(e) => setFilters({...filters, paymentStatus: e.target.value})}
                >
                  <option value="SEMUA">SEMUA</option>
                  <option value="Lunas">Lunas</option>
                  <option value="Belum Lunas">Belum Lunas</option>
                  <option value="Belum Bayar">Belum Bayar</option>
                </select>
              </div>

              <button
                onClick={handleSearch}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Cari
              </button>
            </div>

            {/* Right Column - Calendar */}
            <div className="flex justify-center">
              <div className="bg-white border border-gray-200 rounded-lg p-4 w-80">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h3 className="font-semibold text-gray-900">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h3>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {dayNames.map(day => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {getDaysInMonth(currentDate).map((day, index) => (
                    <div
                      key={index}
                      className={`text-center py-1 text-sm cursor-pointer hover:bg-blue-100 rounded ${
                        day === 24 && currentDate.getMonth() === 9 && currentDate.getFullYear() === 2014
                          ? 'bg-blue-500 text-white'
                          : day
                          ? 'text-gray-900 hover:bg-gray-100'
                          : 'text-gray-300'
                      }`}
                    >
                      {day || ''}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                  Semester
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                  Periode Pembayaran
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                  Total Tagihan
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                  Total Pembayaran
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-green-50">
                <td className="border border-gray-300 px-4 py-3 text-gray-900">
                  {summaryData.semester}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-gray-900">
                  {summaryData.period}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-gray-900 font-semibold">
                  {formatCurrency(summaryData.totalBill)}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-gray-900 font-semibold">
                  {formatCurrency(summaryData.totalPayment)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Section */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Detail Pembayaran</h2>
          <button
            onClick={handleExportExcel}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Excel
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-gray-300 px-2 py-3 text-center font-semibold text-gray-900">No.</th>
                <th className="border border-gray-300 px-2 py-3 text-center font-semibold text-gray-900">No. Pendaftaran</th>
                <th className="border border-gray-300 px-2 py-3 text-center font-semibold text-gray-900">NIM</th>
                <th className="border border-gray-300 px-2 py-3 text-center font-semibold text-gray-900">Nama</th>
                <th className="border border-gray-300 px-2 py-3 text-center font-semibold text-gray-900">Semester</th>
                <th className="border border-gray-300 px-2 py-3 text-center font-semibold text-gray-900">Program Studi</th>
                <th className="border border-gray-300 px-2 py-3 text-center font-semibold text-gray-900">Peminatan</th>
                <th className="border border-gray-300 px-2 py-3 text-center font-semibold text-gray-900">Nomor Tagihan</th>
                <th className="border border-gray-300 px-2 py-3 text-center font-semibold text-gray-900">Jenis Pembayaran</th>
                <th className="border border-gray-300 px-2 py-3 text-center font-semibold text-gray-900">Total Tagihan</th>
                <th className="border border-gray-300 px-2 py-3 text-center font-semibold text-gray-900">Total Pembayaran</th>
                <th className="border border-gray-300 px-2 py-3 text-center font-semibold text-gray-900">Total Kurang Bayar</th>
                <th className="border border-gray-300 px-2 py-3 text-center font-semibold text-gray-900">Tanggal Akhir Pembayaran</th>
                <th className="border border-gray-300 px-2 py-3 text-center font-semibold text-gray-900">Status Bayar</th>
                <th className="border border-gray-300 px-2 py-3 text-center font-semibold text-gray-900">Tanggal Pembayaran</th>
                <th className="border border-gray-300 px-2 py-3 text-center font-semibold text-gray-900">Kanal</th>
              </tr>
            </thead>
            <tbody>
              {paymentRecords.map((record, index) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-2 py-3 text-center">{index + 1}</td>
                  <td className="border border-gray-300 px-2 py-3 text-center">{record.registrationNumber}</td>
                  <td className="border border-gray-300 px-2 py-3 text-center">{record.nim}</td>
                  <td className="border border-gray-300 px-2 py-3">{record.name}</td>
                  <td className="border border-gray-300 px-2 py-3 text-center">{record.semester}</td>
                  <td className="border border-gray-300 px-2 py-3">{record.studyProgram}</td>
                  <td className="border border-gray-300 px-2 py-3">{record.specialization}</td>
                  <td className="border border-gray-300 px-2 py-3 text-center">{record.invoiceNumber}</td>
                  <td className="border border-gray-300 px-2 py-3 text-center">{record.paymentType}</td>
                  <td className="border border-gray-300 px-2 py-3 text-right font-semibold">
                    {formatCurrency(record.totalBill)}
                  </td>
                  <td className="border border-gray-300 px-2 py-3 text-right font-semibold">
                    {record.totalPayment > 0 ? formatCurrency(record.totalPayment) : ''}
                  </td>
                  <td className="border border-gray-300 px-2 py-3 text-right font-semibold">
                    {record.remainingBalance > 0 ? formatCurrency(record.remainingBalance) : ''}
                  </td>
                  <td className="border border-gray-300 px-2 py-3 text-center">{record.lastPaymentDate}</td>
                  <td className="border border-gray-300 px-2 py-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.paymentStatus)}`}>
                      {record.paymentStatus}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-2 py-3 text-center">{record.lastPaymentDate2}</td>
                  <td className="border border-gray-300 px-2 py-3 text-center">{record.paymentChannel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}