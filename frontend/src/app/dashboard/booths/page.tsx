"use client";

import React from 'react';
import { Store, Plus, MapPin, CheckCircle2, Clock } from 'lucide-react';

export default function BoothsPage() {
  const booths = [
    { id: 'B-101', vendor: 'TechNova Solutions', size: '10x10', status: 'Active', event: 'Global Tech Summit' },
    { id: 'B-102', vendor: 'DesignFlow Inc.', size: '20x20', status: 'Pending', event: 'Global Tech Summit' },
    { id: 'B-103', vendor: 'Blockchain Systems', size: '10x10', status: 'Active', event: 'Web3 Expo' },
  ];

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white">Vendor Booths</h1>
          <p className="text-neutral-400 mt-2 font-medium">Manage and assign exhibition spaces for your vendors.</p>
        </div>
        <button className="bg-white text-black px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 hover:bg-neutral-200 shadow-xl">
           <Plus size={18} /> Add Booth Space
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {booths.map((booth) => (
          <div key={booth.id} className="bg-neutral-900/60 backdrop-blur-sm border border-white/5 rounded-[2.5rem] p-8 hover:border-indigo-500/30 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-white/5 rounded-2xl text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Store size={24} />
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                booth.status === 'Active' 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}>
                {booth.status}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-1">{booth.vendor}</h3>
            <p className="text-neutral-500 text-sm font-medium mb-6">Booth ID: {booth.id}</p>

            <div className="space-y-3 mb-8 py-6 border-y border-white/5">
              <div className="flex items-center justify-between text-sm">
                 <span className="text-neutral-500">Event</span>
                 <span className="text-neutral-300 font-bold">{booth.event}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                 <span className="text-neutral-500">Dimensions</span>
                 <span className="text-neutral-300 font-bold">{booth.size}</span>
              </div>
            </div>

            <div className="flex gap-3">
               <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-all border border-white/5">
                 Manage Details
               </button>
               <button className="p-3 bg-white/5 hover:bg-indigo-600 rounded-xl transition-all border border-white/5 group-hover:border-indigo-500/50">
                 <MapPin size={16} />
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
