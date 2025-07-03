import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Upload, Check, User, GraduationCap, Users, MapPin, FileText, Sparkles, Calendar, Phone, Mail, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface FormData {
  // Metode Pendaftaran
  registrationMethod: string;
  
  // Pilihan Program Studi
  firstChoice: string;
  secondChoice: string;
  
  // Identitas Diri
  fullName: string;
  gender: string;
  nationality: string;
  birthPlace: string;
  birthDate: string;
  address: string;
  
  // Informasi Akun & Kontak
  schoolOrigin: string;
  schoolCountry: string;
  schoolCity: string;
  email: string;
  phone: string;
  whatsapp: string;
  
  // Documents
  photo: File | null;
}

export function AdmissionForm() {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    registrationMethod: 'REGULER',
    firstChoice: '',
    secondChoice: '',
    fullName: '',
    gender: '',
    nationality: 'Indonesia',
    birthPlace: '',
    birthDate: '',
    address: '',
    schoolOrigin: '',
    schoolCountry: 'Indonesia',
    schoolCity: '',
    email: user?.email || '',
    phone: '',
    whatsapp: '',
    photo: null,
  });

  const steps = [
    { id: 1, name: 'Metode Pendaftaran', icon: User, color: 'from-green-500 to-emerald-600' },
    { id: 2, name: 'Pilihan Program Studi', icon: GraduationCap, color: 'from-blue-500 to-indigo-600' },
    { id: 3, name: 'Identitas Diri', icon: Users, color: 'from-purple-500 to-pink-600' },
    { id: 4, name: 'Informasi Akun & Kontak', icon: MapPin, color: 'from-orange-500 to-red-600' },
  ];

  const studyPrograms = [
    'Agroteknologi',
    'Teknologi Pangan',
    'Agribisnis',
    'Peternakan',
    'Kehutanan',
    'Teknik Pertanian',
    'Ilmu Tanah',
    'Proteksi Tanaman'
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: keyof FormData, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Redirect to payment page
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Selamat Datang!</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pilih Metode Pendaftaran</h3>
              <p className="text-gray-600">Pilih jalur pendaftaran yang sesuai dengan kondisi Anda</p>
            </div>
            
            <div className="grid gap-4">
              <div 
                className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                  formData.registrationMethod === 'REGULER' 
                    ? 'border-green-500 bg-green-50 shadow-lg' 
                    : 'border-gray-200 hover:border-green-300'
                }`}
                onClick={() => handleInputChange('registrationMethod', 'REGULER')}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">REGULER</h4>
                    <p className="text-sm text-gray-600">Jalur pendaftaran umum untuk semua calon mahasiswa</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 ${
                    formData.registrationMethod === 'REGULER' 
                      ? 'border-green-500 bg-green-500' 
                      : 'border-gray-300'
                  }`}>
                    {formData.registrationMethod === 'REGULER' && (
                      <Check className="w-4 h-4 text-white m-0.5" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h4 className="font-medium text-blue-800 mb-2">📋 Informasi Penting</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Pendaftaran GELOMBANG 2 tahun 2025/2026</li>
                <li>• Silahkan lengkapi formulir pendaftaran dengan benar</li>
                <li>• Kemudian Anda bisa melakukan Tes Masuk Online</li>
              </ul>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Step 2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pilih Program Studi</h3>
              <p className="text-gray-600">Pilih program studi yang sesuai dengan minat dan bakat Anda</p>
            </div>
            
            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  Pilihan Pertama *
                </label>
                <select
                  className="input-field text-base"
                  value={formData.firstChoice}
                  onChange={(e) => handleInputChange('firstChoice', e.target.value)}
                  required
                >
                  <option value="">Fakultas - Program Studi - Minat</option>
                  {studyPrograms.map((program) => (
                    <option key={program} value={program}>
                      Fakultas - {program} - Minat
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  Pilihan Kedua
                </label>
                <select
                  className="input-field text-base"
                  value={formData.secondChoice}
                  onChange={(e) => handleInputChange('secondChoice', e.target.value)}
                >
                  <option value="">Fakultas - Program Studi - Minat</option>
                  {studyPrograms
                    .filter(program => program !== formData.firstChoice)
                    .map((program) => (
                      <option key={program} value={program}>
                        Fakultas - {program} - Minat
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <h4 className="font-medium text-orange-800 mb-2">💡 Tips Memilih Program Studi</h4>
              <ul className="text-orange-700 text-sm space-y-1">
                <li>• Pilih sesuai dengan minat dan passion Anda</li>
                <li>• Pertimbangkan prospek karir di masa depan</li>
                <li>• Pilihan kedua sebagai backup jika pilihan pertama tidak memenuhi syarat</li>
              </ul>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full mb-4">
                <User className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Step 3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Identitas Diri</h3>
              <p className="text-gray-600">Lengkapi data pribadi Anda dengan benar</p>
            </div>
            
            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  Nama Lengkap (Sesuai Ijazah) *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    className="input-field pl-10 text-base"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Cth: Aldi Riyanto"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    Jenis Kelamin *
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="Laki-laki"
                        checked={formData.gender === 'Laki-laki'}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-blue-600 font-medium">👨 Laki-laki</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="Perempuan"
                        checked={formData.gender === 'Perempuan'}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-pink-600 font-medium">👩 Perempuan</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    Kewarganegaraan *
                  </label>
                  <select
                    className="input-field text-base"
                    value={formData.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                    required
                  >
                    <option value="Indonesia">🇮🇩 Indonesia</option>
                    <option value="Malaysia">🇲🇾 Malaysia</option>
                    <option value="Singapore">🇸🇬 Singapore</option>
                    <option value="Other">🌍 Lainnya</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    Tempat Lahir *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      className="input-field pl-10 text-base"
                      value={formData.birthPlace}
                      onChange={(e) => handleInputChange('birthPlace', e.target.value)}
                      placeholder="Cth: Sleman"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    Tanggal Lahir *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      className="input-field pl-10 text-base"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  Alamat *
                </label>
                <div className="relative">
                  <Home className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <textarea
                    className="input-field pl-10 text-base"
                    rows={3}
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Cth: Jln. Magelang KM 6, Sleman Yogyakarta"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full mb-4">
                <Phone className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">Final Step</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Informasi Akun & Kontak</h3>
              <p className="text-gray-600">Lengkapi informasi sekolah dan kontak Anda</p>
            </div>
            
            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  Asal Sekolah *
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    className="input-field pl-10 text-base"
                    value={formData.schoolOrigin}
                    onChange={(e) => handleInputChange('schoolOrigin', e.target.value)}
                    placeholder="Cth: SMK N 1 Sleman"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    Negara Sekolah *
                  </label>
                  <select
                    className="input-field text-base"
                    value={formData.schoolCountry}
                    onChange={(e) => handleInputChange('schoolCountry', e.target.value)}
                    required
                  >
                    <option value="Indonesia">🇮🇩 Indonesia</option>
                    <option value="Malaysia">🇲🇾 Malaysia</option>
                    <option value="Singapore">🇸🇬 Singapore</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    Kota Sekolah *
                  </label>
                  <input
                    type="text"
                    className="input-field text-base"
                    value={formData.schoolCity}
                    onChange={(e) => handleInputChange('schoolCity', e.target.value)}
                    placeholder="Select an Item"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    className="input-field pl-10 text-base"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Cth: instiper@gmail.com"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    No. Telepon/Handphone *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      className="input-field pl-10 text-base"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Cth: 081234567890"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    Whatsapp *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      className="input-field pl-10 text-base"
                      value={formData.whatsapp}
                      onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                      placeholder="Cth: 081234567890"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  Mohon hitung 4+4= *
                </label>
                <input
                  type="number"
                  className="input-field text-base"
                  placeholder="Masukkan hasil perhitungan"
                  required
                />
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <h4 className="font-medium text-green-800 mb-2">🎉 Hampir Selesai!</h4>
              <p className="text-green-700 text-sm">
                Setelah menyelesaikan formulir ini, Anda akan dapat melakukan tes masuk online dan melanjutkan proses pendaftaran.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <img
              src="https://home.instiperjogja.ac.id/assets/images/instiper.png"
              alt="INSTIPER Logo"
              className="w-16 h-16 object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">PMB INSTIPER</h1>
              <p className="text-green-600 font-medium">Penerimaan Mahasiswa Baru INSTIPER</p>
            </div>
          </div>
          
          <div className="bg-green-500 text-white p-4 rounded-xl mb-6">
            <h2 className="font-bold mb-2">📢 Pemberitahuan!</h2>
            <p className="text-sm">
              Selamat Datang, Calon Pendaftar Mahasiswa Baru INSTIPER <strong>GELOMBANG 2-2025/2026</strong>
            </p>
            <p className="text-sm mt-1">
              Silahkan Lengkapi Formulir Pendaftaran dibawah ini, Kemudian Anda bisa melakukan Tes Masuk Online.
            </p>
            <div className="mt-3">
              <span className="text-sm">Sudah pernah mendaftar? </span>
              <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium hover:bg-blue-600 transition-colors">
                🔐 Login
              </button>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-green-500 text-white shadow-lg' 
                      : isActive 
                        ? `bg-gradient-to-r ${step.color} text-white shadow-lg scale-110` 
                        : 'bg-gray-200 text-gray-500'
                  }`}>
                    {isCompleted ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`hidden sm:block w-16 h-1 ml-4 rounded-full transition-all duration-300 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Langkah {currentStep} dari {steps.length}: {steps[currentStep - 1]?.name}
            </p>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-6 py-3 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Sebelumnya
            </button>

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 btn-primary px-8 py-3 text-lg"
              >
                Selanjutnya
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
              >
                <Check className="w-5 h-5" />
                Daftar Sekarang
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-600">
          <p>🌐 Simak Instiper: Penerimaan Mahasiswa Baru INSTIPER</p>
          <p className="mt-1">Copyright © 2018 <strong>INSTITUT PERTANIAN STIPER</strong> All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}