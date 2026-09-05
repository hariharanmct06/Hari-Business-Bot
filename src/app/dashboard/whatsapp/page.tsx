'use client';

import React, { useState } from 'react';
import { GeneratorForm } from '@/components/generators/GeneratorForm';
import { LoadingOverlay } from '@/components/generators/LoadingOverlay';
import { useApp } from '@/lib/store';
import { GenerationInput, WhatsAppResult, GenerationItem } from '@/types';
import { Copy, Check, MessageSquare, ExternalLink, RotateCw } from 'lucide-react';

export default function WhatsAppGeneratorPage() {
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

  const waData = currentResult?.output as WhatsAppResult;

  const handleCopyMessage = () => {
    if (waData) {
      navigator.clipboard.writeText(waData.formattedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpenWhatsApp = () => {
    if (waData) {
      const encoded = encodeURIComponent(waData.formattedMessage);
      window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
    }
  };

  return (
    <div className="space-y-8">
      <LoadingOverlay isLoading={isLoading} />

      <GeneratorForm
        toolType="whatsapp"
        title="💬 WhatsApp Campaign Generator"
        description="Create ready-to-send promotional WhatsApp broadcast messages formatted with bold text & emojis."
        onGenerate={handleGenerate}
        isLoading={isLoading}
      />

      {/* Output Display */}
      {waData && (
        <div className="bg-gray-900/90 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                <MessageSquare className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">Formatted WhatsApp Broadcast Message</h3>
                <p className="text-xs text-gray-400">Language: {currentResult?.language}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyMessage}
                className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Message Copied!' : 'Copy Message'}
              </button>

              <button
                onClick={handleOpenWhatsApp}
                className="py-2.5 px-4 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 border border-emerald-600 transition-all"
              >
                <ExternalLink className="w-4 h-4" /> Send via WhatsApp
              </button>

              <button
                onClick={() => lastInput && handleGenerate(lastInput)}
                className="py-2.5 px-3 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-xl text-xs font-semibold flex items-center gap-1 border border-gray-700 transition-all"
              >
                <RotateCw className="w-4 h-4" /> Create Another
              </button>
            </div>
          </div>

          {/* WhatsApp Chat Preview Bubble */}
          <div className="max-w-xl mx-auto bg-[#075e54]/10 border border-[#128c7e]/30 rounded-3xl p-5 sm:p-6 shadow-inner">
            <div className="bg-[#0b141a] border border-[#202c33] rounded-2xl p-5 shadow-lg">
              <div className="text-xs font-sans text-[#25d366] font-bold mb-2 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4" /> WhatsApp Message Preview:
              </div>
              <div className="text-sm font-tamil text-gray-100 whitespace-pre-line leading-relaxed">
                {waData.formattedMessage}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
