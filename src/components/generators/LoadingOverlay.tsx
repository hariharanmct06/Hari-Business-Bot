'use client';

import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

interface LoadingOverlayProps {
  isLoading: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0f172a] border border-indigo-500/30 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl flex flex-col items-center relative overflow-hidden">
        {/* Glowing background circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl animate-pulse" />

        {/* Animated Bot Icon */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-1 animate-bounce shadow-xl shadow-indigo-500/30">
            <div className="w-full h-full bg-[#0b0f19] rounded-xl flex items-center justify-center">
              <Bot className="w-10 h-10 text-indigo-400 animate-spin-slow" />
            </div>
          </div>
          <Sparkles className="w-6 h-6 text-pink-400 absolute -top-2 -right-2 animate-ping" />
        </div>

        {/* Loading Message */}
        <h3 className="text-xl font-extrabold text-white flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
          HARI BUSINESS BOT
        </h3>
        <p className="text-indigo-300 font-semibold text-base mb-4 animate-pulse">
          is creating your content...
        </p>

        <p className="text-xs text-gray-400">
          Tailoring marketing copy in Tamil & English for maximum customer engagement.
        </p>

        {/* Loading Progress Bar */}
        <div className="w-full bg-gray-800 h-1.5 rounded-full mt-6 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse w-full" />
        </div>
      </div>
    </div>
  );
};
