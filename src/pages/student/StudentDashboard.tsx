import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CreditCard, GraduationCap, Calendar, Clock, Bell, TrendingUp, Award, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { Student } from '../../types';
import { ProgressBar } from '../../components/ProgressBar';
import { StatusBadge } from '../../components/StatusBadge';

export function StudentDashboard() {
  const { user } = useAuth();
  const { courses, invoices, notifications } = useApp();
  const student = user as Student;

  const todaySchedule = [
    { time: '08:00-10:30', course: 'Fisiologi Tumbuhan', room: 'Lab Biologi', lecturer: 'Dr. Siti Aminah' },
    { time: '13:00-15:30', course: 'Teknologi Pengolahan Pangan', room: 'Lab Teknologi', lecturer: 'Prof. Ahmad Rahman' },
  ];

  const recentAnnouncements = [
    { title: 'Periode KRS Semester Genap 2023/2024', date: '15 Jan 2024', type: 'info' },
    { title: 'Pengumuman Jadwal Ujian Tengah Semester', date: '10 Jan 2024', type: 'warning' },
    { title: 'Workshop Penulisan Skripsi', date: '8 Jan 2024', type: 'success' },
  ];

  const pendingInvoices = invoices.filter(inv => inv.status === 'pending');
  const unreadNotifications = notifications.filter(n => !n.read);

  const semesterProgress = (student?.semester || 1) / 8 * 100; // Assuming 8 semesters total
  const gpaColor = (student?.gpa || 0) >= 3.5 ? 'green' : (student?.gpa || 0) >= 3.0 ? 'blue' : 'orange';

  return (
    <div className="space-responsive animate-fade-in">
      {/* Welcome Section */}
      <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 text-gray-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-blue-500/10 rounded-full -translate-y-12 translate-x-12 sm:-translate-y-16 sm:translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-purple-500/10 rounded-full translate-y-8 -translate-x-8 sm:translate-y-12 sm:-translate-x-12"></div>
        
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
              <h1 className="text-responsive-lg text-gray-800">Selamat Datang, {student?.name}!</h1>
            </div>
            <p className="text-gray-700 text-responsive-sm mb-2">
              {student?.studentId} - {student?.program}
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
              <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full font-medium">Semester {student?.semester}</span>
              <span className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full font-medium">IPK: {student?.gpa}</span>
              <span className="bg-purple-100 text-purple-800 px-2 sm:px-3 py-1 rounded-full font-medium">SKS: {student?.totalCredits}</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="glass-card p-3 sm:p-4 text-center">
              <p className="text-gray-600 text-xs sm:text-sm mb-1">Status Akademik</p>
              <StatusBadge 
                status={student?.status === 'active' ? 'success' : 'warning'} 
                text={student?.status === 'active' ? 'Aktif' : 'Tidak Aktif'} 
                size="lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid-responsive stagger-animation">
        <div className="card interactive">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div>
              <p className="text-gray-600 text-xs sm:text-sm">IPK Kumulatif</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{student?.gpa}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center glow">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
          <ProgressBar value={student?.gpa || 0} max={4} color={gpaColor} showPercentage={false} />
        </div>

        <div className="card interactive">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div>
              <p className="text-gray-600 text-xs sm:text-sm">Progress Studi</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{Math.round(semesterProgress)}%</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center glow">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
          <ProgressBar value={semesterProgress} color="blue" />
        </div>

        <div className="card interactive">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs sm:text-sm">Tagihan Pending</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{pendingInvoices.length}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center glow">
              <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card interactive">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs sm:text-sm">Notifikasi Baru</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{unreadNotifications.length}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center glow">
              <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid-responsive-2">
        {/* Today's Schedule */}
        <div className="card">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-responsive-md text-gray-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              Jadwal Hari Ini
            </h2>
            <Link to="/student/schedule" className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium transition-colors">
              Lihat Semua
            </Link>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {todaySchedule.map((schedule, index) => (
              <div key={index} className="flex items-center p-3 sm:p-4 glass rounded-xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mr-3 sm:mr-4 glow">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm sm:text-base text-gray-900">{schedule.course}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{schedule.lecturer}</p>
                  <p className="text-xs text-gray-500">{schedule.room} • {schedule.time}</p>
                </div>
              </div>
            ))}
          </div>

          {todaySchedule.length === 0 && (
            <div className="text-center py-6 sm:py-8 text-gray-500">
              <Calendar className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm sm:text-base">Tidak ada jadwal kuliah hari ini</p>
            </div>
          )}
        </div>

        {/* Recent Announcements */}
        <div className="card">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-responsive-md text-gray-900 flex items-center gap-2">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
              Pengumuman Terbaru
            </h2>
            <Link to="/student/announcements" className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium transition-colors">
              Lihat Semua
            </Link>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {recentAnnouncements.map((announcement, index) => (
              <div key={index} className="notification info hover:scale-105 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <StatusBadge status={announcement.type as any} text="" showIcon={true} size="sm" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1">{announcement.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{announcement.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-responsive-md text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
          Aksi Cepat
        </h2>
        <div className="grid-responsive stagger-animation">
          <Link to="/student/krs" className="flex flex-col items-center p-4 sm:p-6 glass rounded-xl sm:rounded-2xl hover:scale-105 transition-all duration-300 group interactive">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:glow transition-all duration-300">
              <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-800">KRS Online</span>
          </Link>

          <Link to="/student/academic" className="flex flex-col items-center p-4 sm:p-6 glass rounded-xl sm:rounded-2xl hover:scale-105 transition-all duration-300 group interactive">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:glow transition-all duration-300">
              <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-800">Transkrip Nilai</span>
          </Link>

          <Link to="/student/finance" className="flex flex-col items-center p-4 sm:p-6 glass rounded-xl sm:rounded-2xl hover:scale-105 transition-all duration-300 group interactive">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:glow transition-all duration-300">
              <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-800">Pembayaran</span>
          </Link>

          <Link to="/student/settings" className="flex flex-col items-center p-4 sm:p-6 glass rounded-xl sm:rounded-2xl hover:scale-105 transition-all duration-300 group interactive">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:glow transition-all duration-300">
              <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-800">Profil</span>
          </Link>
        </div>
      </div>
    </div>
  );
}