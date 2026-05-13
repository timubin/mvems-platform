"use client";

import React, { useEffect, useState } from 'react';
import { User, Mail, Shield, ShieldCheck, MapPin, Phone, Camera, Save, Loader2 } from 'lucide-react';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  if (loading || !user) {
    return <div className="flex items-center justify-center h-96"><Loader2 className="animate-spin text-indigo-500" /></div>;
  }

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-black tracking-tight text-white">My Profile</h1>
        <p className="text-neutral-400 mt-2 font-medium">Manage your personal information and account security.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Profile Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-neutral-900/60 backdrop-blur-sm border border-white/5 rounded-[2.5rem] p-10 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-indigo-600 to-cyan-600 opacity-20" />
            
            <div className="relative mt-4">
              <div className="w-32 h-32 rounded-full border-4 border-neutral-950 bg-neutral-900 mx-auto overflow-hidden relative group cursor-pointer">
                <img 
                  src={`https://ui-avatars.com/api/?name=${user.fullName}&background=4f46e5&color=fff&size=200`} 
                  alt="Avatar" 
                  className="w-full h-full object-cover group-hover:opacity-50 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera size={24} className="text-white" />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-2xl font-bold text-white">{user.fullName}</h2>
              <p className="text-indigo-400 text-sm font-bold uppercase tracking-widest mt-1">{user.role}</p>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 space-y-4 text-left">
              <div className="flex items-center gap-3 text-neutral-400 text-sm">
                <Mail size={16} /> {user.email}
              </div>
              <div className="flex items-center gap-3 text-neutral-400 text-sm">
                <ShieldCheck size={16} className="text-emerald-500" /> Identity Verified
              </div>
            </div>
          </div>
        </div>

        {/* Form Details */}
        <div className="lg:col-span-8">
          <div className="bg-neutral-900/60 backdrop-blur-sm border border-white/5 rounded-[2.5rem] p-10 shadow-2xl">
             <h3 className="text-xl font-bold mb-8 border-b border-white/5 pb-4">Personal Details</h3>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                 <label className="text-xs font-black uppercase tracking-widest text-neutral-500 ml-1">Full Name</label>
                 <div className="relative">
                   <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                   <input 
                    type="text" 
                    defaultValue={user.fullName}
                    className="w-full bg-neutral-950 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500" 
                   />
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-black uppercase tracking-widest text-neutral-500 ml-1">Email Address</label>
                 <div className="relative">
                   <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                   <input 
                    type="email" 
                    disabled
                    defaultValue={user.email}
                    className="w-full bg-neutral-950 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-neutral-500 cursor-not-allowed" 
                   />
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-black uppercase tracking-widest text-neutral-500 ml-1">Phone Number</label>
                 <div className="relative">
                   <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                   <input 
                    type="text" 
                    placeholder="+1 234 567 890"
                    className="w-full bg-neutral-950 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500" 
                   />
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-black uppercase tracking-widest text-neutral-500 ml-1">Account Role</label>
                 <div className="relative">
                   <Shield size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                   <input 
                    type="text" 
                    disabled
                    defaultValue={user.role}
                    className="w-full bg-neutral-950 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-neutral-500 cursor-not-allowed font-bold" 
                   />
                 </div>
               </div>
             </div>

             <div className="mt-12 pt-8 border-t border-white/5 flex justify-end">
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2">
                   <Save size={18} /> Save Changes
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
