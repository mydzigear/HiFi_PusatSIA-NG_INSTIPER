import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, Sparkles, HelpCircle, CheckCircle, Leaf } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ParticleBackground } from '../components/ParticleBackground';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Silakan isi semua field');
      return;
    }

    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Email atau password tidak valid');
    }
  };

  const quickLogin = (userType: 'admin' | 'student' | 'applicant') => {
    const credentials = {
      admin: { email: 'admin@instiper.ac.id', password: 'admin123' },
      student: { email: 'mahasiswa@instiper.ac.id', password: 'mahasiswa123' },
      applicant: { email: 'calon@gmail.com', password: 'calon123' }
    };
    
    setEmail(credentials[userType].email);
    setPassword(credentials[userType].password);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-3 sm:p-4 modern-bg">
      <ParticleBackground />
      
      <div className="relative z-10 max-w-sm sm:max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <div className="relative inline-block">
            <img
              src="https://home.instiperjogja.ac.id/assets/images/instiper.png"
              alt="INSTIPER Logo"
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto mb-4 object-contain float-animation"
            />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">Selamat Datang</h1>
          <p className="text-sm sm:text-base text-emerald-100 font-medium">Masuk ke akun Portal Mahasiswa Anda</p>
        </div>

        {/* User Guide */}
        <div className="card mb-4 sm:mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="guide-step">
            <h4>🌱 Cara Login:</h4>
            <p>1. Masukkan email dan password yang sudah terdaftar</p>
            <p>2. Atau gunakan akun demo untuk mencoba sistem</p>
            <p>3. Klik tombol "Masuk" untuk mengakses dashboard</p>
          </div>
        </div>

        {/* Login Form */}
        <div className="card animate-fade-in" style={{ animationDelay: '200ms' }}>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {error && (
              <div className="notification error animate-fade-in">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-emerald-800 mb-2 required-field">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field focus-ring"
                placeholder="nama@email.com"
                disabled={isLoading}
                aria-describedby="email-help"
              />
              <p id="email-help" className="text-xs text-emerald-600 mt-1">Masukkan alamat email yang terdaftar di sistem</p>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-emerald-800 mb-2 required-field">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-10 sm:pr-12 focus-ring"
                  placeholder="Masukkan password"
                  disabled={isLoading}
                  aria-describedby="password-help"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-500 hover:text-emerald-700 transition-colors"
                  disabled={isLoading}
                  aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
              </div>
              <p id="password-help" className="text-xs text-emerald-600 mt-1">Masukkan password yang telah Anda buat saat registrasi</p>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-emerald-300 text-emerald-500 focus:ring-emerald-200" />
                <span className="ml-2 text-sm text-emerald-700 font-medium">Ingat saya</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors font-medium">
                Lupa password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <>
                  <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
                  Masuk
                </>
              )}
            </button>
          </form>

          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-sm sm:text-base text-emerald-700 font-medium">
              Belum punya akun?{' '}
              <Link to="/register" className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors">
                Daftar sekarang
              </Link>
            </p>
          </div>

          {/* Demo Accounts */}
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <Leaf className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
              <p className="text-xs sm:text-sm font-semibold text-emerald-800">🌱 Akun Demo - Klik untuk login cepat:</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => quickLogin('admin')}
                className="text-xs bg-red-100 text-red-700 px-2 sm:px-3 py-1 sm:py-2 rounded-lg hover:bg-red-200 transition-colors font-semibold border border-red-200"
                disabled={isLoading}
              >
                Admin
              </button>
              <button
                onClick={() => quickLogin('student')}
                className="text-xs bg-emerald-100 text-emerald-700 px-2 sm:px-3 py-1 sm:py-2 rounded-lg hover:bg-emerald-200 transition-colors font-semibold border border-emerald-200"
                disabled={isLoading}
              >
                Mahasiswa
              </button>
              <button
                onClick={() => quickLogin('applicant')}
                className="text-xs bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 sm:py-2 rounded-lg hover:bg-blue-200 transition-colors font-semibold border border-blue-200"
                disabled={isLoading}
              >
                Calon
              </button>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-4 sm:mt-6 help-section">
            <h4>
              <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
              Butuh Bantuan?
            </h4>
            <ul>
              <li>
                <CheckCircle className="w-3 h-3 text-emerald-500 mt-0.5" />
                Email: support@instiper.ac.id
              </li>
              <li>
                <CheckCircle className="w-3 h-3 text-emerald-500 mt-0.5" />
                WhatsApp: +62 274 123456
              </li>
              <li>
                <CheckCircle className="w-3 h-3 text-emerald-500 mt-0.5" />
                Jam Layanan: Senin-Jumat 08:00-16:00
              </li>
            </ul>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-4 sm:mt-6">
          <Link to="/" className="text-emerald-100 hover:text-white text-sm transition-colors font-medium">
            ← Kembali ke beranda
          </Link>
        </div>
      </div>
    </div>
  );
}