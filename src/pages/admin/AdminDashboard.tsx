
import { Users, GraduationCap, CreditCard, TrendingUp, Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { formatShortNumber } from '../../lib/utils';

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
    <div className="w-full space-y-4 sm:space-y-6 lg:space-y-8 animate-fade-in p-responsive">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl sm:rounded-2xl xl:rounded-3xl p-4 sm:p-6 lg:p-8 xl:p-10 text-white shadow-2xl w-full">
        <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 lg:mb-3">Dashboard Admin</h1>
        <p className="text-emerald-100 text-sm sm:text-base lg:text-lg xl:text-xl">
          Selamat datang di BackOffice SIA INSTIPER
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid-responsive gap-3 sm:gap-4 lg:gap-6 xl:gap-8 w-full">
        <div className="card hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">Total Mahasiswa</p>
              <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-foreground">{stats.totalStudents.toLocaleString()}</p>
              <p className="text-emerald-600 text-xs lg:text-sm xl:text-base mt-1">↑ 12% dari bulan lalu</p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16 bg-blue-100 rounded-lg xl:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">Pendaftar Baru</p>
              <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-foreground">{stats.newApplicants}</p>
              <p className="text-emerald-600 text-xs lg:text-sm xl:text-base mt-1">↑ 8% dari minggu lalu</p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16 bg-green-100 rounded-lg xl:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">Total Pendapatan</p>
              <p className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-bold text-foreground">Rp {formatShortNumber(stats.totalRevenue)}</p>
              <p className="text-emerald-600 text-xs lg:text-sm xl:text-base mt-1">↑ 15% dari tahun lalu</p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16 bg-emerald-100 rounded-lg xl:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="card hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">Pembayaran Pending</p>
              <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-foreground">{stats.pendingPayments}</p>
              <p className="text-orange-600 text-xs lg:text-sm xl:text-base mt-1">Perlu perhatian</p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16 bg-orange-100 rounded-lg xl:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 w-full">
        {/* Revenue Chart */}
        <div className="card shadow-lg w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 lg:mb-8 gap-3">
            <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-foreground">Pendapatan</h2>
            <div className="flex items-center gap-2 lg:gap-3">
              <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground" />
              <select className="text-xs sm:text-sm lg:text-base border border-border rounded-lg sm:rounded-xl px-2 sm:px-3 lg:px-4 py-1 lg:py-2 shadow-sm bg-background">
                <option>30 Hari Terakhir</option>
                <option>90 Hari Terakhir</option>
                <option>1 Tahun Terakhir</option>
              </select>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            <div className="flex items-center justify-between p-3 sm:p-4 lg:p-6 bg-green-50 rounded-lg sm:rounded-xl xl:rounded-2xl shadow-sm">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm lg:text-base text-green-600">Hari Ini</p>
                <p className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-bold text-green-800">Rp {formatShortNumber(stats.dailyRevenue)}</p>
              </div>
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-green-600 flex-shrink-0" />
            </div>

            <div className="flex items-center justify-between p-3 sm:p-4 lg:p-6 bg-blue-50 rounded-lg sm:rounded-xl xl:rounded-2xl shadow-sm">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm lg:text-base text-blue-600">Bulan Ini</p>
                <p className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-bold text-blue-800">Rp {formatShortNumber(stats.monthlyRevenue)}</p>
              </div>
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-blue-600 flex-shrink-0" />
            </div>

            <div className="flex items-center justify-between p-3 sm:p-4 lg:p-6 bg-purple-50 rounded-lg sm:rounded-xl xl:rounded-2xl shadow-sm">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm lg:text-base text-purple-600">Tahun Ini</p>
                <p className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-bold text-purple-800">Rp {formatShortNumber(stats.yearlyRevenue)}</p>
              </div>
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-purple-600 flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="card shadow-lg w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 lg:mb-8 gap-3">
            <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-foreground">Aktivitas Terbaru</h2>
            <button className="text-primary hover:text-primary/80 text-xs sm:text-sm lg:text-base font-medium self-start sm:self-auto">
              Lihat Semua
            </button>
          </div>

          <div className="space-y-2 sm:space-y-3 lg:space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-2 sm:gap-3 lg:gap-4 p-2 sm:p-3 lg:p-4 hover:bg-muted/50 rounded-lg sm:rounded-xl transition-colors">
                <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-muted rounded-full flex-shrink-0 shadow-sm">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm lg:text-base font-medium text-foreground">{activity.action}</p>
                  <p className="text-xs sm:text-sm lg:text-base text-muted-foreground truncate">{activity.user}</p>
                  <p className="text-xs lg:text-sm text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card shadow-lg w-full">
        <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-foreground mb-4 sm:mb-6 lg:mb-8">Aksi Cepat</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <button className="flex flex-col items-center p-3 sm:p-4 lg:p-6 bg-primary/10 rounded-lg sm:rounded-xl xl:rounded-2xl hover:bg-primary/20 transition-colors group shadow-sm hover:shadow-md">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-primary mb-2 lg:mb-3 group-hover:scale-110 transition-transform" />
            <span className="text-xs sm:text-xs lg:text-sm xl:text-base font-medium text-primary text-center">Tambah Pengguna</span>
          </button>

          <button className="flex flex-col items-center p-3 sm:p-4 lg:p-6 bg-green-50 rounded-lg sm:rounded-xl xl:rounded-2xl hover:bg-green-100 transition-colors group shadow-sm hover:shadow-md">
            <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-green-600 mb-2 lg:mb-3 group-hover:scale-110 transition-transform" />
            <span className="text-xs sm:text-xs lg:text-sm xl:text-base font-medium text-green-800 text-center">Generate Tagihan</span>
          </button>

          <button className="flex flex-col items-center p-3 sm:p-4 lg:p-6 bg-orange-50 rounded-lg sm:rounded-xl xl:rounded-2xl hover:bg-orange-100 transition-colors group shadow-sm hover:shadow-md">
            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-orange-600 mb-2 lg:mb-3 group-hover:scale-110 transition-transform" />
            <span className="text-xs sm:text-xs lg:text-sm xl:text-base font-medium text-orange-800 text-center">Kelola Mata Kuliah</span>
          </button>

          <button className="flex flex-col items-center p-3 sm:p-4 lg:p-6 bg-purple-50 rounded-lg sm:rounded-xl xl:rounded-2xl hover:bg-purple-100 transition-colors group shadow-sm hover:shadow-md">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-purple-600 mb-2 lg:mb-3 group-hover:scale-110 transition-transform" />
            <span className="text-xs sm:text-xs lg:text-sm xl:text-base font-medium text-purple-800 text-center">Lihat Laporan</span>
          </button>
        </div>
      </div>
    </div>
  );
}