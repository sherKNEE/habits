import React, { createContext, useContext, useState, useEffect } from 'react';
import { PlantPlot, HabitTask, ShopItem, Friend, TradeOffer, Minigame } from '../types';
import { INITIAL_PLOTS, INITIAL_TASKS, SHOP_ITEMS, INITIAL_FRIENDS } from '../initialState';
import { CROPS } from '../cropsData';
import { FRIENDS_DATABASE } from '../friendsData';
import { TRADES_DATABASE } from '../tradesData';

interface AppContextType {
  vitality: number;
  setVitality: React.Dispatch<React.SetStateAction<number>>;
  level: number;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  xp: number;
  setXp: React.Dispatch<React.SetStateAction<number>>;
  coins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
  streak: number;
  setStreak: React.Dispatch<React.SetStateAction<number>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  bio: string;
  setBio: React.Dispatch<React.SetStateAction<string>>;
  musicOn: boolean;
  setMusicOn: React.Dispatch<React.SetStateAction<boolean>>;
  sfxOn: boolean;
  setSfxOn: React.Dispatch<React.SetStateAction<boolean>>;
  vibrationOn: boolean;
  setVibrationOn: React.Dispatch<React.SetStateAction<boolean>>;
  friendRequestsOn: boolean;
  setFriendRequestsOn: React.Dispatch<React.SetStateAction<boolean>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  plots: PlantPlot[];
  setPlots: React.Dispatch<React.SetStateAction<PlantPlot[]>>;
  tasks: HabitTask[];
  setTasks: React.Dispatch<React.SetStateAction<HabitTask[]>>;
  friends: Friend[];
  setFriends: React.Dispatch<React.SetStateAction<Friend[]>>;
  trades: TradeOffer[];
  setTrades: React.Dispatch<React.SetStateAction<TradeOffer[]>>;
  
  // Custom states
  inventorySeeds: Record<string, number>;
  setInventorySeeds: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  harvestedInven: Record<string, number>;
  setHarvestedInven: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  
  // Custom purchases
  hasWateringCan: boolean;
  setHasWateringCan: React.Dispatch<React.SetStateAction<boolean>>;
  hasFocusTimer: boolean;
  setHasFocusTimer: React.Dispatch<React.SetStateAction<boolean>>;
  hasShovel: boolean;
  setHasShovel: React.Dispatch<React.SetStateAction<boolean>>;
  
  // Avatar states
  unlockedBgs: string[];
  setUnlockedBgs: React.Dispatch<React.SetStateAction<string[]>>;
  unlockedOutfits: string[];
  setUnlockedOutfits: React.Dispatch<React.SetStateAction<string[]>>;
  unlockedProps: string[];
  setUnlockedProps: React.Dispatch<React.SetStateAction<string[]>>;
  equippedBg: string;
  setEquippedBg: React.Dispatch<React.SetStateAction<string>>;
  equippedOutfit: string;
  setEquippedOutfit: React.Dispatch<React.SetStateAction<string>>;
  equippedProp: string;
  setEquippedProp: React.Dispatch<React.SetStateAction<string>>;
  equippedHat: string;
  setEquippedHat: React.Dispatch<React.SetStateAction<string>>;
  avatarGender: 'male' | 'female';
  setAvatarGender: React.Dispatch<React.SetStateAction<'male' | 'female'>>;
  
  // Achievements/Badges
  badges: string[];
  setBadges: React.Dispatch<React.SetStateAction<string[]>>;
  
  // Active selected interaction tools in Garden
  gardenMode: 'view' | 'water' | 'fertilize' | 'shovel';
  setGardenMode: React.Dispatch<React.SetStateAction<'view' | 'water' | 'fertilize' | 'shovel'>>;
  
  // Simple alerts / global logs
  alertMsg: string;
  triggerAlert: (msg: string) => void;
  
  // Quest
  sunflowersHarvestedCount: number;
  setSunflowersHarvestedCount: React.Dispatch<React.SetStateAction<number>>;
  claimedQuest: boolean;
  setClaimedQuest: React.Dispatch<React.SetStateAction<boolean>>;
  
  // Profile overlay target username
  profileOverlayTarget: string | null;
  setProfileOverlayTarget: React.Dispatch<React.SetStateAction<string | null>>;
  
  // Stats
  likesCount: number;
  setLikesCount: React.Dispatch<React.SetStateAction<number>>;
  seedsBoughtCount: number;
  setSeedsBoughtCount: React.Dispatch<React.SetStateAction<number>>;
  minigamesDoneCount: number;
  setMinigamesDoneCount: React.Dispatch<React.SetStateAction<number>>;
  
