import React from 'react';
import { Search, HelpCircle, MessageCircle, FileText, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HelpPage() {
  const faqs = [
    { q: 'How do I create my first event?', a: 'Go to your Dashboard, click "Create Event", and fill in the basic details. Once published, it will appear on the discovery page.' },
    { q: 'What payment methods are supported?', a: 'We currently support Stripe and SSLCommerz, which allow for Credit/Debit cards, mobile wallets, and more.' },
    { q: 'Can I manage multiple vendors?', a: 'Yes! The Enterprise plan allows you to invite vendors who can apply for booth spaces directly.' },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-indigo-500/30">
      {/* Hero Header */}
      <div className="pt-20 pb-32 px-6 text-center bg-gradient-to-b from-indigo-600/10 to-transparent border-b border-white/5">
        <Link href="/" className="inline-flex items-center gap-2 text-indigo-400 mb-12 font-bold text-sm hover:-translate-x-1 transition-transform">
          <ArrowLeft size={16} /> Home
        </Link>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-8">How can we help?</h1>
        <div className="max-w-2xl mx-auto relative">
          <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input type="text" placeholder="Search for articles, guides, or troubleshooting..." className="w-full bg-neutral-900 border border-white/10 rounded-[2rem] py-5 pl-14 pr-6 text-white text-lg focus:outline-none focus:border-indigo-500 transition-all shadow-2xl" />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-24">
        {/* Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <div className="p-10 rounded-[2.5rem] bg-neutral-900/50 border border-white/5 hover:border-white/10 transition-all group">
             <div className="p-4 bg-indigo-600/10 text-indigo-400 w-fit rounded-2xl mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all">
               <FileText size={28} />
             </div>
             <h3 className="text-2xl font-bold mb-4">User Guides</h3>
             <p className="text-neutral-500 mb-8 font-medium">Step-by-step instructions for organizers and attendees.</p>
             <button className="text-indigo-400 font-bold flex items-center gap-2 hover:gap-3 transition-all">Browse Guides <ArrowRight size={18}/></button>
          </div>
          <div className="p-10 rounded-[2.5rem] bg-neutral-900/50 border border-white/5 hover:border-white/10 transition-all group">
             <div className="p-4 bg-emerald-600/10 text-emerald-400 w-fit rounded-2xl mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-all">
               <HelpCircle size={28} />
             </div>
             <h3 className="text-2xl font-bold mb-4">FAQ</h3>
             <p className="text-neutral-500 mb-8 font-medium">Quick answers to the most commonly asked questions.</p>
             <button className="text-emerald-400 font-bold flex items-center gap-2 hover:gap-3 transition-all">View FAQ <ArrowRight size={18}/></button>
          </div>
          <div className="p-10 rounded-[2.5rem] bg-neutral-900/50 border border-white/5 hover:border-white/10 transition-all group">
             <div className="p-4 bg-purple-600/10 text-purple-400 w-fit rounded-2xl mb-8 group-hover:bg-purple-600 group-hover:text-white transition-all">
               <MessageCircle size={28} />
             </div>
             <h3 className="text-2xl font-bold mb-4">Contact Support</h3>
             <p className="text-neutral-500 mb-8 font-medium">Still need help? Talk to our dedicated support team.</p>
             <button className="text-purple-400 font-bold flex items-center gap-2 hover:gap-3 transition-all">Start Chat <ArrowRight size={18}/></button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto space-y-8">
           <h2 className="text-3xl font-bold text-center mb-16">Frequently Asked Questions</h2>
           {faqs.map((faq, i) => (
             <div key={i} className="p-8 rounded-3xl bg-neutral-900/30 border border-white/5 hover:bg-neutral-900/50 transition-all">
                <h4 className="text-lg font-bold mb-4 text-white">{faq.q}</h4>
                <p className="text-neutral-500 leading-relaxed font-medium">{faq.a}</p>
             </div>
           ))}
        </div>
      </main>

      <footer className="py-20 text-center border-t border-white/5 mt-20">
         <p className="text-neutral-600 font-medium">© 2026 MVEMS Platform Support Center</p>
      </footer>
    </div>
  );
}
