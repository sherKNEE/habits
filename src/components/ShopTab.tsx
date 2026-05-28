import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ShopItem } from '../types';
import { CROPS } from '../cropsData';
import { GEARS } from '../gearsData';
import { CLOTHING_DATABASE } from '../clothingData';
import { FarmerAvatar } from './FarmerAvatar';
import { PixelHat } from './PixelHat';
import { PixelPlant } from './PixelPlant';
import { PixelProp } from './PixelProp';

export const ShopTab: React.FC = () => {
  const {
    coins,
    setCoins,
    hasWateringCan,
    setHasWateringCan,
    hasFocusTimer,
    setHasFocusTimer,
    hasShovel,
    setHasShovel,
    inventorySeeds,
    setInventorySeeds,
    unlockedBgs,
    setUnlockedBgs,
    unlockedOutfits,
    setUnlockedOutfits,
    unlockedProps,
    setUnlockedProps,
    equippedBg,
    setEquippedBg,
    equippedOutfit,
    setEquippedOutfit,
    equippedProp,
    setEquippedProp,
    equippedHat,
    setEquippedHat,
    avatarGender,
    setAvatarGender,
    triggerAlert,
    streak,

    // Context states for Seed Shop
    rotatedCommonIds,
    rotatedRareIds,
    rotatedLegendaryIds,
    seedShopTimeToRotate,
    setSeedShopTimeToRotate,
    rotateSeedStock,

    // Context states for Gear Shop
    gearShopTimeToRefresh,
    setGearShopTimeToRefresh,
    gearShopStock,
    setGearShopStock,
    rollGearShopStock,

    // Backpack & Cooldown Ticket triggers
    cooldownTicketsCount,
    setCooldownTicketsCount,
    mutationSpraysInventory,
    setMutationSpraysInventory,

    useCooldownTicketOnSeeds,
    useCooldownTicketOnGear
  } = useApp();

  const [showCustomize, setShowCustomize] = useState(false);
  const [unboxingCrate, setUnboxingCrate] = useState<{ name: string; cost: number; type: 'bg' | 'clothing' | 'prop' | 'mutation_crate' } | null>(null);
  const [unboxedReward, setUnboxedReward] = useState<string | null>(null);
  const [isDuplicateReward, setIsDuplicateReward] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState<boolean>(false);

  // Transition animation when stock items rotate
  useEffect(() => {
    setIsRotating(true);
    const t = setTimeout(() => setIsRotating(false), 400);
    return () => clearTimeout(t);
  }, [rotatedCommonIds]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    
    const pad = (num: number) => num.toString().padStart(2, '0');
    
    if (h > 0) {
      return `${pad(h)}:${pad(m)}:${pad(s)}`;
    }
    return `${pad(m)}:${pad(s)}`;
  };

  const handleManualRefresh = () => {
    if (coins < 1000) {
      triggerAlert("You do not have enough coins to refresh stock (1000 C required)!");
      return;
    }
    setCoins(c => c - 1000);
    rotateSeedStock();
    setSeedShopTimeToRotate(3600);
    triggerAlert("🎰 Seed Emporium stock refreshed successfully!");
  };

  const handleOpenCrate = (crateType: 'bg' | 'clothing' | 'prop' | 'mutation_crate', cost: number, crateName: string) => {
    if (coins < cost) {
      triggerAlert("You do not have enough coins to purchase this crate!");
      return;
    }

    setCoins(c => c - cost);
    setUnboxingCrate({ name: crateName, cost, type: crateType });
    setUnboxedReward(null);
    setIsDuplicateReward(false);

    // Opening delay animation simulation
    setTimeout(() => {
      let reward = '';
      let isDup = false;

      if (crateType === 'bg') {
        const bgPool = CLOTHING_DATABASE.filter(c => c.category === 'backgrounds').map(c => c.id);
        reward = bgPool[Math.floor(Math.random() * bgPool.length)] || 'Celestial Canopy';

        if (unlockedBgs.includes(reward)) {
          isDup = true;
          setCoins(prev => prev + 500);
        } else {
          setUnlockedBgs(prev => [...prev, reward]);
        }
      } else if (crateType === 'clothing') {
        const outfitPool = CLOTHING_DATABASE.filter(c => c.category === 'outfits').map(c => c.id);
        reward = outfitPool[Math.floor(Math.random() * outfitPool.length)] || 'Celestial Cloak';

        if (unlockedOutfits.includes(reward)) {
          isDup = true;
          setCoins(prev => prev + 500);
        } else {
          setUnlockedOutfits(prev => [...prev, reward]);
        }
      } else if (crateType === 'prop') {
        const allProps = CLOTHING_DATABASE.filter(c => c.category === 'props');
        const HATS_LIST = [
          'bucket hat', 'classic cap', 'pirate hat', 'bowler hat', 'santa hat', 
          'flower wreath', 'witch hat', 'party hat', 'leprechaun hat', 'construction hardhat', 
          'royal crown', 'sprout clip', 'bear ears headband', 'chef hat', 'knitted beanie', 
          'chic glasses', 'elegant headband', 'conical straw hat', 'classic sun hat', 'floppy straw hat'
        ];

        const headAccessories = allProps.filter(p => HATS_LIST.includes(p.id.toLowerCase().trim()));
        const handHeldProps = allProps.filter(p => !HATS_LIST.includes(p.id.toLowerCase().trim()));

        // 50/50 chance to get either a head accessory or a hand held prop
        const isHeadAccessory = Math.random() < 0.5;
        let rewardItem = null;

        if (isHeadAccessory && headAccessories.length > 0) {
          rewardItem = headAccessories[Math.floor(Math.random() * headAccessories.length)];
        } else if (handHeldProps.length > 0) {
          rewardItem = handHeldProps[Math.floor(Math.random() * handHeldProps.length)];
        } else {
          rewardItem = allProps[Math.floor(Math.random() * allProps.length)];
        }

        reward = rewardItem ? rewardItem.id : 'Golden Shovel';

        if (unlockedProps.includes(reward)) {
          isDup = true;
          setCoins(prev => prev + 500);
        } else {
          setUnlockedProps(prev => [...prev, reward]);
        }
      } else if (crateType === 'mutation_crate') {
        const roll = Math.random() * 100;
        if (roll < 3.0) {
          reward = 'Rainbow Spray (x6 Coins)';
        } else if (roll < 10.0) {
          reward = 'Frozen Spray (x5 Coins)';
        } else if (roll < 25.0) {
          reward = 'Diamond Spray (x4 Coins)';
        } else if (roll < 55.0) {
          reward = 'Silver Spray (x3 Coins)';
        } else {
          reward = 'Golden Spray (x2 Coins)';
        }

        const cleanKey = reward.split(' ')[0].toLowerCase().trim(); // 'rainbow' | 'frozen' | 'diamond' | 'silver' | 'golden'
        setMutationSpraysInventory(prev => ({
          ...prev,
          [cleanKey]: (prev[cleanKey] || 0) + 1
        }));
      }

      setIsDuplicateReward(isDup);
      setUnboxedReward(reward);
      if (isDup) {
        triggerAlert(`🔄 Duplicate unboxed: "${reward}". Returned +500 Coins Refund!`);
      } else {
        triggerAlert(`🎉 Unboxed: "${reward}" added to wardrobe/backpack!`);
      }
    }, 2000);
  };

  const buyGearStock = (item: 'wateringCan' | 'mutationCrates' | 'cooldownTickets') => {
    const gearDef = GEARS.find(g => g.id === item);
    const cost = gearDef ? gearDef.cost : (item === 'wateringCan' ? 100 : item === 'mutationCrates' ? 2500 : 1000);
    const gearName = gearDef?.name || (item === 'wateringCan' ? 'Watering Can' : item === 'mutationCrates' ? 'Mutation Crate' : 'Cooldown Ticket');

    if (coins < cost) {
      triggerAlert("Insufficient coins!");
      return;
    }

    if (item === 'wateringCan') {
      if (gearShopStock.wateringCan <= 0) {
        triggerAlert("⚠️ Out of stock! Come back in the next shop rotation.");
        return;
      }
      setCoins(c => c - cost);
      setGearShopStock(prev => ({ ...prev, wateringCan: prev.wateringCan - 1 }));
      setHasWateringCan(true);
      triggerAlert(`Bought 1x ${gearName}! Your crops can now be nurtured.`);
    } else if (item === 'mutationCrates') {
      if (gearShopStock.mutationCrates <= 0) {
        triggerAlert("⚠️ Out of stock! Mutation crates are extremely rare.");
        return;
      }
      setGearShopStock(prev => ({ ...prev, mutationCrates: prev.mutationCrates - 1 }));
      handleOpenCrate('mutation_crate', cost, gearName);
    } else if (item === 'cooldownTickets') {
      if (gearShopStock.cooldownTickets <= 0) {
        triggerAlert("⚠️ Out of stock! Cooldown tickets are sold out.");
        return;
      }
      setCoins(c => c - cost);
      setGearShopStock(prev => ({ ...prev, cooldownTickets: prev.cooldownTickets - 1 }));
      setCooldownTicketsCount(prev => prev + 1);
      triggerAlert(`Bought 1x ${gearName} successfully!`);
    }
  };

  const buyFocusTimer = () => {
    const gearDef = GEARS.find(g => g.id === 'focusTimer');
    const cost = gearDef ? gearDef.cost : 8200;
    const gearName = gearDef?.name || 'Focus Timer';

    if (coins < cost) {
      triggerAlert("Insufficient coins!");
      return;
    }
    if (hasFocusTimer) {
      triggerAlert(`You already own the ${gearName}!`);
      return;
    }
    setCoins(c => c - cost);
    setHasFocusTimer(true);
    triggerAlert(`Bought ${gearName}! You will now earn 2x coins from habits!`);
  };

  const buyShovel = () => {
    const gearDef = GEARS.find(g => g.id === 'shovel');
    const cost = gearDef ? gearDef.cost : 500;
    const gearName = gearDef?.name || 'Gardening Shovel';

    if (coins < cost) {
      triggerAlert("Insufficient coins!");
      return;
    }
    if (hasShovel) {
      triggerAlert(`You already own the ${gearName}!`);
      return;
    }
    setCoins(c => c - cost);
    setHasShovel(true);
    triggerAlert(`Bought ${gearName} for ${cost.toLocaleString()} Coins! You can now remove plants and return seeds to inventory.`);
  };

  const buySeed = (seedId: string, cost: number, name: string) => {
    if (coins < cost) {
      triggerAlert("Insufficient coins!");
      return;
    }

    setCoins(c => c - cost);
    setInventorySeeds(prev => ({
      ...prev,
      [seedId]: (prev[seedId] || 0) + 1
    }));
    triggerAlert(`Bought 1x ${name} seed! Added to garden planting backpack.`);
  };

  return (
    <div className="space-y-8">
      {/* SECTION 1: MY AVATAR */}
      <section className="relative rounded-xl border border-outline-variant shadow-sm bg-secondary-fixed p-5 bg-[#e4e4cc] scrapbook-tilt-left">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="font-heading text-lg text-primary mb-1 font-bold">My Avatar</h2>
            <p className="font-sans text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Farmer of the Garden</p>
          </div>
          <button 
            onClick={() => setShowCustomize(!showCustomize)}
            className="bg-primary text-white font-sans text-xs px-4 py-2 rounded-full hover:opacity-90 transition-all active:scale-95 flex items-center gap-1.5 shadow-md font-bold"
          >
            <span className="material-symbols-outlined text-[14px]">edit</span>
            {showCustomize ? 'CLOSE' : 'CUSTOMIZE'}
          </button>
        </div>

        {showCustomize ? (
          /* Customize Interface */
          <div className="bg-white/60 p-4 rounded-xl border border-primary/20 space-y-4">
            <h3 className="font-sans text-xs font-bold text-primary uppercase tracking-wider border-b border-primary/10 pb-1.5">Wardrobe & Sanctuary Look</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Equipped states */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="block font-sans text-[10px] uppercase font-bold text-secondary">Farmer Avatar Model</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAvatarGender('male')}
                      className={`py-1.5 px-2 rounded-lg border font-sans text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                        avatarGender === 'male'
                          ? 'bg-primary text-white border-primary shadow-xs'
                          : 'bg-white text-secondary border-outline-variant hover:bg-black/5'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[13px]">man</span>
                      MALE
                    </button>
                    <button
                      type="button"
                      onClick={() => setAvatarGender('female')}
                      className={`py-1.5 px-2 rounded-lg border font-sans text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                        avatarGender === 'female'
                          ? 'bg-primary text-white border-primary shadow-xs'
                          : 'bg-white text-secondary border-outline-variant hover:bg-black/5'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[13px]">woman</span>
                      FEMALE
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block font-sans text-[10px] uppercase font-bold text-secondary">Sanctuary Background</label>
                  <select 
                    value={equippedBg} 
                    onChange={e => setEquippedBg(e.target.value)}
                    className="w-full bg-white border border-outline-variant rounded-lg p-2 font-sans text-xs shadow-xs"
                  >
                    {unlockedBgs.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-sans text-[10px] uppercase font-bold text-secondary">Farmer Attire</label>
                  <select 
                    value={equippedOutfit} 
                    onChange={e => setEquippedOutfit(e.target.value)}
                    className="w-full bg-white border border-outline-variant rounded-lg p-2 font-sans text-xs shadow-xs"
                  >
                    {unlockedOutfits.map(suit => <option key={suit} value={suit}>{suit}</option>)}
                  </select>
                </div>

                {/* New Wardrobe custom selections: Hats and Props obtained from Gacha crates */}
                <div className="space-y-1">
                  <label className="block font-sans text-[10px] uppercase font-bold text-secondary">Headwear Accessories (Hats)</label>
                  <select 
                    value={equippedHat || 'None'} 
                    onChange={e => {
                      const val = e.target.value;
                      setEquippedHat(val === 'None' ? '' : val);
                    }}
                    className="w-full bg-white border border-outline-variant rounded-lg p-2 font-sans text-xs shadow-xs text-amber-900 font-semibold"
                  >
                    <option value="None">None</option>
                    {unlockedProps.filter(p => [
                      'bucket hat', 'classic cap', 'pirate hat', 'bowler hat', 'santa hat', 
                      'flower wreath', 'witch hat', 'party hat', 'leprechaun hat', 'construction hardhat', 
                      'royal crown', 'sprout clip', 'bear ears headband', 'chef hat', 'knitted beanie', 
                      'chic glasses', 'elegant headband', 'conical straw hat', 'classic sun hat', 'floppy straw hat'
                    ].includes(p.toLowerCase().trim())).map(hat => (
                      <option key={hat} value={hat}>🤠 {hat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-sans text-[10px] uppercase font-bold text-secondary">Hand-held Accessories (Props)</label>
                  <select 
                    value={equippedProp || 'None'} 
                    onChange={e => {
                      const val = e.target.value;
                      setEquippedProp(val === 'None' ? '' : val);
                    }}
                    className="w-full bg-white border border-outline-variant rounded-lg p-2 font-sans text-xs shadow-xs text-emerald-950 font-semibold"
                  >
                    <option value="None">None</option>
                    {unlockedProps.filter(p => ![
                      'bucket hat', 'classic cap', 'pirate hat', 'bowler hat', 'santa hat', 
                      'flower wreath', 'witch hat', 'party hat', 'leprechaun hat', 'construction hardhat', 
                      'royal crown', 'sprout clip', 'bear ears headband', 'chef hat', 'knitted beanie', 
                      'chic glasses', 'elegant headband', 'conical straw hat', 'classic sun hat', 'floppy straw hat'
                    ].includes(p.toLowerCase().trim())).map(prop => (
                      <option key={prop} value={prop}>🛠️ {prop}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Character previews */}
              <div className="p-3 bg-white/40 border border-primary/10 rounded-xl flex flex-col items-center justify-center text-center">
                <div className="relative mb-2 shrink-0">
                  <FarmerAvatar size="lg" />
                </div>
                <p className="font-sans text-xs font-bold text-primary">Equipped Styles</p>
                <div className="text-[10px] text-on-surface-variant font-medium mt-1.5 space-y-0.5 leading-relaxed">
                  <p>🗺️ <b className="text-secondary">Bg:</b> {equippedBg}</p>
                  <p>👕 <b className="text-secondary">Suit:</b> {equippedOutfit}</p>
                  <p>👑 <b className="text-secondary">Hat:</b> {equippedHat || 'None'}</p>
                  <p>🪓 <b className="text-secondary">Prop:</b> {equippedProp || 'None'}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Profile Cards displaying avatar */
          <div className="flex flex-col md:flex-row items-center gap-6 mb-2">
            <div className="shrink-0 flex justify-center items-center relative">
              <FarmerAvatar size="lg" />
              <div className="absolute -bottom-2 bg-primary-container text-on-primary-container px-3 py-1 rounded-sm border-2 border-primary font-sans text-[11px] font-bold">
                LVL 42
              </div>
            </div>

            <div className="flex-1 w-full text-center md:text-left">
              <h3 className="font-sans text-[10px] text-on-surface-variant font-bold uppercase mb-2">
                AVATAR CRATES <span className="text-[9px] font-medium text-secondary italic block">(Equal rates across all collectibles in each category! No weighted bias)</span>
              </h3>
              
              <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                {/* Background Crate */}
                <div 
                  onClick={() => handleOpenCrate('bg', 1500, 'Background Crate')}
                  className="flex-shrink-0 w-24 bg-white p-2 rounded-xl border-2 border-primary hover:scale-105 transition-all cursor-pointer group shadow-sm text-center"
                >
                  <div className="h-14 w-full bg-primary-container/10 rounded-lg flex items-center justify-center mb-1.5 pressed-in">
                    <span className="material-symbols-outlined text-3xl text-yellow-800" style={{ fontVariationSettings: '"FILL" 1' }}>package_2</span>
                  </div>
                  <p className="font-sans text-[9px] text-[#154212] mb-1 font-bold truncate">Bg Crate</p>
                  <div className="flex items-center justify-center gap-0.5 bg-[#e1e1c9] rounded-full py-0.5">
                    <span className="material-symbols-outlined text-[10px] text-[#154212]">monetization_on</span>
                    <span className="font-sans text-[9px] font-bold">1,500</span>
                  </div>
                </div>

                {/* Clothing Crate */}
                <div 
                  onClick={() => handleOpenCrate('clothing', 2000, 'Clothing Crate')}
                  className="flex-shrink-0 w-24 bg-white p-2 rounded-xl border-2 border-primary hover:scale-105 transition-all cursor-pointer group shadow-sm text-center"
                >
                  <div className="h-14 w-full bg-primary-container/10 rounded-lg flex items-center justify-center mb-1.5 pressed-in">
                    <span className="material-symbols-outlined text-3xl text-emerald-800" style={{ fontVariationSettings: '"FILL" 1' }}>package_2</span>
                  </div>
                  <p className="font-sans text-[9px] text-[#154212] mb-1 font-bold truncate">Clothing Crate</p>
                  <div className="flex items-center justify-center gap-0.5 bg-[#e1e1c9] rounded-full py-0.5">
                    <span className="material-symbols-outlined text-[10px] text-[#154212]">monetization_on</span>
                    <span className="font-sans text-[9px] font-bold">2,000</span>
                  </div>
                </div>

                {/* Tool Crate */}
                <div 
                  onClick={() => handleOpenCrate('prop', 1800, 'Tool Crate')}
                  className="flex-shrink-0 w-24 bg-white p-2 rounded-xl border-2 border-primary hover:scale-105 transition-all cursor-pointer group shadow-sm text-center"
                >
                  <div className="h-14 w-full bg-primary-container/10 rounded-lg flex items-center justify-center mb-1.5 pressed-in">
                    <span className="material-symbols-outlined text-3xl text-amber-700" style={{ fontVariationSettings: '"FILL" 1' }}>package_2</span>
                  </div>
                  <p className="font-sans text-[9px] text-[#154212] mb-1 font-bold truncate">Prop Crate</p>
                  <div className="flex items-center justify-center gap-0.5 bg-[#e1e1c9] rounded-full py-0.5">
                    <span className="material-symbols-outlined text-[10px] text-[#154212]">monetization_on</span>
                    <span className="font-sans text-[9px] font-bold">1,800</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* GACHA DRAW MODAL */}
      {unboxingCrate && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-sm w-full rounded-2xl border-4 border-primary p-6 text-center space-y-4 shadow-2xl relative">
            <h3 className="font-heading text-lg text-primary uppercase tracking-wide">Unboxing {unboxingCrate.name}</h3>
            
            {!unboxedReward ? (
              <div className="py-8 space-y-4">
                <div className="w-20 h-20 bg-primary/10 border-2 border-dashed border-primary rounded-full flex items-center justify-center mx-auto animate-spin">
                  <span className="material-symbols-outlined text-4xl text-primary animate-bounce">autorenew</span>
                </div>
                <p className="font-serif italic text-sm text-[#72796e]">Rummaging through drawers... What will sprout?</p>
              </div>
            ) : (
              <div className="py-6 space-y-4">
                {/* Custom Gacha Unboxed Graphic Preview */}
                <div className="w-24 h-24 bg-amber-50 rounded-2xl border-2 border-primary/40 flex items-center justify-center mx-auto scale-110 shadow-md relative overflow-hidden">
                  {[
                    'bucket hat', 'classic cap', 'pirate hat', 'bowler hat', 'santa hat', 
                    'flower wreath', 'witch hat', 'party hat', 'leprechaun hat', 'construction hardhat', 
                    'royal crown', 'sprout clip', 'bear ears headband', 'chef hat', 'knitted beanie', 
                    'chic glasses', 'elegant headband', 'conical straw hat', 'classic sun hat', 'floppy straw hat'
                  ].includes(unboxedReward?.toLowerCase().trim() || '') ? (
                    <div className="w-16 h-16">
                      <PixelHat id={unboxedReward || ''} />
                    </div>
                  ) : CLOTHING_DATABASE.find(c => c.id === unboxedReward)?.category === 'props' ? (
                    <div className="w-16 h-16">
                      <PixelProp id={unboxedReward || ''} />
                    </div>
                  ) : unboxedReward?.toLowerCase().includes('spray') ? (
                    /* Mutation spray graphic decoration */
                    <div className="flex flex-col items-center justify-center relative space-y-1">
                      <span className="material-symbols-outlined text-4xl animate-pulse text-amber-500">colorize</span>
                      <span className="text-[8px] font-black tracking-widest uppercase px-1 rounded-sm bg-amber-100 text-amber-800 border border-amber-200">
                        SPRAY
                      </span>
                    </div>
                  ) : CLOTHING_DATABASE.find(c => c.id === unboxedReward)?.category === 'outfits' ? (
                    <div className="w-16 h-16 flex items-center justify-center overflow-hidden">
                      <FarmerAvatar size="lg" customOutfit={unboxedReward || ''} customProp="None" customHat="None" />
                    </div>
                  ) : CLOTHING_DATABASE.find(c => c.id === unboxedReward)?.category === 'backgrounds' ? (
                    <div className="w-full h-full">
                      <FarmerAvatar size="lg" customBg={unboxedReward || ''} customOutfit="None" customProp="None" customHat="None" />
                    </div>
                  ) : (
                    /* Default gift box fallback */
                    <span className="material-symbols-outlined text-4xl text-primary animate-bounce">redeem</span>
                  )}

                  {/* Cute sparkling indicators - removed raw text sparkles */}
                </div>

                <div>
                  {isDuplicateReward ? (
                    <span className="inline-block text-[9px] font-black tracking-widest bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full uppercase border border-amber-200">
                      🔄 Duplicate! +500 C refunded
                    </span>
                  ) : (
                    <span className="inline-block text-[9px] font-black tracking-widest bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full uppercase border border-emerald-200">
                      ✨ New Collectible!
                    </span>
                  )}
                  <h4 className="font-serif text-xl text-[#154212] font-black mt-1.5 leading-snug">{unboxedReward}</h4>
                </div>
                <p className="font-sans text-[11px] text-[#72796e]">
                  {isDuplicateReward 
                    ? "You already own this item. A 500 coin refund has been added directly back into your wallet!"
                    : "Equip this item under the customization panel to display your achievements."}
                </p>
                <button 
                  onClick={() => setUnboxingCrate(null)}
                  className="bg-primary text-white font-sans text-xs px-6 py-2 rounded-full font-bold uppercase transition-all shadow-md active:scale-95 cursor-pointer hover:opacity-90"
                >
                  DRESS UP NOW
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION 2: GEAR SHOP */}
      <section className="bg-amber-50/50 p-6 rounded-2xl border-4 border-[#72796e]/20 shadow-inner space-y-6 Scrapbook-tilt-right">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#72796e]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-3xl font-bold animate-bounce text-amber-600">storefront</span>
            <div>
              <h2 className="font-heading text-lg font-bold text-primary">Gear &amp; Consumables</h2>
              <p className="text-[10px] text-on-surface-variant uppercase font-sans tracking-wide">Refreshes every 30 minutes. Buy tools, mutation crates, and cooldown tickets!</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-black/5 p-2 rounded-xl border border-black/5 shrink-0 self-start sm:self-center">
            <div className="text-right">
              <span className="text-[9px] uppercase font-sans font-bold text-[#72796e] block leading-none">RESTOCK IN</span>
              <span className="font-mono text-sm font-extrabold text-amber-700">{formatTime(gearShopTimeToRefresh)}</span>
            </div>
            {cooldownTicketsCount > 0 && (
              <button 
                onClick={(e) => { e.stopPropagation(); useCooldownTicketOnGear(); }}
                className="flex items-center gap-1 bg-primary hover:opacity-90 text-white font-sans text-[10px] font-bold px-2 py-1.5 rounded-lg transition-all active:scale-95 shadow cursor-pointer uppercase"
                title="Use a cooldown ticket to refresh Gear Shop instantly!"
              >
                <span className="material-symbols-outlined text-xs">confirmation_number</span>
                Use Ticket (-1h)
              </button>
            )}
          </div>
        </div>

        {/* Display Backpack Info */}
        <div className="bg-[#f3f3e0] border border-[#d6d6b1] rounded-xl p-3 flex flex-wrap gap-4 items-center justify-between text-xs font-sans">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-700">backpack</span>
            <span className="font-bold text-primary">Consumables Inventory:</span>
          </div>
          <div className="flex gap-3 flex-wrap">
            <div className="flex items-center gap-1 bg-[#e4e4cc] py-1 px-2.5 rounded-full border border-[#aaaa80]">
              <span className="material-symbols-outlined text-sm text-[#505c45]">confirmation_number</span>
              <span className="font-bold">{cooldownTicketsCount}x Tickets</span>
            </div>
            {Object.entries(mutationSpraysInventory).map(([k, v]) => (
              (v as number) > 0 ? (
                <div key={k} className="flex items-center gap-1 bg-white py-1 px-2.5 rounded-full border border-gray-300 capitalize">
                  <span className={`w-2 h-2 rounded-full ${
                    k === 'golden' ? 'bg-yellow-400' :
                    k === 'silver' ? 'bg-slate-300' :
                    k === 'diamond' ? 'bg-cyan-300 shadow-[0_0_5px_rgba(103,232,249,0.5)]' :
                    k === 'frozen' ? 'bg-blue-300 animate-pulse' :
                    k === 'rainbow' ? 'bg-gradient-to-r from-red-400 via-green-400 to-blue-400' : 'bg-gray-400'
                  }`} />
                  <span className="font-bold">{v as number}x {k} Spray</span>
                </div>
              ) : null
            ))}
            {Object.values(mutationSpraysInventory).every(x => x === 0) && (
              <span className="text-xs text-[#72796e] italic">No active sprays owned yet. Buy Mutation Crates!</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {GEARS.map(gear => {
            const isStocked = gear.id === 'wateringCan' || gear.id === 'mutationCrates' || gear.id === 'cooldownTickets';
            const stockCount = gear.id === 'wateringCan' ? gearShopStock.wateringCan :
                               gear.id === 'mutationCrates' ? gearShopStock.mutationCrates :
                               gear.id === 'cooldownTickets' ? gearShopStock.cooldownTickets : 1;
            
            const isOwned = gear.id === 'wateringCan' ? hasWateringCan :
                            gear.id === 'focusTimer' ? hasFocusTimer :
                            gear.id === 'shovel' ? hasShovel : false;

            const isSoldOut = isStocked && stockCount <= 0;

            return (
              <div key={gear.id} className="bg-white p-4 border-2 border-outline-variant rounded-xl flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(114,121,110,0.15)] relative overflow-hidden hover:scale-102 transition-transform">
                {gear.badge && (
                  <div className={`absolute top-1.5 right-1.5 font-sans text-[8px] font-black px-1.5 py-0.5 rounded uppercase border tracking-wider ${gear.badgeClass || 'bg-amber-100 text-amber-800 border-amber-200'}`}>
                    {gear.badge}
                  </div>
                )}
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${gear.bgClass || 'bg-blue-100'} ${gear.textClass || 'text-blue-800'}`}>
                      <span className="material-symbols-outlined text-2xl">{gear.icon}</span>
                    </div>
                    <div className={`font-sans text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${gear.borderClass || 'border-blue-200'} ${gear.bgClass || 'bg-blue-100'} ${gear.textClass || 'text-blue-800'}`}>
                      {isStocked ? `Stock: ${stockCount}` : 'Limit: 1'}
                    </div>
                  </div>
                  <h3 className="font-serif text-sm font-black text-primary mb-1">{gear.name}</h3>
                  <p className="font-sans text-[11px] text-[#72796e] leading-snug mb-3">
                    {gear.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between border-t border-[#72796e]/10 pt-3 mt-1">
                  <div>
                    <span className="text-[9px] text-[#72796e] uppercase block leading-none">COST</span>
                    <span className="font-sans text-xs font-bold text-primary">{gear.cost.toLocaleString()} C</span>
                  </div>
                  
                  <button
                    disabled={isOwned || isSoldOut}
                    onClick={() => {
                      if (gear.id === 'wateringCan' || gear.id === 'mutationCrates' || gear.id === 'cooldownTickets') {
                        buyGearStock(gear.id);
                      } else if (gear.id === 'focusTimer') {
                        buyFocusTimer();
                      } else if (gear.id === 'shovel') {
                        buyShovel();
                      }
                    }}
                    className={`py-1.5 px-3 rounded-lg text-[10px] font-bold uppercase transition-all shadow active:scale-95 ${
                      isOwned ? 'bg-green-100 text-green-700 font-extrabold shadow-none hover:bg-green-100' :
                      isSoldOut ? 'bg-gray-100 text-gray-400 cursor-not-allowed border shadow-none' :
                      'bg-primary text-white hover:opacity-95'
                    }`}
                  >
                    {isOwned ? 'OWNED' : isSoldOut ? 'SOLD OUT' : 'BUY'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: SEED SHOP */}
      <section className="bg-primary-container text-white p-6 rounded-2xl border-4 border-outline shadow-inner space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-3xl font-bold animate-bounce text-yellow-300">potted_plant</span>
            <div>
              <h2 className="font-heading text-lg font-bold">Seed Emporium</h2>
              <p className="text-[10px] text-white/70 uppercase font-sans tracking-wide">Sunflower, Apples, Oranges, Bananas, &amp; Berries are static. Carrots and onward rotate in restocks.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-black/20 p-2 rounded-xl border border-white/5 shrink-0 self-start sm:self-center">
            <div className="text-right">
              <span className="text-[9px] uppercase font-sans font-bold text-white/60 block leading-none">STOCK ROTATES IN</span>
              <span className="font-mono text-sm font-extrabold text-amber-300">{formatTime(seedShopTimeToRotate)}</span>
            </div>
            {cooldownTicketsCount > 0 && (
              <button 
                onClick={(e) => { e.stopPropagation(); useCooldownTicketOnSeeds(); }}
                className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-black font-sans text-[10px] font-bold px-2 py-1.5 rounded-lg transition-all active:scale-95 shadow cursor-pointer uppercase"
                title="Use 1-Hour Cooldown reduction ticket"
              >
                <span className="material-symbols-outlined text-xs">confirmation_number</span>
                Use Ticket
              </button>
            )}
            <button 
              onClick={handleManualRefresh}
              className="flex items-center gap-1.5 bg-primary hover:bg-primary/95 text-white font-sans text-[11px] font-black px-3 py-2 rounded-lg transition-all active:scale-95 shadow cursor-pointer uppercase"
            >
              <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
              Refresh (1000 C)
            </button>
          </div>
        </div>

        {/* SPECIALTY ROTATING SEEDS (GOLD, PURPLE, AND TEAL CARDS) */}
        <div className="space-y-3">
          <h3 className="font-heading text-xs uppercase font-extrabold text-yellow-300 tracking-wider">🔥 Active Rotating Restock (Common, Rare, &amp; Legendary)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Common restock crops (Carrots and onwards) */}
            {CROPS.filter(c => rotatedCommonIds.includes(c.id)).map(crop => {
              const countInInventory = inventorySeeds[crop.id] || 0;
              return (
                <div 
                  key={crop.id} 
                  className={`relative bg-gradient-to-br from-teal-950/50 via-black/30 to-black/50 p-4 rounded-xl border-2 border-teal-500/60 shadow-[0_0_15px_rgba(20,184,166,0.15)] flex flex-col justify-between transition-all hover:scale-[1.02] ${isRotating ? 'opacity-30 blur-sm scale-95' : 'opacity-100'}`}
                >
                  <div className="absolute top-2 right-2 px-1.5 bg-teal-600 text-white rounded text-[8px] font-sans font-extrabold shadow-sm uppercase tracking-wider">
                    RESTOCK
                  </div>
                  <div>
                    <div className="flex gap-2.5">
                      <div className="w-9 h-9 flex items-center justify-center shrink-0">
                        <PixelPlant id={crop.id} className="w-8 h-8" />
                      </div>
                      <div className="truncate">
                        <h4 className="font-serif text-xs font-black text-teal-200 truncate">{crop.name}</h4>
                        <span className="text-[8px] uppercase font-sans font-bold text-white/50 block">NET +{crop.netProfit} C</span>
                      </div>
                    </div>
                    <p className="font-serif text-[10px] text-white/70 italic mt-2.5 leading-snug line-clamp-2">{crop.description}</p>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2">
                    <div>
                      <p className="text-[8px] text-white/50 uppercase leading-none">COST</p>
                      <p className="font-sans text-[11px] font-black text-teal-200">{crop.cost} C</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {countInInventory > 0 && (
                        <span className="text-[8px] uppercase font-mono font-bold text-teal-300 bg-teal-500/10 border border-teal-500/15 px-1 rounded">
                          {countInInventory}x
                        </span>
                      )}
                      <button 
                        onClick={() => buySeed(crop.id, crop.cost, crop.name)}
                        className="bg-primary hover:bg-primary/95 text-white p-1.5 rounded-lg active:scale-90 transition-all cursor-pointer flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined text-xs font-bold">add_shopping_cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Rare crops */}
            {CROPS.filter(c => rotatedRareIds.includes(c.id)).map(crop => {
              const countInInventory = inventorySeeds[crop.id] || 0;
              return (
                <div 
                  key={crop.id} 
                  className={`relative bg-gradient-to-br from-purple-900/50 via-black/30 to-black/50 p-4 rounded-xl border-2 border-purple-500/60 shadow-[0_0_15px_rgba(168,85,247,0.15)] flex flex-col justify-between transition-all hover:scale-[1.02] ${isRotating ? 'opacity-30 blur-sm scale-95' : 'opacity-100'}`}
                >
                  <div className="absolute top-2 right-2 px-1.5 bg-purple-600 text-white rounded text-[8px] font-sans font-extrabold shadow-sm uppercase tracking-wider">
                    RARE
                  </div>
                  <div>
                    <div className="flex gap-2.5">
                      <div className="w-9 h-9 flex items-center justify-center shrink-0">
                        <PixelPlant id={crop.id} className="w-8 h-8" />
                      </div>
                      <div className="truncate">
                        <h4 className="font-serif text-xs font-black text-purple-200 truncate">{crop.name}</h4>
                        <span className="text-[8px] uppercase font-sans font-bold text-white/50 block">NET +{crop.netProfit} C</span>
                      </div>
                    </div>
                    <p className="font-serif text-[10px] text-white/70 italic mt-2.5 leading-snug line-clamp-2">{crop.description}</p>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2">
                    <div>
                      <p className="text-[8px] text-white/50 uppercase leading-none">COST</p>
                      <p className="font-sans text-[11px] font-black text-purple-200">{crop.cost} C</p>
                    </div>
                    <div className="flex items-center gap-1 flex-wrap justify-end">
                      {countInInventory > 0 && (
                        <span className="text-[8px] uppercase font-mono font-bold text-purple-300 bg-purple-500/10 border border-purple-500/15 px-1 rounded">
                          {countInInventory}x
                        </span>
                      )}
                      <button 
                        onClick={() => buySeed(crop.id, crop.cost, crop.name)}
                        className="bg-primary hover:bg-primary/95 text-white p-1.5 rounded-lg active:scale-90 transition-all cursor-pointer flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined text-xs font-bold">add_shopping_cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Legendary crops */}
            {CROPS.filter(c => rotatedLegendaryIds.includes(c.id)).map(crop => {
              const countInInventory = inventorySeeds[crop.id] || 0;
              const isLocked = crop.unlockedAtStreak ? streak < crop.unlockedAtStreak : false;
              
              return (
                <div 
                  key={crop.id} 
                  className={`relative bg-gradient-to-br from-amber-950/60 via-black/30 to-black/50 p-4 rounded-xl border-2 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.25)] flex flex-col justify-between transition-all hover:scale-[1.02] ${isRotating ? 'opacity-30 blur-sm scale-95' : 'opacity-100'}`}
                >
                  <div className="absolute top-2 right-2 px-1.5 bg-amber-500 text-black rounded text-[8px] font-sans font-extrabold shadow-sm uppercase tracking-wider">
                    LEGENDARY
                  </div>
                  <div>
                    <div className="flex gap-2.5">
                      <div className="w-9 h-9 flex items-center justify-center shrink-0">
                        <PixelPlant id={crop.id} className="w-8 h-8" />
                      </div>
                      <div className="truncate">
                        <h4 className="font-serif text-xs font-black text-amber-200 truncate">{crop.name}</h4>
                        <span className="text-[8px] uppercase font-sans font-bold text-white/50 block">NET +{crop.netProfit} C</span>
                      </div>
                    </div>
                    <p className="font-serif text-[10px] text-white/70 italic mt-2.5 leading-snug line-clamp-2">{crop.description}</p>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2">
                    <div>
                      <p className="text-[8px] text-white/50 uppercase leading-none">COST</p>
                      <p className="font-sans text-[11px] font-black text-amber-200">{crop.cost} C</p>
                    </div>
                    
                    <div className="flex items-center gap-1 flex-wrap justify-end">
                      {isLocked ? (
                        <div className="flex items-center gap-1 text-red-400 bg-red-500/10 border border-red-500/20 px-1.5 py-0.5 rounded text-[7px] font-sans font-bold uppercase">
                          <span className="material-symbols-outlined text-[8px]">lock</span>
                          Str {crop.unlockedAtStreak}
                        </div>
                      ) : (
                        <>
                          {countInInventory > 0 && (
                            <span className="text-[8px] uppercase font-mono font-bold text-amber-300 bg-amber-500/10 border border-amber-500/15 px-1 rounded">
                              {countInInventory}x
                            </span>
                          )}
                          <button 
                            onClick={() => buySeed(crop.id, crop.cost, crop.name)}
                            className="bg-primary hover:bg-primary/95 text-white p-1.5 rounded-lg active:scale-90 transition-all cursor-pointer flex items-center justify-center animate-pulse"
                          >
                            <span className="material-symbols-outlined text-xs font-bold">add_shopping_cart</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* COMMON SEEDS SUB-GRID (COMPACT CARDS) */}
        <div className="space-y-3 pt-2">
          <h3 className="font-heading text-xs uppercase font-extrabold text-emerald-300 tracking-wider">🌿 Basic Crop Seeds (Always Available)</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {CROPS.filter(c => ['sunflower', 'apple', 'orange', 'banana', 'berry'].includes(c.id)).map(crop => {
              const countInInventory = inventorySeeds[crop.id] || 0;
              return (
                <div 
                  key={crop.id} 
                  className="bg-black/15 p-3 rounded-xl hover:bg-black/25 hover:border-white/10 border border-white/5 flex flex-col justify-between transition-colors shadow-sm"
                >
                  <div className="flex gap-2">
                    <div className="w-9 h-9 flex items-center justify-center shrink-0">
                      <PixelPlant id={crop.id} className="w-8 h-8" />
                    </div>
                    <div className="truncate flex-1">
                      <h4 className="font-serif text-[13px] font-bold text-white leading-tight truncate">{crop.name}</h4>
                      <p className="text-[8px] font-sans font-bold text-white/50 uppercase truncate">
                        {crop.difficulty} • Net +{crop.netProfit} C
                      </p>
                    </div>
                  </div>

                  <p className="font-serif text-[10px] text-white/60 italic leading-tight my-2 line-clamp-2">{crop.description}</p>
                  
                  <div className="flex items-center justify-between pt-1 border-t border-white/5">
                    <div>
                      <span className="text-[8px] text-white/40 block leading-none uppercase">COST</span>
                      <span className="font-sans text-[11px] font-bold text-white">{crop.cost} C</span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {countInInventory > 0 && (
                        <span className="text-[8px] uppercase font-mono font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/15 px-1 py-0.5 rounded">
                          {countInInventory} x
                        </span>
                      )}
                      <button 
                        onClick={() => buySeed(crop.id, crop.cost, crop.name)}
                        className="bg-primary hover:bg-primary/95 text-white p-1.5 rounded-lg active:scale-90 transition-all cursor-pointer flex items-center justify-center animate-bounce-slow"
                      >
                        <span className="material-symbols-outlined text-xs">add_shopping_cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
