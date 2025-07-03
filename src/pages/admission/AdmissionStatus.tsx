import React, { useState } from 'react';
import { CheckCircle, Clock, AlertCircle, FileText, CreditCard, User, Download, Calendar, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Applicant } from '../../types';

export function AdmissionStatus() {
  const { user } = useAuth();
  const applicant = user as Applicant;
  const [selectedTab, setSelectedTab] = useState<'status' | 'documents' | 'timeline'>('status');

  // Mock status data
  const statusData = {
    applicationId: 'APP2024001',
    currentStatus: 'verified', // submitted, verified, accepted, rejected
    submissionDate: '2024-01-15',
    verificationDate: '2024-01-20',
    announcementDate: '2024-02-01',
    registrationDeadline: '2024-02-15',
    steps: [
      {
        id: 1,
        title: 'Formulir Pendaftaran',
        description: 'Pengisian data pribadi dan akademik',
        status: 'completed',
        completedDate: '2024-01-15'
      },
      {
        id: 2,
        title: 'Pembayaran Pendaftaran',
        description: 'Pembayaran biaya pendaftaran Rp 200.000',
        status: 'completed',
        completedDate: '2024-01-15'
      },
      {
        id: 3,
        title: 'Verifikasi Berkas',
        description: 'Verifikasi dokumen dan kelengkapan data',
        status: 'completed',
        completedDate: '2024-01-20'
      },
      {
        id: 4,
        title: 'Pengumuman Kelulusan',
        description: 'Hasil seleksi penerimaan mahasiswa baru',
        status: 'current',
        completedDate: null
      },
      {
        id: 5,
        title: 'Registrasi Ulang',
        description: 'Daftar ulang dan pembayaran herregistrasi',
        status: 'pending',
        completedDate: null
      }
    ]
  };

  const documents = [
    { name: 'Pas Foto 3x4', status: 'verified', uploadDate: '2024-01-15', note: 'Dokumen sesuai persyaratan' },
    { name: 'Scan Ijazah/SKL', status: 'verified', uploadDate: '2024-01-15', note: 'Dokumen sesuai persyaratan' },
    { name: 'Scan KTP', status: 'verified', uploadDate: '2024-01-15', note: 'Dokumen sesuai persyaratan' },
    { name: 'Scan Kartu Keluarga', status: 'verified', uploadDate: '2024-01-15', note: 'Dokumen sesuai persyaratan' },
  ];

  const timeline = [
    {
      date: '2024-01-15',
      time: '10:30',
      title: 'Formulir Pendaftaran Diserahkan',
      description: 'Formulir pendaftaran telah berhasil diserahkan dan data tersimpan dalam sistem.',
      type: 'success'
    },
    {
      date: '2024-01-15',
      time: '11:45',
      title: 'Pembayaran Berhasil',
      description: 'Pembayaran biaya pendaftaran sebesar Rp 200.000 telah berhasil dikonfirmasi.',
      type: 'success'
    },
    {
      date: '2024-01-18',
      time: '09:15',
      title: 'Verifikasi Dokumen Dimulai',
      description: 'Tim verifikasi mulai memeriksa kelengkapan dan keaslian dokumen.',
      type: 'info'
    },
    {
      date: '2024-01-20',
      time: '14:20',
      title: 'Verifikasi Dokumen Selesai',
      description: 'Semua dokumen telah diverifikasi dan dinyatakan lengkap serta sesuai persyaratan.',
      type: 'success'
    },
    {
      date: '2024-01-25',
      time: '16:00',
      title: 'Proses Seleksi',
      description: 'Berkas Anda sedang dalam tahap penilaian oleh tim seleksi.',
      type: 'info'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'current':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-gray-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'current':
        return 'bg-orange-100 text-orange-800';
      case 'pending':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'info':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Status Pendaftaran</h1>
              <p className="text-gray-600">Pantau perkembangan pendaftaran Anda secara real-time</p>
            </div>
            <img
              src="https://www.home.instiperjogja.ac.id/assets/images/logo-instiper(2).png"
              alt="INSTIPER Logo"
              className="w-12 h-12 object-contain"
            />
          </div>

          {/* Application Info */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-primary-50 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <User className="w-8 h-8 text-primary-600" />
                <div>
                  <p className="text-sm text-primary-600">Nama Pendaftar</p>
                  <p className="font-semibold text-primary-800">{applicant?.name}</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-green-600">ID Pendaftaran</p>
                  <p className="font-semibold text-green-800">{statusData.applicationId}</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-sm text-orange-600">Tanggal Daftar</p>
                  <p className="font-semibold text-orange-800">{formatDate(statusData.submissionDate)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setSelectedTab('status')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === 'status'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Status Pendaftaran
              </button>
              <button
                onClick={() => setSelectedTab('documents')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === 'documents'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Status Dokumen
              </button>
              <button
                onClick={() => setSelectedTab('timeline')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === 'timeline'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Timeline
              </button>
            </nav>
          </div>

          <div className="p-6">
            {selectedTab === 'status' && (
              <div className="space-y-6">
                {/* Progress Steps */}
                <div className="space-y-4">
                  {statusData.steps.map((step, index) => (
                    <div key={step.id} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                          step.status === 'completed' 
                            ? 'bg-green-500 text-white' 
                            : step.status === 'current'
                              ? 'bg-orange-500 text-white'
                              : 'bg-gray-200 text-gray-500'
                        }`}>
                          {step.status === 'completed' ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <span className="text-sm font-semibold">{step.id}</span>
                          )}
                        </div>
                        {index < statusData.steps.length - 1 && (
                          <div className={`w-0.5 h-16 mt-2 ${
                            step.status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                          }`} />
                        )}
                      </div>

                      <div className="flex-1 pb-8">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className={`font-semibold ${
                            step.status === 'completed' 
                              ? 'text-green-700' 
                              : step.status === 'current'
                                ? 'text-orange-700'
                                : 'text-gray-500'
                          }`}>
                            {step.title}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(step.status)}`}>
                            {step.status === 'completed' ? 'Selesai' : 
                             step.status === 'current' ? 'Sedang Proses' : 'Menunggu'}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{step.description}</p>
                        {step.completedDate && (
                          <p className="text-xs text-gray-500">
                            Selesai pada: {formatDate(step.completedDate)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Current Status Alert */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-blue-600" />
                    <div>
                      <h4 className="font-medium text-blue-800">Status Terkini</h4>
                      <p className="text-blue-700 text-sm">
                        Berkas Anda sedang dalam tahap penilaian oleh tim seleksi. 
                        Pengumuman hasil seleksi akan diumumkan pada tanggal {formatDate(statusData.announcementDate)}.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'documents' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Verifikasi Dokumen</h3>
                
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <h4 className="font-medium text-gray-900">{doc.name}</h4>
                        <p className="text-sm text-gray-600">Upload: {formatDate(doc.uploadDate)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        Terverifikasi
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{doc.note}</p>
                    </div>
                  </div>
                ))}

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                  <div className="flex items-center gap-3">
                    <Award className="w-6 h-6 text-green-600" />
                    <div>
                      <h4 className="font-medium text-green-800">Verifikasi Dokumen Selesai</h4>
                      <p className="text-green-700 text-sm">
                        Semua dokumen telah diverifikasi dan dinyatakan lengkap serta sesuai persyaratan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'timeline' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline Pendaftaran</h3>
                
                <div className="space-y-4">
                  {timeline.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-white border-2 border-gray-200 rounded-full">
                          {getTimelineIcon(item.type)}
                        </div>
                        {index < timeline.length - 1 && (
                          <div className="w-0.5 h-16 bg-gray-200 mt-2" />
                        )}
                      </div>
                      
                      <div className="flex-1 pb-8">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-gray-500">{formatDate(item.date)}</span>
                          <span className="text-sm text-gray-400">•</span>
                          <span className="text-sm text-gray-500">{item.time}</span>
                        </div>
                        <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-outline flex items-center gap-2">
              <Download className="w-4 h-4" />
              Unduh Bukti Pendaftaran
            </button>
            <button className="btn-secondary">
              Kembali ke Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}