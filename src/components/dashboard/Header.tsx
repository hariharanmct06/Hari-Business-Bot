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
  Bot
} from 'lucide-react';
import { useApp } from '@/lib/store';

export const Header: React.FC = () => {
  const { user, logout, setShowUpgradeModal } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-[#090d16]/90 backdrop-blur-md border-b border-gray-800/80 px-4 sm:px-6 py-3.5 flex items-center justify-between">
      {/* Mobile Brand Title & Greeting */}
      <div className="flex items-center gap-3">
        <div className="lg:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
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
        <div className="hidden md:flex items-center gap-2 text-xs bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-lg text-gray-300">
          <Globe className="w-3.5 h-3.5 text-indigo-400" />
          <span>{user?.profile?.preferredLanguage || 'Tamil + English'}</span>
        </div>

        {user?.plan === 'free' ? (
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/20 hover:scale-105 transition-all"
          >
            <Crown className="w-3.5 h-3.5" />
            Upgrade ₹199
          </button>
        ) : (
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> {user?.plan.toUpperCase()}
          </span>
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
