import React from 'react';
import { useApp } from '../context/AppContext';
import { FarmerAvatar, getAvatarConfigForUser } from './FarmerAvatar';
import { CLOTHING_DATABASE } from '../clothingData';
import { FRIENDS_DATABASE } from '../friendsData';
import { BRANDING } from '../brandingData';
import { PixelHat } from './PixelHat';
import { PixelPlant } from './PixelPlant';
import { PixelProp } from './PixelProp';
import { BADGE_DATABASE } from '../badgesData';
import { CROPS } from '../cropsData';

const plantCategory = (type: string) => {
  const cropDef = CROPS.find(c => c.id === type);
  return cropDef?.category || 'Common';
};

const renderGardenThemeDecorations = (level: number) => {
  if (level < 10) {
    // Level 1-9: Simple grass meadow with daisies and clovers
    return (
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-4 left-6 text-base opacity-35 select-none animate-pulse">🌱</div>
        <div className="absolute top-12 right-8 text-base opacity-25 select-none">🌿</div>
        <div className="absolute bottom-12 left-10 text-sm opacity-25 select-none text-emerald-600">🌻</div>
        <div className="absolute bottom-6 right-16 text-sm opacity-35 select-none animate-bounce" style={{ animationDuration: '3s' }}>🍀</div>
      </div>
    );
  }

  if (level < 20) {
    // Level 10-19: Fenced Garden Plot (wooden fences enclosing the entire garden)
    return (
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Corner wooden posts */}
        <div className="absolute top-1 left-1 w-6 h-6 bg-gradient-to-br from-amber-700 to-amber-900 border-2 border-amber-950 rounded shadow-md flex items-center justify-center font-sans text-[8px] font-bold text-amber-200">🪵</div>
        <div className="absolute top-1 right-1 w-6 h-6 bg-gradient-to-bl from-amber-700 to-amber-900 border-2 border-amber-950 rounded shadow-md flex items-center justify-center font-sans text-[8px] font-bold text-amber-200">🪵</div>
        <div className="absolute bottom-1 left-1 w-6 h-6 bg-gradient-to-tr from-amber-700 to-amber-900 border-2 border-amber-950 rounded shadow-md flex items-center justify-center font-sans text-[8px] font-bold text-amber-200">🪵</div>
        <div className="absolute bottom-1 right-1 w-6 h-6 bg-gradient-to-tl from-amber-700 to-amber-900 border-2 border-amber-950 rounded shadow-md flex items-center justify-center font-sans text-[8px] font-bold text-amber-200">🪵</div>

        {/* Framing fence lines block */}
        <div className="absolute top-3.5 left-6 right-6 h-1 bg-amber-850 border-b border-amber-950/60 opacity-80"></div>
        <div className="absolute bottom-3.5 left-6 right-6 h-1 bg-amber-850 border-t border-amber-950/60 opacity-80"></div>
        <div className="absolute top-6 bottom-6 left-3.5 w-1 bg-amber-850 border-r border-amber-950/60 opacity-80"></div>
        <div className="absolute top-6 bottom-6 right-3.5 w-1 bg-amber-850 border-l border-amber-950/60 opacity-80"></div>

        {/* Small fence pickets sticking out */}
        <div className="absolute top-2 left-[20%] w-0.5 h-2 bg-amber-700 border-r border-amber-950"></div>
        <div className="absolute top-2 left-[40%] w-0.5 h-2 bg-amber-700 border-r border-amber-950"></div>
        <div className="absolute top-2 left-[60%] w-0.5 h-2 bg-amber-700 border-r border-amber-950"></div>
        <div className="absolute top-2 left-[80%] w-0.5 h-2 bg-amber-700 border-r border-amber-950"></div>
        <div className="absolute bottom-2 left-[20%] w-0.5 h-2 bg-amber-700 border-r border-amber-950"></div>
        <div className="absolute bottom-2 left-[40%] w-0.5 h-2 bg-amber-700 border-r border-amber-950"></div>
        <div className="absolute bottom-2 left-[60%] w-0.5 h-2 bg-amber-700 border-r border-amber-950"></div>
        <div className="absolute bottom-2 left-[80%] w-0.5 h-2 bg-amber-700 border-r border-amber-950"></div>

        {/* Rustic sign detail */}
        <div className="absolute top-3 right-10 px-1 py-0.5 bg-amber-900/90 border border-amber-950 text-amber-100 text-[6px] font-black uppercase tracking-wider rounded">SECURED</div>
      </div>
    );
  }

  if (level < 30) {
    // Level 20-29: Wall & Barreled Garden Plot (brick stone fences, actual craft barrels in corners)
    return (
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Real barrels placed in the four corners */}
        <div className="absolute top-1 left-1 w-7 h-7 bg-amber-850 rounded-md border-2 border-amber-950 shadow-md flex items-center justify-center font-bold text-sm">🛢️</div>
        <div className="absolute top-1 right-1 w-7 h-7 bg-amber-850 rounded-md border-2 border-amber-950 shadow-md flex items-center justify-center font-bold text-sm">🛢️</div>
        <div className="absolute bottom-1 left-1 w-7 h-7 bg-amber-850 rounded-md border-2 border-amber-950 shadow-md flex items-center justify-center font-bold text-sm">🛢️</div>
        <div className="absolute bottom-1 right-1 w-7 h-7 bg-amber-850 rounded-md border-2 border-amber-950 shadow-md flex items-center justify-center font-bold text-sm">🛢️</div>

        {/* Stone brick wall borders */}
        <div className="absolute top-2 left-8 right-8 h-2 bg-gradient-to-b from-stone-400 to-stone-600 border border-stone-850 rounded-full opacity-75"></div>
        <div className="absolute bottom-2 left-8 right-8 h-2 bg-gradient-to-t from-stone-400 to-stone-600 border border-stone-850 rounded-full opacity-75"></div>
        <div className="absolute top-8 bottom-8 left-2 w-2 bg-stone-500 border border-stone-850 rounded-full opacity-75"></div>
        <div className="absolute top-8 bottom-8 right-2 w-2 bg-stone-500 border border-stone-850 rounded-full opacity-75"></div>

        {/* Floating grass ivies on the stone borders */}
        <div className="absolute top-3 left-[30%] text-[8px] opacity-70">🌿</div>
        <div className="absolute top-3 right-[30%] text-[8px] opacity-70">🌿</div>
        <div className="absolute bottom-3 left-[45%] text-[8px] opacity-70">🌿</div>
      </div>
    );
  }

  if (level < 40) {
    // Level 30-39: Overgrown Garden Plot (ruined monuments, thick creeping vines, mystical atmosphere)
    return (
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Mossy stone pillars at the bottom corners */}
        <div className="absolute bottom-1 left-1 w-8 h-10 bg-gradient-to-t from-stone-600 to-slate-400 border border-emerald-950/60 rounded flex flex-col items-center justify-center shadow-lg">
          <span className="text-[10px] leading-none mb-0.5">🗿</span>
          <span className="text-[5px] font-black tracking-widest text-[#152e16] scale-75">MOSS</span>
        </div>
        <div className="absolute bottom-1 right-1 w-8 h-10 bg-gradient-to-t from-stone-600 to-slate-400 border border-emerald-950/60 rounded flex flex-col items-center justify-center shadow-lg">
          <span className="text-[10px] leading-none mb-0.5">🗿</span>
          <span className="text-[5px] font-black tracking-widest text-[#152e16] scale-75">MOSS</span>
        </div>

        {/* Mossy overgrown brick walls on upper edge */}
        <div className="absolute top-2 left-4 right-4 h-3 bg-[#4c5f47] border border-[#2d4029] rounded flex justify-around items-center px-6">
          <span className="text-[8px]">🍃</span>
          <span className="text-[8px]">🌿</span>
          <span className="text-[8px]">🍀</span>
          <span className="text-[8px]">🌱</span>
          <span className="text-[8px]">🌿</span>
        </div>

        {/* Hanging vines down the sides */}
        <div className="absolute top-5 left-1 w-2.5 h-16 bg-gradient-to-b from-[#2d4029] to-transparent rounded opacity-75"></div>
        <div className="absolute top-5 right-1 w-2.5 h-16 bg-gradient-to-b from-[#2d4029] to-transparent rounded opacity-75"></div>

        {/* Mystical glowing sparks */}
        <div className="absolute top-1/4 left-8 text-xs text-emerald-300 animate-pulse opacity-80">✨</div>
        <div className="absolute bottom-1/4 right-8 text-xs text-indigo-300 animate-pulse opacity-80" style={{ animationDelay: '1s' }}>✨</div>
      </div>
    );
  }

  if (level < 50) {
    // Level 40-49: Iron-Railed Ivy Sanctuary
    return (
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Gothic black iron fences flanking the sides */}
        <div className="absolute top-1 bottom-1 left-2 w-1.5 bg-slate-800 border border-black shadow"></div>
        <div className="absolute top-1 bottom-1 right-2 w-1.5 bg-slate-800 border border-black shadow"></div>

        {/* Iron railings spikes top and bottom */}
        <div className="absolute top-2 left-6 right-6 flex justify-around">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="w-1 h-3 bg-gradient-to-b from-slate-400 to-slate-900 border rounded-t-full"></div>
          ))}
        </div>
        <div className="absolute bottom-2 left-6 right-6 flex justify-around">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="w-1 h-3 bg-gradient-to-t from-slate-400 to-slate-900 border rounded-b-full"></div>
          ))}
        </div>

        {/* Corner torch lantern objects shining */}
        <div className="absolute top-1 left-1 w-5 h-7 bg-zinc-900 border border-black rounded flex items-center justify-center shadow-lg">
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-ping"></div>
        </div>
        <div className="absolute top-1 right-1 w-5 h-7 bg-zinc-900 border border-black rounded flex items-center justify-center shadow-lg">
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
        </div>

        {/* Ivy wrapping the gothic railings */}
        <div className="absolute top-3 left-[25%] text-[8px] text-green-905">🌿</div>
        <div className="absolute top-3 right-[45%] text-[8px] text-green-905">🌿</div>
      </div>
    );
  }

  if (level < 60) {
    // Level 50-59: Greenhouse Dome Conservatory
    return (
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Futuristic curved dome frame lines inside conservatory */}
        <div className="absolute inset-2 border-2 border-cyan-400/25 rounded-2xl"></div>
        <div className="absolute top-0 bottom-0 left-12 w-px bg-cyan-300/10"></div>
        <div className="absolute top-0 bottom-0 right-12 w-px bg-cyan-300/10"></div>

        {/* Corner valve gauges and pressure equipment */}
        <div className="absolute top-1.5 left-1.5 w-6 h-6 bg-white border border-slate-500 rounded-full flex items-center justify-center shadow z-20">
          <div className="w-3.5 h-[1.5px] bg-red-600 origin-left rotate-45 animate-pulse"></div>
        </div>
        <div className="absolute top-1.5 right-1.5 w-6 h-6 bg-white border border-slate-500 rounded-full flex items-center justify-center shadow z-20">
          <div className="w-3.5 h-[1.5px] bg-sky-600 origin-left rotate-12"></div>
        </div>

        {/* Pipeline connectors running vertically */}
        <div className="absolute top-8 bottom-8 left-1.5 w-1 bg-gradient-to-r from-slate-200 to-slate-400 border-x border-slate-550"></div>
        <div className="absolute top-8 bottom-8 right-1.5 w-1 bg-gradient-to-r from-slate-200 to-slate-400 border-x border-slate-550"></div>

        {/* Steamy mist droplets rising gently */}
        <div className="absolute top-1/3 left-6 text-xs text-cyan-200/40 animate-bounce">💨</div>
        <div className="absolute bottom-1/3 right-8 text-xs text-cyan-200/40 animate-bounce" style={{ animationDelay: '0.6s' }}>💨</div>
      </div>
    );
  }

  if (level < 70) {
    // Level 60-69: Cyber Hydroponics Pods Lab
    return (
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Blinking cyber reactor nodes in corners */}
        <div className="absolute top-1.5 left-1.5 w-4 h-4 bg-emerald-950 border border-emerald-400 rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(52,211,153,0.6)]">
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></div>
        </div>
        <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-emerald-950 border border-emerald-400 rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(52,211,153,0.6)]">
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></div>
        </div>
        <div className="absolute bottom-1.5 left-1.5 w-4 h-4 bg-cyan-950 border border-cyan-400 rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(34,211,238,0.6)]">
          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute bottom-1.5 right-1.5 w-4 h-4 bg-cyan-950 border border-cyan-400 rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(34,211,238,0.6)]">
          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
        </div>

        {/* High-tech electrical circuit board border lines */}
        <div className="absolute top-3 left-6 right-6 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"></div>
        <div className="absolute bottom-3 left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"></div>

        {/* Lab monitor badges at top left/right edges */}
        <div className="absolute top-4 left-6 px-1.5 py-0.5 bg-emerald-950/80 border border-emerald-500/20 text-emerald-400 text-[5px] font-mono rounded select-none uppercase tracking-tighter">PODS_STABLE: 100%</div>
      </div>
    );
  }

  if (level < 80) {
    // Level 70-79: Tranquil Oriental Zen Garden
    return (
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Japanese red shinto arches */}
        <div className="absolute top-1.5 left-0 right-0 h-4 bg-[#b91c1c] border-b-2 border-stone-900 flex justify-between px-10 items-center">
          <div className="w-1.5 h-6 bg-[#991b1b] border-x border-stone-950"></div>
          <span className="font-serif text-[7px] text-yellow-300 font-bold tracking-widest uppercase">⛩️ SHINTO SANCTUARY ⛩️</span>
          <div className="w-1.5 h-6 bg-[#991b1b] border-x border-stone-950"></div>
        </div>

        {/* Hanging red lanterns swaying gently */}
        <div className="absolute top-5 left-1 text-base animate-bounce drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]">🏮</div>
        <div className="absolute top-5 right-1 text-base animate-bounce drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]" style={{ animationDelay: '0.5s' }}>🏮</div>

        {/* Wave pattern references on side margins */}
        <div className="absolute bottom-4 left-2 w-8 h-4 border-b border-stone-300 opacity-30 rounded-full"></div>
        <div className="absolute bottom-4 right-2 w-8 h-4 border-b border-stone-300 opacity-30 rounded-full"></div>
      </div>
    );
  }

  if (level < 90) {
    // Level 80-89: Volcanic Geothermal Patch
    return (
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Red fiery lava running down borders */}
        <div className="absolute top-0 bottom-0 left-1 w-2 bg-gradient-to-b from-red-600 via-orange-500 to-amber-700 shadow-[0_0_10px_rgba(239,68,68,0.6)] animate-pulse z-20"></div>
        <div className="absolute top-0 bottom-0 right-1 w-2 bg-gradient-to-b from-red-600 via-orange-500 to-amber-700 shadow-[0_0_10px_rgba(239,68,68,0.6)] animate-pulse z-20"></div>

        {/* Animated heat sparks rise */}
        <span className="absolute bottom-8 left-6 text-red-500 text-[10px] animate-bounce">🔥</span>
        <span className="absolute bottom-16 right-6 text-orange-400 text-[10px] animate-bounce" style={{ animationDelay: '0.4s' }}>🔥</span>
        <span className="absolute top-1/2 left-8 text-yellow-500 text-[8px] animate-ping">🌋</span>
      </div>
    );
  }

  if (level < 100) {
    // Level 90-99: Floating Celestial Aether Meadow
    return (
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* High fluffy white cumulus clouds at bottom and sides */}
        <div className="absolute bottom-1 left-2 right-2 h-7 bg-white/95 rounded-full flex justify-around items-center px-4 shadow-[0_-4px_12px_rgba(165,180,252,0.2)]">
          <span className="text-[10px] text-indigo-300">☁️</span>
          <span className="text-[10px] text-indigo-300">☁️</span>
          <span className="text-[10px] text-indigo-300">☁️</span>
          <span className="text-[10px] text-indigo-300">☁️</span>
        </div>

        {/* Small celestial angel wings icons at sides */}
        <div className="absolute top-1/4 left-1.5 text-base text-yellow-101 animate-pulse">🕊️</div>
        <div className="absolute top-1/4 right-1.5 text-base text-yellow-101 animate-pulse">🕊️</div>

        <div className="absolute top-10 left-12 w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
        <div className="absolute bottom-12 right-12 w-1 h-1 bg-yellow-250 rounded-full animate-ping" style={{ animationDelay: '0.8s' }}></div>
      </div>
    );
  }

  // LEVEL 100+: Heavenly Astral Sovereign Garden
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Heavy Celestial Golden Dragon Pillars on active sides */}
      <div className="absolute top-1 bottom-1 left-1.5 w-3 bg-gradient-to-b from-yellow-300 via-amber-500 to-yellow-600 rounded-full border border-yellow-250 shadow-[0_0_12px_rgba(251,191,36,0.85)] flex flex-col justify-between py-4 items-center z-20">
        <span className="text-[6px] drop-shadow-[0_0_4px_white]">👑</span>
        <span className="text-[5px] text-amber-200 uppercase font-black tracking-widest scale-75 rotate-90 my-2">ASTRAL</span>
        <span className="text-[6px] drop-shadow-[0_0_4px_white]">💎</span>
      </div>
      <div className="absolute top-1 bottom-1 right-1.5 w-3 bg-gradient-to-b from-yellow-300 via-amber-500 to-yellow-600 rounded-full border border-yellow-250 shadow-[0_0_12px_rgba(251,191,36,0.85)] flex flex-col justify-between py-4 items-center z-20">
        <span className="text-[6px] drop-shadow-[0_0_4px_white]">👑</span>
        <span className="text-[5px] text-amber-200 uppercase font-black tracking-widest scale-75 -rotate-90 my-2">ASTRAL</span>
        <span className="text-[6px] drop-shadow-[0_0_4px_white]">💎</span>
      </div>

      {/* Galaxy magical runic ring backdrop behind entire grid */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border-4 border-dashed border-pink-400/20 animate-spin opacity-40" style={{ animationDuration: '25s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full border-2 border-double border-violet-400/25 animate-spin opacity-30" style={{ animationDuration: '10s' }}></div>

      {/* Massive gem-crested elegant crown corners */}
      <div className="absolute top-1 left-1 w-9 h-9 bg-gradient-to-br from-yellow-300 via-violet-600 to-pink-500 border-2 border-yellow-300 rounded-br-2xl shadow-[0_0_15px_rgba(251,191,36,0.9)] z-22 flex items-center justify-center">
        <span className="text-xs drop-shadow-[0_0_5px_white] animate-pulse" style={{ animationIterationCount: 4 }}>🪐</span>
      </div>
      <div className="absolute top-1 right-1 w-9 h-9 bg-gradient-to-bl from-yellow-300 via-violet-600 to-pink-500 border-2 border-yellow-300 rounded-bl-2xl shadow-[0_0_15px_rgba(251,191,36,0.9)] z-22 flex items-center justify-center">
        <span className="text-xs drop-shadow-[0_0_5px_white] animate-pulse" style={{ animationIterationCount: 4 }}>🪐</span>
      </div>
      <div className="absolute bottom-1 left-1 w-9 h-9 bg-gradient-to-tr from-yellow-305 via-violet-600 to-pink-500 border-2 border-yellow-300 rounded-tr-2xl shadow-[0_0_15px_rgba(251,191,36,0.9)] z-22 flex items-center justify-center">
        <span className="text-xs drop-shadow-[0_0_5px_white] animate-pulse" style={{ animationIterationCount: 4 }}>👑</span>
      </div>
      <div className="absolute bottom-1 right-1 w-9 h-9 bg-gradient-to-tl from-yellow-305 via-violet-600 to-pink-500 border-2 border-yellow-300 rounded-tl-2xl shadow-[0_0_15px_rgba(251,191,36,0.9)] z-22 flex items-center justify-center">
        <span className="text-xs drop-shadow-[0_0_5px_white] animate-pulse" style={{ animationIterationCount: 4 }}>👑</span>
      </div>

      {/* Cosmic shooting stars/rainbow meteor indicators flying */}
      <span className="absolute top-10 left-12 text-sm drop-shadow animate-bounce select-none">💫</span>
      <span className="absolute bottom-12 right-12 text-sm drop-shadow animate-pulse" style={{ animationDelay: '1.2s', animationIterationCount: 4 }}>☄️</span>
      <div className="absolute top-1/2 left-[20%] w-64 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent rotate-12 opacity-35 animate-pulse" style={{ animationIterationCount: 4 }}></div>
    </div>
  );
};

