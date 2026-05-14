"use client";

import React, { useEffect, useState } from 'react';
import { LayoutDashboard, Ticket, Users, Store, Settings, LogOut, Calendar, User as UserIcon, Menu, X, CalendarDays } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [isAuthorized, setIsAuthorized] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false;
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="h-screen bg-neutral-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const navItems = [
    { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Schedule', icon: CalendarDays, path: '/dashboard/schedule' },
    { name: 'My Events', icon: Calendar, path: '/dashboard/my-events' },
    { name: 'Orders', icon: Ticket, path: '/dashboard/orders' },
    { name: 'Attendees', icon: Users, path: '/dashboard/attendees' },
    { name: 'Booths', icon: Store, path: '/dashboard/booths' },
    { name: 'Vendor Hub', icon: Store, path: '/dashboard/vendor' },
    { name: 'Profile', icon: UserIcon, path: '/dashboard/profile' },
  ];

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-neutral-900 border-r border-white/5">
      <div className="p-8 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
          MVEMS
        </Link>
        <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-neutral-400">
          <X size={24} />
        </button>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.name}
              href={item.path} 
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 font-bold text-sm",
                isActive 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              )}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/5 space-y-2">
        <Link 
          href="/dashboard/settings" 
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center gap-4 px-5 py-3.5 rounded-2xl text-neutral-400 hover:text-white hover:bg-white/5 transition-all font-bold text-sm"
        >
          <Settings size={20} />
          Settings
        </Link>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all font-bold text-sm"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-neutral-950 text-white overflow-hidden">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex w-72 flex-col">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative w-72 h-full shadow-2xl animate-in slide-in-from-left duration-300">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 border-b border-white/5 bg-neutral-900/50 backdrop-blur-xl flex items-center justify-between px-6 shrink-0">
          <Link href="/" className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            MVEMS
          </Link>
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-neutral-400">
            <Menu size={24} />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-10 relative">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="max-w-6xl mx-auto relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
