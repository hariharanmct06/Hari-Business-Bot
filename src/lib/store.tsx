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

interface AppContextType {
  user: User | null;
  history: GenerationItem[];
  usageCount: number;
  maxUsageLimit: number;
  isUsageLimitReached: boolean;
  showUpgradeModal: boolean;
  setShowUpgradeModal: (show: boolean) => void;
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
  name: 'CSC Computer Centre',
  type: 'Computer Centre',
  location: 'Main Road, Chennai',
  phone: '9876543210',
  website: 'www.csccomputer.com',
  instagram: '@csccomputer_official',
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

const MAX_FREE_LIMIT = 5;
const MAX_STARTER_LIMIT = 100;
const MAX_BUSINESS_LIMIT = 500;

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(defaultUser);
  const [history, setHistory] = useState<GenerationItem[]>([]);
  const [usageCount, setUsageCount] = useState<number>(1);
  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false);

  // Initialize state from local storage on client mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('hbb_user');
      const savedHistory = localStorage.getItem('hbb_history');
      const savedUsage = localStorage.getItem('hbb_usage');

      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedHistory) setHistory(JSON.parse(savedHistory));
      if (savedUsage) setUsageCount(parseInt(savedUsage, 10));
    } catch (e) {
      console.error('Failed to load storage:', e);
    }
  }, []);

  // Sync to local storage
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

  const maxUsageLimit = user?.plan === 'business' 
    ? MAX_BUSINESS_LIMIT 
    : user?.plan === 'starter' 
    ? MAX_STARTER_LIMIT 
    : MAX_FREE_LIMIT;

  const isUsageLimitReached = usageCount >= maxUsageLimit;

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
      throw new Error("Free limit reached. Please upgrade your plan.");
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
    totalUsers: 1420,
    activeUsers: 890,
    totalGenerations: 12450 + history.length,
    freeUsers: 1100,
    paidUsers: 320,
    topGenerators: [
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
