
import { useState } from 'react';
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
  RefreshCw,
  Clock,
  DollarSign,
  Building,
  ChevronRight,
  Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '../ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';

interface MenuItem {
  icon: any;
  label: string;
  path: string;
  submenu?: { label: string; path: string; description?: string }[];
}

export function AppSidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const { state } = useSidebar();
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
                description: ''
              },
              { 
                label: 'Peminatan', 
                path: '/admin/specializations',
                description: ''
              },
              { 
                label: 'Periode Akademik', 
                path: '/admin/academic-periods',
                description: ''
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
                description: ''
              },
              { 
                label: 'Mata Kuliah', 
                path: '/admin/courses',
                description: ''
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
                description: ''
              },
              { 
                label: 'Informasi', 
                path: '/admin/information',
                description: ''
              },
              { 
                label: 'Agenda', 
                path: '/admin/agenda',
                description: ''
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
                description: 'Konfigurasi metode pembayaran'
              },
              { 
                label: 'Billing Engine', 
                path: '/admin/billing',
                description: 'Generate tagihan massal'
              },
              { 
                label: 'Setting Tarif (JIKA...MAKA)', 
                path: '/admin/tariff-settings',
                description: 'Aturan tarif dengan kondisi'
              },
              { 
                label: 'Setting Dispensasi (JIKA...MAKA)', 
                path: '/admin/dispensation-settings',
                description: 'Aturan keringanan pembayaran'
              },
              { 
                label: 'Generate Tagihan', 
                path: '/admin/bill-generation',
                description: 'Eksekusi aturan untuk buat tagihan'
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
            label: 'Laporan', 
            path: '/admin/reports' 
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
    <Sidebar collapsible="icon" className="border-r border-border/40 bg-white [&[data-mobile=true]]:bg-white">
      <SidebarHeader className="border-b border-border/40 p-2 sm:p-3 lg:p-4 bg-white">
        <div className="flex items-center gap-2 px-1 sm:px-2">
          <img
            src="https://home.instiperjogja.ac.id/assets/images/instiper.png"
            alt="INSTIPER Logo"
            className="h-6 w-6 sm:h-8 sm:w-8 object-contain flex-shrink-0"
          />
          {state === "expanded" && (
            <div className="min-w-0 flex-1">
              <h1 className="font-bold text-emerald-900 text-sm sm:text-base lg:text-lg xl:text-xl truncate leading-tight">
                INSTIPER
              </h1>
              <p className="text-xs sm:text-sm lg:text-base text-emerald-600 truncate leading-tight">
                BackOffice SIA
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs sm:text-sm lg:text-base font-medium text-foreground px-2 py-1">
            Menu Utama
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveLink(item.path);
                const isParentActive = isActiveParent(item);
                const isExpanded = expandedMenus.includes(item.path);
                const hasSubmenu = item.submenu && item.submenu.length > 0;
                
                return (
                  <SidebarMenuItem key={item.path}>
                    {hasSubmenu ? (
                      <Collapsible
                        open={isExpanded}
                        onOpenChange={() => toggleSubmenu(item.path)}
                      >
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            isActive={isParentActive}
                            tooltip={item.label}
                            className="w-full justify-start text-sm lg:text-base font-medium hover:bg-muted hover:text-foreground data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:font-semibold transition-all duration-200 min-h-10 lg:min-h-12"
                          >
                            <Icon className="h-4 w-4 lg:h-5 lg:w-5 flex-shrink-0" />
                            <span className="text-xs sm:text-sm lg:text-base font-medium truncate leading-tight">
                              {item.label}
                            </span>
                            {state === "expanded" && (
                              <ChevronRight className={`ml-auto h-4 w-4 lg:h-5 lg:w-5 flex-shrink-0 transition-transform duration-200 ${
                                isExpanded ? 'rotate-90' : ''
                              }`} />
                            )}
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.submenu?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.path}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={isActiveLink(subItem.path)}
                                  className="text-xs sm:text-sm lg:text-base hover:bg-muted hover:text-foreground data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:font-semibold transition-all duration-200 min-h-8 lg:min-h-10"
                                >
                                  <Link to={subItem.path}>
                                    <div className="min-w-0 flex-1">
                                      <div className="font-medium text-xs sm:text-sm lg:text-base truncate leading-tight">
                                        {subItem.label}
                                      </div>
                                      {subItem.description && state === "expanded" && (
                                        <div className="text-xs lg:text-sm text-muted-foreground mt-0.5 line-clamp-2 leading-tight opacity-80">
                                          {subItem.description}
                                        </div>
                                      )}
                                    </div>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton 
                        asChild 
                        isActive={isActive} 
                        tooltip={item.label} 
                        className="text-sm lg:text-base font-medium hover:bg-muted hover:text-foreground data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:font-semibold transition-all duration-200 min-h-10 lg:min-h-12"
                      >
                        <Link to={item.path}>
                          <Icon className="h-4 w-4 lg:h-5 lg:w-5 flex-shrink-0" />
                          <span className="text-xs sm:text-sm lg:text-base font-medium truncate leading-tight">
                            {item.label}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
