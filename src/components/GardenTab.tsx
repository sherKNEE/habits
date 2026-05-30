import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PlantPlot, PlantType } from '../types';
import { CROPS } from '../cropsData';
import { FarmerAvatar } from './FarmerAvatar';
import { PixelPlant } from './PixelPlant';
import { GardenConfetti } from './GardenConfetti';

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
        <div className="absolute top-3.5 left-6 right-6 h-1 bg-amber-800 border-b border-amber-950/60 opacity-80"></div>
        <div className="absolute bottom-3.5 left-6 right-6 h-1 bg-amber-800 border-t border-amber-950/60 opacity-80"></div>
        <div className="absolute top-6 bottom-6 left-3.5 w-1 bg-amber-800 border-r border-amber-950/60 opacity-80"></div>
        <div className="absolute top-6 bottom-6 right-3.5 w-1 bg-amber-800 border-l border-amber-950/60 opacity-80"></div>

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
        <div className="absolute top-3 left-[25%] text-[8px] text-green-900">🌿</div>
        <div className="absolute top-3 right-[45%] text-[8px] text-green-900">🌿</div>
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
        <div className="absolute top-1/4 left-1.5 text-base text-yellow-100 animate-pulse">🕊️</div>
        <div className="absolute top-1/4 right-1.5 text-base text-yellow-100 animate-pulse">🕊️</div>

        <div className="absolute top-10 left-12 w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
        <div className="absolute bottom-12 right-12 w-1 h-1 bg-yellow-250 rounded-full animate-ping" style={{ animationDelay: '0.8s' }}></div>
      </div>
    );
  }

  // LEVEL 100+: Heavenly Astral Sovereign Garden (Most Magnificent visual ever!)
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
      <div className="absolute bottom-1 left-1 w-9 h-9 bg-gradient-to-tr from-yellow-300 via-violet-600 to-pink-500 border-2 border-yellow-300 rounded-tr-2xl shadow-[0_0_15px_rgba(251,191,36,0.9)] z-22 flex items-center justify-center">
        <span className="text-xs drop-shadow-[0_0_5px_white] animate-pulse" style={{ animationIterationCount: 4 }}>👑</span>
      </div>
      <div className="absolute bottom-1 right-1 w-9 h-9 bg-gradient-to-tl from-yellow-300 via-violet-600 to-pink-500 border-2 border-yellow-300 rounded-tl-2xl shadow-[0_0_15px_rgba(251,191,36,0.9)] z-22 flex items-center justify-center">
        <span className="text-xs drop-shadow-[0_0_5px_white] animate-pulse" style={{ animationIterationCount: 4 }}>👑</span>
      </div>

      {/* Cosmic shooting stars/rainbow meteor indicators flying */}
      <span className="absolute top-10 left-12 text-sm drop-shadow animate-bounce select-none">💫</span>
      <span className="absolute bottom-12 right-12 text-sm drop-shadow animate-pulse" style={{ animationDelay: '1.2s', animationIterationCount: 4 }}>☄️</span>
      <div className="absolute top-1/2 left-[20%] w-64 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent rotate-12 opacity-35 animate-pulse" style={{ animationIterationCount: 4 }}></div>
    </div>
  );
};

