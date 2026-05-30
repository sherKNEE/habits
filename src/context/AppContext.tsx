import React, { createContext, useContext, useState, useEffect } from 'react';
import { PlantPlot, HabitTask, ShopItem, Friend, TradeOffer, Minigame, MailMessage } from '../types';
import { INITIAL_PLOTS, INITIAL_TASKS, SHOP_ITEMS, INITIAL_FRIENDS } from '../initialState';
import { CROPS } from '../cropsData';
import { FRIENDS_DATABASE } from '../friendsData';
import { TRADES_DATABASE } from '../tradesData';

interface AppContextType {
  vitality: number;
  setVitality: React.Dispatch<React.SetStateAction<number>>;
  maxVitality: number;
  level: number;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  xp: number;
  setXp: React.Dispatch<React.SetStateAction<number>>;
  rebirthCount: number;
  setRebirthCount: React.Dispatch<React.SetStateAction<number>>;
  performRebirth: () => void;
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
  mailMessages: MailMessage[];
  setMailMessages: React.Dispatch<React.SetStateAction<MailMessage[]>>;
  
  // Custom states
  inventorySeeds: Record<string, number>;
  setInventorySeeds: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  harvestedInven: Record<string, number>;
  setHarvestedInven: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  
  // Custom purchases
  hasWateringCan: boolean;
  setHasWateringCan: React.Dispatch<React.SetStateAction<boolean>>;
  wateringCanCount: number;
  setWateringCanCount: React.Dispatch<React.SetStateAction<number>>;
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
  earnedBadgeOverlay: string | null;
  setEarnedBadgeOverlay: React.Dispatch<React.SetStateAction<string | null>>;
  claimBadge: (badgeId: string) => void;
  
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

  // Antagonist States
  antagonistTimer: number;
  setAntagonistTimer: React.Dispatch<React.SetStateAction<number>>;
  activeAnimation: 'locusts' | 'crows' | 'aliens' | 'lightning' | null;
  setActiveAnimation: React.Dispatch<React.SetStateAction<'locusts' | 'crows' | 'aliens' | 'lightning' | null>>;
  triggerAntagonistAttack: (type: 'locusts' | 'crows' | 'aliens' | 'lightning') => void;
  resetGardenFromScratch: () => void;
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
  const [rebirthCount, setRebirthCount] = useState(0);
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
  const [mailMessages, setMailMessages] = useState<MailMessage[]>(() => [
    {
      id: 'msg_init_1',
      sender: 'Sam_EEE',
      receiver: 'You',
      avatar: 'https://lh3.googleusercontent.com/aida/ADBb0ujdQP6MAgmjK8hgH6aSOHT4BZIHX4Iij_p-Pzo2ikDy83vgWB7kbxRNAanC6B80uFfePmufqpKRfaPtLDUoMYMY4wm-crQU2c2T-4SZutluigzQ1k0alXn7hH3krPSNJIuQTbJ3zZXOs8CjhsI-RQh31YZ3yiB968QmftZ6D41h_jwFDgcq586EnkBA55I6Iza3tItq_RGve1En5_5WuLKtygooJn27WUa28jOelC3ykXkctgXr4NiCZQ',
      text: "Hey there! Please let me know what you are looking for in the Trade Hub. Let's trade some nice homegrown produce soon!",
      timestamp: '2 hours ago',
      isRead: false
    },
    {
      id: 'msg_init_2',
      sender: 'NICOLINE123',
      receiver: 'You',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL9uitRrW7wpUmlD-_fh7Ox9htxM_M6ABIzoZiJfy9rL9pNVvYHXZa38PVOYA8SLAdETx4JqnVq0HTDIF8xDeyrhFYQyi4zUEK9jwHwLZ26BKFzrQ8ZBcd9y73DqF83_ciKKDWv_uA7Lv-lmhyFyksurlaUzLlyjABaakVEO3gv2-74iNG5QzVq89KuMCkAnax9-yn5j6jZ1XLHILZpva8q6tOG8WmQqxI2fXWSoIlCaeaYsrrXg44NtaS_DRzyVwnmjkdEVKIhlE',
      text: "Your garden outline looks outstanding! Want to challenge each other in a Bible memory speed duel to calm our nerves?",
      timestamp: '5 hours ago',
      isRead: true
    }
  ]);
  
  const [inventorySeeds, setInventorySeeds] = useState<Record<string, number>>(() => getInitialSeeds());
  const [harvestedInven, setHarvestedInven] = useState<Record<string, number>>(() => getInitialHarvest());
  
