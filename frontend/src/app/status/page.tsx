import React from 'react';
import { ShieldCheck, Server, Database, Globe, ArrowLeft, Activity } from 'lucide-react';
import Link from 'next/link';

export default function StatusPage() {
  const services = [
    { name: 'Core API', status: 'Operational', icon: Server, color: 'text-emerald-400' },
    { name: 'Seat Booking Engine', status: 'Operational', icon: Activity, color: 'text-emerald-400' },
    { name: 'Database', status: 'Operational', icon: Database, color: 'text-emerald-400' },
    { name: 'Frontend CDN', status: 'Operational', icon: Globe, color: 'text-emerald-400' },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6 text-center">
      <Link href="/" className="inline-flex items-center gap-2 text-indigo-400 mb-12 font-bold text-sm hover:-translate-x-1 transition-transform">
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <div className="max-w-xl w-full">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 mb-8 animate-pulse">
           <ShieldCheck size={40} />
        </div>
        
        <h1 className="text-4xl font-black mb-4">All Systems Operational</h1>
        <p className="text-neutral-500 font-medium mb-16">Verified at {new Date().toLocaleTimeString()} - May 13, 2026</p>

        <div className="space-y-4 text-left">
          {services.map((s) => (
            <div key={s.name} className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6 flex items-center justify-between group hover:border-white/10 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-xl text-neutral-400 group-hover:text-white transition-colors">
                  <s.icon size={18} />
                </div>
                <span className="font-bold text-neutral-300">{s.name}</span>
              </div>
              <span className={`text-xs font-black uppercase tracking-widest ${s.color}`}>{s.status}</span>
            </div>
          ))}
        </div>

        <div className="mt-20 p-8 rounded-3xl bg-neutral-900 border border-white/5 space-y-4">
           <h3 className="font-bold text-white">Subscribe to updates</h3>
           <p className="text-sm text-neutral-500">Get notified via email when we have service interruptions.</p>
           <div className="flex gap-2">
             <input type="email" placeholder="email@example.com" className="flex-1 bg-neutral-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition-all" />
             <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all">Subscribe</button>
           </div>
        </div>
      </div>
    </div>
  );
}
