import React from 'react';
import { CreditCard, Lock, ArrowRight, Tag } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-indigo-500/30 p-6 md:p-12 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <Link href="/events" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium mb-8 inline-block transition-colors">
          &larr; Back to Events
        </Link>
        
        <h1 className="text-3xl font-bold tracking-tight mb-8">Secure Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Payment Details */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-neutral-900/60 border border-white/5 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
              <h2 className="text-xl font-semibold mb-6 text-white">Contact Information</h2>
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-400">First Name</label>
                  <input type="text" defaultValue="Alex" className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-400">Last Name</label>
                  <input type="text" defaultValue="Johnson" className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-medium text-neutral-400">Email Address</label>
                  <input type="email" defaultValue="alex@example.com" className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                </div>
              </div>
            </div>

            <div className="bg-neutral-900/60 border border-white/5 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-neutral-500"><Lock size={64} className="opacity-[0.03]" /></div>
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
                <CreditCard size={20} className="text-indigo-400"/> Payment Method
              </h2>
              
              <div className="space-y-5 relative z-10">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-400">Card Number</label>
                  <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors font-mono tracking-widest" />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-400">Expiry Date</label>
                    <input type="text" placeholder="MM/YY" className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors font-mono tracking-widest" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-400">CVC</label>
                    <input type="text" placeholder="123" className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors font-mono tracking-widest" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-3xl p-8 backdrop-blur-xl sticky top-8 shadow-2xl">
              <h2 className="text-xl font-semibold mb-6 text-white">Order Summary</h2>
              
              <div className="flex gap-4 pb-6 border-b border-indigo-500/20">
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                  <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80" alt="Event" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold text-white leading-tight text-lg">Global Tech Summit 2026</h3>
                  <p className="text-sm text-indigo-300 mt-1">Oct 15 - 17, San Francisco</p>
                </div>
              </div>

              <div className="py-6 space-y-4 border-b border-indigo-500/20">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-300 font-medium">VIP Pass x 1</span>
                  <span className="font-semibold text-white">$599.00</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-300 font-medium">Standard Pass x 2</span>
                  <span className="font-semibold text-white">$598.00</span>
                </div>
                
                {/* Coupon Input */}
                <div className="pt-4 flex gap-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                      <Tag size={14} className="text-indigo-400" />
                    </div>
                    <input type="text" placeholder="Promo code" className="w-full bg-neutral-950/50 border border-indigo-500/30 rounded-lg py-2.5 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                  </div>
                  <button className="bg-indigo-500/20 hover:bg-indigo-500/40 text-indigo-300 px-5 rounded-lg text-sm font-semibold transition-colors border border-indigo-500/30">
                    Apply
                  </button>
                </div>
              </div>

              <div className="py-6 space-y-3 border-b border-indigo-500/20 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-400 font-medium">Subtotal</span>
                  <span className="text-white">$1,197.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400 font-medium">Taxes & Fees (15%)</span>
                  <span className="text-white">$179.55</span>
                </div>
              </div>

              <div className="pt-6 pb-8">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-medium text-neutral-300">Total Due</span>
                  <span className="text-4xl font-bold text-white tracking-tight">$1,376.55</span>
                </div>
              </div>

              <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-xl font-bold text-lg shadow-[0_0_30px_rgba(79,70,229,0.4)] flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5">
                <Lock size={18} /> Pay $1,376.55
              </button>
              
              <p className="text-center text-xs text-neutral-400 mt-5 flex justify-center items-center gap-1.5 font-medium">
                <Lock size={12} className="text-indigo-400" /> Payments are 256-bit encrypted and secure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
