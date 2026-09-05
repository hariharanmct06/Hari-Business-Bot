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
          {/* FREE PLAN */}
          <div className="bg-gray-900/90 border border-gray-800 rounded-3xl p-6 relative flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">FREE TIER</h3>
                  <p className="text-xs text-gray-400">10 Free Generations Included</p>
                </div>
                <span className="text-2xl font-extrabold text-white">₹0</span>
              </div>

              <ul className="space-y-2.5 text-xs text-gray-300 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <strong>10 AI Generations</strong> included
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
                  Tamil + English Support
                </li>
              </ul>
            </div>

            <div className="py-2.5 text-center rounded-xl bg-gray-800 text-gray-400 text-xs font-semibold">
              Current Active Plan
            </div>
          </div>

          {/* PRO BUSINESS PLAN */}
          <div className="bg-gradient-to-b from-amber-950/40 via-gray-900 to-orange-950/40 border-2 border-amber-500 rounded-3xl p-6 relative flex flex-col justify-between shadow-2xl shadow-amber-500/20">
            <div className="absolute -top-3 right-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] uppercase font-black tracking-wider px-3.5 py-0.5 rounded-full">
              RECOMMENDED
            </div>

            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-extrabold text-white flex items-center gap-1.5">
                    PRO BUSINESS <Crown className="w-4 h-4 text-amber-400" />
                  </h3>
                  <p className="text-xs text-amber-300 font-semibold">Unlimited AI Marketing & Growth</p>
                </div>
                <span className="text-2xl font-black text-amber-300">₹999<span className="text-xs text-gray-400 font-normal">/mo</span></span>
              </div>

              <ul className="space-y-2 text-xs text-gray-200 mb-6">
                <li className="flex items-center gap-2 font-bold text-emerald-400">
                  <Check className="w-4 h-4 text-emerald-400" />
                  ♾️ Unlimited AI Generations
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" />
                  🚀 Business Growth Ideas
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" />
                  📱 Digital Marketing Ideas
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" />
                  🤖 AI-powered business recommendations
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" />
                  📈 Growth strategies & Content ideas
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" />
                  🎯 Marketing campaign concepts
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" />
                  ⚡ Priority AI execution & Save ideas
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectPlan('pro_business')}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white font-black text-sm shadow-xl shadow-orange-500/30 transition-all hover:scale-[1.02]"
            >
              Upgrade to Pro Business — ₹999
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-gray-400">
          🔒 Instant unlock. Cancel or manage anytime.
        </div>
      </div>
    </div>
  );
};
