'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-gray-950/80 via-[#070a11] to-[#04060a] border-t border-indigo-500/20 text-gray-400 py-8 sm:py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 sm:w-1/2 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
      
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-5 sm:space-y-6">
        {/* Brand Logo & Name */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="flex items-center justify-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center overflow-hidden shrink-0 shadow-lg shadow-indigo-500/10">
              <img src="/logo.png" alt="Hari Bot Logo" className="w-full h-full object-cover rounded-lg" />
            </div>
            <span className="font-extrabold text-white text-base sm:text-lg tracking-wider">
              HARI BUSINESS BOT
            </span>
          </div>

          {/* Main Branding Text - Exact required text and capitalization */}
          <p className="text-xs sm:text-sm max-w-xs sm:max-w-md leading-relaxed px-2">
            <span className="text-gray-400 font-normal">Built by </span>
            <span className="text-white font-bold tracking-tight">Hari bot &amp; Business Solutions</span>
          </p>

          {/* Subtitle */}
          <span className="text-[10px] sm:text-xs text-indigo-400/90 font-semibold tracking-widest uppercase">
            AI Marketing Partner
          </span>
        </div>

        {/* Minimal Touch-Friendly Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-4 text-xs">
          <Link 
            href="/#features" 
            className="min-h-[44px] min-w-[44px] px-3 flex items-center justify-center text-gray-400 hover:text-white transition-colors touch-feedback"
          >
            Features
          </Link>
          <span className="text-gray-700 hidden sm:inline">•</span>
          <Link 
            href="/#pricing" 
            className="min-h-[44px] min-w-[44px] px-3 flex items-center justify-center text-gray-400 hover:text-white transition-colors touch-feedback"
          >
            Pricing
          </Link>
          <span className="text-gray-700 hidden sm:inline">•</span>
          <Link 
            href="/login" 
            className="min-h-[44px] min-w-[44px] px-3 flex items-center justify-center text-gray-400 hover:text-white transition-colors touch-feedback"
          >
            Login
          </Link>
          <span className="text-gray-700 hidden sm:inline">•</span>
          <Link 
            href="/onboarding" 
            className="min-h-[44px] min-w-[44px] px-3 flex items-center justify-center text-gray-400 hover:text-white transition-colors touch-feedback"
          >
            Business Setup
          </Link>
        </div>

        {/* Copyright / Footer Note */}
        <div className="pt-2 border-t border-gray-800/40 w-full max-w-xs sm:max-w-sm">
          <p className="text-[10px] sm:text-xs text-gray-500">
            © {new Date().getFullYear()} Hari bot &amp; Business Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

