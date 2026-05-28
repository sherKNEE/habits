import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PlantPlot, PlantType } from '../types';
import { CROPS } from '../cropsData';
import { FarmerAvatar } from './FarmerAvatar';
import { PixelPlant } from './PixelPlant';

export const GardenTab: React.FC = () => {
  const {
    vitality, setVitality,
    level, xp,
    coins, setCoins,
    streak, setStreak,
    plots, setPlots,
    gardenMode, setGardenMode,
    inventorySeeds, setInventorySeeds,
    harvestedInven, setHarvestedInven,
    hasWateringCan,
    hasShovel,
    badges, setBadges,
    sunflowersHarvestedCount, setSunflowersHarvestedCount,
    claimedQuest, setClaimedQuest,
    triggerAlert,
    addCoins,
    addXp,
    mutationSpraysInventory,
    applyMutationSpray
  } = useApp();

  const [selectedPlot, setSelectedPlot] = useState<PlantPlot | null>(null);
  const [showPlantModal, setShowPlantModal] = useState(false);
  const [plotToUnlock, setPlotToUnlock] = useState<PlantPlot | null>(null);
  const [showMutationSprayModal, setShowMutationSprayModal] = useState(false);
  const [mutationSprayPlot, setMutationSprayPlot] = useState<PlantPlot | null>(null);

  // Growth speed coefficient
  const growthMultiplier = hasWateringCan ? 1.25 : 1.0;

  const getCropRequiredWaterings = (type: string) => {
    const cropDef = CROPS.find(c => c.id === type);
    const category = cropDef?.category || 'Common';
    if (category === 'Rare') return 10;
    if (category === 'Legendary') return 20;
    return 5;
  };

  const handlePlotClick = (plot: PlantPlot) => {
    if (plot.type === 'locked') {
      // Prompt to purchase row unlock with custom HTML modal
      setPlotToUnlock(plot);
      return;
    }

    // Direct Quick tool usage
    if (gardenMode === 'water' && plot.type !== 'empty') {
      if (!hasWateringCan) {
        triggerAlert("⚠️ You need to buy a Watering Can for 100 Coins from the Gear Shop first!");
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
        
        const nextW = Math.min(required, (plot.wateredCount || 0) + 1);
        triggerAlert(`Watered ${plot.name}! (Progress: ${nextW}/${required} waterings)`);
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
    setVitality(v => Math.min(100, v + 5));

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
      if (!badges.includes('Sunbeam Badge')) {
        setBadges([...badges, 'Sunbeam Badge']);
      }
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
            <span className="font-sans text-label-sm text-on-secondary-container font-bold">{vitality}/100</span>
          </div>
          <div className="h-4 bg-surface-container-high rounded-full overflow-hidden border border-outline/30 shadow-inner">
            <div 
              className="h-full bg-primary transition-all duration-500 rounded-full" 
              style={{ width: `${vitality}%` }}
            ></div>
          </div>
        </div>

        {/* XP Progress Card */}
        <div className="bg-secondary-container p-4 rounded-xl border-2 border-outline pixel-border-inset">
          <div className="flex justify-between items-center mb-1">
            <span className="font-sans text-label-sm text-on-secondary-container uppercase">XP Level {level}</span>
            <span className="font-sans text-label-sm text-on-secondary-container font-bold">{xp}/1000</span>
          </div>
          <div className="h-4 bg-surface-container-high rounded-full overflow-hidden border border-outline/30 shadow-inner">
            <div 
              className="h-full bg-[#3b6934] transition-all duration-500 rounded-full" 
              style={{ width: `${xp / 10}%` }}
            ></div>
          </div>
        </div>
      </section>

      {/* Interactive Garden Field */}
      <section className="relative bg-[#cceacd] p-4 overflow-hidden min-h-[460px] flex flex-col border-4 border-primary/20 shadow-inner rounded-xl paper-texture">
        {/* Gardener Header inside Garden box */}
        <div className="flex items-start justify-between mb-4 relative z-20">
          <div className="flex gap-3 items-center bg-white/70 backdrop-blur-md p-2 rounded-2xl border border-primary/10 shadow-sm">
            <div className="shrink-0">
              <FarmerAvatar size="sm" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-sans text-[9px] text-primary uppercase tracking-tighter">Master Gardener</h3>
              <div className="font-serif text-sm font-bold text-on-surface">Level 67</div>
              <div className="flex items-center gap-1 text-primary">
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
              className={`p-1.5 rounded-xl border flex flex-col items-center transition-all cursor-pointer ${gardenMode === 'water' ? 'bg-primary text-white border-primary' : 'bg-white/55 border-primary/15 text-primary hover:bg-white'}`}
            >
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

        {/* 3x3 Plot Grid */}
        <div className="flex-1 grid grid-cols-3 gap-4 relative z-10 px-1 pb-2">
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
      </section>

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
                  if (!hasWateringCan) {
                    triggerAlert("⚠️ You need to buy a Watering Can for 100 Coins from the Gear Shop first!");
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
                  triggerAlert("Watered successfully!");
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
        <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4">
          <div className="bg-[#cceacd] rounded-xl border-2 border-outline pixel-border-inset p-4 w-full">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#ba1a1a]" style={{ fontVariationSettings: '"FILL" 1' }}>local_fire_department</span>
                <h3 className="font-sans text-sm text-primary font-bold uppercase tracking-tight">{streak} Day Streak</h3>
              </div>
              <span className="font-sans text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Blooming strong</span>
            </div>
            <div className="relative h-3 bg-surface-container-high rounded-full overflow-hidden border border-outline/30 mb-3 shadow-inner">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: '85%' }}></div>
            </div>
            <div className="bg-white/40 backdrop-blur-sm rounded-lg p-2 border border-primary/10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">redeem</span>
                <p className="font-serif text-xs text-primary leading-tight font-medium">
                  +5% Vitality growth • <span className="text-on-surface-variant font-sans text-[11px] font-semibold opacity-80">Next: Pumpkin patch seeds</span>
                </p>
              </div>
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
