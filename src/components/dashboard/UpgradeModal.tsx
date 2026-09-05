'use client';

import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Crown, 
  Sparkles, 
  Zap, 
  KeyRound, 
  MessageSquare, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle, 
  Loader2, 
  CheckCircle2,
  Lock,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { PlanType } from '@/types';

export const UpgradeModal: React.FC = () => {
  const { showUpgradeModal, setShowUpgradeModal, upgradePlan, user } = useApp();

  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [activeTab, setActiveTab] = useState<'code' | 'pay'>('code');
  const [secretCode, setSecretCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activatedPlanSuccess, setActivatedPlanSuccess] = useState<PlanType | null>(null);

  if (!showUpgradeModal) return null;

  const handleClose = () => {
    setShowUpgradeModal(false);
    setSelectedPlan(null);
    setSecretCode('');
    setErrorMessage('');
    setActivatedPlanSuccess(null);
    setIsLoading(false);
  };

  const handleSelectPlanCard = (plan: PlanType) => {
    if (plan === 'free') {
      upgradePlan('free');
      handleClose();
      return;
    }
    setSelectedPlan(plan);
    setErrorMessage('');
    setSecretCode('');
    setActivatedPlanSuccess(null);
  };

  const handleVerifySecretCode = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!selectedPlan) return;
    if (!secretCode.trim()) {
      setErrorMessage('Please enter your activation code.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      // Secure Backend API Call - Codes verified strictly server-side
      const res = await fetch('/api/activate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: selectedPlan,
          code: secretCode.trim()
        })
      });

      const data = await res.json();

      if (res.ok && data.valid) {
        // Successful Verification
        upgradePlan(selectedPlan);
        setActivatedPlanSuccess(selectedPlan);
      } else {
        // Invalid Code / Rate Limited
        setErrorMessage(data.message || 'Invalid activation code. Please check your code and try again.');
      }
    } catch (err: any) {
      setErrorMessage('Verification failed. Please check your network connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getWhatsAppMessage = (plan: PlanType) => {
    let planName = 'Pro Business';
    let price = '₹999';

    if (plan === 'starter') {
      planName = 'Starter';
      price = '₹299';
    } else if (plan === 'growth') {
      planName = 'Growth';
      price = '₹499';
    }

    return `Hello Hari Bot & Business Solutions, I would like to purchase the ${planName} plan for ${price}. Please guide me with the payment process.`;
  };

  const openWhatsApp = () => {
    if (!selectedPlan) return;
    const msg = getWhatsAppMessage(selectedPlan);
    const url = `https://wa.me/918667808803?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getPlanDetails = (plan: PlanType) => {
    switch (plan) {
      case 'starter':
        return { name: 'Starter Plan', price: '₹299', allowance: '200 AI Generations', color: 'from-blue-600 to-indigo-600', badgeColor: 'text-blue-400 border-blue-500/30 bg-blue-500/10' };
      case 'growth':
        return { name: 'Growth Plan', price: '₹499', allowance: '500 AI Generations', color: 'from-indigo-600 to-pink-600', badgeColor: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10' };
      case 'pro_business':
      default:
        return { name: 'Pro Business Plan', price: '₹999', allowance: 'Unlimited AI Generations ♾️', color: 'from-orange-500 to-amber-500', badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10' };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0f172a] border border-gray-800 rounded-3xl max-w-4xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Ambient Glows */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* SUCCESS STATE ANIMATION */}
        {activatedPlanSuccess ? (
          <div className="py-8 text-center space-y-6 animate-scale-up">
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-2xl shadow-emerald-500/40">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" /> Instant Activation Confirmed
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                🎉 Plan Activated Successfully!
              </h2>
              <p className="text-base text-gray-300 font-medium">
                Welcome to <strong className="text-amber-300">{getPlanDetails(activatedPlanSuccess).name}</strong>
              </p>
            </div>

            <div className="bg-gradient-to-r from-emerald-950/40 via-gray-900 to-teal-950/40 border border-emerald-500/40 rounded-2xl p-6 max-w-md mx-auto shadow-xl">
              <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Your Generation Allowance</div>
              <div className="text-2xl font-black text-emerald-400 mt-1">
                {getPlanDetails(activatedPlanSuccess).allowance}
              </div>
              <p className="text-xs text-gray-300 mt-2">
                Your account has been upgraded with instant server verification.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/30 transition-all hover:scale-105"
            >
              🚀 Start Creating Campaigns Now
            </button>
          </div>
        ) : selectedPlan ? (
          /* PLAN ACTIVATION MODAL VIEW (Paid Plan Selected) */
          <div className="space-y-6 animate-fade-in">
            <button
              onClick={() => setSelectedPlan(null)}
              className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Change Selected Plan
            </button>

            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                <Crown className="w-3.5 h-3.5" /> Plan Activation
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Activate Your Plan
              </h2>
              <p className="text-xs text-gray-400">
                Choose how you want to activate your plan
              </p>
            </div>

            {/* Selected Plan Summary Banner */}
            <div className="bg-gray-900/90 border border-gray-800 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${getPlanDetails(selectedPlan).badgeColor}`}>
                  Selected Tier
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {getPlanDetails(selectedPlan).name} ({getPlanDetails(selectedPlan).price})
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-emerald-400 block">
                  {getPlanDetails(selectedPlan).allowance}
                </span>
              </div>
            </div>

            {/* Two Options Tab Switcher */}
            <div className="grid grid-cols-2 gap-3 p-1.5 bg-[#0b0f19] border border-gray-800 rounded-2xl">
              <button
                type="button"
                onClick={() => { setActiveTab('code'); setErrorMessage(''); }}
                className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'code'
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <KeyRound className="w-4 h-4" /> Option 1 — Enter Secret Code
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('pay'); setErrorMessage(''); }}
                className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'pay'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-4 h-4" /> Option 2 — Pay for this Plan
              </button>
            </div>

            {/* TAB CONTENT 1: SECRET CODE */}
            {activeTab === 'code' && (
              <form onSubmit={handleVerifySecretCode} className="space-y-4 bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-1">
                    <Lock className="w-4 h-4 text-indigo-400" /> Enter your activation code
                  </h3>
                  <p className="text-xs text-gray-400 mb-3">
                    Enter the secret code provided after your payment to unlock instant access.
                  </p>

                  <div className="relative">
                    <KeyRound className="w-5 h-5 text-gray-500 absolute left-4 top-3.5" />
                    <input
                      type="text"
                      value={secretCode}
                      onChange={(e) => { setSecretCode(e.target.value); setErrorMessage(''); }}
                      placeholder="Enter Secret Code"
                      disabled={isLoading}
                      className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl pl-12 pr-4 py-3 text-base font-mono font-bold text-white tracking-widest uppercase focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs font-semibold flex items-center gap-2 animate-shake">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <div>
                      <div className="font-bold">❌ Invalid activation code</div>
                      <div>{errorMessage}</div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !secretCode.trim()}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 disabled:opacity-50 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Verifying Code Server-Side...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" /> Activate Plan
                    </>
                  )}
                </button>
              </form>
            )}

            {/* TAB CONTENT 2: PAY FOR THIS PLAN */}
            {activeTab === 'pay' && (
              <div className="space-y-4 bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
                <div className="border-b border-gray-800 pb-4">
                  <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Ready to upgrade?</span>
                  <h3 className="text-xl font-black text-white mt-0.5">
                    {getPlanDetails(selectedPlan).price} — {getPlanDetails(selectedPlan).name}
                  </h3>
                  <p className="text-xs text-emerald-400 font-semibold mt-1">
                    {getPlanDetails(selectedPlan).allowance}
                  </p>
                </div>

                <div className="bg-[#0b0f19] border border-gray-800 rounded-xl p-4 space-y-2 text-xs text-gray-300">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> How Payment Works:
                  </div>
                  <ol className="list-decimal list-inside space-y-1.5 text-gray-400 pl-1">
                    <li>Click <strong className="text-white">Contact on WhatsApp</strong> below.</li>
                    <li>We will provide our UPI ID / GPay QR code directly on WhatsApp.</li>
                    <li>After completing payment, you will receive your <strong className="text-amber-300">Secret Activation Code</strong>.</li>
                    <li>Enter the code in <strong className="text-white">Option 1</strong> to activate instant access!</li>
                  </ol>
                </div>

                <button
                  type="button"
                  onClick={openWhatsApp}
                  className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
                >
                  <MessageSquare className="w-5 h-5 fill-white" /> Contact on WhatsApp (8667808803)
                </button>

                <p className="text-[11px] text-gray-500 text-center italic">
                  Note: Clicking WhatsApp will NOT automatically activate your plan. You will enter your code after completing manual payment.
                </p>
              </div>
            )}
          </div>
        ) : (
          /* DEFAULT VIEW: 4-TIER PRICING CARDS SELECTOR */
          <div className="space-y-6">
            {/* Title & Subtitle */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
                <Crown className="w-4 h-4" /> Choose Your AI Marketing Plan
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Upgrade Your AI Marketing Partner
              </h2>
              <p className="text-xs text-gray-400 mt-2 max-w-lg mx-auto">
                Tap on any plan card to view secret code activation or WhatsApp payment options!
              </p>
            </div>

            {/* 4-Tier Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* FREE PLAN */}
              <div 
                onClick={() => handleSelectPlanCard('free')}
                className={`bg-gray-900/90 border rounded-2xl p-5 relative flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.02] ${user?.plan === 'free' ? 'border-indigo-500/60 ring-1 ring-indigo-500/40' : 'border-gray-800 hover:border-gray-700'}`}
              >
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

                <div className="py-2 text-center rounded-xl bg-gray-800 text-gray-300 text-xs font-bold">
                  {user?.plan === 'free' ? 'Current Plan' : 'Free Tier'}
                </div>
              </div>

              {/* STARTER PLAN */}
              <div 
                onClick={() => handleSelectPlanCard('starter')}
                className={`bg-gray-900/90 border rounded-2xl p-5 relative flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.02] ${user?.plan === 'starter' ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-800 hover:border-blue-500/50'}`}
              >
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

                <div className="py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs text-center font-extrabold shadow-md">
                  Activate Starter — ₹299
                </div>
              </div>

              {/* GROWTH PLAN - MOST POPULAR */}
              <div 
                onClick={() => handleSelectPlanCard('growth')}
                className={`bg-gradient-to-b from-indigo-950/40 via-gray-900 to-indigo-950/40 border-2 border-indigo-500 rounded-2xl p-5 relative flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.02] shadow-xl shadow-indigo-500/10 ${user?.plan === 'growth' ? 'ring-2 ring-indigo-400' : ''}`}
              >
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

                <div className="py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 text-white text-xs text-center font-extrabold shadow-md">
                  Activate Growth — ₹499
                </div>
              </div>

              {/* PRO BUSINESS PLAN */}
              <div 
                onClick={() => handleSelectPlanCard('pro_business')}
                className={`bg-gradient-to-b from-amber-950/40 via-gray-900 to-orange-950/40 border-2 border-amber-500 rounded-2xl p-5 relative flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.02] shadow-xl shadow-amber-500/20 ${user?.plan === 'pro_business' ? 'ring-2 ring-amber-400' : ''}`}
              >
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

                <div className="py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs text-center font-extrabold shadow-md">
                  Activate Pro — ₹999
                </div>
              </div>
            </div>

            <div className="text-center text-xs text-gray-400">
              🔒 Instant Server Verification • Secret Activation Codes Confidential
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
