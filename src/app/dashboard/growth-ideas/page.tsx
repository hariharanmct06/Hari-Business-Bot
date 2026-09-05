'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingOverlay } from '@/components/generators/LoadingOverlay';
import { useApp } from '@/lib/store';
import { GenerationInput, GrowthIdeasResult, GenerationItem, GrowthCategory, SingleGrowthIdea } from '@/types';
import { 
  Lightbulb, 
  Sparkles, 
  Building2, 
  MapPin, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  AlertCircle, 
  Check, 
  Copy, 
  Heart, 
  Calendar, 
  RotateCw,
  Rocket,
  Share2,
  Bot,
  TrendingUp,
  Target,
  Zap,
  CheckCircle2,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

const categories: { id: GrowthCategory; name: string; icon: any; desc: string }[] = [
  { id: 'Business Ideas', name: '🚀 Business Ideas', icon: Rocket, desc: 'New products, services, partnerships & expansion' },
  { id: 'Digital Marketing Ideas', name: '📱 Digital Marketing Ideas', icon: Share2, desc: 'Instagram, WhatsApp, Google Maps, SEO & ads' },
  { id: 'AI Ideas', name: '🤖 AI Ideas', icon: Bot, desc: 'Chatbots, marketing automation & AI workflows' },
  { id: 'Growth Strategies', name: '📈 Growth Strategies', icon: TrendingUp, desc: 'Customer acquisition, referrals & retention' },
  { id: 'Revenue Ideas', name: '💰 Revenue Ideas', icon: DollarSign, desc: 'Bundles, subscriptions & monetization' },
  { id: 'Marketing Campaign Ideas', name: '🎯 Marketing Campaign Ideas', icon: Target, desc: 'Campaign concepts with goals & offers' },
];

export default function GrowthIdeasPage() {
  const router = useRouter();
  const { runGeneration, user } = useApp();

  const [businessName, setBusinessName] = useState(user?.profile?.name || 'Hari Bot & Business Solutions');
  const [businessType, setBusinessType] = useState(user?.profile?.type || 'AI & Business Solutions');
  const [productService, setProductService] = useState('AI Marketing, Web Development, Automation');
  const [targetAudience, setTargetAudience] = useState('Local Store Owners, Tuition Centres, Restaurants');
  const [location, setLocation] = useState(user?.profile?.location || 'Chennai');
  const [challenges, setChallenges] = useState('Getting consistent local inquiries & converting social media leads');
  const [budget, setMarketingBudget] = useState('Under ₹5,000');
  const [selectedCategory, setSelectedCategory] = useState<GrowthCategory>('Business Ideas');

  const [isLoading, setIsLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<GenerationItem | null>(null);
  const [savedIdeaIds, setSavedIdeaIds] = useState<string[]>([]);
  const [copiedIdeaId, setCopiedIdeaId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      setIsLoading(true);
      const input: GenerationInput = {
        businessName,
        businessType,
        productService,
        targetAudience,
        location,
        language: user?.profile?.preferredLanguage || 'Tamil + English',
        tone: 'Exciting',
        contentType: 'growth_ideas',
        currentChallenges: challenges,
        marketingBudget: budget,
        selectedCategory
      };
      const res = await runGeneration(input);
      setCurrentResult(res);
    } catch (err: any) {
      alert(err.message || 'Failed to generate growth ideas.');
    } finally {
      setIsLoading(false);
    }
  };

  const growthResult = currentResult?.output as GrowthIdeasResult;

  const toggleSaveIdea = (id: string) => {
    setSavedIdeaIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleCopyIdea = (idea: SingleGrowthIdea) => {
    const text = `${idea.ideaName}\n${idea.explanation}\n\nWhy it helps: ${idea.whyItHelps}\nHow to implement: ${idea.howToImplement}\nDifficulty: ${idea.difficulty} | Cost: ${idea.cost} | Impact: ${idea.impact} | Platform: ${idea.platform}`;
    navigator.clipboard.writeText(text);
    setCopiedIdeaId(idea.id);
    setTimeout(() => setCopiedIdeaId(null), 2000);
  };

  const handleTurnIntoPlan = () => {
    router.push('/dashboard/calendar');
  };

  const filteredIdeas = growthResult?.ideas.filter(
    (idea) => categoryFilter === 'All' || idea.category === categoryFilter
  ) || [];

  return (
    <div className="space-y-8 pb-12">
      <LoadingOverlay isLoading={isLoading} />

      {/* Prominent Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/60 via-orange-950/40 to-indigo-950/60 border border-amber-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> AI Business Strategist Engine
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white flex items-center gap-2">
            💡 Business Growth Ideas
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
            Get practical, creative, and actionable ideas tailored specifically to your business to acquire customers, leverage AI, increase revenue, and dominate your local market.
          </p>
        </div>
      </div>

      {/* Business Details Input Form */}
      <div className="bg-gray-900/90 border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="mb-6 border-b border-gray-800 pb-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-400" />
            Tell AI About Your Business
          </h2>
          <p className="text-xs text-gray-400 mt-1">Provide your business context so the AI can generate 10–15 customized growth ideas.</p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-6">
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
                className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-indigo-400" /> Business Category / Type *
              </label>
              <input
                type="text"
                required
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                placeholder="e.g. AI & Business Solutions / Retail / Salon"
                className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Products/Services & Target Audience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-indigo-400" /> Products / Services Offered *
              </label>
              <input
                type="text"
                required
                value={productService}
                onChange={(e) => setProductService(e.target.value)}
                placeholder="e.g. AI Marketing, Social Media Growth, Web Dev"
                className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-indigo-400" /> Target Customers *
              </label>
              <input
                type="text"
                required
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g. Local Business Owners, Shop Owners, Students"
                className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Location, Challenges & Budget */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" /> Location *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Chennai, T. Nagar"
                className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-indigo-400" /> Current Challenges
              </label>
              <input
                type="text"
                value={challenges}
                onChange={(e) => setChallenges(e.target.value)}
                placeholder="e.g. Low footfall, acquiring online leads"
                className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-indigo-400" /> Monthly Budget (Optional)
              </label>
              <select
                value={budget}
                onChange={(e) => setMarketingBudget(e.target.value)}
                className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                <option value="₹0 (Free)">₹0 (Free / Organic)</option>
                <option value="Under ₹5,000">Under ₹5,000 / month</option>
                <option value="₹5,000 - ₹25,000">₹5,000 - ₹25,000 / month</option>
                <option value="₹25,000+">₹25,000+ / month</option>
              </select>
            </div>
          </div>

          {/* Selectable Categories Grid */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2.5">
              Select Focus Growth Area:
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSel = selectedCategory === cat.id;
                return (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      isSel
                        ? 'bg-amber-500/20 border-amber-500 text-white shadow-lg shadow-amber-500/20'
                        : 'bg-[#0b0f19] border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800/40'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-2 ${isSel ? 'text-amber-400' : 'text-gray-500'}`} />
                    <div>
                      <div className="text-xs font-bold leading-tight">{cat.name}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-pink-600 hover:from-amber-400 hover:to-pink-500 text-white font-black text-base shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 animate-pulse" />
            Generate Growth Ideas & 30-Day Strategy
          </button>
        </form>
      </div>

      {/* AI OUTPUT SECTION */}
      {growthResult && (
        <div className="space-y-8 animate-fade-in">
          {/* Top 3 Priority Strategy Banner */}
          <div className="bg-gradient-to-r from-indigo-950 via-gray-900 to-amber-950/60 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
                    🔥 AI Recommended Growth Strategy
                  </h3>
                  <p className="text-xs text-gray-400">3 highest-priority actions for {currentResult?.businessName}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleTurnIntoPlan}
                  className="py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all"
                >
                  <Calendar className="w-4 h-4" /> 📊 Turn Into Marketing Plan
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {growthResult.topRecommendedActions.map((action, idx) => (
                <div key={idx} className="bg-[#0b0f19] border border-gray-800 p-4 rounded-2xl space-y-2">
                  <div className="text-xs font-bold text-amber-300 uppercase tracking-wide">Action #{idx + 1}</div>
                  <p className="text-xs text-gray-200 leading-relaxed font-semibold">{action}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-gray-900/80 rounded-xl border border-gray-800 text-[11px] text-gray-400 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Note: These growth suggestions are realistic execution steps based on your budget. Business outcomes depend on active daily implementation.</span>
            </div>
          </div>

          {/* 30-Day Growth Plan Timeline */}
          <div className="bg-gray-900/90 border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-400" />
              30-Day Growth Execution Roadmap
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {growthResult.thirtyDayPlan.map((week) => (
                <div key={week.weekNumber} className="bg-[#0b0f19] border border-gray-800 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
                    <span className="w-7 h-7 rounded-lg bg-indigo-600/30 text-indigo-400 font-extrabold text-xs flex items-center justify-center border border-indigo-500/30">
                      W{week.weekNumber}
                    </span>
                    <h4 className="text-xs font-extrabold text-white truncate">{week.title}</h4>
                  </div>

                  <ul className="space-y-2 text-xs text-gray-300">
                    {week.actionItems.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Ideas Grid Section */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  💡 {growthResult.ideas.length} Customized Growth Ideas
                </h3>
                <p className="text-xs text-gray-400">Click any category below to filter specific actionable ideas.</p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1.5">
                {['All', ...categories.map((c) => c.id)].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                      categoryFilter === cat
                        ? 'bg-amber-500 border-amber-400 text-white font-bold'
                        : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIdeas.map((idea) => {
                const isSaved = savedIdeaIds.includes(idea.id);

                return (
                  <div
                    key={idea.id}
                    className="bg-gray-900/90 border border-gray-800 hover:border-amber-500/40 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-lg hover:scale-[1.01] transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          {idea.category}
                        </span>

                        <button
                          onClick={() => toggleSaveIdea(idea.id)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            isSaved
                              ? 'bg-pink-500/20 border-pink-500 text-pink-400'
                              : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-pink-400'
                          }`}
                          title="Save Idea"
                        >
                          <Heart className={`w-4 h-4 ${isSaved ? 'fill-pink-500' : ''}`} />
                        </button>
                      </div>

                      <h4 className="text-base font-extrabold text-white leading-snug">
                        {idea.ideaName}
                      </h4>

                      <p className="text-xs text-gray-300 leading-relaxed font-medium">
                        {idea.explanation}
                      </p>

                      <div className="bg-[#0b0f19] p-3 rounded-xl border border-gray-800 space-y-1.5 text-xs">
                        <div>
                          <strong className="text-amber-300">Why it helps:</strong>{' '}
                          <span className="text-gray-300">{idea.whyItHelps}</span>
                        </div>
                        <div>
                          <strong className="text-indigo-300">How to implement:</strong>{' '}
                          <span className="text-gray-300">{idea.howToImplement}</span>
                        </div>
                      </div>

                      {/* Attribute Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1 text-[10px] font-bold">
                        <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                          Difficulty: {idea.difficulty}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                          Cost: {idea.cost}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          Impact: {idea.impact}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-pink-500/10 text-pink-300 border border-pink-500/20">
                          Platform: {idea.platform}
                        </span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-3 border-t border-gray-800 flex items-center justify-between gap-2 text-xs">
                      <button
                        onClick={() => handleCopyIdea(idea)}
                        className="flex-1 py-2 px-3 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-xl font-semibold flex items-center justify-center gap-1 border border-gray-700 transition-all"
                      >
                        {copiedIdeaId === idea.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedIdeaId === idea.id ? 'Copied' : '📋 Copy'}
                      </button>

                      <button
                        onClick={handleTurnIntoPlan}
                        className="flex-1 py-2 px-3 bg-amber-600/20 text-amber-300 hover:bg-amber-600/30 rounded-xl font-bold flex items-center justify-center gap-1 border border-amber-500/30 transition-all"
                      >
                        <Calendar className="w-3.5 h-3.5" /> Plan
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
