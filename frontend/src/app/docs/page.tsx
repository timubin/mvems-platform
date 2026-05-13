import React from 'react';
import { Book, Code, Terminal, Zap, ArrowLeft, Search } from 'lucide-react';
import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 bg-neutral-900/30 p-8 hidden lg:block">
        <Link href="/" className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 mb-12 block">
          MVEMS Docs
        </Link>
        
        <nav className="space-y-8">
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-4">Getting Started</h4>
            <ul className="space-y-3 text-sm font-bold text-neutral-400">
              <li className="text-indigo-400">Introduction</li>
              <li className="hover:text-white cursor-pointer transition-colors">Quick Start</li>
              <li className="hover:text-white cursor-pointer transition-colors">Installation</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-4">Platform Core</h4>
            <ul className="space-y-3 text-sm font-bold text-neutral-400">
              <li className="hover:text-white cursor-pointer transition-colors">Event Management</li>
              <li className="hover:text-white cursor-pointer transition-colors">Seat Selection</li>
              <li className="hover:text-white cursor-pointer transition-colors">Payment Gateways</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-4">API</h4>
            <ul className="space-y-3 text-sm font-bold text-neutral-400">
              <li className="hover:text-white cursor-pointer transition-colors">Authentication</li>
              <Link href="/docs/api" className="hover:text-white cursor-pointer transition-colors">Endpoint Reference</Link>
            </ul>
          </div>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-10 lg:p-20 overflow-y-auto">
        <div className="max-w-3xl">
          <Link href="/" className="inline-flex lg:hidden items-center gap-2 text-indigo-400 mb-8 font-bold text-sm">
            <ArrowLeft size={16} /> Home
          </Link>
          
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

          <section className="space-y-6 prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold border-b border-white/5 pb-4">Core Philosophy</h2>
            <p className="text-neutral-400">
              Our platform focuses on three main pillars: Reliability, Scalability, and Ease of Use. Whether you are hosting a small 50-person workshop or a 100,000-person tech summit, MVEMS scales with you.
            </p>
            <div className="p-6 bg-indigo-600/10 border-l-4 border-indigo-600 rounded-r-xl">
              <p className="text-sm text-indigo-200 font-medium">
                <strong>Note:</strong> This documentation is under active development as part of the Phase 11 release.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
