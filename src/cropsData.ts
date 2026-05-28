export interface Crop {
  id: string;
  name: string;
  category: 'Common' | 'Rare' | 'Legendary';
  description: string;
  cost: number;
  sellBase: number;
  netProfit: number;
  icon: string;
  color: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  unlockedAtStreak?: number;
  imageUrl?: string;
}

export const BASE_CROPS: Crop[] = [
  // --- COMMON (ALWAYS AVAILABLE) ---
  {
    id: 'sunflower',
    name: 'Sunflower',
    category: 'Common',
    description: 'Grow a majestic towering sunbeam. Sprout speed yields quick coin returns.',
    cost: 500,
    sellBase: 600,
    netProfit: 100,
    icon: 'local_florist',
    color: 'text-amber-500',
    difficulty: 'EASY'
  },
  {
    id: 'apple',
    name: 'Apples',
    category: 'Common',
    description: 'Crisp crimson apples. Easy to cultivate on any standard garden row.',
    cost: 600,
    sellBase: 720,
    netProfit: 120,
    icon: 'park',
    color: 'text-red-600',
    difficulty: 'EASY'
  },
  {
    id: 'orange',
    name: 'Orange',
    category: 'Common',
    description: 'Citrus delight rich with vitamins. Thrives under warm daytime energy.',
    cost: 650,
    sellBase: 780,
    netProfit: 130,
    icon: 'circle',
    color: 'text-orange-500',
    difficulty: 'EASY'
  },
  {
    id: 'banana',
    name: 'Banana',
    category: 'Common',
    description: 'A glowing bunch of sweet yellow potassium. Boosts local trade value.',
    cost: 700,
    sellBase: 850,
    netProfit: 150,
    icon: 'energy_savings_leaf',
    color: 'text-yellow-400',
    difficulty: 'EASY'
  },
  {
    id: 'berry',
    name: 'Berries',
    category: 'Common',
    description: 'Sweet berries filled with natural antioxidant juices.',
    cost: 750,
    sellBase: 920,
    netProfit: 170,
    icon: 'psychology_alt',
    color: 'text-red-500',
    difficulty: 'EASY'
  },
  {
    id: 'carrot',
    name: 'Carrot',
    category: 'Common',
    description: 'Root vegetable that develops deep within the dark, rich soil.',
    cost: 800,
    sellBase: 1000,
    netProfit: 200,
    icon: 'spa',
    color: 'text-orange-600',
    difficulty: 'EASY'
  },
  {
    id: 'corn',
    name: 'Corn',
    category: 'Common',
    description: 'Golden kernels packed tightly together. Tall structures love early dew.',
    cost: 850,
    sellBase: 1060,
    netProfit: 210,
    icon: 'potted_plant',
    color: 'text-yellow-600',
    difficulty: 'EASY'
  },
  {
    id: 'lettuce',
    name: 'Lettuce',
    category: 'Common',
    description: 'Cool crisp leaves with gorgeous green folds. Exceptionally light.',
    cost: 900,
    sellBase: 1120,
    netProfit: 220,
    icon: 'eco',
    color: 'text-emerald-500',
    difficulty: 'EASY'
  },
  {
    id: 'pumpkin',
    name: 'Pumpkin',
    category: 'Common',
    description: 'Heavy seasonal giant. Ideal for autumn decorations and rich pies.',
    cost: 1000,
    sellBase: 1250,
    netProfit: 250,
    icon: 'motion_photos_on',
    color: 'text-[#D05A3F]',
    difficulty: 'EASY'
  },
  {
    id: 'tomato',
    name: 'Tomato',
    category: 'Common',
    description: 'Vibrant organic bulbs that thrive on climbing support frameworks.',
    cost: 1100,
    sellBase: 1380,
    netProfit: 280,
    icon: 'brightness_low',
    color: 'text-red-500',
    difficulty: 'EASY'
  },
  {
    id: 'cherry',
    name: 'Cherry',
    category: 'Common',
    description: 'Ruby twin cherries linked by thin green stalks. Highly delightful.',
    cost: 1200,
    sellBase: 1500,
    netProfit: 300,
    icon: 'grain',
    color: 'text-rose-600',
    difficulty: 'EASY'
  },
  {
    id: 'pineapple',
    name: 'Pineapple',
    category: 'Common',
    description: 'Sovereign tropical crown fruit wearing armor of golden spikes.',
    cost: 1400,
    sellBase: 1750,
    netProfit: 350,
    icon: 'hive',
    color: 'text-amber-600',
    difficulty: 'EASY'
  },
  {
    id: 'lavender',
    name: 'Lavender',
    category: 'Common',
    description: 'Scented wild lavender spikes bringing complete serenity and calm.',
    cost: 1255,
    sellBase: 1515,
    netProfit: 260,
    icon: 'grass',
    color: 'text-purple-400',
    difficulty: 'EASY'
  },

  // --- RARE (ROTATING IN SEED SHOP, REQUIRES STREAK) ---
  {
    id: 'lychee',
    name: 'Lychee',
    category: 'Rare',
    description: 'Exotic translucent pulp sealed in rough crimson shells.',
    cost: 2500,
    sellBase: 3100,
    netProfit: 600,
    icon: 'bubble_chart',
    color: 'text-pink-500',
    difficulty: 'MEDIUM'
  },
  {
    id: 'peach',
    name: 'Peach',
    category: 'Rare',
    description: 'Fuzzy-skinned gold nectar-rich sphere. High demand among merchants.',
    cost: 2800,
    sellBase: 3500,
    netProfit: 700,
    icon: 'wb_sunny',
    color: 'text-orange-400',
    difficulty: 'MEDIUM'
  },
  {
    id: 'watermelon',
    name: 'Watermelon',
    category: 'Rare',
    description: 'Mammoth striped melon bursting with crisp electrolyte-rich water.',
    cost: 3200,
    sellBase: 4000,
    netProfit: 800,
    icon: 'database',
    color: 'text-green-500',
    difficulty: 'MEDIUM'
  },
  {
    id: 'pear',
    name: 'Pear',
    category: 'Rare',
    description: 'Elegant bell-shaped orchards choice. Demands mindful watering.',
    cost: 3500,
    sellBase: 4400,
    netProfit: 900,
    icon: 'water_drop',
    color: 'text-lime-500',
    difficulty: 'MEDIUM'
  },
  {
    id: 'dragonfruit',
    name: 'Dragon Fruit',
    category: 'Rare',
    description: 'Fiery neon scales concealing sweet speckled center. Majestic specimen.',
    cost: 4000,
    sellBase: 5000,
    netProfit: 1000,
    icon: 'workspace_premium',
    color: 'text-fuchsia-500',
    difficulty: 'MEDIUM'
  },
  {
    id: 'peppers',
    name: 'Peppers',
    category: 'Rare',
    description: 'A fiery cayenne kick that energizes any local trading catalog.',
    cost: 4500,
    sellBase: 5650,
    netProfit: 1150,
    icon: 'electric_bolt',
    color: 'text-red-500',
    difficulty: 'MEDIUM'
  },
  {
    id: 'mushroom',
    name: 'Mushroom',
    category: 'Rare',
    description: 'Savory subterranean cap requiring shaded greenhouse conditions.',
    cost: 5000,
    sellBase: 6300,
    netProfit: 1300,
    icon: 'emoji_nature',
    color: 'text-amber-700',
    difficulty: 'MEDIUM'
  },
  {
    id: 'coconut',
    name: 'Coconut',
    category: 'Rare',
    description: 'Hard-shelled palm treasure containing rich water and edible meat.',
    cost: 5800,
    sellBase: 7300,
    netProfit: 1500,
    icon: 'grid_view',
    color: 'text-amber-800',
    difficulty: 'MEDIUM'
  },

  // --- LEGENDARY (ROTATING IN SEED SHOP, ENDGAME TARGETS) ---
  {
    id: 'oak',
    name: 'Ancient Oak Trees',
    category: 'Legendary',
    description: 'Sovereign timber of the woods. Produces dense premium oak acorns.',
    cost: 12000,
    sellBase: 15000,
    netProfit: 3000,
    icon: 'nature',
    color: 'text-emerald-800',
    difficulty: 'HARD',
    unlockedAtStreak: 5
  },
  {
    id: 'mango',
    name: 'Glistening Mango',
    category: 'Legendary',
    description: 'Rich sunset-colored pulp praised as the monarch of stone fruits.',
    cost: 15000,
    sellBase: 18800,
    netProfit: 3800,
    icon: 'star',
    color: 'text-yellow-500',
    difficulty: 'HARD',
    unlockedAtStreak: 8
  },
  {
    id: 'grapes',
    name: 'Muscat Grapes',
    category: 'Legendary',
    description: 'Royal purple clusters that glimmer like deep gemstones.',
    cost: 18500,
    sellBase: 23200,
    netProfit: 4700,
    icon: 'filter_vintage',
    color: 'text-indigo-500',
    difficulty: 'HARD',
    unlockedAtStreak: 10
  },
  {
    id: 'starfruit',
    name: 'Celestial Star Fruit',
    category: 'Legendary',
    description: 'Stellar pentagram slices glowing with astronomical value.',
    cost: 25000,
    sellBase: 31500,
    netProfit: 6500,
    icon: 'auto_awesome',
    color: 'text-cyan-400',
    difficulty: 'HARD',
    unlockedAtStreak: 12
  }
];

