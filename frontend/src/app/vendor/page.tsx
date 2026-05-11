import React from 'react';
import { Store, MapPin, Globe, Mail, Phone, ChevronRight, CheckCircle2, Search } from 'lucide-react';
import Link from 'next/link';

export default function VendorStorefrontPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-cyan-500/30 pb-20">
      {/* Navigation */}
      <nav className="border-b border-white/5 bg-neutral-950 sticky top-0 z-50 backdrop-blur-xl bg-neutral-950/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            MVEMS
          </Link>
          <div className="flex gap-6 text-sm font-medium">
            <Link href="/dashboard" className="text-neutral-400 hover:text-white transition-colors">Dashboard</Link>
            <span className="text-cyan-400">Vendor Hub</span>
          </div>
        </div>
      </nav>

      {/* Vendor Profile Header (Storefront) */}
      <header className="relative pt-20 pb-16 overflow-hidden border-b border-white/5 bg-neutral-900/20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-start md:items-end gap-8">
          <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-neutral-950 shadow-2xl bg-white flex items-center justify-center flex-shrink-0">
            {/* Vendor Logo placeholder */}
            <div className="text-5xl font-black text-indigo-600 tracking-tighter">NXT</div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-semibold rounded-full border border-cyan-500/20">Premium Sponsor</span>
              <span className="flex items-center text-xs text-neutral-400 gap-1"><MapPin size={12}/> San Francisco, CA</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">NXT Innovations</h1>
            <p className="text-lg text-neutral-400 max-w-2xl leading-relaxed">
              We build next-generation hardware solutions for AI developers. Discover our latest edge-computing devices at our upcoming event booths.
            </p>
          </div>
          
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <button className="bg-white hover:bg-neutral-200 text-black px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
              <Globe size={18} /> Visit Website
            </button>
            <div className="flex gap-3">
              <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-3 rounded-xl transition-colors flex items-center justify-center">
                <Mail size={18} />
              </button>
              <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-3 rounded-xl transition-colors flex items-center justify-center">
                <Phone size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
        {/* Glow effect */}
        <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-cyan-600/5 blur-[150px] rounded-full pointer-events-none" />

        {/* Left Column: Available Booths & Interactive Map */}
        <div className="lg:col-span-7 space-y-10 relative z-10">
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Available Booth Spaces</h2>
                <p className="text-neutral-400 text-sm mt-1">Apply for a booth at upcoming tech events.</p>
              </div>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input type="text" placeholder="Search events..." className="w-full sm:w-48 bg-neutral-900 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors" />
              </div>
            </div>

            <div className="space-y-4">
              {[
                { name: "Premium Corner Booth (A1)", event: "Global Tech Summit 2026", price: "$2,500", status: "AVAILABLE" },
                { name: "Standard Inline Booth (B4)", event: "Future of AI Conference", price: "$1,200", status: "PENDING" },
                { name: "Main Hall Feature Booth (M1)", event: "Web3 Developers Meetup", price: "$5,000", status: "AVAILABLE" },
              ].map((booth, i) => (
                <div key={i} className="group bg-neutral-900/60 backdrop-blur-sm border border-white/5 hover:border-white/20 hover:bg-neutral-900 transition-all rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <Store size={20} className={booth.status === 'AVAILABLE' ? 'text-cyan-400' : 'text-amber-400'} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-white group-hover:text-cyan-400 transition-colors">{booth.name}</h3>
                      <p className="text-sm text-neutral-400">{booth.event}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    <div className="text-left sm:text-right">
                      <div className="font-bold text-white text-lg">{booth.price}</div>
                      <div className={`text-xs font-bold tracking-wider ${booth.status === 'AVAILABLE' ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {booth.status}
                      </div>
                    </div>
                    {booth.status === 'AVAILABLE' ? (
                      <button className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors">
                        Apply
                      </button>
                    ) : (
                      <button disabled className="bg-white/5 text-neutral-500 px-5 py-2.5 rounded-xl text-sm font-semibold cursor-not-allowed">
                        Waitlist
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Map Placeholder */}
          <div className="bg-neutral-900/60 backdrop-blur-sm border border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-xl">
            <h3 className="text-lg font-semibold mb-6 text-white">Interactive Venue Map</h3>
            <div className="aspect-video bg-black/50 rounded-2xl border border-white/10 flex flex-col items-center justify-center relative group cursor-pointer hover:border-cyan-500/30 transition-colors">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
              <MapPin size={32} className="text-neutral-600 mb-2 group-hover:text-cyan-500 transition-colors" />
              <p className="text-neutral-500 font-medium text-sm group-hover:text-neutral-400 transition-colors">Select an event to view the interactive floor plan</p>
            </div>
          </div>
        </div>

        {/* Right Column: Application Form */}
        <div className="lg:col-span-5 relative z-10">
          <div className="bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sticky top-24 shadow-2xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2 text-white">Booth Application</h2>
              <p className="text-sm text-neutral-400">Secure your spot. Our team will review your application within 48 hours.</p>
            </div>

            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Selected Event</label>
                <select className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 appearance-none transition-all">
                  <option>Global Tech Summit 2026</option>
                  <option>Future of AI Conference</option>
                  <option>Web3 Developers Meetup</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Preferred Booth Size</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 p-3.5 border border-cyan-500/50 bg-cyan-500/10 rounded-xl cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                    <input type="radio" name="size" defaultChecked className="accent-cyan-500 w-4 h-4" />
                    <span className="text-sm font-medium text-white">10x10 Standard</span>
                  </label>
                  <label className="flex items-center gap-2 p-3.5 border border-white/10 bg-neutral-950 rounded-xl cursor-pointer hover:border-white/30 transition-colors">
                    <input type="radio" name="size" className="accent-cyan-500 w-4 h-4" />
                    <span className="text-sm font-medium text-white">20x20 Premium</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">What will you showcase?</label>
                <textarea 
                  rows={4}
                  placeholder="Describe your products, services, or hardware..."
                  className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none transition-all"
                />
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 flex gap-3 items-start">
                <CheckCircle2 size={18} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-cyan-100/70 leading-relaxed font-medium">
                  By submitting, you agree to the Vendor Terms of Service. Payment is only required after your application is approved.
                </p>
              </div>

              <button type="button" className="w-full bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 mt-2">
                Submit Application <ChevronRight size={18} />
              </button>
            </form>
          </div>
        </div>

      </main>
    </div>
  );
}
