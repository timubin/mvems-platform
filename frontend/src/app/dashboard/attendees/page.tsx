"use client";

import React from 'react';
import { Users, Search, MoreVertical } from 'lucide-react';

export default function AttendeesPage() {
  const attendees = [
    { id: 1, name: 'Alex Johnson', email: 'alex@example.com', phone: '+1 234 567 890', ticket: 'VIP Access', status: 'Checked In' },
    { id: 2, name: 'Maria Garcia', email: 'maria@example.com', phone: '+1 987 654 321', ticket: 'General', status: 'Registered' },
    { id: 3, name: 'David Smith', email: 'david@example.com', phone: '+1 555 000 111', ticket: 'Early Bird', status: 'Registered' },
  ];

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-black tracking-tight text-white">Attendees</h1>
        <p className="text-neutral-400 mt-2 font-medium">Manage your event participants and check-in status.</p>
      </header>

      <div className="bg-neutral-900/60 backdrop-blur-sm border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="p-8 bg-white/5 border-b border-white/5 flex items-center justify-between">
           <div className="relative w-96">
             <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
             <input type="text" placeholder="Search attendees..." className="w-full bg-neutral-950 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500" />
           </div>
           <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2">
              <Users size={18} /> Invite Attendee
           </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-neutral-500 text-[10px] font-black uppercase tracking-[0.2em] bg-white/[0.02]">
                <th className="px-8 py-5">Name & Email</th>
                <th className="px-8 py-5">Phone</th>
                <th className="px-8 py-5">Ticket Type</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {attendees.map((a) => (
                <tr key={a.id} className="hover:bg-white/[0.01] transition-colors group">
                  <td className="px-8 py-6">
                    <div className="font-bold text-white">{a.name}</div>
                    <div className="text-xs text-neutral-500 mt-1">{a.email}</div>
                  </td>
                  <td className="px-8 py-6 text-sm text-neutral-400">{a.phone}</td>
                  <td className="px-8 py-6">
                     <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-bold rounded-lg border border-indigo-500/20">
                       {a.ticket}
                     </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-xs font-bold">
                       <span className={`w-2 h-2 rounded-full ${a.status === 'Checked In' ? 'bg-emerald-500' : 'bg-neutral-600'}`} />
                       <span className={a.status === 'Checked In' ? 'text-emerald-400' : 'text-neutral-500'}>{a.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-neutral-600 hover:text-white transition-colors"><MoreVertical size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
