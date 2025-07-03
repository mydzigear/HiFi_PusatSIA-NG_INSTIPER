import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserPlus, Sparkles, HelpCircle, CheckCircle, AlertCircle, Leaf, Sprout } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ParticleBackground } from '../components/ParticleBackground';

export function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'applicant' as 'student' | 'applicant'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Silakan isi semua field yang wajib diisi');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }

    if (!agreedToTerms) {
      setError('Anda harus menyetujui syarat dan ketentuan');
      return;
    }

    const success = await register(formData.email, formData.password, formData.name, formData.role);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Gagal membuat akun. Silakan coba lagi.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return { strength: 'weak', color: 'red', text: 'Lemah' };
    if (password.length < 8) return { strength: 'medium', color: 'yellow', text: 'Sedang' };
    if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)) return { strength: 'strong', color: 'emerald', text: 'Kuat' };
    return { strength: 'medium', color: 'yellow', text: 'Sedang' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

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
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">Buat Akun Baru</h1>
          <p className="text-sm sm:text-base text-emerald-100 font-medium">Bergabunglah dengan Portal Mahasiswa INSTIPER</p>
        </div>

        {/* Registration Guide */}
        <div className="card mb-4 sm:mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="guide-step">
            <h4>🌱 Panduan Pendaftaran:</h4>
            <p>1. Isi semua data dengan benar dan lengkap</p>
            <p>2. Gunakan email aktif untuk verifikasi</p>
            <p>3. Buat password yang kuat (minimal 6 karakter)</p>
            <p>4. Setujui syarat dan ketentuan yang berlaku</p>
          </div>
        </div>

        {/* Register Form */}
        <div className="card animate-fade-in" style={{ animationDelay: '200ms' }}>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {error && (
              <div className="notification error animate-fade-in">
                <AlertCircle className="w-4 h-4 mr-2" />
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            <div className="form-section">
              <h3>🌿 Data Pribadi</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-emerald-800 mb-2 required-field">
                    Nama Lengkap
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field focus-ring"
                    placeholder="Masukkan nama lengkap"
                    disabled={isLoading}
                    aria-describedby="name-help"
                  />
                  <p id="name-help" className="text-xs text-emerald-600 mt-1">Masukkan nama lengkap sesuai dengan dokumen resmi</p>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-emerald-800 mb-2 required-field">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field focus-ring"
                    placeholder="nama@email.com"
                    disabled={isLoading}
                    aria-describedby="email-help"
                  />
                  <p id="email-help" className="text-xs text-emerald-600 mt-1">Gunakan email aktif yang dapat Anda akses untuk verifikasi</p>
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-semibold text-emerald-800 mb-2 required-field">
                    Jenis Pendaftaran
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="input-field focus-ring"
                    disabled={isLoading}
                    aria-describedby="role-help"
                  >
                    <option value="applicant">🌱 Calon Mahasiswa Baru</option>
                    <option value="student">🎓 Mahasiswa Aktif</option>
                  </select>
                  <p id="role-help" className="text-xs text-emerald-600 mt-1">Pilih sesuai status Anda saat ini</p>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>🔐 Keamanan Akun</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-emerald-800 mb-2 required-field">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      className="input-field pr-10 sm:pr-12 focus-ring"
                      placeholder="Minimal 6 karakter"
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
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-full h-2 rounded-full bg-${passwordStrength.color}-200`}>
                          <div 
                            className={`h-2 rounded-full bg-${passwordStrength.color}-500 transition-all duration-300`}
                            style={{ width: passwordStrength.strength === 'weak' ? '33%' : passwordStrength.strength === 'medium' ? '66%' : '100%' }}
                          ></div>
                        </div>
                        <span className={`text-xs font-medium text-${passwordStrength.color}-600`}>
                          {passwordStrength.text}
                        </span>
                      </div>
                    </div>
                  )}
                  <p id="password-help" className="text-xs text-emerald-600 mt-1">Gunakan kombinasi huruf, angka, dan simbol untuk keamanan</p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-emerald-800 mb-2 required-field">
                    Konfirmasi Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="input-field pr-10 sm:pr-12 focus-ring"
                      placeholder="Ulangi password"
                      disabled={isLoading}
                      aria-describedby="confirm-password-help"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-500 hover:text-emerald-700 transition-colors"
                      disabled={isLoading}
                      aria-label={showConfirmPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-red-600 mt-1">Password tidak cocok</p>
                  )}
                  <p id="confirm-password-help" className="text-xs text-emerald-600 mt-1">Masukkan ulang password yang sama dengan di atas</p>
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                className="mt-1 rounded border-emerald-300 text-emerald-500 focus:ring-emerald-200"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                required
                aria-describedby="terms-help"
              />
              <label className="ml-3 text-sm text-emerald-700 font-medium">
                Saya setuju dengan{' '}
                <Link to="/terms" className="text-emerald-600 hover:text-emerald-700 transition-colors font-semibold">
                  Syarat & Ketentuan
                </Link>{' '}
                dan{' '}
                <Link to="/privacy" className="text-emerald-600 hover:text-emerald-700 transition-colors font-semibold">
                  Kebijakan Privasi
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading || !agreedToTerms}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <>
                  <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                  Buat Akun
                </>
              )}
            </button>
          </form>

          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-sm sm:text-base text-emerald-700 font-medium">
              Sudah punya akun?{' '}
              <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors">
                Masuk sekarang
              </Link>
            </p>
          </div>

          {/* Info Box */}
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Sprout className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
              <p className="text-xs sm:text-sm font-semibold text-emerald-800">🌱 Mengapa bergabung dengan Instiper Yogyakarta?</p>
            </div>
            <ul className="text-xs text-emerald-700 space-y-1">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-emerald-500" />
                Akses 24/7 ke semua layanan akademik
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-emerald-500" />
                Pembayaran digital yang aman dan mudah
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-emerald-500" />
                Notifikasi real-time untuk semua update
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-emerald-500" />
                Interface modern dan user-friendly
              </li>
            </ul>
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