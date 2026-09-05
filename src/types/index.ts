export type ToolType = 
  | 'advertisement' 
  | 'poster' 
  | 'instagram' 
  | 'whatsapp' 
  | 'reel_script' 
  | 'calendar'
  | 'growth_ideas'
  | 'seo_engine';

export type LanguageOption = 'English' | 'Tamil' | 'Tamil + English';

export type ToneOption = 
  | 'Professional' 
  | 'Friendly' 
  | 'Premium' 
  | 'Exciting' 
  | 'Urgent' 
  | 'Local Business';

export type PosterStyle = 
  | 'Modern' 
  | 'Premium' 
  | 'Festival' 
  | 'Minimal' 
  | 'Local Business';

export type GrowthCategory = 
  | 'Business Ideas'
  | 'Digital Marketing Ideas'
  | 'AI Ideas'
  | 'Growth Strategies'
  | 'Revenue Ideas'
  | 'Marketing Campaign Ideas';

export type PlanType = 'free' | 'starter' | 'growth' | 'pro_business';

export interface BusinessProfile {
  name: string;
  type: string;
  location: string;
  phone: string;
  website?: string;
  instagram?: string;
  preferredLanguage: LanguageOption;
  onboarded: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  plan: PlanType;
  isAdmin: boolean;
  profile: BusinessProfile;
  created_at: string;
}

export interface GenerationInput {
  businessName: string;
  businessType: string;
  productService: string;
  offerDiscount?: string;
  targetAudience?: string;
  location?: string;
  language: LanguageOption;
  tone: ToneOption;
  callToAction?: string;
  contentType: ToolType;
  // Specific tool options
  reelDuration?: '15s' | '30s' | '60s';
  calendarDuration?: '7' | '14' | '30';
  posterStyle?: PosterStyle;
  posterDate?: string;
  // Growth Ideas specific options
  currentChallenges?: string;
  marketingBudget?: string;
  selectedCategory?: GrowthCategory;
  // SEO Engine specific options
  keyword?: string;
}

export interface AdvertisementResult {
  headline: string;
  subheadline: string;
  mainAd: string;
  offer: string;
  cta: string;
  hashtags: string[];
}

export interface InstagramResult {
  hook: string;
  caption: string;
  mainContent: string;
  cta: string;
  hashtags: string[];
  emojis: string[];
}

export interface WhatsAppResult {
  formattedMessage: string;
  rawText: string;
}

export interface ReelScene {
  sceneNumber: number;
  name: string; // Hook, Problem, Solution, Offer, CTA
  visual: string;
  voiceover: string;
}

export interface ReelScriptResult {
  title: string;
  duration: string;
  scenes: ReelScene[];
  suggestedBgm: string;
}

export interface CalendarDayItem {
  dayNumber: number;
  platform: 'Instagram' | 'WhatsApp' | 'Facebook' | 'Poster' | 'Reel';
  contentType: string;
  topic: string;
  caption: string;
  cta: string;
}

export interface PosterResult {
  headline: string;
  subheadline: string;
  offer: string;
  bodyText: string;
  dateBadge?: string;
  contactText: string;
  locationText: string;
  style: PosterStyle;
  bgColor: string;
  accentColor: string;
}

export interface SingleGrowthIdea {
  id: string;
  ideaName: string;
  explanation: string;
  whyItHelps: string;
  howToImplement: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  cost: '₹0 (Free)' | 'Low Cost' | 'Medium' | 'High';
  impact: 'Low' | 'Medium' | 'High Impact';
  platform: string;
  category: string;
}

export interface WeeklyPlanItem {
  weekNumber: number;
  title: string;
  actionItems: string[];
}

export interface GrowthIdeasResult {
  topRecommendedActions: string[];
  thirtyDayPlan: WeeklyPlanItem[];
  ideas: SingleGrowthIdea[];
}

export interface SeoEngineResult {
  titles: string[];
  hashtags: string[];
}

export type GenerationContentResult = 
  | AdvertisementResult 
  | InstagramResult 
  | WhatsAppResult 
  | ReelScriptResult 
  | CalendarDayItem[] 
  | PosterResult
  | GrowthIdeasResult
  | SeoEngineResult;

export interface GenerationItem {
  id: string;
  userId: string;
  toolType: ToolType;
  businessName: string;
  language: LanguageOption;
  createdAt: string;
  input: GenerationInput;
  output: GenerationContentResult;
  previewSnippet: string;
}

export interface UsageLimit {
  currentCount: number;
  maxLimit: number; // 5 for free, 100 starter, 500 business
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalGenerations: number;
  freeUsers: number;
  paidUsers: number;
  topGenerators: { tool: ToolType; count: number }[];
}
