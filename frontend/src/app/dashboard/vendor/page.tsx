"use client";

import React from 'react';
import { 
  Store, Package, TrendingUp, 
  MessageSquare, Users, Star,
  Clock, CheckCircle2, ChevronRight,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function VendorDashboardPage() {
  const stats = [
    { name: 'Total Sales', value: '$12,450', icon: TrendingUp, color: 'text-emerald-400' },
    { name: 'Active Booths', value: '2', icon: Store, color: 'text-indigo-400' },
    { name: 'Leads Generated', value: '148', icon: Users, color: 'text-cyan-400' },
    { name: 'Avg Rating', value: '4.9', icon: Star, color: 'text-amber-400' },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Vendor Dashboard</h1>
          <p className="text-neutral-500 mt-1">Manage your storefronts and track booth performance across events.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 bg-white text-black rounded-xl font-bold hover:bg-neutral-200 transition-all">
            Edit Storefront
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-3xl bg-neutral-900/50 border border-white/5 hover:border-white/10 transition-all"
          >
            <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${stat.color} mb-4`}>
              <stat.icon size={24} />
            </div>
            <p className="text-sm font-medium text-neutral-500">{stat.name}</p>
            <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Active Booths */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Active Booths</h2>
            <button className="text-sm text-indigo-400 hover:underline">View All</button>
          </div>
          
          <div className="space-y-4">
            {[
              { event: 'Global Tech Summit 2026', booth: 'Premium Corner A1', status: 'Approved', visitors: 840 },
              { event: 'Future of AI Expo', booth: 'Standard B12', status: 'Pending Review', visitors: 0 }
            ].map((item, i) => (
              <div key={i} className="group p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-neutral-800 border border-white/10 flex items-center justify-center text-neutral-400">
                    <Store size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-indigo-400 transition-colors">{item.event}</h4>
                    <p className="text-xs text-neutral-500">{item.booth}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8 text-right">
                  <div className="hidden sm:block">
                    <p className="text-xs text-neutral-500 font-medium">Daily Visitors</p>
                    <p className="text-sm font-bold text-white">{item.visitors}</p>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      item.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <ChevronRight className="text-neutral-700" size={20} />
                </div>
              </div>
            ))}
          </div>

          {/* Product/Inventory Preview */}
          <div className="pt-4 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Product Catalogue</h2>
              <button className="text-sm text-indigo-400 hover:underline">Manage Products</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'Edge AI Processor V2', price: '$499', stock: 12 },
                { name: 'Developer Kit (Lite)', price: '$199', stock: 45 }
              ].map((prod, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-500">
                    <Package size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white">{prod.name}</h4>
                    <p className="text-xs text-neutral-500">{prod.price} • {prod.stock} in stock</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Messages & Alerts */}
        <div className="space-y-8">
          <div className="p-8 rounded-[2.5rem] bg-indigo-600/10 border border-indigo-500/20 relative overflow-hidden">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <MessageSquare size={20} className="text-indigo-400" /> Recent Messages
            </h3>
            <div className="space-y-4">
              {[
                { from: 'Event Support', msg: 'Your booth plan for Global Tech Summit has been...', time: '2h ago' },
                { from: 'John Doe', msg: 'I would like to inquire about bulk ordering your...', time: '5h ago' }
              ].map((msg, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white">{msg.from}</span>
                    <span className="text-[10px] text-neutral-500">{msg.time}</span>
                  </div>
                  <p className="text-xs text-neutral-400 line-clamp-1">{msg.msg}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-500 transition-all">
              Go to Inbox
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-amber-500/5 border border-amber-500/10 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-widest">
              <AlertCircle size={16} /> Urgent Actions
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Upload your insurance documents for the <strong>Future of AI Expo</strong> before tomorrow midnight.
            </p>
            <button className="text-xs font-bold text-amber-400 hover:underline">Upload Documents</button>
          </div>
        </div>

      </div>
    </div>
  );
}
