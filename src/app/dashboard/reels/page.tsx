'use client';

import React, { useState } from 'react';
import { GeneratorForm } from '@/components/generators/GeneratorForm';
import { LoadingOverlay } from '@/components/generators/LoadingOverlay';
import { useApp } from '@/lib/store';
import { GenerationInput, ReelScriptResult, GenerationItem } from '@/types';
import { Copy, Check, Video, Clock, Film, Music, RotateCw } from 'lucide-react';

export default function ReelScriptGeneratorPage() {
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

  const reelData = currentResult?.output as ReelScriptResult;

  const fullScriptText = reelData
    ? `${reelData.title}\nDuration: ${reelData.duration}\nBGM: ${reelData.suggestedBgm}\n\n` +
      reelData.scenes
        .map(
          (s) =>
            `--- Scene ${s.sceneNumber}: ${s.name} ---\nVisual: ${s.visual}\nVoiceover: ${s.voiceover}\n`
        )
        .join('\n')
    : '';

  const handleCopyScript = () => {
    navigator.clipboard.writeText(fullScriptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <LoadingOverlay isLoading={isLoading} />

      <GeneratorForm
        toolType="reel_script"
        title="🎬 Reel Script Generator"
        description="Generate viral short-form video scripts (15s, 30s, 60s) with 5-scene breakdown, visual ideas, and voiceover cues."
        onGenerate={handleGenerate}
        isLoading={isLoading}
      />

      {/* Output Display */}
      {reelData && (
        <div className="bg-gray-900/90 border border-rose-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
                <Video className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">{reelData.title}</h3>
                <p className="text-xs text-gray-400 flex items-center gap-3 mt-0.5">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-rose-400" /> {reelData.duration} Duration</span>
                  <span className="flex items-center gap-1"><Music className="w-3.5 h-3.5 text-pink-400" /> {reelData.suggestedBgm}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyScript}
                className="py-2.5 px-4 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Script Copied!' : 'Copy Script'}
              </button>

              <button
                onClick={() => lastInput && handleGenerate(lastInput)}
                className="py-2.5 px-3 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-xl text-xs font-semibold flex items-center gap-1 border border-gray-700 transition-all"
              >
                <RotateCw className="w-4 h-4" /> Regenerate
              </button>
            </div>
          </div>

          {/* Scenes Grid */}
          <div className="space-y-4">
            {reelData.scenes.map((scene) => (
              <div key={scene.sceneNumber} className="bg-[#0b0f19] border border-gray-800 rounded-2xl p-5 hover:border-rose-500/30 transition-all">
                <div className="flex items-center justify-between mb-3 border-b border-gray-800/60 pb-2">
                  <span className="text-xs font-extrabold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Film className="w-4 h-4" /> Scene {scene.sceneNumber} — {scene.name}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-gray-900/60 p-3.5 rounded-xl border border-gray-800/80">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">📹 VISUAL DIRECTION</span>
                    <p className="text-gray-300 leading-relaxed font-sans">{scene.visual}</p>
                  </div>

                  <div className="bg-indigo-950/20 p-3.5 rounded-xl border border-indigo-500/20">
                    <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block mb-1">🎙️ VOICEOVER TRANSCRIPT (TAMIL/ENGLISH)</span>
                    <p className="text-gray-100 font-tamil text-sm font-semibold leading-relaxed">&quot;{scene.voiceover}&quot;</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