let parsedCrops: Crop[] = [...BASE_CROPS];

if (typeof document !== 'undefined') {
  try {
    const container = document.getElementById('html-crops-data');
    if (container) {
      const items = container.querySelectorAll('.crop-item');
      if (items.length > 0) {
        const newList: Crop[] = [];
        items.forEach(el => {
          const item = el as HTMLElement;
          const id = item.getAttribute('data-id') || '';
          const name = item.getAttribute('data-name') || '';
          const category = (item.getAttribute('data-category') || 'Common') as 'Common' | 'Rare' | 'Legendary';
          const description = item.textContent?.trim() || '';
          const cost = parseInt(item.getAttribute('data-cost') || '0', 10);
          const netProfit = parseInt(item.getAttribute('data-net') || '0', 10);
          const icon = item.getAttribute('data-icon') || 'local_florist';
          const imageUrl = item.getAttribute('data-image-url') || '';
          const color = item.getAttribute('data-color') || 'text-amber-500';
          const difficulty = (item.getAttribute('data-difficulty') || 'EASY') as 'EASY' | 'MEDIUM' | 'HARD';
          const streakAttr = item.getAttribute('data-unlocked-streak');
          const unlockedAtStreak = streakAttr ? parseInt(streakAttr, 10) : undefined;
          
          if (id) {
            newList.push({
              id,
              name,
              category,
              description,
              cost,
              sellBase: cost + netProfit,
              netProfit,
              icon,
              color,
              difficulty,
              unlockedAtStreak,
              imageUrl
            });
          }
        });
        if (newList.length > 0) {
          parsedCrops = newList;
        }
      }
    }
  } catch (err) {
    console.error('Error parsing crops from HTML:', err);
  }
}

export const CROPS = parsedCrops;

