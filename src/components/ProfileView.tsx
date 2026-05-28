import React from 'react';
import { useApp } from '../context/AppContext';
import { FarmerAvatar, getAvatarConfigForUser } from './FarmerAvatar';
import { CLOTHING_DATABASE } from '../clothingData';
import { FRIENDS_DATABASE } from '../friendsData';
import { BRANDING } from '../brandingData';
import { PixelHat } from './PixelHat';
import { PixelPlant } from './PixelPlant';
import { PixelProp } from './PixelProp';

export const ProfileView: React.FC = () => {
  const {
    username,
    bio, setBio,
    badges,
    plots,
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
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-secondary-container/75 border border-outline-variant/60 -rotate-2 shadow-sm"></div>
                
                <h3 className="font-sans text-xs text-primary mb-4 uppercase tracking-widest text-center font-bold">Hall of Badges</h3>
                
                <div className="flex flex-wrap justify-center items-center gap-4 py-1">
                  {currentBadges.includes('100 Day Streak') && (
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 bg-[#cceacd] border-2 border-primary flex items-center justify-center rounded-full shadow-inner mb-1.5 hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-[#2d5a27] text-2xl fill" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                      </div>
                      <span className="font-sans text-[8px] text-center font-bold uppercase tracking-tight text-secondary leading-tight">100 Day<br />Streak</span>
                    </div>
                  )}

                  {currentBadges.includes('Master Harvester') && (
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 bg-secondary-container border-2 border-secondary flex items-center justify-center rounded-full shadow-inner mb-1.5 hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-secondary text-2xl">agriculture</span>
                      </div>
                      <span className="font-sans text-[8px] text-center font-bold uppercase tracking-tight text-secondary leading-tight">Master<br />Harvester</span>
                    </div>
                  )}

                  {currentBadges.includes('Seed Collector') && (
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 bg-[#bcf0ae] border-2 border-primary flex items-center justify-center rounded-full shadow-inner mb-1.5 hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-primary text-2xl fill" style={{ fontVariationSettings: '"FILL" 1' }}>potted_plant</span>
                      </div>
                      <span className="font-sans text-[8px] text-center font-bold uppercase tracking-tight text-secondary leading-tight">Seed<br />Collector</span>
                    </div>
                  )}

                  {currentBadges.includes('Sunbeam Badge') && (
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 bg-[#fcf4a3] border-2 border-yellow-600 flex items-center justify-center rounded-full shadow-inner mb-1.5 hover:scale-105 transition-all animate-pulse">
                        <span className="material-symbols-outlined text-yellow-700 text-2xl fill" style={{ fontVariationSettings: '"FILL" 1' }}>local_florist</span>
                      </div>
                      <span className="font-sans text-[8px] text-center font-bold uppercase tracking-tight text-[#856404] leading-tight">Sunbeam<br />Hero</span>
                    </div>
                  )}
                </div>
              </section>

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
              <section className="bg-primary-container p-4 rounded-xl border-2 border-primary overflow-hidden text-white shadow-md">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-sans text-[11px] text-[#e1e1c9] uppercase tracking-widest font-bold">
                    {isSelf ? "My Garden Plot" : `${currentName}'s Plot Snapshot`}
                  </h3>
                  <span className="font-sans text-[9px] text-[#bcf0ae] bg-black/35 px-2.5 py-0.5 rounded font-bold uppercase">Plot Snapshot</span>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-transparent p-0 overflow-visible">
                  {plots.map((plot) => (
                    <div 
                      key={`mini_${plot.id}`} 
                      className="soil-row h-14 rounded-lg relative flex items-center justify-center border border-black/10"
                    >
                      {plot.type === 'locked' ? (
                        <span className="material-symbols-outlined text-white/30 text-sm">lock</span>
                      ) : plot.type === 'empty' ? (
                        <span className="material-symbols-outlined text-white/20 text-xs">add</span>
                      ) : (
                        <div className="absolute -top-1 text-center flex flex-col items-center">
                          <PixelPlant id={plot.type} className="w-7 h-7" />
                          
                          <span className="bg-primary/95 text-white text-[5px] font-sans px-1 rounded uppercase tracking-tighter">
                            {plot.name.slice(0, 4)}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
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
    </div>
  );
};
