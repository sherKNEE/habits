import { PlantPlot, HabitTask, ShopItem, Friend, TradeOffer, Minigame } from './types';

export const INITIAL_PLOTS: PlantPlot[] = [
  { id: 0, type: 'corn', name: 'Corn', watered: false, fertilized: false, growth: 80, stage: 2 },
  { id: 1, type: 'berry', name: 'Berry', watered: true, fertilized: false, growth: 50, stage: 2 },
  { id: 2, type: 'empty', name: '', watered: false, fertilized: false, growth: 0, stage: 1 },
  { id: 3, type: 'apple', name: 'Apple', watered: false, fertilized: true, growth: 95, stage: 2 },
  { id: 4, type: 'empty', name: '', watered: false, fertilized: false, growth: 0, stage: 1 },
  { id: 5, type: 'empty', name: '', watered: false, fertilized: false, growth: 0, stage: 1 },
  { id: 6, type: 'empty', name: '', watered: false, fertilized: false, growth: 0, stage: 1 },
  { id: 7, type: 'locked', name: '', watered: false, fertilized: false, growth: 0, stage: 1 },
  { id: 8, type: 'locked', name: '', watered: false, fertilized: false, growth: 0, stage: 1 },
];

export const INITIAL_TASKS: HabitTask[] = [
  {
    id: 't1',
    title: 'Drink Water',
    subtitle: 'Stay hydrated like a fern',
    category: 'HEALTH',
    rewardCoins: 50,
    rewardXp: 10,
    progress: 0,
    target: 8,
    icon: 'water_full',
    completed: false,
    verificationType: 'image'
  },
  {
    id: 't2',
    title: 'Daily Walk',
    subtitle: 'Take a wander and breath deep',
    category: 'HEALTH',
    rewardCoins: 120,
    rewardXp: 25,
    progress: 0,
    target: 1,
    icon: 'directions_walk',
    completed: false,
    verificationType: 'image'
  },
  {
    id: 't3',
    title: '7h Sleep',
    subtitle: 'Recharge under safe twilight',
    category: 'HEALTH',
    rewardCoins: 200,
    rewardXp: 50,
    progress: 1,
    target: 1,
    icon: 'bedtime',
    completed: true
  },
  {
    id: 't4',
    title: '10m Meditation',
    subtitle: 'Clear negative thoughts',
    category: 'MIND',
    rewardCoins: 80,
    rewardXp: 15,
    progress: 0,
    target: 1,
    icon: 'spa',
    completed: false,
    verificationType: 'timer'
  },
  {
    id: 't5',
    title: 'Study Session',
    subtitle: 'Focus without notifications',
    category: 'SCHOOL',
    rewardCoins: 100,
    rewardXp: 20,
    progress: 0,
    target: 1,
    icon: 'timer',
    completed: false,
    verificationType: 'image'
  },
  {
    id: 't6',
    title: 'Reading',
    subtitle: 'Grow wiser step by step',
    category: 'SCHOOL',
    rewardCoins: 40,
    rewardXp: 10,
    progress: 0,
    target: 1,
    icon: 'book',
    completed: false,
    verificationType: 'image'
  },
  {
    id: 't7',
    title: 'Practice Instrument',
    subtitle: 'Immerse in beautiful sounds',
    category: 'SKILLS',
    rewardCoins: 50,
    rewardXp: 15,
    progress: 0,
    target: 1,
    icon: 'music_note',
    completed: false,
    verificationType: 'image'
  },
  {
    id: 't8',
    title: 'Coding',
    subtitle: 'Write pure and elegant syntax',
    category: 'SKILLS',
    rewardCoins: 80,
    rewardXp: 25,
    progress: 0,
    target: 1,
    icon: 'terminal',
    completed: false,
    verificationType: 'image'
  }
];

export const SHOP_ITEMS: ShopItem[] = [
  // Crates
  {
    id: 'crate_bg',
    name: 'Background Crate',
    description: 'Drawn at random: Rare vintage wallpapers, cozy green shades, or wooden paneling.',
    cost: 1500,
    type: 'crate',
    icon: 'package_2'
  },
  {
    id: 'crate_clothing',
    name: 'Clothing Crate',
    description: 'Drawn at random: Beekeeper smock, master farmer overalls, or straw hats.',
    cost: 2000,
    type: 'crate',
    icon: 'package_2'
  },
  {
    id: 'crate_tool',
    name: 'Prop/Tool Crate',
    description: 'Drawn at random: Golden rake, antique shears, or glass watering pot.',
    cost: 1800,
    type: 'crate',
    icon: 'package_2'
  },
  // Gear
  {
    id: 'gear_watering_can',
    name: 'Golden Watering Can',
    description: 'Reduces plant growth time by 20% on all future plantings.',
    cost: 15000,
    type: 'gear',
    icon: 'sprinkler',
    bought: false
  },
  {
    id: 'gear_focus_timer',
    name: 'Focus Timer',
    description: 'Earn 2x coins during deep work sessions and daily task completions.',
    cost: 8200,
    type: 'gear',
    icon: 'timer',
    bought: false
  },
  // Seeds
  {
    id: 'seed_sunflower',
    name: 'Sunflower',
    description: 'Grow a towering sunbeam flower. Sprout speed yields quick harvest.',
    cost: 500,
    type: 'seed',
    icon: 'local_florist',
    difficulty: 'EASY'
  },
  {
    id: 'seed_lavender',
    name: 'Lavender',
    description: 'Fragrant purple plant. Demands mindful watering over intermediate cycles.',
    cost: 1250,
    type: 'seed',
    icon: 'grass',
    difficulty: 'MEDIUM'
  },
  {
    id: 'seed_oak',
    name: 'Ancient Oak',
    description: 'A sovereign tree that blossoms with royal golden leaves. Exceptional prize.',
    cost: 12000,
    type: 'seed',
    icon: 'nature',
    difficulty: 'HARD'
  }
];

