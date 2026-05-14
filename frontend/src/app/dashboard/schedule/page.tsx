"use client";

import React, { useState } from 'react';
import { 
  Calendar, Clock, MapPin, 
  Trash2, Bell, ExternalLink, 
  CalendarDays, Filter, ChevronRight,
  PlusCircle, Info
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ScheduledSession {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  location: string;
  eventTitle: string;
  type: string;
}

const mockSchedule: ScheduledSession[] = [
  {
    id: '1',
    title: 'Opening Keynote: Future of Web3',
    startTime: '2026-09-15T10:00:00Z',
    endTime: '2026-09-15T11:00:00Z',
    location: 'Main Hall',
    eventTitle: 'Global Tech Summit 2026',
    type: 'KEYNOTE'
  },
  {
    id: '2',
    title: 'Advanced NestJS Patterns',
    startTime: '2026-09-15T13:00:00Z',
    endTime: '2026-09-15T14:30:00Z',
    location: 'Room 204',
    eventTitle: 'Global Tech Summit 2026',
    type: 'WORKSHOP'
  },
  {
    id: '3',
    title: 'AI Ethical Implications',
    startTime: '2026-11-20T11:00:00Z',
    endTime: '2026-11-20T12:00:00Z',
    location: 'Tokyo Hall',
    eventTitle: 'AI & Future Expo',
    type: 'PANEL'
  }
];

export default function AttendeeSchedulePage() {
  const [schedule, setSchedule] = useState<ScheduledSession[]>(mockSchedule);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen bg-neutral-950 p-6 lg:p-10">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-widest">
              <CalendarDays size={14} /> My Personal Agenda
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">Your Schedule</h1>
            <p className="text-neutral-500 max-w-md">Manage your event sessions and never miss a keynote.</p>
          </div>
          
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-white/5 rounded-xl text-sm font-medium text-neutral-400 hover:text-white transition-all">
              <Filter size={16} /> Filter by Event
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-bold text-white transition-all shadow-lg shadow-indigo-500/20">
              <PlusCircle size={16} /> Add Session
            </button>
          </div>
        </header>

        {/* Timeline/List */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 relative"
        >
          {/* Vertical Line */}
          <div className="absolute left-[19px] top-4 bottom-4 w-px bg-gradient-to-b from-indigo-500/50 via-white/5 to-transparent hidden md:block" />

          {schedule.length > 0 ? (
            schedule.map((session) => (
              <motion.div 
                key={session.id} 
                variants={itemVariants}
                className="group relative md:pl-12 flex flex-col md:flex-row gap-6"
              >
                {/* Timeline Dot */}
                <div className="absolute left-[12px] top-6 w-4 h-4 rounded-full bg-neutral-950 border-2 border-indigo-500 hidden md:block group-hover:scale-125 transition-transform" />

                {/* Time Column */}
                <div className="md:w-32 pt-5">
                  <div className="text-sm font-bold text-white">
                    {new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-tighter mt-1">
                    {new Date(session.startTime).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </div>
                </div>

                {/* Content Card */}
                <div className="flex-1 bg-neutral-900/40 backdrop-blur-sm border border-white/5 rounded-3xl p-6 lg:p-8 hover:border-indigo-500/30 transition-all hover:bg-neutral-900/60 shadow-xl">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                          {session.type}
                        </span>
                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                          {session.eventTitle}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {session.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500 font-medium">
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-neutral-600" />
                          <span>45 min</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-neutral-600" />
                          <span>{session.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 md:self-center">
                      <button className="p-3 bg-white/5 border border-white/5 rounded-2xl text-neutral-500 hover:text-white hover:bg-white/10 transition-all">
                        <Bell size={18} />
                      </button>
                      <button className="p-3 bg-white/5 border border-white/5 rounded-2xl text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
                        <Trash2 size={18} />
                      </button>
                      <button className="p-3 bg-white/5 border border-white/5 rounded-2xl text-neutral-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all">
                        <ExternalLink size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-20 text-center bg-white/5 border border-dashed border-white/10 rounded-3xl">
              <Calendar size={48} className="mx-auto text-neutral-700 mb-4" />
              <p className="text-neutral-500 font-medium">No sessions scheduled yet.</p>
              <Link href="/events" className="text-indigo-400 text-sm hover:underline mt-2 inline-block">Explore Events</Link>
            </div>
          )}
        </motion.div>

        {/* Info Box */}
        <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-3xl p-6 flex gap-4 items-start">
          <div className="p-2 bg-indigo-500/20 rounded-xl text-indigo-400">
            <Info size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-1">Schedule Sync</h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Your personal schedule is automatically synced across all your devices. You will receive notifications 15 minutes before each session starts.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
