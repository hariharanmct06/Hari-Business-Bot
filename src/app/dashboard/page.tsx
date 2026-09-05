'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Megaphone, 
  Palette, 
  Share2, 
  MessageSquare, 
  Video, 
  Calendar, 
  ArrowRight, 
  Sparkles,
  Zap,
  Clock,
  Building2,
  Globe
} from 'lucide-react';
import { useApp } from '@/lib/store';

const featureCards = [
  {
    title: '💡 Business Growth Ideas',
    description: 'Get AI-powered practical, creative growth ideas & 30-day strategy.',
    href: '/dashboard/growth-ideas',
    color: 'from-amber-500/20 via-orange-500/20 to-pink-500/20 border-amber-500/40 text-amber-300',
    btnColor: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-extrabold'
  },
  {
    title: '📢 Create Advertisement',
    description: 'Generate professional promotional content.',
    href: '/dashboard/ads',
    color: 'from-indigo-600/20 to-purple-600/20 border-indigo-500/30 text-indigo-400',
    btnColor: 'bg-indigo-600 hover:bg-indigo-500 text-white'
  },
  {
    title: '🎨 Create Poster',
    description: 'Generate poster-ready marketing copy & HTML image previews.',
    href: '/dashboard/posters',
    color: 'from-pink-600/20 to-rose-600/20 border-pink-500/30 text-pink-400',
    btnColor: 'bg-pink-600 hover:bg-pink-500 text-white'
  },
  {
    title: '📱 Social Media',
    description: 'Generate Instagram/Facebook captions and viral hooks.',
    href: '/dashboard/instagram',
    color: 'from-purple-600/20 to-indigo-600/20 border-purple-500/30 text-purple-400',
    btnColor: 'bg-purple-600 hover:bg-purple-500 text-white'
  },
  {
    title: '💬 WhatsApp Campaign',
    description: 'Create promotional WhatsApp broadcast messages with 1-click wa.me links.',
    href: '/dashboard/whatsapp',
    color: 'from-emerald-600/20 to-teal-600/20 border-emerald-500/30 text-emerald-400',
    btnColor: 'bg-emerald-600 hover:bg-emerald-500 text-white'
  },
  {
    title: '🎬 Reel Script',
    description: 'Generate short-form video scripts (15s, 30s, 60s) with scene breakdown.',
    href: '/dashboard/reels',
    color: 'from-rose-600/20 to-amber-600/20 border-rose-500/30 text-rose-400',
    btnColor: 'bg-rose-600 hover:bg-rose-500 text-white'
  },
  {
    title: '📅 Content Calendar',
    description: 'Generate a complete 7, 14, or 30-day marketing plan schedule.',
    href: '/dashboard/calendar',
    color: 'from-amber-600/20 to-yellow-600/20 border-amber-500/30 text-amber-400',
    btnColor: 'bg-amber-600 hover:bg-amber-500 text-white'
  },
];

export default function DashboardOverviewPage() {
  const { user, history, usageCount, maxUsageLimit } = useApp();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-pink-900/20 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" /> AI Marketing Assistant Ready
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              What would you like to create today?
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-xl">
              Configured for <strong className="text-white">{user?.profile?.name || 'Hari Bot & Business Solutions'}</strong> ({user?.profile?.type || 'AI & Business Solutions'}) in <span className="text-indigo-300">{user?.profile?.preferredLanguage || 'Tamil + English'}</span>.
            </p>
          </div>

          <Link
            href="/dashboard/settings"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900/80 hover:bg-gray-800 border border-gray-700/60 text-xs font-semibold text-gray-200 transition-all shrink-0"
          >
            <Building2 className="w-4 h-4 text-indigo-400" /> Edit Profile
          </Link>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            AI Marketing Tools
          </h2>
          <span className="text-xs text-gray-400 font-medium">Select a tool to start</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((card) => (
            <div
              key={card.title}
              className={`bg-gradient-to-br ${card.color} bg-gray-900/90 border rounded-3xl p-6 flex flex-col justify-between hover:scale-[1.02] transition-all duration-200 shadow-lg group`}
            >
              <div>
                <h3 className="text-lg font-extrabold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed mb-6">
                  {card.description}
                </p>
              </div>

              <Link
                href={card.href}
                className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all ${card.btnColor}`}
              >
                Create Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      {history.length > 0 && (
        <div className="bg-gray-900/80 border border-gray-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              Recent Generations
            </h3>
            <Link href="/dashboard/history" className="text-xs text-indigo-400 font-semibold hover:underline">
              View All History ({history.length})
            </Link>
          </div>

          <div className="space-y-3">
            {history.slice(0, 3).map((item) => (
              <div key={item.id} className="p-4 bg-[#0b0f19] border border-gray-800 rounded-2xl flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {item.toolType}
                    </span>
                    <span className="text-xs text-gray-400">{item.createdAt}</span>
                  </div>
                  <p className="text-xs font-semibold text-white truncate max-w-md">
                    {item.previewSnippet}
                  </p>
                </div>

                <Link
                  href="/dashboard/history"
                  className="text-xs text-indigo-400 font-semibold hover:text-indigo-300 shrink-0"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
