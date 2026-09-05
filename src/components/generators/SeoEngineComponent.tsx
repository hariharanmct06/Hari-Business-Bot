'use client';

import React, { useState } from 'react';
import { Search, Sparkles, Copy, Check, RefreshCw, AlertCircle, Hash, FileText } from 'lucide-react';
import { SeoEngineResult } from '@/types';

export const SeoEngineComponent: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [location, setLocation] = useState('');
  const [keyword, setKeyword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [result, setResult] = useState<SeoEngineResult | null>(null);

  const [copiedTitleIndex, setCopiedTitleIndex] = useState<number | null>(null);
  const [copiedHashtags, setCopiedHashtags] = useState(false);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!topic.trim()) {
      return;
    }

    setIsLoading(true);
    setIsError(false);
    setResult(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: topic,
          businessType: 'General Topic',
          productService: topic,
          targetAudience: targetAudience || undefined,
          location: location || undefined,
          keyword: keyword || undefined,
          contentType: 'seo_engine',
          language: 'English',
          tone: 'Professional'
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate SEO ideas');
      }

      setResult(data.data as SeoEngineResult);
    } catch (err) {
      console.error('SEO generation error:', err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, onSuccess: () => void) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(onSuccess).catch(() => {
        fallbackCopy(text, onSuccess);
      });
    } else {
      fallbackCopy(text, onSuccess);
    }
  };

  const fallbackCopy = (text: string, onSuccess: () => void) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      onSuccess();
    } catch (err) {
      console.error('Copy fallback failed:', err);
    }
    document.body.removeChild(textArea);
  };

  const handleCopyTitle = (titleText: string, index: number) => {
    copyToClipboard(titleText, () => {
      setCopiedTitleIndex(index);
      setTimeout(() => {
        setCopiedTitleIndex(null);
      }, 2000);
    });
  };

  const handleCopyHashtags = () => {
    if (!result || !result.hashtags) return;
    const hashtagText = result.hashtags.join(' ');
    copyToClipboard(hashtagText, () => {
      setCopiedHashtags(true);
      setTimeout(() => {
        setCopiedHashtags(false);
      }, 2000);
    });
  };

  return (
    <div className="w-full bg-gradient-to-b from-gray-900 via-gray-900/90 to-gray-950 border border-gray-800 rounded-3xl p-5 sm:p-8 shadow-2xl shadow-indigo-950/20 backdrop-blur-xl">
      {/* Header Banner */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 shrink-0">
          <Search className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            SEO Optimization Engine
            <span className="text-[10px] sm:text-xs bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
              NEW ⚡
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
            Turn your topic into search-friendly titles and powerful hashtags.
          </p>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleGenerate} className="space-y-4">
        {/* Business / Topic - Required */}
        <div>
          <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-1.5">
            Business / Topic <span className="text-indigo-400">*</span>
          </label>
          <input
            type="text"
            required
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter your business, product, service or topic..."
            className="w-full h-12 sm:h-14 px-4 bg-gray-950/80 border border-gray-800 rounded-2xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Optional Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Target Audience */}
          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Target Audience <span className="text-gray-500 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="Who are you targeting?"
              className="w-full h-12 px-3.5 bg-gray-950/80 border border-gray-800 rounded-2xl text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Location <span className="text-gray-500 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City / Country / Area"
              className="w-full h-12 px-3.5 bg-gray-950/80 border border-gray-800 rounded-2xl text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Keyword */}
          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Main Keyword <span className="text-gray-500 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Main keyword"
              className="w-full h-12 px-3.5 bg-gray-950/80 border border-gray-800 rounded-2xl text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Generate Button */}
        <button
          type="submit"
          disabled={isLoading || !topic.trim()}
          className="w-full h-12 sm:h-14 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 disabled:opacity-50 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-600/25 touch-feedback cursor-pointer"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>AI is optimizing your SEO...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>✨ Generate SEO Ideas</span>
            </>
          )}
        </button>
      </form>

      {/* Loading Overlay State */}
      {isLoading && (
        <div className="mt-8 p-8 bg-gray-950/60 border border-indigo-500/20 rounded-2xl text-center space-y-3">
          <div className="w-10 h-10 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin mx-auto" />
          <p className="text-sm font-semibold text-indigo-300">
            AI is optimizing your SEO...
          </p>
          <p className="text-xs text-gray-400">
            Analyzing search intent, primary keywords, and engagement appeal.
          </p>
        </div>
      )}

      {/* Error State */}
      {isError && !isLoading && (
        <div className="mt-8 p-6 bg-rose-950/30 border border-rose-500/30 rounded-2xl text-center space-y-4">
          <div className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-5 h-5" />
          </div>
          <p className="text-sm font-bold text-rose-200">
            Something went wrong. Please try again.
          </p>
          <button
            type="button"
            onClick={() => handleGenerate()}
            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg cursor-pointer"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty Initial State */}
      {!result && !isLoading && !isError && (
        <div className="mt-8 p-8 border border-dashed border-gray-800 rounded-2xl text-center space-y-2 bg-gray-950/40">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
            <Search className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">
            Turn your topic into search-friendly titles and powerful hashtags.
          </h4>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Enter your topic and let HARI BUSINESS BOT optimize your SEO ideas.
          </p>
        </div>
      )}

      {/* Generated Results View */}
      {result && !isLoading && (
        <div className="mt-8 space-y-8 animate-fadeIn">
          {/* Section 1: SEO-Optimized Title Ideas */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
              <FileText className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base sm:text-lg font-bold text-white">
                SEO-Optimized Title Ideas
              </h3>
            </div>

            <div className="space-y-3">
              {result.titles.map((titleText, idx) => {
                const numberFormatted = String(idx + 1).padStart(2, '0');
                const isCopied = copiedTitleIndex === idx;

                return (
                  <div
                    key={idx}
                    className="bg-gray-950/80 border border-gray-800 hover:border-indigo-500/40 rounded-2xl p-4 flex items-center justify-between gap-3 transition-all group shadow-sm"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-1 rounded-lg shrink-0">
                        {numberFormatted}
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-gray-100 leading-snug truncate sm:whitespace-normal">
                        {titleText}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyTitle(titleText, idx)}
                      className={`min-h-[44px] min-w-[44px] px-3 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shrink-0 touch-feedback cursor-pointer ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-800 hover:bg-gray-700 text-gray-200 group-hover:bg-indigo-600 group-hover:text-white'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Top 5 SEO Hashtags */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-pink-400" />
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Top 5 SEO Hashtags
                </h3>
              </div>

              <button
                type="button"
                onClick={handleCopyHashtags}
                className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-md touch-feedback cursor-pointer ${
                  copiedHashtags
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white'
                }`}
              >
                {copiedHashtags ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>✓ Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy All</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-gray-950/80 border border-gray-800 rounded-2xl p-5 shadow-inner">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {result.hashtags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono text-xs sm:text-sm font-bold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
