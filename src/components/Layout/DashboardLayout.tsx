import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ParticleBackground } from '../ParticleBackground';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="min-h-screen relative modern-bg">
      <ParticleBackground />
      
      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          !isMobile ? 'lg:ml-72 xl:ml-96' : ''
        }`}>
          {/* Header */}
          <Header 
            onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
            showMenuToggle={isMobile}
          />

          {/* Page Content */}
          <main className="flex-1 w-full overflow-x-hidden">
            <div className="w-full h-full p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12">
              <div className="page-transition w-full max-w-none">
                {children}
              </div>
            </div>
          </main>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && isMobile && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-filter backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}