import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Bell, Sparkles, TrendingUp, Leaf, TreePine, Sprout, Users, Award, BookOpen, GraduationCap, Star, CheckCircle, Phone, Mail, MapPin as Location, Globe, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { ParticleBackground } from '../components/ParticleBackground';

export function Landing() {
  // Mock data for portal content
  const announcements = [
    {
      id: '1',
      title: 'Pembukaan Pendaftaran Mahasiswa Baru 2025/2026',
      excerpt: 'Pendaftaran mahasiswa baru untuk tahun akademik 2025/2026 telah dibuka. Daftar sekarang dan raih masa depan cerah bersama INSTIPER.',
      publishDate: '2024-12-20',
      category: 'academic',
      featured: true,
      image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '2',
      title: 'Beasiswa Prestasi Akademik 2025',
      excerpt: 'Program beasiswa prestasi akademik untuk mahasiswa berprestasi telah dibuka. Syarat dan ketentuan dapat dilihat di pengumuman lengkap.',
      publishDate: '2024-12-18',
      category: 'general',
      featured: true,
      image: 'https://images.pexels.com/photos/5940721/pexels-photo-5940721.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '3',
      title: 'Workshop Kewirausahaan Agribisnis',
      excerpt: 'Workshop kewirausahaan untuk mahasiswa agribisnis dengan narasumber praktisi sukses di bidang pertanian.',
      publishDate: '2024-12-15',
      category: 'academic',
      featured: false,
      image: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const studyPrograms = [
    {
      id: '1',
      name: 'Agroteknologi',
      level: 'S1',
      accreditation: 'A',
      description: 'Program studi yang mempelajari teknologi pertanian modern untuk meningkatkan produktivitas dan kualitas hasil pertanian.',
      image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: '🌱'
    },
    {
      id: '2',
      name: 'Teknologi Pangan',
      level: 'S1',
      accreditation: 'A',
      description: 'Mempelajari teknologi pengolahan, pengawetan, dan keamanan pangan untuk industri makanan modern.',
      image: 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: '🍎'
    },
    {
      id: '3',
      name: 'Agribisnis',
      level: 'S1',
      accreditation: 'B',
      description: 'Program studi yang mengintegrasikan aspek bisnis dengan sektor pertanian untuk menciptakan wirausaha sukses.',
      image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: '💼'
    },
    {
      id: '4',
      name: 'Peternakan',
      level: 'S1',
      accreditation: 'B',
      description: 'Mempelajari budidaya ternak, nutrisi, reproduksi, dan manajemen peternakan modern.',
      image: 'https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: '🐄'
    }
  ];

  const facilities = [
    {
      name: 'Laboratorium Teknologi Pangan',
      description: 'Laboratorium modern dengan peralatan canggih untuk praktikum teknologi pengolahan pangan',
      image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      name: 'Greenhouse Modern',
      description: 'Fasilitas greenhouse dengan teknologi climate control untuk penelitian tanaman',
      image: 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      name: 'Kandang Ternak Experimental',
      description: 'Kandang modern untuk praktikum dan penelitian peternakan',
      image: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const testimonials = [
    {
      name: 'Ahmad Rizki',
      program: 'Agroteknologi 2020',
      message: 'INSTIPER memberikan pendidikan berkualitas dengan fasilitas modern. Saya sangat terbantu dalam mengembangkan kemampuan di bidang pertanian.',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Siti Nurhaliza',
      program: 'Teknologi Pangan 2019',
      message: 'Dosen-dosen yang berpengalaman dan kurikulum yang up-to-date membuat saya siap menghadapi dunia kerja.',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Budi Santoso',
      program: 'Agribisnis 2018',
      message: 'Setelah lulus, saya berhasil membangun usaha agribisnis sendiri berkat ilmu yang didapat di INSTIPER.',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const stats = [
    { number: '2,500+', label: 'Mahasiswa Aktif', icon: '🌿' },
    { number: '15+', label: 'Program Studi', icon: '🎓' },
    { number: '95%', label: 'Tingkat Kelulusan', icon: '📊' },
    { number: '85%', label: 'Tingkat Kerja Alumni', icon: '💼' }
  ];

  const achievements = [
    {
      title: 'Akreditasi A',
      description: 'Program Studi Agroteknologi dan Teknologi Pangan terakreditasi A',
      icon: '🏆'
    },
    {
      title: 'ISO 9001:2015',
      description: 'Sertifikasi manajemen mutu internasional',
      icon: '⭐'
    },
    {
      title: 'Top 100 Perguruan Tinggi',
      description: 'Masuk dalam ranking 100 besar perguruan tinggi di Indonesia',
      icon: '🥇'
    }
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
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccreditationColor = (accreditation: string) => {
    switch (accreditation) {
      case 'A': return 'bg-green-100 text-green-800';
      case 'B': return 'bg-blue-100 text-blue-800';
      case 'C': return 'bg-yellow-100 text-yellow-800';
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
                  <h1 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900">INSTIPER</h1>
                  <p className="text-xs text-gray-700 font-medium">Institut Pertanian STIPER</p>
                </div>
              </div>
              
              {/* Navigation Menu - Hidden on mobile */}
              <nav className="hidden lg:flex items-center space-x-8">
                <a href="#beranda" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Beranda</a>
                <a href="#program-studi" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Program Studi</a>
                <a href="#fasilitas" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Fasilitas</a>
                <a href="#tentang" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Tentang</a>
                <a href="#kontak" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Kontak</a>
              </nav>
              
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Link to="/login" className="btn-secondary text-xs sm:text-sm px-3 sm:px-4 py-2">
                  Masuk
                </Link>
                <Link to="/register" className="btn-primary text-xs sm:text-sm px-3 sm:px-4 py-2">
                  Daftar PMB
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section id="beranda" className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-green-100 px-4 py-2 rounded-full mb-6">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-gray-800">Penerimaan Mahasiswa Baru 2025/2026</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Wujudkan Impian Menjadi
                <span className="block bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent">
                  Ahli Pertanian Profesional
                </span>
              </h1>
              
              <p className="text-sm sm:text-lg md:text-xl text-emerald-100 mb-6 sm:mb-8 leading-relaxed font-medium max-w-4xl mx-auto">
                Institut Pertanian STIPER Yogyakarta - Perguruan tinggi pertanian terdepan yang menghasilkan lulusan berkualitas, 
                siap menghadapi tantangan industri pertanian modern dengan teknologi terkini dan pendekatan berkelanjutan.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12">
                <Link to="/register" className="btn-primary text-sm sm:text-lg px-6 sm:px-8 py-3 sm:py-4 flex items-center justify-center gap-2 group">
                  <Sprout className="w-4 h-4 sm:w-5 sm:h-5" />
                  Daftar Sekarang
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="#program-studi" className="btn-secondary text-sm sm:text-lg px-6 sm:px-8 py-3 sm:py-4 flex items-center justify-center gap-2">
                  <TreePine className="w-4 h-4 sm:w-5 sm:h-5" />
                  Lihat Program Studi
                </a>
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

        {/* Program Studi Section */}
        <section id="program-studi" className="py-12 sm:py-16 md:py-20 bg-white/90">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <GraduationCap className="w-6 h-6 text-emerald-500" />
                <span className="text-sm font-medium text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">Program Unggulan</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Program Studi Berkualitas</h2>
              <p className="text-gray-700 text-sm sm:text-base max-w-3xl mx-auto">
                Pilih program studi yang sesuai dengan minat dan bakat Anda. Semua program studi kami telah terakreditasi 
                dan didukung oleh dosen berpengalaman serta fasilitas modern.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {studyPrograms.map((program) => (
                <div key={program.id} className="card hover:scale-105 transition-all duration-300 group overflow-hidden">
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={program.image} 
                      alt={program.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-800">
                        {program.level}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAccreditationColor(program.accreditation)}`}>
                        Akreditasi {program.accreditation}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 text-3xl bg-white/90 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center">
                      {program.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {program.name}
                  </h3>
                  
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                    {program.description}
                  </p>
                  
                  <div className="mt-auto">
                    <Link to="/register" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-1 group">
                      Pelajari Lebih Lanjut
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-emerald-50/50">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Award className="w-6 h-6 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">Prestasi</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pencapaian & Pengakuan</h2>
              <p className="text-gray-700 text-sm sm:text-base max-w-3xl mx-auto">
                INSTIPER telah meraih berbagai prestasi dan pengakuan sebagai bukti komitmen kami dalam memberikan pendidikan berkualitas tinggi.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="card text-center hover:scale-105 transition-all duration-300">
                  <div className="text-4xl mb-4">{achievement.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{achievement.title}</h3>
                  <p className="text-gray-700 text-sm">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Facilities Section */}
        <section id="fasilitas" className="py-12 sm:py-16 md:py-20 bg-white/90">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <BookOpen className="w-6 h-6 text-blue-500" />
                <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">Fasilitas Modern</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Fasilitas Pendukung Pembelajaran</h2>
              <p className="text-gray-700 text-sm sm:text-base max-w-3xl mx-auto">
                Fasilitas modern dan lengkap untuk mendukung proses pembelajaran yang optimal dan pengembangan keterampilan praktis mahasiswa.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {facilities.map((facility, index) => (
                <div key={index} className="card hover:scale-105 transition-all duration-300 group overflow-hidden">
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={facility.image} 
                      alt={facility.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {facility.name}
                  </h3>
                  
                  <p className="text-gray-700 text-sm">
                    {facility.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-emerald-50/50">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Users className="w-6 h-6 text-purple-500" />
                <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">Testimoni</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Kata Alumni</h2>
              <p className="text-gray-700 text-sm sm:text-base max-w-3xl mx-auto">
                Dengarkan pengalaman dan kesuksesan alumni INSTIPER yang telah berkarir di berbagai bidang pertanian dan industri terkait.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="card hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.program}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 text-sm italic">"{testimonial.message}"</p>
                </div>
              ))}
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
                  <span className="text-sm font-medium text-orange-600 bg-orange-100 px-3 py-1 rounded-full">Terbaru</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">Pengumuman & Berita</h2>
                <p className="text-gray-700 text-sm sm:text-base">Informasi terkini seputar INSTIPER dan dunia pendidikan pertanian</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {announcements.map((announcement) => (
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
                    <Link to={`/announcements/${announcement.id}`} className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-1 group">
                      Baca
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="tentang" className="py-12 sm:py-16 md:py-20 bg-emerald-50/50">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <TreePine className="w-6 h-6 text-emerald-500" />
                  <span className="text-sm font-medium text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">Tentang Kami</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Institut Pertanian STIPER Yogyakarta
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Institut Pertanian STIPER Yogyakarta adalah perguruan tinggi swasta yang berfokus pada pengembangan 
                    ilmu pertanian dan teknologi pangan. Didirikan dengan visi menjadi institusi pendidikan tinggi 
                    pertanian terdepan di Indonesia.
                  </p>
                  <p>
                    Dengan dukungan dosen berpengalaman, fasilitas modern, dan kurikulum yang selalu update mengikuti 
                    perkembangan teknologi, kami berkomitmen menghasilkan lulusan yang kompeten dan siap menghadapi 
                    tantangan industri pertanian masa depan.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">25+</div>
                    <div className="text-sm text-gray-600">Tahun Pengalaman</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">5000+</div>
                    <div className="text-sm text-gray-600">Alumni Sukses</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="INSTIPER Campus"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Terakreditasi</div>
                      <div className="text-sm text-gray-600">BAN-PT</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden bg-gradient-to-r from-emerald-600/20 to-green-600/20">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center relative">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-green-100 px-4 py-2 rounded-full mb-6">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-gray-800">Bergabung Sekarang</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Siap Memulai Perjalanan Akademik Anda?
            </h2>
            <p className="text-sm sm:text-lg text-emerald-100 mb-6 sm:mb-8 max-w-2xl mx-auto font-medium">
              Bergabunglah dengan ribuan mahasiswa yang telah merasakan pendidikan berkualitas di INSTIPER. 
              Masa depan pertanian Indonesia dimulai dari sini! 🚀
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link to="/register" className="btn-primary text-sm sm:text-lg px-6 sm:px-8 py-3 sm:py-4 inline-flex items-center justify-center gap-2 group">
                <Sprout className="w-4 h-4 sm:w-5 sm:h-5" />
                Daftar Sebagai Calon Mahasiswa
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#kontak" className="btn-secondary text-sm sm:text-lg px-6 sm:px-8 py-3 sm:py-4 inline-flex items-center justify-center gap-2">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                Hubungi Kami
              </a>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="kontak" className="py-12 sm:py-16 md:py-20 bg-white/90">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Location className="w-6 h-6 text-blue-500" />
                <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">Kontak</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Hubungi Kami</h2>
              <p className="text-gray-700 text-sm sm:text-base max-w-3xl mx-auto">
                Kami siap membantu Anda dengan informasi lebih lanjut tentang program studi dan proses pendaftaran.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="card">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Kirim Pesan</h3>
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                        <input type="text" className="input-field" placeholder="Masukkan nama lengkap" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input type="email" className="input-field" placeholder="Masukkan email" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subjek</label>
                      <input type="text" className="input-field" placeholder="Masukkan subjek" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pesan</label>
                      <textarea className="input-field" rows={4} placeholder="Tulis pesan Anda"></textarea>
                    </div>
                    <button type="submit" className="btn-primary w-full">
                      Kirim Pesan
                    </button>
                  </form>
                </div>
              </div>

              <div className="space-y-6">
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Kontak</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Location className="w-5 h-5 text-emerald-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Alamat</p>
                        <p className="text-sm text-gray-600">
                          Jl. Petung No. 2, Papringan<br />
                          Caturtunggal, Depok, Sleman<br />
                          Yogyakarta 55281
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-emerald-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Telepon</p>
                        <p className="text-sm text-gray-600">(0274) 2901011</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-emerald-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <p className="text-sm text-gray-600">info@instiperjogja.ac.id</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Globe className="w-5 h-5 text-emerald-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Website</p>
                        <p className="text-sm text-gray-600">www.instiperjogja.ac.id</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Ikuti Kami</h3>
                  <div className="flex gap-3">
                    <a href="#" className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors">
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-pink-100 text-pink-600 rounded-lg flex items-center justify-center hover:bg-pink-200 transition-colors">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors">
                      <Youtube className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
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
                  Perguruan tinggi pertanian terdepan yang menghasilkan lulusan berkualitas, 
                  siap menghadapi tantangan industri pertanian modern dengan teknologi terkini.
                </p>
                <div className="flex gap-3">
                  <a href="#" className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-8 h-8 bg-pink-100 text-pink-600 rounded-lg flex items-center justify-center hover:bg-pink-200 transition-colors">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors">
                    <Youtube className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-gray-900 font-semibold mb-4 text-sm sm:text-base">Program Studi</h4>
                <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
                  <li><a href="#" className="hover:text-gray-900 transition-colors font-medium">Agroteknologi</a></li>
                  <li><a href="#" className="hover:text-gray-900 transition-colors font-medium">Teknologi Pangan</a></li>
                  <li><a href="#" className="hover:text-gray-900 transition-colors font-medium">Agribisnis</a></li>
                  <li><a href="#" className="hover:text-gray-900 transition-colors font-medium">Peternakan</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-gray-900 font-semibold mb-4 text-sm sm:text-base">Tautan Cepat</h4>
                <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
                  <li><Link to="/register" className="hover:text-gray-900 transition-colors font-medium">Pendaftaran PMB</Link></li>
                  <li><Link to="/login" className="hover:text-gray-900 transition-colors font-medium">Portal Mahasiswa</Link></li>
                  <li><a href="#" className="hover:text-gray-900 transition-colors font-medium">Beasiswa</a></li>
                  <li><a href="#" className="hover:text-gray-900 transition-colors font-medium">Karir</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-emerald-200 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-700 text-xs sm:text-sm text-center md:text-left mb-4 md:mb-0">
                <p>&copy; 2025 Institut Pertanian STIPER Yogyakarta. All rights reserved.</p>
                <p>Pusat-SIA - Sistem Informasi Akademik Terintegrasi</p>
              </div>
              <div className="flex space-x-4 sm:space-x-6 text-xs sm:text-sm text-gray-700">
                <a href="#" className="hover:text-gray-900 transition-colors font-medium">Kebijakan Privasi</a>
                <a href="#" className="hover:text-gray-900 transition-colors font-medium">Syarat & Ketentuan</a>
                <a href="#" className="hover:text-gray-900 transition-colors font-medium">Bantuan</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}