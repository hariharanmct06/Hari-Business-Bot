'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Bot, ArrowRight, ShieldCheck, Sun, Moon } from 'lucide-react';
import { useApp } from '@/lib/store';

export const Navbar: React.FC = () => {
  const { user, theme, toggleTheme } = useApp();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#090d16]/80 border-b border-gray-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform overflow-hidden">
            <img src="/logo.png" alt="Hari Bot Logo" className="w-full h-full object-cover rounded-[10px]" />
          </div>
          <div>
            <div className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
              HARI BUSINESS BOT
              <span className="text-xs bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded-full font-medium">AI</span>
            </div>
            <p className="text-[11px] text-gray-400 tracking-wide font-medium">Your AI Marketing Partner.</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link href="/#features" className="hover:text-indigo-400 transition-colors">
            Features
          </Link>
          <Link href="/#how-it-works" className="hover:text-indigo-400 transition-colors">
            How It Works
          </Link>
          <Link href="/#pricing" className="hover:text-indigo-400 transition-colors">
            Pricing
          </Link>
          <Link href="/admin" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-xs border border-gray-700/50 rounded-full px-2.5 py-1 bg-gray-800/40">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> Admin
          </Link>
        </nav>

        {/* Action Buttons & Theme Switcher */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-amber-400 border border-gray-700/50 transition-all flex items-center justify-center"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>
          {user ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:opacity-95 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4" /> Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-gray-300 hover:text-white font-medium text-sm px-4 py-2 rounded-lg hover:bg-gray-800/50 transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:bg-indigo-500 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Start Creating <ArrowRight className="w-4 h-4" />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
