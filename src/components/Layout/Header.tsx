import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Menu, X, LogOut, User, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

interface HeaderProps {
  onMenuToggle?: () => void;
  showMenuToggle?: boolean;
}

export function Header({ onMenuToggle, showMenuToggle = false }: HeaderProps) {
  const { user, logout } = useAuth();
  const { notifications } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    setShowProfile(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg" style={{
      background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 30%, #ffffff 70%, #f1f5f9 100%)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 0 rgba(0, 0, 0, 0.05)'
    }}>
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10">
        <div className="flex justify-between items-center h-14 sm:h-16 lg:h-18 xl:h-20">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 min-w-0 flex-1 lg:flex-none">
            {showMenuToggle && (
              <button
                onClick={onMenuToggle}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100/80 transition-all duration-300 shadow-sm hover:shadow-md flex-shrink-0"
                style={{
                  background: 'linear-gradient(145deg, #f8fafc, #e2e8f0)',
                  boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.1), inset -1px -1px 2px rgba(0, 0, 0, 0.1), inset 1px 1px 2px rgba(255, 255, 255, 0.8)'
                }}
                aria-label="Toggle menu"
              >
                <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
              </button>
            )}
            
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 interactive min-w-0">
              <div className="relative flex-shrink-0">
                <img
                  src="https://home.instiperjogja.ac.id/assets/images/instiper.png"
                  alt="INSTIPER Logo"
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 object-contain float-animation"
                />
              </div>
              <div className="hidden sm:block min-w-0">
                <h1 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-gray-900 truncate">Portal Mahasiswa</h1>
                <p className="text-xs sm:text-sm lg:text-base text-gray-700 font-medium truncate">Institut Pertanian STIPER</p>
              </div>
            </Link>
          </div>

          {/* Right side - Notifications and Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 flex-shrink-0">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 sm:p-3 rounded-xl hover:bg-gray-100/80 transition-all duration-300 shadow-sm hover:shadow-md"
                style={{
                  background: 'linear-gradient(145deg, #f8fafc, #e2e8f0)',
                  boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.1), inset -1px -1px 2px rgba(0, 0, 0, 0.1), inset 1px 1px 2px rgba(255, 255, 255, 0.8)'
                }}
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-800" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex items-center justify-center pulse-glow font-semibold shadow-lg">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-72 sm:w-80 lg:w-96 xl:w-[28rem] bg-white rounded-2xl py-2 z-50 animate-fade-in shadow-2xl border border-gray-200"
                  style={{
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
                  }}>
                  <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
                    <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-gray-900">Notifikasi</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.slice(0, 5).map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50/50' : ''}`}
                      >
                        <p className="font-medium text-xs sm:text-sm lg:text-base text-gray-900">{notification.title}</p>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(notification.createdAt).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    ))}
                  </div>
                  {notifications.length > 5 && (
                    <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200">
                      <button className="text-xs sm:text-sm lg:text-base text-blue-600 hover:text-blue-700 font-medium">
                        Lihat semua notifikasi
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-xl hover:bg-gray-100/80 transition-all duration-300 shadow-sm hover:shadow-md"
                style={{
                  background: 'linear-gradient(145deg, #f8fafc, #e2e8f0)',
                  boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.1), inset -1px -1px 2px rgba(0, 0, 0, 0.1), inset 1px 1px 2px rgba(255, 255, 255, 0.8)'
                }}
                aria-label="Profile menu"
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center glow shadow-lg flex-shrink-0">
                  <span className="text-white text-xs sm:text-sm lg:text-base xl:text-lg font-semibold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden sm:block text-left min-w-0">
                  <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-900 truncate max-w-24 sm:max-w-32 lg:max-w-40">{user?.name}</p>
                  <p className="text-xs lg:text-sm text-gray-700 capitalize font-medium">{user?.role}</p>
                </div>
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-3 w-48 sm:w-56 lg:w-64 bg-white rounded-2xl py-2 z-50 animate-fade-in shadow-2xl border border-gray-200"
                  style={{
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
                  }}>
                  <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
                    <p className="font-medium text-xs sm:text-sm lg:text-base text-gray-900 truncate">{user?.name}</p>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{user?.email}</p>
                  </div>
                  
                  <Link
                    to="/profile"
                    className="flex items-center px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm lg:text-base text-gray-800 hover:bg-gray-50 transition-colors font-medium"
                    onClick={() => setShowProfile(false)}
                  >
                    <User className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-2 sm:mr-3" />
                    Profil Saya
                  </Link>
                  
                  <Link
                    to="/settings"
                    className="flex items-center px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm lg:text-base text-gray-800 hover:bg-gray-50 transition-colors font-medium"
                    onClick={() => setShowProfile(false)}
                  >
                    <Settings className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-2 sm:mr-3" />
                    Pengaturan
                  </Link>
                  
                  <hr className="my-2 border-gray-200" />
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm lg:text-base text-red-600 hover:bg-red-50 transition-colors font-medium"
                  >
                    <LogOut className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-2 sm:mr-3" />
                    Keluar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}