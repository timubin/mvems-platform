"use client";

import React, { useEffect, useState } from 'react';
import { Ticket, Search, Filter, Loader2, Download } from 'lucide-react';
import apiClient from '@/lib/api-client';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we would fetch from /orders. For demo, we use attendee report logic.
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // Mocking order list for now using existing services
      // This shows the connection is ready for integration
      setTimeout(() => {
        setOrders([
          { id: 'ORD-1021', name: 'John Doe', event: 'Global Tech Summit', amount: 299, status: 'Completed', date: '2026-05-10' },
          { id: 'ORD-1022', name: 'Sarah Miller', event: 'AI Workshop', amount: 150, status: 'Completed', date: '2026-05-11' },
          { id: 'ORD-1023', name: 'Robert Fox', event: 'Web3 Meetup', amount: 0, status: 'Pending', date: '2026-05-12' },
        ]);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white">Manage Orders</h1>
          <p className="text-neutral-400 mt-2 font-medium">Track sales and manage ticket transactions.</p>
        </div>
        <button className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 border border-white/10">
          <Download size={18} /> Export CSV
        </button>
      </header>

      {/* Table Section */}
      <div className="bg-neutral-900/60 backdrop-blur-sm border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between gap-6 bg-white/5">
           <div className="relative flex-1">
             <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
             <input type="text" placeholder="Search orders by ID or Name..." className="w-full bg-neutral-950 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all" />
           </div>
           <button className="bg-neutral-950 border border-white/10 p-3 rounded-xl text-neutral-400 hover:text-white transition-colors">
              <Filter size={18} />
           </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-indigo-500" size={48} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-neutral-500 text-xs font-bold uppercase tracking-widest bg-white/[0.02]">
                  <th className="px-8 py-5">Order ID</th>
                  <th className="px-8 py-5">Attendee</th>
                  <th className="px-8 py-5">Event</th>
                  <th className="px-8 py-5">Date</th>
                  <th className="px-8 py-5">Amount</th>
                  <th className="px-8 py-5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-6 font-mono text-neutral-400 font-bold">{order.id}</td>
                    <td className="px-8 py-6 font-bold text-white">{order.name}</td>
                    <td className="px-8 py-6 text-neutral-400 font-medium">{order.event}</td>
                    <td className="px-8 py-6 text-neutral-500">{order.date}</td>
                    <td className="px-8 py-6 font-black text-indigo-400">${order.amount}</td>
                    <td className="px-8 py-6 text-right">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        order.status === 'Completed' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