const getPlotsThemeInfo = (level: number) => {
  if (level < 10) {
    return {
      name: "Default Garden Plot",
      bgClass: "bg-emerald-50 bg-gradient-to-br from-[#cceacd] to-[#b3e2b4]",
      borderClass: "border-4 border-[#345f32]/20 rounded-2xl shadow-md",
      cellBorderClass: "border-b-4 border-black/15 bg-white/10",
      accent: "🌱",
      decorSet: ["🌱", "🌿"],
      decorStyle: "text-emerald-800"
    };
  } else if (level < 20) {
    return {
      name: "Fenced Garden Plot",
      bgClass: "bg-[#c4deb0] bg-gradient-to-br from-[#c4deb0] to-[#abd494]",
      borderClass: "border-8 border-[#823a07] rounded-xl shadow-inner",
      cellBorderClass: "border-2 border-[#823a07]/40 bg-[#823a07]/10",
      accent: "🪵",
      decorSet: ["🪵", "🚧", "🪵", "🪵"],
      decorStyle: "text-amber-800"
    };
  } else if (level < 30) {
    return {
      name: "Wall & Barreled Garden Plot",
      bgClass: "bg-[#91ad8a] bg-gradient-to-br from-[#91ad8a] to-[#7fa177]",
      borderClass: "border-8 border-stone-500 rounded-2xl shadow-xl",
      cellBorderClass: "border-4 border-stone-400 rounded-xl bg-stone-500/10",
      accent: "🛢️",
      decorSet: ["🛢️", "🪵", "🛢️", "🪵"],
      decorStyle: "text-stone-700"
    };
  } else if (level < 40) {
    return {
      name: "Iron-Railed Ivy Sanctuary",
      bgClass: "bg-[#809f87] bg-gradient-to-tr from-[#698a70] via-[#809f87] to-[#99bd9d]",
      borderClass: "border-8 border-slate-700 rounded-2xl shadow-2xl",
      cellBorderClass: "border-2 border-slate-600 rounded-lg bg-slate-900/15",
      accent: "⛓️",
      decorSet: ["🌿", "⛓️", "🌿", "⛓️"],
      decorStyle: "text-slate-800"
    };
  } else if (level < 50) {
    return {
      name: "Greenhouse Dome Conservatory",
      bgClass: "bg-cyan-50/70 bg-gradient-to-tr from-[#e0f7fa] via-[#b2ebf2] to-white/90",
      borderClass: "border-8 border-cyan-400 rounded-3xl shadow-[0_0_20px_rgba(34,211,238,0.4)]",
      cellBorderClass: "border border-cyan-300 rounded-xl bg-cyan-200/20",
      accent: "🌡️",
      decorSet: ["🌡️", "💦", "🧪", "💨"],
      decorStyle: "text-cyan-600"
    };
  } else if (level < 60) {
    return {
      name: "Cyber Hydroponics Pods Lab",
      bgClass: "bg-[#0b132b] bg-gradient-to-br from-[#0b132b] to-[#1c2541]",
      borderClass: "border-8 border-[#10b981] shadow-[0_0_25px_rgba(16,185,129,0.5)] rounded-2xl",
      cellBorderClass: "border border-emerald-400/40 rounded-xl bg-emerald-950/30",
      accent: "⚡",
      decorSet: ["⚡", "🧬", "🔌", "📟"],
      decorStyle: "text-emerald-400"
    };
  } else if (level < 70) {
    return {
      name: "Tranquil Oriental Zen Garden",
      bgClass: "bg-stone-100 bg-gradient-to-tr from-stone-200 via-[#f5f2eb] to-stone-100",
      borderClass: "border-8 border-amber-800 rounded-3xl shadow-lg",
      cellBorderClass: "border-2 border-stone-300 rounded-2xl bg-stone-100/50",
      accent: "⛩️",
      decorSet: ["🏮", "⛩️", "🎋", "🏮"],
      decorStyle: "text-amber-700"
    };
  } else if (level < 80) {
    return {
      name: "Volcanic Geothermal Patch",
      bgClass: "bg-stone-900 bg-gradient-to-b from-[#1c1917] to-[#450a0a]",
      borderClass: "border-8 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.55)] rounded-2xl",
      cellBorderClass: "border border-red-500/30 rounded-xl bg-red-950/20",
      accent: "🌋",
      decorSet: ["🔥", "🌋", "🔮", "🔥"],
      decorStyle: "text-red-505"
    };
  } else if (level < 90) {
    return {
      name: "Floating Celestial Aether Meadow",
      bgClass: "bg-indigo-950 bg-gradient-to-tr from-[#1e1b4b] via-[#312e81] to-[#1e1b4b]",
      borderClass: "border-8 border-indigo-400 shadow-[0_0_35px_rgba(129,140,248,0.65)] rounded-3xl",
      cellBorderClass: "border border-indigo-300/40 rounded-xl bg-indigo-900/40",
      accent: "☁️",
      decorSet: ["☁️", "✨", "💫", "☁️"],
      decorStyle: "text-indigo-200"
    };
  } else if (level < 100) {
    return {
      name: "Mythic Golden Oasis of Abundance",
      bgClass: "bg-amber-50 bg-gradient-to-br from-amber-100 via-amber-200 to-yellow-105",
      borderClass: "border-8 border-yellow-500 shadow-[0_0_40px_rgba(234,179,8,0.7)] rounded-3xl",
      cellBorderClass: "border-2 border-yellow-400 rounded-2xl bg-amber-200/25",
      accent: "👑",
      decorSet: ["👑", "🌟", "⛲", "🌟"],
      decorStyle: "text-yellow-600"
    };
  } else {
    return {
      name: "Heavenly Astral Sovereign Garden",
      bgClass: "bg-[#03001e] bg-gradient-to-br from-[#03001e] via-[#7303c0] to-[#ec38bc]",
      borderClass: "border-8 border-pink-500 shadow-[0_0_45px_rgba(236,56,188,0.85)] rounded-3xl animate-pulse",
      cellBorderClass: "border border-pink-400 rounded-3xl bg-pink-950/40 shadow-[0_0_15px_rgba(236,56,188,0.25)]",
      accent: "🪐",
      decorSet: ["🪐", "🛸", "☄️", "✨"],
      decorStyle: "text-pink-300"
    };
  }
};

