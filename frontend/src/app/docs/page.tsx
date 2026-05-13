"use client";

import React, { useState } from 'react';
import { Book, Code, Terminal, Zap, ArrowLeft, Search, CheckCircle2, Info } from 'lucide-react';
import Link from 'next/link';

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('introduction');

  const menuItems = [
    { id: 'introduction', label: 'Introduction', icon: Book },
    { id: 'quick-start', label: 'Quick Start', icon: Zap },
    { id: 'installation', label: 'Installation', icon: Terminal },
  ];

  const coreItems = [
    { id: 'events', label: 'Event Management' },
    { id: 'seats', label: 'Seat Selection' },
    { id: 'payments', label: 'Payment Gateways' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'introduction':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 text-indigo-400 text-xs font-black uppercase tracking-widest mb-4">
              <Book size={14} /> Documentation
            </div>
            <h1 className="text-5xl font-black mb-8">Introduction to MVEMS</h1>
            <p className="text-xl text-neutral-400 leading-relaxed mb-12 font-medium">
              MVEMS (Multivendor Event Management System) is an enterprise-grade platform designed to handle large-scale events with complex ticketing and vendor needs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              <div className="p-8 rounded-3xl bg-neutral-900 border border-white/5 hover:border-white/10 transition-all">
                <div className="p-3 bg-indigo-600/10 text-indigo-400 w-fit rounded-xl mb-6"><Terminal size={20}/></div>
                <h3 className="text-lg font-bold mb-2">Developer First</h3>
                <p className="text-sm text-neutral-500">Robust REST API and webhooks to integrate with your existing CRM or marketing tools.</p>
              </div>
              <div className="p-8 rounded-3xl bg-neutral-900 border border-white/5 hover:border-white/10 transition-all">
                <div className="p-3 bg-emerald-600/10 text-emerald-400 w-fit rounded-xl mb-6"><Zap size={20}/></div>
                <h3 className="text-lg font-bold mb-2">High Performance</h3>
                <p className="text-sm text-neutral-500">Built on Next.js 15 and NestJS for maximum speed and SEO optimization.</p>
              </div>
            </div>
          </div>
        );
      case 'quick-start':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-5xl font-black mb-8">Quick Start Guide</h1>
            <p className="text-lg text-neutral-400 mb-8">Get your event platform up and running in less than 5 minutes.</p>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Create an Account</h3>
                  <p className="text-neutral-500">Sign up as an Organizer to get access to your dashboard.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Define your Tiers</h3>
                  <p className="text-neutral-500">Set up VIP, General, and Early Bird tickets with custom pricing.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Go Live</h3>
                  <p className="text-neutral-500">Publish your event and start accepting global payments instantly.</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'installation':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-5xl font-black mb-8">Installation</h1>
            <p className="text-lg text-neutral-400 mb-8">Setup the local development environment for MVEMS.</p>
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">1. Clone the Repository</h3>
                <div className="bg-black rounded-2xl p-6 font-mono text-sm border border-white/5">
                  <span className="text-emerald-400">git clone</span> https://github.com/your-repo/mvems.git
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">2. Install Dependencies</h3>
                <div className="bg-black rounded-2xl p-6 font-mono text-sm border border-white/5">
                  <span className="text-indigo-400">cd</span> mvems <br/>
                  <span className="text-emerald-400">npm</span> install
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">3. Run Development Server</h3>
                <div className="bg-black rounded-2xl p-6 font-mono text-sm border border-white/5">
                  <span className="text-emerald-400">npm</span> run dev
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center py-20">
            <Info size={48} className="mx-auto text-neutral-800 mb-4" />
            <h2 className="text-2xl font-bold">Section Coming Soon</h2>
            <p className="text-neutral-500">We are still working on this part of the documentation.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-80 border-r border-white/5 bg-neutral-900/30 p-10 hidden lg:block overflow-y-auto">
        <Link href="/" className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 mb-16 block">
          MVEMS Docs
        </Link>
        
        <nav className="space-y-10">
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-6 border-b border-white/5 pb-2">Getting Started</h4>
            <ul className="space-y-4">
              {menuItems.map((item) => (
                <li 
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`text-sm font-bold cursor-pointer transition-all flex items-center gap-3 ${
                    activeSection === item.id ? 'text-indigo-400 translate-x-2' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-6 border-b border-white/5 pb-2">Platform Core</h4>
            <ul className="space-y-4 text-sm font-bold text-neutral-400">
              {coreItems.map(item => (
                <li 
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`hover:text-white cursor-pointer transition-all ${activeSection === item.id ? 'text-indigo-400 translate-x-2' : ''}`}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-6 border-b border-white/5 pb-2">API Reference</h4>
            <ul className="space-y-4 text-sm font-bold text-neutral-400">
              <li>
                <Link href="/docs/api" className="hover:text-indigo-400 flex items-center gap-2">
                  <Code size={16} /> Endpoint Reference
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-10 lg:p-24 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex lg:hidden items-center gap-2 text-indigo-400 mb-8 font-bold text-sm">
            <ArrowLeft size={16} /> Home
          </Link>
          
          {renderContent()}

          <div className="mt-24 pt-12 border-t border-white/5 flex justify-between items-center text-sm text-neutral-500 font-bold">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-500" /> Last updated: May 13, 2026
            </div>
            <div className="flex gap-6">
              <span className="hover:text-white cursor-pointer transition-colors">Edit this page</span>
              <span className="hover:text-white cursor-pointer transition-colors">Submit Feedback</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
