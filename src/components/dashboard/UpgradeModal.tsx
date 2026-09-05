'use client';

import React from 'react';
import { X, Check, Crown, Sparkles, Zap } from 'lucide-react';
import { useApp } from '@/lib/store';
import { PlanType } from '@/types';

export const UpgradeModal: React.FC = () => {
  const { showUpgradeModal, setShowUpgradeModal, upgradePlan, user } = useApp();

  if (!showUpgradeModal) return null;

  const handleSelectPlan = (plan: PlanType) => {
    upgradePlan(plan);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0f172a] border border-gray-800 rounded-3xl max-w-5xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Glow Accent background */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setShowUpgradeModal(false)}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title & Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
            <Crown className="w-4 h-4" /> Choose Your AI Marketing Plan
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Upgrade Your AI Marketing Partner
          </h2>
          <p className="text-sm text-gray-400 mt-2 max-w-lg mx-auto">
            Select the perfect plan for your business to create high-converting Tamil + English marketing campaigns!
          </p>
        </div>

        {/* 4-Tier Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* FREE PLAN */}
          <div className={`bg-gray-900/90 border rounded-2xl p-5 relative flex flex-col justify-between ${user?.plan === 'free' ? 'border-indigo-500/60 ring-1 ring-indigo-500/40' : 'border-gray-800'}`}>
            <div>
              <div className="mb-4">
                <h3 className="text-base font-bold text-white">FREE</h3>
                <p className="text-xs text-gray-400">Try AI Marketing</p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-2xl font-black text-white">₹0</span>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-gray-300 mb-6">
                <li className="flex items-center gap-2 font-bold text-emerald-400">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  10 AI Generations
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  Instagram & Ads
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  WhatsApp Marketing
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  Tamil + English
                </li>
              </ul>
            </div>

            {user?.plan === 'free' ? (
              <div className="py-2 text-center rounded-xl bg-gray-800 text-gray-400 text-xs font-semibold">
                Current Plan
              </div>
            ) : (
              <button
                onClick={() => handleSelectPlan('free')}
                className="w-full py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-bold transition-all"
              >
                Downgrade to Free
              </button>
            )}
          </div>

          {/* STARTER PLAN */}
          <div className={`bg-gray-900/90 border rounded-2xl p-5 relative flex flex-col justify-between ${user?.plan === 'starter' ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-800'}`}>
            <div>
              <div className="mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-1">
                  STARTER <Zap className="w-3.5 h-3.5 text-blue-400" />
                </h3>
                <p className="text-xs text-gray-400">Small Business Starter</p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-2xl font-black text-white">₹299</span>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-gray-300 mb-6">
                <li className="flex items-center gap-2 font-bold text-blue-400">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  200 AI Generations
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  All Marketing Tools
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  Business Growth Ideas
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  Reel Scripts & Calendars
                </li>
              </ul>
            </div>

            {user?.plan === 'starter' ? (
              <div className="py-2 text-center rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs font-semibold">
                Current Plan
              </div>
            ) : (
              <button
                onClick={() => handleSelectPlan('starter')}
                className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md"
              >
                Choose Starter — ₹299
              </button>
            )}
          </div>

          {/* GROWTH PLAN - MOST POPULAR */}
          <div className={`bg-gradient-to-b from-indigo-950/40 via-gray-900 to-indigo-950/40 border-2 border-indigo-500 rounded-2xl p-5 relative flex flex-col justify-between shadow-xl shadow-indigo-500/10 ${user?.plan === 'growth' ? 'ring-2 ring-indigo-400' : ''}`}>
            <div className="absolute -top-3 right-4 bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-[9px] uppercase font-black tracking-wider px-2.5 py-0.5 rounded-full shadow-md">
              MOST POPULAR 🔥
            </div>

            <div>
              <div className="mb-4">
                <h3 className="text-base font-extrabold text-white flex items-center gap-1">
                  GROWTH <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                </h3>
                <p className="text-xs text-indigo-300 font-semibold">Growing Businesses</p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-2xl font-black text-indigo-300">₹499</span>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-gray-200 mb-6">
                <li className="flex items-center gap-2 font-bold text-indigo-400">
                  <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  500 AI Generations
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  Full AI Growth Strategist
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  30-Day Marketing Plans
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  Priority Execution
                </li>
              </ul>
            </div>

            {user?.plan === 'growth' ? (
              <div className="py-2 text-center rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-semibold">
                Current Plan
              </div>
            ) : (
              <button
                onClick={() => handleSelectPlan('growth')}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white text-xs font-extrabold transition-all shadow-md"
              >
                Choose Growth — ₹499
              </button>
            )}
          </div>

          {/* PRO BUSINESS PLAN */}
          <div className={`bg-gradient-to-b from-amber-950/40 via-gray-900 to-orange-950/40 border-2 border-amber-500 rounded-2xl p-5 relative flex flex-col justify-between shadow-xl shadow-amber-500/20 ${user?.plan === 'pro_business' ? 'ring-2 ring-amber-400' : ''}`}>
            <div className="absolute -top-3 right-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[9px] uppercase font-black tracking-wider px-2.5 py-0.5 rounded-full shadow-md">
              UNLIMITED ♾️
            </div>

            <div>
              <div className="mb-4">
                <h3 className="text-base font-extrabold text-white flex items-center gap-1">
                  PRO BUSINESS <Crown className="w-3.5 h-3.5 text-amber-400" />
                </h3>
                <p className="text-xs text-amber-300 font-semibold">Unlimited Access</p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-2xl font-black text-amber-300">₹999</span>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-gray-200 mb-6">
                <li className="flex items-center gap-2 font-bold text-emerald-400">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  Unlimited AI Generations ♾️
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  Unlimited Business Growth
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  All Future Features Included
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  Priority 24/7 Engine
                </li>
              </ul>
            </div>

            {user?.plan === 'pro_business' ? (
              <div className="py-2 text-center rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold">
                Current Active Plan
              </div>
            ) : (
              <button
                onClick={() => handleSelectPlan('pro_business')}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white text-xs font-extrabold transition-all shadow-md"
              >
                Choose Pro — ₹999
              </button>
            )}
          </div>
        </div>

        <div className="text-center text-xs text-gray-400">
          🔒 Instant unlock. Switch or upgrade plans anytime.
        </div>
      </div>
    </div>
  );
};
