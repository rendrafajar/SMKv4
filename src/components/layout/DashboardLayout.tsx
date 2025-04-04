import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  Users,
  BookOpen,
  Home,
  Calendar,
  Clock,
  FileSpreadsheet,
  Settings,
  ChevronDown,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  Database,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title = "Dashboard",
}) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    {
      icon: LayoutGrid,
      label: "Manajemen Data",
      href: "#",
      subItems: [
        { label: "Kurikulum", href: "/kurikulum" },
        { label: "Guru", href: "/guru" },
        { label: "Kelas", href: "/kelas" },
        { label: "Jurusan", href: "/jurusan" },
        { label: "Ruangan", href: "/ruangan" },
        { label: "Slot Waktu", href: "/slot-waktu" },
      ],
    },
    { icon: Calendar, label: "Penjadwalan", href: "/penjadwalan" },
    { icon: Clock, label: "Visualisasi Jadwal", href: "/visualisasi" },
    { icon: FileSpreadsheet, label: "Laporan", href: "/laporan" },
    { icon: Users, label: "Manajemen Pengguna", href: "/pengguna" },
    { icon: Settings, label: "Pengaturan", href: "/pengaturan" },
    { icon: Database, label: "Database", href: "/database" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">SMK Scheduler</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 overflow-y-auto p-2">
            <ul className="space-y-1">
              {navItems.map((item, index) => (
                <li key={index}>
                  {item.subItems ? (
                    <div className="space-y-1">
                      <Button
                        variant="ghost"
                        className="w-full justify-between text-left font-normal"
                      >
                        <div className="flex items-center">
                          <item.icon className="mr-2 h-5 w-5" />
                          <span>{item.label}</span>
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                      <ul className="pl-8 space-y-1">
                        {item.subItems.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <div
                              className="block py-2 px-3 text-sm rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer"
                              onClick={() => navigate(subItem.href)}
                            >
                              {subItem.label}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left font-normal"
                      onClick={() => navigate(item.href)}
                    >
                      <item.icon className="mr-2 h-5 w-5" />
                      <span>{item.label}</span>
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                  alt="Avatar"
                />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">
                  admin@smkscheduler.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar - Now moved to the header section */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center space-x-2">
            <Sheet
              open={isMobileSidebarOpen}
              onOpenChange={setIsMobileSidebarOpen}
            >
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <div
                      className="flex items-center space-x-2 cursor-pointer"
                      onClick={() => {
                        navigate("/");
                        setIsMobileSidebarOpen(false);
                      }}
                    >
                      <BookOpen className="h-6 w-6 text-primary" />
                      <span className="font-bold text-lg">SMK Scheduler</span>
                    </div>
                  </div>

                  <nav className="flex-1 overflow-y-auto p-2">
                    <ul className="space-y-1">
                      {navItems.map((item, index) => (
                        <li key={index}>
                          {item.subItems ? (
                            <div className="space-y-1">
                              <Button
                                variant="ghost"
                                className="w-full justify-between text-left font-normal"
                              >
                                <div className="flex items-center">
                                  <item.icon className="mr-2 h-5 w-5" />
                                  <span>{item.label}</span>
                                </div>
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                              <ul className="pl-8 space-y-1">
                                {item.subItems.map((subItem, subIndex) => (
                                  <li key={subIndex}>
                                    <div
                                      className="block py-2 px-3 text-sm rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer"
                                      onClick={() => {
                                        setIsMobileSidebarOpen(false);
                                        navigate(subItem.href);
                                      }}
                                    >
                                      {subItem.label}
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-left font-normal"
                              onClick={() => {
                                setIsMobileSidebarOpen(false);
                                navigate(item.href);
                              }}
                            >
                              <item.icon className="mr-2 h-5 w-5" />
                              <span>{item.label}</span>
                            </Button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </nav>

                  <div className="p-4 border-t border-border">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                          alt="Avatar"
                        />
                        <AvatarFallback>AD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Admin User</p>
                        <p className="text-xs text-muted-foreground">
                          admin@smkscheduler.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex"
              onClick={toggleSidebar}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">{title}</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari..."
                className="w-64 pl-8 bg-background"
              />
            </div>

            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                      alt="Avatar"
                    />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  Profil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/pengaturan")}>
                  Pengaturan
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Keluar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-background">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-border p-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} SMK Scheduler - Sistem Penjadwalan
          Otomatis dengan Algoritma Genetika
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
