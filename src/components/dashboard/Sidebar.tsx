'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Sparkles, 
  Megaphone, 
  Palette, 
  Share2, 
  MessageSquare, 
  Video, 
  Calendar, 
  History, 
  Settings, 
  Bot,
  Zap,
  ShieldCheck,
  Crown
} from 'lucide-react';
import { useApp } from '@/lib/store';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Create', href: '/dashboard/ads', icon: Sparkles },
  { name: 'Advertisements', href: '/dashboard/ads', icon: Megaphone },
  { name: 'Posters', href: '/dashboard/posters', icon: Palette },
  { name: 'Social Media', href: '/dashboard/instagram', icon: Share2 },
  { name: 'WhatsApp', href: '/dashboard/whatsapp', icon: MessageSquare },
  { name: 'Reel Scripts', href: '/dashboard/reels', icon: Video },
  { name: 'Content Calendar', href: '/dashboard/calendar', icon: Calendar },
  { name: 'History', href: '/dashboard/history', icon: History },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { usageCount, maxUsageLimit, user, setShowUpgradeModal } = useApp();

  const percentage = Math.min(100, Math.round((usageCount / maxUsageLimit) * 100));

  return (
    <aside className="w-64 bg-[#0d1322] border-r border-gray-800/80 flex flex-col h-screen sticky top-0 shrink-0 hidden lg:flex">
      {/* Brand Header */}
      <div className="p-5 border-b border-gray-800/60 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-pink-500 p-0.5 shadow-md shadow-indigo-500/20">
          <div className="w-full h-full bg-[#0b0f19] rounded-[10px] flex items-center justify-center">
            <Bot className="w-5 h-5 text-indigo-400" />
          </div>
        </div>
        <div>
          <h1 className="font-extrabold text-base tracking-tight text-white flex items-center gap-1">
            HARI BOT
            <span className="text-[10px] bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-1.5 py-0.2 rounded font-medium">PRO</span>
          </h1>
          <p className="text-[10px] text-gray-400 font-medium">Your AI Marketing Partner.</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
              {item.name}
            </Link>
          );
        })}

        {user?.isAdmin && (
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 mt-4 hover:bg-amber-500/20 transition-all"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            Admin Panel
          </Link>
        )}
      </div>

      {/* Free Usage Counter & Upgrade Card */}
      <div className="p-4 border-t border-gray-800/80">
        <div className="bg-gradient-to-br from-gray-900 to-indigo-950/40 rounded-xl p-3.5 border border-indigo-500/20 shadow-inner">
          <div className="flex items-center justify-between text-xs mb-2 font-medium">
            <span className="text-gray-300 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              Monthly Usage
            </span>
            <span className="text-indigo-300 font-semibold">
              {usageCount} / {maxUsageLimit}
            </span>
          </div>

          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-3">
            <div
              className={`h-full transition-all duration-500 ${
                percentage > 80 ? 'bg-amber-500' : 'bg-gradient-to-r from-indigo-500 to-pink-500'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <p className="text-[11px] text-gray-400 mb-3">
            {user?.plan === 'free' ? `${maxUsageLimit - usageCount} generations remaining on Free plan.` : `Subscribed to ${user?.plan.toUpperCase()} Plan.`}
          </p>

          {user?.plan === 'free' && (
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white rounded-lg text-xs font-semibold shadow-md transition-all"
            >
              <Crown className="w-3.5 h-3.5" />
              Upgrade Plan
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
