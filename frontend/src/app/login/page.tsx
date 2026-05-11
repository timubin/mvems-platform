import React from 'react';
import { Mail, Lock, ArrowRight, User } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 mb-2">
            MVEMS
          </Link>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Welcome back</h1>
          <p className="text-sm text-neutral-400 mt-2">Enter your details to sign in to your account</p>
        </div>

        {/* Form Card */}
        <div className="bg-neutral-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <form className="space-y-6">
            <div className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300 ml-1">Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-indigo-400 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    placeholder="name@example.com"
                    className="w-full bg-neutral-950/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-sm font-medium text-neutral-300">Password</label>
                  <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Forgot password?</a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-indigo-400 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-neutral-950/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>
            </div>

            <button type="button" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl py-3.5 font-medium transition-all transform hover:-translate-y-0.5 shadow-[0_0_20px_rgba(79,70,229,0.3)] flex items-center justify-center gap-2">
              Sign In <ArrowRight size={18} />
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-xs text-neutral-500 font-medium">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          <div className="mt-6 flex gap-4">
            <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/5 text-white py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
              Google
            </button>
            <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/5 text-white py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
              GitHub
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-neutral-500 mt-8">
          Don't have an account? <a href="#" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">Sign up</a>
        </p>
      </div>
    </div>
  );
}
