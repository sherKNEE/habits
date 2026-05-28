import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Friend } from '../types';
import { CROPS } from '../cropsData';
import { FarmerAvatar, getAvatarConfigForUser } from './FarmerAvatar';

export const SocialTab: React.FC = () => {
  const {
    coins,
    setCoins,
    friends,
    setFriends,
    harvestedInven,
    setHarvestedInven,
    trades,
    setTrades,
    setProfileOverlayTarget,
    triggerAlert,
    addCoins,
    addXp
  } = useApp();

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Market Stall appraisal states
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [appraisalValue, setAppraisalValue] = useState<number | null>(null);

  // Active micro minigame states
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  
  // Game 1: Study Sprinters Math Trivia
  const [game1State, setGame1State] = useState({ question: 'What is 14 x 6?', answer: '84', userInput: '', completed: false });
  
  // Game 2: Wellness Wiz Deep Breath Circles
  const [breathStage, setBreathStage] = useState<'idle' | 'inhale' | 'exhale'>('idle');
  const [breathCount, setBreathCount] = useState(0);

  // Game 3: Skill Sage Code Trivia
  const [game3Answer, setGame3Answer] = useState<string | null>(null);

  const handleSearchFriend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const newFriend: Friend = {
      id: `f_${Date.now()}`,
      username: searchQuery,
      avatar: 'https://cdn.phototourl.com/free/2026-05-12-91580f16-e2c3-4b8d-90e5-0c63030847b1.png',
      status: 'online'
    };
    setFriends([...friends, newFriend]);
    triggerAlert(`Sent a friend request to ${searchQuery}! Added to friends.`);
    setSearchQuery('');
  };

  const handleAcceptRequest = (id: string, username: string) => {
    setFriends(prev => prev.map(f => f.id === id ? { ...f, status: 'online' } : f));
    triggerAlert(`You are now friends with ${username}!`);
  };

  const handleDeclineRequest = (id: string) => {
    setFriends(prev => prev.filter(f => f.id !== id));
    triggerAlert("Request dismissed.");
  };

  const handleAppraise = () => {
    if (!selectedCrop) {
      triggerAlert("Please select a homegrown crop to appraise!");
      return;
    }

    const count = harvestedInven[selectedCrop] || 0;
    if (count <= 0) {
      triggerAlert(`You do not have any harvested ${selectedCrop} to sell!`);
      return;
    }

    const cropDef = CROPS.find(c => c.id === selectedCrop);
    const base = cropDef ? cropDef.sellBase : 70;

    // Small market fluctuate of +- 5% to keep appraisals interactive
    const multiplier = 0.95 + Math.random() * 0.1;
    const randomizedValue = Math.round(base * multiplier);
    
    setAppraisalValue(randomizedValue);
    triggerAlert(`Appraisal successful: Dynamic price set to ${randomizedValue} Coins!`);
  };

  const handleSellFruit = () => {
    if (!selectedCrop) {
      triggerAlert("Select a crop first!");
      return;
    }
    if (!appraisalValue) {
      triggerAlert("Please appraise the crop first to lock in values!");
      return;
    }

    setHarvestedInven(prev => ({
      ...prev,
      [selectedCrop]: Math.max(0, (prev[selectedCrop] || 0) - 1)
    }));

    addCoins(appraisalValue);
    addXp(40);
    setAppraisalValue(null);
    setSelectedCrop('');
    triggerAlert("Fruit sold to local merchants! Credits synced successfully.");
  };

  const startBreathSession = () => {
    setBreathStage('inhale');
    setBreathCount(0);
    triggerAlert("Inhale deeply as the circle grows...");
    
    setTimeout(() => {
      setBreathStage('exhale');
      setTimeout(() => {
        setBreathStage('inhale');
        setBreathCount(1);
        setTimeout(() => {
          setBreathStage('exhale');
          setTimeout(() => {
            setBreathStage('idle');
            setBreathCount(2);
            addCoins(75);
            addXp(30);
            setActiveGameId(null);
          }, 3000);
        }, 3000);
      }, 3000);
    }, 3000);
  };

  const handleCheckCodeAnswer = () => {
    if (game1State.userInput === game1State.answer) {
      addCoins(50);
      addXp(20);
      setGame1State(prev => ({ ...prev, completed: true }));
      setActiveGameId(null);
    } else {
      triggerAlert("Incorrect math answer! Try calculating again.");
    }
  };

  const handleCheckCodeSage = (option: string) => {
    setGame3Answer(option);
    if (option === 'const') {
      addCoins(60);
      addXp(25);
      setTimeout(() => {
        setActiveGameId(null);
        setGame3Answer(null);
      }, 1500);
    } else {
      triggerAlert("Wrong keyword syntax! Try again.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Search friends Section */}
      <div className="space-y-4">
        <section className="paper-texture p-4 rounded-xl border-2 border-outline shadow-sm organic-tilt-right relative">
          <div className="absolute -top-3 left-4 bg-[#5e604d] text-white px-3 py-0.5 border border-outline rounded-lg font-sans text-[11px] font-bold">
            FIND FRIENDS
          </div>
          <form onSubmit={handleSearchFriend} className="mt-2 flex items-center bg-white border-2 border-outline-variant rounded-full px-4 py-2 shadow-inner">
            <span className="material-symbols-outlined text-on-surface-variant mr-2">person_search</span>
            <input 
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by username..."
              className="bg-transparent border-none focus:ring-0 w-full font-serif text-sm focus:outline-none placeholder:text-on-surface-variant/50"
            />
            <button type="submit" className="bg-primary text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase">Add</button>
          </form>
        </section>

        {/* Pending Requests Section */}
        {friends.some(f => f.status === 'pending') && (
          <section className="space-y-3">
            <div className="flex items-center justify-between px-2">
              <h2 className="font-sans text-[11px] text-secondary uppercase tracking-widest font-extrabold">Pending Friend Requests</h2>
              <span className="bg-[#ba1a1a] text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">1</span>
            </div>
            
            {friends.filter(f => f.status === 'pending').map(f => (
              <div key={f.id} className="bg-white p-3 rounded-xl border-2 border-outline-variant shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {(() => {
                    const cfg = getAvatarConfigForUser(f.username);
                    return (
                      <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-primary bg-surface-container shrink-0 flex items-center justify-center">
                        <FarmerAvatar 
                          size="sm" 
                          customBg={cfg.bg} 
                          customOutfit={cfg.outfit} 
                          customHat={cfg.hat} 
                          customProp={cfg.prop} 
                          customGender={cfg.gender} 
                        />
                      </div>
                    );
                  })()}
                  <div>
                    <p className="font-sans text-xs font-bold text-on-surface">{f.username}</p>
                    <p className="text-[10px] uppercase text-on-surface-variant font-medium">Wants to join your guild</p>
                  </div>
                </div>
                
                <div className="flex gap-1.5 shrink-0">
                  <button 
                    onClick={() => handleAcceptRequest(f.id, f.username)}
                    className="w-8 h-8 rounded-lg bg-[#2d5a27] text-white flex items-center justify-center shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  </button>
                  <button 
                    onClick={() => handleDeclineRequest(f.id)}
                    className="w-8 h-8 rounded-lg bg-white border-2 border-outline-variant text-[#ba1a1a] flex items-center justify-center shadow-sm hover:bg-red-50 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm font-bold">close</span>
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* My Friends Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <h2 className="font-sans text-[11px] text-secondary uppercase tracking-widest font-extrabold">My Friends Directory</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {friends.filter(f => f.status !== 'pending').map(f => (
              <div 
                key={f.id} 
                onClick={() => setProfileOverlayTarget(f.username)}
                className="paper-texture p-3 rounded-xl border-2 border-outline-variant shadow-sm flex items-center justify-between hover:scale-[1.01] transition-transform cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    {(() => {
                      const cfg = getAvatarConfigForUser(f.username);
                      return (
                        <div className="w-11 h-11 rounded-xl overflow-hidden border-2 border-[#2d5a27] bg-surface-container flex items-center justify-center">
                          <FarmerAvatar 
                            size="sm" 
                            customBg={cfg.bg} 
                            customOutfit={cfg.outfit} 
                            customHat={cfg.hat} 
                            customProp={cfg.prop} 
                            customGender={cfg.gender} 
                          />
                        </div>
                      );
                    })()}
                    {f.status === 'online' && (
                      <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white z-10"></div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-bold text-on-surface">{f.username}</h4>
                    <p className={`text-[9px] font-bold uppercase tracking-tighter ${f.status === 'online' ? 'text-green-600' : 'text-neutral-400'}`}>
                      {f.status === 'online' ? '● Online' : ' ऑफलाइन / Offline'}
                    </p>
                  </div>
                </div>

                <div onClick={(e) => e.stopPropagation()}>
                  {f.status === 'online' ? (
                    <button 
                      onClick={() => {
                        addCoins(150);
                        triggerAlert(`🎮 Visited and played together with ${f.username}! Claimed joint reward of 150 Coins.`);
                      }}
                      className="flex items-center gap-1 bg-primary text-white px-3 py-1.5 rounded-lg font-sans text-[10px] uppercase font-bold border border-primary shadow-sm hover:brightness-105 transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-xs">sports_esports</span>
                      PLAY TOGETHER
                    </button>
                  ) : (
                    <button 
                      onClick={() => triggerAlert(`✉️ Offline mail letter sent to ${f.username}!`)}
                      className="flex items-center gap-1 bg-surface-container-high text-on-surface-variant px-3 py-1.5 rounded-lg font-sans text-[10px] font-bold border border-outline-variant shadow-sm hover:bg-neutral-100 transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-xs">mail</span>
                      SEND MAIL
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Market Stall Section */}
      <section className="paper-texture p-4 rounded-xl border-2 border-outline shadow-sm organic-tilt-left relative space-y-4">
        <div className="absolute -top-3 left-4 bg-[#263f2a] text-white px-2.5 py-0.5 border border-outline rounded-lg font-sans text-[11px] uppercase tracking-wider font-bold">
          Market Stall
        </div>
        
        <div className="pt-2 flex flex-col items-center gap-4">
          <h2 className="font-serif text-lg font-bold text-[#154212] w-full px-1">Sell Your Harvest</h2>
          
          {/* Select and sell drop down */}
          <div className="w-full space-y-2">
            <label className="block text-[11px] font-sans font-bold text-secondary uppercase">Choose Crops to Appraise</label>
            <select 
              value={selectedCrop}
              onChange={(e) => {
                setSelectedCrop(e.target.value);
                setAppraisalValue(null);
              }}
              className="w-full bg-white border-2 border-outline-variant rounded-xl p-2.5 font-serif text-sm focus:outline-none"
            >
              <option value="">-- Choose Harvest Backpack --</option>
              {CROPS.map(crop => {
                const count = harvestedInven[crop.id] || 0;
                return (
                  <option key={crop.id} value={crop.id}>
                    {crop.name} (Owned: {count})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Fruit Submission Box */}
          <div className="w-20 h-20 bg-surface-container-low border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center pixel-border-inset cursor-pointer hover:bg-neutral-50 transition-colors">
            {selectedCrop ? (
              <span className="material-symbols-outlined text-[#154212] text-4xl">inventory_2</span>
            ) : (
              <span className="material-symbols-outlined text-outline text-3xl">add_circle</span>
            )}
            <p className="font-sans text-[10px] font-bold text-on-surface-variant mt-1">
              {selectedCrop ? 'Fruit Loaded' : 'Select Crop'}
            </p>
          </div>

          <div className="bg-secondary-container/60 px-4 py-1.5 rounded-full border border-outline-variant">
            <p className="font-serif text-xs text-on-surface italic text-center">
              Estimated Value:{' '}
              <span className="font-bold text-[#154212] not-italic text-sm">
                {appraisalValue !== null ? `${appraisalValue} Coins` : '--'}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full">
            <button 
              onClick={handleAppraise}
              className="flex items-center justify-center gap-1.5 bg-white border-2 border-primary text-primary px-3 py-2.5 rounded-xl font-sans text-xs font-bold hover:bg-primary/5 active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">search_check</span>
              APPRAISE
            </button>
            
            <button 
              onClick={handleSellFruit}
              className="flex items-center justify-center gap-1.5 bg-primary text-white px-3 py-2.5 rounded-xl font-sans text-xs font-bold hover:bg-primary/95 active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">sell</span>
              SELL FRUIT
            </button>
          </div>
          
          <p className="font-sans text-[9px] text-[#72796e] text-center uppercase tracking-tighter">
            Earn Coins &amp; XP for your homegrown organic produce with town merchants.
          </p>
        </div>
      </section>

      {/* Trading Hub Segment */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="font-heading text-base font-bold text-primary">Trading Hub</h2>
          <span className="material-symbols-outlined text-primary font-bold">sync_alt</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {trades.map((t, idx) => (
            <div 
              key={t.id || idx} 
              className={`bg-[#e1e1c9]/40 p-4 rounded-xl border-2 border-outline flex items-center justify-between shadow-sm ${idx % 2 === 0 ? 'organic-tilt-left' : 'organic-tilt-right'}`}
            >
              <div className="flex items-center gap-3">
                {(() => {
                  const cfg = getAvatarConfigForUser(t.user);
                  return (
                    <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-primary bg-white shrink-0 shadow-sm flex items-center justify-center">
                      <FarmerAvatar 
                        size="sm" 
                        customBg={cfg.bg} 
                        customOutfit={cfg.outfit} 
                        customHat={cfg.hat} 
                        customProp={cfg.prop} 
                        customGender={cfg.gender} 
                      />
                    </div>
                  );
                })()}
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-sans text-xs font-bold text-[#154212] uppercase pr-2">{t.user}</p>
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  </div>
                  <p className="font-serif text-sm text-on-surface-variant">
                    {t.type === 'offer' ? (
                      <>Offers: <span className="font-bold text-primary">{t.item}</span></>
                    ) : (
                      <>Wants: <span className="font-bold text-[#ba1a1a]">{t.item}</span></>
                    )}
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  if (t.type === 'offer') {
                    triggerAlert(`Trade Details: Satisfy this trade by giving 10 Sunflowers to ${t.user}.`);
                  } else {
                    addCoins(800);
                    triggerAlert(`Accepted Trade: Exchanged ${t.item} with ${t.user}! Claimed +800 Coins.`);
                  }
                }}
                className="bg-primary text-white text-xs px-4 py-2 rounded-xl font-sans font-bold shadow-sm active:scale-95 cursor-pointer"
              >
                {t.type === 'offer' ? 'VIEW' : 'ACCEPT'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Minigame Pavilion */}
      <section className="space-y-4 pb-4">
        <h2 className="font-serif text-lg font-bold text-primary px-2">Minigame Pavilion</h2>
        
        {activeGameId === 'm1' && (
          <div className="bg-white p-4 border-2 border-outline rounded-xl space-y-3">
            <h3 className="font-serif text-base font-bold text-primary">Study Sprinters Round</h3>
            <p className="text-xs text-on-surface-variant">Solve high-speed academic math cards under pressure to win +50 Coins!</p>
            <div className="bg-neutral-50 p-4 text-center rounded-lg border">
              <span className="font-mono text-lg font-black text-[#154212]">{game1State.question}</span>
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Type correct answer..."
                value={game1State.userInput}
                onChange={e => setGame1State(prev => ({ ...prev, userInput: e.target.value }))}
                className="bg-[#eeeeee] border border-outline rounded-lg p-2 flex-grow text-xs font-sans focus:outline-none"
              />
              <button onClick={handleCheckCodeAnswer} className="bg-primary hover:bg-primary/95 text-white text-xs px-4 rounded-lg font-bold">SUBMIT</button>
            </div>
          </div>
        )}

        {activeGameId === 'm2' && (
          <div className="bg-white p-4 border-2 border-outline rounded-xl space-y-4 text-center">
            <h3 className="font-serif text-base font-bold text-[#154212]">Wellness Wiz Breathing Space</h3>
            <p className="text-xs text-on-surface-variant max-w-sm mx-auto">Click "Begin Breathing" and let the therapeutic bubble regulate your inhale-exhale rhythms to win +75 Coins!</p>
            
            <div className="flex flex-col items-center justify-center py-6">
              <div 
                className={`rounded-full flex items-center justify-center border-4 border-primary/40 text-primary transition-all duration-[3000ms] ${breathStage === 'inhale' ? 'w-24 h-24 bg-primary/20 scale-125 font-bold' : breathStage === 'exhale' ? 'w-16 h-16 bg-[#bcf0ae]/30 scale-95' : 'w-20 h-20 bg-neutral-100'}`}
              >
                <span className="text-[11px] font-sans font-bold capitalize">{breathStage}</span>
              </div>
              <p className="font-sans text-[10px] text-secondary font-bold uppercase mt-4 tracking-wider">Completed Cycles: {breathCount}/2</p>
            </div>

            {breathStage === 'idle' && (
              <button onClick={startBreathSession} className="bg-primary text-white text-xs px-6 py-2 rounded-xl font-bold uppercase">BEGIN BREATHING</button>
            )}
          </div>
        )}

        {activeGameId === 'm3' && (
          <div className="bg-white p-4 border-2 border-outline rounded-xl space-y-3">
            <h3 className="font-serif text-base font-bold text-primary">Skill Sage Trivia Quiz</h3>
            <p className="text-xs text-on-surface-variant">Which keyword declares an immutable variable layout in standard TypeScript?</p>
            
            <div className="grid grid-cols-2 gap-2 pt-2">
              {['var', 'let', 'const', 'define'].map(option => (
                <button 
                  key={option}
                  onClick={() => handleCheckCodeSage(option)}
                  className={`p-2 rounded-lg border text-xs font-sans font-bold ${game3Answer === option ? option === 'const' ? 'bg-[#bcf0ae] text-primary border-primary' : 'bg-red-100 text-red-600 border-red-500' : 'bg-neutral-50 hover:bg-neutral-100 text-secondary'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {!activeGameId && (
          <div className="space-y-3">
            {/* Study Sprinters Trigger Card */}
            <div 
              onClick={() => setActiveGameId('m1')}
              className="paper-texture p-4 border-2 border-outline rounded-xl flex items-center gap-4 hover:bg-neutral-50 hover:scale-101 active:scale-99 transition-all cursor-pointer shadow-sm"
            >
              <div className="w-12 h-12 bg-primary-container rounded-lg flex items-center justify-center pixel-border-inset overflow-hidden shrink-0">
                <img 
                  alt="Scythe" 
                  className="w-full h-full object-contain p-1" 
                  src="https://lh3.googleusercontent.com/aida/ADBb0ugsmGKGh9kAR4P09vl3YZwxzhDJZ05A5LaaOIKTfPsSY0uWiTbqopr11BWopRahX6bb64EJYUjSGCAgfSibmNvQyh4Tt-BBthWDw2Z_PinEkyp8fFF96yTa9E7ar_72uzaKWzMGg4YzIJQqDiJDcaf3qDVgLIO8knhwlZmMJJy_HKrErv8w-RnzIL34w7ke5OIA5qgupkCJmVyYj2cl3UMAxVK35BEvEIwdFXtAO8HQOPYSClFJ2bPlnA"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-serif text-base font-bold text-[#154212]">Study Sprinters</h3>
                <p className="text-[#42493e] font-sans text-[11px] font-semibold">Flashcards matching round for School tasks</p>
              </div>
              <div className="flex flex-col items-center shrink-0">
                <span className="material-symbols-outlined text-secondary font-bold">monetization_on</span>
                <span className="font-sans text-[11px] font-extrabold text-secondary">50</span>
              </div>
            </div>

            {/* Wellness Wiz Trigger Card */}
            <div 
              onClick={() => setActiveGameId('m2')}
              className="paper-texture p-4 border-2 border-outline rounded-xl flex items-center gap-4 hover:bg-neutral-50 hover:scale-101 active:scale-99 transition-all cursor-pointer organic-tilt-right shadow-sm"
            >
              <div className="w-12 h-12 bg-emerald-800/10 rounded-lg flex items-center justify-center pixel-border-inset overflow-hidden shrink-0">
                <img 
                  alt="Landscape" 
                  className="w-full h-full object-cover p-0.5" 
                  src="https://lh3.googleusercontent.com/aida/ADBb0uhszDs3J6KY30qXYchMl-CGgrSIdpwTwbdQtFuJ3c1Go195FDB7kqznw-cjSLwP-AlG-Q8wDmwQX1iyQWi8-hpB6aptKkUG0d1JYnI0xy5pJCuR71v38W1sHEmBLxBblAfaPf8PxefjrXwnxn8lLZOic_SPbKlBbNzNjqnznzdmapYw6RfHSbpA6op-f0DZ1vhy0d0JLxEsCVJJIkrT9ly-ntv5IoC1CJ1E8ygUTLPs-9Z4uLtyRHNMFfU"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-serif text-base font-bold text-[#154212]">Wellness Wiz</h3>
                <p className="text-[#42493e] font-sans text-[11px] font-semibold">Health/Mind breathing mini-game routine</p>
              </div>
              <div className="flex flex-col items-center shrink-0">
                <span className="material-symbols-outlined text-secondary font-bold">monetization_on</span>
                <span className="font-sans text-[11px] font-extrabold text-secondary">75</span>
              </div>
            </div>

            {/* Skill Sage Trigger Card */}
            <div 
              onClick={() => setActiveGameId('m3')}
              className="paper-texture p-4 border-2 border-outline rounded-xl flex items-center gap-4 hover:bg-neutral-50 hover:scale-101 active:scale-99 transition-all cursor-pointer shadow-sm"
            >
              <div className="w-12 h-12 bg-secondary-container rounded-lg flex items-center justify-center pixel-border-inset overflow-hidden shrink-0">
                <img 
                  alt="Outfits" 
                  className="w-full h-full object-cover p-0.5" 
                  src="https://lh3.googleusercontent.com/aida/ADBb0ujdQP6MAgmjK8hgH6aSOHT4BZIHX4Iij_p-Pzo2ikDy83vgWB7kbxRNAanC6B80uFfePmufqpKRfaPtLDUoMYMY4wm-crQU2c2T-4SZutluigzQ1k0alXn7hH3krPSNJIuQTbJ3zZXOs8CjhsI-RQh31YZ3yiB968QmftZ6D41h_jwFDgcq586EnkBA55I6Iza3tItq_RGve1En5_5WuLKtygooJn27WUa28jOelC3ykXkctgXr4NiCZQ"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-serif text-base font-bold text-[#154212]">Skill Sage</h3>
                <p className="text-[#42493e] font-sans text-[11px] font-semibold">Skills diagnostic coding practice deck</p>
              </div>
              <div className="flex flex-col items-center shrink-0">
                <span className="material-symbols-outlined text-secondary font-bold">monetization_on</span>
                <span className="font-sans text-[11px] font-extrabold text-secondary">60</span>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