export const ProfileView: React.FC = () => {
  const {
    username,
    bio, setBio,
    badges,
    plots,
    level, setLevel,
    rebirthCount, performRebirth,
    likesCount, setLikesCount,
    seedsBoughtCount,
    minigamesDoneCount,
    profileOverlayTarget,
    setProfileOverlayTarget,
    triggerAlert,
    
    unlockedBgs, setUnlockedBgs,
    unlockedOutfits, setUnlockedOutfits,
    unlockedProps, setUnlockedProps,
    equippedBg, setEquippedBg,
    equippedOutfit, setEquippedOutfit,
    equippedProp, setEquippedProp,
    equippedHat, setEquippedHat
  } = useApp();

  const isSelf = !profileOverlayTarget || profileOverlayTarget === username;
  const currentName = isSelf ? username : profileOverlayTarget;

  const [isEditingBio, setIsEditingBio] = React.useState(false);
  const [tempBio, setTempBio] = React.useState(bio);
  
  // Interactive Panel Tabs
  const [profileTab, setProfileTab] = React.useState<'stats' | 'wardrobe'>('stats');
  const [selectedBadgeDetail, setSelectedBadgeDetail] = React.useState<any | null>(null);
  
  // Wardrobe Closet Tab Categorization
  const [closetCat, setClosetCat] = React.useState<'outfits' | 'props' | 'backgrounds'>('outfits');

  // Friends Database customization query
  const matchedFriend = FRIENDS_DATABASE.find(f => f.username === currentName);

  const getFriendBio = () => {
    if (matchedFriend) return matchedFriend.bio;
    if (currentName === 'Sam_EEE') {
      return "🐝 Buzz buzz! I am Sam, a beekeeper in love with sunflowers, herbal teas, and warm honey harvests.";
    }
    if (currentName === 'NICOLINE123') {
      return "🌸 Florist of the Southern Valley. Passionate about rose pruning, lavender tea recipes, and keeping healthy habits!";
    }
    return bio;
  };

  const getFriendBadges = () => {
    if (currentName === 'Sam_EEE') {
      return ['100 Day Streak', 'Seed Collector'];
    }
    if (currentName === 'NICOLINE123') {
      return ['Master Harvester', 'Seed Collector'];
    }
    return badges;
  };

  const getFriendAvatar = () => {
    if (matchedFriend && matchedFriend.avatarUrl) {
      return matchedFriend.avatarUrl;
    }
    if (currentName === 'Sam_EEE') {
      return 'https://lh3.googleusercontent.com/aida/ADBb0ujdQP6MAgmjK8hgH6aSOHT4BZIHX4Iij_p-Pzo2ikDy83vgWB7kbxRNAanC6B80uFfePmufqpKRfaPtLDUoMYMY4wm-crQU2c2T-4SZutluigzQ1k0alXn7hH3krPSNJIuQTbJ3zZXOs8CjhsI-RQh31YZ3yiB968QmftZ6D41h_jwFDgcq586EnkBA55I6Iza3tItq_RGve1En5_5WuLKtygooJn27WUa28jOelC3ykXkctgXr4NiCZQ';
    }
    return 'https://cdn.phototourl.com/free/2026-05-12-91580f16-e2c3-4b8d-90e5-0c63030847b1.png';
  };

  const currentBio = getFriendBio();
  const currentBadges = getFriendBadges();
  const currentAvatar = getFriendAvatar();

  const handleEquipItem = (itemId: string, category: 'outfits' | 'props' | 'backgrounds') => {
    if (category === 'outfits') {
      setEquippedOutfit(itemId);
      triggerAlert(`👕 Dressed up with: ${itemId}!`);
    } else if (category === 'props') {
      const isHat = [
        'bucket hat', 'classic cap', 'pirate hat', 'bowler hat', 'santa hat', 
        'flower wreath', 'witch hat', 'party hat', 'leprechaun hat', 'construction hardhat', 
        'royal crown', 'sprout clip', 'bear ears headband', 'chef hat', 'knitted beanie', 
        'chic glasses', 'elegant headband', 'conical straw hat', 'classic sun hat', 'floppy straw hat'
      ].includes(itemId.toLowerCase().trim());
      if (isHat) {
        setEquippedHat(itemId);
        triggerAlert(`🤠 Wearing Hat: ${itemId}!`);
      } else {
        setEquippedProp(itemId);
        triggerAlert(`🪄 Holding Prop: ${itemId}!`);
      }
    } else if (category === 'backgrounds') {
      setEquippedBg(itemId);
      triggerAlert(`🖼️ Background set to: ${itemId}!`);
    }
  };

  // Check if item is currently unlocked/owned in inventory
  const isItemUnlocked = (itemId: string, category: 'outfits' | 'props' | 'backgrounds') => {
    if (category === 'outfits') return unlockedOutfits.includes(itemId);
    if (category === 'props') return unlockedProps.includes(itemId);
    if (category === 'backgrounds') return unlockedBgs.includes(itemId);
    return false;
  };

  // Check if item is currently active / equipped
  const isItemEquipped = (itemId: string, category: 'outfits' | 'props' | 'backgrounds') => {
    if (category === 'outfits') return equippedOutfit === itemId;
    if (category === 'props') {
      return equippedProp === itemId || equippedHat === itemId;
    }
    if (category === 'backgrounds') return equippedBg === itemId;
    return false;
  };

  // Developer testing Cheat sandbox to instantly unlock all elements
  const unlockAllWardrobe = () => {
    const outfits = CLOTHING_DATABASE.filter(c => c.category === 'outfits').map(c => c.id);
    const props = CLOTHING_DATABASE.filter(c => c.category === 'props').map(c => c.id);
    const bgs = CLOTHING_DATABASE.filter(c => c.category === 'backgrounds').map(c => c.id);

    setUnlockedOutfits(prev => Array.from(new Set([...prev, ...outfits])));
    setUnlockedProps(prev => Array.from(new Set([...prev, ...props])));
    setUnlockedBgs(prev => Array.from(new Set([...prev, ...bgs])));
    triggerAlert("🧪 Wardrobe sandbox active! All clothes, backdrops & props unlocked.");
  };

  return (
    <div className="bg-primary min-h-screen font-sans text-on-surface flex justify-center pb-20">
      <div className="w-full max-w-md bg-white relative min-h-screen shadow-2xl overflow-x-hidden border-x border-[#c2c9bb]">
        
        {/* Top AppBar */}
        <header className="flex justify-between items-center w-full px-5 h-16 bg-white border-b-2 border-outline-variant sticky top-0 z-50">
          <button 
            onClick={() => setProfileOverlayTarget(null)}
            className="text-primary hover:bg-[#e8e8e8] transition-colors p-1.5 rounded-full cursor-pointer flex items-center justify-center"
          >
            <span className="material-symbols-outlined font-bold">arrow_back</span>
          </button>
          
          <h1 className="font-heading text-lg text-primary tracking-widest uppercase font-bold">
            {isSelf ? "My Profile" : "The Seasons"}
          </h1>
          
          <div className="text-primary flex items-center gap-1.5">
            {BRANDING.appLogo ? (
              <img src={BRANDING.appLogo} alt="App Logo" className="w-6 h-6 object-contain rounded" referrerPolicy="referrer" />
            ) : (
              <span className="material-symbols-outlined fill">account_circle</span>
            )}
          </div>
        </header>

        {/* Main Profile Canvas */}
        <main className="p-5 space-y-6 scrapbook-texture bg-[#f9f9f9] min-h-[calc(100vh-4rem)] bg-radial from-[#c2c9bb]/20 to-transparent">
          
          {/* Profile Header Block */}
          <section className="flex flex-col items-center bg-white p-5 border-2 border-outline rounded-xl organic-tilt-right shadow-md relative">
            <div className="relative mb-3 group">
              
              {/* Dynamic Farmer Core Multi-layered Avatar for SELF, falling back for friends customization */}
              {isSelf ? (
                <div className="p-1 bgColor-surface-variant border-4 border-primary rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
                  <FarmerAvatar size="lg" />
                </div>
              ) : (
                (() => {
                  const cfg = getAvatarConfigForUser(currentName);
                  return (
                    <div className="p-1 bgColor-surface-variant border-4 border-primary rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
                      <FarmerAvatar 
                        size="lg" 
                        customBg={cfg.bg} 
                        customOutfit={cfg.outfit} 
                        customHat={cfg.hat} 
                        customProp={cfg.prop} 
                        customGender={cfg.gender} 
                      />
                    </div>
                  );
                })()
              )}
              
              {isSelf && (
                <button 
                  onClick={() => {
                    setTempBio(bio);
                    setIsEditingBio(true);
                  }}
                  className="absolute -bottom-1 -right-1 bg-primary hover:bg-[#2d5a27] p-1.5 rounded-lg border-2 border-[#b1ceb2] cursor-pointer shadow-md text-white flex items-center justify-center scale-90"
                >
                  <span className="material-symbols-outlined text-xs">edit</span>
                </button>
              )}
            </div>

            <h2 className="font-heading text-lg text-primary mb-1 font-bold">{currentName}</h2>
            <p className="font-serif text-sm text-on-surface-variant text-center px-4 leading-relaxed italic">
              "{currentBio}"
            </p>

            {/* Like button on profile */}
            {!isSelf && (
              <button 
                onClick={() => {
                  setLikesCount(l => l + 1);
                  triggerAlert(`💓 Sent a Garden Like to ${currentName}!`);
                }}
                className="mt-4 bg-red-500 hover:bg-red-600 font-sans text-xs text-white px-4 py-1.5 rounded-full font-bold flex items-center gap-1 shadow-sm transition-all"
              >
                <span className="material-symbols-outlined text-xs fill text-white">favorite</span>
                LIKE SANCTUARY
              </button>
            )}

            {/* Toggle tabs for Self (Stats vs Clothes Closet Customization) */}
            {isSelf && (
              <div className="flex gap-2 w-full mt-4 pt-1 border-t border-[#72796e]/10">
                <button
                  onClick={() => setProfileTab('stats')}
                  className={`flex-1 py-2 text-center text-xs font-bold leading-none uppercase tracking-wider rounded-lg transition-all ${
                    profileTab === 'stats' 
                      ? 'bg-primary text-white shadow-sm' 
                      : 'bg-neutral-100 hover:bg-neutral-200 text-[#72796e]'
                  }`}
                >
                  🌾 Garden Stats
                </button>
                <button
                  onClick={() => setProfileTab('wardrobe')}
                  className={`flex-1 py-1.5 text-center text-xs font-bold leading-none uppercase tracking-wider rounded-lg transition-all relative flex items-center justify-center gap-1 ${
                    profileTab === 'wardrobe' 
                      ? 'bg-primary text-white shadow-sm' 
                      : 'bg-neutral-100 hover:bg-neutral-200 text-[#72796e]'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">styler</span>
                  My Wardrobe
                </button>
              </div>
            )}
          </section>

          {/* ================= PANEL TAB A: STATS & PLOT MAPS ================= */}
          {profileTab === 'stats' && (
            <div className="space-y-6 animate-fade-in">
              {/* Hall of Badges */}
              <section className="bg-surface-container-low p-4 border-2 border-outline rounded-xl relative shadow-sm">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-secondary-container/75 border border-outline-variant/60 -rotate-2 shadow-sm flex items-center justify-center">
                  <span className="font-sans text-[8px] font-bold text-[#154212] uppercase tracking-wider">SHOWCASE</span>
                </div>
                
                <h3 className="font-sans text-xs text-primary mb-2 uppercase tracking-widest text-center font-bold">Hall of Badges</h3>
                <p className="font-sans text-[8.5px] text-center text-[#72796e] uppercase tracking-tighter mb-4">Tap any badge to inspect credentials</p>
                
                <div className="grid grid-cols-4 gap-y-5 gap-x-2 py-1 justify-items-center">
                  {BADGE_DATABASE.map((badge) => {
                    const hasBadge = currentBadges.includes(badge.id);
                    return (
                      <div 
                        key={badge.id}
                        onClick={() => setSelectedBadgeDetail({ ...badge, isEarned: hasBadge })}
                        className="flex flex-col items-center cursor-pointer group"
                      >
                        <div 
                          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center shadow-sm relative transition-all duration-200 group-hover:scale-105 ${
                            hasBadge 
                              ? `bg-gradient-to-b ${badge.bgColor} ${badge.borderColor} shadow-[0_2px_8px_rgba(251,191,36,0.3)]` 
                              : "bg-[#e8e8e8] border-dashed border-gray-300 opacity-50"
                          }`}
                        >
                          <span className={`text-2xl drop-shadow-sm ${!hasBadge ? "grayscale filter opacity-40 animate-none" : "animate-pulse"}`} style={hasBadge ? { animationDuration: '3s' } : {}}>
                            {badge.logoEmoji}
                          </span>
                          
                          {/* Small lock emblem for locked ones */}
                          {!hasBadge && (
                            <div className="absolute -bottom-1 -right-1 bg-gray-500 rounded-full w-4 h-4 border border-white flex items-center justify-center shadow-sm scale-90">
                              <span className="material-symbols-outlined text-[9px] text-white">lock</span>
                            </div>
                          )}
                          
                          {/* Mini glowing star for unlocked ones */}
                          {hasBadge && (
                            <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full w-4 h-4 flex items-center justify-center shadow scale-90">
                              <span className="material-symbols-outlined text-[9.5px] font-black text-amber-950 fill" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                            </div>
                          )}
                        </div>
                        <span className="font-sans text-[7.5px] mt-1.5 text-center font-extrabold uppercase tracking-tight text-[#42493e] leading-snug line-clamp-2 max-w-[65px]">
                          {badge.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Rebirth Ascension Card */}
              {isSelf && (
                <section className="bg-gradient-to-br from-[#101c10] to-[#1a2d1a] p-5 rounded-2xl border-2 border-[#b0d6a9]/30 text-white shadow-xl relative overflow-hidden">
                  {/* Cosmic/Magical styling decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#4ade80]/10 rounded-full filter blur-xl pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#38bdf8]/10 rounded-full filter blur-xl pointer-events-none"></div>

                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🌟</span>
                      <h3 className="font-heading text-xs font-black uppercase tracking-widest text-[#a7f3d0]">
                        Ascension Portal
                      </h3>
                    </div>
                    {rebirthCount > 0 && (
                      <span className="bg-[#10b981] text-white text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.3)] animate-pulse">
                        ⭐ Rebirth x{rebirthCount}
                      </span>
                    )}
                  </div>

                  <p className="font-sans text-xs text-[#d1fae5] leading-relaxed mb-4">
                    Ascend to a state of ultimate gardening. When you attain <strong>Level 200</strong>, you unlock Rebirth. Rebirthing resets your progress but adds custom badges, reputation, and allows you to recreate your greenhouse layout from scratch.
                  </p>

                  {level >= 200 ? (
                    <div className="bg-black/40 p-4 rounded-xl border border-[#34d399]/40 space-y-3">
                      <div className="text-center">
                        <span className="text-3xl animate-bounce inline-block">👑</span>
                        <div className="text-xs font-bold text-emerald-400 uppercase mt-1">MAX LEVEL REACHED</div>
                        <div className="text-[10px] text-gray-300">Ready to begin your legendary cosmic ascension?</div>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm("Are you absolutely sure you want to rebirth? This resets all your coins, level to 1, crops, and clothes/tools to unlock again for the ultimate prestaged experience!")) {
                            performRebirth();
                          }
                        }}
                        className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-heading font-black text-xs py-2.5 rounded-xl uppercase tracking-wider cursor-pointer shadow-lg active:scale-98 transition-all text-center"
                      >
                        ✨ PERFORM REBIRTH ✨
                      </button>
                    </div>
                  ) : (
                    <div className="bg-black/25 p-3.5 rounded-xl border border-white/5 space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400">Current Level</span>
                        <span className="font-bold text-[#fed7aa]">{level}/200</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-400 to-[#10b981] transition-all duration-500"
                          style={{ width: `${(level / 200) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-[10px] text-center text-gray-400 italic">
                        Earn {Math.max(0, 200 - level)} more levels to unlock the Rebirth cosmic option.
                      </div>

                      {/* Cheat Button for Testing */}
                      <div className="pt-2 border-t border-white/5 flex gap-2">
                        <button
                          onClick={() => {
                            setLevel(200);
                            triggerAlert("🧪 Cheat Activated: Set Level to 200! You can now test the Rebirth feature!");
                          }}
                          className="flex-1 bg-white/10 hover:bg-white/20 active:scale-95 text-[9px] uppercase font-bold py-1.5 rounded-lg text-[#fed7aa] transition-all cursor-pointer border border-[#34d399]/20"
                        >
                          ⚡ Set LVL 200
                        </button>
                        <button
                          onClick={() => {
                            setLevel(prev => Math.min(200, prev + 10));
                            triggerAlert("🧪 Cheat Activated: Gained 10 levels!");
                          }}
                          className="bg-white/5 hover:bg-white/10 active:scale-95 text-[9px] uppercase font-bold px-2 py-1.5 rounded-lg text-gray-300 transition-all cursor-pointer"
                        >
                          +10 Levels
                        </button>
                      </div>
                    </div>
                  )}
                </section>
              )}

              {/* Sanctuary Stats */}
              <section className="bg-white p-5 border-2 border-outline rounded-xl organic-tilt-left shadow-sm">
                <h3 className="font-sans text-[11px] text-primary mb-4 uppercase tracking-widest border-b border-outline-variant/50 pb-2 font-bold">
                  Sanctuary Stats
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-0.5">
                    <p className="font-sans text-[8px] text-on-surface-variant uppercase font-bold">Most Expensive Fruit</p>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-primary text-base">nutrition</span>
                      <span className="font-serif text-sm text-primary font-bold">Golden Apple</span>
                    </div>
                  </div>
                  
                  <div className="space-y-0.5">
                    <p className="font-sans text-[8px] text-on-surface-variant uppercase font-bold">Garden Likes Received</p>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#ba1a1a] text-sm fill" style={{ fontVariationSettings: '"FILL" 1' }}>favorite</span>
                      <span className="font-serif text-sm text-[#154212] font-extrabold">{isSelf ? likesCount : likesCount + 44}</span>
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <p className="font-sans text-[8px] text-on-surface-variant uppercase font-bold">Seeds Bought</p>
                    <span className="font-serif text-sm text-[#154212] font-extrabold">{isSelf ? seedsBoughtCount : 188}</span>
                  </div>

                  <div className="space-y-0.5">
                    <p className="font-sans text-[8px] text-on-surface-variant uppercase font-bold">Minigames Completed</p>
                    <span className="font-serif text-sm text-[#154212] font-extrabold">{isSelf ? minigamesDoneCount : 87}</span>
                  </div>

                  <div className="space-y-0.5">
                    <p className="font-sans text-[8px] text-on-surface-variant uppercase font-bold">Weekly Habits Met</p>
                    <span className="font-serif text-sm text-[#154212] font-extrabold">12</span>
                  </div>

                  <div className="space-y-0.5">
                    <p className="font-sans text-[8px] text-on-surface-variant uppercase font-bold">Mutual Guild Friends</p>
                    <span className="font-serif text-sm text-[#154212] font-extrabold">{isSelf ? 24 : 112}</span>
                  </div>
                </div>
              </section>

              {/* Garden Snapshot */}
              {(() => {
                const theme = getPlotsThemeInfo(level);
                return (
                  <section 
                    className={`relative ${theme.bgClass} p-4 overflow-hidden min-h-[380px] flex flex-col ${theme.borderClass} shadow-inner rounded-xl paper-texture text-white`}
                  >
                    {/* Prominent High-Fidelity Themed Level Decorations */}
                    {renderGardenThemeDecorations(level)}

                    <div className="flex justify-between items-center mb-3 relative z-20">
                      <div className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-xl border border-primary/10 shadow-xs flex items-center gap-1">
                        <span className="text-xs">{theme.accent}</span>
                        <h3 className="font-heading text-[9px] text-primary uppercase tracking-widest font-black">
                          {isSelf ? "My Garden plot" : `${currentName}'s layout`}
                        </h3>
                      </div>
                      <span className="font-sans text-[8px] text-[#bcf0ae] bg-black/50 px-2 py-0.5 rounded font-extrabold uppercase tracking-wider relative z-20">
                        Level {level} Landscape
                      </span>
                    </div>

                    <div className={`flex-1 grid gap-3 relative z-10 px-0.5 pb-1 ${level >= 100 ? 'grid-cols-6' : 'grid-cols-3'}`}>
                      {plots.map((plot) => {
                        const isLocked = plot.type === 'locked';
                        const isEmpty = plot.type === 'empty';
                        const progress = plot.growth;
                        const isMature = progress >= 100;

                        let mutationBorder = "border-b-4 border-black/20";
                        if (plot.mutation === 'golden') {
                          mutationBorder = "border-2 border-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)] bg-yellow-50/10";
                        } else if (plot.mutation === 'silver') {
                          mutationBorder = "border-2 border-slate-300 shadow-[0_0_8px_rgba(203,213,225,0.5)] bg-slate-100/10";
                        } else if (plot.mutation === 'diamond') {
                          mutationBorder = "border-2 border-cyan-400 shadow-[0_0_10px_rgba(103,232,249,0.6)] bg-cyan-100/10 animate-pulse";
                        } else if (plot.mutation === 'frozen') {
                          mutationBorder = "border-2 border-blue-400 shadow-[0_0_10px_rgba(147,197,253,0.6)] bg-blue-100/10 animate-pulse";
                        } else if (plot.mutation === 'rainbow') {
                          mutationBorder = "border-2 border-pink-400 shadow-[0_0_12px_rgba(244,114,182,0.7)] bg-gradient-to-br from-yellow-100/10 via-blue-100/10 to-pink-100/10 animate-pulse";
                        }

                        return (
                          <div 
                            key={`mini_${plot.id}`} 
                            className={`soil-row h-20 rounded-xl relative flex items-center justify-center border border-black/10 transition-transform hover:scale-102 ${isLocked ? 'opacity-50' : ''} ${mutationBorder}`}
                          >
                            {isEmpty && (
                              <button className="w-5 h-5 rounded-full bg-white/20 border border-dashed border-white/40 flex items-center justify-center cursor-default">
                                <span className="material-symbols-outlined text-white text-[10px]">add</span>
                              </button>
                            )}

                            {isLocked && (
                              <div className="flex flex-col items-center text-white/50">
                                <span className="material-symbols-outlined text-xs">lock</span>
                              </div>
                            )}

                            {!isEmpty && !isLocked && (
                              <div className="absolute -top-3 text-center flex flex-col items-center scale-90">
                                <div className="relative">
                                  <div className="w-10 h-10 flex items-center justify-center">
                                    <PixelPlant id={plot.type} className="w-10 h-10 animate-bounce" style={{ animationDuration: '3s' }} />
                                  </div>
                                  <div className="absolute top-0 -right-1.5 flex flex-col gap-0.5">
                                    {plot.watered && <div className="w-1 h-1 bg-blue-500 rounded-full" />}
                                    {plot.fertilized && <div className="w-1 h-1 bg-amber-500 rounded-full" />}
                                  </div>
                                </div>
                                
                                {(() => {
                                  const selectCategory = plantCategory(plot.type);
                                  const req = selectCategory === 'Rare' ? 10 : (selectCategory === 'Legendary' ? 20 : 5);
                                  const currentW = typeof plot.wateredCount === 'number' ? plot.wateredCount : Math.round((plot.growth / 100) * req);
                                  return (
                                    <span className="bg-primary/95 text-white text-[5px] font-sans px-1 py-0.5 rounded uppercase tracking-tighter block whitespace-nowrap font-bold">
                                      {plot.name.slice(0, 5)} {progress}%
                                    </span>
                                  );
                                })()}

                                {isMature && (
                                  <div className="mt-0.5 scale-75 bg-amber-400 text-primary px-1 rounded text-[5px] font-sans font-black uppercase tracking-wider shadow-xs">
                                    MATURE!
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              })()}
            </div>
          )}

          {/* ================= PANEL TAB B: WARDROBE & CLOTHES CLOSETS ================= */}
          {profileTab === 'wardrobe' && isSelf && (
            <div className="space-y-4 animate-fade-in">
              
              {/* Creator sandbox notice/action */}
              <div className="bg-[#eef3ec] p-3 border border-[#b1ceb2] rounded-xl flex flex-col justify-center items-center text-center">
                <p className="font-sans text-[10px] text-primary-variant font-medium leading-normal mb-2">
                  🎨 <strong>Custom Graphic Configured?</strong> Instantly force-unlock all closets to test your custom clothes, background assets, and hand items loaded via index.html!
                </p>
                <button
                  onClick={unlockAllWardrobe}
                  className="bg-[#2d5a27] hover:bg-[#1f401a] py-1 px-3 text-[9px] uppercase tracking-wider font-extrabold text-white rounded-lg cursor-pointer transition-all active:scale-95 shadow-sm"
                >
                  🧪 UNLOCK ALL CLOTHING CHEAT
                </button>
              </div>

              {/* Categorization controls */}
              <div className="flex gap-1 bg-[#eeeeee] p-1 rounded-lg">
                <button 
                  onClick={() => setClosetCat('outfits')}
                  className={`flex-1 py-1 text-[10px] font-black uppercase text-center rounded-md cursor-pointer transition-all ${
                    closetCat === 'outfits' ? 'bg-white shadow-sm text-primary' : 'text-[#72796e]'
                  }`}
                >
                  👕 Outfits
                </button>
                <button 
                  onClick={() => setClosetCat('props')}
                  className={`flex-1 py-1 text-[10px] font-black uppercase text-center rounded-md cursor-pointer transition-all ${
                    closetCat === 'props' ? 'bg-white shadow-sm text-primary' : 'text-[#72796e]'
                  }`}
                >
                  🎩 Hats &amp; Props
                </button>
                <button 
                  onClick={() => setClosetCat('backgrounds')}
                  className={`flex-1 py-1 text-[10px] font-black uppercase text-center rounded-md cursor-pointer transition-all ${
                    closetCat === 'backgrounds' ? 'bg-white shadow-sm text-primary' : 'text-[#72796e]'
                  }`}
                >
                  🖼️ Backdrop
                </button>
              </div>

              {/* Display items inventory list */}
              <div className="grid grid-cols-2 gap-3 pb-8">
                {CLOTHING_DATABASE.filter(item => item.category === closetCat).map(item => {
                  const unlocked = isItemUnlocked(item.id, item.category);
                  const equipped = isItemEquipped(item.id, item.category);
                  
                  // rarity visual accent classes
                  let badgeColors = 'bg-gray-100 text-gray-700';
                  if (item.rarity === 'Rare') badgeColors = 'bg-purple-100 text-purple-700 border border-purple-200';
                  if (item.rarity === 'Legendary') badgeColors = 'bg-amber-100 text-amber-800 border border-amber-200 animate-pulse';

                  return (
                    <div 
                      key={item.id}
                      className={`relative bg-white border-2 rounded-xl p-3 flex flex-col justify-between transition-transform motion-safe:hover:scale-[1.02] shadow-xs ${
                        equipped ? 'border-primary shadow-sm bg-radial from-green-50/10 to-transparent' : 'border-outline-variant'
                      }`}
                    >
                      <div>
                        {/* Headers */}
                        <div className="flex justify-between items-start mb-1.5">
                          <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded-full uppercase ${badgeColors}`}>
                            {item.rarity}
                          </span>
                          
                          {/* Indicator if user loaded custom uploaded image for it */}
                          {item.imageUrl && (
                            <span 
                              title="Custom custom design graphic path loaded!" 
                              className="material-symbols-outlined text-xs text-blue-500 fill" style={{ fontVariationSettings: '"FILL" 1' }}
                            >
                              image
                            </span>
                          )}
                        </div>

                        {/* Visual Preview Graphic */}
                        <div className="w-full h-16 bg-[#fafafa] border border-outline-variant/40 rounded-lg flex items-center justify-center mb-2 overflow-hidden relative">
                          {item.imageUrl ? (
                            <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-contain" referrerPolicy="no-referrer" />
                          ) : item.category === 'props' ? (
                            [
                              'bucket hat', 'classic cap', 'pirate hat', 'bowler hat', 'santa hat', 
                              'flower wreath', 'witch hat', 'party hat', 'leprechaun hat', 'construction hardhat', 
                              'royal crown', 'sprout clip', 'bear ears headband', 'chef hat', 'knitted beanie', 
                              'chic glasses', 'elegant headband', 'conical straw hat', 'classic sun hat', 'floppy straw hat'
                            ].includes(item.id.toLowerCase().trim()) ? (
                              <div className="w-12 h-12">
                                <PixelHat id={item.id} />
                              </div>
                            ) : (
                              <div className="w-12 h-12">
                                <PixelProp id={item.id} />
                              </div>
                            )
                          ) : item.category === 'outfits' ? (
                            <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
                              <FarmerAvatar size="lg" customOutfit={item.id} customProp="None" customHat="None" />
                            </div>
                          ) : (
                            <div className="w-full h-full">
                              <FarmerAvatar size="lg" customBg={item.id} customOutfit="None" customProp="None" customHat="None" />
                            </div>
                          )}
                        </div>

                        {/* Title */}
                        <h4 className="font-heading text-xs font-black text-primary leading-tight mb-1">
                          {item.name}
                        </h4>
                        
                        <p className="font-sans text-[9px] text-[#72796e] leading-snug mb-3">
                          {item.description}
                        </p>
                      </div>

                      {/* Equipping actions */}
                      <div className="border-t border-[#72796e]/10 pt-2 flex flex-col gap-1.5">
                        {unlocked ? (
                          <button
                            onClick={() => handleEquipItem(item.id, item.category)}
                            disabled={equipped}
                            className={`w-full py-1.5 rounded-lg text-[9px] uppercase tracking-wider font-extrabold text-center transition-all ${
                              equipped 
                                ? 'bg-green-100 text-green-700 shadow-none border border-green-300' 
                                : 'bg-primary hover:bg-[#2d5a27] text-white active:scale-95 shadow-xs'
                            }`}
                          >
                            {equipped ? '✓ Equipping' : 'Wear Item'}
                          </button>
                        ) : (
                          <div className="flex items-center gap-1.5 justify-center py-1 text-[9px] font-bold text-gray-400 border border-dashed border-gray-200 bg-gray-50/50 rounded-lg">
                            <span className="material-symbols-outlined text-xs">lock</span>
                            LOCKED
                          </div>
                        )}
                        
                        {item.imageUrl && (
                          <span className="text-[7px] text-center text-blue-500 font-mono tracking-tight font-extrabold uppercase">
                            🖼️ Custom URL Loaded
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

        </main>
      </div>

      {/* HTML Custom Bio Editing Modal */}
      {isEditingBio && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl border-4 border-primary p-6 w-full max-w-sm space-y-4 shadow-2xl relative paper-texture text-on-surface">
            <div className="text-center">
              <span className="material-symbols-outlined text-4xl text-primary animate-pulse">description</span>
              <h3 className="font-heading text-lg font-bold text-primary uppercase tracking-wider mt-2">Edit Bio Quote</h3>
              <p className="font-serif italic text-xs text-[#72796e] mt-1">
                Customize your public gardener description below.
              </p>
            </div>
            <textarea
              value={tempBio}
              onChange={e => setTempBio(e.target.value)}
              className="w-full bg-[#eeeeee] border border-outline-variant rounded-lg p-2.5 font-sans text-xs focus:ring-0 focus:outline-none h-24"
              maxLength={150}
              placeholder="Tell other growers about yourself..."
            />
            <div className="flex justify-between items-center text-[10px] text-[#72796e] px-1">
              <span>Max 150 characters</span>
              <span className="font-mono">{(tempBio || '').length}/150</span>
            </div>
            <div className="flex gap-3 justify-center pt-2">
              <button 
                onClick={() => setIsEditingBio(false)}
                className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-on-surface-variant font-sans text-xs font-bold uppercase rounded-xl border border-outline-variant cursor-pointer transition-all active:scale-95"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (tempBio.trim()) {
                    setBio(tempBio);
                    triggerAlert("Bio updated successfully!");
                  }
                  setIsEditingBio(false);
                }}
                className="px-4 py-2 bg-primary hover:bg-[#2d5a27] text-white font-sans text-xs font-bold uppercase rounded-xl border-b-4 border-black/30 cursor-pointer transition-all active:scale-95"
              >
                Save Quote
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Badge Inspect Details Modal */}
      {selectedBadgeDetail && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" onClick={() => setSelectedBadgeDetail(null)}>
          <div 
            className="bg-white rounded-2xl border-4 border-primary p-6 w-full max-w-sm space-y-4 shadow-2xl relative paper-texture text-on-surface"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedBadgeDetail(null)}
              className="absolute top-2 right-2 hover:bg-[#e8e8e8] w-7 h-7 rounded-full flex items-center justify-center font-bold text-gray-500 transition-colors"
            >
              ✕
            </button>

            <div className="text-center space-y-3">
              {/* Badge Medallion representation inside Modal */}
              <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-b ${selectedBadgeDetail.isEarned ? selectedBadgeDetail.bgColor : 'from-gray-100 to-gray-200'} border-4 ${selectedBadgeDetail.isEarned ? selectedBadgeDetail.borderColor : 'border-gray-300'} flex items-center justify-center shadow-inner relative`}>
                <span className={`text-4xl ${!selectedBadgeDetail.isEarned && 'grayscale filter opacity-40'}`}>
                  {selectedBadgeDetail.logoEmoji}
                </span>
                {!selectedBadgeDetail.isEarned && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[15px] text-white">lock</span>
                  </div>
                )}
              </div>

              <h3 className="font-heading text-lg font-black text-primary uppercase tracking-wider mt-2">{selectedBadgeDetail.title}</h3>
              
              <div className={`inline-block px-2.5 py-0.5 text-[8px] font-black uppercase tracking-wider rounded-full ${selectedBadgeDetail.isEarned ? selectedBadgeDetail.accentClass : 'bg-gray-100 text-gray-500'}`}>
                {selectedBadgeDetail.isEarned ? '★ CLAIMED' : '🔒 LOCKED'} • {selectedBadgeDetail.category} Class
              </div>

              <p className="font-serif italic text-xs text-[#72796e] leading-relaxed px-2">
                "{selectedBadgeDetail.description}"
              </p>

              <div className="bg-[#fcfcf9] p-3 rounded-xl border border-[#72796e]/15 text-left space-y-1.5">
                <span className="font-sans text-[9px] uppercase tracking-wider font-extrabold text-primary block">How to claim:</span>
                <p className="font-sans text-[10px] text-on-surface-variant leading-relaxed">
                  {selectedBadgeDetail.id === 'Sunbeam Badge' && "Complete the sunflower bounty quest on the home page by cultivating & harvesting 3 sunflowers!"}
                  {selectedBadgeDetail.id === 'Seed Collector' && "Visit the seed shop vendor and purchase any starter seed packet to start your collection!"}
                  {selectedBadgeDetail.id === 'Rare Seed Expert' && "Identify & secure rare or legendary species seeds from the rotating seed stall catalogs."}
                  {selectedBadgeDetail.id === 'Trade Tycoon' && "Open the Guild Plaza tab, complete bartering by accepting an invite offer from other active farmers."}
                  {selectedBadgeDetail.id === 'Leveling Sovereign' && "Hurry up and earn XP by growing high-grade crops to boost your garden to Level 15 or higher!"}
                  {selectedBadgeDetail.id === '100 Day Streak' && "Cultivate long-standing consistency by meeting your habit lists multiple consecutive days!"}
                  {selectedBadgeDetail.id === 'Master Harvester' && "Fully mature and harvest premium fruits directly from your agricultural plots."}
                  {selectedBadgeDetail.id === 'Habit Warrior' && "Complete your morning/learning chores & habits to charge your garden's active vitality pool."}
                </p>
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <button 
                onClick={() => setSelectedBadgeDetail(null)}
                className="w-full py-2 bg-primary hover:bg-[#2d5a27] text-white font-sans text-xs font-bold uppercase rounded-xl border-b-4 border-black/30 cursor-pointer transition-all active:scale-95"
              >
                GOT IT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
