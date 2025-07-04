import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  CreditCard, 
  FileText, 
  Settings, 
  Users, 
  BarChart3,
  GraduationCap,
  Calendar,
  X,
  RefreshCw,
  Clock,
  UserCheck,
  DollarSign,
  Database,
  TrendingUp,
  Building,
  Award,
  Layers,
  ChevronDown,
  ChevronRight,
  Bell,
  Info
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  icon: any;
  label: string;
  path: string;
  submenu?: { label: string; path: string; description?: string }[];
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user } = useAuth();
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleSubmenu = (path: string) => {
    setExpandedMenus(prev => 
      prev.includes(path) 
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  const getMenuItems = (): MenuItem[] => {
    switch (user?.role) {
      case 'admin':
        return [
          { 
            icon: Home, 
            label: 'Dashboard', 
            path: '/admin' 
          },
          { 
            icon: Building, 
            label: 'Referensi Akademik', 
            path: '/admin/academic-reference',
            submenu: [
              { 
                label: 'Program Studi', 
                path: '/admin/study-programs',
                description: 'Kelola data master program studi'
              },
              { 
                label: 'Peminatan', 
                path: '/admin/specializations',
                description: 'Kelola peminatan/konsentrasi'
              },
              { 
                label: 'Periode Akademik', 
                path: '/admin/academic-periods',
                description: 'Kelola semester dan tahun akademik'
              }
            ]
          },
          { 
            icon: GraduationCap, 
            label: 'Manajemen Akademik', 
            path: '/admin/academic',
            submenu: [
              { 
                label: 'Data Mahasiswa', 
                path: '/admin/students',
                description: 'Kelola data dan akun mahasiswa'
              },
              { 
                label: 'Mata Kuliah', 
                path: '/admin/courses',
                description: 'Kelola kurikulum dan mata kuliah'
              }
            ]
          },
          { 
            icon: FileText, 
            label: 'Manajemen Konten', 
            path: '/admin/content',
            submenu: [
              { 
                label: 'Pengumuman', 
                path: '/admin/announcements',
                description: 'Kelola pengumuman dan berita'
              },
              { 
                label: 'Informasi', 
                path: '/admin/information',
                description: 'Kelola panduan dan informasi'
              },
              { 
                label: 'Agenda', 
                path: '/admin/agenda',
                description: 'Kelola jadwal kegiatan kampus'
              }
            ]
          },
          { 
            icon: DollarSign, 
            label: 'Sistem Keuangan', 
            path: '/admin/finance',
            submenu: [
              { 
                label: 'Pengaturan Pembayaran', 
                path: '/admin/payment-settings',
                description: 'Kelola jenis dan komponen biaya'
              },
              { 
                label: 'Billing Engine', 
                path: '/admin/billing',
                description: 'Generate tagihan massal'
              }
            ]
          },
          { 
            icon: Users, 
            label: 'Manajemen Pengguna', 
            path: '/admin/users' 
          },
          { 
            icon: BarChart3, 
            label: 'Laporan & Analitik', 
            path: '/admin/reports-analytics',
            submenu: [
              { 
                label: 'Laporan Umum', 
                path: '/admin/reports',
                description: 'Laporan keuangan dan akademik'
              },
              { 
                label: 'Laporan Pembayaran Mahasiswa', 
                path: '/admin/student-payment-report',
                description: 'Laporan detail pembayaran mahasiswa'
              }
            ]
          },
          { 
            icon: Settings, 
            label: 'Pengaturan Sistem', 
            path: '/admin/settings' 
          },
        ];
      case 'student':
        return [
          { icon: Home, label: 'Dashboard', path: '/student' },
          { icon: RefreshCw, label: 'Herregistrasi', path: '/student/herregistration' },
          { icon: BookOpen, label: 'KRS Online', path: '/student/krs' },
          { icon: FileText, label: 'Riwayat Akademik', path: '/student/academic' },
          { icon: Clock, label: 'Jadwal Kuliah', path: '/student/schedule' },
          { icon: CreditCard, label: 'Keuangan', path: '/student/finance' },
          { icon: Settings, label: 'Pengaturan', path: '/student/settings' },
        ];
      case 'applicant':
        return [
          { icon: Home, label: 'Dashboard', path: '/admission' },
          { icon: FileText, label: 'Formulir Pendaftaran', path: '/admission/form' },
          { icon: CreditCard, label: 'Pembayaran', path: '/admission/payment' },
          { icon: BarChart3, label: 'Status Pendaftaran', path: '/admission/status' },
        ];
      default:
        return [];
    }
  };

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  const isActiveParent = (item: MenuItem) => {
    if (item.submenu) {
      return item.submenu.some(sub => location.pathname === sub.path);
    }
    return false;
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-filter backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-72 sm:w-80 xl:w-96 border-r border-gray-200/50 shadow-2xl transform transition-all duration-300 ease-in-out z-50 lg:relative lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 30%, #ffffff 70%, #f1f5f9 100%)',
          boxShadow: '4px 0 20px rgba(0, 0, 0, 0.1), inset -1px 0 0 rgba(0, 0, 0, 0.05), inset 1px 0 0 rgba(255, 255, 255, 0.9)'
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 lg:hidden border-b border-gray-200/50">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <img
                src="https://home.instiperjogja.ac.id/assets/images/instiper.png"
                alt="INSTIPER Logo"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain float-animation"
              />
              <div>
                <span className="font-bold text-gray-900 text-sm sm:text-base">Pusat-SIA</span>
                <p className="text-xs sm:text-sm text-gray-700 font-medium">Institut Pertanian STIPER</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-gray-100/80 transition-all duration-300"
              style={{
                background: 'linear-gradient(145deg, #f8fafc, #e2e8f0)',
                boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.1), inset -1px -1px 2px rgba(0, 0, 0, 0.1), inset 1px 1px 2px rgba(255, 255, 255, 0.8)'
              }}
              aria-label="Close menu"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
            </button>
          </div>

          {/* User Info - Desktop Only */}
          <div className="hidden lg:block p-4 sm:p-6 border-b border-gray-200/50">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 xl:w-14 xl:h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 glow shadow-lg">
                <span className="text-white font-semibold text-sm sm:text-lg xl:text-xl">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base xl:text-lg font-semibold text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs sm:text-sm xl:text-base text-gray-700 capitalize font-medium">{user?.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 sm:px-4 py-4 sm:py-6 space-y-1 sm:space-y-2 overflow-y-auto">
            <div className="stagger-animation">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = isActiveLink(item.path);
                const isParentActive = isActiveParent(item);
                const isExpanded = expandedMenus.includes(item.path);
                const hasSubmenu = item.submenu && item.submenu.length > 0;
                
                return (
                  <div key={item.path} style={{ animationDelay: `${index * 0.1}s` }}>
                    {hasSubmenu ? (
                      <div>
                        <button
                          onClick={() => toggleSubmenu(item.path)}
                          className={`w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 xl:py-4 text-gray-800 rounded-xl transition-all duration-300 hover:bg-gray-100/80 hover:text-blue-700 hover:scale-105 font-medium group text-sm sm:text-base xl:text-lg ${
                            isParentActive ? 'bg-blue-50/80 text-blue-700 shadow-md' : ''
                          }`}
                          style={isParentActive ? {
                            background: 'linear-gradient(145deg, #dbeafe, #bfdbfe)',
                            boxShadow: 'inset 2px 2px 4px rgba(59, 130, 246, 0.2), inset -2px -2px 4px rgba(255, 255, 255, 0.8)'
                          } : {}}
                        >
                          <div className="flex items-center gap-2 sm:gap-3 xl:gap-4">
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5 xl:w-6 xl:h-6 flex-shrink-0" />
                            <span className="truncate">{item.label}</span>
                          </div>
                          {isExpanded ? (
                            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 xl:w-5 xl:h-5 transition-transform duration-200" />
                          ) : (
                            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 xl:w-5 xl:h-5 transition-transform duration-200" />
                          )}
                        </button>
                        
                        {/* Submenu */}
                        <div className={`overflow-hidden transition-all duration-300 ${
                          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                          <div className="ml-3 sm:ml-4 xl:ml-6 mt-1 sm:mt-2 space-y-1 border-l-2 border-gray-200 pl-3 sm:pl-4 xl:pl-6">
                            {item.submenu?.map((subItem) => (
                              <Link
                                key={subItem.path}
                                to={subItem.path}
                                onClick={onClose}
                                className={`block px-2 sm:px-3 xl:px-4 py-2 sm:py-3 rounded-xl transition-all duration-300 group text-xs sm:text-sm xl:text-base ${
                                  isActiveLink(subItem.path) 
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                                    : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50/80'
                                }`}
                                style={isActiveLink(subItem.path) ? {
                                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                                } : {}}
                              >
                                <div className="font-medium">{subItem.label}</div>
                                {subItem.description && (
                                  <div className={`text-xs xl:text-sm mt-1 ${
                                    isActiveLink(subItem.path) ? 'text-blue-100' : 'text-gray-500'
                                  }`}>
                                    {subItem.description}
                                  </div>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={onClose}
                        className={`flex items-center gap-2 sm:gap-3 xl:gap-4 px-3 sm:px-4 py-2 sm:py-3 xl:py-4 text-gray-800 rounded-xl transition-all duration-300 hover:bg-gray-100/80 hover:text-blue-700 hover:scale-105 font-medium text-sm sm:text-base xl:text-lg ${
                          isActive ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105' : ''
                        }`}
                        style={isActive ? {
                          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                        } : {}}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 xl:w-6 xl:h-6 flex-shrink-0" />
                        <span className="truncate">{item.label}</span>
                        {isActive && (
                          <div className="ml-auto w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full shadow-lg"></div>
                        )}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Footer - Mobile Only */}
          <div className="lg:hidden p-4 sm:p-6 border-t border-gray-200/50">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 glow shadow-lg">
                <span className="text-white font-semibold text-xs sm:text-sm">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-700 capitalize font-medium">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}