'use client';

import React, { useState } from 'react';
import { GeneratorForm } from '@/components/generators/GeneratorForm';
import { LoadingOverlay } from '@/components/generators/LoadingOverlay';
import { useApp } from '@/lib/store';
import { GenerationInput, InstagramResult, GenerationItem } from '@/types';
import { Copy, Check, Share2, Sparkles, RotateCw } from 'lucide-react';

export default function InstagramGeneratorPage() {
  const { runGeneration } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<GenerationItem | null>(null);
  const [lastInput, setLastInput] = useState<GenerationInput | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (input: GenerationInput) => {
    try {
      setIsLoading(true);
      setLastInput(input);
      const res = await runGeneration(input);
      setCurrentResult(res);
    } catch (err: any) {
      alert(err.message || 'Generation failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const instaData = currentResult?.output as InstagramResult;

  const fullCaption = instaData
    ? `${instaData.hook}\n\n${instaData.caption}\n\n${instaData.cta}\n\n${instaData.hashtags.join(' ')}`
    : '';

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(fullCaption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <LoadingOverlay isLoading={isLoading} />

      <GeneratorForm
        toolType="instagram"
        title="📱 Instagram Content Generator"
        description="Generate scroll-stopping hooks, high-converting captions, CTAs, viral hashtags, and emoji suggestions."
        onGenerate={handleGenerate}
        isLoading={isLoading}
      />

      {/* Output Display */}
      {instaData && (
        <div className="bg-gray-900/90 border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                <Share2 className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">Instagram Post & Caption</h3>
                <p className="text-xs text-gray-400">Language: {currentResult?.language}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCaption}
                className="py-2.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Caption Copied!' : 'Copy Caption'}
              </button>

              <button
                onClick={() => lastInput && handleGenerate(lastInput)}
                className="py-2.5 px-3 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-xl text-xs font-semibold flex items-center gap-1 border border-gray-700 transition-all"
              >
                <RotateCw className="w-4 h-4" /> Regenerate
              </button>
            </div>
          </div>

          <div className="space-y-5">
            {/* Hook */}
            <div className="bg-[#0b0f19] p-4 rounded-2xl border border-gray-800">
              <span className="text-[10px] text-pink-400 font-bold uppercase tracking-wider block mb-1">SCROLL-STOPPING HOOK</span>
              <h2 className="text-base font-extrabold text-white">{instaData.hook}</h2>
            </div>

            {/* Main Caption */}
            <div className="bg-[#0b0f19] p-5 rounded-2xl border border-gray-800 font-tamil whitespace-pre-line text-sm leading-relaxed text-gray-100">
              <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider block mb-2 font-sans">FULL INSTAGRAM CAPTION</span>
              {instaData.caption}
            </div>

            {/* CTA & Emojis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0b0f19] p-4 rounded-2xl border border-gray-800">
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block mb-1">CALL TO ACTION (CTA)</span>
                <p className="text-xs font-semibold text-white">{instaData.cta}</p>
              </div>

              <div className="bg-[#0b0f19] p-4 rounded-2xl border border-gray-800">
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block mb-1">SUGGESTED EMOJIS</span>
                <div className="flex gap-2 text-xl mt-1">
                  {instaData.emojis.map((emoji, idx) => (
                    <span key={idx} className="p-1.5 rounded-lg bg-gray-800/60 border border-gray-700">
                      {emoji}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Hashtags */}
            <div className="bg-[#0b0f19] p-4 rounded-2xl border border-gray-800">
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block mb-1">RECOMMENDED HASHTAGS</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {instaData.hashtags.map((tag) => (
                  <span key={tag} className="text-xs text-purple-300 font-mono bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20">
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
}
