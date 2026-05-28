export type PlantType = 'empty' | 'locked' | 'sunflower' | 'apple' | 'orange' | 'banana' | 'berry' | 'carrot' | 'corn' | 'lettuce' | 'pumpkin' | 'tomato' | 'cherry' | 'pineapple' | 'lychee' | 'peach' | 'watermelon' | 'pear' | 'dragonfruit' | 'peppers' | 'mushroom' | 'coconut' | 'oak' | 'mango' | 'grapes' | 'starfruit' | 'lavender';

export interface PlantPlot {
  id: number;
  type: PlantType;
  name: string;
  watered: boolean;
  fertilized: boolean;
  growth: number; // 0 to 100
  stage: 1 | 2 | 3; // 1 = sprout, 2 = medium, 3 = ready to harvest
  wateredCount?: number;
  mutation?: 'none' | 'golden' | 'silver' | 'diamond' | 'frozen' | 'rainbow';
}

export interface HabitTask {
  id: string;
  title: string;
  subtitle: string;
  category: 'HEALTH' | 'MIND' | 'SCHOOL' | 'SKILLS';
  rewardCoins: number;
  rewardXp: number;
  progress: number;
  target: number; // e.g. 8 times, or 1 (checkbox)
  icon: string;
  completed: boolean;
  completedAt?: number;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  type: 'gear' | 'crate' | 'seed';
  icon: string;
  bought?: boolean;
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
}

export interface Friend {
  id: string;
  username: string;
  avatar: string;
  status: 'online' | 'offline' | 'pending';
}

export interface TradeOffer {
  id: string;
  user: string;
  avatar: string;
  type: 'offer' | 'request';
  item: string;
}

export interface Minigame {
  id: string;
  name: string;
  description: string;
  rewardCoins: number;
  icon: string;
}
