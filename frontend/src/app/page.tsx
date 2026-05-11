import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            MVEMS
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-neutral-400">
            <a href="#features" className="hover:text-white transition-colors duration-300">Features</a>
            <a href="#events" className="hover:text-white transition-colors duration-300">Events</a>
            <a href="#vendors" className="hover:text-white transition-colors duration-300">Vendors</a>
          </div>
          <div className="flex gap-4">
            <button className="text-sm font-medium hover:text-indigo-400 transition-colors">Log in</button>
            <button className="text-sm font-medium bg-white text-black px-5 py-2.5 rounded-full hover:bg-neutral-200 transition-transform hover:scale-105 duration-300">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-6 text-center space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-indigo-300 mb-4 shadow-lg backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Enterprise Platform v1.0
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-tight">
            The Ultimate <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-400">
              Multivendor Event
            </span> Platform
          </h1>
          
          <p className="text-lg lg:text-xl text-neutral-400 max-w-2xl mx-auto font-light">
            Manage everything from discovery and ticketing to real-time seat booking and vendor ecosystems—all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] duration-300">
              Create an Event
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white font-medium transition-all hover:-translate-y-1 duration-300">
              Explore Events
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 rounded-2xl bg-neutral-900/50 border border-white/5 backdrop-blur-xl">
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-white">12+</div>
            <div className="text-sm text-neutral-400">Core Modules</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-white">5</div>
            <div className="text-sm text-neutral-400">User Roles</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-white">100+</div>
            <div className="text-sm text-neutral-400">Features</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-indigo-400">100%</div>
            <div className="text-sm text-neutral-400">Real-time</div>
          </div>
        </div>
      </section>
    </main>
  );
}
