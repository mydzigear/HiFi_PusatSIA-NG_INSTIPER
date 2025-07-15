import { SidebarProvider, SidebarInset, SidebarTrigger } from '../ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { Search, Bell, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <AppSidebar />
        <SidebarInset>
          {/* Header */}
          <header className="flex h-14 sm:h-16 lg:h-18 shrink-0 items-center gap-2 border-b border-border/40 px-3 sm:px-4 lg:px-6 bg-white backdrop-blur-xl">
            <SidebarTrigger className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
            <div className="h-4 sm:h-6 w-px bg-border/40 mx-1 sm:mx-2" />
            
            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex flex-1 max-w-md lg:max-w-lg">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 lg:pl-12 pr-4 py-2 lg:py-3 w-full border border-border rounded-lg lg:rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-sm lg:text-base font-medium"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="ml-auto flex items-center gap-1 sm:gap-2 lg:gap-3">
              {/* Mobile Search */}
              <button className="md:hidden p-1.5 sm:p-2 lg:p-3 rounded-lg hover:bg-muted transition-colors">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
              </button>

              {/* Notifications */}
              <div className="relative">
                <button className="relative p-1.5 sm:p-2 lg:p-3 rounded-lg hover:bg-muted transition-colors">
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex items-center justify-center font-medium text-[10px] sm:text-xs lg:text-sm">
                    3
                  </span>
                </button>
              </div>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 sm:gap-2 lg:gap-3 p-1 sm:p-1.5 lg:p-2 rounded-lg hover:bg-muted transition-colors">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs sm:text-sm lg:text-base font-semibold">
                        {user?.name?.charAt(0).toUpperCase() || 'A'}
                      </span>
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-xs sm:text-sm lg:text-base font-medium text-foreground truncate max-w-20 sm:max-w-32 lg:max-w-40 leading-tight">
                        {user?.name || 'Admin User'}
                      </p>
                      <p className="text-xs lg:text-sm text-muted-foreground capitalize leading-tight">
                        {user?.role || 'Admin'}
                      </p>
                    </div>
                    <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 lg:w-64 bg-white border border-border shadow-lg z-50" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm lg:text-base font-medium leading-none">
                        {user?.name || 'Admin User'}
                      </p>
                      <p className="text-xs lg:text-sm leading-none text-muted-foreground">
                        {user?.email || 'admin@instiper.ac.id'}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-sm lg:text-base">
                    <User className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
                    <span>View Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-sm lg:text-base">
                    <Settings className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleLogout} 
                    className="text-red-600 focus:text-red-600 text-sm lg:text-base"
                  >
                    <LogOut className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-auto p-3 sm:p-4 lg:p-6 xl:p-8">
            <div className="max-w-full">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}