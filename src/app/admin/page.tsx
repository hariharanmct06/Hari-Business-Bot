'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Users, 
  Zap, 
  TrendingUp, 
  Crown, 
  BarChart3, 
  Bot, 
  ArrowLeft,
  Search,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useApp } from '@/lib/store';

const mockUserList = [
  { id: 'usr_01', name: 'CSC Computer Centre', email: 'csc@business.com', plan: 'business', generations: 420, date: '2026-08-10' },
  { id: 'usr_02', name: 'Annapoorna Restaurant', email: 'annapoorna@gmail.com', plan: 'starter', generations: 88, date: '2026-08-14' },
  { id: 'usr_03', name: 'Vibe Salon & Spa', email: 'vibesalon@yahoo.com', plan: 'free', generations: 4, date: '2026-08-20' },
  { id: 'usr_04', name: 'Success Tuition Academy', email: 'successtuition@gmail.com', plan: 'starter', generations: 92, date: '2026-08-22' },
  { id: 'usr_05', name: 'Sri Electronics', email: 'srielectronics@store.in', plan: 'free', generations: 5, date: '2026-08-28' },
];

export default function AdminDashboardPage() {
  const { adminStats, user } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [userList, setUserList] = useState(mockUserList);

  const toggleUserPlan = (id: string) => {
    setUserList((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, plan: u.plan === 'free' ? 'starter' : u.plan === 'starter' ? 'business' : 'free' } : u
      )
    );
  };

  const filteredUsers = userList.filter(
    (u) => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#090d16] text-white p-4 sm:p-6 lg:p-10 selection:bg-indigo-500 selection:text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-white">HARI BUSINESS BOT — Admin Panel</h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 font-bold">
                  PROTECTED
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">Platform metrics, user analytics & subscription management</p>
            </div>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-xs font-semibold text-gray-300 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to User Dashboard
          </Link>
        </div>

        {/* Stats Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-900/90 border border-gray-800 rounded-3xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400">Total Users</span>
              <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400"><Users className="w-5 h-5" /></div>
            </div>
            <div className="text-3xl font-extrabold text-white mt-3">{adminStats.totalUsers.toLocaleString()}</div>
            <div className="text-[11px] text-emerald-400 mt-2 font-medium">↑ 18% growth this month</div>
          </div>

          <div className="bg-gray-900/90 border border-gray-800 rounded-3xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400">Active Monthly Users</span>
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400"><TrendingUp className="w-5 h-5" /></div>
            </div>
            <div className="text-3xl font-extrabold text-white mt-3">{adminStats.activeUsers.toLocaleString()}</div>
            <div className="text-[11px] text-gray-400 mt-2">Active in last 30 days</div>
          </div>

          <div className="bg-gray-900/90 border border-gray-800 rounded-3xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400">Total AI Generations</span>
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400"><Zap className="w-5 h-5" /></div>
            </div>
            <div className="text-3xl font-extrabold text-white mt-3">{adminStats.totalGenerations.toLocaleString()}</div>
            <div className="text-[11px] text-purple-400 mt-2 font-medium">Tamil & English copy generated</div>
          </div>

          <div className="bg-gray-900/90 border border-amber-500/30 rounded-3xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400">Paid Subscribers</span>
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400"><Crown className="w-5 h-5" /></div>
            </div>
            <div className="text-3xl font-extrabold text-amber-300 mt-3">{adminStats.paidUsers}</div>
            <div className="text-[11px] text-amber-400 mt-2 font-medium">{adminStats.freeUsers} Free Tier Users</div>
          </div>
        </div>

        {/* Analytics Breakdown & Usage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Most Used Generators */}
          <div className="lg:col-span-6 bg-gray-900/90 border border-gray-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-400" />
              Most-Used AI Generators
            </h3>

            <div className="space-y-3">
              {adminStats.topGenerators.map((gen) => {
                const maxCount = adminStats.topGenerators[0].count;
                const pct = Math.round((gen.count / maxCount) * 100);

                return (
                  <div key={gen.tool} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-gray-200 capitalize">{gen.tool.replace('_', ' ')}</span>
                      <span className="text-indigo-400">{gen.count.toLocaleString()} generations</span>
                    </div>
                    <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-pink-500" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Subscription Tier Distribution */}
          <div className="lg:col-span-6 bg-gray-900/90 border border-gray-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-400" />
              Revenue & Subscription Metrics
            </h3>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-[#0b0f19] p-4 rounded-2xl border border-gray-800 text-center">
                <span className="text-xs text-gray-400">STARTER (₹199/mo)</span>
                <div className="text-2xl font-black text-indigo-400 mt-1">210 Stores</div>
                <span className="text-[10px] text-gray-500 block mt-1">Est. Revenue: ₹41,790/mo</span>
              </div>

              <div className="bg-[#0b0f19] p-4 rounded-2xl border border-gray-800 text-center">
                <span className="text-xs text-gray-400">BUSINESS (₹499/mo)</span>
                <div className="text-2xl font-black text-pink-400 mt-1">110 Stores</div>
                <span className="text-[10px] text-gray-500 block mt-1">Est. Revenue: ₹54,890/mo</span>
              </div>
            </div>

            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-xs text-emerald-300 flex items-center justify-between">
              <span>Total Estimated MRR:</span>
              <strong className="text-base text-emerald-400">₹96,680 / month</strong>
            </div>
          </div>
        </div>

        {/* User Management List */}
        <div className="bg-gray-900/90 border border-gray-800 rounded-3xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-400" />
                User Directory & Account Status
              </h3>
              <p className="text-xs text-gray-400">Click plan badges to test toggling user subscription tiers.</p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Filter users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-[#0b0f19]">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-gray-900 border-b border-gray-800 text-gray-400 uppercase font-bold text-[10px] tracking-wider">
                  <th className="py-3 px-4">Business Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Current Plan</th>
                  <th className="py-3 px-4">Generations</th>
                  <th className="py-3 px-4">Joined Date</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-gray-200">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white">{u.name}</td>
                    <td className="py-3.5 px-4 text-gray-400">{u.email}</td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleUserPlan(u.id)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide border ${
                          u.plan === 'business'
                            ? 'bg-pink-500/20 border-pink-500/40 text-pink-300'
                            : u.plan === 'starter'
                            ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
                            : 'bg-gray-800 border-gray-700 text-gray-400'
                        }`}
                        title="Click to toggle plan"
                      >
                        {u.plan}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-gray-300">{u.generations}</td>
                    <td className="py-3.5 px-4 text-gray-500">{u.date}</td>
                    <td className="py-3.5 px-4">
                      <span className="text-xs text-indigo-400 font-semibold cursor-pointer hover:underline">
                        Manage
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
