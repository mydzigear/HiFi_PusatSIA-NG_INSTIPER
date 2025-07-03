import React, { useState } from 'react';
import { CreditCard, Clock, CheckCircle, AlertCircle, Download, ExternalLink, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function Finance() {
  const { invoices } = useApp();
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current');

  const currentInvoices = invoices.filter(inv => inv.status === 'pending' || inv.status === 'overdue');
  const paidInvoices = invoices.filter(inv => inv.status === 'paid');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'overdue':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Lunas';
      case 'pending':
        return 'Menunggu Pembayaran';
      case 'overdue':
        return 'Terlambat';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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

  const totalOutstanding = currentInvoices.reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Keuangan</h1>
          <p className="text-gray-600 mt-1">Kelola pembayaran dan tagihan Anda</p>
        </div>
        
        <div className="flex gap-4">
          <button className="btn-outline flex items-center gap-2">
            <Download className="w-4 h-4" />
            Unduh Laporan
          </button>
          <button className="btn-secondary">
            Ajukan Dispensasi
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Tagihan</p>
              <p className="text-2xl font-bold text-orange-600">{formatCurrency(totalOutstanding)}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Tagihan Belum Lunas</p>
              <p className="text-2xl font-bold text-red-600">{currentInvoices.length}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pembayaran Berhasil</p>
              <p className="text-2xl font-bold text-green-600">{paidInvoices.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('current')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'current'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Tagihan Aktif ({currentInvoices.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'history'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Riwayat Pembayaran ({paidInvoices.length})
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'current' && (
        <div className="space-y-6">
          {currentInvoices.length > 0 ? (
            currentInvoices.map((invoice) => (
              <div key={invoice.id} className="card">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg">
                        <CreditCard className="w-6 h-6 text-primary-600" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{invoice.description}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(invoice.status)}`}>
                            {getStatusText(invoice.status)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>Jatuh Tempo: {formatDate(invoice.dueDate)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(invoice.status)}
                            <span>{getStatusText(invoice.status)}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">
                              {formatCurrency(invoice.amount)}
                            </span>
                          </div>
                        </div>

                        {invoice.vaNumber && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm font-medium text-gray-700 mb-1">Nomor Virtual Account:</p>
                            <div className="flex items-center gap-2">
                              <code className="bg-white px-3 py-1 rounded border text-lg font-mono">
                                {invoice.vaNumber}
                              </code>
                              <button className="text-primary-500 hover:text-primary-600 text-sm">
                                Salin
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="btn-outline flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Unduh
                    </button>
                    <button className="btn-primary flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Bayar Sekarang
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="card text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak Ada Tagihan Aktif</h3>
              <p className="text-gray-600">Semua tagihan Anda sudah lunas!</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-6">
          {paidInvoices.length > 0 ? (
            <div className="card">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Deskripsi</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Jumlah</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Tanggal Bayar</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paidInvoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{invoice.description}</p>
                            <p className="text-sm text-gray-500">ID: {invoice.id}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(invoice.amount)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-gray-600">
                            {formatDate(invoice.dueDate)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(invoice.status)}`}>
                            {getStatusText(invoice.status)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                            Unduh Bukti
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="card text-center py-12">
              <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum Ada Riwayat Pembayaran</h3>
              <p className="text-gray-600">Riwayat pembayaran akan muncul di sini setelah Anda melakukan pembayaran.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}