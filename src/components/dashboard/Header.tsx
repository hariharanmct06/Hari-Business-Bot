'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Crown, 
  LogOut, 
  Globe, 
  User as UserIcon,
  Sparkles,
  Bot,
  Sun,
  Moon,
  Zap
} from 'lucide-react';
import { useApp } from '@/lib/store';

export const Header: React.FC = () => {
  const { user, logout, openPlanActivationModal, theme, toggleTheme } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-[#090d16]/90 backdrop-blur-md border-b border-gray-800/80 px-4 sm:px-6 py-3.5 flex items-center justify-between">
      {/* Mobile Brand Title & Greeting */}
      <div className="flex items-center gap-3">
        <div className="lg:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 overflow-hidden flex items-center justify-center">
            <img src="/logo.png" alt="Hari Bot Logo" className="w-full h-full object-cover rounded-lg" />
          </div>
          <span className="font-extrabold text-sm text-white">HARI BOT</span>
        </div>

        <div className="hidden sm:block">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            Good morning 👋
          </h2>
          <p className="text-xs text-gray-400">
            {user?.profile?.name ? `${user.profile.name} • ${user.profile.type}` : 'What would you like to create today?'}
          </p>
        </div>
      </div>

      {/* Right Side User Profile & Actions */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-amber-400 border border-gray-700/50 transition-all flex items-center justify-center"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
        </button>

        <div className="hidden md:flex items-center gap-2 text-xs bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-lg text-gray-300">
          <Globe className="w-3.5 h-3.5 text-indigo-400" />
          <span>{user?.profile?.preferredLanguage || 'Tamil + English'}</span>
        </div>

        {user?.plan === 'pro_business' ? (
          <span className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-300 font-extrabold flex items-center gap-1.5">
            <Crown className="w-3.5 h-3.5 text-amber-400" /> PRO BUSINESS ♾️
          </span>
        ) : user?.plan === 'growth' ? (
          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-extrabold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> GROWTH (500)
            </span>
            <button
              onClick={() => openPlanActivationModal('pro_business')}
              className="flex items-center gap-1.5 text-xs font-extrabold px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white shadow-md transition-all hover:scale-105"
            >
              <Crown className="w-3.5 h-3.5" />
              Upgrade to Pro
            </button>
          </div>
        ) : user?.plan === 'starter' ? (
          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 font-extrabold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-blue-400" /> STARTER (200)
            </span>
            <button
              onClick={() => openPlanActivationModal('growth')}
              className="flex items-center gap-1.5 text-xs font-extrabold px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white shadow-md transition-all hover:scale-105"
            >
              <Crown className="w-3.5 h-3.5" />
              Upgrade
            </button>
          </div>
        ) : (
          <button
            onClick={() => openPlanActivationModal()}
            className="flex items-center gap-1.5 text-xs font-extrabold px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white shadow-md shadow-orange-500/25 transition-all hover:scale-105"
          >
            <Crown className="w-3.5 h-3.5" />
            Upgrade Plan
          </button>
        )}

        <div className="flex items-center gap-2 border-l border-gray-800 pl-3">
          <Link
            href="/dashboard/settings"
            className="w-9 h-9 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-indigo-400 hover:text-white hover:bg-gray-700 transition-colors"
            title="Business Profile Settings"
          >
            <UserIcon className="w-4 h-4" />
          </Link>

          <button
            onClick={logout}
            className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
