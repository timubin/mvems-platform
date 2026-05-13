import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const tiers = [
    {
      name: 'Starter',
      price: 'Free',
      desc: 'Perfect for small local meetups and community events.',
      features: ['Up to 50 Attendees', 'Standard QR Ticketing', 'Basic Analytics', 'Community Support'],
      cta: 'Start for Free',
      highlighted: false
    },
    {
      name: 'Pro',
      price: '$49',
      desc: 'Best for professional organizers and corporate workshops.',
      features: ['Unlimited Attendees', 'Real-time Seat Booking', 'Stripe Integration', 'Custom Branding', 'Email Notifications', 'Priority Support'],
      cta: 'Get Started',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      desc: 'Complete multivendor ecosystem for global tech summits.',
      features: ['Multiple Organizers', 'Vendor Booth Hub', 'Lead Retrieval System', 'Interactive Venue Maps', 'White-labeling', 'Dedicated Account Manager'],
      cta: 'Contact Sales',
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-indigo-500/30">
      {/* Nav */}
      <nav className="p-8">
        <Link href="/" className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
          MVEMS
        </Link>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="space-y-6 mb-20">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">Simple, Transparent <br/> <span className="text-neutral-500">Pricing for Everyone.</span></h1>
          <p className="text-neutral-400 text-xl max-w-2xl mx-auto">Scale your events from 10 to 100,000 attendees with our flexible plans.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div key={tier.name} className={`relative p-10 rounded-[2.5rem] border transition-all ${
              tier.highlighted 
                ? 'bg-indigo-600 border-indigo-500 shadow-[0_0_50px_rgba(79,70,229,0.3)] scale-105 z-10' 
                : 'bg-neutral-900/50 border-white/5 hover:border-white/10'
            }`}>
              {tier.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-indigo-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <div className="flex items-baseline justify-center gap-1 mb-4">
                <span className="text-5xl font-black">{tier.price}</span>
                {tier.price !== 'Free' && tier.price !== 'Custom' && <span className="text-neutral-400 font-bold">/event</span>}
              </div>
              <p className={`text-sm mb-10 ${tier.highlighted ? 'text-indigo-100' : 'text-neutral-500'}`}>{tier.desc}</p>

              <div className="space-y-4 mb-12 text-left">
                {tier.features.map((f) => (
                  <div key={f} className="flex items-center gap-3 text-sm font-medium">
                    <div className={`p-1 rounded-full ${tier.highlighted ? 'bg-white/20' : 'bg-indigo-500/10 text-indigo-400'}`}>
                      <Check size={12} />
                    </div>
                    {f}
                  </div>
                ))}
              </div>

              <Link href="/register" className={`w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all ${
                tier.highlighted 
                  ? 'bg-white text-indigo-600 hover:bg-neutral-100' 
                  : 'bg-neutral-800 text-white hover:bg-neutral-700'
              }`}>
                {tier.cta} <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
