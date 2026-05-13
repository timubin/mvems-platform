"use client";

import React, { useEffect, useState } from 'react';
import { Plus, Calendar, MapPin, MoreVertical, Edit, Trash, Loader2 } from 'lucide-react';
import apiClient from '@/lib/api-client';
import Link from 'next/link';

export default function MyEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const fetchMyEvents = async () => {
    try {
      // In a real app, this would filter by the logged-in user's ID
      const response = await apiClient.get('/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching my events:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white">My Events</h1>
          <p className="text-neutral-400 mt-2 font-medium">Manage and monitor all your organized events.</p>
        </div>
        <Link href="/dashboard/create-event" className="bg-white text-black px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 hover:bg-neutral-200">
          <Plus size={18} /> Create Event
        </Link>
      </header>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin text-indigo-500" size={48} />
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-24 bg-neutral-900/40 border border-white/5 rounded-[2rem] border-dashed">
          <Calendar size={48} className="mx-auto text-neutral-800 mb-4" />
          <h3 className="text-xl font-bold text-neutral-300">No events created yet</h3>
          <p className="text-neutral-500 mt-2">Start by creating your first event today.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event: any) => (
            <div key={event.id} className="bg-neutral-900/60 border border-white/5 rounded-3xl p-6 flex gap-6 hover:border-white/10 transition-all group">
              <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                <img src={event.coverImage || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80"} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{event.title}</h3>
                  <button className="text-neutral-500 hover:text-white transition-colors"><MoreVertical size={18} /></button>
                </div>
                <div className="mt-2 space-y-1">
                   <div className="flex items-center text-xs text-neutral-500 gap-2">
                     <Calendar size={14} /> {new Date(event.startDate).toLocaleDateString()}
                   </div>
                   <div className="flex items-center text-xs text-neutral-500 gap-2">
                     <MapPin size={14} /> {event.location}
                   </div>
                </div>
                <div className="mt-4 flex gap-2">
                   <button className="flex-1 bg-white/5 hover:bg-white/10 text-white text-xs py-2 rounded-xl font-bold transition-all border border-white/5 flex items-center justify-center gap-2">
                     <Edit size={14} /> Edit
                   </button>
                   <button className="px-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs py-2 rounded-xl font-bold transition-all border border-red-500/10">
                     <Trash size={14} />
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
