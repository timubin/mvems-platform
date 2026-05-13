import React from 'react';
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
  Star
} from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-neutral-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            MVEMS
          </Link>
          
          <div className="hidden lg:flex gap-10 text-sm font-semibold text-neutral-400">
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#events" className="hover:text-indigo-400 transition-colors">Discovery</a>
            <a href="#dashboard" className="hover:text-indigo-400 transition-colors">Organizer</a>
            <a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing</a>
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
        {/* Background Gradients */}
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

        {/* Dashboard Preview UI */}
        <div className="max-w-6xl mx-auto px-6 mt-24 animate-in fade-in zoom-in duration-1000">
          <div className="relative p-2 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent border border-white/10">
            <div className="bg-neutral-950 rounded-[2rem] overflow-hidden border border-white/5 aspect-[16/9] shadow-2xl relative">
              <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80" alt="Dashboard" className="w-full h-full object-cover opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-[0_0_40px_rgba(79,70,229,0.6)]">
                  <Play size={32} className="fill-white ml-1" />
                </div>
              </div>
            </div>
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
              { icon: <Zap className="text-amber-400" />, title: "Real-time Booking", desc: "Atomic seat locking using Redis ensure no double-bookings even at peak traffic." },
              { icon: <ShieldCheck className="text-emerald-400" />, title: "Secure Payments", desc: "Integrated Stripe & SSLCommerz support for global and local transactions." },
              { icon: <Users className="text-indigo-400" />, title: "Multivendor Engine", desc: "Allow multiple organizers and vendors to list events and manage booths." },
              { icon: <BarChart3 className="text-cyan-400" />, title: "Advanced Analytics", desc: "Track ROI, ticket heatmaps, and vendor lead retrieval in one dashboard." },
              { icon: <Globe className="text-purple-400" />, title: "Global Reach", desc: "Multi-currency and multi-language support for international audiences." },
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

      {/* Trust Section */}
      <section className="py-24 border-y border-white/5 bg-neutral-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all">
            <div className="text-2xl font-bold tracking-tighter">TECHSUMMIT</div>
            <div className="text-2xl font-bold tracking-tighter">FUTURECON</div>
            <div className="text-2xl font-bold tracking-tighter">WEB3.DEV</div>
            <div className="text-2xl font-bold tracking-tighter">DESIGNWEEK</div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group rounded-[2rem] bg-neutral-900/40 border border-white/5 overflow-hidden hover:border-white/20 transition-all shadow-2xl">
                <div className="relative h-64">
                  <img src={`https://images.unsplash.com/photo-${1540575467063 + i}-178a50c2df87?w=800&q=80`} alt="Event" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10">
                    FEATURED
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">International Developers Summit 2026</h3>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-neutral-400 text-sm gap-3">
                      <Calendar size={16} className="text-indigo-400" /> May 12-14, 2026
                    </div>
                    <div className="flex items-center text-neutral-400 text-sm gap-3">
                      <MapPin size={16} className="text-cyan-400" /> San Francisco, CA
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-amber-400 fill-amber-400" />
                      <span className="font-bold">4.9</span>
                      <span className="text-neutral-500 text-sm ml-1">(120 Reviews)</span>
                    </div>
                    <Link href="/events" className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-neutral-200 transition-colors">
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative p-12 lg:p-24 rounded-[3rem] bg-indigo-600 overflow-hidden text-center">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[100px] rounded-full -mr-48 -mt-48" />
            
            <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
              <h2 className="text-5xl lg:text-7xl font-black tracking-tight text-white">Ready to launch <br/> your next event?</h2>
              <p className="text-xl text-indigo-100/80 font-medium">Join 500+ organizers already scaling their business with MVEMS.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/register" className="w-full sm:w-auto px-10 py-5 bg-white text-black rounded-2xl font-bold text-lg hover:bg-neutral-100 transition-all shadow-2xl">
                  Get Started for Free
                </Link>
                <button className="w-full sm:w-auto px-10 py-5 bg-indigo-700 text-white border border-indigo-500/50 rounded-2xl font-bold text-lg hover:bg-indigo-800 transition-all">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-24 pb-12 border-t border-white/5 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="space-y-6">
              <div className="text-2xl font-black tracking-tighter text-white">MVEMS</div>
              <p className="text-neutral-500 leading-relaxed">
                Empowering the event industry with cutting-edge technology and seamless multivendor integration.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                  <Globe size={18} />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                  <Users size={18} />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6">Platform</h4>
              <ul className="space-y-4 text-sm text-neutral-500">
                <li><Link href="/events" className="hover:text-white transition-colors">Event Discovery</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Organizer Portal</Link></li>
                <li><Link href="/vendor" className="hover:text-white transition-colors">Vendor Hub</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing Plans</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-sm text-neutral-500">
                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/docs/api" className="hover:text-white transition-colors">API Reference</Link></li>
                <li><Link href="/status" className="hover:text-white transition-colors">Status Page</Link></li>
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Newsletter</h4>
              <p className="text-sm text-neutral-500 mb-4">Get the latest event trends and platform updates.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Email" className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:outline-none focus:border-indigo-500 transition-colors" />
                <button className="bg-white text-black p-2.5 rounded-xl hover:bg-neutral-200 transition-colors">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-neutral-600 font-medium">
            <div>© 2026 MVEMS Platform. Built with passion for organizers.</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
