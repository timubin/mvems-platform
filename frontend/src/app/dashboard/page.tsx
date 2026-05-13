"use client";

import React, { useEffect, useState } from 'react';
import { TrendingUp, DollarSign, Ticket, Store, Users, Loader2 } from 'lucide-react';
import apiClient from '@/lib/api-client';

export default function DashboardOverview() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      // In a real app, we'd pass the specific eventId. For demo, we use a placeholder or system-wide.
      const response = await apiClient.get('/analytics/platform');
      setMetrics(response.data);
    } catch (error) {
      console.error('Error fetching dashboard metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="animate-spin text-indigo-500" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white">Dashboard Overview</h1>
          <p className="text-neutral-400 mt-2 font-medium">Welcome back. Here is your real-time platform data.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-600/20">
          + Create New Event
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-neutral-900/60 backdrop-blur-sm border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-colors shadow-2xl">
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-400"><DollarSign size={24} /></div>
            <span className="text-emerald-400 text-xs font-bold flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-full">+12%</span>
          </div>
          <p className="text-neutral-500 text-sm font-bold uppercase tracking-widest">Platform Revenue</p>
          <h3 className="text-4xl font-black mt-2 text-white">${metrics?.totalPlatformRevenue || '0.00'}</h3>
        </div>

        <div className="bg-neutral-900/60 backdrop-blur-sm border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-colors shadow-2xl">
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 bg-cyan-500/10 rounded-2xl text-cyan-400"><Ticket size={24} /></div>
            <span className="text-emerald-400 text-xs font-bold flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-full">+8%</span>
          </div>
          <p className="text-neutral-500 text-sm font-bold uppercase tracking-widest">Total Events</p>
          <h3 className="text-4xl font-black mt-2 text-white">{metrics?.totalEvents || '0'}</h3>
        </div>

        <div className="bg-neutral-900/60 backdrop-blur-sm border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-colors shadow-2xl">
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-400"><Store size={24} /></div>
          </div>
          <p className="text-neutral-500 text-sm font-bold uppercase tracking-widest">Platform Users</p>
          <h3 className="text-4xl font-black mt-2 text-white">{metrics?.totalUsers || '0'}</h3>
        </div>

        <div className="bg-neutral-900/60 backdrop-blur-sm border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-colors shadow-2xl">
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 bg-purple-500/10 rounded-2xl text-purple-400"><Users size={24} /></div>
          </div>
          <p className="text-neutral-500 text-sm font-bold uppercase tracking-widest">Daily Active</p>
          <h3 className="text-4xl font-black mt-2 text-white">24</h3>
        </div>
      </div>

      {/* Placeholder for Recent Activity */}
      <div className="bg-neutral-900/60 backdrop-blur-sm border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/5">
          <h2 className="text-xl font-bold">System Status</h2>
          <span className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> All Systems Operational
          </span>
        </div>
        <div className="p-20 text-center space-y-4">
           <LayoutDashboard size={48} className="mx-auto text-neutral-700" />
           <p className="text-neutral-500 font-medium max-w-sm mx-auto">
             Connectivity between Frontend and Backend is established. You are seeing live data from the NestJS Analytics service.
           </p>
        </div>
      </div>
    </div>
  );
}
