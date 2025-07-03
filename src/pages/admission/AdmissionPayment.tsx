import React, { useState } from 'react';
import { CreditCard, Copy, Download, CheckCircle, Clock, AlertCircle, RefreshCw } from 'lucide-react';

export function AdmissionPayment() {
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'paid' | 'expired'>('pending');
  
  // Mock payment data
  const paymentData = {
    invoiceNumber: '2024010001',
    amount: 200000,
    vaNumber: '8877665544332211',
    dueDate: '2024-02-15',
    description: 'Biaya Pendaftaran Mahasiswa Baru',
    createdAt: '2024-01-15T10:30:00Z'
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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Show toast notification
  };

  const checkPaymentStatus = () => {
    // Simulate checking payment status
    setPaymentStatus('paid');
  };

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case 'paid':
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case 'expired':
        return <AlertCircle className="w-8 h-8 text-red-500" />;
      default:
        return <Clock className="w-8 h-8 text-orange-500" />;
    }
  };

  const getStatusText = () => {
    switch (paymentStatus) {
      case 'paid':
        return 'Pembayaran Berhasil';
      case 'expired':
        return 'Pembayaran Kedaluwarsa';
      default:
        return 'Menunggu Pembayaran';
    }
  };

  const getStatusColor = () => {
    switch (paymentStatus) {
      case 'paid':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'expired':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-orange-600 bg-orange-50 border-orange-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Pembayaran Pendaftaran</h1>
              <p className="text-gray-600">Selesaikan pembayaran untuk melanjutkan proses pendaftaran</p>
            </div>
            <img
              src="https://www.home.instiperjogja.ac.id/assets/images/logo-instiper(2).png"
              alt="INSTIPER Logo"
              className="w-12 h-12 object-contain"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Card */}
            <div className={`border rounded-lg p-6 ${getStatusColor()}`}>
              <div className="flex items-center gap-4">
                {getStatusIcon()}
                <div>
                  <h3 className="text-lg font-semibold">{getStatusText()}</h3>
                  <p className="text-sm opacity-80">
                    {paymentStatus === 'paid' 
                      ? 'Pembayaran Anda telah berhasil diverifikasi'
                      : paymentStatus === 'expired'
                        ? 'Batas waktu pembayaran telah habis'
                        : 'Silakan lakukan pembayaran sesuai instruksi di bawah'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Detail Pembayaran</h2>
                <button
                  onClick={checkPaymentStatus}
                  className="flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  <RefreshCw className="w-4 h-4" />
                  Cek Status
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Nomor Tagihan</span>
                  <span className="font-semibold text-gray-900">{paymentData.invoiceNumber}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Deskripsi</span>
                  <span className="font-semibold text-gray-900">{paymentData.description}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Jumlah Pembayaran</span>
                  <span className="font-bold text-xl text-primary-600">
                    {formatCurrency(paymentData.amount)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Batas Waktu</span>
                  <span className="font-semibold text-gray-900">
                    {formatDate(paymentData.dueDate)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600">Dibuat</span>
                  <span className="text-gray-900">
                    {formatDate(paymentData.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            {/* Virtual Account */}
            {paymentStatus === 'pending' && (
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Virtual Account</h3>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Nomor Virtual Account</p>
                      <p className="text-2xl font-mono font-bold text-gray-900 tracking-wider">
                        {paymentData.vaNumber}
                      </p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(paymentData.vaNumber)}
                      className="flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      Salin
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">Cara Pembayaran</h4>
                  <div className="text-blue-700 text-sm space-y-2">
                    <p><strong>ATM:</strong></p>
                    <ol className="list-decimal list-inside space-y-1 ml-4">
                      <li>Pilih menu Transfer</li>
                      <li>Pilih ke Bank Lain</li>
                      <li>Masukkan kode bank (014) + nomor VA</li>
                      <li>Masukkan nominal pembayaran</li>
                      <li>Konfirmasi pembayaran</li>
                    </ol>
                    
                    <p className="mt-3"><strong>Mobile Banking:</strong></p>
                    <ol className="list-decimal list-inside space-y-1 ml-4">
                      <li>Pilih menu Transfer</li>
                      <li>Pilih Virtual Account</li>
                      <li>Masukkan nomor VA</li>
                      <li>Masukkan nominal pembayaran</li>
                      <li>Konfirmasi pembayaran</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}

            {/* Success Actions */}
            {paymentStatus === 'paid' && (
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Langkah Selanjutnya</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <div>
                      <p className="font-medium text-green-800">Pembayaran Berhasil</p>
                      <p className="text-sm text-green-600">
                        Pembayaran Anda telah dikonfirmasi. Proses verifikasi dokumen akan segera dimulai.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="btn-primary flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Unduh Bukti Bayar
                    </button>
                    <button className="btn-secondary">
                      Kembali ke Dashboard
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Payment Summary */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Biaya Pendaftaran</span>
                  <span className="font-semibold">{formatCurrency(paymentData.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Biaya Admin</span>
                  <span className="font-semibold">Gratis</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-primary-600">
                    {formatCurrency(paymentData.amount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Help */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Butuh Bantuan?</h3>
              
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-gray-900">WhatsApp</p>
                  <p className="text-gray-600">+62 274 123456</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">admisi@instiper.ac.id</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Jam Operasional</p>
                  <p className="text-gray-600">Senin - Jumat: 08:00 - 16:00</p>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Catatan Penting</h3>
              
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Pembayaran akan otomatis terkonfirmasi dalam 1x24 jam</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Simpan bukti pembayaran untuk keperluan verifikasi</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Hubungi customer service jika pembayaran tidak terkonfirmasi</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}