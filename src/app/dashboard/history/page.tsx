'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { History, Copy, Trash2, Eye, Check, Search, Filter } from 'lucide-react';
import { GenerationItem } from '@/types';

export default function HistoryPage() {
  const { history, deleteHistoryItem } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTool, setFilterTool] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GenerationItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredHistory = history.filter((item) => {
    const matchesSearch = 
      item.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.previewSnippet.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTool = filterTool === 'all' || item.toolType === filterTool;
    return matchesSearch && matchesTool;
  });

  const handleCopyText = (item: GenerationItem) => {
    const text = JSON.stringify(item.output, null, 2);
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gray-900/90 border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
              <History className="w-6 h-6 text-indigo-400" />
              Generation History
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              View, copy, or delete your previous marketing generations.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-48">
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search history..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <select
              value={filterTool}
              onChange={(e) => setFilterTool(e.target.value)}
              className="bg-[#0b0f19] border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Tools</option>
              <option value="advertisement">Ads</option>
              <option value="poster">Posters</option>
              <option value="instagram">Instagram</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="reel_script">Reels</option>
              <option value="calendar">Calendar</option>
            </select>
          </div>
        </div>

        {/* History Item List */}
        {filteredHistory.length === 0 ? (
          <div className="py-16 text-center text-gray-500 space-y-3">
            <History className="w-12 h-12 text-gray-700 mx-auto" />
            <p className="text-sm font-medium">No previous generations found.</p>
            <p className="text-xs text-gray-600">Start creating content using any of our AI tools!</p>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {filteredHistory.map((item) => (
              <div
                key={item.id}
                className="bg-[#0b0f19] border border-gray-800 hover:border-indigo-500/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {item.toolType}
                    </span>
                    <span className="text-xs font-semibold text-gray-300">{item.businessName}</span>
                    <span className="text-[11px] text-gray-500">• {item.createdAt}</span>
                  </div>
                  <p className="text-xs font-medium text-white truncate max-w-xl">
                    {item.previewSnippet}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="py-1.5 px-3 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" /> View
                  </button>

                  <button
                    onClick={() => handleCopyText(item)}
                    className="py-1.5 px-3 bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 rounded-lg text-xs font-semibold flex items-center gap-1 border border-indigo-500/30 transition-all"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedId === item.id ? 'Copied' : 'Copy'}
                  </button>

                  <button
                    onClick={() => deleteHistoryItem(item.id)}
                    className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0f172a] border border-gray-800 rounded-3xl max-w-2xl w-full p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white uppercase">{selectedItem.toolType} Details</h3>
                <p className="text-xs text-gray-400">{selectedItem.businessName} • {selectedItem.createdAt}</p>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-gray-400 hover:text-white px-2 py-1 bg-gray-800 rounded-lg text-xs"
              >
                Close
              </button>
            </div>

            <div className="bg-[#0b0f19] p-4 rounded-2xl border border-gray-800 font-mono text-xs text-gray-300 whitespace-pre-wrap overflow-x-auto">
              {JSON.stringify(selectedItem.output, null, 2)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
