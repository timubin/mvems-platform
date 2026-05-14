"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Calendar, MapPin, Users, Ticket, 
  Clock, Share2, ArrowLeft, Loader2,
  CheckCircle2, Info, ChevronRight,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import apiClient from '@/lib/api-client';
import { motion, AnimatePresence } from 'framer-motion';
import { DEMO_EVENTS } from '@/lib/demo-data';

interface TicketTier {
  id: string;
  name: string;
  price: number;
  description?: string;
  capacity: number;
  soldCount: number;
}

interface Speaker {
  id: string;
  name: string;
  title?: string;
  avatarUrl?: string;
}

interface EventSession {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  locationRoom?: string;
}

interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  startDatetime: string;
  endDatetime: string;
  venueName: string;
  capacity: number;
  coverImage?: string;
  category?: string;
  tickets: TicketTier[];
  speakers: Speaker[];
  sessions: EventSession[];
}

export default function EventDetailsPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await apiClient.get<Event>(`/events/${slug}`);
        setEvent(response.data);
      } catch (err: any) {
        console.error('Error fetching event details:', err);
        const demoEvent = DEMO_EVENTS.find((item) => item.slug === slug);
        if (demoEvent) {
          setEvent(demoEvent as Event);
        } else {
          setError('Event not found or failed to load.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchEvent();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-indigo-500" size={48} />
        <p className="text-neutral-500 animate-pulse font-medium">Loading event details...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-6">
          <Info size={40} />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Oops! Event not found</h1>
        <p className="text-neutral-400 mb-8 max-w-md">{error || "The event you're looking for might have been moved or deleted."}</p>
        <Link href="/events" className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-neutral-200 transition-all">
          Browse Other Events
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-indigo-500/30 pb-20 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/5 bg-neutral-950/80 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 hover:bg-white/5 rounded-full transition-colors text-neutral-400 hover:text-white">
              <ArrowLeft size={20} />
            </button>
            <span className="h-4 w-px bg-white/10 mx-2" />
            <Link href="/" className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
              MVEMS
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-neutral-400">
              <Share2 size={20} />
            </button>
            <Link href="/dashboard" className="text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-full transition-all shadow-lg shadow-indigo-500/20">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Hero Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  {event.category || "Technology"}
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                  <ShieldCheck size={14} /> Verified Event
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
                {event.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-neutral-400">
                <div className="flex items-center gap-2.5 font-medium">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-indigo-400">
                    <Calendar size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-neutral-500 font-bold uppercase tracking-tighter">Date</span>
                    <span className="text-white">{new Date(event.startDatetime).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 font-medium">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-cyan-400">
                    <MapPin size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-neutral-500 font-bold uppercase tracking-tighter">Location</span>
                    <span className="text-white">{event.venueName || 'Online Event'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 font-medium">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-purple-400">
                    <Users size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-neutral-500 font-bold uppercase tracking-tighter">Capacity</span>
                    <span className="text-white">{event.capacity > 0 ? `${event.capacity} Attendees` : 'Unlimited'}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Cover Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl"
            >
              <img 
                src={event.coverImage || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80"} 
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent" />
            </motion.div>

            {/* About */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <div className="w-1.5 h-8 bg-indigo-500 rounded-full" />
                About this event
              </h2>
              <div className="text-neutral-400 leading-relaxed text-lg whitespace-pre-wrap">
                {event.description}
              </div>
            </section>

            {/* Agenda/Sessions */}
            {event.sessions && event.sessions.length > 0 && (
              <section className="space-y-8">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-cyan-500 rounded-full" />
                  Event Agenda
                </h2>
                <div className="space-y-4">
                  {event.sessions.map((session, idx) => (
                    <div key={session.id} className="group flex gap-6 p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all">
                      <div className="flex flex-col items-center justify-center min-w-[80px] text-center border-r border-white/10 pr-6">
                        <span className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-1">
                          {new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <div className="w-px h-8 bg-white/10 group-hover:bg-cyan-500/50 transition-colors" />
                      </div>
                      <div className="flex-1 py-1">
                        <h4 className="text-lg font-bold text-white mb-2">{session.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-neutral-500 font-medium">
                          <span className="flex items-center gap-1.5"><Clock size={14} /> 45 min</span>
                          {session.locationRoom && <span className="flex items-center gap-1.5"><MapPin size={14} /> {session.locationRoom}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Speakers */}
            {event.speakers && event.speakers.length > 0 && (
              <section className="space-y-8">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-purple-500 rounded-full" />
                  Featured Speakers
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {event.speakers.map((speaker) => (
                    <div key={speaker.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 bg-neutral-800 flex-shrink-0">
                        <img 
                          src={speaker.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(speaker.name)}&background=random`} 
                          alt={speaker.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{speaker.name}</h4>
                        <p className="text-sm text-neutral-500">{speaker.title || "Industry Leader"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Ticket Sidebar */}
          <div className="space-y-8">
            <div className="sticky top-32 space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-[2.5rem] bg-neutral-900/50 backdrop-blur-2xl border border-white/10 p-8 shadow-2xl overflow-hidden relative"
              >
                {/* Decoration */}
                <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-indigo-500/10 blur-[50px] rounded-full pointer-events-none" />
                
                <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                  <Ticket className="text-indigo-400" /> Select Tickets
                </h3>

                <div className="space-y-4">
                  {event.tickets && event.tickets.length > 0 ? (
                    event.tickets.map((tier) => (
                      <div 
                        key={tier.id}
                        className="group relative p-5 rounded-3xl bg-neutral-950/50 border border-white/5 hover:border-indigo-500/30 transition-all cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-bold text-white">{tier.name}</h4>
                            <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mt-1">
                              {tier.capacity - tier.soldCount} tickets left
                            </p>
                          </div>
                          <span className="text-xl font-black text-indigo-400">
                            ${tier.price}
                          </span>
                        </div>
                        {tier.description && (
                          <p className="text-xs text-neutral-500 leading-relaxed mt-3">
                            {tier.description}
                          </p>
                        )}
                        <div className="mt-5">
                          <Link 
                            href={`/checkout?eventId=${event.id}&tierId=${tier.id}`}
                            className="w-full flex items-center justify-between bg-white text-black text-xs font-bold px-6 py-3 rounded-2xl hover:bg-indigo-500 hover:text-white transition-all transform group-hover:scale-[1.02]"
                          >
                            Select Tier
                            <ChevronRight size={16} />
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 bg-neutral-950/30 rounded-3xl border border-dashed border-white/10">
                      <Ticket className="mx-auto text-neutral-700 mb-4" size={32} />
                      <p className="text-neutral-500 text-sm font-medium">No tickets available yet</p>
                    </div>
                  )}
                </div>

                <div className="mt-10 space-y-4">
                  <div className="flex items-center gap-3 text-xs text-neutral-500 font-medium">
                    <CheckCircle2 className="text-emerald-500" size={16} />
                    Instant Confirmation via Email
                  </div>
                  <div className="flex items-center gap-3 text-xs text-neutral-500 font-medium">
                    <CheckCircle2 className="text-emerald-500" size={16} />
                    Secure Payment processing
                  </div>
                </div>
              </motion.div>

              {/* Organizer Card */}
              <div className="rounded-3xl bg-white/5 border border-white/5 p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xl">
                  {event.title.charAt(0)}
                </div>
                <div>
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Organizer</p>
                  <h4 className="font-bold text-white">MVEMS Platinum</h4>
                </div>
                <Link href="#" className="ml-auto text-neutral-500 hover:text-white transition-colors">
                  <ChevronRight size={20} />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
