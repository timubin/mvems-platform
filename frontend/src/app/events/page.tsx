"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { Calendar, MapPin, Ticket, Search, Filter, Loader2 } from 'lucide-react';
import Link from 'next/link';
import apiClient from '@/lib/api-client';
import { getDemoEvents } from '@/lib/demo-data';

interface Event {
  id: string;
  title: string;
  slug: string;
  startDatetime: string;
  venueName: string;
  coverImage?: string;
  category?: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchEvents = useCallback(async () => {
    try {
      const response = await apiClient.get<Event[]>(`/events?search=${encodeURIComponent(search)}`);
      setEvents(response.data.length > 0 ? response.data : getDemoEvents(search));
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents(getDemoEvents(search));
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const init = async () => {
      await fetchEvents();
    };
    init();
  }, [fetchEvents]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="border-b border-white/5 bg-neutral-950 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            MVEMS
          </Link>
          <div className="flex gap-8 items-center h-full">
            <Link href="/events" className="text-sm font-bold text-indigo-400 border-b-2 border-indigo-500 h-16 flex items-center">Discovery</Link>
            <Link href="/dashboard" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/vendor" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">Vendor Hub</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2 text-white">Discover Events</h1>
            <p className="text-neutral-400">Find and book the best tech conferences and meetups worldwide.</p>
          </div>

          <div className="flex gap-3">
            <div className="relative group w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                <Search size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-neutral-900 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>
            <button className="bg-neutral-900 border border-white/10 p-2.5 rounded-xl text-neutral-400 hover:text-white transition-colors">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="animate-spin text-indigo-500" size={48} />
            <p className="text-neutral-500 animate-pulse">Fetching live events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-32 bg-neutral-900/20 border border-white/5 rounded-3xl">
            <p className="text-neutral-500 text-lg">No events found matching your search.</p>
            <button onClick={() => setSearch('')} className="text-indigo-400 mt-2 hover:underline">Clear search</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id} className="group rounded-3xl border border-white/5 bg-neutral-900/50 overflow-hidden hover:bg-neutral-900 transition-all duration-300 hover:border-indigo-500/30 hover:shadow-2xl hover:-translate-y-1">
                <div className="relative h-52 w-full overflow-hidden">
                  <img 
                    src={event.coverImage || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"} 
                    alt={event.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold border border-white/10 text-indigo-300 uppercase tracking-widest">
                      {event.category || "General"}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-bold text-white mb-4 line-clamp-1 group-hover:text-indigo-400 transition-colors">{event.title}</h3>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-sm text-neutral-400 gap-3 font-medium">
                      <Calendar size={16} className="text-indigo-500" />
                      <span>{new Date(event.startDatetime).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-sm text-neutral-400 gap-3 font-medium">
                      <MapPin size={16} className="text-cyan-500" />
                      <span className="line-clamp-1">{event.venueName || 'Online'}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-1.5">
                      <Ticket size={16} className="text-emerald-500" />
                      <span className="text-lg font-bold text-white">Free</span>
                    </div>
                    <Link href={`/checkout?eventId=${event.id}`} className="text-sm font-bold bg-white text-black px-6 py-2.5 rounded-full hover:bg-neutral-200 transition-colors">
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
