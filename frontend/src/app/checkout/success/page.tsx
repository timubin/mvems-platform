"use client";

import React from 'react';
import { CheckCircle2, Calendar, ArrowRight, Download } from 'lucide-react';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6 text-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-xl w-full bg-neutral-900/50 backdrop-blur-xl border border-emerald-500/20 rounded-[3rem] p-12 shadow-2xl relative z-10 animate-in fade-in zoom-in duration-700">
        <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
          <CheckCircle2 size={48} />
        </div>

        <h1 className="text-4xl font-black mb-4">Payment Successful!</h1>
        <p className="text-neutral-400 font-medium mb-12">Your tickets have been confirmed. We&apos;ve sent a copy to your email.</p>

        {/* Order Details Summary */}
        <div className="bg-neutral-950/50 rounded-3xl p-8 border border-white/5 text-left space-y-6 mb-12">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-white text-lg">Global Tech Summit 2026</h3>
              <div className="flex items-center gap-2 text-neutral-500 text-xs mt-1">
                <Calendar size={14} /> May 12-14, 2026
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">Confirmed</span>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 space-y-3">
             <div className="flex justify-between text-sm">
               <span className="text-neutral-500">Order ID</span>
               <span className="text-neutral-300 font-mono font-bold">ORD-55291-TX</span>
             </div>
             <div className="flex justify-between text-sm">
               <span className="text-neutral-500">Tickets</span>
               <span className="text-neutral-300 font-bold">2 x VIP Access</span>
             </div>
             <div className="flex justify-between text-sm">
               <span className="text-neutral-500">Total Paid</span>
               <span className="text-white font-black">$598.00</span>
             </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
           <Link href="/dashboard" className="flex-1 bg-white text-black py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all">
             View in Dashboard <ArrowRight size={18} />
           </Link>
           <button className="flex-1 bg-white/5 hover:bg-white/10 text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 border border-white/5 transition-all">
             <Download size={18} /> Download Ticket
           </button>
        </div>
      </div>

      <Link href="/" className="mt-12 text-neutral-500 hover:text-white transition-colors text-sm font-bold">
        Back to Homepage
      </Link>
    </div>
  );
}
