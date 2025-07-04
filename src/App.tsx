import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { DashboardLayout } from './components/Layout/DashboardLayout';

// Pages
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { KRS } from './pages/student/KRS';
import { Finance } from './pages/student/Finance';
import { Herregistration } from './pages/student/Herregistration';
import { AcademicHistory } from './pages/student/AcademicHistory';
import { Schedule } from './pages/student/Schedule';

// Admin Pages
import { AdmissionDashboard } from './pages/admission/AdmissionDashboard';
import { AdmissionForm } from './pages/admission/AdmissionForm';
import { AdmissionPayment } from './pages/admission/AdmissionPayment';
import { AdmissionStatus } from './pages/admission/AdmissionStatus';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UserManagement } from './pages/admin/UserManagement';
import { PaymentSettings } from './pages/admin/PaymentSettings';
import { BillingEngine } from './pages/admin/BillingEngine';
import { Reports } from './pages/admin/Reports';
import { StudentPaymentReport } from './pages/admin/StudentPaymentReport';

// New Admin Pages
import { StudyProgramManagement } from './pages/admin/StudyProgramManagement';
import { SpecializationManagement } from './pages/admin/SpecializationManagement';
import { AcademicPeriodManagement } from './pages/admin/AcademicPeriodManagement';
import { StudentManagement } from './pages/admin/StudentManagement';
import { CourseManagement } from './pages/admin/CourseManagement';

// Content Management Pages
import { AnnouncementManagement } from './pages/admin/AnnouncementManagement';
import { InformationManagement } from './pages/admin/InformationManagement';
import { AgendaManagement } from './pages/admin/AgendaManagement';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

// Dashboard Router Component
function DashboardRouter() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Route based on user role
  switch (user.role) {
    case 'admin':
      return <Navigate to="/admin" replace />;
    case 'student':
      return <Navigate to="/student" replace />;
    case 'applicant':
      return <Navigate to="/admission" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={!user ? <Landing /> : <Navigate to="/dashboard" replace />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" replace />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" replace />} />

      {/* Dashboard Router */}
      <Route path="/dashboard" element={<DashboardRouter />} />

      {/* Student Routes */}
      <Route path="/student" element={
        <ProtectedRoute>
          <DashboardLayout>
            <StudentDashboard />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/krs" element={
        <ProtectedRoute>
          <DashboardLayout>
            <KRS />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/finance" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Finance />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/herregistration" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Herregistration />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/academic" element={
        <ProtectedRoute>
          <DashboardLayout>
            <AcademicHistory />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/schedule" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Schedule />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/settings" element={
        <ProtectedRoute>
          <DashboardLayout>
            <div className="animate-fade-in">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Pengaturan</h1>
              <div className="card">
                <p className="text-gray-600">Halaman pengaturan sedang dalam pengembangan.</p>
              </div>
            </div>
          </DashboardLayout>
        </ProtectedRoute>
      } />

      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute>
          <DashboardLayout>
            <AdminDashboard />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      {/* Admin - Referensi Akademik */}
      <Route path="/admin/study-programs" element={
        <ProtectedRoute>
          <DashboardLayout>
            <StudyProgramManagement />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/specializations" element={
        <ProtectedRoute>
          <DashboardLayout>
            <SpecializationManagement />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/academic-periods" element={
        <ProtectedRoute>
          <DashboardLayout>
            <AcademicPeriodManagement />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      {/* Admin - Akademik */}
      <Route path="/admin/students" element={
        <ProtectedRoute>
          <DashboardLayout>
            <StudentManagement />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/courses" element={
        <ProtectedRoute>
          <DashboardLayout>
            <CourseManagement />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      {/* Admin - Content Management */}
      <Route path="/admin/announcements" element={
        <ProtectedRoute>
          <DashboardLayout>
            <AnnouncementManagement />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/information" element={
        <ProtectedRoute>
          <DashboardLayout>
            <InformationManagement />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/agenda" element={
        <ProtectedRoute>
          <DashboardLayout>
            <AgendaManagement />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      {/* Admin - Other Routes */}
      <Route path="/admin/users" element={
        <ProtectedRoute>
          <DashboardLayout>
            <UserManagement />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/payment-settings" element={
        <ProtectedRoute>
          <DashboardLayout>
            <PaymentSettings />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/billing" element={
        <ProtectedRoute>
          <DashboardLayout>
            <BillingEngine />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/reports" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Reports />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/student-payment-report" element={
        <ProtectedRoute>
          <DashboardLayout>
            <StudentPaymentReport />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/*" element={
        <ProtectedRoute>
          <DashboardLayout>
            <div className="animate-fade-in">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Halaman Admin</h1>
              <div className="card">
                <p className="text-gray-600">Halaman admin lainnya sedang dalam pengembangan.</p>
              </div>
            </div>
          </DashboardLayout>
        </ProtectedRoute>
      } />

      {/* Admission Routes */}
      <Route path="/admission" element={
        <ProtectedRoute>
          <DashboardLayout>
            <AdmissionDashboard />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/admission/form" element={
        <ProtectedRoute>
          <AdmissionForm />
        </ProtectedRoute>
      } />
      <Route path="/admission/payment" element={
        <ProtectedRoute>
          <AdmissionPayment />
        </ProtectedRoute>
      } />
      <Route path="/admission/status" element={
        <ProtectedRoute>
          <DashboardLayout>
            <AdmissionStatus />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/admission/*" element={
        <ProtectedRoute>
          <DashboardLayout>
            <div className="animate-fade-in">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Portal Admisi</h1>
              <div className="card">
                <p className="text-gray-600">Halaman admisi lainnya sedang dalam pengembangan.</p>
              </div>
            </div>
          </DashboardLayout>
        </ProtectedRoute>
      } />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <AppRoutes />
          </div>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;