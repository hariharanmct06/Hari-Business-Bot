'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, ArrowRight, Sun, Moon, Menu, X, Home, Zap, ShieldCheck } from 'lucide-react';
import { useApp } from '@/lib/store';

export const Navbar: React.FC = () => {
  const { user, theme, toggleTheme } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#090d16]/90 border-b border-gray-800/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* LEFT: Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform overflow-hidden shrink-0">
            <img src="/logo.png" alt="Hari Bot Logo" className="w-full h-full object-cover rounded-[10px]" />
          </div>
          <div className="flex flex-col">
            <div className="font-extrabold text-base sm:text-xl tracking-tight text-white flex items-center gap-1.5 leading-tight">
              <span>HARI BUSINESS BOT</span>
              <span className="text-[10px] sm:text-xs bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-full font-medium shrink-0">
                AI
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-gray-400 tracking-wide font-medium hidden xs:block">
              Your AI Marketing Partner.
            </p>
          </div>
        </Link>

        {/* CENTER: Desktop Navigation Links */}
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
        </nav>

        {/* RIGHT: Action Buttons & Mobile Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 sm:w-10 sm:h-10 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-amber-400 border border-gray-700/50 transition-all flex items-center justify-center touch-feedback"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Desktop User CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
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

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-xl bg-gray-800/80 border border-gray-700/60 text-gray-200 flex items-center justify-center touch-feedback focus:outline-none"
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* MOBILE ANIMATED NAVIGATION DRAWER */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[64px] bottom-0 z-50 bg-[#090d16]/95 backdrop-blur-2xl border-t border-gray-800/80 p-5 flex flex-col justify-between overflow-y-auto animate-fade-in">
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-900/40 via-gray-900 to-purple-900/30 border border-indigo-500/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 overflow-hidden">
                <img src="/logo.png" alt="Hari Bot Logo" className="w-full h-full object-cover rounded-xl" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">HARI BUSINESS BOT</h4>
                <p className="text-xs text-gray-400">Tamil + English AI Marketing</p>
              </div>
            </div>

            {/* Mobile Nav Links */}
            <div className="space-y-1 pt-2">
              <Link
                href="/#features"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-xl text-base font-semibold text-gray-200 hover:bg-gray-800/60 transition-colors"
              >
                <span>Features</span>
                <ArrowRight className="w-4 h-4 text-gray-500" />
              </Link>

              <Link
                href="/#how-it-works"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-xl text-base font-semibold text-gray-200 hover:bg-gray-800/60 transition-colors"
              >
                <span>How It Works</span>
                <ArrowRight className="w-4 h-4 text-gray-500" />
              </Link>

              <Link
                href="/#pricing"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-xl text-base font-semibold text-gray-200 hover:bg-gray-800/60 transition-colors"
              >
                <span>Pricing Plans</span>
                <ArrowRight className="w-4 h-4 text-gray-500" />
              </Link>
            </div>
          </div>

          {/* Mobile Bottom User Actions */}
          <div className="space-y-3 pt-6 border-t border-gray-800 pb-safe">
            {user ? (
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/30 touch-feedback"
              >
                <Sparkles className="w-5 h-5 text-white" /> Go to User Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/30 touch-feedback"
                >
                  ✨ Start Creating Free <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full h-12 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 font-bold text-sm flex items-center justify-center touch-feedback"
                >
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
