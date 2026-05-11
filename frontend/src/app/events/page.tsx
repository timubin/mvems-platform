import React from 'react';
import { Calendar, MapPin, Users, Ticket, Search, Filter } from 'lucide-react';
import Link from 'next/link';

// Mock data to simulate API response from EventService
const MOCK_EVENTS = [
  {
    id: 1,
    title: "Global Tech Summit 2026",
    date: "Oct 15 - 17, 2026",
    location: "Moscone Center, SF",
    price: "From $299",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    color: "from-blue-500 to-indigo-500"
  },
  {
    id: 2,
    title: "Future of AI Conference",
    date: "Nov 02, 2026",
    location: "Virtual Event",
    price: "Free",
    category: "AI & ML",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    title: "Web3 Developers Meetup",
    date: "Dec 10, 2026",
    location: "ExCeL London, UK",
    price: "From $150",
    category: "Blockchain",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80",
    color: "from-emerald-500 to-teal-500"
  }
];

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="border-b border-white/5 bg-neutral-950 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            MVEMS
          </Link>
          <div className="flex gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-indigo-400 transition-colors flex items-center h-full">Log in</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Discover Events</h1>
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
                className="w-full bg-neutral-900 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
            <button className="bg-neutral-900 border border-white/10 p-2.5 rounded-xl hover:bg-neutral-800 transition-colors flex items-center justify-center text-neutral-400 hover:text-white">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {['All Events', 'Technology', 'AI & ML', 'Blockchain', 'Design', 'Marketing'].map((cat, i) => (
            <button 
              key={cat}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                i === 0 
                  ? 'bg-white text-black' 
                  : 'bg-neutral-900 border border-white/5 text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Event Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_EVENTS.map((event) => (
            <div key={event.id} className="group rounded-2xl border border-white/5 bg-neutral-900/50 overflow-hidden hover:bg-neutral-900 transition-all duration-300 hover:border-white/10 hover:shadow-2xl hover:-translate-y-1">
              {/* Event Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-t ${event.color} opacity-40 mix-blend-overlay z-10`} />
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-medium border border-white/10 text-white">
                    {event.category}
                  </span>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-4 line-clamp-1 group-hover:text-indigo-400 transition-colors">{event.title}</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-neutral-400 gap-3">
                    <Calendar size={16} className="text-indigo-400" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-neutral-400 gap-3">
                    <MapPin size={16} className="text-cyan-400" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-neutral-400 gap-3">
                    <Ticket size={16} className="text-emerald-400" />
                    <span>{event.price}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex -space-x-2">
                    {[1,2,3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-neutral-900 bg-neutral-800 flex items-center justify-center text-xs text-neutral-400">
                        <Users size={12} />
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-neutral-900 bg-neutral-800 flex items-center justify-center text-xs text-neutral-400 font-medium">
                      +1k
                    </div>
                  </div>
                  <button className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-neutral-200 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
