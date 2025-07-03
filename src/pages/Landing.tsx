import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, BookOpen, CreditCard, Calendar, Bell, FileText, Clock, MapPin, User, ChevronRight, Sparkles, TrendingUp, Leaf, TreePine, Sprout } from 'lucide-react';
import { ParticleBackground } from '../components/ParticleBackground';

export function Landing() {
  // Mock data for portal content
  const announcements = [
    {
      id: '1',
      title: 'Pembukaan Pendaftaran Mahasiswa Baru 2024/2025',
      excerpt: 'Pendaftaran mahasiswa baru untuk tahun akademik 2024/2025 telah dibuka. Daftar sekarang dan raih masa depan cerah bersama INSTIPER.',
      publishDate: '2024-01-20',
      category: 'academic',
      featured: true,
      image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '2',
      title: 'Pengumuman Jadwal Ujian Tengah Semester',
      excerpt: 'Jadwal ujian tengah semester genap 2023/2024 telah ditetapkan. Mahasiswa diharapkan mempersiapkan diri dengan baik.',
      publishDate: '2024-01-18',
      category: 'academic',
      featured: false,
      image: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '3',
      title: 'Beasiswa Prestasi Akademik 2024',
      excerpt: 'Program beasiswa prestasi akademik untuk mahasiswa berprestasi telah dibuka. Syarat dan ketentuan dapat dilihat di pengumuman lengkap.',
      publishDate: '2024-01-15',
      category: 'general',
      featured: true,
      image: 'https://images.pexels.com/photos/5940721/pexels-photo-5940721.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const information = [
    {
      id: '1',
      title: 'Panduan Penggunaan Sistem Akademik Online',
      excerpt: 'Panduan lengkap untuk menggunakan sistem akademik online INSTIPER, mulai dari login hingga pengisian KRS.',
      publishDate: '2024-01-19',
      category: 'academic',
      featured: true,
      icon: '🌱'
    },
    {
      id: '2',
      title: 'Fasilitas Laboratorium Terbaru',
      excerpt: 'INSTIPER telah menambah fasilitas laboratorium modern untuk mendukung kegiatan praktikum mahasiswa.',
      publishDate: '2024-01-17',
      category: 'facility',
      featured: false,
      icon: '🔬'
    },
    {
      id: '3',
      title: 'Prosedur Pembayaran UKT Online',
      excerpt: 'Informasi lengkap mengenai tata cara pembayaran UKT melalui sistem online dan virtual account.',
      publishDate: '2024-01-16',
      category: 'general',
      featured: true,
      icon: '💳'
    }
  ];

  const agenda = [
    {
      id: '1',
      title: 'Seminar Nasional Teknologi Pertanian',
      description: 'Seminar nasional dengan tema "Inovasi Teknologi untuk Pertanian Berkelanjutan"',
      startDate: '2024-02-15',
      endDate: '2024-02-15',
      location: 'Auditorium INSTIPER',
      category: 'seminar',
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '2',
      title: 'Workshop Penulisan Skripsi',
      description: 'Workshop untuk mahasiswa tingkat akhir tentang teknik penulisan skripsi yang baik dan benar',
      startDate: '2024-02-20',
      endDate: '2024-02-21',
      location: 'Ruang Seminar Lt. 2',
      category: 'workshop',
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '3',
      title: 'Ujian Tengah Semester',
      description: 'Pelaksanaan ujian tengah semester genap tahun akademik 2023/2024',
      startDate: '2024-03-01',
      endDate: '2024-03-15',
      location: 'Berbagai Ruang',
      category: 'exam',
      image: 'https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const stats = [
    { number: '2,500+', label: 'Mahasiswa Aktif', icon: '🌿' },
    { number: '15+', label: 'Program Studi', icon: '🎓' },
    { number: '99.9%', label: 'Uptime Sistem', icon: '⚡' },
    { number: '24/7', label: 'Akses Online', icon: '🌐' }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-emerald-100 text-emerald-800';
      case 'general': return 'bg-green-100 text-green-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'seminar': return 'bg-purple-100 text-purple-800';
      case 'workshop': return 'bg-orange-100 text-orange-800';
      case 'exam': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen relative modern-bg">
      <ParticleBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="glass sticky top-0 z-50 border-b border-emerald-300/30 bg-white/95 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 sm:h-16">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <img
                  src="https://home.instiperjogja.ac.id/assets/images/instiper.png"
                  alt="INSTIPER Logo"
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain float-animation"
                />
                <div>
                  <h1 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900">Portal Mahasiswa</h1>
                  <p className="text-xs text-gray-700 font-medium">Institut Pertanian STIPER</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Link to="/login" className="btn-secondary text-xs sm:text-sm px-3 sm:px-4 py-2">
                  Masuk
                </Link>
                <Link to="/register" className="btn-primary text-xs sm:text-sm px-3 sm:px-4 py-2">
                  Daftar Sekarang
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-green-100 px-4 py-2 rounded-full mb-6">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-gray-800">Portal Admisi & Mahasiswa</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Masa Depan Pertanian
                <span className="block bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent">
                  Dimulai dari Sini
                </span>
              </h1>
              
              <p className="text-sm sm:text-lg md:text-xl text-emerald-100 mb-6 sm:mb-8 leading-relaxed font-medium max-w-3xl mx-auto">
                Platform digital terdepan untuk mahasiswa pertanian dan kehutanan modern. Akses semua kebutuhan akademik, informasi terkini, dan layanan kampus dalam satu tempat yang mudah dan intuitif.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12">
                <Link to="/register" className="btn-primary text-sm sm:text-lg px-6 sm:px-8 py-3 sm:py-4 flex items-center justify-center gap-2 group">
                  <Sprout className="w-4 h-4 sm:w-5 sm:h-5" />
                  Mulai Pendaftaran
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/login" className="btn-secondary text-sm sm:text-lg px-6 sm:px-8 py-3 sm:py-4 flex items-center justify-center gap-2">
                  <TreePine className="w-4 h-4 sm:w-5 sm:h-5" />
                  Portal Mahasiswa
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 glass rounded-xl hover:scale-105 transition-all duration-300">
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-lg sm:text-2xl font-bold text-white">{stat.number}</div>
                    <div className="text-xs sm:text-sm text-emerald-200 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Announcements Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-white/90">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8 sm:mb-12">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Bell className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-medium text-orange-600 bg-orange-100 px-3 py-1 rounded-full">Hot News</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">Pengumuman Terbaru</h2>
                <p className="text-gray-700 text-sm sm:text-base">Jangan sampai ketinggalan info penting! 🔥</p>
              </div>
              <Link to="/announcements" className="flex items-center gap-2 text-gray-800 hover:text-gray-900 font-medium text-sm sm:text-base group">
                Lihat Semua
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {announcements.map((announcement, index) => (
                <div key={announcement.id} className="card hover:scale-105 transition-all duration-300 group overflow-hidden">
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={announcement.image} 
                      alt={announcement.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(announcement.category)}`}>
                        {announcement.category === 'academic' ? 'Akademik' : 'Umum'}
                      </span>
                      {announcement.featured && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Hot
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {announcement.title}
                  </h3>
                  
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                    {announcement.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(announcement.publishDate)}</span>
                    </div>
                    <Link to={`/announcements/${announcement.id}`} className="text-gray-800 hover:text-gray-900 text-sm font-medium flex items-center gap-1 group">
                      Baca
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Information Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-emerald-50/50">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8 sm:mb-12">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm font-medium text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">Info Center</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">Informasi Kampus</h2>
                <p className="text-gray-700 text-sm sm:text-base">Panduan lengkap untuk kehidupan kampus yang lebih mudah 📖</p>
              </div>
              <Link to="/information" className="flex items-center gap-2 text-gray-800 hover:text-gray-900 font-medium text-sm sm:text-base group">
                Lihat Semua
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {information.map((info) => (
                <div key={info.id} className="card hover:scale-105 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl">{info.icon}</div>
                    <div className="flex-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(info.category)}`}>
                        {info.category === 'academic' ? 'Akademik' : 
                         info.category === 'facility' ? 'Fasilitas' : 'Umum'}
                      </span>
                      {info.featured && (
                        <span className="ml-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                          Trending
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {info.title}
                  </h3>
                  
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                    {info.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <FileText className="w-3 h-3" />
                      <span>{formatDate(info.publishDate)}</span>
                    </div>
                    <Link to={`/information/${info.id}`} className="text-gray-800 hover:text-gray-900 text-sm font-medium flex items-center gap-1 group">
                      Baca
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Agenda Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-white/90">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8 sm:mb-12">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">Events</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">Agenda Kegiatan</h2>
                <p className="text-gray-700 text-sm sm:text-base">Jangan sampai terlewat acara seru di kampus! 🎉</p>
              </div>
              <Link to="/agenda" className="flex items-center gap-2 text-gray-800 hover:text-gray-900 font-medium text-sm sm:text-base group">
                Lihat Semua
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {agenda.map((event) => (
                <div key={event.id} className="card hover:scale-105 transition-all duration-300 group overflow-hidden">
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                        {event.category === 'seminar' ? 'Seminar' :
                         event.category === 'workshop' ? 'Workshop' :
                         event.category === 'exam' ? 'Ujian' : 'Acara'}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                      <div className="flex items-center gap-1 text-xs text-gray-700">
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(event.startDate)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {event.startDate === event.endDate 
                          ? formatDate(event.startDate)
                          : `${formatDate(event.startDate)} - ${formatDate(event.endDate)}`
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <MapPin className="w-3 h-3" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-emerald-100">
                    <Link to={`/agenda/${event.id}`} className="text-gray-800 hover:text-gray-900 text-sm font-medium flex items-center gap-1 group">
                      Lihat Detail
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden bg-gradient-to-r from-emerald-600/20 to-green-600/20">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center relative">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-green-100 px-4 py-2 rounded-full mb-6">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-gray-800">Join the Future</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Siap Memulai Perjalanan Akademik Anda?
            </h2>
            <p className="text-sm sm:text-lg text-emerald-100 mb-6 sm:mb-8 max-w-2xl mx-auto font-medium">
              Bergabunglah dengan ribuan mahasiswa yang telah merasakan kemudahan sistem kami. 
              Masa depan pertanian dan kehutanan dimulai dari sini! 🚀
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link to="/register" className="btn-primary text-sm sm:text-lg px-6 sm:px-8 py-3 sm:py-4 inline-flex items-center justify-center gap-2 group">
                <Sprout className="w-4 h-4 sm:w-5 sm:h-5" />
                Daftar Sebagai Calon Mahasiswa
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/login" className="btn-secondary text-sm sm:text-lg px-6 sm:px-8 py-3 sm:py-4 inline-flex items-center justify-center gap-2">
                <TreePine className="w-4 h-4 sm:w-5 sm:h-5" />
                Portal Mahasiswa Aktif
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="glass border-t border-emerald-200 py-12 sm:py-16 bg-white/95 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-6 sm:gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-4">
                  <img
                    src="https://home.instiperjogja.ac.id/assets/images/instiper.png"
                    alt="INSTIPER Logo"
                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                  />
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">Institut Pertanian STIPER</h3>
                    <p className="text-gray-700 text-xs sm:text-sm font-medium">Yogyakarta</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-700 mb-4 font-medium">
                  Platform digital terdepan yang menghubungkan seluruh civitas akademika 
                  dalam satu ekosistem pendidikan pertanian dan kehutanan yang modern dan efisien.
                </p>
              </div>

              <div>
                <h4 className="text-gray-900 font-semibold mb-4 text-sm sm:text-base">Portal</h4>
                <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
                  <li><Link to="/register" className="hover:text-gray-900 transition-colors font-medium">Pendaftaran</Link></li>
                  <li><Link to="/login" className="hover:text-gray-900 transition-colors font-medium">Portal Mahasiswa</Link></li>
                  <li><Link to="/login" className="hover:text-gray-900 transition-colors font-medium">Portal Admin</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-gray-900 font-semibold mb-4 text-sm sm:text-base">Kontak</h4>
                <ul className="space-y-2 text-gray-700 text-xs sm:text-sm">
                  <li>Jl. Petung No. 2, Papringan</li>
                  <li>Caturtunggal, Depok, Sleman</li>
                  <li>Yogyakarta 55281</li>
                  <li className="pt-2">
                    <strong className="text-gray-900">Email:</strong><br />
                    info@instiperjogja.ac.id
                  </li>
                  <li>
                    <strong className="text-gray-900">Telp:</strong><br />
                    (0274) 2901011
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-emerald-200 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-700 text-xs sm:text-sm text-center md:text-left mb-4 md:mb-0">
                <p>&copy; 2025 Institut Pertanian STIPER Yogyakarta. All rights reserved.</p>
                <p>Pusat-SIA - Sistem Informasi Akademik Terintegrasi</p>
              </div>
              <div className="flex space-x-4 sm:space-x-6 text-xs sm:text-sm text-gray-700">
                <Link to="/privacy" className="hover:text-gray-900 transition-colors font-medium">Kebijakan Privasi</Link>
                <Link to="/terms" className="hover:text-gray-900 transition-colors font-medium">Syarat & Ketentuan</Link>
                <Link to="/help" className="hover:text-gray-900 transition-colors font-medium">Bantuan</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}