export const INITIAL_FRIENDS: Friend[] = [
  {
    id: 'f1',
    username: 'MR MARK',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL9uitRrW7wpUmlD-_fh7Ox9htxM_M6ABIzoZiJfy9rL9pNVvYHXZa38PVOYA8SLAdETx4JqnVq0HTDIF8xDeyrhFYQyi4zUEK9jwHwLZ26BKFzrQ8ZBcd9y73DqF83_ciKKDWv_uA7Lv-lmhyFyksurlaUzLlyjABaakVEO3gv2-74iNG5QzVq89KuMCkAnax9-yn5j6jZ1XLHILZpva8q6tOG8WmQqxI2fXWSoIlCaeaYsrrXg44NtaS_DRzyVwnmjkdEVKIhlE',
    status: 'pending'
  },
  {
    id: 'f2',
    username: 'Sam_EEE',
    avatar: 'https://lh3.googleusercontent.com/aida/ADBb0ujdQP6MAgmjK8hgH6aSOHT4BZIHX4Iij_p-Pzo2ikDy83vgWB7kbxRNAanC6B80uFfePmufqpKRfaPtLDUoMYMY4wm-crQU2c2T-4SZutluigzQ1k0alXn7hH3krPSNJIuQTbJ3zZXOs8CjhsI-RQh31YZ3yiB968QmftZ6D41h_jwFDgcq586EnkBA55I6Iza3tItq_RGve1En5_5WuLKtygooJn27WUa28jOelC3ykXkctgXr4NiCZQ',
    status: 'online'
  },
  {
    id: 'f3',
    username: 'NICOLINE123',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL9uitRrW7wpUmlD-_fh7Ox9htxM_M6ABIzoZiJfy9rL9pNVvYHXZa38PVOYA8SLAdETx4JqnVq0HTDIF8xDeyrhFYQyi4zUEK9jwHwLZ26BKFzrQ8ZBcd9y73DqF83_ciKKDWv_uA7Lv-lmhyFyksurlaUzLlyjABaakVEO3gv2-74iNG5QzVq89KuMCkAnax9-yn5j6jZ1XLHILZpva8q6tOG8WmQqxI2fXWSoIlCaeaYsrrXg44NtaS_DRzyVwnmjkdEVKIhlE',
    status: 'offline'
  }
];

export const TRADE_OFFERS: TradeOffer[] = [
  {
    id: 'tr1',
    user: 'SH3RM4Y0',
    avatar: 'https://lh3.googleusercontent.com/aida/ADBb0uj5n5EVNIoDSZUSRDlx2cGqsMRF5x-xL2X-GPeWQ_BINTc0dJYrR9P613Ts-irX275ILxlDMUJUnP5JKMSedV2JrpSCs7lQVVpSgMSSWaLhiXBmrV7t3tSMv6efLhN4R-cI8_cbdzmReko9iF8mTKZ8FksDBcbJsu1trLb8rd0dfuAkYvCFdzRD3ZQeR9mjEOinAvMQtRSjzQLYHgHRV7VgXxnhckTim1PkhI0WgNizWVjuaUs7oViRvg',
    type: 'offer',
    item: 'Golden Apple'
  },
  {
    id: 'tr2',
    user: 'SHAYI_Y',
    avatar: 'https://lh3.googleusercontent.com/aida/ADBb0uj5n5EVNIoDSZUSRDlx2cGqsMRF5x-xL2X-GPeWQ_BINTc0dJYrR9P613Ts-irX275ILxlDMUJUnP5JKMSedV2JrpSCs7lQVVpSgMSSWaLhiXBmrV7t3tSMv6efLhN4R-cI8_cbdzmReko9iF8mTKZ8FksDBcbJsu1trLb8rd0dfuAkYvCFdzRD3ZQeR9mjEOinAvMQtRSjzQLYHgHRV7VgXxnhckTim1PkhI0WgNizWVjuaUs7oViRvg',
    type: 'request',
    item: 'Straw Hat'
  }
];

export const MINIGAMES: Minigame[] = [
  {
    id: 'm1',
    name: 'Study Sprinters',
    description: 'Flashcards for School tasks. Match answers correctly!',
    rewardCoins: 50,
    icon: 'sports_esports'
  },
  {
    id: 'm2',
    name: 'Wellness Wiz',
    description: 'Health/Mind mini-game. Perfect for a calming breath session.',
    rewardCoins: 75,
    icon: 'self_improvement'
  },
  {
    id: 'm3',
    name: 'Skill Sage',
    description: 'Skills coding testing practice. Solve complex algorithms.',
    rewardCoins: 60,
    icon: 'psychology'
  }
];
