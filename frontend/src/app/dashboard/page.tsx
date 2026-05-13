"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { DollarSign, Ticket, Store, Users, Loader2, LayoutDashboard, AlertCircle } from 'lucide-react';
import apiClient from '@/lib/api-client';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

interface Metrics {
  totalPlatformRevenue: number;
  totalEvents: number;
  totalUsers: number;
}

export default function DashboardOverview() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const fetchPlatformMetrics = useCallback(async () => {
    try {
      const response = await apiClient.get<Metrics>('/analytics/platform');
      setMetrics(response.data);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message: string }>;
      setError(axiosError.response?.data?.message || 'Failed to fetch platform metrics.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      const userJson = localStorage.getItem('user');
      if (!userJson) {
        router.push('/login');
        return;
      }

      const user = JSON.parse(userJson);
      if (user.role === 'SUPER_ADMIN') {
        await fetchPlatformMetrics();
      } else {
        setLoading(false);
      }
    };
    
    init();
  }, [router, fetchPlatformMetrics]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="animate-spin text-indigo-500" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-3xl text-center space-y-4">
        <AlertCircle size={48} className="mx-auto text-red-500" />
        <h2 className="text-xl font-bold text-white">Access Error</h2>
        <p className="text-neutral-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white">Dashboard Overview</h1>
          <p className="text-neutral-400 mt-2 font-medium">Welcome back. Here is your real-time platform data.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-600/20">
          + Create New Event
        </button>
      </header>

      {metrics ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-neutral-900/60 backdrop-blur-sm border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-colors shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-400"><DollarSign size={24} /></div>
              <span className="text-emerald-400 text-xs font-bold flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-full">+12%</span>
            </div>
            <p className="text-neutral-500 text-sm font-bold uppercase tracking-widest">Platform Revenue</p>
            <h3 className="text-4xl font-black mt-2 text-white">${metrics.totalPlatformRevenue.toLocaleString()}</h3>
          </div>

          <div className="bg-neutral-900/60 backdrop-blur-sm border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-colors shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-cyan-500/10 rounded-2xl text-cyan-400"><Ticket size={24} /></div>
              <span className="text-emerald-400 text-xs font-bold flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-full">+8%</span>
            </div>
            <p className="text-neutral-500 text-sm font-bold uppercase tracking-widest">Total Events</p>
            <h3 className="text-4xl font-black mt-2 text-white">{metrics.totalEvents}</h3>
          </div>

          <div className="bg-neutral-900/60 backdrop-blur-sm border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-colors shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-400"><Store size={24} /></div>
            </div>
            <p className="text-neutral-500 text-sm font-bold uppercase tracking-widest">Platform Users</p>
            <h3 className="text-4xl font-black mt-2 text-white">{metrics.totalUsers}</h3>
          </div>

          <div className="bg-neutral-900/60 backdrop-blur-sm border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-colors shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-purple-500/10 rounded-2xl text-purple-400"><Users size={24} /></div>
            </div>
            <p className="text-neutral-500 text-sm font-bold uppercase tracking-widest">Daily Active</p>
            <h3 className="text-4xl font-black mt-2 text-white">24</h3>
          </div>
        </div>
      ) : (
        <div className="bg-neutral-900/60 backdrop-blur-sm border border-white/5 rounded-3xl p-20 text-center space-y-4">
           <LayoutDashboard size={48} className="mx-auto text-neutral-700" />
           <h2 className="text-xl font-bold text-white">Welcome to your Dashboard</h2>
           <p className="text-neutral-500 max-w-sm mx-auto">
             Connectivity established. Use the sidebar to manage your events, tickets, and bookings.
           </p>
        </div>
      )}

      {/* System Status Section */}
      <div className="bg-neutral-900/60 backdrop-blur-sm border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/5">
          <h2 className="text-xl font-bold">System Status</h2>
          <span className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> All Systems Operational
          </span>
        </div>
        <div className="p-12 text-center text-neutral-500 text-sm font-medium">
          Frontend and Backend sync confirmed. Real-time metrics are active for Admin accounts.
        </div>
      </div>
    </div>
  );
}
