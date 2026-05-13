"use client";

import React from 'react';
import { LayoutDashboard, Ticket, Users, Store, Settings, LogOut, Calendar } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const navItems = [
    { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'My Events', icon: Calendar, path: '/dashboard/my-events' },
    { name: 'Orders', icon: Ticket, path: '/dashboard/orders' },
    { name: 'Attendees', icon: Users, path: '/dashboard/attendees' },
    { name: 'Booths', icon: Store, path: '/dashboard/booths' },
  ];

  return (
    <div className="flex h-screen bg-neutral-950 text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 bg-neutral-900/30 backdrop-blur-xl flex flex-col">
        <div className="p-8">
          <Link href="/" className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            MVEMS Admin
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.name}
                href={item.path} 
                className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 font-bold text-sm ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5 space-y-2">
          <Link href="/dashboard/settings" className="flex items-center gap-4 px-5 py-3.5 rounded-2xl text-neutral-400 hover:text-white hover:bg-white/5 transition-all font-bold text-sm">
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
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-10 relative">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
