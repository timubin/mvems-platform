import React from 'react';
import { LayoutDashboard, Ticket, Users, Store, Settings, LogOut, TrendingUp, DollarSign, Calendar } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-neutral-950 text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-neutral-900/30 backdrop-blur-xl flex flex-col">
        <div className="p-6">
          <div className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            MVEMS Admin
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-500/10 text-indigo-400 font-medium">
            <LayoutDashboard size={20} />
            Overview
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
            <Calendar size={20} />
            My Events
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
            <Ticket size={20} />
            Orders
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
            <Users size={20} />
            Attendees
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
            <Store size={20} />
            Booths
          </a>
        </nav>

        <div className="p-4 border-t border-white/5">
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
            <Settings size={20} />
            Settings
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors mt-2">
            <LogOut size={20} />
            Logout
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        {/* Glow effect behind stats */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-8 relative z-10">
          
          <header className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
              <p className="text-neutral-400 mt-1">Welcome back. Here's your real-time platform data.</p>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-indigo-500/20">
              + Create Event
            </button>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-neutral-900/80 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors shadow-xl">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400"><DollarSign size={24} /></div>
                <span className="text-emerald-400 text-sm font-medium flex items-center gap-1"><TrendingUp size={14}/> +12%</span>
              </div>
              <p className="text-neutral-400 text-sm">Total Revenue</p>
              <h3 className="text-3xl font-bold mt-1">$45,231.89</h3>
            </div>

            <div className="bg-neutral-900/80 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors shadow-xl">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400"><Ticket size={24} /></div>
                <span className="text-emerald-400 text-sm font-medium flex items-center gap-1"><TrendingUp size={14}/> +8%</span>
              </div>
              <p className="text-neutral-400 text-sm">Tickets Sold</p>
              <h3 className="text-3xl font-bold mt-1">1,204</h3>
            </div>

            <div className="bg-neutral-900/80 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors shadow-xl">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400"><Store size={24} /></div>
                <span className="text-emerald-400 text-sm font-medium flex items-center gap-1"><TrendingUp size={14}/> +2%</span>
              </div>
              <p className="text-neutral-400 text-sm">Booths Sold</p>
              <h3 className="text-3xl font-bold mt-1">48 / 50</h3>
            </div>

            <div className="bg-neutral-900/80 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors shadow-xl">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400"><Users size={24} /></div>
              </div>
              <p className="text-neutral-400 text-sm">Total Attendees</p>
              <h3 className="text-3xl font-bold mt-1">2,845</h3>
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="bg-neutral-900/80 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden shadow-xl">
            <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
              <a href="#" className="text-sm text-indigo-400 hover:text-indigo-300">View all</a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-neutral-400">
                  <tr>
                    <th className="px-6 py-4 font-medium">Order ID</th>
                    <th className="px-6 py-4 font-medium">Attendee</th>
                    <th className="px-6 py-4 font-medium">Event</th>
                    <th className="px-6 py-4 font-medium">Amount</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[1,2,3,4].map((i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 font-mono text-neutral-300">ORD-109{i}</td>
                      <td className="px-6 py-4">Alex Johnson</td>
                      <td className="px-6 py-4 text-neutral-400">Global Tech Summit</td>
                      <td className="px-6 py-4 font-medium text-white">$299.00</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
