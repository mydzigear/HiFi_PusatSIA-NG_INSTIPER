import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, CreditCard, CheckCircle, Clock, AlertCircle, User, Upload, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Applicant } from '../../types';

export function AdmissionDashboard() {
  const { user } = useAuth();
  const applicant = user as Applicant;

  const steps = [
    { id: 1, name: 'Lengkapi Biodata', status: 'completed', icon: User },
    { id: 2, name: 'Data Orang Tua', status: 'completed', icon: User },
    { id: 3, name: 'Upload Dokumen', status: 'current', icon: Upload },
    { id: 4, name: 'Pembayaran', status: 'pending', icon: CreditCard },
    { id: 5, name: 'Verifikasi', status: 'pending', icon: CheckCircle },
  ];

  const requirements = [
    { name: 'Ijazah/SKL', status: 'uploaded', required: true },
    { name: 'Foto 3x4', status: 'uploaded', required: true },
    { name: 'KTP', status: 'pending', required: true },
    { name: 'Kartu Keluarga', status: 'pending', required: true },
    { name: 'Surat Keterangan Sehat', status: 'pending', required: false },
  ];

  const getStepStatus = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white';
      case 'current':
        return 'bg-primary-500 text-white';
      default:
        return 'bg-gray-200 text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploaded':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'rejected':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Selamat Datang, {applicant?.name}!</h1>
            <p className="text-primary-100 text-lg">
              {applicant?.applicationId ? `ID Pendaftaran: ${applicant.applicationId}` : 'Mari lengkapi pendaftaran Anda'}
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <div className="bg-white/20 rounded-lg p-4">
              <p className="text-primary-100 text-sm">Progress Pendaftaran</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="bg-white/20 rounded-full h-2 flex-1">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-300"
                    style={{ width: `${applicant?.progress || 0}%` }}
                  ></div>
                </div>
                <span className="text-xl font-bold">{applicant?.progress || 0}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Langkah Pendaftaran</h2>
        
        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStepStatus(step.status)}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className={`font-medium ${step.status === 'completed' ? 'text-green-700' : step.status === 'current' ? 'text-primary-700' : 'text-gray-500'}`}>
                    {step.name}
                  </h3>
                </div>
                {step.status === 'completed' && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {step.status === 'current' && (
                  <Link to="/admission/form" className="btn-primary text-sm px-4 py-2">
                    Lanjutkan
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Document Requirements */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary-500" />
              Dokumen Persyaratan
            </h2>
            <Link to="/admission/documents" className="text-primary-500 hover:text-primary-600 text-sm font-medium">
              Kelola Dokumen
            </Link>
          </div>

          <div className="space-y-3">
            {requirements.map((req, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(req.status)}
                  <span className="font-medium text-gray-900">{req.name}</span>
                  {req.required && (
                    <span className="text-red-500 text-xs">*</span>
                  )}
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  req.status === 'uploaded' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {req.status === 'uploaded' ? 'Uploaded' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Important Information */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary-500" />
            Informasi Penting
          </h2>

          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <h3 className="font-semibold text-blue-800 mb-1">Jadwal Pendaftaran</h3>
              <p className="text-blue-700 text-sm">Gelombang 1: 1 Januari - 31 Maret 2024</p>
              <p className="text-blue-700 text-sm">Gelombang 2: 1 April - 30 Juni 2024</p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
              <h3 className="font-semibold text-green-800 mb-1">Biaya Pendaftaran</h3>
              <p className="text-green-700 text-sm">Rp 200.000 (Online)</p>
              <p className="text-green-700 text-sm">Rp 250.000 (Offline)</p>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
              <h3 className="font-semibold text-orange-800 mb-1">Pengumuman</h3>
              <p className="text-orange-700 text-sm">Hasil seleksi akan diumumkan 2 minggu setelah penutupan pendaftaran</p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
              <h3 className="font-semibold text-purple-800 mb-1">Kontak</h3>
              <p className="text-purple-700 text-sm">WhatsApp: +62 274 123456</p>
              <p className="text-purple-700 text-sm">Email: admisi@instiper.ac.id</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Aksi Cepat</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/admission/form" className="flex flex-col items-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors group">
            <FileText className="w-8 h-8 text-primary-600 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-primary-800">Lengkapi Data</span>
          </Link>

          <Link to="/admission/documents" className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group">
            <Upload className="w-8 h-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-green-800">Upload Dokumen</span>
          </Link>

          <Link to="/admission/payment" className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors group">
            <CreditCard className="w-8 h-8 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-orange-800">Pembayaran</span>
          </Link>

          <Link to="/admission/status" className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group">
            <CheckCircle className="w-8 h-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-purple-800">Cek Status</span>
          </Link>
        </div>
      </div>
    </div>
  );
}