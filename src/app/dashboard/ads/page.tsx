'use client';

import React, { useState } from 'react';
import { GeneratorForm } from '@/components/generators/GeneratorForm';
import { LoadingOverlay } from '@/components/generators/LoadingOverlay';
import { useApp } from '@/lib/store';
import { GenerationInput, AdvertisementResult, GenerationItem } from '@/types';
import { Copy, Check, RotateCw, Edit3, Download, Sparkles, Megaphone } from 'lucide-react';

export default function AdvertisementGeneratorPage() {
  const { runGeneration } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<GenerationItem | null>(null);
  const [lastInput, setLastInput] = useState<GenerationInput | null>(null);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedAd, setEditedAd] = useState<AdvertisementResult | null>(null);

  const handleGenerate = async (input: GenerationInput) => {
    try {
      setIsLoading(true);
      setLastInput(input);
      const res = await runGeneration(input);
      setCurrentResult(res);
      setEditedAd(res.output as AdvertisementResult);
      setIsEditing(false);
    } catch (err: any) {
      alert(err.message || 'Generation failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (lastInput) {
      handleGenerate(lastInput);
    }
  };

  const adData = editedAd || (currentResult?.output as AdvertisementResult);

  const fullCopyText = adData ? `${adData.headline}\n\n${adData.subheadline}\n\n${adData.mainAd}\n\n${adData.cta}\n\n${adData.hashtags.join(' ')}` : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(fullCopyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([fullCopyText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${currentResult?.businessName || 'ad'}_advertisement.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-8">
      <LoadingOverlay isLoading={isLoading} />

      <GeneratorForm
        toolType="advertisement"
        title="📢 AI Advertisement Generator"
        description="Generate professional promotional headlines, subheadlines, main ad copy, offers, and hashtags."
        onGenerate={handleGenerate}
        isLoading={isLoading}
      />

      {/* Generated Result Output */}
      {adData && (
        <div className="bg-gray-900/90 border border-indigo-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                <Megaphone className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">Generated Advertisement</h3>
                <p className="text-xs text-gray-400">Language: {currentResult?.language}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : '📋 Copy'}
              </button>

              <button
                onClick={handleRegenerate}
                className="py-2 px-3 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-gray-700 transition-all"
              >
                <RotateCw className="w-4 h-4" /> 🔄 Regenerate
              </button>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="py-2 px-3 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-gray-700 transition-all"
              >
                <Edit3 className="w-4 h-4" /> {isEditing ? 'Save Edit' : '✏️ Edit'}
              </button>

              <button
                onClick={handleDownloadTxt}
                className="py-2 px-3 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-gray-700 transition-all"
              >
                <Download className="w-4 h-4" /> ⬇️ Download
              </button>
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Headline</label>
                <input
                  type="text"
                  value={adData.headline}
                  onChange={(e) => setEditedAd({ ...adData, headline: e.target.value })}
                  className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-4 py-2 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Subheadline</label>
                <input
                  type="text"
                  value={adData.subheadline}
                  onChange={(e) => setEditedAd({ ...adData, subheadline: e.target.value })}
                  className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-4 py-2 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Main Copy</label>
                <textarea
                  rows={6}
                  value={adData.mainAd}
                  onChange={(e) => setEditedAd({ ...adData, mainAd: e.target.value })}
                  className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-4 py-2 text-sm text-white"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="bg-[#0b0f19] p-4 rounded-2xl border border-gray-800">
                <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block mb-1">HEADLINE</span>
                <h2 className="text-xl font-extrabold text-white">{adData.headline}</h2>
              </div>

              <div className="bg-[#0b0f19] p-4 rounded-2xl border border-gray-800">
                <span className="text-[10px] text-pink-400 font-bold uppercase tracking-wider block mb-1">SUBHEADLINE</span>
                <p className="text-sm font-semibold text-gray-200">{adData.subheadline}</p>
              </div>

              <div className="bg-[#0b0f19] p-5 rounded-2xl border border-gray-800 font-tamil leading-relaxed whitespace-pre-line text-sm text-gray-100">
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block mb-2 font-sans">MAIN ADVERTISEMENT COPY</span>
                {adData.mainAd}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0b0f19] p-4 rounded-2xl border border-gray-800">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block mb-1">CALL TO ACTION (CTA)</span>
                  <p className="text-xs font-bold text-white whitespace-pre-line">{adData.cta}</p>
                </div>

                <div className="bg-[#0b0f19] p-4 rounded-2xl border border-gray-800">
                  <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block mb-1">HASHTAGS</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {adData.hashtags.map((tag) => (
                      <span key={tag} className="text-xs text-indigo-300 font-mono bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