  const [hasWateringCan, setHasWateringCan] = useState(false);
  const [wateringCanCount, setWateringCanCount] = useState(0);
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
  const [earnedBadgeOverlay, setEarnedBadgeOverlay] = useState<string | null>(null);
  const [gardenMode, setGardenMode] = useState<'view' | 'water' | 'fertilize' | 'shovel'>('view');
  const [alertMsg, setAlertMsg] = useState('');

  const claimBadge = (badgeId: string) => {
    setBadges(prev => {
      if (!prev.includes(badgeId)) {
        setEarnedBadgeOverlay(badgeId);
        return [...prev, badgeId];
      }
      return prev;
    });
  };
  
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

  // Antagonist States
  const [antagonistTimer, setAntagonistTimer] = useState<number>(3600);
  const [activeAnimation, setActiveAnimation] = useState<'locusts' | 'crows' | 'aliens' | 'lightning' | null>(null);

  // Load from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('seasons_habit_states');
      if (stored) {
        const d = JSON.parse(stored);
        if (d.vitality) setVitality(d.vitality);
        if (d.level) setLevel(d.level);
        if (d.xp) setXp(d.xp);
        if (d.rebirthCount !== undefined) setRebirthCount(d.rebirthCount);
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
        if (d.trades) setTrades(d.trades);
        if (d.mailMessages) setMailMessages(d.mailMessages);
        if (d.inventorySeeds) setInventorySeeds({ ...getInitialSeeds(), ...d.inventorySeeds });
        if (d.harvestedInven) setHarvestedInven({ ...getInitialHarvest(), ...d.harvestedInven });
        if (d.hasWateringCan !== undefined) setHasWateringCan(d.hasWateringCan);
        if (d.wateringCanCount !== undefined) setWateringCanCount(d.wateringCanCount);
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
        if (d.antagonistTimer !== undefined) setAntagonistTimer(d.antagonistTimer);
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
      vitality, level, xp, rebirthCount, coins, streak, username, email, bio, musicOn, sfxOn, vibrationOn,
      friendRequestsOn, language, plots, tasks, friends, trades, mailMessages, inventorySeeds, harvestedInven,
      hasWateringCan, wateringCanCount, hasFocusTimer, hasShovel, unlockedBgs, unlockedOutfits, unlockedProps, equippedBg,
      equippedOutfit, equippedProp, equippedHat, avatarGender, badges, sunflowersHarvestedCount, claimedQuest,
      likesCount, seedsBoughtCount, minigamesDoneCount,
      rotatedCommonIds, rotatedRareIds, rotatedLegendaryIds, seedShopTimeToRotate,
      gearShopTimeToRefresh, gearShopStock, cooldownTicketsCount, mutationSpraysInventory,
      antagonistTimer
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
    vitality, level, xp, rebirthCount, coins, streak, username, email, bio, musicOn, sfxOn, vibrationOn,
    friendRequestsOn, language, plots, tasks, friends, inventorySeeds, harvestedInven,
    hasWateringCan, wateringCanCount, hasFocusTimer, hasShovel, unlockedBgs, unlockedOutfits, unlockedProps, equippedBg,
    equippedOutfit, equippedProp, equippedHat, avatarGender, badges, sunflowersHarvestedCount, claimedQuest,
    likesCount, seedsBoughtCount, minigamesDoneCount,
    rotatedCommonIds, rotatedRareIds, rotatedLegendaryIds, seedShopTimeToRotate,
    gearShopTimeToRefresh, gearShopStock, cooldownTicketsCount, mutationSpraysInventory, antagonistTimer
  ]);

  const triggerAlert = (msg: string) => {
    setAlertMsg(msg);
    setTimeout(() => {
      setAlertMsg('');
    }, 4500);
  };

  const addCoins = (amount: number) => {
    const double = hasFocusTimer ? amount * 2 : amount;
    const mult = streak >= 10 ? 1.5 : streak >= 5 ? 1.3 : streak >= 3 ? 1.2 : streak >= 1 ? 1.1 : 1.0;
    const finalAmount = Math.round(double * mult);
    setCoins(prev => prev + finalAmount);
    if (mult > 1.0) {
      triggerAlert(`+${finalAmount} Coins earned! (Includes a x${mult} boost from your ${streak}-day streak!)`);
    } else {
      triggerAlert(`+${finalAmount} Coins earned!`);
    }
  };

  const addXp = (amount: number) => {
    if (level >= 200) {
      triggerAlert(`+${amount} XP gained! (Max level 200 reached)`);
      return;
    }

    setXp(prev => {
      let currentXp = prev + amount;
      let currentLevel = level;
      let leveledUp = false;

      while (true) {
        if (currentLevel >= 200) {
          currentXp = 0;
          break;
        }

        const xpNeeded = currentLevel >= 100 ? 1500 : 1000;
        if (currentXp >= xpNeeded) {
          currentXp -= xpNeeded;
          currentLevel += 1;
          leveledUp = true;
        } else {
          break;
        }
      }

      if (leveledUp) {
        setLevel(currentLevel);
        const newMaxVitality = 100 + Math.floor(currentLevel / 10) * 50;
        setVitality(newMaxVitality);
        if (currentLevel >= 200) {
          triggerAlert(`✨ CONGRATULATIONS! You reached Level 200 (MAX)! All 18 plots unlocked! Rebirth option is now available in your Profile!`);
        } else {
          triggerAlert(`✨ LEVEL UP! You reached Level ${currentLevel}! Vitality restored to ${newMaxVitality}!`);
        }
      } else {
        triggerAlert(`+${amount} XP gained!`);
      }

      return currentXp;
    });
  };

  const performRebirth = () => {
    setPlots(INITIAL_PLOTS.map(p => {
      if (p.id === 7 || p.id === 8) {
        return { ...p, type: 'locked', name: '', growth: 0, stage: 1 };
      }
      return { ...p, type: 'empty', name: '', growth: 0, stage: 1, watered: false, fertilized: false, wateredCount: 0, mutation: undefined };
    }));
    setInventorySeeds(getInitialSeeds());
    setHarvestedInven(getInitialHarvest());
    setCoins(500); // Starter coin allocation
    setLevel(1);
    setXp(0);
    setStreak(0);
    setVitality(100);
    setHasWateringCan(false);
    setWateringCanCount(0);
    setHasShovel(false);
    setHasFocusTimer(false);
    
    // reset other counts or statistics if desired
    setSeedsBoughtCount(0);
    setMinigamesDoneCount(0);
    setSunflowersHarvestedCount(0);
    setClaimedQuest(false);

    setRebirthCount(prev => prev + 1);
    triggerAlert("🌟 REBIRTH SUCCESSFULLY PERFORMED! Your legendary journey begins anew! Level reset to 1, and your status is elevated!");
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

  const triggerAntagonistAttack = (type: 'locusts' | 'crows' | 'aliens' | 'lightning') => {
    let damage = 0;
    let name = '';
    if (type === 'locusts') { damage = 10; name = 'Locust Attack'; }
    if (type === 'crows') { damage = 15; name = 'Crow Attack'; }
    if (type === 'aliens') { damage = 20; name = 'Alien Attack'; }
    if (type === 'lightning') { damage = 40; name = 'Boss Thunder Striker Lightning Strike'; }

    setActiveAnimation(type);
    setTimeout(() => {
      setActiveAnimation(null);
    }, 4000);
    
    setVitality(prev => {
      const nextVic = Math.max(0, prev - damage);
      if (nextVic <= 0) {
        setTimeout(() => {
          triggerAlert(`💀 Your garden was wiped out by the ${name}!`);
          resetGardenFromScratch();
        }, 4000); // Wait for the gorgeous animation to complete!
      }
      return nextVic;
    });

    setStreak(0); // Drops multiplier back to 1.0x instantly
    triggerAlert(`⚠️ The ${name} attacked! Lost ${damage} Vitality. Streak reset to 0!`);
    setAntagonistTimer(3600);
  };

  const resetGardenFromScratch = () => {
    setPlots(INITIAL_PLOTS.map(p => {
      if (p.id === 7 || p.id === 8) {
        return { ...p, type: 'locked', name: '', growth: 0, stage: 1 };
      }
      return { ...p, type: 'empty', name: '', growth: 0, stage: 1, watered: false, fertilized: false, wateredCount: 0, mutation: undefined };
    }));
    setInventorySeeds(getInitialSeeds());
    setHarvestedInven(getInitialHarvest());
    setCoins(500); // Starter coin allocation
    setLevel(1);
    setXp(0);
    setStreak(0);
    setVitality(100);
    setHasWateringCan(false);
    setWateringCanCount(0);
    setHasShovel(false);
    setHasFocusTimer(false);
    triggerAlert("🌿 Garden wiped out! Rebuilding from scratch with 500 starter coins!");
  };

  // Auto-unlock plots based on Level (Dynamic array size and locks)
  useEffect(() => {
    setPlots(prev => {
      const targetSize = level >= 100 ? 18 : 9;
      let updated = [...prev];
      
      // Ensure the array matches the target size based on whether it is >= 100
      if (updated.length < targetSize) {
        for (let i = updated.length; i < targetSize; i++) {
          updated.push({
            id: i,
            type: 'locked',
            name: '',
            watered: false,
            fertilized: false,
            growth: 0,
            stage: 1
          });
        }
      } else if (updated.length > targetSize) {
        updated = updated.slice(0, targetSize);
      }
      
      // Determine how many plots should be unlocked at this level
      let unlockedCount = 3;
      if (level < 100) {
        unlockedCount = Math.min(9, 3 + Math.floor(level / 10));
      } else if (level < 200) {
        // At level 100, we have double the farm plots (18 max plots), starting with 3 unlocked as usual
        unlockedCount = Math.min(18, 3 + Math.floor((level - 100) / 10));
      } else {
        // When you reach level 200, all plots should be unlocked (18)
        unlockedCount = 18;
      }

      let changed = updated.length !== prev.length;
      
      updated = updated.map((p, idx) => {
        if (idx < unlockedCount) {
          // Should be unlocked (empty or already planted)
          if (p.type === 'locked') {
            changed = true;
            return { ...p, type: 'empty', name: '', growth: 0, stage: 1, watered: false, fertilized: false, wateredCount: 0 };
          }
        } else {
          // Should be locked
          if (p.type !== 'locked') {
            changed = true;
            return { ...p, type: 'locked', name: '', growth: 0, stage: 1, watered: false, fertilized: false, wateredCount: 0 };
          }
        }
        return p;
      });
      
      return changed ? updated : prev;
    });
  }, [level]);

  // Central timer for Antagonist warning countdown
  useEffect(() => {
    const timer = setInterval(() => {
      // Check threat state
      const completedCount = tasks.filter(t => t.completed).length;
      const totalCount = tasks.length;
      const missedCount = totalCount - completedCount;
      const hasThreat = completedCount === 0 || missedCount >= 2;
      
      if (hasThreat) {
        setAntagonistTimer(prev => {
          if (prev <= 1) {
            let type: 'locusts' | 'crows' | 'aliens' | 'lightning' = 'locusts';
            if (completedCount === 0) {
              type = 'lightning';
            } else if (missedCount >= 4) {
              type = 'aliens';
            } else if (missedCount === 3) {
              type = 'crows';
            } else if (missedCount === 2) {
              type = 'locusts';
            }
            
            setTimeout(() => {
              triggerAntagonistAttack(type);
            }, 10);
            
            return 3600;
          }
          return prev - 1;
        });
      } else {
        // Safe: reset countdown to 1 hour (3600 seconds)
        setAntagonistTimer(3600);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [tasks]);

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

  // Automated Reactive Badge Award Triggers
  useEffect(() => {
    // 1. Leveling Sovereign Badge: reach Level 15 or more
    if (level >= 15) {
      claimBadge('Leveling Sovereign');
    }
  }, [level]);

  useEffect(() => {
    // 2. Habit Warrior Badge: check streak
    if (streak >= 5) {
      claimBadge('Habit Warrior');
    }
  }, [streak]);

  useEffect(() => {
    // 3. Seed Collector / Rare Seed Expert check
    if (seedsBoughtCount >= 1) {
      claimBadge('Seed Collector');
    }
    if (seedsBoughtCount >= 5) {
      claimBadge('Rare Seed Expert');
    }
  }, [seedsBoughtCount]);

  const maxVitality = 100 + Math.floor(level / 10) * 50;

  return (
    <AppContext.Provider value={{
      vitality, setVitality, maxVitality, level, setLevel, xp, setXp, rebirthCount, setRebirthCount, performRebirth, coins, setCoins,
      streak, setStreak, username, setUsername, email, setEmail, bio, setBio,
      musicOn, setMusicOn, sfxOn, setSfxOn, vibrationOn, setVibrationOn,
      friendRequestsOn, setFriendRequestsOn, language, setLanguage,
      plots, setPlots, tasks, setTasks, friends, setFriends, trades, setTrades,
      inventorySeeds, setInventorySeeds, harvestedInven, setHarvestedInven,
      hasWateringCan, setHasWateringCan, wateringCanCount, setWateringCanCount, hasFocusTimer, setHasFocusTimer, hasShovel, setHasShovel,
      unlockedBgs, setUnlockedBgs, unlockedOutfits, setUnlockedOutfits,
      unlockedProps, setUnlockedProps, equippedBg, setEquippedBg,
      equippedOutfit, setEquippedOutfit, equippedProp, setEquippedProp,
      equippedHat, setEquippedHat,
      avatarGender, setAvatarGender,
      badges, setBadges, earnedBadgeOverlay, setEarnedBadgeOverlay, claimBadge, gardenMode, setGardenMode, alertMsg, triggerAlert,
      mailMessages, setMailMessages,
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
      applyMutationSpray,

      antagonistTimer, setAntagonistTimer,
      activeAnimation, setActiveAnimation,
      triggerAntagonistAttack,
      resetGardenFromScratch
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
