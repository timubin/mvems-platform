"use client";

import React, { useState } from 'react';
import { Plus, Calendar, MapPin, Image as ImageIcon, Save, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import apiClient from '@/lib/api-client';
import { useRouter } from 'next/navigation';

export default function CreateEventPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    category: 'Technology',
    slug: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Auto-generate slug if empty
      const eventData = {
        ...formData,
        slug: formData.slug || formData.title.toLowerCase().replace(/ /g, '-'),
        organizerId: "demo-organizer-id" // In real app, from user state
      };

      await apiClient.post('/events', eventData);
      setSuccess(true);
      setTimeout(() => router.push('/dashboard/my-events'), 1500);
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event. Make sure the Backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <Link href="/dashboard/my-events" className="flex items-center gap-2 text-neutral-500 hover:text-indigo-400 transition-colors font-bold text-sm">
        <ArrowLeft size={16} /> Back to Events
      </Link>

      <header>
        <h1 className="text-4xl font-black tracking-tight text-white">Create New Event</h1>
        <p className="text-neutral-400 mt-2 font-medium">Fill in the details to launch your next big experience.</p>
      </header>

      {success ? (
        <div className="text-center py-32 bg-neutral-900/40 border border-emerald-500/20 rounded-[3rem] space-y-4 animate-in fade-in zoom-in duration-500">
           <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
             <CheckCircle2 size={40} />
           </div>
           <h2 className="text-3xl font-bold text-white">Event Created Successfully!</h2>
           <p className="text-neutral-400">Redirecting to your event list...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Details */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-neutral-900/60 backdrop-blur-sm border border-white/5 rounded-[2.5rem] p-10 space-y-6 shadow-2xl">
              <div className="space-y-2">
                <label className="text-sm font-bold text-neutral-400 ml-1">Event Title</label>
                <input 
                  type="text" 
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g. Global Tech Summit 2026" 
                  className="w-full bg-neutral-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all text-lg font-medium" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-neutral-400 ml-1">Description</label>
                <textarea 
                  rows={6}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Tell your attendees what this event is about..." 
                  className="w-full bg-neutral-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all resize-none" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-neutral-400 ml-1">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                    <input 
                      type="text" 
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="Venue or Virtual link" 
                      className="w-full bg-neutral-950 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-neutral-400 ml-1">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-indigo-500 appearance-none font-bold"
                  >
                    <option>Technology</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Blockchain</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-neutral-900/60 backdrop-blur-sm border border-white/5 rounded-[2.5rem] p-10 space-y-6 shadow-2xl">
              <h3 className="text-xl font-bold flex items-center gap-2"><Calendar size={20} className="text-indigo-400" /> Date & Time</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-neutral-400 ml-1">Start Date</label>
                   <input 
                    type="datetime-local" 
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500" 
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-neutral-400 ml-1">End Date</label>
                   <input 
                    type="datetime-local" 
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500" 
                   />
                 </div>
              </div>
            </div>
          </div>

          {/* Sidebar: Image & Action */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-neutral-900/60 backdrop-blur-sm border border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
               <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><ImageIcon size={18} className="text-indigo-400" /> Event Cover</h3>
               <div className="aspect-square bg-neutral-950 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-neutral-600 hover:border-indigo-500/50 transition-colors cursor-pointer group">
                  <Plus size={32} className="group-hover:text-indigo-400 transition-colors" />
                  <span className="text-sm font-bold mt-2">Upload Image</span>
               </div>
               <p className="text-[10px] text-neutral-500 mt-4 text-center font-bold uppercase tracking-widest">Recommended: 1200x800px (JPG/PNG)</p>
            </div>

            <div className="space-y-4">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white py-5 rounded-[2rem] font-black text-lg shadow-[0_0_30px_rgba(79,70,229,0.3)] flex items-center justify-center gap-2 transition-all hover:-translate-y-1"
              >
                {loading ? <Loader2 className="animate-spin" size={24} /> : <><Save size={20} /> Publish Event</>}
              </button>
              <button type="button" className="w-full bg-neutral-900 border border-white/10 text-white py-4 rounded-[2rem] font-bold text-sm hover:bg-neutral-800 transition-all">
                Save as Draft
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
