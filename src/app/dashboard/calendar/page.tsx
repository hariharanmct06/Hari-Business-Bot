'use client';

import React, { useState } from 'react';
import { GeneratorForm } from '@/components/generators/GeneratorForm';
import { LoadingOverlay } from '@/components/generators/LoadingOverlay';
import { useApp } from '@/lib/store';
import { GenerationInput, CalendarDayItem, GenerationItem } from '@/types';
import { Copy, Check, Calendar, Download, RotateCw, Edit3 } from 'lucide-react';

export default function ContentCalendarPage() {
  const { runGeneration } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<GenerationItem | null>(null);
  const [lastInput, setLastInput] = useState<GenerationInput | null>(null);
  const [copied, setCopied] = useState(false);
  const [editedItems, setEditedItems] = useState<CalendarDayItem[] | null>(null);

  const handleGenerate = async (input: GenerationInput) => {
    try {
      setIsLoading(true);
      setLastInput(input);
      const res = await runGeneration(input);
      setCurrentResult(res);
      setEditedItems(res.output as CalendarDayItem[]);
    } catch (err: any) {
      alert(err.message || 'Generation failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const calendarItems = editedItems || (currentResult?.output as CalendarDayItem[]);

  const fullText = calendarItems
    ? calendarItems
        .map(
          (item) =>
            `Day ${item.dayNumber} | [${item.platform}] | ${item.contentType}\nTopic: ${item.topic}\nCaption: ${item.caption}\nCTA: ${item.cta}\n`
        )
        .join('\n---\n')
    : '';

  const handleCopyText = () => {
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <LoadingOverlay isLoading={isLoading} />

      <GeneratorForm
        toolType="calendar"
        title="📅 Marketing Content Calendar"
        description="Generate an end-to-end 7, 14, or 30-day social media marketing calendar table."
        onGenerate={handleGenerate}
        isLoading={isLoading}
      />

      {/* Output Display */}
      {calendarItems && (
        <div className="bg-gray-900/90 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <Calendar className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {calendarItems.length}-Day Marketing Campaign Plan
                </h3>
                <p className="text-xs text-gray-400">Targeting multiple channels & platforms</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyText}
                className="py-2.5 px-4 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Plan Copied!' : 'Copy Plan'}
              </button>

              <button
                onClick={() => lastInput && handleGenerate(lastInput)}
                className="py-2.5 px-3 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-xl text-xs font-semibold flex items-center gap-1 border border-gray-700 transition-all"
              >
                <RotateCw className="w-4 h-4" /> Regenerate
              </button>
            </div>
          </div>

          {/* Table View */}
          <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-[#0b0f19]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-900 border-b border-gray-800 text-gray-400 uppercase font-bold text-[10px] tracking-wider">
                  <th className="py-3 px-4">Day</th>
                  <th className="py-3 px-4">Platform</th>
                  <th className="py-3 px-4">Content Type</th>
                  <th className="py-3 px-4">Topic</th>
                  <th className="py-3 px-4">Caption</th>
                  <th className="py-3 px-4">CTA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 text-gray-200">
                {calendarItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-amber-400">Day {item.dayNumber}</td>
                    <td className="py-3.5 px-4 font-medium">
                      <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold">
                        {item.platform}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-gray-300">{item.contentType}</td>
                    <td className="py-3.5 px-4 font-bold text-white max-w-xs">{item.topic}</td>
                    <td className="py-3.5 px-4 font-tamil max-w-sm text-gray-300">{item.caption}</td>
                    <td className="py-3.5 px-4 text-emerald-400 font-semibold max-w-xs">{item.cta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
