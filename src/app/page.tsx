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
  Shield, 
  Users, 
  Star,
  Check
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-white flex flex-col selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Glow Background Blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-pink-500/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Hero Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold shadow-inner">
              <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
              Tamil + English AI Marketing Platform
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Grow Your Business <br />
              <span className="text-gradient-primary">With AI.</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Create advertisements, social media content, WhatsApp messages and marketing campaigns in seconds with <strong className="text-white">HARI BUSINESS BOT</strong>.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-base shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.03] active:scale-[0.98]"
              >
                ✨ Start Creating <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="#features"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-200 font-semibold text-base transition-all"
              >
                Explore Features
              </Link>
            </div>

            {/* Social Trust Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>No technical knowledge needed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Instant Tamil Unicode output</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Free 5 generations/month</span>
              </div>
            </div>
          </div>

          {/* Right Hero Dashboard Preview Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl p-3 bg-gradient-to-b from-indigo-500/30 via-gray-800/50 to-gray-900/90 border border-gray-700/60 shadow-2xl backdrop-blur-xl">
              <div className="bg-[#0b0f19] rounded-2xl p-5 border border-gray-800 space-y-4">
                {/* Mockup Header */}
                <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[11px] text-gray-400 font-mono">haribusinessbot.com/dashboard</span>
                </div>

                {/* Greeting Card */}
                <div className="bg-gradient-to-r from-indigo-900/60 to-purple-900/40 p-4 rounded-xl border border-indigo-500/30">
                  <span className="text-xs font-semibold text-indigo-300">Good morning 👋</span>
                  <h4 className="text-sm font-bold text-white mt-0.5">Hari Bot & Business Solutions</h4>
                  <p className="text-[11px] text-gray-300 mt-1">What would you like to create today?</p>
                </div>

                {/* Quick Feature Grid Preview */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-gray-900/80 p-3 rounded-xl border border-gray-800 flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                      <Megaphone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Ads</div>
                      <div className="text-[10px] text-gray-400">Promo copy</div>
                    </div>
                  </div>

                  <div className="bg-gray-900/80 p-3 rounded-xl border border-gray-800 flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-pink-500/20 text-pink-400">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">WhatsApp</div>
                      <div className="text-[10px] text-gray-400">Direct message</div>
                    </div>
                  </div>
                </div>

                {/* Mock Output Snippet */}
                <div className="bg-indigo-950/40 p-3.5 rounded-xl border border-indigo-500/30 text-xs font-tamil text-gray-200">
                  <div className="text-[10px] text-indigo-400 uppercase font-bold mb-1">Generated Output (Tamil)</div>
                  🔥 <strong>Hari Bot & Business Solutions</strong>-இல் 50% Independence Day தள்ளுபடி! AI & Digital Marketing வகுப்புகளில் இன்றே சேருங்கள்! 📞 98765 43210
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-800/80">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" /> Complete Marketing Suite
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Everything Your Business Needs To Grow
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            No need to hire expensive marketing agencies. HARI BUSINESS BOT handles all your advertising content automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 hover:border-indigo-500/40 hover:bg-gray-800/60 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${feat.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-800/80 bg-gray-950/40">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            How It Works in 3 Simple Steps
          </h2>
          <p className="text-gray-400 text-sm">
            Generate high-converting marketing content in less than 30 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {[
            { step: '1', title: 'Tell us about your business', desc: 'Enter your business name, location, offer details, and preferred language (Tamil / English).' },
            { step: '2', title: 'Choose what you want to create', desc: 'Select from Ads, Instagram Captions, WhatsApp Messages, Reel Scripts, or Posters.' },
            { step: '3', title: 'AI generates your marketing content', desc: 'Get ready-to-use, beautifully formatted content. Copy, edit, or download instantly.' }
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center relative flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 to-pink-600 text-white font-black text-xl flex items-center justify-center mb-5 shadow-lg shadow-indigo-600/30">
                {item.step}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-800/80">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold">
            Simple Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Choose The Perfect Plan For Your Business
          </h2>
          <p className="text-gray-400 text-sm">
            Start for free today. Upgrade anytime as your marketing needs grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* FREE PLAN */}
          <div className="bg-gray-900/90 border border-gray-800 rounded-3xl p-8 flex flex-col justify-between hover:border-gray-700 transition-all">
            <div>
              <h3 className="text-xl font-bold text-white">FREE</h3>
              <p className="text-xs text-gray-400 mt-1 mb-6">Perfect for trying out</p>

              <div className="mb-6">
                <span className="text-4xl font-black text-white">₹0</span>
                <span className="text-xs text-gray-400"> / forever</span>
              </div>

              <ul className="space-y-3 text-xs text-gray-300 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <strong>5 AI generations</strong> / month
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Basic marketing content
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Tamil + English support
                </li>
              </ul>
            </div>

            <Link
              href="/signup"
              className="w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-center font-semibold text-sm transition-all"
            >
              Get Started Free
            </Link>
          </div>

          {/* STARTER PLAN */}
          <div className="bg-gray-900/90 border-2 border-indigo-500 rounded-3xl p-8 flex flex-col justify-between relative shadow-xl shadow-indigo-500/10 hover:border-indigo-400 transition-all">
            <div className="absolute -top-3 right-6 bg-indigo-600 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-0.5 rounded-full">
              MOST POPULAR
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">STARTER</h3>
              <p className="text-xs text-gray-400 mt-1 mb-6">For Growing Local Businesses</p>

              <div className="mb-6">
                <span className="text-4xl font-black text-white">₹199</span>
                <span className="text-xs text-gray-400"> / month</span>
              </div>

              <ul className="space-y-3 text-xs text-gray-300 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400" />
                  <strong>100 generations</strong> / month
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400" />
                  Instagram content & captions
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400" />
                  WhatsApp marketing campaigns
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400" />
                  Reel video scripts
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400" />
                  Poster text generator
                </li>
              </ul>
            </div>

            <Link
              href="/signup"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-center font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30"
            >
              Start Starter Plan
            </Link>
          </div>

          {/* BUSINESS PLAN */}
          <div className="bg-gradient-to-b from-indigo-950/40 to-gray-900 border border-pink-500/40 rounded-3xl p-8 flex flex-col justify-between hover:border-pink-500/80 transition-all">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                BUSINESS <Sparkles className="w-4 h-4 text-pink-400" />
              </h3>
              <p className="text-xs text-gray-400 mt-1 mb-6">For Active Marketing & Stores</p>

              <div className="mb-6">
                <span className="text-4xl font-black text-white">₹499</span>
                <span className="text-xs text-gray-400"> / month</span>
              </div>

              <ul className="space-y-3 text-xs text-gray-300 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pink-400" />
                  <strong>500 generations</strong> / month
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pink-400" />
                  Full marketing campaigns
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pink-400" />
                  30-Day Content Calendar
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pink-400" />
                  Priority AI generation speed
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-pink-400" />
                  Advanced Tamil + English Features
                </li>
              </ul>
            </div>

            <Link
              href="/signup"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white text-center font-semibold text-sm transition-all shadow-lg shadow-pink-600/30"
            >
              Get Business Plan
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
