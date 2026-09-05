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
      <div className="bg-[#0f172a] border border-gray-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden">
        {/* Glow Accent background */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setShowUpgradeModal(false)}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title & Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
            <Crown className="w-4 h-4" /> Usage Limit Reached or Upgrade Available
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Upgrade Your AI Marketing Partner
          </h2>
          <p className="text-sm text-gray-400 mt-2 max-w-lg mx-auto">
            You&apos;ve reached your free generation limit. Upgrade to continue creating unlimited Tamil + English marketing campaigns!
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* STARTER PLAN */}
          <div className="bg-gray-900/90 border border-indigo-500/40 rounded-2xl p-6 relative hover:border-indigo-500 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">STARTER</h3>
                  <p className="text-xs text-gray-400">For Growing Small Shops</p>
                </div>
                <span className="text-2xl font-extrabold text-white">₹199<span className="text-xs text-gray-400 font-normal">/mo</span></span>
              </div>

              <ul className="space-y-2.5 text-xs text-gray-300 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <strong>100 Generations</strong> / month
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Instagram Captions & Hooks
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  WhatsApp Marketing Messages
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Reel Scripts (15s, 30s, 60s)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Poster Text & Visual Previews
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectPlan('starter')}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30"
            >
              Choose Starter (₹199)
            </button>
          </div>

          {/* BUSINESS PLAN */}
          <div className="bg-gradient-to-b from-indigo-950/60 to-gray-900 border-2 border-pink-500/50 rounded-2xl p-6 relative hover:border-pink-500 transition-all flex flex-col justify-between shadow-xl shadow-pink-500/10">
            <div className="absolute -top-3 right-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-0.5 rounded-full">
              POPULAR CHOICE
            </div>

            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                    BUSINESS <Sparkles className="w-4 h-4 text-pink-400" />
                  </h3>
                  <p className="text-xs text-gray-400">For Active Marketing & Stores</p>
                </div>
                <span className="text-2xl font-extrabold text-white">₹499<span className="text-xs text-gray-400 font-normal">/mo</span></span>
              </div>

              <ul className="space-y-2.5 text-xs text-gray-300 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pink-400" />
                  <strong>500 Generations</strong> / month
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pink-400" />
                  Full 30-Day Content Calendar
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pink-400" />
                  Priority AI Generation Speed
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pink-400" />
                  All Poster Style Exports (PNG)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pink-400" />
                  Priority Tamil + English AI Engine
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectPlan('business')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-pink-600/30"
            >
              Choose Business (₹499)
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500">
          🔒 Secure simulated payment for development. Real Razorpay gateway ready.
        </div>
      </div>
    </div>
  );
};
