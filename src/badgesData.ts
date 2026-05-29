export interface BadgeItem {
  id: string; // unique badge ID matching entry in the `badges` array
  title: string;
  description: string;
  category: "Quest" | "Seeds" | "Social" | "Level" | "Habit";
  logoEmoji: string; // Unique, high-fidelity emoji logo
  bgColor: string;   // gradient background class
  borderColor: string;
  textColor: string;
  accentClass: string;
}

export const BADGE_DATABASE: BadgeItem[] = [
  {
    id: "Sunbeam Badge",
    title: "Sunbeam Hero",
    description: "Successfully complete the Sunflower Bounty quest to harness the power of solar rays!",
    category: "Quest",
    logoEmoji: "🌻",
    bgColor: "from-amber-100 via-yellow-250 to-amber-300",
    borderColor: "border-yellow-600",
    textColor: "text-amber-950",
    accentClass: "bg-amber-100 text-yellow-800"
  },
  {
    id: "Seed Collector",
    title: "Seed Collector",
    description: "Purchase any planting crop seed pack from the main seed shop vendors!",
    category: "Seeds",
    logoEmoji: "🌱",
    bgColor: "from-emerald-100 via-green-200 to-emerald-300",
    borderColor: "border-emerald-600",
    textColor: "text-emerald-950",
    accentClass: "bg-emerald-100 text-green-800"
  },
  {
    id: "Rare Seed Expert",
    title: "Rare Seed Expert",
    description: "Buy any Rare or Legendary crop category seeds from the premium rotating inventory!",
    category: "Seeds",
    logoEmoji: "💎",
    bgColor: "from-purple-100 via-indigo-250 to-purple-300",
    borderColor: "border-indigo-600",
    textColor: "text-indigo-950",
    accentClass: "bg-[#f3edf7] text-purple-800"
  },
  {
    id: "Trade Tycoon",
    title: "Trade Tycoon",
    description: "Fulfill a direct barter trade transaction with other local growers in the Guild trading hub!",
    category: "Social",
    logoEmoji: "🤝",
    bgColor: "from-sky-100 via-blue-200 to-sky-300",
    borderColor: "border-blue-600",
    textColor: "text-blue-950",
    accentClass: "bg-sky-100 text-blue-800"
  },
  {
    id: "Leveling Sovereign",
    title: "Leveling Sovereign",
    description: "Grow your agricultural yield and level up your custom garden up to Level 15+!",
    category: "Level",
    logoEmoji: "👑",
    bgColor: "from-yellow-200 via-amber-250 to-yellow-400",
    borderColor: "border-amber-600",
    textColor: "text-amber-950",
    accentClass: "bg-yellow-50 text-amber-900"
  },
  {
    id: "100 Day Streak",
    title: "100 Day Streak",
    description: "Nurture your physical & intellectual habits for direct consecutive days without falter!",
    category: "Social",
    logoEmoji: "🔥",
    bgColor: "from-orange-100 via-red-200 to-orange-350",
    borderColor: "border-red-600",
    textColor: "text-red-950",
    accentClass: "bg-red-50 text-orange-800"
  },
  {
    id: "Master Harvester",
    title: "Master Harvester",
    description: "Secure a full bountiful collection harvest of mature crops from your personal soil grid!",
    category: "Quest",
    logoEmoji: "👨‍🌾",
    bgColor: "from-lime-100 via-emerald-200 to-lime-300",
    borderColor: "border-emerald-700",
    textColor: "text-emerald-950",
    accentClass: "bg-emerald-50 text-lime-800"
  },
  {
    id: "Habit Warrior",
    title: "Habit Warrior",
    description: "Complete daily chores & habits to keep your garden's vitality pool fully charged!",
    category: "Habit",
    logoEmoji: "⚡",
    bgColor: "from-cyan-100 via-teal-200 to-cyan-300",
    borderColor: "border-teal-700",
    textColor: "text-teal-950",
    accentClass: "bg-cyan-50 text-teal-800"
  }
];
