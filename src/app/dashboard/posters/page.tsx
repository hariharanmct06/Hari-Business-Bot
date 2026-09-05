'use client';

import React, { useState } from 'react';
import { GeneratorForm } from '@/components/generators/GeneratorForm';
import { LoadingOverlay } from '@/components/generators/LoadingOverlay';
import { PosterCanvas } from '@/components/posters/PosterCanvas';
import { useApp } from '@/lib/store';
import { GenerationInput, PosterResult, GenerationItem } from '@/types';
import { Palette, RotateCw } from 'lucide-react';

export default function PosterGeneratorPage() {
  const { runGeneration } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<GenerationItem | null>(null);
  const [lastInput, setLastInput] = useState<GenerationInput | null>(null);

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

  const posterData = currentResult?.output as PosterResult;

  return (
    <div className="space-y-8">
      <LoadingOverlay isLoading={isLoading} />

      <GeneratorForm
        toolType="poster"
        title="🎨 Poster Content Generator"
        description="Generate high-impact poster copy with instant HTML/CSS visual previews and PNG download."
        onGenerate={handleGenerate}
        isLoading={isLoading}
      />

      {/* Generated Result Output Canvas */}
      {posterData && (
        <div className="bg-gray-900/90 border border-pink-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-pink-500/20 text-pink-400">
                <Palette className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">Visual Poster Canvas</h3>
                <p className="text-xs text-gray-400">Style Theme: {posterData.style}</p>
              </div>
            </div>

            <button
              onClick={() => lastInput && handleGenerate(lastInput)}
              className="py-2 px-3 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-gray-700 transition-all"
            >
              <RotateCw className="w-4 h-4" /> Regenerate Style
            </button>
          </div>

          <PosterCanvas
            poster={posterData}
            businessName={currentResult?.businessName || 'Business'}
          />
        </div>
      )}
    </div>
  );
}
