"use client";

import React, { useEffect, useState } from 'react';
import { 
  Ticket, 
  Users, 
  Zap, 
  ShieldCheck, 
  Globe, 
  BarChart3, 
  ArrowRight, 
  Play,
  Calendar,
  MapPin,
  Star,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import apiClient from '@/lib/api-client';

interface Event {
  id: string;
  title: string;
  slug: string;
  startDatetime: string;
  venueName: string;
  tickets: { price: number }[];
  organizer: { fullName: string };
}

export default function LandingPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await apiClient.get<Event[]>('/events');
        if (Array.isArray(response.data)) {
          setEvents(response.data.slice(0, 3));
        } else if (response.data && (response.data as any).data) {
          // Handle object wrapped data if needed
          setEvents((response.data as any).data.slice(0, 3));
        }
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <main className="min-h-screen bg-neutral-950 text-white selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-neutral-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            MVEMS
          </Link>
          
          <div className="hidden lg:flex gap-10 text-sm font-semibold text-neutral-400">
            <Link href="/events" className="hover:text-indigo-400 transition-colors">Discovery</Link>
            <Link href="/dashboard" className="hover:text-indigo-400 transition-colors">Organizer</Link>
            <Link href="/vendor" className="hover:text-indigo-400 transition-colors">Vendor Hub</Link>
            <Link href="/pricing" className="hover:text-indigo-400 transition-colors">Pricing</Link>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/login" className="hidden sm:block text-sm font-bold text-neutral-300 hover:text-white transition-colors">
              Log in
            </Link>
            <Link href="/register" className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:-translate-y-0.5">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 lg:pt-56 lg:pb-40 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Zap size={14} className="fill-indigo-400" /> The Future of Event Management
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[1.05] animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Your Vision, <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-400">
              One Unified
            </span> Platform.
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto font-medium leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            An all-in-one multivendor ecosystem for organizers, vendors, and attendees. Scale from local meetups to global tech summits effortlessly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-in fade-in slide-in-from-bottom-16 duration-1000">
            <Link href="/events" className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white text-black font-bold text-lg hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 group">
              Explore Events <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-neutral-900 border border-white/10 text-white font-bold text-lg hover:bg-neutral-800 transition-all flex items-center justify-center gap-2">
              <Play size={20} className="fill-white" /> Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Built for Enterprise. <br/> Loved by Organizers.</h2>
            <p className="text-neutral-400 text-lg">Every tool you need to run high-converting events, from seat selection to automated lead retrieval.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Zap className="text-amber-400" />, title: "Real-time Booking", desc: "Atomic seat locking ensure no double-bookings even at peak traffic." },
              { icon: <ShieldCheck className="text-emerald-400" />, title: "Secure Payments", desc: "Integrated Stripe & SSLCommerz support for global and local transactions." },
              { icon: <Users className="text-indigo-400" />, title: "Multivendor Engine", desc: "Allow multiple organizers and vendors to list events and manage booths." },
              { icon: <BarChart3 className="text-cyan-400" />, title: "Advanced Analytics", desc: "Track ROI, ticket heatmaps, and vendor lead retrieval in one dashboard." },
              { icon: <Globe className="text-purple-400" />, title: "Global Reach", desc: "Multi-currency support for international audiences." },
              { icon: <Ticket className="text-pink-400" />, title: "QR Ticketing", desc: "Automated QR code generation and mobile-friendly check-in systems." },
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-3xl bg-neutral-900/40 border border-white/5 hover:border-indigo-500/30 transition-all hover:bg-neutral-900/60 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events Preview */}
      <section id="events" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold mb-4">Upcoming Experiences</h2>
              <p className="text-neutral-400">Join thousands of attendees at these trending events.</p>
            </div>
            <Link href="/events" className="text-indigo-400 font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View all events <ArrowRight size={20} />
            </Link>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-neutral-500">
              <Loader2 className="animate-spin" size={40} />
              <p className="font-medium">Discovering the best events for you...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.length > 0 ? events.map((event) => (
                <div key={event.id} className="group rounded-[2rem] bg-neutral-900/40 border border-white/5 overflow-hidden hover:border-white/20 transition-all shadow-2xl">
                  <div className="relative h-64">
                    <img 
                      src={`https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80`} 
                      alt={event.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10">
                      FEATURED
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4 line-clamp-1">{event.title}</h3>
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center text-neutral-400 text-sm gap-3">
                        <Calendar size={16} className="text-indigo-400" /> {new Date(event.startDatetime).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-neutral-400 text-sm gap-3">
                        <MapPin size={16} className="text-cyan-400" /> {event.venueName || 'Online'}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-amber-400 fill-amber-400" />
                        <span className="font-bold">4.9</span>
                        <span className="text-neutral-500 text-sm ml-1">By {event.organizer.fullName}</span>
                      </div>
                      <Link href={`/events/${event.slug}`} className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-neutral-200 transition-colors">
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="col-span-full text-center py-12 text-neutral-500">
                   No upcoming events found. Stay tuned!
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-24 pb-12 border-t border-white/5 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-neutral-600 font-medium">
            <div>© 2026 MVEMS Platform. Built with passion for organizers.</div>
            <div className="flex gap-8">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