  addCoins: (amount: number) => void;
  addXp: (amount: number) => void;

  // Seed Shop states (Context-bound for persistence)
  rotatedCommonIds: string[];
  setRotatedCommonIds: React.Dispatch<React.SetStateAction<string[]>>;
  rotatedRareIds: string[];
  setRotatedRareIds: React.Dispatch<React.SetStateAction<string[]>>;
  rotatedLegendaryIds: string[];
  setRotatedLegendaryIds: React.Dispatch<React.SetStateAction<string[]>>;
  seedShopTimeToRotate: number;
  setSeedShopTimeToRotate: React.Dispatch<React.SetStateAction<number>>;
  rotateSeedStock: () => void;

  // Gear Shop Refresh States
  gearShopTimeToRefresh: number;
  setGearShopTimeToRefresh: React.Dispatch<React.SetStateAction<number>>;
  gearShopStock: {
    wateringCan: number;
    mutationCrates: number;
    cooldownTickets: number;
  };
  setGearShopStock: React.Dispatch<React.SetStateAction<{
    wateringCan: number;
    mutationCrates: number;
    cooldownTickets: number;
  }>>;
  rollGearShopStock: () => {
    wateringCan: number;
    mutationCrates: number;
    cooldownTickets: number;
  };

  // Cooldown Tickets & Mutation Sprays
  cooldownTicketsCount: number;
  setCooldownTicketsCount: React.Dispatch<React.SetStateAction<number>>;
  mutationSpraysInventory: Record<string, number>;
  setMutationSpraysInventory: React.Dispatch<React.SetStateAction<Record<string, number>>>;

