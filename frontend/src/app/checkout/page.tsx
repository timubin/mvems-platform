"use client";

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { CreditCard, Lock, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import apiClient from '@/lib/api-client';
import { DEMO_EVENTS } from '@/lib/demo-data';

interface CheckoutEvent {
  id: string;
  title: string;
  coverImage?: string;
  location?: string;
  venueName?: string;
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');
  const router = useRouter();
  
  const [event, setEvent] = useState<CheckoutEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const fetchEventDetails = useCallback(async () => {
    if (!eventId) {
      setLoading(false);
      return;
    }
    try {
      const response = await apiClient.get<CheckoutEvent[]>(`/events`);
      // For demo, find the matching event or use first one
      const found = response.data.find((e) => e.id === eventId) || response.data[0];
      setEvent(found || DEMO_EVENTS[0]);
    } catch (error) {
      console.error('Error fetching event details:', error);
      const found = DEMO_EVENTS.find((e) => e.id === eventId) || DEMO_EVENTS[0];
      setEvent(found);
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    const init = async () => {
      await fetchEventDetails();
    };
    init();
  }, [fetchEventDetails]);

  const handlePayment = () => {
    setProcessing(true);
    // Simulate payment gateway delay
    setTimeout(() => {
      router.push('/checkout/success');
    }, 2000);
  };

  if (loading) {
    return <div className="h-screen bg-neutral-950 flex items-center justify-center"><Loader2 className="animate-spin text-indigo-500" size={48} /></div>;
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-indigo-500/30 p-6 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <Link href="/events" className="text-indigo-400 hover:text-indigo-300 text-sm font-bold mb-8 inline-flex items-center gap-2 transition-all">
          <ArrowRight size={16} className="rotate-180" /> Back to Events
        </Link>
        
        <h1 className="text-4xl font-black tracking-tight mb-12">Secure Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-neutral-900/60 border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-xl shadow-2xl">
              <h2 className="text-xl font-bold mb-8 text-white flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-600/20 text-indigo-400 rounded-lg flex items-center justify-center text-xs font-black">01</div>
                Contact Information
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-neutral-500 ml-1">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-neutral-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-neutral-500 ml-1">Phone</label>
                  <input type="text" placeholder="+1 234 567 890" className="w-full bg-neutral-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all" />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-neutral-500 ml-1">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-neutral-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all" />
                </div>
              </div>
            </div>

            <div className="bg-neutral-900/60 border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-neutral-500"><Lock size={64} className="opacity-[0.03]" /></div>
              <h2 className="text-xl font-bold mb-8 flex items-center gap-3 text-white">
                <div className="w-8 h-8 bg-emerald-600/20 text-emerald-400 rounded-lg flex items-center justify-center text-xs font-black">02</div>
                Payment Method
              </h2>
              
              <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-neutral-500 ml-1">Card Number</label>
                  <div className="relative">
                    <CreditCard className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-neutral-950 border border-white/10 rounded-2xl pl-16 pr-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-mono tracking-widest" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-neutral-500 ml-1">Expiry Date</label>
                    <input type="text" placeholder="MM/YY" className="w-full bg-neutral-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-mono tracking-widest" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-neutral-500 ml-1">CVC</label>
                    <input type="text" placeholder="123" className="w-full bg-neutral-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-mono tracking-widest" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-neutral-900/40 border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-xl sticky top-8 shadow-2xl">
              <h2 className="text-xl font-bold mb-8 text-white">Order Summary</h2>
              
              <div className="flex gap-6 pb-8 border-b border-white/5">
                <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10">
                  <img src={event?.coverImage || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80"} alt="Event" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg leading-tight mb-2">{event?.title || "Event Tickets"}</h3>
                  <p className="text-sm text-neutral-500 font-medium">{event?.location || event?.venueName || "Global Event"}</p>
                </div>
              </div>

              <div className="py-8 space-y-4 border-b border-white/5">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-neutral-400">VIP Access x 1</span>
                  <span className="text-white">$299.00</span>
                </div>
                <div className="pt-4 flex gap-2">
                  <input type="text" placeholder="Promo code" className="flex-1 bg-neutral-950 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                  <button className="bg-white/5 hover:bg-white/10 text-white px-6 rounded-xl text-xs font-black uppercase tracking-widest transition-colors border border-white/10">
                    Apply
                  </button>
                </div>
              </div>

              <div className="py-8 space-y-4 text-sm">
                <div className="flex justify-between font-bold">
                  <span className="text-neutral-500">Subtotal</span>
                  <span className="text-white">$299.00</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-neutral-500">Service Fee</span>
                  <span className="text-white">$0.00</span>
                </div>
              </div>

              <div className="pt-8 mb-10">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold text-neutral-300">Total Due</span>
                  <span className="text-5xl font-black text-indigo-400 tracking-tighter">$299.00</span>
                </div>
              </div>

              <button 
                onClick={handlePayment}
                disabled={processing}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-5 rounded-[2rem] font-black text-lg shadow-[0_0_40px_rgba(79,70,229,0.3)] flex items-center justify-center gap-3 transition-all hover:-translate-y-1 disabled:opacity-50"
              >
                {processing ? <Loader2 className="animate-spin" size={24} /> : <><Lock size={20} /> Pay $299.00</>}
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-600">
                <CheckCircle2 size={12} className="text-emerald-500" /> Secure SSL Encrypted
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-neutral-950 flex items-center justify-center"><Loader2 className="animate-spin text-indigo-500" size={48} /></div>}>
      <CheckoutContent />
    </Suspense>
  );
}
