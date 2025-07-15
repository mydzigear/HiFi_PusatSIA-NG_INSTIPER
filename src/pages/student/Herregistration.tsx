import { useState } from 'react';
import { CreditCard, CheckCircle, Clock, AlertCircle, Download, Calendar, User, GraduationCap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Student } from '../../types';

export function Herregistration() {
  const { user } = useAuth();
  const student = user as Student;
  const [selectedPeriod, setSelectedPeriod] = useState('2024/2025-1');

  // Mock data for herregistration
  const herregistrationData = {
    currentPeriod: '2024/2025 Ganjil',
    status: 'pending', // pending, paid, expired
    amount: 5000000,
    dueDate: '2024-08-15',
    vaNumber: '8877665544332211',
    requirements: [
      { name: 'Foto 3x4 Terbaru', status: 'completed', required: true },
      { name: 'Kartu Mahasiswa', status: 'completed', required: true },
      { name: 'Surat Keterangan Sehat', status: 'pending', required: false },
      { name: 'Surat Pernyataan Orang Tua', status: 'pending', required: true },
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'expired':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Selesai';
      case 'pending':
        return 'Menunggu';
      case 'expired':
        return 'Kedaluwarsa';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Herregistrasi</h1>
          <p className="text-gray-600 mt-1">Daftar ulang untuk semester {herregistrationData.currentPeriod}</p>
        </div>
        
        <div className="flex items-center gap-4">
          <select 
            className="input-field min-w-48"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="2024/2025-1">2024/2025 Ganjil</option>
            <option value="2023/2024-2">2023/2024 Genap</option>
            <option value="2023/2024-1">2023/2024 Ganjil</option>
          </select>
        </div>
      </div>

      {/* Student Info Card */}
      <div className="card">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-primary-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">{student?.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 text-sm text-gray-600">
              <div>
                <span className="font-medium">NIM:</span> {student?.studentId}
              </div>
              <div>
                <span className="font-medium">Program Studi:</span> {student?.program}
              </div>
              <div>
                <span className="font-medium">Semester:</span> {student?.semester}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Card */}
          <div className={`border rounded-lg p-6 ${
            herregistrationData.status === 'paid' 
              ? 'bg-green-50 border-green-200' 
              : herregistrationData.status === 'expired'
                ? 'bg-red-50 border-red-200'
                : 'bg-orange-50 border-orange-200'
          }`}>
            <div className="flex items-center gap-4">
              {getStatusIcon(herregistrationData.status)}
              <div>
                <h3 className="text-lg font-semibold">
                  {herregistrationData.status === 'paid' 
                    ? 'Herregistrasi Berhasil' 
                    : herregistrationData.status === 'expired'
                      ? 'Herregistrasi Kedaluwarsa'
                      : 'Menunggu Pembayaran Herregistrasi'
                  }
                </h3>
                <p className="text-sm opacity-80">
                  {herregistrationData.status === 'paid' 
                    ? 'Anda telah berhasil melakukan herregistrasi untuk semester ini'
                    : herregistrationData.status === 'expired'
                      ? 'Batas waktu herregistrasi telah habis'
                      : 'Silakan selesaikan pembayaran herregistrasi sebelum batas waktu'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary-500" />
                Informasi Pembayaran
              </h2>
              {herregistrationData.status === 'paid' && (
                <button className="btn-outline flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Unduh Bukti
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Periode Akademik</label>
                  <p className="text-lg font-semibold text-gray-900">{herregistrationData.currentPeriod}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Jumlah Pembayaran</label>
                  <p className="text-2xl font-bold text-primary-600">
                    {formatCurrency(herregistrationData.amount)}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Batas Waktu</label>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatDate(herregistrationData.dueDate)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(herregistrationData.status)}`}>
                    {getStatusText(herregistrationData.status)}
                  </span>
                </div>
              </div>
            </div>

            {herregistrationData.status === 'pending' && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">Virtual Account</h4>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    Salin Nomor
                  </button>
                </div>
                <p className="text-2xl font-mono font-bold text-gray-900 tracking-wider">
                  {herregistrationData.vaNumber}
                </p>
              </div>
            )}

            {herregistrationData.status === 'pending' && (
              <div className="mt-6 flex gap-4">
                <button className="btn-primary flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Bayar Sekarang
                </button>
                <button className="btn-outline">
                  Cara Pembayaran
                </button>
              </div>
            )}
          </div>

          {/* Requirements Checklist */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary-500" />
              Persyaratan Herregistrasi
            </h2>

            <div className="space-y-4">
              {herregistrationData.requirements.map((req, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(req.status)}
                    <div>
                      <span className="font-medium text-gray-900">{req.name}</span>
                      {req.required && (
                        <span className="text-red-500 text-sm ml-1">*</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(req.status)}`}>
                      {getStatusText(req.status)}
                    </span>
                    {req.status === 'pending' && (
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Upload
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-700 text-sm">
                <strong>Catatan:</strong> Semua persyaratan yang bertanda (*) wajib dipenuhi sebelum melakukan pembayaran herregistrasi.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Academic Summary */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary-500" />
              Ringkasan Akademik
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">IPK Kumulatif</span>
                <span className="font-semibold text-gray-900">{student?.gpa}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total SKS</span>
                <span className="font-semibold text-gray-900">{student?.totalCredits}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Semester</span>
                <span className="font-semibold text-gray-900">{student?.semester}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  student?.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {student?.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                </span>
              </div>
            </div>
          </div>

          {/* Important Dates */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary-500" />
              Jadwal Penting
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="font-medium text-orange-800">Batas Herregistrasi</p>
                <p className="text-orange-700">{formatDate(herregistrationData.dueDate)}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="font-medium text-blue-800">Mulai Perkuliahan</p>
                <p className="text-blue-700">22 Agustus 2024</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="font-medium text-green-800">Periode KRS</p>
                <p className="text-green-700">25 - 30 Agustus 2024</p>
              </div>
            </div>
          </div>

          {/* Help */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Butuh Bantuan?</h3>
            
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-gray-900">Bagian Akademik</p>
                <p className="text-gray-600">akademik@instiper.ac.id</p>
                <p className="text-gray-600">(0274) 2901011 ext. 123</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Bagian Keuangan</p>
                <p className="text-gray-600">keuangan@instiper.ac.id</p>
                <p className="text-gray-600">(0274) 2901011 ext. 124</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Jam Layanan</p>
                <p className="text-gray-600">Senin - Jumat: 08:00 - 16:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}