  // Actions
  useCooldownTicketOnSeeds: () => boolean;
  useCooldownTicketOnGear: () => boolean;
  useCooldownTicketOnTask: (taskId: string) => boolean;
  applyMutationSpray: (plotId: number, sprayType: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const getInitialSeeds = () => {
  const seeds: Record<string, number> = {};
  CROPS.forEach(c => {
    seeds[c.id] = 0;
  });
  seeds['sunflower'] = 1;
  return seeds;
};

const getInitialHarvest = () => {
  const harvest: Record<string, number> = {};
  CROPS.forEach(c => {
    harvest[c.id] = 0;
  });
  harvest['corn'] = 2;
  harvest['berry'] = 1;
  harvest['apple'] = 1;
  return harvest;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vitality, setVitality] = useState(85);
  const [level, setLevel] = useState(12);
  const [xp, setXp] = useState(420);
  const [coins, setCoins] = useState(67000);
  const [streak, setStreak] = useState(12);
  const [username, setUsername] = useState('sherKNEE');
  const [email, setEmail] = useState('sherknee_mo@gmail.com');
  const [bio, setBio] = useState('Hi! Im Sherny and I love playing sports, eating good food, and making new friends!');
  const [musicOn, setMusicOn] = useState(true);
  const [sfxOn, setSfxOn] = useState(false);
  const [vibrationOn, setVibrationOn] = useState(true);
  const [friendRequestsOn, setFriendRequestsOn] = useState(true);
  const [language, setLanguage] = useState('English');
  const [plots, setPlots] = useState<PlantPlot[]>(INITIAL_PLOTS);
  const [tasks, setTasks] = useState<HabitTask[]>(INITIAL_TASKS);
  const [friends, setFriends] = useState<Friend[]>(() => {
    return FRIENDS_DATABASE.map(f => ({
      id: f.id,
      username: f.username,
      avatar: f.avatarUrl,
      status: f.status
    }));
  });
  const [trades, setTrades] = useState<TradeOffer[]>(TRADES_DATABASE);
  
  const [inventorySeeds, setInventorySeeds] = useState<Record<string, number>>(() => getInitialSeeds());
  const [harvestedInven, setHarvestedInven] = useState<Record<string, number>>(() => getInitialHarvest());
  
  const [hasWateringCan, setHasWateringCan] = useState(false);
  const [hasFocusTimer, setHasFocusTimer] = useState(false);
  const [hasShovel, setHasShovel] = useState(false);
  
  const [unlockedBgs, setUnlockedBgs] = useState(['Default Greenhouse']);
  const [unlockedOutfits, setUnlockedOutfits] = useState(['Standard Overalls']);
  const [unlockedProps, setUnlockedProps] = useState(['Vintage Rake']);
  
  const [equippedBg, setEquippedBg] = useState('Default Greenhouse');
  const [equippedOutfit, setEquippedOutfit] = useState('Standard Overalls');
  const [equippedProp, setEquippedProp] = useState('Vintage Rake');
  const [equippedHat, setEquippedHat] = useState('');
  const [avatarGender, setAvatarGender] = useState<'male' | 'female'>('male');
  
  const [badges, setBadges] = useState(['100 Day Streak', 'Master Harvester']);
  const [gardenMode, setGardenMode] = useState<'view' | 'water' | 'fertilize' | 'shovel'>('view');
  const [alertMsg, setAlertMsg] = useState('');
  
  const [sunflowersHarvestedCount, setSunflowersHarvestedCount] = useState(2);
  const [claimedQuest, setClaimedQuest] = useState(false);
  
  const [profileOverlayTarget, setProfileOverlayTarget] = useState<string | null>(null);

  // New persistent states for seed shop
  const [rotatedCommonIds, setRotatedCommonIds] = useState<string[]>([]);
  const [rotatedRareIds, setRotatedRareIds] = useState<string[]>([]);
  const [rotatedLegendaryIds, setRotatedLegendaryIds] = useState<string[]>([]);
  const [seedShopTimeToRotate, setSeedShopTimeToRotate] = useState<number>(3600);

  // Gear Shop Refresh Features
  const [gearShopTimeToRefresh, setGearShopTimeToRefresh] = useState<number>(1800); // 30 mins
  const [gearShopStock, setGearShopStock] = useState<{
    wateringCan: number;
    mutationCrates: number;
    cooldownTickets: number;
  }>({
    wateringCan: 3,
    mutationCrates: 0,
    cooldownTickets: 1,
  });

  // Cooldown reduces and Mutation sprays backpack
  const [cooldownTicketsCount, setCooldownTicketsCount] = useState<number>(1);
  const [mutationSpraysInventory, setMutationSpraysInventory] = useState<Record<string, number>>({
    golden: 0,
    silver: 0,
    diamond: 0,
    frozen: 0,
    rainbow: 0,
  });
  
  // Extra stats
  const [likesCount, setLikesCount] = useState(450);
  const [seedsBoughtCount, setSeedsBoughtCount] = useState(142);
  const [minigamesDoneCount, setMinigamesDoneCount] = useState(87);

  // Load from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('seasons_habit_states');
      if (stored) {
        const d = JSON.parse(stored);
        if (d.vitality) setVitality(d.vitality);
        if (d.level) setLevel(d.level);
        if (d.xp) setXp(d.xp);
        if (d.coins) setCoins(d.coins);
        if (d.streak) setStreak(d.streak);
        if (d.username) setUsername(d.username);
        if (d.email) setEmail(d.email);
        if (d.bio) setBio(d.bio);
        if (d.musicOn !== undefined) setMusicOn(d.musicOn);
        if (d.sfxOn !== undefined) setSfxOn(d.sfxOn);
        if (d.vibrationOn !== undefined) setVibrationOn(d.vibrationOn);
        if (d.friendRequestsOn !== undefined) setFriendRequestsOn(d.friendRequestsOn);
        if (d.language) setLanguage(d.language);
        if (d.plots) setPlots(d.plots);
        if (d.tasks) setTasks(d.tasks);
        if (d.friends) setFriends(d.friends);
        if (d.inventorySeeds) setInventorySeeds({ ...getInitialSeeds(), ...d.inventorySeeds });
        if (d.harvestedInven) setHarvestedInven({ ...getInitialHarvest(), ...d.harvestedInven });
        if (d.hasWateringCan !== undefined) setHasWateringCan(d.hasWateringCan);
        if (d.hasFocusTimer !== undefined) setHasFocusTimer(d.hasFocusTimer);
        if (d.hasShovel !== undefined) setHasShovel(d.hasShovel);
        if (d.unlockedBgs) setUnlockedBgs(d.unlockedBgs);
        if (d.unlockedOutfits) setUnlockedOutfits(d.unlockedOutfits);
        if (d.unlockedProps) setUnlockedProps(d.unlockedProps);
        if (d.equippedBg) setEquippedBg(d.equippedBg);
        if (d.equippedOutfit) setEquippedOutfit(d.equippedOutfit);
        if (d.equippedProp) setEquippedProp(d.equippedProp);
        if (d.equippedHat !== undefined) setEquippedHat(d.equippedHat);
        if (d.avatarGender !== undefined) setAvatarGender(d.avatarGender);
        if (d.badges) setBadges(d.badges);
        if (d.sunflowersHarvestedCount !== undefined) setSunflowersHarvestedCount(d.sunflowersHarvestedCount);
        if (d.claimedQuest !== undefined) setClaimedQuest(d.claimedQuest);
        if (d.likesCount !== undefined) setLikesCount(d.likesCount);
        if (d.seedsBoughtCount !== undefined) setSeedsBoughtCount(d.seedsBoughtCount);
        if (d.minigamesDoneCount !== undefined) setMinigamesDoneCount(d.minigamesDoneCount);
        
        // Load gear shop and mutation variables
        if (d.rotatedCommonIds) setRotatedCommonIds(d.rotatedCommonIds);
        if (d.rotatedRareIds) setRotatedRareIds(d.rotatedRareIds);
        if (d.rotatedLegendaryIds) setRotatedLegendaryIds(d.rotatedLegendaryIds);
        if (d.seedShopTimeToRotate !== undefined) setSeedShopTimeToRotate(d.seedShopTimeToRotate);
        if (d.gearShopTimeToRefresh !== undefined) setGearShopTimeToRefresh(d.gearShopTimeToRefresh);
        if (d.gearShopStock) setGearShopStock(d.gearShopStock);
        if (d.cooldownTicketsCount !== undefined) setCooldownTicketsCount(d.cooldownTicketsCount);
        if (d.mutationSpraysInventory) setMutationSpraysInventory(d.mutationSpraysInventory);
      }
    } catch (e) {
      console.warn('Error reading localstorage:', e);
    }
  }, []);

  // Periodic check for 24-hour daily task reset
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const dayInMs = 24 * 60 * 60 * 1000;
      
      setTasks(prev => {
        let changed = false;
        const next = prev.map(t => {
          // 1. Ensure any completed task has a completedAt timestamp
          if (t.completed && !t.completedAt) {
            changed = true;
            return { ...t, completedAt: now };
          }
          // 2. Check if 24 hours has passed since completion
          if (t.completed && t.completedAt) {
            const elapsed = now - t.completedAt;
            if (elapsed >= dayInMs) {
              changed = true;
              return {
                ...t,
                completed: false,
                progress: 0,
                completedAt: undefined
              };
            }
          }
          return t;
        });
        
        if (changed) {
          const resetCount = next.filter((t, idx) => !t.completed && prev[idx].completed).length;
          if (resetCount > 0) {
            setTimeout(() => {
              triggerAlert("⏳ Daily task timers completed! Habits reset for the new day.");
            }, 50);
          }
          return next;
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Save to local storage
  const saveState = () => {
    const data = {
      vitality, level, xp, coins, streak, username, email, bio, musicOn, sfxOn, vibrationOn,
      friendRequestsOn, language, plots, tasks, friends, inventorySeeds, harvestedInven,
      hasWateringCan, hasFocusTimer, hasShovel, unlockedBgs, unlockedOutfits, unlockedProps, equippedBg,
      equippedOutfit, equippedProp, equippedHat, avatarGender, badges, sunflowersHarvestedCount, claimedQuest,
      likesCount, seedsBoughtCount, minigamesDoneCount,
      rotatedCommonIds, rotatedRareIds, rotatedLegendaryIds, seedShopTimeToRotate,
      gearShopTimeToRefresh, gearShopStock, cooldownTicketsCount, mutationSpraysInventory
    };
    try {
      localStorage.setItem('seasons_habit_states', JSON.stringify(data));
    } catch (e) {
      console.warn('Error storing localstorage:', e);
    }
  };

  useEffect(() => {
    saveState();
  }, [
    vitality, level, xp, coins, streak, username, email, bio, musicOn, sfxOn, vibrationOn,
    friendRequestsOn, language, plots, tasks, friends, inventorySeeds, harvestedInven,
    hasWateringCan, hasFocusTimer, hasShovel, unlockedBgs, unlockedOutfits, unlockedProps, equippedBg,
    equippedOutfit, equippedProp, equippedHat, avatarGender, badges, sunflowersHarvestedCount, claimedQuest,
    likesCount, seedsBoughtCount, minigamesDoneCount,
    rotatedCommonIds, rotatedRareIds, rotatedLegendaryIds, seedShopTimeToRotate,
    gearShopTimeToRefresh, gearShopStock, cooldownTicketsCount, mutationSpraysInventory
  ]);

  const triggerAlert = (msg: string) => {
    setAlertMsg(msg);
    setTimeout(() => {
      setAlertMsg('');
    }, 4500);
  };

  const addCoins = (amount: number) => {
    const double = hasFocusTimer ? amount * 2 : amount;
    setCoins(prev => prev + double);
    triggerAlert(`+${double} Coins earned!`);
  };

  const addXp = (amount: number) => {
    setXp(prev => {
      const nextXp = prev + amount;
      if (nextXp >= 1000) {
        setLevel(l => l + 1);
        setVitality(100);
        triggerAlert(`✨ LEVEL UP! You reached Level ${level + 1}! Vitality restored!`);
        return nextXp - 1000;
      }
      triggerAlert(`+${amount} XP gained!`);
      return nextXp;
    });
  };

  const rollGearShopStock = () => {
    let wateringCan = 2;
    const rWater = Math.random();
    if (rWater < 0.10) {
      wateringCan = 5; 
    } else if (rWater < 0.40) {
      wateringCan = 3;
    } else if (rWater < 0.70) {
      wateringCan = 2;
    } else if (rWater < 0.85) {
      wateringCan = 4;
    } else {
      wateringCan = 1;
    }

    const mutationCrates = Math.random() < 0.15 ? 1 : 0; 

    let cooldownTickets = 0;
    const rTicket = Math.random();
    if (rTicket < 0.10) {
      cooldownTickets = 3; 
    } else if (rTicket < 0.45) {
      cooldownTickets = 2;
    } else if (rTicket < 0.80) {
      cooldownTickets = 1;
    } else {
      cooldownTickets = 0;
    }

    return { wateringCan, mutationCrates, cooldownTickets };
  };

  const rotateSeedStock = () => {
    const staticCommonIds = ['sunflower', 'apple', 'orange', 'banana', 'berry'];
    const restockCommonCrops = CROPS.filter(c => c.category === 'Common' && !staticCommonIds.includes(c.id));
    const rareCrops = CROPS.filter(c => c.category === 'Rare');
    const legendaryCrops = CROPS.filter(c => c.category === 'Legendary');
    
    // Pick 2 random common restock seeds (carrots and onward)
    const shuffledCommon = [...restockCommonCrops].sort(() => 0.5 - Math.random());
    const selectedCommon = shuffledCommon.slice(0, 2).map(c => c.id);
    
    // Pick 2 random rare seeds
    const shuffledRare = [...rareCrops].sort(() => 0.5 - Math.random());
    const selectedRare = shuffledRare.slice(0, 2).map(c => c.id);
    
    // Pick 1 random legendary seed
    const shuffledLegendary = [...legendaryCrops].sort(() => 0.5 - Math.random());
    const selectedLegendary = shuffledLegendary.slice(0, 1).map(c => c.id);
    
    setRotatedCommonIds(selectedCommon);
    setRotatedRareIds(selectedRare);
    setRotatedLegendaryIds(selectedLegendary);
  };

  const useCooldownTicketOnSeeds = () => {
    if (cooldownTicketsCount <= 0) {
      triggerAlert("⚠️ You don't have any Cooldown Reduce Tickets!");
      return false;
    }
    setCooldownTicketsCount(prev => prev - 1);
    setSeedShopTimeToRotate(prev => Math.max(0, prev - 3600));
    triggerAlert("⏳ Ticket Used! Reduced Seed Emporium cooldown by 1 hour!");
    return true;
  };

  const useCooldownTicketOnGear = () => {
    if (cooldownTicketsCount <= 0) {
      triggerAlert("⚠️ You don't have any Cooldown Reduce Tickets!");
      return false;
    }
    setCooldownTicketsCount(prev => prev - 1);
    setGearShopTimeToRefresh(prev => Math.max(0, prev - 3600));
    triggerAlert("⏳ Ticket Used! Reduced Gear Shop cooldown by 1 hour (Instantly refreshed!).");
    return true;
  };

  const useCooldownTicketOnTask = (taskId: string) => {
    if (cooldownTicketsCount <= 0) {
      triggerAlert("⚠️ You don't have any Cooldown Reduce Tickets!");
      return false;
    }
    
    let success = false;
    setTasks(prev => prev.map(t => {
      if (t.id === taskId && t.completed && t.completedAt) {
        success = true;
        const oneHourMs = 60 * 60 * 1000;
        const nextCompletedAt = t.completedAt - oneHourMs;
        const dayInMs = 24 * 60 * 60 * 1000;
        const elapsed = Date.now() - nextCompletedAt;
        if (elapsed >= dayInMs) {
          return {
            ...t,
            completed: false,
            progress: 0,
            completedAt: undefined
          };
        }
        return { ...t, completedAt: nextCompletedAt };
      }
      return t;
    }));

    if (success) {
      setCooldownTicketsCount(prev => prev - 1);
      triggerAlert("⏳ Ticket Used! Reduced Daily Task cooldown by 1 hour!");
      return true;
    } else {
      triggerAlert("⚠️ Could not find a completed daily task on cooldown to reduce.");
      return false;
    }
  };

  const applyMutationSpray = (plotId: number, sprayType: string) => {
    if ((mutationSpraysInventory[sprayType] || 0) <= 0) {
      triggerAlert(`⚠️ No ${sprayType} spray available in your backpack!`);
      return false;
    }
    setMutationSpraysInventory(prev => ({
      ...prev,
      [sprayType]: prev[sprayType] - 1
    }));
    setPlots(prev => prev.map(p => {
      if (p.id === plotId) {
        return { ...p, mutation: sprayType as any };
      }
      return p;
    }));
    triggerAlert(`✨ Successfully applied ${sprayType.toUpperCase()} fertilizer/spray! Multiplier is now active.`);
    return true;
  };

  // Mount logic inside AppContext to initialize stock
  useEffect(() => {
    if (rotatedCommonIds.length === 0) {
      rotateSeedStock();
    }
  }, []);

  // Central timers for Shop refreshes
  useEffect(() => {
    const timer = setInterval(() => {
      // 1. Seed Shop Timer
      setSeedShopTimeToRotate(prev => {
        if (prev <= 1) {
          rotateSeedStock();
          setTimeout(() => {
            triggerAlert("⏰ Seed Shop stock rotated! Selection has refreshed.");
          }, 10);
          return 3600;
        }
        return prev - 1;
      });

      // 2. Gear Shop Timer
      setGearShopTimeToRefresh(prev => {
        if (prev <= 1) {
          setGearShopStock(rollGearShopStock());
          setTimeout(() => {
            triggerAlert("⚙️ Gear Shop stock refreshed with new tools and mutation items!");
          }, 10);
          return 1800; // 30 minutes
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <AppContext.Provider value={{
      vitality, setVitality, level, setLevel, xp, setXp, coins, setCoins,
      streak, setStreak, username, setUsername, email, setEmail, bio, setBio,
      musicOn, setMusicOn, sfxOn, setSfxOn, vibrationOn, setVibrationOn,
      friendRequestsOn, setFriendRequestsOn, language, setLanguage,
      plots, setPlots, tasks, setTasks, friends, setFriends, trades, setTrades,
      inventorySeeds, setInventorySeeds, harvestedInven, setHarvestedInven,
      hasWateringCan, setHasWateringCan, hasFocusTimer, setHasFocusTimer, hasShovel, setHasShovel,
      unlockedBgs, setUnlockedBgs, unlockedOutfits, setUnlockedOutfits,
      unlockedProps, setUnlockedProps, equippedBg, setEquippedBg,
      equippedOutfit, setEquippedOutfit, equippedProp, setEquippedProp,
      equippedHat, setEquippedHat,
      avatarGender, setAvatarGender,
      badges, setBadges, gardenMode, setGardenMode, alertMsg, triggerAlert,
      sunflowersHarvestedCount, setSunflowersHarvestedCount, claimedQuest, setClaimedQuest,
      profileOverlayTarget, setProfileOverlayTarget,
      likesCount, setLikesCount, seedsBoughtCount, setSeedsBoughtCount,
      minigamesDoneCount, setMinigamesDoneCount,
      addCoins, addXp,
      
      rotatedCommonIds, setRotatedCommonIds,
      rotatedRareIds, setRotatedRareIds,
      rotatedLegendaryIds, setRotatedLegendaryIds,
      seedShopTimeToRotate, setSeedShopTimeToRotate,
      rotateSeedStock,

      gearShopTimeToRefresh, setGearShopTimeToRefresh,
      gearShopStock, setGearShopStock,
      rollGearShopStock,

      cooldownTicketsCount, setCooldownTicketsCount,
      mutationSpraysInventory, setMutationSpraysInventory,

      useCooldownTicketOnSeeds,
      useCooldownTicketOnGear,
      useCooldownTicketOnTask,
      applyMutationSpray
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
