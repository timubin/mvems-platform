"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Store, MapPin, Globe, Mail, 
  Phone, Star, Package, ArrowLeft,
  Share2, ShieldCheck, CheckCircle2,
  ChevronRight, ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BoothProfilePage() {
  const { id } = useParams();
  const router = useRouter();

  // Mock Data
  const booth = {
    id: id,
    name: "NXT Innovations",
    tagline: "Edge-computing solutions for the modern AI stack.",
    description: "NXT Innovations specializes in creating ultra-low latency hardware for distributed AI systems. At this booth, we are showcasing our latest V2 edge processors and developer kits.",
    location: "Hall A, Booth #A12",
    website: "https://nxt-innovations.io",
    rating: 4.9,
    reviewsCount: 124,
    products: [
      { name: "Edge AI Processor V2", price: "$499", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
      { name: "Developer Kit (Lite)", price: "$199", image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=400&q=80" },
      { name: "Sensor Pack Alpha", price: "$89", image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&q=80" }
    ],
    event: "Global Tech Summit 2026"
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-cyan-500/30 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Nav */}
      <nav className="relative z-50 border-b border-white/5 bg-neutral-950/80 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 hover:bg-white/5 rounded-full text-neutral-400">
              <ArrowLeft size={20} />
            </button>
            <span className="h-4 w-px bg-white/10 mx-2" />
            <Link href="/" className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
              MVEMS
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2.5 bg-white/5 rounded-full text-neutral-400 hover:text-white transition-colors">
              <Share2 size={18} />
            </button>
            <Link href="/vendor" className="text-sm font-bold bg-cyan-600 px-6 py-2 rounded-full shadow-lg shadow-cyan-500/20">
              Vendor Hub
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
          
          {/* Content */}
          <div className="lg:col-span-2 space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center border-4 border-neutral-900 shadow-2xl">
                  <span className="text-2xl font-black text-indigo-600 tracking-tighter">NXT</span>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="px-2.5 py-0.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold rounded-full uppercase tracking-widest">
                      Premium Booth
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                      <ShieldCheck size={14} /> Verified Vendor
                    </span>
                  </div>
                  <h1 className="text-4xl font-extrabold text-white">{booth.name}</h1>
                </div>
              </div>

              <p className="text-xl text-neutral-400 leading-relaxed max-w-3xl">
                {booth.tagline}
              </p>

              <div className="flex flex-wrap gap-8 py-6 border-y border-white/5">
                <div className="space-y-1">
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Location</p>
                  <p className="font-bold flex items-center gap-2"><MapPin size={16} className="text-cyan-400" /> {booth.location}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Event</p>
                  <p className="font-bold flex items-center gap-2"><Store size={16} className="text-indigo-400" /> {booth.event}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Rating</p>
                  <p className="font-bold flex items-center gap-2"><Star size={16} className="text-amber-400" /> {booth.rating} <span className="text-neutral-500 font-medium">({booth.reviewsCount} reviews)</span></p>
                </div>
              </div>
            </motion.div>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold">About NXT Innovations</h2>
              <p className="text-neutral-400 text-lg leading-relaxed">
                {booth.description}
              </p>
            </section>

            {/* Showcase Products */}
            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-cyan-500 rounded-full" />
                  Product Showcase
                </h2>
                <button className="text-sm text-cyan-400 font-bold hover:underline">View Catalogue</button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {booth.products.map((product, i) => (
                  <div key={i} className="group rounded-[2rem] bg-white/5 border border-white/5 overflow-hidden hover:border-cyan-500/30 transition-all hover:bg-white/10 shadow-xl">
                    <div className="h-44 overflow-hidden relative">
                      <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                        {product.price}
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="font-bold text-white mb-4 line-clamp-1">{product.name}</h4>
                      <button className="w-full py-2.5 bg-white text-black text-xs font-bold rounded-xl hover:bg-cyan-500 hover:text-white transition-all flex items-center justify-center gap-2">
                        Inquire <ExternalLink size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="sticky top-32 space-y-6">
              <div className="p-8 rounded-[2.5rem] bg-neutral-900/50 backdrop-blur-2xl border border-white/10 shadow-2xl relative overflow-hidden">
                <h3 className="text-xl font-bold text-white mb-6">Contact Vendor</h3>
                <div className="space-y-4">
                  <button className="w-full py-4 bg-white text-black rounded-2xl font-bold hover:bg-neutral-200 transition-all flex items-center justify-center gap-3">
                    <Mail size={18} /> Send Message
                  </button>
                  <button className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                    <Globe size={18} /> Website <ExternalLink size={16} />
                  </button>
                </div>
                <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                  <div className="flex items-center gap-3 text-xs text-neutral-500">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    Response time: ~2 hours
                  </div>
                  <div className="flex items-center gap-3 text-xs text-neutral-500">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    Verified Business Account
                  </div>
                </div>
              </div>

              {/* Event Link */}
              <Link href="/events" className="group p-6 rounded-3xl bg-indigo-600/10 border border-indigo-500/20 flex items-center gap-4 hover:border-indigo-500/50 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Package size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Part of</p>
                  <h4 className="font-bold text-white group-hover:text-indigo-400 transition-colors">Global Tech Summit</h4>
                </div>
                <ChevronRight className="ml-auto text-neutral-600 group-hover:text-white transition-colors" />
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
