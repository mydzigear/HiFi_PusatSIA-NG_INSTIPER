import React, { useState } from 'react';
import { Download, Filter, Calendar, TrendingUp, DollarSign, Users, FileText, BarChart3 } from 'lucide-react';

export function Reports() {
  const [selectedReport, setSelectedReport] = useState('payment-summary');
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2024-01-31'
  });

  // Mock data
  const reportData = {
    paymentSummary: {
      totalRevenue: 6250000000,
      totalTransactions: 1250,
      paidInvoices: 1180,
      pendingInvoices: 70,
      overdueInvoices: 15
    },
    paymentByType: [
      { type: 'UKT', amount: 5000000000, count: 1000 },
      { type: 'Herregistrasi', amount: 1000000000, count: 200 },
      { type: 'Pendaftaran', amount: 250000000, count: 50 }
    ],
    paymentByProgram: [
      { program: 'Agroteknologi', amount: 3000000000, count: 600 },
      { program: 'Teknologi Pangan', amount: 2000000000, count: 400 },
      { program: 'Agribisnis', amount: 1250000000, count: 250 }
    ]
  };

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

  const reportTypes = [
    { id: 'payment-summary', name: 'Ringkasan Pembayaran', icon: DollarSign },
    { id: 'payment-detail', name: 'Detail Pembayaran', icon: FileText },
    { id: 'student-payment', name: 'Pembayaran per Mahasiswa', icon: Users },
    { id: 'overdue-report', name: 'Laporan Tunggakan', icon: TrendingUp },
    { id: 'admission-report', name: 'Laporan Pendaftaran', icon: BarChart3 }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Laporan</h1>
          <p className="text-gray-600 mt-1">Generate dan unduh berbagai laporan keuangan</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Report Types Sidebar */}
        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Jenis Laporan</h2>
            
            <div className="space-y-2">
              {reportTypes.map((report) => {
                const Icon = report.icon;
                return (
                  <button
                    key={report.id}
                    onClick={() => setSelectedReport(report.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                      selectedReport === report.id
                        ? 'bg-primary-50 text-primary-700 border border-primary-200'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{report.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Filters */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Laporan</h3>
            
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Mulai
                </label>
                <input
                  type="date"
                  className="input-field"
                  value={dateRange.startDate}
                  onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Akhir
                </label>
                <input
                  type="date"
                  className="input-field"
                  value={dateRange.endDate}
                  onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Program Studi
                </label>
                <select className="input-field">
                  <option value="">Semua Program</option>
                  <option value="agroteknologi">Agroteknologi</option>
                  <option value="teknologi-pangan">Teknologi Pangan</option>
                  <option value="agribisnis">Agribisnis</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jenis Pembayaran
                </label>
                <select className="input-field">
                  <option value="">Semua Jenis</option>
                  <option value="UKT">UKT</option>
                  <option value="Herregistrasi">Herregistrasi</option>
                  <option value="Pendaftaran">Pendaftaran</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <button className="btn-primary flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Terapkan Filter
              </button>
              <button className="btn-outline">
                Reset Filter
              </button>
            </div>
          </div>

          {/* Report Content */}
          {selectedReport === 'payment-summary' && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid md:grid-cols-4 gap-6">
                <div className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Pendapatan</p>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(reportData.paymentSummary.totalRevenue)}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Transaksi</p>
                      <p className="text-2xl font-bold text-primary-600">
                        {reportData.paymentSummary.totalTransactions.toLocaleString()}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary-600" />
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Tagihan Lunas</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {reportData.paymentSummary.paidInvoices.toLocaleString()}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Tagihan Pending</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {reportData.paymentSummary.pendingInvoices.toLocaleString()}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Pembayaran per Jenis</h3>
                  
                  <div className="space-y-4">
                    {reportData.paymentByType.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{item.type}</p>
                          <p className="text-sm text-gray-600">{item.count} transaksi</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{formatCurrency(item.amount)}</p>
                          <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-primary-500 h-2 rounded-full" 
                              style={{ width: `${(item.amount / reportData.paymentSummary.totalRevenue) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Pembayaran per Program Studi</h3>
                  
                  <div className="space-y-4">
                    {reportData.paymentByProgram.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{item.program}</p>
                          <p className="text-sm text-gray-600">{item.count} mahasiswa</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{formatCurrency(item.amount)}</p>
                          <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${(item.amount / reportData.paymentSummary.totalRevenue) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedReport === 'payment-detail' && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Detail Pembayaran</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Tanggal</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">NIM</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Nama</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Jenis</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Jumlah</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Mock data rows */}
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4">15 Jan 2024</td>
                      <td className="py-3 px-4">2024001</td>
                      <td className="py-3 px-4">John Doe</td>
                      <td className="py-3 px-4">UKT</td>
                      <td className="py-3 px-4">{formatCurrency(5000000)}</td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          Lunas
                        </span>
                      </td>
                    </tr>
                    {/* Add more rows as needed */}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Export Actions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Laporan</h3>
            
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Excel
              </button>
              <button className="btn-outline flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export PDF
              </button>
              <button className="btn-outline flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>

            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-700 text-sm">
                <strong>Catatan:</strong> Laporan akan mencakup data sesuai filter yang dipilih. 
                Periode: {formatDate(dateRange.startDate)} - {formatDate(dateRange.endDate)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}