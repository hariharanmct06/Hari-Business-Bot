'use client';

import React from 'react';
import Link from 'next/link';
import { Bot, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#070a11] border-t border-gray-800/80 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center overflow-hidden">
            <img src="/logo.png" alt="Hari Bot Logo" className="w-full h-full object-cover rounded-lg" />
          </div>
          <div>
            <span className="font-bold text-white tracking-tight">HARI BUSINESS BOT</span>
            <span className="text-xs text-gray-500 block">Your AI Marketing Partner.</span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="/login" className="hover:text-white transition-colors">Login</Link>
          <Link href="/onboarding" className="hover:text-white transition-colors">Business Setup</Link>
        </div>

        <div className="text-xs text-gray-500 flex items-center gap-1">
          Built with <Heart className="w-3.5 h-3.5 text-pink-500 inline fill-pink-500" /> for Indian Local Businesses. Tamil + English Supported.
        </div>
      </div>
    </footer>
  );
};
