'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  BusinessProfile, 
  GenerationItem, 
  GenerationInput, 
  PlanType,
  AdminStats
} from '@/types';
import { generateMarketingContent } from './ai-engine';

export type ThemeMode = 'light' | 'dark';

interface AppContextType {
  user: User | null;
  history: GenerationItem[];
  usageCount: number;
  maxUsageLimit: number;
  isUsageLimitReached: boolean;
  showUpgradeModal: boolean;
  setShowUpgradeModal: (show: boolean) => void;
  selectedPlanForModal: PlanType | null;
  openPlanActivationModal: (plan?: PlanType) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  login: (email: string) => void;
  logout: () => void;
  signup: (name: string, email: string) => void;
  updateBusinessProfile: (profile: Partial<BusinessProfile>) => void;
  runGeneration: (input: GenerationInput) => Promise<GenerationItem>;
  deleteHistoryItem: (id: string) => void;
  upgradePlan: (plan: PlanType) => void;
  adminStats: AdminStats;
}

const defaultProfile: BusinessProfile = {
  name: 'Hari Bot & Business Solutions',
  type: 'AI & Business Solutions',
  location: 'Main Road, Chennai',
  phone: '8667808803',
  website: 'www.haribotbusiness.com',
  instagram: '@haribot_business_official',
  preferredLanguage: 'Tamil + English',
  onboarded: true,
};

const defaultUser: User = {
  id: 'usr_default_101',
  email: 'owner@business.com',
  name: 'Hariharan S',
  plan: 'free',
  isAdmin: false,
  profile: defaultProfile,
  created_at: new Date().toISOString(),
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const MAX_FREE_LIMIT = 10;
const MAX_STARTER_LIMIT = 200;
const MAX_GROWTH_LIMIT = 500;
const UNLIMITED_LIMIT = 999999;

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(defaultUser);
  const [history, setHistory] = useState<GenerationItem[]>([]);
  const [usageCount, setUsageCount] = useState<number>(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<PlanType | null>(null);
  const [theme, setTheme] = useState<ThemeMode>('dark');

  const openPlanActivationModal = (plan?: PlanType) => {
    if (plan) {
      setSelectedPlanForModal(plan);
    } else {
      setSelectedPlanForModal(null);
    }
    setShowUpgradeModal(true);
  };

  // Initialize state from local storage on client mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('hbb_user');
      const savedHistory = localStorage.getItem('hbb_history');
      const savedUsage = localStorage.getItem('hbb_usage');
      const savedTheme = localStorage.getItem('hbb_theme') as ThemeMode;

      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed?.profile?.name?.includes('CSC') || parsed?.profile?.type === 'Computer Centre') {
          parsed.profile.name = 'Hari Bot & Business Solutions';
          parsed.profile.type = 'AI & Business Solutions';
        }
        setUser(parsed);
      }
      if (savedHistory) setHistory(JSON.parse(savedHistory));
      if (savedUsage) setUsageCount(parseInt(savedUsage, 10));
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme);
      }
    } catch (e) {
      console.error('Failed to load storage:', e);
    }
  }, []);

  // Sync theme to HTML root element
  useEffect(() => {
    try {
      localStorage.setItem('hbb_theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    } catch (e) {
      console.error('Failed to set theme:', e);
    }
  }, [theme]);

  // Sync state to local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem('hbb_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('hbb_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('hbb_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('hbb_usage', usageCount.toString());
  }, [usageCount]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const isProUser = user?.plan === 'pro_business';
  const maxUsageLimit = 
    user?.plan === 'pro_business' ? UNLIMITED_LIMIT :
    user?.plan === 'growth' ? MAX_GROWTH_LIMIT :
    user?.plan === 'starter' ? MAX_STARTER_LIMIT : MAX_FREE_LIMIT;

  const isUsageLimitReached = isProUser ? false : usageCount >= maxUsageLimit;

  const login = (email: string) => {
    const isAdmin = email.toLowerCase().includes('admin');
    const newUser: User = {
      id: `usr_${Date.now()}`,
      email,
      name: email.split('@')[0].toUpperCase(),
      plan: 'free',
      isAdmin,
      profile: user?.profile || defaultProfile,
      created_at: new Date().toISOString(),
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const signup = (name: string, email: string) => {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      email,
      name,
      plan: 'free',
      isAdmin: false,
      profile: {
        ...defaultProfile,
        name: '',
        onboarded: false,
      },
      created_at: new Date().toISOString(),
    };
    setUser(newUser);
  };

  const updateBusinessProfile = (profileUpdate: Partial<BusinessProfile>) => {
    if (!user) return;
    const updatedProfile = { ...user.profile, ...profileUpdate, onboarded: true };
    setUser({
      ...user,
      profile: updatedProfile,
    });
  };

  const runGeneration = async (input: GenerationInput): Promise<GenerationItem> => {
    if (isUsageLimitReached) {
      setShowUpgradeModal(true);
      throw new Error(`You've reached your generation limit of ${maxUsageLimit}. Upgrade your plan for more generations.`);
    }

    const result = await generateMarketingContent(input);

    let snippet = '';
    if ('headline' in result && typeof result.headline === 'string') {
      snippet = result.headline;
    } else if ('hook' in result && typeof result.hook === 'string') {
      snippet = result.hook;
    } else if ('formattedMessage' in result && typeof result.formattedMessage === 'string') {
      snippet = result.formattedMessage.slice(0, 100) + '...';
    } else if ('title' in result && typeof result.title === 'string') {
      snippet = result.title;
    } else if (Array.isArray(result)) {
      snippet = `${input.calendarDuration || 7}-Day Marketing Content Plan`;
    } else if ('topRecommendedActions' in result) {
      snippet = `AI Growth Strategy for ${input.businessName}`;
    }

    const newItem: GenerationItem = {
      id: `gen_${Date.now()}`,
      userId: user?.id || 'guest',
      toolType: input.contentType,
      businessName: input.businessName,
      language: input.language,
      createdAt: new Date().toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      input: input,
      output: result,
      previewSnippet: snippet
    };

    setHistory((prev) => [newItem, ...prev]);
    setUsageCount((prev) => prev + 1);

    return newItem;
  };

  const deleteHistoryItem = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const upgradePlan = (plan: PlanType) => {
    if (!user) return;
    setUser({ ...user, plan });
    setShowUpgradeModal(false);
  };

  const adminStats: AdminStats = {
    totalUsers: 1840,
    activeUsers: 1120,
    totalGenerations: 18450 + history.length,
    freeUsers: 1350,
    paidUsers: 490,
    topGenerators: [
      { tool: 'growth_ideas', count: 5800 },
      { tool: 'advertisement', count: 4200 },
      { tool: 'whatsapp', count: 3500 },
      { tool: 'instagram', count: 2800 },
      { tool: 'poster', count: 1150 },
      { tool: 'reel_script', count: 800 }
    ]
  };

  return (
    <AppContext.Provider
      value={{
        user,
        history,
        usageCount,
        maxUsageLimit,
        isUsageLimitReached,
        showUpgradeModal,
        setShowUpgradeModal,
        selectedPlanForModal,
        openPlanActivationModal,
        theme,
        toggleTheme,
        login,
        logout,
        signup,
        updateBusinessProfile,
        runGeneration,
        deleteHistoryItem,
        upgradePlan,
        adminStats
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
