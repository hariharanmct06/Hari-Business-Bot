'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  Megaphone, 
  Palette, 
  Share2, 
  MessageSquare, 
  Video, 
  Calendar, 
  Globe, 
  Bot, 
  CheckCircle2, 
  Zap, 
  Check
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { UpgradeModal } from '@/components/dashboard/UpgradeModal';
import { useApp } from '@/lib/store';

export default function LandingPage() {
  const { openPlanActivationModal } = useApp();

  return (
    <div className="min-h-screen bg-[#090d16] text-white flex flex-col selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-8 sm:pt-16 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full overflow-hidden">
        {/* Glow Background Blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] bg-indigo-600/15 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-4 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-pink-500/15 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Hero Text */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold shadow-inner">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-400 animate-pulse shrink-0" />
              <span>Tamil + English AI Marketing Platform</span>
            </div>

            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Grow Your Business <br className="hidden xs:inline" />
              <span className="text-gradient-primary">With AI.</span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Create advertisements, social media content, WhatsApp messages and marketing campaigns in seconds with <strong className="text-white">HARI BUSINESS BOT</strong>.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 w-full max-w-md lg:max-w-none mx-auto lg:mx-0">
              <Link
                href="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-14 px-8 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-base shadow-xl shadow-indigo-600/30 transition-all active:scale-[0.97] touch-feedback"
              >
                ✨ Start Creating <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="#features"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-14 px-8 rounded-2xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-200 font-semibold text-base transition-all active:scale-[0.97] touch-feedback"
              >
                Explore Features
              </Link>
            </div>

            {/* Social Trust Badges */}
            <div className="pt-4 sm:pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>No tech knowledge needed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant Tamil Unicode output</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Free 10 generations included</span>
              </div>
            </div>
          </div>

          {/* Right Hero Dashboard Preview Mockup */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-sm xs:max-w-md lg:max-w-none rounded-3xl p-2.5 sm:p-3 bg-gradient-to-b from-indigo-500/30 via-gray-800/50 to-gray-900/90 border border-gray-700/60 shadow-2xl backdrop-blur-xl">
              <div className="bg-[#0b0f19] rounded-2xl p-4 sm:p-5 border border-gray-800 space-y-3.5 sm:space-y-4">
                {/* Mockup Header */}
                <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-gray-400 font-mono truncate">haribusinessbot.com/dashboard</span>
                </div>

                {/* Greeting Card */}
                <div className="bg-gradient-to-r from-indigo-900/60 to-purple-900/40 p-3.5 sm:p-4 rounded-xl border border-indigo-500/30">
                  <span className="text-xs font-semibold text-indigo-300">Good morning 👋</span>
                  <h4 className="text-xs sm:text-sm font-bold text-white mt-0.5">Hari Bot & Business Solutions</h4>
                  <p className="text-[10px] sm:text-[11px] text-gray-300 mt-0.5 sm:mt-1">What would you like to create today?</p>
                </div>

                {/* Quick Feature Grid Preview */}
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                  <div className="bg-gray-900/80 p-2.5 sm:p-3 rounded-xl border border-gray-800 flex items-center gap-2">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-indigo-500/20 text-indigo-400 shrink-0">
                      <Megaphone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">Ads</div>
                      <div className="text-[9px] sm:text-[10px] text-gray-400 truncate">Promo copy</div>
                    </div>
                  </div>

                  <div className="bg-gray-900/80 p-2.5 sm:p-3 rounded-xl border border-gray-800 flex items-center gap-2">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-pink-500/20 text-pink-400 shrink-0">
                      <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">WhatsApp</div>
                      <div className="text-[9px] sm:text-[10px] text-gray-400 truncate">Direct msg</div>
                    </div>
                  </div>
                </div>

                {/* Mock Output Snippet */}
                <div className="bg-indigo-950/40 p-3 sm:p-3.5 rounded-xl border border-indigo-500/30 text-[11px] sm:text-xs font-tamil text-gray-200">
                  <div className="text-[9px] sm:text-[10px] text-indigo-400 uppercase font-bold mb-1">Generated Output (Tamil)</div>
                  🔥 <strong>Hari Bot & Business Solutions</strong> – உங்கள் வணிக வளர்ச்சிக்கான AI & Digital Marketing சேவைகள்! 📞 8667808803
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-gray-800/80">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 shrink-0" /> Complete Marketing Suite
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Everything Your Business Needs To Grow
          </h2>
          <p className="text-gray-400 text-xs sm:text-base">
            No need to hire expensive marketing agencies. HARI BUSINESS BOT handles all your advertising content automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { icon: Megaphone, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20', title: '📢 AI Advertisement Generator', desc: 'Generate professional promotional headlines, main copy, offers, and hashtags.' },
            { icon: Palette, color: 'text-pink-400 bg-pink-500/10 border-pink-500/20', title: '🎨 Poster Content Generator', desc: 'Create poster-ready copy with visual live HTML/CSS previews and instant PNG downloads.' },
            { icon: Share2, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20', title: '📱 Instagram Content Generator', desc: 'Engaging captions, hooks, CTAs, emoji suggestions, and viral hashtags.' },
            { icon: MessageSquare, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', title: '💬 WhatsApp Marketing Generator', desc: 'Ready-to-send promotional WhatsApp broadcast messages with 1-click wa.me links.' },
            { icon: Video, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20', title: '🎬 Reel Script Generator', desc: 'Generate 15s, 30s, 60s short-form video scripts with scene breakdown and voiceover.' },
            { icon: Calendar, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', title: '📅 Content Calendar', desc: 'Generate complete 7, 14, or 30-day marketing plans organized by platform.' },
            { icon: Globe, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20', title: '🌐 Tamil + English Support', desc: 'First-class natural Tamil Unicode generation tailored for local Indian stores.' },
            { icon: Bot, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20', title: '✨ AI Marketing Assistant', desc: 'Remembers your business profile details so you never have to re-enter info.' },
          ].map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5 sm:p-6 hover:border-indigo-500/40 hover:bg-gray-800/60 transition-all duration-300 group touch-feedback"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl border flex items-center justify-center mb-3 sm:mb-4 ${feat.color} group-hover:scale-110 transition-transform shrink-0`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">{feat.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-gray-800/80 bg-gray-950/40">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-2 sm:space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            How It Works in 3 Simple Steps
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm">
            Generate high-converting marketing content in less than 30 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {[
            { step: '1', title: 'Tell us about your business', desc: 'Enter your business name, location, offer details, and preferred language (Tamil / English).' },
            { step: '2', title: 'Choose what you want to create', desc: 'Select from Ads, Instagram Captions, WhatsApp Messages, Reel Scripts, or Posters.' },
            { step: '3', title: 'AI generates your marketing content', desc: 'Get ready-to-use, beautifully formatted content. Copy, edit, or download instantly.' }
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 text-center relative flex flex-col items-center touch-feedback">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-indigo-600 to-pink-600 text-white font-black text-lg sm:text-xl flex items-center justify-center mb-4 sm:mb-5 shadow-lg shadow-indigo-600/30 shrink-0">
                {item.step}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-gray-800/80">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold">
            Simple Transparent Pricing
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Choose The Perfect Plan For Your Business
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm">
            Start for free today. Upgrade anytime as your marketing needs grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {/* FREE PLAN */}
          <div className="bg-gray-900/90 border border-gray-800 rounded-3xl p-5 sm:p-6 flex flex-col justify-between hover:border-gray-700 transition-all shadow-xl touch-feedback">
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">FREE</h3>
              <p className="text-xs text-gray-400 mt-1 mb-4">Try AI Marketing</p>

              <div className="mb-6">
                <span className="text-3xl sm:text-4xl font-black text-white">₹0</span>
                <span className="text-xs text-gray-400"> / forever</span>
              </div>

              <ul className="space-y-3 text-xs text-gray-300 mb-8">
                <li className="flex items-center gap-2 font-bold text-emerald-400">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <strong>10 AI Generations</strong>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  Instagram Captions & Hooks
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  WhatsApp Marketing
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  Tamil + English Support
                </li>
              </ul>
            </div>

            <Link
              href="/signup"
              className="w-full h-12 rounded-2xl bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs flex items-center justify-center transition-all touch-feedback"
            >
              Start Free (10 AI)
            </Link>
          </div>

          {/* STARTER PLAN - ₹299 */}
          <div 
            onClick={() => openPlanActivationModal('starter')}
            className="bg-gray-900/90 border border-gray-800 rounded-3xl p-5 sm:p-6 flex flex-col justify-between hover:border-blue-500/50 transition-all shadow-xl cursor-pointer group touch-feedback"
          >
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-1.5">
                STARTER <Zap className="w-4 h-4 text-blue-400" />
              </h3>
              <p className="text-xs text-gray-400 mt-1 mb-4">Small Business Starter</p>

              <div className="mb-6">
                <span className="text-3xl sm:text-4xl font-black text-white">₹299</span>
                <span className="text-xs text-gray-400"> / month</span>
              </div>

              <ul className="space-y-3 text-xs text-gray-300 mb-8">
                <li className="flex items-center gap-2 font-bold text-blue-400">
                  <Check className="w-4 h-4 text-blue-400 shrink-0" />
                  <strong>200 AI Generations</strong>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-400 shrink-0" />
                  All AI Marketing Tools
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-400 shrink-0" />
                  Business Growth Ideas
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-400 shrink-0" />
                  Reel Scripts & Calendars
                </li>
              </ul>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); openPlanActivationModal('starter'); }}
              className="w-full h-12 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs flex items-center justify-center transition-all shadow-lg shadow-blue-600/20 touch-feedback"
            >
              Activate Starter — ₹299
            </button>
          </div>

          {/* GROWTH PLAN - ₹499 */}
          <div 
            onClick={() => openPlanActivationModal('growth')}
            className="bg-gradient-to-b from-indigo-950/50 via-gray-900 to-indigo-950/50 border-2 border-indigo-500 rounded-3xl p-5 sm:p-6 flex flex-col justify-between relative shadow-2xl shadow-indigo-500/20 hover:border-indigo-400 transition-all cursor-pointer group touch-feedback"
          >
            <div className="absolute -top-3.5 right-4 sm:right-6 bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-[9px] sm:text-[10px] uppercase font-black tracking-wider px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full shadow-lg">
              MOST POPULAR 🔥
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-1.5">
                GROWTH <Sparkles className="w-4 h-4 text-indigo-400" />
              </h3>
              <p className="text-xs text-indigo-300 font-semibold mt-1 mb-4">Growing Businesses</p>

              <div className="mb-6">
                <span className="text-3xl sm:text-4xl font-black text-indigo-300">₹499</span>
                <span className="text-xs text-gray-400"> / month</span>
              </div>

              <ul className="space-y-3 text-xs text-gray-200 mb-8">
                <li className="flex items-center gap-2 font-bold text-indigo-400">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  <strong>500 AI Generations</strong>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  Full AI Growth Strategist
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  30-Day Marketing Plans
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  Priority Execution Speed
                </li>
              </ul>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); openPlanActivationModal('growth'); }}
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-black text-xs flex items-center justify-center transition-all shadow-xl shadow-indigo-600/30 touch-feedback"
            >
              Activate Growth — ₹499
            </button>
          </div>

          {/* PRO BUSINESS PLAN - ₹999 */}
          <div 
            onClick={() => openPlanActivationModal('pro_business')}
            className="bg-gradient-to-b from-amber-950/40 via-gray-900 to-orange-950/40 border-2 border-amber-500 rounded-3xl p-5 sm:p-6 flex flex-col justify-between relative shadow-2xl shadow-amber-500/20 hover:border-amber-400 transition-all cursor-pointer group touch-feedback"
          >
            <div className="absolute -top-3.5 right-4 sm:right-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[9px] sm:text-[10px] uppercase font-black tracking-wider px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full shadow-lg">
              UNLIMITED ♾️
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-1.5">
                PRO BUSINESS <Sparkles className="w-4 h-4 text-amber-400" />
              </h3>
              <p className="text-xs text-amber-300 font-semibold mt-1 mb-4">Unlimited Access</p>

              <div className="mb-6">
                <span className="text-3xl sm:text-4xl font-black text-amber-300">₹999</span>
                <span className="text-xs text-gray-400"> / month</span>
              </div>

              <ul className="space-y-3 text-xs text-gray-200 mb-8">
                <li className="flex items-center gap-2 font-black text-emerald-400">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <strong>Unlimited AI Generations</strong>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Unlimited Growth Ideas
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  All Future Tools Included
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  Priority 24/7 Engine
                </li>
              </ul>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); openPlanActivationModal('pro_business'); }}
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-pink-500 hover:from-orange-400 hover:to-amber-400 text-white font-black text-xs flex items-center justify-center transition-all shadow-xl shadow-orange-500/30 touch-feedback"
            >
              Activate Pro — ₹999
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <UpgradeModal />
    </div>
  );
}
