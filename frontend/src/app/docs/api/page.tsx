import React from 'react';
import { Code, Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ApiDocsPage() {
  const endpoints = [
    { method: 'GET', path: '/events', desc: 'List all public events with search & filters.' },
    { method: 'POST', path: '/auth/login', desc: 'Authenticate user and return JWT token.' },
    { method: 'POST', path: '/orders', desc: 'Create a new ticket order and initiate payment.' },
    { method: 'GET', path: '/analytics/dashboard/:id', desc: 'Get real-time metrics for a specific event.' },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-10 lg:p-20">
      <div className="max-w-5xl mx-auto">
        <Link href="/docs" className="inline-flex items-center gap-2 text-indigo-400 mb-8 font-bold text-sm hover:translate-x-1 transition-transform">
          <ArrowLeft size={16} /> Back to Docs
        </Link>
        
        <header className="mb-20">
          <h1 className="text-5xl font-black mb-6 flex items-center gap-4">
            <Code size={40} className="text-indigo-400" /> API Reference
          </h1>
          <p className="text-xl text-neutral-400 font-medium">RESTful API documentation for custom integrations.</p>
        </header>

        <section className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-white/5 pb-4">Base URL</h2>
            <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 font-mono text-indigo-400 flex items-center justify-between">
              <span>http://localhost:3001</span>
              <button className="text-[10px] font-black uppercase tracking-widest bg-white/5 px-3 py-1 rounded-lg border border-white/5">Copy</button>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-white/5 pb-4">Endpoints</h2>
            <div className="space-y-4">
              {endpoints.map((e) => (
                <div key={e.path} className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-white/20 transition-all">
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-black tracking-widest ${
                      e.method === 'GET' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                    }`}>
                      {e.method}
                    </span>
                    <span className="font-mono text-sm text-neutral-300">{e.path}</span>
                  </div>
                  <p className="text-sm text-neutral-500 font-medium">{e.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-neutral-900/50 border border-white/5 rounded-3xl p-10 mt-20">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Lock size={20} className="text-amber-400" /> Authentication</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              To access protected endpoints, you must include a Bearer token in the `Authorization` header. You can obtain a token by calling the `/auth/login` endpoint.
            </p>
            <div className="mt-8 p-6 bg-neutral-950 rounded-2xl border border-white/5 font-mono text-xs text-neutral-500">
              Authorization: Bearer YOUR_JWT_TOKEN
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