export const GardenTab: React.FC = () => {
  const {
    vitality, setVitality, maxVitality,
    level, setLevel, xp,
    coins, setCoins,
    streak, setStreak,
    plots, setPlots,
    gardenMode, setGardenMode,
    inventorySeeds, setInventorySeeds,
    harvestedInven, setHarvestedInven,
    hasWateringCan, setHasWateringCan,
    wateringCanCount, setWateringCanCount,
    hasShovel,
    badges, setBadges, claimBadge,
    sunflowersHarvestedCount, setSunflowersHarvestedCount,
    claimedQuest, setClaimedQuest,
    triggerAlert,
    addCoins,
    addXp,
    mutationSpraysInventory,
    applyMutationSpray,
    tasks, setTasks,
    antagonistTimer, setAntagonistTimer,
    activeAnimation, setActiveAnimation,
    triggerAntagonistAttack,
    resetGardenFromScratch
  } = useApp();

  const [selectedPlot, setSelectedPlot] = useState<PlantPlot | null>(null);
  const [showPlantModal, setShowPlantModal] = useState(false);
  const [plotToUnlock, setPlotToUnlock] = useState<PlantPlot | null>(null);
  const [showMutationSprayModal, setShowMutationSprayModal] = useState(false);
  const [mutationSprayPlot, setMutationSprayPlot] = useState<PlantPlot | null>(null);

  const [showConfetti, setShowConfetti] = useState(false);
  const [prevLevelForConfetti, setPrevLevelForConfetti] = useState<number>(level);

  useEffect(() => {
    if (level !== prevLevelForConfetti) {
      if (level % 10 === 0) {
        setShowConfetti(true);
      }
      setPrevLevelForConfetti(level);
    }
  }, [level, prevLevelForConfetti]);

  // Growth speed coefficient
  const growthMultiplier = hasWateringCan ? 1.25 : 1.0;

  const getCropRequiredWaterings = (type: string) => {
    const cropDef = CROPS.find(c => c.id === type);
    const category = cropDef?.category || 'Common';
    if (category === 'Rare') return 10;
    if (category === 'Legendary') return 20;
    return 5;
  };

  const getPlotsThemeInfo = () => {
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
        decorStyle: "text-red-500"
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
        bgClass: "bg-amber-50 bg-gradient-to-br from-amber-100 via-amber-200 to-yellow-100",
        borderClass: "border-8 border-yellow-500 shadow-[0_0_40px_rgba(234,179,8,0.7)] rounded-3xl",
        cellBorderClass: "border-2 border-yellow-400 rounded-2xl bg-amber-200/25",
        accent: "👑",
        decorSet: ["👑", "🌟", "⛲", "🌟"],
        decorStyle: "text-yellow-600"
      };
    } else {
      // Level >= 100
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

  const handlePlotClick = (plot: PlantPlot) => {
    if (plot.type === 'locked') {
      let reqLevel = 10;
      if (level < 100) {
        reqLevel = (plot.id - 2) * 10;
      } else {
        reqLevel = 100 + (plot.id - 2) * 10;
      }
      triggerAlert(`🔒 This plot is locked! Reach Level ${reqLevel} to unlock it. Use the "Skip Level" button above to jump up quickly!`);
      return;
    }

    // Direct Quick tool usage
    if (gardenMode === 'water' && plot.type !== 'empty') {
      if (!hasWateringCan || wateringCanCount <= 0) {
        triggerAlert("⚠️ You have run out of Watering Cans! Buy more from the Gear Shop to continue watering.");
        return;
      }
      if (plot.growth < 100) {
        const required = getCropRequiredWaterings(plot.type);
        setPlots(prev => prev.map(p => {
          if (p.id === plot.id) {
            const currentWatered = typeof p.wateredCount === 'number' 
              ? p.wateredCount 
              : Math.round((p.growth / 100) * required);
            const nextWatered = Math.min(required, currentWatered + 1);
            const nextGrowth = Math.round((nextWatered / required) * 100);
            const nextStage = nextGrowth >= 100 ? 3 : nextGrowth > 40 ? 2 : 1;
            return { ...p, watered: true, wateredCount: nextWatered, growth: nextGrowth, stage: nextStage as 1 | 2 | 3 };
          }
          return p;
        }));
        
        setWateringCanCount(prev => {
          const nextVal = Math.max(0, prev - 1);
          if (nextVal <= 0) {
            setHasWateringCan(false);
          }
          return nextVal;
        });

        const nextW = Math.min(required, (plot.wateredCount || 0) + 1);
        triggerAlert(`Watered ${plot.name}! (Progress: ${nextW}/${required} waterings). Cans remaining: ${Math.max(0, wateringCanCount - 1)}.`);
      } else {
        triggerAlert(`${plot.name} is fully mature! Double click to harvest.`);
      }
      return;
    }

    if (gardenMode === 'fertilize' && plot.type !== 'empty') {
      setMutationSprayPlot(plot);
      setShowMutationSprayModal(true);
      return;
    }

    if (gardenMode === 'shovel' && plot.type !== 'empty') {
      if (!hasShovel) {
        triggerAlert("⚠️ You need to buy a Shovel for 500 Coins from the Gear Shop first!");
        return;
      }
      
      const seedType = plot.type;
      
      // Reset plot
      setPlots(prev => prev.map(p => {
        if (p.id === plot.id) {
          return {
            ...p,
            type: 'empty',
            name: '',
            growth: 0,
            stage: 1,
            watered: false,
            fertilized: false,
            wateredCount: 0,
            mutation: undefined
          };
        }
        return p;
      }));
      
      // Put the seed back in inventory
      setInventorySeeds(prev => ({
        ...prev,
        [seedType]: (prev[seedType] || 0) + 1
      }));
      
      triggerAlert(`⛏️ Dug up ${plot.name}! The seed has been returned safely to your inventory.`);
      return;
    }

    // Traditional details modal of the plot
    if (plot.type === 'empty') {
      setSelectedPlot(plot);
      setShowPlantModal(true);
    } else {
      // Ready to harvest
      if (plot.growth >= 100) {
        harvestCrop(plot);
      } else {
        // Nurture dialogue
        setSelectedPlot(plot);
      }
    }
  };

  const sowSeed = (seedType: string) => {
    if (!selectedPlot) return;
    
    const ownedCount = inventorySeeds[seedType] || 0;
    if (ownedCount <= 0) {
      const cropDef = CROPS.find(c => c.id === seedType);
      const name = cropDef ? cropDef.name : seedType;
      triggerAlert(`No ${name} seeds in your backpack. Buy some in the Shop!`);
      return;
    }
    setInventorySeeds(prev => ({
      ...prev,
      [seedType]: (prev[seedType] || 0) - 1
    }));

    const cropDef = CROPS.find(c => c.id === seedType);
    const name = cropDef ? cropDef.name : (seedType.charAt(0).toUpperCase() + seedType.slice(1));
    
    setPlots(prev => prev.map(p => {
      if (p.id === selectedPlot.id) {
        return {
          ...p,
          type: seedType as PlantType,
          name,
          growth: 0,
          stage: 1,
          watered: false,
          fertilized: false,
          wateredCount: 0
        };
      }
      return p;
    }));

    triggerAlert(`Planted ${name} seeds! Nourish them with Water & Fertilizers.`);
    setShowPlantModal(false);
    setSelectedPlot(null);
  };

  const harvestCrop = (plot: PlantPlot) => {
    setPlots(prev => prev.map(p => p.id === plot.id ? { ...p, type: 'empty', name: '', growth: 0, stage: 1, watered: false, fertilized: false, mutation: undefined, wateredCount: 0 } : p));
    
    // Gain crop item
    const type = plot.type as string;
    setHarvestedInven(prev => ({
      ...prev,
      [type]: (prev[type] || 0) + 1
    }));

    if (type === 'sunflower') {
      setSunflowersHarvestedCount(c => c + 1);
    }

    let mutationMultiplier = 1;
    if (plot.mutation === 'golden') mutationMultiplier = 2;
    else if (plot.mutation === 'silver') mutationMultiplier = 3;
    else if (plot.mutation === 'diamond') mutationMultiplier = 4;
    else if (plot.mutation === 'frozen') mutationMultiplier = 5;
    else if (plot.mutation === 'rainbow') mutationMultiplier = 6;

    const cropDef = CROPS.find(c => c.id === type);
    const baseCoins = cropDef ? (cropDef.cost + cropDef.netProfit) : 80;
    const finalCoinsEarned = baseCoins * mutationMultiplier;

    addXp(35);
    addCoins(finalCoinsEarned);
    claimBadge('Master Harvester');
    setVitality(v => Math.min(maxVitality, v + 5));

    if (mutationMultiplier > 1) {
      triggerAlert(`🎉 Mutation Bonus! Harvested an elite ${plot.mutation.toUpperCase()} ${plot.name}! (Multiplier: x${mutationMultiplier}) earned +${finalCoinsEarned.toLocaleString()} Coins (plus any focus bonuses) and +35 XP!`);
    } else {
      triggerAlert(`Harvested a fresh ${plot.name}! Credited +${finalCoinsEarned.toLocaleString()} Coins & +35 XP.`);
    }

    setSelectedPlot(null);
  };

  const claimBadgeQuest = () => {
    if (sunflowersHarvestedCount >= 3 && !claimedQuest) {
      setClaimedQuest(true);
      claimBadge('Sunbeam Badge');
      addCoins(1000);
      addXp(250);
      triggerAlert("🏆 Claimed Quest: Earned legendary 'Sunbeam Badge', 1000 Coins & 250 XP!");
    }
  };

  return (
    <div className="space-y-6">
      {/* HP/XP/Growth Status Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Vitality Card */}
        <div className="bg-secondary-container p-4 rounded-xl border-2 border-outline pixel-border-inset">
          <div className="flex justify-between items-center mb-1">
            <span className="font-sans text-label-sm text-on-secondary-container uppercase">Vitality</span>
            <span className="font-sans text-label-sm text-on-secondary-container font-bold">{vitality}/{maxVitality}</span>
          </div>
          <div className="h-4 bg-surface-container-high rounded-full overflow-hidden border border-outline/30 shadow-inner">
            <div 
              className="h-full bg-primary transition-all duration-500 rounded-full" 
              style={{ width: `${Math.min(100, (vitality / maxVitality) * 100)}%` }}
            ></div>
          </div>
        </div>

        {/* XP Progress Card */}
        <div className="bg-secondary-container p-4 rounded-xl border-2 border-outline pixel-border-inset">
          <div className="flex justify-between items-center mb-1">
            <span className="font-sans text-label-sm text-on-secondary-container uppercase">
              {level >= 200 ? "Max Level Reached" : `XP Level ${level}`}
            </span>
            <span className="font-sans text-label-sm text-on-secondary-container font-bold">
              {level >= 200 ? "Max" : `${xp}/${level >= 100 ? 1500 : 1000}`}
            </span>
          </div>
          <div className="h-4 bg-surface-container-high rounded-full overflow-hidden border border-outline/30 shadow-inner">
            <div 
              className="h-full bg-[#3b6934] transition-all duration-500 rounded-full" 
              style={{ width: level >= 200 ? '100%' : `${(xp / (level >= 100 ? 1500 : 1000)) * 100}%` }}
            ></div>
          </div>
        </div>
      </section>

      {/* Antagonist Danger Warning Panel */}
      {(() => {
        const totalCount = tasks.length;
        const completedCount = tasks.filter(t => t.completed).length;
        const missedCount = totalCount - completedCount;
        
        let imminentThreat: { name: string; damage: number; icon: string; desc: string; type: 'locusts' | 'crows' | 'aliens' | 'lightning' } | null = null;
        if (totalCount > 0) {
          if (completedCount === 0) {
            imminentThreat = {
              name: "Thunder Striker (Boss)",
              damage: 40,
              icon: "bolt",
              desc: "The clouds are crackling with violent currents! Complete at least 1 habit task to save your crops from total devastation.",
              type: "lightning"
            };
          } else if (missedCount >= 4) {
            imminentThreat = {
              name: "Alien Abduction Fleets",
              damage: 20,
              icon: "rocket_launch",
              desc: "Mysterious tractor beam spaceships are hovering! Log task completions now to scramble their frequencies.",
              type: "aliens"
            };
          } else if (missedCount === 3) {
            imminentThreat = {
              name: "Murder of Crows Swarm",
              damage: 15,
              icon: "flutter_dash",
              desc: "Swarms of pecking crows are descending to pick at the buds! Check off habits to turn them back.",
              type: "crows"
            };
          } else if (missedCount === 2) {
            imminentThreat = {
              name: "Pestilent Swarm of Locusts",
              damage: 10,
              icon: "bug_report",
              desc: "Hungry locusts are buzzing in the distance! Do your habits to spray pest-deflecting warding spells.",
              type: "locusts"
            };
          }
        }

        if (!imminentThreat) {
          return (
            <div className="bg-[#e8f5e9] border bg-emerald-50 text-emerald-800 p-4 rounded-xl flex items-center justify-between border-emerald-500/30 backdrop-blur-xs shadow-sm">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald-600 animate-pulse text-2xl font-black">verified</span>
                <div>
                  <span className="font-sans font-black text-xs uppercase tracking-wider block">🌿 Sanctuary Defenses Intact</span>
                  <p className="font-serif italic text-xs text-[#2e7d32] mt-0.5 leading-tight">
                    All routines are up-to-date. The garden sanctuary is fully protected and thriving.
                  </p>
                </div>
              </div>
              <span className="bg-emerald-600 text-white font-sans font-black text-[9px] uppercase px-2 py-1 rounded border border-emerald-700 shadow-sm shrink-0">
                SAFE STATE
              </span>
            </div>
          );
        }

        const minutes = Math.floor(antagonistTimer / 60);
        const seconds = antagonistTimer % 60;
        const widthPercent = (antagonistTimer / 3600) * 100;

        return (
          <div className="bg-red-500/5 hover:bg-red-500/10 border-2 border-red-500/40 p-4 rounded-xl space-y-3 shadow-md backdrop-blur-xs transition-colors">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <div className="flex items-start gap-2.5">
                <span className="material-[#ba1a1a] text-red-600 text-3xl font-black shrink-0 animate-bounce">warning</span>
                <div>
                  <h4 className="font-sans text-xs font-black text-red-700 uppercase tracking-widest block">
                    🚨 INVASION THREAT: {imminentThreat.name}
                  </h4>
                  <p className="font-serif italic text-xs text-[#5f2120] mt-0.5 leading-relaxed">
                    {imminentThreat.desc}
                  </p>
                </div>
              </div>

              {/* Real 1-Hour Countdown Indicator */}
              <div className="bg-red-650 text-white font-mono text-sm font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow border border-red-800 shrink-0 self-end md:self-auto">
                <span className="material-symbols-outlined text-base animate-spin">alarm</span>
                <span>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</span>
              </div>
            </div>

            {/* Simulated countdown progression line */}
            <div className="space-y-1">
              <div className="h-1.5 w-full bg-red-950/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-650 transition-all duration-1000 rounded-full" 
                  style={{ width: `${widthPercent}%` }}
                ></div>
              </div>
              <div className="flex justify-between font-sans text-[8px] text-red-800 font-extrabold uppercase tracking-wider pt-0.5">
                <span>Threat: HIGH (-{imminentThreat.damage} Vitality)</span>
                <span>Status: Warning 1h ETA</span>
              </div>
            </div>

            {/* Sandbox tester controls block */}
            <div className="bg-red-700/5 rounded-lg p-2.5 border border-red-500/15 flex flex-wrap gap-2 items-center justify-between">
              <span className="text-[9px] font-sans font-extrabold text-[#5f2120] uppercase tracking-widest">
                ⚙️ Evaluation Tools Sandbox:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button 
                  onClick={() => {
                    setAntagonistTimer(5);
                    triggerAlert("⏳ Fast-forwarded threat warning to 5 seconds! Wait here to watch the crash!");
                  }}
                  className="px-2.5 py-1 bg-red-700 hover:bg-red-800 text-white font-sans text-[9px] font-bold uppercase rounded border-b-2 border-red-900 shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  Skip ETA to 5s
                </button>
                <button 
                  onClick={() => {
                    triggerAntagonistAttack(imminentThreat!.type);
                  }}
                  className="px-2.5 py-1 bg-black hover:bg-stone-900 text-white font-sans text-[9px] font-bold uppercase rounded border-b-2 border-stone-950 shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  Force Attack Now
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Interactive Garden Field */}
      {(() => {
        const theme = getPlotsThemeInfo();
        return (
          <section 
            className={`relative ${theme.bgClass} p-4 overflow-hidden min-h-[460px] flex flex-col ${theme.borderClass} shadow-inner rounded-xl paper-texture`}
            style={level >= 100 ? { animationIterationCount: 4 } : undefined}
          >
            {/* Prominent High-Fidelity Themed Level Decorations (Fences, Walls, Barrels, Starry Portals etc) */}
            {renderGardenThemeDecorations(level)}

            {/* Confetti Explosion on Level up multiples of 10 */}
            <GardenConfetti 
              active={showConfetti} 
              onComplete={() => setShowConfetti(false)} 
            />

            {/* Gardener Header inside Garden box */}
            <div className="flex items-start justify-between mb-4 relative z-20">
              <div className="flex gap-3 items-center bg-white/80 backdrop-blur-md p-2 rounded-2xl border border-primary/10 shadow-sm">
                <div className="shrink-0">
                  <FarmerAvatar size="sm" />
                </div>
                <div className="flex flex-col">
                  <h1 className="font-heading text-[10px] font-black text-primary uppercase tracking-wider">{theme.name}</h1>
                  <h3 className="font-sans text-[9px] text-[#72796e] uppercase tracking-tighter">Master Gardener</h3>
                  <div className="flex flex-col gap-1 items-start mt-0.5 mb-0.5">
                    <span className="font-serif text-sm font-bold text-on-surface">Level {level}</span>
                    <div className="flex gap-1 items-center flex-wrap max-w-[140px]">
                      <button
                        onClick={() => {
                          const nextLevel = level >= 200 ? 1 : level + 1;
                          setLevel(nextLevel);
                          const nextMaxVis = 100 + Math.floor(nextLevel / 10) * 50;
                          setVitality(nextMaxVis);
                          triggerAlert(`✨ Level increased to Level ${nextLevel}! Vitality expanded to ${nextMaxVis}!`);
                        }}
                        className="px-1.5 py-0.5 bg-primary/10 hover:bg-primary hover:text-white text-primary text-[8px] font-black tracking-wider uppercase rounded border border-primary/20 cursor-pointer transition-all active:scale-95 flex items-center gap-0.5 shadow-xs"
                        title="Skip levels by 1 (max 200) to test individual level steps"
                      >
                        <span className="material-symbols-outlined text-[10px] font-bold">fast_forward</span>
                        <span>Level +1</span>
                      </button>
                      <button
                        onClick={() => {
                          let nextLevel = level + 10;
                          if (nextLevel > 200) nextLevel = 1;
                          setLevel(nextLevel);
                          const nextMaxVis = 100 + Math.floor(nextLevel / 10) * 50;
                          setVitality(nextMaxVis);
                          triggerAlert(`✨ Skipped 10 levels to Level ${nextLevel}! Vitality expanded to ${nextMaxVis}!`);
                        }}
                        className="px-1.5 py-0.5 bg-amber-600/10 hover:bg-amber-[#823a07] hover:text-white text-[#823a07] text-[8px] font-black tracking-wider uppercase rounded border border-amber-600/20 cursor-pointer transition-all active:scale-95 flex items-center shadow-xs"
                        title="Skip levels by 10 to inspect different theme tiers quickly"
                      >
                        <span>+10</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-primary pt-0.5">
                    <span className="material-symbols-outlined text-sm font-bold">monetization_on</span>
                    <span className="font-sans text-xs font-bold">{coins.toLocaleString()}</span>
                  </div>
                </div>
              </div>

          {/* Quick Active Mode Controls */}
          <div className="flex gap-1.5 p-1 bg-white/40 backdrop-blur-md rounded-2xl border border-primary/15">
            <button 
              onClick={() => {
                setGardenMode(gardenMode === 'water' ? 'view' : 'water');
                triggerAlert(gardenMode === 'water' ? "View mode set." : "Watering brush active! Click any plant.");
              }}
              className={`p-1.5 rounded-xl border flex flex-col items-center transition-all cursor-pointer relative ${gardenMode === 'water' ? 'bg-primary text-white border-primary' : 'bg-white/55 border-primary/15 text-primary hover:bg-white'}`}
            >
              {wateringCanCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-blue-500 text-white font-sans text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-sm text-center min-w-[14px]">
                  {wateringCanCount}
                </span>
              )}
              <span className="material-symbols-outlined text-lg">water_drop</span>
              <span className="font-sans text-[7px] uppercase tracking-wider font-bold">Water</span>
            </button>
            <button 
              onClick={() => {
                setGardenMode(gardenMode === 'fertilize' ? 'view' : 'fertilize');
                triggerAlert(gardenMode === 'fertilize' ? "View mode set." : "Fertilization brush active! Click any plant.");
              }}
              className={`p-1.5 rounded-xl border flex flex-col items-center transition-all cursor-pointer ${gardenMode === 'fertilize' ? 'bg-primary text-white border-primary' : 'bg-white/55 border-primary/15 text-primary hover:bg-white'}`}
            >
              <span className="material-symbols-outlined text-lg">nutrition</span>
              <span className="font-sans text-[7px] uppercase tracking-wider font-bold">Fertilize</span>
            </button>
            <button 
              onClick={() => {
                if (!hasShovel) {
                  triggerAlert("⚠️ You need to buy a Shovel for 500 Coins from the Gear Shop first!");
                  return;
                }
                setGardenMode(gardenMode === 'shovel' ? 'view' : 'shovel');
                triggerAlert(gardenMode === 'shovel' ? "View mode set." : "Shovel active! Click any plant to dig it up.");
              }}
              className={`p-1.5 rounded-xl border flex flex-col items-center transition-all cursor-pointer ${!hasShovel ? 'opacity-50 bg-black/5 text-[#72796e]/50 border-dashed border-[#72796e]/20' : gardenMode === 'shovel' ? 'bg-primary text-white border-primary' : 'bg-white/55 border-primary/15 text-primary hover:bg-white'}`}
              title={hasShovel ? "Shovel: Dig up seed to return to your inventory" : "Unlock Shovel in the Gear Shop for 500 Coins!"}
            >
              <span className="material-symbols-outlined text-lg">hardware</span>
              <span className="font-sans text-[7px] uppercase tracking-wider font-bold">Shovel</span>
            </button>
          </div>
        </div>

        {/* Plot Grid - Scaled columns for double plots (level >= 100) */}
        <div className={`flex-1 grid gap-4 relative z-10 px-1 pb-2 ${level >= 100 ? 'grid-cols-3 sm:grid-cols-6' : 'grid-cols-3'}`}>
          {plots.map((plot) => {
            const isLocked = plot.type === 'locked';
            const isEmpty = plot.type === 'empty';
            const progress = plot.growth;
            const isMature = progress >= 100;

            let mutationBorder = "border-b-4 border-black/20";
            if (plot.mutation === 'golden') {
              mutationBorder = "border-2 border-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.6)] bg-yellow-50/10";
            } else if (plot.mutation === 'silver') {
              mutationBorder = "border-2 border-slate-300 shadow-[0_0_12px_rgba(203,213,225,0.6)] bg-slate-100/10";
            } else if (plot.mutation === 'diamond') {
              mutationBorder = "border-2 border-cyan-400 shadow-[0_0_15px_rgba(103,232,249,0.73)] bg-cyan-100/10 animate-pulse";
            } else if (plot.mutation === 'frozen') {
              mutationBorder = "border-2 border-blue-400 shadow-[0_0_15px_rgba(147,197,253,0.73)] bg-blue-100/10 animate-bounce";
            } else if (plot.mutation === 'rainbow') {
              mutationBorder = "border-2 border-pink-400 shadow-[0_0_20px_rgba(244,114,182,0.8)] bg-gradient-to-br from-yellow-100/15 via-blue-100/15 to-pink-100/15 animate-pulse";
            }

            return (
              <div
                key={plot.id}
                onClick={() => handlePlotClick(plot)}
                className={`soil-row h-24 rounded-xl relative flex items-center justify-center hover:scale-103 active:scale-97 cursor-pointer transition-all ${isLocked ? 'opacity-55' : ''} ${mutationBorder}`}
              >
                {isEmpty && (
                  <button className="w-8 h-8 rounded-full bg-white/20 border-2 border-dashed border-white/40 flex items-center justify-center hover:bg-white/35 transition-colors">
                    <span className="material-symbols-outlined text-white text-base">add</span>
                  </button>
                )}

                {isLocked && (
                  <div className="flex flex-col items-center text-white/50">
                    <span className="material-symbols-outlined text-xl">lock</span>
                    <span className="font-sans text-[8px] uppercase tracking-wider">3k Unlock</span>
                  </div>
                )}

                {!isEmpty && !isLocked && (
                  <div className="absolute -top-3 text-center flex flex-col items-center">
                    {/* Visual representative icon based on seed type */}
                    <div className="relative transform hover:scale-110 transition-transform">
                      <div className="w-12 h-12 flex items-center justify-center">
                        <PixelPlant id={plot.type} className="w-12 h-12" />
                      </div>

                      {/* Nourish status tags */}
                      <div className="absolute top-0 -right-2 flex flex-col gap-0.5">
                        {plot.watered && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />}
                        {plot.fertilized && <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />}
                      </div>
                    </div>

                    {(() => {
                      const req = plot.type === 'empty' || plot.type === 'locked' ? 5 : (CROPS.find(c => c.id === plot.type)?.category === 'Rare' ? 10 : (CROPS.find(c => c.id === plot.type)?.category === 'Legendary' ? 20 : 5));
                      const currentW = typeof plot.wateredCount === 'number' ? plot.wateredCount : Math.round((plot.growth / 100) * req);
                      const multText = plot.mutation === 'golden' ? 'x2' : plot.mutation === 'silver' ? 'x3' : plot.mutation === 'diamond' ? 'x4' : plot.mutation === 'frozen' ? 'x5' : plot.mutation === 'rainbow' ? 'x6' : '';
                      return (
                        <div className="bg-primary/95 text-white font-sans font-bold px-1.5 py-0.5 rounded text-[8px] uppercase tracking-tighter shadow-sm flex flex-col items-center">
                          <span>{plot.name} ({progress}% • {currentW}/{req} 💧)</span>
                          {multText && <span className="text-yellow-300 text-[7px] font-black tracking-wider uppercase">🌟 MULTIPLIER {multText}</span>}
                        </div>
                      );
                    })()}

                    {isMature && (
                      <div className="mt-0.5 animate-bounce bg-amber-400 text-primary px-1 rounded text-[7px] font-sans font-bold uppercase tracking-wider shadow-sm">
                        HARVEST!
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Background Decorative wood grids */}
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #154212 0px, #154212 1px, transparent 0px, transparent 50%)', backgroundSize: '16px 16px' }}></div>

        {/* Antagonist Animations Overlay Layer */}
        {activeAnimation && (
          <div className="absolute inset-0 z-40 bg-black/40 backdrop-blur-[1px] pointer-events-none rounded-xl overflow-hidden flex flex-col items-center justify-center">
            {/* Dark Storm cloud visual overlays */}
            <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-stone-950/80 to-transparent animate-pulse" />
            
            {/* Locust Swarm Effect */}
            {activeAnimation === 'locusts' && (
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-x-0 top-[20%] text-center text-green-300 font-sans font-black tracking-widest text-lg uppercase drop-shadow-md">
                  🦟 LOCUST SWARM RAVAGING CROPS! 🦟
                </div>
                {Array.from({ length: 24 }).map((_, i) => {
                  const left = Math.round(Math.random() * 90);
                  const top = Math.round(Math.random() * 80);
                  return (
                    <div 
                      key={i} 
                      className="absolute text-2xl animate-ping" 
                      style={{
                        left: `${left}%`,
                        top: `${top}%`,
                        transform: `rotate(${Math.round(Math.random() * 360)}deg)`
                      }}
                    >
                      🦗
                    </div>
                  );
                })}
              </div>
            )}

            {/* Crow Attack Effect */}
            {activeAnimation === 'crows' && (
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-x-0 top-[20%] text-center text-slate-800 font-sans font-black tracking-widest text-lg uppercase drop-shadow-md">
                  🦅 RAVAGING CROWS PEAKING CORNERS! 🦅
                </div>
                {Array.from({ length: 14 }).map((_, i) => {
                  const left = Math.round(Math.random() * 90);
                  const top = Math.round(Math.random() * 80);
                  return (
                    <div 
                      key={i} 
                      className="absolute text-3xl animate-bounce"
                      style={{
                        left: `${left}%`,
                        top: `${top}%`,
                      }}
                    >
                      🐦‍⬛
                    </div>
                  );
                })}
              </div>
            )}

            {/* Alien Attack Effect */}
            {activeAnimation === 'aliens' && (
              <div className="absolute inset-0 overflow-hidden bg-purple-950/20">
                <div className="absolute inset-x-0 top-[20%] text-center text-cyan-400 font-sans font-black tracking-widest text-lg uppercase drop-shadow-md">
                  🛸 UFO ABDUCTION PLOT INVASION! 🛸
                </div>
                {/* Neon Tractor beams */}
                <div className="absolute left-1/2 -translate-x-1/2 top-10 w-44 h-80 bg-gradient-to-b from-cyan-400/40 via-purple-500/25 to-transparent rounded-full animate-pulse flex items-center justify-center">
                  <div className="text-6xl animate-spin">🛸</div>
                </div>
                <div className="absolute left-[15%] top-[50%] text-6xl animate-bounce">🛸</div>
                <div className="absolute right-[15%] top-[40%] text-6xl animate-bounce">🛸</div>
              </div>
            )}

            {/* Lightning Strike (Thunder Striker Boss) */}
            {activeAnimation === 'lightning' && (
              <div className="absolute inset-0 bg-white bg-opacity-70 overflow-hidden font-black flex items-center justify-center text-yellow-400">
                <div className="text-center space-y-4">
                  <span className="material-symbols-outlined text-9xl text-yellow-400 animate-bounce font-black">bolt</span>
                  <h3 className="text-black font-sans text-xl font-black uppercase tracking-widest">🌩️ THUNDER STRIKER CRASH! 🌩️</h3>
                </div>
              </div>
            )}

            {/* Damage indicator popup */}
            <div className="absolute inset-x-0 bottom-1/4 flex justify-center z-50">
              <span className="bg-red-600 text-white font-sans text-base font-black px-6 py-2 rounded-2xl border-4 border-red-800 drop-shadow-xl animate-bounce tracking-widest uppercase">
                {activeAnimation === 'locusts' && "-10 VITALITY"}
                {activeAnimation === 'crows' && "-15 VITALITY"}
                {activeAnimation === 'aliens' && "-20 VITALITY"}
                {activeAnimation === 'lightning' && "-40 VITALITY"}
              </span>
            </div>

            {/* Auto-clear timer indicator */}
            <div className="absolute bottom-4 font-sans text-[9px] text-white/60 tracking-wider">
              Clearing aftermath in 4 seconds...
            </div>
          </div>
        )}
      </section>
    );
  })()}

      {/* Manual Nourishment Mode details panel */}
      {selectedPlot && !showPlantModal && (
        <div className="bg-white p-4 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
            <div>
              <h4 className="font-serif text-base text-primary font-bold flex items-center gap-1.5">
                {selectedPlot.name} Status 
                {selectedPlot.mutation && (
                  <span className="text-[9px] bg-purple-100 text-purple-850 border border-purple-200 font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                     🌟 MUTATED {selectedPlot.mutation.toUpperCase()}
                  </span>
                )}
              </h4>
              <p className="text-xs text-[#72796e] leading-snug">
                Growth level is {selectedPlot.growth}% ({selectedPlot.wateredCount || 0}/{(() => {
                  const req = selectedPlot.type === 'empty' ? 5 : (CROPS.find(c => c.id === selectedPlot.type)?.category === 'Rare' ? 10 : (CROPS.find(c => c.id === selectedPlot.type)?.category === 'Legendary' ? 20 : 5));
                  return req;
                })()} waterings). Nourish seeds to accelerate growth speed!
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button 
                onClick={() => {
                  if (!hasWateringCan || wateringCanCount <= 0) {
                    triggerAlert("⚠️ You have run out of Watering Cans! Buy more from the Gear Shop to continue watering.");
                    return;
                  }
                  const required = getCropRequiredWaterings(selectedPlot.type);
                  setPlots(prev => prev.map(p => {
                    if (p.id === selectedPlot.id) {
                      const currentWatered = typeof p.wateredCount === 'number' 
                        ? p.wateredCount 
                        : Math.round((p.growth / 100) * required);
                      const nextWatered = Math.min(required, currentWatered + 1);
                      const nextGrowth = Math.round((nextWatered / required) * 100);
                      const nextStage = nextGrowth >= 100 ? 3 : nextGrowth > 40 ? 2 : 1;
                      return { ...p, watered: true, wateredCount: nextWatered, growth: nextGrowth, stage: nextStage as 1 | 2 | 3 };
                    }
                    return p;
                  }));
                  
                  setWateringCanCount(prev => {
                    const nextVal = Math.max(0, prev - 1);
                    if (nextVal <= 0) {
                      setHasWateringCan(false);
                    }
                    return nextVal;
                  });

                  triggerAlert(`Watered successfully! Cans remaining: ${Math.max(0, wateringCanCount - 1)}.`);
                  setSelectedPlot(null);
                }}
                className="bg-primary text-white font-sans text-xs px-3 py-1.5 rounded-lg border-2 border-primary hover:bg-white hover:text-primary transition-all font-bold flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">water_drop</span> Water (+1 Step)
              </button>
              <button 
                onClick={() => {
                  setMutationSprayPlot(selectedPlot);
                  setShowMutationSprayModal(true);
                }}
                className="bg-purple-600 text-white font-sans text-xs px-3 py-1.5 rounded-lg border-2 border-purple-600 hover:bg-white hover:text-purple-600 transition-all font-bold flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">science</span> Spray Mutation
              </button>
            </div>
          </div>

          {/* Active Mutation or Apply Spray options */}
          {selectedPlot.type !== 'empty' && (
            <div className="w-full pt-3 border-t border-[#72796e]/10 flex flex-col gap-2">
              <span className="font-sans text-[10px] font-extrabold text-[#72796e] uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-purple-600">liquor</span> Apply Mutation Fertilizer Spray (Plant Multiplier)
              </span>
              
              {(Object.values(mutationSpraysInventory) as number[]).reduce((a, b) => a + b, 0) === 0 ? (
                <p className="text-[10px] text-[#72796e]/80 italic">
                  No mutation sprays in backpack. Unbox some Golden, Silver, Diamond, Frozen or Rainbow sprays from Mutation Crates in the Shop!
                </p>
              ) : (
                <div className="flex flex-wrap gap-2 pt-1">
                  {(['golden', 'silver', 'diamond', 'frozen', 'rainbow'] as const).map(sprayType => {
                    const count = mutationSpraysInventory[sprayType] || 0;
                    if (count <= 0) return null;
                    
                    const label = sprayType.charAt(0).toUpperCase() + sprayType.slice(1);
                    const multiplier = sprayType === 'golden' ? 'x2' : sprayType === 'silver' ? 'x3' : sprayType === 'diamond' ? 'x4' : sprayType === 'frozen' ? 'x5' : 'x6';

                    let btnColor = "bg-yellow-50 text-yellow-800 border-yellow-200 hover:bg-yellow-100";
                    if (sprayType === 'silver') btnColor = "bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100";
                    else if (sprayType === 'diamond') btnColor = "bg-cyan-50 text-cyan-800 border-cyan-200 hover:bg-cyan-100 animate-pulse";
                    else if (sprayType === 'frozen') btnColor = "bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100";
                    else if (sprayType === 'rainbow') btnColor = "bg-pink-50 text-pink-850 border-pink-200 hover:bg-pink-100";

                    return (
                      <button
                        key={sprayType}
                        onClick={() => {
                          applyMutationSpray(selectedPlot.id, sprayType);
                          // Reflect mutation in the current selectedPlot state immediately
                          setSelectedPlot(prev => prev ? { ...prev, mutation: sprayType } : null);
                        }}
                        className={`font-sans text-[10px] px-2.5 py-1.5 rounded-lg border font-black uppercase transition-all flex items-center gap-1 active:scale-95 cursor-pointer ${btnColor}`}
                      >
                        <span className="material-symbols-outlined text-[11px] font-bold">science</span>
                        {label} Spray {multiplier} ({count}x)
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Specific sowing modal */}
      {showPlantModal && (
        <div className="bg-secondary-container rounded-xl p-4 border-2 border-outline pixel-border-inset animate-fade-in">
          <div className="flex justify-between items-center mb-3 border-b border-outline-variant/50 pb-2">
            <h4 className="font-serif text-lg text-primary font-bold uppercase tracking-tight">Plant a Seed</h4>
            <button onClick={() => { setShowPlantModal(false); setSelectedPlot(null); }} className="text-secondary hover:text-primary cursor-pointer">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="font-sans text-[10px] uppercase font-bold text-secondary mb-2 tracking-wider font-extrabold pb-1">My Purchased Seeds</p>
              {(() => {
                const ownedSeeds = CROPS.filter(crop => (inventorySeeds[crop.id] || 0) > 0);
                
                if (ownedSeeds.length === 0) {
                  return (
                    <div className="p-4 bg-white/40 border border-dashed border-outline rounded-xl text-center">
                      <p className="font-serif text-xs italic text-on-surface-variant text-center justify-center">No purchased seeds in your backpack.</p>
                      <p className="text-[10px] text-primary/80 mt-1 font-bold">Visit the Seed Emporium under the Shop Tab to buy seeds!</p>
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-48 overflow-y-auto no-scrollbar pt-1">
                    {ownedSeeds.map(seed => (
                      <button 
                        key={seed.id}
                        onClick={() => sowSeed(seed.id)} 
                        className="p-3 bg-surface hover:bg-primary-container/10 border-2 border-outline rounded-xl flex flex-col items-center relative cursor-pointer hover:scale-103 active:scale-97 transition-all"
                      >
                        <div className="absolute top-1 right-1 px-1.5 bg-primary text-white rounded text-[8px] font-sans font-bold shadow-sm">
                          {inventorySeeds[seed.id]} x
                        </div>
                        <div className="w-9 h-9 flex items-center justify-center shrink-0 mb-1">
                          <PixelPlant id={seed.id} className="w-8 h-8" />
                        </div>
                        <span className="font-sans text-xs font-bold mt-1 text-primary truncate w-full text-center">{seed.name}</span>
                        <span className="text-[8px] text-amber-805 uppercase font-bold">Purchased Seed</span>
                      </button>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Quick Action bar & Daily Streak section */}
      <section className="space-y-4">
        <div className="bg-[#cceacd] rounded-xl border-2 border-outline pixel-border-inset p-4 w-full space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#ba1a1a] scale-110 animate-pulse" style={{ fontVariationSettings: '"FILL" 1' }}>local_fire_department</span>
                <h3 className="font-sans text-sm text-primary font-bold uppercase tracking-tight">{streak} Day consecutive logging streak</h3>
              </div>
              <p className="font-serif italic text-xs text-[#72796e] mt-1">
                Your garden blooms when routines are sustained. Log habits daily to unlock heavy coin multipliers!
              </p>
            </div>

            {/* Streak Multiplier Badge indicator */}
            {(() => {
              const mult = streak >= 10 ? 1.5 : streak >= 5 ? 1.3 : streak >= 3 ? 1.2 : streak >= 1 ? 1.1 : 1.0;
              return (
                <div className="bg-[#e1f5fe] border border-blue-400 text-blue-900 font-sans font-black text-xs px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5 shrink-0 self-end sm:self-auto uppercase">
                  <span>🚀 Coin Boost: x{mult.toFixed(1)}</span>
                </div>
              );
            })()}
          </div>

          {/* Progress to next boost tier */}
          <div className="space-y-1.5">
            <div className="relative h-3 bg-neutral-200 rounded-full overflow-hidden border border-outline/30 shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-orange-400 to-red-600 rounded-full transition-all" 
                style={{ width: `${Math.min(100, (streak / 10) * 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center text-[9px] font-sans font-bold text-primary uppercase tracking-wider">
              <span>0 Days (1.0x)</span>
              <span>3 Days (1.2x)</span>
              <span>5 Days (1.3x)</span>
              <span>10+ Days (1.5x Boost!)</span>
            </div>
          </div>

          <div className="bg-white/50 backdrop-blur-xs rounded-xl p-3 border border-primary/10 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="space-y-1">
              <span className="text-[10px] font-sans font-extrabold text-primary uppercase tracking-widest block">🔥 Multiplier Rules:</span>
              <p className="font-serif text-[11px] text-[#42493e] leading-tight">
                Maintaining a logging streak increases all coin gains! However, missing 2 or more daily habits breaks your streak instantly, reverting your boost back to <span className="font-sans font-bold text-red-650">1.0x</span>!
              </p>
            </div>

            {/* Conclude Day Action Button */}
            <div className="flex flex-col items-stretch sm:items-end w-full">
              <button
                onClick={() => {
                  const totalCount = tasks.length;
                  const completedCount = tasks.filter(t => t.completed).length;
                  const missedCount = totalCount - completedCount;
                  
                  let attackHappened = false;
                  let activeType: 'locusts' | 'crows' | 'aliens' | 'lightning' = 'locusts';
                  
                  if (totalCount > 0) {
                    if (completedCount === 0) {
                      attackHappened = true;
                      activeType = 'lightning';
                    } else if (missedCount >= 4) {
                      attackHappened = true;
                      activeType = 'aliens';
                    } else if (missedCount === 3) {
                      attackHappened = true;
                      activeType = 'crows';
                    } else if (missedCount === 2) {
                      attackHappened = true;
                      activeType = 'locusts';
                    }
                  }
                  
                  if (attackHappened) {
                    triggerAntagonistAttack(activeType);
                    triggerAlert(`💥 Day ended with uncompleted habits! Suffer damage from pests or lightning. Streak drops back to 1.0!`);
                  } else {
                    setStreak(prev => prev + 1);
                    addXp(120);
                    addCoins(300);
                    triggerAlert(`☀️ Perfect day logged successfully! Your consecutive streak grew to ${streak + 1} Days! Earned +300 Coins & +120 XP!`);
                  }
                  
                  // Reset habits for next day
                  setTasks(prev => prev.map(t => ({
                    ...t,
                    completed: false,
                    progress: 0,
                    completedAt: undefined
                  })));
                }}
                className="w-full sm:w-auto px-5 py-3 bg-primary hover:bg-[#23501e] text-white font-sans text-xs font-bold uppercase rounded-xl border-b-4 border-black/35 cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-md"
              >
                <span className="material-symbols-outlined text-sm">wb_sunny</span>
                Conclude Day & Log Habits
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Quest Section */}
      <section className={`p-6 rounded-xl border-2 border-outline relative scrapbook-tilt-left shadow-sm ${claimedQuest ? 'bg-primary-container/10 border-primary/40' : 'bg-[#e1e1c9]'}`}>
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#c2c9bb]/40 border border-outline/20"></div>
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#3c5640] rounded-full text-[#adcaae] shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>military_tech</span>
            </div>
            <div>
              <h2 className="font-sans text-sm font-bold text-primary uppercase tracking-wider">Daily Quest</h2>
              <p className="font-serif text-base italic text-on-surface-variant">"Plant 3 sunflowers to earn the Sunbeam Badge."</p>
              
              <div className="mt-4 flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className={`w-8 h-8 rounded-full border-2 border-outline flex items-center justify-center overflow-hidden ${sunflowersHarvestedCount >= 1 ? 'bg-[#bcf0ae]' : 'bg-surface-container'}`}>
                    <PixelPlant id="sunflower" className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className={`w-8 h-8 rounded-full border-2 border-outline flex items-center justify-center overflow-hidden ${sunflowersHarvestedCount >= 2 ? 'bg-[#bcf0ae]' : 'bg-surface-container'}`}>
                    <PixelPlant id="sunflower" className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className={`w-8 h-8 rounded-full border-2 border-outline flex items-center justify-center ${sunflowersHarvestedCount >= 3 ? 'bg-[#bcf0ae]' : 'bg-surface-container border-dashed'}`}>
                    <span className="material-symbols-outlined text-xs text-[#72796e]">add</span>
                  </div>
                </div>
                <span className="font-sans text-xs font-bold text-primary">
                  {Math.min(3, sunflowersHarvestedCount)}/3 HARVESTED
                </span>
              </div>
            </div>
          </div>

          <button 
            disabled={sunflowersHarvestedCount < 3 || claimedQuest}
            onClick={claimBadgeQuest}
            className={`mt-4 sm:mt-0 font-sans text-xs px-4 py-2.5 rounded-full border-b-4 font-bold transition-all shadow-md ${claimedQuest ? 'bg-[#c2c9bb] text-[#72796e] border-[#72796e]/30 cursor-default shadow-none' : sunflowersHarvestedCount >= 3 ? 'bg-primary text-white border-primary-container hover:bg-primary/90 active:scale-95' : 'bg-white/40 border-outline text-[#72796e] cursor-not-allowed'}`}
          >
            {claimedQuest ? 'QUEST CLAIMED' : 'CLAIM BADGE'}
          </button>
        </div>
      </section>

      {/* HTML Custom Plot Unlock Modal */}
      {plotToUnlock && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl border-4 border-primary p-6 w-full max-w-sm space-y-4 shadow-2xl relative paper-texture">
            <div className="text-center">
              <span className="material-symbols-outlined text-4xl text-primary animate-bounce">potted_plant</span>
              <h3 className="font-heading text-lg font-bold text-primary uppercase tracking-wider mt-2">Unlock Soil Plot</h3>
              <p className="font-serif italic text-sm text-[#72796e] mt-1">
                Do you want to unlock this fertile soil plot for <span className="font-sans font-bold text-primary">3,000 Coins</span>?
              </p>
            </div>
            <div className="flex gap-3 justify-center pt-2">
              <button 
                onClick={() => setPlotToUnlock(null)}
                className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-on-surface-variant font-sans text-xs font-bold uppercase rounded-xl border border-outline-variant cursor-pointer transition-all active:scale-95"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (coins >= 3000) {
                    setCoins(c => c - 3000);
                    setPlots(prev => prev.map(p => p.id === plotToUnlock.id ? { ...p, type: 'empty', name: '', growth: 0 } : p));
                    triggerAlert("Plot unlocked successfully!");
                    setPlotToUnlock(null);
                  } else {
                    triggerAlert("Insufficient coins! Earn more by completing habit tasks.");
                    setPlotToUnlock(null);
                  }
                }}
                className="px-4 py-2 bg-primary hover:bg-[#23501e] text-white font-sans text-xs font-bold uppercase rounded-xl border-b-4 border-black/30 cursor-pointer transition-all active:scale-95"
              >
                Unlock for 3k C
              </button>
            </div>
          </div>
        </div>
      )}

      {showMutationSprayModal && mutationSprayPlot && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white p-6 rounded-2xl border-2 border-outline max-w-sm w-full shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 animate-gradient" />
            
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-2xl text-purple-600">science</span>
              <h4 className="font-serif text-lg text-primary font-black">
                Apply/Spray Mutation
              </h4>
            </div>
            
            <p className="font-sans text-xs text-[#72796e] leading-relaxed mb-4">
              Apply a special mutation spray to your growing <strong className="text-primary font-bold">{mutationSprayPlot.name}</strong> to multiply its harvest selling value!
            </p>

            <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
              {(Object.values(mutationSpraysInventory) as number[]).reduce((a, b) => a + b, 0) === 0 ? (
                <div className="text-center py-5 px-3 bg-[#72796e]/5 rounded-xl border border-dashed border-[#72796e]/25">
                  <span className="material-symbols-outlined text-3xl text-gray-400 mb-1">dashboard_customize</span>
                  <p className="font-sans text-[11px] text-[#72796e] italic">
                    No mutation sprays in your backpack. Unbox some from Mutation Crates in the Shop!
                  </p>
                </div>
              ) : (
                ((['golden', 'silver', 'diamond', 'frozen', 'rainbow'] as const).map(sprayType => {
                  const count = mutationSpraysInventory[sprayType] || 0;
                  if (count <= 0) return null;
                  
                  const label = sprayType.charAt(0).toUpperCase() + sprayType.slice(1);
                  const multiplier = sprayType === 'golden' ? 'x2' : sprayType === 'silver' ? 'x3' : sprayType === 'diamond' ? 'x4' : sprayType === 'frozen' ? 'x5' : 'x6';

                  let btnColor = "bg-yellow-50 text-yellow-800 border-yellow-250 hover:bg-yellow-100 active:bg-yellow-50";
                  if (sprayType === 'silver') btnColor = "bg-slate-50 text-slate-800 border-slate-255 hover:bg-slate-100 active:bg-slate-50";
                  else if (sprayType === 'diamond') btnColor = "bg-cyan-50 text-cyan-800 border-cyan-255 hover:bg-cyan-100 active:bg-cyan-50 animate-pulse";
                  else if (sprayType === 'frozen') btnColor = "bg-blue-50 text-blue-800 border-blue-255 hover:bg-blue-105 active:bg-blue-50";
                  else if (sprayType === 'rainbow') btnColor = "bg-pink-50 text-pink-850 border-pink-255 hover:bg-pink-105 active:bg-pink-50";

                  return (
                    <button
                      key={sprayType}
                      onClick={() => {
                        applyMutationSpray(mutationSprayPlot.id, sprayType);
                        if (selectedPlot && selectedPlot.id === mutationSprayPlot.id) {
                          setSelectedPlot(prev => prev ? { ...prev, mutation: sprayType } : null);
                        }
                        setShowMutationSprayModal(false);
                        setMutationSprayPlot(null);
                      }}
                      className={`w-full font-sans text-xs px-3.5 py-3 rounded-xl border font-bold uppercase transition-all flex items-center justify-between active:scale-97 cursor-pointer ${btnColor}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base">science</span>
                        <span>{label} ({count}x)</span>
                      </div>
                      <span className="font-extrabold text-[10px] bg-white/70 px-2.5 py-1 rounded shadow-sm shrink-0 border border-black/5">{multiplier} Price</span>
                    </button>
                  );
                }))
              )}
            </div>

            <div className="flex justify-end gap-2 mt-5 pt-3 border-t border-[#72796e]/10">
              <button 
                onClick={() => { setShowMutationSprayModal(false); setMutationSprayPlot(null); }}
                className="bg-neutral-100 hover:bg-neutral-200 text-on-surface-variant font-sans text-xs font-bold px-4 py-2 rounded-xl transition-all active:scale-95 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
