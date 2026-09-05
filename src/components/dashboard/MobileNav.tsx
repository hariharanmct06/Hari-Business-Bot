'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Sparkles, Palette, MessageSquare, History } from 'lucide-react';

const mobileTabs = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Ads', href: '/dashboard/ads', icon: Sparkles },
  { name: 'Posters', href: '/dashboard/posters', icon: Palette },
  { name: 'WhatsApp', href: '/dashboard/whatsapp', icon: MessageSquare },
  { name: 'History', href: '/dashboard/history', icon: History },
];

export const MobileNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0d1322]/95 backdrop-blur-xl border-t border-gray-800 px-2 py-2 flex items-center justify-around">
      {mobileTabs.map((tab) => {
        const isActive = pathname === tab.href;
        const Icon = tab.icon;

        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
              isActive ? 'text-indigo-400 font-bold' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : 'text-gray-400'}`} />
            <span>{tab.name}</span>
          </Link>
        );
      })}
    </div>
  );
};
