'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  Crown, 
  Sparkles, 
  Zap, 
  KeyRound, 
  MessageSquare, 
  ShieldCheck, 
  AlertCircle, 
  Loader2, 
  CheckCircle2,
  Lock,
  ArrowLeft,
  CreditCard
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { PlanType } from '@/types';

export const UpgradeModal: React.FC = () => {
  const { 
    showUpgradeModal, 
    setShowUpgradeModal, 
    selectedPlanForModal, 
    upgradePlan, 
    user 
  } = useApp();

  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [currentView, setCurrentView] = useState<'select_plan' | 'activation_choices' | 'enter_code' | 'pay_info' | 'success'>('select_plan');
  const [secretCode, setSecretCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Sync selectedPlan when modal opens
  useEffect(() => {
    if (showUpgradeModal) {
      if (selectedPlanForModal && selectedPlanForModal !== 'free') {
        setSelectedPlan(selectedPlanForModal);
        setCurrentView('activation_choices');
      } else {
        setSelectedPlan(null);
        setCurrentView('select_plan');
      }
      setSecretCode('');
      setErrorMessage('');
      setIsLoading(false);
    }
  }, [showUpgradeModal, selectedPlanForModal]);

  if (!showUpgradeModal) return null;

  const handleClose = () => {
    setShowUpgradeModal(false);
    setSelectedPlan(null);
    setCurrentView('select_plan');
    setSecretCode('');
    setErrorMessage('');
    setIsLoading(false);
  };

  const handleSelectPaidPlan = (plan: PlanType) => {
    if (plan === 'free') {
      upgradePlan('free');
      handleClose();
      return;
    }
    setSelectedPlan(plan);
    setCurrentView('activation_choices');
    setErrorMessage('');
    setSecretCode('');
  };

  const handleVerifySecretCode = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!selectedPlan || selectedPlan === 'free') return;

    if (!secretCode.trim()) {
      setErrorMessage('Please enter your activation code.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      // Secure Backend Server Verification
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
        // ACTUAL PLAN UPGRADE - Updates account, database & generation allowance
        upgradePlan(selectedPlan);
        setCurrentView('success');
      } else {
        // Invalid Code / Wrong Plan / Rate Limited
        setErrorMessage(data.message || 'Invalid Activation Code. Please check your code and try again.');
      }
    } catch (err: any) {
      setErrorMessage('Network error during verification. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getWhatsAppMessage = (plan: PlanType) => {
    if (plan === 'starter') {
      return 'Hello Hari Bot & Business Solutions, I want to purchase the Starter plan for ₹299. Please guide me with the payment process.';
    } else if (plan === 'growth') {
      return 'Hello Hari Bot & Business Solutions, I want to purchase the Growth plan for ₹499. Please guide me with the payment process.';
    } else {
      return 'Hello Hari Bot & Business Solutions, I want to purchase the Pro Business plan for ₹999. Please guide me with the payment process.';
    }
  };

  const handleOpenWhatsApp = () => {
    if (!selectedPlan) return;
    const msg = getWhatsAppMessage(selectedPlan);
    const encodedMsg = encodeURIComponent(msg);
    const waUrl = `https://wa.me/918667808803?text=${encodedMsg}`;
    
    // Open WhatsApp app or web directly
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const getPlanInfo = (plan: PlanType) => {
    switch (plan) {
      case 'starter':
        return {
          title: 'Starter Plan',
          priceText: '₹299',
          allowanceText: '200 AI Generations',
          badgeText: 'STARTER',
          badgeClass: 'text-blue-400 border-blue-500/30 bg-blue-500/10'
        };
      case 'growth':
        return {
          title: 'Growth Plan',
          priceText: '₹499',
          allowanceText: '500 AI Generations',
          badgeText: 'MOST POPULAR 🔥',
          badgeClass: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10'
        };
      case 'pro_business':
      default:
        return {
          title: 'Pro Business',
          priceText: '₹999',
          allowanceText: '♾️ Unlimited AI Generations',
          badgeText: 'UNLIMITED ♾️',
          badgeClass: 'text-amber-400 border-amber-500/30 bg-amber-500/10'
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0f172a] border border-gray-800 rounded-3xl max-w-4xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Modal Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* VIEW 5: SUCCESSFUL ACTIVATION ANIMATION & DASHBOARD RETURN */}
        {currentView === 'success' && selectedPlan && (
          <div className="py-8 text-center space-y-6 animate-scale-up">
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-400 to-emerald-600 flex items-center justify-center shadow-2xl shadow-emerald-500/40">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" /> Plan Verification Successful
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                {getPlanInfo(selectedPlan).title} Activated Successfully! 🎉
              </h2>
              <p className="text-base text-gray-300 font-medium">
                Welcome to <strong className="text-amber-300">{getPlanInfo(selectedPlan).title}</strong>
              </p>
            </div>

            <div className="bg-gradient-to-r from-emerald-950/40 via-gray-900 to-teal-950/40 border border-emerald-500/40 rounded-2xl p-6 max-w-md mx-auto shadow-xl">
              <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Your Active Generation Allowance</div>
              <div className="text-2xl font-black text-emerald-400 mt-1">
                {getPlanInfo(selectedPlan).allowanceText}
              </div>
              <p className="text-xs text-gray-300 mt-2">
                Your dashboard has been updated to {getPlanInfo(selectedPlan).title}.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/30 transition-all hover:scale-105"
            >
              🚀 Return to Dashboard & Start Creating
            </button>
          </div>
        )}

        {/* VIEW 2: ACTIVATION CHOICES (ENTER SECRET CODE or PAY) */}
        {currentView === 'activation_choices' && selectedPlan && (
          <div className="space-y-6 animate-fade-in">
            <button
              onClick={() => setCurrentView('select_plan')}
              className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Change Selected Plan
            </button>

            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                <Crown className="w-3.5 h-3.5" /> 🔐 Activate {getPlanInfo(selectedPlan).title}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                🔐 Activate {getPlanInfo(selectedPlan).title}
              </h2>
              <p className="text-sm font-bold text-emerald-400">
                {getPlanInfo(selectedPlan).priceText} • {getPlanInfo(selectedPlan).allowanceText}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto pt-2">
              {/* CHOICE 1: ENTER SECRET CODE */}
              <div 
                onClick={() => setCurrentView('enter_code')}
                className="bg-gray-900/90 border border-indigo-500/50 hover:border-indigo-400 rounded-2xl p-6 flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.02] shadow-xl group"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                    <KeyRound className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-1">
                      🔑 Enter Secret Code
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Already paid and have an activation code? Enter it here to unlock access instantly.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentView('enter_code')}
                  className="w-full mt-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-md transition-all"
                >
                  Enter Secret Code
                </button>
              </div>

              {/* CHOICE 2: PAY FOR THIS PLAN */}
              <div 
                onClick={() => setCurrentView('pay_info')}
                className="bg-gray-900/90 border border-emerald-500/50 hover:border-emerald-400 rounded-2xl p-6 flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.02] shadow-xl group"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-1">
                      💳 Pay {getPlanInfo(selectedPlan).priceText}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Contact us directly on WhatsApp to make your UPI payment and receive your activation code.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentView('pay_info')}
                  className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-md transition-all"
                >
                  Pay {getPlanInfo(selectedPlan).priceText}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: ENTER SECRET CODE FORM */}
        {currentView === 'enter_code' && selectedPlan && (
          <div className="space-y-6 animate-fade-in max-w-xl mx-auto">
            <button
              onClick={() => setCurrentView('activation_choices')}
              className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Choices
            </button>

            <div className="text-center space-y-1">
              <h2 className="text-2xl font-extrabold text-white">
                Enter Activation Code
              </h2>
              <p className="text-xs text-gray-400">
                Enter the activation code provided to you for <strong className="text-white">{getPlanInfo(selectedPlan).title} ({getPlanInfo(selectedPlan).priceText})</strong>
              </p>
            </div>

            <form onSubmit={handleVerifySecretCode} className="space-y-4 bg-gray-900/80 border border-gray-800 rounded-2xl p-6 shadow-xl">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2 flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-indigo-400" /> Secret Activation Code
                </label>

                <div className="relative">
                  <KeyRound className="w-5 h-5 text-gray-500 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    autoFocus
                    value={secretCode}
                    onChange={(e) => { setSecretCode(e.target.value); setErrorMessage(''); }}
                    placeholder="Enter Secret Code"
                    disabled={isLoading}
                    className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl pl-12 pr-4 py-3 text-lg font-mono font-extrabold text-white tracking-widest uppercase focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              {/* Error Banner */}
              {errorMessage && (
                <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs font-semibold flex items-center gap-2 animate-shake">
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                  <div>
                    <div className="font-bold">❌ Invalid Activation Code</div>
                    <div>Please check your code and try again.</div>
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
                    <Loader2 className="w-4 h-4 animate-spin" /> Verifying Code...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" /> Activate Plan
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* VIEW 4: PAY INFO & WHATSAPP REDIRECT */}
        {currentView === 'pay_info' && selectedPlan && (
          <div className="space-y-6 animate-fade-in max-w-xl mx-auto">
            <button
              onClick={() => setCurrentView('activation_choices')}
              className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Choices
            </button>

            <div className="bg-gray-900/90 border border-gray-800 rounded-2xl p-6 space-y-5 shadow-xl">
              <div className="border-b border-gray-800 pb-4">
                <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Plan Selected</span>
                <h3 className="text-2xl font-black text-white mt-0.5">
                  {getPlanInfo(selectedPlan).title} — {getPlanInfo(selectedPlan).priceText}
                </h3>
                <p className="text-xs text-emerald-400 font-semibold mt-1">
                  Includes {getPlanInfo(selectedPlan).allowanceText}
                </p>
              </div>

              <div className="bg-[#0b0f19] border border-gray-800 rounded-xl p-4 space-y-2 text-xs text-gray-300">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> WhatsApp Payment Workflow:
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-gray-400 pl-1">
                  <li>Click <strong className="text-white">Pay {getPlanInfo(selectedPlan).priceText}</strong> to chat on WhatsApp (+91 8667808803).</li>
                  <li>Receive UPI ID / QR code for instant payment.</li>
                  <li>After payment, we will provide your <strong className="text-amber-300">Secret Activation Code</strong>.</li>
                  <li>Return here, click <strong className="text-white">Enter Secret Code</strong>, and activate your plan.</li>
                </ol>
              </div>

              <button
                type="button"
                onClick={handleOpenWhatsApp}
                className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                <MessageSquare className="w-5 h-5 fill-white" /> Pay {getPlanInfo(selectedPlan).priceText} on WhatsApp
              </button>

              <p className="text-[11px] text-gray-500 text-center italic">
                Note: Clicking Pay will open WhatsApp to message our team. Payment is completed manually, after which you enter your secret code to activate.
              </p>
            </div>
          </div>
        )}

        {/* VIEW 1: DEFAULT 4-TIER PRICING GRID */}
        {currentView === 'select_plan' && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
                <Crown className="w-4 h-4" /> Choose Your AI Marketing Plan
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Upgrade Your AI Marketing Partner
              </h2>
              <p className="text-xs text-gray-400 mt-2 max-w-lg mx-auto">
                Tap on any paid plan card (₹299, ₹499, ₹999) to activate via Secret Code or WhatsApp!
              </p>
            </div>

            {/* 4-Tier Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* FREE PLAN */}
              <div 
                onClick={() => handleSelectPaidPlan('free')}
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
                  {user?.plan === 'free' ? 'Current Active Plan' : 'Free Tier'}
                </div>
              </div>

              {/* STARTER PLAN - ₹299 */}
              <div 
                onClick={() => handleSelectPaidPlan('starter')}
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

                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleSelectPaidPlan('starter'); }}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs text-center font-extrabold shadow-md transition-all"
                >
                  Activate Starter — ₹299
                </button>
              </div>

              {/* GROWTH PLAN - ₹499 */}
              <div 
                onClick={() => handleSelectPaidPlan('growth')}
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

                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleSelectPaidPlan('growth'); }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 text-white text-xs text-center font-extrabold shadow-md transition-all"
                >
                  Activate Growth — ₹499
                </button>
              </div>

              {/* PRO BUSINESS PLAN - ₹999 */}
              <div 
                onClick={() => handleSelectPaidPlan('pro_business')}
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

                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleSelectPaidPlan('pro_business'); }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs text-center font-extrabold shadow-md transition-all"
                >
                  Activate Pro — ₹999
                </button>
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
