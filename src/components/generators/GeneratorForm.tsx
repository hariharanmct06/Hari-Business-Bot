'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Building2, 
  Tag, 
  MapPin, 
  Globe, 
  Volume2, 
  PhoneCall, 
  Users, 
  ShoppingBag,
  Sliders,
  Palette,
  Clock,
  CalendarDays
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { GenerationInput, LanguageOption, ToneOption, ToolType, PosterStyle } from '@/types';

interface GeneratorFormProps {
  toolType: ToolType;
  title: string;
  description: string;
  onGenerate: (input: GenerationInput) => void;
  isLoading: boolean;
}

const businessTypes = [
  'Computer Centre',
  'Tuition Centre',
  'Restaurant / Food',
  'Salon / Beauty',
  'Retail Shop',
  'Electronics Store',
  'Freelancer / Consultant',
  'Gym & Fitness',
  'Local Store'
];

const toneOptions: ToneOption[] = [
  'Professional',
  'Friendly',
  'Premium',
  'Exciting',
  'Urgent',
  'Local Business'
];

const languageOptions: LanguageOption[] = [
  'Tamil + English',
  'Tamil',
  'English'
];

const posterStyles: PosterStyle[] = [
  'Modern',
  'Premium',
  'Festival',
  'Minimal',
  'Local Business'
];

export const GeneratorForm: React.FC<GeneratorFormProps> = ({
  toolType,
  title,
  description,
  onGenerate,
  isLoading
}) => {
  const { user } = useApp();

  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('Computer Centre');
  const [productService, setProductService] = useState('');
  const [offerDiscount, setOfferDiscount] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [location, setLocation] = useState('');
  const [language, setLanguage] = useState<LanguageOption>('Tamil + English');
  const [tone, setTone] = useState<ToneOption>('Exciting');
  const [callToAction, setCallToAction] = useState('');

  // Extra tool specific options
  const [reelDuration, setReelDuration] = useState<'15s' | '30s' | '60s'>('30s');
  const [calendarDuration, setCalendarDuration] = useState<'7' | '14' | '30'>('7');
  const [posterStyle, setPosterStyle] = useState<PosterStyle>('Modern');
  const [posterDate, setPosterDate] = useState('Limited Period Offer');

  // Pre-fill from user profile
  useEffect(() => {
    if (user?.profile) {
      if (user.profile.name) setBusinessName(user.profile.name);
      if (user.profile.type) setBusinessType(user.profile.type);
      if (user.profile.location) setLocation(user.profile.location);
      if (user.profile.preferredLanguage) setLanguage(user.profile.preferredLanguage);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      businessName,
      businessType,
      productService,
      offerDiscount,
      targetAudience,
      location,
      language,
      tone,
      callToAction,
      contentType: toolType,
      reelDuration,
      calendarDuration,
      posterStyle,
      posterDate
    });
  };

  return (
    <div className="bg-gray-900/90 border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl">
      <div className="mb-6 border-b border-gray-800 pb-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-indigo-400" />
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">{description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Business Name & Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              {businessTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product / Service & Offer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-indigo-400" /> Product / Service *
            </label>
            <input
              type="text"
              required
              value={productService}
              onChange={(e) => setProductService(e.target.value)}
              placeholder="e.g. Tally Prime, Python Course, Special Thali"
              className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-indigo-400" /> Offer / Discount
            </label>
            <input
              type="text"
              value={offerDiscount}
              onChange={(e) => setOfferDiscount(e.target.value)}
              placeholder="e.g. 50% Festival Discount, Buy 1 Get 1 Free"
              className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Target Audience & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-indigo-400" /> Target Audience
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. Students, Families, Office Workers"
              className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" /> Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. T. Nagar, Chennai"
              className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Language & Tone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-400" /> Language
            </label>
            <div className="flex gap-2">
              {languageOptions.map((lang) => (
                <button
                  type="button"
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`flex-1 py-2 rounded-xl text-xs font-medium border transition-all ${
                    language === lang
                      ? 'bg-indigo-600 border-indigo-500 text-white font-bold shadow-md shadow-indigo-600/20'
                      : 'bg-[#0b0f19] border-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-indigo-400" /> Tone
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as ToneOption)}
              className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
            >
              {toneOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Specific tool options */}
        {toolType === 'reel_script' && (
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-400" /> Reel Duration
            </label>
            <div className="flex gap-3">
              {(['15s', '30s', '60s'] as const).map((dur) => (
                <button
                  type="button"
                  key={dur}
                  onClick={() => setReelDuration(dur)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                    reelDuration === dur
                      ? 'bg-gradient-to-r from-pink-600 to-indigo-600 border-pink-500 text-white shadow-md'
                      : 'bg-[#0b0f19] border-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {dur} Duration
                </button>
              ))}
            </div>
          </div>
        )}

        {toolType === 'calendar' && (
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5 text-indigo-400" /> Marketing Plan Duration
            </label>
            <div className="flex gap-3">
              {(['7', '14', '30'] as const).map((days) => (
                <button
                  type="button"
                  key={days}
                  onClick={() => setCalendarDuration(days)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                    calendarDuration === days
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                      : 'bg-[#0b0f19] border-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {days} Days Plan
                </button>
              ))}
            </div>
          </div>
        )}

        {toolType === 'poster' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-indigo-400" /> Poster Theme Style
              </label>
              <select
                value={posterStyle}
                onChange={(e) => setPosterStyle(e.target.value as PosterStyle)}
                className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
              >
                {posterStyles.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5 text-indigo-400" /> Poster Badge / Date Text
              </label>
              <input
                type="text"
                value={posterDate}
                onChange={(e) => setPosterDate(e.target.value)}
                placeholder="e.g. Valid till Diwali"
                className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-base shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
          ✨ Generate Content
        </button>
      </form>
    </div>
  );
};
