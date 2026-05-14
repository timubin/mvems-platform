"use client";

import React, { useState } from 'react';
import { 
  User, Bell, Shield, 
  Globe, CreditCard, Save,
  Eye, EyeOff, CheckCircle2,
  Lock, Mail, Phone, Moon,
  Sun, Monitor
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold text-white tracking-tight">Account Settings</h1>
        <p className="text-neutral-500 mt-1 font-medium">Manage your profile, security, and notification preferences.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Sidebar Nav */}
        <nav className="lg:col-span-3 space-y-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-sm ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                    : 'text-neutral-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Content Area */}
        <div className="lg:col-span-9">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-neutral-900/60 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl"
          >
            {activeTab === 'profile' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-1 h-6 bg-indigo-500 rounded-full" />
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
                        <input 
                          type="text" 
                          defaultValue="Demo Administrator"
                          className="w-full bg-neutral-950 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
                        <input 
                          type="email" 
                          defaultValue="admin@mvems.com"
                          className="w-full bg-neutral-950 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
                        <input 
                          type="tel" 
                          placeholder="+1 (555) 000-0000"
                          className="w-full bg-neutral-950 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Language</label>
                      <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
                        <select className="w-full bg-neutral-950 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 appearance-none transition-colors">
                          <option>English (US)</option>
                          <option>Bengali</option>
                          <option>Spanish</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-1 h-6 bg-indigo-500 rounded-full" />
                    Appearance Preference
                  </h2>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: 'dark', label: 'Dark', icon: Moon },
                      { id: 'light', label: 'Light', icon: Sun },
                      { id: 'system', label: 'System', icon: Monitor },
                    ].map((mode) => (
                      <button 
                        key={mode.id}
                        className={`p-6 rounded-2xl border flex flex-col items-center gap-3 transition-all ${
                          mode.id === 'dark' 
                            ? 'border-indigo-500 bg-indigo-500/10 text-white' 
                            : 'border-white/5 bg-neutral-950 text-neutral-500 hover:border-white/20'
                        }`}
                      >
                        <mode.icon size={24} />
                        <span className="text-xs font-bold uppercase tracking-widest">{mode.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-8">
                  <button className="flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20">
                    <Save size={18} /> Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-1 h-6 bg-indigo-500 rounded-full" />
                    Password & Security
                  </h2>
                  <div className="space-y-6 max-w-md">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Current Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
                        <input 
                          type={showPassword ? 'text' : 'password'}
                          className="w-full bg-neutral-950 border border-white/10 rounded-xl py-3.5 pl-12 pr-12 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                        <button 
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-white"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
                        <input 
                          type={showPassword ? 'text' : 'password'}
                          className="w-full bg-neutral-950 border border-white/10 rounded-xl py-3.5 pl-12 pr-12 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                      </div>
                    </div>
                    <button className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl text-sm font-bold hover:bg-white/10 transition-all">
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white">Two-Factor Authentication</h4>
                      <p className="text-sm text-neutral-500">Add an extra layer of security to your account.</p>
                    </div>
                    <button className="px-6 py-2.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-bold uppercase tracking-widest">
                      Enable
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-1 h-6 bg-indigo-500 rounded-full" />
                  Email Notifications
                </h2>
                <div className="space-y-6">
                  {[
                    { id: 'notif-1', title: 'New Ticket Sales', desc: 'Get notified whenever someone purchases a ticket for your events.', default: true },
                    { id: 'notif-2', title: 'Event Reminders', desc: 'Receive reminders 24 hours before your scheduled events.', default: true },
                    { id: 'notif-3', title: 'Platform Updates', desc: 'Stay informed about new features and major platform improvements.', default: false },
                  ].map((notif) => (
                    <div key={notif.id} className="flex items-center justify-between py-2">
                      <div className="space-y-1">
                        <p className="font-bold text-white">{notif.title}</p>
                        <p className="text-sm text-neutral-500">{notif.desc}</p>
                      </div>
                      <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${notif.default ? 'bg-indigo-600' : 'bg-neutral-800'}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${notif.default ? 'right-1' : 'left-1'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-1 h-6 bg-indigo-500 rounded-full" />
                  Subscription Plan
                </h2>
                <div className="p-8 rounded-3xl bg-indigo-600/10 border border-indigo-500/20 flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="space-y-2">
                    <span className="px-3 py-1 bg-indigo-500 text-white text-[10px] font-bold rounded-full uppercase tracking-widest">Current Plan</span>
                    <h3 className="text-3xl font-black text-white">Enterprise Elite</h3>
                    <p className="text-sm text-neutral-400 font-medium">Billed annually • Next renewal Sept 15, 2026</p>
                  </div>
                  <button className="px-8 py-3.5 bg-white text-black rounded-xl font-bold hover:bg-neutral-200 transition-all">
                    Manage Subscription
                  </button>
                </div>

                <div className="space-y-6">
                  <h4 className="text-lg font-bold text-white">Payment Methods</h4>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-neutral-800 rounded-md border border-white/10 flex items-center justify-center font-bold italic text-white">VISA</div>
                      <div>
                        <p className="font-bold text-white">•••• •••• •••• 4242</p>
                        <p className="text-xs text-neutral-500 font-medium">Expires 12/28</p>
                      </div>
                    </div>
                    <button className="text-xs font-bold text-neutral-500 hover:text-white uppercase tracking-widest">Edit</button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
          
          <div className="mt-8 flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest px-4">
            <CheckCircle2 size={16} /> All changes are automatically synced to our secure cloud.
          </div>
        </div>

      </div>
    </div>
  );
}
