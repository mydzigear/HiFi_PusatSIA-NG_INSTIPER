import React from 'react';
import { Users, GraduationCap, CreditCard, TrendingUp, Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export function AdminDashboard() {
  // Mock data
  const stats = {
    totalStudents: 2547,
    newApplicants: 142,
    totalRevenue: 1250000000,
    pendingPayments: 45,
    dailyRevenue: 25000000,
    monthlyRevenue: 750000000,
    yearlyRevenue: 1250000000,
  };

  const recentActivities = [
    { id: 1, action: 'Pembayaran UKT diterima', user: 'John Doe (2024001)', time: '2 menit lalu', type: 'payment' },
    { id: 2, action: 'Pendaftar baru mendaftar', user: 'Jane Smith', time: '15 menit lalu', type: 'registration' },
    { id: 3, action: 'KRS disetujui', user: 'Ahmad Rahman (2023015)', time: '1 jam lalu', type: 'academic' },
    { id: 4, action: 'Dispensasi pembayaran diajukan', user: 'Siti Aminah (2023089)', time: '2 jam lalu', type: 'request' },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'registration':
        return <Users className="w-4 h-4 text-blue-500" />;
      case 'academic':
        return <GraduationCap className="w-4 h-4 text-purple-500" />;
      case 'request':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="w-full space-y-6 lg:space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl xl:rounded-3xl p-6 lg:p-8 xl:p-10 text-white shadow-2xl w-full">
        <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 lg:mb-3">Dashboard Admin</h1>
        <p className="text-primary-100 text-base lg:text-lg xl:text-xl">
          Selamat datang di panel kontrol Pusat-SIA INSTIPER
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 xl:gap-8 w-full">
        <div className="card hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm lg:text-base">Total Mahasiswa</p>
              <p className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900">{stats.totalStudents.toLocaleString()}</p>
              <p className="text-green-600 text-xs lg:text-sm xl:text-base mt-1">↑ 12% dari bulan lalu</p>
            </div>
            <div className="w-10 h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16 bg-blue-100 rounded-xl xl:rounded-2xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-5 h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm lg:text-base">Pendaftar Baru</p>
              <p className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900">{stats.newApplicants}</p>
              <p className="text-green-600 text-xs lg:text-sm xl:text-base mt-1">↑ 8% dari minggu lalu</p>
            </div>
            <div className="w-10 h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16 bg-green-100 rounded-xl xl:rounded-2xl flex items-center justify-center shadow-lg">
              <Users className="w-5 h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm lg:text-base">Total Pendapatan</p>
              <p className="text-lg lg:text-xl xl:text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
              <p className="text-green-600 text-xs lg:text-sm xl:text-base mt-1">↑ 15% dari tahun lalu</p>
            </div>
            <div className="w-10 h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16 bg-emerald-100 rounded-xl xl:rounded-2xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="card hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm lg:text-base">Pembayaran Pending</p>
              <p className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900">{stats.pendingPayments}</p>
              <p className="text-orange-600 text-xs lg:text-sm xl:text-base mt-1">Perlu perhatian</p>
            </div>
            <div className="w-10 h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16 bg-orange-100 rounded-xl xl:rounded-2xl flex items-center justify-center shadow-lg">
              <CreditCard className="w-5 h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 w-full">
        {/* Revenue Chart */}
        <div className="card shadow-lg w-full">
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <h2 className="text-lg lg:text-xl xl:text-2xl font-bold text-gray-900">Pendapatan</h2>
            <div className="flex items-center gap-2 lg:gap-3">
              <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-gray-500" />
              <select className="text-sm lg:text-base border border-gray-200 rounded-xl px-3 lg:px-4 py-1 lg:py-2 shadow-sm">
                <option>30 Hari Terakhir</option>
                <option>90 Hari Terakhir</option>
                <option>1 Tahun Terakhir</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 lg:space-y-6">
            <div className="flex items-center justify-between p-4 lg:p-6 bg-green-50 rounded-xl xl:rounded-2xl shadow-sm">
              <div>
                <p className="text-sm lg:text-base text-green-600">Hari Ini</p>
                <p className="text-lg lg:text-xl xl:text-2xl font-bold text-green-800">{formatCurrency(stats.dailyRevenue)}</p>
              </div>
              <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-green-600" />
            </div>

            <div className="flex items-center justify-between p-4 lg:p-6 bg-blue-50 rounded-xl xl:rounded-2xl shadow-sm">
              <div>
                <p className="text-sm lg:text-base text-blue-600">Bulan Ini</p>
                <p className="text-lg lg:text-xl xl:text-2xl font-bold text-blue-800">{formatCurrency(stats.monthlyRevenue)}</p>
              </div>
              <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-blue-600" />
            </div>

            <div className="flex items-center justify-between p-4 lg:p-6 bg-purple-50 rounded-xl xl:rounded-2xl shadow-sm">
              <div>
                <p className="text-sm lg:text-base text-purple-600">Tahun Ini</p>
                <p className="text-lg lg:text-xl xl:text-2xl font-bold text-purple-800">{formatCurrency(stats.yearlyRevenue)}</p>
              </div>
              <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="card shadow-lg w-full">
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <h2 className="text-lg lg:text-xl xl:text-2xl font-bold text-gray-900">Aktivitas Terbaru</h2>
            <button className="text-primary-500 hover:text-primary-600 text-sm lg:text-base font-medium">
              Lihat Semua
            </button>
          </div>

          <div className="space-y-3 lg:space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 lg:gap-4 p-3 lg:p-4 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 bg-gray-100 rounded-full flex-shrink-0 shadow-sm">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm lg:text-base font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm lg:text-base text-gray-600">{activity.user}</p>
                  <p className="text-xs lg:text-sm text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card shadow-lg w-full">
        <h2 className="text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 mb-6 lg:mb-8">Aksi Cepat</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <button className="flex flex-col items-center p-4 lg:p-6 bg-primary-50 rounded-xl xl:rounded-2xl hover:bg-primary-100 transition-colors group shadow-sm hover:shadow-md">
            <Users className="w-6 h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-primary-600 mb-2 lg:mb-3 group-hover:scale-110 transition-transform" />
            <span className="text-xs lg:text-sm xl:text-base font-medium text-primary-800 text-center">Tambah Pengguna</span>
          </button>

          <button className="flex flex-col items-center p-4 lg:p-6 bg-green-50 rounded-xl xl:rounded-2xl hover:bg-green-100 transition-colors group shadow-sm hover:shadow-md">
            <CreditCard className="w-6 h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-green-600 mb-2 lg:mb-3 group-hover:scale-110 transition-transform" />
            <span className="text-xs lg:text-sm xl:text-base font-medium text-green-800 text-center">Generate Tagihan</span>
          </button>

          <button className="flex flex-col items-center p-4 lg:p-6 bg-orange-50 rounded-xl xl:rounded-2xl hover:bg-orange-100 transition-colors group shadow-sm hover:shadow-md">
            <GraduationCap className="w-6 h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-orange-600 mb-2 lg:mb-3 group-hover:scale-110 transition-transform" />
            <span className="text-xs lg:text-sm xl:text-base font-medium text-orange-800 text-center">Kelola Mata Kuliah</span>
          </button>

          <button className="flex flex-col items-center p-4 lg:p-6 bg-purple-50 rounded-xl xl:rounded-2xl hover:bg-purple-100 transition-colors group shadow-sm hover:shadow-md">
            <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-purple-600 mb-2 lg:mb-3 group-hover:scale-110 transition-transform" />
            <span className="text-xs lg:text-sm xl:text-base font-medium text-purple-800 text-center">Lihat Laporan</span>
          </button>
        </div>
      </div>
    </div>
  );
}