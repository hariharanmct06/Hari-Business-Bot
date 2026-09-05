'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bot, Building2, MapPin, Phone, Globe, Instagram, ArrowRight, Sparkles, Check } from 'lucide-react';
import { useApp } from '@/lib/store';
import { LanguageOption } from '@/types';

const businessTypeOptions = [
  'AI & Business Solutions',
  'Computer Centre',
  'Tuition Centre',
  'Restaurant / Food',
  'Salon / Beauty Centre',
  'Retail Store / Shop',
  'Electronics Store',
  'Freelancer / Consultant',
  'Gym & Fitness Studio',
  'Medical & Pharmacy',
  'Local Business'
];

const languageOptions: LanguageOption[] = [
  'Tamil',
  'Tamil + English',
  'English'
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user, updateBusinessProfile } = useApp();

  const [businessName, setBusinessName] = useState(user?.profile?.name || '');
  const [businessType, setBusinessType] = useState(user?.profile?.type || 'AI & Business Solutions');
  const [location, setLocation] = useState(user?.profile?.location || '');
  const [phone, setPhone] = useState(user?.profile?.phone || '');
  const [website, setWebsite] = useState(user?.profile?.website || '');
  const [instagram, setInstagram] = useState(user?.profile?.instagram || '');
  const [preferredLanguage, setPreferredLanguage] = useState<LanguageOption>(user?.profile?.preferredLanguage || 'Tamil + English');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusinessProfile({
      name: businessName,
      type: businessType,
      location,
      phone,
      website,
      instagram,
      preferredLanguage,
      onboarded: true
    });
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#090d16] flex items-center justify-center p-4 py-12 selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-2xl bg-gray-900/90 border border-gray-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Glowing Background Glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Welcome to HARI BUSINESS BOT
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Tell us about your business
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-md mx-auto">
            We will save these details to automatically generate ready-to-use marketing copy tailored to your brand!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Business Name & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-indigo-400" /> Business Name *
              </label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Hari Bot & Business Solutions"
                className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-indigo-400" /> Business Type
              </label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
              >
                {businessTypeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location & Phone Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" /> Location *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Main Road, Chennai"
                className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-indigo-400" /> Phone Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 8667808803"
                className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Website & Instagram */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-400" /> Website (Optional)
              </label>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="e.g. www.mybusiness.com"
                className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                <Instagram className="w-3.5 h-3.5 text-indigo-400" /> Instagram Handle (Optional)
              </label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="e.g. @mybusiness_official"
                className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Preferred Language */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-400" /> Preferred Marketing Language
            </label>
            <div className="grid grid-cols-3 gap-3">
              {languageOptions.map((lang) => (
                <button
                  type="button"
                  key={lang}
                  onClick={() => setPreferredLanguage(lang)}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                    preferredLanguage === lang
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-[#0b0f19] border-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {preferredLanguage === lang && <Check className="w-3.5 h-3.5 text-white" />}
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 mt-4"
          >
            Save Profile & Launch Dashboard <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
