'use client';

import React, { useRef, useState } from 'react';
import { Download, Sparkles, Copy, Check, Edit2, Share2 } from 'lucide-react';
import { PosterResult } from '@/types';
import { toPng } from 'html-to-image';

interface PosterCanvasProps {
  poster: PosterResult;
  businessName: string;
}

export const PosterCanvas: React.FC<PosterCanvasProps> = ({ poster, businessName }) => {
  const posterRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Theme styling mapping
  const themeClasses = {
    Modern: 'bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white border-indigo-500',
    Premium: 'bg-gradient-to-br from-black via-gray-900 to-amber-950 text-amber-300 border-amber-500',
    Festival: 'bg-gradient-to-br from-rose-950 via-red-900 to-amber-900 text-amber-200 border-amber-400',
    Minimal: 'bg-white text-gray-900 border-gray-900',
    'Local Business': 'bg-gradient-to-br from-emerald-950 via-teal-900 to-cyan-950 text-white border-emerald-400',
  };

  const handleDownload = async () => {
    if (!posterRef.current) return;
    try {
      setDownloading(true);
      const dataUrl = await toPng(posterRef.current, { cacheBust: true, quality: 0.95 });
      const link = document.createElement('a');
      link.download = `${businessName.replace(/\s+/g, '_')}_poster.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to download image:', err);
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyText = () => {
    const fullText = `${poster.headline}\n${poster.subheadline}\n${poster.offer}\n${poster.bodyText}\n${poster.contactText}\n${poster.locationText}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Poster Canvas Frame */}
      <div className="w-full max-w-md mx-auto aspect-[4/5] p-2 bg-gray-800 rounded-3xl shadow-2xl border border-gray-700/60">
        <div
          ref={posterRef}
          className={`w-full h-full rounded-2xl p-6 sm:p-8 flex flex-col justify-between border-4 relative overflow-hidden shadow-inner ${
            themeClasses[poster.style] || themeClasses.Modern
          }`}
        >
          {/* Decorative Background Accents */}
          <div className="absolute -top-16 -right-16 w-36 h-36 bg-white/5 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-white/5 rounded-full blur-xl pointer-events-none" />

          {/* Header Badge */}
          <div className="text-center">
            {poster.dateBadge && (
              <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-black/40 rounded-full border border-white/20 mb-3 shadow-sm">
                {poster.dateBadge}
              </span>
            )}
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight uppercase drop-shadow-md">
              {poster.headline}
            </h1>
            <p className="text-xs sm:text-sm font-semibold opacity-90 tracking-wide mt-1">
              {poster.subheadline}
            </p>
          </div>

          {/* Center Offer Box */}
          <div className="my-auto text-center py-4 px-3 bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400 block mb-1">
              EXCLUSIVE PROMOTION
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 drop-shadow">
              {poster.offer}
            </div>
            <p className="text-xs sm:text-sm mt-3 opacity-90 leading-relaxed font-medium">
              {poster.bodyText}
            </p>
          </div>

          {/* Footer Contact Info */}
          <div className="pt-4 border-t border-white/20 text-center space-y-1">
            <div className="text-sm font-bold tracking-wide">{poster.contactText}</div>
            <div className="text-xs opacity-80">{poster.locationText}</div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-3 w-full max-w-md">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold rounded-xl text-sm shadow-lg flex items-center justify-center gap-2 transition-all"
        >
          <Download className="w-4 h-4" />
          {downloading ? 'Preparing Image...' : '⬇️ Download Poster (PNG)'}
        </button>

        <button
          onClick={handleCopyText}
          className="py-3 px-4 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-xl text-sm border border-gray-700 flex items-center justify-center gap-2 transition-all"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy Copy'}
        </button>
      </div>
    </div>
  );
};
